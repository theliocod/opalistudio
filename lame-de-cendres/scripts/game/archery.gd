## L'arc du samouraï. B le sort ou le range. Clic droit maintenu : on vise
## par-dessus l'épaule, la corde se tend ; clic gauche : on décoche. Sans
## viser, un tir rapide part vers l'ennemi le plus proche devant soi. La
## molette change de flèche (ordinaire ou enflammée). Une flèche retombe avec
## la distance ; à la tête, elle tue ; enflammée, elle met le feu.
class_name Archery
extends Node

const DRAW_TIME := 0.85         # le temps de bander l'arc à fond
const KINDS := ["fleche", "feu"]
const NAMES := {"fleche": "Flèches", "feu": "Flèches enflammées"}

var game
var active := false
var aiming := false
var draw := 0.0
var kind := "fleche"
var quick := {}                 # un tir rapide en cours : {t, target}
var cam_pos := Vector3.ZERO
var _bow: Node3D
var _ui: CanvasLayer
var _cross: Control
var _ammo: Label
var _ring: ColorRect


func _init(g) -> void:
	game = g
	name = "Archery"
	_build_ui()


func toggle() -> void:
	var p: Fighter = game.player
	if active:
		stow()
		return
	if not p.alive or game.cine.active() or game.combat.active_standoff():
		return
	active = true
	aiming = false
	draw = 0.0
	p.sheathed = false
	p.rig.sword.visible = false
	if _bow == null or not is_instance_valid(_bow):
		_bow = game.combat._bow(game.combat._mat(Color(0.32, 0.2, 0.12), 0.6))
		var wl: Node3D = p.rig.joints.elL.get_node_or_null("wrL")
		if wl:
			wl.add_child(_bow)
			_bow.position = Vector3(0, -0.05, 0)
			_bow.rotation = Vector3(PI / 2, 0, 0)
	_bow.visible = true
	Audio.sfx("arc", p.global_position, -8.0)
	game.hud.callout("Arc · %s %d" % [NAMES[kind], ammo()], Hud.PAPER)


func stow() -> void:
	active = false
	aiming = false
	draw = 0.0
	quick = {}
	var p: Fighter = game.player
	if _bow and is_instance_valid(_bow):
		_bow.visible = false
	if p:
		p.rig.sword.visible = true
		if p.is_doing(["bander", "decocher"]):
			p.action = {}


func ammo() -> int:
	return int(game.arsenal.ammo.get(kind, 0))


func _unhandled_input(ev: InputEvent) -> void:
	if game.state != "play" or game.player == null or not game.player.alive:
		return
	if ev.is_action_pressed("arc"):
		toggle()
		return
	if not active:
		return
	if ev is InputEventMouseButton and ev.pressed and ev.button_index in [MOUSE_BUTTON_WHEEL_UP, MOUSE_BUTTON_WHEEL_DOWN]:
		kind = KINDS[(KINDS.find(kind) + 1) % KINDS.size()]
		game.hud.callout("%s · %d" % [NAMES[kind], ammo()], Color(1.0, 0.6, 0.25) if kind == "feu" else Hud.PAPER)
		get_viewport().set_input_as_handled()
	elif ev.is_action_pressed("lourd"):
		aiming = true
		draw = 0.0
		Audio.sfx("arc", game.player.global_position, -10.0)
	elif ev.is_action_released("lourd"):
		aiming = false
		draw = 0.0
		if game.player.is_doing(["bander"]):
			game.player.action = {}
	elif ev.is_action_pressed("rapide"):
		if aiming:
			if draw > 0.2:
				_release_aimed()
		elif quick.is_empty():
			_quick_shot()


## Chaque image : la corde se tend, le corps suit la visée.
func step(dt: float) -> void:
	_ui.visible = active and aiming and game.state == "play"
	if not active:
		return
	var p: Fighter = game.player
	if not p.alive or game.cine.active():
		stow()
		return
	if aiming:
		draw = minf(1.0, draw + dt / DRAW_TIME)
		p.yaw = game.cam_yaw
		if not p.is_doing(["bander", "decocher", "dodge", "roulade", "hit", "stagger"]):
			p.play("bander")
		var k := 1.0 - 0.75 * draw
		_ring.size = Vector2(36, 36) * (0.6 + k)
		_ring.position = -_ring.size / 2.0
		_ring.color = Color(1.0, 0.85, 0.5, 0.25 + 0.6 * draw)
	if not quick.is_empty():
		quick.t += dt
		var t: Fighter = quick.target
		if is_instance_valid(t):
			var to := t.global_position - p.global_position
			p.yaw = atan2(to.x, to.z)
		if quick.t > 0.34:
			var aim: Vector3 = (t.global_position + Vector3(0, 1.3 * t.rig.body_scale, 0)) if is_instance_valid(t) and t.alive else p.global_position + p.forward() * 30.0 + Vector3(0, 1.4, 0)
			_fire(aim, 0.7)
			quick = {}


func _quick_shot() -> void:
	if ammo() <= 0:
		game.hud.callout("Plus de flèches", Hud.MUTED)
		return
	var p: Fighter = game.player
	var f := Vector3(sin(game.cam_yaw), 0, cos(game.cam_yaw))
	var best: Fighter = null
	var bs := 0.0
	for e in game.enemies:
		if not e.alive or not (e.hostile or e.aggro) or e.get_meta("prisoner", false):
			continue
		var to: Vector3 = (e.global_position - p.global_position) * Vector3(1, 0, 1)
		var d := to.length()
		if d > 34.0 or d < 0.5:
			continue
		var score := f.dot(to / d) - d * 0.01
		if f.dot(to / d) > 0.8 and score > bs:
			bs = score
			best = e
	quick = {"t": 0.0, "target": best}
	p.play("bander")


func _release_aimed() -> void:
	if ammo() <= 0:
		game.hud.callout("Plus de flèches", Hud.MUTED)
		return
	# là où regarde la caméra : on cherche le point visé au centre de l'écran
	var cam: Camera3D = game.camera
	var from := cam.global_position
	var dir := -cam.global_transform.basis.z
	var q := PhysicsRayQueryParameters3D.create(from, from + dir * 160.0, 1 | 2)
	q.exclude = [game.player.get_rid()]
	var hit: Dictionary = game.get_world_3d().direct_space_state.intersect_ray(q)
	var aim: Vector3 = hit.position if not hit.is_empty() else from + dir * 160.0
	_fire(aim, draw)
	aiming = Input.is_action_pressed("lourd")
	draw = 0.0


func _fire(aim: Vector3, power: float) -> void:
	var p: Fighter = game.player
	game.arsenal.ammo[kind] = ammo() - 1
	var from := p.global_position + Vector3(0, 1.45, 0) + p.forward() * 0.55
	var speed := lerpf(26.0, 62.0, power)
	var dmg := lerpf(10.0, 26.0, power) * (1.25 if game.arsenal.ammo.get("daikyu", 0) > 0 else 1.0)
	game.combat.shoot(from, aim, p, dmg, kind == "feu", speed, false)
	p.play("decocher")
	Audio.sfx("arc", from, -14.0)
	if kind == "feu":
		game._noise(p.global_position)
	if ammo() <= 0 and kind == "feu":
		kind = "fleche"


## La caméra de visée : par-dessus l'épaule droite, plus serrée.
func camera(real: float) -> bool:
	if not active or not aiming:
		if game.camera.fov < float(Settings.value("affichage", "fov")) - 0.1:
			game.camera.fov = lerpf(game.camera.fov, float(Settings.value("affichage", "fov")), 1.0 - exp(-real * 8.0))
		return false
	var p: Fighter = game.player
	var f := Vector3(sin(game.cam_yaw), 0, cos(game.cam_yaw))
	var right := Vector3(-f.z, 0, f.x)
	var pitch: float = game.cam_pitch - 0.32
	var want := p.global_position + Vector3(0, 1.7, 0) - f * 2.0 - right * 0.75
	cam_pos = want if cam_pos.distance_to(want) > 6.0 else cam_pos.lerp(want, 1.0 - exp(-real * 14.0))
	game.camera.global_position = cam_pos
	var look := p.global_position + Vector3(0, 1.55, 0) + f * 20.0 + Vector3(0, -sin(pitch) * 20.0, 0) - right * 0.75
	game.camera.look_at(look)
	game.camera.fov = lerpf(game.camera.fov, float(Settings.value("affichage", "fov")) - 16.0 * draw - 6.0, 1.0 - exp(-real * 8.0))
	return true


func _build_ui() -> void:
	_ui = CanvasLayer.new()
	_ui.layer = 2
	add_child(_ui)
	_cross = Control.new()
	_cross.set_anchors_preset(Control.PRESET_CENTER)
	_cross.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_ui.add_child(_cross)
	var dot := ColorRect.new()
	dot.size = Vector2(4, 4)
	dot.position = Vector2(-2, -2)
	dot.color = Color(1.0, 0.95, 0.85, 0.95)
	_cross.add_child(dot)
	_ring = ColorRect.new()
	_ring.color = Color(1.0, 0.85, 0.5, 0.3)
	_ring.size = Vector2(40, 40)
	_ring.position = Vector2(-20, -20)
	_ring.rotation = PI / 4
	_ring.pivot_offset = Vector2(20, 20)
	_ring.mouse_filter = Control.MOUSE_FILTER_IGNORE
	_cross.add_child(_ring)
	_cross.move_child(_ring, 0)
	_ui.visible = false
