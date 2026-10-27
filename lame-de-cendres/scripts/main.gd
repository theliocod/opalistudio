## La partie : la vallée, le samouraï, les damnés, les villes et leurs gens,
## et tout ce qui se passe entre eux.
extends Node3D

## Les lieux de la vallée. radius : le replat bâti autour du centre.
var places := [
	{"id": "autel", "name": "Autel des Cendres", "pos": Vector2(-120, 150), "radius": 14.0},
	{"id": "village", "name": "Village de Kurogane", "pos": Vector2(-35, 55), "radius": 30.0},
	{"id": "camp", "name": "Camp des Ronins", "pos": Vector2(85, 105), "radius": 20.0},
	{"id": "croisee", "name": "Croisée des Pendus", "pos": Vector2(120, -20), "radius": 14.0},
	{"id": "sanctuaire", "name": "Sanctuaire noyé", "pos": Vector2(-163, -45), "radius": 10.0},
	{"id": "temple", "name": "Temple de la Lune Rouge", "pos": Vector2(30, -140), "radius": 34.0},
	{"id": "hojo", "name": "Hōjō-machi", "pos": Vector2(-150, 72), "radius": 40.0},
	{"id": "akagane", "name": "Fort d'Akagane", "pos": Vector2(130, -105), "radius": 33.0},
	{"id": "cimetiere", "name": "Cimetière des Lames", "pos": Vector2(-55, -95), "radius": 15.0},
	{"id": "bambous", "name": "Bosquet de bambous", "pos": Vector2(40, 22), "radius": 12.0},
]
var paths := [
	[Vector2(-120, 150), Vector2(-75, 105)], [Vector2(-75, 105), Vector2(-35, 55)],
	[Vector2(-35, 55), Vector2(30, 85)], [Vector2(30, 85), Vector2(85, 105)],
	[Vector2(-35, 55), Vector2(0, -20)], [Vector2(0, -20), Vector2(30, -105)],
	[Vector2(0, -20), Vector2(70, -25)], [Vector2(70, -25), Vector2(120, -20)],
	[Vector2(-35, 55), Vector2(-100, 20)], [Vector2(-100, 20), Vector2(-150, -20)],
	[Vector2(-120, 150), Vector2(-150, 104)], [Vector2(-150, 40), Vector2(-112, 14)],
	[Vector2(-75, 105), Vector2(-122, 72)], [Vector2(120, -20), Vector2(130, -80)],
	[Vector2(0, -20), Vector2(-55, -82)], [Vector2(30, 85), Vector2(40, 34)],
]
## Ce que cachent les coffres : un katana parfois, des objets et des ryō toujours.
const CHEST_LOOT := {
	"village": {"katana": "kurenai", "items": {"sake": 2, "onigiri": 1}, "ryo": 60},
	"camp": {"items": {"sake": 2, "the": 1, "encens": 1}, "ryo": 120},
	"croisee": {"katana": "shiranui", "items": {"onigiri": 2}, "ryo": 40},
	"sanctuaire": {"katana": "yamikaze", "items": {"the": 1, "sake": 1}, "ryo": 80},
	"temple": {"items": {"sake": 3, "encens": 1}, "ryo": 300},
	"akagane": {"items": {"sake": 2, "fumigene": 1}, "ryo": 260},
	"akagane_kura": {"items": {"fumigene": 2, "caillou": 4}, "ryo": 420},
	"cimetiere": {"items": {"encens": 2, "sake": 1}, "ryo": 180},
	"bambous": {"items": {"the": 2, "onigiri": 2}, "ryo": 30},
}
const SOULS := {"ronin": 1, "chef": 3, "oni": 8, "garde": 1}
const RYO := {"ronin": [6, 18], "chef": [90, 140], "oni": [400, 500], "garde": [10, 25]}

var terrain: Terrain
var vegetation: Vegetation
var landmarks: Towns
var atmosphere: Atmosphere
var hud: Hud
var audio: Audio
var wind: Wind
var stealth: Stealth
var cine: Cinematics
var arsenal := Arsenal.new()
var renown := Renown.new()
var player: Fighter
var enemies: Array = []         # tous les autres : damnés, gardes, habitants
var pickups: Array = []         # {node, pos, items, katana, ryo}
var projectiles: Array = []     # les croissants de l'Hirondelle
var cuts: Array = []            # les entailles du Pas du Vent, qui saignent après coup
var camera: Camera3D
var aura: CPUParticles3D
var dialogue: DialogueBox
var shop_view: ShopView
var registry_view: RegistryView
var pause_menu: PauseMenu

var state := "title"            # title | play | menu | map | talk | shop | registry | dead | win
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
var burning := {}               # ennemi → temps de brûlure restant
var bleeding := {}              # ennemi → [temps, dégâts par seconde]
var oni_dead := false
var calm := 0.0                 # temps passé sans danger : on rengaine
var dead_ids := {}              # ceux qui ne reviendront pas (sauvegarde)
var talking_to: Fighter
var duel := {}                  # {npc, phase, t}
var danger_at := Vector3(1e9, 0, 1e9)
var combat_noise_at := Vector3.ZERO
var combat_noise_t := 0.0
var smoke_at := Vector3.ZERO
var smoke_t := 0.0
var parry_bonus := 0.0          # l'Œil unique : le coup qui suit une parade
var zone := {}
var _barks := {}
var _danger_t := 0.0
var _mood_hold := 0.0
var _step_phase := 0.0
var _infamy_decay := 0.0
## Le brouillard de la carte : un pixel pour 4 m, blanc là où l'on est passé
var fog_image: Image
var fog_texture: ImageTexture
var _last_reveal := Vector3(1e9, 0, 0)
var waypoint := Vector3.ZERO
var has_waypoint := false
var map_view: MapView
var _cam_pos := Vector3.ZERO
var _cam_look := Vector3.ZERO


func _ready() -> void:
	_inputs()
	Settings.load_cfg()
	audio = Audio.new()
	add_child(audio)
	atmosphere = Atmosphere.new()
	add_child(atmosphere)
	terrain = Terrain.new()
	add_child(terrain)
	terrain.build(places, paths)
	_add_lake()
	landmarks = Towns.new()
	add_child(landmarks)
	landmarks.build(terrain, places)
	vegetation = Vegetation.new()
	add_child(vegetation)
	vegetation.build(terrain, places)
	wind = Wind.new()
	add_child(wind)
	stealth = Stealth.new()
	add_child(stealth)
	stealth.setup(self)
	wind.emitters = landmarks.emitters
	cine = Cinematics.new()
	cine.game = self
	add_child(cine)
	# le crépitement des feux de camp
	var fires: Array = landmarks.fires.duplicate()
	for p in places:
		if p.id == "camp":
			fires.append(Vector3(p.pos.x, terrain.height_at(p.pos.x, p.pos.y), p.pos.y))
	for f in fires:
		var fp: AudioStreamPlayer3D = audio.loop_player("feu", "Ambiance", true)
		add_child(fp)
		fp.global_position = f + Vector3(0, 0.5, 0)

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
	fill.name = "Lueur"
	camera.make_current()
	hud = Hud.new()
	add_child(hud)
	hud.on_use = _use_item
	hud.on_equip = _equip
	fog_image = Image.create(128, 128, false, Image.FORMAT_L8)
	fog_texture = ImageTexture.create_from_image(fog_image)
	map_view = MapView.new(self, hud.serif, hud.sans)
	hud.add_child(map_view)
	dialogue = DialogueBox.new(hud)
	dialogue.on_choice = _on_choice
	hud.root.add_child(dialogue)
	shop_view = ShopView.new(hud)
	shop_view.on_close = _close_overlay
	hud.root.add_child(shop_view)
	registry_view = RegistryView.new(hud)
	registry_view.on_close = _close_overlay
	registry_view.on_mark = _mark_samurai
	hud.root.add_child(registry_view)
	pause_menu = PauseMenu.new(hud)
	pause_menu.process_mode = Node.PROCESS_MODE_ALWAYS
	pause_menu.on_resume = _resume
	pause_menu.on_save = func(): return "Partie sauvegardée." if SaveGame.write(self) else "Impossible d'écrire la sauvegarde."
	pause_menu.on_load = _load_game
	pause_menu.on_quit = func(): get_tree().quit()
	hud.root.add_child(pause_menu)
	Settings.apply(self)
	audio.set_mood("exploration")
	_show_title()


func _show_title() -> void:
	hud.show_title(func(): _start({}), _load_game if SaveGame.exists() else Callable(), func():
		pause_menu.open(self, true))


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
## WASD sur un clavier anglais, sans rien régler. Les réglages peuvent les changer.
func _inputs() -> void:
	var keys := {
		"avant": [KEY_W, KEY_UP], "arriere": [KEY_S, KEY_DOWN], "gauche": [KEY_A, KEY_LEFT], "droite": [KEY_D, KEY_RIGHT],
		"rapide": [KEY_J], "lourd": [KEY_K], "pied": [KEY_F], "tournoyant": [KEY_G], "esquive": [KEY_SPACE], "garde": [KEY_SHIFT, KEY_L],
		"action": [KEY_E], "tech1": [KEY_R], "tech2": [KEY_T], "tech3": [KEY_Q], "tech4": [KEY_V], "tech5": [KEY_X],
		"accroupi": [KEY_C, KEY_CTRL], "inventaire": [KEY_TAB, KEY_I], "carte": [KEY_M], "recentrer": [KEY_C], "pause": [KEY_ESCAPE, KEY_P],
		"objet1": [KEY_1], "objet2": [KEY_2], "objet3": [KEY_3], "objet4": [KEY_4], "objet5": [KEY_5], "objet6": [KEY_6],
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

## Une partie : nouvelle (save vide) ou reprise d'une sauvegarde.
func _start(save: Dictionary) -> void:
	hud.hide_screen()
	for e in enemies:
		e.remove()
	enemies.clear()
	if player:
		player.remove()
	var s: Dictionary = landmarks.shrines[0]
	respawn = s.pos
	player = Fighter.new("player")
	player.role = "player"
	add_child(player)
	player.global_position = respawn + Vector3(0, 0.3, 0)
	player.yaw = PI
	player.sheathed = true
	var i := 0
	for sp in landmarks.spawns:
		_spawn({"kind": sp.kind, "role": "enemy", "faction": "damnes", "pos": sp.pos, "yaw": randf() * TAU, "place": sp.place}, "s%d" % i)
		i += 1
	i = 0
	for f in landmarks.folk:
		_spawn(f, "f%d" % i)
		i += 1
	_make_aura()
	_equip("ronin")
	if not save.is_empty():
		_apply_save(save)
	_cam_pos = player.global_position + Vector3(0, 3, 6)
	state = "play"
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	if save.is_empty():
		_discover(places[0])
	hud.set_arsenal(arsenal)
	hud.set_renown(renown)


func _spawn(d: Dictionary, sid: String) -> Fighter:
	var e := Fighter.new(d.kind)
	e.role = d.get("role", "enemy")
	e.faction = d.get("faction", "damnes")
	e.hostile = e.faction != "hojo"
	e.armed = d.get("armed", true)
	e.npc_id = d.get("id", "")
	e.display_name = d.get("name", "")
	e.idle_clip = d.get("idle", "repos")
	e.walk_clip = d.get("walk", "marche")
	e.place = d.get("place", "akagane" if e.faction == "akagane" else "")
	var pos: Vector3 = d.pos
	add_child(e)
	e.global_position = pos + Vector3(0, 0.5, 0)
	e.home = pos
	e.yaw = d.get("yaw", 0.0)
	e.post_yaw = e.yaw
	e.cd = 1.0 + randf() * 2.0
	e.sheathed = e.faction == "hojo" or (e.role == "guard" and e.faction == "akagane")
	var route: Array = d.get("route", [])
	e.route = route
	if d.get("walker", false):
		e.set_meta("walker", true)
		e.set_meta("target", pos)
	if d.get("prisoner", false):
		e.set_meta("prisoner", true)
	if d.get("lookout", false):
		e.set_meta("lookout", true)
	if Renown.SAMURAI.has(e.npc_id):
		var power: float = Renown.SAMURAI[e.npc_id].power
		e.max_hp = Fighter.STATS[e.kind][0] * power
		e.hp = e.max_hp
		e.parry_chance = 0.1 + power * 0.08
	var tint: Color = d.get("tint", Color(1, 1, 1))
	if tint != Color(1, 1, 1):
		e.tint.call_deferred(tint)
	e.set_meta("sid", sid)
	enemies.append(e)
	return e


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
	stealth.reset()
	renown.hojo_alarm = 0.0
	for e in enemies:
		e.aggro = false
		if e.alive:
			e.global_position = e.home + Vector3(0, 0.5, 0)
			e.hp = e.max_hp
			e.posture = 0.0
	state = "play"
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	hud.banner("Tu te relèves", "Les damnés ont repris leur poste.")


func _close_map() -> void:
	map_view.visible = false
	hud.play_ui.visible = true
	state = "play"
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED


## Revient au jeu depuis la boutique, le registre ou un dialogue.
func _close_overlay() -> void:
	state = "play"
	hud.play_ui.visible = true
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED


func _resume() -> void:
	get_tree().paused = false
	if player == null:
		return
	state = "play"
	hud.play_ui.visible = true
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED


## Le brouillard se lève autour d'un point.
func _reveal(at: Vector3, radius: float) -> void:
	var s := fog_image.get_width() / Terrain.SIZE
	var cx := (at.x + Terrain.SIZE / 2) * s
	var cy := (at.z + Terrain.SIZE / 2) * s
	var r := radius * s
	for y in range(int(cy - r - 1), int(cy + r + 2)):
		for x in range(int(cx - r - 1), int(cx + r + 2)):
			if x < 0 or y < 0 or x >= fog_image.get_width() or y >= fog_image.get_height():
				continue
			var d := Vector2(x + 0.5 - cx, y + 0.5 - cy).length()
			var v := clampf((r - d) / (r * 0.35), 0.0, 1.0)
			if v > fog_image.get_pixel(x, y).r:
				fog_image.set_pixel(x, y, Color(v, v, v))
	fog_texture.update(fog_image)


func set_waypoint(w: Vector3) -> void:
	waypoint = Vector3(w.x, terrain.height_at(w.x, w.z), w.z)
	has_waypoint = true


func clear_waypoint() -> void:
	has_waypoint = false


func terrain_height(at: Vector3) -> float:
	return terrain.height_at(at.x, at.z)


func _discover(p: Dictionary) -> void:
	if discovered.has(p.id):
		return
	discovered[p.id] = true
	_reveal(Vector3(p.pos.x, 0, p.pos.y), p.radius + 20.0)
	hud.banner(p.name, "Lieu découvert")
	Audio.sfx("decouverte", null, -3.0, 0.0)
	if state == "play" and discovered.size() > 1:
		_fame(2, "")


# ---------- Les entrées ----------

func _unhandled_input(ev: InputEvent) -> void:
	if ev is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
		var sens: float = Settings.value("jeu", "sensibilite")
		var inv := -1.0 if Settings.value("jeu", "inverser") else 1.0
		cam_yaw -= ev.relative.x * 0.0024 * sens
		cam_pitch = clampf(cam_pitch + ev.relative.y * 0.0018 * sens * inv, 0.05, 0.9)
	if state == "play" and ev is InputEventMouseButton and ev.pressed and Input.mouse_mode != Input.MOUSE_MODE_CAPTURED:
		Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
		get_viewport().set_input_as_handled()
		return
	if ev.is_action_pressed("pause") and state in ["play", "menu"]:
		hud.hide_inventory()
		state = "play"
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
		hud.play_ui.visible = false
		pause_menu.open(self)
		get_tree().paused = true
		get_viewport().set_input_as_handled()
		return
	if state == "map":
		if ev.is_action_pressed("carte") or ev.is_action_pressed("ui_cancel"):
			_close_map()
		elif ev.is_action_pressed("recentrer"):
			map_view.recenter()
		return
	if state in ["talk", "shop", "registry"]:
		return
	if ev.is_action_pressed("carte") and state == "play":
		state = "map"
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
		map_view.open()
		hud.play_ui.visible = false
		Audio.sfx("ui-papier")
		return
	if ev.is_action_pressed("inventaire") and state in ["play", "menu"]:
		if state == "play":
			state = "menu"
			Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
			hud.show_inventory(arsenal)
			Audio.sfx("ui-papier", null, -4.0)
		else:
			state = "play"
			hud.hide_inventory()
			Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	if state != "play" or not player.alive or cine.active():
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
	elif ev.is_action_pressed("tech3"):
		_buffer("hirondelle", 0.3)
	elif ev.is_action_pressed("tech4"):
		_buffer("pas_vent", 0.3)
	elif ev.is_action_pressed("tech5"):
		_buffer("petales", 0.3)
	elif ev.is_action_pressed("garde"):
		block_press_t = 0.0
		_buffer("parry", 0.12)
	elif ev.is_action_pressed("action"):
		_interact()
	elif ev.is_action_pressed("accroupi"):
		player.sneaking = not player.sneaking
	for i in 6:
		if ev.is_action_pressed("objet%d" % (i + 1)):
			for id in Arsenal.ITEMS:
				if Arsenal.ITEMS[id].key == i + 1:
					_use_item(id)


func _buffer(what: String, t: float) -> void:
	buffer = what
	buffer_t = t


# ---------- La boucle ----------

func _physics_process(dt: float) -> void:
	if state not in ["play", "talk"] or player == null:
		return
	time += dt
	arsenal.tick(dt)
	renown.tick(dt)
	combat_noise_t = maxf(0.0, combat_noise_t - dt)
	smoke_t = maxf(0.0, smoke_t - dt)
	parry_bonus = maxf(0.0, parry_bonus - dt)
	_danger_t = maxf(0.0, _danger_t - dt)
	if state == "play":
		_control(dt)
	else:
		player.move = Vector3.ZERO
		player.speed *= 0.8
	token.free = true
	for e in enemies:
		if e.alive and e.aggro and e.hostile and not e.action.is_empty() and e.action.def.has("windup"):
			token.free = false
	var near_folk := player.global_position
	for e in enemies:
		if cine.busy(e) or e.is_doing(["executed", "assassine"]):
			continue
		# pendant une mise à mort, le temps se suspend pour les autres
		if cine.active() and e.hostile:
			e.move = Vector3.ZERO
			e.speed *= 0.8
			continue
		if e.role == "enemy":
			e.think(player, enemies, dt, token)
		elif e.global_position.distance_to(near_folk) < 110.0:
			Folk.think(e, self, dt)
	if not cine.busy(player):
		player.step(dt, time)
	else:
		player.step(dt, time)
	player.physics_move(dt)
	for e in enemies:
		if player.global_position.distance_to(e.global_position) < 90.0 or e.aggro:
			e.step(dt, time)
			e.physics_move(dt)
		elif e.alive and not e.action.is_empty():
			# trop loin pour être simulé : il ne reste pas figé au milieu d'un coup
			e.action = {}
	cine.step(dt)
	stealth.step(dt)

	# les coups qui partent cherchent leur cible
	if player.striking() and not cine.active():
		for e in enemies:
			_strike(player, player.action.def, e)
		if player.action.def.get("kick", false):
			_kick_doors()
	for e in enemies:
		if e.striking() and e.hostile:
			_strike(e, e.action.def, player)
	player.update_trail(dt)
	for e in enemies:
		e.update_trail(dt)
	_techniques(dt)
	_burns(dt)
	_cleanup()
	_pickups()
	_duel_step(dt)
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
	_bark_tick(real)
	if player == null:
		_title_camera(real)
		wind.step(real, camera.global_position)
		return
	_camera(real)
	vegetation.follow(player.global_position)
	wind.step(real, player.global_position, zone.get("id", "") == "hojo")
	Blood.tint_blade(player.rig, real)
	_music(real)
	if state in ["play", "menu", "talk"]:
		hud.set_bars(player.hp, player.max_hp, stamina, real)
		var boss := _boss()
		if not duel.is_empty() and duel.phase == "fight":
			var n: Fighter = duel.npc
			hud.set_boss("%s · %s" % [n.display_name, Renown.SAMURAI[n.npc_id].title], n.hp / n.max_hp)
		elif boss and boss.aggro and boss.alive:
			hud.set_boss("L'Oni de la Lune Rouge" if boss.kind == "oni" else boss.display_name, boss.hp / boss.max_hp)
		else:
			hud.set_boss("", -1.0)
		var marks := []
		for p in places:
			if discovered.has(p.id):
				marks.append({"name": p.name, "pos": Vector3(p.pos.x, 0, p.pos.y), "danger": (p.id == "temple" and not oni_dead) or (p.id == "akagane" and not renown.fort_free)})
		if has_waypoint:
			var d := Vector2(player.global_position.x, player.global_position.z).distance_to(Vector2(waypoint.x, waypoint.z))
			marks.append({"name": "◆ %d m" % d, "pos": waypoint, "color": Hud.GOLD})
		hud.set_compass(cam_yaw, player.global_position, marks)
		hud.set_sneak(player.sneaking, _watchers())


## Le boss qui se bat contre toi en ce moment : l'Oni, ou le commandant d'Akagane.
func _boss() -> Fighter:
	for e in enemies:
		if e.kind == "oni" or e.npc_id == "gonryu":
			if e.aggro and e.alive:
				return e
	return null


## Combien de gardes te soupçonnent (pour l'œil de l'interface).
func _watchers() -> float:
	var s := 0.0
	for e in enemies:
		if e.alive and stealth.watched(e):
			s = maxf(s, 1.0 if e.alert == "alerte" else e.suspicion)
	return s


## La musique suit ce qui se passe : la ville, l'infiltration, le combat, le boss.
func _music(real: float) -> void:
	var m := "exploration"
	if zone.get("id", "") == "hojo" and not renown.hojo_hostile():
		m = "ville"
	if (zone.get("id", "") == "akagane" and not renown.fort_free) or player.sneaking:
		m = "infiltration"
	var fighting := false
	for e in enemies:
		if e.alive and e.aggro and e.hostile and e.flat_distance(player) < 30.0:
			fighting = true
	if fighting:
		_mood_hold = 6.0
	_mood_hold -= real
	if _mood_hold > 0.0:
		m = "combat"
	var boss := _boss()
	if (boss and boss.flat_distance(player) < 40.0) or (not duel.is_empty() and duel.phase == "fight"):
		m = "boss"
	audio.set_mood(m)


# ---------- Le joueur ----------

func _control(dt: float) -> void:
	block_press_t += dt
	buffer_t -= dt
	if buffer_t <= 0.0:
		buffer = ""
	if not player.alive or cine.busy(player):
		player.move = Vector3.ZERO
		player.speed *= 0.8
		return
	var f := Vector3(sin(cam_yaw), 0, cos(cam_yaw))
	var r := Vector3(-f.z, 0, f.x)
	var mv := f * Input.get_axis("arriere", "avant") + r * Input.get_axis("gauche", "droite")
	if mv.length_squared() > 1.0:
		mv = mv.normalized()

	var a := player.action
	var busy: bool = not a.is_empty() and a.name in ["hit", "stagger", "die", "finisher", "roulade", "pas_vent", "assassinat", "iai_exec"]
	var free: bool = a.is_empty() or (a.def.has("combo") and a.t >= a.def.combo) or (a.name == "parry" and a.t > 0.2) or a.def.get("gesture", false)
	var recovering: bool = not a.is_empty() and a.def.has("active") and a.t > a.def.active[1]

	var techs := ["tourbillon", "iai", "hirondelle", "pas_vent", "petales"]
	# l'épée est au fourreau : on dégaine d'abord, le coup demandé suivra
	var wants_blade := buffer in ["light", "heavy", "parry"] + techs or Input.is_action_pressed("garde")
	if buffer in techs and not arsenal.knows(buffer):
		if buffer != "":
			hud.callout("Technique inconnue", Hud.MUTED)
		buffer = ""
		wants_blade = false
	if wants_blade and player.sneaking:
		player.sneaking = false
	if player.sheathed and wants_blade and not busy and free and not player.is_doing(["degainer"]):
		player.play("degainer")
		Audio.sfx("degainer", player.global_position)
		if buffer != "parry":
			buffer_t = maxf(buffer_t, 1.2)
	elif not busy and buffer == "dodge" and (free or recovering) and not _wall_ahead(mv).is_empty():
		var w: Dictionary = _wall_ahead(mv)
		player.yaw = atan2(w.dir.x, w.dir.y)
		player.play("saut")
		player.collision_mask = 1 | 2
		Audio.sfx("saut", player.global_position)
		buffer = ""
	elif not busy and buffer == "dodge" and stamina > 0.0 and (free or recovering) and not player.is_doing(["dodge"]):
		# en mouvement : une roulade ; à l'arrêt : un pas en arrière
		if mv.length_squared() > 0.01:
			player.yaw = atan2(mv.x, mv.z)
			player.play("roulade")
			player.sneaking = false
		else:
			var dir := -player.forward()
			player.yaw = atan2(dir.x, dir.z)
			player.play("dodge")
		Audio.sfx("saut", player.global_position, -6.0)
		_spend(22.0)
	elif not busy and free and buffer in techs and arsenal.knows(buffer) and stamina > 0.0 and not player.sheathed:
		_face_nearest(6.0 if buffer != "hirondelle" else 18.0, mv)
		player.play(buffer)
		player.action.start = player.global_position
		_spend(Arsenal.TECHNIQUES[buffer].cost)
		Audio.sfx("technique" if buffer in ["pas_vent", "hirondelle"] else "tourbillon", player.global_position, -8.0)
		combo_step = 0
	elif not busy and free and buffer in ["kick", "frontkick"] and stamina > 0.0:
		_face_nearest(5.5, mv)
		player.play(buffer)
		player.sneaking = false
		_spend(Fighter.ACTIONS[buffer].cost)
		Audio.sfx("lourd", player.global_position, -6.0)
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
		_spend(Fighter.ACTIONS[name].cost * (0.8 if arsenal.katana().effect == "wind" else 1.0))
		Audio.sfx("lourd" if name == "heavy" else "lame", player.global_position, -2.0)
	elif not busy and buffer == "parry" and (a.is_empty() or free):
		_face_nearest(6.0, Vector3.ZERO)
		player.play("parry")
		buffer = ""

	if not player.is_doing(["saut"]) and not cine.busy(player):
		player.collision_mask = 1 | 2 | Landmarks.WALL_LAYER
	player.blocking = Input.is_action_pressed("garde") and player.action.is_empty() and stamina > 0.0 and not player.sheathed
	player.action_speed = arsenal.katana().get("speed", 1.0)
	_sheath_logic(dt)
	if player.action.is_empty() or player.action.def.get("gesture", false):
		var spd := 1.8 if player.blocking else (2.3 if player.sneaking else 5.4)
		player.move = mv * spd
		player.speed = mv.length() * spd
		if player.blocking:
			var near := _nearest(8.0)
			if near:
				player.turn_towards(near.global_position, 10.0, dt)
		elif mv.length_squared() > 0.01:
			player.yaw += angle_difference(player.yaw, atan2(mv.x, mv.z)) * minf(1.0, dt * 12.0)
			if player.action.get("def", {}).get("gesture", false):
				player.action = {}
	else:
		player.move = Vector3.ZERO
		player.speed *= 0.85
		if player.is_doing(["dodge"]):
			player.move = player.forward() * (10.0 if player.action.t < 0.3 else 3.0)
	_footsteps()

	stamina_wait -= dt
	if stamina_wait <= 0.0:
		var regen := (10.0 if player.blocking else 30.0) * (2.0 if arsenal.buffs.has("the") else 1.0)
		stamina = minf(100.0, stamina + regen * dt)


## Les pas : un bruit à chaque pied posé, plus léger accroupi.
func _footsteps() -> void:
	if player.speed < 0.5 or not player.is_on_floor():
		_step_phase = player.phase
		return
	var half := fmod(player.phase * 2.0, 1.0)
	if half < _step_phase:
		Audio.sfx("pas", player.global_position, -14.0 if player.sneaking else (-4.0 if player.speed > 4.0 else -8.0), 0.12)
	_step_phase = half


## Un ennemi te repère : on dégaine. Plus rien autour depuis un moment : on rengaine.
func _sheath_logic(dt: float) -> void:
	var danger := false
	for e in enemies:
		if e.alive and e.aggro and e.hostile and e.flat_distance(player) < 25.0:
			danger = true
	if danger:
		calm = 0.0
		if player.sheathed and player.action.is_empty() and not player.sneaking:
			player.play("degainer")
			Audio.sfx("degainer", player.global_position)
	elif player.action.is_empty():
		calm += dt
		var limit := 3.0 if zone.get("id", "") == "hojo" else 8.0
		if calm > limit and not player.sheathed:
			player.play("rengainer")
			Audio.sfx("rengainer", player.global_position, -2.0)
			Blood.chiburi(self, player.rig)
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


## L'adversaire le plus proche (les damnés, les gardes en alerte, un duelliste).
func _nearest(max_d: float) -> Fighter:
	var best: Fighter = null
	var bd := max_d
	for e in enemies:
		if not e.alive or not (e.hostile or e.aggro):
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
	return a.name in ["finisher", "assassinat"]


func _strike(att: Fighter, def: Dictionary, target: Fighter) -> void:
	if not target.alive or att.action.hits.has(target) or att == target:
		return
	# le coup de grâce ne touche que celui qu'on achève
	if def.get("finisher", false) and not target.is_doing(["executed"]):
		return
	if target.get_meta("prisoner", false):
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
	if cine.active():
		return
	if _invulnerable():
		hud.callout("Esquive", Hud.MUTED)
		return
	var facing := player.angle_to(att.global_position) < 1.4
	var window := (0.3 if arsenal.knows("garde") else 0.22) + (0.06 if arsenal.knows("oeil") else 0.0)
	# la parade : la garde levée juste avant l'impact
	if facing and block_press_t < window:
		att.play("stagger")
		att.posture = 0.0
		Fx.burst(self, chest.lerp(att.global_position + Vector3(0, 1.4, 0), 0.5), 70, Color(1.0, 0.82, 0.48), 9.0, 3.0, 14.0, 0.45, 5.0)
		Audio.sfx("parade", chest, 2.0)
		hitstop = 0.11
		slowmo = 0.8 if arsenal.knows("oeil") else 0.45
		shake = 0.35 * _shake_scale()
		stamina = minf(100.0, stamina + 20.0)
		if arsenal.knows("garde"):
			player.hp = minf(player.max_hp, player.hp + 5.0)
		if arsenal.knows("oeil"):
			parry_bonus = 1.6
		hud.callout("Parade", Hud.GOLD)
		return
	var power: float = Renown.SAMURAI[att.npc_id].power if Renown.SAMURAI.has(att.npc_id) else 1.0
	var dmg: float = def.dmg * (1.4 if att.kind == "oni" else 1.0) * power * (0.6 if arsenal.buffs.has("encens") else 1.0)
	if facing and player.blocking and stamina > 0.0:
		var rock: bool = arsenal.katana().effect == "rock"
		stamina -= (45.0 if def.get("heavy", false) else 22.0) * (0.6 if rock else 1.0)
		stamina_wait = 0.8
		Fx.burst(self, chest, 30, Color(1.0, 0.75, 0.44), 6.0, 2.0)
		Audio.sfx("garde", chest)
		player.knock += att.forward() * 4.0
		shake = 0.15 * _shake_scale()
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
		player.sneaking = false
		Fx.burst(self, chest, 40, Color(0.6, 0.04, 0.07), 5.0, 2.0, 10.0, 0.7, 2.2)
		Blood.spray(self, chest, att.forward() + Vector3(0, 0.3, 0), 30, 0.8)
		Audio.sfx("chair", chest)
		shake = 0.4 * _shake_scale()
		hitstop = 0.07
	# un duel ne se finit pas dans la mort : on s'effondre, vaincu
	if not duel.is_empty() and duel.phase == "fight" and player.hp <= 12.0:
		player.hp = 12.0
		player.play("stagger")
		_end_duel(false)
		return
	if player.hp <= 0.0:
		_kill(player)


func _shake_scale() -> float:
	return float(Settings.value("jeu", "secousses"))


func _hit_enemy(def: Dictionary, target: Fighter, chest: Vector3) -> void:
	var k := arsenal.katana()
	var staggered := target.is_doing(["stagger", "executed"])
	_noise(target.global_position)
	_crime(target)
	var away := (target.global_position - player.global_position) * Vector3(1, 0, 1)
	away = away.normalized() if away.length_squared() > 0.001 else player.forward()
	# un duelliste du Registre pare parfois
	if target.duel and not staggered and not target.striking() and target.angle_to(player.global_position) < 1.0 and randf() < target.parry_chance and not def.get("kick", false):
		target.play("parry")
		target.cd = 0.25
		player.play("hit")
		Fx.burst(self, chest.lerp(player.global_position + Vector3(0, 1.4, 0), 0.5), 50, Color(1.0, 0.82, 0.48), 8.0, 3.0, 14.0, 0.4, 5.0)
		Audio.sfx("parade", chest)
		hitstop = 0.08
		hud.callout("Paré !", Color(1.0, 0.5, 0.3))
		return

	if def.get("kick", false):
		target.hp -= def.dmg
		target.posture += def.posture
		target.knock += away * def.get("push", 16.0) / target.rig.body_scale
		Fx.burst(self, chest, 26, Color(1.0, 0.88, 0.7), 6.0, 2.0, 14.0, 0.3, 3.0)
		Audio.sfx("coup-pied", chest)
		hitstop = 0.08
		shake = 0.25 * _shake_scale()
		if _enemy_dead(target):
			return
		if target.posture >= target.max_posture:
			target.posture = 0.0
			target.play("stagger")
			hud.callout("Posture brisée", Hud.GOLD)
		elif not target.striking():
			target.play("hit")
		return

	var riposte := staggered
	var unaware := not target.aggro and target.hostile and target.alert != "alerte"
	var mult: float = (3.5 if k.effect == "void" else 2.6) if riposte else 1.0
	if k.effect == "shadow" and unaware:
		mult *= 1.8
	if parry_bonus > 0.0:
		mult *= 2.0
		parry_bonus = 0.0
		hud.callout("L'Œil unique", Hud.GOLD)
	var dmg: float = def.dmg * k.dmg * mult
	target.hp -= dmg
	target.posture += def.get("posture", def.dmg) * k.posture
	var aura_c: Color = k.aura if k.aura != null else Color(1.0, 0.88, 0.7)
	Fx.burst(self, chest, 90 if riposte else 34, Color(0.6, 0.04, 0.07), 8.0 if riposte else 5.0, 2.0, 10.0, 0.8, 2.4)
	Fx.burst(self, chest, 16, aura_c, 7.0, 1.0, 14.0, 0.25, 4.0)
	Blood.spray(self, chest, away + Vector3(0, 0.3, 0), 70 if riposte else 36, 1.2 if riposte else 0.9)
	if riposte or randf() < 0.35:
		Blood.stain(self, terrain_height, target.global_position, away, 1, 1.2)
	Blood.stain_blade(player.rig, 0.08)
	Audio.sfx("chair", chest, 0.0 if riposte else -3.0)
	hitstop = 0.1 if def.get("heavy", false) or riposte else 0.055
	shake = (0.3 if def.get("heavy", false) or riposte else 0.12) * _shake_scale()
	if riposte:
		hud.callout("Riposte", Color(1.0, 0.3, 0.23))
		slowmo = 0.35
	# les pouvoirs des lames
	if k.effect in ["burn", "moon"]:
		burning[target] = 3.0
	if k.effect in ["drain", "moon"]:
		player.hp = minf(player.max_hp, player.hp + dmg * 0.12)
	if k.effect == "bleed":
		bleeding[target] = [4.0, minf(12.0, bleeding.get(target, [0, 0])[1] + 4.0)]
		Fx.burst(self, chest, 14, Color(1.0, 0.6, 0.75), 4.0, 1.5, -0.5, 1.2, 2.5)
	if k.effect == "venom":
		bleeding[target] = [6.0, 3.0]
		target.posture += 15.0
		Fx.burst(self, chest, 12, Color(0.35, 0.9, 0.25), 2.0, 2.0, -1.0, 1.0, 2.0)
	if k.effect == "wind":
		target.knock += away * 7.0
	if k.effect == "rock" and def.get("heavy", false):
		# le coup lourd de Gojō ébranle le sol autour
		Fx.burst(self, target.global_position + Vector3(0, 0.2, 0), 60, Color(0.7, 0.6, 0.45), 8.0, 1.0, 12.0, 0.6, 1.5)
		for o in enemies:
			if o != target and o.alive and o.hostile and o.global_position.distance_to(target.global_position) < 3.2:
				o.hp -= dmg * 0.4
				o.posture += 30.0
				o.knock += (o.global_position - target.global_position).normalized() * 6.0
				_enemy_dead(o)
	if k.effect == "chain" and randf() < 0.3:
		for o in enemies:
			if o != target and o.alive and o.hostile and o.global_position.distance_to(target.global_position) < 5.0:
				o.hp -= dmg * 0.5
				o.posture += 20.0
				Fx.burst(self, o.global_position + Vector3(0, 1.3, 0), 30, Color(0.85, 0.9, 1.0), 9.0, 1.0, 6.0, 0.3, 5.0)
				_enemy_dead(o)
				break
	if _enemy_dead(target):
		return
	var super_armor := target.striking()
	if target.posture >= target.max_posture:
		target.posture = 0.0
		target.play("stagger")
		hud.callout("Posture brisée", Hud.GOLD)
	elif not riposte and not super_armor and (target.kind != "oni" or def.get("heavy", false)):
		target.play("hit")
	# frappé, un garde d'Akagane donne l'alerte ; un habitant de Hōjō s'enfuit
	if stealth.watched(target) and target.alive and target.alert != "alerte":
		stealth.raise(target)


## Mort, ou vaincu en duel ? Vrai s'il ne se bat plus.
func _enemy_dead(t: Fighter) -> bool:
	if t.hp > 0.0:
		return false
	if t.duel:
		t.hp = 1.0
		t.yielded = true
		t.play("genoux")
		_end_duel(true)
		return true
	_kill(t)
	return true


## Un bruit de combat que les gardes entendent.
func _noise(at: Vector3) -> void:
	combat_noise_at = at
	combat_noise_t = 1.5


## Lever la main sur les gens de Hōjō : l'infamie, et la ville qui se retourne.
func _crime(t: Fighter) -> void:
	if t.faction != "hojo" or t.duel:
		return
	if not renown.hojo_hostile():
		hud.banner("Hōjō se retourne contre toi", "Les gardes accourent. Le capitaine Saitō acceptera peut-être une amende.")
	renown.infamy += 6
	renown.hojo_alarm = 50.0
	t.set_meta("provoked", true)
	_panic(t.global_position)
	hud.set_renown(renown)


## Les passants s'arrêtent pour regarder le duel.
func _panic_watch(at: Vector3) -> void:
	for e in enemies:
		if e.role == "civil" and e.alive and e.global_position.distance_to(at) < 25.0 and e.get_meta("walker", false):
			e.set_meta("target", at + (e.global_position - at).normalized() * 7.0)


func _panic(at: Vector3) -> void:
	danger_at = at
	for e in enemies:
		if e.role in ["civil", "merchant"] and e.alive and e.global_position.distance_to(at) < 22.0 and not e.get_meta("prisoner", false):
			e.fear_t = 9.0


## Un ennemi déséquilibré, tout près : on l'exécute (Cinematics), sinon le coup de grâce classique.
func execute_kill(v: Fighter, how: String) -> void:
	if not v.alive:
		return
	var anim: String = {"assassinat": "", "iai": "assassine", "kesa": "mort-arriere", "tourbillon": "mort-arriere"}.get(how, "dying")
	if how == "assassinat":
		_kill(v, "", true)
	else:
		_kill(v, anim)
	if how != "assassinat":
		hud.callout("Exécution", Color(1.0, 0.3, 0.23))
	if arsenal.knows("lune"):
		stamina = 100.0
		player.hp = minf(player.max_hp, player.hp + player.max_hp * 0.5)


## Un pied qui rencontre une porte fermée la fait voler en éclats.
func _kick_doors() -> void:
	for d in landmarks.doors:
		if d.open:
			continue
		for foot in player.rig.feet:
			if foot.global_position.distance_to(d.pos + Vector3(0, 0.6, 0)) < 1.1:
				landmarks.break_door(d, player.forward())
				Fx.burst(self, d.pos + Vector3(0, 1.0, 0), 50, Color(0.55, 0.35, 0.2), 6.0, 2.0, 12.0, 0.7, 1.4, 0.1)
				Audio.sfx("porte", d.pos)
				_noise(d.pos)
				shake = 0.3 * _shake_scale()
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
			_enemy_dead(e)
		if burning.has(e) and burning[e] <= 0.0:
			burning.erase(e)
	for e in bleeding.keys():
		if not is_instance_valid(e) or not e.alive:
			bleeding.erase(e)
			continue
		bleeding[e][0] -= dt
		e.hp -= bleeding[e][1] * dt
		if randf() < dt * 6.0:
			Blood.spray(self, e.global_position + Vector3(0, 1.1, 0), Vector3(randf_range(-1, 1), 0.2, randf_range(-1, 1)), 6, 0.4)
		if e.hp <= 0.0:
			_enemy_dead(e)
		if bleeding.has(e) and bleeding[e][0] <= 0.0:
			bleeding.erase(e)


## La mort d'un combattant. anim : comment il tombe ; silent : personne n'entend.
func _kill(f: Fighter, anim := "dying", silent := false) -> void:
	if not f.alive:
		return
	f.alive = false
	f.hp = 0.0
	if f == player:
		f.play("die")
		slowmo = 1.2
		shake = 0.4 * _shake_scale()
		state = "dead"
		Audio.sfx("chute", f.global_position)
		get_tree().create_timer(1.6, true, false, true).timeout.connect(func():
			Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
			hud.show_death(_respawn))
		return
	if anim != "":
		f.play(anim)
	dead_ids[f.get_meta("sid", "")] = true
	Audio.sfx("chute", f.global_position, -4.0)
	if not silent:
		_noise(f.global_position)
	if f.hostile and f.faction != "hojo":
		Fx.burst(self, f.global_position + Vector3(0, 1.2, 0), 80 if f.faction == "damnes" else 30, Color(1.0, 0.35, 0.1), 3.0, 2.5, -1.5, 1.8, 2.5)
	var feet := f.global_position
	get_tree().create_timer(1.4, false).timeout.connect(func():
		Blood.pool(self, Vector3(feet.x, terrain.height_at(feet.x, feet.z), feet.z), 2.0 + randf()))
	# Hōjō pleure les siens, et le fait payer
	if f.faction == "hojo":
		renown.infamy += 25 if f.role in ["civil", "merchant"] else 15
		renown.fame = maxi(0, renown.fame - 5)
		renown.hojo_alarm = 90.0
		_panic(f.global_position)
		hud.set_renown(renown)
		return
	if arsenal.katana().effect == "honor":
		player.hp = minf(player.max_hp, player.hp + 12.0)
		stamina = minf(100.0, stamina + 30.0)
	# les âmes, et peut-être une technique
	var fresh := arsenal.add_souls(SOULS.get(f.kind, 1))
	for id in fresh:
		var t: Dictionary = Arsenal.TECHNIQUES[id]
		hud.banner("Technique apprise", "%s%s — %s" % [t.name, " [%s]" % Settings.key_name("tech1" if id == "tourbillon" else "tech2") if t.key != "" else "", t.desc])
		Audio.sfx("technique", null, -2.0, 0.0)
	_fame({"ronin": 1, "chef": 8, "oni": 30, "garde": 1}.get(f.kind, 1), "")
	# le butin, et des ryō
	var drop := Arsenal.roll_loot(f.kind != "ronin" and f.kind != "garde")
	var katana := ""
	var span: Array = RYO.get(f.kind, [5, 12])
	var ryo := randi_range(span[0], span[1])
	if f.kind == "chef" and f.faction == "damnes":
		katana = "raijin"
	if f.npc_id == "gonryu":
		_liberate()
	if f.kind == "oni":
		katana = "tsukuyomi"
		oni_dead = true
		hud.banner("L'Oni de la Lune Rouge est tombé", "La lune pâlit.")
		Audio.sfx("oni", f.global_position, 4.0, 0.0)
		get_tree().create_timer(4.0, true, false, true).timeout.connect(func():
			state = "win"
			Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
			hud.show_victory(func(): hud.hide_screen(); state = "play"; Input.mouse_mode = Input.MOUSE_MODE_CAPTURED))
	if not drop.is_empty() or katana != "" or ryo > 0:
		_drop(f.global_position, drop, katana, ryo)
	hud.set_arsenal(arsenal)


## Le commandant d'Akagane est tombé : le fort est libre.
func _liberate() -> void:
	renown.fort_free = true
	stealth.reset()
	hud.banner("Le fort d'Akagane est libéré", "Les gens de l'Oni fuient. Hōjō saura ce que tu as fait.")
	_fame(25, "Akagane libéré")
	for e in enemies:
		if e.faction == "akagane" and e.alive and e.role == "guard":
			e.alert = "alerte"
			e.aggro = true


## La renommée monte (un toast et le titre qui change).
func _fame(n: int, why: String) -> void:
	if n == 0:
		return
	var before := renown.title()
	renown.fame += n
	if why != "":
		hud.toast("+%d renommée · %s" % [n, why], Hud.GOLD)
	if renown.title() != before:
		hud.banner(renown.title(), "Ta renommée grandit dans la vallée.")
	hud.set_renown(renown)


func _cleanup() -> void:
	for e in enemies.duplicate():
		if e.gone() and not cine.busy(e):
			if e.faction == "damnes":
				Fx.burst(self, e.global_position + Vector3(0, 0.4, 0), 50, Color(1.0, 0.42, 0.16), 2.0, 2.0, -2.0, 1.4, 2.0)
			enemies.erase(e)
			burning.erase(e)
			bleeding.erase(e)
			e.remove()


# ---------- Les techniques des maîtres ----------

func _techniques(dt: float) -> void:
	var a := player.action
	if not a.is_empty():
		# l'Hirondelle : un croissant de vent part de la lame
		if a.def.has("projectile_at") and a.t >= a.def.projectile_at and not a.get("fired", false):
			a.fired = true
			_crescent(player.global_position + Vector3(0, 1.2, 0) + player.forward() * 0.8, player.forward())
		# le Pas du Vent : ceux que l'on a traversés saignent un instant plus tard
		if a.def.get("dash", false) and a.t >= 0.42 and not a.get("cut", false):
			a.cut = true
			var from: Vector3 = a.get("start", player.global_position)
			var to := player.global_position
			for e in enemies:
				if not e.alive or not (e.hostile or e.aggro) or e == player:
					continue
				var p := Vector2(e.global_position.x, e.global_position.z)
				var s0 := Vector2(from.x, from.z)
				var s1 := Vector2(to.x, to.z)
				var ab := s1 - s0
				var t := clampf((p - s0).dot(ab) / maxf(ab.length_squared(), 0.001), 0.0, 1.0)
				if p.distance_to(s0 + ab * t) < 1.6:
					cuts.append({"target": e, "t": 0.35 + t * 0.15})
			Fx.burst(self, (from + to) / 2.0 + Vector3(0, 1.0, 0), 50, Color(0.7, 1.0, 0.9), 6.0, 2.0, 0.0, 0.6, 2.0)
	for c in cuts.duplicate():
		c.t -= dt
		if c.t <= 0.0:
			cuts.erase(c)
			var e: Fighter = c.target
			if is_instance_valid(e) and e.alive:
				var k := arsenal.katana()
				e.hp -= 48.0 * k.dmg
				e.posture += 45.0
				var chest: Vector3 = e.global_position + Vector3(0, 1.2, 0)
				Blood.spray(self, chest, player.forward() + Vector3(0, 0.4, 0), 70, 1.1)
				Audio.sfx("chair", chest)
				hitstop = 0.06
				_crime(e)
				if not _enemy_dead(e) and e.posture >= e.max_posture:
					e.posture = 0.0
					e.play("stagger")
	for pr in projectiles.duplicate():
		pr.life -= dt
		var step: Vector3 = pr.dir * 24.0 * dt
		pr.node.global_position += step
		for e in enemies:
			if not e.alive or pr.hits.has(e) or not (e.hostile or e.aggro):
				continue
			if e.global_position.distance_to(pr.node.global_position - Vector3(0, 1.0, 0)) < 1.7:
				pr.hits[e] = true
				var k := arsenal.katana()
				e.hp -= 36.0 * k.dmg
				e.posture += 40.0
				var chest: Vector3 = e.global_position + Vector3(0, 1.2, 0)
				Blood.spray(self, chest, pr.dir + Vector3(0, 0.3, 0), 50, 1.0)
				Audio.sfx("chair", chest, -2.0)
				_crime(e)
				if not _enemy_dead(e) and e.posture >= e.max_posture:
					e.posture = 0.0
					e.play("stagger")
		if pr.life <= 0.0:
			projectiles.erase(pr)
			var n: Node3D = pr.node
			var tw := n.create_tween()
			tw.tween_property(n, "scale", Vector3.ONE * 0.01, 0.15)
			tw.tween_callback(n.queue_free)


## Un croissant de vent lumineux, qui fauche à l'horizontale.
func _crescent(at: Vector3, dir: Vector3) -> void:
	var root := Node3D.new()
	add_child(root)
	root.global_position = at
	root.look_at(at + dir, Vector3.UP)
	var t := TorusMesh.new()
	t.inner_radius = 1.25
	t.outer_radius = 1.45
	t.rings = 24
	t.ring_segments = 6
	var m := StandardMaterial3D.new()
	m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	var c: Color = arsenal.katana().aura if arsenal.katana().aura != null else Color(0.75, 0.9, 1.0)
	m.albedo_color = Color(c.r * 2.2, c.g * 2.2, c.b * 2.2)
	t.material = m
	var mi := MeshInstance3D.new()
	mi.mesh = t
	mi.scale = Vector3(1.0, 0.12, 0.5)
	mi.position = Vector3(0, 0, -0.6)
	root.add_child(mi)
	var trail := CPUParticles3D.new()
	trail.amount = 40
	trail.lifetime = 0.4
	trail.local_coords = false
	trail.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	trail.emission_box_extents = Vector3(1.3, 0.05, 0.1)
	trail.gravity = Vector3.ZERO
	var q := QuadMesh.new(); q.size = Vector2(0.08, 0.08)
	var qm := StandardMaterial3D.new()
	qm.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	qm.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	qm.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	qm.albedo_color = m.albedo_color
	q.material = qm
	trail.mesh = q
	root.add_child(trail)
	projectiles.append({"node": root, "dir": dir.normalized(), "life": 0.85, "hits": {}})
	Audio.sfx("tourbillon", at, 2.0)


# ---------- Le butin, les coffres, les autels ----------

func _drop(at: Vector3, items: Dictionary, katana: String, ryo := 0) -> void:
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
	m.emission_energy_multiplier = 1.6
	orb.material_override = m
	add_child(orb)
	var ground := terrain.height_at(at.x, at.z)
	orb.global_position = Vector3(at.x, ground + 0.8, at.z)
	var light := OmniLight3D.new()
	light.light_color = c
	light.light_energy = 1.2
	light.omni_range = 4.0
	orb.add_child(light)
	pickups.append({"node": orb, "pos": orb.global_position, "items": items, "katana": katana, "ryo": ryo})


func _pickups() -> void:
	for p in pickups.duplicate():
		var n: Node3D = p.node
		n.position.y = p.pos.y + sin(time * 2.5) * 0.12
		if n.global_position.distance_to(player.global_position + Vector3(0, 0.8, 0)) < 1.6:
			_gain(p.items, p.katana, p.get("ryo", 0))
			n.queue_free()
			pickups.erase(p)


func _gain(items: Dictionary, katana: String, ryo := 0) -> void:
	for id in items:
		arsenal.add_item(id, items[id])
		hud.toast("+%d %s" % [items[id], Arsenal.ITEMS[id].name], Arsenal.ITEMS[id].color)
	if ryo > 0:
		arsenal.ryo += ryo
		hud.toast("+%d ryō" % ryo, Hud.GOLD)
		Audio.sfx("pieces", null, -6.0)
	elif not items.is_empty():
		Audio.sfx("objet", null, -6.0)
	if katana != "" and arsenal.add_katana(katana):
		var k: Dictionary = Arsenal.KATANAS[katana]
		hud.banner(k.name, k.desc + "\n%s pour l'équiper." % Settings.key_name("inventaire"))
		hud.toast("Nouveau katana : " + k.name, k.aura)
		Audio.sfx("technique", null, -4.0, 0.0)
	hud.set_arsenal(arsenal)


func _interact() -> void:
	var target := _interactable()
	if target.is_empty():
		return
	match target.kind:
		"assassinat":
			cine.assassinate(target.enemy)
			Audio.sfx("lame", player.global_position, -10.0)
		"finisher":
			cine.execute(target.enemy)
		"talk":
			_talk(target.npc)
		"registry":
			_open_registry()
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
			if is_instance_valid(c.glow):
				c.glow.queue_free()
			Audio.sfx("coffre", c.pos)
			var loot: Dictionary = CHEST_LOOT.get(c.place, {"items": {"sake": 1}})
			_gain(loot.get("items", {}), loot.get("katana", ""), loot.get("ryo", 0))
			Fx.burst(self, c.pos + Vector3(0, 0.9, 0), 50, Hud.GOLD, 3.0, 3.0, 2.0, 1.0, 3.0)
		"rack":
			var r: Dictionary = target.rack
			r.taken = true
			r.blades.visible = false
			Audio.sfx("degainer", r.pos)
			_gain({}, r.katana)
		"cage":
			_free_prisoners(target.cage)
		"bell":
			landmarks.bell.cut = true
			var rope: Node3D = landmarks.bell.rope
			var tw := create_tween()
			tw.tween_property(rope, "position:y", rope.position.y - 1.4, 0.4).set_trans(Tween.TRANS_QUAD).set_ease(Tween.EASE_IN)
			Audio.sfx("lame", landmarks.bell.pos, -2.0)
			hud.toast("Corde tranchée : la cloche d'Akagane ne sonnera plus.", Hud.GOLD)
		"shrine":
			player.hp = player.max_hp
			stamina = 100.0
			respawn = target.shrine.pos
			var saved := SaveGame.write(self)
			hud.toast("Tu te recueilles. Vie rendue, autel retenu%s." % (", partie sauvegardée" if saved else ""), Hud.GOLD)
			Fx.burst(self, target.shrine.pos + Vector3(0, 1.2, 0), 60, Color(1.0, 0.7, 0.4), 2.0, 3.0, -1.0, 1.4, 2.5)
			Audio.sfx("objet", null, -2.0)


## Ce qui est à portée de la touche d'action, le plus important d'abord.
func _interactable() -> Dictionary:
	var key := Settings.key_name("action")
	var ready: bool = player.action.is_empty() or player.action.def.has("combo") or player.action.def.get("gesture", false)
	if ready:
		for e in enemies:
			if e.alive and e.is_doing(["stagger"]) and e.flat_distance(player) < 2.8 and (e.hostile or e.duel) and not e.yielded:
				return {"kind": "finisher", "enemy": e, "text": "%s · Exécuter" % key}
		# l'assassinat : par-derrière, sans avoir été vu
		for e in enemies:
			if not e.alive or not e.hostile or e.duel or e.kind == "oni" or e.npc_id == "gonryu" or e.alert == "alerte" or e.aggro:
				continue
			var d: float = e.flat_distance(player)
			if d > 2.1:
				continue
			var behind: float = e.forward().angle_to((player.global_position - e.global_position) * Vector3(1, 0, 1))
			if behind > 1.9 or (player.sneaking and behind > 1.3):
				return {"kind": "assassinat", "enemy": e, "text": "%s · Assassiner" % key}
	for c in landmarks.cages:
		if not c.open and player.global_position.distance_to(c.pos) < 2.6:
			return {"kind": "cage", "cage": c, "text": "%s · Briser la cage" % key}
	if not landmarks.bell.is_empty() and not landmarks.bell.cut and player.global_position.distance_to(landmarks.bell.pos) < 2.6:
		return {"kind": "bell", "text": "%s · Trancher la corde de la cloche" % key}
	for r in landmarks.racks:
		if not r.taken and player.global_position.distance_to(r.pos) < 2.4:
			return {"kind": "rack", "rack": r, "text": "%s · Prendre %s" % [key, Arsenal.KATANAS[r.katana].name]}
	if not landmarks.registry.is_empty() and player.global_position.distance_to(landmarks.registry.pos) < 2.6:
		return {"kind": "registry", "text": "%s · Lire le Registre des Lames" % key}
	var best: Fighter = null
	var bd := 2.7
	for e in enemies:
		if not e.alive or e.role == "enemy" or (e.hostile and e.aggro) or e.duel or e.yielded:
			continue
		if e.faction == "akagane" and not e.get_meta("prisoner", false):
			continue
		var d: float = e.flat_distance(player)
		if d < bd and player.forward().angle_to((e.global_position - player.global_position) * Vector3(1, 0, 1)) < 1.4:
			bd = d
			best = e
	if best:
		return {"kind": "talk", "npc": best, "text": "%s · Parler à %s" % [key, best.display_name]}
	for d in landmarks.doors:
		if not d.open and player.global_position.distance_to(d.pos) < 2.4:
			return {"kind": "door", "door": d, "text": "%s · Enfoncer la porte" % key}
	for c in landmarks.chests:
		if not c.open and player.global_position.distance_to(c.pos) < 2.4:
			return {"kind": "chest", "chest": c, "text": "%s · Ouvrir le coffre" % key}
	for s in landmarks.shrines:
		if player.global_position.distance_to(s.pos) < 3.0:
			return {"kind": "shrine", "shrine": s, "text": "%s · Se recueillir (et sauvegarder)" % key}
	return {}


func _free_prisoners(c: Dictionary) -> void:
	c.open = true
	Audio.sfx("porte", c.pos)
	Fx.burst(self, c.pos + Vector3(0, 1.0, 0), 50, Color(0.55, 0.35, 0.2), 6.0, 2.0, 12.0, 0.7, 1.4, 0.1)
	renown.freed += 2
	_fame(10, "prisonniers libérés")
	for e in enemies:
		if e.get_meta("prisoner", false) and e.alive:
			e.remove_meta("prisoner")
			e.idle_clip = "repos"
			e.gesture("remercier")
			bark(e, "Merci, samouraï ! Que les dieux te gardent !")
			var gate := Vector3(130, 0, -70)
			e.set_meta("walker", true)
			e.set_meta("target", gate)
			e.wait_t = 2.5
			# ils rentrent à Hōjō : on ne les reverra plus ici
			dead_ids[e.get_meta("sid", "")] = true
			var who: Fighter = e
			get_tree().create_timer(14.0, false).timeout.connect(func():
				if is_instance_valid(who) and who.alive:
					enemies.erase(who)
					who.remove())


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
	if it.get("smoke", false):
		_smoke(player.global_position)
	if it.get("throw", false):
		_throw_pebble()
	else:
		Audio.sfx("boire" if id in ["sake", "the"] else "objet", null, -4.0)
	hud.toast(it.name, it.color)
	if not it.get("throw", false) and not it.get("smoke", false):
		Fx.burst(self, player.global_position + Vector3(0, 1.0, 0), 24, it.color, 1.5, 2.5, -1.0, 0.9, 2.0)
	hud.set_arsenal(arsenal)


## La bombe fumigène : un nuage où personne ne te voit ; les ennemis tout près titubent.
## Des volutes : des cartes douces qui gonflent, dérivent et s'effacent.
func _smoke(at: Vector3) -> void:
	smoke_at = at
	smoke_t = 8.0
	var soft := Gradient.new()
	soft.set_color(0, Color(1, 1, 1, 1))
	soft.set_color(1, Color(1, 1, 1, 0))
	var gt := GradientTexture2D.new()
	gt.gradient = soft
	gt.fill = GradientTexture2D.FILL_RADIAL
	gt.fill_from = Vector2(0.5, 0.5)
	gt.fill_to = Vector2(1.0, 0.5)
	for i in 22:
		var m := StandardMaterial3D.new()
		m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
		m.billboard_mode = BaseMaterial3D.BILLBOARD_ENABLED
		m.albedo_texture = gt
		var grey := randf_range(0.45, 0.62)
		m.albedo_color = Color(grey, grey, grey + 0.03, 0.0)
		var q := QuadMesh.new()
		q.size = Vector2(1.0, 1.0)
		var mi := MeshInstance3D.new()
		mi.mesh = q
		mi.material_override = m
		mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
		add_child(mi)
		var dir := Vector3(randf_range(-1, 1), randf_range(0.1, 0.8), randf_range(-1, 1)).normalized()
		mi.global_position = at + Vector3(0, 0.6, 0) + dir * 0.4
		mi.scale = Vector3.ONE * randf_range(0.8, 1.4)
		var big := randf_range(3.2, 5.2)
		var tw := mi.create_tween().set_parallel(true)
		tw.tween_property(mi, "global_position", at + Vector3(0, 0.9, 0) + dir * randf_range(2.0, 3.8), 1.6).set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_CUBIC)
		tw.tween_property(mi, "scale", Vector3.ONE * big, 2.2).set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_CUBIC)
		tw.tween_property(m, "albedo_color:a", 0.72, 0.35)
		tw.chain().tween_interval(4.5)
		tw.chain().tween_property(m, "albedo_color:a", 0.0, 2.5)
		tw.chain().tween_callback(mi.queue_free)
	Audio.sfx("porte", at, -6.0)
	for e in enemies:
		if not e.alive or not (e.hostile or e.aggro):
			continue
		if e.global_position.distance_to(at) < 5.0 and e.kind != "oni":
			e.play("stagger")
		if stealth.watched(e) and e.alert == "alerte":
			e.alert = "recherche"
			e.alert_t = 0.0
			e.last_seen = at + Vector3(randf_range(-6, 6), 0, randf_range(-6, 6))


## Le caillou : il tombe plus loin et attire les gardes qui l'entendent.
func _throw_pebble() -> void:
	var f := Vector3(sin(cam_yaw), 0, cos(cam_yaw))
	var to := player.global_position + f * 12.0
	to.y = terrain.height_at(to.x, to.z)
	var hit := get_world_3d().direct_space_state.intersect_ray(PhysicsRayQueryParameters3D.create(player.global_position + Vector3(0, 1.4, 0), to + Vector3(0, 0.3, 0), 1 | Landmarks.WALL_LAYER))
	if not hit.is_empty():
		to = hit.position
	var rock := MeshInstance3D.new()
	var s := SphereMesh.new(); s.radius = 0.06; s.height = 0.1
	rock.mesh = s
	add_child(rock)
	var from := player.global_position + Vector3(0, 1.5, 0)
	rock.global_position = from
	player.gesture("pointer")
	var tw := create_tween()
	tw.tween_method(func(u: float):
		rock.global_position = from.lerp(to, u) + Vector3(0, sin(u * PI) * 3.0, 0), 0.0, 1.0, 0.7)
	tw.tween_callback(func():
		Audio.sfx("reception", to, 4.0, 0.2)
		for e in enemies:
			if stealth.watched(e) and e.alive and e.alert in ["calme", "doute"] and e.global_position.distance_to(to) < 15.0:
				e.alert = "doute"
				e.suspicion = maxf(e.suspicion, 0.45)
				e.last_seen = to
				e.wait_t = 0.0
				bark(e, "Hein ? Ça venait de là-bas…")
		rock.queue_free())


# ---------- Parler, commercer, défier ----------

func _talk(npc: Fighter) -> void:
	talking_to = npc
	npc.talking = true
	npc.idle_override = "parler"
	renown.met[npc.npc_id if npc.npc_id != "" else str(npc.get_meta("sid", ""))] = true
	state = "talk"
	player.sneaking = false
	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	hud.play_ui.visible = false
	hud.letterbox(true)
	dialogue.show_node(Dialogues.node(npc, "start", self))


func _on_choice(go: String) -> void:
	var npc := talking_to
	if not go.begins_with("@"):
		npc.gesture(["parler", "acquiescer", "reflechir"].pick_random() if npc.role != "guard" else "acquiescer")
		dialogue.show_node(Dialogues.node(npc, go, self))
		return
	_end_talk()
	match go:
		"@shop":
			state = "shop"
			Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
			hud.play_ui.visible = false
			shop_view.open(self)
		"@registry":
			_open_registry()
		"@duel":
			_start_duel(npc)
		"@fine":
			var f := renown.fine()
			if arsenal.ryo >= f:
				arsenal.ryo -= f
				renown.infamy = 0
				renown.hojo_alarm = 0.0
				Audio.sfx("pieces")
				hud.toast("Amende payée : %d ryō. Hōjō oublie." % f, Hud.GOLD)
				hud.set_arsenal(arsenal)
				hud.set_renown(renown)
			else:
				hud.toast("Tu n'as pas assez de ryō (%d)." % f, Hud.BLOOD)
		"@gift":
			renown.met["gensai_gift"] = true
			_gain({"the": 2, "encens": 1}, "")
			bark(npc, "Prends. Le thé tient éveillé, l'encens tient en vie.")
		"@free":
			for c in landmarks.cages:
				if not c.open:
					_free_prisoners(c)
					break


func _end_talk() -> void:
	if is_instance_valid(talking_to):
		talking_to.talking = false
		talking_to.idle_override = ""
	dialogue.visible = false
	hud.letterbox(false)
	state = "play"
	hud.play_ui.visible = true
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED


func _open_registry() -> void:
	state = "registry"
	Input.mouse_mode = Input.MOUSE_MODE_VISIBLE
	hud.play_ui.visible = false
	registry_view.open(self)


## Un samouraï marqué au Registre : un repère sur la carte, là où il se tient.
func _mark_samurai(id: String) -> void:
	var spot: String = Renown.SAMURAI[id].spot
	if landmarks.spots.has(spot):
		set_waypoint(landmarks.spots[spot])
		hud.toast("Repère : %s" % Renown.SAMURAI[id].name, Hud.GOLD)


## Le duel : on se salue, puis on se bat jusqu'à ce que l'un cède.
func _start_duel(npc: Fighter) -> void:
	duel = {"npc": npc, "phase": "salut", "t": 0.0}
	# on se retrouve dans la grand-rue, à cinq pas l'un de l'autre
	var arena: Vector3 = landmarks.spots.get("arene", npc.global_position)
	var d := Vector3(0, 0, 1)
	npc.global_position = arena - d * 2.5 + Vector3(0, 0.3, 0)
	player.global_position = arena + d * 2.5 + Vector3(0, 0.3, 0)
	player.yaw = PI
	npc.yaw = 0.0
	cam_yaw = PI
	_cam_pos = player.global_position + Vector3(0, 3, 5)
	_panic_watch(arena)
	npc.hp = npc.max_hp
	npc.posture = 0.0
	npc.yielded = false
	npc.action = {}
	player.action = {}
	player.hp = player.max_hp
	stamina = 100.0
	player.gesture("salut")
	npc.gesture("salut")
	var s: Dictionary = Renown.SAMURAI[npc.npc_id]
	hud.banner("Duel", "%s, %s · %s" % [s.name, s.title, s.style])
	Audio.sfx("technique", null, -2.0, 0.0)


func _duel_step(dt: float) -> void:
	if duel.is_empty():
		return
	duel.t += dt
	var npc: Fighter = duel.npc
	if not is_instance_valid(npc):
		duel = {}
		return
	if duel.phase == "salut" and duel.t > 2.6:
		duel.phase = "fight"
		npc.duel = true
		npc.hostile = true
		npc.aggro = true
		npc.sheathed = false
		Audio.sfx("degainer", npc.global_position)
		hud.callout("Hajime !", Hud.BLOOD)
	elif duel.phase == "fin" and duel.t > 2.8:
		var win: bool = duel.win
		duel = {}
		npc.yielded = false
		npc.action = {}
		npc.hp = npc.max_hp
		if win:
			_talk(npc)


func _end_duel(win: bool) -> void:
	if duel.is_empty() or duel.phase != "fight":
		return
	var npc: Fighter = duel.npc
	duel.phase = "fin"
	duel.t = 0.0
	duel.win = win
	npc.duel = false
	npc.hostile = false
	npc.aggro = false
	npc.sheathed = true
	slowmo = 1.0
	var s: Dictionary = Renown.SAMURAI[npc.npc_id]
	if win:
		renown.beaten[npc.npc_id] = true
		var rw: Dictionary = s.reward
		arsenal.ryo += rw.ryo
		hud.banner("Victoire", "%s s'incline. Ton nom monte au Registre." % s.name)
		Audio.sfx("grace", null, -2.0, 0.0)
		hud.toast("+%d ryō" % rw.ryo, Hud.GOLD)
		if rw.has("tech") and arsenal.learn(rw.tech):
			var t: Dictionary = Arsenal.TECHNIQUES[rw.tech]
			hud.toast("Technique : %s%s" % [t.name, (" [%s]" % Settings.key_name(_tech_action(rw.tech))) if t.key != "" else " (passive)"], Hud.GOLD)
		if rw.has("katana"):
			_gain({}, rw.katana)
		_fame(rw.fame, "duel gagné")
		hud.set_arsenal(arsenal)
	else:
		npc.gesture("salut")
		hud.banner("Défaite", "%s rengaine. « Reviens quand ta lame sera prête. »" % s.name)


func _tech_action(id: String) -> String:
	return {"tourbillon": "tech1", "iai": "tech2", "hirondelle": "tech3", "pas_vent": "tech4", "petales": "tech5"}.get(id, "")


## Une réplique au-dessus de la tête de quelqu'un, qui s'efface.
func bark(f: Fighter, text: String) -> void:
	if not is_instance_valid(f):
		return
	var l: Label3D = _barks.get(f)
	if l == null or not is_instance_valid(l):
		l = Label3D.new()
		l.billboard = BaseMaterial3D.BILLBOARD_ENABLED
		l.font_size = 42
		l.pixel_size = 0.005
		l.outline_size = 10
		l.outline_modulate = Color(0, 0, 0, 0.85)
		l.modulate = Hud.PAPER
		l.no_depth_test = true
		add_child(l)
		_barks[f] = l
	l.text = text
	l.set_meta("t", 3.0)


func _bark_tick(dt: float) -> void:
	for f in _barks.keys():
		var l: Label3D = _barks[f]
		if not is_instance_valid(f) or not is_instance_valid(l):
			if is_instance_valid(l):
				l.queue_free()
			_barks.erase(f)
			continue
		var t: float = l.get_meta("t") - dt
		l.set_meta("t", t)
		l.global_position = f.global_position + Vector3(0, 2.15 * f.rig.body_scale, 0)
		l.modulate.a = clampf(t, 0.0, 1.0)
		if t <= 0.0:
			l.queue_free()
			_barks.erase(f)


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
	if player.global_position.distance_to(_last_reveal) > 3.0:
		_last_reveal = player.global_position
		_reveal(player.global_position, 42.0)
	if has_waypoint and Vector2(player.global_position.x, player.global_position.z).distance_to(Vector2(waypoint.x, waypoint.z)) < 8.0:
		has_waypoint = false
		hud.toast("Repère atteint", Hud.GOLD)
	var pp := Vector2(player.global_position.x, player.global_position.z)
	for p in places:
		if pp.distance_to(p.pos) < p.radius:
			_discover(p)
	zone = {}
	for z in landmarks.zones:
		var d: Vector2 = (pp - z.center).abs()
		if d.x < z.size.x + 4.0 and d.y < z.size.y + 4.0:
			zone = z
	# avec le temps, Hōjō oublie un peu
	_infamy_decay += get_physics_process_delta_time()
	if _infamy_decay > 60.0:
		_infamy_decay = 0.0
		if renown.infamy > 0 and not renown.hojo_hostile():
			renown.infamy -= 1
	# la lame tirée en ville : les gardes le remarquent
	if zone.get("id", "") == "hojo" and not player.sheathed and not renown.hojo_hostile() and duel.is_empty():
		for e in enemies:
			if e.role == "guard" and e.faction == "hojo" and e.alive and e.flat_distance(player) < 6.0 and time > float(e.get_meta("warn_t", -99.0)) + 20.0:
				e.set_meta("warn_t", time)
				bark(e, "Rengaine ta lame, étranger. Pas de sabre tiré dans Hōjō.")
	var it := _interactable()
	if it.is_empty() and player.action.is_empty():
		var mv := Vector3(sin(cam_yaw), 0, cos(cam_yaw)) * Input.get_axis("arriere", "avant") + Vector3(-cos(cam_yaw), 0, sin(cam_yaw)) * Input.get_axis("gauche", "droite")
		if not _wall_ahead(mv).is_empty():
			it = {"text": "%s · Enjamber le muret" % Settings.key_name("esquive")}
	hud.prompt(it.get("text", "") if state == "play" and Settings.value("jeu", "aide") else "")
	# on ne tombe pas hors du monde
	if player.global_position.y < terrain.height_at(player.global_position.x, player.global_position.z) - 3.0:
		player.global_position.y = terrain.height_at(player.global_position.x, player.global_position.z) + 1.0
	var lim := Terrain.SIZE / 2 - 20.0
	player.global_position.x = clampf(player.global_position.x, -lim, lim)
	player.global_position.z = clampf(player.global_position.z, -lim, lim)


# ---------- La sauvegarde ----------

func _load_game() -> void:
	var d := SaveGame.read()
	get_tree().paused = false
	pause_menu.visible = false
	if d.is_empty():
		hud.toast("Aucune sauvegarde.", Hud.BLOOD)
		return
	_start(d)
	hud.banner("Partie reprise", d.get("date", ""))


func _apply_save(d: Dictionary) -> void:
	var a: Dictionary = d.get("arsenal", {})
	for k in a.get("items", {}):
		arsenal.items[k] = int(a.items[k])
	arsenal.katanas.assign(a.get("katanas", ["ronin"]))
	arsenal.souls = int(a.get("souls", 0))
	arsenal.learned.assign(a.get("learned", []))
	arsenal.ryo = int(a.get("ryo", 0))
	_equip(a.get("equipped", "ronin"))
	renown.from_dict(d.get("renown", {}))
	for id in d.get("discovered", []):
		discovered[id] = true
	if d.has("fog"):
		var raw := Marshalls.base64_to_raw(d.fog)
		if raw.size() == fog_image.get_data().size():
			fog_image.set_data(128, 128, false, Image.FORMAT_L8, raw)
			fog_texture.update(fog_image)
	for i in d.get("chests", []):
		var c: Dictionary = landmarks.chests[int(i)]
		c.open = true
		c.lid.rotation.x = -1.9
		if is_instance_valid(c.glow):
			c.glow.queue_free()
	for i in d.get("doors", []):
		landmarks.break_door(landmarks.doors[int(i)], Vector3.FORWARD)
	for i in d.get("racks", []):
		landmarks.racks[int(i)].taken = true
		landmarks.racks[int(i)].blades.visible = false
	for i in d.get("cages", []):
		landmarks.cages[int(i)].open = true
	landmarks.bell.cut = bool(d.get("bell_cut", false))
	oni_dead = bool(d.get("oni_dead", false))
	time = float(d.get("time", 0.0))
	for sid in d.get("dead", []):
		dead_ids[sid] = true
	for e in enemies.duplicate():
		if dead_ids.has(e.get_meta("sid", "")):
			enemies.erase(e)
			e.remove()
	respawn = SaveGame.vec(d.get("respawn", [respawn.x, respawn.y, respawn.z]))
	var pl: Dictionary = d.get("player", {})
	player.global_position = SaveGame.vec(pl.get("pos", [respawn.x, respawn.y, respawn.z])) + Vector3(0, 0.3, 0)
	player.yaw = float(pl.get("yaw", PI))
	cam_yaw = player.yaw
	player.hp = float(pl.get("hp", player.max_hp))


# ---------- La caméra ----------

func _camera(real: float) -> void:
	if cine.camera(real):
		return
	if state == "talk" and is_instance_valid(talking_to):
		# le dialogue : par-dessus l'épaule, sur le visage de celui qui parle
		var n := talking_to
		var d := (player.global_position - n.global_position) * Vector3(1, 0, 1)
		d = d.normalized() if d.length_squared() > 0.01 else Vector3.BACK
		var side := Vector3(d.z, 0, -d.x)
		var head := n.global_position + Vector3(0, 1.5 * n.rig.body_scale, 0)
		var want := player.global_position + d * 1.5 + side * 0.75 + Vector3(0, 1.75, 0)
		# rien entre la caméra et le visage : sinon on se rapproche
		var q := PhysicsRayQueryParameters3D.create(head, want, 1)
		var hit := get_world_3d().direct_space_state.intersect_ray(q)
		if hit:
			want = head.lerp(hit.position, 0.85)
		_cam_pos = _cam_pos.lerp(want, 1.0 - exp(-real * 4.0))
		_cam_look = _cam_look.lerp(n.global_position + Vector3(0, 1.5 * n.rig.body_scale, 0), 1.0 - exp(-real * 5.0))
		camera.global_position = _cam_pos
		camera.look_at(_cam_look)
		return
	var dist := 5.4 if not player.sneaking else 4.4
	var f := Vector3(sin(cam_yaw), 0, cos(cam_yaw))
	var target := player.global_position + Vector3(0, 1.4 if not player.sneaking else 1.05, 0)
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
	var c := Vector3(-150, 0, 72)
	var at := c + Vector3(sin(t) * 55.0, 0, cos(t) * 55.0)
	at.y = terrain.height_at(at.x, at.z) + 16.0
	camera.global_position = at
	camera.look_at(Vector3(c.x, terrain.height_at(c.x, c.z) + 4.0, c.z))
