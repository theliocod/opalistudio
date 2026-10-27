## L'étal de Daikoku : ses lames, ses remèdes et ses ruses, payés en ryō.
## La renommée fait baisser les prix.
class_name ShopView
extends Control

const KATANAS := ["kazekiri", "sakura", "kuroi"]
const ITEMS := ["sake", "onigiri", "the", "encens", "fumigene", "caillou"]

var hud: Hud
var game
var on_close: Callable
var _list: VBoxContainer
var _purse: Label
var _line: Label


func _init(h: Hud) -> void:
	hud = h
	set_anchors_preset(Control.PRESET_FULL_RECT)
	var shade := hud._rect(Color(0.02, 0.01, 0.015, 0.84))
	shade.set_anchors_preset(Control.PRESET_FULL_RECT)
	shade.mouse_filter = Control.MOUSE_FILTER_STOP
	add_child(shade)
	var box := VBoxContainer.new()
	box.set_anchors_preset(Control.PRESET_FULL_RECT)
	box.offset_left = 80; box.offset_right = -80; box.offset_top = 40; box.offset_bottom = -40
	box.add_theme_constant_override("separation", 16)
	add_child(box)
	var head := HBoxContainer.new()
	head.add_theme_constant_override("separation", 22)
	box.add_child(head)
	var tr := hud._tex(Dialogues.portrait("marchand"), Vector2(120, 120))
	head.add_child(tr)
	var hv := VBoxContainer.new()
	hv.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	head.add_child(hv)
	hv.add_child(hud._label("L'ÉTAL DE DAIKOKU", 30, Hud.PAPER, hud.serif, 10))
	_line = hud._label("", 17, Hud.MUTED, hud.serif)
	_line.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	hv.add_child(_line)
	var purse := HBoxContainer.new()
	purse.add_theme_constant_override("separation", 8)
	purse.add_child(hud._tex(Hud.misc_icon("ryo"), Vector2(44, 44)))
	_purse = hud._label("", 28, Hud.GOLD, hud.serif)
	purse.add_child(_purse)
	head.add_child(purse)
	var scroll := ScrollContainer.new()
	scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	box.add_child(scroll)
	_list = VBoxContainer.new()
	_list.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_list.add_theme_constant_override("separation", 10)
	scroll.add_child(_list)
	var foot := HBoxContainer.new()
	foot.add_child(hud._label("Échap ou Tab pour partir", 13, Hud.MUTED))
	box.add_child(foot)
	visible = false


func open(g) -> void:
	game = g
	var r: Renown = game.renown
	var off := int(round((1.0 - r.discount()) * 100.0))
	_line.text = "« Choisis bien. Une lame ne se rend pas. »" + ("   Ta renommée te vaut %d %% de remise." % off if off >= 3 else "")
	_refresh()
	visible = true
	Audio.sfx("ui-papier")


func _refresh() -> void:
	var a: Arsenal = game.arsenal
	var r: Renown = game.renown
	_purse.text = "%d ryō" % a.ryo
	for c in _list.get_children():
		c.queue_free()
	_list.add_child(hud._label("LAMES", 16, Hud.GOLD, hud.serif, 6))
	for id in KATANAS:
		var k: Dictionary = Arsenal.KATANAS[id]
		var price := r.price(Arsenal.PRICES[id])
		var owned: bool = id in a.katanas
		_list.add_child(_row(Hud.katana_art(id), Vector2(260, 60), k.name, k.desc, price, owned, func(): _buy_katana(id, price), k.aura))
	_list.add_child(hud._label("REMÈDES ET RUSES", 16, Hud.GOLD, hud.serif, 6))
	for id in ITEMS:
		var it: Dictionary = Arsenal.ITEMS[id]
		var price := r.price(Arsenal.PRICES[id])
		var label: String = "%s   (tu en as %d)" % [it.name, a.items.get(id, 0)]
		_list.add_child(_row(Hud.item_icon(id), Vector2(60, 60), label, it.desc, price, false, func(): _buy_item(id, price), it.color))


func _row(icon: Texture2D, size: Vector2, title: String, desc: String, price: int, owned: bool, buy: Callable, accent) -> Control:
	var p := hud._panel(Color(0.04, 0.03, 0.035, 0.8), Color(1, 1, 1, 0.1))
	var h := HBoxContainer.new()
	h.add_theme_constant_override("separation", 18)
	p.add_child(h)
	h.add_child(hud._tex(icon, size))
	var v := VBoxContainer.new()
	v.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	h.add_child(v)
	v.add_child(hud._label(title, 18, accent if accent is Color else Hud.PAPER, hud.serif))
	var d := hud._label(desc, 14, Hud.MUTED)
	d.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	v.add_child(d)
	var right := VBoxContainer.new()
	right.alignment = BoxContainer.ALIGNMENT_CENTER
	h.add_child(right)
	right.add_child(hud._label("%d ryō" % price, 18, Hud.GOLD, hud.serif))
	var b := Button.new()
	b.text = "Possédée" if owned else "Acheter"
	b.disabled = owned or game.arsenal.ryo < price
	b.custom_minimum_size = Vector2(130, 0)
	b.pressed.connect(buy)
	right.add_child(b)
	return p


func _buy_katana(id: String, price: int) -> void:
	var a: Arsenal = game.arsenal
	if a.ryo < price or id in a.katanas:
		return
	a.ryo -= price
	a.add_katana(id)
	Audio.sfx("pieces")
	game.hud.toast("Nouveau katana : " + Arsenal.KATANAS[id].name, Arsenal.KATANAS[id].aura)
	game.hud.set_arsenal(a)
	_refresh()


func _buy_item(id: String, price: int) -> void:
	var a: Arsenal = game.arsenal
	if a.ryo < price:
		return
	a.ryo -= price
	a.add_item(id)
	Audio.sfx("pieces", null, -4.0)
	game.hud.set_arsenal(a)
	_refresh()


func _unhandled_input(ev: InputEvent) -> void:
	if visible and (ev.is_action_pressed("ui_cancel") or ev.is_action_pressed("inventaire")):
		visible = false
		get_viewport().set_input_as_handled()
		if on_close.is_valid():
			on_close.call()
