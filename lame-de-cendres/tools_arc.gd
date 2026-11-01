## Outil de développement : l'arc, les kunai, le cheval et les tenues mis à
## l'épreuve ; puis les cinq sortes d'ennemis alignées, la visée et
## l'affrontement photographiés (si l'on n'est pas sans écran).
## OUT=dossier HOUR=15 godot --path . --resolution 800x450 --script res://tools_arc.gd
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
	main.atmosphere.hour = float(OS.get_environment("HOUR")) if OS.get_environment("HOUR") != "" else 15.0
	await frames(3)
	var p: Fighter = main.player
	p.max_hp = 9999.0
	p.hp = 9999.0
	var at := Vector3(-150, 0, 72.5)
	at.y = main.terrain.height_at(at.x, at.z)
	for e in main.enemies:
		if e.global_position.distance_to(at) < 40.0:
			e.global_position += Vector3(0, 0, 400)
	p.global_position = at + Vector3(0, 0.4, 0)
	p.yaw = PI / 2
	main.cam_yaw = PI / 2
	main.cam_pitch = 0.32
	await frames(4)

	# ── l'arc : une cible à vingt pas, un tir visé à la tête
	var t: Fighter = spawn("garde", at + Vector3(18, 0, 0), "epeiste")
	t.yaw = -PI / 2
	await frames(3)
	main.archery.toggle()
	var ev := InputEventAction.new()
	ev.action = "lourd"
	ev.pressed = true
	Input.parse_input_event(ev)
	await frames(2)
	# on vise la tête : la caméra regarde la cible
	for i in 40:
		var to: Vector3 = t.global_position + Vector3(0, 1.62, 0) - main.camera.global_position
		main.cam_yaw = atan2(to.x, to.z)
		await physics_frame
	print("[arc] actif %s, visée %s, tension %.2f, flèches %d" % [main.archery.active, main.archery.aiming, main.archery.draw, main.archery.ammo()])
	await shot("visee")
	var hp0: float = t.hp
	var fire := InputEventAction.new()
	fire.action = "rapide"
	fire.pressed = true
	Input.parse_input_event(fire)
	for i in 120:
		await physics_frame
		if not t.alive:
			break
	print("[arc] cible vie %.0f → %.0f, vivante %s, flèches %d" % [hp0, t.hp, t.alive, main.archery.ammo()])
	var rel := InputEventAction.new()
	rel.action = "lourd"
	rel.pressed = false
	Input.parse_input_event(rel)
	await frames(2)
	main.archery.stow()

	# ── un kunai contre un coup qui se prépare
	var k: Fighter = spawn("garde", at + Vector3(6, 0, 0), "brute")
	k.yaw = -PI / 2
	k.aggro = true
	await frames(2)
	k.play("brute_ecrase")
	main.cam_yaw = PI / 2
	await frames(4)
	main._kunai()
	var interrupted := false
	for i in 90:
		await physics_frame
		if k.action.get("name", "") != "brute_ecrase":
			interrupted = true
			break
	print("[kunai] coup interrompu %s, kunai restants %d" % [interrupted, main.arsenal.ammo.kunai])
	k.global_position += Vector3(0, 0, 400)

	# ── les tenues : le poids, la teinte
	var kg0: float = main.arsenal.load_kg()
	main.arsenal.outfits.append("clan")
	main.wear("clan")
	print("[tenue] %s, charge %.1f → %.1f kg" % [main.arsenal.outfit, kg0, main.arsenal.load_kg()])
	main.wear("voyageur")

	# ── le cheval : on monte, on avance, on galope
	var cav: Cavalier = main.cavalier
	cav.horse.global_position = p.global_position + Vector3(1.5, 0, 0)
	await frames(3)
	var it: Dictionary = main._interactable()
	print("[cheval] invite : %s" % it.get("text", "rien"))
	main._interact()
	await frames(3)
	var start: Vector3 = cav.horse.global_position
	var go := InputEventAction.new()
	go.action = "avant"
	go.pressed = true
	Input.parse_input_event(go)
	var gal := InputEventAction.new()
	gal.action = "garde"
	gal.pressed = true
	Input.parse_input_event(gal)
	for i in 180:
		await physics_frame
	print("[cheval] monté %s, vitesse %.1f m/s, parcouru %.1f m, cavalier sur la selle %s" % [cav.mounted, cav.vel, start.distance_to(cav.horse.global_position), p.global_position.distance_to(cav.horse.global_position) < 2.5])
	var stop := InputEventAction.new()
	stop.action = "avant"
	stop.pressed = false
	Input.parse_input_event(stop)
	var stop2 := InputEventAction.new()
	stop2.action = "garde"
	stop2.pressed = false
	Input.parse_input_event(stop2)
	await frames(30)
	await shot("galop")
	main._interact()
	await frames(3)
	print("[cheval] descendu %s" % (not cav.mounted))

	# ── les cinq sortes d'ennemis, alignées dans un pré, hors des murs
	at = Vector3(-5, 0, 35)
	at.y = main.terrain.height_at(at.x, at.z)
	for e in main.enemies:
		if e.global_position.distance_to(at) < 40.0:
			e.global_position += Vector3(0, 0, 400)
	p.global_position = at + Vector3(0, 0.4, 4.0)
	var row := ["epeiste", "bouclier", "lancier", "brute", "archer"]
	var line: Array = []
	for i in row.size():
		var e: Fighter = spawn("garde" if i % 2 == 0 else "ronin", at + Vector3(4 + i * 1.6, 0, -3.0), row[i])
		e.yaw = 0.0
		e.aggro = false
		line.append(e)
	await frames(6)
	var cam := Camera3D.new()
	cam.fov = 50.0
	root.add_child(cam)
	cam.global_position = at + Vector3(7.2, 1.6, 2.6)
	cam.look_at(at + Vector3(7.2, 1.1, -3.0))
	cam.make_current()
	for i in 6:
		await process_frame
	await shot("ennemis")
	print("FIN")
	quit()


func spawn(kind: String, pos: Vector3, arch: String) -> Fighter:
	pos.y = main.terrain.height_at(pos.x, pos.z)
	return main._spawn({"kind": kind, "role": "enemy", "faction": "damnes", "pos": pos, "arch": arch, "name": "Essai"}, "essai-%d" % randi())


func frames(k: int) -> void:
	for i in k:
		await physics_frame


func shot(name: String) -> void:
	await process_frame
	if DisplayServer.get_name() == "headless":
		return
	root.get_viewport().get_texture().get_image().save_png("%s/%02d-%s.png" % [out, n, name])
	n += 1
