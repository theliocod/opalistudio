## Outil de développement : visite Hōjō et Akagane, et vérifie les nouveaux
## systèmes (dialogue, boutique, registre, duel, furtivité, assassinat,
## exécution, techniques, sauvegarde). OUT=dossier godot --path . --script res://tools_town.gd
extends SceneTree

var main
var out := ""
var n := 0


func _initialize() -> void:
	out = OS.get_environment("OUT")
	main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await frames(3)
	await shot("titre")
	main._start({})
	await frames(10)
	var p: Fighter = main.player
	note("départ", "habitants %d, coffres %d, zones %d" % [main.enemies.size(), main.landmarks.chests.size(), main.landmarks.zones.size()])

	# ── Hōjō : la porte sud, la grand-rue
	var hojo: Vector2 = main.places[6].pos
	var c := Vector3(hojo.x, main.terrain.height_at(hojo.x, hojo.y), hojo.y)
	p.global_position = c + Vector3(0, 0.5, 40)
	main.cam_yaw = PI
	main.cam_pitch = 0.18
	await frames(40)
	await shot("hojo-porte")
	p.global_position = c + Vector3(1.5, 0.5, 12)
	await frames(30)
	await shot("hojo-rue")
	note("zone", "zone %s, musique %s" % [main.zone.get("id", "-"), main.audio.mood])

	# le marchand : dialogue puis boutique
	var daikoku := find("daikoku")
	p.global_position = daikoku.global_position + Vector3(-2.2, 0.3, 0)
	p.yaw = PI / 2
	await frames(10)
	var it: Dictionary = main._interactable()
	note("marchand", "invite : %s" % it.get("text", "rien"))
	if it.get("kind", "") == "talk":
		main._interact()
		await frames(20)
		main.dialogue._shown = 1000
		await frames(5)
		await shot("dialogue")
		main._on_choice("@shop")
		await frames(10)
		await shot("boutique")
		main.arsenal.ryo = 2000
		main.shop_view._buy_katana("kazekiri", 450)
		note("achat", "ryō %d, katanas %s" % [main.arsenal.ryo, main.arsenal.katanas])
		main.shop_view.visible = false
		main._close_overlay()

	# le registre
	p.global_position = main.landmarks.registry.pos + Vector3(0, 0.3, 0.4)
	await frames(10)
	it = main._interactable()
	note("registre", "invite : %s" % it.get("text", "rien"))
	main._open_registry()
	await frames(10)
	await shot("registre")
	main.registry_view.visible = false
	main._close_overlay()

	# un duel contre Benkei, gagné en le frappant jusqu'à ce qu'il cède
	var benkei := find("benkei")
	p.global_position = benkei.global_position + Vector3(0, 0.3, 3.0)
	await frames(10)
	main._talk(benkei)
	await frames(10)
	await shot("benkei")
	main._on_choice("@duel")
	await frames(40)
	note("duel", "phase %s, Benkei hostile %s" % [main.duel.get("phase", "-"), benkei.hostile])
	await shot("duel")
	benkei.hp = 5.0
	main._hit_enemy(Fighter.ACTIONS.heavy, benkei, benkei.global_position + Vector3(0, 1.2, 0))
	await frames(30)
	note("duel gagné", "Benkei vaincu %s, katanas %s, renommée %d" % [main.renown.beaten.has("benkei"), main.arsenal.katanas, main.renown.fame])
	await frames(40)
	if main.state == "talk":
		main.dialogue._shown = 1000
		await frames(3)
		await shot("benkei-vaincu")
		main._on_choice("@end")

	# ── Akagane : la brèche, les gardes, les cônes
	var ak: Vector2 = main.places[7].pos
	var a := Vector3(ak.x, main.terrain.height_at(ak.x, ak.y), ak.y)
	p.global_position = a + Vector3(-20, 0.5, -30)
	p.sneaking = true
	main.cam_yaw = 0.5
	await frames(60)
	await shot("akagane-breche")
	note("furtivité", "musique %s, gardes %d" % [main.audio.mood, watched()])
	# devant un garde : le doute monte, puis l'alerte
	var g := guard()
	p.sneaking = false
	p.global_position = g.global_position + g.forward() * 8.0 + Vector3(0, 0.3, 0)
	var t := 0
	while g.alert == "calme" and t < 300:
		await physics_frame
		t += 1
	note("vu", "après %d images : %s (soupçon %.2f)" % [t, g.alert, g.suspicion])
	await frames(10)
	await shot("akagane-doute")
	main.stealth.reset()
	for e in main.enemies:
		if e.faction == "akagane":
			e.alert = "calme"
			e.suspicion = 0.0
	# l'assassinat : par-derrière
	var g2 := guard()
	p.sneaking = true
	p.global_position = g2.global_position - g2.forward() * 1.4 + Vector3(0, 0.3, 0)
	p.yaw = g2.yaw
	await frames(4)
	it = main._interactable()
	note("assassinat", "invite : %s" % it.get("text", "rien"))
	if it.get("kind", "") == "assassinat":
		main._interact()
		await frames(30)
		await shot("assassinat")
		await frames(90)
		note("assassinat fini", "garde vivant %s, cinéma %s" % [g2.alive, main.cine.active()])
		await shot("assassinat-fin")
	# une exécution : un ennemi déséquilibré
	main.arsenal.learned.append("iai")
	var g3 := guard()
	g3.alert = "alerte"
	p.global_position = g3.global_position + g3.forward() * 2.2 + Vector3(0, 0.3, 0)
	p.sneaking = false
	p.sheathed = false
	g3.play("stagger")
	await frames(2)
	it = main._interactable()
	note("exécution", "invite : %s" % it.get("text", "rien"))
	if it.get("kind", "") == "finisher":
		main._interact()
		for k in 5:
			await frames(12)
			await shot("execution-%d" % k)
		await frames(120)
		note("exécution finie", "vivant %s, sang décalques %d" % [g3.alive, Blood._decals.size()])

	# les techniques des maîtres
	main.arsenal.learned.append_array(["hirondelle", "pas_vent", "petales"])
	main.stamina = 100.0
	p.action = {}
	main._buffer("hirondelle", 0.3)
	await frames(30)
	note("hirondelle", "projectiles %d" % main.projectiles.size())
	await shot("hirondelle")
	await frames(60)
	main.stamina = 100.0
	p.action = {}
	main._buffer("petales", 0.3)
	await frames(20)
	await shot("petales")
	await frames(90)

	# la sauvegarde
	var ok: bool = SaveGame.write(main)
	var back := SaveGame.read()
	note("sauvegarde", "écrite %s, relue %d clés, morts %d" % [ok, back.size(), back.get("dead", []).size()])
	print("FIN")
	quit()


func find(id: String) -> Fighter:
	for e in main.enemies:
		if e.npc_id == id:
			return e
	return null


func guard() -> Fighter:
	for e in main.enemies:
		if e.alive and e.faction == "akagane" and e.role == "guard" and e.route.is_empty() and not e.get_meta("lookout", false):
			return e
	return null


func watched() -> int:
	var k := 0
	for e in main.enemies:
		if main.stealth.watched(e):
			k += 1
	return k


func frames(k: int) -> void:
	for i in k:
		await process_frame


func note(what: String, msg: String) -> void:
	print("[%s] %s  (%.1f s, %d ips)" % [what, msg, Time.get_ticks_msec() / 1000.0, Engine.get_frames_per_second()])


func shot(name: String) -> void:
	await process_frame
	root.get_viewport().get_texture().get_image().save_png("%s/%02d-%s.png" % [out, n, name])
	n += 1
