// Le lac : une eau noire et lisse, qui ne renvoie que la lune et la brume.
shader_type spatial;
render_mode diffuse_burley;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
	vec2 i = floor(p), f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

varying vec3 wpos;
void vertex() { wpos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz; }

void fragment() {
	vec2 p = wpos.xz * 0.35;
	float a = vnoise(p + TIME * 0.25), b = vnoise(p * 1.7 - TIME * 0.18);
	vec3 n = normalize(vec3((a - 0.5) * 0.35, 1.0, (b - 0.5) * 0.35));
	NORMAL = (VIEW_MATRIX * vec4(n, 0.0)).xyz;
	ALBEDO = vec3(0.01, 0.012, 0.018);
	METALLIC = 0.0;
	ROUGHNESS = 0.04;
	SPECULAR = 0.9;
	float fres = pow(1.0 - clamp(dot(NORMAL, VIEW), 0.0, 1.0), 4.0);
	EMISSION = vec3(0.09, 0.02, 0.025) * fres;
}
