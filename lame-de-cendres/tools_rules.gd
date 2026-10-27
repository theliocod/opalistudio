## Outil de développement : vérifie les règles sans rendu (fourreau, portes, coups de pied).
## godot --headless --path . --script res://tools_rules.gd
extends SceneTree

var main


func _initialize() -> void:
	main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await process_frame
	main._start()
	var p: Fighter = main.player
	await phys(5)
	print("[départ] fourreau %s, lame visible %s" % [p.sheathed, p.rig.sword.visible])

	main._buffer("light", 0.3)
	var seen := []
	for i in 120:
		await physics_frame
		var n: String = p.action.get("name", "-")
		if seen.is_empty() or seen[-1] != n:
			seen.append(n)
	print("[premier coup] actions %s, fourreau %s, lame visible %s" % [seen, p.sheathed, p.rig.sword.visible])

	await phys(9 * 60)
	print("[calme] fourreau après 9 s : %s, action %s" % [p.sheathed, p.action.get("name", "-")])
	await phys(90)
	print("[calme] fourreau : %s, lame visible %s" % [p.sheathed, p.rig.sword.visible])

	# une porte du village
	var d: Dictionary = main.landmarks.doors[0]
	var out: Vector3 = d.hinge.global_transform.basis.z
	p.global_position = d.pos + out * 1.4 + Vector3(0, 0.4, 0)
	await phys(10)
	var it: Dictionary = main._interactable()
	print("[porte] proposé : %s" % it.get("text", "non"))
	main._interact()
	await phys(120)
	print("[porte] ouverte : %s, collision coupée : %s" % [d.open, d.shape.disabled])

	# le coup de pied direct sur un ronin
	var e: Fighter = null
	for o in main.enemies:
		if o.kind == "ronin":
			e = o
			break
	e.global_position = p.global_position + Vector3(0, 0, -2.0)
	e.cd = 99.0
	p.yaw = PI
	var before := e.global_position
	var hp := e.hp
	main._buffer("frontkick", 0.3)
	var best := 99.0
	var best_t := 0.0
	for i in 90:
		await physics_frame
		if p.is_doing(["frontkick"]):
			for f in p.rig.feet:
				var fp: Vector3 = f.global_position
				var c := e.global_position + Vector3(0, 1.3, 0)
				var dd := Vector2(fp.x - c.x, fp.z - c.z).length()
				if dd < best:
					best = dd
					best_t = p.action.t
	print("[pied] plus proche : %.2f m à t=%.2f, distance ronin %.2f" % [best, best_t, e.flat_distance(p)])
	print("[coup de pied] ronin touché : %s (vie %d → %d, posture %d), recul %.1f m" % [e.hp < hp, hp, e.hp, e.posture, before.distance_to(e.global_position)])

	# enjamber un muret de champ
	var w: Array = main.landmarks.walls[main.landmarks.walls.size() - 1]
	var a: Vector2 = w[0]
	var b: Vector2 = w[1]
	var mid := (a + b) / 2.0
	var n := Vector2(-(b - a).y, (b - a).x).normalized()
	var start := mid - n * 1.6
	p.action = {}
	p.global_position = Vector3(start.x, main.terrain.height_at(start.x, start.y) + 0.3, start.y)
	p.yaw = atan2(n.x, n.y)
	await phys(10)
	var side0 := signf((Vector2(p.global_position.x, p.global_position.z) - mid).dot(n))
	main._buffer("dodge", 0.2)
	var acts := []
	for i in 120:
		await physics_frame
		var nm: String = p.action.get("name", "-")
		if acts.is_empty() or acts[-1] != nm:
			acts.append(nm)
	var side1 := signf((Vector2(p.global_position.x, p.global_position.z) - mid).dot(n))
	print("[muret] actions %s, passé de l'autre côté : %s, distance au muret %.1f m" % [acts, side0 != side1, absf((Vector2(p.global_position.x, p.global_position.z) - mid).dot(n))])
	quit()


func phys(n: int) -> void:
	for i in n:
		await physics_frame
