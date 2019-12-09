
varying vec4 v_color;

uniform sampler2D u_texture0;
// uniform sampler2D u_texture1;

varying vec2 v_texCoord;



varying float v_light;
varying vec2 v_focus;

void main()
{
	vec3 bokehCol = texture2D(u_texture0, gl_PointCoord).rgb;
    float t = v_focus.x;
//    vec4 col = vec4(mix(bokehCol.g, bokehCol.r, v_focus));
    float lowert = min(t, 0.5) * 2.;
//    float col = mix(bokehCol.b, bokehCol.r, lowert) * ((1.-lowert) * 2.);
//    float fcol = mix(col, bokehCol.g, max(t * 2. - 1., 0.));
    float fcol = mix(mix(bokehCol.g, bokehCol.r, v_focus.y), bokehCol.b, v_focus.x);
    

    gl_FragColor = fcol * v_color * v_light;
    // gl_FragColor = texture2D(u_texture0, v_texCoord);
    // gl_FragColor = vec4(1., 0., 0., 1.);
}
