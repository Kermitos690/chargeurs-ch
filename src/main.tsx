
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

// Add dynamic particles effect
const addNeonParticles = () => {
  const particleCount = 20;
  const colors = ['#1EAEDB', '#2D8C50', '#8B5CF6'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'neon-particle';
    
    // Random position, size, and animation delay
    const size = Math.random() * 8 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const animationDelay = Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}vw`;
    particle.style.top = `${posY}vh`;
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    particle.style.animationDelay = `${animationDelay}s`;
    
    document.body.appendChild(particle);
  }
};

// Create neon grid effect
const createNeonGrid = () => {
  const grid = document.createElement('div');
  grid.className = 'neon-grid';
  document.body.appendChild(grid);
};

// Create neon lines
createNeonLines();

// Add neon tracer effect
addNeonTracer();

// Add neon particles
addNeonParticles();

// Create neon grid
createNeonGrid();

// Render the app
createRoot(rootElement).render(<App />);
