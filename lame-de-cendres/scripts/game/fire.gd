## Le feu : des foyers qui brûlent ce qui s'y tient, se propagent dans l'herbe
## sèche dans le sens du vent, embrasent les tentes et la paille, et laissent
## le sol noirci. La pluie les étouffe. On les allume avec une fiole d'huile,
## une lanterne de papier qui tombe, ou une lame qui brûle.
class_name FireSystem
extends Node3D

const MAX_FIRES := 40
const MAX_SCORCH := 30

var game
var fires: Array = []           # {pos, r, life, full, gen, kind, node, light, flames, smoke, spread_t, audio}
var flammables: Array = []      # {pos, r, node, shape, kind, burnt}
var hazards: Array = []         # les feux de camp : on s'y brûle, ils ne s'éteignent pas
var _scorches: Array = []
var _soft: GradientTexture2D
var _scorch_tex: Texture2D
var _flame_mat: StandardMaterial3D
var _ember_mat: StandardMaterial3D
var _smoke_mat: StandardMaterial3D


func setup(g) -> void:
	game = g
	var soft := Gradient.new()
	soft.set_color(0, Color(1, 1, 1, 1))
	soft.set_color(1, Color(1, 1, 1, 0))
	_soft = GradientTexture2D.new()
	_soft.gradient = soft
	_soft.fill = GradientTexture2D.FILL_RADIAL
	_soft.fill_from = Vector2(0.5, 0.5)
	_soft.fill_to = Vector2(1.0, 0.5)
	_flame_mat = _mat(Color(0.95, 0.42, 0.13), true)
	_ember_mat = _mat(Color(2.2, 0.9, 0.3), true)
	_smoke_mat = _mat(Color(0.12, 0.1, 0.1, 0.55), false)
	_scorch_tex = _make_scorch()


func _mat(c: Color, add: bool) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	if add:
		m.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	m.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	m.vertex_color_use_as_albedo = true
	m.albedo_color = c
	m.albedo_texture = _soft
	return m


## Une tache de suie : un rond irrégulier, plus noir au centre.
func _make_scorch() -> Texture2D:
	var n := 96
	var img := Image.create(n, n, false, Image.FORMAT_RGBA8)
	var noise := FastNoiseLite.new()
	noise.seed = 51
	noise.frequency = 0.08
	for y in n:
		for x in n:
			var d := Vector2(x - n / 2.0, y - n / 2.0).length() / (n / 2.0)
			var edge := 0.75 + noise.get_noise_2d(x, y) * 0.3
			var a := clampf((edge - d) / 0.25, 0.0, 1.0)
			img.set_pixel(x, y, Color(0.03, 0.025, 0.02, a * (0.55 + 0.4 * (1.0 - d))))
	return ImageTexture.create_from_image(img)


## Allume un feu. r : son rayon ; life : sa durée ; kind : sol, huile, tente, lanterne.
func ignite(at: Vector3, r := 1.3, life := 10.0, gen := 0, kind := "sol") -> bool:
	var rain: float = game.weather.rain
	if rain > 0.55 and kind != "huile":
		return false
	if game.water_depth(at) > 0.05:
		return false
	for f in fires:
		if f.pos.distance_to(at) < maxf(f.r, r) * 0.7:
			f.life = maxf(f.life, life)
			return false
	if fires.size() >= MAX_FIRES:
		return false
	var node := Node3D.new()
	add_child(node)
	node.global_position = at
	var flames := CPUParticles3D.new()
	flames.amount = int(30 + r * 34)
	flames.lifetime = 0.7
	flames.local_coords = false
	flames.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	flames.emission_box_extents = Vector3(r * 0.65, 0.1, r * 0.65)
	flames.direction = Vector3.UP
	flames.spread = 14.0
	flames.gravity = Vector3(0, 2.6, 0)
	flames.initial_velocity_min = 0.6
	flames.initial_velocity_max = 1.8
	flames.scale_amount_min = 0.5
	flames.scale_amount_max = 1.2
	var q := QuadMesh.new()
	q.size = Vector2(0.42, 0.62)
	q.material = _flame_mat
	flames.mesh = q
	var ramp := Gradient.new()
	ramp.set_color(0, Color(1.0, 0.78, 0.4, 0.75))
	ramp.add_point(0.35, Color(1.0, 0.42, 0.1, 0.6))
	ramp.add_point(0.7, Color(0.75, 0.12, 0.03, 0.35))
	ramp.set_color(ramp.get_point_count() - 1, Color(0.3, 0.03, 0.01, 0.0))
	flames.color_ramp = ramp
	var sc := Curve.new()
	sc.add_point(Vector2(0, 0.6))
	sc.add_point(Vector2(0.3, 1.0))
	sc.add_point(Vector2(1, 0.15))
	flames.scale_amount_curve = sc
	node.add_child(flames)
	flames.position = Vector3(0, 0.15, 0)
	var embers := CPUParticles3D.new()
	embers.amount = int(8 + r * 6)
	embers.lifetime = 2.2
	embers.local_coords = false
	embers.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	embers.emission_box_extents = Vector3(r * 0.6, 0.2, r * 0.6)
	embers.direction = Vector3.UP
	embers.spread = 30.0
	embers.gravity = Vector3(0, 0.8, 0)
	embers.initial_velocity_min = 1.0
	embers.initial_velocity_max = 3.0
	var eq := QuadMesh.new()
	eq.size = Vector2(0.06, 0.06)
	eq.material = _ember_mat
	embers.mesh = eq
	var fade := Gradient.new()
	fade.set_color(0, Color(1, 1, 1, 1))
	fade.set_color(1, Color(1, 1, 1, 0))
	embers.color_ramp = fade
	node.add_child(embers)
	var smoke := CPUParticles3D.new()
	smoke.amount = int(6 + r * 5)
	smoke.lifetime = 4.5
	smoke.local_coords = false
	smoke.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	smoke.emission_box_extents = Vector3(r * 0.5, 0.2, r * 0.5)
	smoke.direction = Vector3.UP
	smoke.spread = 10.0
	smoke.gravity = Vector3(0, 1.1, 0)
	smoke.initial_velocity_min = 0.8
	smoke.initial_velocity_max = 1.6
	smoke.scale_amount_min = 1.2
	smoke.scale_amount_max = 2.6
	var sq := QuadMesh.new()
	sq.size = Vector2(1.6, 1.6)
	sq.material = _smoke_mat
	smoke.mesh = sq
	var sfade := Gradient.new()
	sfade.set_color(0, Color(1, 1, 1, 0.0))
	sfade.add_point(0.15, Color(1, 1, 1, 0.8))
	sfade.set_color(sfade.get_point_count() - 1, Color(1, 1, 1, 0.0))
	smoke.color_ramp = sfade
	smoke.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	node.add_child(smoke)
	smoke.position = Vector3(0, 1.4, 0)
	var light := OmniLight3D.new()
	light.light_color = Color(1.0, 0.48, 0.16)
	light.light_energy = 1.9 + r * 1.0
	light.omni_range = 5.0 + r * 3.8
	light.omni_attenuation = 1.5
	light.light_volumetric_fog_energy = 0.15
	node.add_child(light)
	light.position = Vector3(0, 0.8, 0)
	var audio = null
	if r >= 1.0 and _audible() < 6:
		audio = Audio.me.loop_player("feu", "Ambiance", true)
		audio.unit_size = 3.0 + r
		node.add_child(audio)
	fires.append({"pos": at, "r": r, "life": life, "full": life, "gen": gen, "kind": kind, "node": node, "light": light,
		"flames": flames, "smoke": smoke, "embers": embers, "spread_t": randf_range(1.0, 2.2), "audio": audio})
	Audio.sfx("embrasement", at, -2.0 if r > 1.5 else -9.0)
	# un départ de feu se voit et s'entend : les passants fuient, les gardes accourent
	if gen <= 1:
		game._panic(at)
		game.make_noise(at, 18.0)
	return true


func _audible() -> int:
	var n := 0
	for f in fires:
		if f.audio:
			n += 1
	return n


## Une image : les feux brûlent, se propagent, s'éteignent.
func step(dt: float) -> void:
	var rain: float = game.weather.rain
	var wind_dir := Vector3(cos(game.wind.angle), 0, sin(game.wind.angle))
	var push: Vector3 = wind_dir * (0.4 + game.wind.strength * 2.2)
	var t := Time.get_ticks_msec() / 1000.0
	for f in fires.duplicate():
		f.life -= dt * (1.0 + rain * 5.0)
		var k := clampf(f.life / 2.5, 0.0, 1.0)
		f.light.light_energy = (1.9 + f.r * 1.0) * k * (0.85 + sin(t * 11.0 + f.pos.x) * 0.1 + sin(t * 27.0) * 0.05)
		f.node.scale = Vector3.ONE * maxf(0.05, k)
		f.flames.gravity = Vector3(0, 2.6, 0) + push
		f.smoke.gravity = Vector3(0, 1.1, 0) + push * 1.4
		f.embers.gravity = Vector3(0, 0.8, 0) + push * 1.6
		_burn_around(f.pos, f.r * maxf(0.4, k))
		# la propagation : l'herbe sèche, poussée par le vent
		f.spread_t -= dt
		if f.spread_t <= 0.0 and f.kind != "lanterne" and f.gen < 6 and rain < 0.25 and f.life > 2.0:
			f.spread_t = randf_range(1.4, 2.8) / (0.6 + game.wind.strength)
			var dir := (wind_dir * 1.2 + Vector3(randf_range(-1, 1), 0, randf_range(-1, 1)) * 0.7).normalized()
			var p: Vector3 = f.pos + dir * randf_range(1.6, 2.8)
			p.y = game.terrain.height_at(p.x, p.z)
			var m: Color = game.terrain.mask_at(p.x, p.z)
			if m.g > 0.35 and m.a < 0.3 and m.r < 0.45:
				ignite(p, clampf(f.r * randf_range(0.8, 1.05), 0.8, 1.8), randf_range(6.0, 10.0), f.gen + 1, "sol")
		for fl in flammables:
			if not fl.burnt and Vector2(fl.pos.x - f.pos.x, fl.pos.z - f.pos.z).length() < f.r + fl.r:
				_burn_object(fl)
		if f.life <= 0.0:
			_out(f)
	for h in hazards:
		_burn_around(h, 0.85)


## Tout ce qui se tient dans les flammes prend feu.
func _burn_around(at: Vector3, r: float) -> void:
	var p: Fighter = game.player
	if p.alive and Vector2(p.global_position.x - at.x, p.global_position.z - at.z).length() < r and absf(p.global_position.y - at.y) < 1.6:
		game.condition.set_on_fire(4.5)
	for e in game.enemies:
		if e.alive and Vector2(e.global_position.x - at.x, e.global_position.z - at.z).length() < r and absf(e.global_position.y - at.y) < 1.6:
			game.burning[e] = maxf(game.burning.get(e, 0.0), 4.0)


## Une tente, une meule de paille : elle flambe, puis s'effondre, noircie.
func _burn_object(fl: Dictionary) -> void:
	fl.burnt = true
	ignite(fl.pos, fl.r * 1.1, 20.0 if fl.kind == "tente" else 14.0, 2, "tente")
	var node: Node3D = fl.node
	var tw := node.create_tween()
	tw.tween_interval(9.0)
	tw.tween_callback(func():
		var char_mat := StandardMaterial3D.new()
		char_mat.albedo_color = Color(0.05, 0.04, 0.035)
		char_mat.roughness = 1.0
		if node is MeshInstance3D:
			node.material_override = char_mat
		if fl.shape:
			fl.shape.disabled = true)
	tw.tween_property(node, "scale", Vector3(node.scale.x * 0.9, node.scale.y * 0.3, node.scale.z * 0.9), 6.0).set_trans(Tween.TRANS_QUAD)
	tw.parallel().tween_property(node, "position:y", node.position.y - 0.8, 6.0)


func _out(f: Dictionary) -> void:
	fires.erase(f)
	var node: Node3D = f.node
	node.queue_free()
	# la suie : le sol et l'herbe restent noircis
	var dc := Decal.new()
	dc.texture_albedo = _scorch_tex
	dc.size = Vector3(f.r * 2.6, 2.0, f.r * 2.6)
	dc.cull_mask = 1
	dc.upper_fade = 0.3
	dc.lower_fade = 0.3
	add_child(dc)
	dc.global_position = f.pos + Vector3(0, 0.4, 0)
	dc.rotation.y = randf() * TAU
	_scorches.append(dc)
	while _scorches.size() > MAX_SCORCH:
		var old = _scorches.pop_front()
		if is_instance_valid(old):
			old.queue_free()


## La lumière des flammes en un point, de 0 à 1 (pour l'infiltration).
func light_at(p: Vector3) -> float:
	var v := 0.0
	for f in fires:
		var lt: OmniLight3D = f.light
		var d := lt.global_position.distance_to(p)
		if d < lt.omni_range:
			var k := 1.0 - d / lt.omni_range
			v += k * k
	return clampf(v, 0.0, 1.0)


## Un feu brûle-t-il tout près ? (les gardes vont voir, les habitants fuient)
func nearest(p: Vector3, within: float) -> Dictionary:
	for f in fires:
		if f.pos.distance_to(p) < within:
			return f
	return {}
