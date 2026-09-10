import React from 'react';
import { User, MapPin, Briefcase, Smartphone, Target, AlertCircle, MessageSquare } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Persona() {
  const revealRef = useScrollReveal();

  return (
    <section id="persona" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Who We're Building For</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          Meet Ramesh — our primary persona, representing millions of financially vulnerable Indians.
        </p>

        <div className="persona-layout">
          <div className="persona-card glass-card reveal-item" style={{ transitionDelay: '0.1s' }}>
            <div className="persona-header">
              <div className="persona-avatar">
                <User size={36} />
              </div>
              <div>
                <h3 className="persona-name">Ramesh</h3>
                <p className="persona-role">The Gig-Economy Borrower</p>
              </div>
            </div>

            <div className="persona-details">
              <div className="persona-detail">
                <User size={16} className="persona-detail-icon" />
                <span className="persona-detail-label">Age</span>
                <span className="persona-detail-value">25–45</span>
              </div>
              <div className="persona-detail">
                <MapPin size={16} className="persona-detail-icon" />
                <span className="persona-detail-label">Location</span>
                <span className="persona-detail-value">Tier 2/3 Indian city</span>
              </div>
              <div className="persona-detail">
                <Briefcase size={16} className="persona-detail-icon" />
                <span className="persona-detail-label">Role</span>
                <span className="persona-detail-value">Gig worker / small shop owner</span>
              </div>
              <div className="persona-detail">
                <Smartphone size={16} className="persona-detail-icon" />
                <span className="persona-detail-label">Tech</span>
                <span className="persona-detail-value">WhatsApp/Telegram comfortable</span>
              </div>
            </div>

            <div className="persona-quote">
              <MessageSquare size={18} className="persona-quote-icon" />
              "I just want someone to tell me, in one line, whether this app is going to rob me."
            </div>
          </div>

          <div className="persona-panels">
            <div className="persona-panel glass-card reveal-item" style={{ transitionDelay: '0.2s' }}>
              <h4><Target size={18} style={{ marginRight: 8, color: 'var(--primary)' }} />Goals</h4>
              <ul>
                <li>Get a small, fast loan to cover a cash-flow gap</li>
                <li>Avoid being scammed or harassed by a fake lender</li>
              </ul>
            </div>

            <div className="persona-panel glass-card reveal-item" style={{ transitionDelay: '0.3s' }}>
              <h4><AlertCircle size={18} style={{ marginRight: 8, color: 'var(--danger)' }} />Pain Points</h4>
              <ul>
                <li>Receives loan-app links via WhatsApp forwards or social media ads</li>
                <li>Has no fast way to tell a genuine NBFC-partnered app from a clone</li>
                <li>Often discovers fraud only after granting contacts/gallery permissions</li>
              </ul>
            </div>

            <div className="persona-panel glass-card reveal-item" style={{ transitionDelay: '0.4s' }}>
              <h4><Smartphone size={18} style={{ marginRight: 8, color: 'var(--warning)' }} />Current Solutions (Broken)</h4>
              <ul>
                <li>Googles the app name (trusting the scam's own SEO'd site)</li>
                <li>Asks in WhatsApp/Telegram group (inconsistent answers)</li>
                <li>Manually searches RBI directory (rarely completes this)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="persona-secondary reveal-item" style={{ transitionDelay: '0.5s' }}>
          <h3 className="persona-secondary-title">Secondary Personas</h3>
          <div className="persona-secondary-grid">
            <div className="persona-secondary-card glass-card">
              <span className="persona-secondary-emoji">📚</span>
              <h4>Financial-literacy educators</h4>
              <p>Need a tool to forward to at-risk users</p>
            </div>
            <div className="persona-secondary-card glass-card">
              <span className="persona-secondary-emoji">📰</span>
              <h4>Journalists & researchers</h4>
              <p>Tracking loan-app fraud patterns</p>
            </div>
            <div className="persona-secondary-card glass-card">
              <span className="persona-secondary-emoji">🏛️</span>
              <h4>Consumer-rights NGOs</h4>
              <p>Vetting apps before recommending to beneficiaries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
