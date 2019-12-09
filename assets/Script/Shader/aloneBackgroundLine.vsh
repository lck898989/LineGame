#ifdef GL_ES
precision mediump float;
#endif

attribute vec4 a_position;

attribute vec2 a_texCoord;
attribute vec4 a_color;
//varying vec2 v_stc1;
//varying vec2 v_stc2;
//varying float v_colMul;
uniform mat4 u_parentTransform;

varying vec2 v_texCoord;
//varying vec4 v_color;

varying vec2 v_offset;

//uniform vec2 u_waveSource[3];
//uniform float u_modTime;
//uniform vec4 u_nebulaT;

uniform mat4 u_MVPMatrix;

uniform float u_modT;
uniform float u_intensity;

void main()
{
//    vec2 stc = a_texCoord;
//    stc.x *= 0.6;
//    v_stc1 = stc * 2. - u_nebulaT.xy;
//    v_stc2 = stc - u_nebulaT.xy;
//    v_colMul = 1.5 * (a_texCoord.y * 0.8 + 0.2);
    
    v_offset.x = mod(u_modT + a_color.r * 5.0, 5.0) - 2.0;
    v_offset.y = a_texCoord.y * a_color.g * min(u_intensity + a_color.b, 1.);  // Color
//    v_offset.y = a_texCoord.y * a_color.g;
    
    v_texCoord = a_texCoord;
//    v_color = a_color;
    
    gl_Position = u_MVPMatrix * u_parentTransform * a_position;
}
