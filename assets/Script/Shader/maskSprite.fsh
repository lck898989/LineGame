#ifdef GL_ES
precision lowp float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
uniform sampler2D u_mask;

void main()
{
	float mask = texture2D(u_mask, v_texCoord).r;
    vec4 col = texture2D(CC_Texture0, v_texCoord);
    
    gl_FragColor = col * v_fragmentColor * mask;
}
