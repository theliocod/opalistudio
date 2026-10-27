## Le comportement des gens des villes : les promeneurs, les marchands, les
## gardes et leurs rondes, les samouraïs du Registre. Les damnés gardent
## leur propre cerveau (Fighter.think).
class_name Folk
extends RefCounted


static func think(f: Fighter, game, dt: float) -> void:
	if not f.alive:
		f.move = Vector3.ZERO
		f.speed *= 0.9
		return
	f.fear_t = maxf(0.0, f.fear_t - dt)
	f.wait_t -= dt
	match f.role:
		"civil", "merchant": _civil(f, game, dt)
		"guard": _guard(f, game, dt)
		"samurai": _samurai(f, game, dt)
		_: f.think(game.player, game.enemies, dt, game.token)


## Marcher vers un point ; vrai une fois arrivé.
static func walk_to(f: Fighter, to: Vector3, spd: float, dt: float, others: Array) -> bool:
	var d := Vector2(to.x - f.global_position.x, to.z - f.global_position.z)
	if d.length() < 0.6:
		f.move = Vector3.ZERO
		f.speed *= 0.8
		return true
	f.turn_towards(to, 4.0, dt)
	var mv := f.forward() * spd
	# on s'écarte des autres plutôt que de les traverser
	for o in others:
		if o == f or not o.alive:
			continue
		var away: Vector3 = (f.global_position - o.global_position) * Vector3(1, 0, 1)
		var dist := away.length()
		if dist < 1.2 and dist > 0.001:
			mv += away.normalized() * (1.2 - dist) * 2.5
	f.move = mv
	f.speed = spd
	return false


static func stand(f: Fighter, yaw: float, dt: float) -> void:
	f.move = Vector3.ZERO
	f.speed *= 0.8
	f.yaw += angle_difference(f.yaw, yaw) * minf(1.0, dt * 3.0)


static func _civil(f: Fighter, game, dt: float) -> void:
	var p: Fighter = game.player
	if f.talking:
		f.move = Vector3.ZERO
		f.speed = 0.0
		f.turn_towards(p.global_position, 5.0, dt)
		return
	if f.get_meta("prisoner", false):
		stand(f, f.post_yaw, dt)
		return
	# la peur : on fuit le danger, puis on se terre en tremblant
	if f.fear_t > 0.0:
		f.idle_override = "peur"
		var away: Vector3 = (f.global_position - game.danger_at) * Vector3(1, 0, 1)
		if away.length() < 14.0 and f.fear_t > 4.0:
			walk_to(f, f.global_position + away.normalized() * 6.0, 4.2, dt, game.enemies)
		else:
			f.move = Vector3.ZERO
			f.speed *= 0.8
		return
	f.idle_override = ""
	if f.get_meta("walker", false):
		var target: Vector3 = f.get_meta("target", f.home)
		if f.wait_t > 0.0:
			f.move = Vector3.ZERO
			f.speed *= 0.8
		elif walk_to(f, target, 0.95 if f.walk_clip == "vieux-marche" else 1.35, dt, game.enemies):
			var pts: Array = game.landmarks.streets.get("hojo", [])
			if not pts.is_empty():
				f.set_meta("target", pts[randi() % pts.size()])
			f.wait_t = randf_range(2.0, 7.0)
	else:
		stand(f, f.post_yaw, dt)
	_greet(f, game)


## Au passage du joueur : un salut s'il est célèbre, un recul s'il est craint.
static func _greet(f: Fighter, game) -> void:
	var p: Fighter = game.player
	if f.flat_distance(p) > 3.2 or not f.action.is_empty() or game.time < float(f.get_meta("greet_t", -99.0)) + 40.0:
		return
	f.set_meta("greet_t", game.time)
	if game.renown.infamy >= 30:
		f.gesture("peur" if f.role == "civil" else "agace")
	elif game.renown.fame >= 40:
		f.turn_towards(p.global_position, 50.0, 0.1)
		f.gesture("salut")


static func _guard(f: Fighter, game, dt: float) -> void:
	var p: Fighter = game.player
	if f.talking:
		f.move = Vector3.ZERO
		f.speed = 0.0
		f.turn_towards(p.global_position, 5.0, dt)
		return
	# Hōjō : ils ne se battent que si tu deviens un criminel
	if f.faction == "hojo":
		# le capitaine ne quitte pas sa porte : c'est à lui qu'on paie l'amende
		var captain: bool = f.npc_id == "saito" and not f.get_meta("provoked", false)
		if game.renown.hojo_hostile() and f.flat_distance(p) < 30.0 and not captain:
			f.hostile = true
			f.sheathed = false
			f.fight(p, game.enemies, dt, game.token, false)
			return
		f.hostile = false
		f.aggro = false
		f.sheathed = true
		_patrol(f, game, dt)
		_greet(f, game)
		return
	# Akagane : la furtivité (Stealth) décide de leur état d'alerte
	match f.alert:
		"alerte":
			f.hostile = true
			f.sheathed = false
			f.idle_override = ""
			f.fight(p, game.enemies, dt, game.token, false)
		"doute":
			f.idle_override = ""
			if f.wait_t > 0.0:
				# il est arrivé : il regarde autour de lui
				f.idle_override = "guet"
				f.move = Vector3.ZERO
				f.speed *= 0.8
			elif walk_to(f, f.last_seen, 1.6, dt, game.enemies):
				f.wait_t = 4.0
		"recherche":
			f.idle_override = ""
			f.sheathed = false
			var target: Vector3 = f.get_meta("search", f.last_seen)
			if walk_to(f, target, 2.0, dt, game.enemies):
				f.set_meta("search", f.last_seen + Vector3(randf_range(-7, 7), 0, randf_range(-7, 7)))
		_:
			f.idle_override = ""
			f.sheathed = true
			f.aggro = false
			_patrol(f, game, dt)


## La ronde : de point en point ; ou le poste, face à son regard.
static func _patrol(f: Fighter, game, dt: float) -> void:
	if f.route.is_empty():
		if Vector2(f.global_position.x - f.home.x, f.global_position.z - f.home.z).length() > 1.0:
			walk_to(f, f.home, 1.6, dt, game.enemies)
		else:
			stand(f, f.post_yaw, dt)
		return
	if f.wait_t > 0.0:
		f.move = Vector3.ZERO
		f.speed *= 0.8
		return
	if walk_to(f, f.route[f.route_i], 1.45, dt, game.enemies):
		f.route_i = (f.route_i + 1) % f.route.size()
		f.wait_t = randf_range(1.5, 3.5)


static func _samurai(f: Fighter, game, dt: float) -> void:
	var p: Fighter = game.player
	if f.duel:
		if f.yielded:
			f.move = Vector3.ZERO
			f.speed = 0.0
			return
		f.hostile = true
		f.sheathed = false
		f.fight(p, game.enemies, dt, game.token, false)
		return
	if f.faction == "hojo" and game.renown.hojo_hostile() and f.flat_distance(p) < 20.0:
		f.hostile = true
		f.sheathed = false
		f.fight(p, game.enemies, dt, game.token, false)
		return
	f.hostile = false
	f.aggro = false
	f.sheathed = true
	if f.talking:
		f.move = Vector3.ZERO
		f.speed = 0.0
		f.turn_towards(p.global_position, 4.0, dt)
		return
	if Vector2(f.global_position.x - f.home.x, f.global_position.z - f.home.z).length() > 1.2:
		walk_to(f, f.home, 1.4, dt, game.enemies)
		f.idle_override = ""
		return
	stand(f, f.post_yaw, dt)
