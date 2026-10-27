## Le chantier : on y empile les pièces d'un bâtiment (poteaux, poutres,
## panneaux, tuiles rondes, faîtages) rangées par matière, puis tout est fondu
## en un seul maillage. Mille détails pour une poignée d'appels de dessin.
## Les coordonnées sont celles du bâtiment ; xf les place dans son groupe.
class_name Chantier
extends RefCounted

const RIB := 0.27            # l'écart entre deux rangs de tuiles rondes
const TILE_W := 3.24         # la largeur couverte par la texture des tuiles (douze rangs)
const RIB0 := 0.171          # où tombe le sommet d'un rang dans la texture

var xf := Transform3D.IDENTITY
var grain: Array = []        # les bois dont le fil suit les poutres couchées
var detail := false          # les petites pièces, qui s'effacent avec la distance
const DETAIL_RANGE := 70.0
var _parts := {}             # Material → [sommets, normales, uv, indices]
var _details := {}

# le toit en cours : sa forme (voir roof)
var _o := Vector3.ZERO
var _A := 0.0
var _B := 0.0
var _a0 := 0.0
var _th := 1.0
var _rise := 0.0
var _up := 0.0
var _bend := 1.35

const _UV4 := [Vector2(0, 0), Vector2(1, 0), Vector2(1, 1), Vector2(0, 1)]
const _N := [Vector3(0, 0, 1), Vector3(0, 0, -1), Vector3(1, 0, 0), Vector3(-1, 0, 0), Vector3(0, 1, 0), Vector3(0, -1, 0)]
const _U := [Vector3(1, 0, 0), Vector3(-1, 0, 0), Vector3(0, 0, -1), Vector3(0, 0, 1), Vector3(1, 0, 0), Vector3(1, 0, 0)]
const _V := [Vector3(0, -1, 0), Vector3(0, -1, 0), Vector3(0, -1, 0), Vector3(0, -1, 0), Vector3(0, 0, 1), Vector3(0, 0, -1)]


func _bucket(mat: Material) -> Array:
	var parts := _details if detail else _parts
	if not parts.has(mat):
		parts[mat] = [PackedVector3Array(), PackedVector3Array(), PackedVector2Array(), PackedInt32Array()]
	return parts[mat]


# ---------- Les pièces élémentaires ----------

## Un quadrilatère a b c d (dans l'ordre du pourtour), tourné vers n.
func quad(mat: Material, a: Vector3, b: Vector3, c: Vector3, d: Vector3, n: Vector3, uv: Array = [], ns: Array = []) -> void:
	var bk := _bucket(mat)
	var base: int = bk[0].size()
	var pts := [a, b, c, d]
	var bs := xf.basis
	for i in 4:
		bk[0].append(xf * pts[i])
		bk[1].append((bs * (ns[i] if ns.size() == 4 else n)).normalized())
		bk[2].append(uv[i] if uv.size() == 4 else _UV4[i])
	# Godot voit de face les triangles tournés dans le sens des aiguilles d'une montre
	if (b - a).cross(c - a).dot(n) > 0.0:
		bk[3].append_array([base, base + 2, base + 1, base, base + 3, base + 2])
	else:
		bk[3].append_array([base, base + 1, base + 2, base, base + 2, base + 3])


func tri(mat: Material, a: Vector3, b: Vector3, c: Vector3, n: Vector3, uv: Array = []) -> void:
	var bk := _bucket(mat)
	var base: int = bk[0].size()
	var wn := (xf.basis * n).normalized()
	var pts := [a, b, c]
	for i in 3:
		bk[0].append(xf * pts[i])
		bk[1].append(wn)
		bk[2].append(uv[i] if uv.size() == 3 else Vector2(pts[i].x + pts[i].z, -pts[i].y))
	if (b - a).cross(c - a).dot(n) > 0.0:
		bk[3].append_array([base, base + 2, base + 1])
	else:
		bk[3].append_array([base, base + 1, base + 2])


## Une boîte : centre, taille, rotation. Les uv sont en mètres, l'image debout.
func box(mat: Material, pos: Vector3, size: Vector3, rot := Vector3.ZERO) -> void:
	boxb(mat, pos, size, Basis.from_euler(rot), mat in grain and maxf(size.x, size.z) > size.y)


func boxb(mat: Material, pos: Vector3, size: Vector3, bs: Basis, grain := false) -> void:
	var h := size / 2.0
	var off := Vector2(pos.x * 0.37 + pos.z * 0.61, pos.y * 0.29)
	for f in 6:
		var n: Vector3 = _N[f]
		var u: Vector3 = _U[f]
		var v: Vector3 = _V[f]
		var hn := absf(h.dot(n))
		var hu := absf(h.dot(u))
		var hv := absf(h.dot(v))
		var c := n * hn
		var p := []
		var uv := []
		for st in [Vector2(-1, -1), Vector2(1, -1), Vector2(1, 1), Vector2(-1, 1)]:
			p.append(pos + bs * (c + u * st.x * hu + v * st.y * hv))
			var q := Vector2(st.x * hu, st.y * hv) + off
			uv.append(Vector2(q.y, q.x) if grain and f < 4 else q)
		quad(mat, p[0], p[1], p[2], p[3], bs * n, uv)


## Une poutre d'un point à un autre (section w × h), son « haut » vers up.
func beam(mat: Material, a: Vector3, b: Vector3, w: float, h: float, up := Vector3.UP) -> void:
	var along := b - a
	var len := along.length()
	if len < 0.001:
		return
	var x := along / len
	var z := x.cross(up).normalized()
	if z.length_squared() < 0.5:
		z = x.cross(Vector3.FORWARD).normalized()
	var y := z.cross(x).normalized()
	boxb(mat, (a + b) / 2.0, Vector3(len, h, w), Basis(x, y, z), absf(x.y) < 0.7)


## Un cylindre (ou un cône) debout, tourné par rot.
func cyl(mat: Material, pos: Vector3, r_top: float, r_bot: float, h: float, rot := Vector3.ZERO, segs := 8, caps := true) -> void:
	var bs := Basis.from_euler(rot)
	var slope := (r_bot - r_top) / maxf(h, 0.001)
	for i in segs:
		var a0 := float(i) / segs * TAU
		var a1 := float(i + 1) / segs * TAU
		var d0 := Vector3(cos(a0), 0, sin(a0))
		var d1 := Vector3(cos(a1), 0, sin(a1))
		var n0 := (d0 + Vector3(0, slope, 0)).normalized()
		var n1 := (d1 + Vector3(0, slope, 0)).normalized()
		var p := [d0 * r_bot - Vector3(0, h / 2, 0), d1 * r_bot - Vector3(0, h / 2, 0), d1 * r_top + Vector3(0, h / 2, 0), d0 * r_top + Vector3(0, h / 2, 0)]
		var arc := r_bot * TAU / segs
		var uv := [Vector2(i * arc, h), Vector2((i + 1) * arc, h), Vector2((i + 1) * arc, 0), Vector2(i * arc, 0)]
		quad(mat, pos + bs * p[0], pos + bs * p[1], pos + bs * p[2], pos + bs * p[3], bs * ((n0 + n1) / 2.0), uv, [bs * n0, bs * n1, bs * n1, bs * n0])
		if caps:
			if r_top > 0.0:
				tri(mat, pos + bs * Vector3(0, h / 2, 0), pos + bs * p[3], pos + bs * p[2], bs * Vector3.UP)
			tri(mat, pos + bs * Vector3(0, -h / 2, 0), pos + bs * p[0], pos + bs * p[1], bs * Vector3.DOWN)


## Un panneau plat (sans épaisseur) vu des deux côtés si both.
func panel(mat: Material, pos: Vector3, size: Vector2, rot := Vector3.ZERO, both := false) -> void:
	var bs := Basis.from_euler(rot)
	var h := size / 2.0
	var p := [pos + bs * Vector3(-h.x, -h.y, 0), pos + bs * Vector3(h.x, -h.y, 0), pos + bs * Vector3(h.x, h.y, 0), pos + bs * Vector3(-h.x, h.y, 0)]
	var uv := [Vector2(0, 1), Vector2(1, 1), Vector2(1, 0), Vector2(0, 0)]
	quad(mat, p[0], p[1], p[2], p[3], bs * Vector3.BACK, uv)
	if both:
		quad(mat, p[1], p[0], p[3], p[2], bs * Vector3.FORWARD, [uv[1], uv[0], uv[3], uv[2]])


## Une nappe de points (rows × cols) tissée en triangles, tournée vers face ;
## ses normales calculées, ou données (nrm).
func sheet(mat: Material, pts: PackedVector3Array, uvs: PackedVector2Array, cols: int, face: Vector3, nrm := PackedVector3Array()) -> void:
	var rows := pts.size() / cols
	var bk := _bucket(mat)
	var base: int = bk[0].size()
	var bs := xf.basis
	for r in rows:
		for c in cols:
			var i := r * cols + c
			var n: Vector3
			if nrm.size() == pts.size():
				n = nrm[i]
			else:
				var du := pts[r * cols + mini(c + 1, cols - 1)] - pts[r * cols + maxi(c - 1, 0)]
				var dv := pts[mini(r + 1, rows - 1) * cols + c] - pts[maxi(r - 1, 0) * cols + c]
				n = du.cross(dv).normalized()
				if n.dot(face) < 0.0:
					n = -n
			bk[0].append(xf * pts[i])
			bk[1].append((bs * n).normalized())
			bk[2].append(uvs[i])
	var flip := (pts[1] - pts[0]).cross(pts[cols] - pts[0]).dot(face) > 0.0
	for r in rows - 1:
		for c in cols - 1:
			var i := base + r * cols + c
			if flip:
				bk[3].append_array([i, i + cols, i + 1, i + 1, i + cols, i + cols + 1])
			else:
				bk[3].append_array([i, i + 1, i + cols, i + 1, i + cols + 1, i + cols])


# ---------- Le toit ----------

func _ra(t: float) -> float:
	return _a0 if t <= _th else lerpf(_a0, _A, (t - _th) / (1.0 - _th))


func _ry(t: float, e: float) -> float:
	return _o.y + _rise * pow(1.0 - t, _bend) + _up * t * t * pow(clampf(e, 0.0, 1.0), 4.0)


## Les rangées du toit, du faîte à l'égout, avec une rangée juste au pli de l'irimoya.
func _ts(n: int) -> PackedFloat32Array:
	var out := PackedFloat32Array()
	if _th < 1.0 and _th > 0.01:
		var k := maxi(2, roundi(n * _th))
		for i in k:
			out.append(_th * i / k)
		var k2 := maxi(3, n - k)
		for i in k2 + 1:
			out.append(lerpf(_th, 1.0, float(i) / k2))
	else:
		for i in n + 1:
			out.append(float(i) / n)
	return out


## Un point du pan avant (s : -1 à 1 le long du faîte, t : 0 au faîte, 1 à l'égout).
func _front(s: float, t: float, sz: float) -> Vector3:
	var a := _ra(t)
	return Vector3(_o.x + s * a, _ry(t, absf(s)), _o.z + sz * t * _B)


## Un point d'un pan de croupe (s : -1 à 1 en travers, t : de _th à 1).
func _side(s: float, t: float, sx: float) -> Vector3:
	return Vector3(_o.x + sx * _ra(t), _ry(t, absf(s)), _o.z + s * t * _B)


## Un toit de tuiles japonais au-dessus d'un rectangle. o : le centre, à la
## hauteur de l'égout ; le faîte court le long de x, rise plus haut ; A : la
## demi-longueur à l'égout, B : la demi-profondeur. Options : hip (1 pour un
## pignon kirizuma, 0.3 à 0.5 pour un irimoya), up (les coins qui se relèvent),
## bend (la courbe des pans), thick, et les matières tiles, ribs, under, edge, gable.
func roof(o: Vector3, A: float, B: float, rise: float, m: Dictionary, opts := {}) -> void:
	_o = o
	_A = A
	_B = B
	_rise = rise
	_th = opts.get("hip", 1.0)
	_up = opts.get("up", 0.1)
	_bend = opts.get("bend", 1.35)
	_a0 = A if _th >= 1.0 else maxf(0.6, A - B * (1.0 - _th))
	var thick: float = opts.get("thick", 0.16)
	var tiles: Material = m.tiles
	var under: Material = m.get("under", m.edge)
	var edge: Material = m.edge
	var ribs: Material = m.get("ribs", null)
	var ns := maxi(4, int(A / 0.5)) * 2
	var tt := _ts(12)
	var sides: Array = opts.get("sides", [1.0, -1.0])
	# les deux grands pans, avant et arrière (un seul pour un auvent)
	for sz in sides:
		var top := PackedVector3Array()
		var bot := PackedVector3Array()
		var uv := PackedVector2Array()
		for t in tt:
			for i in ns + 1:
				var s := -1.0 + 2.0 * i / ns
				var p := _front(s, t, sz)
				top.append(p)
				bot.append(p - Vector3(0, thick, 0))
				uv.append(Vector2((p.x - _o.x) / TILE_W, t * _B * 1.12 / TILE_W))
		var face := Vector3(0, 1, sz * 0.5)
		sheet(tiles, top, uv, ns + 1, face)
		sheet(under, bot, uv, ns + 1, -face)
		# la rive d'égout
		for i in ns:
			var a := top[(tt.size() - 1) * (ns + 1) + i]
			var b := top[(tt.size() - 1) * (ns + 1) + i + 1]
			quad(edge, a, b, b - Vector3(0, thick, 0), a - Vector3(0, thick, 0), Vector3(0, 0, sz))
	# les croupes de l'irimoya, et le pignon triangulaire au-dessus
	if _th < 1.0:
		var ts2 := PackedFloat32Array()
		for i in 6:
			ts2.append(lerpf(_th, 1.0, float(i) / 5.0))
		for sx: float in [1.0, -1.0]:
			var top := PackedVector3Array()
			var bot := PackedVector3Array()
			var uv := PackedVector2Array()
			var nz := maxi(4, int(B / 0.5)) * 2
			for t in ts2:
				for i in nz + 1:
					var s := -1.0 + 2.0 * i / nz
					var p := _side(s, t, sx)
					top.append(p)
					bot.append(p - Vector3(0, thick, 0))
					uv.append(Vector2((p.z - _o.z) / TILE_W, (_ra(t) - _a0) * 1.12 / TILE_W))
			var face := Vector3(sx * 0.5, 1, 0)
			sheet(tiles, top, uv, nz + 1, face)
			sheet(under, bot, uv, nz + 1, -face)
			for i in nz:
				var a := top[(ts2.size() - 1) * (nz + 1) + i]
				var b := top[(ts2.size() - 1) * (nz + 1) + i + 1]
				quad(edge, a, b, b - Vector3(0, thick, 0), a - Vector3(0, thick, 0), Vector3(sx, 0, 0))
			# le pignon : un triangle de plâtre en retrait, ses planches de rive
			if _th <= 0.01:
				continue
			var gx := _o.x + sx * (_a0 - 0.12)
			var foot := Vector3(gx, _ry(_th, 1.0) - thick, _o.z)
			var prev := Vector3.ZERO
			var k := 6
			for j in k * 2 + 1:
				var t := _th * absf(float(j - k) / k)
				var sz := -1.0 if j < k else 1.0
				var p := Vector3(gx, _ry(t, 1.0) - thick, _o.z + sz * t * _B)
				if j > 0:
					tri(m.get("gable", edge), foot, prev, p, Vector3(sx, 0, 0))
				prev = p
			for sz: float in [1.0, -1.0]:
				for j in k:
					var t0 := _th * float(j) / k
					var t1 := _th * float(j + 1) / k
					var p0 := Vector3(_o.x + sx * (_a0 - 0.06), _ry(t0, 1.0) - thick * 0.4, _o.z + sz * t0 * _B)
					var p1 := Vector3(_o.x + sx * (_a0 - 0.06), _ry(t1, 1.0) - thick * 0.4, _o.z + sz * t1 * _B)
					beam(edge, p0, p1, 0.07, 0.3)
		# les arêtiers, du pli jusqu'aux coins relevés
		for sx: float in [1.0, -1.0]:
			for sz: float in [1.0, -1.0]:
				var prev := Vector3.ZERO
				for i in 7:
					var t := lerpf(_th, 1.0, float(i) / 6.0)
					var p := Vector3(_o.x + sx * _ra(t), _ry(t, 1.0) + 0.08, _o.z + sz * t * _B)
					if i > 0:
						beam(ribs if ribs else tiles, prev, p, 0.2, 0.18)
					prev = p
				cyl(ribs if ribs else tiles, prev + Vector3(0, 0.1, 0), 0.1, 0.12, 0.26, Vector3.ZERO, 6)
	elif opts.get("hafu", true):
		# le pignon kirizuma : les planches de rive (hafu) le long des deux pans
		for sx: float in [1.0, -1.0]:
			for sz in sides:
				for j in tt.size() - 1:
					var p0 := _front(sx, tt[j], sz) + Vector3(sx * 0.03, -thick * 0.3, 0)
					var p1 := _front(sx, tt[j + 1], sz) + Vector3(sx * 0.03, -thick * 0.3, 0)
					beam(edge, p0, p1, 0.07, thick + 0.16, Vector3.UP)
	# les tuiles rondes, en relief sur les pans
	if ribs:
		var was := detail
		detail = true
		_ribs(ribs, thick, sides)
		detail = was
	# le faîte : des tuiles plates empilées, la couronne, les oni-gawara
	if opts.get("ridge", true):
		var y := _o.y + _rise
		var L := _a0 * 2.0 + 0.24
		var mat: Material = ribs if ribs else tiles
		for i in 3:
			box(mat, Vector3(_o.x, y + 0.03 + i * 0.075, _o.z), Vector3(L - i * 0.04, 0.075, 0.44 - i * 0.07))
		cyl(mat, Vector3(_o.x, y + 0.27, _o.z), 0.1, 0.1, L, Vector3(0, 0, PI / 2), 8, false)
		for sx: float in ([-1.0, 1.0] if opts.get("ends", true) else []):
			var ex := _o.x + sx * (_a0 + 0.12)
			box(mat, Vector3(ex, y + 0.28, _o.z), Vector3(0.14, 0.56, 0.5))
			cyl(mat, Vector3(ex, y + 0.56, _o.z), 0.25, 0.25, 0.14, Vector3(0, 0, PI / 2), 10)
			if opts.get("shachi", false):
				# deux poissons-tigres dorés dressés au bout du faîte
				cyl(m.get("gold", mat), Vector3(ex - sx * 0.05, y + 0.95, _o.z), 0.06, 0.16, 0.7, Vector3(0, 0, sx * 0.3), 6)
				cyl(m.get("gold", mat), Vector3(ex - sx * 0.22, y + 1.3, _o.z), 0.12, 0.03, 0.4, Vector3(0, 0, -sx * 0.9), 6)


## Les rangs de tuiles rondes (marugawara), alignés sur ceux de la texture,
## et leur tuile de bout ronde à l'égout.
func _ribs(mat: Material, thick: float, sides: Array) -> void:
	var r := 0.058
	var k0 := ceili((-_A + 0.12 - RIB0) / RIB)
	var k1 := floori((_A - 0.12 - RIB0) / RIB)
	for sz in sides:
		for k in range(k0, k1 + 1):
			var x := RIB0 + k * RIB
			var ax := absf(x)
			var t0 := 0.03
			if ax > _a0:
				t0 = _th + (ax - _a0) / maxf(0.001, _A - _a0) * (1.0 - _th) + 0.02
			if t0 >= 0.98:
				continue
			var along := func(t: float) -> Vector3:
				return Vector3(_o.x + x, _ry(t, ax / _ra(t)), _o.z + sz * t * _B)
			_rib(mat, r, t0, along, Vector3(1, 0, 0))
	if _th < 1.0:
		var j0 := ceili((-_B + 0.12 - RIB0) / RIB)
		var j1 := floori((_B - 0.12 - RIB0) / RIB)
		for sx: float in [1.0, -1.0]:
			for j in range(j0, j1 + 1):
				var z := RIB0 + j * RIB
				var az := absf(z)
				var t0 := maxf(_th + 0.02, az / _B + 0.02)
				if t0 >= 0.98:
					continue
				var along := func(t: float) -> Vector3:
					return Vector3(_o.x + sx * _ra(t), _ry(t, az / (t * _B)), _o.z + z)
				_rib(mat, r, t0, along, Vector3(0, 0, 1))


func _rib(mat: Material, r: float, t0: float, at: Callable, across: Vector3) -> void:
	var n := 8
	var pts := PackedVector3Array()
	var uvs := PackedVector2Array()
	var nrm := PackedVector3Array()
	var last := Vector3.ZERO
	var last_dir := Vector3.ZERO
	var last_up := Vector3.ZERO
	for i in n + 1:
		var t := lerpf(t0, 1.0, float(i) / n)
		var p: Vector3 = at.call(t)
		var q: Vector3 = at.call(minf(1.0, t + 0.01)) if t < 1.0 else p
		var b: Vector3 = at.call(t - 0.01) if t >= 1.0 else p
		var dir := (q - b).normalized()
		var up := dir.cross(across).normalized()
		if up.y < 0.0:
			up = -up
		for k in 5:
			var th := PI * k / 4.0
			var out := across * cos(th) + up * sin(th)
			pts.append(p + out * r - up * 0.01)
			nrm.append(out)
			uvs.append(Vector2(k * 0.05, t))
		last = p
		last_dir = dir
		last_up = up
	sheet(mat, pts, uvs, 5, Vector3.UP, nrm)
	# la tuile de bout, un disque face à la rue
	var c := last - last_up * 0.012
	var seg := 8
	for k in seg:
		var a0 := TAU * k / seg
		var a1 := TAU * (k + 1) / seg
		var p0 := c + (across * cos(a0) + last_up * sin(a0)) * r * 1.2
		var p1 := c + (across * cos(a1) + last_up * sin(a1)) * r * 1.2
		tri(mat, c + last_dir * 0.015, p0, p1, last_dir)


## La hauteur sous le toit qu'on vient de poser, à la profondeur z.
func under_y(z: float, thick := 0.16) -> float:
	var t := clampf(absf(z - _o.z) / _B, 0.0, 1.0)
	return _o.y + _rise * pow(1.0 - t, _bend) - thick


## Le pignon : le triangle de mur sous le toit qu'on vient de poser, dans le
## plan x, de z0 à z1, posé sur y0 ; n : de quel côté il regarde.
func gable(mat: Material, x: float, z0: float, z1: float, y0: float, n: Vector3, thick := 0.16) -> void:
	var foot := Vector3(x, y0, (z0 + z1) / 2.0)
	var zs := []
	for i in 13:
		zs.append(lerpf(z0, z1, float(i) / 12.0))
	if _o.z > z0 and _o.z < z1:
		zs.append(_o.z)
		zs.sort()
	var prev := Vector3(x, y0, z0)
	for z in zs:
		var p := Vector3(x, under_y(z, thick), z)
		tri(mat, foot, prev, p, n)
		prev = p
	tri(mat, foot, prev, Vector3(x, y0, z1), n)


# ---------- La fin du chantier ----------

## Fond tout ce qui a été empilé en un maillage, posé dans parent, et les
## petites pièces dans un second qui s'efface au-delà de DETAIL_RANGE.
func build(parent: Node3D, name := "Batisse") -> MeshInstance3D:
	var mi := _mesh(parent, name, _parts, 0.0, true)
	if not _details.is_empty():
		_mesh(parent, name + " (détails)", _details, DETAIL_RANGE, false)
	_parts = {}
	_details = {}
	return mi


func _mesh(parent: Node3D, name: String, parts: Dictionary, range_end: float, shadows: bool) -> MeshInstance3D:
	var mesh := ArrayMesh.new()
	for mat in parts:
		var bk: Array = parts[mat]
		if bk[0].is_empty():
			continue
		var arr := []
		arr.resize(Mesh.ARRAY_MAX)
		arr[Mesh.ARRAY_VERTEX] = bk[0]
		arr[Mesh.ARRAY_NORMAL] = bk[1]
		arr[Mesh.ARRAY_TEX_UV] = bk[2]
		arr[Mesh.ARRAY_INDEX] = bk[3]
		if mat is StandardMaterial3D and mat.normal_enabled:
			var st := SurfaceTool.new()
			st.create_from_arrays(arr)
			st.generate_tangents()
			arr = st.commit_to_arrays()
		mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arr)
		mesh.surface_set_material(mesh.get_surface_count() - 1, mat)
	var mi := MeshInstance3D.new()
	mi.name = name
	mi.mesh = mesh
	if not shadows:
		mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	if range_end > 0.0:
		mi.visibility_range_end = range_end
		mi.visibility_range_end_margin = 8.0
		mi.visibility_range_fade_mode = GeometryInstance3D.VISIBILITY_RANGE_FADE_SELF
	parent.add_child(mi)
	return mi
