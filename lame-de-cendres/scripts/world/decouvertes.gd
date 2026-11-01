## Les découvertes de la vallée : les sources chaudes où le corps se délasse
## (la vie maximale monte), les bambous qu'on tranche d'un enchaînement sans
## faute (la Détermination grandit), et les renards qui mènent, si on les
## suit, à un sanctuaire d'Inari où l'on reçoit un charme.
class_name Decouvertes
extends Node3D

## Les lieux voulus ; chacun glisse vers le terrain plat le plus proche
const ONSEN := [Vector2(-60, -135), Vector2(150, 25), Vector2(-185, 118)]
const BAMBOU := [Vector2(-8, 92), Vector2(108, -62), Vector2(-118, 22)]
const INARI := [[Vector2(-92, 168), Vector2(-62, 138)], [Vector2(172, 128), Vector2(140, 100)], [Vector2(72, -188), Vector2(52, -160)]]
const CHARMES := {
	"inari": {"name": "Charme d'Inari", "desc": "Un quart de ryō en plus dans chaque butin."},
	"kitsune": {"name": "Charme du Renard", "desc": "Les gardes te voient de 15 % moins loin."},
	"hachiman": {"name": "Charme de Hachiman", "desc": "Tes coups de sabre portent 10 % plus fort."},
}
const CHARM_ORDER := ["inari", "kitsune", "hachiman"]
const QTE_KEYS := ["avant", "gauche", "arriere", "droite", "rapide", "lourd"]

var game
var spots: Array = []           # {kind, pos, done, ...}
var foxes: Array = []           # {body, spot, den, state}
var qte := {}
var _ui: CanvasLayer
var _qte_lbl: Label
var _qte_sub: Label
var _rng := RandomNumberGenerator.new()


func _init(g) -> void:
	game = g
	name = "Decouvertes"
	_rng.seed = 2024


func build() -> void:
	for p in ONSEN:
		_onsen(_flat(p))
	for p in BAMBOU:
		_bambou(_flat(p))
	for i in INARI.size():
		_inari(_flat(INARI[i][0]), _flat(INARI[i][1]), CHARM_ORDER[i])
	_build_ui()


## Le coin plat le plus proche : pas d'eau, pas de pente, loin des lieux bâtis.
func _flat(want: Vector2) -> Vector3:
	var t: Terrain = game.terrain
	var best := want
	var score := 1e9
	for j in range(-6, 7):
		for i in range(-6, 7):
			var p := want + Vector2(i, j) * 3.0
			var h := t.height_at(p.x, p.y)
			if h < Terrain.WATER_LEVEL + 1.0:
				continue
			var s := t.slope_at(p.x, p.y) * 10.0 + p.distance_to(want) * 0.02
			for pl in game.places:
				if p.distance_to(pl.pos) < pl.radius + 8.0:
					s += 100.0
			if s < score:
				score = s
				best = p
	return Vector3(best.x, t.height_at(best.x, best.y), best.y)


# ---------- La source chaude ----------

func _onsen(at: Vector3) -> void:
	var lm = game.landmarks
	var k: Dictionary = lm._k()
	var g := Node3D.new()
	add_child(g)
	g.global_position = at
	var c: Chantier = lm._chantier()
	# un cercle de rochers, l'eau fumante au milieu
	for i in 16:
		var a := float(i) / 16.0 * TAU + _rng.randf() * 0.2
		var r := 2.75 + _rng.randf_range(-0.15, 0.25)
		var s := Vector3(_rng.randf_range(0.7, 1.2), _rng.randf_range(0.45, 0.8), _rng.randf_range(0.6, 0.9))
		c.box(k.pierre, Vector3(sin(a) * r, s.y * 0.25, cos(a) * r), s, Vector3(_rng.randf() * 0.3, a, _rng.randf() * 0.3))
	# une palissade de bambou d'un côté, un banc de pierre
	for i in 22:
		var x := -2.6 + i * 0.24
		c.cyl(k.bambou, Vector3(x, 1.05, -3.6), 0.045, 0.05, 2.1, Vector3.ZERO, 6)
	for y: float in [0.6, 1.6]:
		c.cyl(k.bambou, Vector3(0, y, -3.52), 0.03, 0.03, 5.4, Vector3(0, 0, PI / 2), 6, false)
	c.box(k.pierre, Vector3(3.2, 0.25, 1.2), Vector3(1.6, 0.5, 0.6), Vector3(0, -0.5, 0))
	c.build(g, "Source chaude")
	var water := CylinderMesh.new()
	water.top_radius = 2.6
	water.bottom_radius = 2.6
	water.height = 0.05
	water.radial_segments = 28
	var wm := MeshInstance3D.new()
	wm.mesh = water
	wm.material_override = lm.mats.eau
	g.add_child(wm)
	wm.position = Vector3(0, 0.12, 0)
	g.add_child(_steam(2.2))
	lm._lantern(g, Vector3(-3.4, 0, 2.2))
	spots.append({"kind": "onsen", "pos": at, "done": false, "name": "Source chaude"})


## La vapeur qui monte en volutes lentes.
func _steam(r: float) -> CPUParticles3D:
	var p := CPUParticles3D.new()
	p.amount = 36
	p.lifetime = 4.0
	p.emission_shape = CPUParticles3D.EMISSION_SHAPE_SPHERE
	p.emission_sphere_radius = r
	p.direction = Vector3.UP
	p.spread = 12.0
	p.gravity = Vector3(0, 0.35, 0)
	p.initial_velocity_min = 0.15
	p.initial_velocity_max = 0.35
	p.scale_amount_min = 1.0
	p.scale_amount_max = 2.2
	var q := QuadMesh.new()
	q.size = Vector2(1.2, 1.2)
	var m := StandardMaterial3D.new()
	m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	m.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	m.vertex_color_use_as_albedo = true
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
	p.mesh = q
	var ramp := Gradient.new()
	ramp.set_color(0, Color(1, 1, 1, 0.0))
	ramp.add_point(0.25, Color(0.95, 0.95, 0.95, 0.16))
	ramp.set_color(ramp.get_point_count() - 1, Color(1, 1, 1, 0.0))
	p.color_ramp = ramp
	p.position = Vector3(0, 0.3, 0)
	return p


# ---------- Les bambous à trancher ----------

func _bambou(at: Vector3) -> void:
	var lm = game.landmarks
	var k: Dictionary = lm._k()
	var g := Node3D.new()
	add_child(g)
	g.global_position = at
	var c: Chantier = lm._chantier()
	for x: float in [-1.9, 1.9]:
		c.box(k.poutre, Vector3(x, 1.25, 0), Vector3(0.14, 2.5, 0.14))
	c.box(k.poutre, Vector3(0, 2.45, 0), Vector3(4.1, 0.12, 0.14))
	c.box(k.tatami, Vector3(0, 0.03, 1.4), Vector3(2.4, 0.06, 1.2))
	c.build(g, "Bambous")
	# les tiges, chacune en deux morceaux : le haut tombera, tranché
	var green := StandardMaterial3D.new()
	green.albedo_color = Color(0.36, 0.5, 0.2)
	green.roughness = 0.5
	var tops: Array = []
	for i in 4:
		var x := -1.2 + i * 0.8
		var low := CylinderMesh.new(); low.top_radius = 0.06; low.bottom_radius = 0.065; low.height = 1.1
		var lo := MeshInstance3D.new(); lo.mesh = low; lo.material_override = green
		g.add_child(lo); lo.position = Vector3(x, 0.55, 0)
		var top := CylinderMesh.new(); top.top_radius = 0.055; top.bottom_radius = 0.06; top.height = 1.2
		var hi := MeshInstance3D.new(); hi.mesh = top; hi.material_override = green
		g.add_child(hi); hi.position = Vector3(x, 1.7, 0)
		tops.append(hi)
	spots.append({"kind": "bambou", "pos": at + Vector3(0, 0, 1.4), "done": false, "name": "Bambous", "tops": tops})


# ---------- Le sanctuaire d'Inari et son renard ----------

func _inari(at: Vector3, den: Vector3, charm: String) -> void:
	var lm = game.landmarks
	var k: Dictionary = lm._k()
	var g := Node3D.new()
	add_child(g)
	g.global_position = at
	lm._honden(g, Vector3(0, 0, -1.4))
	# une allée de petits torii vermillon
	for i in 4:
		lm._torii(g, Vector3(0, 0, 2.0 + i * 1.3), 0.0, 0.32)
	# deux renards de pierre gardent l'entrée
	var c: Chantier = lm._chantier()
	for s: float in [-1.0, 1.0]:
		c.box(k.pierre, Vector3(s * 1.5, 0.35, 0.8), Vector3(0.6, 0.7, 0.6))
		c.cyl(k.pierre, Vector3(s * 1.5, 0.95, 0.8), 0.14, 0.2, 0.55, Vector3.ZERO, 8)
		c.cyl(k.pierre, Vector3(s * 1.5, 1.32, 0.9), 0.0, 0.12, 0.3, Vector3(0.4, 0, 0), 6)
		for e: float in [-1.0, 1.0]:
			c.cyl(k.pierre, Vector3(s * 1.5 + e * 0.07, 1.42, 0.8), 0.0, 0.04, 0.14, Vector3.ZERO, 4)
		c.box(k.vermillon, Vector3(s * 1.5, 1.05, 0.95), Vector3(0.26, 0.12, 0.05))
	c.build(g, "Inari")
	var spot := {"kind": "inari", "pos": at + Vector3(0, 0, 0.6), "done": false, "name": "Sanctuaire d'Inari", "charm": charm, "fox_here": false}
	spots.append(spot)
	var fox := Quadrupede.new("renard")
	add_child(fox)
	fox.global_position = den
	fox.rotation.y = atan2(at.x - den.x, at.z - den.z)
	foxes.append({"body": fox, "spot": spot, "den": den, "state": "attend"})


## Chaque image : les renards guident ceux qui les suivent.
func step(dt: float) -> void:
	var p: Fighter = game.player
	if p == null:
		return
	for f in foxes:
		var body: Quadrupede = f.body
		if not is_instance_valid(body):
			continue
		var spot: Dictionary = f.spot
		var at: Vector3 = body.global_position
		var d_player := at.distance_to(p.global_position)
		if d_player > 120.0:
			continue
		var goal: Vector3 = spot.pos + Vector3(1.6, 0, 1.8)
		var spd := 0.0
		match f.state:
			"attend":
				if d_player < 8.0 and not spot.done:
					f.state = "guide"
					Audio.sfx("souffle", at, -14.0)
					game.hud.toast("Un renard. Il semble t'attendre…", Color(1.0, 0.65, 0.3))
			"guide":
				var to := (goal - at) * Vector3(1, 0, 1)
				if to.length() < 0.6:
					f.state = "arrive"
					spot.fox_here = true
				elif d_player < 13.0:
					spd = 2.6 if d_player < 9.0 else 1.2
					body.rotation.y = lerp_angle(body.rotation.y, atan2(to.x, to.z), minf(1.0, dt * 4.0))
					var nxt := at + Vector3(sin(body.rotation.y), 0, cos(body.rotation.y)) * spd * dt
					body.global_position = Vector3(nxt.x, game.terrain_height(nxt), nxt.z)
				else:
					# il s'arrête, se retourne : tu le suis ?
					var back := (p.global_position - at) * Vector3(1, 0, 1)
					body.rotation.y = lerp_angle(body.rotation.y, atan2(back.x, back.z), minf(1.0, dt * 2.0))
			"arrive":
				if spot.done:
					f.state = "parti"
					var tw := body.create_tween()
					tw.tween_interval(1.5)
					tw.tween_property(body, "scale", Vector3.ONE * 0.01, 0.6)
					tw.tween_callback(body.queue_free)
		body.speed = spd
		body.step(dt)


# ---------- Ce que l'on fait sur place ----------

## Ce que la touche d'action ferait ici (ou rien).
func interactable(p: Fighter) -> Dictionary:
	var key := Settings.key_name("action")
	for s in spots:
		if s.done or p.global_position.distance_to(s.pos) > (3.4 if s.kind == "onsen" else 2.6):
			continue
		match s.kind:
			"onsen":
				return {"kind": "decouverte", "spot": s, "text": "%s · Se baigner dans la source chaude" % key}
			"bambou":
				return {"kind": "decouverte", "spot": s, "text": "%s · Trancher les bambous" % key}
			"inari":
				return {"kind": "decouverte", "spot": s, "text": "%s · Prier au sanctuaire d'Inari" % key}
	return {}


func interact(s: Dictionary) -> void:
	match s.kind:
		"onsen":
			_bathe(s)
		"bambou":
			_start_qte(s)
		"inari":
			_pray(s)


func _bathe(s: Dictionary) -> void:
	var p: Fighter = game.player
	s.done = true
	p.max_hp += 10.0
	p.hp = p.max_hp
	game.condition.heal_all()
	game.combat.gain(1.0)
	game.hud.letterbox(true)
	Audio.sfx("eclaboussure", p.global_position, -6.0)
	game.hud.banner("La source chaude", "La chaleur dénoue chaque muscle. Vie maximale +10.")
	get_tree().create_timer(2.6, false).timeout.connect(func(): game.hud.letterbox(false))


func _pray(s: Dictionary) -> void:
	s.done = true
	var id: String = s.charm
	if not game.arsenal.charms.has(id):
		game.arsenal.charms.append(id)
	Audio.sfx("grace", null, -4.0, 0.0)
	Fx.burst(game, s.pos + Vector3(0, 1.2, 0), 60, Color(1.0, 0.6, 0.25), 3.0, 2.0, -0.5, 1.4, 2.2)
	game.hud.banner(CHARMES[id].name, CHARMES[id].desc)
	game._fame(3, "")


# ---------- Le défi des bambous ----------

func _start_qte(s: Dictionary) -> void:
	var seq: Array = []
	for i in 5:
		seq.append(QTE_KEYS[_rng.randi() % QTE_KEYS.size()])
	qte = {"spot": s, "seq": seq, "i": 0, "t": 1.6}
	game.state = "qte"
	game.player.sheathed = false
	game.hud.letterbox(true)
	_show_qte()


func _show_qte() -> void:
	_ui.visible = true
	var seq: Array = qte.seq
	var txt := ""
	for i in seq.size():
		var name := Settings.key_name(seq[i])
		txt += ("[%s]" % name) if i == qte.i else ("·" if i < qte.i else name)
		txt += "   "
	_qte_lbl.text = txt
	_qte_sub.text = "Frappe chaque touche à temps, sans faute"


func _unhandled_input(ev: InputEvent) -> void:
	if game.state != "qte" or qte.is_empty() or ev is InputEventMouseMotion or not ev.is_pressed() or ev.is_echo():
		return
	var want: String = qte.seq[qte.i]
	var hit := ""
	for a in QTE_KEYS:
		if ev.is_action_pressed(a):
			hit = a
	if hit == "":
		return
	get_viewport().set_input_as_handled()
	if hit != want:
		_end_qte(false)
		return
	var p: Fighter = game.player
	p.play(["light1", "light2", "light3"][qte.i % 3])
	Audio.sfx("lame", p.global_position, -2.0)
	var tops: Array = qte.spot.tops
	var top: MeshInstance3D = tops[qte.i % tops.size()]
	if top.rotation.z == 0.0:
		var tw := top.create_tween()
		tw.tween_property(top, "rotation:z", 1.4 * (1.0 if qte.i % 2 == 0 else -1.0), 0.5).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
		tw.parallel().tween_property(top, "position:y", 0.45, 0.5).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
	qte.i += 1
	qte.t = maxf(0.8, 1.6 - qte.i * 0.15)
	if qte.i >= qte.seq.size():
		_end_qte(true)
	else:
		_show_qte()


func _process(delta: float) -> void:
	if qte.is_empty() or game.state != "qte":
		return
	qte.t -= delta
	if qte.t <= 0.0:
		_end_qte(false)


func _end_qte(ok: bool) -> void:
	var s: Dictionary = qte.spot
	qte = {}
	_ui.visible = false
	game.state = "play"
	game.hud.letterbox(false)
	if ok:
		s.done = true
		game.combat.resolve_max = minf(6.0, game.combat.resolve_max + 1.0)
		game.combat.resolve = game.combat.resolve_max
		game.combat._refresh_resolve()
		Audio.sfx("grace", null, -4.0, 0.0)
		game.hud.banner("Les bambous tranchés", "Ta Détermination grandit : un segment de plus.")
	else:
		game.hud.toast("Le bambou résiste. Reprends ton souffle et recommence.", Hud.MUTED)
		for t in s.tops:
			t.rotation.z = 0.0
			t.position.y = 1.7


func _build_ui() -> void:
	_ui = CanvasLayer.new()
	_ui.layer = 3
	add_child(_ui)
	var box := VBoxContainer.new()
	box.set_anchors_preset(Control.PRESET_CENTER)
	box.position = Vector2(-450, 40)
	box.custom_minimum_size = Vector2(900, 0)
	_ui.add_child(box)
	_qte_lbl = Label.new()
	_qte_lbl.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_qte_lbl.add_theme_font_size_override("font_size", 34)
	_qte_lbl.add_theme_color_override("font_color", Color(0.94, 0.9, 0.85))
	_qte_lbl.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.9))
	_qte_lbl.add_theme_constant_override("outline_size", 8)
	box.add_child(_qte_lbl)
	_qte_sub = Label.new()
	_qte_sub.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_qte_sub.add_theme_font_size_override("font_size", 16)
	_qte_sub.add_theme_color_override("font_color", Color(0.85, 0.7, 0.35))
	box.add_child(_qte_sub)
	_ui.visible = false


## Les repères de la boussole : ce qui reste à découvrir, pas trop loin.
func markers(from: Vector3) -> Array:
	var out := []
	for s in spots:
		if s.done or from.distance_to(s.pos) > 140.0:
			continue
		out.append({"name": s.name, "pos": s.pos, "color": Color(1.0, 0.7, 0.35) if s.kind == "inari" else Color(0.75, 0.85, 0.95)})
	return out


func save() -> Dictionary:
	var done := []
	for i in spots.size():
		if spots[i].done:
			done.append(i)
	return {"done": done}


func load_save(d: Dictionary) -> void:
	var onsen := 0
	for i in d.get("done", []):
		var k := int(i)
		if k < spots.size():
			spots[k].done = true
			if spots[k].kind == "onsen":
				onsen += 1
			if spots[k].kind == "bambou":
				for t in spots[k].tops:
					t.rotation.z = 1.4
					t.position.y = 0.45
	for f in foxes:
		if f.spot.done and is_instance_valid(f.body):
			f.body.queue_free()
	game.player.max_hp = 100.0 + 10.0 * onsen
