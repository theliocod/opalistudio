"""Rend un modèle compacté pour le navigateur lisible par Godot.

Usage : python3 tools/glb-for-godot.py ../samourai/assets/modeles/samourai-jeu.glb ...
Écrit assets/modeles/<nom>.glb.

Les modèles du jeu navigateur rangent leurs normales sur un octet signé
(extension KHR_mesh_quantization), que Godot ne lit pas. On remet ces
normales en flottants et on retire l'extension ; tout le reste (textures,
squelette, poids) est déjà du glTF standard.
"""
import json
import struct
import sys
from pathlib import Path

import numpy as np

OUT = Path(__file__).resolve().parent.parent / 'assets' / 'modeles'


def convert(src):
    data = Path(src).read_bytes()
    jlen = struct.unpack_from('<I', data, 12)[0]
    gltf = json.loads(data[20:20 + jlen])
    blen = struct.unpack_from('<I', data, 20 + jlen)[0]
    body = bytearray(data[28 + jlen:28 + jlen + blen])

    for mesh in gltf['meshes']:
        for prim in mesh['primitives']:
            a = gltf['accessors'][prim['attributes']['NORMAL']]
            if a['componentType'] == 5126:
                continue
            v = gltf['bufferViews'][a['bufferView']]
            stride = v.get('byteStride', 3)
            start = v.get('byteOffset', 0) + a.get('byteOffset', 0)
            raw = np.frombuffer(bytes(body), np.uint8, a['count'] * stride, start).reshape(a['count'], stride)
            n = raw[:, :3].copy().view(np.int8).astype(np.float32) / 127.0
            n /= np.maximum(np.linalg.norm(n, axis=1, keepdims=True), 1e-8)
            body += b'\0' * ((-len(body)) % 4)
            gltf['bufferViews'].append({'buffer': 0, 'byteOffset': len(body), 'byteLength': n.nbytes, 'target': 34962})
            body += n.astype('<f4').tobytes()
            a.update({'bufferView': len(gltf['bufferViews']) - 1, 'componentType': 5126, 'byteOffset': 0})
            a.pop('normalized', None)

    for key in ('extensionsUsed', 'extensionsRequired'):
        if key in gltf:
            gltf[key] = [e for e in gltf[key] if e != 'KHR_mesh_quantization']
            if not gltf[key]:
                del gltf[key]
    gltf['buffers'] = [{'byteLength': len(body)}]

    body += b'\0' * ((-len(body)) % 4)
    js = json.dumps(gltf, separators=(',', ':')).encode()
    js += b' ' * ((-len(js)) % 4)
    glb = struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(body))
    glb += struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(body), 0x004E4942) + bytes(body)
    OUT.mkdir(parents=True, exist_ok=True)
    dst = OUT / (Path(src).stem.replace('-jeu', '') + '.glb')
    dst.write_bytes(glb)
    print(f'{dst.name} : {len(glb) / 1e6:.2f} Mo')


if __name__ == '__main__':
    for f in sys.argv[1:]:
        convert(f)
