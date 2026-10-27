## La sauvegarde : tout ce qui a changé dans la vallée, dans un fichier JSON
## (user://sauvegarde.json). Écrite aux autels et depuis le menu.
class_name SaveGame
extends RefCounted

const PATH := "user://sauvegarde.json"


static func exists() -> bool:
	return FileAccess.file_exists(PATH)


static func _v(v: Vector3) -> Array:
	return [snappedf(v.x, 0.01), snappedf(v.y, 0.01), snappedf(v.z, 0.01)]


static func vec(a) -> Vector3:
	return Vector3(a[0], a[1], a[2]) if a is Array and a.size() == 3 else Vector3.ZERO


static func write(game) -> bool:
	var p: Fighter = game.player
	var a: Arsenal = game.arsenal
	var lm = game.landmarks
	var d := {
		"version": 1,
		"date": Time.get_datetime_string_from_system(false, true),
		"player": {"pos": _v(p.global_position), "yaw": p.yaw, "hp": p.hp},
		"respawn": _v(game.respawn),
		"arsenal": {"items": a.items, "katanas": a.katanas, "equipped": a.equipped, "souls": a.souls, "learned": a.learned, "ryo": a.ryo},
		"renown": game.renown.to_dict(),
		"discovered": game.discovered.keys(),
		"fog": Marshalls.raw_to_base64(game.fog_image.get_data()),
		"chests": range(lm.chests.size()).filter(func(i): return lm.chests[i].open),
		"doors": range(lm.doors.size()).filter(func(i): return lm.doors[i].open),
		"racks": range(lm.racks.size()).filter(func(i): return lm.racks[i].taken),
		"cages": range(lm.cages.size()).filter(func(i): return lm.cages[i].open),
		"bell_cut": lm.bell.get("cut", false),
		"dead": game.dead_ids.keys(),
		"oni_dead": game.oni_dead,
		"time": game.time,
	}
	var f := FileAccess.open(PATH, FileAccess.WRITE)
	if f == null:
		return false
	f.store_string(JSON.stringify(d))
	return true


static func read() -> Dictionary:
	if not exists():
		return {}
	var f := FileAccess.open(PATH, FileAccess.READ)
	if f == null:
		return {}
	var d = JSON.parse_string(f.get_as_text())
	return d if d is Dictionary else {}
