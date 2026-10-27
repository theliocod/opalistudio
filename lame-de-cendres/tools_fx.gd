## Outil de développement : photographie la fumée et le sang, seuls.
## OUT=dossier godot --path . --resolution 800x450 --script res://tools_fx.gd
extends SceneTree

func _initialize() -> void:
	var out := OS.get_environment("OUT")
	var main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await process_frame
	Settings.put("affichage", "qualite", 0)
	Settings.apply(main)
	main._start({})
	await process_frame
	var p: Fighter = main.player
	var at := Vector3(-95, 0, 118)
	at.y = main.terrain.height_at(at.x, at.z)
	p.global_position = at + Vector3(0, 0.3, 0)
	main.cam_yaw = 0.0
	for k in 3:
		await process_frame
	main.atmosphere.env.glow_enabled = OS.get_environment("GLOW") != "0"
	main._smoke(at + Vector3(0, 0, 5))
	for k in 3:
		await process_frame
	root.get_viewport().get_texture().get_image().save_png(out + "/fx-fumee.png")
	await process_frame
	main.smoke_t = 0.0
	Blood.spray(main, at + Vector3(2, 1.3, 5), Vector3(1, 0.3, 0), 80, 1.2)
	for k in 2:
		await process_frame
	root.get_viewport().get_texture().get_image().save_png(out + "/fx-sang.png")
	quit()
