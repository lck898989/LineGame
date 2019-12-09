#ifdef GL_ES
precision highp float;
#endif

attribute vec4 a_position;
// #ifdef GL_ES
// attribute highp vec2 a_texCoord;
// varying lowp vec4 v_color;

// const lowp vec3 col1 = vec3(212./255., 52./255., 98./255.);   //蓝色
// const lowp vec3 col2 = vec3(239./255., 108./255., 129./255.); //红色
// const lowp vec3 col3 = vec3(255./255., 152./255., 84./255.);  //黄色
// const lowp vec3 col4 = vec3(125./255., 53./255., 179./255.);  //紫色
// #else
attribute vec2 a_texCoord;
varying vec4 v_color;
varying vec2 v_texCoord;

// Set1
// const vec3 col1 = vec3(3./255., 27./255., 121./255.);   //蓝色
// const vec3 col2 = vec3(21./255., 51./255., 176./255.); //红色
// const vec3 col3 = vec3(99./255., 182./255., 216./255.);  //黄色
// const vec3 col4 = vec3(52./255., 142./255., 185./255.);  //紫色

// const vec3 col3 = vec3(115./255., 45./255., 206./255.);   //蓝色
// const vec3 col2 = vec3(54./255., 48./255., 193./255.); //红色
// const vec3 col1 = vec3(66./255., 161./255., 219./255.);  //黄色
// const vec3 col4 = vec3(167./255., 65./255., 213./255.);  //紫色

// Set 2
// const vec3 col3 = vec3(66./255., 159./255., 219./255.);   //蓝色
// const vec3 col4 = vec3(152./255., 223./255., 200./255.); //红色
// const vec3 col1 = vec3(92./255., 159./255., 204./255.);  //黄色
// const vec3 col2 = vec3(212./255., 152./255., 226./255.);  //紫色

// const vec3 col3 = vec3(60./255., 154./255., 208./255.);   //蓝色
// const vec3 col4 = vec3(83./255., 169./255., 205./255.); //红色
// const vec3 col1 = vec3(117./255., 65./255., 207./255.);  //黄色
// const vec3 col2 = vec3(60./255., 85./255., 207./255.);  //紫色


// Test Set
// const vec3 col1 = vec3(56./255., 24./255., 135./255.);   //蓝色
// const vec3 col2 = vec3(55./255., 107./255., 213./255.); //红色
// const vec3 col3 = vec3(104./255., 56./255., 145./255.);  //黄色
// const vec3 col4 = vec3(128./255., 56./255., 146./255.);  //紫色

// Chai Set 0
// const vec3 col1 = vec3(219./255., 110./255., 251./255.);   //蓝色
// const vec3 col2 = vec3(45./255., 197./255., 254./255.); //红色
// const vec3 col3 = vec3(124./255., 72./255., 217./255.);  //黄色
// const vec3 col4 = vec3(128./255., 121./255., 255./255.);  //紫色

// Chai Set 1   綠的那個
// const vec3 col1 = vec3(90./255., 59./255., 253./255.);   //蓝色
// const vec3 col2 = vec3(52./255., 146./255., 255./255.); //红色
// const vec3 col3 = vec3(118./255., 105./255., 253./255.);  //黄色
// const vec3 col4 = vec3(20./255., 205./255., 244./255.);  //紫色

// Chai Set 2
// const vec3 col3 = vec3(109./255., 55./255., 252./255.);   //蓝色
// const vec3 col1 = vec3(66./255., 112./255., 250./255.); //红色
// const vec3 col2 = vec3(106./255., 33./255., 250./255.);  //黄色
// const vec3 col4 = vec3(45./255., 80./255., 255./255.);  //紫色

// Chai Set 3
// const vec3 col1 = vec3(110./255., 112./255., 255./255.);   //蓝色
// const vec3 col2 = vec3(129./255., 76./255., 246./255.); //红色
// const vec3 col3 = vec3(178./255., 44./255., 249./255.);  //黄色
// const vec3 col4 = vec3(116./255., 44./255., 249./255.);  //紫色

// Chai Set 4
// const vec3 col3 = vec3(185./255., 58./255., 233./255.);   //蓝色
// const vec3 col2 = vec3(20./255., 160./255., 252./255.); //红色
// const vec3 col1 = vec3(60./255., 67./255., 244./255.);  //黄色
// const vec3 col4 = vec3(92./255., 37./255., 222./255.);  //紫色

// Chai Set 5   有時候紫
// const vec3 col1 = vec3(81./255., 45./255., 203./255.);   //蓝色
// const vec3 col2 = vec3(193./255., 69./255., 251./255.); //红色
// const vec3 col3 = vec3(78./255., 59./255., 241./255.);  //黄色
// const vec3 col4 = vec3(25./255., 142./255., 250./255.);  //紫色

// Chai Set 6
// const vec3 col1 = vec3(177./255., 44./255., 247./255.);   //蓝色
// const vec3 col2 = vec3(128./255., 81./255., 255./255.); //红色
// const vec3 col3 = vec3(19./255., 214./255., 230./255.);  //黄色
// const vec3 col4 = vec3(135./255., 58./255., 243./255.);  //紫色

// Chai Set 7
// const vec3 col1 = vec3(3./255., 246./255., 235./255.);   //蓝色
// const vec3 col2 = vec3(7./255., 122./255., 254./255.); //红色
// const vec3 col3 = vec3(84./255., 100./255., 254./255.);  //黄色
// const vec3 col4 = vec3(127./255., 92./255., 254./255.);  //紫色

// Chai Set 8
// const vec3 col1 = vec3(0./255., 246./255., 246./255.);   //蓝色
// const vec3 col2 = vec3(56./255., 162./255., 254./255.); //红色
// const vec3 col3 = vec3(65./255., 112./255., 255./255.);  //黄色
// const vec3 col4 = vec3(0./255., 101./255., 235./255.);  //紫色

// Chai Set 9
// const vec3 col1 = vec3(7./255., 216./255., 250./255.);   //蓝色
// const vec3 col2 = vec3(47./255., 106./255., 253./255.); //红色

// Chai Set 10      首頁
// const vec3 col1 = vec3(48./255., 209./255., 233./255.);   //蓝色
// const vec3 col2 = vec3(70./255., 102./255., 253./255.); //红色

// Chai Set 11
// const vec3 col1 = vec3(166./255., 215./255., 254./255.);   //蓝色
// const vec3 col2 = vec3(159./255., 156./255., 255./255.); //红色

// Chai Set 12
// const vec3 col1 = vec3(233./255., 166./255., 249./255.);   //蓝色
// const vec3 col2 = vec3(169./255., 219./255., 255./255.); //红色

// Chai Set 13
// const vec3 col1 = vec3(60./255., 186./255., 241./255.);   //蓝色
// const vec3 col2 = vec3(155./255., 231./255., 243./255.); //红色

// Chai Set 14
// const vec3 col1 = vec3(231./255., 180./255., 216./255.);   //蓝色
// const vec3 col2 = vec3(219./255., 124./255., 197./255.); //红色

// Chai Set 15
// const vec3 col1 = vec3(181./255., 156./255., 249./255.);   //蓝色
// const vec3 col2 = vec3(255./255., 190./255., 242./255.); //红色

// Chai Set 16
// const vec3 col1 = vec3(186./255., 85./255., 242./255.);   //蓝色
// const vec3 col2 = vec3(89./255., 178./255., 255./255.); //红色

// Chai Set 17
// const vec3 col1 = vec3(103./255., 115./255., 223./255.);   //蓝色
// const vec3 col2 = vec3(240./255., 133./255., 186./255.); //红色

// Chai Set 18
// const vec3 col1 = vec3(75./255., 234./255., 169./255.);   //蓝色
// const vec3 col2 = vec3(43./255., 161./255., 252./255.); //红色

// Chai Set 19
// const vec3 col1 = vec3(159./255., 114./255., 238./255.);   //蓝色
// const vec3 col2 = vec3(79./255., 168./255., 246./255.); //红色

// Chai Set 20
// const vec3 col1 = vec3(190./255., 135./255., 196./255.);   //蓝色
// const vec3 col2 = vec3(116./255., 112./255., 255./255.); //红色

// Chai Set 21
// const vec3 col1 = vec3(125./255., 194./255., 255./255.);   //蓝色
// const vec3 col2 = vec3(116./255., 112./255., 255./255.); //红色

// Chai Set 22      最舒服
// const vec3 col1 = vec3(105./255., 106./255., 241./255.);   //蓝色
// const vec3 col2 = vec3(72./255., 150./255., 238./255.); //红色

// Chai Set 23
// const vec3 col1 = vec3(108./255., 72./255., 214./255.);   //蓝色
// const vec3 col2 = vec3(52./255., 139./255., 246./255.); //红色

// Chai Set 24
// const vec3 col1 = vec3(6./255., 65./255., 188./255.);   //蓝色
// const vec3 col2 = vec3(12./255., 65./255., 189./255.); //红色

// Chai Set 25    深 像星空
// const vec3 col1 = vec3(42./255., 79./255., 174./255.);   //蓝色
// const vec3 col2 = vec3(36./255., 160./255., 255./255.); //红色

// Chai Set 26
// const vec3 col1 = vec3(64./255., 140./255., 231./255.);   //蓝色
// const vec3 col2 = vec3(87./255., 123./255., 227./255.); //红色

// Chai Set 27 
// const vec3 col1 = vec3(19./255., 58./255., 160./255.);   //蓝色
// const vec3 col2 = vec3(30./255., 115./255., 254./255.); //红色

// Chai Set 28   藍的
// const vec3 col1 = vec3(32./255., 133./255., 246./255.);   //蓝色
// const vec3 col2 = vec3(44./255., 185./255., 232./255.); //红色

// Chai Set 29
// const vec3 col1 = vec3(122./255., 126./255., 219./255.);   //蓝色
// const vec3 col2 = vec3(75./255., 171./255., 204./255.); //红色

// Chai Set 30 特別深
// const vec3 col1 = vec3(19./255., 63./255., 97./255.);   //蓝色
// const vec3 col2 = vec3(28./255., 149./255., 240./255.); //红色

// Chai Set 31
// const vec3 col1 = vec3(132./255., 112./255., 249./255.);   //蓝色
// const vec3 col2 = vec3(62./255., 105./255., 227./255.); //红色

// Chai Set 32  初始的
// const vec3 col1 = vec3(35./255., 133./255., 244./255.);   //蓝色
// const vec3 col2 = vec3(44./255., 184./255., 233./255.); //红色

// Chai Set 33  深色稍淺
// const vec3 col1 = vec3(36./255., 73./255., 175./255.);   //蓝色
// const vec3 col2 = vec3(29./255., 166./255., 255./255.); //红色

// Chai Set 34      首頁
//const vec3 col1 = vec3(69./255., 103./255., 247./255.);   //蓝色
//const vec3 col2 = vec3(34./255., 183./255., 248./255.); //红色

// Chai Set 35      首頁
const vec3 col1 = vec3(34./255., 168./255., 253./255.);   //蓝色
const vec3 col2 = vec3(42./255., 79./255., 233./255.); //红色

uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

// #endif

uniform mat4 u_parentTransform;

uniform vec2 u_waveSource[3];
uniform float u_modTime;


// #ifdef GL_ES
// highp float distanceSq(highp vec2 a, highp vec2 b)
// {
//     highp vec2 diff = a - b;
// #else
float distanceSq(vec2 a, vec2 b)
{
    vec2 diff = a - b;
// #endif
    return dot(diff, diff);
}

void main()
{
    // col3 *= 0.8;
    vec2 uv = a_texCoord * vec2(1., 1.5);
    
    float wavePower = 0.0;
    
    for(int i=0; i<3; i++)
    {
        vec2 src = u_waveSource[i];
// #ifdef GL_ES
//         highp float dist = distanceSq(src, uv) * 0.00333;
// #else
        float dist = distanceSq(src, uv) * 0.00333;
// #endif
        wavePower += sin((dist + u_modTime));
    }
    
    vec3 plasmaCol = vec3(
                          0.5 + 0.5 * sin(wavePower),
                          0.5 + 0.5 * cos(wavePower),
                          0.5 + 0.5 * sin(wavePower * 2.)
                          );
    
    vec3 cmixL = mix(col1, col2, plasmaCol.r);
    // vec3 cmixR = mix(col3, col4, plasmaCol.b);
    // vec3 cmixL = mix(u_color1, u_color2, plasmaCol.r);
    // vec3 cmixR = mix(u_color3, u_color4, plasmaCol.b);
    // vec3 col = mix(cmixL, cmixR, plasmaCol.g);
    
    // v_color = vec4(col1, 1.);
    v_color = vec4(cmixL, 1.);
    v_texCoord = a_texCoord;
    
    gl_Position = CC_PMatrix * u_parentTransform * a_position;
}
