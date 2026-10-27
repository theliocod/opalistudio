## Le ciel, la lumière de la lune et la brume. Une nuit sans fin.
class_name Atmosphere
extends Node3D

const MOON_DIR := Vector3(-0.45, 0.32, -0.83)

var moon: DirectionalLight3D
var env: Environment


func _ready() -> void:
	var sky_mat := ShaderMaterial.new()
	sky_mat.shader = load("res://scripts/world/sky.gdshader")
	sky_mat.set_shader_parameter("moon_dir", MOON_DIR.normalized())
	var sky := Sky.new()
	sky.sky_material = sky_mat
	sky.radiance_size = Sky.RADIANCE_SIZE_128

	env = Environment.new()
	env.background_mode = Environment.BG_SKY
	env.sky = sky
	env.ambient_light_source = Environment.AMBIENT_SOURCE_SKY
	env.ambient_light_energy = 1.6
	env.reflected_light_source = Environment.REFLECTION_SOURCE_SKY
	env.tonemap_mode = Environment.TONE_MAPPER_ACES
	env.tonemap_exposure = 1.1
	env.glow_enabled = true
	env.glow_intensity = 0.9
	env.glow_bloom = 0.08
	env.glow_hdr_threshold = 1.0
	env.ssao_enabled = true
	env.ssao_intensity = 1.6
	# La brume volumétrique : elle prend la couleur de la lune
	env.volumetric_fog_enabled = true
	env.volumetric_fog_density = 0.012
	env.volumetric_fog_albedo = Color(0.55, 0.28, 0.3)
	env.volumetric_fog_emission = Color(0.035, 0.008, 0.012)
	env.volumetric_fog_length = 140.0
	env.volumetric_fog_anisotropy = 0.55
	# Une brume de distance, pour les cartes graphiques modestes aussi
	env.fog_enabled = true
	env.fog_light_color = Color(0.16, 0.05, 0.06)
	env.fog_density = 0.0045
	env.fog_sky_affect = 0.25
	env.fog_height = 6.0
	env.fog_height_density = 0.03
	env.adjustment_enabled = true
	env.adjustment_saturation = 0.92
	env.adjustment_contrast = 1.08
	var we := WorldEnvironment.new()
	we.environment = env
	add_child(we)

	moon = DirectionalLight3D.new()
	moon.light_color = Color(1.0, 0.62, 0.55)
	moon.light_energy = 1.15
	moon.shadow_enabled = true
	moon.directional_shadow_max_distance = 90.0
	moon.light_volumetric_fog_energy = 1.4
	add_child(moon)
	moon.look_at_from_position(MOON_DIR.normalized() * 100.0, Vector3.ZERO)

	# Une lueur froide qui découpe les silhouettes, sans ombres
	var rim := DirectionalLight3D.new()
	rim.light_color = Color(0.45, 0.55, 0.9)
	rim.light_energy = 0.25
	rim.light_volumetric_fog_energy = 0.0
	add_child(rim)
	rim.look_at_from_position(Vector3(0.5, 0.6, 0.6) * 100.0, Vector3.ZERO)
