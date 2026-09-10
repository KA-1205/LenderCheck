import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';

const navItems = [
  { id: 'problem', label: 'Problem' },
  { id: 'persona', label: 'Persona' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'features', label: 'Features' },
  { id: 'demo', label: 'Demo' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'competition', label: 'Compare' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="nav-logo">
          <Shield size={24} color="var(--primary)" />
          LenderCheck
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link">
              {item.label}
            </button>
          ))}
        </div>
        <div className="nav-right">
          <button onClick={() => scrollTo('demo')} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Try Demo</button>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link">
              {item.label}
            </button>
          ))}
          <button onClick={() => scrollTo('demo')} className="btn btn-primary">Try Demo</button>
        </div>
      </div>
    </nav>
  );
}
