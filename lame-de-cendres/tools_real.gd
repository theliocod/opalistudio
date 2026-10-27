## Outil de développement : le feu, la pluie, la charge, les blessures, l'eau,
## les chutes et la lumière, mis à l'épreuve et photographiés.
## OUT=dossier godot --path . --resolution 800x450 --script res://tools_real.gd
extends SceneTree

var main
var out := ""
var n := 0


func _initialize() -> void:
	out = OS.get_environment("OUT")
	Engine.max_physics_steps_per_frame = 24
	main = load("res://main.tscn").instantiate()
	root.add_child(main)
	await frames(2)
	Settings.put("affichage", "qualite", 1)
	Settings.apply(main)
	main._start({})
	await frames(3)
	var p: Fighter = main.player
	var c: Condition = main.condition

	# ── le feu : une fiole d'huile sur une tente du camp des ronins
	var tent: Dictionary = main.landmarks.flammables[0]
	for e in main.enemies:
		if e.faction == "damnes":
			e.global_position += Vector3(0, 0, 400)
	p.global_position = tent.pos + Vector3(0, 0.5, 9)
	main.cam_yaw = PI
	p.yaw = PI
	await frames(4)
	main.fire.ignite(tent.pos + Vector3(0, 0, 2.6), 2.1, 14.0, 0, "huile")
	await frames(30)
	note("feu", "foyers %d, tente brûlée %s" % [main.fire.fires.size(), tent.burnt])
	await shot("feu-tente")
	await frames(20)
	await shot("feu-tente-2")
	# dans la prairie : le feu court dans l'herbe avec le vent
	var meadow := Vector3(40, 0, 60)
	for k in 30:
		var m: Color = main.terrain.mask_at(meadow.x, meadow.z)
		if m.g > 0.5 and m.a < 0.2 and m.r < 0.3:
			break
		meadow += Vector3(3, 0, -2)
	meadow.y = main.terrain.height_at(meadow.x, meadow.z)
	p.global_position = meadow + Vector3(-6, 0.5, 6)
	main.cam_yaw = PI * 0.75
	main.fire.ignite(meadow, 1.6, 12.0, 0, "huile")
	await frames(40)
	note("propagation", "foyers %d (vent %.2f)" % [main.fire.fires.size(), main.wind.strength])
	await shot("feu-prairie")
	await frames(40)
	note("propagation", "foyers %d, suie %d" % [main.fire.fires.size(), main.fire._scorches.size()])
	await shot("feu-prairie-2")

	# ── en feu : le joueur marche dans les flammes
	if main.fire.fires.is_empty():
		main.fire.ignite(meadow, 1.6, 12.0, 0, "huile")
	var f: Dictionary = main.fire.fires[0]
	p.global_position = f.pos + Vector3(0, 0.4, 0)
	await frames(6)
	var hp := p.hp
	note("en feu", "brûlure %.1f s" % c.burn)
	await shot("joueur-en-feu")
	await frames(10)
	note("brûlé", "vie %.0f → %.0f" % [hp, p.hp])
	# l'eau du lac éteint tout
	var lake: Vector2 = main.terrain.lake_center
	var shore := Vector3(lake.x, 0, lake.y)
	for k in 200:
		var at := Vector3(lake.x + k * 0.3, 0, lake.y)
		var d: float = main.water_depth(at)
		if d > 0.35 and d < 0.8:
			shore = at
			break
	shore.y = main.terrain.height_at(shore.x, shore.z)
	c.set_on_fire(6.0)
	p.global_position = shore + Vector3(0, 0.3, 0)
	await frames(6)
	note("lac", "profondeur %.2f, brûlure %.1f, vitesse ×%.2f, roulade %s" % [c.water, c.burn, c.speed_factor(), c.can_roll()])

	# ── le souffle : l'endurance vidée
	main.stamina = 0.0
	await frames(2)
	note("souffle", "essoufflé %.1f s, bras ×%.2f, vitesse ×%.2f" % [c.winded, c.arm_factor(), c.speed_factor()])
	main.stamina = 100.0

	# ── la charge
	p.hp = p.max_hp
	main.arsenal.katanas.append_array(["gojo", "kazekiri", "kurenai", "raijin", "tsukuyomi", "sakura", "kuroi"])
	main.arsenal.ryo = 1500
	await frames(8)
	note("charge", "%.1f kg, %s, vitesse ×%.2f, roulade %s" % [c.kg, c.weight.label, c.speed_factor(), c.can_roll()])
	main.arsenal.katanas.resize(1)

	# ── l'hémorragie et le bandage
	for k in 12:
		c.wound(30.0)
	note("plaie", "hémorragie %.0f s" % c.bleed)
	p.hp = 60.0
	await frames(30)
	note("saigne", "vie %.0f, gouttes %d" % [p.hp, Blood._decals.size()])
	main._use_item("bandage")
	note("bandage", "hémorragie %.0f s" % c.bleed)

	# ── la chute
	p.hp = p.max_hp
	var hojo := Vector3(-150, 0, 72)
	hojo.y = main.terrain.height_at(hojo.x, hojo.z)
	p.global_position = hojo + Vector3(0, 14.0, 0)
	p.velocity = Vector3.ZERO
	await frames(30)
	note("chute", "vie %.0f" % p.hp)

	# ── la lumière : une lanterne soufflée dans la grand-rue
	p.hp = p.max_hp
	var lamp: Dictionary = {}
	for l in main.landmarks.lamps:
		if l.kind == "pierre" and l.light and l.pos.distance_to(hojo) < 40.0:
			lamp = l
			break
	p.global_position = Vector3(lamp.pos.x + 1.0, main.terrain_height(lamp.pos) + 0.3, lamp.pos.z)
	await frames(6)
	var before: float = main.exposure
	var it: Dictionary = main._interactable()
	note("lanterne", "invite : %s" % it.get("text", "rien"))
	note("lanterne", "à %.1f m, lumière ici %.2f" % [lamp.light.global_position.distance_to(p.global_position), main.landmarks.light_at(p.global_position + Vector3(0, 1, 0))])
	main._snuff(lamp)
	await frames(4)
	note("ombre", "lumière %.2f → %.2f" % [before, main.exposure])

	# ── la pluie
	main.weather.start_rain(1.0)
	main.weather.rain = 0.95
	p.global_position = hojo + Vector3(1.5, 0.4, 12.0)
	main.cam_yaw = PI
	await frames(40)
	note("pluie", "pluie %.2f, sol mouillé %.2f" % [main.weather.rain, main.weather.wet])
	await shot("pluie")
	var lit: bool = main.fire.ignite(hojo + Vector3(4, 0.1, 5), 1.0, 8.0)
	note("pluie et feu", "un feu prend sous la pluie : %s" % lit)

	# ── la pierre à aiguiser
	main.weather.rain = 0.0
	p.rig.set_meta("blood", 0.8)
	note("lame", "facteur %.2f" % c.blade_factor())
	main._use_item("pierre")
	await frames(40)
	note("affûtée", "facteur %.2f, affûtée %.0f s" % [c.blade_factor(), c.sharp])
	await shot("hud")
	print("FIN")
	quit()


func frames(k: int) -> void:
	for i in k:
		await process_frame


func note(what: String, msg: String) -> void:
	print("[%s] %s" % [what, msg])


func shot(name: String) -> void:
	await process_frame
	root.get_viewport().get_texture().get_image().save_png("%s/%02d-%s.png" % [out, n, name])
	n += 1
