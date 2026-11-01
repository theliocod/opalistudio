## Le ciel, le soleil, la lune rouge et la brume, au fil des heures. Le jour
## dore la vallée, le soir l'embrase, la nuit appartient à la lune rouge. Une
## heure de jeu passe en une minute ; les réglages peuvent figer le jour ou la nuit.
class_name Atmosphere
extends Node3D

const MOON_DIR := Vector3(-0.45, 0.32, -0.83)
const MINUTES_PER_HOUR := 1.0

var moon: DirectionalLight3D
var sun: DirectionalLight3D
var rim: DirectionalLight3D
var env: Environment
var sky_mat: ShaderMaterial
var hour := 16.5                # l'heure qu'il est (0 à 24)
var mode := 0                   # 0 : le cycle, 1 : toujours le jour, 2 : toujours la nuit
var day := 0.0                  # 0 : la nuit, 1 : le plein jour
var golden := 0.0               # l'heure dorée
var rain := 0.0                 # la pluie : le ciel se couvre, la lumière baisse
var flash := 0.0                # l'éclair d'un orage
var _sky_t := 0.0
var _sun_dir := Vector3.UP


func _ready() -> void:
	sky_mat = ShaderMaterial.new()
	sky_mat.shader = load("res://scripts/world/sky.gdshader")
	sky_mat.set_shader_parameter("moon_dir", MOON_DIR.normalized())
	if ResourceLoader.exists("res://assets/ciel.jpg"):
		sky_mat.set_shader_parameter("pano", load("res://assets/ciel.jpg"))
		sky_mat.set_shader_parameter("has_pano", true)
	if ResourceLoader.exists("res://assets/ciel-jour.jpg"):
		sky_mat.set_shader_parameter("pano_day", load("res://assets/ciel-jour.jpg"))
		sky_mat.set_shader_parameter("has_pano_day", true)
	var sky := Sky.new()
	sky.sky_material = sky_mat
	sky.radiance_size = Sky.RADIANCE_SIZE_128

	env = Environment.new()
	env.background_mode = Environment.BG_SKY
	env.sky = sky
	env.ambient_light_source = Environment.AMBIENT_SOURCE_SKY
	env.ambient_light_energy = 1.0
	env.reflected_light_source = Environment.REFLECTION_SOURCE_SKY
	env.tonemap_mode = Environment.TONE_MAPPER_ACES
	env.tonemap_exposure = 1.1
	env.glow_enabled = true
	env.glow_intensity = 0.7
	env.glow_bloom = 0.08
	env.glow_hdr_threshold = 1.3
	env.ssao_enabled = true
	env.ssao_intensity = 1.6
	# La brume volumétrique : elle prend la couleur de la lumière
	env.volumetric_fog_enabled = true
	env.volumetric_fog_density = 0.0045
	env.volumetric_fog_albedo = Color(0.42, 0.36, 0.4)
	env.volumetric_fog_emission = Color(0.01, 0.003, 0.005)
	env.volumetric_fog_length = 140.0
	env.volumetric_fog_anisotropy = 0.4
	# Une brume de distance, pour les cartes graphiques modestes aussi
	env.fog_enabled = true
	env.fog_light_color = Color(0.11, 0.05, 0.06)
	env.fog_density = 0.003
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
	moon.light_color = Color(1.0, 0.74, 0.68)
	moon.light_energy = 1.3
	moon.shadow_enabled = true
	moon.directional_shadow_max_distance = 90.0
	moon.light_volumetric_fog_energy = 0.7
	add_child(moon)
	moon.look_at_from_position(MOON_DIR.normalized() * 100.0, Vector3.ZERO)

	sun = DirectionalLight3D.new()
	sun.light_color = Color(1.0, 0.92, 0.82)
	sun.light_energy = 0.0
	sun.shadow_enabled = true
	sun.directional_shadow_max_distance = 90.0
	sun.light_volumetric_fog_energy = 0.5
	sun.visible = false
	add_child(sun)

	# Une lueur froide qui découpe les silhouettes la nuit, sans ombres
	rim = DirectionalLight3D.new()
	rim.light_color = Color(0.45, 0.55, 0.9)
	rim.light_energy = 0.35
	rim.light_volumetric_fog_energy = 0.0
	add_child(rim)
	rim.look_at_from_position(Vector3(0.5, 0.6, 0.6) * 100.0, Vector3.ZERO)
	_apply(true)


## Une image : le temps passe, la lumière suit.
func step(dt: float) -> void:
	if mode == 0:
		hour = fmod(hour + dt / (MINUTES_PER_HOUR * 60.0), 24.0)
	elif mode == 1:
		hour = 15.5
	else:
		hour = 0.5
	_sky_t -= dt
	_apply(_sky_t <= 0.0)
	if _sky_t <= 0.0:
		_sky_t = 0.5


func _apply(sky_too: bool) -> void:
	# le soleil se lève à l'est vers 5 h 30, culmine à midi, se couche vers 18 h 30
	var a := (hour - 6.0) / 12.0 * PI
	var elev := sin(a)
	var az := (hour - 12.0) / 24.0 * TAU + 0.9
	_sun_dir = Vector3(sin(az) * cos(asin(clampf(elev, -1.0, 1.0)) * 0.85), elev * 0.75 + 0.05, cos(az) * 0.85).normalized()
	day = smoothstep(-0.12, 0.18, elev)
	golden = day * (1.0 - smoothstep(0.08, 0.42, elev))
	var dim := 1.0 - rain * 0.55
	# le soleil, de l'or au blanc ; la lune rouge, qui prend le relais la nuit
	sun.visible = day > 0.01
	sun.light_energy = 2.4 * day * dim * (1.0 - golden * 0.25)
	sun.light_color = Color(1.0, 0.93, 0.84).lerp(Color(1.0, 0.6, 0.3), golden)
	if sun.visible:
		var up := Vector3.UP if absf(_sun_dir.y) < 0.98 else Vector3.FORWARD
		sun.look_at_from_position(_sun_dir * 100.0, Vector3.ZERO, up)
	var pulse := 0.0
	if flash > 0.0:
		pulse = (1.0 if fmod(flash, 0.12) > 0.05 else 0.3) * clampf(flash * 4.0, 0.0, 1.0)
	moon.light_energy = 1.3 * (1.0 - day) + pulse * 5.0
	moon.shadow_enabled = day < 0.5
	sun.shadow_enabled = day >= 0.5
	rim.light_energy = 0.35 * (1.0 - day)
	env.ambient_light_energy = lerpf(1.0, 0.9, day) + pulse * 1.5
	# la brume prend la couleur de l'heure
	var fog_night := Color(0.11, 0.05, 0.06)
	var fog_day := Color(0.62, 0.66, 0.72).lerp(Color(0.8, 0.64, 0.5), golden).lerp(Color(0.45, 0.47, 0.5), rain)
	env.fog_light_color = fog_night.lerp(fog_day, day)
	env.fog_density = lerpf(0.003, 0.0011, day) + rain * 0.006
	env.volumetric_fog_albedo = Color(0.42, 0.36, 0.4).lerp(Color(0.8, 0.78, 0.76), day)
	env.volumetric_fog_density = lerpf(0.0045, 0.0014, day) + rain * 0.004
	env.adjustment_saturation = lerpf(0.92, 1.05, day) - rain * 0.2
	if sky_too:
		sky_mat.set_shader_parameter("sun_dir", _sun_dir)
		sky_mat.set_shader_parameter("day", day)
		sky_mat.set_shader_parameter("golden", golden)
		sky_mat.set_shader_parameter("overcast", rain)


## La nuit, en 0..1 (pour les lanternes, la discrétion).
func night() -> float:
	return 1.0 - day


func save() -> Dictionary:
	return {"hour": hour}


func load_save(d: Dictionary) -> void:
	hour = float(d.get("hour", hour))
	_apply(true)
