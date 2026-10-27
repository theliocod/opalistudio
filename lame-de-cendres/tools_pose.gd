## Outil de développement : fige le samouraï dans chaque coup et le photographie.
## OUT=dossier godot --path . --script res://tools_pose.gd
extends SceneTree

func _initialize() -> void:
	var out := OS.get_environment("OUT")
	var main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await process_frame
	main._start()
	for i in 10:
		await process_frame
	var p: Fighter = main.player
	var at := Vector3(-95, 0, 118)
	at.y = main.terrain.height_at(at.x, at.z)
	p.global_position = at + Vector3(0, 0.05, 0)
	p.yaw = 0.0
	main.arsenal.add_katana("kurenai")
	main._equip("kurenai")
	main.state = "menu"
	var cam := Camera3D.new()
	root.add_child(cam)
	cam.global_position = at + Vector3(3.2, 1.7, 2.4)
	cam.look_at(at + Vector3(0, 1.0, 0.4))
	cam.make_current()
	main.hud.play_ui.visible = false
	var poses := [["garde", "", 0.0], ["rapide 1", "light1", 0.2], ["rapide 3", "light3", 0.3], ["lourd", "heavy", 0.5],
		["coup de pied", "kick", 1.2], ["tourbillon", "tourbillon", 0.6], ["iai", "iai", 0.22], ["coup de grâce", "finisher", 0.75],
		["parade", "parry", 0.15], ["esquive", "dodge", 0.2]]
	for k in poses.size():
		var pr: Array = poses[k]
		p.global_position = at + Vector3(0, 0.05, 0)
		p.yaw = 0.0
		if pr[1] == "":
			p.action = {}
		else:
			p.play(pr[1])
			p.action.t = pr[2]
		p.step(0.0, 0.0)
		for i in 4:
			await process_frame
		var tip := p.rig.blade_tip.global_position - p.global_position
		print("%s : pointe de la lame à (%.2f, %.2f, %.2f)" % [pr[0], tip.x, tip.y, tip.z])
		root.get_viewport().get_texture().get_image().save_png("%s/pose-%02d.png" % [out, k])
	quit()
