## Les lieux bâtis de la vallée. Chacun renvoie ses coffres, ses autels et
## l'emplacement de ses gardiens ; la partie (main.gd) s'occupe du reste.
class_name Landmarks
extends Node3D

var terrain: Terrain
var mats := {}
var chests: Array = []        # {node, lid, place, pos, open}
var shrines: Array = []       # {pos, name}
var spawns: Array = []        # {kind, pos, place}
var doors: Array = []         # {panel, shape, pos, open}
var walls: Array = []         # murets que l'on peut enjamber : [a, b] au sol (x, z)
var _walls_body: StaticBody3D
const WALL_LAYER := 4
## Les lanternes elles-mêmes vivent sur leur propre couche : leur lumière ne les
## éclaire pas (à quelques centimètres, le chapeau de pierre virait au blanc)
const LAMP_LAYER := 128
var lights: Array = []        # {light, base, seed, on}
var lamps: Array = []         # lanternes que l'on peut souffler ou faire tomber : {pos, light, parts, kind, lit}
var flammables: Array = []    # tentes, meules de paille : le feu les prend {pos, r, node, shape, kind, burnt}
var wells: Array = []         # là où l'on remplit sa gourde
var focus := Vector3.ZERO     # autour de qui les lumières projettent des ombres (le joueur)
var max_shadows := 5          # combien de lumières proches projettent des ombres (les réglages)
var _shadow_t := 0.0
var _body: StaticBody3D
var _rng := RandomNumberGenerator.new()


func build(t: Terrain, places: Array) -> void:
	terrain = t
	_rng.seed = 77
	mats.laque = _tex("laque", Color(1, 1, 1), 0.55)
	mats.bois = _tex("laque", Color(0.32, 0.22, 0.2), 0.8)
	mats.pierre = _tex("pierre", Color(0.85, 0.83, 0.85), 0.95, true)
	mats.dalles = _tex("sol", Color(0.9, 0.9, 0.9), 0.9, true)
	mats.chaume = _plain(Color(0.16, 0.12, 0.08), 1.0)
	mats.tuile = _plain(Color(0.07, 0.065, 0.075), 0.6)
	mats.toile = _plain(Color(0.36, 0.06, 0.06), 0.9)
	mats.toile_sombre = _plain(Color(0.12, 0.1, 0.1), 0.95)
	mats.or = _plain(Color(0.8, 0.62, 0.25), 0.3, 1.0)
	mats.corde = _plain(Color(0.35, 0.28, 0.18), 1.0)
	_body = StaticBody3D.new()
	_body.name = "Constructions"
	add_child(_body)
	# les murets ont leur propre couche : le saut les ignore le temps de passer
	_walls_body = StaticBody3D.new()
	_walls_body.name = "Murets"
	_walls_body.collision_layer = WALL_LAYER
	add_child(_walls_body)
	_murets(places)
	for p in places:
		var c := Vector3(p.pos.x, terrain.height_at(p.pos.x, p.pos.y), p.pos.y)
		match p.id:
			"autel": _autel(c, p)
			"village": _village(c, p)
			"camp": _camp(c, p)
			"croisee": _croisee(c, p)
			"sanctuaire": _sanctuaire(c, p)
			"temple": _temple(c, p)


func _process(dt: float) -> void:
	var t := Time.get_ticks_msec() / 1000.0
	for l in lights:
		if not l.on:
			continue
		var f: float = 0.85 + sin(t * 9.0 + l.seed) * 0.08 + sin(t * 23.0 + l.seed * 3.0) * 0.06
		l.light.light_energy = l.base * f
	_shadow_t -= dt
	if _shadow_t <= 0.0:
		_shadow_t = 0.35
		_shadows()


## Seules les lumières les plus proches du joueur projettent des ombres :
## les personnages s'ancrent dans la lumière des lanternes, sans tout ralentir.
func _shadows() -> void:
	var near := []
	for l in lights:
		var d: float = l.light.global_position.distance_to(focus)
		if l.on and d < l.light.omni_range + 18.0:
			near.append([d, l])
	near.sort_custom(func(a, b): return a[0] < b[0])
	var keep := {}
	for i in mini(max_shadows, near.size()):
		keep[near[i][1].light] = true
	for l in lights:
		var on: bool = keep.has(l.light)
		if l.light.shadow_enabled != on:
			l.light.shadow_enabled = on


## Une lanterne qu'on souffle : plus de lumière, plus de flamme. Vrai si elle brûlait.
func snuff(lamp: Dictionary) -> bool:
	if not lamp.lit:
		return false
	lamp.lit = false
	for part in lamp.flames:
		part.visible = false
	if lamp.light:
		lamp.light.visible = false
		lamp.light.shadow_enabled = false
		for l in lights:
			if l.light == lamp.light:
				l.on = false
	return true


## La lumière qui tombe en un point, de 0 (le noir) à 1 (en pleine lanterne).
func light_at(p: Vector3) -> float:
	var v := 0.0
	for l in lights:
		if not l.on:
			continue
		var lt: OmniLight3D = l.light
		var d := lt.global_position.distance_to(p)
		if d < lt.omni_range:
			var k := 1.0 - d / lt.omni_range
			v += k * k * minf(1.0, l.base / 2.5)
	return clampf(v, 0.0, 1.0)


# ---------- Matières ----------

func _tex(name: String, tint: Color, rough: float, triplanar := false) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = tint
	m.roughness = rough
	var path := "res://assets/%s.jpg" % name
	if ResourceLoader.exists(path):
		m.albedo_texture = load(path)
		var n := "res://assets/%s-n.jpg" % name
		if ResourceLoader.exists(n):
			m.normal_enabled = true
			m.normal_texture = load(n)
	if triplanar:
		m.uv1_triplanar = true
		m.uv1_world_triplanar = true
		m.uv1_scale = Vector3(0.4, 0.4, 0.4)
	return m


func _plain(c: Color, rough: float, metal := 0.0) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = c
	m.roughness = rough
	m.metallic = metal
	return m


# ---------- Formes ----------

func _place(parent: Node3D, mesh: Mesh, mat: Material, pos: Vector3, rot := Vector3.ZERO) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	mi.mesh = mesh
	mi.material_override = mat
	parent.add_child(mi)
	mi.position = pos
	mi.rotation = rot
	return mi


func _collide(shape: Shape3D, xf: Transform3D) -> CollisionShape3D:
	var cs := CollisionShape3D.new()
	cs.shape = shape
	cs.transform = xf
	_body.add_child(cs)
	return cs


func _box(parent: Node3D, pos: Vector3, size: Vector3, mat: Material, rot := Vector3.ZERO, collide := true) -> MeshInstance3D:
	var b := BoxMesh.new()
	b.size = size
	var mi := _place(parent, b, mat, pos, rot)
	if collide:
		var s := BoxShape3D.new()
		s.size = size
		_collide(s, parent.global_transform * mi.transform)
	return mi


func _cyl(parent: Node3D, pos: Vector3, r_top: float, r_bottom: float, h: float, mat: Material, collide := true, rot := Vector3.ZERO) -> MeshInstance3D:
	var c := CylinderMesh.new()
	c.top_radius = r_top
	c.bottom_radius = r_bottom
	c.height = h
	c.radial_segments = 12
	var mi := _place(parent, c, mat, pos, rot)
	if collide:
		var s := CylinderShape3D.new()
		s.radius = maxf(r_top, r_bottom)
		s.height = h
		_collide(s, parent.global_transform * mi.transform)
	return mi


## Un toit à deux pans, faîte le long de z
func _roof(parent: Node3D, pos: Vector3, w: float, d: float, h: float, mat: Material, rot := Vector3.ZERO) -> MeshInstance3D:
	var p := PrismMesh.new()
	p.size = Vector3(w, h, d)
	return _place(parent, p, mat, pos, rot)


func _group(at: Vector3, rot_y := 0.0) -> Node3D:
	var g := Node3D.new()
	add_child(g)
	g.position = at
	g.rotation.y = rot_y
	return g


# ---------- Éléments ----------

func _lantern(parent: Node3D, pos: Vector3, light := true) -> void:
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	_cyl(g, Vector3(0, 0.15, 0), 0.45, 0.55, 0.3, mats.pierre)
	_cyl(g, Vector3(0, 0.85, 0), 0.16, 0.2, 1.1, mats.pierre, false)
	_cyl(g, Vector3(0, 1.5, 0), 0.42, 0.32, 0.22, mats.pierre, false)
	# la tête de la lanterne est ajourée : elle ne bloque pas sa propre lumière
	var head := _box(g, Vector3(0, 1.83, 0), Vector3(0.5, 0.45, 0.5), mats.pierre, Vector3.ZERO, false)
	head.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	head.layers = LAMP_LAYER
	var cap := CylinderMesh.new(); cap.top_radius = 0.0; cap.bottom_radius = 0.62; cap.height = 0.45; cap.radial_segments = 6
	var top := _place(g, cap, mats.pierre, Vector3(0, 2.28, 0))
	top.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	top.layers = LAMP_LAYER
	var flame := SphereMesh.new(); flame.radius = 0.07; flame.height = 0.14
	var fm := StandardMaterial3D.new()
	fm.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	fm.albedo_color = Color(1.0, 0.6, 0.25)
	fm.emission_enabled = true
	fm.emission = Color(1.0, 0.55, 0.2)
	fm.emission_energy_multiplier = 1.8
	var fl := _place(g, flame, fm, Vector3(0, 1.83, 0))
	fl.layers = LAMP_LAYER
	var l: OmniLight3D = null
	if light:
		l = _light(g, Vector3(0, 1.9, 0), Color(1.0, 0.5, 0.2), 3.0, 10.0)
	lamps.append({"pos": g.global_position + Vector3(0, 1.8, 0), "light": l, "flames": [fl], "kind": "pierre", "lit": true})


func _light(parent: Node3D, pos: Vector3, c: Color, energy: float, rng_: float) -> OmniLight3D:
	var l := OmniLight3D.new()
	l.light_color = c
	l.light_energy = energy
	l.omni_range = rng_
	l.omni_attenuation = 1.6
	l.light_volumetric_fog_energy = 0.06   # à peine un halo : de près, la brume saturait en boule blanche
	l.light_cull_mask = 0xFFFFF & ~LAMP_LAYER
	l.shadow_blur = 1.6
	l.shadow_bias = 0.06
	l.shadow_normal_bias = 1.2
	# deux passes d'ombre au lieu de six : bien plus léger pour la carte graphique
	l.omni_shadow_mode = OmniLight3D.SHADOW_DUAL_PARABOLOID
	parent.add_child(l)
	l.position = pos
	lights.append({"light": l, "base": energy, "seed": _rng.randf() * 100.0, "on": true})
	return l


func _torii(parent: Node3D, pos: Vector3, rot_y: float, s: float) -> void:
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.rotation.y = rot_y
	g.scale = Vector3.ONE * s
	for side in [-1, 1]:
		_cyl(g, Vector3(side * 3.3, 3.75, 0), 0.28, 0.34, 7.5, mats.laque)
		_cyl(g, Vector3(side * 3.3, 0.25, 0), 0.42, 0.46, 0.5, mats.tuile, false)
	_box(g, Vector3(0, 5.6, 0), Vector3(8.2, 0.42, 0.34), mats.laque, Vector3.ZERO, false)
	for i in range(-5, 6):
		_box(g, Vector3(i * 0.92, 7.35 + i * i * 0.018, 0), Vector3(0.98, 0.5, 0.62), mats.laque, Vector3(0, 0, -i * 0.035), false)
	_box(g, Vector3(0, 7.72, 0), Vector3(10.6, 0.2, 0.8), mats.tuile, Vector3.ZERO, false)


func _house(parent: Node3D, pos: Vector3, rot_y: float, broken: bool, door := false) -> void:
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.rotation.y = rot_y
	var w := _rng.randf_range(5.0, 7.0)
	var d := _rng.randf_range(4.0, 5.5)
	_box(g, Vector3(0, 0.25, 0), Vector3(w + 0.6, 0.5, d + 0.6), mats.pierre)
	# les murs : une façade ouverte sur la rue
	_box(g, Vector3(0, 1.7, -d / 2), Vector3(w, 2.4, 0.18), mats.bois)
	_box(g, Vector3(-w / 2, 1.7, 0), Vector3(0.18, 2.4, d), mats.bois)
	if not broken:
		_box(g, Vector3(w / 2, 1.7, 0), Vector3(0.18, 2.4, d), mats.bois)
	for x in [-w / 2, w / 2]:
		_cyl(g, Vector3(x, 1.7, d / 2), 0.12, 0.12, 2.4, mats.bois)
	if door:
		# une façade fermée, et une porte que l'on peut enfoncer
		var side := (w - 1.4) / 2
		for x in [-(w / 2 - side / 2), w / 2 - side / 2]:
			_box(g, Vector3(x, 1.7, d / 2), Vector3(side, 2.4, 0.16), mats.bois)
		_box(g, Vector3(0, 2.75, d / 2), Vector3(1.4, 0.3, 0.16), mats.bois)
		_door(g, Vector3(0, 0.5, d / 2))
	var roof := _roof(g, Vector3(0, 3.6, 0), w + 1.4, d + 1.6, 1.5, mats.chaume if _rng.randf() < 0.5 else mats.tuile, Vector3(0, PI / 2, 0))
	if broken:
		roof.rotation = Vector3(0.25, PI / 2, -0.35)
		roof.position = Vector3(0.8, 2.6, 0.3)


## Une porte de bois sur charnière basse : un coup de pied la couche au sol.
func _door(parent: Node3D, pos: Vector3) -> void:
	var hinge := Node3D.new()
	parent.add_child(hinge)
	hinge.position = pos
	var panel := MeshInstance3D.new()
	var b := BoxMesh.new()
	b.size = Vector3(1.36, 2.1, 0.08)
	panel.mesh = b
	panel.material_override = mats.laque
	hinge.add_child(panel)
	panel.position = Vector3(0, 1.05, 0)
	for y in [0.35, 1.05, 1.75]:
		var bar := MeshInstance3D.new()
		var bb := BoxMesh.new(); bb.size = Vector3(1.4, 0.08, 0.12)
		bar.mesh = bb
		bar.material_override = mats.bois
		hinge.add_child(bar)
		bar.position = Vector3(0, y, 0.02)
	var s := BoxShape3D.new()
	s.size = Vector3(1.36, 2.1, 0.12)
	var cs := CollisionShape3D.new()
	cs.shape = s
	cs.transform = hinge.global_transform * Transform3D(Basis(), Vector3(0, 1.05, 0))
	_body.add_child(cs)
	doors.append({"hinge": hinge, "shape": cs, "pos": hinge.global_position, "open": false})


func break_door(d: Dictionary, push: Vector3) -> void:
	d.open = true
	d.shape.disabled = true
	# la porte bascule vers l'intérieur, dans le sens du coup
	var local: Vector3 = d.hinge.global_transform.basis.inverse() * push
	var tw := create_tween()
	tw.tween_property(d.hinge, "rotation:x", (PI / 2 - 0.05) * signf(local.z if absf(local.z) > 0.01 else 1.0), 0.35).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)


func _chest(parent: Node3D, pos: Vector3, rot_y: float, place: String) -> void:
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.rotation.y = rot_y
	_box(g, Vector3(0, 0.3, 0), Vector3(1.1, 0.6, 0.7), mats.bois)
	for x in [-0.45, 0.45]:
		_box(g, Vector3(x, 0.3, 0), Vector3(0.06, 0.62, 0.72), mats.or, Vector3.ZERO, false)
	var hinge := Node3D.new()
	g.add_child(hinge)
	hinge.position = Vector3(0, 0.6, -0.35)
	_box(hinge, Vector3(0, 0.1, 0.35), Vector3(1.12, 0.2, 0.72), mats.laque, Vector3.ZERO, false)
	# une lueur d'or tant qu'il n'est pas ouvert
	var glow := OmniLight3D.new()
	glow.light_color = Color(1.0, 0.75, 0.35)
	glow.light_energy = 0.8
	glow.omni_range = 3.0
	g.add_child(glow)
	glow.position = Vector3(0, 1.0, 0.4)
	chests.append({"node": g, "lid": hinge, "glow": glow, "place": place, "pos": g.global_position, "open": false})


func _plaza(parent: Node3D, pos: Vector3, size: Vector2, rot_y := 0.0) -> void:
	_box(parent, pos + Vector3(0, 0.08, 0), Vector3(size.x, 0.4, size.y), mats.dalles, Vector3(0, rot_y, 0))


func _spawn(kind: String, at: Vector3, place: String) -> void:
	spawns.append({"kind": kind, "pos": Vector3(at.x, terrain.height_at(at.x, at.z), at.z), "place": place})


func _ground(p: Vector3) -> Vector3:
	return Vector3(p.x, terrain.height_at(p.x, p.z), p.z)


# ---------- Les murets ----------

## Un muret de pierres sèches entre deux points du sol, qui épouse le relief.
func _wall(a: Vector2, b: Vector2, h := 0.85) -> void:
	walls.append([a, b])
	var n := maxi(1, int(a.distance_to(b) / 1.8))
	for i in n:
		var p0 := a.lerp(b, float(i) / n)
		var p1 := a.lerp(b, float(i + 1) / n)
		var mid := (p0 + p1) / 2.0
		var y := minf(terrain.height_at(p0.x, p0.y), terrain.height_at(p1.x, p1.y))
		var len := p0.distance_to(p1) + 0.12
		var rot := atan2(p1.x - p0.x, p1.y - p0.y) + PI / 2
		var mi := MeshInstance3D.new()
		var bm := BoxMesh.new()
		bm.size = Vector3(len, h + 0.3, 0.55 + _rng.randf() * 0.1)
		mi.mesh = bm
		mi.material_override = mats.pierre
		add_child(mi)
		mi.position = Vector3(mid.x, y + (h + 0.3) / 2 - 0.3, mid.y)
		mi.rotation = Vector3(_rng.randf_range(-0.03, 0.03), rot, _rng.randf_range(-0.03, 0.03))
		var cap := MeshInstance3D.new()
		var cm := BoxMesh.new()
		cm.size = Vector3(len, 0.12, 0.7)
		cap.mesh = cm
		cap.material_override = mats.pierre
		mi.add_child(cap)
		cap.position = Vector3(0, (h + 0.3) / 2, 0)
		var s := BoxShape3D.new()
		s.size = Vector3(len, h + 1.2, 0.6)
		var cs := CollisionShape3D.new()
		cs.shape = s
		cs.transform = Transform3D(Basis().rotated(Vector3.UP, rot), Vector3(mid.x, y + (h + 1.2) / 2 - 0.3, mid.y))
		_walls_body.add_child(cs)


## Un arc de muret autour d'un centre, entre deux angles.
func _wall_arc(c: Vector2, r: float, a0: float, a1: float) -> void:
	var n := maxi(2, int(absf(a1 - a0) * r / 3.0))
	for i in n:
		var t0 := lerpf(a0, a1, float(i) / n)
		var t1 := lerpf(a0, a1, float(i + 1) / n)
		_wall(c + Vector2(sin(t0), cos(t0)) * r, c + Vector2(sin(t1), cos(t1)) * r)


func _murets(places: Array) -> void:
	var by := {}
	for p in places:
		by[p.id] = p
	# le village, ceint d'un muret ouvert là où arrivent les chemins
	var v: Vector2 = by.village.pos
	var gaps := []
	for to in [Vector2(-75, 105), Vector2(30, 85), Vector2(0, -20), Vector2(-100, 20)]:
		var d: Vector2 = to - v
		gaps.append(atan2(d.x, d.y))
	gaps.sort()
	for i in gaps.size():
		var g0: float = gaps[i] + 0.16
		var g1: float = (gaps[(i + 1) % gaps.size()] + (TAU if i == gaps.size() - 1 else 0.0)) - 0.16
		_wall_arc(v, 27.0, g0, g1)
	# le temple : un enclos ouvert devant le grand torii
	var t: Vector2 = by.temple.pos
	_wall(t + Vector2(-17, 24), t + Vector2(-4.5, 24))
	_wall(t + Vector2(4.5, 24), t + Vector2(17, 24))
	_wall(t + Vector2(-17, 24), t + Vector2(-17, -10))
	_wall(t + Vector2(17, 24), t + Vector2(17, -10))
	# des murets de champs, en travers de la vallée
	for seg in [[Vector2(-20, 15), Vector2(5, 2)], [Vector2(15, -45), Vector2(32, -62)], [Vector2(40, 60), Vector2(62, 45)],
			[Vector2(-85, 80), Vector2(-60, 70)], [Vector2(70, -5), Vector2(95, 10)], [Vector2(-125, 5), Vector2(-108, -12)]]:
		_wall(seg[0], seg[1])


# ---------- Les lieux ----------

## L'autel des Cendres : là où tout commence, où l'on se repose.
func _autel(c: Vector3, p: Dictionary) -> void:
	var g := _group(c, 0.6)
	_plaza(g, Vector3.ZERO, Vector2(9, 9))
	_torii(g, Vector3(0, 0, 6.5), 0.0, 0.55)
	_box(g, Vector3(0, 0.9, -1.5), Vector3(1.6, 1.4, 1.0), mats.pierre)
	_box(g, Vector3(0, 1.8, -1.5), Vector3(2.4, 0.15, 1.5), mats.laque, Vector3.ZERO, false)
	_roof(g, Vector3(0, 2.4, -1.5), 3.0, 2.2, 0.8, mats.tuile, Vector3(0, PI / 2, 0))
	_lantern(g, Vector3(-2.6, 0.2, 1.5))
	_lantern(g, Vector3(2.6, 0.2, 1.5), false)
	_light(g, Vector3(0, 1.6, -0.6), Color(1.0, 0.65, 0.35), 2.0, 6.0)
	shrines.append({"pos": g.global_transform * Vector3(0, 0, 1.0), "name": p.name})


## Le village de Kurogane : des maisons éventrées, un puits, des ronins.
func _village(c: Vector3, p: Dictionary) -> void:
	var g := _group(c)
	var spots := [Vector3(-14, 0, -8), Vector3(-6, 0, -16), Vector3(6, 0, -15), Vector3(15, 0, -6),
		Vector3(-15, 0, 8), Vector3(14, 0, 9), Vector3(-5, 0, 16), Vector3(7, 0, 16)]
	for i in spots.size():
		var s: Vector3 = spots[i]
		var at := _ground(c + s) - c
		_house(g, at, atan2(-s.x, -s.z) + PI, i % 3 == 1, i in [0, 5])
	_cyl(g, _ground(c + Vector3(0, 0, 0)) - c + Vector3(0, 0.5, 0), 1.1, 1.2, 1.0, mats.pierre)
	_box(g, _ground(c) - c + Vector3(0, 1.9, 0), Vector3(2.6, 0.12, 0.2), mats.bois, Vector3.ZERO, false)
	for x in [-1.2, 1.2]:
		_cyl(g, _ground(c) - c + Vector3(x, 1.2, 0), 0.07, 0.07, 1.6, mats.bois, false)
	_lantern(g, _ground(c + Vector3(3, 0, 4)) - c)
	_lantern(g, _ground(c + Vector3(-4, 0, -3)) - c)
	_chest(g, _ground(c + Vector3(-14.5, 0, -9.2)) - c + Vector3(0, 0.5, 0), 0.8, p.id)
	_chest(g, _ground(c + Vector3(14.6, 0, 10.0)) - c + Vector3(0, 0.5, 0), -2.3, p.id)
	for s in [Vector3(-6, 0, 3), Vector3(5, 0, -4), Vector3(2, 0, 8)]:
		_spawn("ronin", c + s, p.id)


## Le camp des ronins : une palissade, des tentes, un feu, et leur chef.
func _camp(c: Vector3, p: Dictionary) -> void:
	var g := _group(c, -0.4)
	for i in 34:
		var a := float(i) / 34.0 * TAU
		if absf(a - PI * 0.5) < 0.32:
			continue
		var at := Vector3(sin(a) * 15.5, 0, cos(a) * 15.5)
		var stake := _cyl(g, _ground(g.global_transform * at) - c + Vector3(0, 1.4, 0), 0.03, 0.18, 2.8 + _rng.randf() * 0.6, mats.bois)
		stake.rotation = Vector3(_rng.randf_range(-0.1, 0.1), 0, _rng.randf_range(-0.1, 0.1))
	for t in [Vector3(-7, 0, -5), Vector3(6, 0, -7), Vector3(-6, 0, 7)]:
		var at: Vector3 = _ground(g.global_transform * t) - c
		var tent := _roof(g, at + Vector3(0, 1.4, 0), 3.6, 4.4, 2.8, mats.toile if _rng.randf() < 0.5 else mats.toile_sombre, Vector3(0, _rng.randf() * TAU, 0))
		var s := BoxShape3D.new(); s.size = Vector3(3.2, 2.6, 4.2)
		var cs := _collide(s, g.global_transform * tent.transform)
		flammables.append({"pos": tent.global_position - Vector3(0, 1.2, 0), "r": 2.2, "node": tent, "shape": cs, "kind": "tente", "burnt": false})
	# Le feu de camp
	var fire_at := _ground(c) - c
	for i in 8:
		var a := float(i) / 8.0 * TAU
		_box(g, fire_at + Vector3(sin(a) * 0.9, 0.15, cos(a) * 0.9), Vector3(0.35, 0.3, 0.3), mats.pierre, Vector3(0, a, 0), false)
	for i in 4:
		_cyl(g, fire_at + Vector3(0, 0.2, 0), 0.06, 0.08, 1.4, mats.bois, false, Vector3(PI / 2, float(i) * 0.8, 0))
	_light(g, fire_at + Vector3(0, 1.0, 0), Color(1.0, 0.45, 0.15), 5.0, 14.0)
	_fire(g, fire_at + Vector3(0, 0.3, 0))
	# Les bannières
	for b in [Vector3(-3, 0, 12), Vector3(3, 0, 12)]:
		var at: Vector3 = _ground(g.global_transform * b) - c
		_cyl(g, at + Vector3(0, 2.5, 0), 0.05, 0.06, 5.0, mats.bois)
		_box(g, at + Vector3(0.45, 3.6, 0), Vector3(0.8, 2.2, 0.03), mats.toile, Vector3.ZERO, false)
	_chest(g, _ground(g.global_transform * Vector3(7.5, 0, -4.5)) - c + Vector3(0, 0, 0), -2.2, p.id)
	for s in [Vector3(-4, 0, 0), Vector3(4, 0, 3), Vector3(0, 0, -6)]:
		_spawn("ronin", c + s, p.id)
	_spawn("chef", c + Vector3(1, 0, 1), p.id)


func _fire(parent: Node3D, pos: Vector3) -> void:
	var f := CPUParticles3D.new()
	f.amount = 70
	f.lifetime = 0.8
	var q := QuadMesh.new(); q.size = Vector2(0.38, 0.5)
	var m := StandardMaterial3D.new()
	m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	m.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	m.vertex_color_use_as_albedo = true
	m.albedo_color = Color(0.95, 0.42, 0.14)
	# une flamme douce : un dégradé rond plutôt qu'un carré
	var soft := Gradient.new()
	soft.set_color(0, Color(1, 1, 1, 1))
	soft.set_color(1, Color(1, 1, 1, 0))
	var tex := GradientTexture2D.new()
	tex.gradient = soft
	tex.fill = GradientTexture2D.FILL_RADIAL
	tex.fill_from = Vector2(0.5, 0.5)
	tex.fill_to = Vector2(1.0, 0.5)
	m.albedo_texture = tex
	q.material = m
	f.mesh = q
	f.emission_shape = CPUParticles3D.EMISSION_SHAPE_SPHERE
	f.emission_sphere_radius = 0.35
	f.direction = Vector3.UP
	f.spread = 15.0
	f.gravity = Vector3(0, 2.5, 0)
	f.initial_velocity_min = 0.4
	f.initial_velocity_max = 1.2
	var g := Gradient.new()
	g.set_color(0, Color(1, 0.8, 0.4, 1))
	g.set_color(1, Color(0.8, 0.1, 0.0, 0))
	f.color_ramp = g
	var sc := Curve.new(); sc.add_point(Vector2(0, 1)); sc.add_point(Vector2(1, 0.2))
	f.scale_amount_curve = sc
	parent.add_child(f)
	f.position = pos


## La croisée des Pendus : un arbre mort, des cordes, des statues jizo.
func _croisee(c: Vector3, p: Dictionary) -> void:
	var g := _group(c, 1.1)
	_cyl(g, Vector3(0, 3.0, 0), 0.25, 0.55, 6.0, mats.bois)
	for i in 4:
		var a := float(i) / 4.0 * TAU + 0.4
		var branch := _cyl(g, Vector3(sin(a) * 1.2, 5.2, cos(a) * 1.2), 0.06, 0.16, 3.0, mats.bois, false)
		branch.rotation = Vector3(cos(a) * 1.1, 0, -sin(a) * 1.1)
		var tip := Vector3(sin(a) * 2.3, 5.9, cos(a) * 2.3)
		_cyl(g, tip - Vector3(0, 1.1, 0), 0.015, 0.015, 2.2, mats.corde, false)
		var loop := TorusMesh.new(); loop.inner_radius = 0.12; loop.outer_radius = 0.16
		_place(g, loop, mats.corde, tip - Vector3(0, 2.3, 0), Vector3(PI / 2, 0, 0))
	for i in 6:
		var a := float(i) / 6.0 * TAU
		var at := _ground(g.global_transform * Vector3(sin(a) * 6.5, 0, cos(a) * 6.5)) - c
		_cyl(g, at + Vector3(0, 0.45, 0), 0.22, 0.28, 0.9, mats.pierre)
		var head := SphereMesh.new(); head.radius = 0.2; head.height = 0.4
		_place(g, head, mats.pierre, at + Vector3(0, 1.05, 0))
		_box(g, at + Vector3(0, 0.75, 0.2), Vector3(0.36, 0.2, 0.05), mats.toile, Vector3.ZERO, false)
	_lantern(g, _ground(g.global_transform * Vector3(3, 0, 3)) - c)
	_chest(g, _ground(g.global_transform * Vector3(-2.5, 0, 2.0)) - c, 0.4, p.id)
	for s in [Vector3(-5, 0, -3), Vector3(5, 0, -2)]:
		_spawn("ronin", c + s, p.id)


## Le sanctuaire noyé : des ruines au bord du lac, un coffre oublié.
func _sanctuaire(c: Vector3, p: Dictionary) -> void:
	var g := _group(c, 2.2)
	_plaza(g, Vector3(0, -0.1, 0), Vector2(7, 7), 0.2)
	for x in [-2.5, 2.5]:
		for z in [-2.5, 2.5]:
			var h := _rng.randf_range(1.0, 3.6)
			_cyl(g, Vector3(x, h / 2, z), 0.3, 0.34, h, mats.laque)
	_torii(g, Vector3(0, -0.4, 5.5), 0.15, 0.45)
	_chest(g, Vector3(0, 0.2, -1.0), PI, p.id)
	_lantern(g, Vector3(2.8, 0, 2.8))


## Le temple de la Lune Rouge : le grand torii, l'escalier, la salle, l'Oni.
func _temple(c: Vector3, p: Dictionary) -> void:
	var g := _group(c)
	_plaza(g, Vector3(0, 0, 0), Vector2(30, 30))
	_torii(g, Vector3(0, 0, 19), 0.0, 1.0)
	# la grande salle, au fond
	var hall := Vector3(0, 0, -16)
	_box(g, hall + Vector3(0, 0.6, 0), Vector3(22, 1.2, 10), mats.pierre)
	for i in 7:
		_cyl(g, hall + Vector3(-9 + i * 3, 4.2, 3.5), 0.4, 0.45, 6.0, mats.laque)
		_cyl(g, hall + Vector3(-9 + i * 3, 4.2, -3.5), 0.4, 0.45, 6.0, mats.laque, true)
	_box(g, hall + Vector3(0, 4.2, -4.2), Vector3(20, 6.0, 0.3), mats.bois)
	_box(g, hall + Vector3(0, 7.5, 0), Vector3(23, 0.6, 11), mats.laque, Vector3.ZERO, false)
	_roof(g, hall + Vector3(0, 9.3, 0), 26.0, 13.0, 3.6, mats.tuile, Vector3(0, PI / 2, 0))
	for i in 5:
		_box(g, Vector3(0, 0.2 + i * 0.22, -10 + i * 0.6), Vector3(8, 0.22, 0.6), mats.pierre)
	# des lanternes tout le long de l'allée
	for z in [-6, 2, 10]:
		for x in [-6, 6]:
			_lantern(g, Vector3(x, 0.2, z), z == 2)
	# la lune rouge peinte sur le mur du fond, qui luit
	var moon := CylinderMesh.new(); moon.top_radius = 2.2; moon.bottom_radius = 2.2; moon.height = 0.05
	var mm := StandardMaterial3D.new()
	mm.albedo_color = Color(0.9, 0.08, 0.05)
	mm.emission_enabled = true
	mm.emission = Color(1.0, 0.1, 0.05)
	mm.emission_energy_multiplier = 2.5
	_place(g, moon, mm, hall + Vector3(0, 4.6, -4.0), Vector3(PI / 2, 0, 0))
	_light(g, hall + Vector3(0, 4.0, -1.5), Color(1.0, 0.15, 0.08), 6.0, 18.0)
	_chest(g, hall + Vector3(6, 1.2, -1.0), 0.0, p.id)
	for s in [Vector3(-7, 0, 8), Vector3(7, 0, 8)]:
		_spawn("ronin", c + s, p.id)
	_spawn("oni", c + Vector3(0, 0, -4), p.id)
