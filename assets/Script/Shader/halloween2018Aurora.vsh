attribute vec4 a_position;
attribute vec2 a_texCoord;
// attribute vec4 a_color;

#ifdef GL_ES
// varying lowp vec4 v_fragmentColor;
varying mediump vec2 v_texCoord;
#else
// varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
#endif

varying vec2 v_colorUV;

uniform vec2 u_offset;

void main()
{
    vec2 texCoord = a_texCoord;

    v_texCoord = texCoord;
    v_colorUV = texCoord + u_offset;
    
    gl_Position = CC_PMatrix * a_position;
}
