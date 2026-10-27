## La partie : la vallée, le samouraï, les damnés, et tout ce qui se passe
## entre eux. Les règles du combat sont celles de la version navigateur.
extends Node3D

## Les lieux de la vallée. radius : le replat bâti autour du centre.
var places := [
	{"id": "autel", "name": "Autel des Cendres", "pos": Vector2(-120, 150), "radius": 14.0},
	{"id": "village", "name": "Village de Kurogane", "pos": Vector2(-35, 55), "radius": 30.0},
	{"id": "camp", "name": "Camp des Ronins", "pos": Vector2(85, 105), "radius": 20.0},
	{"id": "croisee", "name": "Croisée des Pendus", "pos": Vector2(120, -20), "radius": 14.0},
	{"id": "sanctuaire", "name": "Sanctuaire noyé", "pos": Vector2(-163, -45), "radius": 10.0},
	{"id": "temple", "name": "Temple de la Lune Rouge", "pos": Vector2(30, -140), "radius": 34.0},
]
var paths := [
	[Vector2(-120, 150), Vector2(-75, 105)], [Vector2(-75, 105), Vector2(-35, 55)],
	[Vector2(-35, 55), Vector2(30, 85)], [Vector2(30, 85), Vector2(85, 105)],
	[Vector2(-35, 55), Vector2(0, -20)], [Vector2(0, -20), Vector2(30, -105)],
	[Vector2(0, -20), Vector2(70, -25)], [Vector2(70, -25), Vector2(120, -20)],
	[Vector2(-35, 55), Vector2(-100, 20)], [Vector2(-100, 20), Vector2(-150, -20)],
]
## Ce que cachent les coffres : un katana parfois, des objets toujours.
const CHEST_LOOT := {
	"village": {"katana": "kurenai", "items": {"sake": 2, "onigiri": 1}},
	"camp": {"items": {"sake": 2, "the": 1, "encens": 1}},
	"croisee": {"katana": "shiranui", "items": {"onigiri": 2}},
	"sanctuaire": {"katana": "yamikaze", "items": {"the": 1, "sake": 1}},
	"temple": {"items": {"sake": 3, "encens": 1}},
}
const SOULS := {"ronin": 1, "chef": 3, "oni": 8}

var terrain: Terrain
var vegetation: Vegetation
var landmarks: Landmarks
var hud: Hud
var arsenal := Arsenal.new()
var player: Fighter
var enemies: Array = []
var pickups: Array = []        # {node, pos, items, katana}
var camera: Camera3D
var aura: CPUParticles3D

var state := "title"           # title | play | menu | dead | win
var cam_yaw := PI
var cam_pitch := 0.32
var stamina := 100.0
var stamina_wait := 0.0
var block_press_t := 99.0
var combo_step := 0
var last_light := -9.0
var buffer := ""
var buffer_t := 0.0
var hitstop := 0.0
var slowmo := 0.0
var shake := 0.0
var time := 0.0
var token := {"free": true}
var discovered := {}
var respawn := Vector3.ZERO
var burning := {}              # ennemi → temps de brûlure restant
var oni_dead := false
var calm := 0.0                # temps passé sans danger : on rengaine
var _cam_pos := Vector3.ZERO
var _cam_look := Vector3.ZERO


func _ready() -> void:
	_inputs()
	add_child(Atmosphere.new())
	terrain = Terrain.new()
	add_child(terrain)
	terrain.build(places, paths)
	_add_lake()
	landmarks = Landmarks.new()
	add_child(landmarks)
	landmarks.build(terrain, places)
	vegetation = Vegetation.new()
	add_child(vegetation)
	vegetation.build(terrain, places)

	camera = Camera3D.new()
	camera.fov = 58.0
	camera.far = 900.0
	add_child(camera)
	# une lueur discrète qui suit le regard : le samouraï reste lisible la nuit
	var fill := OmniLight3D.new()
	fill.light_color = Color(0.75, 0.8, 1.0)
	fill.light_energy = 0.7
	fill.omni_range = 9.0
	fill.light_volumetric_fog_energy = 0.0
	fill.shadow_enabled = false
	fill.light_cull_mask = 2
	camera.add_child(fill)
	fill.position = Vector3(0.6, 0.4, -1.0)
	camera.make_current()
	hud = Hud.new()
	add_child(hud)
	hud.on_use = _use_item
	hud.on_equip = _equip
	hud.show_title(_start)


func _add_lake() -> void:
	var plane := PlaneMesh.new()
	plane.size = Vector2(terrain.lake_radius * 2.6, terrain.lake_radius * 2.6)
	var mat := ShaderMaterial.new()
	mat.shader = load("res://scripts/world/water.gdshader")
	plane.material = mat
	var mi := MeshInstance3D.new()
	mi.mesh = plane
	mi.position = Vector3(terrain.lake_center.x, Terrain.WATER_LEVEL, terrain.lake_center.y)
	add_child(mi)


## Les touches, par leur position physique : ZQSD sur un clavier français,
## WASD sur un clavier anglais, sans rien régler.
func _inputs() -> void:
	var keys := {
		"avant": [KEY_W, KEY_UP], "arriere": [KEY_S, KEY_DOWN], "gauche": [KEY_A, KEY_LEFT], "droite": [KEY_D, KEY_RIGHT],
		"rapide": [KEY_J], "lourd": [KEY_K], "pied": [KEY_F], "tournoyant": [KEY_G], "esquive": [KEY_SPACE], "garde": [KEY_SHIFT, KEY_L],
		"action": [KEY_E], "tech1": [KEY_R], "tech2": [KEY_T], "inventaire": [KEY_TAB, KEY_I],
		"objet1": [KEY_1], "objet2": [KEY_2], "objet3": [KEY_3], "objet4": [KEY_4],
	}
	for a in keys:
		if InputMap.has_action(a):
			continue
		InputMap.add_action(a)
		for k in keys[a]:
			var ev := InputEventKey.new()
			ev.physical_keycode = k
			InputMap.action_add_event(a, ev)
	for pair in [["rapide", MOUSE_BUTTON_LEFT], ["lourd", MOUSE_BUTTON_RIGHT], ["pied", MOUSE_BUTTON_MIDDLE]]:
		var mb := InputEventMouseButton.new()
		mb.button_index = pair[1]
		InputMap.action_add_event(pair[0], mb)


# ---------- Le déroulé ----------

func _start() -> void:
	hud.hide_screen()
	var s: Dictionary = landmarks.shrines[0]
	respawn = s.pos
	player = Fighter.new("player")
	add_child(player)
	player.global_position = respawn + Vector3(0, 0.3, 0)
	player.yaw = PI
	player.sheathed = true
	for sp in landmarks.spawns:
		var e := Fighter.new(sp.kind)
		add_child(e)
		e.global_position = sp.pos + Vector3(0, 0.5, 0)
		e.home = sp.pos
		e.place = sp.place
		e.yaw = randf() * TAU
		e.cd = 1.0 + randf() * 2.0
		enemies.append(e)
	_make_aura()
	_equip("ronin")
	_cam_pos = player.global_position + Vector3(0, 3, 6)
	state = "play"
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	_discover(places[0])
	hud.set_arsenal(arsenal)


func _respawn() -> void:
	hud.hide_screen()
	player.alive = true
	player.hp = player.max_hp
	player.action = {}
	player.rig.rotation = Vector3.ZERO
	player.rig.position = Vector3.ZERO
	player.dead_t = 0.0
	player.global_position = respawn + Vector3(0, 0.3, 0)
	player.velocity = Vector3.ZERO
	stamina = 100.0
	for e in enemies:
		e.aggro = false
		if e.alive:
			e.global_position = e.home + Vector3(0, 0.5, 0)
			e.hp = e.max_hp
			e.posture = 0.0
	state = "play"
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	hud.banner(landmarks.shrines[0].name, "Tu te relèves. Les damnés ont repris leur poste.")


func _discover(p: Dictionary) -> void:
	if discovered.has(p.id):
		return
	discovered[p.id] = true
	hud.banner(p.name, "Lieu découvert")


# ---------- Les entrées ----------

func _unhandled_input(ev: InputEvent) -> void:
	if ev is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
		cam_yaw -= ev.relative.x * 0.0024
		cam_pitch = clampf(cam_pitch + ev.relative.y * 0.0018, 0.05, 0.9)
	if state == "play" and ev is InputEventMouseButton and ev.pressed and Input.mouse_mode != Input.MOUSE_MODE_CAPTURED:
		Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
		get_viewport().set_input_as_handled()
		return
	if ev.is_action_pressed("ui_cancel") and state == "play":
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	if ev.is_action_pressed("inventaire") and state in ["play", "menu"]:
		if state == "play":
			state = "menu"
			Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
			hud.show_inventory(arsenal)
		else:
			state = "play"
			hud.hide_inventory()
			Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	if state != "play" or not player.alive:
		return
	if ev.is_action_pressed("rapide"):
		_buffer("light", 0.3)
	elif ev.is_action_pressed("lourd"):
		_buffer("heavy", 0.3)
	elif ev.is_action_pressed("pied"):
		_buffer("frontkick", 0.3)
	elif ev.is_action_pressed("tournoyant"):
		_buffer("kick", 0.3)
	elif ev.is_action_pressed("esquive"):
		_buffer("dodge", 0.2)
	elif ev.is_action_pressed("tech1"):
		_buffer("tourbillon", 0.3)
	elif ev.is_action_pressed("tech2"):
		_buffer("iai", 0.3)
	elif ev.is_action_pressed("garde"):
		block_press_t = 0.0
		_buffer("parry", 0.12)
	elif ev.is_action_pressed("action"):
		_interact()
	for i in 4:
		if ev.is_action_pressed("objet%d" % (i + 1)):
			for id in Arsenal.ITEMS:
				if Arsenal.ITEMS[id].key == i + 1:
					_use_item(id)


func _buffer(what: String, t: float) -> void:
	buffer = what
	buffer_t = t


# ---------- La boucle ----------

func _physics_process(dt: float) -> void:
	if state != "play" or player == null:
		return
	time += dt
	arsenal.tick(dt)
	_control(dt)
	token.free = true
	for e in enemies:
		if e.alive and e.aggro and not e.action.is_empty() and e.action.def.has("windup"):
			token.free = false
	for e in enemies:
		if not e.is_doing(["executed"]):
			e.think(player, enemies, dt, token)
	player.step(dt, time)
	player.physics_move(dt)
	for e in enemies:
		if player.global_position.distance_to(e.global_position) < 90.0 or e.aggro:
			e.step(dt, time)
			e.physics_move(dt)
		elif e.alive and not e.action.is_empty():
			# trop loin pour être simulé : il ne reste pas figé au milieu d'un coup
			e.action = {}

	# les coups qui partent cherchent leur cible
	if player.striking():
		for e in enemies:
			_strike(player, player.action.def, e)
		if player.action.def.get("kick", false):
			_kick_doors()
	for e in enemies:
		if e.striking():
			_strike(e, e.action.def, player)
	player.update_trail(dt)
	for e in enemies:
		e.update_trail(dt)

	_burns(dt)
	_cleanup()
	_pickups()
	_world_events()


func _process(delta: float) -> void:
	var real := delta / maxf(Engine.time_scale, 0.001)
	# l'arrêt sur impact et le ralenti donnent leur poids aux coups
	if hitstop > 0.0:
		hitstop -= real
		Engine.time_scale = 0.05
	elif slowmo > 0.0:
		slowmo -= real
		Engine.time_scale = 0.3
	else:
		Engine.time_scale = 1.0
	shake = maxf(0.0, shake - real * 1.6)
	hud.tick(real)
	if player == null:
		_title_camera(real)
		return
	_camera(real)
	vegetation.follow(player.global_position)
	if state in ["play", "menu"]:
		hud.set_bars(player.hp, player.max_hp, stamina, real)
		var boss := _boss()
		hud.set_boss("L'Oni de la Lune Rouge", boss.hp / boss.max_hp if boss and boss.aggro and boss.alive else -1.0)
		var marks := []
		for p in places:
			if discovered.has(p.id):
				marks.append({"name": p.name, "pos": Vector3(p.pos.x, 0, p.pos.y), "danger": p.id == "temple" and not oni_dead})
		hud.set_compass(cam_yaw, player.global_position, marks)


func _boss() -> Fighter:
	for e in enemies:
		if e.kind == "oni":
			return e
	return null


# ---------- Le joueur ----------

func _control(dt: float) -> void:
	block_press_t += dt
	buffer_t -= dt
	if buffer_t <= 0.0:
		buffer = ""
	if not player.alive:
		player.move = Vector3.ZERO
		player.speed = 0.0
		return
	var f := Vector3(sin(cam_yaw), 0, cos(cam_yaw))
	var r := Vector3(-f.z, 0, f.x)
	var mv := f * Input.get_axis("arriere", "avant") + r * Input.get_axis("gauche", "droite")
	if mv.length_squared() > 1.0:
		mv = mv.normalized()

	var a := player.action
	var busy: bool = not a.is_empty() and a.name in ["hit", "stagger", "die", "finisher"]
	var free: bool = a.is_empty() or (a.def.has("combo") and a.t >= a.def.combo) or (a.name == "parry" and a.t > 0.2)
	var recovering: bool = not a.is_empty() and a.def.has("active") and a.t > a.def.active[1]

	# l'épée est au fourreau : on dégaine d'abord, le coup demandé suivra
	var wants_blade := buffer in ["light", "heavy", "tourbillon", "iai", "parry"] or Input.is_action_pressed("garde")
	if player.sheathed and wants_blade and not busy and free and not player.is_doing(["degainer"]):
		player.play("degainer")
		if buffer != "parry":
			buffer_t = maxf(buffer_t, 1.2)
	elif not busy and buffer == "dodge" and (free or recovering) and not _wall_ahead(mv).is_empty():
		var w: Dictionary = _wall_ahead(mv)
		player.yaw = atan2(w.dir.x, w.dir.y)
		player.play("saut")
		player.collision_mask = 1 | 2
		buffer = ""
	elif not busy and buffer == "dodge" and stamina > 0.0 and (free or recovering) and not player.is_doing(["dodge"]):
		var dir := mv if mv.length_squared() > 0.01 else -player.forward()
		player.yaw = atan2(dir.x, dir.z)
		player.play("dodge")
		_spend(22.0)
	elif not busy and free and buffer in ["tourbillon", "iai"] and arsenal.knows(buffer) and stamina > 0.0:
		_face_nearest(6.0, mv)
		player.play(buffer)
		_spend(Arsenal.TECHNIQUES[buffer].cost)
		combo_step = 0
	elif not busy and free and buffer in ["kick", "frontkick"] and stamina > 0.0:
		_face_nearest(5.5, mv)
		player.play(buffer)
		_spend(Fighter.ACTIONS[buffer].cost)
		combo_step = 0
	elif not busy and free and player.sheathed and buffer != "":
		pass
	elif not busy and free and buffer in ["light", "heavy"] and stamina > 0.0:
		var name := "heavy"
		if buffer == "light":
			if time - last_light > 0.8:
				combo_step = 0
			name = ["light1", "light2", "light3"][combo_step]
			combo_step = (combo_step + 1) % 3
			last_light = time
		else:
			combo_step = 0
		_face_nearest(5.5, mv)
		player.play(name)
		_spend(Fighter.ACTIONS[name].cost)
	elif not busy and buffer == "parry" and (a.is_empty() or free):
		_face_nearest(6.0, Vector3.ZERO)
		player.play("parry")
		buffer = ""

	if not player.is_doing(["saut"]):
		player.collision_mask = 1 | 2 | Landmarks.WALL_LAYER
	player.blocking = Input.is_action_pressed("garde") and player.action.is_empty() and stamina > 0.0 and not player.sheathed
	_sheath_logic(dt)
	if player.action.is_empty():
		var spd := 1.8 if player.blocking else 5.4
		player.move = mv * spd
		player.speed = mv.length() * spd
		if player.blocking:
			var near := _nearest(8.0)
			if near:
				player.turn_towards(near.global_position, 10.0, dt)
		elif mv.length_squared() > 0.01:
			player.yaw += angle_difference(player.yaw, atan2(mv.x, mv.z)) * minf(1.0, dt * 12.0)
	else:
		player.move = Vector3.ZERO
		player.speed *= 0.85
		if player.is_doing(["dodge"]):
			player.move = player.forward() * (10.0 if player.action.t < 0.3 else 3.0)

	stamina_wait -= dt
	if stamina_wait <= 0.0:
		var regen := (10.0 if player.blocking else 30.0) * (2.0 if arsenal.buffs.has("the") else 1.0)
		stamina = minf(100.0, stamina + regen * dt)


## Un ennemi te repère : on dégaine. Plus rien autour depuis un moment : on rengaine.
func _sheath_logic(dt: float) -> void:
	var danger := false
	for e in enemies:
		if e.alive and e.aggro and e.flat_distance(player) < 25.0:
			danger = true
	if danger:
		calm = 0.0
		if player.sheathed and player.action.is_empty():
			player.play("degainer")
	elif player.action.is_empty():
		calm += dt
		if calm > 8.0 and not player.sheathed:
			player.play("rengainer")
			calm = 0.0


## Un muret juste devant, que l'on peut enjamber : la direction pour le franchir.
func _wall_ahead(mv: Vector3) -> Dictionary:
	var p := Vector2(player.global_position.x, player.global_position.z)
	var look := Vector2(mv.x, mv.z) if mv.length_squared() > 0.01 else Vector2(player.forward().x, player.forward().z)
	look = look.normalized()
	for w in landmarks.walls:
		var a: Vector2 = w[0]
		var b: Vector2 = w[1]
		var ab := b - a
		var t := clampf((p - a).dot(ab) / ab.length_squared(), 0.0, 1.0)
		var q := a + ab * t
		var to := q - p
		var d := to.length()
		if d < 0.3 or d > 2.3 or to.normalized().dot(look) < 0.6:
			continue
		var n := Vector2(-ab.y, ab.x).normalized()
		if n.dot(to) < 0.0:
			n = -n
		return {"dir": n, "dist": d}
	return {}


func _spend(n: float) -> void:
	stamina -= n
	stamina_wait = 0.6
	buffer = ""


func _nearest(max_d: float) -> Fighter:
	var best: Fighter = null
	var bd := max_d
	for e in enemies:
		if not e.alive:
			continue
		var d: float = e.flat_distance(player)
		if d < bd:
			bd = d
			best = e
	return best


## On se tourne vers l'ennemi le plus proche avant de frapper.
func _face_nearest(max_d: float, mv: Vector3) -> void:
	var near := _nearest(max_d)
	if near:
		var d := near.global_position - player.global_position
		player.yaw = atan2(d.x, d.z)
	elif mv.length_squared() > 0.01:
		player.yaw = atan2(mv.x, mv.z)


# ---------- Les coups ----------

func _invulnerable() -> bool:
	var a := player.action
	if a.is_empty():
		return false
	if a.name == "dodge" and a.t > 0.03 and a.t < 0.34:
		return true
	if a.def.has("iframes") and a.t >= a.def.iframes[0] and a.t <= a.def.iframes[1]:
		return true
	return a.name == "finisher"


func _strike(att: Fighter, def: Dictionary, target: Fighter) -> void:
	if not target.alive or att.action.hits.has(target):
		return
	# le coup de grâce ne touche que celui qu'on achève
	if def.get("finisher", false) and not target.is_doing(["executed"]):
		return
	var chest := target.global_position + Vector3(0, 1.3 * target.rig.body_scale, 0)
	if def.get("kick", false):
		# le coup de pied touche quand le pied rencontre vraiment le corps
		var hit := false
		for foot in att.rig.feet:
			var fp: Vector3 = foot.global_position
			var dy := fp.y - target.global_position.y
			if Vector2(fp.x - chest.x, fp.z - chest.z).length() < 0.95 * target.rig.body_scale and dy > 0.3 and dy < 2.0 * target.rig.body_scale:
				hit = true
		if not hit:
			return
	else:
		var reach: float = def.get("reach", 2.5) * att.rig.body_scale + (target.rig.body_scale - 1.0) * 0.6
		if att.flat_distance(target) > reach or att.angle_to(target.global_position) > def.get("arc", 1.3):
			return
	att.action.hits[target] = true

	if target == player:
		_hit_player(att, def, chest)
	else:
		_hit_enemy(def, target, chest)


func _hit_player(att: Fighter, def: Dictionary, chest: Vector3) -> void:
	if _invulnerable():
		hud.callout("Esquive", Hud.MUTED)
		return
	var facing := player.angle_to(att.global_position) < 1.4
	var window := 0.3 if arsenal.knows("garde") else 0.22
	# la parade : la garde levée juste avant l'impact
	if facing and block_press_t < window:
		att.play("stagger")
		att.posture = 0.0
		Fx.burst(self, chest.lerp(att.global_position + Vector3(0, 1.4, 0), 0.5), 70, Color(1.0, 0.82, 0.48), 9.0, 3.0, 14.0, 0.45, 5.0)
		hitstop = 0.11
		slowmo = 0.45
		shake = 0.35
		stamina = minf(100.0, stamina + 20.0)
		if arsenal.knows("garde"):
			player.hp = minf(player.max_hp, player.hp + 5.0)
		hud.callout("Parade", Hud.GOLD)
		return
	var dmg: float = def.dmg * (1.4 if att.kind == "oni" else 1.0) * (0.6 if arsenal.buffs.has("encens") else 1.0)
	if facing and player.blocking and stamina > 0.0:
		stamina -= 45.0 if def.get("heavy", false) else 22.0
		stamina_wait = 0.8
		Fx.burst(self, chest, 30, Color(1.0, 0.75, 0.44), 6.0, 2.0)
		player.knock += att.forward() * 4.0
		shake = 0.15
		hitstop = 0.05
		if stamina <= 0.0:
			stamina = 0.0
			player.blocking = false
			player.play("stagger")
			hud.callout("Garde brisée", Color(1.0, 0.3, 0.23))
		else:
			player.hp -= dmg * 0.1
	else:
		player.hp -= dmg
		player.play("hit")
		Fx.burst(self, chest, 40, Color(0.6, 0.04, 0.07), 5.0, 2.0, 10.0, 0.7, 2.2)
		shake = 0.4
		hitstop = 0.07
	if player.hp <= 0.0:
		_kill(player)


func _hit_enemy(def: Dictionary, target: Fighter, chest: Vector3) -> void:
	var k := arsenal.katana()
	var staggered := target.is_doing(["stagger", "executed"])
	if def.get("finisher", false):
		# le coup de grâce : les ronins tombent, l'Oni perd un tiers de sa vie
		var dmg := target.max_hp if target.kind != "oni" else target.max_hp * 0.3
		target.hp -= dmg
		Fx.burst(self, chest, 140, Color(0.6, 0.04, 0.07), 9.0, 3.0, 10.0, 1.0, 2.6)
		Fx.burst(self, chest, 40, Color(1.0, 0.85, 0.6), 10.0, 2.0, 14.0, 0.3, 5.0)
		hitstop = 0.14
		slowmo = 0.8
		shake = 0.5
		hud.callout("Coup de grâce", Color(1.0, 0.3, 0.23))
		if arsenal.knows("lune"):
			stamina = 100.0
			player.hp = minf(player.max_hp, player.hp + player.max_hp * 0.5)
		if target.hp <= 0.0:
			_kill(target)
		else:
			target.play("stagger")
		return

	if def.get("kick", false):
		target.hp -= def.dmg
		target.posture += def.posture
		var away := (target.global_position - player.global_position) * Vector3(1, 0, 1)
		target.knock += away.normalized() * def.get("push", 16.0) / target.rig.body_scale
		Fx.burst(self, chest, 26, Color(1.0, 0.88, 0.7), 6.0, 2.0, 14.0, 0.3, 3.0)
		hitstop = 0.08
		shake = 0.25
		if target.hp <= 0.0:
			_kill(target)
			return
		if target.posture >= target.max_posture:
			target.posture = 0.0
			target.play("stagger")
			hud.callout("Posture brisée", Hud.GOLD)
		elif not target.striking():
			target.play("hit")
		return

	var riposte := staggered
	var mult: float = (3.5 if k.effect == "void" else 2.6) if riposte else 1.0
	var dmg: float = def.dmg * k.dmg * mult
	target.hp -= dmg
	target.posture += def.get("posture", def.dmg) * k.posture
	var aura: Color = k.aura if k.aura != null else Color(1.0, 0.88, 0.7)
	Fx.burst(self, chest, 90 if riposte else 34, Color(0.6, 0.04, 0.07), 8.0 if riposte else 5.0, 2.0, 10.0, 0.8, 2.4)
	Fx.burst(self, chest, 16, aura, 7.0, 1.0, 14.0, 0.25, 4.0)
	hitstop = 0.1 if def.get("heavy", false) or riposte else 0.055
	shake = 0.3 if def.get("heavy", false) or riposte else 0.12
	if riposte:
		hud.callout("Riposte", Color(1.0, 0.3, 0.23))
		slowmo = 0.35
	# les pouvoirs des lames
	if k.effect in ["burn", "moon"]:
		burning[target] = 3.0
	if k.effect in ["drain", "moon"]:
		player.hp = minf(player.max_hp, player.hp + dmg * 0.12)
	if k.effect == "chain" and randf() < 0.3:
		for o in enemies:
			if o != target and o.alive and o.global_position.distance_to(target.global_position) < 5.0:
				o.hp -= dmg * 0.5
				o.posture += 20.0
				Fx.burst(self, o.global_position + Vector3(0, 1.3, 0), 30, Color(0.85, 0.9, 1.0), 9.0, 1.0, 6.0, 0.3, 5.0)
				if o.hp <= 0.0:
					_kill(o)
				break
	if target.hp <= 0.0:
		_kill(target)
		return
	var super_armor := target.striking()
	if target.posture >= target.max_posture:
		target.posture = 0.0
		target.play("stagger")
		hud.callout("Posture brisée", Hud.GOLD)
	elif not riposte and not super_armor and (target.kind != "oni" or def.get("heavy", false)):
		target.play("hit")


## Un pied qui rencontre une porte fermée la fait voler en éclats.
func _kick_doors() -> void:
	for d in landmarks.doors:
		if d.open:
			continue
		for foot in player.rig.feet:
			if foot.global_position.distance_to(d.pos + Vector3(0, 0.6, 0)) < 1.1:
				landmarks.break_door(d, player.forward())
				Fx.burst(self, d.pos + Vector3(0, 1.0, 0), 50, Color(0.55, 0.35, 0.2), 6.0, 2.0, 12.0, 0.7, 1.4, 0.1)
				shake = 0.3
				hitstop = 0.06
				break


func _burns(dt: float) -> void:
	for e in burning.keys():
		if not is_instance_valid(e) or not e.alive:
			burning.erase(e)
			continue
		burning[e] -= dt
		e.hp -= 5.0 * dt
		if randf() < dt * 14.0:
			Fx.burst(self, e.global_position + Vector3(randf_range(-0.3, 0.3), randf_range(0.4, 1.7), randf_range(-0.3, 0.3)), 3, Color(1.0, 0.4, 0.1), 1.0, 2.5, 0.0, 0.5, 3.0)
		if e.hp <= 0.0:
			_kill(e)
		if burning.has(e) and burning[e] <= 0.0:
			burning.erase(e)


func _kill(f: Fighter) -> void:
	if not f.alive:
		return
	f.alive = false
	f.hp = 0.0
	if f == player:
		f.play("die")
		slowmo = 1.2
		shake = 0.4
		state = "dead"
		get_tree().create_timer(1.6, true, false, true).timeout.connect(func():
			Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
			hud.show_death(_respawn))
		return
	f.play("dying")
	Fx.burst(self, f.global_position + Vector3(0, 1.2, 0), 120, Color(1.0, 0.35, 0.1), 3.0, 2.5, -1.5, 1.8, 2.5)
	# les âmes, et peut-être une technique
	var fresh := arsenal.add_souls(SOULS.get(f.kind, 1))
	for id in fresh:
		var t: Dictionary = Arsenal.TECHNIQUES[id]
		hud.banner("Technique apprise", "%s%s — %s" % [t.name, " [%s]" % t.key if t.key != "" else "", t.desc])
	# le butin
	var drop := Arsenal.roll_loot(f.kind != "ronin")
	var katana := ""
	if f.kind == "chef":
		katana = "raijin"
	if f.kind == "oni":
		katana = "tsukuyomi"
		oni_dead = true
		hud.banner("L'Oni de la Lune Rouge est tombé", "La lune pâlit.")
		get_tree().create_timer(4.0, true, false, true).timeout.connect(func():
			state = "win"
			Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
			hud.show_victory(func(): hud.hide_screen(); state = "play"; Input.mouse_mode = Input.MOUSE_MODE_CAPTURED))
	if not drop.is_empty() or katana != "":
		_drop(f.global_position, drop, katana)
	hud.set_arsenal(arsenal)


func _cleanup() -> void:
	for e in enemies.duplicate():
		if e.gone():
			Fx.burst(self, e.global_position + Vector3(0, 0.4, 0), 50, Color(1.0, 0.42, 0.16), 2.0, 2.0, -2.0, 1.4, 2.0)
			enemies.erase(e)
			burning.erase(e)
			e.remove()


# ---------- Le butin, les coffres, les autels ----------

func _drop(at: Vector3, items: Dictionary, katana: String) -> void:
	var orb := MeshInstance3D.new()
	var s := SphereMesh.new()
	s.radius = 0.16 if katana == "" else 0.24
	s.height = s.radius * 2
	orb.mesh = s
	var m := StandardMaterial3D.new()
	m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	var c: Color = Hud.GOLD
	if katana != "":
		c = Arsenal.KATANAS[katana].aura
	m.albedo_color = c
	m.emission_enabled = true
	m.emission = c
	m.emission_energy_multiplier = 5.0
	orb.material_override = m
	add_child(orb)
	var ground := terrain.height_at(at.x, at.z)
	orb.global_position = Vector3(at.x, ground + 0.8, at.z)
	var light := OmniLight3D.new()
	light.light_color = c
	light.light_energy = 1.2
	light.omni_range = 4.0
	orb.add_child(light)
	pickups.append({"node": orb, "pos": orb.global_position, "items": items, "katana": katana})


func _pickups() -> void:
	for p in pickups.duplicate():
		var n: Node3D = p.node
		n.position.y = p.pos.y + sin(time * 2.5) * 0.12
		if n.global_position.distance_to(player.global_position + Vector3(0, 0.8, 0)) < 1.6:
			_gain(p.items, p.katana)
			n.queue_free()
			pickups.erase(p)


func _gain(items: Dictionary, katana: String) -> void:
	for id in items:
		arsenal.add_item(id, items[id])
		hud.toast("+%d %s" % [items[id], Arsenal.ITEMS[id].name], Arsenal.ITEMS[id].color)
	if katana != "" and arsenal.add_katana(katana):
		var k: Dictionary = Arsenal.KATANAS[katana]
		hud.banner(k.name, k.desc + "\nTab pour l'équiper.")
		hud.toast("Nouveau katana : " + k.name, k.aura)
	hud.set_arsenal(arsenal)


func _interact() -> void:
	var target := _interactable()
	if target.is_empty():
		return
	match target.kind:
		"finisher":
			var e: Fighter = target.enemy
			var d := e.global_position - player.global_position
			player.yaw = atan2(d.x, d.z)
			e.yaw = player.yaw + PI
			player.sheathed = false
			player.play("finisher")
			e.play("executed")
		"door":
			var d: Dictionary = target.door
			var to: Vector3 = d.pos - player.global_position
			player.yaw = atan2(to.x, to.z)
			player.play("frontkick")
			_spend(0.0)
		"chest":
			var c: Dictionary = target.chest
			c.open = true
			var tw := create_tween()
			tw.tween_property(c.lid, "rotation:x", -1.9, 0.6).set_trans(Tween.TRANS_BACK)
			c.glow.queue_free()
			var loot: Dictionary = CHEST_LOOT.get(c.place, {"items": {"sake": 1}})
			_gain(loot.get("items", {}), loot.get("katana", ""))
			Fx.burst(self, c.pos + Vector3(0, 0.9, 0), 50, Hud.GOLD, 3.0, 3.0, 2.0, 1.0, 3.0)
		"shrine":
			player.hp = player.max_hp
			stamina = 100.0
			respawn = target.shrine.pos
			hud.toast("Tu te recueilles. Vie rendue, autel retenu.", Hud.GOLD)
			Fx.burst(self, target.shrine.pos + Vector3(0, 1.2, 0), 60, Color(1.0, 0.7, 0.4), 2.0, 3.0, -1.0, 1.4, 2.5)


## Ce qui est à portée de la touche E, le plus important d'abord.
func _interactable() -> Dictionary:
	if player.action.is_empty() or player.action.def.has("combo"):
		for e in enemies:
			if e.alive and e.is_doing(["stagger"]) and e.flat_distance(player) < 2.8:
				return {"kind": "finisher", "enemy": e, "text": "E · Coup de grâce"}
	for d in landmarks.doors:
		if not d.open and player.global_position.distance_to(d.pos) < 2.4:
			return {"kind": "door", "door": d, "text": "E · Enfoncer la porte"}
	for c in landmarks.chests:
		if not c.open and player.global_position.distance_to(c.pos) < 2.4:
			return {"kind": "chest", "chest": c, "text": "E · Ouvrir le coffre"}
	for s in landmarks.shrines:
		if player.global_position.distance_to(s.pos) < 3.0:
			return {"kind": "shrine", "shrine": s, "text": "E · Se recueillir à l'autel"}
	return {}


func _use_item(id: String) -> void:
	if arsenal.items.get(id, 0) <= 0 or not player.alive:
		return
	var it: Dictionary = Arsenal.ITEMS[id]
	arsenal.items[id] -= 1
	if it.has("heal"):
		player.hp = minf(player.max_hp, player.hp + it.heal)
	if it.get("stamina", false):
		stamina = 100.0
	if it.has("buff"):
		arsenal.buffs[it.buff] = it.duration
	hud.toast(it.name, it.color)
	Fx.burst(self, player.global_position + Vector3(0, 1.0, 0), 24, it.color, 1.5, 2.5, -1.0, 0.9, 2.0)
	hud.set_arsenal(arsenal)


# ---------- Les katanas ----------

func _make_aura() -> void:
	aura = CPUParticles3D.new()
	aura.amount = 36
	aura.lifetime = 0.4
	aura.local_coords = false
	var q := QuadMesh.new()
	q.size = Vector2(0.05, 0.05)
	var m := StandardMaterial3D.new()
	m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	m.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	m.vertex_color_use_as_albedo = true
	q.material = m
	aura.mesh = q
	aura.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	aura.emission_box_extents = Vector3(0.01, 0.02, 0.42)
	aura.position = Vector3(0, 0.02, 0.6)
	aura.direction = Vector3.UP
	aura.spread = 25.0
	aura.gravity = Vector3(0, 0.8, 0)
	aura.initial_velocity_min = 0.05
	aura.initial_velocity_max = 0.25
	var sc := Curve.new(); sc.add_point(Vector2(0, 1)); sc.add_point(Vector2(1, 0))
	aura.scale_amount_curve = sc
	player.rig.sword.add_child(aura)


func _equip(id: String) -> void:
	if not id in arsenal.katanas:
		return
	arsenal.equipped = id
	var k: Dictionary = Arsenal.KATANAS[id]
	var steel := player.rig.steel
	if k.aura != null:
		var c: Color = k.aura
		steel.emission = c
		steel.emission_energy_multiplier = 1.6
		aura.emitting = true
		var g := Gradient.new()
		g.set_color(0, Color(c.r * 2.0, c.g * 2.0, c.b * 2.0, 0.9))
		g.set_color(1, Color(c.r, c.g, c.b, 0.0))
		aura.color_ramp = g
	else:
		steel.emission = Color(0.62, 0.84, 1.0)
		steel.emission_energy_multiplier = 0.08
		aura.emitting = false
	player.trail.set_color(k.trail)
	hud.set_arsenal(arsenal)


# ---------- Le monde autour ----------

func _world_events() -> void:
	for p in places:
		if Vector2(player.global_position.x, player.global_position.z).distance_to(p.pos) < p.radius:
			_discover(p)
	var it := _interactable()
	if it.is_empty() and player.action.is_empty():
		var mv := Vector3(sin(cam_yaw), 0, cos(cam_yaw)) * Input.get_axis("arriere", "avant") + Vector3(-cos(cam_yaw), 0, sin(cam_yaw)) * Input.get_axis("gauche", "droite")
		if not _wall_ahead(mv).is_empty():
			it = {"text": "Espace · Enjamber le muret"}
	hud.prompt(it.get("text", ""))
	# on ne tombe pas hors du monde
	if player.global_position.y < terrain.height_at(player.global_position.x, player.global_position.z) - 3.0:
		player.global_position.y = terrain.height_at(player.global_position.x, player.global_position.z) + 1.0
	var lim := Terrain.SIZE / 2 - 20.0
	player.global_position.x = clampf(player.global_position.x, -lim, lim)
	player.global_position.z = clampf(player.global_position.z, -lim, lim)


# ---------- La caméra ----------

func _camera(real: float) -> void:
	var dist := 5.4
	var f := Vector3(sin(cam_yaw), 0, cos(cam_yaw))
	var target := player.global_position + Vector3(0, 1.4, 0)
	var want := player.global_position - f * dist * cos(cam_pitch) + Vector3(0, 1.5 + dist * sin(cam_pitch), 0)
	# la caméra ne traverse ni le sol ni les murs
	var space := get_world_3d().direct_space_state
	var q := PhysicsRayQueryParameters3D.create(target, want, 1)
	var hit := space.intersect_ray(q)
	if hit:
		want = target.lerp(hit.position, 0.88)
	var ground := terrain.height_at(want.x, want.z) + 0.5
	want.y = maxf(want.y, ground)
	_cam_pos = _cam_pos.lerp(want, 1.0 - exp(-real * 10.0))
	_cam_look = _cam_look.lerp(target + f * 1.2, 1.0 - exp(-real * 12.0))
	camera.global_position = _cam_pos
	if shake > 0.0:
		camera.global_position += Vector3(randf() - 0.5, randf() - 0.5, 0) * shake * 0.5
	camera.look_at(_cam_look)


func _title_camera(_real: float) -> void:
	var t := Time.get_ticks_msec() / 1000.0 * 0.03
	var c := Vector3(-35, 0, 55)
	var at := c + Vector3(sin(t) * 60.0, 0, cos(t) * 60.0)
	at.y = terrain.height_at(at.x, at.z) + 14.0
	camera.global_position = at
	camera.look_at(Vector3(c.x, terrain.height_at(c.x, c.y) + 4.0, c.z))
