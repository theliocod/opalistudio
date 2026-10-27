## Outil de développement : quelques plans fixes en jeu (personnages, lumières).
## OUT=dossier VIEWS='[[x,z,yaw,pitch], ...]' godot --path . --script res://tools_look.gd
extends SceneTree

func _initialize() -> void:
	var out := OS.get_environment("OUT")
	var main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await process_frame
	main._start({})
	await process_frame
	var views: Array = JSON.parse_string(OS.get_environment("VIEWS"))
	var p: Fighter = main.player
	for k in views.size():
		var v: Array = views[k]
		p.global_position = Vector3(v[0], main.terrain.height_at(v[0], v[1]) + 0.3, v[1])
		main.cam_yaw = v[2]
		main.cam_pitch = v[3]
		p.yaw = v[2]
		main._cam_pos = p.global_position + Vector3(0, 3, 0)
		for i in 14:
			await process_frame
		root.get_viewport().get_texture().get_image().save_png("%s/look-%d.png" % [out, k])
	quit()
