import React from 'react';
import { User, Bot, Database, ShieldCheck, Lock, Fingerprint, Scale, Award } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Architecture() {
  const revealRef = useScrollReveal();

  return (
    <section id="architecture" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">How LenderCheck Works Under the Hood</h2>
        
        <div className="arch-diagram">
          <div className="arch-node reveal-item" style={{ transitionDelay: '0.1s' }}>
            <User size={18} className="arch-node-icon" />
            User Input
          </div>
          <div className="arch-arrow reveal-item" style={{ transitionDelay: '0.15s' }}></div>
          
          <div className="arch-node reveal-item" style={{ transitionDelay: '0.2s' }}>
            <Bot size={18} className="arch-node-icon" />
            Telegram Bot
          </div>
          <div className="arch-arrow reveal-item" style={{ transitionDelay: '0.25s' }}></div>
          
          <div className="arch-gate glass-card reveal-item" style={{ transitionDelay: '0.3s' }}>
            <h4>⚡ Gate 1: Instant Verification</h4>
            <div className="arch-gate-items">
              <div className="arch-item"><Database size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> RBI DLA Directory</div>
              <div className="arch-item"><ShieldCheck size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Sachet Portal</div>
            </div>
          </div>
          <div className="arch-arrow reveal-item" style={{ transitionDelay: '0.35s' }}></div>
          
          <div className="arch-decision reveal-item" style={{ transitionDelay: '0.4s' }}>
            <span>Verified?</span>
          </div>
          <div className="arch-arrow reveal-item" style={{ transitionDelay: '0.45s' }}></div>
          
          <div className="arch-node reveal-item" style={{ transitionDelay: '0.5s' }}>
            <Scale size={18} className="arch-node-icon" />
            User Consent
          </div>
          <div className="arch-arrow reveal-item" style={{ transitionDelay: '0.55s' }}></div>
          
          <div className="arch-gate glass-card reveal-item" style={{ transitionDelay: '0.6s' }}>
            <h4>🔬 Gate 2: Deep Analysis</h4>
            <div className="arch-gate-items">
              <div className="arch-item"><Lock size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> APK Permissions</div>
              <div className="arch-item"><Fingerprint size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Signing Certificate</div>
              <div className="arch-item"><ShieldCheck size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Fraud Pattern Classifier</div>
            </div>
          </div>
          <div className="arch-arrow reveal-item" style={{ transitionDelay: '0.65s' }}></div>
          
          <div className="arch-node reveal-item" style={{ transitionDelay: '0.7s', background: 'linear-gradient(135deg, var(--primary), #00b894)', color: '#000', border: 'none', boxShadow: '0 0 30px rgba(0,212,170,0.2)' }}>
            <Award size={18} style={{ color: '#000' }} />
            Evidence-Based Verdict
          </div>
        </div>
      </div>
    </section>
  );
}
