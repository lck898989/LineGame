

// #version 120

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
{
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    // First corner
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    
    // Other corners
    vec2 i1;
    //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
    //i1.y = 1.0 - i1.x;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    // x0 = x0 - 0.0 + 0.0 * C.xx ;
    // x1 = x0 - i1 + 1.0 * C.xx ;
    // x2 = x0 - 1.0 + 2.0 * C.xx ;
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    
    // Permutations
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                     + i.x + vec3(0.0, i1.x, 1.0 ));
    
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    
    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
    
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    
    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    
    // Compute final noise value at P
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

const int MAX_NUM_OF_TAPS = 3;
attribute vec4 a_position;

attribute vec2 a_texCoord;
varying vec4 v_color;

uniform mat4 u_MVPMatrix;
uniform vec3 u_tapPosArr[MAX_NUM_OF_TAPS];
uniform float u_scale;

varying vec2 v_texCoord;
varying float v_light;
varying vec2 v_focus;

uniform float u_alpha;

//uniform float u_pulse;
//uniform vec4 u_color;
//uniform vec4 u_color2;

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
    float n = snoise(vec2(a_texCoord.x * 20., CC_Time.x * 0.6)) * 150.;
    pos.x += n*5.;
    pos.y += n*2.;
    pos.z += n*10.;

    gl_Position = u_MVPMatrix * pos;
    // float psize = 200000. / gl_Position.z;
//    float psize = 300000. / gl_Position.z;
    float psize = 15000. / gl_Position.z;
    
    // v_light = clamp(1. - gl_Position.z/1000.,0.3,1.);
    // v_light = sin(CC_Time.x * 10. + a_texCoord.x*20. + a_texCoord.y ) * 0.5 + 0.5;

    v_light = sin(CC_Time.x * 10. + a_texCoord.x*50. + a_texCoord.y * 80. ) * 0.3 + 0.7;
    v_light = (v_light * (a_texCoord.y)) * 0.8 + 0.2;
//    v_light += u_pulse * 2.;
//     v_light *= 1.3;
    // v_light = v_light * 0.4 + 0.1;

    v_focus.x = sin(CC_Time.x * 10. + a_texCoord.x*8. + a_texCoord.y * 4.) * 0.5 + 0.5;
    v_focus.y = sin(CC_Time.x * 5. + a_texCoord.x*12. + a_texCoord.y * 7.) * 0.5 + 0.5;
    v_focus.x = cubicEaseInOut(v_focus.x);
//    v_focus *= 0.7;
//    v_focus = clamp(gl_Position.z / 15000., 0., 1.);

    v_color = mix(vec4(16./255., 39./255., 136./255., 1.), 
        vec4(95./255., 175./255., 208./255., 1.), 
        sin(CC_Time.x * 20. + a_texCoord.x*13. + a_texCoord.y * 8.) * 0.5 + 0.5) * u_alpha;       // Blue Bokeh
    // v_focus = min(0.6, v_focus);

//    gl_PointSize = min(psize * (1. + (1.-v_focus) * 0.2), 800.) * 2.7;
    gl_PointSize = min(psize * (1. + (1.-v_focus.x) * 1.7), 800.) * 1.7 * u_scale;
//    gl_PointSize = min(psize, 800.) * 2.2;
    gl_PointSize *= gl_PointSize;
    
//    v_focus = 1. - clamp(gl_PointSize / 400., 0., 1.);
    v_texCoord = a_texCoord;
    // gl_Position = u_MVPMatrix * a_position;
}
