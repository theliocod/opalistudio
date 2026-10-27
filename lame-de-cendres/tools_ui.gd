## Outil de développement : photographie les écrans (titre, menu, réglages,
## commandes, carte, inventaire). OUT=dossier godot --path . --script res://tools_ui.gd
extends SceneTree

var out := ""
var n := 0


func _initialize() -> void:
	out = OS.get_environment("OUT")
	var main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await frames(3)
	await shot("titre")
	main._start({})
	await frames(3)
	for id in ["hojo", "akagane", "cimetiere", "bambous", "village"]:
		for p in main.places:
			if p.id == id:
				main._discover(p)
	main.arsenal.learned.append_array(["tourbillon", "iai", "hirondelle", "pas_vent"])
	main.arsenal.katanas.append_array(["kazekiri", "gojo", "akagane"])
	main.renown.fame = 45
	main.hud.set_renown(main.renown)
	main.hud.set_arsenal(main.arsenal)
	await frames(2)
	await shot("jeu")
	main.pause_menu.open(main)
	await frames(2)
	await shot("pause")
	main.pause_menu._show_settings(0)
	await frames(2)
	await shot("reglages-affichage")
	main.pause_menu._tabs.current_tab = 2
	await frames(2)
	await shot("reglages-jeu")
	main.pause_menu._tabs.current_tab = 4
	await frames(2)
	await shot("commandes")
	main.pause_menu.visible = false
	main.state = "map"
	main.map_view.open()
	main.hud.play_ui.visible = false
	await frames(3)
	await shot("carte")
	main._close_map()
	main.state = "menu"
	main.hud.show_inventory(main.arsenal)
	await frames(2)
	await shot("inventaire")
	print("FIN")
	quit()


func frames(k: int) -> void:
	for i in k:
		await process_frame


func shot(name: String) -> void:
	await process_frame
	root.get_viewport().get_texture().get_image().save_png("%s/%02d-%s.png" % [out, n, name])
	n += 1
