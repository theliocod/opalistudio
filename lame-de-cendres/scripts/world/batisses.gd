## Les bâtisses : les maisons de ville à étage (machiya), les portes de ville,
## les murs de plâtre coiffés de tuiles, le dojo, les sanctuaires, le puits,
## les fermes au toit de chaume. Chacune est montée pièce à pièce sur un
## Chantier (poteaux, poutres, claire-voie, tuiles rondes, faîtage) puis fondue
## en un seul maillage : on peut y mettre beaucoup de détails.
class_name Batisses
extends Landmarks

var kit := {}
var banners: Array = []        # les nobori que le vent fait claquer
var _wind_mat: ShaderMaterial
static var _stripes: ImageTexture


## Les matières des bâtisses, créées une fois.
func _k() -> Dictionary:
	if not kit.is_empty():
		return kit
	kit.platre = _tex("kie/platre", Color(0.8, 0.76, 0.68), 0.92)
	kit.platre.uv1_scale = Vector3(0.45, 0.45, 1)
	kit.terre = _tex("kie/platre", Color(0.55, 0.43, 0.3), 0.96)
	kit.terre.uv1_scale = Vector3(0.6, 0.6, 1)
	kit.planches = _tex("kie/planches", Color(1.9, 1.7, 1.5), 0.85)
	kit.planches.uv1_scale = Vector3(0.5, 0.5, 1)
	kit.tuiles = _tex("kie/tuiles", Color(1, 1, 1), 0.42)
	kit.chaume = _tex("kie/chaume", Color(0.8, 0.66, 0.48), 1.0)
	kit.chaume.uv1_scale = Vector3(0.8, 0.8, 1)
	kit.tatami = _tex("kie/tatami", Color(0.8, 0.76, 0.62), 0.95)
	kit.tatami.uv1_scale = Vector3(0.55, 0.55, 1)
	kit.kawara = _plain(Color(0.17, 0.175, 0.2), 0.55)
	kit.poutre = _tex("laque", Color(0.3, 0.2, 0.16), 0.75)
	kit.poutre.uv1_scale = Vector3(0.7, 0.7, 1)
	kit.vermillon = _tex("laque", Color(1.3, 0.6, 0.45), 0.55)
	kit.sous = _plain(Color(0.11, 0.075, 0.055), 0.9)
	kit.sombre = _plain(Color(0.025, 0.02, 0.018), 1.0)
	kit.shoji = _glow(Color(0.82, 0.77, 0.64), 0.1)
	kit.lueur = _glow(Color(0.95, 0.88, 0.7), 0.6)
	kit.bambou = _plain(Color(0.45, 0.38, 0.2), 0.6)
	kit.fer = _plain(Color(0.07, 0.07, 0.08), 0.45, 0.8)
	kit.blanc = _plain(Color(0.86, 0.84, 0.78), 0.9)
	kit.feuillage = _plain(Color(0.09, 0.16, 0.07), 0.9)
	kit.cedre = _plain(Color(0.2, 0.17, 0.08), 1.0)
	kit.pot = _plain(Color(0.32, 0.17, 0.1), 0.7)
	kit.seau = _plain(Color(0.5, 0.09, 0.05), 0.6)
	kit.corde = mats.corde
	kit.or = mats.or
	kit.pierre = mats.pierre
	kit.inuyarai = _inuyarai_mat()
	kit.enseignes = []
	kit.noren = []
	kit.plaques = []
	for i in 4:
		kit.enseignes.append(_cutout("kie/enseignes-%d" % i, false))
		kit.noren.append(_cutout("kie/noren-%d" % i, true))
		kit.plaques.append(_cutout("kie/plaques-%d" % i, false))
	kit.roof = {"tiles": kit.tuiles, "ribs": kit.kawara, "under": kit.sous, "edge": kit.poutre, "gable": kit.platre, "gold": mats.or}
	kit.coping = {"tiles": kit.tuiles, "under": kit.sous, "edge": kit.poutre}
	kit.thatch = {"tiles": kit.chaume, "under": kit.sous, "edge": kit.chaume, "gable": kit.terre}
	_wind_mat = ShaderMaterial.new()
	_wind_mat.shader = load("res://scripts/world/banner.gdshader")
	# les matières des villes
	mats.papier = kit.lueur
	mats.rouge = _plain(Color(0.55, 0.07, 0.05), 0.6)
	mats.chochin = _plain(Color(0.9, 0.2, 0.1), 0.8)
	mats.chochin.emission_enabled = true
	mats.chochin.emission = Color(1.0, 0.25, 0.08)
	mats.chochin.emission_energy_multiplier = 1.6
	mats.platre = kit.platre
	mats.fer = kit.fer
	mats.paille = _plain(Color(0.42, 0.34, 0.18), 1.0)
	return kit


func _glow(c: Color, e: float) -> StandardMaterial3D:
	var m := _plain(c, 0.9)
	m.emission_enabled = true
	m.emission = Color(1.0, 0.62, 0.3)
	m.emission_energy_multiplier = e
	return m


## Une image détourée (enseigne, noren, plaque) posée sur un panneau.
func _cutout(name: String, both: bool) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_texture = load("res://assets/%s.png" % name)
	m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA_SCISSOR
	m.alpha_scissor_threshold = 0.5
	m.roughness = 0.85
	if both:
		m.cull_mode = BaseMaterial3D.CULL_DISABLED
	return m


## Les lattes de bambou de l'inuyarai : des bandes et des jours, peints une fois.
func _inuyarai_mat() -> StandardMaterial3D:
	if _stripes == null:
		var img := Image.create(64, 8, false, Image.FORMAT_RGBA8)
		for x in 64:
			var k := x % 8
			for y in 8:
				if k < 6:
					var shade := 0.75 + 0.25 * sin(float(k) / 5.0 * PI)
					img.set_pixel(x, y, Color(0.48 * shade, 0.4 * shade, 0.22 * shade, 1.0))
				else:
					img.set_pixel(x, y, Color(0, 0, 0, 0))
		img.generate_mipmaps()
		_stripes = ImageTexture.create_from_image(img)
	var m := StandardMaterial3D.new()
	m.albedo_texture = _stripes
	m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA_SCISSOR
	m.alpha_scissor_threshold = 0.5
	m.cull_mode = BaseMaterial3D.CULL_DISABLED
	m.roughness = 0.6
	return m


func _chantier() -> Chantier:
	var c := Chantier.new()
	c.grain = [_k().poutre, _k().vermillon]
	return c


## Une boîte de collision dans le repère de g.
func _solid(g: Node3D, pos: Vector3, size: Vector3, rot_y := 0.0) -> void:
	var s := BoxShape3D.new()
	s.size = size
	_collide(s, g.global_transform * Transform3D(Basis(Vector3.UP, rot_y), pos))


# ---------- Les pièces communes ----------

## Un mur entre deux points (dans le plan du sol, coordonnées du bâtiment) :
## soubassement de planches, plâtre au-dessus, des poutres (nuki) qui le
## traversent, un poteau tous les 1,8 m. out : de quel côté est la rue.
func _mur(c: Chantier, a: Vector3, b: Vector3, y0: float, y1: float, mid := -1.0, boards := 0.85, plaster: Material = null) -> void:
	var k := _k()
	var pl: Material = plaster if plaster else k.platre
	var d := b - a
	var L := d.length()
	var ry := atan2(-d.z, d.x)
	var m := (a + b) / 2.0
	var r := Vector3(0, ry, 0)
	c.box(k.planches, m + Vector3(0, y0 + boards / 2, 0), Vector3(L, boards, 0.16), r)
	c.box(pl, m + Vector3(0, (y0 + boards + y1) / 2, 0), Vector3(L, y1 - y0 - boards, 0.13), r)
	c.box(k.poutre, m + Vector3(0, y0 + boards, 0), Vector3(L, 0.09, 0.18), r)
	c.box(k.poutre, m + Vector3(0, y1 - 0.07, 0), Vector3(L, 0.14, 0.19), r)
	if mid > 0.0:
		c.box(k.poutre, m + Vector3(0, mid, 0), Vector3(L, 0.16, 0.19), r)
	var n := maxi(1, roundi(L / 1.8))
	for i in n + 1:
		var p := a.lerp(b, float(i) / n)
		c.box(k.poutre, Vector3(p.x, (y0 + y1) / 2, p.z), Vector3(0.15, y1 - y0, 0.17), r)


## La barrière de bambou courbe au pied des façades (inuyarai).
func _inuyarai(c: Chantier, x0: float, x1: float, front: float, y0: float) -> void:
	var k := _k()
	var pts := PackedVector3Array()
	var uvs := PackedVector2Array()
	for r in 7:
		var a := PI / 2 * float(r) / 6.0
		for x: float in [x0 + 0.04, x1 - 0.04]:
			pts.append(Vector3(x, y0 - 0.3 + 1.05 * sin(a), front + 0.08 + 0.55 * cos(a)))
			uvs.append(Vector2(x / 0.4, a))
	c.sheet(k.inuyarai, pts, uvs, 2, Vector3(0, 0.6, 1))
	for a: float in [0.12, 0.75, 1.25]:
		c.cyl(k.bambou, Vector3((x0 + x1) / 2, y0 - 0.3 + 1.05 * sin(a), front + 0.1 + 0.55 * cos(a)), 0.016, 0.016, x1 - x0 - 0.06, Vector3(0, 0, PI / 2), 5, false)


## Une enseigne debout (kanban) sur son petit pied.
func _kanban(c: Chantier, pos: Vector3, i: int, rot_y := 0.0) -> void:
	var k := _k()
	var r := Vector3(0, rot_y, 0)
	var f := Basis(Vector3.UP, rot_y) * Vector3(0, 0, 1)
	c.box(k.poutre, pos + Vector3(0, 0.95, 0), Vector3(0.42, 1.3, 0.06), r)
	c.panel(k.enseignes[i], pos + Vector3(0, 0.95, 0) + f * 0.035, Vector2(0.38, 1.2), r)
	c.box(k.poutre, pos + Vector3(0, 0.15, 0), Vector3(0.5, 0.3, 0.3), r)
	c.box(k.kawara, pos + Vector3(0, 1.66, 0), Vector3(0.52, 0.06, 0.16), r)


## Le noren : les rideaux fendus suspendus à leur perche, au-dessus d'une entrée.
func _noren(c: Chantier, cx: float, top: float, z: float, w: float, i: int) -> void:
	var k := _k()
	c.panel(k.noren[i], Vector3(cx, top - 0.5, z), Vector2(w, 0.95), Vector3.ZERO, true)
	c.cyl(k.bambou, Vector3(cx, top - 0.02, z), 0.018, 0.018, w + 0.2, Vector3(0, 0, PI / 2), 6, false)


## Les seaux à incendie empilés en pyramide (tenbō-oke) et leur tonneau d'eau.
func _seaux(c: Chantier, pos: Vector3) -> void:
	var k := _k()
	c.cyl(k.poutre, pos + Vector3(0, 0.38, 0), 0.32, 0.3, 0.76, Vector3.ZERO, 10)
	c.cyl(k.fer, pos + Vector3(0, 0.62, 0), 0.325, 0.325, 0.05, Vector3.ZERO, 10, false)
	c.cyl(k.fer, pos + Vector3(0, 0.14, 0), 0.31, 0.31, 0.05, Vector3.ZERO, 10, false)
	var at := pos + Vector3(0, 0.78, 0)
	for row in 3:
		var n := 3 - row
		for i in n:
			c.cyl(k.seau, at + Vector3((i - (n - 1) / 2.0) * 0.21, 0.1 + row * 0.19, 0), 0.1, 0.08, 0.19, Vector3.ZERO, 7)


## Quelques pots de plantes alignés contre une façade.
func _pots(c: Chantier, pos: Vector3, n: int, dir: Vector3) -> void:
	var k := _k()
	for i in n:
		var p := pos + dir * (i * 0.45) + Vector3(0, 0, _rng.randf_range(-0.05, 0.05))
		var r := _rng.randf_range(0.13, 0.2)
		c.cyl(k.pot, p + Vector3(0, r, 0), r, r * 0.7, r * 2.0, Vector3.ZERO, 8)
		c.cyl(k.feuillage, p + Vector3(0, r * 2.0 + 0.18, 0), 0.04, r * 1.5, 0.45, Vector3.ZERO, 7)
		c.cyl(k.feuillage, p + Vector3(0, r * 2.0 + 0.48, 0), 0.0, r * 1.0, 0.35, Vector3.ZERO, 7)


## Une pile de bois de chauffe.
func _bois(c: Chantier, pos: Vector3, rot_y: float) -> void:
	var k := _k()
	var bs := Basis(Vector3.UP, rot_y)
	for row in 4:
		for i in 6 - row:
			var p := pos + bs * Vector3((i - (5 - row) / 2.0) * 0.17, 0.09 + row * 0.15, 0)
			c.cyl(k.poutre, p, 0.08, 0.08, 0.7, Vector3(PI / 2, rot_y, 0), 6)


# ---------- La maison de ville ----------

## Une maison de ville (machiya) à étage bas : socle de pierre, poteaux et
## poutres, claire-voie (kōshi) devant le papier éclairé, barrière de bambou
## courbe (inuyarai), auvent de tuiles entre les étages, fenêtres à barreaux de
## plâtre (mushiko-mado), grand toit à pignon et son faîte.
## opts : open (la façade ouverte d'une taverne), noren (0 à 3), sign (-1 ou 0
## à 3), lantern, light (le papier éclairé), h (le rez-de-chaussée), props,
## etage (false : de plain-pied), chaume (un toit de chaume plutôt que de tuiles).
func _machiya(parent: Node3D, pos: Vector3, rot_y: float, w: float, d: float, opts := {}) -> Node3D:
	var k := _k()
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.rotation.y = rot_y
	var c := _chantier()
	var H1: float = opts.get("h", 2.7)
	var y0 := 0.32
	var y1 := y0 + H1
	var etage: bool = opts.get("etage", true)
	var ye := y1 + 1.55 if etage else y1
	var front := d / 2.0
	var open: bool = opts.get("open", false)
	var paper: Material = k.lueur if opts.get("light", true) else k.shoji
	c.box(k.pierre, Vector3(0, y0 - 0.5, 0), Vector3(w + 0.36, 1.0, d + 0.36))
	# les murs des côtés et du fond, sur deux niveaux
	var mid := y1 if etage else -1.0
	_mur(c, Vector3(-w / 2 + 0.07, 0, front - 0.1), Vector3(-w / 2 + 0.07, 0, -front + 0.07), y0, ye, mid)
	_mur(c, Vector3(w / 2 - 0.07, 0, -front + 0.07), Vector3(w / 2 - 0.07, 0, front - 0.1), y0, ye, mid)
	_mur(c, Vector3(-w / 2 + 0.07, 0, -front + 0.07), Vector3(w / 2 - 0.07, 0, -front + 0.07), y0, ye, mid)
	# la façade en travées d'environ 1,8 m
	var bays := maxi(2, roundi(w / 1.8))
	var xs: Array[float] = []
	for i in bays + 1:
		xs.append(lerpf(-w / 2 + 0.09, w / 2 - 0.09, float(i) / bays))
	for x in xs:
		c.box(k.poutre, Vector3(x, (y0 + ye) / 2, front - 0.09), Vector3(0.18, ye - y0, 0.18))
	var door: int = opts.get("door", bays / 2)
	var nidx: int = opts.get("noren", 0)
	for i in bays:
		var x0 := xs[i] + 0.09
		var x1 := xs[i + 1] - 0.09
		var bw := x1 - x0
		var cx := (x0 + x1) / 2.0
		if open:
			continue
		if i == door:
			# l'entrée : le sol de terre battue, la pénombre, la porte coulissante à moitié tirée, le noren
			c.box(k.sombre, Vector3(cx, (y0 + y1) / 2, front - 1.3), Vector3(bw, y1 - y0, 0.08))
			for x: float in [x0, x1]:
				c.box(k.sombre, Vector3(x, (y0 + y1) / 2, front - 0.7), Vector3(0.05, y1 - y0, 1.2))
			c.box(k.sous, Vector3(cx, y1 - 0.38, front - 0.7), Vector3(bw, 0.05, 1.2))
			c.box(k.pierre, Vector3(cx, y0 - 0.12, front + 0.28), Vector3(bw * 0.7, 0.24, 0.42))
			c.box(k.planches, Vector3(x0 + bw * 0.27, (y0 + y1 - 0.4) / 2, front - 0.14), Vector3(bw * 0.52, y1 - y0 - 0.4, 0.05))
			c.box(k.poutre, Vector3(x0 + bw * 0.27, y1 - 0.42, front - 0.14), Vector3(bw * 0.54, 0.05, 0.07))
			c.box(k.platre, Vector3(cx, y1 - 0.18, front - 0.06), Vector3(bw, 0.36, 0.1))
			c.box(k.poutre, Vector3(cx, y1 - 0.38, front - 0.02), Vector3(bw, 0.08, 0.14))
			_noren(c, cx, y1 - 0.42, front + 0.07, bw * 0.92, nidx)
		else:
			# la claire-voie : planches en bas, lattes serrées devant le papier
			var ya := y0 + 0.6
			var yb := y1 - 0.42
			c.box(k.planches, Vector3(cx, (y0 + ya) / 2, front - 0.06), Vector3(bw, ya - y0, 0.08))
			c.box(paper, Vector3(cx, (ya + yb) / 2, front - 0.12), Vector3(bw, yb - ya, 0.03))
			c.box(k.poutre, Vector3(cx, ya, front - 0.02), Vector3(bw, 0.06, 0.1))
			c.box(k.poutre, Vector3(cx, yb, front - 0.02), Vector3(bw, 0.07, 0.1))
			var n := int(bw / 0.072)
			c.detail = true
			for j in n:
				c.box(k.poutre, Vector3(x0 + (j + 0.5) * bw / n, (ya + yb) / 2, front - 0.02), Vector3(0.026, yb - ya, 0.045))
			_inuyarai(c, x0, x1, front, y0)
			c.detail = false
			c.box(k.platre, Vector3(cx, (yb + y1) / 2, front - 0.08), Vector3(bw, y1 - yb, 0.1))
	# la poutre de l'étage et l'auvent de tuiles qui court sur la façade
	c.box(k.poutre, Vector3(0, y1, front - 0.02), Vector3(w + 0.1, 0.22, 0.24))
	if etage:
		c.roof(Vector3(0, y1 + 0.12, front), w / 2 + 0.18, 0.95, 0.42, k.roof, {"sides": [1.0], "ridge": false, "up": 0.03, "thick": 0.1})
		c.box(k.kawara, Vector3(0, y1 + 0.56, front + 0.02), Vector3(w + 0.3, 0.08, 0.12))
	# l'étage bas : plâtre et fenêtres à barreaux
	var yu := y1 + 0.12
	if etage:
		c.box(k.platre, Vector3(0, (yu + ye) / 2, front - 0.1), Vector3(w - 0.2, ye - yu, 0.13))
		c.box(k.poutre, Vector3(0, ye - 0.07, front - 0.05), Vector3(w + 0.1, 0.16, 0.22))
	var nw := (1 if w < 6.6 else 2) if etage else 0
	var ww := minf(2.2, w * 0.34)
	var wy := (yu + 0.55 + ye) / 2
	var wh := (ye - yu) * 0.46
	for i in nw:
		var wx := 0.0 if nw == 1 else (-w / 4.0 + i * w / 2.0)
		c.box(paper if i == 0 else k.shoji, Vector3(wx, wy, front - 0.1), Vector3(ww, wh, 0.04))
		c.box(k.blanc, Vector3(wx, wy + wh / 2 + 0.05, front - 0.02), Vector3(ww + 0.2, 0.1, 0.12))
		c.box(k.blanc, Vector3(wx, wy - wh / 2 - 0.05, front - 0.02), Vector3(ww + 0.2, 0.1, 0.14))
		var nb := int(ww / 0.13)
		c.detail = true
		for j in nb:
			c.cyl(k.blanc, Vector3(wx - ww / 2 + (j + 0.5) * ww / nb, wy, front - 0.03), 0.04, 0.04, wh, Vector3.ZERO, 6, false)
		c.detail = false
	# le grand toit à pignon, ses tuiles rondes, son faîte ; les pignons de plâtre
	var B := front + 0.8
	if opts.get("chaume", false):
		B = front + 0.9
		c.roof(Vector3(0, ye, 0), w / 2 + 0.6, B, B * 0.8, k.thatch, {"up": 0.0, "bend": 1.05, "thick": 0.4, "ridge": false})
		c.box(k.poutre, Vector3(0, ye + B * 0.8 + 0.08, 0), Vector3(w + 1.3, 0.2, 0.34))
	else:
		c.roof(Vector3(0, ye, 0), w / 2 + 0.42, B, B * 0.42, k.roof, {"up": 0.07, "thick": 0.18})
	for sx: float in [-1.0, 1.0]:
		c.gable(k.platre, sx * (w / 2 - 0.06), -front, front, ye - 0.05, Vector3(sx, 0, 0), 0.4 if opts.get("chaume", false) else 0.18)
		c.box(k.poutre, Vector3(sx * (w / 2 - 0.02), ye + 0.55, 0), Vector3(0.1, 0.12, d * 0.7))
		c.box(k.poutre, Vector3(sx * (w / 2 - 0.02), ye + 0.5, 0), Vector3(0.1, 1.0, 0.12))
	# la façade ouverte d'une taverne : le plafond, le sol de terre et l'estrade de tatamis
	if open:
		c.box(k.sous, Vector3(0, y1 - 0.12, 0), Vector3(w - 0.2, 0.08, d - 0.2))
		for i in 3:
			_noren(c, -w / 3.0 + i * w / 3.0, y1 - 0.25, front + 0.07, w / 3.0 - 0.15, nidx)
		# la boule de cèdre (sugidama) : ici on brasse et on sert le saké
		c.cyl(k.poutre, Vector3(w / 2 - 0.6, y1 - 0.25, front + 0.6), 0.02, 0.02, 0.5, Vector3.ZERO, 4, false)
		for j in 3:
			c.cyl(k.cedre, Vector3(w / 2 - 0.6, y1 - 0.75, front + 0.6), 0.3 - absf(j - 1) * 0.1, 0.3 - absf(j - 1) * 0.1, 0.62 - absf(j - 1) * 0.25, Vector3(0, j * 0.6, 0), 9)
	# les abords : l'enseigne, les seaux à incendie, les pots, le bois de chauffe
	c.detail = true
	var sign: int = opts.get("sign", -1)
	if sign >= 0:
		_kanban(c, Vector3(xs[door] - 0.45 if door > 0 else xs[door + 1] + 0.45, y0 - 0.32, front + 0.75), sign)
	if opts.get("props", true):
		if _rng.randf() < 0.6:
			_seaux(c, Vector3(w / 2 - 0.45, y0 - 0.32, front + 0.75))
		if _rng.randf() < 0.7:
			_pots(c, Vector3(-w / 2 + 0.35, y0 - 0.32, front + 0.75), 2 + _rng.randi() % 3, Vector3(1, 0, 0))
		if _rng.randf() < 0.6:
			_bois(c, Vector3(-w / 2 - 0.45, y0 - 0.32, -front + 1.2), PI / 2)
	c.detail = false
	c.build(g, "Machiya")
	# les volumes qui arrêtent le joueur
	if open:
		_solid(g, Vector3(-w / 2 + 0.07, (y0 + ye) / 2, 0), Vector3(0.2, ye, d))
		_solid(g, Vector3(w / 2 - 0.07, (y0 + ye) / 2, 0), Vector3(0.2, ye, d))
		_solid(g, Vector3(0, (y0 + ye) / 2, -front + 0.07), Vector3(w, ye, 0.2))
		_solid(g, Vector3(0, y0 - 0.25, 0), Vector3(w + 0.36, 0.9, d + 0.36))
	else:
		_solid(g, Vector3(0, (ye + y0 - 0.6) / 2, 0), Vector3(w + 0.2, ye - y0 + 0.6, d + 0.2))
	if opts.get("lantern", true):
		_chochin(g, Vector3(w / 2 - 0.5, y1 - 0.2, front + 0.95), opts.get("light", true))
	return g


# ---------- Les lanternes et les bannières ----------

## Une lanterne de papier rouge suspendue, avec sa lumière.
func _chochin(parent: Node3D, pos: Vector3, light := true) -> void:
	_k()
	var s := SphereMesh.new(); s.radius = 0.22; s.height = 0.52; s.radial_segments = 10; s.rings = 6
	var ball := _place(parent, s, mats.chochin, pos)
	ball.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	var top := _cyl(parent, pos + Vector3(0, 0.3, 0), 0.12, 0.12, 0.06, mats.fer, false)
	var bottom := _cyl(parent, pos - Vector3(0, 0.3, 0), 0.12, 0.12, 0.06, mats.fer, false)
	for part in [ball, top, bottom]:
		part.layers = LAMP_LAYER
	var l: OmniLight3D = null
	if light:
		l = _light(parent, pos - Vector3(0, 0.15, 0), Color(1.0, 0.35, 0.12), 1.25, 6.5)
		l.omni_attenuation = 2.0
	lamps.append({"pos": ball.global_position, "light": l, "flames": [ball, top, bottom], "kind": "papier", "lit": true})


# ---------- Les murs et les portes ----------

## Un mur d'enceinte de plâtre (tsuiji-bei) : socle de pierre, poteaux, et un
## petit toit de tuiles qui le coiffe. Trop haut pour être enjambé.
func _enceinte(c: Chantier, a: Vector2, b: Vector2, h := 3.4) -> void:
	var k := _k()
	var n := maxi(1, int(a.distance_to(b) / 4.5))
	for i in n:
		var p0 := a.lerp(b, float(i) / n)
		var p1 := a.lerp(b, float(i + 1) / n)
		var mid := (p0 + p1) / 2.0
		var y := minf(terrain.height_at(p0.x, p0.y), terrain.height_at(p1.x, p1.y)) - 0.25
		var len := p0.distance_to(p1) + 0.12
		var rot := atan2(p1.x - p0.x, p1.y - p0.y) + PI / 2
		c.xf = Transform3D(Basis(Vector3.UP, rot), Vector3(mid.x, y, mid.y))
		c.box(k.pierre, Vector3(0, 0.45, 0), Vector3(len, 1.3, 0.95))
		c.box(k.platre, Vector3(0, 1.1 + (h - 1.1) / 2, 0), Vector3(len, h - 1.1, 0.55))
		for j in 3:
			c.box(k.blanc, Vector3(0, h - 0.55 - j * 0.24, 0), Vector3(len, 0.05, 0.57))
		c.box(k.poutre, Vector3(-len / 2 + 0.06, 1.1 + (h - 1.1) / 2, 0), Vector3(0.2, h - 1.1, 0.62))
		c.box(k.poutre, Vector3(0, h - 0.05, 0), Vector3(len, 0.1, 0.7))
		c.roof(Vector3(0, h + 0.02, 0), len / 2 + 0.02, 0.62, 0.34, k.coping, {"thick": 0.09, "up": 0.0, "ends": false, "hafu": false})
		var s := BoxShape3D.new()
		s.size = Vector3(len, h + 0.4, 0.8)
		_collide(s, Transform3D(Basis(Vector3.UP, rot), Vector3(mid.x, y + (h + 0.4) / 2, mid.y)))
	c.xf = Transform3D.IDENTITY


## La grande porte de ville (yaguramon) : piliers massifs, battants cloutés de
## fer ouverts vers l'intérieur, une salle de guet à l'étage, toit irimoya.
## plaque : le nom gravé au-dessus du passage (1 : Hōjō, 2 : Akagane).
func _gate(parent: Node3D, pos: Vector3, rot_y: float, banner: Color, plaque := 1) -> void:
	var k := _k()
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.rotation.y = rot_y
	var c := _chantier()
	for s: float in [-1.0, 1.0]:
		c.box(k.pierre, Vector3(s * 3.45, 0.1, -0.1), Vector3(1.4, 1.0, 2.0))
		c.box(k.poutre, Vector3(s * 3.45, 2.85, 0.35), Vector3(0.62, 4.6, 0.62))
		c.box(k.poutre, Vector3(s * 3.45, 2.85, -0.6), Vector3(0.46, 4.6, 0.46))
		for y: float in [1.1, 3.9]:
			c.box(k.fer, Vector3(s * 3.45, y, 0.35), Vector3(0.66, 0.08, 0.66))
		c.box(k.poutre, Vector3(s * 3.45, 1.6, -0.12), Vector3(0.22, 0.2, 1.0))
		# les battants, ouverts vers l'intérieur, cloutés et cerclés de fer
		var hinge := Vector3(s * 3.1, 0.55, 0.15)
		var phi := 1.25
		var dir := Vector3(-s * cos(phi), 0, -sin(phi))
		var bs := Basis(Vector3.UP, atan2(-dir.z, dir.x))
		var mid := hinge + dir * 1.27 + Vector3(0, 2.05, 0)
		c.boxb(k.planches, mid, Vector3(2.5, 4.1, 0.14), bs)
		for y: float in [-1.5, 0.0, 1.5]:
			c.boxb(k.fer, mid + Vector3(0, y, 0) + bs * Vector3(0, 0, 0.08), Vector3(2.5, 0.12, 0.03), bs)
		c.detail = true
		for i in 5:
			for j in 4:
				var p := mid + bs * Vector3(-1.0 + i * 0.5, -1.25 + j * 0.85, 0.09)
				c.cyl(k.fer, p, 0.035, 0.05, 0.05, Vector3(PI / 2, atan2(-dir.z, dir.x), 0), 6, false)
		c.detail = false
	# le linteau, l'étage de guet
	c.box(k.poutre, Vector3(0, 5.2, 0.35), Vector3(8.8, 0.55, 0.6))
	c.box(k.poutre, Vector3(0, 5.2, -0.6), Vector3(8.8, 0.45, 0.48))
	c.box(k.sous, Vector3(0, 5.55, -0.12), Vector3(9.0, 0.22, 2.9))
	var fz := 1.2
	var bz := -1.45
	_mur(c, Vector3(-4.1, 0, fz), Vector3(4.1, 0, fz), 5.65, 7.45, -1.0, 0.75)
	_mur(c, Vector3(4.1, 0, bz), Vector3(-4.1, 0, bz), 5.65, 7.45, -1.0, 0.75)
	_mur(c, Vector3(-4.1, 0, bz), Vector3(-4.1, 0, fz), 5.65, 7.45, -1.0, 0.75)
	_mur(c, Vector3(4.1, 0, fz), Vector3(4.1, 0, bz), 5.65, 7.45, -1.0, 0.75)
	# les fenêtres à lattes de la salle de guet
	for i in 3:
		var wx := -2.6 + i * 2.6
		c.box(k.sombre, Vector3(wx, 6.85, fz + 0.03), Vector3(1.2, 0.55, 0.1))
		for j in 9:
			c.box(k.poutre, Vector3(wx - 0.55 + j * 0.1375, 6.85, fz + 0.1), Vector3(0.045, 0.55, 0.05))
	c.panel(k.plaques[plaque], Vector3(0, 6.0, fz + 0.12), Vector2(1.7, 0.78))
	c.roof(Vector3(0, 7.5, -0.12), 5.3, 2.7, 2.0, k.roof, {"hip": 0.42, "up": 0.38, "thick": 0.22})
	c.build(g, "Porte")
	for s: float in [-1.0, 1.0]:
		_solid(g, Vector3(s * 3.45, 2.5, -0.1), Vector3(1.2, 5.0, 1.9))
		_nobori(g, Vector3(s * 5.0, 0, 1.6), banner)
		_lantern(g, Vector3(s * 5.2, 0, 3.0), s == 1.0)
	_chochin(g, Vector3(-1.5, 4.45, 0.95), true)
	_chochin(g, Vector3(1.5, 4.45, 0.95), false)


## Une bannière nobori : un mât et une longue toile que le vent agite.
func _nobori(parent: Node3D, pos: Vector3, color: Color, rot_y := 0.0) -> void:
	_k()
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.rotation.y = rot_y
	_cyl(g, Vector3(0, 2.6, 0), 0.04, 0.05, 5.2, mats.bois, true)
	_cyl(g, Vector3(0.35, 4.9, 0), 0.025, 0.025, 0.8, mats.bois, false, Vector3(0, 0, PI / 2))
	var pm := PlaneMesh.new()
	pm.size = Vector2(0.7, 3.4)
	pm.subdivide_width = 4
	pm.subdivide_depth = 16
	pm.orientation = PlaneMesh.FACE_Z
	var m: ShaderMaterial = _wind_mat.duplicate()
	m.set_shader_parameter("tint", color)
	var cloth := _place(g, pm, m, Vector3(0.4, 3.15, 0))
	banners.append(cloth)


# ---------- Le dojo, le sanctuaire, le puits ----------

## Le dojo : une grande salle sur un socle de pierre, sa véranda (engawa), ses
## shōji éclairés, son toit irimoya aux coins relevés, la plaque 道場.
func _dojo(parent: Node3D, pos: Vector3) -> Node3D:
	var k := _k()
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	var c := _chantier()
	var W := 14.0
	var D := 7.0
	var yf := 1.0
	c.box(k.pierre, Vector3(0, 0.25, 0), Vector3(W + 1.2, 1.5, D + 1.0))
	for i in 3:
		c.box(k.pierre, Vector3(0, 0.12 + i * 0.22, D / 2 + 1.0 - i * 0.38), Vector3(4.2, 0.24, 0.4))
	# la véranda de planches
	c.box(k.poutre, Vector3(0, yf + 0.03, D / 2 - 0.05), Vector3(W + 1.0, 0.08, 1.3))
	for i in 28:
		c.box(k.poutre, Vector3(-W / 2 - 0.45 + i * (W + 0.9) / 27.0, yf + 0.08, D / 2 - 0.05), Vector3(0.02, 0.02, 1.3))
	var ytop := yf + 3.4
	# le mur du fond, les côtés
	_mur(c, Vector3(-W / 2, 0, -D / 2), Vector3(W / 2, 0, -D / 2), yf, ytop)
	_mur(c, Vector3(-W / 2, 0, D / 2 - 0.7), Vector3(-W / 2, 0, -D / 2), yf, ytop)
	_mur(c, Vector3(W / 2, 0, -D / 2), Vector3(W / 2, 0, D / 2 - 0.7), yf, ytop)
	# la façade : six poteaux, des shōji, deux travées grandes ouvertes au milieu
	var fz := D / 2 - 0.7
	var bays := 5
	for i in bays + 1:
		var x := -W / 2 + W * i / bays
		c.box(k.poutre, Vector3(x, (yf + ytop) / 2, fz), Vector3(0.26, ytop - yf, 0.26))
		c.box(k.poutre, Vector3(x, (yf + ytop) / 2, D / 2 + 0.45), Vector3(0.2, ytop - yf, 0.2))
		c.box(k.pierre, Vector3(x, yf - 0.05, D / 2 + 0.45), Vector3(0.36, 0.12, 0.36))
	for i in bays:
		var x0 := -W / 2 + W * i / bays + 0.13
		var x1 := -W / 2 + W * (i + 1) / bays - 0.13
		var bw := x1 - x0
		if i == 2:
			continue
		var ya := yf + 0.35
		var yb := ytop - 0.55
		c.box(k.planches, Vector3((x0 + x1) / 2, (yf + ya) / 2, fz), Vector3(bw, ya - yf, 0.06))
		c.box(k.lueur, Vector3((x0 + x1) / 2, (ya + yb) / 2, fz - 0.02), Vector3(bw, yb - ya, 0.03))
		# le treillis des shōji
		for j in 7:
			c.box(k.poutre, Vector3(x0 + (j + 0.5) * bw / 7.0, (ya + yb) / 2, fz + 0.02), Vector3(0.03, yb - ya, 0.04))
		for j in 6:
			c.box(k.poutre, Vector3((x0 + x1) / 2, ya + (j + 0.5) * (yb - ya) / 6.0, fz + 0.02), Vector3(bw, 0.03, 0.04))
		c.box(k.platre, Vector3((x0 + x1) / 2, (yb + ytop) / 2, fz), Vector3(bw, ytop - yb, 0.1))
	# l'intérieur que l'on voit par l'ouverture : le parquet, l'autel du fond, les sabres de bois
	c.box(k.poutre, Vector3(0, yf + 0.04, -0.4), Vector3(W - 0.4, 0.06, D - 1.4))
	c.box(k.poutre, Vector3(0, ytop - 1.0, -D / 2 + 0.35), Vector3(1.8, 0.1, 0.45))
	c.box(k.blanc, Vector3(0, ytop - 0.75, -D / 2 + 0.35), Vector3(0.9, 0.42, 0.35))
	c.box(k.poutre, Vector3(2.8, yf + 1.4, -D / 2 + 0.2), Vector3(2.4, 0.08, 0.12))
	for j in 7:
		c.box(k.bambou, Vector3(1.75 + j * 0.35, yf + 1.15, -D / 2 + 0.24), Vector3(0.035, 1.0, 0.035), Vector3(0, 0, 0.06))
	# les chevrons sous l'avant-toit, la poutre de façade, la plaque
	c.box(k.poutre, Vector3(0, ytop + 0.12, D / 2 + 0.45), Vector3(W + 0.6, 0.3, 0.3))
	for i in 46:
		var x := -W / 2 - 0.6 + i * (W + 1.2) / 45.0
		c.box(k.poutre, Vector3(x, ytop + 0.32, D / 2 + 0.9), Vector3(0.08, 0.1, 1.6))
	c.panel(k.plaques[0], Vector3(0, ytop - 0.25, fz + 0.15), Vector2(2.2, 1.02))
	c.roof(Vector3(0, ytop + 0.42, 0.25), W / 2 + 1.25, D / 2 + 1.55, 3.0, k.roof, {"hip": 0.45, "up": 0.5, "thick": 0.24})
	c.build(g, "Dojo")
	_solid(g, Vector3(0, 0.25, 0), Vector3(W + 1.2, 1.5, D + 1.0))
	_solid(g, Vector3(0, (yf + ytop) / 2 + 0.5, -D / 2), Vector3(W, ytop - yf, 0.3))
	for s: float in [-1.0, 1.0]:
		_solid(g, Vector3(s * W / 2, (yf + ytop) / 2 + 0.5, -0.4), Vector3(0.3, ytop - yf, D - 0.8))
	return g


## Le petit sanctuaire shintō (honden) : sur pilotis vermillon, murs blancs,
## portes à claire-voie, escalier, toit courbe avec ses chigi et katsuogi, la
## corde sacrée (shimenawa) et ses papiers en zigzag.
func _honden(parent: Node3D, pos: Vector3, rot_y := 0.0) -> void:
	var k := _k()
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.rotation.y = rot_y
	var c := _chantier()
	var w := 2.4
	var d := 1.9
	var yf := 0.85
	c.box(k.pierre, Vector3(0, 0.05, 0), Vector3(w + 0.9, 0.3, d + 0.9))
	for x: float in [-w / 2.0, w / 2.0]:
		for z: float in [-d / 2.0, d / 2.0]:
			c.cyl(k.vermillon, Vector3(x, (yf + 2.5) / 2, z), 0.09, 0.1, 2.5 - yf + 0.8, Vector3.ZERO, 8)
	c.box(k.poutre, Vector3(0, yf, 0), Vector3(w + 0.5, 0.1, d + 0.5))
	c.box(k.vermillon, Vector3(0, yf + 0.25, d / 2 + 0.25), Vector3(w + 0.5, 0.05, 0.05))
	for side: float in [-1.0, 1.0]:
		c.box(k.blanc, Vector3(side * w / 2, yf + 0.85, 0), Vector3(0.08, 1.6, d))
	c.box(k.blanc, Vector3(0, yf + 0.85, -d / 2), Vector3(w, 1.6, 0.08))
	# les portes à claire-voie, l'or des ferrures
	c.box(k.sombre, Vector3(0, yf + 0.8, d / 2 - 0.02), Vector3(w - 0.2, 1.5, 0.04))
	for j in 13:
		c.box(k.vermillon, Vector3(-w / 2 + 0.15 + j * (w - 0.3) / 12.0, yf + 0.8, d / 2 + 0.02), Vector3(0.03, 1.5, 0.03))
	for j in 5:
		c.box(k.vermillon, Vector3(0, yf + 0.1 + j * 0.35, d / 2 + 0.02), Vector3(w - 0.2, 0.03, 0.03))
	c.box(k.or, Vector3(0, yf + 1.62, d / 2 + 0.05), Vector3(w + 0.1, 0.06, 0.05))
	for i in 4:
		c.box(k.poutre, Vector3(0, 0.12 + i * 0.2, d / 2 + 0.55 + (3 - i) * 0.25), Vector3(1.2, 0.08, 0.28))
	# la corde sacrée et ses papiers
	c.cyl(k.corde, Vector3(0, yf + 1.75, d / 2 + 0.32), 0.07, 0.07, w + 0.2, Vector3(0, 0, PI / 2), 8, false)
	for i in 4:
		c.panel(k.blanc, Vector3(-0.9 + i * 0.6, yf + 1.5, d / 2 + 0.36), Vector2(0.12, 0.38), Vector3(0, 0, 0.1), true)
	c.roof(Vector3(0, yf + 1.75, 0), w / 2 + 0.55, d / 2 + 0.85, 1.05, k.roof, {"up": 0.25, "thick": 0.16, "ends": false})
	# les chigi croisés aux pignons, les katsuogi couchés sur le faîte
	for sx: float in [-1.0, 1.0]:
		for sz: float in [-1.0, 1.0]:
			c.box(k.vermillon, Vector3(sx * (w / 2 + 0.45), yf + 3.0, sz * 0.12), Vector3(0.06, 0.95, 0.12), Vector3(sz * 0.6, 0, 0))
	for i in 3:
		c.cyl(k.or, Vector3(-0.7 + i * 0.7, yf + 3.07, 0), 0.07, 0.07, 0.42, Vector3(PI / 2, 0, 0), 8)
	c.build(g, "Honden")
	_solid(g, Vector3(0, 1.2, -0.1), Vector3(w + 0.4, 2.4, d + 0.4))


## Un puits couvert : margelle de pierre, potence, petit toit, poulie et seau.
func _puits(parent: Node3D, pos: Vector3) -> void:
	var k := _k()
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	var c := _chantier()
	c.cyl(k.pierre, Vector3(0, 0.4, 0), 0.95, 1.05, 1.0, Vector3.ZERO, 14)
	c.cyl(k.sombre, Vector3(0, 0.91, 0), 0.72, 0.72, 0.02, Vector3.ZERO, 14)
	c.cyl(k.poutre, Vector3(0, 0.94, 0), 0.98, 0.98, 0.08, Vector3.ZERO, 14, false)
	for x: float in [-1.05, 1.05]:
		c.box(k.poutre, Vector3(x, 1.55, 0), Vector3(0.13, 2.3, 0.13))
	c.box(k.poutre, Vector3(0, 2.45, 0), Vector3(2.4, 0.13, 0.13))
	c.cyl(k.poutre, Vector3(0, 2.25, 0), 0.16, 0.16, 0.08, Vector3(0, 0, PI / 2), 10)
	c.cyl(k.corde, Vector3(0, 1.7, 0.15), 0.012, 0.012, 1.1, Vector3.ZERO, 4, false)
	c.cyl(k.poutre, Vector3(0, 1.05, 0.15), 0.15, 0.12, 0.26, Vector3.ZERO, 8)
	c.roof(Vector3(0, 2.55, 0), 1.45, 1.0, 0.55, k.roof, {"up": 0.06, "thick": 0.08})
	c.build(g, "Puits")
	var s := CylinderShape3D.new()
	s.radius = 1.05
	s.height = 1.0
	_collide(s, g.global_transform * Transform3D(Basis(), Vector3(0, 0.5, 0)))


# ---------- La ferme au toit de chaume ----------

## Une ferme de village (minka) : murs de terre sur un soubassement de
## planches, poteaux, épais toit de chaume et ses chevilles au faîte. Éventrée,
## elle a perdu un mur et son toit s'affaisse. door : une porte à enfoncer.
func _house(parent: Node3D, pos: Vector3, rot_y: float, broken: bool, door := false) -> void:
	var k := _k()
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.rotation.y = rot_y
	var c := _chantier()
	var w := _rng.randf_range(5.5, 7.0)
	var d := _rng.randf_range(4.2, 5.4)
	var y0 := 0.5
	var y1 := 2.9
	var front := d / 2
	c.box(k.pierre, Vector3(0, y0 - 0.45, 0), Vector3(w + 0.5, 0.9, d + 0.5))
	_mur(c, Vector3(-w / 2, 0, -front), Vector3(w / 2, 0, -front), y0, y1, -1.0, 0.7, k.terre)
	_mur(c, Vector3(-w / 2, 0, front), Vector3(-w / 2, 0, -front), y0, y1, -1.0, 0.7, k.terre)
	if not broken:
		_mur(c, Vector3(w / 2, 0, -front), Vector3(w / 2, 0, front), y0, y1, -1.0, 0.7, k.terre)
	else:
		# le mur effondré : quelques planches et des poteaux debout
		for z: float in [-front, 0.0, front]:
			c.box(k.poutre, Vector3(w / 2, (y0 + y1) / 2, z), Vector3(0.16, y1 - y0, 0.16))
		for i in 4:
			c.box(k.planches, Vector3(w / 2 + _rng.randf_range(0.3, 1.4), 0.12 + i * 0.04, _rng.randf_range(-front, front)), Vector3(1.6, 0.04, 0.22), Vector3(0, _rng.randf() * TAU, _rng.randf_range(-0.1, 0.1)))
	# la façade : planches de part et d'autre, l'entrée au milieu
	var side := (w - 1.5) / 2
	for sx: float in [-1.0, 1.0]:
		var x := sx * (w / 2 - side / 2)
		c.box(k.planches, Vector3(x, (y0 + y1) / 2, front), Vector3(side, y1 - y0, 0.12))
		c.box(k.poutre, Vector3(sx * 0.75, (y0 + y1) / 2, front), Vector3(0.16, y1 - y0, 0.18))
		c.box(k.poutre, Vector3(sx * w / 2, (y0 + y1) / 2, front), Vector3(0.18, y1 - y0, 0.18))
	c.box(k.poutre, Vector3(0, y1 - 0.1, front), Vector3(w + 0.1, 0.2, 0.2))
	c.box(k.planches, Vector3(0, y1 - 0.38, front), Vector3(1.5, 0.36, 0.1))
	if not door:
		c.box(k.sombre, Vector3(0, (y0 + y1) / 2, front - 1.0), Vector3(1.5, y1 - y0, 0.06))
	c.box(k.sous, Vector3(0, y1 + 0.02, 0), Vector3(w, 0.06, d))
	# le toit de chaume : épais, sans tuiles, une croupe et un petit pignon
	if broken:
		c.xf = Transform3D(Basis.from_euler(Vector3(0.12, 0, -0.2)), Vector3(0.5, -0.65, 0.1))
	c.roof(Vector3(0, y1 + 0.05, 0), w / 2 + 0.75, front + 0.95, 2.5, k.thatch, {"hip": 0.38, "up": 0.0, "bend": 1.05, "thick": 0.45, "ridge": false})
	var top := y1 + 0.05 + 2.5
	c.box(k.poutre, Vector3(0, top + 0.06, 0), Vector3(2.0 * maxf(0.6, w / 2 + 0.75 - (front + 0.95) * 0.62) + 0.3, 0.2, 0.36))
	var rl := 2.0 * maxf(0.6, w / 2 + 0.75 - (front + 0.95) * 0.62)
	for i in int(rl / 0.7) + 1:
		var x := -rl / 2 + i * 0.7
		for s: float in [-1.0, 1.0]:
			c.box(k.poutre, Vector3(x, top + 0.18, 0), Vector3(0.06, 0.06, 0.7), Vector3(s * 0.6, 0, 0))
	c.xf = Transform3D.IDENTITY
	c.build(g, "Ferme")
	# les volumes : le fond, les côtés, les deux pans de façade
	_solid(g, Vector3(0, 1.5, -front), Vector3(w, 2.6, 0.2))
	_solid(g, Vector3(-w / 2, 1.5, 0), Vector3(0.2, 2.6, d))
	if not broken:
		_solid(g, Vector3(w / 2, 1.5, 0), Vector3(0.2, 2.6, d))
	for sx: float in [-1.0, 1.0]:
		_solid(g, Vector3(sx * (w / 2 - side / 2), 1.5, front), Vector3(side, 2.6, 0.2))
	_solid(g, Vector3(0, y0 - 0.45, 0), Vector3(w + 0.5, 0.9, d + 0.5))
	if door:
		_door(g, Vector3(0, y0, front))


# ---------- Le temple, la pagode, l'autel ----------

## Une pagode : des étages qui rétrécissent, chacun sous un toit à quatre
## pentes aux coins relevés, et la flèche de bronze (sōrin) au sommet.
func _pagode(parent: Node3D, pos: Vector3, floors := 3) -> void:
	var k := _k()
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	var c := _chantier()
	c.box(k.pierre, Vector3(0, 0.1, 0), Vector3(6.4, 1.2, 6.4))
	for i in 3:
		c.box(k.pierre, Vector3(0, 0.08 + i * 0.16, 3.5 - i * 0.3), Vector3(2.0, 0.16, 0.3))
	var y := 0.7
	for f in floors:
		var s := 4.2 - f * 0.55
		var h := 2.0 if f == 0 else 1.45
		# le corps de l'étage : poteaux vermillon, plâtre, portes à clous dorés
		for x: float in [-s / 2.0, s / 2.0]:
			for z: float in [-s / 2.0, s / 2.0]:
				c.box(k.vermillon, Vector3(x, y + h / 2, z), Vector3(0.2, h, 0.2))
		for side in 4:
			var a := side * PI / 2
			var n := Vector3(sin(a), 0, cos(a))
			var r := Vector3(0, a, 0)
			c.box(k.planches, Vector3(0, y + h / 2, 0) + n * (s / 2 - 0.04), Vector3(s - 0.2, h, 0.08), r)
			c.box(k.platre, Vector3(0, y + h - 0.22, 0) + n * (s / 2 - 0.02), Vector3(s - 0.2, 0.3, 0.08), r)
			c.box(k.vermillon, Vector3(0, y + h / 2 - 0.1, 0) + n * (s / 2 + 0.01), Vector3(s * 0.38, h * 0.7, 0.05), r)
			for sd: float in [-1.0, 1.0]:
				c.box(k.lueur, Vector3(0, y + h / 2, 0) + n * (s / 2 + 0.0) + Basis(Vector3.UP, a) * Vector3(sd * s * 0.33, 0, 0), Vector3(s * 0.16, h * 0.45, 0.04), r)
			for j in 3:
				for i in 4:
					var p := Vector3(0, y + h * 0.25 + j * h * 0.25, 0) + n * (s / 2 + 0.05) + Basis(Vector3.UP, a) * Vector3(-s * 0.13 + i * s * 0.087, 0, 0)
					c.cyl(k.or, p, 0.02, 0.025, 0.03, Vector3(PI / 2, a, 0), 5, false)
			c.box(k.vermillon, Vector3(0, y + h - 0.05, 0) + n * (s / 2 + 0.06), Vector3(s + 0.1, 0.12, 0.1), r)
			# les consoles qui portent l'avant-toit (tokyō), en gradins
			for i in 5:
				var p := Vector3(0, y + h + 0.12, 0) + n * (s / 2 + 0.25) + Basis(Vector3.UP, a) * Vector3(-s / 2 + i * s / 4, 0, 0)
				c.box(k.poutre, p, Vector3(0.18, 0.12, 0.5), r)
				c.box(k.poutre, p + n * 0.2 + Vector3(0, 0.12, 0), Vector3(0.22, 0.12, 0.4), r)
		c.box(k.poutre, Vector3(0, y + h + 0.06, 0), Vector3(s + 0.3, 0.14, s + 0.3))
		var ry := y + h + 0.32
		c.roof(Vector3(0, ry, 0), s / 2 + 1.7, s / 2 + 1.7, 1.25 if f < floors - 1 else 1.9, k.roof, {"hip": 0.0, "up": 0.75, "thick": 0.32, "bend": 1.6, "ridge": false})
		y = ry + 0.75
	# la flèche : un socle, neuf anneaux, la gemme
	c.box(k.kawara, Vector3(0, y + 0.55, 0), Vector3(0.7, 0.3, 0.7))
	c.cyl(k.or, Vector3(0, y + 2.1, 0), 0.06, 0.06, 3.2, Vector3.ZERO, 8)
	for i in 9:
		c.cyl(k.or, Vector3(0, y + 1.0 + i * 0.27, 0), 0.32 - i * 0.015, 0.32 - i * 0.015, 0.06, Vector3.ZERO, 12)
	c.cyl(k.or, Vector3(0, y + 3.65, 0), 0.0, 0.16, 0.35, Vector3.ZERO, 8)
	c.build(g, "Pagode")
	_solid(g, Vector3(0, 0.1, 0), Vector3(6.4, 1.2, 6.4))
	_solid(g, Vector3(0, y / 2, 0), Vector3(4.4, y, 4.4))


## Le temple de la Lune Rouge : le grand torii, la salle sur son podium de
## pierre, colonnes vermillon, toit irimoya à double pente, la pagode à côté,
## et l'Oni qui attend.
func _temple(c: Vector3, p: Dictionary) -> void:
	var k := _k()
	var g := _group(c)
	_plaza(g, Vector3(0, 0, 0), Vector2(30, 30))
	_torii(g, Vector3(0, 0, 19), 0.0, 1.0)
	var hall := Vector3(0, 0, -16)
	var ch := _chantier()
	ch.xf = Transform3D(Basis(), hall)
	var W := 20.0
	var D := 8.0
	var yf := 1.2
	ch.box(k.pierre, Vector3(0, 0.4, 0), Vector3(W + 2.0, 1.6, D + 2.0))
	ch.box(k.poutre, Vector3(0, yf + 0.04, 0), Vector3(W + 1.4, 0.08, D + 1.4))
	for i in 5:
		ch.box(k.pierre, Vector3(0, 0.12 + i * 0.22, D / 2 + 1.0 + (4 - i) * 0.6 - 0.6), Vector3(8, 0.22, 0.6))
	var yt := yf + 5.4
	for i in 8:
		var x := -W / 2 + i * W / 7.0
		for z: float in [D / 2.0 + 0.3, -D / 2.0]:
			ch.cyl(k.vermillon, Vector3(x, (yf + yt) / 2, z), 0.32, 0.36, yt - yf, Vector3.ZERO, 12)
			ch.cyl(k.pierre, Vector3(x, yf + 0.1, z), 0.5, 0.55, 0.2, Vector3.ZERO, 10)
	_mur(ch, Vector3(-W / 2, 0, -D / 2), Vector3(W / 2, 0, -D / 2), yf, yt, yf + 3.6)
	_mur(ch, Vector3(-W / 2, 0, D / 2 - 0.6), Vector3(-W / 2, 0, -D / 2), yf, yt)
	_mur(ch, Vector3(W / 2, 0, -D / 2), Vector3(W / 2, 0, D / 2 - 0.6), yf, yt)
	# les poutres de façade, les consoles, la plaque
	ch.box(k.vermillon, Vector3(0, yt + 0.15, D / 2 + 0.3), Vector3(W + 1.0, 0.36, 0.4))
	ch.box(k.vermillon, Vector3(0, yt - 1.2, D / 2 + 0.3), Vector3(W + 0.6, 0.24, 0.3))
	for i in 15:
		var x := -W / 2 + i * W / 14.0
		ch.box(k.poutre, Vector3(x, yt + 0.42, D / 2 + 0.55), Vector3(0.26, 0.18, 0.9))
		ch.box(k.poutre, Vector3(x, yt + 0.6, D / 2 + 0.85), Vector3(0.3, 0.18, 0.8))
	ch.panel(k.plaques[3], Vector3(0, yt - 0.55, D / 2 + 0.47), Vector2(3.2, 1.45))
	# le grand toit, et l'auvent qui fait le tour (mokoshi)
	ch.roof(Vector3(0, yf + 3.5, 0), W / 2 + 1.6, D / 2 + 1.8, 0.75, k.roof, {"hip": 0.0, "up": 0.25, "thick": 0.16, "ridge": false})
	ch.roof(Vector3(0, yt + 0.85, 0.15), W / 2 + 2.2, D / 2 + 2.6, 4.2, k.roof, {"hip": 0.42, "up": 0.8, "thick": 0.26, "shachi": true})
	ch.build(g, "Temple")
	_solid(g, hall + Vector3(0, 0.4, 0), Vector3(W + 2.0, 1.6, D + 2.0))
	_solid(g, hall + Vector3(0, (yf + yt) / 2, -D / 2), Vector3(W, yt - yf, 0.4))
	for s: float in [-1.0, 1.0]:
		_solid(g, hall + Vector3(s * W / 2, (yf + yt) / 2, 0), Vector3(0.4, yt - yf, D))
	# des lanternes tout le long de l'allée
	for z: float in [-6.0, 2.0, 10.0]:
		for x: float in [-6.0, 6.0]:
			_lantern(g, Vector3(x, 0.2, z), z == 2.0)
	# la lune rouge peinte sur le mur du fond, qui luit
	var moon := CylinderMesh.new(); moon.top_radius = 2.2; moon.bottom_radius = 2.2; moon.height = 0.05
	var mm := StandardMaterial3D.new()
	mm.albedo_color = Color(0.9, 0.08, 0.05)
	mm.emission_enabled = true
	mm.emission = Color(1.0, 0.1, 0.05)
	mm.emission_energy_multiplier = 2.5
	_place(g, moon, mm, hall + Vector3(0, 4.6, -3.8), Vector3(PI / 2, 0, 0))
	_light(g, hall + Vector3(0, 4.0, -1.5), Color(1.0, 0.15, 0.08), 6.0, 18.0)
	_chest(g, hall + Vector3(6, 1.2, -1.0), 0.0, p.id)
	_pagode(g, Vector3(-19.0, 0, -11.0) + Vector3(0, terrain.height_at(c.x - 19.0, c.z - 11.0) - c.y, 0))
	for s in [Vector3(-7, 0, 8), Vector3(7, 0, 8)]:
		_spawn("ronin", c + s, p.id)
	_spawn("oni", c + Vector3(0, 0, -4), p.id)


## L'Autel des Cendres, où tout commence : un petit sanctuaire de pierre et de
## bois sous son toit de tuiles, ses deux lanternes, le torii.
func _autel(c: Vector3, p: Dictionary) -> void:
	var g := _group(c, 0.6)
	_plaza(g, Vector3.ZERO, Vector2(9, 9))
	_torii(g, Vector3(0, 0, 6.5), 0.0, 0.55)
	_honden(g, Vector3(0, 0.2, -2.6))
	_lantern(g, Vector3(-2.6, 0.2, 1.5))
	_lantern(g, Vector3(2.6, 0.2, 1.5), false)
	_light(g, Vector3(0, 1.8, -0.4), Color(1.0, 0.65, 0.35), 2.0, 6.0)
	shrines.append({"pos": g.global_transform * Vector3(0, 0, 1.0), "name": p.name})
