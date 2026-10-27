## Outil de développement : les mises à mort et les techniques, image par image.
## OUT=dossier godot --path . --resolution 800x450 --script res://tools_fight.gd
extends SceneTree

var main
var out := ""
var n := 0


func _initialize() -> void:
	out = OS.get_environment("OUT")
	main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await frames(2)
	Settings.put("affichage", "qualite", 0)
	Settings.put("affichage", "herbe", 0.2)
	Settings.apply(main)
	main._start({})
	await frames(4)
	var p: Fighter = main.player
	if OS.get_environment("ONLY") == "tech":
		await techniques(p)
		quit()
		return
	var g := guard()
	note("garde", "%s à %s, alerte %s" % [g.display_name, g.global_position, g.alert])

	# l'assassinat, par-derrière et accroupi
	p.sneaking = true
	p.global_position = g.global_position - g.forward() * 1.5 + Vector3(0, 0.3, 0)
	p.yaw = g.yaw
	main.cam_yaw = g.yaw
	await frames(3)
	var it: Dictionary = main._interactable()
	note("assassinat", "invite : %s" % it.get("text", "rien"))
	main._interact()
	for k in 8:
		await frames(2)
		await shot("assassinat-%d" % k)
	await frames(10)
	note("après", "garde vivant %s, cinéma %s, lame %.2f" % [is_instance_valid(g) and g.alive, main.cine.active(), p.rig.get_meta("blood", 0.0)])

	# l'exécution d'un ennemi déséquilibré
	main.arsenal.learned.append("iai")
	main.arsenal.learned.append("tourbillon")
	var g2 := guard()
	for style in ["iai", "kesa"]:
		g2 = guard()
		g2.alert = "alerte"
		g2.aggro = true
		p.sneaking = false
		p.sheathed = false
		p.action = {}
		p.global_position = g2.global_position + g2.forward() * 2.0 + Vector3(0, 0.3, 0)
		g2.play("stagger")
		await frames(2)
		it = main._interactable()
		note("exécution", "invite : %s" % it.get("text", "rien"))
		main.cine.execute(g2)
		note("style", main.cine.scene.get("kind", "-"))
		for k in 10:
			await frames(2)
			await shot("execution-%s-%d" % [main.cine.scene.get("kind", style), k])
		await frames(20)
		note("exécuté", "vivant %s, taches %d" % [g2.alive, Blood._decals.size()])

	await techniques(p)
	# la sauvegarde, puis la reprise
	var ok: bool = SaveGame.write(main)
	var dead: int = main.dead_ids.size()
	main._load_game()
	await frames(6)
	note("reprise", "écrite %s, morts %d → %d, ennemis %d, ryō %d" % [ok, dead, main.dead_ids.size(), main.enemies.size(), main.arsenal.ryo])
	print("FIN")
	quit()


## Les techniques, contre deux ronins posés devant soi, sur la place du village.
func techniques(p: Fighter) -> void:
	var foes := []
	for e in main.enemies:
		if e.faction == "damnes" and e.kind == "ronin" and foes.size() < 3:
			foes.append(e)
	var at: Vector3 = foes[0].home
	for i in foes.size():
		foes[i].global_position = at + Vector3(-1.5 + i * 1.5, 0.5, 6.0 + i * 0.5)
		foes[i].home = foes[i].global_position
		foes[i].max_hp = 400.0
		foes[i].hp = 400.0
	p.global_position = at + Vector3(0, 0.5, 0)
	p.yaw = 0.0
	main.cam_yaw = 0.0
	p.hp = p.max_hp
	await frames(4)
	main.arsenal.learned.append_array(["hirondelle", "pas_vent", "petales"])
	for t in ["hirondelle", "pas_vent", "petales"]:
		main.stamina = 100.0
		p.action = {}
		p.sheathed = false
		main._buffer(t, 0.3)
		for k in 4:
			await frames(2)
			await shot("tech-%s-%d" % [t, k])
		note(t, "action %s, projectiles %d, entailles %d" % [p.action.get("name", "-"), main.projectiles.size(), main.cuts.size()])
		await frames(12)

	note("santé", "vie %d, ronins %s" % [p.hp, foes.map(func(f): return int(f.hp))])
	# la fumée et le caillou
	main.arsenal.items.fumigene = 1
	main._use_item("fumigene")
	await frames(6)
	await shot("fumee")
	note("fumée", "fumée %.1f s, ronins titubent %s" % [main.smoke_t, foes.map(func(f): return f.is_doing(["stagger"]))])
	main._use_item("caillou")
	await frames(12)


func guard() -> Fighter:
	for name in ["Un soldat", "Une sentinelle", "Un rōnin"]:
		for e in main.enemies:
			if e.alive and e.faction == "akagane" and e.display_name == name:
				return e
	return null


func frames(k: int) -> void:
	for i in k:
		await process_frame


func note(what: String, msg: String) -> void:
	print("[%s] %s  (%.1f s)" % [what, msg, Time.get_ticks_msec() / 1000.0])


func shot(name: String) -> void:
	await process_frame
	root.get_viewport().get_texture().get_image().save_png("%s/%02d-%s.png" % [out, n, name])
	n += 1
