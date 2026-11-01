## Outil de développement : le cheval photographié à l'arrêt, au pas, au trot,
## au galop, puis monté ; et le renard.
## OUT=dossier godot --path . --resolution 800x450 --script res://tools_cheval.gd
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
	var cav: Cavalier = main.cavalier
	var p: Fighter = main.player
	var at := Vector3(-150, 0, 72.5)
	at.y = main.terrain.height_at(at.x, at.z)
	for e in main.enemies:
		if e.global_position.distance_to(at) < 14.0:
			e.global_position += Vector3(0, 0, 300)
	cav.horse.global_position = at + Vector3(0, 0.3, 0)
	cav.yaw = PI / 2
	p.global_position = at + Vector3(-3, 0.3, 1.5)
	var cam := Camera3D.new()
	cam.fov = 50.0
	root.add_child(cam)
	# une lampe de plateau, pour bien voir la démarche la nuit
	var lamp := OmniLight3D.new()
	lamp.light_energy = 2.5
	lamp.omni_range = 12.0
	cav.horse.add_child(lamp)
	lamp.position = Vector3(2.0, 3.0, 3.0)
	print("[cheval] dimensions %s" % cav.body.dims)
	# à l'arrêt, de profil
	await frames(10)
	await look(cam, cav.horse.global_position + Vector3(0, 1.3, 5.0), cav.horse.global_position + Vector3(0, 1.0, 0))
	await shot("arret")
	# au pas, au trot, au galop : on fige la vitesse et on regarde la cadence
	for g in [["pas", 1.7], ["trot", 4.2], ["galop", 11.0]]:
		for i in 40:
			cav.vel = g[1]
			cav.yaw = PI / 2
			cav.horse.global_position = at + Vector3(-6, 0.3, 0)
			await physics_frame
		for k in 2:
			cav.horse.global_position = at + Vector3(-1, 0.3, 0)
			cav.vel = g[1]
			for i in 3:
				await process_frame
				cam.global_position = cav.horse.global_position + Vector3(0, 1.3, 5.0)
				cam.look_at(cav.horse.global_position + Vector3(0, 1.0, 0))
				cam.make_current()
			await shot("%s-%d" % [g[0], k])
	cav.vel = 0.0
	# monté
	p.global_position = cav.horse.global_position + Vector3(1, 0.3, 0)
	cav.mount()
	await frames(12)
	await look(cam, cav.horse.global_position + Vector3(3.5, 2.4, 4.5), cav.horse.global_position + Vector3(0, 1.6, 0))
	await shot("monte")
	print("[monté] joueur %s, cheval %s" % [p.global_position, cav.horse.global_position])
	# le renard
	var fox := Quadrupede.new("renard")
	main.add_child(fox)
	fox.global_position = at + Vector3(4, 0, 1.5)
	fox.global_position.y = main.terrain.height_at(fox.global_position.x, fox.global_position.z)
	for i in 20:
		fox.speed = 2.4
		fox.step(1.0 / 60.0)
		await process_frame
	print("[renard] dimensions %s" % fox.dims)
	await look(cam, fox.global_position + Vector3(0, 0.5, 2.2), fox.global_position + Vector3(0, 0.3, 0))
	await shot("renard")
	print("FIN")
	quit()


func look(cam: Camera3D, eye: Vector3, at: Vector3) -> void:
	cam.global_position = eye
	cam.look_at(at)
	cam.make_current()
	for i in 4:
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
