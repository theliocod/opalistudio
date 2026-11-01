## Le combat des grands sabreurs. Quatre postures, chacune faite pour briser
## une sorte d'ennemi ; les éclairs qui annoncent les coups (bleu : on peut
## parer, rouge : il faut esquiver) ; la parade et l'esquive parfaites qui
## ralentissent le temps et ouvrent la riposte ; la Détermination, qui soigne
## et nourrit les techniques ; les flèches ; l'affrontement, où l'on attend
## sans bouger que l'autre frappe le premier.
class_name Combat
extends Node

const STANCES := ["pierre", "eau", "vent", "lune"]
const STANCE := {
	"pierre": {"name": "Posture de la Pierre", "kanji": "石", "vs": "epeiste", "color": Color(0.92, 0.86, 0.72),
		"light": ["light1", "light2", "light3"], "heavy": "heavy", "hint": "brise les épéistes"},
	"eau": {"name": "Posture de l'Eau", "kanji": "水", "vs": "bouclier", "color": Color(0.45, 0.72, 1.0),
		"light": ["light1", "light2", "eau_flot", "light3"], "heavy": "eau_lourd", "hint": "brise les boucliers"},
	"vent": {"name": "Posture du Vent", "kanji": "風", "vs": "lancier", "color": Color(0.6, 1.0, 0.75),
		"light": ["light1", "vent_pied", "light2", "light3"], "heavy": "vent_lourd", "hint": "brise les lanciers"},
	"lune": {"name": "Posture de la Lune", "kanji": "月", "vs": "brute", "color": Color(1.0, 0.85, 0.45),
		"light": ["lune1", "lune2", "lune3"], "heavy": "lune_lourd", "hint": "brise les colosses"},
}
## Les sortes d'ennemis humains : vie, posture, taille
const ARCH := {
	"epeiste": {"name": "épéiste", "hp": 1.0, "posture": 1.0},
	"bouclier": {"name": "porte-bouclier", "hp": 1.15, "posture": 1.5},
	"lancier": {"name": "lancier", "hp": 1.0, "posture": 1.1},
	"brute": {"name": "colosse", "hp": 2.3, "posture": 2.1, "scale": 1.22},
	"archer": {"name": "archer", "hp": 0.7, "posture": 0.8},
}
const PERFECT := 0.12           # la parade parfaite : la garde levée moins de 0,12 s avant l'impact
const ARROW_SPEED := 46.0

var game
var stance := "pierre"
var resolve := 1.0              # la Détermination, en segments
var resolve_max := 3.0
var counter_t := 0.0            # après une parade ou une esquive parfaite : le coup suivant est une riposte
var arrows: Array = []          # {node, pos, vel, from, dmg, fire, life, stuck}
var standoff := {}              # {phase, foe, t, wait, feints, chain, cam}
var chain_t := 0.0              # la fenêtre d'un assassinat en chaîne
var _glint_tex: Texture2D
var _glint_mats := {}
var _ui: CanvasLayer
var _stance_lbls := {}
var _resolve_box: HBoxContainer
var _big: Label
var _big_t := 0.0
var _hint: Label
var _kanji := SystemFont.new()
var _wheel := false


func _init(g) -> void:
	game = g
	name = "Combat"
	_kanji.font_names = PackedStringArray(["Hiragino Mincho ProN", "Yu Mincho", "Noto Serif CJK JP", "Noto Sans CJK JP", "MS Mincho", "serif"])
	_glint_tex = _make_glint()
	_build_ui()


# ---------- Les ennemis : leur arme, leur façon de se battre ----------

## Donne à un ennemi humain sa sorte et son arme. arch : imposée, sinon tirée au sort.
func assign(e: Fighter, arch := "") -> void:
	if e.kind in ["oni", "chef"] or e.role != "enemy" and e.role != "guard":
		return
	if not e.hostile and e.faction == "hojo":
		return
	if arch == "":
		var r := randf()
		arch = "epeiste" if r < 0.4 else "bouclier" if r < 0.6 else "lancier" if r < 0.8 else "brute" if r < 0.9 else "archer"
	e.arch = arch
	var a: Dictionary = ARCH[arch]
	e.max_hp *= a.hp
	e.hp = e.max_hp
	e.max_posture *= a.posture
	if a.has("scale"):
		e.rig.body_scale *= a.scale
		e.rig.scale = Vector3.ONE * e.rig.body_scale
	_arm(e)


func _arm(e: Fighter) -> void:
	var r := e.rig
	var wood := _mat(Color(0.28, 0.17, 0.1), 0.7)
	var iron := _mat(Color(0.12, 0.12, 0.13), 0.4, 0.8)
	var lacquer := _mat(Color(0.45, 0.06, 0.05), 0.45)
	match e.arch:
		"bouclier":
			# un bouclier de bois laqué, cerclé de fer, au bras gauche
			var wl: Node3D = r.joints.elL.get_node_or_null("wrL")
			if wl:
				var sh := Node3D.new()
				sh.name = "Bouclier"
				wl.add_child(sh)
				sh.position = Vector3(0.0, -0.08, 0.06)
				sh.rotation = Vector3(0.0, 0.0, 0.0)
				_box(sh, Vector3(0.5, 0.78, 0.05), lacquer, Vector3.ZERO)
				_box(sh, Vector3(0.54, 0.05, 0.06), iron, Vector3(0, 0.38, 0))
				_box(sh, Vector3(0.54, 0.05, 0.06), iron, Vector3(0, -0.38, 0))
				_box(sh, Vector3(0.05, 0.8, 0.06), iron, Vector3(0.25, 0, 0))
				_box(sh, Vector3(0.05, 0.8, 0.06), iron, Vector3(-0.25, 0, 0))
				var boss := CylinderMesh.new(); boss.top_radius = 0.07; boss.bottom_radius = 0.09; boss.height = 0.04
				_mesh(sh, boss, _mat(Color(0.75, 0.6, 0.3), 0.35, 1.0), Vector3(0, 0, 0.04), Vector3(PI / 2, 0, 0))
		"lancier":
			# la lance (yari) remplace le sabre : une longue hampe, un fer en losange
			r.sword.visible = false
			var sp := Node3D.new()
			sp.name = "Yari"
			r.joints.wrR.add_child(sp)
			var shaft := CylinderMesh.new(); shaft.top_radius = 0.022; shaft.bottom_radius = 0.026; shaft.height = 2.6
			_mesh(sp, shaft, wood, Vector3(0, 0, 0.45), Vector3(PI / 2, 0, 0))
			_box(sp, Vector3(0.012, 0.06, 0.34), _mat(Color(0.8, 0.82, 0.86), 0.18, 1.0), Vector3(0, 0, 1.92))
			var ring := CylinderMesh.new(); ring.top_radius = 0.034; ring.bottom_radius = 0.034; ring.height = 0.05
			_mesh(sp, ring, iron, Vector3(0, 0, 1.73), Vector3(PI / 2, 0, 0))
			_tip(r, sp, Vector3(0, 0, 2.08))
		"brute":
			# le kanabō : une massue de chêne cerclée de fer, hérissée de clous
			r.sword.visible = false
			var cl := Node3D.new()
			cl.name = "Kanabo"
			r.joints.wrR.add_child(cl)
			var club := CylinderMesh.new(); club.top_radius = 0.085; club.bottom_radius = 0.035; club.height = 1.35
			_mesh(cl, club, _mat(Color(0.1, 0.08, 0.07), 0.6), Vector3(0, 0, 0.6), Vector3(PI / 2, 0, 0))
			for i in 18:
				var a := float(i % 6) / 6.0 * TAU
				var z := 0.75 + float(i / 6) * 0.22
				var stud := SphereMesh.new(); stud.radius = 0.022; stud.height = 0.044
				_mesh(cl, stud, iron, Vector3(cos(a) * 0.075, sin(a) * 0.075, z))
			_tip(r, cl, Vector3(0, 0, 1.27))
		"archer":
			# le grand arc (yumi), plus haut qu'un homme, et le carquois dans le dos
			var wl: Node3D = r.joints.elL.get_node_or_null("wrL")
			if wl:
				var bow := _bow(wood)
				wl.add_child(bow)
				bow.position = Vector3(0, -0.05, 0)
				bow.rotation = Vector3(PI / 2, 0, 0)
			var q := CylinderMesh.new(); q.top_radius = 0.07; q.bottom_radius = 0.06; q.height = 0.7
			_mesh(r.joints.chest, q, lacquer, Vector3(0.12, 0.15, -0.2), Vector3(0.3, 0, 0.35))


## Le bout de l'arme : là où naissent l'éclair et la traînée.
func _tip(r: Rig, parent: Node3D, at: Vector3) -> void:
	var t := Node3D.new()
	parent.add_child(t)
	t.position = at
	r.blade_tip = t
	var b := Node3D.new()
	parent.add_child(b)
	b.position = at - Vector3(0, 0, 0.8)
	r.blade_base = b


## Un arc asymétrique : la poignée au tiers bas, deux branches courbes, la corde.
func _bow(wood: Material) -> Node3D:
	var root := Node3D.new()
	root.name = "Yumi"
	var segs := 10
	for i in segs:
		var t0 := float(i) / segs
		var t1 := float(i + 1) / segs
		var y0 := lerpf(-0.7, 1.35, t0)
		var y1 := lerpf(-0.7, 1.35, t1)
		var x0 := -0.16 * sin(t0 * PI)
		var x1 := -0.16 * sin(t1 * PI)
		var a := Vector3(0, y0, x0)
		var b := Vector3(0, y1, x1)
		var c := CylinderMesh.new(); c.top_radius = 0.014; c.bottom_radius = 0.016; c.height = a.distance_to(b) + 0.01
		var mi := _mesh(root, c, wood, (a + b) / 2.0)
		mi.rotation.x = atan2(b.z - a.z, b.y - a.y)
	var cord := CylinderMesh.new(); cord.top_radius = 0.003; cord.bottom_radius = 0.003; cord.height = 2.05
	_mesh(root, cord, _mat(Color(0.85, 0.82, 0.72), 0.9), Vector3(0, 0.325, 0.0))
	return root


func _mat(c: Color, rough: float, metal := 0.0) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = c
	m.roughness = rough
	m.metallic = metal
	return m


func _mesh(parent: Node3D, mesh: Mesh, mat: Material, pos := Vector3.ZERO, rot := Vector3.ZERO) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	mi.mesh = mesh
	mi.material_override = mat
	parent.add_child(mi)
	mi.position = pos
	mi.rotation = rot
	return mi


func _box(parent: Node3D, size: Vector3, mat: Material, pos: Vector3) -> MeshInstance3D:
	var b := BoxMesh.new()
	b.size = size
	return _mesh(parent, b, mat, pos)


# ---------- Les postures ----------

func light_move(step: int) -> String:
	var l: Array = STANCE[stance].light
	return l[step % l.size()]


func chain_length() -> int:
	return STANCE[stance].light.size()


func heavy_move() -> String:
	return STANCE[stance].heavy


## Change de posture : un éclat de la couleur de la posture, un battement de ralenti.
func set_stance(id: String, quiet := false) -> void:
	if id == stance or not STANCE.has(id):
		return
	stance = id
	var st: Dictionary = STANCE[id]
	_refresh_stances()
	if quiet:
		return
	var p: Fighter = game.player
	Fx.burst(game, p.global_position + Vector3(0, 1.0, 0), 40, st.color, 4.0, 1.5, 0.5, 0.5, 2.5)
	Audio.sfx("posture", p.global_position, -4.0)
	_show_big(st.kanji, st.color)
	game.hud.callout(st.name, st.color)
	if game._nearest(14.0):
		game.slowmo = maxf(game.slowmo, 0.18)


func cycle(dir: int) -> void:
	var i := STANCES.find(stance)
	set_stance(STANCES[(i + dir + STANCES.size()) % STANCES.size()])


## La posture face à cet ennemi est-elle celle qui le brise ?
func strong_vs(e: Fighter) -> bool:
	return e.arch != "" and STANCE[stance].vs == e.arch


# ---------- La Détermination ----------

func gain(n: float) -> void:
	resolve = minf(resolve_max, resolve + n)
	_refresh_resolve()


func spend(n: float) -> bool:
	if resolve < n:
		game.hud.callout("Pas assez de Détermination", Hud.MUTED)
		return false
	resolve -= n
	_refresh_resolve()
	return true


## Se ressaisir : un segment de Détermination rend une bonne part de la vie.
func heal() -> void:
	var p: Fighter = game.player
	if not p.alive or p.hp >= p.max_hp - 0.5:
		return
	if not spend(1.0):
		return
	p.hp = minf(p.max_hp, p.hp + p.max_hp * 0.45)
	Fx.burst(game, p.global_position + Vector3(0, 1.1, 0), 46, Color(1.0, 0.82, 0.4), 2.5, 1.2, -1.2, 0.9, 2.0)
	Audio.sfx("souffle", p.global_position, -6.0)
	game.hud.callout("Se ressaisir", Hud.GOLD)
	game.condition.bleed = 0.0


# ---------- Les éclairs, les flèches, l'affrontement : chaque image ----------

func step(dt: float) -> void:
	counter_t = maxf(0.0, counter_t - dt)
	chain_t = maxf(0.0, chain_t - dt / maxf(Engine.time_scale, 0.05))
	for e in game.enemies:
		if not e.alive or not e.hostile or e.action.is_empty():
			continue
		var a: Dictionary = e.action
		var def: Dictionary = a.def
		# l'éclair : un instant avant que le coup ne parte
		if def.has("windup") and not a.get("glint", false) and a.t >= maxf(0.08, def.windup - 0.3):
			a.glint = true
			if e.global_position.distance_to(game.player.global_position) < 34.0:
				glint(e, def.get("unblockable", false))
		# l'archer décoche
		if def.get("ranged", false) and not a.get("fired", false) and a.t >= def.shoot_at:
			a.fired = true
			_enemy_shot(e)
	_arrows(dt)
	_standoff(dt)


## L'éclair qui annonce un coup : bleu, on peut le parer ; rouge, il faut l'esquiver.
func glint(e: Fighter, red: bool) -> void:
	var at: Vector3 = e.rig.blade_tip.global_position if is_instance_valid(e.rig.blade_tip) else e.global_position + Vector3(0, 1.6, 0)
	var c := Color(1.0, 0.18, 0.08) if red else Color(0.55, 0.78, 1.0)
	var mi := MeshInstance3D.new()
	var q := QuadMesh.new()
	q.size = Vector2(1.5, 1.5)
	mi.mesh = q
	mi.material_override = _glint_mat(c)
	mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	game.add_child(mi)
	mi.global_position = at
	mi.scale = Vector3.ONE * 0.1
	var tw := mi.create_tween()
	tw.tween_property(mi, "scale", Vector3.ONE * (1.7 if red else 1.35), 0.08)
	tw.parallel().tween_property(mi, "rotation:z", 0.8, 0.35)
	tw.tween_interval(0.06)
	tw.tween_property(mi, "scale", Vector3.ONE * 0.05, 0.24)
	tw.tween_callback(mi.queue_free)
	Audio.sfx("eclat-rouge" if red else "eclat", at, -2.0 if red else -5.0, 0.04)


func _glint_mat(c: Color) -> StandardMaterial3D:
	var key := c.to_html()
	if not _glint_mats.has(key):
		var m := StandardMaterial3D.new()
		m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
		m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		m.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
		m.billboard_mode = BaseMaterial3D.BILLBOARD_ENABLED
		m.no_depth_test = true
		m.albedo_texture = _glint_tex
		m.albedo_color = Color(c.r * 2.2, c.g * 2.2, c.b * 2.2, 1.0)
		_glint_mats[key] = m
	return _glint_mats[key]


## Une étoile à quatre branches et son halo, dessinée une fois.
func _make_glint() -> Texture2D:
	var n := 96
	var img := Image.create(n, n, false, Image.FORMAT_RGBA8)
	for y in n:
		for x in n:
			var u := (x - n / 2.0) / (n / 2.0)
			var v := (y - n / 2.0) / (n / 2.0)
			var r := sqrt(u * u + v * v)
			var star := maxf(exp(-absf(u) * 26.0) * maxf(0.0, 1.0 - absf(v)), exp(-absf(v) * 26.0) * maxf(0.0, 1.0 - absf(u)))
			var halo := exp(-r * r * 9.0) * 0.6
			var a := clampf(star + halo, 0.0, 1.0)
			img.set_pixel(x, y, Color(1, 1, 1, a))
	return ImageTexture.create_from_image(img)


# ---------- Les flèches ----------

## Une flèche part de from vers to. exact : elle monte juste ce qu'il faut pour
## atteindre to (les archers ennemis) ; sinon elle part droit et retombe (le joueur).
func shoot(from: Vector3, to: Vector3, owner: Fighter, dmg: float, fire := false, speed := ARROW_SPEED, exact := true, kunai := false) -> void:
	var d := to - from
	var vel := d.normalized() * speed
	if exact:
		var flat := Vector2(d.x, d.z).length()
		var t := flat / speed
		vel = Vector3(d.x / maxf(t, 0.01), 0, d.z / maxf(t, 0.01))
		vel.y = d.y / maxf(t, 0.01) + 0.5 * 9.8 * t
	var n := _kunai_node() if kunai else _arrow_node(fire)
	game.add_child(n)
	n.global_position = from
	arrows.append({"node": n, "pos": from, "vel": vel, "from": owner, "dmg": dmg, "fire": fire, "life": 6.0, "stuck": false, "kunai": kunai})
	Audio.sfx("fleche", from, -4.0)


func _arrow_node(fire: bool) -> Node3D:
	var n := Node3D.new()
	var shaft := CylinderMesh.new(); shaft.top_radius = 0.006; shaft.bottom_radius = 0.006; shaft.height = 0.85
	_mesh(n, shaft, _mat(Color(0.55, 0.42, 0.25), 0.8), Vector3(0, 0, -0.2), Vector3(PI / 2, 0, 0))
	var head := CylinderMesh.new(); head.top_radius = 0.0; head.bottom_radius = 0.018; head.height = 0.07
	_mesh(n, head, _mat(Color(0.3, 0.3, 0.32), 0.3, 0.9), Vector3(0, 0, 0.25), Vector3(PI / 2, 0, 0))
	for i in 3:
		var f := QuadMesh.new(); f.size = Vector2(0.03, 0.12)
		var fm := _mat(Color(0.85, 0.82, 0.78), 0.9)
		fm.cull_mode = BaseMaterial3D.CULL_DISABLED
		_mesh(n, f, fm, Vector3(0, 0, -0.56), Vector3(PI / 2, float(i) / 3.0 * TAU, 0))
	if fire:
		var fl := CPUParticles3D.new()
		fl.amount = 16
		fl.lifetime = 0.3
		fl.local_coords = false
		fl.gravity = Vector3(0, 2, 0)
		fl.initial_velocity_min = 0.2
		fl.initial_velocity_max = 0.6
		var q := QuadMesh.new(); q.size = Vector2(0.14, 0.18)
		q.material = game.fire._flame_mat
		fl.mesh = q
		n.add_child(fl)
		fl.position = Vector3(0, 0, 0.22)
		var l := OmniLight3D.new()
		l.light_color = Color(1.0, 0.5, 0.18)
		l.light_energy = 1.2
		l.omni_range = 3.5
		n.add_child(l)
	return n


## Un kunai : une petite lame noire à anneau.
func _kunai_node() -> Node3D:
	var n := Node3D.new()
	var blade := BoxMesh.new(); blade.size = Vector3(0.01, 0.04, 0.16)
	_mesh(n, blade, _mat(Color(0.15, 0.15, 0.17), 0.3, 0.9), Vector3(0, 0, 0.06))
	var grip := CylinderMesh.new(); grip.top_radius = 0.008; grip.bottom_radius = 0.008; grip.height = 0.1
	_mesh(n, grip, _mat(Color(0.3, 0.1, 0.08), 0.8), Vector3(0, 0, -0.07), Vector3(PI / 2, 0, 0))
	var ring := TorusMesh.new(); ring.inner_radius = 0.012; ring.outer_radius = 0.02
	_mesh(n, ring, _mat(Color(0.15, 0.15, 0.17), 0.3, 0.9), Vector3(0, 0, -0.13), Vector3(0, 0, PI / 2))
	return n


func _enemy_shot(e: Fighter) -> void:
	var p: Fighter = game.player
	var from := e.global_position + Vector3(0, 1.45 * e.rig.body_scale, 0) + e.forward() * 0.5
	# il vise là où l'on va être, avec un peu d'imprécision
	var lead := p.velocity * Vector3(1, 0, 1) * (from.distance_to(p.global_position) / ARROW_SPEED) * 0.8
	var to := p.global_position + Vector3(0, 1.2, 0) + lead + Vector3(randf_range(-0.3, 0.3), randf_range(-0.2, 0.35), randf_range(-0.3, 0.3))
	shoot(from, to, e, 14.0 + (6.0 if e.kind == "chef" else 0.0))


func _arrows(dt: float) -> void:
	var space: PhysicsDirectSpaceState3D = game.get_world_3d().direct_space_state
	var p: Fighter = game.player
	for ar in arrows.duplicate():
		var n: Node3D = ar.node
		ar.life -= dt
		if ar.life <= 0.0 or not is_instance_valid(n):
			arrows.erase(ar)
			if is_instance_valid(n):
				n.queue_free()
			continue
		if ar.stuck:
			continue
		var vel: Vector3 = ar.vel
		vel.y -= 9.8 * dt
		ar.vel = vel
		var from: Vector3 = ar.pos
		var to: Vector3 = from + vel * dt
		ar.pos = to
		n.global_position = to
		if vel.length_squared() > 0.01:
			n.look_at(to + vel, Vector3.UP)
		# les corps d'abord : le joueur, ou les ennemis si c'est le joueur qui tire
		var victim := _arrow_victim(ar, from, to)
		if victim:
			_arrow_hit(ar, victim, to)
			continue
		var q := PhysicsRayQueryParameters3D.create(from, to, 1)
		var hit := space.intersect_ray(q)
		if not hit.is_empty():
			ar.stuck = true
			ar.life = 8.0
			n.global_position = hit.position - vel.normalized() * 0.2
			Audio.sfx("impact-fleche", hit.position, -8.0)
			if ar.fire:
				game.fire.ignite(hit.position, 1.0, 9.0, 1, "fleche")
		elif to.y < game.terrain_height(to) - 0.1:
			ar.stuck = true
			ar.life = 8.0
			if ar.fire:
				game.fire.ignite(Vector3(to.x, game.terrain_height(to), to.z), 1.0, 9.0, 1, "fleche")


## Le corps que la flèche traverse entre from et to, s'il y en a un.
func _arrow_victim(ar: Dictionary, from: Vector3, to: Vector3) -> Fighter:
	var cands: Array = [game.player] if ar.from != game.player else game.enemies
	for f in cands:
		if f == ar.from or not f.alive:
			continue
		var s: float = f.rig.body_scale
		var a: Vector3 = f.global_position + Vector3(0, 0.3 * s, 0)
		var b: Vector3 = f.global_position + Vector3(0, 1.75 * s, 0)
		if _seg_dist(from, to, a, b) < 0.38 * s:
			return f
	return null


## La plus courte distance entre deux segments (assez juste pour une flèche).
func _seg_dist(p0: Vector3, p1: Vector3, q0: Vector3, q1: Vector3) -> float:
	var best := 1e9
	for i in 6:
		var x := p0.lerp(p1, float(i) / 5.0)
		var ab := q1 - q0
		var t := clampf((x - q0).dot(ab) / ab.length_squared(), 0.0, 1.0)
		best = minf(best, x.distance_to(q0 + ab * t))
	return best


func _arrow_hit(ar: Dictionary, f: Fighter, at: Vector3) -> void:
	var n: Node3D = ar.node
	arrows.erase(ar)
	if f == game.player:
		var p: Fighter = f
		var shooter: Fighter = ar.from
		var facing: bool = is_instance_valid(shooter) and p.angle_to(shooter.global_position) < 1.3
		if game._invulnerable():
			arrows.append(ar)
			return
		if facing and game.block_press_t < PERFECT * 1.6:
			# la flèche déviée d'un revers de lame
			Fx.burst(game, at, 30, Color(1.0, 0.85, 0.5), 6.0, 2.0, 10.0, 0.3, 4.0)
			Audio.sfx("parade", at, -2.0)
			game.hud.callout("Flèche déviée", Hud.GOLD)
			gain(0.2)
			n.queue_free()
			return
		if facing and p.blocking and game.stamina > 0.0:
			game.stamina -= 12.0
			Audio.sfx("garde", at, -4.0)
			n.queue_free()
			return
		p.hp -= ar.dmg
		p.play("hit")
		game.condition.wound(ar.dmg + 4.0)
		Blood.spray(game, at, ar.vel.normalized(), 18, 0.6)
		Audio.sfx("chair", at, -4.0)
		game.shake = 0.2
		if ar.fire:
			game.condition.set_on_fire(4.0)
		n.queue_free()
		if p.hp <= 0.0:
			game._kill(p)
		return
	# la flèche du joueur : à la tête, elle tue
	var head := f.global_position.y + 1.55 * f.rig.body_scale
	var headshot := at.y > head - 0.18 and f.kind != "oni"
	var dmg: float = ar.dmg * (4.0 if headshot else 1.0)
	f.hp -= dmg
	f.posture += 35.0 if ar.get("kunai", false) else 18.0
	# le kunai coupe l'élan d'un coup qui se prépare
	if ar.get("kunai", false) and not f.action.is_empty() and f.action.def.has("windup") and f.kind != "oni":
		f.action = {}
		f.play("hit")
		game.hud.callout("Interrompu", Hud.GOLD)
	Blood.spray(game, at, ar.vel.normalized(), 30 if headshot else 16, 0.8)
	Audio.sfx("chair", at, -3.0)
	if headshot:
		game.hud.callout("En pleine tête", Hud.GOLD)
		game.hitstop = 0.08
	if ar.fire:
		game.burning[f] = 4.0
	# une flèche dans la tête d'un garde qui ne se doutait de rien : il tombe sans un cri
	if headshot and not f.aggro and f.alert != "alerte" and f.hp <= 0.0:
		n.queue_free()
		game._kill(f, "dying", true)
		return
	game._noise(f.global_position)
	game._crime(f)
	if game.stealth.watched(f) and f.alive and f.alert != "alerte":
		game.stealth.raise(f)
	f.aggro = true
	# la flèche reste plantée dans le corps
	var stick: Node3D = n
	stick.get_parent().remove_child(stick)
	f.add_child(stick)
	stick.global_position = at
	var tw := stick.create_tween()
	tw.tween_interval(6.0)
	tw.tween_callback(stick.queue_free)
	if not game._enemy_dead(f) and not f.striking():
		f.play("hit")


# ---------- L'affrontement ----------

## Peut-on défier quelqu'un ici ? Le plus proche des ennemis en face, à bonne
## distance, qui n'a pas encore frappé.
func standoff_target() -> Fighter:
	if not standoff.is_empty() or game.cine.active():
		return null
	var p: Fighter = game.player
	var best: Fighter = null
	var bd := 17.0
	for e in game.enemies:
		if not e.alive or not e.hostile or e.duel or e.kind == "oni" or e.get_meta("prisoner", false):
			continue
		var d: float = e.flat_distance(p)
		if d < 3.5 and e.aggro:
			return null           # le combat a déjà commencé
		if d < 5.0 or d > bd:
			continue
		if not e.action.is_empty():
			continue
		var to: Vector3 = (e.global_position - p.global_position).normalized()
		if p.forward().dot(to) < 0.5 and (Vector3(sin(game.cam_yaw), 0, cos(game.cam_yaw))).dot(to) < 0.5:
			continue
		bd = d
		best = e
	return best


func start_standoff(e: Fighter) -> void:
	var p: Fighter = game.player
	standoff = {"phase": "approche", "foe": e, "t": 0.0, "wait": randf_range(1.6, 4.2), "feints": randi() % 3, "chain": 0, "held": false, "warned": false}
	game.state = "play"
	game.hud.letterbox(true)
	p.sneaking = false
	if p.sheathed:
		p.sheathed = true
	e.aggro = true
	e.action = {}
	e.cd = 99.0
	for o in game.enemies:
		if o != e and o.alive and o.hostile and o.global_position.distance_to(e.global_position) < 18.0:
			o.cd = 99.0
	Audio.sfx("tambour", null, -4.0, 0.0)
	_hint.text = "Maintiens  [%s]  …  relâche quand il frappe" % Settings.key_name("rapide")
	_hint.visible = true
	game.wind.storm = 0.7


func active_standoff() -> bool:
	return not standoff.is_empty()


func _standoff(dt: float) -> void:
	if standoff.is_empty():
		return
	var p: Fighter = game.player
	var e: Fighter = standoff.foe
	if not is_instance_valid(e) or not p.alive or (not e.alive and standoff.phase != "frappe"):
		_end_standoff(false)
		return
	standoff.t += dt
	var held := Input.is_action_pressed("rapide")
	if standoff.phase != "frappe":
		var to: Vector3 = e.global_position - p.global_position
		p.yaw = atan2(to.x, to.z)
		p.move = Vector3.ZERO
	match standoff.phase:
		"approche":
			# il s'avance jusqu'à cinq pas, la main sur la poignée
			e.turn_towards(p.global_position, 6.0, dt)
			var d: float = e.flat_distance(p)
			e.move = e.forward() * (1.6 if d > 5.2 else 0.0)
			e.speed = e.move.length()
			if held:
				standoff.held = true
			if standoff.t > 1.6 and d <= 5.4:
				standoff.phase = "attente"
				standoff.t = 0.0
		"attente":
			e.move = Vector3.ZERO
			e.speed = 0.0
			e.turn_towards(p.global_position, 6.0, dt)
			if held:
				standoff.held = true
			elif standoff.held:
				_too_early()
				return
			if standoff.t >= standoff.wait:
				if standoff.feints > 0:
					# une feinte : il fait mine de s'élancer… et se ravise
					standoff.feints -= 1
					standoff.phase = "feinte"
					standoff.t = 0.0
					e.play("quick")
					Audio.sfx("saut", e.global_position, -10.0)
				else:
					standoff.phase = "charge"
					standoff.t = 0.0
					glint(e, false)
					Audio.sfx("tambour", null, 2.0, 0.0)
					e.play("lunge")
		"feinte":
			if held:
				standoff.held = true
			elif standoff.held:
				_too_early()
				return
			if standoff.t > 0.22:
				e.action = {}
				standoff.phase = "attente"
				standoff.t = 0.0
				standoff.wait = randf_range(0.9, 2.6)
		"charge":
			# le moment : on relâche dans l'instant où il part
			if not held and standoff.held:
				if standoff.t <= 0.42:
					_strike_standoff(e)
				else:
					_too_late(e)
				return
			if standoff.t > 0.5:
				_too_late(e)
				return
		"frappe":
			if standoff.t > 1.25:
				# un autre s'avance pour venger son camarade ?
				var next := _next_foe(e)
				if next and standoff.chain < 2:
					standoff.chain += 1
					standoff.foe = next
					standoff.phase = "charge"
					standoff.t = 0.0
					standoff.held = Input.is_action_pressed("rapide")
					next.aggro = true
					next.action = {}
					next.yaw = atan2(p.global_position.x - next.global_position.x, p.global_position.z - next.global_position.z)
					next.global_position = p.global_position + (next.global_position - p.global_position).normalized() * 4.6 * Vector3(1, 0, 1) + Vector3(0, next.global_position.y - p.global_position.y, 0)
					glint(next, false)
					next.play("lunge")
					_hint.text = "Il charge !  maintiens puis relâche  [%s]" % Settings.key_name("rapide")
					game.slowmo = 0.5
				else:
					_end_standoff(true)


func _strike_standoff(e: Fighter) -> void:
	var p: Fighter = game.player
	standoff.phase = "frappe"
	standoff.t = 0.0
	p.sheathed = false
	p.play("iai")
	e.action = {}
	game.slowmo = 1.1
	game.hitstop = 0.12
	game.shake = 0.35
	Audio.sfx("lame", p.global_position, 4.0)
	var chest := e.global_position + Vector3(0, 1.3, 0)
	var dir := (e.global_position - p.global_position).normalized()
	Blood.spray(game, chest, dir + Vector3(0, 0.6, 0), 160, 1.5)
	Blood.stain(game, func(at): return game.terrain_height(at), e.global_position, dir, 3, 1.8)
	Blood.stain_blade(p.rig, 0.7)
	Audio.sfx("sang", chest, 3.0)
	Audio.sfx("grace", null, -2.0, 0.0)
	game.execute_kill(e, "affrontement")
	gain(1.0)
	game.hud.callout("Affrontement" if standoff.chain == 0 else "Enchaînement", Hud.GOLD)
	_hint.visible = false


func _too_early() -> void:
	var e: Fighter = standoff.foe
	game.hud.callout("Trop tôt", Color(1.0, 0.35, 0.25))
	_punish(e)


func _too_late(e: Fighter) -> void:
	game.hud.callout("Trop tard", Color(1.0, 0.35, 0.25))
	_punish(e)


func _punish(e: Fighter) -> void:
	var p: Fighter = game.player
	if is_instance_valid(e) and e.alive:
		e.play("slash")
		e.action.t = 0.6
	p.hp -= p.max_hp * 0.3
	p.play("stagger")
	Blood.spray(game, p.global_position + Vector3(0, 1.3, 0), -p.forward() + Vector3(0, 0.3, 0), 40, 0.9)
	Audio.sfx("chair", p.global_position, 0.0)
	game.shake = 0.4
	if p.hp <= 0.0:
		game._kill(p)
	_end_standoff(false)


func _next_foe(prev: Fighter) -> Fighter:
	var p: Fighter = game.player
	var best: Fighter = null
	var bd := 16.0
	for o in game.enemies:
		if o == prev or not o.alive or not o.hostile or o.kind == "oni" or o.duel:
			continue
		var d: float = o.flat_distance(p)
		if d < bd:
			bd = d
			best = o
	return best


func _end_standoff(won: bool) -> void:
	var foe = standoff.get("foe")
	standoff = {}
	_hint.visible = false
	game.hud.letterbox(false)
	game.wind.storm = 0.0
	var p: Fighter = game.player
	for o in game.enemies:
		if o.alive and o.hostile and o.global_position.distance_to(p.global_position) < 22.0:
			o.aggro = true
			o.cd = randf_range(0.6, 1.8)
			if game.stealth.watched(o) and o.alert != "alerte":
				game.stealth.raise(o)
	if won:
		game.hud.toast("Les autres hésitent… puis attaquent.", Hud.MUTED)


## La caméra de l'affrontement : un plan large, bas, de profil, à la Kurosawa.
func camera(real: float) -> bool:
	if standoff.is_empty():
		return false
	var p: Fighter = game.player
	var e: Fighter = standoff.foe if is_instance_valid(standoff.foe) else p
	var mid := (p.global_position + e.global_position) / 2.0
	var d := (e.global_position - p.global_position) * Vector3(1, 0, 1)
	d = d.normalized() if d.length_squared() > 0.01 else p.forward()
	var side := Vector3(d.z, 0, -d.x)
	if not standoff.has("side"):
		standoff.side = game.cine._clear_side(e)
	var wide: bool = standoff.phase in ["approche", "attente", "feinte"]
	var dist := 6.5 if wide else 4.2
	var want: Vector3 = mid + side * standoff.side * dist + Vector3(0, 1.1 if wide else 1.4, 0) - d * (0.0 if wide else 1.2)
	want.y = maxf(want.y, game.terrain_height(want) + 0.5)
	if not standoff.has("cam"):
		standoff.cam = game.camera.global_position
	standoff.cam = (standoff.cam as Vector3).lerp(want, 1.0 - exp(-real * 3.0))
	game.camera.global_position = standoff.cam
	game.camera.look_at(mid + Vector3(0, 1.2, 0))
	return true


# ---------- L'interface : postures, Détermination, grands caractères ----------

func _build_ui() -> void:
	_ui = CanvasLayer.new()
	_ui.layer = 2
	add_child(_ui)
	var root := Control.new()
	root.set_anchors_preset(Control.PRESET_FULL_RECT)
	root.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_ui.add_child(root)
	var row := HBoxContainer.new()
	row.position = Vector2(390, 18)
	row.add_theme_constant_override("separation", 8)
	root.add_child(row)
	for id in STANCES:
		var l := Label.new()
		l.text = STANCE[id].kanji
		var f := FontVariation.new()
		f.base_font = _kanji
		l.add_theme_font_override("font", f)
		l.add_theme_font_size_override("font_size", 24)
		l.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.85))
		l.add_theme_constant_override("outline_size", 5)
		l.custom_minimum_size = Vector2(32, 32)
		l.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		row.add_child(l)
		_stance_lbls[id] = l
	_resolve_box = HBoxContainer.new()
	_resolve_box.position = Vector2(392, 58)
	_resolve_box.add_theme_constant_override("separation", 5)
	root.add_child(_resolve_box)
	_big = Label.new()
	var bf := FontVariation.new()
	bf.base_font = _kanji
	_big.add_theme_font_override("font", bf)
	_big.add_theme_font_size_override("font_size", 150)
	_big.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.6))
	_big.add_theme_constant_override("outline_size", 10)
	_big.set_anchors_preset(Control.PRESET_CENTER)
	_big.custom_minimum_size = Vector2(300, 220)
	_big.position = Vector2(-150, -190)
	_big.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_big.modulate.a = 0.0
	root.add_child(_big)
	_hint = Label.new()
	_hint.set_anchors_preset(Control.PRESET_CENTER_BOTTOM)
	_hint.position = Vector2(-400, -150)
	_hint.custom_minimum_size = Vector2(800, 30)
	_hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	_hint.add_theme_font_size_override("font_size", 20)
	_hint.add_theme_color_override("font_color", Color(0.94, 0.9, 0.85))
	_hint.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.9))
	_hint.add_theme_constant_override("outline_size", 6)
	_hint.visible = false
	root.add_child(_hint)
	_refresh_stances()
	_refresh_resolve()


func show_ui(on: bool) -> void:
	_ui.visible = on


func _refresh_stances() -> void:
	for id in _stance_lbls:
		var l: Label = _stance_lbls[id]
		var on: bool = id == stance
		l.add_theme_color_override("font_color", STANCE[id].color if on else Color(0.94, 0.9, 0.85, 0.32))
		l.add_theme_font_size_override("font_size", 30 if on else 21)


func _refresh_resolve() -> void:
	for c in _resolve_box.get_children():
		c.queue_free()
	for i in int(resolve_max):
		var fill := clampf(resolve - i, 0.0, 1.0)
		var d := ColorRect.new()
		d.custom_minimum_size = Vector2(16, 16)
		d.rotation = PI / 4
		d.pivot_offset = Vector2(8, 8)
		d.color = Color(0.85, 0.7, 0.35, 0.25 + 0.75 * fill) if fill > 0.0 else Color(0.3, 0.25, 0.2, 0.5)
		d.mouse_filter = Control.MOUSE_FILTER_IGNORE
		_resolve_box.add_child(d)


func _show_big(text: String, c: Color) -> void:
	_big.text = text
	_big.add_theme_color_override("font_color", Color(c.r, c.g, c.b, 0.85))
	_big_t = 0.9


func _process(delta: float) -> void:
	var real := delta / maxf(Engine.time_scale, 0.001)
	_big_t -= real
	_big.modulate.a = clampf(_big_t * 2.0, 0.0, 1.0)
	_big.scale = Vector2.ONE * (1.0 + maxf(0.0, _big_t - 0.6) * 0.6)


func _unhandled_input(ev: InputEvent) -> void:
	if game.state != "play" or game.player == null or not game.player.alive or not standoff.is_empty():
		return
	if ev is InputEventMouseButton and ev.pressed and not game.archery.active:
		if ev.button_index == MOUSE_BUTTON_WHEEL_UP:
			cycle(-1)
		elif ev.button_index == MOUSE_BUTTON_WHEEL_DOWN:
			cycle(1)
	for i in 4:
		if ev.is_action_pressed("posture%d" % (i + 1)):
			set_stance(STANCES[i])
	if ev.is_action_pressed("soin"):
		heal()
	# la roue : Tab maintenu, une direction choisit la posture
	if ev.is_action_pressed("postures"):
		_wheel = true
		game.slowmo = maxf(game.slowmo, 0.25)
	elif ev.is_action_released("postures"):
		_wheel = false
	if _wheel:
		var pick := {"avant": "pierre", "gauche": "eau", "arriere": "vent", "droite": "lune"}
		for a in pick:
			if ev.is_action_pressed(a):
				set_stance(pick[a])


func wheel_open() -> bool:
	return _wheel


# ---------- La sauvegarde ----------

func save() -> Dictionary:
	return {"stance": stance, "resolve": resolve, "resolve_max": resolve_max}


func load_save(d: Dictionary) -> void:
	set_stance(d.get("stance", "pierre"), true)
	resolve_max = float(d.get("resolve_max", 3.0))
	resolve = float(d.get("resolve", 1.0))
	_refresh_resolve()
