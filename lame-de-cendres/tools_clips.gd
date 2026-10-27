## Outil de développement : mesure, image par image, la vitesse de la pointe
## de la lame et des pieds dans chaque animation Mixamo.
## godot --headless --path . --script res://tools_clips.gd
extends SceneTree

func _initialize() -> void:
	Fighter.load_clips()
	var f := Node3D.new()
	f.set("rig", null)
	var rig := Rig.new("player")
	root.add_child(rig)
	await process_frame
	for clip in ["tourbillon", "revers"]:
		var c: Dictionary = Fighter.CLIPS[clip]
		var n: int = c.frames.size()
		var prev := {}
		var line := "%s (%.2f s) :\n" % [clip, c.duration]
		for i in range(0, n, 3):
			var q := {}
			for j in c.joints.size():
				q[c.joints[j]] = c.q[i][j]
			rig.set_quats(q, c.frames[i].y)
			rig.force_update_transform()
			var tip := rig.blade_tip.global_position
			var fl := rig.feet[0].global_position
			var fr := rig.feet[1].global_position
			var t: float = float(i) / c.fps
			if prev:
				var dt: float = t - prev.t
				line += "  %.2f  lame %4.1f m/s  pieds %4.1f / %4.1f  pied haut %.2f\n" % [t, tip.distance_to(prev.tip) / dt, fl.distance_to(prev.fl) / dt, fr.distance_to(prev.fr) / dt, maxf(fl.y, fr.y)]
			prev = {"t": t, "tip": tip, "fl": fl, "fr": fr}
		print(line)
	quit()
