## Le relief de la vallée : des collines au centre, des montagnes tout autour,
## un lac, des chemins de terre, et des replats là où l'on a bâti.
## Tout le reste du monde demande la hauteur du sol à ce script.
class_name Terrain
extends Node3D

const SIZE := 512.0
const RES := 257
const CELL := SIZE / (RES - 1)
const WATER_LEVEL := -1.2

var heights := PackedFloat32Array()
## Rouge : chemin de terre. Vert : herbe. Bleu : sol rocheux. Alpha : place dallée.
var mask_image: Image
var height_texture: ImageTexture
var mask_texture: ImageTexture
var lake_center := Vector2(-110, -40)
var lake_radius := 46.0

var _noise := FastNoiseLite.new()
var _detail := FastNoiseLite.new()


func build(places: Array, paths: Array) -> void:
	_noise.seed = 1987
	_noise.noise_type = FastNoiseLite.TYPE_SIMPLEX_SMOOTH
	_noise.frequency = 0.0055
	_noise.fractal_octaves = 5
	_detail.seed = 7
	_detail.frequency = 0.03

	# Les lieux bâtis : on retient la hauteur naturelle de leur centre
	for p in places:
		p["base"] = _raw_height(p["pos"].x, p["pos"].y)

	heights.resize(RES * RES)
	mask_image = Image.create(RES, RES, false, Image.FORMAT_RGBA8)
	for j in RES:
		for i in RES:
			var x := -SIZE / 2 + i * CELL
			var z := -SIZE / 2 + j * CELL
			var h := _raw_height(x, z)
			var flat := 0.0
			for p in places:
				var r: float = p["radius"]
				var d: float = Vector2(x, z).distance_to(p["pos"])
				var t: float = 1.0 - smoothstep(r, r * 1.7, d)
				h = lerpf(h, p["base"], t)
				flat = maxf(flat, 1.0 - smoothstep(r * 0.55, r * 0.9, d))
			var path := 0.0
			for s in paths:
				var d := _segment_distance(Vector2(x, z), s[0], s[1])
				path = maxf(path, 1.0 - smoothstep(1.8, 3.6, d))
			heights[j * RES + i] = h
			mask_image.set_pixel(i, j, Color(path, 0, 0, flat))

	# Pente et herbe, une fois le relief connu
	for j in RES:
		for i in RES:
			var n := _normal_at(i, j)
			var slope := 1.0 - n.y
			var h := heights[j * RES + i]
			var c := mask_image.get_pixel(i, j)
			var rock := smoothstep(0.28, 0.5, slope)
			var grass := (1.0 - c.r) * (1.0 - c.a) * (1.0 - rock) * smoothstep(WATER_LEVEL + 0.2, WATER_LEVEL + 1.2, h)
			mask_image.set_pixel(i, j, Color(c.r, grass, rock, c.a))

	var himg := Image.create_from_data(RES, RES, false, Image.FORMAT_RF, heights.to_byte_array())
	height_texture = ImageTexture.create_from_image(himg)
	mask_texture = ImageTexture.create_from_image(mask_image)

	_build_mesh()
	_build_collision()


func _raw_height(x: float, z: float) -> float:
	var h := (_noise.get_noise_2d(x, z) * 0.5 + 0.5) * 24.0 - 4.0
	# Les montagnes ferment la vallée
	var edge := maxf(absf(x), absf(z)) / (SIZE / 2)
	h += smoothstep(0.6, 0.97, edge) * (55.0 + 30.0 * _detail.get_noise_2d(x, z))
	# Le lac
	var dl := Vector2(x, z).distance_to(lake_center)
	h = lerpf(h, -5.0, 1.0 - smoothstep(lake_radius * 0.45, lake_radius, dl))
	return h


func _segment_distance(p: Vector2, a: Vector2, b: Vector2) -> float:
	var ab := b - a
	var t := clampf((p - a).dot(ab) / ab.length_squared(), 0.0, 1.0)
	return p.distance_to(a + ab * t)


func _normal_at(i: int, j: int) -> Vector3:
	var l := heights[j * RES + maxi(i - 1, 0)]
	var r := heights[j * RES + mini(i + 1, RES - 1)]
	var d := heights[maxi(j - 1, 0) * RES + i]
	var u := heights[mini(j + 1, RES - 1) * RES + i]
	return Vector3(l - r, 2.0 * CELL, d - u).normalized()


## Hauteur du sol en un point du monde, interpolée.
func height_at(x: float, z: float) -> float:
	var fx := clampf((x + SIZE / 2) / CELL, 0.0, RES - 1.001)
	var fz := clampf((z + SIZE / 2) / CELL, 0.0, RES - 1.001)
	var i := int(fx)
	var j := int(fz)
	var u := fx - i
	var v := fz - j
	var a := heights[j * RES + i]
	var b := heights[j * RES + i + 1]
	var c := heights[(j + 1) * RES + i]
	var d := heights[(j + 1) * RES + i + 1]
	return lerpf(lerpf(a, b, u), lerpf(c, d, u), v)


func mask_at(x: float, z: float) -> Color:
	var i := clampi(int((x + SIZE / 2) / CELL), 0, RES - 1)
	var j := clampi(int((z + SIZE / 2) / CELL), 0, RES - 1)
	return mask_image.get_pixel(i, j)


func slope_at(x: float, z: float) -> float:
	var i := clampi(int((x + SIZE / 2) / CELL), 0, RES - 1)
	var j := clampi(int((z + SIZE / 2) / CELL), 0, RES - 1)
	return 1.0 - _normal_at(i, j).y


func _build_mesh() -> void:
	var verts := PackedVector3Array()
	var normals := PackedVector3Array()
	var uvs := PackedVector2Array()
	var idx := PackedInt32Array()
	verts.resize(RES * RES)
	normals.resize(RES * RES)
	uvs.resize(RES * RES)
	for j in RES:
		for i in RES:
			var k := j * RES + i
			verts[k] = Vector3(-SIZE / 2 + i * CELL, heights[k], -SIZE / 2 + j * CELL)
			normals[k] = _normal_at(i, j)
			uvs[k] = Vector2(float(i) / (RES - 1), float(j) / (RES - 1))
	for j in RES - 1:
		for i in RES - 1:
			var a := j * RES + i
			idx.append_array([a, a + 1, a + RES, a + 1, a + RES + 1, a + RES])
	var arrays := []
	arrays.resize(Mesh.ARRAY_MAX)
	arrays[Mesh.ARRAY_VERTEX] = verts
	arrays[Mesh.ARRAY_NORMAL] = normals
	arrays[Mesh.ARRAY_TEX_UV] = uvs
	arrays[Mesh.ARRAY_INDEX] = idx
	var mesh := ArrayMesh.new()
	mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)
	var mat := ShaderMaterial.new()
	mat.shader = load("res://scripts/world/terrain.gdshader")
	mat.set_shader_parameter("mask", mask_texture)
	mat.set_shader_parameter("stone", load("res://assets/pierre.jpg"))
	mat.set_shader_parameter("flags", load("res://assets/sol.jpg"))
	if ResourceLoader.exists("res://assets/kie/herbe.jpg"):
		mat.set_shader_parameter("grass_tex", load("res://assets/kie/herbe.jpg"))
		mat.set_shader_parameter("dirt_tex", load("res://assets/kie/terre.jpg"))
		mat.set_shader_parameter("painted", true)
	mesh.surface_set_material(0, mat)
	var mi := MeshInstance3D.new()
	mi.mesh = mesh
	mi.name = "Sol"
	add_child(mi)


func _build_collision() -> void:
	var body := StaticBody3D.new()
	body.name = "SolCollision"
	var shape := HeightMapShape3D.new()
	shape.map_width = RES
	shape.map_depth = RES
	shape.map_data = heights
	var cs := CollisionShape3D.new()
	cs.shape = shape
	cs.scale = Vector3(CELL, 1.0, CELL)
	body.add_child(cs)
	add_child(body)
