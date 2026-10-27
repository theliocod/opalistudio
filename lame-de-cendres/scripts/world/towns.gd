## Les villes : Hōjō-machi, la ville libre, et le fort d'Akagane, tenu par
## les gens de l'Oni. Elles s'ajoutent aux lieux de Landmarks et renvoient
## leurs habitants (folk), leurs gardes, leurs rondes et leurs points d'intérêt.
class_name Towns
extends Batisses

## Chaque habitant : kind, role, faction, pos, yaw, idle, walk, route, id, name, armed, tint
var folk: Array = []
var zones: Array = []          # {id, center (Vector2), size (Vector2), kind : ville | fort}
var shop := {}                 # {pos, yaw}
var registry := {}             # {pos}
var bell := {}                 # {pos, node, cut}
var racks: Array = []          # {pos, katana, blades (Node3D), taken}
var cages: Array = []          # {pos, door, open, prisoners (indices de folk)}
var fires: Array = []          # Vector3, pour le crépitement
var spots := {}                # les lieux nommés où l'on trouve les samouraïs : id → Vector3
var streets := {}              # ville → points de passage des promeneurs
var emitters: Array = []       # les pétales des sakuras, que le vent emporte


func build(t: Terrain, places: Array) -> void:
	super.build(t, places)
	_k()
	mats.sakura = _plain(Color(0.95, 0.55, 0.68), 0.9)
	mats.sakura.emission_enabled = true
	mats.sakura.emission = Color(0.5, 0.12, 0.2)
	mats.sakura.emission_energy_multiplier = 0.25
	mats.indigo = _plain(Color(0.1, 0.13, 0.26), 0.9)
	var water := ShaderMaterial.new()
	water.shader = load("res://scripts/world/water.gdshader")
	mats.eau = water
	for p in places:
		var c := Vector3(p.pos.x, terrain.height_at(p.pos.x, p.pos.y), p.pos.y)
		match p.id:
			"hojo": _hojo(c, p)
			"akagane": _akagane(c, p)
			"cimetiere": _cimetiere(c, p)
			"bambous": _bambous(c, p)


# ---------- Petits éléments ----------

func _at(c: Vector3, x: float, z: float) -> Vector3:
	return Vector3(c.x + x, terrain.height_at(c.x + x, c.z + z), c.z + z)


## Un habitant à placer dans le monde.
func _folk(kind: String, role: String, faction: String, pos: Vector3, yaw: float, extra := {}) -> void:
	var f := {"kind": kind, "role": role, "faction": faction, "pos": pos, "yaw": yaw,
		"idle": "repos", "walk": "marche", "route": [], "id": "", "name": "", "armed": role in ["guard", "samurai"], "tint": Color(1, 1, 1)}
	f.merge(extra, true)
	folk.append(f)


## Une palissade de fort : un socle de pierres, des rondins serrés taillés en
## pointe, deux traverses de chaque côté. Trop haute pour être enjambée.
func _palisade(c: Chantier, a: Vector2, b: Vector2, h := 4.2) -> void:
	var k := _k()
	var n := maxi(1, int(a.distance_to(b) / 4.0))
	for i in n:
		var p0 := a.lerp(b, float(i) / n)
		var p1 := a.lerp(b, float(i + 1) / n)
		var mid := (p0 + p1) / 2.0
		var y := minf(terrain.height_at(p0.x, p0.y), terrain.height_at(p1.x, p1.y)) - 0.3
		var len := p0.distance_to(p1) + 0.1
		var rot := atan2(p1.x - p0.x, p1.y - p0.y) + PI / 2
		c.xf = Transform3D(Basis(Vector3.UP, rot), Vector3(mid.x, y, mid.y))
		c.box(k.pierre, Vector3(0, 0.45, 0), Vector3(len, 1.1, 1.1))
		var logs := int(len / 0.3)
		for j in logs:
			var x := -len / 2 + (j + 0.5) * len / logs
			var lh := h - 1.0 + _rng.randf_range(-0.25, 0.2)
			var r := _rng.randf_range(0.13, 0.16)
			c.cyl(k.poutre, Vector3(x, 1.0 + lh / 2, 0), r, r, lh, Vector3(0, 0, _rng.randf_range(-0.025, 0.025)), 7, false)
			c.cyl(k.poutre, Vector3(x, 1.0 + lh + 0.22, 0), 0.0, r, 0.45, Vector3.ZERO, 7, false)
		for side: float in [-1.0, 1.0]:
			for yy: float in [1.7, h - 0.5]:
				c.box(k.poutre, Vector3(0, yy, side * 0.2), Vector3(len, 0.15, 0.1))
		var s := BoxShape3D.new()
		s.size = Vector3(len, h + 0.5, 0.7)
		_collide(s, Transform3D(Basis(Vector3.UP, rot), Vector3(mid.x, y + (h + 0.5) / 2, mid.y)))
	c.xf = Transform3D.IDENTITY


## Une tour de guet (yagura) : quatre poteaux qui s'évasent, contreventés en
## croix, une plate-forme à parapet de planches, un petit toit irimoya, l'échelle.
func _yagura(g: Node3D, at: Vector3) -> void:
	var k := _k()
	var c := _chantier()
	c.xf = Transform3D(Basis(), at)
	for sx: float in [-1.0, 1.0]:
		for sz: float in [-1.0, 1.0]:
			c.beam(k.poutre, Vector3(sx * 1.55, -0.4, sz * 1.55), Vector3(sx * 1.3, 7.85, sz * 1.3), 0.24, 0.24, Vector3.FORWARD if absf(sx) > 0 else Vector3.UP)
			c.box(k.pierre, Vector3(sx * 1.55, 0.05, sz * 1.55), Vector3(0.6, 0.3, 0.6))
	for side in 4:
		var bs := Basis(Vector3.UP, side * PI / 2)
		for y: float in [0.5, 3.1]:
			c.beam(k.poutre, bs * Vector3(-1.5, y, 1.5), bs * Vector3(1.4, y + 2.5, 1.45), 0.12, 0.14, bs * Vector3.BACK)
			c.beam(k.poutre, bs * Vector3(1.5, y, 1.5), bs * Vector3(-1.4, y + 2.5, 1.45), 0.12, 0.14, bs * Vector3.BACK)
			c.beam(k.poutre, bs * Vector3(-1.5, y, 1.5), bs * Vector3(1.5, y, 1.5), 0.13, 0.15)
	c.box(k.planches, Vector3(0, 6.0, 0), Vector3(3.4, 0.2, 3.4))
	for side in 4:
		var bs := Basis(Vector3.UP, side * PI / 2)
		c.boxb(k.poutre, bs * Vector3(0, 5.85, 1.62), Vector3(3.4, 0.22, 0.2), bs)
		c.boxb(k.planches, bs * Vector3(0, 6.55, 1.62), Vector3(3.3, 0.9, 0.08), bs)
		c.boxb(k.poutre, bs * Vector3(0, 7.03, 1.62), Vector3(3.4, 0.08, 0.14), bs)
	c.roof(Vector3(0, 7.9, 0), 2.25, 2.25, 1.15, k.roof, {"hip": 0.4, "up": 0.3, "thick": 0.12})
	# l'échelle, sur la face qui regarde la cour
	for x: float in [-0.3, 0.3]:
		c.beam(k.poutre, Vector3(x, 0.0, 2.25), Vector3(x, 6.1, 1.75), 0.07, 0.07)
	for i in 12:
		var t := (i + 0.5) / 12.0
		c.box(k.poutre, Vector3(0, t * 6.0, 2.25 - t * 0.5), Vector3(0.62, 0.05, 0.06))
	c.build(g, "Tour de guet")
	_solid(g, at + Vector3(0, 6.0, 0), Vector3(3.4, 0.3, 3.4))
	for sx: float in [-1.0, 1.0]:
		for sz: float in [-1.0, 1.0]:
			_solid(g, at + Vector3(sx * 1.45, 3.0, sz * 1.45), Vector3(0.3, 6.0, 0.3))


## Un sakura : un tronc noueux et des nuages de fleurs roses.
func _sakura(parent: Node3D, pos: Vector3, s := 1.0) -> void:
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.scale = Vector3.ONE * s
	_cyl(g, Vector3(0, 1.4, 0), 0.22, 0.4, 2.8, mats.bois)
	for i in 5:
		var a := float(i) / 5.0 * TAU
		var br := _cyl(g, Vector3(sin(a) * 0.7, 2.9, cos(a) * 0.7), 0.06, 0.14, 2.0, mats.bois, false)
		br.rotation = Vector3(cos(a) * 0.9, 0, -sin(a) * 0.9)
	var r := RandomNumberGenerator.new()
	r.seed = int(pos.x * 7.0 + pos.z * 13.0)
	for i in 16:
		var a := r.randf() * TAU
		var d := r.randf_range(0.4, 2.6)
		var sm := SphereMesh.new(); sm.radius = r.randf_range(0.8, 1.4); sm.height = sm.radius * 1.5; sm.radial_segments = 8; sm.rings = 5
		_place(g, sm, mats.sakura, Vector3(sin(a) * d, 3.4 + r.randf_range(0.0, 1.5), cos(a) * d))
	# les pétales qui tombent
	var petals := CPUParticles3D.new()
	petals.amount = 50
	petals.lifetime = 6.0
	petals.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	petals.emission_box_extents = Vector3(2.6, 0.6, 2.6)
	petals.gravity = Vector3(0.35, -0.45, 0.1)
	petals.initial_velocity_min = 0.05
	petals.initial_velocity_max = 0.3
	petals.angular_velocity_min = -200.0
	petals.angular_velocity_max = 200.0
	var q := QuadMesh.new(); q.size = Vector2(0.06, 0.05)
	var pm := StandardMaterial3D.new()
	pm.albedo_color = Color(1.0, 0.7, 0.8)
	pm.cull_mode = BaseMaterial3D.CULL_DISABLED
	pm.emission_enabled = true
	pm.emission = Color(0.6, 0.25, 0.3)
	q.material = pm
	petals.mesh = q
	g.add_child(petals)
	petals.position = Vector3(0, 3.8, 0)
	emitters.append(petals)


func _barrel(parent: Node3D, pos: Vector3) -> void:
	_cyl(parent, pos + Vector3(0, 0.45, 0), 0.36, 0.36, 0.9, mats.bois)
	for y: float in [0.2, 0.7]:
		_cyl(parent, pos + Vector3(0, y, 0), 0.375, 0.375, 0.05, mats.corde, false)


func _crate(parent: Node3D, pos: Vector3, s := 0.8) -> void:
	_box(parent, pos + Vector3(0, s / 2, 0), Vector3(s, s, s), mats.bois, Vector3(0, _rng.randf() * 0.5, 0))


## Un râtelier de katanas : on peut en emporter un (les pillages d'Akagane,
## l'étal du marchand). colors : la teinte de chaque lame exposée.
func _rack(parent: Node3D, pos: Vector3, rot_y: float, colors: Array, katana := "") -> void:
	var g := Node3D.new()
	parent.add_child(g)
	g.position = pos
	g.rotation.y = rot_y
	for s: float in [-1.0, 1.0]:
		_box(g, Vector3(s * 0.7, 0.6, 0), Vector3(0.1, 1.2, 0.3), mats.laque)
	var blades := Node3D.new()
	g.add_child(blades)
	for i in colors.size():
		var y := 0.4 + i * 0.32
		_box(g, Vector3(0, y - 0.04, 0), Vector3(1.5, 0.04, 0.3), mats.bois, Vector3.ZERO, false)
		var steel := StandardMaterial3D.new()
		steel.albedo_color = Color(0.85, 0.88, 0.92)
		steel.metallic = 1.0
		steel.roughness = 0.2
		steel.emission_enabled = true
		steel.emission = colors[i]
		steel.emission_energy_multiplier = 0.8
		_box(blades, Vector3(0.1, y + 0.03, 0), Vector3(1.05, 0.03, 0.012), steel, Vector3(0, 0, 0.03), false)
		_box(blades, Vector3(-0.6, y + 0.03, 0), Vector3(0.28, 0.035, 0.035), mats.rouge, Vector3.ZERO, false)
	if katana != "":
		racks.append({"pos": g.global_position, "katana": katana, "blades": blades, "taken": false})


## Une meule de paille : elle prend feu au moindre tison.
func _meule(parent: Node3D, pos: Vector3) -> void:
	var m := CylinderMesh.new()
	m.top_radius = 0.5
	m.bottom_radius = 1.1
	m.height = 1.8
	m.radial_segments = 10
	var mi := _place(parent, m, mats.paille, pos + Vector3(0, 0.9, 0))
	var s := CylinderShape3D.new()
	s.radius = 1.0
	s.height = 1.8
	var cs := _collide(s, parent.global_transform * mi.transform)
	var cap := SphereMesh.new()
	cap.radius = 0.55
	cap.height = 0.6
	_place(mi, cap, mats.paille, Vector3(0, 0.9, 0))
	flammables.append({"pos": mi.global_position - Vector3(0, 0.9, 0), "r": 1.3, "node": mi, "shape": cs, "kind": "paille", "burnt": false})


## L'étal du marchand : un comptoir de planches, quatre poteaux, un petit toit
## de tuiles, l'enseigne, des rouleaux d'étoffe et des paniers.
func _etal(sg: Node3D) -> void:
	var k := _k()
	var c := _chantier()
	c.box(k.planches, Vector3(0, 0.5, 0.6), Vector3(4.2, 1.0, 0.9))
	c.box(k.poutre, Vector3(0, 1.03, 0.6), Vector3(4.4, 0.07, 1.05))
	for x: float in [-2.1, 2.1]:
		for z: float in [-1.2, 1.2]:
			c.box(k.poutre, Vector3(x, 1.35, z), Vector3(0.13, 2.7, 0.13))
	c.box(k.poutre, Vector3(0, 2.62, 1.2), Vector3(4.5, 0.16, 0.16))
	c.box(k.poutre, Vector3(0, 2.62, -1.2), Vector3(4.5, 0.16, 0.16))
	c.roof(Vector3(0, 2.72, 0), 2.6, 1.85, 0.75, k.roof, {"up": 0.1, "thick": 0.1})
	c.panel(k.noren[0], Vector3(0, 2.25, 1.32), Vector2(4.0, 0.7), Vector3.ZERO, true)
	_kanban(c, Vector3(2.75, 0, 1.4), 2)
	# des rouleaux d'étoffe, des paniers, une balance
	var cloth := [_plain(Color(0.5, 0.12, 0.08), 0.9), _plain(Color(0.12, 0.16, 0.3), 0.9), _plain(Color(0.55, 0.45, 0.2), 0.9)]
	for i in 4:
		c.cyl(cloth[i % 3], Vector3(-1.6 + i * 0.32, 1.17, 0.85), 0.09, 0.09, 0.6, Vector3(PI / 2, 0, 0), 8)
	for i in 2:
		c.cyl(k.bambou, Vector3(0.9 + i * 0.6, 1.2, 0.6), 0.22, 0.16, 0.28, Vector3.ZERO, 10)
	c.build(sg, "Étal")
	_solid(sg, Vector3(0, 0.5, 0.6), Vector3(4.2, 1.0, 0.9))


## Le Registre des Lames : un tableau couvert sur un socle de pierre, ses six
## plaques de papier, son petit toit de tuiles.
func _registre(rg: Node3D) -> void:
	var k := _k()
	var c := _chantier()
	for s: float in [-1.0, 1.0]:
		c.box(k.pierre, Vector3(s * 1.3, 0.15, 0), Vector3(0.4, 0.3, 0.4))
		c.box(k.vermillon, Vector3(s * 1.3, 1.4, 0), Vector3(0.16, 2.5, 0.16))
	c.box(k.planches, Vector3(0, 1.5, 0), Vector3(2.45, 1.45, 0.08))
	c.box(k.poutre, Vector3(0, 2.28, 0.02), Vector3(2.75, 0.12, 0.14))
	c.box(k.poutre, Vector3(0, 0.72, 0.02), Vector3(2.75, 0.1, 0.14))
	for i in 6:
		c.box(k.lueur, Vector3(-0.8 + (i % 3) * 0.8, 1.8 - (i / 3) * 0.6, 0.06), Vector3(0.6, 0.44, 0.03))
		c.box(k.poutre, Vector3(-0.8 + (i % 3) * 0.8, 2.06 - (i / 3) * 0.6, 0.07), Vector3(0.04, 0.1, 0.04))
	c.roof(Vector3(0, 2.62, 0), 1.65, 0.62, 0.5, k.roof, {"up": 0.12, "thick": 0.08})
	c.build(rg, "Registre")
	_solid(rg, Vector3(0, 1.3, 0), Vector3(2.8, 2.6, 0.3))


# ---------- Hōjō-machi, la ville libre ----------

func _hojo(c: Vector3, p: Dictionary) -> void:
	var g := _group(c)
	zones.append({"id": "hojo", "center": Vector2(c.x, c.z), "size": Vector2(29, 31), "kind": "ville"})
	var W := 28.0
	var D := 30.0
	# l'enceinte, ouverte au sud (vers l'autel) et au nord (vers le lac)
	var corners := [Vector2(-W, -D), Vector2(W, -D), Vector2(W, D), Vector2(-W, D)]
	var walls := _chantier()
	for i in 4:
		var a: Vector2 = corners[i] + Vector2(c.x, c.z)
		var b: Vector2 = corners[(i + 1) % 4] + Vector2(c.x, c.z)
		if i == 0 or i == 2:
			# une porte au milieu des côtés nord et sud
			var mid := (a + b) / 2.0
			var dir := (b - a).normalized()
			_enceinte(walls, a, mid - dir * 4.0)
			_enceinte(walls, mid + dir * 4.0, b)
		else:
			_enceinte(walls, a, b)
	walls.build(self, "Enceinte de Hōjō")
	_gate(g, _at(c, 0, D) - c, 0.0, Color(0.85, 0.85, 0.82))
	_gate(g, _at(c, 0, -D) - c, PI, Color(0.85, 0.85, 0.82))

	# la grand-rue nord-sud et la rue de traverse : des dalles
	_plaza(g, _at(c, 0, 0) - c + Vector3(0, -0.12, 0), Vector2(6, D * 2))
	_plaza(g, _at(c, 0, 0) - c + Vector3(0, -0.13, 0), Vector2(W * 2 - 2, 5))
	# les maisons qui bordent la grand-rue
	var houses := [[-8.5, -22.0, 7.0, 6.0], [8.5, -21.0, 6.5, 6.0], [-8.5, -12.5, 6.0, 5.5], [8.5, 14.0, 6.5, 5.5],
		[-8.5, 21.0, 7.0, 6.0], [8.5, 22.0, 6.0, 5.5], [-19.5, 22.0, 6.0, 5.5], [19.5, -22.0, 6.0, 5.0]]
	houses.append_array([[-8.5, -5.0, 5.0, 5.5], [8.5, -15.2, 5.2, 5.5], [-21.5, 5.5, 5.4, 5.0], [20.0, -11.0, 6.0, 5.0], [19.5, 21.0, 6.0, 5.5]])
	for i in houses.size():
		var h: Array = houses[i]
		var rot := -PI / 2 if h[0] > 0 else PI / 2
		_machiya(g, _at(c, h[0], h[1]) - c, rot, h[2], h[3], {"noren": [0, 3, 0, 3][i % 4], "sign": 3 if i == 2 else -1, "light": i % 2 == 0})
	# un entrepôt de riz, et la tour de guet à incendie avec sa cloche
	var kr := Node3D.new()
	g.add_child(kr)
	kr.position = _at(c, -19.0, -5.4) - c
	_kura(kr, 4.4, 4.6, false)
	_hinomi(g, _at(c, 14.5, -16.0) - c)
	# des lanternes de pierre le long de la grand-rue, des bannières
	for z: float in [-18.0, -6.0, 6.0, 18.0]:
		_lantern(g, _at(c, -3.6, z) - c, int(z) % 12 == 6)
		_nobori(g, _at(c, 3.6, z + 2.0) - c, Color(0.85, 0.82, 0.78), PI / 2)

	# ── le marché : l'étal du marchand de lames, à l'est de la croisée
	var stall := _at(c, 9.0, 4.5) - c
	var sg := Node3D.new()
	g.add_child(sg)
	sg.position = stall
	sg.rotation.y = -PI / 2
	_etal(sg)
	_rack(sg, Vector3(0, 0, -1.0), 0.0, [Color(0.55, 0.9, 0.7), Color(1.0, 0.55, 0.7), Color(0.3, 0.8, 0.3)])
	_chochin(sg, Vector3(-1.8, 2.4, 1.1))
	_chochin(sg, Vector3(1.8, 2.4, 1.1), false)
	for k in 3:
		_crate(sg, Vector3(-1.6 + k * 0.9, 0, -1.8), 0.6)
	shop = {"pos": g.global_transform * (stall + Vector3(-1.9, 0, 0)), "yaw": PI / 2}
	_folk("marchand", "merchant", "hojo", _at(c, 9.8, 4.5), -PI / 2, {"idle": "comptoir", "id": "daikoku", "name": "Daikoku le marchand", "armed": false})
	spots.marche = _at(c, 6.0, 4.5)

	# ── la taverne de la Lanterne Rouge, ouverte sur la rue
	var tav := _machiya(g, _at(c, -10.0, 5.0) - c, PI / 2, 8.0, 7.0, {"open": true, "noren": 1, "sign": 0, "lantern": false, "props": false})
	for z: float in [-2.6, -1.0, 1.0, 2.6]:
		_chochin(tav, Vector3(z, 2.7, 4.0), z == -1.0)
	_light(tav, Vector3(0, 2.2, 0), Color(1.0, 0.55, 0.25), 1.8, 7.0)
	_box(tav, Vector3(0, 0.95, -1.8), Vector3(5.0, 1.1, 0.7), mats.laque)
	for x: float in [-2.5, -1.5, 2.2]:
		_barrel(tav, Vector3(x, 0.4, -2.9))
	for k in 2:
		_box(tav, Vector3(-1.6 + k * 3.2, 0.62, 3.6), Vector3(2.2, 0.12, 0.6), mats.bois)
	spots.taverne = _at(c, -6.0, 3.6)
	_folk("jubei", "samurai", "hojo", _at(c, -6.4, 3.4), PI / 2, {"idle": "boire", "id": "jubei", "name": "Yagyū Jūbei"})
	_folk("paysan", "civil", "hojo", _at(c, -10.5, 6.2), PI, {"idle": "assis-sol", "name": "Un buveur", "armed": false})
	_folk("paysan", "civil", "hojo", _at(c, -6.5, 7.6), PI / 2, {"idle": "parler", "name": "Un paysan", "armed": false})

	# ── la maison de thé du Saule, à l'est, avec son ombrelle rouge
	var tea := _machiya(g, _at(c, 10.0, -9.0) - c, -PI / 2, 6.5, 5.5, {"noren": 2, "sign": 1})
	var para := CylinderMesh.new(); para.top_radius = 0.0; para.bottom_radius = 1.6; para.height = 0.6; para.radial_segments = 16
	_place(g, para, mats.rouge, _at(c, 5.2, -9.5) - c + Vector3(0, 2.4, 0))
	_cyl(g, _at(c, 5.2, -9.5) - c + Vector3(0, 1.1, 0), 0.03, 0.03, 2.2, mats.bois, false)
	_box(g, _at(c, 5.2, -10.8) - c + Vector3(0, 0.45, 0), Vector3(2.2, 0.12, 0.8), _plain(Color(0.6, 0.1, 0.08), 0.9))
	tea.name = "Maison de thé"
	spots.the = _at(c, 5.0, -8.0)
	_folk("oyuki", "samurai", "hojo", _at(c, 5.6, -8.2), -PI / 2 - 0.4, {"idle": "femme", "id": "oyuki", "name": "Oyuki, la Dame des Neiges"})
	_folk("villageoise", "civil", "hojo", _at(c, 4.6, -10.6), 0.3, {"idle": "parler", "name": "Une servante", "armed": false})

	# ── le dojo, au fond de la ville, et sa cour d'entraînement
	var dj := _dojo(g, _at(c, 0, -24.5) - c)
	_light(dj, Vector3(0, 3.0, -0.5), Color(1.0, 0.6, 0.3), 2.0, 9.0)
	_lantern(dj, Vector3(-3.2, 0.25, 5.2))
	_lantern(dj, Vector3(3.2, 0.25, 5.2), false)
	# les poteaux de frappe (makiwara)
	for x: float in [-6.0, -3.0, 3.0, 6.0]:
		var mk := _at(c, x, -16.5) - c
		_cyl(g, mk + Vector3(0, 0.9, 0), 0.12, 0.14, 1.8, mats.bois)
		_cyl(g, mk + Vector3(0, 1.3, 0), 0.16, 0.16, 0.5, mats.paille, false)
	# le Registre des Lames : un tableau couvert, ses plaques de bois suspendues
	var reg := _at(c, 5.5, -18.5) - c
	var rg := Node3D.new()
	g.add_child(rg)
	rg.position = reg
	rg.rotation.y = -0.4
	_registre(rg)
	_light(rg, Vector3(0, 2.2, 0.8), Color(1.0, 0.6, 0.3), 1.2, 4.0)
	registry = {"pos": g.global_transform * (reg + Vector3(0, 0, 0.9))}
	spots.dojo = _at(c, 0, -19.5)
	# l'arène des duels : la grand-rue, entre la croisée et le dojo
	spots.arene = _at(c, 0, -7.0)
	_folk("noble", "samurai", "hojo", _at(c, 0.0, -19.0), 0.0, {"idle": "guet", "id": "kagetora", "name": "Hōjō Kagetora"})
	_folk("garde", "civil", "hojo", _at(c, -4.0, -15.5), PI, {"idle": "accueil", "name": "Un élève du dojo", "armed": true})

	# ── le sanctuaire sous le sakura
	var sh := _at(c, -17.0, -12.0) - c
	_plaza(g, sh + Vector3(0, -0.1, 0), Vector2(8, 8))
	_honden(g, sh + Vector3(0, 0, -3.2))
	_torii(g, sh + Vector3(0, 0, 3.2), 0.0, 0.42)
	_sakura(g, sh + Vector3(-2.6, 0, 0.4), 1.15)
	_lantern(g, sh + Vector3(2.4, 0, 1.6))
	shrines.append({"pos": g.global_transform * (sh + Vector3(0, 0, -0.8)), "name": "Sanctuaire de Hōjō"})
	spots.sanctuaire = g.global_transform * (sh + Vector3(0.0, 0, 0.4))
	_folk("onnamusha", "samurai", "hojo", g.global_transform * (sh + Vector3(0.5, 0, -0.3)), PI, {"idle": "priere", "id": "tomoe", "name": "Tomoe la Lame Pourpre"})

	# ── le bassin aux carpes et son pont en arc
	var pond := _at(c, -15.0, 13.0) - c
	var pm := CylinderMesh.new(); pm.top_radius = 5.0; pm.bottom_radius = 5.0; pm.height = 0.05; pm.radial_segments = 32
	_place(g, pm, mats.eau, pond + Vector3(0, 0.05, 0))
	for i in 18:
		var a := float(i) / 18.0 * TAU
		_box(g, pond + Vector3(sin(a) * 5.3, 0.12, cos(a) * 5.3), Vector3(0.9, 0.35, 0.7), mats.pierre, Vector3(0, a, 0), false)
	# le pont : des planches en arc et une rambarde rouge
	for i in 9:
		var t := float(i) / 8.0
		var y := sin(t * PI) * 0.9
		_box(g, pond + Vector3(-5.6 + t * 11.2, 0.25 + y, 0), Vector3(1.35, 0.16, 2.0), mats.bois, Vector3(0, 0, -cos(t * PI) * 0.28))
		for s: float in [-1.0, 1.0]:
			_cyl(g, pond + Vector3(-5.6 + t * 11.2, 0.75 + y, s * 0.95), 0.04, 0.04, 0.8, mats.rouge, false)
	for s: float in [-1.0, 1.0]:
		for i in 8:
			var t := (float(i) + 0.5) / 8.0
			_box(g, pond + Vector3(-5.6 + t * 11.2, 1.1 + sin(t * PI) * 0.9, s * 0.95), Vector3(1.45, 0.06, 0.06), mats.rouge, Vector3(0, 0, -cos(t * PI) * 0.28), false)
	spots.pont = g.global_transform * (pond + Vector3(0, 1.2, 0))
	for k in 6:
		var a := float(k) / 6.0 * TAU
		wells.append(g.global_transform * (pond + Vector3(sin(a) * 5.6, 0, cos(a) * 5.6)))
	spots.bassin = g.global_transform * (pond + Vector3(4.0, 0, 5.2))
	_folk("moine", "samurai", "hojo", spots.pont, PI / 2, {"idle": "guet", "id": "benkei", "name": "Musashibō Benkei"})
	_folk("kojiro", "samurai", "hojo", g.global_transform * (pond + Vector3(3.6, 0, 6.0)), PI + 0.5, {"idle": "seiza", "id": "kojiro", "name": "Sasaki Kojirō"})
	_lantern(g, pond + Vector3(6.2, 0, -3.5))

	# ── les jardins potagers, le puits
	for k in 3:
		var bed := _at(c, 19.0, 3.0 + k * 3.2) - c
		_box(g, bed + Vector3(0, 0.15, 0), Vector3(6.0, 0.3, 2.0), _plain(Color(0.16, 0.11, 0.07), 1.0), Vector3.ZERO, false)
		for x in 6:
			_cyl(g, bed + Vector3(-2.5 + x, 0.45, 0), 0.0, 0.18, 0.4, _plain(Color(0.16, 0.26, 0.1), 1.0), false)
	_folk("paysan", "civil", "hojo", _at(c, 17.5, 4.6), PI, {"idle": "cueillir", "name": "Un maraîcher", "armed": false})
	_folk("villageoise", "civil", "hojo", _at(c, 20.5, 7.8), PI, {"idle": "cueillir", "name": "Une jardinière", "armed": false})
	# des meules de paille, près des jardins : elles flambent comme des torches
	for mp in [Vector2(23.5, -3.0), Vector2(24.0, 12.5)]:
		_meule(g, _at(c, mp.x, mp.y) - c)
	var well := _at(c, 3.0, 25.0) - c
	wells.append(g.global_transform * well)
	_puits(g, well)
	for k in 4:
		_barrel(g, _at(c, -3.8 + (k % 2) * 0.8, -1.8 - (k / 2) * 0.8) - c)
	_crate(g, _at(c, 4.2, 9.0) - c)
	_crate(g, _at(c, 4.6, 10.0) - c, 0.6)

	# ── la garde de la ville : deux hommes à chaque porte, une ronde dans la grand-rue
	for z: float in [D + 2.6, -D - 2.6]:
		for s: float in [-1.0, 1.0]:
			var yaw := 0.0 if z > 0 else PI
			var who := "saito" if z > 0 and s == -1 else ""
			_folk("garde", "guard", "hojo", _at(c, s * 2.6, z), yaw, {"idle": "repos", "id": who, "name": "Le capitaine Saitō" if who != "" else "Un garde de Hōjō", "post": true})
	var ronde := [_at(c, -1.8, 26.0), _at(c, -1.8, -12.0), _at(c, 1.8, -12.0), _at(c, 1.8, 26.0)]
	_folk("garde", "guard", "hojo", ronde[0], 0.0, {"route": ronde, "name": "Un garde de Hōjō"})
	var ronde2 := [_at(c, -24.0, 1.0), _at(c, 24.0, 1.0)]
	_folk("garde", "guard", "hojo", ronde2[0], 0.0, {"route": ronde2, "name": "Un garde de Hōjō"})

	# ── les promeneurs : ils vont d'un point de la ville à un autre
	var pts := [_at(c, -1.5, 24.0), _at(c, 1.5, 12.0), _at(c, -1.5, 2.5), _at(c, 1.5, -6.0), _at(c, -1.5, -14.0),
		_at(c, -14.0, 0.5), _at(c, 14.0, -1.0), _at(c, -22.0, -1.5), _at(c, 22.0, 0.5), _at(c, -6.5, 6.0), _at(c, 5.0, -6.5)]
	streets.hojo = pts
	var walkers := [["paysan", "Un porteur d'eau"], ["villageoise", "Une marchande de riz"], ["paysan", "Un vieil homme"],
		["villageoise", "Une jeune femme"], ["paysan", "Un charpentier"], ["villageoise", "Une lavandière"]]
	for i in walkers.size():
		var start: Vector3 = pts[(i * 3) % pts.size()]
		var old: bool = walkers[i][1] == "Un vieil homme"
		var fem: bool = walkers[i][0] == "villageoise"
		_folk(walkers[i][0], "civil", "hojo", start, _rng.randf() * TAU, {"walker": true, "name": walkers[i][1], "armed": false,
			"idle": "vieux" if old else ("femme" if fem else "repos"), "walk": "vieux-marche" if old else ("femme-marche" if fem else "marche")})
	# deux commères qui bavardent, un homme en prière
	_folk("villageoise", "civil", "hojo", _at(c, -3.2, 15.0), PI / 2, {"idle": "parler", "name": "Une commère", "armed": false})
	_folk("paysan", "civil", "hojo", _at(c, -1.6, 15.0), -PI / 2, {"idle": "ecouter", "name": "Un voisin", "armed": false})


## La grande salle du commandant : podium de pierre, colonnes vermillon,
## murs de planches noires et de plâtre, la plaque 赤金, un toit irimoya aux
## coins dressés et ses poissons dorés.
func _grande_salle(g: Node3D, at: Vector3) -> void:
	var k := _k()
	var c := _chantier()
	c.xf = Transform3D(Basis(), at)
	var W := 15.0
	var D := 7.4
	var yf := 1.0
	var yt := yf + 3.6
	c.box(k.pierre, Vector3(0, 0.25, 0), Vector3(16.0, 1.5, 8.0))
	c.box(k.poutre, Vector3(0, yf + 0.03, 0), Vector3(15.6, 0.06, 7.6))
	for i in 4:
		c.box(k.pierre, Vector3(0, 0.12 + i * 0.22, 4.0 + (3 - i) * 0.35), Vector3(4.0, 0.22, 0.35))
	for i in 6:
		var x := -W / 2 + i * W / 5.0
		c.cyl(k.vermillon, Vector3(x, (yf + yt) / 2, 3.6), 0.25, 0.28, yt - yf, Vector3.ZERO, 10)
	_mur(c, Vector3(-W / 2, 0, -D / 2), Vector3(W / 2, 0, -D / 2), yf, yt, -1.0, 1.6)
	_mur(c, Vector3(-W / 2, 0, 3.4), Vector3(-W / 2, 0, -D / 2), yf, yt, -1.0, 1.6)
	_mur(c, Vector3(W / 2, 0, -D / 2), Vector3(W / 2, 0, 3.4), yf, yt, -1.0, 1.6)
	c.box(k.vermillon, Vector3(0, yt + 0.12, 3.6), Vector3(W + 0.8, 0.32, 0.36))
	c.box(k.vermillon, Vector3(0, yt - 0.9, 3.6), Vector3(W + 0.4, 0.18, 0.26))
	for i in 12:
		var x := -W / 2 + i * W / 11.0
		c.box(k.poutre, Vector3(x, yt + 0.38, 3.95), Vector3(0.24, 0.16, 0.8))
	c.panel(k.plaques[2], Vector3(0, yt - 0.42, 3.8), Vector2(2.2, 1.0))
	# l'estrade du commandant, son paravent
	c.box(k.tatami, Vector3(0, yf + 0.12, -2.2), Vector3(5.0, 0.2, 2.4))
	for i in 6:
		c.box(k.or if i % 2 == 0 else k.sombre, Vector3(-2.0 + i * 0.8, yf + 1.1, -3.45), Vector3(0.78, 1.8, 0.05), Vector3(0, (i % 2) * 0.35 - 0.17, 0))
	c.roof(Vector3(0, yt + 0.48, 0.1), W / 2 + 1.5, D / 2 + 1.7, 3.0, k.roof, {"hip": 0.45, "up": 0.55, "thick": 0.24, "shachi": true})
	c.build(g, "Grande salle")
	_solid(g, at + Vector3(0, 0.25, 0), Vector3(16.0, 1.5, 8.0))
	_solid(g, at + Vector3(0, (yf + yt) / 2, -D / 2), Vector3(W, yt - yf, 0.3))
	for s: float in [-1.0, 1.0]:
		_solid(g, at + Vector3(s * W / 2, (yf + yt) / 2, 0), Vector3(0.3, yt - yf, D))


## Un entrepôt (kura) : des murs de plâtre épais, un soubassement de tuiles
## sombres, de petites fenêtres grillées, une porte aux montants à gradins.
## L'armurerie d'Akagane est un kura de 7 × 6,2 m dont on enfonce la porte ;
## ceux de Hōjō, plus petits, gardent leurs lourds battants clos.
func _kura(kg: Node3D, w := 7.0, d := 6.2, open := true) -> void:
	var k := _k()
	var c := _chantier()
	var y0 := 0.6
	var y1 := 3.8 if w > 5.0 else 3.4
	var hw := w / 2
	var hd := d / 2 - 0.1
	var side := (w - 1.2) / 2
	c.box(k.pierre, Vector3(0, 0.15, 0), Vector3(w + 0.4, 0.9, d + 0.2))
	for wall in [[Vector3(0, 0, -hd), Vector3(w, 0, 0.32)], [Vector3(-hw, 0, 0), Vector3(0.32, 0, d)], [Vector3(hw, 0, 0), Vector3(0.32, 0, d)],
			[Vector3(-(hw - side / 2), 0, hd), Vector3(side, 0, 0.32)], [Vector3(hw - side / 2, 0, hd), Vector3(side, 0, 0.32)]]:
		var at: Vector3 = wall[0]
		var sz: Vector3 = wall[1]
		c.box(k.platre, at + Vector3(0, (y0 + y1) / 2, 0), Vector3(sz.x, y1 - y0, sz.z))
		c.box(k.kawara, at + Vector3(0, y0 + 0.55, 0), Vector3(sz.x + 0.04, 1.1, sz.z + 0.04))
		c.box(k.blanc, at + Vector3(0, y0 + 1.12, 0), Vector3(sz.x + 0.06, 0.06, sz.z + 0.06))
		for j in 3:
			c.box(k.blanc, at + Vector3(0, y0 + 0.2 + j * 0.3, 0), Vector3(sz.x + 0.05, 0.03, sz.z + 0.05))
	c.box(k.platre, Vector3(0, (y1 + 2.8) / 2, hd), Vector3(1.2, y1 - 2.8, 0.32))
	# les montants à gradins autour de la porte
	for i in 3:
		var e := 0.15 + i * 0.12
		c.box(k.platre, Vector3(0, 2.95 + i * 0.08, hd + 0.18 + i * 0.06), Vector3(1.2 + e * 2.0, 0.16, 0.08))
		for sx: float in [-1.0, 1.0]:
			c.box(k.platre, Vector3(sx * (0.6 + e), 1.75, hd + 0.18 + i * 0.06), Vector3(0.12, 2.45, 0.08))
	if not open:
		# les lourds battants de plâtre, clos, et leur serrure de fer
		for sx: float in [-1.0, 1.0]:
			c.box(k.platre, Vector3(sx * 0.3, 1.7, hd + 0.02), Vector3(0.58, 2.2, 0.22))
		c.box(k.fer, Vector3(0, 1.6, hd + 0.15), Vector3(0.12, 0.3, 0.06))
	# les petites fenêtres grillées, haut sur les côtés
	for sx: float in [-1.0, 1.0]:
		c.box(k.sombre, Vector3(sx * (hw + 0.17), y1 - 0.8, 0), Vector3(0.04, 0.55, 0.8))
		c.box(k.platre, Vector3(sx * (hw + 0.2), y1 - 0.48, 0), Vector3(0.12, 0.1, 1.0))
		for j in 4:
			c.box(k.fer, Vector3(sx * (hw + 0.2), y1 - 0.8, -0.3 + j * 0.2), Vector3(0.03, 0.55, 0.03))
	c.roof(Vector3(0, y1 + 0.02, 0), hw + 0.5, d / 2 + 0.65, 1.55 * d / 6.2, k.roof, {"up": 0.08, "thick": 0.2})
	for sx: float in [-1.0, 1.0]:
		c.gable(k.platre, sx * hw, -hd - 0.1, hd + 0.1, y1, Vector3(sx, 0, 0), 0.2)
	c.build(kg, "Kura")
	_solid(kg, Vector3(0, 0.3, 0), Vector3(w + 0.4, 0.6, d + 0.2))
	_solid(kg, Vector3(0, (y0 + y1) / 2, -hd), Vector3(w, y1 - y0, 0.3))
	for s: float in [-1.0, 1.0]:
		_solid(kg, Vector3(s * hw, (y0 + y1) / 2, 0), Vector3(0.3, y1 - y0, d))
		_solid(kg, Vector3(s * (hw - side / 2), (y0 + y1) / 2, hd), Vector3(side, y1 - y0, 0.3))
	_solid(kg, Vector3(0, (y1 + 2.8) / 2 + 0.3, hd), Vector3(1.2, y1 - 2.8, 0.3))
	if not open:
		_solid(kg, Vector3(0, 1.7, hd), Vector3(1.2, 2.3, 0.3))


## La tour de guet à incendie (hinomi-yagura) : une échelle de poteaux haute
## de neuf mètres, une plate-forme, la cloche d'alarme sous son petit toit.
func _hinomi(g: Node3D, at: Vector3) -> void:
	var k := _k()
	var c := _chantier()
	c.xf = Transform3D(Basis(), at)
	for sx: float in [-1.0, 1.0]:
		for sz: float in [-1.0, 1.0]:
			c.beam(k.poutre, Vector3(sx * 1.0, -0.3, sz * 1.0), Vector3(sx * 0.75, 9.4, sz * 0.75), 0.18, 0.18, Vector3.FORWARD)
			c.box(k.pierre, Vector3(sx * 1.0, 0.05, sz * 1.0), Vector3(0.45, 0.3, 0.45))
	for side in 4:
		var bs := Basis(Vector3.UP, side * PI / 2)
		for y: float in [0.6, 3.3, 6.0]:
			c.beam(k.poutre, bs * Vector3(-0.97, y, 0.97), bs * Vector3(0.85, y + 2.6, 0.87), 0.09, 0.1, bs * Vector3.BACK)
			c.beam(k.poutre, bs * Vector3(-0.97, y, 0.97), bs * Vector3(0.97, y, 0.97), 0.1, 0.12)
	# l'échelle, la plate-forme, la rambarde
	for x: float in [-0.25, 0.25]:
		c.beam(k.poutre, Vector3(x, 0.0, 1.5), Vector3(x, 8.6, 0.85), 0.06, 0.06)
	for i in 17:
		var t := (i + 0.5) / 17.0
		c.box(k.poutre, Vector3(0, t * 8.6, 1.5 - t * 0.65), Vector3(0.52, 0.045, 0.05))
	c.box(k.planches, Vector3(0, 8.6, 0), Vector3(2.0, 0.14, 2.0))
	for side in 4:
		var bs := Basis(Vector3.UP, side * PI / 2)
		c.boxb(k.poutre, bs * Vector3(0, 9.4, 0.98), Vector3(2.0, 0.07, 0.07), bs)
		for i in 5:
			c.boxb(k.poutre, bs * Vector3(-0.8 + i * 0.4, 9.0, 0.98), Vector3(0.05, 0.8, 0.05), bs)
	# la cloche (hanshō) sous son toit
	for sx: float in [-1.0, 1.0]:
		c.box(k.poutre, Vector3(sx * 0.7, 10.1, 0), Vector3(0.1, 2.9, 0.1))
	c.box(k.poutre, Vector3(0, 10.9, 0), Vector3(1.5, 0.1, 0.1))
	c.cyl(_plain(Color(0.25, 0.2, 0.12), 0.4, 0.9), Vector3(0, 10.5, 0), 0.16, 0.24, 0.5, Vector3.ZERO, 12)
	c.cyl(k.poutre, Vector3(0, 10.82, 0), 0.02, 0.02, 0.15, Vector3.ZERO, 4, false)
	c.roof(Vector3(0, 11.45, 0), 1.25, 1.1, 0.55, k.roof, {"up": 0.15, "thick": 0.08})
	c.build(g, "Hinomi-yagura")
	for sx: float in [-1.0, 1.0]:
		for sz: float in [-1.0, 1.0]:
			_solid(g, at + Vector3(sx * 0.9, 4.5, sz * 0.9), Vector3(0.25, 9.0, 0.25))
	_solid(g, at + Vector3(0, 8.6, 0), Vector3(2.0, 0.2, 2.0))


## Le portique de la cloche (shōrō) : quatre poteaux sur un socle, la poutre
## qui porte la cloche, un petit toit irimoya.
func _shoro(g: Node3D, at: Vector3) -> void:
	var k := _k()
	var c := _chantier()
	c.xf = Transform3D(Basis(), at)
	c.box(k.pierre, Vector3(0, 0.0, 0), Vector3(3.2, 0.5, 2.2))
	for sx: float in [-1.0, 1.0]:
		for sz: float in [-1.0, 1.0]:
			c.box(k.vermillon, Vector3(sx * 1.2, 2.2, sz * 0.75), Vector3(0.2, 4.4, 0.2))
		c.box(k.poutre, Vector3(sx * 1.2, 0.6, 0), Vector3(0.14, 0.14, 1.7))
	c.box(k.vermillon, Vector3(0, 4.0, 0), Vector3(3.0, 0.24, 0.26))
	for sz: float in [-1.0, 1.0]:
		c.box(k.vermillon, Vector3(0, 4.35, sz * 0.75), Vector3(2.8, 0.18, 0.18))
	c.roof(Vector3(0, 4.5, 0), 2.1, 1.6, 0.95, k.roof, {"hip": 0.4, "up": 0.35, "thick": 0.12})
	c.build(g, "Shōrō")
	for sx: float in [-1.0, 1.0]:
		_solid(g, at + Vector3(sx * 1.2, 2.2, 0), Vector3(0.25, 4.4, 1.7))


# ---------- Le fort d'Akagane, tenu par les gens de l'Oni ----------

func _akagane(c: Vector3, p: Dictionary) -> void:
	var g := _group(c)
	zones.append({"id": "akagane", "center": Vector2(c.x, c.z), "size": Vector2(25, 25), "kind": "fort"})
	var R := 24.0
	var red := Color(1.0, 0.55, 0.5)
	var ash := Color(0.62, 0.55, 0.55)
	# l'enceinte : la porte au sud, une brèche au nord-ouest, un muret à l'est
	var cv := Vector2(c.x, c.z)
	var pal := _chantier()
	_palisade(pal, cv + Vector2(-R, R), cv + Vector2(-4.2, R))
	_palisade(pal, cv + Vector2(4.2, R), cv + Vector2(R, R))
	_palisade(pal, cv + Vector2(R, R), cv + Vector2(R, 6.0))
	_wall(cv + Vector2(R, 6.0), cv + Vector2(R, -2.0))          # le muret effondré : on l'enjambe
	_palisade(pal, cv + Vector2(R, -2.0), cv + Vector2(R, -R))
	_palisade(pal, cv + Vector2(R, -R), cv + Vector2(-6.0, -R))
	_palisade(pal, cv + Vector2(-R, -10.0), cv + Vector2(-R, R))
	pal.build(self, "Palissade d'Akagane")
	# la brèche : des planches tombées, des pierres
	for i in 7:
		var at := _at(c, -R + 2.0 + i * 1.6, -R + _rng.randf_range(-1.2, 1.2)) - c
		_box(g, at + Vector3(0, 0.25, 0), Vector3(1.6, 0.35, 0.5), mats.bois, Vector3(_rng.randf() * 0.6, _rng.randf() * TAU, _rng.randf() * 0.5), false)
	_gate(g, _at(c, 0, R) - c, 0.0, Color(0.6, 0.07, 0.05), 2)
	# les tours de guet aux angles : une plate-forme et un guetteur
	var towers := [Vector2(-R + 2.5, R - 2.5), Vector2(R - 2.5, -R + 2.5)]
	for tw in towers:
		var at := _at(c, tw.x, tw.y) - c
		_yagura(g, at)
		_chochin(g, at + Vector3(1.0, 7.25, 1.0))
		_folk("garde", "guard", "akagane", g.global_transform * (at + Vector3(0, 6.2, 0)), atan2(-tw.x, -tw.y) + PI, {"post": true, "lookout": true, "tint": red, "name": "Un guetteur d'Akagane"})

	# la grande salle du commandant, au nord
	var hall := _at(c, 2.0, -15.0) - c
	_grande_salle(g, hall)
	_light(g, hall + Vector3(0, 3.0, 0), Color(1.0, 0.18, 0.08), 3.0, 12.0)
	var moon := CylinderMesh.new(); moon.top_radius = 1.4; moon.bottom_radius = 1.4; moon.height = 0.05
	var mm := StandardMaterial3D.new()
	mm.albedo_color = Color(0.9, 0.08, 0.05)
	mm.emission_enabled = true
	mm.emission = Color(1.0, 0.1, 0.05)
	mm.emission_energy_multiplier = 2.0
	_place(g, moon, mm, hall + Vector3(0, 3.4, -3.5), Vector3(PI / 2, 0, 0))
	_chest(g, hall + Vector3(5.5, 1.0, -2.0), 0.0, "akagane")
	_folk("chef", "enemy", "akagane", _at(c, 2.0, -13.0), 0.0, {"name": "Gonryū le Cendreux", "id": "gonryu", "tint": red})

	# l'armurerie (kura) : murs blancs, porte à enfoncer, les katanas à piller
	var kura := _at(c, -14.0, -6.0) - c
	var kg := Node3D.new()
	g.add_child(kg)
	kg.position = kura
	kg.rotation.y = PI / 2
	_kura(kg)
	_door(kg, Vector3(0, 0.6, 3.0))
	_light(kg, Vector3(0, 2.4, 0), Color(1.0, 0.45, 0.2), 1.3, 6.0)
	_rack(kg, Vector3(-1.8, 0.6, -2.5), 0.0, [Color(1.0, 0.35, 0.1), Color(0.9, 0.3, 0.15)], "akagane")
	_rack(kg, Vector3(1.8, 0.6, -2.5), 0.0, [Color(0.4, 0.9, 1.0), Color(0.6, 0.6, 0.7)], "kazekiri")
	_chest(kg, Vector3(2.4, 0.6, 1.2), -PI / 2, "akagane_kura")

	# la cloche d'alarme, sur son portique au milieu de la cour
	var bp := _at(c, 6.0, 2.0) - c
	_shoro(g, bp)
	var bell_mesh := CylinderMesh.new(); bell_mesh.top_radius = 0.42; bell_mesh.bottom_radius = 0.62; bell_mesh.height = 1.3
	var bn := _place(g, bell_mesh, _plain(Color(0.25, 0.2, 0.12), 0.4, 0.9), bp + Vector3(0, 3.1, 0))
	var rope := _cyl(g, bp + Vector3(0.75, 2.6, 0), 0.025, 0.025, 1.6, mats.corde, false)
	bell = {"pos": g.global_transform * bp, "node": bn, "rope": rope, "cut": false}

	# les feux de camp, les tentes, les prisonniers
	for fp in [Vector2(-4.0, 8.0), Vector2(12.0, -6.0)]:
		var at := _at(c, fp.x, fp.y) - c
		for i in 8:
			var a := float(i) / 8.0 * TAU
			_box(g, at + Vector3(sin(a) * 0.9, 0.15, cos(a) * 0.9), Vector3(0.35, 0.3, 0.3), mats.pierre, Vector3(0, a, 0), false)
		_light(g, at + Vector3(0, 1.0, 0), Color(1.0, 0.42, 0.14), 4.0, 12.0)
		_fire(g, at + Vector3(0, 0.3, 0))
		fires.append(g.global_transform * at)
	for tp in [Vector2(14.0, 12.0), Vector2(-15.0, 12.0), Vector2(15.0, -15.0)]:
		var at := _at(c, tp.x, tp.y) - c
		var tent := _roof(g, at + Vector3(0, 1.4, 0), 3.6, 4.6, 2.8, mats.toile_sombre, Vector3(0, _rng.randf() * TAU, 0))
		var s := BoxShape3D.new(); s.size = Vector3(3.2, 2.6, 4.2)
		var cs := _collide(s, g.global_transform * tent.transform)
		flammables.append({"pos": tent.global_position - Vector3(0, 1.2, 0), "r": 2.2, "node": tent, "shape": cs, "kind": "tente", "burnt": false})
	for b in [Vector2(-8.0, 20.0), Vector2(8.0, 20.0), Vector2(0.0, -6.0)]:
		_nobori(g, _at(c, b.x, b.y) - c, Color(0.6, 0.07, 0.05))
	# la paille des chevaux, contre la palissade
	for mp in [Vector2(-19.5, 2.0), Vector2(19.0, 18.5), Vector2(-3.0, -19.5)]:
		_meule(g, _at(c, mp.x, mp.y) - c)
	var cage := _at(c, 15.0, 3.0) - c
	for i in 10:
		var a := float(i) / 10.0 * TAU
		if i == 0:
			continue
		_cyl(g, cage + Vector3(sin(a) * 1.5, 1.2, cos(a) * 1.5), 0.05, 0.05, 2.4, mats.bois)
	_cyl(g, cage + Vector3(0, 2.45, 0), 1.7, 1.7, 0.12, mats.bois, false)
	var first := folk.size()
	_folk("paysan", "civil", "hojo", _at(c, 14.5, 2.6), PI, {"idle": "seiza", "name": "Un prisonnier", "armed": false, "prisoner": true})
	_folk("villageoise", "civil", "hojo", _at(c, 15.6, 3.6), -PI / 2, {"idle": "seiza", "name": "Une prisonnière", "armed": false, "prisoner": true})
	cages.append({"pos": g.global_transform * (cage + Vector3(0, 0, 1.6)), "open": false, "prisoners": [first, first + 1]})

	# la garnison : deux à la porte, des rondes, deux autour du feu
	for s: float in [-1.0, 1.0]:
		_folk("garde", "guard", "akagane", _at(c, s * 2.4, R + 2.4), 0.0, {"post": true, "tint": red, "name": "Une sentinelle"})
	var routes := [
		[_at(c, -18.0, 16.0), _at(c, -18.0, -6.0), _at(c, -6.0, -8.0), _at(c, -6.0, 14.0)],
		[_at(c, 18.0, 16.0), _at(c, 18.0, -18.0), _at(c, 8.0, -20.0), _at(c, 8.0, 10.0)],
		[_at(c, -8.0, -20.0), _at(c, 14.0, -20.0)],
		[_at(c, 30.0, 30.0), _at(c, -30.0, 30.0), _at(c, -30.0, -30.0), _at(c, 30.0, -30.0)],
	]
	for i in routes.size():
		_folk("garde" if i != 1 else "ronin", "guard", "akagane", routes[i][0], 0.0, {"route": routes[i], "tint": red if i != 1 else ash, "name": "Une ronde d'Akagane"})
	_folk("garde", "guard", "akagane", _at(c, -0.8, 7.2), PI / 2 + 0.6, {"post": true, "idle": "repos", "tint": red, "name": "Un soldat"})
	_folk("ronin", "guard", "akagane", _at(c, -7.2, 10.6), -PI / 2 - 0.6, {"post": true, "idle": "guet", "tint": ash, "name": "Un rōnin"})
	_folk("garde", "guard", "akagane", _at(c, 12.0, -1.8), PI, {"post": true, "idle": "repos", "tint": red, "name": "Un soldat"})


# ---------- Le cimetière des Lames ----------

## Un champ de tertres où sont plantés les sabres des morts. Une lueur froide
## y flotte ; deux damnés y veillent un coffre.
func _cimetiere(c: Vector3, p: Dictionary) -> void:
	var g := _group(c, 0.3)
	var steel := _plain(Color(0.55, 0.58, 0.62), 0.35, 0.9)
	var rust := _plain(Color(0.3, 0.16, 0.1), 0.8, 0.4)
	var blade := BoxMesh.new()
	blade.size = Vector3(0.03, 1.0, 0.012)
	var hilt := BoxMesh.new()
	hilt.size = Vector3(0.035, 0.26, 0.035)
	var mm := MultiMesh.new()
	mm.transform_format = MultiMesh.TRANSFORM_3D
	mm.mesh = blade
	var mh := MultiMesh.new()
	mh.transform_format = MultiMesh.TRANSFORM_3D
	mh.mesh = hilt
	var xfs := []
	for i in 160:
		var a := _rng.randf() * TAU
		var d := sqrt(_rng.randf()) * 13.0
		var at := _at(c, sin(a) * d, cos(a) * d) - c
		var tilt := Basis.from_euler(Vector3(_rng.randf_range(-0.3, 0.3), _rng.randf() * TAU, _rng.randf_range(-0.3, 0.3)))
		xfs.append(Transform3D(tilt, at + tilt * Vector3(0, 0.3, 0)))
	mm.instance_count = xfs.size()
	mh.instance_count = xfs.size()
	for i in xfs.size():
		var xf: Transform3D = xfs[i]
		mm.set_instance_transform(i, xf)
		mh.set_instance_transform(i, xf * Transform3D(Basis(), Vector3(0, 0.62, 0)))
	var mi := MultiMeshInstance3D.new()
	mi.multimesh = mm
	mi.material_override = steel
	g.add_child(mi)
	var mhi := MultiMeshInstance3D.new()
	mhi.multimesh = mh
	mhi.material_override = rust
	g.add_child(mhi)
	# des tertres, une stèle, des lanternes éteintes
	for i in 9:
		var a := float(i) / 9.0 * TAU + 0.2
		var at := _at(c, sin(a) * 8.0, cos(a) * 8.0) - c
		var mound := SphereMesh.new(); mound.radius = 1.4; mound.height = 0.9; mound.is_hemisphere = true
		_place(g, mound, _plain(Color(0.12, 0.09, 0.08), 1.0), at)
	_box(g, _at(c, 0, 0) - c + Vector3(0, 1.4, 0), Vector3(1.2, 2.8, 0.35), mats.pierre)
	_box(g, _at(c, 0, 0) - c + Vector3(0, 2.9, 0), Vector3(1.5, 0.2, 0.55), mats.pierre, Vector3.ZERO, false)
	var ghost := OmniLight3D.new()
	ghost.light_color = Color(0.4, 0.6, 1.0)
	ghost.light_energy = 2.2
	ghost.omni_range = 16.0
	ghost.light_volumetric_fog_energy = 0.4
	g.add_child(ghost)
	ghost.position = _at(c, 0, 0) - c + Vector3(0, 3.5, 0)
	lights.append({"light": ghost, "base": 2.2, "seed": 3.0, "on": true})
	var wisps := CPUParticles3D.new()
	wisps.amount = 40
	wisps.lifetime = 4.0
	wisps.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	wisps.emission_box_extents = Vector3(12, 0.5, 12)
	wisps.gravity = Vector3(0, 0.25, 0)
	wisps.initial_velocity_min = 0.1
	wisps.initial_velocity_max = 0.4
	var q := QuadMesh.new(); q.size = Vector2(0.12, 0.12)
	var wm := StandardMaterial3D.new()
	wm.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	wm.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	wm.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	wm.albedo_color = Color(0.5, 0.75, 1.6)
	q.material = wm
	wisps.mesh = q
	g.add_child(wisps)
	wisps.position = Vector3(0, 0.6, 0)
	_chest(g, _at(c, 0.0, -1.6) - c, PI, p.id)
	for sp in [Vector3(-5, 0, 3), Vector3(4, 0, -4)]:
		_spawn("ronin", c + sp, p.id)


# ---------- Le bosquet de bambous ----------

## Une forêt de bambous, une cabane de thé, et l'ermite qui y vit.
func _bambous(c: Vector3, p: Dictionary) -> void:
	var g := _group(c)
	var stalk := CylinderMesh.new()
	stalk.top_radius = 0.05
	stalk.bottom_radius = 0.07
	stalk.height = 1.0
	stalk.radial_segments = 6
	stalk.rings = 1
	var green := _plain(Color(0.22, 0.32, 0.12), 0.6)
	var leaves := SphereMesh.new()
	leaves.radius = 0.9
	leaves.height = 0.5
	leaves.radial_segments = 6
	leaves.rings = 3
	var lm := _plain(Color(0.12, 0.2, 0.07), 1.0)
	var ms := MultiMesh.new()
	ms.transform_format = MultiMesh.TRANSFORM_3D
	ms.mesh = stalk
	var ml := MultiMesh.new()
	ml.transform_format = MultiMesh.TRANSFORM_3D
	ml.mesh = leaves
	var stalks := []
	for i in 420:
		var a := _rng.randf() * TAU
		var d := lerpf(6.5, 22.0, sqrt(_rng.randf()))
		if absf(angle_difference(a, PI / 2)) < 0.25:
			continue      # le sentier qui entre
		var at := _at(c, sin(a) * d, cos(a) * d) - c
		var h := _rng.randf_range(7.0, 12.0)
		var lean := Basis.from_euler(Vector3(_rng.randf_range(-0.07, 0.07), 0, _rng.randf_range(-0.07, 0.07)))
		stalks.append([Transform3D(lean.scaled(Vector3(1, h, 1)), at + lean * Vector3(0, h / 2, 0)), Transform3D(lean, at + lean * Vector3(0, h, 0))])
	ms.instance_count = stalks.size()
	ml.instance_count = stalks.size()
	for i in stalks.size():
		ms.set_instance_transform(i, stalks[i][0])
		ml.set_instance_transform(i, stalks[i][1])
	var si := MultiMeshInstance3D.new()
	si.multimesh = ms
	si.material_override = green
	g.add_child(si)
	var li := MultiMeshInstance3D.new()
	li.multimesh = ml
	li.material_override = lm
	g.add_child(li)
	# la cabane de l'ermite
	var hut := _machiya(g, _at(c, 0, -2.5) - c, 0.0, 4.5, 4.0, {"noren": 2, "h": 2.5, "etage": false, "chaume": true})
	hut.name = "Cabane"
	_box(g, _at(c, 0, 1.6) - c + Vector3(0, 0.25, 0), Vector3(2.4, 0.5, 1.2), mats.bois)
	_lantern(g, _at(c, 3.0, 1.5) - c)
	_chest(g, _at(c, -2.8, 1.0) - c, 0.5, p.id)
	_folk("paysan", "civil", "hojo", _at(c, 0.6, 2.4), PI, {"idle": "seiza", "id": "gensai", "name": "L'ermite Gensai", "armed": false})
