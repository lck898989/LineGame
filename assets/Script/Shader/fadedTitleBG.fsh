
#ifdef GL_ES
precision mediump float;
varying highp vec4 v_color;
#else
varying vec4 v_color;
#endif

uniform sampler2D u_texture0;
varying vec2 v_texCoord;

uniform vec4 u_nebulaT;

void main()
{
	vec3 col = v_color.rgb;
	// col = vec3(56./255., 24./255., 135./255.); 
	vec2 stc = v_texCoord;
	stc.x *= 0.6;
	// vec3 nebulaC = texture2D(u_texture0, stc * 1. - cos(CC_Time.x * 2.) * 0.2).rgb;
	// nebulaC *= texture2D(u_texture0, stc * 0.3 + sin(CC_Time.x * 1.) * 0.2).rgb;
	// col += nebulaC * 0.3;

	// vec3 nebulaC = texture2D(u_texture0, stc * 1. /* * (1. + sin(CC_Time.x * 2.) * 0.05) */+ vec2(CC_Time.x, CC_Time.x * 1.3) * 0.3).rgb;
	// nebulaC *= texture2D(u_texture0, stc * 1.6/* * (2. + sin(CC_Time.x * 3.) * 0.05) */+ vec2(CC_Time.x * 2., -CC_Time.x ) * 0.5).rgb;
	

	// vec3 nebulaC = texture2D(u_texture0, stc * 1. + fract(vec2(CC_Time.x, CC_Time.x * 1.3) * 0.3)).rgb;
	// nebulaC *= texture2D(u_texture0, stc * 1.6 + fract(vec2(CC_Time.x * 2., -CC_Time.x ) * 0.5)).rgb;

	vec3 nebulaC = texture2D(u_texture0, stc * 2. - u_nebulaT.xy).rgb;
	nebulaC *= texture2D(u_texture0, stc * 1. - u_nebulaT.xy).rgb;
	// col += nebulaC * 1.6 * v_texCoord.y;
	col += nebulaC * 1.5 * (v_texCoord.y * 0.8 + 0.2);
	// col = nebulaC;

    gl_FragColor = vec4(col, 1.);
    // gl_FragColor = vec4(0., 0., 0., 1.);
}
