import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMode } from '../context/ModeContext';

export const Hero3DCanvas: React.FC = () => {
  const { isHacker } = useMode();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Particle nodes count
    const particleCount = 48;
    const nodeCoords: THREE.Vector3[] = [];
    const primaryColor = isHacker ? 0xb7ff5a : 0x38bdf8;
    const secondaryColor = isHacker ? 0x8ae032 : 0x818cf8;

    // Generate random 3D points
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 34;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 16;
      nodeCoords.push(new THREE.Vector3(x, y, z));
    }

    // Node spheres
    nodeCoords.forEach((coord, i) => {
      const isKey = i % 5 === 0;
      const geo = new THREE.SphereGeometry(isKey ? 0.32 : 0.16, 12, 12);
      const mat = new THREE.MeshBasicMaterial({
        color: isKey ? primaryColor : secondaryColor,
        transparent: true,
        opacity: isKey ? 0.85 : 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(coord);
      group.add(mesh);
    });

    // Connecting lines between nearby points
    const linePositions: number[] = [];
    const maxDist = 7.5;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const d = nodeCoords[i].distanceTo(nodeCoords[j]);
        if (d < maxDist) {
          linePositions.push(
            nodeCoords[i].x, nodeCoords[i].y, nodeCoords[i].z,
            nodeCoords[j].x, nodeCoords[j].y, nodeCoords[j].z
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isHacker ? 0.2 : 0.14,
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    group.add(linesMesh);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.03;
      targetY += (mouseY - targetY) * 0.03;

      group.rotation.y = elapsedTime * 0.04 + targetX * 0.25;
      group.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1 - targetY * 0.2;
      group.position.y = Math.sin(elapsedTime * 0.3) * 0.4;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [isHacker]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-65 transition-opacity duration-700" 
      aria-hidden="true"
    />
  );
};
