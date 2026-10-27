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
## Les arbres posés : [position, espèce], pour la carte.
var trees: Array = []
var _species := ""


func build(t: Terrain, avoid: Array) -> void:
	terrain = t
	rng.seed = 42
	_build_grass()
	var bark := _mat(Color(0.55, 0.5, 0.48), 0.95)
	bark.albedo_texture = load("res://assets/ecorce.jpg")
	bark.normal_enabled = true
	bark.normal_texture = load("res://assets/ecorce-n.jpg")
	bark.uv1_scale = Vector3(2, 3, 1)
	var maple_leaves := _mat(Color(0.45, 0.05, 0.04), 0.8)
	maple_leaves.backlight_enabled = true
	maple_leaves.backlight = Color(0.5, 0.08, 0.03)
	var pine_leaves := _mat(Color(0.035, 0.05, 0.04), 0.9)
	var stone := _mat(Color(0.8, 0.78, 0.8), 0.95)
	stone.albedo_texture = load("res://assets/pierre.jpg")
	stone.normal_enabled = true
	stone.normal_texture = load("res://assets/pierre-n.jpg")
	stone.uv1_triplanar = true
	stone.uv1_world_triplanar = true
	stone.uv1_scale = Vector3(0.35, 0.35, 0.35)

	# Les couronnes peintes par kie.ai, quand elles sont là ; sinon des formes simples
	var maple_cards := _leaf_mat("res://assets/kie/erable.png", Color(0.75, 0.7, 0.7), Color(0.3, 0.04, 0.02))
	var pine_cards := _leaf_mat("res://assets/kie/pin.png", Color(0.42, 0.48, 0.44), Color(0.03, 0.05, 0.03))
	for v in 2:
		_species = "erable"
		_scatter(_maple_cards(bark, maple_cards, v) if maple_cards else _tree_maple(bark, maple_leaves), 130, avoid, 0.35, true)
		_species = "pin"
		_scatter(_pine_cards(bark, pine_cards, v) if pine_cards else _tree_pine(bark, pine_leaves), 210, avoid, 0.45, true)
	_species = "mort"
	_scatter(_tree_dead(bark), 140, avoid, 0.5, true)
	_species = ""
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
	var w := [0.035, 0.028, 0.016, 0.0]
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


# ---------- Les arbres à cartes de feuillage ----------

func _leaf_mat(path: String, tint: Color, back: Color) -> ShaderMaterial:
	if not ResourceLoader.exists(path):
		return null
	var m := ShaderMaterial.new()
	m.shader = load("res://scripts/world/foliage.gdshader")
	m.set_shader_parameter("leaves", load(path))
	m.set_shader_parameter("tint", Vector3(tint.r, tint.g, tint.b))
	m.set_shader_parameter("translucency", back)
	return m


## Une carte de feuillage : un carré peint, tourné et posé dans la couronne.
func _card(st: SurfaceTool, size: float, xf: Transform3D) -> void:
	var q := QuadMesh.new()
	q.size = Vector2(size, size)
	st.append_from(q, 0, xf)


## Les normales des cartes pointent hors de la couronne : elle s'éclaire comme un volume.
func _round_normals(st: SurfaceTool, centers: Array) -> SurfaceTool:
	var arr := st.commit_to_arrays()
	var verts: PackedVector3Array = arr[Mesh.ARRAY_VERTEX]
	var normals := PackedVector3Array()
	normals.resize(verts.size())
	for k in verts.size():
		var v := verts[k]
		var best: Vector3 = centers[0]
		for c in centers:
			if v.distance_squared_to(c) < v.distance_squared_to(best):
				best = c
		normals[k] = (v - best + Vector3(0, 0.3, 0)).normalized()
	arr[Mesh.ARRAY_NORMAL] = normals
	var out := SurfaceTool.new()
	out.create_from_arrays(arr)
	return out


func _branches(trunk: SurfaceTool, r: RandomNumberGenerator, n: int, y0: float, y1: float, length: float) -> void:
	for k in n:
		var br := CylinderMesh.new()
		br.top_radius = 0.04
		br.bottom_radius = 0.1
		br.height = length * r.randf_range(0.8, 1.2)
		br.radial_segments = 5
		var a := r.randf() * TAU
		var b := Basis().rotated(Vector3(cos(a), 0, sin(a)), r.randf_range(0.7, 1.1))
		var y := r.randf_range(y0, y1)
		_append(trunk, br, Transform3D(b, Vector3(0, y, 0) + b * Vector3(0, br.height / 2, 0)))


func _maple_cards(bark: Material, leaves: Material, variant: int) -> ArrayMesh:
	var r := RandomNumberGenerator.new(); r.seed = 11 + variant * 7
	var trunk := SurfaceTool.new(); trunk.begin(Mesh.PRIMITIVE_TRIANGLES)
	var cyl := CylinderMesh.new(); cyl.top_radius = 0.14; cyl.bottom_radius = 0.32; cyl.height = 4.2; cyl.radial_segments = 8
	var lean := r.randf_range(-0.12, 0.12)
	_append(trunk, cyl, Transform3D(Basis().rotated(Vector3.FORWARD, lean), Vector3(0, 2.1, 0)))
	_branches(trunk, r, 5, 2.6, 3.9, 2.0)
	var crown := SurfaceTool.new(); crown.begin(Mesh.PRIMITIVE_TRIANGLES)
	var c := Vector3(sin(lean) * -2.0, 5.0 + variant * 0.4, 0)
	var centers := [c]
	# trois grandes cartes croisées, puis des touffes autour
	for k in 3:
		_card(crown, 5.2, Transform3D(Basis().rotated(Vector3.UP, k * PI / 3.0 + r.randf() * 0.2), c))
	_card(crown, 4.6, Transform3D(Basis().rotated(Vector3.RIGHT, -PI / 2), c + Vector3(0, 0.6, 0)))
	for k in 7:
		var a := r.randf() * TAU
		var off := Vector3(cos(a) * r.randf_range(1.2, 2.0), r.randf_range(-0.8, 1.0), sin(a) * r.randf_range(1.2, 2.0))
		centers.append(c + off * 0.6)
		_card(crown, r.randf_range(2.2, 3.0), Transform3D(Basis().rotated(Vector3.UP, r.randf() * TAU).rotated(Vector3.RIGHT, r.randf_range(-0.5, 0.5)), c + off))
	var mesh := trunk.commit()
	mesh.surface_set_material(0, bark)
	_round_normals(crown, centers).commit(mesh)
	mesh.surface_set_material(1, leaves)
	return mesh


func _pine_cards(bark: Material, leaves: Material, variant: int) -> ArrayMesh:
	var r := RandomNumberGenerator.new(); r.seed = 23 + variant * 5
	var trunk := SurfaceTool.new(); trunk.begin(Mesh.PRIMITIVE_TRIANGLES)
	var h := 8.5 + variant * 1.5
	var cyl := CylinderMesh.new(); cyl.top_radius = 0.09; cyl.bottom_radius = 0.34; cyl.height = h; cyl.radial_segments = 8
	var bend := r.randf_range(-0.08, 0.08)
	_append(trunk, cyl, Transform3D(Basis().rotated(Vector3.FORWARD, bend), Vector3(0, h / 2, 0)))
	_branches(trunk, r, 6, h * 0.45, h * 0.9, 2.2)
	var crown := SurfaceTool.new(); crown.begin(Mesh.PRIMITIVE_TRIANGLES)
	var centers := []
	# des étages de « nuages » d'aiguilles, comme les pins noirs japonais
	var tiers := 4
	for k in tiers:
		var y := h * (0.5 + 0.5 * float(k) / (tiers - 1))
		var size := lerpf(5.6, 2.8, float(k) / (tiers - 1))
		var c := Vector3(sin(bend) * -y + r.randf_range(-0.5, 0.5), y, r.randf_range(-0.5, 0.5))
		centers.append(c)
		for j in 2:
			_card(crown, size, Transform3D(Basis().rotated(Vector3.UP, j * PI / 2 + k * 0.6), c))
		_card(crown, size * 0.95, Transform3D(Basis().rotated(Vector3.RIGHT, -PI / 2).rotated(Vector3.UP, k), c + Vector3(0, 0.25, 0)))
	var mesh := trunk.commit()
	mesh.surface_set_material(0, bark)
	_round_normals(crown, centers).commit(mesh)
	mesh.surface_set_material(1, leaves)
	return mesh


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
	if _species != "":
		for xf in xfs:
			trees.append([xf.origin, _species])
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
