
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

// Create neon lines
createNeonLines();

// Render the app
createRoot(rootElement).render(<App />);
