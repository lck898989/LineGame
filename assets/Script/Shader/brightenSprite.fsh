#ifdef GL_ES
precision lowp float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform float u_brighten;


void main()
{
    vec4 col = texture2D(CC_Texture0, v_texCoord) * v_fragmentColor.a;    
    gl_FragColor = col;
    // gl_FragColor = vec4(1., 0., 0., 1.);
}