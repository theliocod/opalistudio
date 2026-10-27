## Ce que disent les gens. Chaque réplique est un nœud :
## {speaker, kind (le portrait), text, choices: [{text, go, lock}]}.
## go : un autre nœud, ou une action (@end, @shop, @registry, @duel, @fine, @free).
class_name Dialogues
extends RefCounted

const CIVIL_LOW := [
	"Encore un rōnin… Passe ton chemin, il n'y a plus rien à voler ici.",
	"Les morts marchent, et toi tu te promènes ? Les dieux nous ont abandonnés.",
	"Ma fille est partie vendre son riz à Akagane il y a sept nuits. Elle n'est jamais revenue.",
	"La lune saigne depuis une semaine. Mon grand-père disait que c'était le signe de l'Oni.",
	"Ne reste pas planté là, samouraï. Les gardes n'aiment pas les sabres qui traînent.",
	"Le riz pourrit dans les champs. Personne n'ose sortir des murs après le crépuscule.",
]
const CIVIL_MID := [
	"On raconte que tu as tenu tête aux damnés. Merci, samouraï.",
	"Les gamins jouent à être toi, dans la grand-rue. Avec des bâtons, heureusement.",
	"Tu as l'air fatigué. Le saké de la Lanterne Rouge réchauffe les os, paraît-il.",
	"Daikoku a reçu de nouvelles lames. Il les garde pour ceux qui ont des ryō, et un nom.",
]
const CIVIL_HIGH := [
	"C'est toi ! Le sabre de la vallée ! Permets que je m'incline.",
	"Grâce à toi, on dort mieux. Un peu mieux. Que les dieux te gardent.",
	"Ma mère a allumé un bâton d'encens pour toi au sanctuaire.",
]
const CIVIL_FEAR := [
	"Ne… ne me fais pas de mal. Je n'ai rien vu, rien entendu.",
	"Va-t'en. Les gardes vont venir. Ils viennent toujours.",
]
const GUARD_LINES := [
	"Circule. La nuit est longue et j'ai les pieds gelés.",
	"Garde ta lame au fourreau tant que tu es dans nos murs.",
	"Les murs tiennent. Pour l'instant.",
	"On a vu des lanternes rouges du côté d'Akagane. Les gens de l'Oni préparent quelque chose.",
]


static func portrait(kind: String) -> Texture2D:
	var p := "res://assets/kie/portraits/%s.png" % ("samourai" if kind == "player" else kind)
	return load(p) if ResourceLoader.exists(p) else null


static func _n(npc: Fighter, text: String, choices: Array) -> Dictionary:
	return {"speaker": npc.display_name, "kind": npc.kind, "text": text, "choices": choices}


static func _c(text: String, go: String, lock := "") -> Dictionary:
	return {"text": text, "go": go, "lock": lock}


static func node(npc: Fighter, id: String, game) -> Dictionary:
	var r: Renown = game.renown
	if Renown.SAMURAI.has(npc.npc_id):
		return _samurai(npc, id, r)
	match npc.npc_id:
		"daikoku": return _merchant(npc, id, game)
		"saito": return _captain(npc, id, r)
		"gensai": return _hermit(npc, id, r)
	if npc.get_meta("prisoner", false):
		return _n(npc, "Libère-nous, je t'en supplie ! Ils ont cloué la porte de la cage… Ton sabre suffira à la briser.",
			[_c("Briser la cage", "@free"), _c("Plus tard.", "@end")])
	if npc.role == "guard":
		if r.hojo_hostile():
			return _n(npc, "Toi ! Ne bouge plus !", [_c("Partir", "@end")])
		var line: String = GUARD_LINES[npc.get_instance_id() % GUARD_LINES.size()]
		if r.fame >= 80:
			line = "Seigneur. C'est un honneur de garder la ville où tu passes."
		return _n(npc, line, [_c("Au revoir.", "@end")])
	var pool: Array = CIVIL_LOW
	if r.infamy >= 30:
		pool = CIVIL_FEAR
	elif r.fame >= 80:
		pool = CIVIL_HIGH
	elif r.fame >= 25:
		pool = CIVIL_MID
	return _n(npc, pool[npc.get_instance_id() % pool.size()], [_c("Au revoir.", "@end")])


static func _merchant(npc: Fighter, id: String, game) -> Dictionary:
	var r: Renown = game.renown
	var main := [_c("Voir tes marchandises", "@shop"), _c("D'où viennent tes lames ?", "origine"), _c("Quelles nouvelles ?", "rumeurs"), _c("Au revoir.", "@end")]
	match id:
		"origine":
			return _n(npc, "De partout et de nulle part. Celle au fil vert vient d'un forgeron qui jurait avoir trempé l'acier dans le venin d'un serpent blanc. Moi, je ne pose pas de questions : je compte les pièces.", main)
		"rumeurs":
			if r.fort_free:
				return _n(npc, "Depuis que tu as nettoyé Akagane, les caravanes reviennent. Les affaires reprennent, et c'est grâce à toi. Je ne l'oublierai pas… dans mes prix.", main)
			return _n(npc, "Le fort d'Akagane, au nord-est, regorge de lames volées. Les hommes de l'Oni y montent la garde jour et nuit, mais leur armurerie déborde. Un homme discret y ferait fortune… un homme bruyant y laisserait sa tête. Il paraît qu'une brèche s'ouvre dans le mur du nord-ouest.", main)
	if r.infamy >= 40:
		return _n(npc, "Je… je vends à qui paie. Mais fais vite, on nous regarde.", main)
	if r.fame >= 40:
		return _n(npc, "Ah ! Le sabre dont toute la ville parle ! Pour toi, mes prix fondent comme la neige au printemps.", main)
	return _n(npc, "Bienvenue, voyageur. Des lames forgées loin d'ici, et du saké pour panser ce qu'elles font. Tout se paie en ryō, bien sûr. Je m'appelle Daikoku, comme le dieu de la fortune. Ce n'est pas un hasard.", main)


static func _captain(npc: Fighter, id: String, r: Renown) -> Dictionary:
	if r.hojo_hostile() or r.infamy >= 30:
		return _n(npc, "Toi. Ton nom court dans toute la ville, et pas pour ta bravoure. Paie l'amende, %d ryō, et on oubliera. Sinon, sors de Hōjō avant qu'on t'en sorte." % r.fine(),
			[_c("Payer l'amende (%d ryō)" % r.fine(), "@fine"), _c("Partir", "@end")])
	var main := [_c("Que se passe-t-il dans la vallée ?", "vallee"), _c("Qui sont les lames de cette ville ?", "lames"), _c("Je respecterai vos lois.", "@end")]
	match id:
		"vallee":
			return _n(npc, "Depuis que la lune a rougi, les morts se relèvent. Les gens de l'Oni tiennent le fort d'Akagane, au nord-est, et ils ont pris des nôtres. Des prisonniers croupissent dans une cage au milieu de leur cour. Si tu veux te rendre utile…", main)
		"lames":
			return _n(npc, "Six sabres font la fierté de Hōjō. Leurs noms sont gravés au Registre des Lames, devant le dojo. Bats-les en duel, un par un, et ton nom montera. Mais ils ne croisent pas le fer avec un inconnu : fais-toi d'abord une renommée.", main)
	if r.fame >= 40:
		return _n(npc, "Te revoilà. Hōjō te doit beaucoup. Entre, et que la lune te soit douce.", main)
	return _n(npc, "Halte. Hōjō est la dernière ville libre de la vallée. Ici, on ne tire pas l'épée et on ne lève pas la main sur les gens. Respecte cela, et tu seras le bienvenu.", main)


const SAMURAI_LINES := {
	"benkei": {
		"hello": "Halte, voyageur. Neuf cent quatre-vingt-dix-neuf sabres ont voulu traverser ce pont. Ils sont restés à mes pieds. Le tien sera le millième.",
		"who": "Musashibō Benkei, moine de la montagne et gardien de ce pont. Le dernier du Registre, dit-on. Mais personne ne le franchit sans ma permission.",
		"duel": "Je te défie, Benkei.",
		"beaten": "Tu as franchi le pont. Garde Gojō, ma lame : elle sera plus utile entre tes mains que dans les miennes."},
	"oyuki": {
		"hello": "Tu me regardes comme on regarde la neige : en croyant qu'elle ne mord pas.",
		"who": "J'attends. Un nom, un ordre, une nuit sans lune. Tu poses beaucoup de questions pour quelqu'un qui marche si fort.",
		"duel": "Croisons le fer, Dame des Neiges.",
		"beaten": "Le vent t'a obéi. Garde-le : le Pas du Vent est à toi, désormais."},
	"jubei": {
		"hello": "Un verre ? Non ? Dommage. Un homme qui ne boit pas avec un borgne ne mérite pas de le voir se battre.",
		"who": "Yagyū Jūbei. J'ai laissé mon œil gauche dans un duel, et la tête de l'autre dans le même. Assieds-toi… ou dégaine.",
		"duel": "Je dégaine.",
		"beaten": "Ha ! Je ne t'ai pas vu venir… Avec un seul œil, c'est une excuse. Retiens ceci : après une parade, frappe avant que l'autre ait fini de cligner."},
	"tomoe": {
		"hello": "Chut. Je prie pour ceux qui sont tombés cette nuit. Ils sont nombreux.",
		"who": "On m'appelle Tomoe, la Lame Pourpre. J'ai suivi mon seigneur dans cent batailles. Il n'en reste qu'une que je n'ai pas finie : celle contre l'Oni.",
		"duel": "Faisons honneur à leurs âmes. Dégaine.",
		"beaten": "Ta lame fleurit comme le sakura : éphémère et parfaite. Je t'enseigne les Mille Pétales."},
	"kojiro": {
		"hello": "La surface de l'eau ne ment jamais. Elle me dit que tu es pressé.",
		"who": "Sasaki Kojirō. On dit que ma lame est trop longue. Ceux qui l'ont dit l'ont mesurée de près.",
		"duel": "Le bassin sera notre témoin.",
		"beaten": "L'hirondelle revient toujours… Je te confie son retour. Le secret n'est pas dans le bras, mais dans le souffle."},
	"kagetora": {
		"hello": "Je suis Hōjō Kagetora, et cette ville est sous ma garde. Le Registre dit qui mérite de la défendre.",
		"who": "Mon père a bâti ces murs. Mon grand-père a forgé Masamune, la lame du clan. Je ne la confierai qu'à plus fort que moi. Personne ne l'est.",
		"duel": "Montre-moi ce que vaut le premier sabre de Hōjō.",
		"beaten": "Hōjō a un nouveau premier sabre. Prends Masamune… et va rendre sa couleur à la lune."},
}


static func _samurai(npc: Fighter, id: String, r: Renown) -> Dictionary:
	var L: Dictionary = SAMURAI_LINES[npc.npc_id]
	if r.beaten.has(npc.npc_id):
		return _n(npc, L.beaten if id == "start" else L.who, [_c("Qui es-tu, au fond ?", "who"), _c("Au revoir.", "@end")])
	var lock := r.can_challenge(npc.npc_id)
	var main := [_c(L.duel, "@duel", lock), _c("Qui es-tu ?", "who"), _c("Une autre fois.", "@end")]
	if id == "who":
		return _n(npc, L.who, main)
	return _n(npc, L.hello, main)


static func _hermit(npc: Fighter, id: String, r: Renown) -> Dictionary:
	var main := [_c("Parle-moi de la lune rouge.", "lune"), _c("Comment devenir plus fort ?", "force"), _c("Je te laisse à ton thé.", "@end")]
	if not r.met.has("gensai_gift"):
		main.insert(2, _c("Tu as l'air de vivre de peu…", "@gift"))
	match id:
		"lune":
			return _n(npc, "Il y a sept nuits, le daimyō d'Akagane a ouvert le vieux temple pour y chercher un trésor. Il y a trouvé l'Oni. La lune a bu son sang, et depuis elle saigne. Tant que l'Oni respire, les morts ne dormiront pas.", main)
		"force":
			return _n(npc, "Chaque damné que tu abats laisse une âme. Assez d'âmes, et ta lame se souvient de gestes qu'elle n'a jamais appris. Pour le reste… les sabres du Registre de Hōjō enseignent à ceux qui les battent. Et l'ombre enseigne à ceux qui savent attendre : un garde qui ne t'a pas vu est déjà mort.", main)
	return _n(npc, "Assieds-toi, si tu veux. Le vent passe dans les bambous comme une flûte. Il dit que tu viens de loin, et que tu repartiras plus loin encore.", main)
