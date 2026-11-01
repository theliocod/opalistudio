## Outil de développement : quelques photographies de contrôle (la rangée des
## cinq sortes d'ennemis, le bosquet de bambous, la source chaude).
## OUT=dossier HOUR=16 godot --path . --resolution 800x450 --script res://tools_photo.gd
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
	main.atmosphere.hour = float(OS.get_environment("HOUR")) if OS.get_environment("HOUR") != "" else 16.0
	await frames(3)
	var p: Fighter = main.player
	p.max_hp = 9999.0
	p.hp = 9999.0
	var cam := Camera3D.new()
	cam.fov = 50.0
	root.add_child(cam)
	if OS.get_environment("ONLY") == "haiku":
		await haiku()
		quit()
		return

	# la rangée des ennemis, sur la place dallée de Hōjō
	var at := Vector3(-150, 0, 66.0)
	at.y = main.terrain.height_at(at.x, at.z)
	for e in main.enemies:
		if e.global_position.distance_to(at) < 50.0:
			e.global_position += Vector3(0, 0, 400)
	p.global_position = at + Vector3(0, 0.4, 70.0)
	var row := ["epeiste", "bouclier", "lancier", "brute", "archer"]
	var line: Array = []
	for i in row.size():
		var e: Fighter = spawn("garde" if i % 2 == 0 else "ronin", at + Vector3(-3.2 + i * 1.6, 0, 0), row[i])
		e.yaw = 0.0
		e.aggro = false
		line.append(e)
	await frames(8)
	await look(cam, at + Vector3(0.6, 1.5, 5.6), at + Vector3(0, 1.0, 0))
	await shot("ennemis")
	# l'éclat bleu (parable) et l'éclat rouge (imparable), figés à leur plus grand
	for k in [[0, false], [3, true]]:
		main.combat.glint(line[k[0]], k[1])
		var g: Node3D = main.get_child(main.get_child_count() - 1)
		var still: Node3D = g.duplicate()
		main.add_child(still)
		still.global_position = g.global_position
		still.scale = Vector3.ONE * (1.7 if k[1] else 1.35)
	for i in 3:
		await process_frame
	await shot("eclats")
	if OS.get_environment("ONLY") == "eclats":
		quit()
		return

	# le bosquet de bambous
	var d: Decouvertes = main.decouvertes
	for s in d.spots:
		if s.kind == "bambou":
			p.global_position = s.pos + Vector3(2.5, 0.4, 2.5)
			await frames(6)
			await look(cam, s.pos + Vector3(2.8, 1.8, 4.2), s.pos + Vector3(0, 1.6, -2.0))
			await shot("bambous")
			break
	# le grand bosquet de l'ermite
	for pl in main.places:
		if pl.id == "bambous":
			var g := Vector3(pl.pos.x, main.terrain.height_at(pl.pos.x, pl.pos.y), pl.pos.y)
			p.global_position = g + Vector3(0, 0.4, 3.0)
			await frames(6)
			await look(cam, g + Vector3(0, 1.7, 9.0), g + Vector3(0, 3.0, -4.0))
			await shot("bosquet")
	# la source chaude
	var onsen: Dictionary = d.spots[1]
	p.global_position = onsen.pos + Vector3(4.0, 0.4, 4.0)
	await frames(6)
	await look(cam, onsen.pos + Vector3(5, 3, 6), onsen.pos)
	await shot("source")
	print("FIN")
	quit()


## Un lieu de haïku : assis, deux vers choisis, puis le poème.
func haiku() -> void:
	var p: Fighter = main.player
	var d: Decouvertes = main.decouvertes
	var which := int(OS.get_environment("HAIKU")) if OS.get_environment("HAIKU") != "" else 0
	var hk: Dictionary = {}
	var n_hk := 0
	for s in d.spots:
		if s.kind == "haiku":
			if n_hk == which:
				hk = s
				break
			n_hk += 1
	p.global_position = hk.pos + Vector3(0.5, 0.4, 0.5)
	await frames(6)
	main._interact()
	for i in 8:
		await process_frame
	await shot("haiku-assis")
	d._pick_haiku(1)
	d._pick_haiku(0)
	for i in 4:
		await process_frame
	await shot("haiku-vers")
	d._pick_haiku(2)
	for i in 3:
		await process_frame
	await shot("haiku-poeme")


func spawn(kind: String, pos: Vector3, arch: String) -> Fighter:
	pos.y = main.terrain.height_at(pos.x, pos.z)
	return main._spawn({"kind": kind, "role": "enemy", "faction": "damnes", "pos": pos, "arch": arch, "name": "Essai"}, "essai-%d" % randi())


func look(cam: Camera3D, eye: Vector3, target: Vector3) -> void:
	cam.global_position = eye
	cam.look_at(target)
	cam.make_current()
	for i in 6:
		await process_frame


func frames(k: int) -> void:
	for i in k:
		await physics_frame


func shot(name: String) -> void:
	await process_frame
	if DisplayServer.get_name() == "headless":
		return
	root.get_viewport().get_texture().get_image().save_png("%s/%02d-%s.png" % [out, n, name])
	n += 1
