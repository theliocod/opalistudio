## Un combattant joue une « action » à la fois : un coup, une parade, une
## esquive, une blessure. Chaque action a ses clés d'animation, sa fenêtre
## où la lame blesse, ses dégâts. Portage de combat.js.
class_name Fighter
extends CharacterBody3D

# ---------- Les poses clés ----------
const P := {
	"wind1": {"chest": [0, -0.8, 0], "shR": [-2.7, 0.1, -0.5], "elR": [-0.35, 0, 0], "wrR": [0.5, 0, 0], "shL": [-0.4, -0.4, 0.3], "elL": [-0.8, 0, 0], "hipsY": -0.04},
	"end1": {"chest": [0.18, 0.8, 0], "neck": [0, -0.4, 0], "shR": [-0.55, 1.2, 0.35], "elR": [-0.15, 0, 0], "wrR": [0.15, 0, 0],
		"shL": [-0.3, 0.2, 0.4], "elL": [-0.5, 0, 0], "hipsY": -0.16,
		"hipL": [-0.6, 0, 0.1], "knL": [0.7, 0, 0], "hipR": [0.35, 0, -0.1], "knR": [0.45, 0, 0]},
	"wind2": {"chest": [0.1, 0.7, 0], "neck": [0, -0.3, 0], "shR": [-0.3, 1.3, 0.5], "elR": [-0.2, 0, 0], "wrR": [-0.2, 0, 0], "hipsY": -0.14},
	"end2": {"chest": [-0.1, -0.9, 0], "neck": [0, 0.5, 0], "shR": [-2.5, -0.5, -0.9], "elR": [-0.2, 0, 0], "wrR": [0.4, 0, 0], "shL": [-0.6, -0.9, 0.2], "hipsY": -0.08},
	"wind3": {"chest": [0, -1.2, 0], "neck": [0, 0.7, 0], "shR": [-1.5, -0.9, -0.2], "elR": [-0.25, 0, 0], "wrR": [1.4, 0, 0], "hipsY": -0.22,
		"hipL": [-0.5, 0, 0.3], "knL": [0.6, 0, 0], "hipR": [0.3, 0, -0.3], "knR": [0.5, 0, 0]},
	"end3": {"chest": [0, 1.3, 0], "neck": [0, -0.7, 0], "shR": [-1.5, 1.4, 0.1], "elR": [-0.1, 0, 0], "wrR": [1.4, 0, 0], "hipsY": -0.22,
		"hipL": [-0.5, 0, 0.3], "knL": [0.6, 0, 0], "hipR": [0.3, 0, -0.3], "knR": [0.5, 0, 0]},
	"windH": {"chest": [-0.3, -0.2, 0], "shR": [-3.1, 0.3, 0.1], "elR": [-0.5, 0, 0], "wrR": [0.2, 0, 0], "shL": [-2.9, -0.3, 0], "elL": [-0.6, 0, 0], "hipsY": 0.0},
	"endH": {"chest": [0.45, 0, 0], "spine": [0.2, 0, 0], "shR": [-0.7, 0.25, 0], "elR": [-0.1, 0, 0], "wrR": [0.6, 0, 0],
		"shL": [-0.75, -0.3, 0], "elL": [-0.2, 0, 0], "hipsY": -0.3,
		"hipL": [-1.0, 0, 0], "knL": [1.0, 0, 0], "hipR": [0.6, 0, 0], "knR": [0.7, 0, 0]},
	"windT": {"chest": [0, -0.6, 0], "shR": [-1.3, -0.4, -0.3], "elR": [-1.6, 0, 0], "wrR": [1.5, 0, 0], "hipsY": -0.2},
	"endT": {"chest": [0.2, 0.3, 0], "shR": [-1.55, 0.25, 0], "elR": [0, 0, 0], "wrR": [1.55, 0, 0], "hipsY": -0.3,
		"hipL": [-1.0, 0, 0], "knL": [0.9, 0, 0], "hipR": [0.6, 0, 0], "knR": [0.5, 0, 0]},
	"parry": {"chest": [0, 0.35, 0], "shR": [-1.7, 0.7, 0.1], "elR": [-1.1, 0, 0], "wrR": [1.1, 0.3, 1.2], "shL": [-1.2, -0.3, 0], "elL": [-1.4, 0, 0], "hipsY": -0.12},
	"dodge": {"hipsY": -0.38, "spine": [0.5, 0, 0], "chest": [0.3, 0, 0],
		"hipL": [-1.3, 0, 0], "knL": [1.7, 0, 0], "hipR": [-0.3, 0, 0], "knR": [1.9, 0, 0], "shR": [-0.4, 0.3, 0], "elR": [-0.6, 0, 0]},
	"hit": {"chest": [-0.45, 0.3, 0], "head": [-0.4, 0, 0], "hipsY": -0.1, "shR": [-0.3, 0.3, -0.5], "shL": [-0.4, 0, 0.5]},
	"stagger": {"chest": [-0.6, -0.4, 0], "head": [-0.5, 0, 0], "shR": [0.2, 0, -1.0], "elR": [-0.3, 0, 0], "shL": [0.2, 0, 1.0], "hipsY": -0.15,
		"hipL": [0.3, 0, 0.2], "knL": [0.5, 0, 0]},
	"stagger2": {"chest": [-0.4, -0.2, 0], "head": [-0.5, 0, 0], "shR": [0.2, 0, -1.0], "elR": [-0.3, 0, 0], "shL": [0.2, 0, 1.0], "hipsY": -0.25,
		"hipL": [0.3, 0, 0.2], "knL": [0.5, 0, 0]},
	"dead": {"hipsY": -0.55, "chest": [0.6, 0, 0], "head": [0.6, 0, 0], "shR": [0.2, 0, -0.6], "shL": [0.2, 0, 0.6],
		"hipL": [-1.4, 0, 0], "knL": [2.2, 0, 0], "hipR": [-1.3, 0, 0], "knR": [2.2, 0, 0]},
}

# ---------- Les actions ----------
# dur : durée totale · active : fenêtre où la lame blesse · combo : à partir
# de quand on peut enchaîner · lunge : [début, fin, vitesse] d'un élan ·
# reach, arc : portée et angle du coup · clip : animation Mixamo
static var ACTIONS := {
	"light1": {"dur": 0.46, "active": [0.12, 0.24], "combo": 0.24, "dmg": 18, "cost": 12, "lunge": [0.06, 0.2, 3.2], "keys": [[0, {}], [0.11, P.wind1], [0.24, P.end1], [0.46, {}]]},
	"light2": {"dur": 0.46, "active": [0.12, 0.23], "combo": 0.24, "dmg": 18, "cost": 12, "lunge": [0.06, 0.2, 3.2], "keys": [[0, P.end1], [0.1, P.wind2], [0.23, P.end2], [0.46, {}]]},
	"light3": {"dur": 0.64, "active": [0.18, 0.34], "combo": 0.5, "dmg": 28, "cost": 16, "lunge": [0.12, 0.3, 4.5], "arc": 1.9, "keys": [[0, P.end2], [0.15, P.wind3], [0.34, P.end3], [0.64, {}]]},
	"heavy": {"dur": 0.95, "active": [0.42, 0.54], "combo": 0.8, "dmg": 46, "cost": 28, "heavy": true, "lunge": [0.34, 0.5, 8], "keys": [[0, {}], [0.36, P.windH], [0.5, P.endH], [0.95, {}]]},
	"parry": {"dur": 0.38, "keys": [[0, {}], [0.07, P.parry], [0.26, P.parry], [0.38, {}]]},
	"dodge": {"dur": 0.42, "keys": [[0, {}], [0.08, P.dodge], [0.3, P.dodge], [0.42, {}]]},
	"hit": {"dur": 0.34, "keys": [[0, {}], [0.06, P.hit], [0.34, {}]]},
	"stagger": {"dur": 1.35, "keys": [[0, {}], [0.12, P.stagger], [1.05, P.stagger2], [1.35, {}]]},
	# Fenêtres mesurées sur la vitesse réelle du pied et de la lame (tools_clips.gd)
	"kick": {"clip": "spin-kick", "from": 0.25, "to": 2.35, "speed": 1.35, "active": [1.0, 1.42], "dmg": 10, "posture": 45, "kick": true, "cost": 20},
	"tourbillon": {"clip": "tourbillon", "from": 0.45, "to": 2.0, "speed": 1.25, "active": [0.4, 0.78], "dmg": 30, "posture": 30, "arc": 3.2, "reach": 2.8, "cost": 35},
	"iai": {"dur": 0.62, "active": [0.1, 0.34], "dmg": 40, "posture": 25, "lunge": [0.08, 0.3, 22], "iframes": [0.04, 0.36], "arc": 1.2, "reach": 2.4, "cost": 30,
		"keys": [[0, {}], [0.07, P.windT], [0.3, P.end1], [0.62, {}]]},
	# le coup de pied direct : le pied part à 0,95 s et rentre à 1,3 s de l'animation
	"frontkick": {"clip": "pied-direct", "from": 0.45, "to": 1.85, "speed": 1.4, "active": [0.33, 0.62], "dmg": 8, "posture": 30, "kick": true, "push": 20.0, "cost": 14, "lunge": [0.2, 0.42, 3.5]},
	# dégainer : la main saisit la poignée à 0,6 s ; la lame apparaît alors
	"degainer": {"clip": "degainer", "from": 0.0, "to": 1.45, "speed": 1.3, "combo": 0.75, "draw_at": 0.48},
	"rengainer": {"clip": "degainer", "from": 1.45, "to": 0.0, "speed": -1.6, "sheath_at": 0.52},
	# le saut : les pieds passent au-dessus d'un muret de 90 cm entre 0,35 et 0,85 s
	"saut": {"clip": "saut", "from": 0.05, "to": 1.15, "speed": 1.1, "vault": true},
	"finisher": {"clip": "revers", "from": 0.3, "to": 2.3, "speed": 1.0, "active": [0.6, 1.05], "finisher": true},
	"executed": {"dur": 2.2, "keys": [[0, {}], [0.15, P.stagger], [2.2, P.stagger2]]},
	"dying": {"clip": "dying", "from": 0.6, "to": 4.6, "speed": 1.5, "hold": true},
	"die": {"dur": 1.1, "hold": true, "keys": [[0, {}], [0.25, P.hit], [1.1, P.dead]]},
	# Les ennemis : de longues préparations, lisibles, que l'on peut parer
	"slash": {"dur": 1.25, "windup": 0.6, "active": [0.62, 0.75], "dmg": 18, "keys": [[0, {}], [0.6, P.wind1], [0.75, P.end1], [1.25, {}]]},
	"rising": {"dur": 0.95, "windup": 0.3, "active": [0.3, 0.42], "dmg": 18, "keys": [[0, P.end1], [0.28, P.wind2], [0.42, P.end2], [0.95, {}]]},
	"thrust": {"dur": 1.3, "windup": 0.66, "active": [0.68, 0.82], "dmg": 22, "lunge": [0.62, 0.82, 10], "arc": 0.7, "reach": 2.2, "keys": [[0, {}], [0.62, P.windT], [0.82, P.endT], [1.3, {}]]},
	"smash": {"dur": 1.5, "windup": 0.85, "active": [0.86, 0.98], "dmg": 34, "heavy": true, "lunge": [0.78, 0.95, 6], "keys": [[0, {}], [0.82, P.windH], [0.98, P.endH], [1.5, {}]]},
}
static var CLIPS := {}

const GRAVITY := 22.0

var kind := "player"
var rig: Rig
var skin: MeshySkin
var trail: Trail
var yaw := 0.0
var speed := 0.0               # vitesse de marche, pour l'animation
var phase := 0.0
var action := {}               # name, def, t, hits, root
var alive := true
var dead_t := 0.0
var max_hp := 100.0
var hp := 100.0
var max_posture := 0.0
var posture := 0.0
var blocking := false
var sheathed := false          # l'épée au fourreau (le joueur, hors combat)
var glow := 0.0
var move := Vector3.ZERO       # déplacement voulu (m/s), décidé par le joueur ou l'IA
var push := Vector3.ZERO       # déplacement imposé cette image (élan)
var knock := Vector3.ZERO      # un recul qui s'amortit (coup de pied)
# L'IA
var cd := 1.5
var side := 1.0
var combo := false
var home := Vector3.ZERO       # là où il monte la garde
var aggro := false
var place := ""


static func load_clips() -> void:
	if not CLIPS.is_empty():
		return
	for name in ["spin-kick", "dying", "tourbillon", "revers", "degainer", "pied-direct", "saut"]:
		var f := FileAccess.open("res://anims/%s.json" % name, FileAccess.READ)
		if f == null:
			continue
		var c: Dictionary = JSON.parse_string(f.get_as_text())
		var q := []
		for fr in c.frames:
			var row := []
			var a: Array = fr.q
			for i in c.joints.size():
				row.append(Quaternion(a[i * 4], a[i * 4 + 1], a[i * 4 + 2], a[i * 4 + 3]))
			q.append(row)
		c.q = q
		CLIPS[name] = c
	for a in ACTIONS.values():
		if a.has("clip"):
			a.dur = absf(a.to - a["from"]) / absf(a.speed)


func _init(k: String) -> void:
	kind = k
	load_clips()
	var stats: Array = {"player": [100, 0], "ronin": [70, 50], "chef": [150, 80], "oni": [340, 120]}[kind]
	max_hp = stats[0]
	hp = max_hp
	max_posture = stats[1]
	rig = Rig.new(kind)
	add_child(rig)
	var shape := CapsuleShape3D.new()
	shape.radius = 0.38 * rig.body_scale
	shape.height = 1.8 * rig.body_scale
	var cs := CollisionShape3D.new()
	cs.shape = shape
	cs.position.y = 0.9 * rig.body_scale
	add_child(cs)
	collision_layer = 2
	collision_mask = 1 | 2 | Landmarks.WALL_LAYER
	floor_snap_length = 0.6
	floor_max_angle = deg_to_rad(50)


func _ready() -> void:
	skin = MeshySkin.dress(rig)
	# les personnages sont aussi sur la couche 2 : la lueur de la caméra n'éclaire qu'eux
	for g in find_children("*", "GeometryInstance3D", true, false):
		g.layers |= 2
	trail = Trail.new(Color(0.75, 0.9, 1.0) if kind == "player" else Color(1.0, 0.23, 0.16))
	add_child(trail)


func forward() -> Vector3:
	return Vector3(sin(yaw), 0, cos(yaw))


func play(name: String) -> void:
	action = {"name": name, "def": ACTIONS[name], "t": 0.0, "hits": {}, "root": null}


func is_doing(names: Array) -> bool:
	return not action.is_empty() and action.name in names


## La lame blesse-t-elle en ce moment ?
func striking() -> bool:
	if action.is_empty() or not action.def.has("active"):
		return false
	var a: Array = action.def.active
	return action.t >= a[0] and action.t <= a[1]


## Le temps de préparation d'une attaque ennemie, de 0 à 1
func windup() -> float:
	if action.is_empty() or not action.def.has("windup"):
		return 0.0
	return minf(1.0, action.t / action.def.windup)


func angle_to(p: Vector3) -> float:
	var want := atan2(p.x - global_position.x, p.z - global_position.z)
	return absf(angle_difference(yaw, want))


func turn_towards(p: Vector3, rate: float, dt: float) -> void:
	var want := atan2(p.x - global_position.x, p.z - global_position.z)
	var d := angle_difference(yaw, want)
	yaw += clampf(d, -rate * dt, rate * dt)


func flat_distance(o: Node3D) -> float:
	var a := global_position
	var b := o.global_position
	return Vector2(a.x, a.z).distance_to(Vector2(b.x, b.z))


## Une image de simulation : l'action avance, le corps prend sa pose, on bouge.
func step(dt: float, time: float) -> void:
	push = Vector3.ZERO
	if not action.is_empty():
		action.t += dt
		var l = action.def.get("lunge")
		if l and action.t >= l[0] and action.t <= l[1]:
			push += forward() * l[2] * dt * rig.body_scale
		if action.def.has("draw_at") and action.t >= action.def.draw_at:
			sheathed = false
		if action.def.has("sheath_at") and action.t >= action.def.sheath_at:
			sheathed = true
		if action.t >= action.def.dur and not action.def.get("hold", false):
			action = {}

	# La marche : un cycle de jambes selon la vitesse
	var k := minf(1.0, speed / 4.5)
	phase += dt * (3.0 + speed * 2.1)
	var s := sin(phase)
	var c := cos(phase)
	var G := Rig.RELAX if sheathed else Rig.GUARD
	var breathe := sin(time * 2.1 + global_position.x) * 0.025
	var loco: Dictionary = G.duplicate(true)
	loco.chest = [G.chest[0] + breathe + k * 0.18, G.chest[1], G.chest[2]]
	loco.hipsY = G.hipsY + absf(c) * 0.05 * k - k * 0.05
	loco.hipL = [G.hipL[0] * (1 - k) - s * 0.75 * k, 0, 0.04]
	loco.hipR = [G.hipR[0] * (1 - k) + s * 0.75 * k, 0, -0.04]
	loco.knL = [G.knL[0] * (1 - k) + (0.25 + maxf(0, -c) * 1.1) * k, 0, 0]
	loco.knR = [G.knR[0] * (1 - k) + (0.25 + maxf(0, c) * 1.1) * k, 0, 0]
	loco.shL = [G.shL[0] + s * 0.15 * k, G.shL[1], G.shL[2]]
	if sheathed:
		# les bras balancent avec le pas
		loco.shL = [G.shL[0] + s * 0.4 * k, G.shL[1], G.shL[2]]
		loco.shR = [G.shR[0] - s * 0.4 * k, G.shR[1], G.shR[2]]
	if blocking:
		for j in ["chest", "shR", "elR", "wrR", "shL", "elL"]:
			loco[j] = P.parry[j]

	if not action.is_empty() and action.def.has("clip"):
		_play_clip(loco)
	else:
		var pose := loco
		if not action.is_empty():
			var d: Dictionary = action.def
			var ap := Rig.sample_pose(d["keys"], action.t, loco)
			var fade: float = 1.0 if d.get("hold", false) else minf(1.0, minf((d.dur - action.t) / 0.1, action.t / 0.04))
			pose = Rig.mix_pose(loco, ap, maxf(0.0, fade))
		rig.set_pose(pose)
	_finish(dt)


## Joue une animation Mixamo, mélangée à la pose de marche au début et à la fin.
func _play_clip(loco: Dictionary) -> void:
	var a := action
	var d: Dictionary = a.def
	var c: Dictionary = CLIPS[d.clip]
	var ct: float = clampf(d["from"] + a.t * d.speed, minf(d["from"], d.to), maxf(d["from"], d.to))
	var n: int = c.frames.size()
	var f: float = ct * c.fps
	var i0 := mini(n - 1, int(f))
	var i1 := mini(n - 1, i0 + 1)
	var u := f - i0
	var F0: Dictionary = c.frames[i0]
	var F1: Dictionary = c.frames[i1]
	# l'élan de l'animation déplace vraiment le combattant
	var rx := lerpf(F0.x, F1.x, u)
	var rz := lerpf(F0.z, F1.z, u)
	if a.root != null:
		var dx: float = (rx - a.root[0]) * rig.body_scale
		var dz: float = (rz - a.root[1]) * rig.body_scale
		push += Vector3(dx * cos(yaw) + dz * sin(yaw), 0, -dx * sin(yaw) + dz * cos(yaw))
	a.root = [rx, rz]
	var w: float = clampf(minf(a.t / 0.1, 1.0 if d.get("hold", false) else (d.dur - a.t) / 0.15), 0.0, 1.0)
	var q := {}
	for i in c.joints.size():
		var j: String = c.joints[i]
		var r: Array = loco.get(j, [0, 0, 0])
		var qa := Basis.from_euler(Vector3(r[0], r[1], r[2]), EULER_ORDER_XYZ).get_rotation_quaternion()
		var qb: Quaternion = c.q[i0][i].slerp(c.q[i1][i], u)
		q[j] = qa.slerp(qb, w)
	var y := lerpf(F0.y, F1.y, u)
	rig.set_quats(q, loco.hipsY * (1.0 - w) + y * w)


func _finish(dt: float) -> void:
	# Les morts s'affaissent puis s'effacent
	if not alive:
		dead_t += dt
		if not action.is_empty() and action.def.has("clip"):
			# à terre, le corps s'enfonce dans la cendre
			var f: float = clampf((dead_t - action.def.dur - 0.3) / 1.2, 0.0, 1.0)
			rig.position.y = -f * 1.1
		elif dead_t > 1.1:
			var f := minf(1.0, (dead_t - 1.1) / 1.2)
			rig.rotation.x = -f * 1.35
			rig.position.y = -f * 0.2
	rig.rotation.y = 0.0
	rotation.y = yaw

	# La lame des démons rougeoie pendant qu'ils préparent leur coup
	rig.sword.visible = not sheathed
	if kind != "player":
		var target := 0.0
		if alive:
			target = 1.2 if striking() else pow(windup(), 2) * 5.0
		glow += (target - glow) * minf(1.0, dt * 12.0)
		rig.steel.emission_energy_multiplier = 0.15 + glow * 2.0

	if skin:
		skin.sync()


## Déplacement réel, avec la gravité et les collisions.
func physics_move(dt: float) -> void:
	if dt <= 0.0:
		return
	var v := move + push / dt + knock
	knock = knock.lerp(Vector3.ZERO, 1.0 - exp(-10.0 * dt))
	velocity.x = v.x
	velocity.z = v.z
	if is_on_floor():
		velocity.y = -1.0
	else:
		velocity.y -= GRAVITY * dt
	move_and_slide()


## Après le rendu de la pose : la traînée suit la lame.
func update_trail(dt: float) -> void:
	if trail:
		var on: bool = striking() and not action.def.get("kick", false)
		trail.track(rig.blade_base.global_position, rig.blade_tip.global_position, on, dt)


func blade_tip() -> Vector3:
	return rig.blade_tip.global_position


## Le corps a fini de s'effacer : on peut le retirer.
func gone() -> bool:
	if alive:
		return false
	var d: Dictionary = action.get("def", {})
	return dead_t > (d.dur + 1.5 if d.has("clip") else 2.6)


func remove() -> void:
	if trail:
		trail.queue_free()
	queue_free()


# ---------- L'intelligence des damnés ----------

func think(player: Fighter, others: Array, dt: float, token: Dictionary) -> void:
	move = Vector3.ZERO
	if not alive or not player.alive:
		speed *= 0.9
		return
	cd -= dt
	var d := flat_distance(player)

	# Ils montent la garde ; s'ils te voient, ils te traquent, puis rentrent
	var from_home := Vector2(global_position.x - home.x, global_position.z - home.z).length()
	if not aggro and d < 15.0:
		aggro = true
	elif aggro and (d > 32.0 or from_home > 45.0):
		aggro = false
	if not aggro:
		if from_home > 1.5:
			turn_towards(home, 4.0, dt)
			move = forward() * 2.2
			speed = 2.2
		else:
			speed *= 0.85
		return

	# pendant la préparation, il suit encore sa cible ; ensuite il est engagé
	if not action.is_empty():
		if action.def.has("windup") and action.t < action.def.windup * 0.75:
			turn_towards(player.global_position, 4.0, dt)
		if combo and action.name == "slash" and action.t >= action.def.dur - 0.05:
			combo = false
			play("rising")
		speed *= 0.85
		return

	var reach := 2.2 * rig.body_scale
	turn_towards(player.global_position, 5.0, dt)
	var mv := Vector3.ZERO
	var to_p := (player.global_position - global_position) * Vector3(1, 0, 1)
	if d > reach + 0.4:
		mv = to_p.normalized() * (2.4 if kind == "oni" else 2.9)
	else:
		# il tourne autour de sa proie en attendant son tour
		var f := forward()
		mv = Vector3(f.z, 0, -f.x) * side * 1.1
		if d < reach - 0.5:
			mv += f * -1.6
	for o in others:
		if o == self or not o.alive:
			continue
		var away: Vector3 = (global_position - o.global_position) * Vector3(1, 0, 1)
		var dist := away.length()
		if dist < 1.6 and dist > 0.001:
			mv += away.normalized() * (1.6 - dist) * 3.0
	move = mv
	speed = mv.length()

	if cd <= 0.0 and d < reach + 1.2 and token.free:
		token.free = false
		if kind == "oni":
			play("smash" if randf() < 0.45 else "slash")
			combo = randf() < 0.6
		else:
			play("thrust" if d > reach - 0.1 and randf() < 0.6 else "slash")
			if kind == "chef":
				combo = randf() < 0.45
		cd = (1.4 if kind in ["oni", "chef"] else 1.8) + randf() * 1.6
