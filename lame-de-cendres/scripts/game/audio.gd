## Le son du jeu : trois bus (musique, effets, ambiance), une musique qui
## change d'humeur en fondu (exploration, ville, infiltration, combat, boss),
## des bruitages posés dans le monde, le vent et les feux en boucle.
## Partout dans le code : Audio.sfx("lame"), Audio.sfx("chair", position).
class_name Audio
extends Node

const BUSES := ["Musique", "Effets", "Ambiance"]
## Les bruitages (assets/audio/sfx) ; un nom à variantes se joue au hasard : lame → lame-1..3
const SFX := {
	"lame": 3, "lourd": 1, "tourbillon": 1, "chair": 3, "sang": 1, "parade": 2, "garde": 1,
	"degainer": 1, "rengainer": 1, "coup-pied": 1, "chute": 1, "pas": 4, "saut": 1, "reception": 1,
	"porte": 1, "coffre": 1, "pieces": 1, "objet": 1, "boire": 1, "decouverte": 1, "technique": 1,
	"alerte": 1, "grace": 1, "oni": 1, "ui-clic": 1, "ui-papier": 1,
	"tonnerre": 2, "eclaboussure": 3, "souffle": 1, "embrasement": 1, "verre": 1, "aiguiser": 1, "coeur": 1, "halete": 2,
}
const MOODS := ["exploration", "ville", "infiltration", "combat", "boss"]

static var me: Audio

var streams := {}
var music: Array[AudioStreamPlayer] = []
var mood := ""
var _track := {}               # humeur → dernier morceau joué (1 ou 2)
var _live := 0                 # le lecteur de musique qui joue
var _voices: Array[AudioStreamPlayer] = []
var _voices3d: Array[AudioStreamPlayer3D] = []
var wind: AudioStreamPlayer
var wind_level := 0.5


func _init() -> void:
	me = self
	for b in BUSES:
		if AudioServer.get_bus_index(b) == -1:
			AudioServer.add_bus()
			var i := AudioServer.bus_count - 1
			AudioServer.set_bus_name(i, b)
			AudioServer.set_bus_send(i, "Master")
	# un peu d'espace autour des coups : une courte réverbération
	var fx := AudioServer.get_bus_index("Effets")
	if AudioServer.get_bus_effect_count(fx) == 0:
		var rv := AudioEffectReverb.new()
		rv.room_size = 0.45
		rv.damping = 0.6
		rv.wet = 0.09
		rv.dry = 1.0
		AudioServer.add_bus_effect(fx, rv)


func _ready() -> void:
	for n in SFX:
		var count: int = SFX[n]
		for i in count:
			var file: String = n if count == 1 else "%s-%d" % [n, i + 1]
			var p := "res://assets/audio/sfx/%s.ogg" % file
			if ResourceLoader.exists(p):
				streams[file] = load(p)
	for i in 2:
		var m := AudioStreamPlayer.new()
		m.bus = "Musique"
		m.volume_db = -80.0
		m.finished.connect(_next_track.bind(i))
		add_child(m)
		music.append(m)
	for i in 14:
		var v := AudioStreamPlayer.new()
		v.bus = "Effets"
		add_child(v)
		_voices.append(v)
	for i in 20:
		var v := AudioStreamPlayer3D.new()
		v.bus = "Effets"
		v.unit_size = 7.0
		v.max_distance = 60.0
		v.attenuation_filter_cutoff_hz = 6000.0
		add_child(v)
		_voices3d.append(v)
	wind = loop_player("vent", "Ambiance")
	wind.volume_db = -14.0
	add_child(wind)
	wind.play()


## Une boucle d'ambiance (vent, feu) : à placer soi-même, en 2D ou dans le monde.
func loop_player(name: String, bus: String, at_3d := false) -> Node:
	var p := "res://assets/audio/sfx/%s.ogg" % name
	var s: AudioStream = load(p) if ResourceLoader.exists(p) else null
	if s is AudioStreamOggVorbis:
		s = s.duplicate()
		s.loop = true
	if at_3d:
		var p3 := AudioStreamPlayer3D.new()
		p3.stream = s
		p3.bus = bus
		p3.unit_size = 4.0
		p3.max_distance = 30.0
		p3.autoplay = true
		return p3
	var p2 := AudioStreamPlayer.new()
	p2.stream = s
	p2.bus = bus
	return p2


## Un bruitage. Sans position : à l'oreille ; avec : dans le monde.
static func sfx(name: String, at = null, db := 0.0, pitch_spread := 0.08) -> void:
	if me:
		me._play(name, at, db, pitch_spread)


func _play(name: String, at, db: float, pitch_spread: float) -> void:
	var file: String = name
	if SFX.get(name, 1) > 1:
		file = "%s-%d" % [name, randi_range(1, SFX[name])]
	var s: AudioStream = streams.get(file)
	if s == null:
		return
	var pitch := 1.0 + randf_range(-pitch_spread, pitch_spread)
	if at is Vector3:
		var v := _free(_voices3d)
		v.stream = s
		v.global_position = at
		v.volume_db = db
		v.pitch_scale = pitch
		v.play()
	else:
		var v := _free(_voices)
		v.stream = s
		v.volume_db = db
		v.pitch_scale = pitch
		v.play()


func _free(pool: Array) -> Node:
	for v in pool:
		if not v.playing:
			return v
	# toutes les voix parlent : on coupe la plus ancienne
	var v = pool.pop_front()
	pool.append(v)
	return v


## Change l'humeur de la musique, en fondu enchaîné.
func set_mood(m: String) -> void:
	if m == mood:
		return
	mood = m
	var old := music[_live]
	_live = 1 - _live
	var fresh := music[_live]
	var n: int = 3 - int(_track.get(m, 2))
	_track[m] = n
	var p := "res://assets/audio/musique/%s-%d.ogg" % [m, n]
	if not ResourceLoader.exists(p):
		return
	fresh.stream = load(p)
	fresh.volume_db = -40.0
	fresh.play()
	var fade := 1.2 if m in ["combat", "boss"] else 3.0
	var tw := create_tween().set_parallel(true)
	tw.tween_property(fresh, "volume_db", -6.0 if m != "boss" else -4.0, fade).set_trans(Tween.TRANS_SINE)
	tw.tween_property(old, "volume_db", -60.0, fade * 1.2).set_trans(Tween.TRANS_SINE)
	tw.chain().tween_callback(func():
		if old != music[_live]:
			old.stop())


## Un morceau se termine : l'autre morceau de la même humeur prend la suite.
func _next_track(i: int) -> void:
	if i != _live or mood == "":
		return
	var m := mood
	mood = ""
	set_mood(m)


## Le souffle du vent suit les rafales.
func set_wind(strength: float, indoors := false) -> void:
	wind_level = lerpf(wind_level, strength, 0.05)
	if wind:
		wind.volume_db = lerpf(-26.0, -8.0, clampf(wind_level, 0.0, 1.0)) - (8.0 if indoors else 0.0)
		wind.pitch_scale = 0.85 + wind_level * 0.3


## Le volume d'un bus, de 0 à 1 (les réglages).
static func set_volume(bus: String, v: float) -> void:
	var i := AudioServer.get_bus_index(bus)
	if i == -1:
		return
	AudioServer.set_bus_volume_db(i, linear_to_db(maxf(v, 0.0001)))
	AudioServer.set_bus_mute(i, v <= 0.001)
