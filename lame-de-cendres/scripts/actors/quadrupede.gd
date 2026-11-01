## Un quadrupède (le cheval, le renard) : un modèle sculpté par Meshy, livré
## sans squelette. On lit sa silhouette (les quatre jambes sous le ventre, le
## dos, l'encolure, la tête, la queue), on lui pose un squelette de dix-huit
## os, et l'on peint les poids de chaque sommet d'après la forme du corps.
## Puis une démarche calculée : le pas à quatre temps, le trot en diagonale,
## le galop, le corps qui roule, la tête qui balance, la queue qui fouette.
class_name Quadrupede
extends Node3D

## Taille réelle (du sabot au bout des oreilles) et allures, par espèce
const SPECIES := {
	"cheval": {"height": 2.25, "walk": 1.7, "trot": 4.2, "gallop": 11.0},
	"renard": {"height": 0.5, "walk": 0.9, "trot": 2.6, "gallop": 6.0},
}
const LEGS := ["avg", "avd", "arg", "ard"]   # avant gauche, avant droite, arrière gauche, arrière droite

static var _cache := {}

var kind := "cheval"
var skeleton: Skeleton3D
var mesh_i: MeshInstance3D
var speed := 0.0                # la vitesse (m/s) : elle choisit l'allure
var turn := 0.0                 # le virage en cours, pour pencher dans la courbe
var phase := 0.0
var _t := 0.0
var _gait := 0.0                # 0 : arrêt, 1 : pas, 2 : trot, 3 : galop (fondu)
var dims := {}
var _ids := {}


func _init(k := "cheval") -> void:
	kind = k
	name = k.capitalize()


func _ready() -> void:
	if not _cache.has(kind):
		_cache[kind] = _build(kind)
	var c: Dictionary = _cache[kind]
	dims = c.dims
	skeleton = Skeleton3D.new()
	skeleton.name = "Os"
	add_child(skeleton)
	for b in c.bones:
		var i := skeleton.add_bone(b.name)
		_ids[b.name] = i
	for b in c.bones:
		if b.parent != "":
			skeleton.set_bone_parent(_ids[b.name], _ids[b.parent])
		skeleton.set_bone_rest(_ids[b.name], Transform3D(Basis(), b.local))
	skeleton.reset_bone_poses()
	mesh_i = MeshInstance3D.new()
	mesh_i.name = "Corps"
	mesh_i.mesh = c.mesh
	mesh_i.skin = c.skin
	skeleton.add_child(mesh_i)
	mesh_i.skeleton = NodePath("..")
	mesh_i.layers = 2


# ---------- Le squelette, posé d'après la forme ----------

static func _build(k: String) -> Dictionary:
	var sc: PackedScene = load("res://assets/modeles/%s.glb" % k)
	var inst := sc.instantiate()
	var src: MeshInstance3D = inst.find_children("*", "MeshInstance3D", true, false)[0]
	var arrays: Array = src.mesh.surface_get_arrays(0)
	var mat: Material = src.get_active_material(0)
	inst.free()
	var v: PackedVector3Array = arrays[Mesh.ARRAY_VERTEX]
	var nrm: PackedVector3Array = arrays[Mesh.ARRAY_NORMAL]
	var n := v.size()
	# la tête : là où monte le haut du corps
	var lo := Vector3(1e9, 1e9, 1e9)
	var hi := Vector3(-1e9, -1e9, -1e9)
	for p in v:
		lo = lo.min(p)
		hi = hi.max(p)
	var top_z := 0.0
	var top_n := 0
	for p in v:
		if p.y > hi.y - (hi.y - lo.y) * 0.1:
			top_z += p.z
			top_n += 1
	var flip := top_z / maxf(1, top_n) < (lo.z + hi.z) / 2.0
	var s: float = SPECIES[k].height / (hi.y - lo.y)
	var basis := Basis(Vector3.UP, PI if flip else 0.0)
	var center := Vector3((lo.x + hi.x) / 2.0, lo.y, (lo.z + hi.z) / 2.0)
	for i in n:
		v[i] = basis * ((v[i] - center) * s)
		nrm[i] = basis * nrm[i]
	var tan = arrays[Mesh.ARRAY_TANGENT]
	if tan is PackedFloat32Array and tan.size() == n * 4 and flip:
		for i in n:
			var tv: Vector3 = basis * Vector3(tan[i * 4], tan[i * 4 + 1], tan[i * 4 + 2])
			tan[i * 4] = tv.x
			tan[i * 4 + 1] = tv.y
			tan[i * 4 + 2] = tv.z
		arrays[Mesh.ARRAY_TANGENT] = tan
	lo = Vector3(1e9, 1e9, 1e9)
	hi = Vector3(-1e9, -1e9, -1e9)
	for p in v:
		lo = lo.min(p)
		hi = hi.max(p)
	var H := hi.y
	var L := hi.z - lo.z
	var zb := lo.z
	# le ventre : la hauteur où le dessous du corps se referme entre les jambes
	var YB := 48
	var ZB := 40
	var grid := PackedInt32Array()
	grid.resize(YB * ZB)
	for p in v:
		var yi := clampi(int(p.y / H * YB), 0, YB - 1)
		var zi := clampi(int((p.z - zb) / L * ZB), 0, ZB - 1)
		grid[yi * ZB + zi] += 1
	# (en montant, la première tranche où le corps fait une seule longue bande d'avant en arrière)
	var belly := H * 0.38
	for yi in range(int(YB * 0.12), int(YB * 0.75)):
		# une bande continue, où l'on tolère un trou de deux cases (le maillage est clairsemé)
		var run := 0
		var gap := 0
		var best := 0
		for zi in ZB:
			if grid[yi * ZB + zi] > 0:
				run += 1 + gap
				gap = 0
				best = maxi(best, run)
			elif run > 0 and gap < 2:
				gap += 1
			else:
				run = 0
				gap = 0
		if best > ZB * 0.42:
			belly = float(yi) / YB * H
			break
	# le dessus du dos, au milieu du corps
	var back := belly
	for p in v:
		if p.z > zb + L * 0.35 and p.z < zb + L * 0.6:
			back = maxf(back, p.y)
	# la tête et le bout du nez
	var head := Vector3.ZERO
	var hn := 0
	var snout := Vector3(0, 0, -1e9)
	for p in v:
		if p.y > back + (H - back) * 0.3 and p.z > zb + L * 0.6:
			head += p
			hn += 1
		if p.y > belly and p.z > snout.z:
			snout = p
	head = head / maxf(1, hn) if hn > 0 else Vector3(0, H * 0.85, zb + L * 0.9)
	# les jambes : sous le ventre, quatre quarts
	var zmid := zb + L * 0.5
	var leg := {}
	for id in LEGS:
		leg[id] = {"top": Vector3.ZERO, "tn": 0, "bot": Vector3.ZERO, "bn": 0}
	for p in v:
		if p.y >= belly:
			continue
		var id := ("av" if p.z > zmid else "ar") + ("g" if p.x > 0.0 else "d")
		var lg: Dictionary = leg[id]
		if absf(p.x) < H * 0.025:
			continue
		if p.y > belly * 0.75:
			lg.top += p
			lg.tn += 1
		elif p.y < belly * 0.12:
			lg.bot += p
			lg.bn += 1
	for id in LEGS:
		var lg: Dictionary = leg[id]
		var front: bool = id.begins_with("av")
		var fallback := Vector3((0.1 if id.ends_with("g") else -0.1) * H, 0, zb + L * (0.72 if front else 0.22))
		lg.top = lg.top / lg.tn if lg.tn > 0 else fallback + Vector3(0, belly, 0)
		lg.bot = lg.bot / lg.bn if lg.bn > 0 else fallback
	# les points du squelette
	var pelvis := Vector3(0, belly + (back - belly) * 0.45, zb + L * 0.24)
	var chest := Vector3(0, belly + (back - belly) * 0.45, zb + L * 0.68)
	var neck := Vector3(0, back * 0.98, zb + L * 0.8)
	var headb := neck.lerp(head, 0.8)
	var tail0 := Vector3(0, back * 0.96, zb + L * 0.07)
	var tail1 := Vector3(0, lerpf(belly, back, 0.4), zb + L * 0.015)
	var bones := [
		{"name": "bassin", "parent": "", "at": pelvis},
		{"name": "dos", "parent": "bassin", "at": chest},
		{"name": "cou", "parent": "dos", "at": neck},
		{"name": "tete", "parent": "cou", "at": headb},
		{"name": "queue", "parent": "bassin", "at": tail0},
		{"name": "queue2", "parent": "queue", "at": tail0.lerp(tail1, 0.5)},
	]
	var joints := {}
	for id in LEGS:
		var lg: Dictionary = leg[id]
		var front: bool = id.begins_with("av")
		var top: Vector3 = lg.top
		var bot: Vector3 = lg.bot
		var at := func(h: float) -> Vector3:
			var u := clampf(h / belly, 0.0, 1.2)
			var x: Vector3 = bot.lerp(top, u)
			return Vector3(x.x, h, x.z)
		var hip: Vector3 = at.call(belly * 1.25)
		var knee: Vector3 = at.call(belly * (0.52 if front else 0.6))
		var fet: Vector3 = at.call(belly * 0.14)
		joints[id] = [hip, knee, fet]
		bones.append({"name": id + "_haut", "parent": "dos" if front else "bassin", "at": hip})
		bones.append({"name": id + "_genou", "parent": id + "_haut", "at": knee})
		bones.append({"name": id + "_pied", "parent": id + "_genou", "at": fet})
	var index := {}
	for i in bones.size():
		index[bones[i].name] = i
	for b in bones:
		b.local = b.at - (bones[index[b.parent]].at if b.parent != "" else Vector3.ZERO)
	# les poids : chaque sommet suit un os, ou deux en se fondant de l'un à l'autre
	var bw := PackedInt32Array()
	var ww := PackedFloat32Array()
	bw.resize(n * 4)
	ww.resize(n * 4)
	var snout_len := maxf(0.01, (snout - neck).length())
	for i in n:
		var p := v[i]
		var a := 0
		var b := 0
		var t := 0.0
		var tail_low := false
		if p.y < belly * 1.12 and p.z < zmid and p.y > belly * 0.2:
			var axis := 1e9
			var behind := true
			for id2 in ["arg", "ard"]:
				var j2: Array = joints[id2]
				var u2 := clampf((p.y - j2[2].y) / maxf(0.01, j2[0].y - j2[2].y), 0.0, 1.0)
				var c2: Vector3 = j2[2].lerp(j2[0], u2)
				axis = minf(axis, Vector2(p.x - c2.x, p.z - c2.z).length())
				behind = behind and p.z < c2.z - H * 0.01
			tail_low = behind and axis > H * 0.06
		if p.y < belly * 1.12 and not tail_low:
			var id := ("av" if p.z > zmid else "ar") + ("g" if p.x > 0.0 else "d")
			var j: Array = joints[id]
			var hk: float = j[1].y
			var hf: float = j[2].y
			if p.y > belly * 0.9:
				a = index[id + "_haut"]
				b = index["dos" if id.begins_with("av") else "bassin"]
				t = clampf((p.y - belly * 0.9) / (belly * 0.22), 0.0, 1.0)
			elif p.y > hk + belly * 0.05:
				a = index[id + "_haut"]
			elif p.y > hk - belly * 0.05:
				a = index[id + "_genou"]
				b = index[id + "_haut"]
				t = clampf((p.y - (hk - belly * 0.05)) / (belly * 0.1), 0.0, 1.0)
			elif p.y > hf + belly * 0.04:
				a = index[id + "_genou"]
			elif p.y > hf - belly * 0.04:
				a = index[id + "_pied"]
				b = index[id + "_genou"]
				t = clampf((p.y - (hf - belly * 0.04)) / (belly * 0.08), 0.0, 1.0)
			else:
				a = index[id + "_pied"]
		elif p.z > neck.z - L * 0.04 and p.y > belly + (back - belly) * 0.5:
			var u := (p - neck).dot((snout - neck).normalized()) / snout_len
			if u < 0.08:
				a = index["cou"]
				b = index["dos"]
				t = clampf((0.08 - u) / 0.12, 0.0, 1.0)
			elif u < 0.55:
				a = index["cou"]
			elif u < 0.65:
				a = index["tete"]
				b = index["cou"]
				t = clampf((0.65 - u) / 0.1, 0.0, 1.0)
			else:
				a = index["tete"]
		elif tail_low or p.z < tail0.z - L * 0.01:
			var d := (tail0 - p).length() / maxf(0.01, (tail0 - tail1).length())
			a = index["queue2"] if d > 0.5 else index["queue"]
			b = index["bassin"]
			t = clampf(1.0 - d * 3.0, 0.0, 1.0)
		else:
			var w := clampf((p.z - pelvis.z) / (chest.z - pelvis.z), 0.0, 1.0)
			a = index["dos"]
			b = index["bassin"]
			t = 1.0 - w
		bw[i * 4] = a
		bw[i * 4 + 1] = b
		ww[i * 4] = 1.0 - t
		ww[i * 4 + 1] = t
	arrays[Mesh.ARRAY_VERTEX] = v
	arrays[Mesh.ARRAY_NORMAL] = nrm
	arrays[Mesh.ARRAY_BONES] = bw
	arrays[Mesh.ARRAY_WEIGHTS] = ww
	var mesh := ArrayMesh.new()
	mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)
	if mat:
		mat = mat.duplicate()
		if mat is BaseMaterial3D:
			(mat as BaseMaterial3D).cull_mode = BaseMaterial3D.CULL_BACK
		mesh.surface_set_material(0, mat)
	var skin := Skin.new()
	for i in bones.size():
		skin.add_named_bind(bones[i].name, Transform3D(Basis(), -bones[i].at))
	return {"mesh": mesh, "skin": skin, "bones": bones, "dims": {"height": H, "length": L, "belly": belly, "back": back,
		"saddle": Vector3(0, back, zb + L * 0.52), "front": hi.z, "rear": lo.z}}


# ---------- La démarche ----------

## Une image : l'allure suit la vitesse, les jambes la cadence.
func step(dt: float) -> void:
	if skeleton == null:
		return
	_t += dt
	var sp: Dictionary = SPECIES[kind]
	var target := 0.0
	if speed > 0.15:
		target = 1.0 if speed < (sp.walk + sp.trot) / 2.0 else (2.0 if speed < (sp.trot + sp.gallop) / 2.0 else 3.0)
	_gait = move_toward(_gait, target, dt * 2.5)
	var g := _gait
	# la cadence : un pas tranquille, un trot vif, un galop qui tonne
	var freq := 0.0
	if g > 0.0:
		freq = lerpf(0.9, 1.45, clampf(g - 1.0, 0.0, 1.0)) if g < 2.0 else lerpf(1.45, 2.15, clampf(g - 2.0, 0.0, 1.0))
		freq *= clampf(speed / [1.0, sp.walk, sp.trot, sp.gallop][int(round(g))], 0.6, 1.4)
	phase = fmod(phase + dt * freq, 1.0)
	var amp := lerpf(0.0, 0.3, clampf(g, 0.0, 1.0)) + clampf(g - 1.0, 0.0, 1.0) * 0.12 + clampf(g - 2.0, 0.0, 1.0) * 0.22
	# le décalage de chaque jambe : pas (4 temps), trot (diagonales), galop (transverse)
	var walk := {"arg": 0.0, "avg": 0.25, "ard": 0.5, "avd": 0.75}
	var trot := {"avg": 0.0, "ard": 0.0, "avd": 0.5, "arg": 0.5}
	var gallop := {"arg": 0.0, "ard": 0.12, "avg": 0.45, "avd": 0.57}
	for id: String in LEGS:
		var off: float = walk[id]
		if g > 1.0:
			off = lerpf(walk[id], trot[id], clampf(g - 1.0, 0.0, 1.0))
		if g > 2.0:
			off = lerpf(trot[id], gallop[id], clampf(g - 2.0, 0.0, 1.0))
		var ph := fmod(phase + off, 1.0)
		var stance := 0.6 if g < 2.5 else 0.42
		var swing := 0.0
		var flex := 0.0
		if ph < stance:
			swing = lerpf(-amp, amp, ph / stance)
		else:
			var u := (ph - stance) / (1.0 - stance)
			swing = lerpf(amp, -amp, u * u * (3.0 - 2.0 * u))
			flex = sin(u * PI) * (0.6 + amp)
		var front: bool = id.begins_with("av")
		_rot(id + "_haut", Vector3(swing, 0, 0))
		_rot(id + "_genou", Vector3(flex * (1.0 if front else -0.7), 0, 0))
		_rot(id + "_pied", Vector3(flex * (0.8 if front else 1.1), 0, 0))
	# le corps qui roule, la tête qui balance, la queue
	var bob := sin(phase * TAU * (2.0 if g < 2.5 else 1.0))
	var pitch := bob * (0.015 + clampf(g - 2.0, 0.0, 1.0) * 0.06)
	_rot("bassin", Vector3(pitch, 0, -turn * 0.12))
	skeleton.set_bone_pose_position(_ids["bassin"], skeleton.get_bone_rest(_ids["bassin"]).origin + Vector3(0, absf(bob) * 0.03 * clampf(g, 0.0, 3.0), 0))
	_rot("dos", Vector3(-pitch * 0.5, 0, 0))
	var breath := sin(_t * 1.3) * 0.02
	_rot("cou", Vector3(-pitch * 1.6 + breath + (0.12 if g > 2.5 else 0.0), turn * 0.25, 0))
	_rot("tete", Vector3(bob * 0.03 * g - breath, turn * 0.15 + (sin(_t * 0.31) * 0.25 if g < 0.2 else 0.0), 0))
	_rot("queue", Vector3(-0.15 - clampf(g - 2.0, 0.0, 1.0) * 0.5, sin(_t * 1.7) * 0.18, 0))
	_rot("queue2", Vector3(-0.1, sin(_t * 1.7 - 0.6) * 0.25, 0))


func _rot(bone: String, e: Vector3) -> void:
	skeleton.set_bone_pose_rotation(_ids[bone], Quaternion.from_euler(e))


## La selle : où s'assoit le cavalier, dans le repère du quadrupède.
func saddle() -> Vector3:
	return dims.get("saddle", Vector3(0, 1.5, 0))
