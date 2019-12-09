precision mediump float;

attribute vec4 a_position;
attribute highp vec2 a_texCoord;

varying lowp vec4 v_color;

uniform mat4 u_parentTransform;

uniform vec2 u_waveSource[3];
uniform float u_modTime;

const lowp vec3 col1 = vec3(212./255., 52./255., 98./255.);   //蓝色
const lowp vec3 col2 = vec3(239./255., 108./255., 129./255.); //红色
const lowp vec3 col3 = vec3(255./255., 152./255., 84./255.);  //黄色
const lowp vec3 col4 = vec3(125./255., 53./255., 179./255.);  //紫色

highp float distanceSq(highp vec2 a, highp vec2 b)
{
    highp vec2 diff = a - b;
    return dot(diff, diff);
}

void main()
{
    vec2 uv = a_texCoord * vec2(1., 1.5);
    
    float wavePower = 0.0;
    
    for(int i=0; i<3; i++)
    {
        vec2 src = u_waveSource[i];
        highp float dist = distanceSq(src, uv) * 0.00333;
        wavePower += sin((dist + u_modTime));
    }
    
    vec3 plasmaCol = vec3(
                          0.5 + 0.5 * sin(wavePower),
                          0.5 + 0.5 * cos(wavePower),
                          0.5 + 0.5 * sin(u_modTime)
                          );
    
    vec3 cmixL = mix(col1, col2, plasmaCol.r);
    vec3 cmixR = mix(col3, col4, plasmaCol.b);
    vec3 col = mix(cmixL, cmixR, plasmaCol.g);
    
    v_color = vec4(col, 1.);
    
    gl_Position = CC_PMatrix * u_parentTransform * a_position;
}