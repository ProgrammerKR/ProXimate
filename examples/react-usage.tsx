import React from 'react';
import { createRoot } from 'react-dom/client';
import { Motion } from '@proximate-css/react';
import '@proximate-css/css/dist/proximate.css';
import './style.css'; // Assume some basic styles exist

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ProXimate React Example</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        {/* Basic usage using 'as' prop */}
        <Motion 
          as="div"
          animation="fade-in-up" 
          duration={600} 
          style={{ padding: '2rem', background: '#3b82f6', color: 'white', borderRadius: '8px' }}
        >
          Fade In Up
        </Motion>

        {/* Reveal on scroll using reveal prop */}
        <Motion 
          animation="zoom-in" 
          reveal={true}
          threshold={0.5}
          style={{ padding: '2rem', background: '#ec4899', color: 'white', borderRadius: '8px' }}
        >
          Reveal on Scroll
        </Motion>
      </div>

      <p style={{ marginTop: '2rem', color: '#6b7280' }}>
        Make sure you import <code>@proximate-css/css/dist/proximate.css</code> at the root of your application!
      </p>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
