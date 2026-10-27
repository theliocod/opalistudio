## Outil de développement : aligne les personnages, chacun dans son geste, et
## les photographie. OUT=dossier godot --path . --script res://tools_lineup.gd
## LINEUP='[["garde","guet",1.0], ...]' : type, animation (repos ou geste), instant
extends SceneTree

func _initialize() -> void:
	var out := OS.get_environment("OUT")
	var main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await process_frame
	main.hud.hide_screen()
	main.hud.play_ui.visible = false
	var line: Array = JSON.parse_string(OS.get_environment("LINEUP")) if OS.get_environment("LINEUP") != "" else [
		["garde", "guet", 1.0], ["paysan", "cueillir", 1.0], ["villageoise", "femme", 1.0], ["marchand", "comptoir", 1.0],
		["noble", "accueil", 1.2], ["moine", "priere", 1.0], ["onnamusha", "salut", 1.0], ["jubei", "boire", 2.0],
		["kojiro", "seiza", 1.0], ["oyuki", "parler", 1.0], ["player", "accroupi", 0.5], ["player", "roulade", 0.3]]
	var at := Vector3(-95, 0, 118)
	at.y = main.terrain.height_at(at.x, at.z)
	var fighters := []
	for i in line.size():
		var e: Array = line[i]
		var f := Fighter.new(e[0])
		main.add_child(f)
		f.global_position = at + Vector3((i - line.size() / 2.0) * 1.3, 0.05, 0)
		f.yaw = 0.0
		f.sheathed = true
		if Fighter.ACTIONS.has(e[1]) and Fighter.ACTIONS[e[1]].has("clip") and not e[1] in ["accroupi"]:
			f.play(e[1])
			f.action.t = e[2]
		elif e[1] == "accroupi":
			f.sneaking = true
		else:
			f.idle_clip = e[1]
		fighters.append(f)
	var cam := Camera3D.new()
	root.add_child(cam)
	cam.fov = 50.0
	cam.make_current()
	# une lumière de studio, pour bien voir les modèles
	var key := OmniLight3D.new()
	key.omni_range = 30.0
	key.light_energy = 3.0
	root.add_child(key)
	key.global_position = at + Vector3(0, 4, 5)
	var half := ceili(line.size() / 2.0)
	for shot in 2:
		var cx := ((shot * half + half / 2.0 - 0.5) - line.size() / 2.0) * 1.3
		cam.global_position = at + Vector3(cx, 1.3, 5.2)
		cam.look_at(at + Vector3(cx, 0.95, 0))
		for k in 6:
			for f in fighters:
				f.step(0.0 if not f.action.is_empty() else 0.016, 1.0 + k * 0.016)
			await process_frame
		root.get_viewport().get_texture().get_image().save_png("%s/lineup-%d.png" % [out, shot])
	quit()
