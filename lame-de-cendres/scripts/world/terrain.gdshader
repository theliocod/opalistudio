// Le sol : herbe sombre, terre battue sur les chemins, roche sur les pentes,
// vase au bord du lac. Une texture procédurale casse l'uniformité.
shader_type spatial;
render_mode diffuse_burley;

uniform sampler2D mask : filter_linear, repeat_disable;
uniform sampler2D stone : source_color, filter_linear_mipmap_anisotropic, repeat_enable;
uniform sampler2D flags : source_color, filter_linear_mipmap_anisotropic, repeat_enable;
uniform sampler2D grass_tex : source_color, filter_linear_mipmap_anisotropic, repeat_enable;
uniform sampler2D dirt_tex : source_color, filter_linear_mipmap_anisotropic, repeat_enable;
uniform bool painted = false;
uniform float water_level = -1.2;

varying vec3 wpos;
varying vec3 wnrm;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
	vec2 i = floor(p), f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
	float v = 0.0, a = 0.5;
	for (int k = 0; k < 4; k++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; }
	return v;
}

void vertex() {
	wpos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
	wnrm = NORMAL;
}

void fragment() {
	vec4 mm = texture(mask, UV);
	vec3 m = mm.rgb;
	float n1 = fbm(wpos.xz * 0.08);
	float n2 = fbm(wpos.xz * 0.9);
	float slope = 1.0 - wnrm.y;

	vec3 grass = mix(vec3(0.075, 0.085, 0.05), vec3(0.15, 0.13, 0.065), n1);
	grass = mix(grass, vec3(0.2, 0.07, 0.05), smoothstep(0.62, 0.8, fbm(wpos.xz * 0.03)) * 0.5);
	vec3 dirt = mix(vec3(0.13, 0.095, 0.07), vec3(0.2, 0.15, 0.11), n2);
	if (painted) {
		// le sol peint, à deux échelles pour casser la répétition
		vec3 g1 = texture(grass_tex, wpos.xz * 0.11).rgb;
		vec3 g2 = texture(grass_tex, wpos.xz * 0.027 + 0.37).rgb;
		grass = mix(g1, g2, 0.35) * (0.75 + n1 * 0.5);
		dirt = mix(texture(dirt_tex, wpos.xz * 0.14).rgb, texture(dirt_tex, wpos.xz * 0.035).rgb, 0.3) * 0.9;
	}
	// la roche peinte, plaquée sur les trois axes pour ne pas s'étirer sur les pentes
	vec3 bw = pow(abs(wnrm), vec3(4.0)); bw /= bw.x + bw.y + bw.z;
	vec3 tri = texture(stone, wpos.zy * 0.12).rgb * bw.x + texture(stone, wpos.xz * 0.12).rgb * bw.y + texture(stone, wpos.xy * 0.12).rgb * bw.z;
	vec3 rock = tri * 0.75;
	vec3 plaza = texture(flags, wpos.xz * 0.16).rgb * 0.8;
	vec3 mud = vec3(0.06, 0.05, 0.045);

	vec3 col = mix(grass, dirt, smoothstep(0.15, 0.7, m.r + (n2 - 0.5) * 0.3));
	col = mix(col, rock, clamp(m.b * 1.2 + smoothstep(0.35, 0.6, slope), 0.0, 1.0));
	col = mix(col, mud, 1.0 - smoothstep(water_level - 0.2, water_level + 1.0, wpos.y));
	col = mix(col, plaza, smoothstep(0.35, 0.7, mm.a + (n2 - 0.5) * 0.25));
	// De la neige sale sur les sommets
	col = mix(col, vec3(0.55, 0.52, 0.55), smoothstep(48.0, 62.0, wpos.y + n1 * 8.0) * (1.0 - smoothstep(0.5, 0.7, slope)));

	ALBEDO = col * (0.85 + n2 * 0.3);
	ROUGHNESS = mix(0.95, 0.35, 1.0 - smoothstep(water_level, water_level + 0.8, wpos.y));
	SPECULAR = 0.3;
}
