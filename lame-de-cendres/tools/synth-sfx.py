"""Les bruitages du jeu, synthétisés : aucune banque de sons, que des maths.

Usage : python3 tools/synth-sfx.py   (pip install numpy scipy)
Écrit assets/audio/sfx/<nom>.ogg (passe par ffmpeg).

Sifflements de lame : du bruit filtré dont la bande glisse. Métal (parade,
garde, cloche) : des partiels inharmoniques qui s'éteignent chacun à leur
rythme. Koto : une corde pincée de Karplus-Strong. Taiko : une membrane qui
descend en hauteur. Vent et feu : des boucles qui se raccordent.
"""
import subprocess
import tempfile
import wave
from pathlib import Path

import numpy as np
from scipy.signal import fftconvolve, lfilter

SR = 44100
OUT = Path(__file__).resolve().parent.parent / 'assets' / 'audio' / 'sfx'
rng = np.random.default_rng(7)


def t_axis(dur):
    return np.arange(int(dur * SR)) / SR


def env(dur, attack, decay, sustain=0.0, release=None):
    t = t_axis(dur)
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    d = np.exp(-np.maximum(t - attack, 0) / max(decay, 1e-4))
    e = a * (sustain + (1 - sustain) * d)
    if release:
        e *= np.clip((dur - t) / release, 0, 1)
    return e


def noise(dur):
    return rng.standard_normal(int(dur * SR))


def biquad(x, kind, f, q=0.707):
    """Un filtre biquadratique (passe-bas, passe-haut, passe-bande), fréquence fixe ou variable."""
    f = np.broadcast_to(np.asarray(f, dtype=float), x.shape)
    y = np.zeros_like(x)
    zi = np.zeros(2)
    step = max(64, len(x) // 400)
    for start in range(0, len(x), step):
        w0 = 2 * np.pi * min(f[start], SR * 0.45) / SR
        cw, sw = np.cos(w0), np.sin(w0)
        alpha = sw / (2 * q)
        if kind == 'lp':
            b = [(1 - cw) / 2, 1 - cw, (1 - cw) / 2]
        elif kind == 'hp':
            b = [(1 + cw) / 2, -(1 + cw), (1 + cw) / 2]
        else:
            b = [alpha, 0.0, -alpha]
        a = [1 + alpha, -2 * cw, 1 - alpha]
        y[start:start + step], zi = lfilter(b, a, x[start:start + step], zi=zi)
    return y


def partials(dur, base, ratios, decays, amps):
    t = t_axis(dur)
    s = np.zeros_like(t)
    for r, d, a in zip(ratios, decays, amps):
        s += a * np.sin(2 * np.pi * base * r * t + rng.uniform(0, 6)) * np.exp(-t / d)
    # on éteint la fin en douceur : pas de clic quand le son s'arrête
    return s * np.clip((dur - t) / (dur * 0.3), 0, 1)


def reverb(x, length=1.2, mix=0.3, damp=4000):
    ir = noise(length) * np.exp(-t_axis(length) / (length / 5))
    ir = biquad(ir, 'lp', damp)
    ir /= np.abs(ir).sum() ** 0.5 * 4
    wet = fftconvolve(x, ir)[: len(x) + int(length * SR * 0.6)]
    out = np.zeros(len(wet))
    out[: len(x)] += x * (1 - mix)
    out += wet * mix
    return out


def karplus(freq, dur, bright=0.5):
    n = int(SR / freq)
    buf = rng.uniform(-1, 1, n)
    out = np.zeros(int(dur * SR))
    for i in range(len(out)):
        out[i] = buf[i % n]
        buf[i % n] = 0.996 * (bright * buf[i % n] + (1 - bright) * buf[(i + 1) % n])
    return out


def taiko(dur=1.2, f0=95, f1=48):
    t = t_axis(dur)
    f = f1 + (f0 - f1) * np.exp(-t / 0.08)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.35)
    skin = biquad(noise(dur), 'lp', 900) * np.exp(-t / 0.03) * 0.6
    return body + skin


def whoosh(dur, f_from, f_to, q=1.2, attack=0.04, decay=0.12):
    f = np.geomspace(f_from, f_to, int(dur * SR))
    return biquad(noise(dur), 'bp', f, q) * env(dur, attack, decay) * 3.0


def thump(dur=0.35, f0=110, f1=45):
    t = t_axis(dur)
    f = f1 + (f0 - f1) * np.exp(-t / 0.05)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.12)


def delay(x, sec):
    return np.concatenate([np.zeros(int(sec * SR)), x])


def mix(*parts):
    """Additionne des sons de longueurs différentes."""
    out = np.zeros(max(len(x) for x in parts))
    for x in parts:
        out[: len(x)] += x
    return out


def norm(x, peak=0.9):
    x = x - np.mean(x)
    m = np.max(np.abs(x)) or 1.0
    return x / m * peak


def loopable(x, fade=0.6):
    n = int(fade * SR)
    head, tail = x[:n], x[-n:]
    w = np.linspace(0, 1, n)
    x = x[:-n].copy()
    x[:n] = head * w + tail * (1 - w)
    return x


def save(name, x, peak=0.9):
    OUT.mkdir(parents=True, exist_ok=True)
    x = norm(x, peak)
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
        path = f.name
    with wave.open(path, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype('<i2').tobytes())
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', path, '-c:a', 'libvorbis', '-q:a', '5', str(OUT / f'{name}.ogg')], check=True)
    Path(path).unlink()
    print(f'{name}.ogg')


def main():
    # les lames
    for i, (a, b) in enumerate([(700, 3200), (900, 2600), (600, 3800)]):
        save(f'lame-{i + 1}', whoosh(0.32, a, b, 1.4, 0.05, 0.1) + whoosh(0.32, a * 2, b * 1.5, 3, 0.06, 0.08) * 0.3, 0.75)
    save('lourd', whoosh(0.55, 300, 1800, 1.0, 0.16, 0.16) + thump(0.55, 70, 35) * 0.2, 0.85)
    save('tourbillon', whoosh(0.8, 400, 2400, 1.1, 0.25, 0.25) * (1 + 0.5 * np.sin(2 * np.pi * 6 * t_axis(0.8))), 0.85)
    # les impacts
    for i in range(3):
        d = 0.45
        flesh = biquad(noise(d), 'lp', 1400 + i * 300) * env(d, 0.002, 0.05) * 1.4
        squelch = biquad(noise(d), 'bp', np.geomspace(900, 300, int(d * SR)), 6) * env(d, 0.01, 0.09) * 1.2
        save(f'chair-{i + 1}', thump(d, 120 - i * 10, 50) * 0.9 + flesh + squelch, 0.95)
    save('sang', biquad(noise(0.5), 'bp', np.geomspace(1800, 400, int(0.5 * SR)), 2.5) * env(0.5, 0.005, 0.12) + biquad(noise(0.5), 'lp', 600) * env(0.5, 0.02, 0.2) * 0.6, 0.8)
    # le métal
    for i, base in enumerate([1180, 1020]):
        d = 1.6
        ring = partials(d, base, [1, 2.76, 5.4, 8.93, 13.3], [0.9, 0.5, 0.3, 0.18, 0.1], [1, 0.6, 0.45, 0.3, 0.2])
        click = biquad(noise(d), 'hp', 3000) * env(d, 0.001, 0.015) * 1.5
        save(f'parade-{i + 1}', reverb(ring * 0.8 + click, 1.4, 0.35, 6000), 0.9)
    d = 0.6
    save('garde', partials(d, 640, [1, 2.3, 4.1, 6.7], [0.18, 0.12, 0.08, 0.05], [1, 0.6, 0.4, 0.3]) + thump(d, 160, 60) * 0.5 + biquad(noise(d), 'bp', 2500, 1) * env(d, 0.001, 0.03), 0.85)
    d = 0.9
    scrape = biquad(noise(d), 'bp', np.geomspace(2500, 6500, int(d * SR)), 8) * env(d, 0.25, 0.25, 0.6, 0.15)
    save('degainer', mix(scrape, delay(partials(d - 0.55, 2100, [1, 2.7, 5.2], [0.35, 0.2, 0.1], [0.5, 0.3, 0.2]), 0.55)), 0.8)
    d = 0.7
    save('rengainer', mix(biquad(noise(d), 'bp', np.geomspace(6000, 2500, int(d * SR)), 8) * env(d, 0.2, 0.2, 0.5, 0.1), delay(biquad(noise(0.1), 'bp', 1500, 3) * env(0.1, 0.001, 0.02) * 2, 0.6)), 0.75)
    # le corps
    save('coup-pied', thump(0.4, 140, 55) + biquad(noise(0.4), 'lp', 900) * env(0.4, 0.002, 0.04) * 0.8, 0.9)
    save('chute', thump(0.8, 90, 40) * 1.2 + biquad(noise(0.8), 'lp', 500) * env(0.8, 0.01, 0.25) * 0.5, 0.85)
    for i in range(4):
        d = 0.16
        save(f'pas-{i + 1}', biquad(noise(d), 'bp', 900 + i * 180, 0.9) * env(d, 0.004, 0.035) + thump(d, 90, 60) * 0.15, 0.5)
    save('saut', whoosh(0.4, 500, 1400, 0.8, 0.15, 0.1) * 0.6, 0.6)
    save('reception', thump(0.35, 100, 45) + biquad(noise(0.35), 'lp', 700) * env(0.35, 0.003, 0.05) * 0.6, 0.75)
    # le bois
    d = 1.0
    cracks = np.zeros(int(d * SR))
    for k in range(14):
        at = int(rng.uniform(0, 0.25) * SR)
        burst = biquad(noise(0.05), 'bp', rng.uniform(800, 3000), 2) * env(0.05, 0.001, 0.01)
        cracks[at:at + len(burst)] += burst * rng.uniform(0.4, 1)
    save('porte', reverb(cracks + thump(d, 120, 50) * 1.2 + biquad(noise(d), 'lp', 400) * env(d, 0.01, 0.2) * 0.4, 0.8, 0.25), 0.95)
    d = 1.1
    t = t_axis(d)
    creak = biquad(np.sign(np.sin(2 * np.pi * np.cumsum(180 + 60 * np.sin(2 * np.pi * 3 * t)) / SR)) * 0.3, 'bp', 900, 4) * env(d, 0.1, 0.5, 0.4, 0.2)
    save('coffre', mix(creak, delay(thump(0.3, 150, 70) * 0.8, 0.8)), 0.8)
    # l'or et les objets
    d = 0.8
    coins = np.zeros(int(d * SR))
    for k in range(7):
        at = int(rng.uniform(0, 0.35) * SR)
        c = partials(0.4, rng.uniform(3200, 4800), [1, 2.4, 3.9], [0.08, 0.05, 0.03], [1, 0.5, 0.3])
        coins[at:at + len(c)] += c * rng.uniform(0.4, 1)
    save('pieces', coins, 0.7)
    save('objet', reverb(mix(karplus(523.25, 1.2, 0.6), delay(karplus(784.0, 1.11, 0.6) * 0.7, 0.09)), 1.2, 0.3), 0.7)
    save('boire', reverb(biquad(noise(0.6), 'bp', np.geomspace(400, 900, int(0.6 * SR)), 5) * (0.5 + 0.5 * np.sin(2 * np.pi * 9 * t_axis(0.6))) * env(0.6, 0.05, 0.2, 0.3, 0.1), 0.5, 0.2), 0.6)
    # les annonces : koto, taiko, gong, cloche
    insen = [293.66, 311.13, 392.0, 440.0, 466.16, 587.33]
    arp = np.zeros(int(3.2 * SR))
    for i, f in enumerate(insen):
        k = karplus(f, 2.2, 0.55)
        at = int(i * 0.13 * SR)
        arp[at:at + len(k)] += k * (1 - i * 0.08)
    save('decouverte', reverb(arp, 2.2, 0.35), 0.75)
    gong = partials(4.0, 140, [1, 1.47, 2.09, 2.56, 3.2], [2.5, 1.8, 1.2, 0.9, 0.6], [1, 0.7, 0.5, 0.35, 0.25])
    save('technique', reverb(mix(taiko(1.0) * 1.4, delay(gong * 0.7, 0.25)), 2.0, 0.3), 0.9)
    bell = partials(5.0, 220, [0.5, 1, 1.19, 1.56, 2.0, 2.74, 3.76], [3.5, 2.8, 2.2, 1.6, 1.2, 0.8, 0.5], [0.6, 1, 0.6, 0.5, 0.4, 0.3, 0.2])
    alarm = np.zeros(int(6 * SR))
    for k in range(3):
        at = int(k * 1.1 * SR)
        seg = bell[: len(alarm) - at]
        alarm[at:at + len(seg)] += seg * (1 - k * 0.15)
    save('alerte', reverb(alarm, 2.5, 0.3), 0.9)
    save('grace', reverb(mix(taiko(1.2, 80, 40) * 1.5, delay(partials(2.65, 1500, [1, 2.76, 5.4], [0.6, 0.3, 0.15], [0.6, 0.4, 0.2]), 0.05)), 1.8, 0.35), 0.95)
    # les cris de l'Oni
    d = 2.2
    t = t_axis(d)
    growl = biquad(noise(d), 'lp', 380) * (0.6 + 0.4 * np.sin(2 * np.pi * 28 * t)) * env(d, 0.25, 0.8, 0.4, 0.4)
    sub = np.sin(2 * np.pi * np.cumsum(55 + 15 * np.sin(2 * np.pi * 0.7 * t)) / SR) * env(d, 0.3, 1.0, 0.5, 0.4)
    save('oni', reverb(growl * 1.4 + sub, 1.6, 0.35, 2500), 0.95)
    # les ambiances en boucle
    d = 12.0
    t = t_axis(d)
    gust = 0.55 + 0.45 * np.sin(2 * np.pi * t / d * 3 + 1.3) * np.sin(2 * np.pi * t / d * 2)
    wind = biquad(noise(d), 'bp', 380 + 520 * gust, 0.6) * gust + biquad(noise(d), 'hp', 2500) * 0.08 * gust
    save('vent', loopable(wind, 1.5), 0.6)
    d = 8.0
    fire = biquad(noise(d), 'lp', 500) * 0.35
    for k in range(260):
        at = int(rng.uniform(0, d - 0.05) * SR)
        pop = biquad(noise(0.03), 'bp', rng.uniform(1500, 5000), 3) * env(0.03, 0.0005, 0.006)
        fire[at:at + len(pop)] += pop * rng.uniform(0.2, 1.2)
    save('feu', loopable(fire, 0.5), 0.6)
    # l'interface
    save('ui-clic', biquad(noise(0.08), 'bp', 2200, 3) * env(0.08, 0.001, 0.012) + partials(0.08, 1800, [1], [0.02], [0.3]), 0.5)
    save('ui-papier', biquad(noise(0.45), 'bp', 3500, 0.8) * env(0.45, 0.08, 0.15, 0.3, 0.1), 0.4)


if __name__ == '__main__':
    main()
