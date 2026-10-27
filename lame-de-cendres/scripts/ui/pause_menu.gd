## Le menu (Échap) : reprendre, sauvegarder, charger, et tous les réglages :
## affichage, qualité, jeu, son, touches (réassignables).
class_name PauseMenu
extends Control

var hud: Hud
var game
var on_resume: Callable
var on_save: Callable
var on_load: Callable
var on_quit: Callable
var _side: VBoxContainer
var _tabs: TabContainer
var _status: Label
var _capture := ""
var _capture_btn: Button
var _from_title := false


func _init(h: Hud) -> void:
	hud = h
	set_anchors_preset(Control.PRESET_FULL_RECT)
	var shade := hud._rect(Color(0.02, 0.01, 0.015, 0.82))
	shade.set_anchors_preset(Control.PRESET_FULL_RECT)
	shade.mouse_filter = Control.MOUSE_FILTER_STOP
	add_child(shade)
	var row := HBoxContainer.new()
	row.set_anchors_preset(Control.PRESET_FULL_RECT)
	row.offset_left = 70; row.offset_right = -70; row.offset_top = 50; row.offset_bottom = -50
	row.add_theme_constant_override("separation", 40)
	add_child(row)
	_side = VBoxContainer.new()
	_side.custom_minimum_size = Vector2(300, 0)
	_side.add_theme_constant_override("separation", 12)
	row.add_child(_side)
	_tabs = TabContainer.new()
	_tabs.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	_tabs.theme = _theme()
	_tabs.visible = false
	row.add_child(_tabs)
	visible = false


## Un thème sombre et doré pour les onglets, listes et curseurs.
func _theme() -> Theme:
	var th := Theme.new()
	var panel := StyleBoxFlat.new()
	panel.bg_color = Color(0.03, 0.02, 0.025, 0.94)
	panel.border_color = Color(Hud.GOLD, 0.35)
	panel.set_border_width_all(1)
	panel.set_content_margin_all(26)
	th.set_stylebox("panel", "TabContainer", panel)
	for st in ["tab_selected", "tab_unselected", "tab_hovered"]:
		var sb := StyleBoxFlat.new()
		sb.bg_color = Color(0.45, 0.06, 0.07, 0.95) if st == "tab_selected" else Color(0.06, 0.04, 0.05, 0.9 if st == "tab_unselected" else 1.0)
		sb.border_color = Color(Hud.GOLD, 0.5 if st == "tab_selected" else 0.15)
		sb.border_width_top = 2 if st == "tab_selected" else 1
		sb.set_content_margin_all(10)
		sb.content_margin_left = 22
		sb.content_margin_right = 22
		th.set_stylebox(st, "TabContainer", sb)
	th.set_color("font_selected_color", "TabContainer", Hud.GOLD)
	th.set_color("font_unselected_color", "TabContainer", Hud.MUTED)
	th.set_color("font_hovered_color", "TabContainer", Hud.PAPER)
	var f := FontVariation.new()
	f.base_font = hud.serif
	f.spacing_glyph = 3
	th.set_font("font", "TabContainer", f)
	th.set_font_size("font_size", "TabContainer", 19)
	for cls in ["Button", "OptionButton"]:
		for st in ["normal", "hover", "pressed", "focus"]:
			var sb := StyleBoxFlat.new()
			sb.bg_color = Color(0.08, 0.05, 0.06, 0.95) if st != "hover" else Color(0.3, 0.06, 0.07, 0.95)
			sb.border_color = Color(Hud.GOLD, 0.25 if st != "hover" else 0.6)
			sb.set_border_width_all(1)
			sb.set_content_margin_all(8)
			th.set_stylebox(st, cls, sb)
		th.set_color("font_color", cls, Hud.PAPER)
		th.set_color("font_hover_color", cls, Hud.GOLD)
	var grab := StyleBoxFlat.new()
	grab.bg_color = Hud.BLOOD
	grab.set_content_margin_all(3)
	th.set_stylebox("grabber_area", "HSlider", grab)
	th.set_stylebox("grabber_area_highlight", "HSlider", grab)
	var rail := StyleBoxFlat.new()
	rail.bg_color = Color(1, 1, 1, 0.12)
	rail.set_content_margin_all(3)
	th.set_stylebox("slider", "HSlider", rail)
	return th


func open(g, from_title := false) -> void:
	game = g
	_from_title = from_title
	for c in _side.get_children():
		c.queue_free()
	var k := hud._label("間", 64, Hud.BLOOD, hud.serif)
	_side.add_child(k)
	_side.add_child(hud._label("RÉGLAGES" if from_title else "PAUSE", 34, Hud.PAPER, hud.serif, 12))
	if not from_title:
		_side.add_child(_btn("Reprendre", func(): close()))
		_side.add_child(_btn("Sauvegarder", func(): _say(on_save.call())))
		_side.add_child(_btn("Charger la sauvegarde", func(): on_load.call()))
	_side.add_child(_btn("Réglages", func(): _show_settings(0)))
	_side.add_child(_btn("Commandes", func(): _show_settings(4)))
	if from_title:
		_side.add_child(_btn("Retour", func(): close()))
	else:
		_side.add_child(_btn("Quitter le jeu", func(): on_quit.call()))
	_status = hud._label("", 14, Hud.GOLD)
	_status.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	_side.add_child(_status)
	_tabs.visible = false
	visible = true
	if from_title:
		_show_settings(0)


func close() -> void:
	visible = false
	_capture = ""
	Settings.save_cfg()
	if on_resume.is_valid():
		on_resume.call()


func _say(msg) -> void:
	_status.text = str(msg)


func _btn(text: String, cb: Callable) -> Button:
	var b := Button.new()
	b.text = text
	b.alignment = HORIZONTAL_ALIGNMENT_LEFT
	var f := FontVariation.new()
	f.base_font = hud.serif
	f.spacing_glyph = 3
	b.add_theme_font_override("font", f)
	b.add_theme_font_size_override("font_size", 21)
	b.add_theme_color_override("font_color", Hud.PAPER)
	b.add_theme_color_override("font_hover_color", Hud.GOLD)
	for st in ["normal", "hover", "pressed", "focus"]:
		var sb := StyleBoxFlat.new()
		sb.bg_color = Color(0.77, 0.09, 0.11, 0.55 if st == "hover" else 0.08)
		sb.border_color = Color(Hud.BLOOD, 0.6)
		sb.border_width_left = 3
		sb.set_content_margin_all(10)
		sb.content_margin_left = 18
		b.add_theme_stylebox_override(st, sb)
	b.pressed.connect(func():
		Audio.sfx("ui-clic", null, -4.0)
		cb.call())
	return b


# ---------- Les réglages ----------

func _show_settings(tab: int) -> void:
	for c in _tabs.get_children():
		c.queue_free()
	_tabs.add_child(_page("Affichage", [
		["choix", "affichage", "mode", "Fenêtre", Settings.MODES],
		["case", "affichage", "vsync", "Synchronisation verticale"],
		["choix", "affichage", "fps", "Images par seconde (max.)", Settings.FPS.map(func(v): return "Illimité" if v == 0 else str(v))],
		["glisse", "affichage", "echelle", "Résolution du rendu (FSR 2 sous 100 %)", 0.5, 1.0, 0.05, true],
		["glisse", "affichage", "fov", "Champ de vision", 45.0, 90.0, 1.0, false],
		["glisse", "affichage", "luminosite", "Luminosité", 0.6, 1.8, 0.05, false],
	]))
	_tabs.add_child(_page("Qualité", [
		["choix", "affichage", "qualite", "Préréglage graphique", Settings.QUALITY],
		["choix", "affichage", "aa", "Anticrénelage", Settings.AA],
		["glisse", "affichage", "herbe", "Densité de l'herbe", 0.0, 1.0, 0.05, true],
	]))
	_tabs.add_child(_page("Jeu", [
		["glisse", "jeu", "sensibilite", "Sensibilité de la souris", 0.3, 2.5, 0.05, false],
		["case", "jeu", "inverser", "Inverser l'axe vertical"],
		["glisse", "jeu", "secousses", "Secousses de la caméra", 0.0, 1.0, 0.05, true],
		["case", "jeu", "sang", "Sang"],
		["choix", "jeu", "cones", "Cônes de vision des gardes", ["Toujours", "Accroupi seulement", "Jamais"]],
		["case", "jeu", "aide", "Aides à l'écran (touches)"],
	]))
	_tabs.add_child(_page("Son", [
		["glisse", "audio", "general", "Volume général", 0.0, 1.0, 0.05, true],
		["glisse", "audio", "musique", "Musique", 0.0, 1.0, 0.05, true],
		["glisse", "audio", "effets", "Effets", 0.0, 1.0, 0.05, true],
		["glisse", "audio", "ambiance", "Ambiance (vent, feu)", 0.0, 1.0, 0.05, true],
	]))
	_tabs.add_child(_controls())
	_tabs.visible = true
	_tabs.current_tab = tab


func _page(title: String, rows: Array) -> Control:
	var scroll := ScrollContainer.new()
	scroll.name = title
	var v := VBoxContainer.new()
	v.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	v.add_theme_constant_override("separation", 14)
	scroll.add_child(v)
	for r in rows:
		var h := HBoxContainer.new()
		h.add_theme_constant_override("separation", 20)
		var l := hud._label(r[3], 17, Hud.PAPER)
		l.custom_minimum_size = Vector2(380, 0)
		h.add_child(l)
		var section: String = r[1]
		var key: String = r[2]
		match r[0]:
			"case":
				var cb := CheckBox.new()
				cb.button_pressed = bool(Settings.value(section, key))
				cb.toggled.connect(func(on): _put(section, key, on))
				h.add_child(cb)
			"choix":
				var ob := OptionButton.new()
				var opts: Array = r[4]
				for o in opts:
					ob.add_item(str(o))
				var cur = Settings.value(section, key)
				ob.selected = Settings.FPS.find(int(cur)) if key == "fps" else int(cur)
				ob.custom_minimum_size = Vector2(260, 0)
				ob.item_selected.connect(func(i): _put(section, key, Settings.FPS[i] if key == "fps" else i))
				h.add_child(ob)
			"glisse":
				var sl := HSlider.new()
				sl.min_value = r[4]
				sl.max_value = r[5]
				sl.step = r[6]
				sl.value = float(Settings.value(section, key))
				sl.custom_minimum_size = Vector2(300, 0)
				var pct: bool = r[7]
				var val := hud._label(_fmt(sl.value, pct), 16, Hud.GOLD)
				sl.value_changed.connect(func(x):
					val.text = _fmt(x, pct)
					_put(section, key, x))
				h.add_child(sl)
				h.add_child(val)
		v.add_child(h)
	return scroll


func _fmt(x: float, pct: bool) -> String:
	return "%d %%" % int(round(x * 100.0)) if pct else ("%.2f" % x if x < 10.0 else "%d" % int(x))


func _put(section: String, key: String, v) -> void:
	Settings.put(section, key, v)
	Settings.apply(game)
	Settings.save_cfg()


# ---------- Les touches ----------

func _controls() -> Control:
	var scroll := ScrollContainer.new()
	scroll.name = "Commandes"
	var v := VBoxContainer.new()
	v.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	v.add_theme_constant_override("separation", 6)
	scroll.add_child(v)
	v.add_child(hud._label("Clique une touche puis appuie sur la nouvelle (Échap pour annuler). La souris tourne la caméra.", 14, Hud.MUTED))
	for a in Settings.ACTIONS:
		var h := HBoxContainer.new()
		var l := hud._label(a[1], 16, Hud.PAPER)
		l.custom_minimum_size = Vector2(380, 0)
		h.add_child(l)
		var b := Button.new()
		b.text = Settings.key_name(a[0])
		b.custom_minimum_size = Vector2(240, 0)
		var action: String = a[0]
		b.pressed.connect(func():
			_capture = action
			_capture_btn = b
			b.text = "Appuie sur une touche…")
		h.add_child(b)
		v.add_child(h)
	return scroll


func _input(ev: InputEvent) -> void:
	if not visible:
		return
	if _capture != "":
		if ev is InputEventKey and ev.pressed and not ev.echo:
			if ev.physical_keycode != KEY_ESCAPE:
				Settings.bind(_capture, ev)
			_capture_btn.text = Settings.key_name(_capture)
			_capture = ""
			get_viewport().set_input_as_handled()
		elif ev is InputEventMouseButton and ev.pressed and ev.button_index in [MOUSE_BUTTON_LEFT, MOUSE_BUTTON_RIGHT, MOUSE_BUTTON_MIDDLE]:
			# le clic qui a ouvert la capture ne compte pas : seulement les suivants
			if _capture_btn.get_global_rect().has_point(ev.position):
				return
			Settings.bind(_capture, ev)
			_capture_btn.text = Settings.key_name(_capture)
			_capture = ""
			get_viewport().set_input_as_handled()
		return
	if ev.is_action_pressed("ui_cancel") or ev.is_action_pressed("pause"):
		close()
		get_viewport().set_input_as_handled()
