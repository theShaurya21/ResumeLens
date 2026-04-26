"use client";
// src/components/three/ScoreGlobe.tsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MatchTier } from "@/types";

const TIER_COLOR: Record<MatchTier, number> = {
  excellent: 0x00e676,
  good:      0x00e5ff,
  moderate:  0xffb300,
  low:       0xff1744,
};

interface Props {
  score: number;
  tier:  MatchTier;
  size?: number;
}

export default function ScoreGlobe({ score, tier, size = 200 }: Props) {
  const mountRef = useRef<HTMLCanvasElement>(null);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;

    const color = new THREE.Color(TIER_COLOR[tier]);

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── Scene / Camera ─────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 3.8;

    // ── Wireframe sphere ───────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(1.2, 20, 20);
    const wireMat   = new THREE.MeshBasicMaterial({
      color, wireframe: true, transparent: true, opacity: 0.11,
    });
    const sphere = new THREE.Mesh(sphereGeo, wireMat);
    scene.add(sphere);

    // ── Inner glow ─────────────────────────────────────────────
    const innerGeo = new THREE.SphereGeometry(1.18, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.04,
    });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    // ── Score arc ──────────────────────────────────────────────
    const arcAngle = (score / 100) * Math.PI * 2;
    const arcPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * arcAngle - Math.PI / 2;
      arcPts.push(new THREE.Vector3(Math.cos(t) * 1.45, Math.sin(t) * 1.45, 0));
    }
    const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPts);
    const arcMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 });
    scene.add(new THREE.Line(arcGeo, arcMat));

    // ── Track ring ─────────────────────────────────────────────
    const trackPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 120; i++) {
      const t = (i / 120) * Math.PI * 2 - Math.PI / 2;
      trackPts.push(new THREE.Vector3(Math.cos(t) * 1.45, Math.sin(t) * 1.45, 0));
    }
    const trackGeo = new THREE.BufferGeometry().setFromPoints(trackPts);
    const trackMat = new THREE.LineBasicMaterial({
      color: 0x1e2f55, transparent: true, opacity: 0.65,
    });
    scene.add(new THREE.LineLoop(trackGeo, trackMat));

    // ── Surface particles ──────────────────────────────────────
    const pN  = 60;
    const pPos = new Float32Array(pN * 3);
    for (let i = 0; i < pN; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pPos[i*3]   = 1.2 * Math.sin(phi) * Math.cos(theta);
      pPos[i*3+1] = 1.2 * Math.sin(phi) * Math.sin(theta);
      pPos[i*3+2] = 1.2 * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color, size: 0.04, transparent: true, opacity: 0.75,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // ── Light ──────────────────────────────────────────────────
    const dLight = new THREE.DirectionalLight(color, 0.55);
    dLight.position.set(3, 3, 3);
    scene.add(dLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    // ── Animate ────────────────────────────────────────────────
    const clock = new THREE.Clock();
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      sphere.rotation.y = t * 0.35;
      sphere.rotation.x = t * 0.12;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      [sphereGeo, innerGeo, arcGeo, trackGeo, pGeo].forEach((g) => g.dispose());
      [wireMat, innerMat, arcMat, trackMat, pMat].forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [score, tier, size]);

  return (
    <canvas
      ref={mountRef}
      width={size}
      height={size}
      style={{ display: "block" }}
    />
  );
}
