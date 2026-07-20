import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';

export default function AsciiApp() {
  // 1. Controls State
  const [text, setText] = useState('Hey!');
  const [color, setColor] = useState('#ff9900');
  const [fontSize, setFontSize] = useState(14);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000' }}>
      
      {/* 2. HTML UI Overlay (OUTSIDE Canvas) */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, background: '#111', padding: 15, borderRadius: 8, color: '#fff' }}>
        <h3>⚙️ ASCII Controls</h3>
        <label>
          Text Input:
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <br /><br />
        <label>
          Text Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
      </div>

      {/* 3. Three.js Scene (INSIDE Canvas) */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        
        <Center>
          {/* 👇 PUT THE CODE RIGHT HERE INSIDE THE CANVAS / SCENE 👇 */}
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json" // Path to your 3D font JSON file
            scale={fontSize / 10}
            height={0.2}
            curveSegments={12}
          >
            {text || ' '}
            <meshStandardMaterial color={color} />
          </Text3D>
        </Center>
      </Canvas>
    </div>
  );
}