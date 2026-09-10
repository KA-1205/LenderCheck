import React from 'react';
import { Search, Scan, FileCheck } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HowItWorks() {
  const revealRef = useScrollReveal();

  return (
    <section id="how-it-works" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Three layers of protection</h2>
        
        <div className="how-cards">
          <div className="how-card glass-card reveal-item" style={{ transitionDelay: '0.1s' }}>
            <div className="step-number">01</div>
            <Search className="how-icon" size={32} />
            <div className="time-badge">10 seconds</div>
            <h3>Instant Check</h3>
            <p>Check the RBI Digital Lending Apps directory and complaint signals.</p>
          </div>
          <div className="how-card glass-card reveal-item" style={{ transitionDelay: '0.2s' }}>
            <div className="step-number">02</div>
            <Scan className="how-icon" size={32} />
            <div className="time-badge">30–60 seconds</div>
            <h3>Deep Analysis</h3>
            <p>Analyze APK permissions, certificates and fraud-pattern signals.</p>
          </div>
          <div className="how-card glass-card reveal-item" style={{ transitionDelay: '0.3s' }}>
            <div className="step-number">03</div>
            <FileCheck className="how-icon" size={32} />
            <h3>Clear Verdict</h3>
            <p>Explain exactly why the app was flagged instead of simply saying safe or unsafe.</p>
          </div>
        </div>
        
        <div className="flow-diagram reveal-item" style={{ transitionDelay: '0.4s' }}>
          <div className="flow-line-fill"></div>
          <div className="flow-step" style={{ transitionDelay: '0.5s' }}>User Input</div>
          <div className="flow-step" style={{ transitionDelay: '0.7s' }}>Instant Check</div>
          <div className="flow-step" style={{ transitionDelay: '0.9s' }}>Consent</div>
          <div className="flow-step" style={{ transitionDelay: '1.1s' }}>Deep Scan</div>
          <div className="flow-step" style={{ transitionDelay: '1.3s' }}>Evidence-Based Verdict</div>
        </div>
      </div>
    </section>
  );
}
