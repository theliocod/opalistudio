"""Prépare une image brute de kie.ai pour la version Godot.

Usage : python3 tools/prep-art.py <nom> <brut> <genre>
  grille    : planche 2x2 d'icônes → assets/kie/<nom>-0..3.png (256 px)
  bandes    : six rangées → assets/kie/<nom>-0..5.png, recadrées sur le sabre
  feuillage : fond blanc détouré → assets/kie/<nom>.png avec transparence
  texture   : raccord invisible dans les deux sens → assets/kie/<nom>.jpg + <nom>-n.jpg
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

OUT = Path(__file__).resolve().parent.parent / 'assets' / 'kie'


def seam_weight(n, fade=0.22):
    d = np.clip(np.minimum(np.arange(n), np.arange(n)[::-1]) / (n * fade), 0, 1)
    return d * d * (3 - 2 * d)


def tile_axis(a, axis):
    n = a.shape[axis]
    w = seam_weight(n)
    w = w[None, :, None] if axis == 1 else w[:, None, None]
    return a * w + np.roll(a, n // 2, axis=axis) * (1 - w)


def normal_map(rgb, strength=2.5):
    h = rgb.mean(axis=2) / 255.0
    dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) * strength
    dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) * strength
    n = np.stack([-dx, dy, np.ones_like(h)], axis=2)
    n /= np.linalg.norm(n, axis=2, keepdims=True)
    return Image.fromarray(((n * 0.5 + 0.5) * 255).astype(np.uint8))


def square(img):
    w, h = img.size
    s = min(w, h)
    return img.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s))


def main():
    name, raw, kind = sys.argv[1:4]
    OUT.mkdir(parents=True, exist_ok=True)
    img = Image.open(raw).convert('RGB')
    if kind == 'grille':
        img = square(img).resize((1024, 1024), Image.LANCZOS)
        for i in range(4):
            x, y = (i % 2) * 512, (i // 2) * 512
            img.crop((x, y, x + 512, y + 512)).resize((256, 256), Image.LANCZOS).save(OUT / f'{name}-{i}.png', optimize=True)
    elif kind == 'bandes':
        # chaque sabre est une bande d'encre séparée des autres par du fond :
        # on cherche les six bandes les plus marquées plutôt que de couper au hasard
        a = np.asarray(img, dtype=np.float32)
        bg = np.median(a[:8, :8].reshape(-1, 3), axis=0)
        ink = np.abs(a - bg).sum(axis=2) > 70
        rows = ink.sum(axis=1)
        on = rows > a.shape[1] * 0.02
        bands, start = [], None
        for y, v in enumerate(np.append(on, False)):
            if v and start is None:
                start = y
            elif not v and start is not None:
                bands.append((start, y, rows[start:y].sum()))
                start = None
        # on fusionne les éclats trop proches (flammes au-dessus d'une lame)
        merged = []
        for b in bands:
            if merged and b[0] - merged[-1][1] < a.shape[0] * 0.012:
                m = merged.pop()
                b = (m[0], b[1], m[2] + b[2])
            merged.append(b)
        best = sorted(sorted(merged, key=lambda b: -b[2])[:6], key=lambda b: b[0])
        for i, (y0, y1, _) in enumerate(best):
            xs = np.nonzero(ink[y0:y1].any(axis=0))[0]
            pad = 10
            box = (max(xs.min() - pad, 0), max(y0 - pad, 0), min(xs.max() + pad, a.shape[1]), min(y1 + pad, a.shape[0]))
            crop = img.crop(box)
            crop.thumbnail((640, 160), Image.LANCZOS)
            crop.save(OUT / f'{name}-{i}.png', optimize=True)
    elif kind == 'feuillage':
        img = square(img).resize((1024, 1024), Image.LANCZOS)
        a = np.asarray(img, dtype=np.float32)
        d = np.sqrt(((255 - a) ** 2).sum(axis=2))
        alpha = np.clip((d - 25) / 50, 0, 1)
        # on retire le halo blanc des bords : la couleur ne garde que la feuille
        rgb = np.clip((a - 255 * (1 - alpha[..., None])) / np.maximum(alpha[..., None], 0.05), 0, 255)
        out = np.dstack([rgb, alpha * 255]).astype(np.uint8)
        Image.fromarray(out, 'RGBA').save(OUT / f'{name}.png', optimize=True)
    elif kind == 'texture':
        img = square(img).resize((1024, 1024), Image.LANCZOS)
        a = tile_axis(tile_axis(np.asarray(img, dtype=np.float32), 1), 0)
        img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
        img.save(OUT / f'{name}.jpg', quality=84)
        normal_map(np.asarray(img.resize((512, 512), Image.LANCZOS), dtype=np.float32)).save(OUT / f'{name}-n.jpg', quality=82)
    else:
        sys.exit(f'Genre inconnu : {kind}')
    (OUT / f'{name}.done').write_text('ok\n')


if __name__ == '__main__':
    main()
