## La carte de la vallée : un papier washi, le relief peint à l'encre, les
## lieux découverts et leur état, le samouraï et son regard, des repères à
## poser. Molette pour zoomer, glisser pour déplacer, clic pour un repère.
class_name MapView
extends Control

const INK := Color(0.1, 0.075, 0.065)
const INK_SOFT := Color(0.1, 0.075, 0.065, 0.55)
const VERMILION := Color(0.66, 0.15, 0.1)
const PAPER := Color(0.9, 0.85, 0.74)
const GOLD := Color(0.78, 0.56, 0.16)
## Lieu → icône peinte (assets/kie/carte-icones-*.png)
const ICONS := {"autel": 0, "village": 1, "camp": 2, "croisee": 3, "sanctuaire": 4, "temple": 5, "ville": 6, "marchand": 7, "samourai": 8}
const DESCRIPTIONS := {
	"autel": "Un autel de pierre sous un petit torii. On s'y recueille, et l'on y revient après une mort.",
	"village": "Les maisons éventrées d'un village de forgerons. Des ronins y ont pris leurs quartiers.",
	"camp": "Une palissade de pieux, des tentes et un feu. Le chef des ronins y dort, sa lame à portée de main.",
	"croisee": "Un arbre mort où pendent encore les cordes. Les jizos de pierre veillent sur personne.",
	"sanctuaire": "Des piliers laqués que le lac a mangés. On raconte qu'une lame noire y repose.",
	"temple": "Le grand torii, l'escalier, la salle et sa lune peinte. L'Oni n'en sort jamais.",
}

var main
var serif: Font
var sans: Font
var sheet: Control
var map_rect: ColorRect
var overlay: Control
var legend: VBoxContainer
var mat: ShaderMaterial
var zoom := 1.0
var center := Vector2(0.5, 0.5)
var _drag_from := Vector2.ZERO
var _dragging := false
var _pressed := false
var _hover := ""
var _icons := {}


func _init(m, serif_font: Font, sans_font: Font) -> void:
	main = m
	serif = serif_font
	sans = sans_font
	set_anchors_preset(Control.PRESET_FULL_RECT)
	mouse_filter = Control.MOUSE_FILTER_STOP
	var shade := ColorRect.new()
	shade.color = Color(0.02, 0.012, 0.015, 0.88)
	shade.set_anchors_preset(Control.PRESET_FULL_RECT)
	shade.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(shade)
	for id in ICONS:
		var p := "res://assets/kie/carte-icones-%d.png" % ICONS[id]
		if ResourceLoader.exists(p):
			_icons[id] = load(p)

	# la feuille de washi
	sheet = Control.new()
	sheet.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(sheet)
	var paper := TextureRect.new()
	if ResourceLoader.exists("res://assets/kie/washi.jpg"):
		paper.texture = load("res://assets/kie/washi.jpg")
	paper.stretch_mode = TextureRect.STRETCH_TILE
	paper.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	paper.set_anchors_preset(Control.PRESET_FULL_RECT)
	paper.mouse_filter = Control.MOUSE_FILTER_IGNORE
	sheet.add_child(paper)

	map_rect = ColorRect.new()
	mat = ShaderMaterial.new()
	mat.shader = load("res://scripts/ui/map.gdshader")
	map_rect.material = mat
	map_rect.mouse_filter = Control.MOUSE_FILTER_IGNORE
	sheet.add_child(map_rect)
	overlay = Control.new()
	overlay.mouse_filter = Control.MOUSE_FILTER_IGNORE
	overlay.draw.connect(_draw_overlay)
	overlay.clip_contents = true
	sheet.add_child(overlay)

	legend = VBoxContainer.new()
	legend.add_theme_constant_override("separation", 10)
	legend.mouse_filter = Control.MOUSE_FILTER_IGNORE
	sheet.add_child(legend)
	visible = false


func _label(text: String, size: int, color: Color, font: Font, spacing := 0) -> Label:
	var l := Label.new()
	l.text = text
	var f := FontVariation.new()
	f.base_font = font
	f.spacing_glyph = spacing
	l.add_theme_font_override("font", f)
	l.add_theme_font_size_override("font_size", size)
	l.add_theme_color_override("font_color", color)
	l.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	l.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	l.custom_minimum_size = Vector2(120, 0)
	l.mouse_filter = Control.MOUSE_FILTER_IGNORE
	return l


# ---------- Ouverture et mise en page ----------

func open() -> void:
	var t: Terrain = main.terrain
	mat.set_shader_parameter("heightmap", t.height_texture)
	mat.set_shader_parameter("mask", t.mask_texture)
	mat.set_shader_parameter("fog", main.fog_texture)
	if ResourceLoader.exists("res://assets/kie/washi.jpg"):
		mat.set_shader_parameter("paper", load("res://assets/kie/washi.jpg"))
	mat.set_shader_parameter("res", float(Terrain.RES))
	mat.set_shader_parameter("world_size", Terrain.SIZE)
	mat.set_shader_parameter("water_level", Terrain.WATER_LEVEL)
	zoom = 1.6
	center = _world_to_uv(main.player.global_position)
	_layout()
	_fill_legend()
	visible = true
	_apply_view()


func _layout() -> void:
	# une feuille centrée : la carte carrée à gauche, la légende à droite
	var vp := get_viewport_rect().size
	var legend_w := clampf(vp.x * 0.24, 300.0, 420.0)
	var side := minf(vp.y - 72.0 - 124.0, vp.x - 96.0 - legend_w - 120.0)
	var sheet_size := Vector2(side + legend_w + 120.0, side + 124.0)
	sheet.position = ((vp - sheet_size) / 2.0).floor()
	sheet.size = sheet_size
	map_rect.position = Vector2(40, 84)
	map_rect.size = Vector2(side, side)
	overlay.position = map_rect.position
	overlay.size = map_rect.size
	legend.position = Vector2(map_rect.position.x + side + 40, 84)
	legend.size = Vector2(legend_w, side)
	legend.custom_minimum_size = Vector2(legend_w, 0)
	for c in sheet.get_children():
		if c.name == "Titre":
			c.queue_free()
	var title := _label("VALLÉE DE KUROGANE", 30, INK, serif, 10)
	title.name = "Titre"
	title.position = Vector2(40, 26)
	title.size = Vector2(side, 40)
	sheet.add_child(title)


func _apply_view() -> void:
	zoom = clampf(zoom, 1.0, 5.0)
	var half := 0.5 / zoom
	center = center.clamp(Vector2(half, half) - Vector2(0.15, 0.15), Vector2(1, 1) - Vector2(half, half) + Vector2(0.15, 0.15))
	mat.set_shader_parameter("zoom", zoom)
	mat.set_shader_parameter("center", center)
	overlay.queue_redraw()


# ---------- Coordonnées ----------

func _world_to_uv(p: Vector3) -> Vector2:
	return Vector2((p.x + Terrain.SIZE / 2) / Terrain.SIZE, (p.z + Terrain.SIZE / 2) / Terrain.SIZE)


func _uv_to_screen(uv: Vector2) -> Vector2:
	return ((uv - center) * zoom + Vector2(0.5, 0.5)) * overlay.size


func _w2s(p: Vector3) -> Vector2:
	return _uv_to_screen(_world_to_uv(p))


func _screen_to_world(s: Vector2) -> Vector3:
	var uv := center + (s / overlay.size - Vector2(0.5, 0.5)) / zoom
	return Vector3(uv.x * Terrain.SIZE - Terrain.SIZE / 2, 0, uv.y * Terrain.SIZE - Terrain.SIZE / 2)


func _explored(p: Vector3) -> bool:
	var img: Image = main.fog_image
	var uv := _world_to_uv(p)
	var x := clampi(int(uv.x * img.get_width()), 0, img.get_width() - 1)
	var y := clampi(int(uv.y * img.get_height()), 0, img.get_height() - 1)
	return img.get_pixel(x, y).r > 0.5


# ---------- La légende ----------

func _place_status(id: String) -> Array:
	var foes := 0
	for e in main.enemies:
		if e.alive and e.place == id:
			foes += 1
	var chests := 0
	var opened := 0
	for c in main.landmarks.chests:
		if c.place == id:
			chests += 1
			if c.open:
				opened += 1
	return [foes, chests, opened]


func _status_text(id: String) -> String:
	var s := _place_status(id)
	var parts := []
	if s[0] > 0:
		parts.append("%d ennemi%s" % [s[0], "s" if s[0] > 1 else ""])
	elif id != "autel":
		parts.append("purifié")
	if s[1] > 0:
		parts.append("coffres %d / %d" % [s[2], s[1]])
	if id == "autel":
		parts.append("on s'y relève")
	return " · ".join(parts)


func _fill_legend() -> void:
	for c in legend.get_children():
		c.queue_free()
	var seal := HBoxContainer.new()
	seal.add_theme_constant_override("separation", 12)
	var stamp := Label.new()
	stamp.text = "灰"
	stamp.add_theme_font_size_override("font_size", 30)
	stamp.add_theme_color_override("font_color", PAPER)
	var sb := StyleBoxFlat.new()
	sb.bg_color = VERMILION
	sb.set_corner_radius_all(3)
	sb.set_content_margin_all(6)
	stamp.add_theme_stylebox_override("normal", sb)
	seal.add_child(stamp)
	var pct := _explored_percent()
	seal.add_child(_label("Lieux découverts\n%d %% de la vallée parcourue" % pct, 15, INK, serif))
	legend.add_child(seal)
	legend.add_child(_rule())
	for p in main.places:
		if not main.discovered.has(p.id):
			continue
		var row := HBoxContainer.new()
		row.add_theme_constant_override("separation", 12)
		var icon := TextureRect.new()
		icon.texture = _icons.get(p.id)
		icon.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
		icon.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
		icon.custom_minimum_size = Vector2(44, 44)
		row.add_child(icon)
		var v := VBoxContainer.new()
		v.add_theme_constant_override("separation", 0)
		v.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		v.add_child(_label(p.name, 17, INK, serif, 1))
		var st := _place_status(p.id)
		v.add_child(_label(_status_text(p.id), 13, VERMILION if st[0] > 0 else INK_SOFT, sans))
		row.add_child(v)
		legend.add_child(row)
	var hidden := 0
	for p in main.places:
		if not main.discovered.has(p.id):
			hidden += 1
	if hidden > 0:
		legend.add_child(_label("%d lieu%s encore inconnu%s" % [hidden, "x" if hidden > 1 else "", "s" if hidden > 1 else ""], 14, INK_SOFT, serif))
	var filler := Control.new()
	filler.size_flags_vertical = Control.SIZE_EXPAND_FILL
	legend.add_child(filler)
	legend.add_child(_rule())
	var key := Control.new()
	key.custom_minimum_size = Vector2(0, 74)
	key.mouse_filter = Control.MOUSE_FILTER_IGNORE
	key.draw.connect(func():
		var y := 12.0
		var g := [GOLD, VERMILION]
		key.draw_colored_polygon(PackedVector2Array([Vector2(10, y - 9), Vector2(17, y), Vector2(10, y + 9), Vector2(3, y)]), GOLD)
		key.draw_string(sans, Vector2(30, y + 5), "ton repère, visible dans la boussole", HORIZONTAL_ALIGNMENT_LEFT, -1, 13, INK)
		y += 24.0
		key.draw_arc(Vector2(10, y), 7, 0, TAU, 20, GOLD, 2.0)
		key.draw_string(sans, Vector2(30, y + 5), "l'autel où tu te relèveras", HORIZONTAL_ALIGNMENT_LEFT, -1, 13, INK)
		y += 24.0
		key.draw_circle(Vector2(10, y), 9, VERMILION)
		key.draw_string(sans, Vector2(6, y + 4.5), "3", HORIZONTAL_ALIGNMENT_LEFT, -1, 11, PAPER)
		key.draw_string(sans, Vector2(30, y + 5), "ennemis restants", HORIZONTAL_ALIGNMENT_LEFT, -1, 13, INK))
	legend.add_child(key)
	legend.add_child(_rule())
	legend.add_child(_label("Molette : zoom · Glisser : déplacer\nClic : poser un repère · Clic droit : le retirer\nC : revenir sur toi · M ou Échap : fermer", 13, INK_SOFT, sans))


func _rule() -> ColorRect:
	var r := ColorRect.new()
	r.color = Color(INK, 0.35)
	r.custom_minimum_size = Vector2(0, 1)
	return r


func _explored_percent() -> int:
	var img: Image = main.fog_image
	var seen := 0
	var total := 0
	for y in range(0, img.get_height(), 2):
		for x in range(0, img.get_width(), 2):
			total += 1
			if img.get_pixel(x, y).r > 0.5:
				seen += 1
	return int(round(100.0 * seen / maxi(total, 1)))


# ---------- Le dessin par-dessus le relief ----------

func _draw_overlay() -> void:
	var o := overlay
	var sz := o.size
	var px_per_m := sz.x * zoom / Terrain.SIZE

	# les arbres, en petits signes d'encre, là où l'on est passé
	if zoom > 1.25:
		var r := clampf(px_per_m * 1.6, 1.5, 6.0)
		for t in main.vegetation.trees:
			var s := _w2s(t[0])
			if s.x < -8 or s.y < -8 or s.x > sz.x + 8 or s.y > sz.y + 8 or not _explored(t[0]):
				continue
			match t[1]:
				"pin":
					o.draw_colored_polygon(PackedVector2Array([s + Vector2(0, -r * 1.4), s + Vector2(-r, r * 0.7), s + Vector2(r, r * 0.7)]), Color(INK, 0.55))
				"erable":
					o.draw_circle(s, r * 0.85, Color(VERMILION, 0.5))
				_:
					o.draw_line(s + Vector2(0, r), s + Vector2(0, -r), Color(INK, 0.5), 1.0)
					o.draw_line(s, s + Vector2(-r * 0.6, -r * 0.8), Color(INK, 0.5), 1.0)

	# les chemins, en pointillés vermillon, seulement là où l'on est passé
	for seg in main.paths:
		var a: Vector2 = seg[0]
		var b: Vector2 = seg[1]
		var n := maxi(1, int(a.distance_to(b) / 6.0))
		for k in n:
			var p0 := Vector3(lerpf(a.x, b.x, float(k) / n), 0, lerpf(a.y, b.y, float(k) / n))
			var p1 := Vector3(lerpf(a.x, b.x, float(k + 1) / n), 0, lerpf(a.y, b.y, float(k + 1) / n))
			if _explored((p0 + p1) / 2.0):
				o.draw_line(_w2s(p0), _w2s(p1), Color(VERMILION, 0.18), maxf(6.0, px_per_m * 3.6))
				o.draw_dashed_line(_w2s(p0), _w2s(p1), Color(VERMILION, 0.9), 2.5, 9.0)

	# les murets
	for w in main.landmarks.walls:
		var a3 := Vector3(w[0].x, 0, w[0].y)
		var b3 := Vector3(w[1].x, 0, w[1].y)
		if _explored((a3 + b3) / 2.0):
			o.draw_line(_w2s(a3), _w2s(b3), Color(INK, 0.75), maxf(1.5, px_per_m * 0.7))

	# les lieux découverts
	_hover = ""
	var mouse := o.get_local_mouse_position()
	for p in main.places:
		if not main.discovered.has(p.id):
			continue
		var at := Vector3(p.pos.x, 0, p.pos.y)
		var s := _w2s(at)
		var size := clampf(34.0 * sqrt(zoom), 34.0, 64.0)
		var st := _place_status(p.id)
		# un halo de papier sous l'icône, pour qu'elle se lise sur le relief
		o.draw_circle(s, size * 0.62, Color(PAPER, 0.78))
		o.draw_arc(s, size * 0.62, 0, TAU, 40, Color(VERMILION if st[0] > 0 else INK, 0.7), 1.6)
		if _icons.has(p.id):
			o.draw_texture_rect(_icons[p.id], Rect2(s - Vector2(size, size) * 0.5, Vector2(size, size)), false)
		var font_size := 15 if zoom < 2.2 else 17
		var name_w := serif.get_string_size(p.name, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size).x
		var label_at := s + Vector2(-name_w / 2, size * 0.62 + 16)
		o.draw_string_outline(serif, label_at, p.name, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, 5, Color(PAPER, 0.9))
		o.draw_string(serif, label_at, p.name, HORIZONTAL_ALIGNMENT_LEFT, -1, font_size, INK)
		if st[0] > 0:
			var badge := s + Vector2(size * 0.48, -size * 0.45)
			o.draw_circle(badge, 10, VERMILION)
			var txt := str(st[0])
			var tw := sans.get_string_size(txt, HORIZONTAL_ALIGNMENT_LEFT, -1, 12).x
			o.draw_string(sans, badge + Vector2(-tw / 2, 4.5), txt, HORIZONTAL_ALIGNMENT_LEFT, -1, 12, PAPER)
		if mouse.distance_to(s) < size * 0.62:
			_hover = p.id

	# l'autel où l'on se relèvera
	var rs := _w2s(main.respawn)
	o.draw_arc(rs, 7, 0, TAU, 24, GOLD, 2.0)

	# le repère posé
	if main.has_waypoint:
		var ws := _w2s(main.waypoint)
		var pulse := 1.0 + sin(Time.get_ticks_msec() / 300.0) * 0.12
		o.draw_colored_polygon(PackedVector2Array([ws + Vector2(0, -11) * pulse, ws + Vector2(8, 0) * pulse, ws + Vector2(0, 11) * pulse, ws + Vector2(-8, 0) * pulse]), GOLD)
		o.draw_polyline(PackedVector2Array([ws + Vector2(0, -11) * pulse, ws + Vector2(8, 0) * pulse, ws + Vector2(0, 11) * pulse, ws + Vector2(-8, 0) * pulse, ws + Vector2(0, -11) * pulse]), INK, 1.5)
		var d := Vector2(main.player.global_position.x, main.player.global_position.z).distance_to(Vector2(main.waypoint.x, main.waypoint.z))
		o.draw_string_outline(sans, ws + Vector2(12, 5), "%d m" % d, HORIZONTAL_ALIGNMENT_LEFT, -1, 13, 4, Color(PAPER, 0.9))
		o.draw_string(sans, ws + Vector2(12, 5), "%d m" % d, HORIZONTAL_ALIGNMENT_LEFT, -1, 13, INK)

	# le samouraï : son regard, puis la flèche
	var ps := _w2s(main.player.global_position)
	var look: float = main.cam_yaw
	var cone := PackedVector2Array([ps])
	for k in 9:
		var a := look - 0.5 + k / 8.0
		cone.append(ps + Vector2(sin(a), cos(a)) * 46.0)
	o.draw_colored_polygon(cone, Color(VERMILION, 0.14))
	var y: float = main.player.yaw
	var f := Vector2(sin(y), cos(y))
	var r2 := Vector2(-f.y, f.x)
	var arrow := PackedVector2Array([ps + f * 13, ps - f * 8 + r2 * 8, ps - f * 4, ps - f * 8 - r2 * 8])
	o.draw_colored_polygon(arrow, VERMILION)
	o.draw_polyline(arrow + PackedVector2Array([arrow[0]]), PAPER, 2.0)

	# la rose des vents et l'échelle
	var rose := sz - Vector2(56, 64)
	o.draw_circle(rose, 26, Color(PAPER, 0.75))
	o.draw_arc(rose, 26, 0, TAU, 40, Color(INK, 0.7), 1.2)
	o.draw_colored_polygon(PackedVector2Array([rose + Vector2(0, -22), rose + Vector2(6, 0), rose + Vector2(-6, 0)]), VERMILION)
	o.draw_colored_polygon(PackedVector2Array([rose + Vector2(0, 22), rose + Vector2(6, 0), rose + Vector2(-6, 0)]), Color(INK, 0.8))
	o.draw_string(serif, rose + Vector2(-5, -30), "N", HORIZONTAL_ALIGNMENT_LEFT, -1, 15, INK)
	var meters := 50.0 if zoom > 2.5 else 100.0
	var bar := meters * px_per_m
	var b0 := Vector2(24, sz.y - 28)
	o.draw_line(b0, b0 + Vector2(bar, 0), INK, 2.0)
	for k in 3:
		o.draw_line(b0 + Vector2(bar * k / 2.0, -5), b0 + Vector2(bar * k / 2.0, 5), INK, 1.5)
	o.draw_string(sans, b0 + Vector2(0, -10), "%d m" % meters, HORIZONTAL_ALIGNMENT_LEFT, -1, 12, INK)

	# le cadre, double trait d'encre
	o.draw_rect(Rect2(Vector2(1, 1), sz - Vector2(2, 2)), Color(INK, 0.85), false, 2.0)
	o.draw_rect(Rect2(Vector2(7, 7), sz - Vector2(14, 14)), Color(INK, 0.4), false, 1.0)

	# l'infobulle du lieu survolé
	if _hover != "":
		var p: Dictionary = {}
		for q in main.places:
			if q.id == _hover:
				p = q
		var tip_w := 300.0
		var at := mouse + Vector2(18, 12)
		if at.x + tip_w > sz.x - 10:
			at.x = mouse.x - tip_w - 18
		var desc: String = DESCRIPTIONS.get(_hover, "")
		var lines := _wrap(desc, tip_w - 24, 13)
		var tip_h := 58.0 + lines.size() * 17.0
		o.draw_rect(Rect2(at, Vector2(tip_w, tip_h)), Color(PAPER, 0.97))
		o.draw_rect(Rect2(at, Vector2(tip_w, tip_h)), Color(INK, 0.8), false, 1.5)
		o.draw_string(serif, at + Vector2(12, 24), p.name, HORIZONTAL_ALIGNMENT_LEFT, -1, 17, INK)
		o.draw_string(sans, at + Vector2(12, 42), _status_text(_hover), HORIZONTAL_ALIGNMENT_LEFT, -1, 12, VERMILION)
		for i in lines.size():
			o.draw_string(sans, at + Vector2(12, 62 + i * 17), lines[i], HORIZONTAL_ALIGNMENT_LEFT, -1, 13, Color(INK, 0.85))


func _wrap(text: String, width: float, size: int) -> Array:
	var lines := []
	var line := ""
	for w in text.split(" "):
		var test := (line + " " + w).strip_edges()
		if sans.get_string_size(test, HORIZONTAL_ALIGNMENT_LEFT, -1, size).x > width and line != "":
			lines.append(line)
			line = w
		else:
			line = test
	if line != "":
		lines.append(line)
	return lines


# ---------- Les gestes ----------

func _gui_input(ev: InputEvent) -> void:
	var local: Vector2 = overlay.get_local_mouse_position()
	var inside := Rect2(Vector2.ZERO, overlay.size).has_point(local)
	if ev is InputEventMouseButton and inside:
		if ev.button_index in [MOUSE_BUTTON_WHEEL_UP, MOUSE_BUTTON_WHEEL_DOWN] and ev.pressed:
			# on zoome vers le curseur : le point sous la souris ne bouge pas
			var before := center + (local / overlay.size - Vector2(0.5, 0.5)) / zoom
			zoom *= 1.18 if ev.button_index == MOUSE_BUTTON_WHEEL_UP else 1.0 / 1.18
			zoom = clampf(zoom, 1.0, 5.0)
			center = before - (local / overlay.size - Vector2(0.5, 0.5)) / zoom
			_apply_view()
		elif ev.button_index == MOUSE_BUTTON_LEFT:
			if ev.pressed:
				_pressed = true
				_dragging = false
				_drag_from = local
			else:
				if _pressed and not _dragging:
					var w := _screen_to_world(local)
					main.set_waypoint(w)
				_pressed = false
				_dragging = false
			overlay.queue_redraw()
		elif ev.button_index == MOUSE_BUTTON_RIGHT and ev.pressed:
			main.clear_waypoint()
			overlay.queue_redraw()
	elif ev is InputEventMouseMotion:
		if _pressed and (ev.button_mask & MOUSE_BUTTON_MASK_LEFT):
			if local.distance_to(_drag_from) > 4.0:
				_dragging = true
			if _dragging:
				center -= ev.relative / overlay.size / zoom
				_apply_view()
		overlay.queue_redraw()


func _process(_dt: float) -> void:
	if visible:
		overlay.queue_redraw()


func recenter() -> void:
	center = _world_to_uv(main.player.global_position)
	_apply_view()
