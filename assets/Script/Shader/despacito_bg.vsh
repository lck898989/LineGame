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

uniform vec2 u_modTime;	// x: uv shift y: sin mod

//uniform float u_pulse;
const float PI = 3.141592;



void main()
{
    gl_Position = CC_PMatrix * a_position;
    v_fragmentColor = a_color;

    vec2 uv = (a_texCoord * 0.4) - u_modTime.x; //* (1. + u_pulse * 0.3)
    uv.y *= 1.5;
    float d = sin(uv.x * 10. + uv.y * 10. + u_modTime.y);
    uv.x += d * 0.1;
    uv.y += d * 0.05;

    // vec2 uv = a_texCoord * 0.04;
    // uv.y *= 10.;
    // float d = sin(a_texCoord.x * 3. + a_texCoord.y * 3. + CC_Time.x * 5.) * 0.2;
    // uv += vec2(d, d*0.5);
    

    v_texCoord = uv;
}
