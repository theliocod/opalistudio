## Le corps : un squelette fait de nœuds imbriqués. Chaque articulation se
## règle par trois angles (ordre X, Y, Z) ; une « pose » est la liste de ces
## angles. Le personnage regarde vers +z, sa droite est en -x.
## Habillé de formes simples, remplacées par le modèle Meshy quand il existe.
class_name Rig
extends Node3D

const JOINTS := ["hips", "spine", "chest", "neck", "head", "shL", "elL", "shR", "elR", "wrR", "hipL", "knL", "hipR", "knR"]
const HIPS_Y := 0.98

## La garde : le sabre tenu devant soi, pointe vers l'adversaire.
const GUARD := {
	"hipsY": -0.06,
	"hips": [0, 0, 0], "spine": [0.06, 0, 0], "chest": [0, -0.3, 0], "neck": [0, 0.22, 0], "head": [0, 0, 0],
	"shR": [-0.75, 0.35, 0.05], "elR": [-0.95, 0, 0], "wrR": [0.75, 0.15, 0],
	"shL": [-0.85, -0.55, -0.15], "elL": [-1.0, 0, 0],
	"hipL": [-0.3, 0, 0.06], "knL": [0.4, 0, 0], "hipR": [0.22, 0, -0.06], "knR": [0.32, 0, 0],
}

## Au fourreau : les bras pendent, le corps se relâche.
const RELAX := {
	"hipsY": -0.02,
	"hips": [0, 0, 0], "spine": [0.03, 0, 0], "chest": [0.02, 0, 0], "neck": [0, 0, 0], "head": [0, 0, 0],
	"shR": [0.05, 0, -0.12], "elR": [-0.25, 0, 0], "wrR": [0, 0, 0],
	"shL": [0.05, 0, 0.12], "elL": [-0.25, 0, 0],
	"hipL": [-0.04, 0, 0.04], "knL": [0.08, 0, 0], "hipR": [0.04, 0, -0.04], "knR": [0.08, 0, 0],
}

var kind := "player"
var joints := {}
var mats := {}
var blade_base: Node3D
var blade_tip: Node3D
var sword: Node3D
var steel: StandardMaterial3D
var eye_mat: StandardMaterial3D
var body_scale := 1.0
var feet: Array[Node3D] = []    # les chevilles, pour le coup de pied
var evil := false               # un damné : yeux rouges, cornes, lame rougeoyante


func _init(k: String) -> void:
	kind = k
	evil = kind in ["ronin", "chef", "oni"]
	mats.armor = _m(Color(0.11, 0.09, 0.12) if evil else Color(0.17, 0.18, 0.24), 0.38, 0.35)
	mats.plate = _m(Color(0.23, 0.055, 0.08) if evil else Color(0.54, 0.1, 0.09), 0.5, 0.25)
	mats.cloth = _m(Color(0.09, 0.075, 0.1) if evil else Color(0.13, 0.11, 0.13), 0.95, 0.0)
	mats.skin = _m(Color(0.29, 0.24, 0.27) if evil else Color(0.72, 0.56, 0.45), 0.7, 0.0)
	mats.gold = _m(Color(0.79, 0.64, 0.29), 0.3, 1.0)
	steel = _m(Color(0.54, 0.56, 0.6) if evil else Color(0.87, 0.9, 0.93), 0.16, 1.0)
	steel.emission_enabled = true
	steel.emission = Color(1.0, 0.1, 0.1) if evil else Color(0.62, 0.84, 1.0)
	steel.emission_energy_multiplier = 0.15 if evil else 0.08
	eye_mat = StandardMaterial3D.new()
	eye_mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	eye_mat.albedo_color = Color(1.0, 0.16, 0.1) if evil else Color(1, 1, 1)
	eye_mat.emission_enabled = true
	eye_mat.emission = eye_mat.albedo_color
	eye_mat.emission_energy_multiplier = 6.0
	_build()
	body_scale = {"oni": 1.38, "chef": 1.1, "moine": 1.06, "marchand": 0.97, "villageoise": 0.95, "oyuki": 0.96}.get(kind, 1.0)
	scale = Vector3.ONE * body_scale


func _m(c: Color, rough: float, metal: float) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = c
	m.roughness = rough
	m.metallic = metal
	return m


func _joint(parent: Node3D, key: String, pos: Vector3) -> Node3D:
	var j := Node3D.new()
	j.name = key
	j.rotation_order = EULER_ORDER_XYZ
	j.position = pos
	parent.add_child(j)
	joints[key] = j
	return j


func _mesh(parent: Node3D, mesh: Mesh, mat: Material, pos := Vector3.ZERO, rot := Vector3.ZERO) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	mi.mesh = mesh
	mi.material_override = mat
	mi.position = pos
	mi.rotation = rot
	parent.add_child(mi)
	return mi


func _box(parent: Node3D, size: Vector3, mat: Material, pos := Vector3.ZERO, rot := Vector3.ZERO) -> MeshInstance3D:
	var b := BoxMesh.new()
	b.size = size
	return _mesh(parent, b, mat, pos, rot)


## Un membre : un os qui pend vers -y, et l'articulation suivante à son bout.
func _limb(parent: Node3D, key: String, length: float, r: float, mat: Material) -> Node3D:
	var c := CapsuleMesh.new()
	c.radius = r
	c.height = length + 2 * r
	c.radial_segments = 10
	_mesh(parent, c, mat, Vector3(0, -length / 2, 0))
	return _joint(parent, key, Vector3(0, -length, 0))


func _build() -> void:
	var hips := _joint(self, "hips", Vector3(0, HIPS_Y, 0))
	_box(hips, Vector3(0.34, 0.18, 0.22), mats.cloth)
	for i in 5:
		var a := float(i) / 5.0 * TAU + 0.3
		_box(hips, Vector3(0.16, 0.26, 0.03), mats.plate, Vector3(sin(a) * 0.17, -0.16, cos(a) * 0.13), Vector3(0.18, a, 0))

	var spine := _joint(hips, "spine", Vector3(0, 0.08, 0))
	var chest := _joint(spine, "chest", Vector3(0, 0.2, 0))
	_box(chest, Vector3(0.44, 0.46, 0.27), mats.armor, Vector3(0, 0.12, 0))
	_box(chest, Vector3(0.46, 0.06, 0.29), mats.plate, Vector3(0, -0.08, 0))
	_box(chest, Vector3(0.4, 0.04, 0.285), mats.gold, Vector3(0, 0.3, 0))

	var neck := _joint(chest, "neck", Vector3(0, 0.38, 0))
	var head := _joint(neck, "head", Vector3(0, 0.06, 0))
	var hs := SphereMesh.new(); hs.radius = 0.115; hs.height = 0.23
	_mesh(head, hs, mats.skin, Vector3(0, 0.09, 0))
	var helm := SphereMesh.new(); helm.radius = 0.15; helm.height = 0.3; helm.is_hemisphere = true
	_mesh(head, helm, mats.armor, Vector3(0, 0.11, 0))
	_box(head, Vector3(0.17, 0.09, 0.05), mats.armor, Vector3(0, 0.04, 0.1))
	for s in [-1, 1]:
		var e := SphereMesh.new(); e.radius = 0.017 if kind != "player" else 0.011; e.height = e.radius * 2
		_mesh(head, e, eye_mat, Vector3(s * 0.045, 0.1, 0.105))
	if not evil:
		for s in [-1, 1]:
			_box(head, Vector3(0.02, 0.24, 0.015), mats.gold, Vector3(s * 0.06, 0.3, 0.1), Vector3(0, 0, -s * 0.42))
	else:
		for s in [-1, 1]:
			var horn := CylinderMesh.new(); horn.top_radius = 0.0; horn.bottom_radius = 0.03; horn.height = 0.3 if kind == "oni" else 0.18
			_mesh(head, horn, mats.armor, Vector3(s * 0.1, 0.27, 0.02), Vector3(0, 0, -s * 0.5))

	for side in [1, -1]:
		var key_sh := "shL" if side == 1 else "shR"
		var key_el := "elL" if side == 1 else "elR"
		var sh := _joint(chest, key_sh, Vector3(side * 0.28, 0.3, 0))
		_box(sh, Vector3(0.2, 0.22, 0.24), mats.plate, Vector3(side * 0.07, -0.08, 0), Vector3(0, 0, side * 0.2))
		var el := _limb(sh, key_el, 0.28, 0.05, mats.cloth)
		var wr := _limb(el, "wrR" if side == -1 else "wrL", 0.25, 0.045, mats.armor)
		var hand := SphereMesh.new(); hand.radius = 0.05; hand.height = 0.1
		_mesh(wr, hand, mats.skin)
	joints.erase("wrL")
	_build_katana(joints.wrR)

	for side in [1, -1]:
		var hip := _joint(hips, "hipL" if side == 1 else "hipR", Vector3(side * 0.11, -0.07, 0))
		var kn := _limb(hip, "knL" if side == 1 else "knR", 0.44, 0.075, mats.cloth)
		var ankle := _limb(kn, "ankle", 0.44, 0.06, mats.armor)
		_box(ankle, Vector3(0.1, 0.06, 0.24), mats.armor, Vector3(0, -0.02, 0.05))
		joints.erase("ankle")
		feet.append(ankle)


func _build_katana(hand: Node3D) -> void:
	sword = Node3D.new()
	sword.name = "Katana"
	hand.add_child(sword)
	var grip := CylinderMesh.new(); grip.top_radius = 0.018; grip.bottom_radius = 0.018; grip.height = 0.26
	_mesh(sword, grip, mats.plate, Vector3(0, 0, -0.06), Vector3(PI / 2, 0, 0))
	var tsuba := CylinderMesh.new(); tsuba.top_radius = 0.05; tsuba.bottom_radius = 0.05; tsuba.height = 0.012
	_mesh(sword, tsuba, _m(Color(0.16, 0.15, 0.12), 0.4, 0.8), Vector3(0, 0, 0.08), Vector3(PI / 2, 0, 0))
	# La lame, légèrement cambrée : trois segments qui s'inclinent
	for i in 3:
		_box(sword, Vector3(0.008, 0.032 - i * 0.004, 0.31), steel, Vector3(0, i * i * 0.012, 0.24 + i * 0.3), Vector3(-i * 0.05, 0, 0))
	blade_base = Node3D.new(); blade_base.position = Vector3(0, 0, 0.14); sword.add_child(blade_base)
	blade_tip = Node3D.new(); blade_tip.position = Vector3(0, 0.05, 1.02); sword.add_child(blade_tip)


## Applique une pose (des angles par articulation, plus la hauteur des hanches).
func set_pose(p: Dictionary) -> void:
	for k in JOINTS:
		if p.has(k):
			var r: Array = p[k]
			joints[k].rotation = Vector3(r[0], r[1], r[2])
	joints.hips.position.y = HIPS_Y + p.get("hipsY", 0.0)


## Applique une pose en quaternions (les animations converties de Mixamo).
func set_quats(q: Dictionary, hips_y: float) -> void:
	for k in JOINTS:
		if q.has(k):
			joints[k].quaternion = q[k]
	joints.hips.position.y = HIPS_Y + hips_y


## Cache les formes simples : un modèle sculpté les remplace.
func hide_shapes() -> void:
	for mi in joints.hips.find_children("*", "MeshInstance3D", true, false):
		if not sword.is_ancestor_of(mi):
			mi.visible = false


# ---------- Mélanges de poses ----------

static func mix_pose(a: Dictionary, b: Dictionary, t: float) -> Dictionary:
	var out := {"hipsY": lerpf(a.get("hipsY", 0.0), b.get("hipsY", a.get("hipsY", 0.0)), t)}
	for k in JOINTS:
		var x: Array = a.get(k, [0, 0, 0])
		var y: Array = b.get(k, x)
		out[k] = [lerpf(x[0], y[0], t), lerpf(x[1], y[1], t), lerpf(x[2], y[2], t)]
	return out


static func _ease(t: float) -> float:
	return t * t * (3.0 - 2.0 * t)


## Lit une animation à clés : [[temps, pose partielle], ...]. Les
## articulations absentes d'une clé gardent celles de la base.
static func sample_pose(keys: Array, time: float, base: Dictionary) -> Dictionary:
	if time <= keys[0][0]:
		return base.merged(keys[0][1], true)
	for i in keys.size() - 1:
		var t0: float = keys[i][0]
		var t1: float = keys[i + 1][0]
		if time <= t1:
			var u := _ease((time - t0) / (t1 - t0))
			return mix_pose(base.merged(keys[i][1], true), base.merged(keys[i + 1][1], true), u)
	return base.merged(keys[keys.size() - 1][1], true)
