// Une nuit pourpre, une lune rouge énorme, des étoiles froides.
shader_type sky;

uniform vec3 moon_dir = vec3(-0.45, 0.32, -0.83);
uniform vec3 moon_color : source_color = vec3(1.0, 0.24, 0.14);
// Le panorama peint (montagnes, nuages rouges), enroulé deux fois autour de l'horizon
uniform sampler2D pano : source_color, filter_linear_mipmap, repeat_enable;
uniform bool has_pano = false;

float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }

void sky() {
	vec3 d = EYEDIR;
	vec3 md = normalize(moon_dir);
	float h = d.y;
	vec3 zenith = vec3(0.012, 0.01, 0.025);
	vec3 horizon = vec3(0.16, 0.035, 0.045);
	vec3 col = mix(horizon, zenith, smoothstep(-0.02, 0.55, h));
	// sous l'horizon, la brume de la vallée
	col = mix(col, vec3(0.07, 0.025, 0.03), smoothstep(0.0, -0.2, h));

	if (has_pano) {
		// la bande peinte va de -22° à +43° au dessus de l'horizon
		float e = asin(clamp(h, -1.0, 1.0));
		float v = (tan(e) * 160.0 + 65.0) / 215.0;
		if (v > 0.0 && v < 1.0) {
			float u = atan(d.x, -d.z) / 6.2831853 * 2.0;
			vec3 p = texture(pano, vec2(u, 1.0 - v)).rgb * 0.8;
			float f = smoothstep(0.02, 0.3, v) * (1.0 - smoothstep(0.78, 1.0, v));
			col = mix(col, p, f);
		}
	}
	float c = dot(d, md);
	float disc = smoothstep(0.99935, 0.9995, c);
	// la face de la lune : quelques mers plus sombres
	vec3 local = d - md * c;
	float maria = smoothstep(0.4, 0.7, hash(floor(local * 900.0)) * 0.6 + 0.4 * sin(local.x * 700.0) * cos(local.y * 600.0));
	col += disc * moon_color * mix(5.5, 3.8, maria);
	col += pow(max(c, 0.0), 900.0) * moon_color * 1.8;
	col += pow(max(c, 0.0), 40.0) * moon_color * 0.35;
	col += pow(max(c, 0.0), 6.0) * vec3(0.12, 0.02, 0.02);

	if (!AT_CUBEMAP_PASS) {
		vec3 g = floor(d * 380.0);
		float s = hash(g);
		float star = step(0.9975, s) * smoothstep(0.0, 0.25, h) * (1.0 - disc);
		col += star * vec3(0.8, 0.85, 1.0) * (0.6 + 0.8 * hash(g + 3.1));
	}
	COLOR = col;
}
