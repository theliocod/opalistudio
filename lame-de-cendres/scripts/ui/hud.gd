## L'interface : barres, boussole, ceinture d'objets, techniques, annonces,
## inventaire, et les écrans de titre, de mort et de victoire.
class_name Hud
extends CanvasLayer

const BLOOD := Color(0.77, 0.09, 0.11)
const GOLD := Color(0.85, 0.7, 0.35)
const PAPER := Color(0.94, 0.9, 0.85)
const MUTED := Color(0.94, 0.9, 0.85, 0.6)
const INK := Color(0.04, 0.03, 0.035)
## Les images peintes par kie.ai (assets/kie/), si elles sont là
const ITEM_ART := {"sake": "objets-0", "onigiri": "objets-1", "the": "objets-2", "encens": "objets-3", "fumigene": "objets2-2", "caillou": "objets2-3"}
const KATANA_ART := {"ronin": "katanas-0", "kurenai": "katanas-1", "shiranui": "katanas-2", "raijin": "katanas-3", "yamikaze": "katanas-4", "tsukuyomi": "katanas-5",
	"kazekiri": "katanas2-0", "sakura": "katanas2-1", "kuroi": "katanas2-2", "gojo": "katanas2-3", "masamune": "katanas2-4", "akagane": "katanas2-5"}
const MISC_ART := {"ryo": "objets2-0", "rouleau": "objets2-1"}
const TECH_KEYS := {"tourbillon": "tech1", "iai": "tech2", "hirondelle": "tech3", "pas_vent": "tech4", "petales": "tech5"}

var serif := SystemFont.new()
var sans := SystemFont.new()
var root: Control
var play_ui: Control
var hp_fill: ColorRect
var hp_lag: ColorRect
var st_fill: ColorRect
var souls_lbl: Label
var katana_lbl: Label
var katana_dot: ColorRect
var katana_img: TextureRect
var slots := {}
var techs := {}
var compass: Control
var compass_items: Array = []
var boss_box: Control
var boss_name: Label
var boss_fill: ColorRect
var banner_box: VBoxContainer
var banner_title: Label
var banner_sub: Label
var callout_lbl: Label
var prompt_lbl: Label
var toasts: VBoxContainer
var inv: Control
var screen: Control
var ryo_lbl: Label
var fame_lbl: Label
var eye: Label
var bars_top: ColorRect
var bars_bottom: ColorRect
var _banner_t := 0.0
var _callout_t := 0.0
var _hp_shown := 1.0


func _init() -> void:
	serif.font_names = PackedStringArray(["Georgia", "Times New Roman", "Noto Serif", "DejaVu Serif", "serif"])
	sans.font_names = PackedStringArray(["Segoe UI", "Helvetica Neue", "Noto Sans", "DejaVu Sans", "sans-serif"])
	root = Control.new()
	root.set_anchors_preset(Control.PRESET_FULL_RECT)
	root.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(root)
	_build_play()
	_build_inventory()


# ---------- Petits outils ----------

func _label(text: String, size: int, color := PAPER, font: Font = null, spacing := 0) -> Label:
	var l := Label.new()
	l.text = text
	var f := FontVariation.new()
	f.base_font = font if font else sans
	f.spacing_glyph = spacing
	l.add_theme_font_override("font", f)
	l.add_theme_font_size_override("font_size", size)
	l.add_theme_color_override("font_color", color)
	l.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.85))
	l.add_theme_constant_override("outline_size", 4)
	l.mouse_filter = Control.MOUSE_FILTER_IGNORE
	return l


func _rect(c: Color, size := Vector2.ZERO) -> ColorRect:
	var r := ColorRect.new()
	r.color = c
	r.custom_minimum_size = size
	r.mouse_filter = Control.MOUSE_FILTER_IGNORE
	return r


func _panel(bg := Color(0.03, 0.02, 0.025, 0.82), border := Color(0.77, 0.09, 0.11, 0.6)) -> PanelContainer:
	var p := PanelContainer.new()
	var sb := StyleBoxFlat.new()
	sb.bg_color = bg
	sb.border_color = border
	sb.set_border_width_all(1)
	sb.set_content_margin_all(14)
	p.add_theme_stylebox_override("panel", sb)
	return p


func _button(text: String, cb: Callable) -> Button:
	var b := Button.new()
	b.text = text
	var f := FontVariation.new()
	f.base_font = serif
	f.spacing_glyph = 6
	b.add_theme_font_override("font", f)
	b.add_theme_font_size_override("font_size", 22)
	b.add_theme_color_override("font_color", PAPER)
	for state in ["normal", "hover", "pressed", "focus"]:
		var sb := StyleBoxFlat.new()
		sb.bg_color = Color(0.77, 0.09, 0.11, 0.85 if state == "hover" else 0.18)
		sb.border_color = BLOOD
		sb.set_border_width_all(1)
		sb.set_content_margin_all(14)
		sb.content_margin_left = 44
		sb.content_margin_right = 44
		b.add_theme_stylebox_override(state, sb)
	b.pressed.connect(func():
		Audio.sfx("ui-clic", null, -4.0)
		cb.call())
	return b


static func item_icon(id: String) -> Texture2D:
	var p := "res://assets/kie/%s.png" % ITEM_ART.get(id, "objets-0")
	return load(p) if ResourceLoader.exists(p) else null


static func katana_art(id: String) -> Texture2D:
	var p := "res://assets/kie/%s.png" % KATANA_ART.get(id, "katanas-0")
	return load(p) if ResourceLoader.exists(p) else null


static func misc_icon(id: String) -> Texture2D:
	var p := "res://assets/kie/%s.png" % MISC_ART.get(id, "objets2-0")
	return load(p) if ResourceLoader.exists(p) else null


func _tex(t: Texture2D, size: Vector2) -> TextureRect:
	var r := TextureRect.new()
	r.texture = t
	r.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	r.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	r.custom_minimum_size = size
	r.mouse_filter = Control.MOUSE_FILTER_IGNORE
	return r


func _bar(parent: Control, w: float, h: float, c: Color) -> Array:
	var back := _rect(Color(0, 0, 0, 0.6), Vector2(w, h))
	parent.add_child(back)
	var lag := _rect(Color(1, 1, 1, 0.35))
	lag.size = Vector2(w, h)
	back.add_child(lag)
	var fill := _rect(c)
	fill.size = Vector2(w, h)
	back.add_child(fill)
	return [fill, lag]


# ---------- L'interface de jeu ----------

func _build_play() -> void:
	play_ui = Control.new()
	play_ui.set_anchors_preset(Control.PRESET_FULL_RECT)
	play_ui.mouse_filter = Control.MOUSE_FILTER_IGNORE
	root.add_child(play_ui)

	var bars := VBoxContainer.new()
	bars.position = Vector2(28, 24)
	bars.add_theme_constant_override("separation", 6)
	play_ui.add_child(bars)
	var hp: Array = _bar(bars, 340, 11, BLOOD)
	hp_fill = hp[0]; hp_lag = hp[1]
	st_fill = _bar(bars, 260, 5, GOLD)[0]
	var row := HBoxContainer.new()
	row.add_theme_constant_override("separation", 10)
	bars.add_child(row)
	katana_dot = _rect(PAPER, Vector2(10, 10))
	var dot_box := CenterContainer.new()
	dot_box.add_child(katana_dot)
	row.add_child(dot_box)
	katana_lbl = _label("", 15, PAPER, serif, 1)
	row.add_child(katana_lbl)
	katana_img = _tex(null, Vector2(150, 34))
	bars.add_child(katana_img)
	souls_lbl = _label("", 13, MUTED)
	bars.add_child(souls_lbl)
	var purse := HBoxContainer.new()
	purse.add_theme_constant_override("separation", 6)
	purse.add_child(_tex(misc_icon("ryo"), Vector2(22, 22)))
	ryo_lbl = _label("", 15, GOLD, serif)
	purse.add_child(ryo_lbl)
	fame_lbl = _label("", 13, MUTED, serif)
	purse.add_child(fame_lbl)
	bars.add_child(purse)

	# la ceinture : les objets sous les touches 1 à 4
	var belt := HBoxContainer.new()
	belt.add_theme_constant_override("separation", 8)
	belt.set_anchors_preset(Control.PRESET_BOTTOM_LEFT)
	belt.position = Vector2(28, -92)
	play_ui.add_child(belt)
	for id in Arsenal.ITEMS:
		var it: Dictionary = Arsenal.ITEMS[id]
		var p := _panel(Color(0.03, 0.02, 0.025, 0.7), Color(1, 1, 1, 0.12))
		p.custom_minimum_size = Vector2(70, 84)
		var v := VBoxContainer.new()
		v.add_theme_constant_override("separation", 2)
		p.add_child(v)
		v.add_child(_label(Settings.key_name("objet%d" % it.key), 11, MUTED))
		var icon := item_icon(id)
		var c := CenterContainer.new()
		c.add_child(_tex(icon, Vector2(42, 42)) if icon else _rect(it.color, Vector2(18, 18)))
		v.add_child(c)
		var n := _label("0", 14, PAPER)
		n.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
		v.add_child(n)
		p.tooltip_text = it.name
		belt.add_child(p)
		slots[id] = {"panel": p, "count": n}

	# les techniques, en bas à droite
	var tech := HBoxContainer.new()
	tech.add_theme_constant_override("separation", 8)
	tech.set_anchors_preset(Control.PRESET_BOTTOM_RIGHT)
	tech.position = Vector2(-640, -92)
	tech.custom_minimum_size = Vector2(612, 0)
	tech.alignment = BoxContainer.ALIGNMENT_END
	play_ui.add_child(tech)
	for id in TECH_KEYS:
		var t: Dictionary = Arsenal.TECHNIQUES[id]
		var p := _panel(Color(0.03, 0.02, 0.025, 0.7), Color(1, 1, 1, 0.12))
		p.custom_minimum_size = Vector2(114, 64)
		var v := VBoxContainer.new()
		p.add_child(v)
		var k := _label(Settings.key_name(TECH_KEYS[id]), 18, GOLD, serif)
		v.add_child(k)
		var nm := _label(t.name, 11, MUTED)
		nm.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		nm.custom_minimum_size = Vector2(96, 0)
		v.add_child(nm)
		tech.add_child(p)
		techs[id] = {"panel": p, "name": nm, "key": k}

	# l'œil : il s'ouvre quand un garde te soupçonne
	eye = _label("", 40, PAPER, serif)
	eye.set_anchors_preset(Control.PRESET_CENTER_TOP)
	eye.position = Vector2(-60, 58)
	eye.custom_minimum_size = Vector2(120, 0)
	eye.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	play_ui.add_child(eye)

	# les bandes noires du cinéma
	bars_top = _rect(Color(0, 0, 0, 1))
	bars_top.set_anchors_preset(Control.PRESET_TOP_WIDE)
	bars_top.custom_minimum_size = Vector2(0, 0)
	bars_top.size.y = 0
	root.add_child(bars_top)
	bars_bottom = _rect(Color(0, 0, 0, 1))
	bars_bottom.set_anchors_preset(Control.PRESET_BOTTOM_WIDE)
	bars_bottom.size.y = 0
	root.add_child(bars_bottom)

	# la boussole
	compass = Control.new()
	compass.set_anchors_preset(Control.PRESET_CENTER_TOP)
	compass.position = Vector2(-260, 20)
	compass.size = Vector2(520, 34)
	compass.clip_contents = true
	compass.mouse_filter = Control.MOUSE_FILTER_IGNORE
	play_ui.add_child(compass)
	var cbg := _rect(Color(0, 0, 0, 0.35))
	cbg.size = compass.size
	compass.add_child(cbg)
	var mark := _rect(BLOOD, Vector2(2, 10))
	mark.position = Vector2(259, 0)
	mark.size = Vector2(2, 8)
	compass.add_child(mark)

	boss_box = VBoxContainer.new()
	boss_box.set_anchors_preset(Control.PRESET_CENTER_BOTTOM)
	boss_box.position = Vector2(-310, -150)
	boss_box.custom_minimum_size = Vector2(620, 0)
	play_ui.add_child(boss_box)
	boss_name = _label("", 17, PAPER, serif, 4)
	boss_name.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	boss_box.add_child(boss_name)
	boss_fill = _bar(boss_box, 620, 8, Color(0.88, 0.19, 0.1))[0]
	boss_box.visible = false

	banner_box = VBoxContainer.new()
	banner_box.set_anchors_preset(Control.PRESET_CENTER)
	banner_box.position = Vector2(-500, -190)
	banner_box.custom_minimum_size = Vector2(1000, 0)
	banner_box.mouse_filter = Control.MOUSE_FILTER_IGNORE
	root.add_child(banner_box)
	banner_title = _label("", 40, PAPER, serif, 10)
	banner_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	banner_box.add_child(banner_title)
	banner_sub = _label("", 17, MUTED, serif)
	banner_sub.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	banner_sub.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	banner_box.add_child(banner_sub)
	banner_box.modulate.a = 0.0

	callout_lbl = _label("", 34, PAPER, serif, 12)
	callout_lbl.set_anchors_preset(Control.PRESET_CENTER)
	callout_lbl.position = Vector2(-400, -90)
	callout_lbl.custom_minimum_size = Vector2(800, 0)
	callout_lbl.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	callout_lbl.modulate.a = 0.0
	play_ui.add_child(callout_lbl)

	prompt_lbl = _label("", 18, PAPER, sans, 1)
	prompt_lbl.set_anchors_preset(Control.PRESET_CENTER)
	prompt_lbl.position = Vector2(-300, 120)
	prompt_lbl.custom_minimum_size = Vector2(600, 0)
	prompt_lbl.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	play_ui.add_child(prompt_lbl)

	toasts = VBoxContainer.new()
	toasts.set_anchors_preset(Control.PRESET_TOP_RIGHT)
	toasts.position = Vector2(-380, 80)
	toasts.custom_minimum_size = Vector2(350, 0)
	toasts.alignment = BoxContainer.ALIGNMENT_BEGIN
	play_ui.add_child(toasts)

	play_ui.visible = false


func set_bars(hp: float, max_hp: float, stamina: float, dt: float) -> void:
	var f := clampf(hp / max_hp, 0.0, 1.0)
	hp_fill.size.x = 340.0 * f
	_hp_shown = maxf(f, _hp_shown - dt * 0.4)
	hp_lag.size.x = 340.0 * _hp_shown
	st_fill.size.x = 260.0 * clampf(stamina / 100.0, 0.0, 1.0)


func set_arsenal(a: Arsenal) -> void:
	var k := a.katana()
	katana_lbl.text = k.name
	katana_dot.color = k.aura if k.aura != null else PAPER
	katana_img.texture = katana_art(a.equipped)
	var next := ""
	for id in Arsenal.TECHNIQUES:
		if Arsenal.TECHNIQUES[id].has("souls") and not a.knows(id):
			next = " · prochaine technique à %d" % Arsenal.TECHNIQUES[id].souls
			break
	souls_lbl.text = "%d âmes%s" % [a.souls, next]
	ryo_lbl.text = "%d ryō" % a.ryo
	for id in slots:
		var n: int = a.items.get(id, 0)
		slots[id].count.text = str(n)
		slots[id].panel.modulate.a = 1.0 if n > 0 else 0.45
	for id in techs:
		var known := a.knows(id)
		techs[id].panel.modulate.a = 1.0 if known else 0.4
		var t: Dictionary = Arsenal.TECHNIQUES[id]
		techs[id].key.text = Settings.key_name(TECH_KEYS[id])
		techs[id].name.text = t.name if known else ("%d âmes" % t.souls if t.has("souls") else "Registre : %s" % Renown.SAMURAI[t.teacher].name.split(" ")[-1])
		techs[id].panel.visible = known or t.has("souls") or id == "hirondelle"


func set_boss(name: String, frac: float) -> void:
	boss_box.visible = frac >= 0.0
	boss_name.text = name
	boss_fill.size.x = 620.0 * maxf(frac, 0.0)


## La boussole : les points cardinaux et les lieux découverts.
func set_compass(yaw: float, from: Vector3, markers: Array) -> void:
	for c in compass_items:
		c.queue_free()
	compass_items.clear()
	var items := [["N", Vector3(0, 0, -1), GOLD], ["E", Vector3(1, 0, 0), MUTED], ["S", Vector3(0, 0, 1), MUTED], ["O", Vector3(-1, 0, 0), MUTED]]
	# les lieux les plus proches d'abord : un nom lointain ne recouvre pas un nom proche
	var near := markers.duplicate()
	near.sort_custom(func(a, b): return (a.pos - from).length_squared() < (b.pos - from).length_squared() or a.get("color") == GOLD)
	for m in near:
		var d: Vector3 = m.pos - from
		items.append([m.name, d.normalized(), m.get("color", BLOOD if m.get("danger", false) else PAPER)])
	var taken: Array = []
	for it in items:
		var d: Vector3 = it[1]
		var ang := angle_difference(yaw, atan2(d.x, d.z))
		if absf(ang) > 1.3:
			continue
		var x := 260.0 - ang / 1.3 * 260.0
		var wide: float = 14.0 if it[0].length() == 1 else 7.0 * it[0].length()
		var clash := false
		for t in taken:
			if absf(t[0] - x) < (t[1] + wide) / 2.0 + 6.0:
				clash = true
		if clash and it[0].length() > 1:
			continue
		taken.append([x, wide])
		var l := _label(it[0], 12 if it[0].length() > 1 else 15, it[2], serif if it[0].length() == 1 else sans)
		if it[2] == GOLD:
			l.add_theme_font_size_override("font_size", 14)
		l.position = Vector2(x - 60, 8)
		l.custom_minimum_size = Vector2(120, 0)
		l.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		compass.add_child(l)
		compass_items.append(l)


func banner(title: String, sub := "") -> void:
	banner_title.text = title
	banner_sub.text = sub
	_banner_t = 3.2


func callout(text: String, color := PAPER) -> void:
	callout_lbl.text = text
	callout_lbl.add_theme_color_override("font_color", color)
	_callout_t = 0.9


func prompt(text: String) -> void:
	prompt_lbl.text = text


func toast(text: String, color := PAPER) -> void:
	var p := _panel(Color(0.03, 0.02, 0.025, 0.78), Color(color.r, color.g, color.b, 0.5))
	p.add_child(_label(text, 15, color))
	toasts.add_child(p)
	var tw := p.create_tween()
	tw.tween_interval(3.2)
	tw.tween_property(p, "modulate:a", 0.0, 0.6)
	tw.tween_callback(p.queue_free)


func tick(dt: float) -> void:
	_banner_t -= dt
	banner_box.modulate.a = clampf(minf(_banner_t, 3.2 - _banner_t) * 2.0, 0.0, 1.0)
	_callout_t -= dt
	callout_lbl.modulate.a = clampf(_callout_t * 3.0, 0.0, 1.0)


# ---------- L'inventaire ----------

var _inv_items: VBoxContainer
var _inv_katanas: GridContainer
var _inv_techs: VBoxContainer
var _inv_detail: Label
var on_use: Callable
var on_equip: Callable


func _build_inventory() -> void:
	inv = Control.new()
	inv.set_anchors_preset(Control.PRESET_FULL_RECT)
	root.add_child(inv)
	var shade := _rect(Color(0.02, 0.01, 0.015, 0.78))
	shade.set_anchors_preset(Control.PRESET_FULL_RECT)
	inv.add_child(shade)
	var box := VBoxContainer.new()
	box.set_anchors_preset(Control.PRESET_FULL_RECT)
	box.offset_left = 60; box.offset_right = -60; box.offset_top = 40; box.offset_bottom = -40
	box.add_theme_constant_override("separation", 18)
	inv.add_child(box)
	var head := _label("INVENTAIRE", 30, PAPER, serif, 12)
	box.add_child(head)
	var cols := HBoxContainer.new()
	cols.size_flags_vertical = Control.SIZE_EXPAND_FILL
	cols.add_theme_constant_override("separation", 22)
	box.add_child(cols)

	var c1 := _panel(); c1.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_inv_items = VBoxContainer.new(); _inv_items.add_theme_constant_override("separation", 10)
	c1.add_child(_inv_items); cols.add_child(c1)
	var c2 := _panel(); c2.size_flags_horizontal = Control.SIZE_EXPAND_FILL; c2.size_flags_stretch_ratio = 1.4
	var v2 := VBoxContainer.new(); v2.add_theme_constant_override("separation", 12)
	v2.add_child(_label("KATANAS", 16, GOLD, serif, 6))
	_inv_katanas = GridContainer.new(); _inv_katanas.columns = 2
	_inv_katanas.add_theme_constant_override("h_separation", 10)
	_inv_katanas.add_theme_constant_override("v_separation", 10)
	v2.add_child(_inv_katanas)
	_inv_detail = _label("", 14, MUTED)
	_inv_detail.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	v2.add_child(_inv_detail)
	c2.add_child(v2); cols.add_child(c2)
	var c3 := _panel(); c3.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_inv_techs = VBoxContainer.new(); _inv_techs.add_theme_constant_override("separation", 10)
	c3.add_child(_inv_techs); cols.add_child(c3)
	box.add_child(_label("Tab pour fermer · clique un objet pour l'utiliser, un katana pour le porter", 13, MUTED))
	inv.visible = false


func show_inventory(a: Arsenal) -> void:
	for n in _inv_items.get_children() + _inv_katanas.get_children() + _inv_techs.get_children():
		n.queue_free()
	_inv_items.add_child(_label("OBJETS", 16, GOLD, serif, 6))
	for id in Arsenal.ITEMS:
		var it: Dictionary = Arsenal.ITEMS[id]
		var n: int = a.items.get(id, 0)
		var b := Button.new()
		b.text = "%s   ×%d\n%s" % [it.name, n, it.desc]
		b.alignment = HORIZONTAL_ALIGNMENT_LEFT
		b.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		b.disabled = n == 0
		b.flat = true
		b.icon = item_icon(id)
		b.expand_icon = true
		b.add_theme_constant_override("icon_max_width", 56)
		b.add_theme_color_override("font_color", PAPER)
		b.add_theme_color_override("font_disabled_color", Color(1, 1, 1, 0.3))
		b.pressed.connect(func(): on_use.call(id); show_inventory(a))
		_inv_items.add_child(b)
	for id in Arsenal.KATANAS:
		var k: Dictionary = Arsenal.KATANAS[id]
		var owned: bool = id in a.katanas
		var b := Button.new()
		b.custom_minimum_size = Vector2(0, 112)
		b.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		b.text = (k.name + (" · portée" if id == a.equipped else "")) if owned else "???"
		b.vertical_icon_alignment = VERTICAL_ALIGNMENT_TOP
		b.icon_alignment = HORIZONTAL_ALIGNMENT_CENTER
		b.icon = katana_art(id)
		b.expand_icon = true
		b.add_theme_constant_override("icon_max_width", 260)
		if not owned:
			b.add_theme_color_override("icon_disabled_color", Color(0, 0, 0, 0.55))
		b.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		b.disabled = not owned
		var sb := StyleBoxFlat.new()
		var aura: Color = k.aura if k.aura != null else PAPER
		sb.bg_color = Color(aura.r, aura.g, aura.b, 0.16 if owned else 0.03)
		sb.border_color = Color(aura.r, aura.g, aura.b, 0.9 if id == a.equipped else 0.3)
		sb.set_border_width_all(2 if id == a.equipped else 1)
		sb.set_content_margin_all(10)
		for st in ["normal", "hover", "pressed", "disabled", "focus"]:
			b.add_theme_stylebox_override(st, sb)
		b.add_theme_color_override("font_color", PAPER)
		b.mouse_entered.connect(func(): _inv_detail.text = (k.name + " — " + k.desc) if owned else "Une lame dont tu n'as entendu que la légende.")
		b.pressed.connect(func(): on_equip.call(id); show_inventory(a))
		_inv_katanas.add_child(b)
	_inv_detail.text = a.katana().desc
	_inv_techs.add_child(_label("TECHNIQUES · %d âmes" % a.souls, 16, GOLD, serif, 6))
	for id in Arsenal.TECHNIQUES:
		var t: Dictionary = Arsenal.TECHNIQUES[id]
		var known := a.knows(id)
		var key := ("[%s] " % t.key) if t.key != "" else "[passive] "
		var how: String = ("%d âmes" % t.souls) if t.has("souls") else ("vaincre %s en duel" % Renown.SAMURAI[t.teacher].name)
		if TECH_KEYS.has(id):
			key = "[%s] " % Settings.key_name(TECH_KEYS[id])
		var l := _label((key + t.name) if known else "%s — %s" % [t.name, how], 15, PAPER if known else MUTED, serif)
		_inv_techs.add_child(l)
		var d := _label(t.desc, 13, MUTED)
		d.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		_inv_techs.add_child(d)
	inv.visible = true


func hide_inventory() -> void:
	inv.visible = false


# ---------- Écrans ----------

func _screen(kanji: String, title: String, sub: String, button: String, cb: Callable, art := false, extra := []) -> void:
	if screen:
		screen.queue_free()
	screen = Control.new()
	screen.set_anchors_preset(Control.PRESET_FULL_RECT)
	root.add_child(screen)
	if art and ResourceLoader.exists("res://assets/titre.jpg"):
		var tr := TextureRect.new()
		tr.texture = load("res://assets/titre.jpg")
		tr.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
		tr.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
		tr.set_anchors_preset(Control.PRESET_FULL_RECT)
		screen.add_child(tr)
	var shade := _rect(Color(0.02, 0.01, 0.015, 0.55 if art else 0.8))
	shade.set_anchors_preset(Control.PRESET_FULL_RECT)
	screen.add_child(shade)
	var v := VBoxContainer.new()
	v.set_anchors_preset(Control.PRESET_FULL_RECT)
	v.alignment = BoxContainer.ALIGNMENT_CENTER
	v.add_theme_constant_override("separation", 14)
	screen.add_child(v)
	for l in [_label(kanji, 84, BLOOD, serif), _label(title, 56, PAPER, serif, 18), _label(sub, 18, MUTED, serif)]:
		l.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		v.add_child(l)
	var c := HBoxContainer.new()
	c.alignment = BoxContainer.ALIGNMENT_CENTER
	c.add_theme_constant_override("separation", 16)
	c.add_child(_button(button, cb))
	for e in extra:
		c.add_child(_button(e[0], e[1]))
	v.add_child(c)
	if art:
		var k := func(a): return Settings.key_name(a).split(" / ")[0]
		var help := _label("%s%s%s%s se déplacer · Souris caméra · %s coup rapide · %s coup lourd · %s coup de pied · %s coup tournoyant\n%s esquive, roulade, enjamber · %s parer · %s s'accroupir · %s interagir, exécuter, assassiner · %s inventaire · %s carte · %s menu" % [
			k.call("avant"), k.call("gauche"), k.call("arriere"), k.call("droite"), k.call("rapide"), k.call("lourd"), k.call("pied"), k.call("tournoyant"),
			k.call("esquive"), k.call("garde"), k.call("accroupi"), k.call("action"), k.call("inventaire"), k.call("carte"), k.call("pause")], 14, MUTED)
		help.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		v.add_child(help)
	play_ui.visible = false


func show_title(cb: Callable, cont := Callable(), settings := Callable()) -> void:
	var extra := []
	if cont.is_valid():
		extra.append(["CONTINUER", cont])
	if settings.is_valid():
		extra.append(["RÉGLAGES", settings])
	extra.append(["QUITTER", func(): get_tree().quit()])
	_screen("灰刃", "LAME DE CENDRES", "La lune est rouge depuis sept nuits. Les morts de la vallée se sont relevés.\nIl ne reste que toi, et ta lame.", "NOUVELLE PARTIE", cb, true, extra)


func show_death(cb: Callable) -> void:
	_screen("死", "TU ES TOMBÉ", "Les cendres retombent. L'autel te rappelle à lui.", "SE RELEVER", cb)


func show_victory(cb: Callable) -> void:
	_screen("勝", "L'AUBE SE LÈVE", "L'Oni s'est dissipé avec la lune rouge. La vallée reste à parcourir.", "CONTINUER", cb)


func hide_screen() -> void:
	if screen:
		screen.queue_free()
		screen = null
	play_ui.visible = true


# ---------- Réputation, furtivité, cinéma ----------

func set_renown(r: Renown) -> void:
	fame_lbl.text = "  ·  %s · renommée %d%s" % [r.title(), r.fame, ("  ·  infamie %d" % r.infamy) if r.infamy > 0 else ""]


## L'œil qui s'ouvre : 0 personne ne te soupçonne, 1 l'alerte est donnée.
func set_sneak(sneaking: bool, watch: float) -> void:
	if watch >= 1.0:
		eye.text = "◉"
		eye.add_theme_color_override("font_color", Color(1.0, 0.2, 0.12))
		eye.modulate.a = 1.0
	elif watch > 0.02:
		eye.text = "◎"
		eye.add_theme_color_override("font_color", PAPER.lerp(Color(1.0, 0.7, 0.2), watch))
		eye.modulate.a = 0.4 + watch * 0.6
	elif sneaking:
		eye.text = "◌"
		eye.add_theme_color_override("font_color", MUTED)
		eye.modulate.a = 0.6
	else:
		eye.text = ""


## Les bandes noires d'une scène de cinéma.
func letterbox(on: bool) -> void:
	var h := 92.0 if on else 0.0
	play_ui.visible = not on
	var tw := create_tween().set_parallel(true)
	tw.tween_property(bars_top, "size:y", h, 0.35).set_trans(Tween.TRANS_SINE)
	tw.tween_property(bars_bottom, "size:y", h, 0.35).set_trans(Tween.TRANS_SINE)
	tw.tween_property(bars_bottom, "position:y", get_viewport().get_visible_rect().size.y - h, 0.35).set_trans(Tween.TRANS_SINE)
