"""Allège les textures d'un modèle glb (Meshy les livre en 2048 px, en PNG) :
chaque image est réduite à 1024 px et réenregistrée en JPEG.

Usage : python3 -I tools/glb-textures.py assets/modeles/cheval.glb [...]
Le fichier est réécrit en place.
"""
import io
import json
import struct
import sys
from pathlib import Path

from PIL import Image

SIZE = 1024


def shrink(path):
    data = Path(path).read_bytes()
    jlen = struct.unpack_from('<I', data, 12)[0]
    gltf = json.loads(data[20:20 + jlen])
    blen = struct.unpack_from('<I', data, 20 + jlen)[0]
    body = data[28 + jlen:28 + jlen + blen]
    views = gltf['bufferViews']
    # les images, recodées ; les autres vues restent telles quelles
    new_bytes = {}
    for img in gltf.get('images', []):
        v = views[img['bufferView']]
        raw = body[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]
        im = Image.open(io.BytesIO(raw)).convert('RGB')
        if max(im.size) > SIZE:
            im = im.resize((SIZE, SIZE), Image.LANCZOS)
        out = io.BytesIO()
        im.save(out, 'JPEG', quality=86)
        new_bytes[img['bufferView']] = out.getvalue()
        img['mimeType'] = 'image/jpeg'
    blob = bytearray()
    for i, v in enumerate(views):
        chunk = new_bytes.get(i)
        if chunk is None:
            chunk = body[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]
        while len(blob) % 4:
            blob.append(0)
        v['byteOffset'] = len(blob)
        v['byteLength'] = len(chunk)
        blob += chunk
    while len(blob) % 4:
        blob.append(0)
    gltf['buffers'][0]['byteLength'] = len(blob)
    js = json.dumps(gltf, separators=(',', ':')).encode()
    while len(js) % 4:
        js += b' '
    total = 12 + 8 + len(js) + 8 + len(blob)
    out = struct.pack('<III', 0x46546C67, 2, total) + struct.pack('<II', len(js), 0x4E4F534A) + js + struct.pack('<II', len(blob), 0x004E4942) + bytes(blob)
    Path(path).write_bytes(out)
    print(f'{path} : {len(data) // 1024} Ko → {len(out) // 1024} Ko')


if __name__ == '__main__':
    for p in sys.argv[1:]:
        shrink(p)
