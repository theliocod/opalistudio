## Les mises à mort mises en scène : l'assassinat par-derrière, et les trois
## exécutions (kesa-giri, le dégainé qui traverse puis rengaine, le
## tourbillon). Une caméra de cinéma, des bandes noires, le ralenti au bon
## moment, le sang quand la lame entre.
class_name Cinematics
extends Node

var game
var scene := {}                 # {kind, victim, t, cut, killed, side}
var cam_pos := Vector3.ZERO
var cam_look := Vector3.ZERO


func active() -> bool:
	return not scene.is_empty()


func busy(f: Fighter) -> bool:
	return active() and (scene.victim == f or f == game.player)


## L'assassinat : on saisit par-derrière, la lame entre sous les côtes.
func assassinate(v: Fighter) -> void:
	var p: Fighter = game.player
	p.global_position = v.global_position - v.forward() * 0.8
	p.global_position.y = v.global_position.y + 0.05
	p.yaw = v.yaw
	p.sheathed = false
	p.sneaking = false
	p.play("assassinat")
	var fast: bool = game.arsenal.katana().effect == "shadow"
	if fast:
		p.action.t = 0.3
	v.play("assassine")
	v.move = Vector3.ZERO
	v.speed = 0.0
	_begin({"kind": "assassinat", "victim": v, "t": 0.3 if fast else 0.0, "cut": 0.8, "end": 1.7})


## L'exécution d'un ennemi déséquilibré : le style dépend de ce que l'on sait faire.
func execute(v: Fighter) -> void:
	var p: Fighter = game.player
	var d := v.global_position - p.global_position
	p.yaw = atan2(d.x, d.z)
	v.yaw = p.yaw + PI
	p.sheathed = false
	var styles := ["kesa"]
	if game.arsenal.knows("iai") and v.kind != "oni":
		styles += ["iai", "iai"]
	if game.arsenal.knows("tourbillon"):
		styles.append("tourbillon")
	var style: String = styles.pick_random()
	v.play("executed")
	v.move = Vector3.ZERO
	match style:
		"iai":
			# on recule d'un pas pour avoir l'élan de traverser
			p.global_position = v.global_position - p.forward() * 2.2
			p.global_position.y = v.global_position.y + 0.05
			p.play("iai_exec")
			p.collision_mask = 1
			v.action.def = v.action.def.duplicate()
			v.action.def.dur = 9.0
			_begin({"kind": "iai", "victim": v, "t": 0.0, "cut": 2.3, "end": 2.9})
			Audio.sfx("lame", p.global_position, 2.0)
		"tourbillon":
			p.play("tourbillon")
			_begin({"kind": "tourbillon", "victim": v, "t": 0.0, "cut": 0.55, "end": 1.4})
		_:
			p.play("finisher")
			_begin({"kind": "kesa", "victim": v, "t": 0.0, "cut": 0.8, "end": 2.0})


func _begin(s: Dictionary) -> void:
	scene = s
	scene.killed = false
	scene.side = _clear_side(s.victim)
	var v: Fighter = s.victim
	v.set_meta("cine", true)
	game.hud.letterbox(true)
	# une lumière de plateau sur les personnages
	var fill: OmniLight3D = game.camera.get_node_or_null("Lueur")
	if fill:
		fill.light_energy = 2.2
		fill.omni_range = 12.0
	var p: Fighter = game.player
	var mid := (p.global_position + v.global_position) / 2.0
	cam_pos = game.camera.global_position
	cam_look = mid + Vector3(0, 1.2, 0)


## Le côté d'où filmer : celui où rien ne bouche la vue (mur, feu de camp).
func _clear_side(v: Fighter) -> float:
	var p: Fighter = game.player
	var mid := (p.global_position + v.global_position) / 2.0 + Vector3(0, 1.1, 0)
	var f := p.forward()
	var best := 1.0
	var best_score := -1e9
	for side in [1.0, -1.0]:
		var score := randf() * 0.5
		for d in [2.9, 5.2]:
			var at: Vector3 = mid + Vector3(f.z, 0, -f.x) * side * d
			var q := PhysicsRayQueryParameters3D.create(mid, at, 1 | Landmarks.WALL_LAYER)
			q.exclude = [p.get_rid(), v.get_rid()]
			if not game.get_world_3d().direct_space_state.intersect_ray(q).is_empty():
				score -= 3.0
			for fire in game.landmarks.fires:
				if (fire as Vector3).distance_to(at) < 3.5:
					score -= 5.0
		if score > best_score:
			best_score = score
			best = side
	return best


## Une image de la scène (temps du jeu, donc ralenti compris).
func step(dt: float) -> void:
	if scene.is_empty():
		return
	var v: Fighter = scene.victim
	var p: Fighter = game.player
	scene.t += dt
	if not is_instance_valid(v):
		_end()
		return
	v.move = Vector3.ZERO
	match scene.kind:
		"assassinat":
			# la victime reste collée au samouraï
			var want := p.global_position + p.forward() * 0.8
			v.global_position = Vector3(want.x, v.global_position.y, want.z)
			v.yaw = p.yaw
			if scene.t > 0.55 and scene.t < 0.6:
				game.slowmo = 0.5
		"iai":
			if scene.t > 0.08 and scene.t < 0.12:
				game.slowmo = 0.35
			if scene.t > 0.5:
				p.collision_mask = 1 | 2 | Landmarks.WALL_LAYER
			if scene.t > 2.22 and not p.sheathed:
				p.sheathed = true
				Audio.sfx("rengainer", p.global_position, 3.0)
				Blood.chiburi(game, p.rig)
	if not scene.killed and scene.t >= scene.cut:
		scene.killed = true
		_cut(v)
	if scene.t >= scene.end:
		_end()


## Le moment où la lame entre.
func _cut(v: Fighter) -> void:
	var p: Fighter = game.player
	var chest := v.global_position + Vector3(0, 1.25 * v.rig.body_scale, 0)
	var dir := (v.global_position - p.global_position) * Vector3(1, 0, 1)
	dir = dir.normalized() if dir.length_squared() > 0.001 else p.forward()
	var big: bool = scene.kind == "iai"
	Blood.spray(game, chest, dir + Vector3(0, 0.35, 0), 140 if big else 90, 1.4 if big else 1.0)
	Blood.spray(game, chest, -dir + Vector3(0, 0.6, 0), 40, 0.7)
	Blood.stain(game, func(at): return game.terrain_height(at), v.global_position, dir, 3, 1.6)
	Blood.stain_blade(p.rig, 0.6)
	Audio.sfx("chair", chest, 3.0)
	Audio.sfx("sang", chest, 2.0)
	if scene.kind != "assassinat":
		Audio.sfx("grace", null, -2.0, 0.0)
	game.hitstop = 0.16 if big else 0.12
	game.slowmo = 0.9 if big else 0.6
	game.shake = 0.45 if big else 0.3
	var oni := v.kind == "oni"
	if oni:
		v.hp -= v.max_hp * 0.3
		if v.hp > 0.0:
			v.play("stagger")
			return
	game.execute_kill(v, scene.kind)


func _end() -> void:
	var v = scene.get("victim")
	if is_instance_valid(v):
		v.remove_meta("cine")
	var p: Fighter = game.player
	p.collision_mask = 1 | 2 | Landmarks.WALL_LAYER
	scene = {}
	game.hud.letterbox(false)
	var fill: OmniLight3D = game.camera.get_node_or_null("Lueur")
	if fill:
		fill.light_energy = 0.7
		fill.omni_range = 9.0


## La caméra de cinéma : un plan de côté, bas, qui tourne doucement.
func camera(real: float) -> bool:
	if scene.is_empty():
		return false
	var p: Fighter = game.player
	var v: Fighter = scene.victim if is_instance_valid(scene.victim) else p
	var mid := (p.global_position + v.global_position) / 2.0
	var f := p.forward()
	var side: Vector3 = Vector3(f.z, 0, -f.x) * scene.side
	var orbit: float = scene.t * 0.35
	var want: Vector3 = mid + side.rotated(Vector3.UP, orbit * scene.side) * 2.9 + f * 0.6 + Vector3(0, 1.05, 0)
	if scene.kind == "iai":
		# le dégainé : un plan large, fixe, pour voir la traversée
		want = mid + side * 4.0 + Vector3(0, 1.25, 0)
	var ground: float = game.terrain_height(want) + 0.4
	want.y = maxf(want.y, ground)
	cam_pos = cam_pos.lerp(want, 1.0 - exp(-real * 5.0))
	cam_look = cam_look.lerp(mid + Vector3(0, 1.15, 0), 1.0 - exp(-real * 6.0))
	game.camera.global_position = cam_pos
	game.camera.look_at(cam_look)
	return true
