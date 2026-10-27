## L'infiltration : ce que voient les gardes d'Akagane. Chacun regarde dans un
## cône (plus court si tu es accroupi), à travers rien de solide. Le doute
## monte quand il t'aperçoit, il va voir, puis il donne l'alerte ; la cloche
## réveille tout le fort. Les cônes se dessinent au sol quand tu te fais petit.
class_name Stealth
extends Node3D

const ARC_CALM := 0.95          # demi-angle de vue, en radians (~55°)
const ARC_ALERT := 1.3
var game
var show_cones := "accroupi"    # toujours | accroupi | jamais (les réglages)
var alarm_t := 0.0
var _cones := {}                # garde → MeshInstance3D
var _marks := {}                # garde → Label3D
var _mats := {}
var _bodies_seen := {}          # corps déjà découverts


func setup(g) -> void:
	game = g
	for k in ["calme", "doute", "alerte"]:
		var m := StandardMaterial3D.new()
		m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
		m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		m.cull_mode = BaseMaterial3D.CULL_DISABLED
		m.vertex_color_use_as_albedo = true
		m.albedo_color = {"calme": Color(1.0, 0.95, 0.85, 0.11), "doute": Color(1.0, 0.75, 0.25, 0.18), "alerte": Color(1.0, 0.18, 0.12, 0.2)}[k]
		m.render_priority = 1
		_mats[k] = m


func watched(f: Fighter) -> bool:
	return f.role == "guard" and f.faction == "akagane" and not game.renown.fort_free


## La portée du regard d'un garde, selon ta posture et son état.
func sight(f: Fighter) -> float:
	var p: Fighter = game.player
	var r := 24.0 if f.get_meta("lookout", false) else 17.0
	if p.sneaking:
		r *= 0.55
	if f.alert != "calme":
		r *= 1.25
	if game.smoke_t > 0.0 and game.player.global_position.distance_to(game.smoke_at) < 6.0:
		r = 0.0
	return r


func step(dt: float) -> void:
	var p: Fighter = game.player
	alarm_t = maxf(0.0, alarm_t - dt)
	var loud := p.speed > 4.0 and not p.sneaking
	for f in game.enemies:
		if not watched(f):
			continue
		if not f.alive:
			_hide(f)
			continue
		var seen: float = _sees(f, p)
		# le bruit : courir tout près, ou se battre à portée d'oreille
		var d: float = f.flat_distance(p)
		if loud and d < 7.0:
			seen = maxf(seen, 0.6)
		if game.combat_noise_t > 0.0 and f.global_position.distance_to(game.combat_noise_at) < 16.0:
			seen = maxf(seen, 0.5)
			f.last_seen = game.combat_noise_at
		if seen > 0.0:
			if game.combat_noise_t <= 0.0 or d < 16.0:
				f.last_seen = p.global_position
			f.suspicion = minf(1.0, f.suspicion + seen * dt * (1.2 if f.alert == "doute" else 1.0))
			f.alert_t = 0.0
		else:
			f.suspicion = maxf(0.0, f.suspicion - dt * 0.1)
			f.alert_t += dt
		_bodies(f)
		match f.alert:
			"calme":
				if f.suspicion > 0.3:
					f.alert = "doute"
					f.wait_t = 0.0
					game.bark(f, ["Hm ? Qui va là ?", "Qu'est-ce que c'était ?", "Il y a quelqu'un ?"].pick_random())
			"doute":
				if f.suspicion >= 1.0:
					raise(f)
				elif f.suspicion <= 0.02 and f.alert_t > 6.0:
					f.alert = "calme"
					game.bark(f, ["Ce n'était rien.", "Le vent, sans doute.", "Je deviens fou…"].pick_random())
			"alerte":
				if f.alert_t > 9.0 and alarm_t <= 0.0:
					f.alert = "recherche"
					f.alert_t = 0.0
					game.bark(f, "Il s'est enfui ! Fouillez partout !")
			"recherche":
				if seen > 0.0 and f.suspicion > 0.5:
					raise(f)
				elif f.alert_t > 16.0:
					f.alert = "calme"
					f.suspicion = 0.0
					f.hostile = false
		_draw(f)


## Voit-il le joueur ? 0 : non ; sinon, à quelle vitesse le doute monte.
func _sees(f: Fighter, p: Fighter) -> float:
	var eye := f.global_position + Vector3(0, 1.6 * f.rig.body_scale, 0)
	var target := p.global_position + Vector3(0, 0.8 if p.sneaking else 1.4, 0)
	var to := target - eye
	var d := to.length()
	var r := sight(f)
	if d > r or r <= 0.0:
		return 0.0
	var flat := Vector3(to.x, 0, to.z)
	var ang := f.forward().angle_to(flat)
	var arc := ARC_ALERT if f.alert != "calme" else ARC_CALM
	if ang > arc and d > (1.6 if p.sneaking else 3.0):
		return 0.0
	var q := PhysicsRayQueryParameters3D.create(eye, target, 1 | Landmarks.WALL_LAYER)
	q.exclude = [f.get_rid(), p.get_rid()]
	if not game.get_world_3d().direct_space_state.intersect_ray(q).is_empty():
		return 0.0
	# de loin, le doute monte lentement ; tout près, il ne laisse qu'un instant
	var near := 1.0 - d / r
	return 0.2 + near * near * 1.6


## Un garde qui découvre un camarade à terre : il donne l'alerte.
func _bodies(f: Fighter) -> void:
	if f.alert == "alerte":
		return
	for o in game.enemies:
		if o.alive or o == f or o.faction != "akagane" or _bodies_seen.has(o):
			continue
		var d := f.global_position.distance_to(o.global_position)
		if d < 12.0 and f.forward().angle_to((o.global_position - f.global_position) * Vector3(1, 0, 1)) < ARC_ALERT:
			_bodies_seen[o] = true
			f.last_seen = o.global_position
			f.suspicion = 0.95
			f.alert = "doute"
			game.bark(f, "Un corps ! On nous attaque !")


## L'alerte : il appelle, ses voisins accourent ; la cloche, si elle sonne encore, réveille le fort.
func raise(f: Fighter) -> void:
	if f.alert == "alerte":
		return
	f.alert = "alerte"
	f.suspicion = 1.0
	f.aggro = true
	f.alert_t = 0.0
	f.gesture("pointer")
	game.bark(f, ["Un intrus ! À moi !", "Là ! Il est là !", "Alerte ! Alerte !"].pick_random())
	Audio.sfx("garde", f.global_position, 4.0)
	for o in game.enemies:
		if watched(o) and o.alive and o != f and o.global_position.distance_to(f.global_position) < 28.0 and o.alert != "alerte":
			o.alert = "alerte"
			o.aggro = true
			o.suspicion = 1.0
			o.last_seen = game.player.global_position
	var bell: Dictionary = game.landmarks.bell
	if not bell.is_empty() and not bell.cut and alarm_t <= 0.0:
		alarm_t = 40.0
		Audio.sfx("alerte", bell.pos + Vector3(0, 3, 0), 6.0, 0.0)
		var tw: Tween = game.create_tween()
		tw.tween_property(bell.node, "rotation:z", 0.35, 0.25).set_trans(Tween.TRANS_SINE)
		tw.tween_property(bell.node, "rotation:z", -0.3, 0.5).set_trans(Tween.TRANS_SINE)
		tw.tween_property(bell.node, "rotation:z", 0.0, 0.4).set_trans(Tween.TRANS_SINE)
		game.hud.banner("Alerte", "La cloche d'Akagane sonne. Tout le fort te cherche.")
		for o in game.enemies:
			if watched(o) and o.alive:
				o.alert = "alerte"
				o.aggro = true
				o.suspicion = 1.0
				o.last_seen = game.player.global_position


## Calme tout le monde (le fort libéré, une partie rechargée).
func reset() -> void:
	alarm_t = 0.0
	for f in game.enemies:
		if f.role == "guard" and f.faction == "akagane":
			f.alert = "calme"
			f.suspicion = 0.0
			f.aggro = false


# ---------- Ce qui se dessine ----------

func _hide(f: Fighter) -> void:
	if _cones.has(f):
		_cones[f].queue_free()
		_cones.erase(f)
	if _marks.has(f):
		_marks[f].queue_free()
		_marks.erase(f)


func _draw(f: Fighter) -> void:
	var p: Fighter = game.player
	var show := show_cones == "toujours" or (show_cones == "accroupi" and p.sneaking)
	show = show and f.flat_distance(p) < 45.0
	if show and not _cones.has(f):
		var mi := MeshInstance3D.new()
		mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
		add_child(mi)
		_cones[f] = mi
	if _cones.has(f):
		var mi: MeshInstance3D = _cones[f]
		mi.visible = show
		if show:
			var r := sight(f)
			var arc := ARC_ALERT if f.alert != "calme" else ARC_CALM
			var key := "%d-%d" % [int(r * 2.0), int(arc * 100)]
			if mi.get_meta("key", "") != key:
				mi.mesh = _fan(r, arc)
				mi.set_meta("key", key)
			mi.material_override = _mats["alerte" if f.alert in ["alerte", "recherche"] else f.alert]
			mi.global_position = f.global_position + Vector3(0, 0.12, 0)
			mi.rotation = Vector3(0, f.yaw, 0)
	# au-dessus de la tête : ? qui se remplit, puis !
	var want := f.alert != "calme" or f.suspicion > 0.05
	if want and not _marks.has(f):
		var l := Label3D.new()
		l.billboard = BaseMaterial3D.BILLBOARD_ENABLED
		l.no_depth_test = true
		l.font_size = 96
		l.pixel_size = 0.004
		l.outline_size = 18
		l.outline_modulate = Color(0, 0, 0, 0.9)
		add_child(l)
		_marks[f] = l
	if _marks.has(f):
		var l: Label3D = _marks[f]
		l.visible = want
		l.global_position = f.global_position + Vector3(0, 2.35 * f.rig.body_scale, 0)
		if f.alert in ["alerte"]:
			l.text = "!"
			l.modulate = Color(1.0, 0.2, 0.12)
		elif f.alert == "recherche":
			l.text = "?"
			l.modulate = Color(1.0, 0.45, 0.2)
		else:
			l.text = "?"
			l.modulate = Color(1.0, 0.95, 0.85).lerp(Color(1.0, 0.7, 0.2), f.suspicion)
			l.modulate.a = clampf(0.3 + f.suspicion, 0.0, 1.0)


## Un éventail au sol : le champ de vision.
func _fan(r: float, arc: float) -> ArrayMesh:
	var st := SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	var n := 18
	for i in n:
		var a0 := -arc + 2.0 * arc * i / n
		var a1 := -arc + 2.0 * arc * (i + 1) / n
		st.set_color(Color(1, 1, 1, 1))
		st.add_vertex(Vector3.ZERO)
		st.set_color(Color(1, 1, 1, 0.25))
		st.add_vertex(Vector3(sin(a0), 0, cos(a0)) * r)
		st.add_vertex(Vector3(sin(a1), 0, cos(a1)) * r)
	return st.commit()
