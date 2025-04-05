
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

// Add dynamic particles effect with softer colors
const addNeonParticles = () => {
  const particleCount = 10; // Reduced particle count
  // Des couleurs encore moins vives et plus transparentes
  const colors = ['rgba(30, 174, 219, 0.3)', 'rgba(45, 140, 80, 0.3)', 'rgba(139, 92, 246, 0.3)'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'neon-particle';
    
    // Random position, size, and animation delay
    const size = Math.random() * 4 + 1; // Taille encore plus réduite
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const animationDelay = Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}vw`;
    particle.style.top = `${posY}vh`;
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 3px ${color}, 0 0 5px ${color}`; // Glow encore réduit
    particle.style.animationDelay = `${animationDelay}s`;
    
    document.body.appendChild(particle);
  }
};

// Create neon lines
createNeonLines();

// Add neon tracer effect
addNeonTracer();

// Add neon particles
addNeonParticles();

// Render the app
createRoot(rootElement).render(<App />);
