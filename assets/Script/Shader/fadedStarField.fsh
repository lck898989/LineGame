
varying vec4 v_color;

uniform sampler2D u_texture0;
// uniform sampler2D u_texture1;

varying vec2 v_texCoord;



varying float v_light;
varying float v_focus;

void main()
{
	float bokehCol = texture2D(u_texture0, gl_PointCoord).r;
	// vec4 col = vec4(mix(bokehCol.g, bokehCol.r, v_focus));
	vec4 col = vec4(bokehCol);

    gl_FragColor = col * v_color * v_light;
    // gl_FragColor = texture2D(u_texture0, v_texCoord);
    // gl_FragColor = vec4(1., 0., 0., 1.);
}
