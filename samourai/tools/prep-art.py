"""Prépare les images brutes de kie.ai pour le jeu.

Usage : python3 tools/prep-art.py <nom> <brut> <genre>
  genre « texture » : raccord invisible dans les deux sens, 1024 px,
                      plus une carte de relief tirée de la luminance (<nom>-n.jpg)
  genre « ciel »    : raccord invisible de gauche à droite, 2560 px de large
  genre « affiche » : simple recadrage en 16:9, 1920 px de large
  genre « modele »  : planche de personnage pour Meshy, gardée en PNG dans assets/modeles/

Écrit le résultat dans assets/. Appelé par tools/kie-art.mjs."""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets'


def seam_weight(n, fade=0.22):
    """1 au centre, 0 sur les bords, une rampe douce sur fade de chaque côté."""
    d = np.minimum(np.arange(n), np.arange(n)[::-1]) / (n * fade)
    d = np.clip(d, 0, 1)
    return d * d * (3 - 2 * d)


def tile_axis(a, axis):
    """Mélange l'image avec sa copie décalée d'une demi-largeur : les bords
    viennent de la copie, qui se raccorde d'elle-même, et la couture de la
    copie tombe au centre, là où l'original l'emporte."""
    n = a.shape[axis]
    w = seam_weight(n)
    w = w[None, :, None] if axis == 1 else w[:, None, None]
    return a * w + np.roll(a, n // 2, axis=axis) * (1 - w)


def normal_map(rgb, strength=2.5):
    """Une carte de relief approchée : le clair ressort, le sombre se creuse."""
    h = rgb.mean(axis=2) / 255.0
    dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) * strength
    dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) * strength
    n = np.stack([-dx, dy, np.ones_like(h)], axis=2)
    n /= np.linalg.norm(n, axis=2, keepdims=True)
    return Image.fromarray(((n * 0.5 + 0.5) * 255).astype(np.uint8))


def crop_to(img, ratio):
    w, h = img.size
    if w / h > ratio:
        nw = round(h * ratio)
        return img.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    nh = round(w / ratio)
    return img.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))


def main():
    name, raw, kind = sys.argv[1:4]
    img = Image.open(raw).convert('RGB')
    OUT.mkdir(exist_ok=True)
    if kind == 'texture':
        img = crop_to(img, 1).resize((1024, 1024), Image.LANCZOS)
        a = np.asarray(img, dtype=np.float32)
        a = tile_axis(tile_axis(a, 1), 0)
        img = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
        img.save(OUT / f'{name}.jpg', quality=84)
        blurred = np.asarray(img.resize((512, 512), Image.LANCZOS), dtype=np.float32)
        normal_map(blurred).save(OUT / f'{name}-n.jpg', quality=82)
    elif kind == 'ciel':
        w = 2560
        img = img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)
        a = tile_axis(np.asarray(img, dtype=np.float32), 1)
        Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(OUT / f'{name}.jpg', quality=84)
    elif kind == 'affiche':
        crop_to(img, 16 / 9).resize((1920, 1080), Image.LANCZOS).save(OUT / f'{name}.jpg', quality=82)
    elif kind == 'modele':
        (OUT / 'modeles').mkdir(exist_ok=True)
        img.save(OUT / 'modeles' / f'{name}.png', optimize=True)
    else:
        sys.exit(f'Genre inconnu : {kind}')


if __name__ == '__main__':
    main()
