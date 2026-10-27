## Les effets : étincelles, sang d'encre, braises, et la traînée lumineuse
## que laisse la lame.
class_name Fx
extends RefCounted

static var _mats := {}


static func _material(color: Color, intensity: float) -> StandardMaterial3D:
	var key := "%s/%s" % [color.to_html(), intensity]
	if _mats.has(key):
		return _mats[key]
	var m := StandardMaterial3D.new()
	m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	m.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	m.vertex_color_use_as_albedo = true
	m.albedo_color = Color(color.r * intensity, color.g * intensity, color.b * intensity)
	m.no_depth_test = false
	_mats[key] = m
	return m


## Une gerbe de particules qui s'éteint toute seule.
static func burst(parent: Node, at: Vector3, count: int, color: Color, speed := 6.0, up := 2.0, gravity := 14.0, life := 0.45, intensity := 3.0, size := 0.07) -> void:
	var p := CPUParticles3D.new()
	p.one_shot = true
	p.explosiveness = 1.0
	p.amount = count
	p.lifetime = life
	p.local_coords = false
	var q := QuadMesh.new()
	q.size = Vector2(size, size)
	q.material = _material(color, intensity)
	p.mesh = q
	p.emission_shape = CPUParticles3D.EMISSION_SHAPE_SPHERE
	p.emission_sphere_radius = 0.08
	p.direction = Vector3(0, 1, 0)
	p.spread = 180.0
	p.initial_velocity_min = speed * 0.3
	p.initial_velocity_max = speed * 1.2
	p.gravity = Vector3(0, -gravity + up, 0)
	p.damping_min = 1.0
	p.damping_max = 2.5
	p.lifetime_randomness = 0.5
	var fade := Gradient.new()
	fade.set_color(0, Color(1, 1, 1, 1))
	fade.set_color(1, Color(1, 1, 1, 0))
	p.color_ramp = fade
	parent.add_child(p)
	p.global_position = at
	p.emitting = true
	p.finished.connect(p.queue_free)
