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

varying vec2 v_fragCoord;
uniform vec2 u_resolution;
uniform float u_brighten;

void main()
{
    vec2 texCoord = a_texCoord;
    v_texCoord = texCoord;
    
    vec4 pos = a_position;
    v_fragCoord = vec2(pos.x, u_resolution.y-pos.y)/u_resolution;
    gl_Position = CC_PMatrix * pos;
    v_fragmentColor = a_color * u_brighten;
}
