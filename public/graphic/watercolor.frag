precision mediump float;

// The texture containing our rendered scene
uniform sampler2D uColorBuffer;

// The UV coordinates passed from the vertex shader
varying vec2 vUv0;

// Function to create a simple paper grain texture
float paperTexture(vec2 uv) {
    // Create a pseudo-random pattern based on UV coordinates
    float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    // Modulate the grain intensity
    grain = smoothstep(0.3, 0.7, grain);
    return grain;
}

void main(void) {
    // Sample the color from the scene texture at this fragment's UV coordinates
    vec4 sceneColor = texture2D(uColorBuffer, vUv0);

    // Apply a softening filter to mimic watercolor fluidity
    // Blend with neighboring pixels (basic blur)
    vec4 blurColor = vec4(0.0);
    float offset = 0.003; // Offset for neighboring pixels; adjust for blur amount
    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            blurColor += texture2D(uColorBuffer, vUv0 + vec2(x, y) * offset);
        }
    }
    blurColor /= 9.0;

    // Mix original color with blurred version
    vec4 mixedColor = mix(sceneColor, blurColor, 0.5);

    // Overlay the paper texture
    float grain = paperTexture(vUv0 * 10.0); // Tiling of the grain texture
    mixedColor.rgb += mixedColor.rgb * grain * 0.1; // Modulate to adjust intensity

    // Output the final color
    gl_FragColor = mixedColor;
}