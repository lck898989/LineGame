varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
uniform sampler2D u_reflection;
uniform sampler2D u_reflection2;
uniform float u_crossfade;
uniform float u_minRefraction;
uniform vec2 u_pixel;
varying vec2 v_fragCoord;

void main()
{
    vec3 normal = texture2D(CC_Texture0, v_texCoord).rgb;
    float d = 0.;
    float x=normal.g;
    float y=normal.r;
    
    vec2 refraction = (vec2(x,y)-0.5)*2.0;
    vec2 refractionPos = v_fragCoord + (u_pixel*refraction*(u_minRefraction));
    
    vec3 tex=texture2D(u_reflection, refractionPos).rgb;
    tex=mix(tex, texture2D(u_reflection2,refractionPos).rgb, u_crossfade);
    // tex *= normal.b;

   gl_FragColor = v_fragmentColor.a * normal.b * vec4(tex, 1.);
    // gl_FragColor = texture2D(u_reflection,refractionPos);
}