
#ifdef GL_ES
precision mediump float;
// varying lowp vec4 v_color;
#else
// varying vec4 v_color;
#endif

uniform sampler2D u_texture0;
varying vec2 v_stc1;
varying vec2 v_stc2;
varying float v_colMul;

const vec3 NEBULA_COL = vec3(38./255., 168./255., 255./255.);

void main()
{
//    vec3 nebulaC = texture2D(u_texture0, v_stc1).rgb;
//	nebulaC *= texture2D(u_texture0, v_stc2).rgb;
//	vec3 col = nebulaC * v_colMul;
    
    float nebulaC = texture2D(u_texture0, v_stc1).r;
    nebulaC *= texture2D(u_texture0, v_stc2).r;
    nebulaC *= v_colMul;

    gl_FragColor = vec4((NEBULA_COL * nebulaC), 1.);
}
