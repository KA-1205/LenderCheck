import React from 'react';
import { Shield, ArrowRight, Play } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Hero() {
  const revealRef = useScrollReveal();
  
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" ref={revealRef}>
      <div className="container hero-content">
        <div className="hero-text">
          <div className="hero-badge reveal-item">Build $ Bank 2026</div>
          <h1 className="hero-title reveal-item" style={{ transitionDelay: '0.1s' }}>
            Verify any loan app in 10 seconds,<br/>
            <span className="gradient-text">before it verifies you.</span>
          </h1>
          <p className="hero-subtitle reveal-item" style={{ transitionDelay: '0.2s' }}>
            LenderCheck helps users identify suspicious lending apps before they install, pay or share sensitive information.
          </p>
          <div className="hero-buttons reveal-item" style={{ transitionDelay: '0.3s' }}>
            <button onClick={() => scrollTo('demo')} className="btn btn-primary">
              <Play size={18} style={{ marginRight: 8 }} />
              Try Interactive Demo
            </button>
            <button onClick={() => scrollTo('how-it-works')} className="btn btn-secondary">
              See How It Works
              <ArrowRight size={18} style={{ marginLeft: 8 }} />
            </button>
          </div>
        </div>
        <div className="hero-phone-wrapper reveal-item" style={{ transitionDelay: '0.4s' }}>
          <div className="phone-mockup">
            <div className="phone-header">
              <div className="bot-avatar"><Shield size={20} /></div>
              <div className="bot-info">
                <h3>LenderCheck Bot</h3>
                <div className="bot-status"><div className="status-dot"></div> online</div>
              </div>
            </div>
            <div className="chat-area">
              <div className="bubble bubble-user">Can you check this loan app?</div>
              <div className="bubble bubble-bot">🔍 Send me a Play Store link, app name, or APK and I'll check it.</div>
              <div className="bubble bubble-user">KreditBee</div>
              <div className="bubble bubble-bot">✅ Verified — KreditBee is registered with RBI as a Digital Lending App.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
