
#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform float u_time;

void main()
{
    vec2 uv = v_texCoord;
    float wave = sin(v_texCoord.x * 5. - u_time);
    uv.y += wave * 0.05 * smoothstep(0., 0.5, v_texCoord.x);
    vec4 col = texture2D(CC_Texture0, uv);
    wave = wave * 0.7 + 0.3;
//    col.rgb *= 1. + (wave) * 0.3 + smoothstep(0.95, 1., wave);
    col.rgb *= 1. + wave * 0.1;
    col.rgb += vec3(pow(max(wave, 0.), 4.) * 0.1 * col.a);
    
//    gl_FragColor = col * vec4(1., 0., 0., 1.);
    gl_FragColor = col;
}
