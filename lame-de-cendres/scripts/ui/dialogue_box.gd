## La boîte de dialogue : le portrait peint, le nom, la réplique qui s'écrit
## lettre à lettre, et les réponses (souris, ou touches 1 à 4).
class_name DialogueBox
extends Control

var hud: Hud
var on_choice: Callable         # (go : String)
var _portrait: TextureRect
var _name: Label
var _text: Label
var _choices: VBoxContainer
var _hint: Label
var _node := {}
var _shown := 0.0
var _total := 0


func _init(h: Hud) -> void:
	hud = h
	set_anchors_preset(Control.PRESET_FULL_RECT)
	mouse_filter = Control.MOUSE_FILTER_IGNORE
	var box := PanelContainer.new()
	var sb := StyleBoxFlat.new()
	sb.bg_color = Color(0.025, 0.018, 0.02, 0.9)
	sb.border_color = Color(Hud.GOLD.r, Hud.GOLD.g, Hud.GOLD.b, 0.45)
	sb.border_width_top = 1
	sb.set_content_margin_all(20)
	sb.content_margin_left = 34
	sb.content_margin_right = 34
	box.add_theme_stylebox_override("panel", sb)
	box.set_anchors_preset(Control.PRESET_BOTTOM_WIDE)
	box.offset_top = -270
	add_child(box)
	var row := HBoxContainer.new()
	row.add_theme_constant_override("separation", 28)
	box.add_child(row)
	# le portrait, dans un cadre fin
	var frame := PanelContainer.new()
	var fs := StyleBoxFlat.new()
	fs.bg_color = Color(0, 0, 0, 0.6)
	fs.border_color = Hud.BLOOD
	fs.set_border_width_all(2)
	fs.set_content_margin_all(3)
	frame.add_theme_stylebox_override("panel", fs)
	_portrait = TextureRect.new()
	_portrait.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	_portrait.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
	_portrait.custom_minimum_size = Vector2(220, 220)
	frame.add_child(_portrait)
	row.add_child(frame)
	var v := VBoxContainer.new()
	v.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	v.add_theme_constant_override("separation", 10)
	row.add_child(v)
	_name = hud._label("", 24, Hud.GOLD, hud.serif, 4)
	v.add_child(_name)
	_text = hud._label("", 21, Hud.PAPER, hud.serif)
	_text.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_text.custom_minimum_size = Vector2(600, 0)
	v.add_child(_text)
	_choices = VBoxContainer.new()
	_choices.add_theme_constant_override("separation", 4)
	v.add_child(_choices)
	_hint = hud._label("", 13, Hud.MUTED)
	v.add_child(_hint)
	visible = false


func show_node(n: Dictionary) -> void:
	_node = n
	_portrait.texture = Dialogues.portrait(n.kind)
	_name.text = n.speaker
	_text.text = n.text
	_total = n.text.length()
	_shown = 0.0
	_text.visible_characters = 0
	for c in _choices.get_children():
		c.queue_free()
	var i := 1
	for ch in n.choices:
		var locked: bool = ch.get("lock", "") != ""
		var b := Button.new()
		b.text = "%d · %s" % [i, ch.text] + ("   — %s" % ch.lock if locked else "")
		b.flat = true
		b.alignment = HORIZONTAL_ALIGNMENT_LEFT
		b.disabled = locked
		var f := FontVariation.new()
		f.base_font = hud.sans
		b.add_theme_font_override("font", f)
		b.add_theme_font_size_override("font_size", 17)
		b.add_theme_color_override("font_color", Hud.PAPER)
		b.add_theme_color_override("font_hover_color", Hud.GOLD)
		b.add_theme_color_override("font_disabled_color", Color(1, 1, 1, 0.32))
		var go: String = ch.go
		b.pressed.connect(func(): _pick(go))
		b.modulate.a = 0.0
		_choices.add_child(b)
		i += 1
	_hint.text = ""
	visible = true
	Audio.sfx("ui-papier", null, -6.0)


func _process(dt: float) -> void:
	if not visible:
		return
	if _shown < _total:
		_shown = minf(_total, _shown + dt * 60.0)
		_text.visible_characters = int(_shown)
		if _shown >= _total:
			_reveal_choices()


func _reveal_choices() -> void:
	_text.visible_characters = -1
	var k := 0
	for b in _choices.get_children():
		var tw := b.create_tween()
		tw.tween_interval(k * 0.06)
		tw.tween_property(b, "modulate:a", 1.0, 0.2)
		k += 1
	_hint.text = "Clique une réponse ou appuie sur son chiffre"


func _pick(go: String) -> void:
	Audio.sfx("ui-clic", null, -4.0)
	if on_choice.is_valid():
		on_choice.call(go)


func _unhandled_input(ev: InputEvent) -> void:
	if not visible:
		return
	if ev is InputEventKey and ev.pressed and not ev.echo:
		var k: int = ev.physical_keycode
		if _shown < _total and (ev.is_action("action") or k == KEY_SPACE or k == KEY_ENTER):
			_shown = _total
			_reveal_choices()
			get_viewport().set_input_as_handled()
			return
		if k >= KEY_1 and k <= KEY_9 and _shown >= _total:
			var i := k - KEY_1
			if i < _node.choices.size() and _node.choices[i].get("lock", "") == "":
				_pick(_node.choices[i].go)
			get_viewport().set_input_as_handled()
		elif ev.is_action("ui_cancel"):
			_pick("@end")
			get_viewport().set_input_as_handled()
	elif ev is InputEventMouseButton and ev.pressed and _shown < _total:
		_shown = _total
		_reveal_choices()
