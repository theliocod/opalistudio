## L'état du corps du samouraï : la charge qu'il porte, ses blessures (il
## boite, il saigne), son souffle, les flammes qui le dévorent, l'eau où il
## avance, les chutes, et sa lame (ensanglantée, émoussée, ou fraîchement affûtée).
class_name Condition
extends RefCounted

var game
var bleed := 0.0                # l'hémorragie : secondes restantes
var burn := 0.0                 # en feu : secondes restantes
var sharp := 0.0                # lame affûtée : secondes restantes
var water := 0.0                # la profondeur d'eau sous lui
var winded := 0.0               # à bout de souffle : secondes restantes
var kg := 0.0                   # sa charge, en kg
var weight := {}                # ce que cette charge lui coûte (Arsenal.burden)
var _fall_top := -1e9            # le point le plus haut de la chute en cours
var _drip_t := 0.0
var _splash_t := 0.0
var _heart_t := 0.0
var _load_t := 0.0
var _pant_t := 0.0
var flames: CPUParticles3D


func _init(g) -> void:
	game = g
	weight = Arsenal.burden(0.0)


## Les flammes qui s'accrochent au joueur (créées avec lui).
func attach(p: Fighter) -> void:
	flames = CPUParticles3D.new()
	flames.amount = 40
	flames.lifetime = 0.6
	flames.local_coords = false
	flames.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	flames.emission_box_extents = Vector3(0.25, 0.7, 0.25)
	flames.direction = Vector3.UP
	flames.spread = 15.0
	flames.gravity = Vector3(0, 3.0, 0)
	flames.initial_velocity_min = 0.4
	flames.initial_velocity_max = 1.2
	var q := QuadMesh.new()
	q.size = Vector2(0.35, 0.45)
	var m: StandardMaterial3D = game.fire._flame_mat
	q.material = m
	flames.mesh = q
	var ramp := Gradient.new()
	ramp.set_color(0, Color(1.0, 0.8, 0.4, 0.9))
	ramp.set_color(1, Color(0.7, 0.1, 0.02, 0.0))
	flames.color_ramp = ramp
	flames.emitting = false
	p.add_child(flames)
	flames.position = Vector3(0, 0.95, 0)


func set_on_fire(t: float) -> void:
	if water > 0.4 or game.weather.rain > 0.8:
		return
	if burn <= 0.0:
		Audio.sfx("embrasement", game.player.global_position, -6.0)
		game.hud.callout("En feu !", Color(1.0, 0.5, 0.15))
	burn = maxf(burn, t)


## Une image : la charge, l'eau, les flammes, le sang, les chutes.
func step(dt: float) -> void:
	var p: Fighter = game.player
	var a: Arsenal = game.arsenal
	_load_t -= dt
	if _load_t <= 0.0:
		_load_t = 0.5
		kg = a.load_kg()
		weight = Arsenal.burden(kg)
	water = game.water_depth(p.global_position)
	# dans l'eau : on avance lentement, les pas éclaboussent, les flammes s'éteignent
	if water > 0.15:
		if burn > 0.0:
			burn = 0.0
			Audio.sfx("eclaboussure", p.global_position, 2.0)
			game.hud.callout("Éteint", Color(0.6, 0.75, 0.9))
		_splash_t -= dt * (p.speed / 2.0)
		if p.speed > 0.5 and _splash_t <= 0.0:
			_splash_t = 0.45
			Audio.sfx("eclaboussure", p.global_position, -8.0 + minf(p.speed, 5.0))
			game.make_noise(p.global_position, 6.0 + p.speed)
	# trop profond : la lourde armure ne flotte pas, on recule
	if water > 1.35:
		var back: Vector3 = game.shore_direction(p.global_position)
		p.global_position += back * 3.5 * dt
		if game.time > float(p.get_meta("deep_t", -9.0)) + 4.0:
			p.set_meta("deep_t", game.time)
			game.hud.toast("L'eau est trop profonde : ton armure t'entraînerait au fond.", Color(0.6, 0.75, 0.9))
	# les flammes : elles mordent ; une roulade ou la pluie les étouffent
	if burn > 0.0:
		burn -= dt * (1.0 + game.weather.rain * 2.0)
		if p.is_doing(["roulade"]):
			burn -= dt * 4.0
		p.hp -= 7.0 * dt
		if randf() < dt * 3.0:
			Audio.sfx("embrasement", p.global_position, -16.0, 0.3)
		if p.hp <= 0.0:
			game._kill(p)
	flames.emitting = burn > 0.0
	# l'hémorragie : le sang coule, goutte à goutte sur le sol
	if bleed > 0.0:
		bleed -= dt
		p.hp = maxf(5.0, p.hp - 0.9 * dt)
		_drip_t -= dt
		if _drip_t <= 0.0:
			_drip_t = randf_range(0.6, 1.4)
			var at := p.global_position + Vector3(randf_range(-0.2, 0.2), 0, randf_range(-0.2, 0.2))
			at.y = game.terrain_height(at)
			Blood.decal(game, at, randf_range(0.25, 0.5), randf() * TAU)
	sharp = maxf(0.0, sharp - dt)
	# à bout de souffle : l'endurance vidée, il halète, ses coups partent lents et mous
	if game.stamina < 12.0:
		winded = 2.5
	winded = maxf(0.0, winded - dt)
	if winded > 0.0 and p.alive:
		_pant_t -= dt
		if _pant_t <= 0.0:
			_pant_t = 0.95
			Audio.sfx("halete", p.global_position, -9.0, 0.05)
	# blessé : il boite, son cœur cogne
	var hurt := p.hp / p.max_hp
	p.walk_clip = "blesse" if hurt < 0.35 and p.alive else "marche"
	if hurt < 0.25 and p.alive:
		_heart_t -= dt
		if _heart_t <= 0.0:
			_heart_t = lerpf(0.75, 1.15, hurt / 0.25)
			Audio.sfx("coeur", null, -6.0 + (0.25 - hurt) * 30.0, 0.0)
	# la chute : au-delà de quatre mètres, les jambes encaissent
	if not p.is_on_floor():
		_fall_top = maxf(_fall_top, p.global_position.y)
	else:
		var h := _fall_top - p.global_position.y
		if h > 4.0 and p.alive and not p.is_doing(["saut"]):
			p.hp -= (h - 4.0) * 7.5
			Audio.sfx("chute", p.global_position)
			game.shake = 0.25 + minf(0.4, h * 0.03)
			if h > 7.0:
				p.play("stagger")
				game.hud.callout("Mauvaise chute", Color(1.0, 0.4, 0.3))
			if p.hp <= 0.0:
				game._kill(p)
		_fall_top = -1e9


## Ce que la marche coûte : la charge, la blessure, le souffle, l'eau.
func speed_factor() -> float:
	var f: float = weight.speed
	if winded > 0.0:
		f *= 0.88
	if game.player.hp / game.player.max_hp < 0.35:
		f *= 0.78
	if water > 0.15:
		f *= clampf(1.0 - water * 0.55, 0.35, 1.0)
	return f


## Peut-on rouler ? Pas surchargé, pas dans l'eau jusqu'aux cuisses.
func can_roll() -> bool:
	return weight.roll > 0.0 and water < 0.6


## Ce que vaut la lame : le sang l'émousse, la pierre l'affûte.
func blade_factor() -> float:
	var blood := float(game.player.rig.get_meta("blood", 0.0))
	return (1.0 - blood * 0.15) * (1.15 if sharp > 0.0 else 1.0)


## Ce que vaut le bras : essoufflé, il frappe plus lentement et moins fort.
func arm_factor() -> float:
	return 0.8 if winded > 0.0 else 1.0


## Un coup de lame reçu peut ouvrir une plaie qui saigne.
func wound(dmg: float) -> void:
	if dmg >= 14.0 and randf() < (0.25 if game.player.hp / game.player.max_hp > 0.4 else 0.55):
		if bleed <= 0.0:
			game.hud.callout("Hémorragie", Color(0.85, 0.1, 0.1))
		bleed = 45.0


func heal_all() -> void:
	bleed = 0.0
	burn = 0.0
	winded = 0.0
