## Les découvertes de la vallée : les sources chaudes où le corps se délasse
## (la vie maximale monte), les bambous qu'on tranche d'un enchaînement sans
## faute (la Détermination grandit), et les renards qui mènent, si on les
## suit, à un sanctuaire d'Inari où l'on reçoit un charme. Et, face aux plus
## beaux paysages, les lieux de haïku : on s'assoit, on compose trois vers.
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
	"brise": {"name": "Charme de la Brise", "desc": "La Détermination se gagne un quart plus vite."},
	"ruisseau": {"name": "Charme du Ruisseau", "desc": "L'endurance revient un quart plus vite."},
	"lune": {"name": "Charme de la Lune", "desc": "Se ressaisir rend 60 % de la vie au lieu de 45 %."},
}
## Les lieux de haïku : où l'on s'assoit, vers où l'on regarde, et pour chaque
## vers trois façons de le dire.
const HAIKU := [
	{"pos": Vector2(-75, -11), "look": Vector2(-110, -40), "theme": "Le lac", "charm": "brise", "vers": [
		["Le lac immobile", "Brume sur les eaux", "Un héron s'envole"],
		["porte le reflet des cendres", "la lune rouge s'y noie", "mon sabre y lave son sang"],
		["le vent se tait", "un poisson saute", "je ferme les yeux"]]},
	{"pos": Vector2(112, 38), "look": Vector2(0, 10), "theme": "Les érables", "charm": "ruisseau", "vers": [
		["Feuilles écarlates", "Vent d'automne", "Sous l'érable nu"],
		["tombent sur la tombe d'un frère", "chaque feuille est un adieu", "un enfant ramasse le rouge"],
		["la lame attend", "le ciel s'embrase", "rien ne demeure"]]},
	{"pos": Vector2(-22, -178), "look": Vector2(10, -40), "theme": "La montagne", "charm": "lune", "vers": [
		["Neige sur les cimes", "Le sentier se perd", "Au-dessus des nuages"],
		["mon souffle devient fumée", "les ancêtres me regardent", "la cloche du temple au loin"],
		["je suis si petit", "la paix, enfin", "demain, la guerre"]]},
]
const CHARM_ORDER := ["inari", "kitsune", "hachiman"]
const QTE_KEYS := ["avant", "gauche", "arriere", "droite", "rapide", "lourd"]

var game
var spots: Array = []           # {kind, pos, done, ...}
var foxes: Array = []           # {body, spot, den, state}
var qte := {}
var haiku := {}                 # le haïku en cours : {spot, i, picks, t, phase}
var _ui: CanvasLayer
var _hk_ui: CanvasLayer
var _hk_title: Label
var _hk_lines: Label
var _hk_opts: Array = []
var _hk_poem: Label
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
	for h in HAIKU:
		_haiku_spot(h)
	# l'herbe haute s'écarte des lieux que l'on fréquente
	for s in spots:
		var r: float = {"onsen": 4.2, "bambou": 3.4, "inari": 4.0, "haiku": 2.6}.get(s.kind, 3.0)
		game.terrain.clear_grass(Vector2(s.pos.x, s.pos.z), r)
	game.terrain.refresh_mask()
	_build_ui()
	_build_haiku_ui()


## Le coin plat le plus proche : pas d'eau, pas de pente, loin des lieux bâtis.
func _flat(want: Vector2) -> Vector3:
	var t: Terrain = game.terrain
	var best := flat_at(t, game.places, want)
	return Vector3(best.x, t.height_at(best.x, best.y), best.y)


static func flat_at(t: Terrain, places: Array, want: Vector2) -> Vector2:
	var best := want
	var score := 1e9
	for j in range(-6, 7):
		for i in range(-6, 7):
			var p := want + Vector2(i, j) * 3.0
			var h := t.height_at(p.x, p.y)
			if h < Terrain.WATER_LEVEL + 1.0:
				continue
			var s := t.slope_at(p.x, p.y) * 10.0 + p.distance_to(want) * 0.02
			for pl in places:
				if p.distance_to(pl.pos) < pl.radius + 8.0:
					s += 100.0
			if s < score:
				score = s
				best = p
	return best


## Les clairières que les arbres doivent laisser libres : autour de chaque
## découverte, et devant chaque lieu de haïku, la vue jusqu'au paysage.
static func clearings(t: Terrain, places: Array) -> Array:
	var out := []
	for p in ONSEN + BAMBOU:
		out.append({"pos": flat_at(t, places, p), "radius": 7.0})
	for pair in INARI:
		out.append({"pos": flat_at(t, places, pair[0]), "radius": 7.0})
	for h in HAIKU:
		var at := flat_at(t, places, h.pos)
		var dir: Vector2 = (h.look - at).normalized()
		out.append({"pos": at, "radius": 5.0})
		for k in [[8.0, 4.0], [16.0, 6.0], [26.0, 8.0], [38.0, 10.0]]:
			out.append({"pos": at + dir * k[0], "radius": k[1]})
	return out


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
	var tops: Array = []
	for i in 4:
		var x := -1.2 + i * 0.8
		var lo := _stalk(1.1, 0.065, 0.06, i)
		g.add_child(lo); lo.position = Vector3(x, 0.0, 0)
		var hi := _stalk(1.2, 0.06, 0.055, i + 7)
		g.add_child(hi); hi.position = Vector3(x, 1.1, 0)
		tops.append(hi)
	# derrière, le bosquet vivant : de hautes tiges qui ploient, des feuilles
	_grove(g, Vector3(0, 0, -3.2), 22)
	spots.append({"kind": "bambou", "pos": at + Vector3(0, 0, 1.4), "done": false, "name": "Bambous", "tops": tops})


# ---------- Les lieux de haïku ----------

## Un coussin de paille face au paysage, une écritoire basse, du papier, la
## pierre à encre, et un petit érable qui se penche au-dessus.
func _haiku_spot(h: Dictionary) -> void:
	var lm = game.landmarks
	var k: Dictionary = lm._k()
	var at := _flat(h.pos)
	var look := Vector3(h.look.x, 0, h.look.y) - Vector3(at.x, 0, at.z)
	var yaw := atan2(look.x, look.z)
	var g := Node3D.new()
	add_child(g)
	g.global_position = at
	g.rotation.y = yaw
	var c: Chantier = lm._chantier()
	c.box(k.tatami, Vector3(0, 0.03, 0), Vector3(1.0, 0.06, 1.0))
	c.cyl(k.chaume, Vector3(0, 0.1, 0), 0.32, 0.34, 0.08, Vector3.ZERO, 12)
	# l'écritoire, posée devant
	c.box(k.poutre, Vector3(0, 0.22, 0.7), Vector3(0.62, 0.04, 0.34))
	for x: float in [-0.27, 0.27]:
		c.box(k.poutre, Vector3(x, 0.1, 0.7), Vector3(0.04, 0.2, 0.3))
	c.box(k.blanc, Vector3(-0.06, 0.245, 0.7), Vector3(0.3, 0.005, 0.24))
	c.box(k.sombre, Vector3(0.2, 0.25, 0.7), Vector3(0.1, 0.02, 0.14))
	c.cyl(k.poutre, Vector3(0.12, 0.25, 0.62), 0.006, 0.006, 0.18, Vector3(0, 0, PI / 2), 5)
	# une pierre levée, et sa corde sacrée
	c.box(k.pierre, Vector3(-1.4, 0.55, -0.4), Vector3(0.5, 1.1, 0.35), Vector3(0, 0.3, 0.06))
	c.box(k.vermillon, Vector3(-1.4, 0.8, -0.4), Vector3(0.54, 0.05, 0.39), Vector3(0, 0.3, 0.06))
	c.build(g, "Haiku")
	spots.append({"kind": "haiku", "pos": at, "done": false, "name": "Lieu de haïku · " + h.theme,
		"look": look.normalized(), "data": h})


func _haiku_ready() -> bool:
	for e in game.enemies:
		if e.alive and e.hostile and e.aggro and e.global_position.distance_to(game.player.global_position) < 45.0:
			return false
	return true


func _start_haiku(s: Dictionary) -> void:
	if not _haiku_ready():
		game.hud.toast("Pas maintenant : le danger rôde encore.", Hud.MUTED)
		return
	var p: Fighter = game.player
	p.global_position = Vector3(s.pos.x, p.global_position.y, s.pos.z)
	p.yaw = atan2(s.look.x, s.look.z)
	p.sheathed = true
	p.action = {}
	p.idle_override = "seiza"
	haiku = {"spot": s, "i": 0, "picks": [], "t": 0.0, "phase": "assis", "cam": game.camera.global_position}
	game.state = "haiku"
	game.hud.letterbox(true)
	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	Audio.sfx("souffle", p.global_position, -10.0)
	_hk_poem.modulate.a = 0.0
	_hk_ui.visible = true
	_hk_title.text = "Haïku · " + s.data.theme
	_show_haiku()


func _show_haiku() -> void:
	var vers: Array = haiku.spot.data.vers
	var done: String = ""
	for line in haiku.picks:
		done += line + "\n"
	_hk_lines.text = done
	var i: int = haiku.i
	for k in 3:
		var b: Button = _hk_opts[k]
		b.visible = i < 3
		if i < 3:
			b.text = "%d · %s" % [k + 1, vers[i][k]]


func _pick_haiku(k: int) -> void:
	if haiku.is_empty() or haiku.phase != "assis" or haiku.i >= 3:
		return
	var vers: Array = haiku.spot.data.vers
	haiku.picks.append(vers[haiku.i][k])
	haiku.i += 1
	Audio.sfx("ui-papier", null, -6.0)
	_show_haiku()
	if haiku.i >= 3:
		haiku.phase = "poeme"
		haiku.t = 0.0
		for b in _hk_opts:
			b.visible = false
		_hk_lines.text = ""
		_hk_poem.text = "\n".join(haiku.picks)
		var tw := _hk_poem.create_tween()
		tw.tween_property(_hk_poem, "modulate:a", 1.0, 1.2)
		tw.tween_interval(3.6)
		tw.tween_property(_hk_poem, "modulate:a", 0.0, 1.0)
		tw.tween_callback(_end_haiku.bind(true))


func _end_haiku(ok: bool) -> void:
	if haiku.is_empty():
		return
	var s: Dictionary = haiku.spot
	haiku = {}
	_hk_ui.visible = false
	game.state = "play"
	game.hud.letterbox(false)
	game.player.idle_override = ""
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	if not ok:
		return
	s.done = true
	var id: String = s.data.charm
	if not game.arsenal.charms.has(id):
		game.arsenal.charms.append(id)
	game.combat.gain(1.0)
	Audio.sfx("grace", null, -4.0, 0.0)
	game.hud.banner(CHARMES[id].name, "Ton haïku apaise l'esprit. " + CHARMES[id].desc)
	game._fame(2, "")


## La caméra du haïku : derrière l'épaule, elle glisse lentement vers le paysage.
func camera(real: float) -> bool:
	if haiku.is_empty():
		return false
	haiku.t += real
	var s: Dictionary = haiku.spot
	var look: Vector3 = s.look
	var side := Vector3(look.z, 0, -look.x)
	var drift := minf(1.0, haiku.t / 14.0)
	var at: Vector3 = s.pos
	var want := at - look * (2.6 - drift * 0.8) + side * lerpf(1.3, -0.6, drift) + Vector3(0, 1.5 + drift * 0.4, 0)
	haiku.cam = (haiku.cam as Vector3).lerp(want, 1.0 - exp(-real * 1.6))
	game.camera.global_position = haiku.cam
	# le regard suit le relief : il plonge vers un lac en contrebas, se lève vers une cime
	var far := at + look * 40.0
	far.y = lerpf(game.terrain.height_at(far.x, far.z) + 3.0, at.y + 2.0, 0.5) - drift * 1.5
	game.camera.look_at(far)
	return true


func _build_haiku_ui() -> void:
	_hk_ui = CanvasLayer.new()
	_hk_ui.layer = 3
	add_child(_hk_ui)
	var serif := SystemFont.new()
	serif.font_names = PackedStringArray(["Georgia", "Times New Roman", "Noto Serif", "DejaVu Serif", "serif"])
	var col := VBoxContainer.new()
	col.set_anchors_preset(Control.PRESET_CENTER_BOTTOM)
	col.position = Vector2(-330, -270)
	col.custom_minimum_size = Vector2(660, 0)
	col.add_theme_constant_override("separation", 8)
	_hk_ui.add_child(col)
	_hk_title = Label.new()
	_hk_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_hk_title.add_theme_font_override("font", serif)
	_hk_title.add_theme_font_size_override("font_size", 22)
	_hk_title.add_theme_color_override("font_color", Hud.GOLD)
	col.add_child(_hk_title)
	_hk_lines = Label.new()
	_hk_lines.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_hk_lines.add_theme_font_override("font", serif)
	_hk_lines.add_theme_font_size_override("font_size", 20)
	_hk_lines.add_theme_color_override("font_color", Hud.PAPER)
	_hk_lines.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.8))
	_hk_lines.add_theme_constant_override("outline_size", 6)
	col.add_child(_hk_lines)
	for k in 3:
		var b := Button.new()
		b.flat = true
		b.focus_mode = Control.FOCUS_NONE
		b.add_theme_font_override("font", serif)
		b.add_theme_font_size_override("font_size", 21)
		b.add_theme_color_override("font_color", Hud.PAPER)
		b.add_theme_color_override("font_hover_color", Hud.GOLD)
		b.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.85))
		b.add_theme_constant_override("outline_size", 6)
		b.pressed.connect(_pick_haiku.bind(k))
		col.add_child(b)
		_hk_opts.append(b)
	var hint := Label.new()
	hint.text = "1, 2, 3 ou un clic pour choisir chaque vers · Échap pour te relever"
	hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	hint.add_theme_font_size_override("font_size", 13)
	hint.add_theme_color_override("font_color", Hud.MUTED)
	col.add_child(hint)
	# le poème achevé, au milieu de l'écran, en grand
	_hk_poem = Label.new()
	_hk_poem.set_anchors_preset(Control.PRESET_FULL_RECT)
	_hk_poem.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_hk_poem.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
	_hk_poem.add_theme_font_override("font", serif)
	_hk_poem.add_theme_font_size_override("font_size", 40)
	_hk_poem.add_theme_color_override("font_color", Color(0.96, 0.93, 0.86))
	_hk_poem.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.75))
	_hk_poem.add_theme_constant_override("outline_size", 10)
	_hk_poem.add_theme_constant_override("line_spacing", 14)
	_hk_ui.add_child(_hk_poem)
	_hk_ui.visible = false


## Une tige de bambou : des entre-nœuds lisses, des nœuds en bourrelet, un
## vert qui jaunit vers le pied. Le pivot est au pied de la tige.
func _stalk(h: float, r0: float, r1: float, seed: int) -> MeshInstance3D:
	var st := SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	var seg := 8
	var nodes := maxi(2, int(h / 0.32))
	var rr := RandomNumberGenerator.new(); rr.seed = 900 + seed
	var ys: Array = [0.0]
	for n in nodes:
		ys.append(h * float(n + 1) / nodes + (rr.randf_range(-0.03, 0.03) if n < nodes - 1 else 0.0))
	for n in ys.size() - 1:
		var y0: float = ys[n]
		var y1: float = ys[n + 1]
		var ra := lerpf(r0, r1, y0 / h)
		var rb := lerpf(r0, r1, y1 / h)
		# l'entre-nœud, puis le bourrelet du nœud
		var rings: Array = [[y0, ra * 1.06, 0.0], [y0 + 0.025, ra * 0.98, 0.05], [y1 - 0.02, rb, 0.95], [y1, rb * 1.1, 1.0]]
		for k in rings.size() - 1:
			var a: Array = rings[k]
			var b: Array = rings[k + 1]
			for q in seg:
				var t0 := float(q) / seg * TAU
				var t1 := float(q + 1) / seg * TAU
				var n0 := Vector3(sin(t0), 0, cos(t0))
				var n1 := Vector3(sin(t1), 0, cos(t1))
				var shade_a := 0.8 + 0.2 * float(a[2])
				var shade_b := 0.8 + 0.2 * float(b[2])
				var ca := Color(shade_a, shade_a, shade_a)
				var cb := Color(shade_b, shade_b, shade_b)
				var v := [[n0 * a[1] + Vector3(0, a[0], 0), n0, ca], [n1 * a[1] + Vector3(0, a[0], 0), n1, ca],
					[n1 * b[1] + Vector3(0, b[0], 0), n1, cb], [n0 * b[1] + Vector3(0, b[0], 0), n0, cb]]
				for idx in [0, 2, 1, 0, 3, 2]:
					st.set_color(v[idx][2])
					st.set_normal(v[idx][1])
					st.add_vertex(v[idx][0])
	var mi := MeshInstance3D.new()
	mi.mesh = st.commit()
	mi.material_override = _bamboo_mat()
	return mi


var _bmat: StandardMaterial3D


func _bamboo_mat() -> StandardMaterial3D:
	if _bmat == null:
		_bmat = StandardMaterial3D.new()
		_bmat.albedo_color = Color(0.5, 0.6, 0.27)
		_bmat.vertex_color_use_as_albedo = true
		_bmat.roughness = 0.38
		_bmat.metallic_specular = 0.6
		_bmat.rim_enabled = true
		_bmat.rim = 0.25
	return _bmat


## Un bosquet de bambous vivants : des tiges hautes qui se penchent, des
## bouquets de feuilles effilées au bout des rameaux.
func _grove(parent: Node3D, at: Vector3, n: int) -> void:
	var leaf := StandardMaterial3D.new()
	leaf.albedo_color = Color(0.3, 0.42, 0.14)
	leaf.cull_mode = BaseMaterial3D.CULL_DISABLED
	leaf.roughness = 0.6
	leaf.backlight_enabled = true
	leaf.backlight = Color(0.25, 0.35, 0.05)
	var st := SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	var t: Terrain = game.terrain
	for i in n:
		var a := _rng.randf() * TAU
		var d := _rng.randf_range(0.6, 4.5)
		var p := at + Vector3(sin(a) * d * 1.4, 0, cos(a) * d * 0.7 - 0.6)
		var gp: Vector3 = parent.global_position + p
		p.y = t.height_at(gp.x, gp.z) - parent.global_position.y - 0.05
		var h := _rng.randf_range(5.0, 8.5)
		var s := _stalk(h, 0.06, 0.035, i + 30)
		parent.add_child(s)
		s.position = p
		var lean := Vector3(_rng.randf_range(-0.12, 0.12), 0, _rng.randf_range(-0.12, 0.12))
		s.rotation = lean
		# les feuilles : des lames étroites groupées par cinq sur le haut de la tige
		var b := Basis.from_euler(lean)
		for k in 12:
			var y := h * _rng.randf_range(0.5, 1.0)
			var base := p + b * Vector3(0, y, 0)
			var dir := Vector3(sin(_rng.randf() * TAU), 0, cos(_rng.randf() * TAU)).normalized()
			for f in 5:
				var fd := (dir.rotated(Vector3.UP, (f - 2) * 0.35) + Vector3(0, -0.35 - _rng.randf() * 0.3, 0)).normalized()
				var len := _rng.randf_range(0.28, 0.42)
				var side := fd.cross(Vector3.UP).normalized() * 0.035
				var tip := base + fd * len
				var mid := base + fd * len * 0.45
				var nrm := fd.cross(side).normalized()
				if nrm.y < 0.0:
					nrm = -nrm
				for v in [base, mid + side, tip, base, tip, mid - side]:
					st.set_normal(nrm)
					st.add_vertex(v)
	var leaves := MeshInstance3D.new()
	leaves.mesh = st.commit()
	leaves.material_override = leaf
	parent.add_child(leaves)


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
	# un ennemi survient pendant le haïku : on se relève, la main sur la poignée
	if not haiku.is_empty() and haiku.phase == "assis" and (not p.alive or not _haiku_ready()):
		_end_haiku(false)
		game.hud.toast("Des pas dans l'herbe… le poème attendra.", Hud.MUTED)
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
			"haiku":
				return {"kind": "decouverte", "spot": s, "text": "%s · Composer un haïku" % key}
	return {}


func interact(s: Dictionary) -> void:
	match s.kind:
		"onsen":
			_bathe(s)
		"bambou":
			_start_qte(s)
		"inari":
			_pray(s)
		"haiku":
			_start_haiku(s)


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
	if game.state == "haiku" and not haiku.is_empty():
		if ev is InputEventKey and ev.pressed and not ev.echo:
			var k := [KEY_1, KEY_2, KEY_3].find(ev.keycode)
			if k < 0:
				k = [KEY_KP_1, KEY_KP_2, KEY_KP_3].find(ev.keycode)
			if k >= 0:
				_pick_haiku(k)
				get_viewport().set_input_as_handled()
			elif ev.is_action_pressed("pause") and haiku.phase == "assis":
				_end_haiku(false)
				get_viewport().set_input_as_handled()
		return
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
		tw.parallel().tween_property(top, "position:y", 0.08, 0.5).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
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
			t.position.y = 1.1


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
		var c := Color(1.0, 0.7, 0.35) if s.kind == "inari" else (Color(0.95, 0.85, 1.0) if s.kind == "haiku" else Color(0.75, 0.85, 0.95))
		out.append({"name": s.name, "pos": s.pos, "color": c})
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
					t.position.y = 0.08
	for f in foxes:
		if f.spot.done and is_instance_valid(f.body):
			f.body.queue_free()
	game.player.max_hp = 100.0 + 10.0 * onsen
