## Outil de développement : photographie la vallée depuis quelques points de vue.
## godot --path . --script res://tools_shot.gd  (ou via tools/shot.sh)
extends SceneTree

func _initialize() -> void:
	var t0 := Time.get_ticks_msec()
	var main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await process_frame
	print("monde bâti en %d ms" % (Time.get_ticks_msec() - t0))
	var cam := Camera3D.new()
	cam.far = 1200.0
	root.add_child(cam)
	cam.make_current()
	var shots: Array = JSON.parse_string(OS.get_environment("SHOTS"))
	for k in shots.size():
		var s: Array = shots[k]
		var from := Vector3(s[0], s[1], s[2])
		var to := Vector3(s[3], s[4], s[5])
		var t = main.terrain
		from.y += t.height_at(from.x, from.z)
		to.y += t.height_at(to.x, to.z)
		cam.look_at_from_position(from, to)
		if main.vegetation:
			main.vegetation.follow(from)
		var frames := int(OS.get_environment("FRAMES")) if OS.get_environment("FRAMES") != "" else 8
		for f in frames:
			await process_frame
		print("vue %d prête à %d ms" % [k, Time.get_ticks_msec() - t0])
		root.get_viewport().get_texture().get_image().save_png(OS.get_environment("OUT") + "/shot-%d.png" % k)
	quit()
