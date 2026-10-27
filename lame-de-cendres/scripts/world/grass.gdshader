// L'herbe : une grille de brins qui suit le joueur. Chaque brin se pose sur
// le relief, prend sa taille et sa couleur d'un hasard attaché à sa position
// dans le monde, et plie sous le vent. Les lys araignées rouges poussent ici et là.
shader_type spatial;
render_mode cull_disabled, diffuse_burley;

uniform sampler2D heightmap : filter_linear, repeat_disable;
uniform sampler2D mask : filter_linear, repeat_disable;
uniform float world_size = 512.0;
uniform float res = 257.0;
uniform float fade_radius = 38.0;

varying float tip;
varying float lily;
varying float shade;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

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
	lily = step(0.985, hash(cell + 5.5)) * step(0.4, density);
	float h = mix(0.45, 1.15, r3) * step(r1 * 0.85, density) * fade * (1.0 + lily * 0.2);

	float ang = r2 * 6.2831;
	vec3 v = VERTEX;
	v.xz = mat2(vec2(cos(ang), -sin(ang)), vec2(sin(ang), cos(ang))) * v.xz;
	v.y *= h;
	tip = VERTEX.y;
	float wind = sin(TIME * 1.7 + wxz.x * 0.25 + wxz.y * 0.18) * 0.5 + sin(TIME * 3.1 + wxz.x * 0.9) * 0.18;
	v.x += wind * tip * tip * 0.35 * h;
	v.z += wind * tip * tip * 0.18 * h;
	shade = r3;

	vec3 world = vec3(wxz.x, ground, wxz.y) + v;
	VERTEX = (inverse(MODEL_MATRIX) * vec4(world, 1.0)).xyz;
	NORMAL = (inverse(MODEL_MATRIX) * vec4(0.0, 1.0, 0.0, 0.0)).xyz;
}

void fragment() {
	vec3 base = vec3(0.04, 0.045, 0.025);
	vec3 top = mix(vec3(0.19, 0.17, 0.08), vec3(0.28, 0.19, 0.09), shade);
	vec3 col = mix(base, top, tip);
	vec3 red = mix(vec3(0.25, 0.02, 0.02), vec3(1.1, 0.06, 0.04), smoothstep(0.6, 1.0, tip));
	col = mix(col, red, lily);
	ALBEDO = col;
	EMISSION = lily * red * smoothstep(0.75, 1.0, tip) * 0.6;
	ROUGHNESS = 0.8;
	BACKLIGHT = vec3(0.25, 0.12, 0.06) * tip;
}
