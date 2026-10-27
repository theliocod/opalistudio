## Outil de développement : photographie les bâtiments sous plusieurs angles,
## avec une caméra libre. Les points sont relatifs au centre du lieu PLACE, ou
## du lieu nommé en septième valeur.
## OUT=dossier PLACE=hojo SHOTS='[[ex,ey,ez, tx,ty,tz(, lieu)], ...]' godot --path . --script res://tools_archi.gd
extends SceneTree


func _initialize() -> void:
	var out := OS.get_environment("OUT")
	Engine.max_physics_steps_per_frame = 24
	var main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await process_frame
	Settings.put("affichage", "qualite", int(OS.get_environment("Q") if OS.get_environment("Q") != "" else "2"))
	Settings.apply(main)
	main._start({})
	await process_frame
	var centre := func(id: String) -> Vector3:
		for p in main.places:
			if p.id == id:
				return Vector3(p.pos.x, main.terrain.height_at(p.pos.x, p.pos.y), p.pos.y)
		return Vector3.ZERO
	var shots: Array = JSON.parse_string(OS.get_environment("SHOTS"))
	var cam := Camera3D.new()
	cam.fov = 62.0
	cam.far = 800.0
	root.add_child(cam)
	var p: Fighter = main.player
	# personne ne se bat pendant la visite : les photos restent nettes
	for e in main.enemies:
		e.process_mode = Node.PROCESS_MODE_DISABLED
	for k in shots.size():
		var s: Array = shots[k]
		var c: Vector3 = centre.call(s[6] if s.size() > 6 else OS.get_environment("PLACE"))
		var eye := c + Vector3(s[0], s[1], s[2])
		var at := c + Vector3(s[3], s[4], s[5])
		# le joueur se tient près de ce qu'on regarde : les ombres des lanternes le suivent
		p.global_position = Vector3(at.x, main.terrain.height_at(at.x, at.z) + 0.3, at.z)
		for i in 6:
			await process_frame
		cam.global_position = eye
		cam.look_at(at)
		cam.make_current()
		for i in 8:
			await process_frame
		root.get_viewport().get_texture().get_image().save_png("%s/archi-%d.png" % [out, k])
	print("FIN")
	quit()
