## La partie : on bâtit la vallée, on y pose le samouraï et ses ennemis.
extends Node3D

## Les lieux de la vallée. radius : le replat bâti autour du centre.
var places := [
	{"id": "autel", "name": "Autel des Cendres", "pos": Vector2(-120, 150), "radius": 14.0},
	{"id": "village", "name": "Village de Kurogane", "pos": Vector2(-35, 55), "radius": 30.0},
	{"id": "camp", "name": "Camp des Ronins", "pos": Vector2(85, 105), "radius": 20.0},
	{"id": "gue", "name": "Le Gué des Pendus", "pos": Vector2(120, -20), "radius": 14.0},
	{"id": "temple", "name": "Temple de la Lune Rouge", "pos": Vector2(30, -140), "radius": 34.0},
]
var paths := [
	[Vector2(-120, 150), Vector2(-75, 105)], [Vector2(-75, 105), Vector2(-35, 55)],
	[Vector2(-35, 55), Vector2(30, 85)], [Vector2(30, 85), Vector2(85, 105)],
	[Vector2(-35, 55), Vector2(0, -20)], [Vector2(0, -20), Vector2(30, -105)],
	[Vector2(0, -20), Vector2(70, -25)], [Vector2(70, -25), Vector2(120, -20)],
]

var terrain: Terrain
var vegetation: Vegetation


func _ready() -> void:
	add_child(Atmosphere.new())
	terrain = Terrain.new()
	add_child(terrain)
	terrain.build(places, paths)
	_add_lake()
	vegetation = Vegetation.new()
	add_child(vegetation)
	vegetation.build(terrain, places)


func _add_lake() -> void:
	var plane := PlaneMesh.new()
	plane.size = Vector2(terrain.lake_radius * 2.6, terrain.lake_radius * 2.6)
	var mat := ShaderMaterial.new()
	mat.shader = load("res://scripts/world/water.gdshader")
	plane.material = mat
	var mi := MeshInstance3D.new()
	mi.mesh = plane
	mi.position = Vector3(terrain.lake_center.x, Terrain.WATER_LEVEL, terrain.lake_center.y)
	mi.name = "Lac"
	add_child(mi)
