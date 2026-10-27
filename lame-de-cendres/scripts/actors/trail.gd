## La traînée : un ruban tendu entre le talon et la pointe de la lame, qui
## garde en mémoire leurs dernières positions et s'efface.
class_name Trail
extends MeshInstance3D

const SEGMENTS := 12

var _hist: Array = []
var _gain := 0.0
var _im := ImmediateMesh.new()
var _color: Color


func _init(color: Color) -> void:
	_color = color
	mesh = _im
	cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	var m := StandardMaterial3D.new()
	m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m.blend_mode = BaseMaterial3D.BLEND_MODE_ADD
	m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	m.cull_mode = BaseMaterial3D.CULL_DISABLED
	m.vertex_color_use_as_albedo = true
	material_override = m
	top_level = true


func set_color(c: Color) -> void:
	_color = c


## active : la lame est en train de frapper
func track(base: Vector3, tip: Vector3, active: bool, dt: float) -> void:
	_hist.push_front([base, tip])
	if _hist.size() > SEGMENTS:
		_hist.pop_back()
	_gain += ((1.0 if active else 0.0) - _gain) * minf(1.0, dt * (30.0 if active else 9.0))
	_im.clear_surfaces()
	if _gain < 0.01 or _hist.size() < 2:
		if not active:
			_hist.clear()
		return
	_im.surface_begin(Mesh.PRIMITIVE_TRIANGLE_STRIP)
	for i in _hist.size():
		var h: Array = _hist[i]
		var f := 1.0 - float(i) / (SEGMENTS - 1)
		var a := f * f * f * _gain * 0.75
		var mid: Vector3 = h[0].lerp(h[1], 0.6)
		_im.surface_set_color(Color(_color.r * 1.5, _color.g * 1.5, _color.b * 1.5, a * 0.25))
		_im.surface_add_vertex(mid)
		_im.surface_set_color(Color(_color.r * 1.5, _color.g * 1.5, _color.b * 1.5, a))
		_im.surface_add_vertex(h[1])
	_im.surface_end()
