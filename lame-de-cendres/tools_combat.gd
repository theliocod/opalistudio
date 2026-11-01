## Outil de développement : le combat des postures mis à l'épreuve (postures,
## éclairs, parade parfaite, coup imparable, bouclier, archer, soin,
## affrontement), avec quelques photos.
## OUT=dossier godot --path . --resolution 800x450 --script res://tools_combat.gd
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
	await frames(3)
	var p: Fighter = main.player
	var c: Combat = main.combat
	# un terrain dégagé, loin des villes
	var at := Vector3(40, 0, 60)
	at.y = main.terrain.height_at(at.x, at.z)
	for e in main.enemies:
		if e.global_position.distance_to(at) < 60.0:
			e.global_position += Vector3(0, 0, 300)
	p.global_position = at + Vector3(0, 0.4, 0)
	p.yaw = 0.0
	main.cam_yaw = 0.0
	p.sheathed = false
	await frames(4)

	# ── les postures
	c.set_stance("eau")
	await frames(2)
	note("posture", "%s, combo %s, lourd %s" % [c.stance, c.STANCE[c.stance].light, c.heavy_move()])
	await shot("posture-eau")
	c.set_stance("pierre", true)

	# ── un épéiste : l'éclair bleu, la parade parfaite
	var sw: Fighter = spawn("garde", at + Vector3(0, 0, 2.2), "epeiste")
	sw.aggro = true
	sw.yaw = PI
	sw.play("slash")
	await frames(1)
	var glinted := false
	for i in 120:
		await physics_frame
		if sw.action.get("glint", false) and not glinted:
			glinted = true
			await shot("eclat-bleu")
		# on lève la garde juste avant que la lame ne touche
		if sw.action.get("name", "") == "slash" and sw.action.t > sw.action.def.active[0] - 0.06 and main.block_press_t > 1.0:
			main.block_press_t = 0.0
		if sw.is_doing(["stagger"]):
			break
	note("parade", "éclair %s, chancelle %s, riposte ouverte %.1f s, détermination %.2f" % [glinted, sw.is_doing(["stagger"]), c.counter_t, c.resolve])
	var hp0: float = sw.hp
	p.yaw = 0.0
	p.play("light1")
	for i in 160:
		await physics_frame
		if i % 20 == 0:
			print("  [dbg riposte] action %s t %.2f striking %s dist %.2f angle %.2f hits %s sw_action %s" % [p.action.get("name", ""), p.action.get("t", 0.0), p.striking(), p.flat_distance(sw), p.angle_to(sw.global_position), p.action.get("hits", {}).size(), sw.action.get("name", "")])
	note("riposte", "vie %.0f → %.0f" % [hp0, sw.hp])
	sw.global_position += Vector3(0, 0, 400)

	# ── un colosse : l'éclair rouge ne se pare pas
	var br: Fighter = spawn("garde", at + Vector3(0, 0, 2.4), "brute")
	br.aggro = true
	br.yaw = PI
	p.hp = p.max_hp
	br.play("brute_ecrase")
	for i in 160:
		await physics_frame
		if br.action.get("name", "") == "brute_ecrase" and br.action.t > br.action.def.active[0] - 0.06 and main.block_press_t > 1.0:
			main.block_press_t = 0.0
			await shot("eclat-rouge")
		if not br.action.get("hits", {}).is_empty():
			break
	note("imparable", "taille ×%.2f, vie du joueur %.0f (parade tentée)" % [br.rig.body_scale, p.hp])
	br.global_position += Vector3(0, 0, 400)

	# ── un porte-bouclier : la Pierre rebondit, l'Eau passe
	p.hp = p.max_hp
	var sh: Fighter = spawn("garde", at + Vector3(0, 0, 1.8), "bouclier")
	sh.yaw = PI
	sh.aggro = false
	var hp1: float = sh.hp
	main._hit_enemy(Fighter.ACTIONS.light1, sh, sh.global_position + Vector3(0, 1.3, 0))
	note("bouclier", "Pierre, coup léger : vie %.0f → %.0f, posture %.0f" % [hp1, sh.hp, sh.posture])
	await shot("bouclier")
	c.set_stance("eau", true)
	hp1 = sh.hp
	main._hit_enemy(Fighter.ACTIONS.eau_lourd, sh, sh.global_position + Vector3(0, 1.3, 0))
	note("bouclier", "Eau, coup lourd : vie %.0f → %.0f" % [hp1, sh.hp])
	c.set_stance("pierre", true)
	sh.global_position += Vector3(0, 0, 400)

	# ── un archer : la flèche part, arrive
	p.hp = p.max_hp
	var ar: Fighter = spawn("garde", at + Vector3(0, 0, 14), "archer")
	ar.aggro = true
	ar.yaw = PI
	ar.cd = 0.0
	ar.play("tir")
	var seen := 0
	for i in 200:
		await physics_frame
		seen = maxi(seen, c.arrows.size())
		if i == 90:
			await shot("archer")
	note("archer", "flèches en vol (max) %d, vie du joueur %.0f" % [seen, p.hp])
	ar.global_position += Vector3(0, 0, 400)

	# ── se ressaisir
	p.hp = 40.0
	c.resolve = 2.0
	c.heal()
	note("soin", "vie %.0f, détermination %.1f" % [p.hp, c.resolve])

	# ── l'affrontement : on tient, on relâche quand il part
	p.hp = p.max_hp
	var foe: Fighter = spawn("garde", at + Vector3(0, 0, 11), "epeiste")
	var second: Fighter = spawn("garde", at + Vector3(2.5, 0, 14), "lancier")
	foe.yaw = PI
	second.yaw = PI
	await frames(3)
	var target: Fighter = c.standoff_target()
	note("affrontement", "cible %s" % (target.arch if target else "aucune"))
	if target:
		c.start_standoff(target)
		Input.action_press("rapide")
		var shotted := false
		var last := ""
		for i in 900:
			await physics_frame
			if c.standoff.is_empty():
				break
			var ph: String = c.standoff.phase
			if ph != last:
				last = ph
				print("  [dbg affrontement] phase %s, ennemi %s, held %s" % [ph, c.standoff.foe.arch, c.standoff.held])
			if c.standoff.phase == "attente" and not shotted:
				shotted = true
				await shot("affrontement")
			if c.standoff.phase == "charge" and c.standoff.t > 0.08:
				Input.action_release("rapide")
				await frames(3)
				Input.action_press("rapide")
		Input.action_release("rapide")
		note("affrontement", "premier mort %s, second mort %s, vie %.0f" % [not foe.alive, not second.alive, p.hp])
		await shot("apres")
	print("FIN")
	quit()


func spawn(kind: String, pos: Vector3, arch: String) -> Fighter:
	pos.y = main.terrain.height_at(pos.x, pos.z)
	return main._spawn({"kind": kind, "role": "enemy", "faction": "damnes", "pos": pos, "arch": arch, "name": "Essai"}, "essai-%d" % randi())


func frames(k: int) -> void:
	for i in k:
		await physics_frame


func note(what: String, msg: String) -> void:
	print("[%s] %s" % [what, msg])


func shot(name: String) -> void:
	await process_frame
	if DisplayServer.get_name() == "headless":
		return
	root.get_viewport().get_texture().get_image().save_png("%s/%02d-%s.png" % [out, n, name])
	n += 1
