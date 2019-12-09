const int MAX_NUM_OF_TAPS = 3;
attribute vec4 a_position;

attribute vec2 a_texCoord;
varying vec4 v_color;

uniform mat4 u_MVPMatrix;
uniform vec3 u_tapPosArr[MAX_NUM_OF_TAPS];
uniform float u_scale;

varying vec2 v_texCoord;
varying float v_light;
varying float v_focus;

uniform float u_pulse;
uniform vec4 u_color;
uniform vec4 u_color2;

float cubicEaseInOut(float p)
{
    if(p < 0.5)
    {
        return 4. * p * p * p;
    }
    else
    {
        float f = ((2. * p) - 2.);
        return 0.5 * f * f * f + 1.;
    }
}

void main()
{
    // v_color = vec4(1., 0., 0., 1.);
    
    vec4 pos = a_position;

    gl_Position = u_MVPMatrix * pos;
    // float psize = 200000. / gl_Position.z;
    // float psize = 400000. / gl_Position.z;
    float psize = 200000. / gl_Position.z;
    
    // v_light = clamp(1. - gl_Position.z/1000.,0.3,1.);
    // v_light = sin(CC_Time.x * 10. + a_texCoord.x*20. + a_texCoord.y ) * 0.5 + 0.5;

    v_light = sin(CC_Time.x * 30. + a_texCoord.x*50. + a_texCoord.y * 80. ) * 0.5 + 0.5;
    v_light = (v_light * (a_texCoord.y)) * 0.8 + 0.2;
    v_light += u_pulse * 2.;
    v_light *= 1.5;
    // v_light *= 1.3;
    // v_light = v_light * 0.4 + 0.1;

    v_focus = sin(CC_Time.x * 10. + a_texCoord.x*8. + a_texCoord.y * 4.) * 0.5 + 0.5;
    v_focus = cubicEaseInOut(v_focus);
    v_focus *= 0.3;

    v_color = mix(vec4(16./255., 39./255., 136./255., 1.), 
        vec4(95./255., 175./255., 208./255., 1.), 
        sin(CC_Time.x * 20. + a_texCoord.x*13. + a_texCoord.y * 8.) * 0.5 + 0.5);       // Blue Bokeh
    // v_focus = min(0.6, v_focus);

    gl_PointSize = min(psize, 800.) * (1. + u_pulse * 1.7) * 0.3 * u_scale;
    v_texCoord = a_texCoord;
    // gl_Position = u_MVPMatrix * a_position;
}
