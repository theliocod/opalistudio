## Les réglages : affichage, qualité, jeu, son et touches. Gardés dans
## user://reglages.cfg et appliqués à chaud.
class_name Settings
extends RefCounted

const PATH := "user://reglages.cfg"
const VERSION := 2              # 2 : les Mac démarrent en qualité moyenne
const QUALITY := ["Basse", "Moyenne", "Haute", "Ultra"]
const AA := ["Aucun", "FXAA", "MSAA ×2", "MSAA ×4", "TAA"]
const MODES := ["Fenêtré", "Plein écran", "Plein écran exclusif"]
const FPS := [0, 30, 60, 120, 144, 240]
const CONES := ["toujours", "accroupi", "jamais"]
## Les actions que l'on peut réassigner, et leur nom à l'écran
const ACTIONS := [
	["avant", "Avancer"], ["arriere", "Reculer"], ["gauche", "Aller à gauche"], ["droite", "Aller à droite"],
	["rapide", "Coup rapide"], ["lourd", "Coup lourd"], ["pied", "Coup de pied"], ["tournoyant", "Coup tournoyant"],
	["garde", "Parer, garder"], ["esquive", "Esquive, roulade, enjamber"], ["accroupi", "S'accroupir"], ["action", "Interagir, achever, assassiner"],
	["tech1", "Tourbillon de cendres"], ["tech2", "Iai : Éclair pourpre"], ["tech3", "Retour de l'Hirondelle"], ["tech4", "Pas du Vent"], ["tech5", "Mille Pétales"],
	["objet1", "Saké"], ["objet2", "Onigiri"], ["objet3", "Thé"], ["objet4", "Encens"], ["objet5", "Bombe fumigène"], ["objet6", "Caillou"],
	["objet7", "Fiole d'huile"], ["objet8", "Bandage"], ["objet9", "Pierre à aiguiser"], ["objet10", "Gourde"],
	["inventaire", "Inventaire"], ["carte", "Carte"], ["pause", "Menu"],
]
const DEFAULTS := {
	"affichage": {"mode": 0, "vsync": true, "fps": 0, "echelle": 1.0, "qualite": 2, "aa": 2, "fov": 58.0, "luminosite": 1.1, "herbe": 1.0},
	"jeu": {"sensibilite": 1.0, "inverser": false, "secousses": 1.0, "sang": true, "cones": 1, "aide": true},
	"audio": {"general": 0.9, "musique": 0.65, "effets": 0.9, "ambiance": 0.8},
}

static var data := {}
static var keys := {}           # action → [événements], si réassignées


static func value(section: String, key: String):
	if data.is_empty():
		load_cfg()
	return data.get(section, {}).get(key, DEFAULTS[section][key])


static func put(section: String, key: String, v) -> void:
	if data.is_empty():
		load_cfg()
	if not data.has(section):
		data[section] = {}
	data[section][key] = v


static func load_cfg() -> void:
	data = {}
	for s in DEFAULTS:
		data[s] = DEFAULTS[s].duplicate()
	# les pilotes graphiques des Mac supportent mal la qualité haute : on part de la moyenne
	var mac := OS.get_name() == "macOS"
	if mac:
		data.affichage.qualite = 1
		data.affichage.aa = 1
	var cf := ConfigFile.new()
	if cf.load(PATH) != OK:
		return
	for s in DEFAULTS:
		for k in DEFAULTS[s]:
			data[s][k] = cf.get_value(s, k, data[s][k])
	if mac and int(cf.get_value("meta", "version", 1)) < 2:
		data.affichage.qualite = mini(int(data.affichage.qualite), 1)
		data.affichage.aa = mini(int(data.affichage.aa), 1)
		save_cfg()
	for a in ACTIONS:
		if cf.has_section_key("touches", a[0]):
			keys[a[0]] = cf.get_value("touches", a[0])


static func save_cfg() -> void:
	var cf := ConfigFile.new()
	for s in data:
		for k in data[s]:
			cf.set_value(s, k, data[s][k])
	for a in keys:
		cf.set_value("touches", a, keys[a])
	cf.set_value("meta", "version", VERSION)
	cf.save(PATH)


## Une touche réassignée : on la garde sous une forme simple (clavier ou souris).
static func bind(action: String, ev: InputEvent) -> void:
	var list := []
	if ev is InputEventKey:
		list = [["key", ev.physical_keycode if ev.physical_keycode != 0 else ev.keycode]]
	elif ev is InputEventMouseButton:
		list = [["mouse", ev.button_index]]
	else:
		return
	keys[action] = list
	_apply_keys()
	save_cfg()


static func _apply_keys() -> void:
	for a in keys:
		if not InputMap.has_action(a):
			continue
		InputMap.action_erase_events(a)
		for e in keys[a]:
			if e[0] == "key":
				var k := InputEventKey.new()
				k.physical_keycode = e[1]
				InputMap.action_add_event(a, k)
			else:
				var m := InputEventMouseButton.new()
				m.button_index = e[1]
				InputMap.action_add_event(a, m)


## Le nom à l'écran de la touche d'une action, sur le clavier du joueur (AZERTY compris).
static func key_name(action: String) -> String:
	if not InputMap.has_action(action):
		return "?"
	var names := []
	for ev in InputMap.action_get_events(action):
		if ev is InputEventKey:
			var code: int = ev.physical_keycode
			var local: int = DisplayServer.keyboard_get_keycode_from_physical(code) if code != 0 else ev.keycode
			names.append(OS.get_keycode_string(local).replace("Shift", "Maj").replace("Space", "Espace").replace("Escape", "Échap")
				.replace("Left", "←").replace("Right", "→").replace("Up", "↑").replace("Down", "↓").replace("Ctrl", "Ctrl"))
		elif ev is InputEventMouseButton:
			names.append({MOUSE_BUTTON_LEFT: "Clic gauche", MOUSE_BUTTON_RIGHT: "Clic droit", MOUSE_BUTTON_MIDDLE: "Clic molette"}.get(ev.button_index, "Souris %d" % ev.button_index))
	return " / ".join(names) if not names.is_empty() else "—"


## Applique tout : la fenêtre, la qualité, le son, les touches.
static func apply(game) -> void:
	if data.is_empty():
		load_cfg()
	match int(value("affichage", "mode")):
		0: DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_WINDOWED)
		1: DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_FULLSCREEN)
		2: DisplayServer.window_set_mode(DisplayServer.WINDOW_MODE_EXCLUSIVE_FULLSCREEN)
	DisplayServer.window_set_vsync_mode(DisplayServer.VSYNC_ENABLED if value("affichage", "vsync") else DisplayServer.VSYNC_DISABLED)
	Engine.max_fps = int(value("affichage", "fps"))
	var vp: Viewport = game.get_viewport()
	var scale: float = value("affichage", "echelle")
	vp.scaling_3d_mode = Viewport.SCALING_3D_MODE_FSR2 if scale < 0.99 else Viewport.SCALING_3D_MODE_BILINEAR
	vp.scaling_3d_scale = scale
	var aa := int(value("affichage", "aa"))
	vp.msaa_3d = [Viewport.MSAA_DISABLED, Viewport.MSAA_DISABLED, Viewport.MSAA_2X, Viewport.MSAA_4X, Viewport.MSAA_DISABLED][aa]
	vp.screen_space_aa = Viewport.SCREEN_SPACE_AA_FXAA if aa == 1 else Viewport.SCREEN_SPACE_AA_DISABLED
	vp.use_taa = aa == 4
	var q := int(value("affichage", "qualite"))
	if game.atmosphere and game.atmosphere.env:
		var env: Environment = game.atmosphere.env
		env.ssao_enabled = q >= 1
		env.ssil_enabled = q >= 3
		env.volumetric_fog_enabled = q >= 2
		env.glow_enabled = true
		env.tonemap_exposure = float(value("affichage", "luminosite"))
		game.atmosphere.moon.shadow_enabled = true
		game.atmosphere.moon.directional_shadow_max_distance = [40.0, 70.0, 90.0, 140.0][q]
	RenderingServer.directional_shadow_atlas_set_size([1024, 2048, 4096, 8192][q], true)
	vp.positional_shadow_atlas_size = [1024, 2048, 4096, 8192][q]
	if game.landmarks:
		game.landmarks.max_shadows = [1, 3, 5, 8][q]
	if game.camera:
		game.camera.fov = float(value("affichage", "fov"))
	if game.vegetation and game.vegetation.grass:
		var mm: MultiMesh = game.vegetation.grass.multimesh
		mm.visible_instance_count = int(mm.instance_count * clampf(float(value("affichage", "herbe")) * [0.35, 0.6, 1.0, 1.0][q], 0.0, 1.0))
	Audio.set_volume("Master", value("audio", "general"))
	Audio.set_volume("Musique", value("audio", "musique"))
	Audio.set_volume("Effets", value("audio", "effets"))
	Audio.set_volume("Ambiance", value("audio", "ambiance"))
	Blood.enabled = bool(value("jeu", "sang"))
	if game.stealth:
		game.stealth.show_cones = CONES[int(value("jeu", "cones"))]
	_apply_keys()
