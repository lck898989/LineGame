#ifdef GL_ES
precision mediump float;
#endif

attribute vec4 a_position;

attribute vec2 a_texCoord;
varying vec2 v_stc1;
varying vec2 v_stc2;
varying float v_colMul;
uniform mat4 u_parentTransform;

uniform vec2 u_waveSource[3];
uniform float u_modTime;
uniform vec4 u_nebulaT;

void main()
{
    vec2 stc = a_texCoord;
    stc.x *= 0.6;
    v_stc1 = stc * 2. - u_nebulaT.xy;
    v_stc2 = stc - u_nebulaT.xy;
    v_colMul = 1.5 * (a_texCoord.y * 0.8 + 0.2);
    
    gl_Position = CC_PMatrix * u_parentTransform * a_position;
}
