## Outil de développement : joue un scénario et photographie les étapes.
## OUT=dossier godot --path . --script res://tools_play.gd
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
	main._start()
	await frames(20)
	var p: Fighter = main.player
	note("départ", "vie %d, skin %s, ennemis %d, coffres %d" % [p.hp, p.skin != null, main.enemies.size(), main.landmarks.chests.size()])
	await shot("autel")

	# au village : on se place face à un ronin
	var village: Vector3 = main.landmarks.spawns[0].pos
	p.global_position = village + Vector3(0, 0.6, 5)
	main.cam_yaw = PI
	await frames(30)
	var e := nearest()
	note("village", "ronin à %.1f m, aggro %s" % [e.flat_distance(p), e.aggro])
	await shot("village")
	# un seul adversaire pour le test de parade : les autres s'éloignent
	var parked := {}
	for o in main.enemies:
		if o != e:
			parked[o] = o.global_position
			o.global_position += Vector3(0, 0, 400)
			o.aggro = false

	# on attend son attaque et on pare au dernier moment, par les vraies commandes
	var parried := false
	var hp_before := p.hp
	for i in 600:
		await physics_frame
		if not e.action.is_empty() and e.action.def.has("windup") and e.action.t > e.action.def.windup - 0.1:
			main.block_press_t = 0.0
			main._buffer("parry", 0.12)
			break
	await frames(6)
	parried = e.is_doing(["stagger"])
	note("parade", "ennemi déséquilibré : %s, vie perdue %d" % [parried, hp_before - p.hp])
	await shot("parade")

	# le coup de grâce
	var it: Dictionary = main._interactable()
	note("coup de grâce", "proposé : %s" % it.get("text", "non"))
	if it.get("kind", "") == "finisher":
		main._interact()
		for i in 12:
			await frames(4)
			if i == 5:
				await shot("grace")
		await frames(20)
	note("après", "ronin vivant %s, âmes %d, butins au sol %d" % [is_instance_valid(e) and e.alive, main.arsenal.souls, main.pickups.size()])
	for o in parked:
		o.global_position = parked[o]

	# les autres ronins du village, au sabre
	for k in 3:
		var t := nearest()
		if t == null or t.flat_distance(p) > 30.0:
			break
		p.global_position = t.global_position + Vector3(0, 0.6, 2.0)
		for i in 60:
			main._buffer("light", 0.3)
			await frames(3)
			if not is_instance_valid(t) or not t.alive:
				break
		note("combat", "ronin %d vivant %s, vie joueur %d, âmes %d" % [k, is_instance_valid(t) and t.alive, p.hp, main.arsenal.souls])
	await shot("combat")
	note("techniques", "apprises : %s" % [main.arsenal.learned])

	# ramasser le butin
	for pk in main.pickups.duplicate():
		p.global_position = pk.pos
		await frames(4)
	note("butin", "objets %s" % [main.arsenal.items])

	# le coffre du village et son katana
	for c in main.landmarks.chests:
		if c.place == "village":
			p.global_position = c.pos + Vector3(0, 0.5, 1.6)
			await frames(6)
			note("coffre", "proposé : %s" % main._interactable().get("text", "non"))
			main._interact()
			await frames(10)
	note("katanas", "%s" % [main.arsenal.katanas])
	main._equip("kurenai")
	await frames(10)
	await close_shot("kurenai")

	# la technique Tourbillon, s'il la connaît
	if main.arsenal.knows("tourbillon"):
		main._buffer("tourbillon", 0.3)
		for i in 8:
			await frames(3)
			if i == 4:
				await close_shot("tourbillon")

	# l'inventaire
	main.state = "menu"
	main.hud.show_inventory(main.arsenal)
	await frames(4)
	await shot("inventaire")
	main.hud.hide_inventory()
	main.state = "play"

	# le temple et l'Oni
	var temple: Vector3 = Vector3(30, 0, -140)
	temple.y = main.terrain.height_at(temple.x, temple.z)
	p.global_position = temple + Vector3(0, 0.6, 14)
	main.cam_yaw = PI
	await frames(40)
	await shot("temple")
	quit()


func nearest() -> Fighter:
	var best: Fighter = null
	var bd := 1e9
	for e in main.enemies:
		if e.alive and e.flat_distance(main.player) < bd:
			bd = e.flat_distance(main.player)
			best = e
	return best


func frames(k: int) -> void:
	for i in k:
		await process_frame


func note(what: String, msg: String) -> void:
	print("[%s] %s" % [what, msg])


func shot(name: String) -> void:
	await frames(3)
	n += 1
	root.get_viewport().get_texture().get_image().save_png("%s/%02d-%s.png" % [out, n, name])


## Une vue rapprochée du samouraï, de trois quarts face.
func close_shot(name: String) -> void:
	var p: Fighter = main.player
	var cam := Camera3D.new()
	root.add_child(cam)
	var f := p.forward()
	cam.global_position = p.global_position + f * 2.6 + Vector3(f.z, 0, -f.x) * 1.4 + Vector3(0, 1.6, 0)
	cam.look_at(p.global_position + Vector3(0, 1.1, 0))
	cam.make_current()
	await shot(name)
	main.camera.make_current()
	cam.queue_free()
