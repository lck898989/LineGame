
#ifdef GL_ES
precision mediump float;
// varying lowp vec4 v_color;
#else
// varying vec4 v_color;
#endif

uniform sampler2D u_texture0;
//varying vec2 v_stc1;
//varying vec2 v_stc2;
//varying float v_colMul;
//varying vec4 v_color;

varying vec2 v_texCoord;

//const vec3 NEBULA_COL = vec3(38./255., 168./255., 255./255.);


varying vec2 v_offset;

//float QuarticEaseOut(float p)
//{
//    float f = (p - 1.);
//    return f * f * f * (1. - p) + 1.;
//}

void main()
{
//    vec3 nebulaC = texture2D(u_texture0, v_stc1).rgb;
//	nebulaC *= texture2D(u_texture0, v_stc2).rgb;
//	vec3 col = nebulaC * v_colMul;
    vec2 tc = v_texCoord;
//    float offset = mod(u_modT + v_color.r * 5.0, 5.0) - 2.0;
//    float offset = v_offset.x;
    tc.y -= v_offset.x;
    
    float col = texture2D(u_texture0, tc).r * v_offset.y;

//    gl_FragColor = vec4(v_texCoord.y);
//    gl_FragColor = v_color;
    gl_FragColor = vec4(col * 0.45);
}
