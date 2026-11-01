// Le mode Kurosawa : le noir et blanc des vieux films de sabre, contrasté,
// avec le grain de la pellicule et les coins assombris.
shader_type canvas_item;

uniform sampler2D screen : hint_screen_texture, filter_linear_mipmap;
uniform float grain = 0.07;

void fragment() {
	vec3 c = texture(screen, SCREEN_UV).rgb;
	float l = dot(c, vec3(0.299, 0.587, 0.114));
	l = smoothstep(0.015, 0.85, l);
	float n = fract(sin(dot(floor(SCREEN_UV * vec2(960.0, 540.0)) + floor(TIME * 24.0) * 17.0, vec2(12.9898, 78.233))) * 43758.5453);
	l += (n - 0.5) * grain;
	float v = 1.0 - smoothstep(0.45, 1.2, length((SCREEN_UV - 0.5) * vec2(1.4, 1.0)) * 1.5);
	COLOR = vec4(vec3(clamp(l, 0.0, 1.0) * mix(0.6, 1.0, v)), 1.0);
}
