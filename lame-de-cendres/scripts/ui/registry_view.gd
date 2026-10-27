## Le Registre des Lames de Hōjō : les six sabres de la ville, du premier au
## sixième, où ils se tiennent, ce qu'ils enseignent, et ta place parmi eux.
class_name RegistryView
extends Control

const RANKS := ["", "壱", "弐", "参", "肆", "伍", "陸"]
const INK := Color(0.1, 0.075, 0.065)
const VERMILION := Color(0.62, 0.16, 0.1)

var hud: Hud
var game
var on_close: Callable
var on_mark: Callable           # (id : String)
var _rows: VBoxContainer
var _me: Label


func _init(h: Hud) -> void:
	hud = h
	set_anchors_preset(Control.PRESET_FULL_RECT)
	var shade := hud._rect(Color(0.02, 0.01, 0.015, 0.7))
	shade.set_anchors_preset(Control.PRESET_FULL_RECT)
	shade.mouse_filter = Control.MOUSE_FILTER_STOP
	add_child(shade)
	# une feuille de washi, comme la carte
	var sheet := PanelContainer.new()
	var sb := StyleBoxTexture.new()
	if ResourceLoader.exists("res://assets/kie/washi.jpg"):
		sb.texture = load("res://assets/kie/washi.jpg")
		sb.axis_stretch_horizontal = StyleBoxTexture.AXIS_STRETCH_MODE_TILE
		sb.axis_stretch_vertical = StyleBoxTexture.AXIS_STRETCH_MODE_TILE
	sb.set_content_margin_all(34)
	sheet.add_theme_stylebox_override("panel", sb)
	sheet.set_anchors_preset(Control.PRESET_FULL_RECT)
	sheet.offset_left = 140; sheet.offset_right = -140; sheet.offset_top = 30; sheet.offset_bottom = -30
	add_child(sheet)
	var box := VBoxContainer.new()
	box.add_theme_constant_override("separation", 10)
	sheet.add_child(box)
	var title := HBoxContainer.new()
	title.add_theme_constant_override("separation", 18)
	box.add_child(title)
	title.add_child(_ink("刀帳", 54, VERMILION))
	var tv := VBoxContainer.new()
	title.add_child(tv)
	tv.add_child(_ink("REGISTRE DES LAMES DE HŌJŌ", 28, INK, 8))
	tv.add_child(_ink("Six sabres gardent la ville. On les défie l'un après l'autre, du sixième au premier.", 15, Color(INK, 0.75)))
	_me = _ink("", 16, VERMILION)
	box.add_child(_me)
	var scroll := ScrollContainer.new()
	scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	box.add_child(scroll)
	_rows = VBoxContainer.new()
	_rows.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_rows.add_theme_constant_override("separation", 8)
	scroll.add_child(_rows)
	box.add_child(_ink("Échap pour refermer · « Marquer » place un repère sur la carte et la boussole", 13, Color(INK, 0.6)))
	visible = false


func _ink(text: String, size: int, color: Color, spacing := 0) -> Label:
	var l := hud._label(text, size, color, hud.serif, spacing)
	l.add_theme_constant_override("outline_size", 0)
	return l


func open(g) -> void:
	game = g
	var r: Renown = game.renown
	var rank := r.rank()
	var nxt := r.next_title()
	_me.text = "Toi : %s · renommée %d%s · %s%s" % [r.title(), r.fame,
		(" (prochain titre à %d)" % nxt[0]) if not nxt.is_empty() else "",
		("rang %s au Registre" % RANKS[rank]) if rank > 0 else "pas encore inscrit au Registre",
		("   · infamie %d" % r.infamy) if r.infamy > 0 else ""]
	for c in _rows.get_children():
		c.queue_free()
	var order := Renown.ORDER.duplicate()
	order.reverse()
	for id in order:
		_rows.add_child(_row(id))
	visible = true
	Audio.sfx("ui-papier")


func _row(id: String) -> Control:
	var s: Dictionary = Renown.SAMURAI[id]
	var r: Renown = game.renown
	var p := PanelContainer.new()
	var sb := StyleBoxFlat.new()
	sb.bg_color = Color(0.1, 0.07, 0.05, 0.06)
	sb.border_color = Color(INK, 0.35)
	sb.border_width_bottom = 1
	sb.set_content_margin_all(8)
	p.add_theme_stylebox_override("panel", sb)
	var h := HBoxContainer.new()
	h.add_theme_constant_override("separation", 18)
	p.add_child(h)
	var rk := _ink(RANKS[s.rank], 44, VERMILION)
	rk.custom_minimum_size = Vector2(56, 0)
	rk.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	h.add_child(rk)
	h.add_child(hud._tex(Dialogues.portrait(s.kind), Vector2(96, 96)))
	var v := VBoxContainer.new()
	v.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	v.add_theme_constant_override("separation", 2)
	h.add_child(v)
	v.add_child(_ink("%s — %s" % [s.name, s.title], 21, INK))
	v.add_child(_ink(s.style, 14, Color(INK, 0.75)))
	v.add_child(_ink("Se trouve : " + s.where, 14, Color(INK, 0.9)))
	var reward: Dictionary = s.reward
	var gift: String = ("Enseigne : " + Arsenal.TECHNIQUES[reward.tech].name) if reward.has("tech") else ("Confie : " + Arsenal.KATANAS[reward.katana].name)
	v.add_child(_ink("%s · %d ryō · +%d renommée" % [gift, reward.ryo, reward.fame], 14, Color(0.35, 0.22, 0.1)))
	var right := VBoxContainer.new()
	right.alignment = BoxContainer.ALIGNMENT_CENTER
	right.custom_minimum_size = Vector2(190, 0)
	h.add_child(right)
	var state := r.can_challenge(id)
	var stamp := _ink("VAINCU" if state == "vaincu" else "INVAINCU", 20, VERMILION if state == "vaincu" else Color(INK, 0.55), 6)
	stamp.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	right.add_child(stamp)
	if state != "vaincu" and state != "":
		var lock := _ink(state, 12, Color(INK, 0.6))
		lock.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		lock.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		right.add_child(lock)
	elif state == "":
		right.add_child(_ink("Prêt à être défié", 12, VERMILION))
	var b := Button.new()
	b.text = "Marquer sur la carte"
	b.pressed.connect(func():
		if on_mark.is_valid():
			on_mark.call(id)
		Audio.sfx("ui-clic"))
	right.add_child(b)
	return p


func _unhandled_input(ev: InputEvent) -> void:
	if visible and (ev.is_action_pressed("ui_cancel") or ev.is_action_pressed("inventaire") or ev.is_action_pressed("action")):
		visible = false
		get_viewport().set_input_as_handled()
		if on_close.is_valid():
			on_close.call()
