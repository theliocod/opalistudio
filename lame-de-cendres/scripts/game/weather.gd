## Le temps qu'il fait : de longues accalmies, puis la pluie qui monte, frappe
## le sol, mouille tout (le sol noircit et luit), étouffe les feux, couvre les
## pas et brouille la vue des gardes. L'orage gronde au loin, l'éclair blanchit
## la vallée une fraction de seconde.
class_name Weather
extends Node3D

var game
var rain := 0.0                 # l'intensité de la pluie, de 0 à 1
var wet := 0.0                  # le sol mouillé : il sèche plus lentement qu'il ne se mouille
var _target := 0.0
var _timer := 0.0
var _thunder_t := 12.0
var _flash := 0.0
var drops: CPUParticles3D
var splashes: CPUParticles3D
var sound: AudioStreamPlayer
var _drop_mat: StandardMaterial3D
var _base_fog := -1.0


func setup(g) -> void:
	game = g
	_timer = randf_range(220.0, 380.0)
	_drop_mat = StandardMaterial3D.new()
	_drop_mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	_drop_mat.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	_drop_mat.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	_drop_mat.billboard_mode = BaseMaterial3D.BILLBOARD_FIXED_Y
	_drop_mat.albedo_color = Color(0.55, 0.6, 0.75, 0.0)
	drops = CPUParticles3D.new()
	drops.amount = 1600
	drops.lifetime = 0.75
	drops.local_coords = false
	drops.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	drops.emission_box_extents = Vector3(16, 1, 16)
	drops.direction = Vector3.DOWN
	drops.spread = 3.0
	drops.gravity = Vector3(0, -30, 0)
	drops.initial_velocity_min = 18.0
	drops.initial_velocity_max = 24.0
	var q := QuadMesh.new()
	q.size = Vector2(0.018, 0.6)
	q.material = _drop_mat
	drops.mesh = q
	drops.emitting = false
	drops.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(drops)
	splashes = CPUParticles3D.new()
	splashes.amount = 260
	splashes.lifetime = 0.25
	splashes.local_coords = false
	splashes.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	splashes.emission_box_extents = Vector3(9, 0.05, 9)
	splashes.direction = Vector3.UP
	splashes.spread = 60.0
	splashes.gravity = Vector3(0, -9, 0)
	splashes.initial_velocity_min = 0.6
	splashes.initial_velocity_max = 1.4
	var sq := QuadMesh.new()
	sq.size = Vector2(0.04, 0.04)
	var sm := StandardMaterial3D.new()
	sm.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	sm.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	sm.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	sm.albedo_color = Color(0.4, 0.45, 0.55)
	sq.material = sm
	splashes.mesh = sq
	splashes.emitting = false
	add_child(splashes)
	sound = Audio.me.loop_player("pluie", "Ambiance")
	sound.volume_db = -60.0
	add_child(sound)
	sound.play()


## Fait pleuvoir tout de suite (les tests, et l'envie).
func start_rain(strength := 0.9) -> void:
	_target = strength
	_timer = randf_range(140.0, 240.0)


func step(dt: float, focus: Vector3) -> void:
	_timer -= dt
	if _timer <= 0.0:
		if _target > 0.0:
			_target = 0.0
			_timer = randf_range(300.0, 560.0)
		else:
			_target = randf_range(0.55, 1.0)
			_timer = randf_range(140.0, 260.0)
			game.hud.toast("Le ciel se couvre. La pluie arrive.", Color(0.6, 0.7, 0.85))
	rain = move_toward(rain, _target, dt / 20.0)
	wet = move_toward(wet, 1.0 if rain > 0.15 else 0.0, dt / (12.0 if rain > 0.15 else 90.0))
	RenderingServer.global_shader_parameter_set("wetness", wet)
	var on := rain > 0.02
	drops.emitting = on
	splashes.emitting = on and rain > 0.3
	_drop_mat.albedo_color.a = rain * 0.42
	if on:
		var wind_dir := Vector3(cos(game.wind.angle), 0, sin(game.wind.angle))
		drops.global_position = focus + Vector3(0, 11, 0) - wind_dir * 3.0
		drops.gravity = Vector3(0, -30, 0) + wind_dir * (2.0 + game.wind.strength * 7.0)
		splashes.global_position = Vector3(focus.x, game.terrain.height_at(focus.x, focus.z) + 0.05, focus.z)
	sound.volume_db = linear_to_db(maxf(rain, 0.0001)) - 4.0
	# la brume s'épaissit sous la pluie
	var env: Environment = game.atmosphere.env
	if _base_fog < 0.0:
		_base_fog = env.fog_density
	env.fog_density = _base_fog + rain * 0.006
	# l'orage
	if rain > 0.5:
		_thunder_t -= dt
		if _thunder_t <= 0.0:
			_thunder_t = randf_range(18.0, 55.0)
			_flash = 0.35
			var far := randf_range(0.6, 3.0)
			get_tree().create_timer(far, false).timeout.connect(func(): Audio.sfx("tonnerre", null, -2.0 - far * 2.0, 0.05))
	if _flash > 0.0:
		_flash -= dt
		var pulse := 1.0 if fmod(_flash, 0.12) > 0.05 else 0.3
		game.atmosphere.moon.light_energy = 1.3 + pulse * 5.0 * clampf(_flash * 4.0, 0.0, 1.0)
		env.ambient_light_energy = 1.0 + pulse * 1.5 * clampf(_flash * 4.0, 0.0, 1.0)
		if _flash <= 0.0:
			game.atmosphere.moon.light_energy = 1.3
			env.ambient_light_energy = 1.0


## La pluie cache un peu : les gardes voient moins loin, entendent moins.
func sight_factor() -> float:
	return 1.0 - rain * 0.28


func noise_factor() -> float:
	return 1.0 - rain * 0.45
