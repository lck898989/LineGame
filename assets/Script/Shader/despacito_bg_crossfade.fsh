#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform float u_fade;
// uniform float u_pulse;


void main()
{
    vec4 col2 = texture2D(CC_Texture1, v_texCoord);
    vec4 col = texture2D(CC_Texture0, v_texCoord);
    vec4 fcol = mix(col, col2, u_fade);
    // fcol.r *= (1. + u_pulse * 0.2);
    // gl_FragColor = col * v_fragmentColor * mask;
//    gl_FragColor = fcol * vec4(0., u_fade, 1., 1.);
    gl_FragColor = fcol;
    // gl_FragColor = vec4(1., 0., 0., 1.);
}
