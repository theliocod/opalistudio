## La réputation : la renommée que tes actes te valent, l'infamie que tes
## crimes laissent, et le Registre des Lames de Hōjō, les six sabres que l'on
## défie en duel, du sixième au premier.
class_name Renown
extends RefCounted

const TITLES := [[0, "Inconnu"], [15, "Rōnin errant"], [40, "Lame respectée"], [80, "Héros de Hōjō"], [140, "Légende de la vallée"]]

## Le Registre. rank : 6 est le plus bas. fame : la renommée qu'il faut pour
## qu'il accepte le duel. spot : où il se tient (Towns.spots).
const SAMURAI := {
	"benkei": {"rank": 6, "name": "Musashibō Benkei", "title": "Le Mur de Gojō", "kind": "moine", "spot": "pont",
		"where": "Sur le pont en arc du bassin aux carpes", "fame": 0, "style": "Lourd et patient. Il encaisse, puis écrase.",
		"reward": {"katana": "gojo", "ryo": 150, "fame": 12}, "power": 0.9},
	"oyuki": {"rank": 5, "name": "Oyuki", "title": "La Dame des Neiges", "kind": "oyuki", "spot": "the",
		"where": "Devant la maison de thé du Saule", "fame": 10, "style": "Rapide comme une bourrasque. Elle frappe et se dérobe.",
		"reward": {"tech": "pas_vent", "ryo": 200, "fame": 15}, "power": 1.0},
	"jubei": {"rank": 4, "name": "Yagyū Jūbei", "title": "L'Œil unique", "kind": "jubei", "spot": "taverne",
		"where": "À la taverne de la Lanterne Rouge, un verre à la main", "fame": 20, "style": "Imprévisible. Il lit tes coups avant toi.",
		"reward": {"tech": "oeil", "ryo": 250, "fame": 18}, "power": 1.1},
	"tomoe": {"rank": 3, "name": "Tomoe", "title": "La Lame Pourpre", "kind": "onnamusha", "spot": "sanctuaire",
		"where": "En prière au sanctuaire, sous le sakura", "fame": 35, "style": "Des enchaînements sans fin, d'une grâce terrible.",
		"reward": {"tech": "petales", "ryo": 300, "fame": 22}, "power": 1.2},
	"kojiro": {"rank": 2, "name": "Sasaki Kojirō", "title": "L'Hirondelle", "kind": "kojiro", "spot": "bassin",
		"where": "Au bord du bassin aux carpes, en méditation", "fame": 50, "style": "Une allonge immense, une patience de pierre.",
		"reward": {"tech": "hirondelle", "ryo": 400, "fame": 28}, "power": 1.35},
	"kagetora": {"rank": 1, "name": "Hōjō Kagetora", "title": "Le Tigre de Hōjō", "kind": "noble", "spot": "dojo",
		"where": "Devant le dojo, au fond de la ville", "fame": 70, "style": "Le premier sabre de la ville. Sans faille connue.",
		"reward": {"katana": "masamune", "ryo": 800, "fame": 40}, "power": 1.5},
}
const ORDER := ["benkei", "oyuki", "jubei", "tomoe", "kojiro", "kagetora"]

var fame := 0
var infamy := 0
var beaten := {}               # samouraï → vaincu
var hojo_alarm := 0.0          # Hōjō te pourchasse encore tant de secondes
var freed := 0                 # prisonniers libérés
var fort_free := false         # Akagane libéré
var met := {}                  # habitants à qui l'on a déjà parlé


func title() -> String:
	var t: String = TITLES[0][1]
	for row in TITLES:
		if fame >= row[0]:
			t = row[1]
	return t


func next_title() -> Array:
	for row in TITLES:
		if fame < row[0]:
			return row
	return []


## Ton rang au Registre : celui du meilleur sabre que tu as vaincu (0 : aucun).
func rank() -> int:
	var best := 0
	for id in beaten:
		var r: int = SAMURAI[id].rank
		if best == 0 or r < best:
			best = r
	return best


## Peut-on défier ce samouraï ? Le Registre se gravit marche par marche.
func can_challenge(id: String) -> String:
	if beaten.has(id):
		return "vaincu"
	var s: Dictionary = SAMURAI[id]
	var i := ORDER.find(id)
	if i > 0 and not beaten.has(ORDER[i - 1]):
		return "Il faut d'abord vaincre %s." % SAMURAI[ORDER[i - 1]].name
	if fame < s.fame:
		return "Il faut une renommée de %d (tu en as %d)." % [s.fame, fame]
	return ""


## Le prochain sabre à défier.
func next_rival() -> String:
	for id in ORDER:
		if not beaten.has(id):
			return id
	return ""


func discount() -> float:
	return 1.0 - minf(0.3, fame / 400.0)


func price(base: int) -> int:
	return maxi(1, int(round(base * discount())))


## Hōjō te traite en ennemi : trop d'infamie, ou un crime tout frais.
func hojo_hostile() -> bool:
	return infamy >= 60 or hojo_alarm > 0.0


func fine() -> int:
	return 50 + infamy * 6


func tick(dt: float) -> void:
	hojo_alarm = maxf(0.0, hojo_alarm - dt)


func to_dict() -> Dictionary:
	return {"fame": fame, "infamy": infamy, "beaten": beaten.keys(), "freed": freed, "fort_free": fort_free, "met": met.keys()}


func from_dict(d: Dictionary) -> void:
	fame = int(d.get("fame", 0))
	infamy = int(d.get("infamy", 0))
	beaten = {}
	for id in d.get("beaten", []):
		beaten[id] = true
	freed = int(d.get("freed", 0))
	fort_free = bool(d.get("fort_free", false))
	met = {}
	for id in d.get("met", []):
		met[id] = true
