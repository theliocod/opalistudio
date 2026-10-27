## Ce qui pousse dans la vallée : l'herbe et les lys, les érables rouges, les
## pins noirs, les arbres morts et les rochers. Placés au hasard, mais un
## hasard fixe : la vallée est la même à chaque partie.
class_name Vegetation
extends Node3D

const GRASS_SIDE := 200          # 200 x 200 brins autour du joueur
const GRASS_STEP := 0.4

var terrain: Terrain
var grass: MultiMeshInstance3D
var rng := RandomNumberGenerator.new()


func build(t: Terrain, avoid: Array) -> void:
	terrain = t
	rng.seed = 42
	_build_grass()
	var bark := _mat(Color(0.07, 0.05, 0.045), 0.95)
	var maple_leaves := _mat(Color(0.45, 0.05, 0.04), 0.8)
	maple_leaves.backlight_enabled = true
	maple_leaves.backlight = Color(0.5, 0.08, 0.03)
	var pine_leaves := _mat(Color(0.035, 0.05, 0.04), 0.9)
	var stone := _mat(Color(0.2, 0.19, 0.2), 0.95)

	_scatter(_tree_maple(bark, maple_leaves), 260, avoid, 0.35, true)
	_scatter(_tree_pine(bark, pine_leaves), 420, avoid, 0.45, true)
	_scatter(_tree_dead(bark), 140, avoid, 0.5, true)
	_scatter(_rock(stone), 360, avoid, 0.9, false)


func _mat(c: Color, rough: float) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = c
	m.roughness = rough
	return m


func _build_grass() -> void:
	# Un brin : une lame effilée en trois segments
	var st := SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	var w := [0.05, 0.04, 0.025, 0.0]
	var ys := [0.0, 0.35, 0.7, 1.0]
	var pts := []
	for k in 4:
		pts.append(Vector3(-w[k], ys[k], 0.0))
		pts.append(Vector3(w[k], ys[k], 0.0))
	for k in 3:
		var a: Vector3 = pts[k * 2]
		var b: Vector3 = pts[k * 2 + 1]
		var c: Vector3 = pts[k * 2 + 2]
		var d: Vector3 = pts[k * 2 + 3]
		for v in [a, b, c, b, d, c]:
			st.add_vertex(v)
	var blade := st.commit()

	var mm := MultiMesh.new()
	mm.transform_format = MultiMesh.TRANSFORM_3D
	mm.mesh = blade
	mm.instance_count = GRASS_SIDE * GRASS_SIDE
	var half := GRASS_SIDE * GRASS_STEP / 2.0
	for j in GRASS_SIDE:
		for i in GRASS_SIDE:
			mm.set_instance_transform(j * GRASS_SIDE + i, Transform3D(Basis(), Vector3(i * GRASS_STEP - half, 0, j * GRASS_STEP - half)))
	mm.custom_aabb = AABB(Vector3(-half, -20, -half), Vector3(half * 2, 120, half * 2))

	var mat := ShaderMaterial.new()
	mat.shader = load("res://scripts/world/grass.gdshader")
	mat.set_shader_parameter("heightmap", terrain.height_texture)
	mat.set_shader_parameter("mask", terrain.mask_texture)
	mat.set_shader_parameter("world_size", Terrain.SIZE)
	mat.set_shader_parameter("fade_radius", half * 0.95)
	blade.surface_set_material(0, mat)

	grass = MultiMeshInstance3D.new()
	grass.multimesh = mm
	grass.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	grass.name = "Herbe"
	add_child(grass)


## L'herbe suit le joueur, par pas entiers pour que les brins restent fixes au sol.
func follow(pos: Vector3) -> void:
	if grass:
		grass.global_position = Vector3(snappedf(pos.x, GRASS_STEP), 0.0, snappedf(pos.z, GRASS_STEP))


# ---------- Les arbres, faits de formes simples assemblées ----------

func _append(st: SurfaceTool, mesh: PrimitiveMesh, xf: Transform3D) -> void:
	st.append_from(mesh, 0, xf)


func _two_surfaces(trunk: SurfaceTool, crown: SurfaceTool, bark: Material, leaves: Material) -> ArrayMesh:
	var mesh := trunk.commit()
	mesh.surface_set_material(0, bark)
	if crown:
		crown.commit(mesh)
		mesh.surface_set_material(1, leaves)
	return mesh


func _tree_maple(bark: Material, leaves: Material) -> ArrayMesh:
	var trunk := SurfaceTool.new(); trunk.begin(Mesh.PRIMITIVE_TRIANGLES)
	var crown := SurfaceTool.new(); crown.begin(Mesh.PRIMITIVE_TRIANGLES)
	var cyl := CylinderMesh.new(); cyl.top_radius = 0.16; cyl.bottom_radius = 0.3; cyl.height = 4.0; cyl.radial_segments = 7
	_append(trunk, cyl, Transform3D(Basis().rotated(Vector3.FORWARD, 0.08), Vector3(0, 2, 0)))
	for k in 3:
		var br := CylinderMesh.new(); br.top_radius = 0.05; br.bottom_radius = 0.12; br.height = 2.2; br.radial_segments = 5
		var a := k * 2.1
		_append(trunk, br, Transform3D(Basis().rotated(Vector3.UP, a).rotated(Vector3(cos(a), 0, sin(a)), 0.9), Vector3(0, 3.4, 0)))
	var r := RandomNumberGenerator.new(); r.seed = 3
	for k in 9:
		var s := SphereMesh.new(); s.radius = 1.3 + r.randf() * 0.7; s.height = s.radius * 1.4; s.radial_segments = 8; s.rings = 5
		var off := Vector3(r.randf_range(-1.7, 1.7), 4.6 + r.randf_range(-0.5, 1.4), r.randf_range(-1.7, 1.7))
		_append(crown, s, Transform3D(Basis(), off))
	return _two_surfaces(trunk, crown, bark, leaves)


func _tree_pine(bark: Material, leaves: Material) -> ArrayMesh:
	var trunk := SurfaceTool.new(); trunk.begin(Mesh.PRIMITIVE_TRIANGLES)
	var crown := SurfaceTool.new(); crown.begin(Mesh.PRIMITIVE_TRIANGLES)
	var cyl := CylinderMesh.new(); cyl.top_radius = 0.1; cyl.bottom_radius = 0.32; cyl.height = 9.0; cyl.radial_segments = 7
	_append(trunk, cyl, Transform3D(Basis(), Vector3(0, 4.5, 0)))
	for k in 5:
		var c := CylinderMesh.new(); c.top_radius = 0.0; c.bottom_radius = 2.6 - k * 0.42; c.height = 2.4; c.radial_segments = 8
		_append(crown, c, Transform3D(Basis().rotated(Vector3.UP, k * 0.7), Vector3(0, 3.4 + k * 1.35, 0)))
	return _two_surfaces(trunk, crown, bark, leaves)


func _tree_dead(bark: Material) -> ArrayMesh:
	var trunk := SurfaceTool.new(); trunk.begin(Mesh.PRIMITIVE_TRIANGLES)
	var r := RandomNumberGenerator.new(); r.seed = 9
	var cyl := CylinderMesh.new(); cyl.top_radius = 0.1; cyl.bottom_radius = 0.28; cyl.height = 5.0; cyl.radial_segments = 6
	_append(trunk, cyl, Transform3D(Basis().rotated(Vector3.RIGHT, 0.06), Vector3(0, 2.5, 0)))
	for k in 6:
		var br := CylinderMesh.new(); br.top_radius = 0.02; br.bottom_radius = 0.09; br.height = 1.6 + r.randf() * 1.4; br.radial_segments = 4
		var a := r.randf() * TAU
		var tilt := 0.6 + r.randf() * 0.6
		var y := 2.4 + r.randf() * 2.4
		var b := Basis().rotated(Vector3(cos(a), 0, sin(a)), tilt)
		_append(trunk, br, Transform3D(b, Vector3(0, y, 0) + b * Vector3(0, br.height / 2, 0)))
	var mesh := trunk.commit()
	mesh.surface_set_material(0, bark)
	return mesh


func _rock(stone: Material) -> ArrayMesh:
	var s := SphereMesh.new(); s.radius = 1.0; s.height = 1.6; s.radial_segments = 9; s.rings = 6
	var st := SurfaceTool.new()
	st.create_from(s, 0)
	var arr := st.commit_to_arrays()
	var verts: PackedVector3Array = arr[Mesh.ARRAY_VERTEX]
	var n := FastNoiseLite.new(); n.frequency = 1.4
	for k in verts.size():
		var v := verts[k]
		verts[k] = v * (1.0 + n.get_noise_3dv(v) * 0.35)
	arr[Mesh.ARRAY_VERTEX] = verts
	arr[Mesh.ARRAY_NORMAL] = null
	arr[Mesh.ARRAY_TANGENT] = null
	var out := SurfaceTool.new()
	out.create_from_arrays(arr)
	out.generate_normals()
	var mesh := out.commit()
	mesh.surface_set_material(0, stone)
	return mesh


## Disperse un modèle sur la vallée, loin des lieux bâtis, des chemins et de l'eau.
func _scatter(mesh: Mesh, count: int, avoid: Array, max_slope: float, collide: bool) -> void:
	var xfs := []
	var tries := 0
	while xfs.size() < count and tries < count * 30:
		tries += 1
		var x := rng.randf_range(-Terrain.SIZE / 2 + 8, Terrain.SIZE / 2 - 8)
		var z := rng.randf_range(-Terrain.SIZE / 2 + 8, Terrain.SIZE / 2 - 8)
		var h := terrain.height_at(x, z)
		if h < Terrain.WATER_LEVEL + 0.6 or h > 52.0:
			continue
		if terrain.slope_at(x, z) > max_slope or terrain.mask_at(x, z).r > 0.15:
			continue
		var ok := true
		for a in avoid:
			if Vector2(x, z).distance_to(a["pos"]) < a["radius"] * 1.1:
				ok = false
				break
		if not ok:
			continue
		var sc := rng.randf_range(0.7, 1.35)
		var b := Basis().rotated(Vector3.UP, rng.randf() * TAU).scaled(Vector3(sc, sc * rng.randf_range(0.85, 1.2), sc))
		xfs.append(Transform3D(b, Vector3(x, h - 0.15, z)))
	var mm := MultiMesh.new()
	mm.transform_format = MultiMesh.TRANSFORM_3D
	mm.mesh = mesh
	mm.instance_count = xfs.size()
	for k in xfs.size():
		mm.set_instance_transform(k, xfs[k])
	var mmi := MultiMeshInstance3D.new()
	mmi.multimesh = mm
	mmi.visibility_range_end = 260.0
	add_child(mmi)
	if collide:
		var body := StaticBody3D.new()
		for xf in xfs:
			var cs := CollisionShape3D.new()
			var shape := CylinderShape3D.new()
			shape.radius = 0.35
			shape.height = 4.0
			cs.shape = shape
			cs.position = xf.origin + Vector3(0, 2, 0)
			body.add_child(cs)
		add_child(body)
	else:
		var body := StaticBody3D.new()
		for xf in xfs:
			var big: float = xf.basis.get_scale().x
			if big < 1.0:
				continue
			var cs := CollisionShape3D.new()
			var shape := SphereShape3D.new()
			shape.radius = big * 0.85
			cs.shape = shape
			cs.position = xf.origin
			body.add_child(cs)
		add_child(body)
