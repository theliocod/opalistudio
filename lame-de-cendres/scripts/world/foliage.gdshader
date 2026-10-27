// Le feuillage : des cartes peintes (kie.ai), découpées par leur transparence,
// qui ondulent au vent et laissent passer la lune.
shader_type spatial;
render_mode cull_disabled, diffuse_burley;

uniform sampler2D leaves : source_color, filter_linear_mipmap_anisotropic, repeat_disable;
uniform vec3 tint = vec3(1.0);
uniform vec3 translucency : source_color = vec3(0.3, 0.06, 0.03);
uniform float sway = 0.12;
global uniform vec4 wind;

void vertex() {
	vec3 w = (MODEL_MATRIX * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
	float h = max(VERTEX.y - 2.5, 0.0);
	float t = TIME * (1.1 + wind.z * 1.2) + w.x * 0.13 + w.z * 0.09;
	float flutter = (sin(t) + sin(t * 2.3) * 0.3) * sway * h * 0.1;
	// les branches ploient dans le sens du vent, davantage pendant les rafales
	float lean = (0.2 + wind.z * 0.8) * (0.7 + 0.3 * sin(dot(w.xz, wind.xy) * 0.05 - TIME * 0.9)) * sway * h * 0.16;
	vec3 dir = (inverse(MODEL_MATRIX) * vec4(wind.x, 0.0, wind.y, 0.0)).xyz;
	VERTEX += dir * lean;
	VERTEX.x += flutter;
	VERTEX.z += cos(t * 0.8) * sway * h * 0.07;
}

void fragment() {
	vec4 c = texture(leaves, UV);
	ALBEDO = c.rgb * tint;
	ALPHA = c.a;
	ALPHA_SCISSOR_THRESHOLD = 0.42;
	ROUGHNESS = 1.0;
	SPECULAR = 0.08;
	BACKLIGHT = translucency * 0.6;
}
