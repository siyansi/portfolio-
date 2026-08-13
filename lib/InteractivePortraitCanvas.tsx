"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroCanvasProps {
  imageSrc: string;
  nextImageSrc?: string;
}

export function HeroCanvas({ imageSrc, nextImageSrc }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture1 = textureLoader.load(imageSrc);
    const texture2 = textureLoader.load(nextImageSrc || imageSrc);

    const uniforms = {
      u_texture1: { value: texture1 },
      u_texture2: { value: texture2 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_time: { value: 0 },
      u_scrollProgress: { value: 0 },
      u_rippleIntensity: { value: 0 },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D u_texture1;
      uniform sampler2D u_texture2;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_scrollProgress;
      uniform float u_rippleIntensity;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;

        // Fluid Water Ripple
        float dist = distance(uv, u_mouse);
        float wave = sin(dist * 30.0 - u_time * 3.5) * u_rippleIntensity * exp(-dist * 3.5);
        uv += vec2(wave * 0.025);

        // Pixel Dissolve Effect on Scroll
        float blocks = mix(600.0, 12.0, clamp(u_scrollProgress * 1.8, 0.0, 1.0));
        vec2 pixelatedUv = floor(uv * blocks) / blocks;
        vec2 finalUv = mix(uv, pixelatedUv, smoothstep(0.02, 0.75, u_scrollProgress));

        // Chromatic Aberration & Texture Blend
        float r = texture2D(u_texture1, finalUv + vec2(u_scrollProgress * 0.015, 0.0)).r;
        float g = texture2D(u_texture1, finalUv).g;
        float b = texture2D(u_texture1, finalUv - vec2(u_scrollProgress * 0.015, 0.0)).b;
        vec4 col1 = vec4(r, g, b, 1.0);

        vec4 col2 = texture2D(u_texture2, finalUv);
        vec4 finalColor = mix(col1, col2, smoothstep(0.15, 0.85, u_scrollProgress));

        // Fade dark overlay on heavy scroll
        finalColor.rgb *= (1.0 - u_scrollProgress * 0.4);

        gl_FragColor = finalColor;
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetRipple = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - e.clientY / window.innerHeight;
      uniforms.u_mouse.value.set(x, y);
      targetRipple = 1.0;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      uniforms.u_scrollProgress.value = progress;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const render = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      targetRipple *= 0.94;
      uniforms.u_rippleIntensity.value = THREE.MathUtils.lerp(
        uniforms.u_rippleIntensity.value,
        targetRipple,
        0.1
      );

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [imageSrc, nextImageSrc]);

  return <div ref={containerRef} className="fixed inset-0 -z-10 h-screen w-full overflow-hidden" />;
}