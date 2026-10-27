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
	# Les duellistes : des coups plus vifs, plus difficiles à lire
	"quick": {"dur": 0.8, "windup": 0.36, "active": [0.38, 0.5], "dmg": 16, "keys": [[0, {}], [0.36, P.wind2], [0.5, P.end2], [0.8, {}]]},
	"lunge": {"dur": 1.1, "windup": 0.5, "active": [0.52, 0.66], "dmg": 24, "lunge": [0.46, 0.66, 16], "arc": 0.8, "reach": 2.6, "keys": [[0, {}], [0.48, P.windT], [0.66, P.endT], [1.1, {}]]},
	# la roulade : l'élan vient de l'animation ; intouchable pendant qu'on roule
	"roulade": {"clip": "roulade", "from": 0.12, "to": 1.08, "speed": 1.45, "iframes": [0.03, 0.42]},
	# l'assassinat : on saisit par-derrière et la lame entre sous les côtes
	"assassinat": {"dur": 1.7, "silent": true, "keys": [
		[0, {}], [0.25, {"shL": [-1.6, -0.3, 0.2], "elL": [-1.3, 0, 0], "shR": [-0.4, 0.4, -0.2], "elR": [-1.7, 0, 0], "wrR": [1.3, 0, 0], "chest": [0.15, -0.4, 0], "hipsY": -0.12}],
		[0.7, {"shL": [-1.7, -0.2, 0.25], "elL": [-1.4, 0, 0], "shR": [-0.2, 0.6, -0.4], "elR": [-2.0, 0, 0], "wrR": [1.6, 0, 0], "chest": [0.2, -0.6, 0], "hipsY": -0.2}],
		[0.86, {"shL": [-1.7, -0.2, 0.25], "elL": [-1.4, 0, 0], "shR": [-1.25, 0.1, 0.1], "elR": [-0.35, 0, 0], "wrR": [1.5, 0, 0], "chest": [0.3, 0.2, 0], "hipsY": -0.26}],
		[1.35, {"shL": [-0.6, -0.2, 0.2], "elL": [-0.6, 0, 0], "shR": [-1.1, 0.2, 0.1], "elR": [-0.4, 0, 0], "wrR": [1.4, 0, 0], "chest": [0.35, 0.1, 0], "hipsY": -0.3}],
		[1.7, {}]]},
	"assassine": {"dur": 2.4, "hold": true, "keys": [[0, {}], [0.25, {"head": [-0.6, 0, 0], "neck": [-0.4, 0, 0], "chest": [-0.35, 0, 0], "shR": [0.3, 0, -0.7], "shL": [0.3, 0, 0.7]}],
		[0.85, {"head": [-0.75, 0, 0], "neck": [-0.4, 0, 0], "chest": [-0.5, 0, 0], "shR": [0.2, 0, -0.9], "shL": [0.2, 0, 0.9], "hipsY": -0.05}],
		[1.4, {"head": [0.4, 0, 0], "chest": [0.5, 0, 0], "spine": [0.3, 0, 0], "shR": [0.3, 0, -0.3], "shL": [0.3, 0, 0.3], "hipsY": -0.45, "hipL": [-1.2, 0, 0], "knL": [1.8, 0, 0], "hipR": [-1.0, 0, 0], "knR": [1.9, 0, 0]}],
		[2.4, P.dead]]},
	# Les techniques des maîtres du Registre
	"pas_vent": {"dur": 0.7, "lunge": [0.05, 0.42, 24], "iframes": [0.0, 0.55], "dash": true, "keys": [
		[0, {}], [0.05, {"chest": [0.5, -0.5, 0], "shR": [-0.3, 0.5, -0.6], "elR": [-0.2, 0, 0], "wrR": [1.2, 0, 0], "hipsY": -0.3,
			"hipL": [-0.9, 0, 0], "knL": [1.0, 0, 0], "hipR": [0.4, 0, 0], "knR": [0.6, 0, 0], "shL": [0.3, 0, 0.5]}],
		[0.42, P.end1], [0.7, {}]]},
	"petales": {"dur": 1.55, "multi": [[0.08, 0.17], [0.3, 0.39], [0.52, 0.61], [0.74, 0.83], [0.96, 1.05], [1.2, 1.32]], "dmg": 13, "posture": 14,
		"lunge": [0.0, 1.3, 2.2], "arc": 1.6, "keys": [[0, {}], [0.07, P.wind1], [0.17, P.end1], [0.29, P.wind2], [0.39, P.end2], [0.51, P.wind3], [0.61, P.end3],
		[0.73, P.wind1], [0.83, P.end1], [0.95, P.wind2], [1.05, P.end2], [1.18, P.windH], [1.32, P.endH], [1.55, {}]]},
	"hirondelle": {"dur": 0.9, "projectile_at": 0.36, "keys": [[0, {}], [0.3, P.windH], [0.42, P.endH], [0.9, {}]]},
	# l'exécution du dégainé : on traverse, on s'arrête, on rengaine lentement
	"iai_exec": {"dur": 2.6, "lunge": [0.08, 0.3, 24], "iframes": [0.0, 2.6], "keys": [
		[0, {}], [0.07, P.windT], [0.3, P.end1], [0.9, P.end1],
		[1.6, {"shR": [-0.9, 0.5, 0.1], "elR": [-1.2, 0, 0], "wrR": [0.9, 0.3, 0], "shL": [-0.5, -0.5, 0.2], "elL": [-1.2, 0, 0], "hipsY": -0.2, "chest": [0.1, 0.2, 0]}],
		[2.6, {}]]},
}
static var CLIPS := {}
## Toutes les animations Mixamo converties (anims/<nom>.json)
const CLIP_FILES := ["spin-kick", "dying", "tourbillon", "revers", "degainer", "pied-direct", "saut", "repos", "marche", "course",
	"furtif", "acquiescer", "refuser", "triste", "salut", "accueil", "seiza", "priere", "parler", "ecouter", "reflechir", "pointer",
	"applaudir", "victoire", "assis", "assis-sol", "vieux", "vieux-marche", "femme", "femme-marche", "guet", "boire", "peur",
	"cueillir", "comptoir", "accroupi", "accroupi-marche", "touche", "renverse", "relever", "mort-arriere", "genoux", "roulade",
	"bloquer", "blesse", "pas-de-loup", "remercier", "agace"]
## Les gestes : une animation jouée en entier, comme une action.
## [début, fin (-1 : jusqu'au bout), vitesse, tenue à la fin]
const GESTURES := {
	"salut": [0.0, -1, 1.15, false], "accueil": [0.0, 3.2, 1.0, false], "parler": [0.0, -1, 1.0, false], "ecouter": [0.0, -1, 1.0, false],
	"reflechir": [0.0, 3.0, 1.0, false], "pointer": [0.2, 2.6, 1.2, false], "applaudir": [0.0, -1, 1.0, false], "victoire": [0.0, -1, 1.0, false],
	"acquiescer": [0.0, -1, 1.0, false], "refuser": [0.0, -1, 1.0, false], "peur": [0.0, 3.5, 1.0, false], "touche": [0.1, 1.3, 1.4, false],
	"remercier": [0.0, -1, 1.0, false], "agace": [0.0, -1, 1.0, false],
	"genoux": [0.0, -1, 1.3, true], "renverse": [0.0, -1, 1.25, true], "relever": [4.6, -1, 1.6, false], "mort-arriere": [0.0, -1, 1.2, true],
}
## La longueur d'une foulée (en m) de chaque marche, pour que les pieds ne glissent pas
const STRIDE := {"marche": 1.5, "femme-marche": 1.4, "vieux-marche": 1.05, "accroupi-marche": 1.7, "blesse": 1.1, "pas-de-loup": 1.3}
## Vie et posture de chacun
const STATS := {
	"player": [100, 0], "ronin": [70, 50], "chef": [150, 80], "oni": [340, 120],
	"garde": [90, 60], "paysan": [40, 10], "villageoise": [35, 10], "marchand": [45, 10],
	"noble": [320, 150], "moine": [300, 170], "onnamusha": [250, 120], "jubei": [240, 110], "kojiro": [280, 130], "oyuki": [200, 100],
}
const DAMNED := ["ronin", "chef", "oni"]

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
var sneaking := false          # accroupi, pour l'infiltration
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
# Les gens des villes
var role := "enemy"            # player | enemy | guard | civil | merchant | samurai
var faction := "damnes"        # damnes | hojo | akagane
var hostile := true            # se bat-il contre le joueur quand il est en alerte ?
var armed := true              # porte-t-il une lame ?
var npc_id := ""
var display_name := ""
var idle_clip := "repos"
var walk_clip := "marche"
var idle_override := ""        # un geste qui tourne en boucle (parler, pendant un dialogue)
var route: Array = []          # la ronde : des points au sol
var route_i := 0
var wait_t := 0.0
var post_yaw := 0.0            # le regard au repos, à son poste
var alert := "calme"           # calme | doute | alerte | recherche
var suspicion := 0.0
var last_seen := Vector3.ZERO
var alert_t := 0.0
var talking := false
var duel := false
var yielded := false
var fear_t := 0.0
var parry_chance := 0.0
var action_speed := 1.0        # les coups du joueur, plus vifs avec Kazekiri


static func load_clips() -> void:
	if not CLIPS.is_empty():
		return
	for name in CLIP_FILES:
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
	for g in GESTURES:
		if CLIPS.has(g):
			var d: Array = GESTURES[g]
			ACTIONS[g] = {"clip": g, "from": d[0], "to": CLIPS[g].duration if d[1] < 0 else d[1], "speed": d[2], "hold": d[3], "gesture": true}
	for a in ACTIONS.values():
		if a.has("clip"):
			a.dur = absf(a.to - a["from"]) / absf(a.speed)


func _init(k: String) -> void:
	kind = k
	load_clips()
	var stats: Array = STATS.get(kind, [80, 50])
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
	# les personnages sont sur la couche 2 seulement : l'ombre portée à leurs pieds
	# (un décalque sur la couche 1) assombrit le sol, pas leurs jambes
	for g in find_children("*", "GeometryInstance3D", true, false):
		g.layers = 2
		# les gens au loin disparaissent dans la brume : la carte graphique respire
		if kind != "player":
			g.visibility_range_end = 150.0
			g.visibility_range_end_margin = 10.0
			g.visibility_range_fade_mode = GeometryInstance3D.VISIBILITY_RANGE_FADE_SELF
	trail = Trail.new(Color(0.75, 0.9, 1.0) if kind == "player" else Color(1.0, 0.23, 0.16))
	add_child(trail)
	_contact_shadow()


## L'ombre de contact : une tache douce sous les pieds, qui pose le personnage
## sur le sol même là où aucune lumière ne projette d'ombre.
static var _blob_tex: Texture2D
var blob: Decal


func _contact_shadow() -> void:
	if _blob_tex == null:
		var g := Gradient.new()
		g.set_color(0, Color(0, 0, 0, 0.82))
		g.add_point(0.45, Color(0, 0, 0, 0.5))
		g.set_color(g.get_point_count() - 1, Color(0, 0, 0, 0))
		var t := GradientTexture2D.new()
		t.gradient = g
		t.fill = GradientTexture2D.FILL_RADIAL
		t.fill_from = Vector2(0.5, 0.5)
		t.fill_to = Vector2(1.0, 0.5)
		t.width = 128
		t.height = 128
		_blob_tex = t
	blob = Decal.new()
	blob.texture_albedo = _blob_tex
	blob.modulate = Color(0, 0, 0, 1)
	blob.albedo_mix = 1.0
	blob.size = Vector3(1.15, 2.4, 1.0) * rig.body_scale
	blob.upper_fade = 0.25
	blob.lower_fade = 0.35
	blob.cull_mask = 1
	blob.distance_fade_enabled = true
	blob.distance_fade_begin = 45.0
	blob.distance_fade_length = 15.0
	add_child(blob)
	blob.position = Vector3(0, 0.6, 0)


func forward() -> Vector3:
	return Vector3(sin(yaw), 0, cos(yaw))


func play(name: String) -> void:
	action = {"name": name, "def": ACTIONS[name], "t": 0.0, "hits": {}, "root": null}


func is_doing(names: Array) -> bool:
	return not action.is_empty() and action.name in names


## La lame blesse-t-elle en ce moment ?
func striking() -> bool:
	if action.is_empty():
		return false
	if action.def.has("multi"):
		# plusieurs coups dans la même action : chaque fenêtre touche à neuf
		var multi: Array = action.def.multi
		for i in multi.size():
			if action.t >= multi[i][0] and action.t <= multi[i][1]:
				if action.get("win", -1) != i:
					action.win = i
					action.hits = {}
				return true
		return false
	if not action.def.has("active"):
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
		action.t += dt * (action_speed if action.def.has("dmg") or action.def.has("multi") else 1.0)
		var l = action.def.get("lunge")
		if l and action.t >= l[0] and action.t <= l[1]:
			push += forward() * l[2] * dt * rig.body_scale
		if action.def.has("draw_at") and action.t >= action.def.draw_at:
			sheathed = false
		if action.def.has("sheath_at") and action.t >= action.def.sheath_at:
			sheathed = true
		if action.t >= action.def.dur and not action.def.get("hold", false):
			action = {}

	var loco := _loco(dt, time)
	var final := loco
	if not action.is_empty():
		var d: Dictionary = action.def
		var aq: Dictionary
		var w: float
		if d.has("clip"):
			aq = _clip_pose(d)
			w = clampf(minf(action.t / 0.1, 1.0 if d.get("hold", false) else (d.dur - action.t) / 0.15), 0.0, 1.0)
		else:
			# une action à clés ne commande que les articulations qu'elle nomme ;
			# les autres continuent de suivre la marche
			var base: Dictionary = Rig.RELAX if sheathed else Rig.GUARD
			aq = _euler_to_quats(Rig.sample_pose(d["keys"], action.t, base), _joints_of(d))
			w = 1.0 if d.get("hold", false) else clampf(minf((d.dur - action.t) / 0.1, action.t / 0.04), 0.0, 1.0)
		final = _blend(loco, aq, w)
	rig.set_quats(final, final.hipsY)
	_finish(dt)


# ---------- Les poses en quaternions ----------

static var _jcache := {}


## Les articulations qu'une action à clés nomme dans au moins une clé.
func _joints_of(d: Dictionary) -> Array:
	if _jcache.has(d):
		return _jcache[d]
	var used := {}
	for k in d["keys"]:
		for j in k[1]:
			used[j] = true
	_jcache[d] = used.keys()
	return _jcache[d]


static func eq(r: Array) -> Quaternion:
	return Basis.from_euler(Vector3(r[0], r[1], r[2]), EULER_ORDER_XYZ).get_rotation_quaternion()


func _euler_to_quats(pose: Dictionary, only: Array) -> Dictionary:
	var out := {"hipsY": pose.get("hipsY", 0.0), "_only": only}
	for j in Rig.JOINTS:
		if pose.has(j):
			out[j] = eq(pose[j])
	return out


func _blend(a: Dictionary, b: Dictionary, w: float) -> Dictionary:
	var only: Array = b.get("_only", [])
	var out := {"hipsY": a.hipsY}
	for j in Rig.JOINTS:
		var qa: Quaternion = a[j]
		if b.has(j) and (only.is_empty() or j in only):
			out[j] = qa.slerp(b[j], w)
		else:
			out[j] = qa
	if only.is_empty() or "hipsY" in only:
		out.hipsY = lerpf(a.hipsY, b.hipsY, w)
	return out


## Une image d'un clip Mixamo, à un instant donné (en boucle si loop).
func _sample(name: String, t: float, loop := true) -> Dictionary:
	var c: Dictionary = CLIPS[name]
	var n: int = c.frames.size()
	var f: float = (fposmod(t, c.duration) if loop else clampf(t, 0.0, c.duration)) * c.fps
	var i0 := mini(n - 1, int(f))
	var i1 := (i0 + 1) % n if loop else mini(n - 1, i0 + 1)
	var u := f - int(f)
	var out := {"hipsY": lerpf(c.frames[i0].y, c.frames[i1].y, u)}
	for i in c.joints.size():
		out[c.joints[i]] = (c.q[i0][i] as Quaternion).slerp(c.q[i1][i], u)
	return out


## Le corps qui marche : repos, marche et course mélangés selon la vitesse.
## Épée dégainée, le haut du corps garde la garde ; accroupi, il se fait petit.
func _loco(dt: float, time: float) -> Dictionary:
	var G: Dictionary = Rig.RELAX if sheathed else Rig.GUARD
	if not CLIPS.has("marche"):
		var o := _euler_to_quats(G, [])
		o.erase("_only")
		return o
	var spd := speed / rig.body_scale
	var walk_w := clampf(spd / 1.2, 0.0, 1.0)
	var run_w := clampf((spd - 2.2) / 2.0, 0.0, 1.0)
	var walk_name := "accroupi-marche" if sneaking and CLIPS.has("accroupi-marche") else walk_clip
	if not CLIPS.has(walk_name):
		walk_name = "marche"
	# une seule phase pour la marche et la course : les pieds restent d'accord
	var stride := lerpf(STRIDE.get(walk_name, 1.5), 3.6, run_w)
	phase = fposmod(phase + dt * maxf(spd, 0.6) / stride, 1.0)
	var still := idle_override if idle_override != "" else ("accroupi" if sneaking and CLIPS.has("accroupi") else idle_clip)
	if not CLIPS.has(still):
		still = "repos"
	var idle := _sample(still, time + float(get_instance_id() % 97) * 0.1)
	var walk := _sample(walk_name, phase * CLIPS[walk_name].duration)
	var run := _sample("course", phase * CLIPS.course.duration)
	var moving := walk if sneaking else _blend(walk, run, run_w)
	var body := _blend(idle, moving, walk_w)
	if not sheathed:
		# l'épée en main : la garde pour le haut du corps
		var breathe := sin(time * 2.1 + global_position.x) * 0.025
		var lean := walk_w * 0.12 + run_w * 0.1
		for j in ["chest", "neck", "head", "shR", "elR", "wrR", "shL", "elL"]:
			var r: Array = G[j]
			if j == "chest":
				r = [r[0] + breathe + lean, r[1], r[2]]
			body[j] = (body[j] as Quaternion).slerp(eq(r), 1.0 if not sneaking else 0.45)
	if blocking:
		for j in ["chest", "shR", "elR", "wrR", "shL", "elL"]:
			body[j] = eq(P.parry[j])
	return body


## Une animation Mixamo jouée comme action : ses quaternions, et l'élan qu'elle donne.
func _clip_pose(d: Dictionary) -> Dictionary:
	var a := action
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
	var out := {"hipsY": lerpf(F0.y, F1.y, u)}
	for i in c.joints.size():
		out[c.joints[i]] = (c.q[i0][i] as Quaternion).slerp(c.q[i1][i], u)
	return out


func _finish(dt: float) -> void:
	# Les morts s'affaissent ; les damnés s'enfoncent dans la cendre, les humains restent étendus
	if not alive:
		dead_t += dt
		if not action.is_empty() and action.def.has("clip"):
			if faction == "damnes":
				var f: float = clampf((dead_t - action.def.dur - 0.3) / 1.2, 0.0, 1.0)
				rig.position.y = -f * 1.1
		elif dead_t > 1.1:
			var f := minf(1.0, (dead_t - 1.1) / 1.2)
			rig.rotation.x = -f * 1.35
			rig.position.y = -f * 0.2
	rig.rotation.y = 0.0
	rotation.y = yaw

	# La lame des démons rougeoie pendant qu'ils préparent leur coup
	rig.sword.visible = armed and not sheathed
	if kind != "player" and hostile:
		var target := 0.0
		if alive:
			target = 1.2 if striking() else pow(windup(), 2) * 5.0
		glow += (target - glow) * minf(1.0, dt * 12.0)
		if rig.evil:
			rig.steel.emission_energy_multiplier = 0.15 + glow * 2.0
		else:
			# un humain : le fil de la lame accroche une lueur de braise, sans plus
			rig.steel.emission = Color(1.0, 0.5, 0.22)
			rig.steel.emission_energy_multiplier = 0.05 + glow * 0.7

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
	if faction != "damnes":
		# un corps humain reste à terre : les gardes peuvent le découvrir
		return dead_t > 60.0
	return dead_t > (d.dur + 1.5 if d.has("clip") else 2.6)


func remove() -> void:
	if trail:
		trail.queue_free()
	queue_free()


## Teinte le modèle (les gardes d'Akagane portent le rouge de l'Oni).
func tint(c: Color) -> void:
	for mi in find_children("*", "MeshInstance3D", true, false):
		if rig.sword.is_ancestor_of(mi):
			continue
		var m: MeshInstance3D = mi
		for i in m.get_surface_override_material_count():
			var base := m.get_active_material(i)
			if base is StandardMaterial3D:
				var dup: StandardMaterial3D = base.duplicate()
				dup.albedo_color = dup.albedo_color * c
				m.set_surface_override_material(i, dup)


## Joue un geste s'il n'est pas déjà occupé.
func gesture(name: String) -> void:
	if ACTIONS.has(name) and (action.is_empty() or action.def.get("gesture", false)):
		play(name)


# ---------- L'intelligence des damnés ----------

func think(player: Fighter, others: Array, dt: float, token: Dictionary) -> void:
	fight(player, others, dt, token)


## Le combat : traquer, tourner autour, frapper quand vient son tour.
## watch : il surveille lui-même la distance (les damnés) ; sinon on l'a lancé.
func fight(player: Fighter, others: Array, dt: float, token: Dictionary, watch := true) -> void:
	move = Vector3.ZERO
	if not alive or not player.alive:
		speed *= 0.9
		return
	cd -= dt
	var d := flat_distance(player)
	if not watch:
		aggro = true

	# Ils montent la garde ; s'ils te voient, ils te traquent, puis rentrent
	var from_home := Vector2(global_position.x - home.x, global_position.z - home.z).length()
	if watch and not aggro and d < 15.0:
		aggro = true
	elif watch and aggro and (d > 32.0 or from_home > 45.0):
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
		if combo and action.name in ["slash", "quick"] and action.t >= action.def.dur - 0.05:
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

	if cd <= 0.0 and d < reach + 1.2 and (token.free or duel):
		token.free = false
		if role == "samurai":
			# un duelliste varie ses coups et les enchaîne
			var r := randf()
			play("quick" if r < 0.35 else "lunge" if r < 0.6 and d > reach - 0.3 else "slash" if r < 0.85 else "smash")
			combo = randf() < 0.5
			cd = 0.7 + randf() * 1.1
			return
		if kind == "oni":
			play("smash" if randf() < 0.45 else "slash")
			combo = randf() < 0.6
		else:
			play("thrust" if d > reach - 0.1 and randf() < 0.6 else "slash")
			if kind == "chef":
				combo = randf() < 0.45
		cd = (1.4 if kind in ["oni", "chef"] else 1.8) + randf() * 1.6
