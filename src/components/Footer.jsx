import React from 'react';
import { Shield, ArrowRight, Github } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Footer() {
  const revealRef = useScrollReveal();
  
  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" ref={revealRef}>
      <div className="container">
        <div className="footer-cta">
          <h2 className="reveal-item">
            <span className="gradient-text-footer">Verify before you install.</span>
          </h2>
          <p className="reveal-item" style={{ transitionDelay: '0.1s' }}>
            LenderCheck brings lending verification to the moment when users need it most.
          </p>
          <div className="footer-buttons reveal-item" style={{ transitionDelay: '0.2s' }}>
            <button onClick={scrollToDemo} className="btn btn-primary">
              <Shield size={18} style={{ marginRight: 8 }} />
              Try the Demo
            </button>
            <button onClick={() => alert('GitHub repository coming soon')} className="btn btn-secondary">
              <Github size={18} style={{ marginRight: 8 }} />
              View on GitHub
            </button>
          </div>
        </div>
        <div className="footer-bottom reveal-item" style={{ transitionDelay: '0.3s' }}>
          <Shield size={16} color="var(--primary)" />
          LenderCheck • RBI Hackathon 2026
        </div>
      </div>
    </footer>
  );
}
