// L'herbe : une grille de brins qui suit le joueur. Chaque brin se pose sur
// le relief, prend sa taille et sa couleur d'un hasard attaché à sa position
// dans le monde, et plie sous le vent. Par grandes nappes, les champs de
// fleurs : lys araignées rouges, plumets blancs des susuki, fleurs jaunes.
shader_type spatial;
render_mode cull_disabled, diffuse_burley;

uniform sampler2D heightmap : filter_linear, repeat_disable;
uniform sampler2D mask : filter_linear, repeat_disable;
uniform float world_size = 512.0;
uniform float res = 257.0;
uniform float fade_radius = 38.0;
global uniform vec4 wind;          // xy : direction du vent, z : sa force (rafales)
global uniform float wetness;

varying float tip;
varying float lily;
varying float shade;
varying float flower;      // 0 : lys rouge, 0.5 : susuki blanc, 1 : fleur jaune

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// un bruit doux : de grandes taches qui décident où sont les champs
float vnoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	f = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void vertex() {
	vec3 origin = (MODEL_MATRIX * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
	vec2 cell = floor(origin.xz * 2.5 + 0.5);
	float r1 = hash(cell), r2 = hash(cell + 17.3), r3 = hash(cell + 41.7);
	vec2 wxz = (cell + vec2(r1, r2) - 0.5) / 2.5;
	// les sommets du relief tombent au centre des pixels de la carte
	vec2 uv = ((wxz + world_size * 0.5) / world_size * (res - 1.0) + 0.5) / res;
	float ground = texture(heightmap, uv).r;
	float density = texture(mask, uv).g;

	vec3 cam = (INV_VIEW_MATRIX * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
	float fade = 1.0 - smoothstep(fade_radius * 0.6, fade_radius, distance(cam.xz, wxz));
	// les champs : là où le bruit monte, les fleurs l'emportent sur l'herbe
	float field = smoothstep(0.62, 0.8, vnoise(wxz * 0.018) * 0.7 + vnoise(wxz * 0.07) * 0.3);
	flower = smoothstep(0.35, 0.65, vnoise(wxz * 0.006 + 31.0));
	lily = max(step(0.985, hash(cell + 5.5)), step(1.0 - field * 0.55, hash(cell + 5.5))) * step(0.4, density);
	// les susuki dépassent tout le reste ; les lys se dressent un peu
	float tall = 1.0 + lily * (0.2 + 0.9 * step(0.3, flower) * step(flower, 0.7));
	float h = mix(0.45, 1.15, r3) * step(r1 * 0.85, density) * fade * tall;

	float ang = r2 * 6.2831;
	vec3 v = VERTEX;
	v.xz = mat2(vec2(cos(ang), -sin(ang)), vec2(sin(ang), cos(ang))) * v.xz;
	v.y *= h;
	tip = VERTEX.y;
	// le vent : des vagues qui courent dans sa direction, plus fortes pendant les rafales
	float gust = wind.z;
	float wave = sin(dot(wxz, wind.xy) * 0.21 - TIME * (1.6 + gust * 1.4)) * 0.5 + 0.5;
	float flutter = sin(TIME * 3.1 + wxz.x * 0.9 + wxz.y * 0.4) * (0.12 + gust * 0.1);
	float bend = (0.12 + gust * 0.75) * (0.35 + wave * 0.65);
	v.x += (wind.x * bend + wind.y * flutter) * tip * tip * 0.55 * h;
	v.z += (wind.y * bend - wind.x * flutter) * tip * tip * 0.55 * h;
	shade = r3;

	vec3 world = vec3(wxz.x, ground, wxz.y) + v;
	VERTEX = (inverse(MODEL_MATRIX) * vec4(world, 1.0)).xyz;
	NORMAL = (inverse(MODEL_MATRIX) * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
}

void fragment() {
	vec3 base = vec3(0.045, 0.055, 0.025);
	vec3 top = mix(vec3(0.15, 0.19, 0.07), vec3(0.24, 0.2, 0.08), shade);
	vec3 col = mix(base, top, tip);
	vec3 red = mix(vec3(0.25, 0.02, 0.02), vec3(1.1, 0.06, 0.04), smoothstep(0.6, 1.0, tip));
	vec3 white = mix(vec3(0.3, 0.27, 0.18), vec3(0.95, 0.9, 0.78), smoothstep(0.45, 1.0, tip));
	vec3 yellow = mix(vec3(0.2, 0.18, 0.05), vec3(1.0, 0.78, 0.12), smoothstep(0.6, 1.0, tip));
	vec3 bloom = flower < 0.3 ? red : (flower < 0.7 ? white : yellow);
	col = mix(col, bloom, lily);
	ALBEDO = col * mix(1.0, 0.7, wetness);
	EMISSION = lily * bloom * smoothstep(0.75, 1.0, tip) * (flower < 0.3 ? 0.6 : 0.12);
	ROUGHNESS = mix(0.8, 0.35, wetness);
	BACKLIGHT = vec3(0.1, 0.05, 0.03) * tip;
}
