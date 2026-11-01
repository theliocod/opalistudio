## Le cheval du samouraï : Nagi. N l'appelle d'un sifflement, il accourt au
## galop. E pour monter ou descendre. En selle : Z, Q, S, D le dirigent vers
## où regarde la caméra, Maj maintenu le lance au galop ; clic gauche frappe
## du haut de la selle, et au galop le cheval renverse ceux qu'il charge.
class_name Cavalier
extends Node

const NAME := "Nagi"
const TROT := 4.6
const GALLOP := 11.5

var game
var horse: CharacterBody3D
var body: Quadrupede
var mounted := false
var vel := 0.0
var yaw := 0.0
var called := false
var _turn := 0.0
var _hoof_t := 0.0
var _step_i := 0
var _trampled := {}
var _swing := 0


func _init(g) -> void:
	game = g
	name = "Cavalier"


## Le cheval apparaît là, tourné vers yaw.
func spawn(at: Vector3, y := 0.0) -> void:
	horse = CharacterBody3D.new()
	horse.name = NAME
	horse.collision_layer = 0
	horse.collision_mask = 1 | Landmarks.WALL_LAYER
	horse.floor_snap_length = 0.6
	var cs := CollisionShape3D.new()
	var cap := CapsuleShape3D.new()
	cap.radius = 0.42
	cap.height = 1.9
	cs.shape = cap
	cs.rotation = Vector3(PI / 2, 0, 0)
	cs.position = Vector3(0, 1.05, 0)
	horse.add_child(cs)
	body = Quadrupede.new("cheval")
	horse.add_child(body)
	game.add_child(horse)
	horse.global_position = Vector3(at.x, game.terrain_height(at) + 0.2, at.z)
	yaw = y
	horse.rotation.y = yaw


func forward() -> Vector3:
	return Vector3(sin(yaw), 0, cos(yaw))


func near_player() -> bool:
	return horse != null and not mounted and horse.global_position.distance_to(game.player.global_position) < 2.8


## Le sifflement : s'il est loin, il arrive de derrière, hors de vue, au galop.
func call_horse() -> void:
	if horse == null or mounted:
		return
	var p: Fighter = game.player
	Audio.sfx("sifflet", p.global_position, -2.0, 0.02)
	var d := horse.global_position.distance_to(p.global_position)
	if d > 70.0:
		var back := -Vector3(sin(game.cam_yaw), 0, cos(game.cam_yaw)) * 40.0
		var at := p.global_position + back
		horse.global_position = Vector3(at.x, game.terrain_height(at) + 0.3, at.z)
	if d > 3.5:
		called = true
		get_tree().create_timer(0.8, false).timeout.connect(func(): Audio.sfx("hennissement", horse.global_position, 0.0, 0.05))
	else:
		Audio.sfx("hennissement", horse.global_position, -4.0, 0.05)


func mount() -> void:
	var p: Fighter = game.player
	if horse == null or mounted or not p.alive:
		return
	if game.archery.active:
		game.archery.stow()
	mounted = true
	called = false
	p.mounted = true
	p.action = {}
	p.sneaking = false
	p.collision_layer = 0
	p.collision_mask = 0
	yaw = horse.rotation.y
	Audio.sfx("reception", horse.global_position, -4.0)
	Audio.sfx("hennissement", horse.global_position, -8.0, 0.05)
	game.hud.callout(NAME, Hud.PAPER)


func dismount() -> void:
	var p: Fighter = game.player
	if not mounted:
		return
	mounted = false
	p.mounted = false
	p.collision_layer = 2
	p.collision_mask = 1 | 2 | Landmarks.WALL_LAYER
	var side := Vector3(cos(yaw), 0, -sin(yaw))
	var at := horse.global_position + side * 1.3
	p.global_position = Vector3(at.x, game.terrain_height(at) + 0.2, at.z)
	p.yaw = yaw
	vel = 0.0
	Audio.sfx("reception", p.global_position, -6.0)


func _unhandled_input(ev: InputEvent) -> void:
	if game.state != "play" or game.player == null or not game.player.alive:
		return
	if ev.is_action_pressed("cheval"):
		call_horse()


## Chaque image : en selle, on le dirige ; sinon il accourt ou attend.
func step(dt: float) -> void:
	if horse == null:
		return
	var p: Fighter = game.player
	var target := 0.0
	var want := yaw
	if mounted:
		if not p.alive:
			dismount()
			return
		var f := Vector3(sin(game.cam_yaw), 0, cos(game.cam_yaw))
		var r := Vector3(-f.z, 0, f.x)
		var mv := f * Input.get_axis("arriere", "avant") + r * Input.get_axis("gauche", "droite")
		if game.state != "play" or game.cine.active():
			mv = Vector3.ZERO
		if mv.length_squared() > 0.01:
			want = atan2(mv.x, mv.z)
			target = (GALLOP if Input.is_action_pressed("garde") else TROT) * minf(1.0, mv.length())
		# frapper du haut de la selle
		if game.buffer in ["light", "heavy"] and (p.action.is_empty() or p.action.def.has("combo") and p.action.t >= p.action.def.combo):
			p.sheathed = false
			p.play(["light1", "light2"][_swing % 2] if game.buffer == "light" else "light3")
			_swing += 1
			Audio.sfx("lame", p.global_position, -2.0)
			game.buffer = ""
	elif called:
		var to := (p.global_position - horse.global_position) * Vector3(1, 0, 1)
		var d := to.length()
		if d < 3.2:
			called = false
		else:
			want = atan2(to.x, to.z)
			target = GALLOP if d > 18.0 else maxf(2.0, d * 0.8)
	# il tourne d'autant plus vite qu'il va lentement
	var rate := lerpf(3.2, 1.5, clampf(vel / GALLOP, 0.0, 1.0))
	var dy := angle_difference(yaw, want)
	var step_yaw := clampf(dy, -rate * dt, rate * dt)
	yaw += step_yaw
	_turn = lerpf(_turn, step_yaw / maxf(dt, 0.001) / rate, 1.0 - exp(-dt * 6.0))
	vel = move_toward(vel, target, dt * (5.0 if target > vel else 9.0))
	horse.rotation.y = yaw
	var v := forward() * vel
	horse.velocity.x = v.x
	horse.velocity.z = v.z
	horse.velocity.y = -1.0 if horse.is_on_floor() else horse.velocity.y - 22.0 * dt
	horse.move_and_slide()
	if horse.get_slide_collision_count() > 0 and horse.get_real_velocity().length() < vel * 0.4:
		vel *= 0.5
	# le corps suit la pente
	var g := horse.global_position
	var front := g + forward() * 1.0
	var rear := g - forward() * 1.0
	var slope := atan2(game.terrain_height(front) - game.terrain_height(rear), 2.0)
	body.rotation.x = lerpf(body.rotation.x, -slope, 1.0 - exp(-dt * 6.0))
	body.speed = vel
	body.turn = _turn
	body.step(dt)
	_hooves(dt)
	if mounted:
		_ride(dt)


## Le cavalier en selle, et ceux que le cheval renverse au galop.
func _ride(dt: float) -> void:
	var p: Fighter = game.player
	var seat := horse.global_transform * (body.transform * (body.saddle() + Vector3(0, 0.12 - Rig.HIPS_Y, -0.05)))
	p.global_position = seat
	p.velocity = Vector3.ZERO
	if p.action.is_empty() or not p.action.def.has("dmg"):
		p.yaw = yaw
	p.speed = 0.0
	if vel > 7.0:
		for e in game.enemies:
			if not e.alive or not (e.hostile or e.aggro) or _trampled.get(e, 0.0) > game.time:
				continue
			var to: Vector3 = e.global_position - horse.global_position
			if to.length() < 1.9 and forward().dot(to.normalized()) > 0.3:
				_trampled[e] = game.time + 1.5
				e.hp -= 28.0
				e.knock += forward() * 12.0 + Vector3(0, 2, 0)
				e.play("stagger")
				Blood.spray(game, e.global_position + Vector3(0, 1.2, 0), forward() + Vector3(0, 0.4, 0), 30, 0.8)
				Audio.sfx("coup-pied", e.global_position, 2.0)
				game.shake = 0.3
				game._crime(e)
				game._enemy_dead(e)


## Le bruit des sabots, au rythme de l'allure.
func _hooves(dt: float) -> void:
	if vel < 0.3:
		return
	_hoof_t -= dt
	if _hoof_t <= 0.0:
		var gallop := vel > 7.0
		_hoof_t = (0.11 if gallop else 0.24) * (1.0 if _step_i % 4 != 3 else 2.2)
		_step_i += 1
		Audio.sfx("sabot", horse.global_position, (0.0 if gallop else -6.0) + (2.0 if mounted else 0.0), 0.12)
		if gallop and _step_i % 6 == 0:
			Fx.burst(game, horse.global_position + Vector3(0, 0.1, 0) - forward() * 0.8, 6, Color(0.35, 0.3, 0.25), 1.5, 0.6, -2.0, 0.6, 1.2)


func save() -> Dictionary:
	if horse == null:
		return {}
	var g := horse.global_position
	return {"pos": [g.x, g.y, g.z], "yaw": yaw}


func load_save(d: Dictionary) -> void:
	if horse == null or not d.has("pos"):
		return
	var a: Array = d.pos
	horse.global_position = Vector3(a[0], a[1], a[2])
	yaw = float(d.get("yaw", 0.0))
	horse.rotation.y = yaw
