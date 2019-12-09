#ifdef GL_ES
precision lowp float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

//uniform float u_progress;
uniform sampler2D u_highlightTex;

void main()
{
    vec4 col = texture2D(CC_Texture0, v_texCoord);
    vec4 col2 = texture2D(u_highlightTex, v_texCoord);
    
    float t = max(sign(v_fragmentColor.a - v_texCoord.x), 0.0);
    vec4 tcol = mix(col, col2, t);
    
    gl_FragColor = tcol;
}
