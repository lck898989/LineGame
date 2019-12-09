#ifdef GL_ES
precision highp float;
varying highp vec2 v_texCoord;
uniform mediump sampler2D u_waveTex;
uniform lowp vec4 u_b1b2tOffset;
uniform lowp vec2 u_b1tcMul;
uniform lowp vec2 u_wavetcMul;
uniform lowp float u_lptMul;
uniform lowp float u_fcolMul;
uniform lowp vec3 u_col1;
uniform lowp vec3 u_col2;
void main ()
{
    mediump vec2 waveTexCoord_1;
    lowp float l_2;
    mediump vec2 b2tc_3;
    mediump vec2 b1tc_4;
    highp vec2 tmpvar_5;
    tmpvar_5 = (v_texCoord * u_b1tcMul);
    b1tc_4 = tmpvar_5;
    b2tc_3.x = b1tc_4.x;
    b2tc_3.y = -(b1tc_4.y);
    mediump vec2 tmpvar_6;
    tmpvar_6 = (b1tc_4 + u_b1b2tOffset.xy);
    b1tc_4 = tmpvar_6;
    mediump vec2 tmpvar_7;
    tmpvar_7 = (b2tc_3 + u_b1b2tOffset.zw);
    b2tc_3 = tmpvar_7;
    lowp float tmpvar_8;
    tmpvar_8 = ((texture2D (CC_Texture0, tmpvar_6).x * texture2D (CC_Texture0, tmpvar_7).x) * 2.0);
    highp vec2 tmpvar_9;
    tmpvar_9 = ((v_texCoord * u_wavetcMul) + vec2(tmpvar_8));
    waveTexCoord_1 = tmpvar_9;
    mediump vec4 tmpvar_10;
    tmpvar_10 = texture2D (u_waveTex, waveTexCoord_1);
    mediump float tmpvar_11;
    tmpvar_11 = (tmpvar_8 + (tmpvar_10.x * u_lptMul));
    l_2 = tmpvar_11;
    lowp vec4 tmpvar_12;
    tmpvar_12.w = 1.0;
    tmpvar_12.xyz = mix (u_col2, u_col1, (l_2 * u_fcolMul));
    gl_FragColor = tmpvar_12;
}
#else
varying vec2 v_texCoord;
uniform sampler2D u_waveTex;
uniform vec4 u_b1b2tOffset;
uniform vec2 u_b1tcMul;
uniform vec2 u_wavetcMul;
uniform float u_lptMul;
uniform float u_fcolMul;
uniform vec3 u_col1;
uniform vec3 u_col2;
void main ()
{
    vec2 waveTexCoord_1;
    float l_2;
    vec2 b2tc_3;
    vec2 b1tc_4;
    vec2 tmpvar_5;
    tmpvar_5 = (v_texCoord * u_b1tcMul);
    b1tc_4 = tmpvar_5;
    b2tc_3.x = b1tc_4.x;
    b2tc_3.y = -(b1tc_4.y);
    vec2 tmpvar_6;
    tmpvar_6 = (b1tc_4 + u_b1b2tOffset.xy);
    b1tc_4 = tmpvar_6;
    vec2 tmpvar_7;
    tmpvar_7 = (b2tc_3 + u_b1b2tOffset.zw);
    b2tc_3 = tmpvar_7;
    float tmpvar_8;
    tmpvar_8 = ((texture2D (CC_Texture0, tmpvar_6).x * texture2D (CC_Texture0, tmpvar_7).x) * 2.0);
    vec2 tmpvar_9;
    tmpvar_9 = ((v_texCoord * u_wavetcMul) + vec2(tmpvar_8));
    waveTexCoord_1 = tmpvar_9;
    vec4 tmpvar_10;
    tmpvar_10 = texture2D (u_waveTex, waveTexCoord_1);
    float tmpvar_11;
    tmpvar_11 = (tmpvar_8 + (tmpvar_10.x * u_lptMul));
    l_2 = tmpvar_11;
    vec4 tmpvar_12;
    tmpvar_12.w = 1.0;
    tmpvar_12.xyz = mix (u_col2, u_col1, (l_2 * u_fcolMul));
    gl_FragColor = tmpvar_12;
}
#endif
