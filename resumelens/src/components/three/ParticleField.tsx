"use client";
// src/components/three/ParticleField.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  count?: number;
}

export default function ParticleField({ count = 150 }: Props) {
  const mountRef = useRef<HTMLCanvasElement>(null);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── Scene / Camera ─────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 1000);
    camera.position.z = 6;

    // ── Particles ──────────────────────────────────────────────
    const positions  = new Float32Array(count * 3);
    const velocities: { vx: number; vy: number }[] = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities.push({
        vx: (Math.random() - 0.5) * 0.008,
        vy: (Math.random() - 0.5) * 0.008,
      });
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const ptMat = new THREE.PointsMaterial({
      color:          0x00e5ff,
      size:           0.055,
      transparent:    true,
      opacity:        0.5,
      sizeAttenuation:true,
    });

    scene.add(new THREE.Points(ptGeo, ptMat));

    // ── Connection lines ───────────────────────────────────────
    const lineMat = new THREE.LineBasicMaterial({
      color:       0x00e5ff,
      transparent: true,
      opacity:     0.06,
    });
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    // ── Mouse parallax ─────────────────────────────────────────
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / innerWidth  - 0.5) * 0.55;
      my = (e.clientY / innerHeight - 0.5) * 0.55;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Resize ─────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };
    window.addEventListener("resize", onResize);
    onResize();

    // ── Animate ────────────────────────────────────────────────
    let frame = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      frame++;

      // Move particles
      for (let i = 0; i < count; i++) {
        positions[i * 3]     += velocities[i].vx;
        positions[i * 3 + 1] += velocities[i].vy;
        if (Math.abs(positions[i * 3])     > 12) velocities[i].vx *= -1;
        if (Math.abs(positions[i * 3 + 1]) >  8) velocities[i].vy *= -1;
      }
      ptGeo.attributes.position.needsUpdate = true;

      // Rebuild lines every 50 frames
      if (frame % 50 === 0) {
        while (lineGroup.children.length) {
          const child = lineGroup.children[0] as THREE.Line;
          child.geometry.dispose();
          lineGroup.remove(child);
        }
        const THRESH = 4.2;
        for (let i = 0; i < count; i++) {
          for (let j = i + 1; j < count; j++) {
            const dx = positions[i*3]   - positions[j*3];
            const dy = positions[i*3+1] - positions[j*3+1];
            const dz = positions[i*3+2] - positions[j*3+2];
            if (Math.sqrt(dx*dx + dy*dy + dz*dz) < THRESH) {
              const geo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(positions[i*3],   positions[i*3+1],   positions[i*3+2]),
                new THREE.Vector3(positions[j*3],   positions[j*3+1],   positions[j*3+2]),
              ]);
              lineGroup.add(new THREE.Line(geo, lineMat));
            }
          }
        }
      }

      // Camera parallax
      camera.position.x += (mx - camera.position.x) * 0.02;
      camera.position.y += (-my - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize",    onResize);
      ptGeo.dispose();
      ptMat.dispose();
      renderer.dispose();
    };
  }, [count]);

  return (
    <canvas
      id="three-bg"
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.55 }}
    />
  );
}
