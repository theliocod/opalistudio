## Outil de développement : photographie les postures de déplacement.
extends SceneTree

func _initialize() -> void:
	var out := OS.get_environment("OUT")
	var main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await process_frame
	main._start()
	main.hud.play_ui.visible = false
	var p: Fighter = main.player
	var at := Vector3(-95, 0, 118)
	at.y = main.terrain.height_at(at.x, at.z)
	main.state = "menu"
	var cam := Camera3D.new()
	root.add_child(cam)
	cam.global_position = at + Vector3(3.2, 1.7, 2.4)
	cam.look_at(at + Vector3(0, 1.0, 0.4))
	cam.make_current()
	var fill := OmniLight3D.new()
	fill.light_color = Color(0.75, 0.8, 1.0)
	fill.light_energy = 1.2
	fill.omni_range = 9.0
	fill.light_cull_mask = 2
	cam.add_child(fill)
	var cases := [["repos fourreau", true, false, 0.0], ["marche fourreau", true, false, 1.5], ["course fourreau", true, false, 5.0],
		["repos dégainé", false, false, 0.0], ["course dégainé", false, false, 5.0], ["accroupi", true, true, 1.0]]
	for k in cases.size():
		var c: Array = cases[k]
		p.global_position = at
		p.yaw = 0.0
		p.action = {}
		p.sheathed = c[1]
		p.sneaking = c[2]
		p.speed = c[3]
		for i in 7:
			p.step(1.0 / 30.0, float(i) / 30.0)
		for i in 3:
			await process_frame
		root.get_viewport().get_texture().get_image().save_png("%s/loco-%d.png" % [out, k])
	quit()
