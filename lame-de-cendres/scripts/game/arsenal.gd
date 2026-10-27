## L'arsenal : les objets, les katanas et les techniques, et ce que le joueur
## possède. Les katanas sont tous inventés pour ce jeu.
class_name Arsenal
extends RefCounted

## Les objets que l'on trouve dans les coffres et sur les morts.
## key : touche de la ceinture (1 à 4).
const ITEMS := {
	"sake": {"name": "Saké de soin", "desc": "Rend 45 points de vie.", "key": 1, "heal": 45.0, "color": Color(0.85, 0.75, 0.55)},
	"onigiri": {"name": "Onigiri", "desc": "Rend 20 points de vie et toute l'endurance.", "key": 2, "heal": 20.0, "stamina": true, "color": Color(0.92, 0.92, 0.88)},
	"the": {"name": "Thé de Gyokuro", "desc": "L'endurance revient deux fois plus vite pendant 40 secondes.", "key": 3, "buff": "the", "duration": 40.0, "color": Color(0.45, 0.7, 0.35)},
	"encens": {"name": "Encens de garde", "desc": "Les coups reçus font 40 % de dégâts en moins pendant 30 secondes.", "key": 4, "buff": "encens", "duration": 30.0, "color": Color(0.7, 0.55, 0.85)},
	"fumigene": {"name": "Bombe fumigène", "desc": "Un nuage épais : les gardes autour de toi te perdent de vue, les ennemis proches titubent.", "key": 5, "smoke": true, "color": Color(0.6, 0.62, 0.66)},
	"caillou": {"name": "Caillou", "desc": "Lancé devant toi, il fait du bruit là où il tombe : les gardes vont voir.", "key": 6, "throw": true, "color": Color(0.7, 0.68, 0.62)},
}
## Ce que coûtent les objets chez le marchand (en ryō)
const PRICES := {"sake": 30, "onigiri": 15, "the": 45, "encens": 70, "fumigene": 60, "caillou": 4,
	"kazekiri": 450, "sakura": 900, "kuroi": 1400}

## Les katanas. dmg et posture multiplient les coups ; effect : leur pouvoir.
## aura : la couleur de la flamme qui court sur la lame (aucune pour le premier).
const KATANAS := {
	"ronin": {
		"name": "Katana du rōnin", "desc": "La lame de tes années d'errance. Honnête, sans plus.",
		"dmg": 1.0, "posture": 1.0, "effect": "", "aura": null, "trail": Color(0.75, 0.9, 1.0)},
	"kurenai": {
		"name": "Kurenai, la Lame écarlate", "desc": "Forgée dans un brasier de temple. Ses entailles brûlent encore trois secondes.",
		"dmg": 1.15, "posture": 1.0, "effect": "burn", "aura": Color(1.0, 0.35, 0.08), "trail": Color(1.0, 0.45, 0.12)},
	"shiranui": {
		"name": "Shiranui, le Feu-follet", "desc": "Une flamme froide y danse. Chaque coup te rend un peu de la vie qu'il prend.",
		"dmg": 1.1, "posture": 1.0, "effect": "drain", "aura": Color(0.3, 0.75, 1.0), "trail": Color(0.4, 0.85, 1.0)},
	"raijin": {
		"name": "Raijin-maru", "desc": "Le tonnerre dort dans l'acier. Il brise les gardes et frappe parfois un second ennemi.",
		"dmg": 1.1, "posture": 1.7, "effect": "chain", "aura": Color(0.85, 0.9, 1.0), "trail": Color(0.9, 0.95, 1.0)},
	"yamikaze": {
		"name": "Yamikaze, le Vent des ténèbres", "desc": "Une lame qui boit la lumière. Terrible sur un ennemi déséquilibré.",
		"dmg": 1.3, "posture": 1.1, "effect": "void", "aura": Color(0.55, 0.15, 1.0), "trail": Color(0.6, 0.25, 1.0)},
	"tsukuyomi": {
		"name": "Tsukuyomi, Lame de la Lune Rouge", "desc": "Arrachée à l'Oni. La lune saigne avec elle : tout ce qu'elle touche brûle et la nourrit.",
		"dmg": 1.55, "posture": 1.4, "effect": "moon", "aura": Color(1.0, 0.12, 0.08), "trail": Color(1.0, 0.2, 0.15)},
	"kazekiri": {
		"name": "Kazekiri, Fend-le-Vent", "desc": "Légère comme une plume. Tes coups partent plus vite et leur souffle repousse.",
		"dmg": 1.05, "posture": 1.0, "effect": "wind", "aura": Color(0.6, 1.0, 0.8), "trail": Color(0.7, 1.0, 0.85), "speed": 1.22},
	"sakura": {
		"name": "Sakura-fubuki", "desc": "Une tempête de pétales suit la lame. Ses entailles saignent longtemps.",
		"dmg": 1.15, "posture": 1.0, "effect": "bleed", "aura": Color(1.0, 0.5, 0.7), "trail": Color(1.0, 0.6, 0.78)},
	"kuroi": {
		"name": "Kuroi Hebi, le Serpent noir", "desc": "Un venin vert coule dans le fil. L'empoisonné saigne et sa garde se délite.",
		"dmg": 1.2, "posture": 1.2, "effect": "venom", "aura": Color(0.35, 0.9, 0.25), "trail": Color(0.4, 0.95, 0.3)},
	"gojo": {
		"name": "Gojō, la lame du Mur", "desc": "L'épaisse lame de Benkei. Lente à lever, elle brise toutes les gardes et ses coups lourds ébranlent le sol.",
		"dmg": 1.3, "posture": 2.0, "effect": "rock", "aura": Color(0.85, 0.7, 0.45), "trail": Color(0.9, 0.78, 0.55)},
	"masamune": {
		"name": "Hōjō Masamune", "desc": "Le trésor du clan Hōjō, confié au plus digne. Chaque ennemi abattu te rend vie et souffle.",
		"dmg": 1.65, "posture": 1.5, "effect": "honor", "aura": Color(1.0, 0.92, 0.65), "trail": Color(1.0, 0.95, 0.75)},
	"akagane": {
		"name": "Lame d'Akagane", "desc": "Le cuivre rouge des assassins. Terrible sur qui ne t'a pas vu venir : les assassinats sont plus rapides.",
		"dmg": 1.2, "posture": 1.1, "effect": "shadow", "aura": Color(0.95, 0.45, 0.25), "trail": Color(1.0, 0.5, 0.3)},
}

## Les techniques : apprises en abattant des ennemis (les âmes qu'ils laissent).
const TECHNIQUES := {
	"tourbillon": {"name": "Tourbillon de cendres", "desc": "Un tour complet, lame haute : frappe tout ce qui t'entoure.", "souls": 2, "key": "R", "action": "tourbillon", "cost": 35.0},
	"iai": {"name": "Iai : Éclair pourpre", "desc": "Un dégainé fulgurant : tu traverses ton ennemi, intouchable le temps de l'élan.", "souls": 5, "key": "T", "action": "iai", "cost": 30.0},
	"garde": {"name": "Garde de fer", "desc": "Ta parade pardonne davantage, et chaque parade réussie te rend 5 points de vie.", "souls": 9, "key": "", "passive": true},
	"lune": {"name": "Souffle de la Lune", "desc": "Le coup de grâce rend toute ton endurance et la moitié de ta vie.", "souls": 16, "key": "", "passive": true},
	# Celles qu'enseignent les lames du Registre de Hōjō, une fois vaincues en duel
	"pas_vent": {"name": "Pas du Vent", "desc": "Tu deviens rafale : tu traverses tout ce qui se tient devant toi, et chacun saigne une seconde plus tard.", "teacher": "oyuki", "key": "V", "action": "pas_vent", "cost": 40.0},
	"oeil": {"name": "L'Œil unique", "desc": "Après une parade, ton coup suivant tranche double et le temps ralentit.", "teacher": "jubei", "key": "", "passive": true},
	"petales": {"name": "Mille Pétales", "desc": "Une floraison de six coups qui s'enchaînent sans laisser respirer.", "teacher": "tomoe", "key": "X", "action": "petales", "cost": 45.0},
	"hirondelle": {"name": "Retour de l'Hirondelle", "desc": "Le coup secret de Kojirō : ta lame lance un croissant de vent qui fauche tout sur son passage.", "teacher": "kojiro", "key": "Q", "action": "hirondelle", "cost": 38.0},
}

var items := {"sake": 2, "onigiri": 1, "the": 0, "encens": 0, "fumigene": 1, "caillou": 3}
var ryo := 40
var katanas := ["ronin"]
var equipped := "ronin"
var souls := 0
var learned := []
var buffs := {}             # buff → temps restant


func katana() -> Dictionary:
	return KATANAS[equipped]


func knows(tech: String) -> bool:
	return tech in learned


## Ajoute des âmes ; renvoie les techniques apprises à cette occasion.
func add_souls(n: int) -> Array:
	souls += n
	var fresh := []
	for id in TECHNIQUES:
		if TECHNIQUES[id].has("souls") and not knows(id) and souls >= TECHNIQUES[id].souls:
			learned.append(id)
			fresh.append(id)
	return fresh


func add_item(id: String, n := 1) -> void:
	items[id] = items.get(id, 0) + n


func add_katana(id: String) -> bool:
	if id in katanas:
		return false
	katanas.append(id)
	return true


func tick(dt: float) -> void:
	for b in buffs.keys():
		buffs[b] -= dt
		if buffs[b] <= 0.0:
			buffs.erase(b)


## Apprend une technique (un maître vaincu) ; faux si elle était déjà connue.
func learn(id: String) -> bool:
	if knows(id):
		return false
	learned.append(id)
	return true


## Ce que rapporte un coffre ou un mort : quelques objets au hasard.
static func roll_loot(rich: bool) -> Dictionary:
	var out := {}
	var n := randi_range(2, 3) if rich else randi_range(0, 2)
	for i in n:
		var r := randf()
		var id := "sake" if r < 0.38 else "onigiri" if r < 0.64 else "the" if r < 0.76 else "encens" if r < 0.86 else "caillou" if r < 0.95 else "fumigene"
		out[id] = out.get(id, 0) + 1
	return out
