import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

export default function AsciiApp() {
  const [text, setText] = useState('Hey!');
  const [color, setColor] = useState('#00ffcc');
  const [fontSize, setFontSize] = useState(14);

  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 500);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);

    // 2. ASCII Effect Setup
    const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { invert: true });
    effect.setSize(mount.clientWidth, mount.clientHeight);
    effect.domElement.style.color = color;
    effect.domElement.style.backgroundColor = 'black';

    mount.appendChild(effect.domElement);

    // 3. Create Text Texture/Mesh
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 258;

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geometry = new THREE.PlaneGeometry(300, 150);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Update canvas function
    const updateCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `Bold ${fontSize * 4}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text || ' ', canvas.width / 2, canvas.height / 2);
      texture.needsUpdate = true;
      effect.domElement.style.color = color;
    };

    updateCanvas();

    // 4. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.005;
      effect.render(scene, camera);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      effect.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on Unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(effect.domElement)) {
        mount.removeChild(effect.domElement);
      }
    };
  }, [text, color, fontSize]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000', overflow: 'hidden' }}>
      {/* --- Control Panel --- */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          background: 'rgba(20, 20, 20, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '16px',
          borderRadius: '12px',
          color: '#fff',
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '16px' }}>⚙️ ASCII Controls</h3>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Text Input:
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #444',
              background: '#111',
              color: '#fff',
            }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
          Text Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', width: '32px', height: '32px' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
          Font Size ({fontSize}px):
          <input
            type="range"
            min="8"
            max="32"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </label>
      </div>

      {/* --- 3D ASCII Canvas Container --- */}
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}