varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
uniform sampler2D u_colorTex;
uniform vec2 u_alphaSin;
varying vec2 v_colorUV;

void main()
{
    vec2 ctc = v_texCoord;
    float ctcy = sin(ctc.x * 8. + u_alphaSin.y * 2.) * 0.03;
    float ctcx = sin(ctc.y * 2. + u_alphaSin.y) * 0.02;
    ctc.y += ctcy;
    ctc.x += ctcx; 
    float l = texture2D(CC_Texture0, ctc).r * u_alphaSin.x * (ctcy * 0.4 + 0.6);
    vec3 col = texture2D(u_colorTex, v_colorUV).rgb * l;

    gl_FragColor = vec4(col, l);
}
