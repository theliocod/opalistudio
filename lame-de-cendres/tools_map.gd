## Outil de développement : un petit tour, puis la carte à deux niveaux de zoom.
extends SceneTree

func _initialize() -> void:
	var out := OS.get_environment("OUT")
	var main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await process_frame
	main._start()
	var p: Fighter = main.player
	# le chemin de l'autel au village, puis au camp
	var route := [Vector2(-120, 150), Vector2(-98, 128), Vector2(-75, 105), Vector2(-55, 80), Vector2(-35, 55), Vector2(-5, 70), Vector2(30, 85), Vector2(60, 95), Vector2(85, 105)]
	for i in route.size() - 1:
		for k in 6:
			var w: Vector2 = route[i].lerp(route[i + 1], k / 6.0)
			p.global_position = Vector3(w.x, main.terrain.height_at(w.x, w.y) + 0.3, w.y)
			for f in 2:
				await physics_frame
	p.global_position = Vector3(40, main.terrain.height_at(40, 70) + 0.3, 70)
	p.yaw = 2.2
	main.cam_yaw = 2.4
	main.set_waypoint(Vector3(30, 0, -140))
	main.state = "map"
	main.map_view.open()
	main.hud.play_ui.visible = false
	for i in 6:
		await process_frame
	root.get_viewport().get_texture().get_image().save_png(out + "/carte-1.png")
	main.map_view.zoom = 1.0
	main.map_view.center = Vector2(0.5, 0.5)
	main.map_view._apply_view()
	for i in 4:
		await process_frame
	root.get_viewport().get_texture().get_image().save_png(out + "/carte-2.png")
	main.map_view.zoom = 3.2
	main.map_view.center = main.map_view._world_to_uv(Vector3(-35, 0, 55))
	main.map_view._apply_view()
	for i in 4:
		await process_frame
	root.get_viewport().get_texture().get_image().save_png(out + "/carte-3.png")
	quit()
