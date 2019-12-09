#ifdef GL_ES
precision lowp float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

uniform float u_grayscale;

void main()
{
    vec4 col = texture2D(CC_Texture0, v_texCoord) * v_fragmentColor;
    
    float grayVal = dot(col.rgb, vec3(0.299, 0.587, 0.114)) * 0.5 + 0.5;
    vec4 grayCol = vec4(vec3(grayVal * col.a), col.a);
//    grayCol = grayCol * 0.5 + 0.5;
    
    gl_FragColor = mix(col, grayCol, u_grayscale);
}