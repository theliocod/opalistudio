## Le sang : des gerbes de gouttes qui retombent, des éclaboussures qui
## restent au sol (décalques), des flaques sous les corps, et la lame qui
## rougit jusqu'à ce qu'on la secoue en rengainant (chiburi).
## Les réglages peuvent le couper (Blood.enabled).
class_name Blood
extends RefCounted

const MAX_DECALS := 48
const RED := Color(0.42, 0.02, 0.03)
static var enabled := true
static var _decals: Array = []
static var _tex: Array = []
static var _drop_mesh: QuadMesh
static var _mist_mesh: QuadMesh


static func _setup() -> void:
	if not _tex.is_empty():
		return
	var rng := RandomNumberGenerator.new()
	rng.seed = 911
	for k in 5:
		_tex.append(ImageTexture.create_from_image(_splat(rng, k)))
	_drop_mesh = QuadMesh.new()
	_drop_mesh.size = Vector2(0.05, 0.1)
	var dm := StandardMaterial3D.new()
	dm.albedo_color = Color(0.5, 0.02, 0.03)
	dm.roughness = 0.2
	dm.metallic_specular = 0.9
	dm.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	dm.vertex_color_use_as_albedo = true
	_drop_mesh.material = dm
	_mist_mesh = QuadMesh.new()
	_mist_mesh.size = Vector2(0.35, 0.35)
	var mm := StandardMaterial3D.new()
	mm.albedo_color = Color(0.35, 0.01, 0.02, 0.5)
	mm.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	mm.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	mm.billboard_mode = BaseMaterial3D.BILLBOARD_PARTICLES
	mm.vertex_color_use_as_albedo = true
	var g := Gradient.new()
	g.set_color(0, Color(1, 1, 1, 0.55))
	g.set_color(1, Color(1, 1, 1, 0.0))
	var gt := GradientTexture2D.new()
	gt.gradient = g
	gt.fill = GradientTexture2D.FILL_RADIAL
	gt.fill_from = Vector2(0.5, 0.5)
	gt.fill_to = Vector2(1.0, 0.5)
	mm.albedo_texture = gt
	_mist_mesh.material = mm


## Une éclaboussure peinte en code : une tache irrégulière, des gouttes
## satellites et des traînées, plus sombres au cœur.
static func _splat(rng: RandomNumberGenerator, k: int) -> Image:
	var n := 128
	var img := Image.create(n, n, false, Image.FORMAT_RGBA8)
	var noise := FastNoiseLite.new()
	noise.seed = rng.randi()
	noise.frequency = 0.06
	var blobs := [[Vector2(64, 64), 26.0 - k * 2.0]]
	for i in 10 + k * 3:
		var a := rng.randf() * TAU
		var d := rng.randf_range(20, 56)
		blobs.append([Vector2(64, 64) + Vector2(cos(a), sin(a)) * d, rng.randf_range(1.5, 6.0)])
	var streak := rng.randf() * TAU
	for y in n:
		for x in n:
			var p := Vector2(x, y)
			var v := 0.0
			for b in blobs:
				var r: float = b[1] * (1.0 + noise.get_noise_2d(x, y) * 0.45)
				v = maxf(v, clampf((r - p.distance_to(b[0])) / 2.5, 0.0, 1.0))
			# une traînée dans une direction : le coup est parti par là
			var rel := p - Vector2(64, 64)
			var along := rel.dot(Vector2(cos(streak), sin(streak)))
			var across := absf(rel.dot(Vector2(-sin(streak), cos(streak))))
			if along > 0.0 and along < 60.0:
				v = maxf(v, clampf((3.5 - across - along * 0.05) / 1.5, 0.0, 1.0) * (1.0 - along / 60.0))
			if v > 0.0:
				var dark := clampf(1.0 - Vector2(x, y).distance_to(Vector2(64, 64)) / 40.0, 0.0, 1.0)
				img.set_pixel(x, y, Color(0.5 - dark * 0.2, 0.02, 0.03, v * 0.92))
	return img


## Une gerbe de sang qui part dans une direction.
static func spray(parent: Node, at: Vector3, dir: Vector3, amount := 60, power := 1.0) -> void:
	if not enabled:
		return
	_setup()
	var drops := CPUParticles3D.new()
	drops.one_shot = true
	drops.explosiveness = 0.85
	drops.amount = amount
	drops.lifetime = 1.1
	drops.mesh = _drop_mesh
	drops.local_coords = false
	drops.direction = dir.normalized() if dir.length_squared() > 0.001 else Vector3.UP
	drops.spread = 32.0
	drops.gravity = Vector3(0, -15.0, 0)
	drops.initial_velocity_min = 2.5 * power
	drops.initial_velocity_max = 8.5 * power
	drops.scale_amount_min = 0.6
	drops.scale_amount_max = 1.8
	drops.color = Color(0.55, 0.02, 0.03)
	drops.particle_flag_align_y = true
	parent.add_child(drops)
	drops.global_position = at
	drops.emitting = true
	var mist := CPUParticles3D.new()
	mist.one_shot = true
	mist.explosiveness = 1.0
	mist.amount = 10
	mist.lifetime = 0.6
	mist.mesh = _mist_mesh
	mist.local_coords = false
	mist.direction = drops.direction
	mist.spread = 40.0
	mist.gravity = Vector3(0, -2.0, 0)
	mist.initial_velocity_min = 0.6 * power
	mist.initial_velocity_max = 2.2 * power
	mist.scale_amount_min = 0.6
	mist.scale_amount_max = 1.6 * power
	parent.add_child(mist)
	mist.global_position = at
	mist.emitting = true
	parent.get_tree().create_timer(1.6, false).timeout.connect(func():
		drops.queue_free()
		mist.queue_free())


## Des éclaboussures au sol, dans le prolongement du coup.
static func stain(parent: Node, ground_of: Callable, at: Vector3, dir: Vector3, count := 2, size := 1.4) -> void:
	if not enabled:
		return
	var d := Vector3(dir.x, 0, dir.z)
	d = d.normalized() if d.length_squared() > 0.001 else Vector3.FORWARD
	for i in count:
		var p := at + d * randf_range(0.4, 2.2) + Vector3(randf_range(-0.4, 0.4), 0, randf_range(-0.4, 0.4))
		p.y = ground_of.call(p)
		decal(parent, p, size * randf_range(0.6, 1.2), atan2(d.x, d.z))


## Une flaque qui s'étend lentement sous un corps.
static func pool(parent: Node, at: Vector3, size := 2.2) -> void:
	if not enabled:
		return
	var dc := decal(parent, at, 0.3, randf() * TAU)
	var tw := dc.create_tween()
	tw.tween_property(dc, "size", Vector3(size, 1.5, size), 4.0).set_ease(Tween.EASE_OUT).set_trans(Tween.TRANS_CUBIC)


static func decal(parent: Node, at: Vector3, size: float, rot: float) -> Decal:
	_setup()
	var dc := Decal.new()
	dc.texture_albedo = _tex[randi() % _tex.size()]
	dc.size = Vector3(size, 1.5, size)
	dc.modulate = Color(0.85, 0.75, 0.75)
	dc.albedo_mix = 1.0
	dc.upper_fade = 0.15
	dc.lower_fade = 0.3
	dc.cull_mask = 1
	parent.add_child(dc)
	dc.global_position = at + Vector3(0, 0.3, 0)
	dc.rotation.y = rot
	_decals.append(dc)
	while _decals.size() > MAX_DECALS:
		var old = _decals.pop_front()
		if is_instance_valid(old):
			old.queue_free()
	return dc


## Le sang sur la lame (0 : propre, 1 : rouge).
static func stain_blade(rig: Rig, amount: float) -> void:
	if not enabled:
		return
	rig.set_meta("blood", clampf(float(rig.get_meta("blood", 0.0)) + amount, 0.0, 1.0))


## Chaque image : la lame prend la couleur du sang qu'elle porte.
static func tint_blade(rig: Rig, dt: float) -> void:
	var b := float(rig.get_meta("blood", 0.0))
	if b <= 0.0 and not rig.has_meta("steel_base"):
		return
	if not rig.has_meta("steel_base"):
		rig.set_meta("steel_base", rig.steel.albedo_color)
	b = maxf(0.0, b - dt * 0.004)
	rig.set_meta("blood", b)
	var base: Color = rig.get_meta("steel_base")
	rig.steel.albedo_color = base.lerp(Color(0.32, 0.015, 0.02), b * 0.85)
	rig.steel.metallic = 1.0 - b * 0.5
	rig.steel.roughness = 0.16 + b * 0.25


## Le chiburi : un geste sec, le sang quitte la lame.
static func chiburi(parent: Node, rig: Rig) -> void:
	var b := float(rig.get_meta("blood", 0.0))
	if b < 0.05:
		return
	rig.set_meta("blood", 0.0)
	spray(parent, rig.blade_tip.global_position, -rig.global_transform.basis.x + Vector3(0, -0.3, 0), int(20 * b) + 6, 0.6)
