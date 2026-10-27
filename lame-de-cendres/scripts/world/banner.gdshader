// Une bannière nobori : la toile ondule et claque selon le vent du monde.
// Hōjō : trois écailles (mitsu-uroko) ; Akagane : la lune de l'Oni.
shader_type spatial;
render_mode cull_disabled, diffuse_burley;

uniform vec4 tint : source_color = vec4(0.85, 0.82, 0.78, 1.0);
global uniform vec4 wind;

float tri(vec2 p, vec2 a, float s) {
	// un triangle pointe en haut, centré en a, de côté s
	p -= a;
	p.y = -p.y;
	float k = sqrt(3.0);
	p.x = abs(p.x) - s * 0.5;
	p.y = p.y + s / k * 0.5;
	if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
	p.x -= clamp(p.x, -s, 0.0);
	return -length(p) * sign(p.y);
}

void vertex() {
	// UV.x : 0 au mât, 1 au bord libre ; UV.y : 0 en haut
	float free = UV.x;
	float g = wind.z;
	float w = sin(TIME * (3.0 + g * 6.0) - UV.x * 5.0 - UV.y * 1.5) * (0.04 + g * 0.16);
	w += sin(TIME * (7.0 + g * 4.0) - UV.x * 11.0) * 0.02 * g;
	VERTEX.z += w * free;
	VERTEX.x -= free * free * g * 0.04;
}

void fragment() {
	vec3 c = tint.rgb;
	vec2 p = vec2(UV.x, UV.y * 4.86);
	bool red_cloth = tint.r > tint.g * 2.0;
	vec3 ink = red_cloth ? vec3(0.03, 0.02, 0.02) : vec3(0.55, 0.06, 0.05);
	float m = 0.0;
	if (!red_cloth) {
		// trois écailles : deux en bas, une en haut
		float s = 0.32;
		m = max(m, step(tri(p, vec2(0.5, 0.62), s), 0.0));
		m = max(m, step(tri(p, vec2(0.32, 0.92), s), 0.0));
		m = max(m, step(tri(p, vec2(0.68, 0.92), s), 0.0));
	} else {
		// un croissant de lune
		float d0 = distance(p, vec2(0.5, 0.8));
		float d1 = distance(p, vec2(0.6, 0.72));
		m = step(d0, 0.26) * step(0.22, d1);
	}
	// une bande sombre en haut et en bas
	m = max(m, step(UV.y, 0.025) + step(0.975, UV.y));
	c = mix(c, ink, m);
	ALBEDO = c;
	ROUGHNESS = 0.92;
	SPECULAR = 0.15;
	BACKLIGHT = c * 0.35;
}
