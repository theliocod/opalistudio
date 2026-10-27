// La carte : la vallée peinte à l'encre sur un papier washi, directement à
// partir du relief. Ombrage des collines, courbes de niveau, lavis sur les
// montagnes, lac à l'indigo, chemins au vermillon, et un brouillard qui ne
// se lève que là où l'on est passé.
shader_type canvas_item;

uniform sampler2D heightmap : filter_linear, repeat_disable;
uniform sampler2D mask : filter_linear, repeat_disable;
uniform sampler2D fog : filter_linear, repeat_disable;
uniform sampler2D paper : source_color, filter_linear_mipmap, repeat_enable;
uniform float res = 257.0;
uniform float world_size = 512.0;
uniform float water_level = -1.2;
uniform vec2 center = vec2(0.5);
uniform float zoom = 1.0;

const vec3 INK = vec3(0.1, 0.075, 0.065);
const vec3 VERMILION = vec3(0.62, 0.16, 0.1);
const vec3 INDIGO = vec3(0.2, 0.27, 0.36);

float hgt(vec2 uv) { return texture(heightmap, (uv * (res - 1.0) + 0.5) / res).r; }
vec4 msk(vec2 uv) { return texture(mask, (uv * (res - 1.0) + 0.5) / res); }

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
	vec2 i = floor(p), f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
	float v = 0.0, a = 0.5;
	for (int k = 0; k < 4; k++) { v += a * noise(p); p *= 2.07; a *= 0.5; }
	return v;
}

// un trait d'encre d'épaisseur constante à l'écran, sur une valeur qui varie
float iso(float v, float width) {
	float d = abs(fract(v + 0.5) - 0.5);
	return 1.0 - smoothstep(0.0, fwidth(v) * width, d);
}

void fragment() {
	vec2 uv = center + (UV - 0.5) / zoom;
	vec3 pap = texture(paper, uv * 2.5).rgb * vec3(1.02, 1.0, 0.96);
	if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) {
		COLOR = vec4(pap * 0.82, 1.0);
	} else {
		float cell = world_size / (res - 1.0);
		float e = 1.0 / (res - 1.0);
		float h = hgt(uv);
		float hx = hgt(uv + vec2(e, 0.0)) - hgt(uv - vec2(e, 0.0));
		float hz = hgt(uv + vec2(0.0, e)) - hgt(uv - vec2(0.0, e));
		vec3 n = normalize(vec3(-hx, 2.0 * cell, -hz));
		float shade = clamp(dot(n, normalize(vec3(-1.0, 1.3, -1.0))), 0.0, 1.0);
		float slope = 1.0 - n.y;
		vec4 m = msk(uv);
		float grain = fbm(uv * 90.0);

		// la terre : le papier, ombré par le relief
		vec3 col = pap * (0.72 + 0.32 * shade);
		// le lavis d'encre des montagnes, plus sombre côté ombre
		float mount = smoothstep(22.0, 58.0, h) * (0.55 + 0.45 * fbm(uv * 14.0));
		col = mix(col, INK * 1.6, mount * (0.55 - 0.35 * shade));
		col = mix(col, INK * 2.2, smoothstep(0.35, 0.75, slope) * 0.35);
		// la roche : des hachures
		float hatch = step(0.62, fract((uv.x + uv.y) * world_size * 0.45));
		col = mix(col, INK * 2.0, smoothstep(0.4, 0.7, m.b) * hatch * 0.35);
		// les courbes de niveau, tous les 4 m, plus marquées tous les 20 m
		float minor = iso(h / 4.0, 0.9) * 0.18;
		float major = iso(h / 20.0, 1.3) * 0.42;
		col = mix(col, INK, max(minor, major) * (h > water_level ? 1.0 : 0.0));
		// les places dallées
		col = mix(col, vec3(0.78, 0.69, 0.55) * (0.9 + grain * 0.15), smoothstep(0.35, 0.7, m.a) * 0.6);
		// l'eau : un lavis indigo, et des rides le long des rives
		if (h < water_level) {
			float depth = water_level - h;
			col = mix(pap * 0.95, INDIGO, clamp(0.35 + depth * 0.12, 0.0, 0.8));
			float ripple = iso(depth * 0.7, 1.0) * (1.0 - smoothstep(0.5, 3.5, depth));
			col = mix(col, INDIGO * 0.5, ripple * 0.6);
		}
		float shore = 1.0 - smoothstep(0.0, fwidth(h) * 1.4, abs(h - water_level));
		col = mix(col, INDIGO * 0.45, shore * 0.85);
		col *= 0.94 + grain * 0.1;

		// le brouillard : seul ce que l'on a parcouru est dessiné
		float f = texture(fog, uv).r + (fbm(uv * 30.0) - 0.5) * 0.35;
		float seen = smoothstep(0.4, 0.62, f);
		float cloud = fbm(uv * 7.0 + vec2(TIME * 0.004, 0.0));
		vec3 unknown = pap * (0.86 + 0.08 * smoothstep(0.45, 0.75, cloud));
		unknown = mix(unknown, INK * 3.0, iso(cloud * 6.0, 0.8) * 0.06);
		col = mix(unknown, col, seen);
		// un liseré d'encre au bord du brouillard, comme un coup de pinceau
		col = mix(col, INK * 2.5, (1.0 - abs(seen - 0.5) * 2.0) * 0.18);
		COLOR = vec4(col, 1.0);
	}
}
