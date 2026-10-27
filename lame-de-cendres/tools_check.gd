## Outil de développement : charge tous les scripts et signale ceux qui ne compilent pas.
extends SceneTree

func _initialize() -> void:
	var bad := 0
	for dir in ["res://scripts/world", "res://scripts/actors", "res://scripts/game", "res://scripts/ui", "res://scripts"]:
		var d := DirAccess.open(dir)
		if d == null:
			continue
		for f in d.get_files():
			if f.ends_with(".gd"):
				var s: GDScript = load(dir + "/" + f)
				if s == null or not s.can_instantiate():
					print("ÉCHEC ", dir, "/", f)
					bad += 1
	print("scripts en échec : ", bad)
	quit()
