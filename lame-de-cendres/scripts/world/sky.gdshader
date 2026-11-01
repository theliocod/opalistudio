// Le ciel qui tourne avec les heures : le bleu du jour, l'or du couchant,
// puis la nuit pourpre, la lune rouge énorme et les étoiles froides.
shader_type sky;

uniform vec3 moon_dir = vec3(-0.45, 0.32, -0.83);
uniform vec3 moon_color : source_color = vec3(1.0, 0.24, 0.14);
uniform vec3 sun_dir = vec3(0.3, 0.2, 0.9);
uniform float day = 0.0;        // 0 : la nuit, 1 : le plein jour
uniform float golden = 0.0;     // l'heure dorée, au lever et au coucher
uniform float overcast = 0.0;   // la pluie : un ciel gris
// Les panoramas peints (montagnes, nuages), enroulés deux fois autour de l'horizon
uniform sampler2D pano : source_color, filter_linear_mipmap, repeat_enable;
uniform sampler2D pano_day : source_color, filter_linear_mipmap, repeat_enable;
uniform bool has_pano = false;
uniform bool has_pano_day = false;

float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453); }

void sky() {
	vec3 d = EYEDIR;
	vec3 md = normalize(moon_dir);
	vec3 sd = normalize(sun_dir);
	float h = d.y;
	// la nuit
	vec3 n_zenith = vec3(0.012, 0.01, 0.025);
	vec3 n_horizon = vec3(0.16, 0.035, 0.045);
	vec3 night = mix(n_horizon, n_zenith, smoothstep(-0.02, 0.55, h));
	night = mix(night, vec3(0.07, 0.025, 0.03), smoothstep(0.0, -0.2, h));
	// le jour, et l'or du soir qui monte de l'horizon du côté du soleil
	vec3 d_zenith = vec3(0.16, 0.3, 0.56);
	vec3 d_horizon = vec3(0.62, 0.7, 0.78);
	vec3 g_horizon = vec3(1.0, 0.62, 0.32);
	float toward = pow(max(dot(normalize(vec3(d.x, 0.0, d.z)), normalize(vec3(sd.x, 0.0, sd.z))), 0.0), 3.0);
	vec3 horizon = mix(d_horizon, g_horizon, golden * (0.45 + 0.55 * toward));
	vec3 zenith = mix(d_zenith, vec3(0.3, 0.32, 0.5), golden * 0.6);
	vec3 daysky = mix(horizon, zenith, smoothstep(-0.02, 0.6, h));
	daysky = mix(daysky, vec3(0.32, 0.33, 0.3), smoothstep(0.0, -0.25, h));
	daysky = mix(daysky, vec3(0.42, 0.44, 0.47), overcast);
	vec3 col = mix(night, daysky, day);

	if (has_pano || has_pano_day) {
		// la bande peinte va de -22° à +43° au dessus de l'horizon
		float e = asin(clamp(h, -1.0, 1.0));
		float v = (tan(e) * 160.0 + 65.0) / 215.0;
		if (v > 0.0 && v < 1.0) {
			float u = atan(d.x, -d.z) / 6.2831853 * 2.0;
			float f = smoothstep(0.02, 0.3, v) * (1.0 - smoothstep(0.78, 1.0, v));
			vec3 pn = has_pano ? texture(pano, vec2(u, 1.0 - v)).rgb * 0.8 : night;
			vec3 pd = has_pano_day ? texture(pano_day, vec2(u, 1.0 - v)).rgb : daysky;
			pd = mix(pd, pd * vec3(1.05, 0.88, 0.75), golden * 0.5);
			pd = mix(pd, vec3(dot(pd, vec3(0.33))) * 0.8, overcast * 0.7);
			col = mix(col, mix(pn, pd, day), f);
		}
	}
	// le soleil et son halo
	float cs = dot(d, sd);
	vec3 sun_col = mix(vec3(1.0, 0.95, 0.85), vec3(1.0, 0.55, 0.22), golden);
	col += smoothstep(0.9993, 0.9996, cs) * sun_col * 18.0 * day * (1.0 - overcast);
	col += pow(max(cs, 0.0), 260.0) * sun_col * 1.6 * day * (1.0 - overcast * 0.8);
	col += pow(max(cs, 0.0), 12.0) * sun_col * 0.25 * day * (0.4 + golden);
	// la lune rouge, qui pâlit le jour
	float c = dot(d, md);
	float disc = smoothstep(0.99935, 0.9995, c);
	vec3 local = d - md * c;
	float maria = smoothstep(0.4, 0.7, hash(floor(local * 900.0)) * 0.6 + 0.4 * sin(local.x * 700.0) * cos(local.y * 600.0));
	float night_k = 1.0 - day * 0.9;
	col += disc * moon_color * mix(5.5, 3.8, maria) * night_k;
	col += pow(max(c, 0.0), 900.0) * moon_color * 1.8 * night_k;
	col += pow(max(c, 0.0), 40.0) * moon_color * 0.35 * (1.0 - day);
	col += pow(max(c, 0.0), 6.0) * vec3(0.12, 0.02, 0.02) * (1.0 - day);

	if (!AT_CUBEMAP_PASS) {
		vec3 g = floor(d * 380.0);
		float s = hash(g);
		float star = step(0.9975, s) * smoothstep(0.0, 0.25, h) * (1.0 - disc) * (1.0 - smoothstep(0.0, 0.3, day));
		col += star * vec3(0.8, 0.85, 1.0) * (0.6 + 0.8 * hash(g + 3.1));
	}
	COLOR = col;
}
