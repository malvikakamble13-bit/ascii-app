import React, { useState } from 'react';

export default function AsciiCanvas() {
  const [text, setText] = useState('Hey!');
  const [color, setColor] = useState('#00ffcc');
  const [fontSize, setFontSize] = useState(14);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#000' }}>
      {/* --- Control Panel Overlay --- */}
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
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '16px' }}>⚙️ ASCII Controls</h3>

        {/* Text Input */}
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

        {/* Color Picker */}
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
          Text Color:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', width: '32px', height: '32px' }}
          />
        </label>

        {/* Font Size Slider */}
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

      {/* --- Render your 3D ASCII canvas here passing (text, color, fontSize) --- */}
    </div>
  );
}