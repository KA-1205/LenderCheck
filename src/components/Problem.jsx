import React from 'react';
import { XCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AnimatedCounter from './AnimatedCounter';

export default function Problem() {
  const revealRef = useScrollReveal();

  return (
    <section id="problem" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">The Problem</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.1s' }}>
          Fake loan apps exploit people when they are most financially vulnerable.
        </p>
        
        <div className="stats-grid">
          <div className="stat-card glass-card reveal-item" style={{ transitionDelay: '0.2s' }}>
            <div className="stat-value">₹2,500+ Cr</div>
            <div className="stat-label">Lost to fake loan apps in India</div>
          </div>
          <div className="stat-card glass-card reveal-item" style={{ transitionDelay: '0.3s' }}>
            <AnimatedCounter end={700} suffix="+" duration={1800} />
            <div className="stat-label">Illegal lending apps blocked by MeitY</div>
          </div>
          <div className="stat-card glass-card reveal-item" style={{ transitionDelay: '0.4s' }}>
            <div className="stat-value">1 in 3</div>
            <div className="stat-label">Tier 2/3 borrowers receiving suspicious links</div>
          </div>
        </div>
        
        <h3 className="methods-subtitle reveal-item" style={{ transitionDelay: '0.5s' }}>Today's verification methods</h3>
        <div className="methods-grid">
          <div className="method-card glass-card reveal-item" style={{ transitionDelay: '0.6s' }}>
            <XCircle className="method-icon" size={24} />
            <div className="method-content">
              <h4>Google the app name</h4>
              <p>Scam websites can dominate search results.</p>
            </div>
          </div>
          <div className="method-card glass-card reveal-item" style={{ transitionDelay: '0.7s' }}>
            <XCircle className="method-icon" size={24} />
            <div className="method-content">
              <h4>Ask WhatsApp groups</h4>
              <p>Answers are inconsistent and unreliable.</p>
            </div>
          </div>
          <div className="method-card glass-card reveal-item" style={{ transitionDelay: '0.8s' }}>
            <XCircle className="method-icon" size={24} />
            <div className="method-content">
              <h4>Search the RBI directory manually</h4>
              <p>Slow and inconvenient.</p>
            </div>
          </div>
          <div className="method-card glass-card reveal-item" style={{ transitionDelay: '0.9s' }}>
            <XCircle className="method-icon" size={24} />
            <div className="method-content">
              <h4>Google Play Protect</h4>
              <p>Detects malware, but does not verify lending legitimacy.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
