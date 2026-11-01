## Outil de développement : les découvertes (source chaude, bambous, renard et
## sanctuaire d'Inari) et la libération d'un poste, mises à l'épreuve.
## OUT=dossier HOUR=16.8 godot --path . --resolution 800x450 --script res://tools_monde.gd
extends SceneTree

var main
var out := ""
var n := 0


func _initialize() -> void:
	out = OS.get_environment("OUT")
	Engine.max_physics_steps_per_frame = 24
	main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await frames(2)
	main._start({})
	if OS.get_environment("HOUR") != "":
		main.atmosphere.hour = float(OS.get_environment("HOUR"))
	await frames(3)
	var p: Fighter = main.player
	p.max_hp = 9999.0
	p.hp = 9999.0
	var d: Decouvertes = main.decouvertes
	var cam := Camera3D.new()
	cam.fov = 60.0
	root.add_child(cam)
	for s in d.spots:
		print("[lieu] %s en %s" % [s.kind, s.pos])

	# la source chaude
	var onsen: Dictionary = d.spots[0]
	p.global_position = onsen.pos + Vector3(1.6, 0.4, 1.6)
	await frames(6)
	await look(cam, onsen.pos + Vector3(5, 3, 6), onsen.pos)
	await shot("source")
	main.camera.make_current()
	var it: Dictionary = main._interactable()
	print("[source] invite : %s" % it.get("text", "rien"))
	var hp0: float = p.max_hp
	main._interact()
	await frames(4)
	print("[source] vie max %.0f → %.0f" % [hp0, p.max_hp])

	# les bambous : on tape la bonne suite de touches
	var bam: Dictionary = {}
	for s in d.spots:
		if s.kind == "bambou":
			bam = s
			break
	p.global_position = bam.pos + Vector3(0, 0.4, 0.5)
	await frames(6)
	await look(cam, bam.pos + Vector3(3, 2.2, 4), bam.pos + Vector3(0, 1.0, -1.4))
	await shot("bambous")
	main.camera.make_current()
	var r0: float = main.combat.resolve_max
	d.interact(bam)
	await frames(2)
	for i in 5:
		var want: String = d.qte.seq[i]
		var ev := InputEventAction.new()
		ev.action = want
		ev.pressed = true
		Input.parse_input_event(ev)
		await frames(3)
		var up := InputEventAction.new()
		up.action = want
		up.pressed = false
		Input.parse_input_event(up)
		await frames(2)
	print("[bambous] fait %s, détermination max %.0f → %.0f, état %s" % [bam.done, r0, main.combat.resolve_max, main.state])

	# le renard : on s'approche, il part ; on le suit jusqu'au sanctuaire
	var fx: Dictionary = d.foxes[0]
	var fox: Quadrupede = fx.body
	p.global_position = fox.global_position + Vector3(3, 0.4, 3)
	await frames(10)
	print("[renard] état %s" % fx.state)
	await look(cam, fox.global_position + Vector3(2.5, 1.2, 2.5), fox.global_position + Vector3(0, 0.3, 0))
	await shot("renard")
	for k in 120:
		var behind: Vector3 = fox.global_position - Vector3(sin(fox.rotation.y), 0, cos(fox.rotation.y)) * 4.0
		p.global_position = Vector3(behind.x, main.terrain_height(behind) + 0.3, behind.z)
		await frames(2)
		if fx.state != "guide":
			break
	print("[renard] état %s, à %.1f m du sanctuaire" % [fx.state, fox.global_position.distance_to(fx.spot.pos)])
	p.global_position = fx.spot.pos + Vector3(0, 0.4, 1.0)
	await frames(6)
	await look(cam, fx.spot.pos + Vector3(4, 2.4, 6), fx.spot.pos + Vector3(0, 1.2, -1))
	await shot("inari")
	main.camera.make_current()
	it = main._interactable()
	print("[inari] invite : %s" % it.get("text", "rien"))
	main._interact()
	await frames(4)
	print("[inari] charmes %s" % [main.arsenal.charms])

	# un haïku : on s'assoit, on choisit trois vers, on reçoit un charme
	var hk: Dictionary = {}
	for s in d.spots:
		if s.kind == "haiku":
			hk = s
			break
	p.global_position = hk.pos + Vector3(0.5, 0.4, 0.5)
	await frames(6)
	it = main._interactable()
	print("[haiku] invite : %s" % it.get("text", "rien"))
	main._interact()
	await frames(4)
	print("[haiku] état %s, assis %s" % [main.state, p.idle_override])
	await shot("haiku")
	for k in 3:
		var ev := InputEventKey.new()
		ev.keycode = [KEY_2, KEY_1, KEY_3][k]
		ev.pressed = true
		Input.parse_input_event(ev)
		await frames(3)
	print("[haiku] vers : %s" % [d.haiku.get("picks", [])])
	await frames(20)
	await shot("poeme")
	for i in 3000:
		await process_frame
		if main.state == "play":
			break
	print("[haiku] fini %s, état %s, charmes %s" % [hk.done, main.state, main.arsenal.charms])
	main.camera.make_current()

	# le poste du Col : on le voit, puis on abat la garnison
	var poste := Vector3.ZERO
	for pl in main.places:
		if pl.id == "poste_col":
			poste = Vector3(pl.pos.x, main.terrain.height_at(pl.pos.x, pl.pos.y), pl.pos.y)
	await look(cam, poste + Vector3(16, 9, 20), poste)
	p.global_position = poste + Vector3(16, 0.4, 20)
	await frames(8)
	await shot("poste")
	main.camera.make_current()
	var garrison := 0
	for e in main.enemies:
		if e.place == "poste_col" and e.alive:
			garrison += 1
	print("[poste] garnison %d" % garrison)
	for e in main.enemies:
		if e.place == "poste_col" and e.alive:
			main._kill(e)
	await frames(4)
	print("[poste] renommée %d" % main.renown.fame)
	print("FIN")
	quit()


func look(cam: Camera3D, eye: Vector3, at: Vector3) -> void:
	cam.global_position = eye
	cam.look_at(at)
	cam.make_current()
	for i in 6:
		await process_frame


func frames(k: int) -> void:
	for i in k:
		await process_frame


func shot(name: String) -> void:
	await process_frame
	if DisplayServer.get_name() == "headless":
		return
	root.get_viewport().get_texture().get_image().save_png("%s/%02d-%s.png" % [out, n, name])
	n += 1
