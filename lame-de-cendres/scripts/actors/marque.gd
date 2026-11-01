## Une marque au sol : l'ombre de contact sous les pieds, le sang, la suie.
## Le moteur Forward+ la dessine en décal, qui épouse le relief. Le moteur de
## compatibilité (celui des Mac à carte AMD, qui plantent sous Vulkan) ne sait
## pas dessiner de décal : on y pose alors un carré transparent à plat sur le sol.
class_name Marque
extends RefCounted

static var decals := true
static var _mats := {}


## À appeler une fois au démarrage : quel moteur dessine ?
static func init() -> void:
	decals = RenderingServer.get_current_rendering_method() != "gl_compatibility"


## Une marque de size × size (en m), d'épaisseur depth pour le décal.
## opts : upper, lower (les fondus du décal), fade (distance d'effacement),
## shaded (le carré reçoit la lumière, pour le sang qui luit).
static func make(tex: Texture2D, size: float, depth: float, tint: Color, opts := {}) -> Node3D:
	if decals:
		var dc := Decal.new()
		dc.texture_albedo = tex
		dc.size = Vector3(size, depth, size)
		dc.modulate = tint
		dc.albedo_mix = 1.0
		dc.upper_fade = opts.get("upper", 0.3)
		dc.lower_fade = opts.get("lower", 0.3)
		dc.cull_mask = 1
		if opts.has("fade"):
			dc.distance_fade_enabled = true
			dc.distance_fade_begin = opts.fade
			dc.distance_fade_length = 15.0
		return dc
	var mi := MeshInstance3D.new()
	var q := PlaneMesh.new()
	q.size = Vector2(size, size)
	mi.mesh = q
	mi.material_override = _mat(tex, tint, opts.get("shaded", false))
	mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	if opts.has("fade"):
		mi.visibility_range_end = opts.fade + 15.0
	return mi


static func _mat(tex: Texture2D, tint: Color, shaded: bool) -> StandardMaterial3D:
	var key := "%d|%s|%s" % [tex.get_instance_id(), tint, shaded]
	if not _mats.has(key):
		var m := StandardMaterial3D.new()
		m.albedo_texture = tex
		m.albedo_color = tint
		m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
		m.shading_mode = BaseMaterial3D.SHADING_MODE_PER_PIXEL if shaded else BaseMaterial3D.SHADING_MODE_UNSHADED
		m.roughness = 0.25
		m.render_priority = -1
		_mats[key] = m
	return _mats[key]


## Le point où poser la marque, au-dessus du sol en at.
static func lift(depth: float) -> float:
	return depth * 0.2 if decals else 0.035


## Une marque qui s'étend (une flaque de sang sous un corps).
static func grow(n: Node3D, size: float, time: float) -> void:
	var tw := n.create_tween()
	if n is Decal:
		tw.tween_property(n, "size", Vector3(size, (n as Decal).size.y, size), time).set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_CUBIC)
	else:
		var k := size / ((n as MeshInstance3D).mesh as PlaneMesh).size.x
		tw.tween_property(n, "scale", Vector3(k, 1, k), time).set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_CUBIC)
