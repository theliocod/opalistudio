## Le vent : une direction qui tourne lentement, des rafales qui vont et
## viennent. Il courbe l'herbe et les arbres (paramètre global des shaders),
## fait claquer les bannières, emporte feuilles et pétales autour du joueur
## et souffle dans les oreilles (Audio.set_wind).
class_name Wind
extends Node3D

var angle := 0.7
var strength := 0.4
var _noise := FastNoiseLite.new()
var _t := 0.0
var leaves: CPUParticles3D
var petals: CPUParticles3D
var emitters: Array = []        # d'autres particules que le vent emporte (les sakuras)


func _ready() -> void:
	_noise.seed = 4242
	_noise.frequency = 0.5
	leaves = _drift(Color(0.55, 0.12, 0.06), Vector2(0.09, 0.07), 70)
	petals = _drift(Color(1.0, 0.72, 0.82), Vector2(0.05, 0.045), 90)
	petals.emitting = false


func _drift(c: Color, size: Vector2, n: int) -> CPUParticles3D:
	var p := CPUParticles3D.new()
	p.amount = n
	p.lifetime = 5.0
	p.local_coords = false
	p.emission_shape = CPUParticles3D.EMISSION_SHAPE_BOX
	p.emission_box_extents = Vector3(16, 5, 16)
	p.initial_velocity_min = 0.2
	p.initial_velocity_max = 0.8
	p.angular_velocity_min = -260.0
	p.angular_velocity_max = 260.0
	p.angle_min = 0.0
	p.angle_max = 360.0
	var q := QuadMesh.new()
	q.size = size
	var m := StandardMaterial3D.new()
	m.albedo_color = c
	m.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	m.cull_mode = BaseMaterial3D.CULL_DISABLED
	m.emission_enabled = true
	m.emission = c * 0.25
	q.material = m
	p.mesh = q
	add_child(p)
	return p


## Une image : le vent évolue, les shaders et les particules le suivent.
## focus : autour de qui voler ; blossoms : sous les sakuras de Hōjō.
func step(dt: float, focus: Vector3, blossoms := false) -> void:
	_t += dt
	angle = 0.7 + _noise.get_noise_1d(_t * 0.02) * 2.2
	var gust := clampf(0.3 + _noise.get_noise_1d(_t * 0.35 + 50.0) * 1.1 + maxf(0.0, _noise.get_noise_1d(_t * 1.3 + 9.0)) * 0.5, 0.05, 1.0)
	strength = lerpf(strength, gust, minf(1.0, dt * 1.2))
	var dir := Vector2(cos(angle), sin(angle))
	RenderingServer.global_shader_parameter_set("wind", Vector4(dir.x, dir.y, strength, _t))
	var push := Vector3(dir.x, 0, dir.y) * (0.6 + strength * 5.5)
	for p in [leaves, petals]:
		p.global_position = focus + Vector3(-dir.x * 6.0, 3.0, -dir.y * 6.0)
		p.gravity = push + Vector3(0, -0.7 + strength * 0.4, 0)
		p.speed_scale = 0.7 + strength * 0.8
	petals.emitting = blossoms
	leaves.emitting = not blossoms
	for e in emitters:
		if is_instance_valid(e):
			e.gravity = push * 0.6 + Vector3(0, -0.45, 0)
	if Audio.me:
		Audio.me.set_wind(strength)
