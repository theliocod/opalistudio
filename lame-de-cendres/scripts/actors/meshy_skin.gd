## La peau : le modèle sculpté par Meshy, posé sur notre squelette.
## Notre squelette (Rig) continue de tout calculer ; à chaque image, chaque os
## du modèle recopie l'orientation de l'articulation qui lui correspond.
## Même principe que skin.js dans la version navigateur.
class_name MeshySkin
extends RefCounted

## Notre articulation → l'os Meshy qui la suit. Spine01, les clavicules,
## la main gauche et les pieds gardent leur pose de repos.
const BONES := {
	"hips": "Hips", "spine": "Spine02", "chest": "Spine", "neck": "neck", "head": "Head",
	"shL": "LeftArm", "elL": "LeftForeArm", "shR": "RightArm", "elR": "RightForeArm", "wrR": "RightHand",
	"hipL": "LeftUpLeg", "knL": "LeftLeg", "hipR": "RightUpLeg", "knR": "RightLeg",
}
## L'os dont la direction de repos sert à redresser chaque membre
const AIM := {
	"shL": "LeftForeArm", "elL": "LeftHand", "shR": "RightForeArm", "elR": "RightHand", "wrR": "RightHand",
	"hipL": "LeftLeg", "knL": "LeftFoot", "hipR": "RightLeg", "knR": "RightFoot",
}
const MODELS := {"player": "samourai", "ronin": "ronin", "chef": "ronin", "oni": "oni"}

var rig: Rig
var skel: Skeleton3D
var order: Array[int] = []          # les os, parents d'abord
var base := {}                      # os → [articulation, correction]
var parent_of := {}
var top_q := Quaternion()           # orientation du nœud squelette, vue du personnage
var to_skel := Basis()              # du personnage vers l'espace du squelette
var hips_bone := -1
var hips_rest := Vector3.ZERO
var _w := {}
var _cur := {}


## Habille le squelette. Renvoie null si le modèle manque ou ne colle pas.
static func dress(r: Rig) -> MeshySkin:
	var path := "res://assets/modeles/%s.glb" % MODELS.get(r.kind, "")
	if not ResourceLoader.exists(path):
		return null
	var scene: PackedScene = load(path)
	if scene == null:
		return null
	var s := MeshySkin.new()
	return s if s._attach(r, scene.instantiate()) else null


func _char_xf(n: Node3D) -> Transform3D:
	return rig.global_transform.affine_inverse() * n.global_transform


func _attach(r: Rig, model: Node3D) -> bool:
	rig = r
	var holder := Node3D.new()
	holder.name = "Peau"
	holder.add_child(model)
	rig.add_child(holder)
	var found := model.find_children("*", "Skeleton3D", true, false)
	if found.is_empty():
		holder.queue_free()
		return false
	skel = found[0]
	for name in BONES.values():
		if skel.find_bone(name) < 0:
			push_warning("os %s absent du modèle %s" % [name, rig.kind])
			holder.queue_free()
			return false
	skel.reset_bone_poses()

	# Même hauteur de hanches que notre squelette : les poses restent justes
	hips_bone = skel.find_bone("Hips")
	var hips_at := (_char_xf(skel) * skel.get_bone_global_rest(hips_bone)).origin
	holder.scale = Vector3.ONE * (Rig.HIPS_Y / hips_at.y)

	var skel_xf := _char_xf(skel)
	top_q = skel_xf.basis.get_rotation_quaternion()
	to_skel = skel_xf.basis.inverse()
	var rest_q := func(b: int) -> Quaternion:
		return (skel_xf * skel.get_bone_global_rest(b)).basis.get_rotation_quaternion()
	var pos := func(b: int) -> Vector3:
		return (skel_xf * skel.get_bone_global_rest(b)).origin

	for b in skel.get_bone_count():
		order.append(b)
	order.sort_custom(func(a, c): return _depth(a) < _depth(c))

	# Nos membres pendent tout droit au repos ; ceux de Meshy sont en A.
	# Pour chaque os : la rotation qui passe de sa direction de repos à la
	# nôtre, puis son orientation de repos.
	for joint in BONES:
		var b := skel.find_bone(BONES[joint])
		var fix := Quaternion()
		if AIM.has(joint):
			var from := skel.find_bone("RightForeArm") if joint == "wrR" else b
			var dir: Vector3 = (pos.call(skel.find_bone(AIM[joint])) - pos.call(from)).normalized()
			fix = Quaternion(dir, Vector3.DOWN)
		base[b] = [joint, fix * rest_q.call(b)]
	for k in BONES:
		var p: Node = rig.joints[k].get_parent()
		parent_of[k] = ""
		for n in BONES:
			if rig.joints[n] == p:
				parent_of[k] = n
	hips_rest = skel.get_bone_rest(hips_bone).origin

	# Le sabre passe dans la vraie main, tenu comme dans notre squelette :
	# on se met dans notre pose de repos et on garde le même placement.
	var saved := {}
	for k in BONES:
		saved[k] = rig.joints[k].quaternion
		rig.joints[k].quaternion = Quaternion()
	sync()
	var hand := skel.find_bone("RightHand")
	var hand_xf := skel_xf * skel.get_bone_global_pose(hand)
	var grip := hand_xf.origin + Vector3(0, -0.08, 0.01)
	var attach := BoneAttachment3D.new()
	attach.bone_name = "RightHand"
	skel.add_child(attach)
	rig.sword.get_parent().remove_child(rig.sword)
	attach.add_child(rig.sword)
	rig.sword.transform = hand_xf.affine_inverse() * Transform3D(Basis(), grip)
	for k in BONES:
		rig.joints[k].quaternion = saved[k]

	rig.hide_shapes()
	for mi in model.find_children("*", "MeshInstance3D", true, false):
		mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON
		mi.extra_cull_margin = 2.0

	# Les yeux des damnés brûlent toujours, devant le visage du modèle
	if rig.kind != "player":
		var head := skel.find_bone("Head")
		var head_xf := skel_xf * skel.get_bone_global_rest(head)
		var front := _face_front(model, head_xf.origin)
		var head_attach := BoneAttachment3D.new()
		head_attach.bone_name = "Head"
		skel.add_child(head_attach)
		for s in [-1, 1]:
			var eye := MeshInstance3D.new()
			var sm := SphereMesh.new()
			sm.radius = 0.014 if rig.kind == "oni" else 0.011
			sm.height = sm.radius * 2
			eye.mesh = sm
			eye.material_override = rig.eye_mat
			head_attach.add_child(eye)
			eye.transform = (skel_xf * skel.get_bone_global_pose(head)).affine_inverse() * Transform3D(Basis(), Vector3(s * 0.032, front.y, front.z))
	return true


func _depth(b: int) -> int:
	var d := 0
	var p := skel.get_bone_parent(b)
	while p >= 0:
		d += 1
		p = skel.get_bone_parent(p)
	return d


## Le devant du visage : le point le plus avancé du maillage, au milieu,
## un peu au-dessus de la base de la tête.
func _face_front(model: Node3D, head: Vector3) -> Vector3:
	var y := head.y + 0.08
	var out := Vector3(0, y, 0.08)
	var best := -INF
	for mi in model.find_children("*", "MeshInstance3D", true, false):
		var xf := _char_xf(mi)
		var verts: PackedVector3Array = mi.mesh.surface_get_arrays(0)[Mesh.ARRAY_VERTEX]
		for v in verts:
			var p := xf * v
			if absf(p.x) < 0.05 and absf(p.y - y) < 0.03 and p.z > best:
				best = p.z
	if best > -INF:
		out.z = best + 0.004
	return out


## Recopie la pose du squelette sur les os du modèle.
func sync() -> void:
	for k in BONES:
		var q: Quaternion = rig.joints[k].quaternion
		if parent_of[k] != "":
			q = _w[parent_of[k]] * q
		_w[k] = q
	for b in order:
		var pb := skel.get_bone_parent(b)
		var parent_q: Quaternion = top_q if pb < 0 else _cur[pb]
		var q: Quaternion
		if base.has(b):
			q = _w[base[b][0]] * base[b][1]
			skel.set_bone_pose_rotation(b, parent_q.inverse() * q)
		else:
			q = parent_q * skel.get_bone_pose_rotation(b)
		_cur[b] = q
	var dy: float = rig.joints.hips.position.y - Rig.HIPS_Y
	skel.set_bone_pose_position(hips_bone, hips_rest + to_skel * Vector3(0, dy, 0))
