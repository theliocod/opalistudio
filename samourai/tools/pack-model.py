"""Allège un modèle rigué de Meshy pour le jeu.

Usage : python3 tools/pack-model.py assets/modeles/samourai.glb
Écrit assets/modeles/samourai-jeu.glb, celui que le jeu intègre.

Meshy livre des textures 2048 en PNG et des sommets en flottants : le
modèle pèse 16 Mo. On réduit les textures en JPEG 1024, on range normales,
coordonnées de texture et poids sur moins d'octets (KHR_mesh_quantization,
que three.js lit sans rien ajouter), on retire les tangentes et le petit
clip d'animation de démonstration. Il reste deux Mo environ.
"""
import io
import json
import struct
import sys
from pathlib import Path

import numpy as np
from PIL import Image

SIZES = {'base': (1024, 86), 'normal': (1024, 92), 'mr': (512, 85)}
CT = {5120: np.int8, 5121: np.uint8, 5122: np.int16, 5123: np.uint16, 5125: np.uint32, 5126: np.float32}
NCOMP = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}


def read_glb(path):
    data = Path(path).read_bytes()
    jlen = struct.unpack_from('<I', data, 12)[0]
    gltf = json.loads(data[20:20 + jlen])
    blen = struct.unpack_from('<I', data, 20 + jlen)[0]
    return gltf, data[28 + jlen:28 + jlen + blen]


def accessor(gltf, binary, i):
    a = gltf['accessors'][i]
    v = gltf['bufferViews'][a['bufferView']]
    n = NCOMP[a['type']]
    dt = np.dtype(CT[a['componentType']])
    start = v.get('byteOffset', 0) + a.get('byteOffset', 0)
    stride = v.get('byteStride', dt.itemsize * n)
    raw = np.frombuffer(binary, np.uint8, a['count'] * stride, start).reshape(a['count'], stride)
    return raw[:, :dt.itemsize * n].copy().view(dt).reshape(a['count'], n)


class Out:
    def __init__(self):
        self.chunks, self.views, self.accessors, self.size = [], [], [], 0

    def view(self, raw, target=None):
        pad = (-self.size) % 4
        if pad:
            self.chunks.append(b'\0' * pad)
            self.size += pad
        v = {'buffer': 0, 'byteOffset': self.size, 'byteLength': len(raw)}
        if target:
            v['target'] = target
        self.views.append(v)
        self.chunks.append(raw)
        self.size += len(raw)
        return len(self.views) - 1

    def acc(self, arr, ctype, typ, normalized=False, minmax=False, target=34962):
        n = NCOMP[typ]
        arr = np.ascontiguousarray(arr)
        # chaque sommet doit commencer sur un multiple de 4 octets
        row = arr.reshape(arr.shape[0], -1)
        width = row.shape[1] * row.dtype.itemsize
        if target == 34962 and width % 4:
            padded = np.zeros((row.shape[0], width + (-width) % 4), np.uint8)
            padded[:, :width] = row.view(np.uint8).reshape(row.shape[0], width)
            vi = self.view(padded.tobytes(), target)
            self.views[vi]['byteStride'] = padded.shape[1]
        else:
            vi = self.view(row.tobytes(), target)
        a = {'bufferView': vi, 'componentType': ctype, 'count': int(arr.shape[0]), 'type': typ}
        if normalized:
            a['normalized'] = True
        if minmax:
            a['min'] = [float(x) for x in row.min(0)[:n]]
            a['max'] = [float(x) for x in row.max(0)[:n]]
        self.accessors.append(a)
        return len(self.accessors) - 1


def image(gltf, binary, idx, kind):
    v = gltf['bufferViews'][gltf['images'][idx]['bufferView']]
    raw = binary[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]
    size, q = SIZES[kind]
    im = Image.open(io.BytesIO(raw)).convert('RGB')
    im = im.resize((size, size), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=q, optimize=True)
    return buf.getvalue()


def main(src):
    gltf, binary = read_glb(src)
    out = Out()
    prim = gltf['meshes'][0]['primitives'][0]
    at = prim['attributes']
    pos = accessor(gltf, binary, at['POSITION'])
    nrm = accessor(gltf, binary, at['NORMAL'])
    uv = accessor(gltf, binary, at['TEXCOORD_0'])
    jnt = accessor(gltf, binary, at['JOINTS_0'])
    wgt = accessor(gltf, binary, at['WEIGHTS_0'])
    idx = accessor(gltf, binary, prim['indices'])

    wgt = wgt / np.maximum(wgt.sum(1, keepdims=True), 1e-8)
    wq = np.floor(wgt * 255 + 0.5).astype(np.int32)
    # les poids quantifiés doivent toujours faire 255 : on corrige le plus grand
    big = wq.argmax(1)
    wq[np.arange(len(wq)), big] += 255 - wq.sum(1)
    if uv.min() < 0 or uv.max() > 1:
        raise SystemExit('coordonnées de texture hors de [0, 1], quantification impossible')

    attrs = {
        'POSITION': out.acc(pos.astype(np.float32), 5126, 'VEC3', minmax=True),
        'NORMAL': out.acc(np.clip(np.round(nrm * 127), -127, 127).astype(np.int8), 5120, 'VEC3', normalized=True),
        'TEXCOORD_0': out.acc(np.round(uv * 65535).astype(np.uint16), 5123, 'VEC2', normalized=True),
        'JOINTS_0': out.acc(jnt.astype(np.uint8), 5121, 'VEC4'),
        'WEIGHTS_0': out.acc(wq.astype(np.uint8), 5121, 'VEC4', normalized=True),
    }
    indices = out.acc(idx.astype(np.uint16 if pos.shape[0] < 65536 else np.uint32).ravel(),
                      5123 if pos.shape[0] < 65536 else 5125, 'SCALAR', target=34963)
    skin = gltf['skins'][0]
    ibm = out.acc(accessor(gltf, binary, skin['inverseBindMatrices']), 5126, 'MAT4', target=None)

    mat = gltf['materials'][0]
    pbr = mat['pbrMetallicRoughness']
    kinds = {pbr['baseColorTexture']['index']: 'base', mat['normalTexture']['index']: 'normal'}
    if 'metallicRoughnessTexture' in pbr:
        kinds[pbr['metallicRoughnessTexture']['index']] = 'mr'
    images = []
    for t, tex in enumerate(gltf['textures']):
        vi = out.view(image(gltf, binary, tex['source'], kinds.get(t, 'base')))
        images.append({'bufferView': vi, 'mimeType': 'image/jpeg'})

    prim.update({'attributes': attrs, 'indices': indices})
    skin['inverseBindMatrices'] = ibm
    gltf.update({
        'accessors': out.accessors, 'bufferViews': out.views, 'images': images,
        'buffers': [{'byteLength': out.size}],
        'extensionsUsed': ['KHR_mesh_quantization'], 'extensionsRequired': ['KHR_mesh_quantization'],
    })
    gltf.pop('animations', None)

    body = b''.join(out.chunks)
    body += b'\0' * ((-len(body)) % 4)
    js = json.dumps(gltf, separators=(',', ':')).encode()
    js += b' ' * ((-len(js)) % 4)
    glb = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(body))
    glb += struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(body), 0x004E4942) + body
    dst = Path(src).with_name(Path(src).stem + '-jeu.glb')
    dst.write_bytes(glb)
    print(f'{dst.name} : {len(glb) / 1e6:.2f} Mo')


if __name__ == '__main__':
    for f in sys.argv[1:]:
        main(f)
