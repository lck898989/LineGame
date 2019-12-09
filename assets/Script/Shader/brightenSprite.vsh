attribute vec4 a_position;
attribute vec2 a_texCoord;
attribute vec4 a_color;

#ifdef GL_ES
varying lowp vec4 v_fragmentColor;
varying mediump vec2 v_texCoord;
#else
varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
#endif
uniform mat4 u_matrix;

mat4 wtf;

void main()
{
	// wtf[0] = vec4(1.);
	// wtf[1] = vec4(1.);
	// wtf[2] = vec4(1.);
	// wtf[3] = vec4(1.);
	// wtf = mat4(1.);
    gl_Position = u_matrix * a_position;
    v_fragmentColor = a_color * 2.;
    v_texCoord = a_texCoord;
}