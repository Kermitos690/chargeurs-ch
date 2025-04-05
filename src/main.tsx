
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add neon line elements to the DOM
const rootElement = document.getElementById("root")!;

// Create neon lines
const createNeonLines = () => {
  const neonLines = [
    { className: "neon-line neon-line-horizontal-top" },
    { className: "neon-line neon-line-horizontal-bottom" },
    { className: "neon-line neon-line-vertical-left" },
    { className: "neon-line neon-line-vertical-right" }
  ];

  neonLines.forEach(line => {
    const neonElement = document.createElement('div');
    neonElement.className = line.className;
    document.body.appendChild(neonElement);
  });
};

// Add mouse tracer effect
const addNeonTracer = () => {
  document.addEventListener('mousemove', (e) => {
    const tracer = document.createElement('div');
    tracer.className = 'neon-tracer animate-neon-tracer';
    tracer.style.left = `${e.clientX}px`;
    tracer.style.top = `${e.clientY}px`;
    document.body.appendChild(tracer);
    
    // Remove the tracer after animation completes
    setTimeout(() => {
      document.body.removeChild(tracer);
    }, 2000);
  }, { passive: true });
};

// Create neon lines
createNeonLines();

// Add neon tracer effect
addNeonTracer();

// Render the app
createRoot(rootElement).render(<App />);
