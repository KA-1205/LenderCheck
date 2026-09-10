import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const risks = [
  {
    risk: 'RBI/Sachet scraping breaks on layout changes',
    probability: 'High',
    impact: 'High',
    mitigation: 'Defensive parsing, monitoring/alerting, manual-override cache update, feasibility spike in Week 1',
    probColor: 'var(--danger)',
    impactColor: 'var(--danger)',
  },
  {
    risk: 'ML classifier false positives on legitimate lenders',
    probability: 'Medium',
    impact: 'High',
    mitigation: 'Human-reviewable evidence with every flag; "red flag" framing not "scam"; appeals channel',
    probColor: 'var(--warning)',
    impactColor: 'var(--danger)',
  },
  {
    risk: 'Users read "not found" as "confirmed fraud"',
    probability: 'Medium',
    impact: 'High',
    mitigation: 'Verdict explicitly states ≠ fraud; push toward deep scan / manual check',
    probColor: 'var(--warning)',
    impactColor: 'var(--danger)',
  },
  {
    risk: 'Static analysis false "malware" perception',
    probability: 'Medium',
    impact: 'Medium',
    mitigation: 'Calibrate permission baseline for lending apps; plain-language context',
    probColor: 'var(--warning)',
    impactColor: 'var(--warning)',
  },
  {
    risk: 'Deep-scan cost abuse',
    probability: 'Low',
    impact: 'Medium',
    mitigation: 'Server-side consent enforcement; per-user rate limiting',
    probColor: 'var(--primary)',
    impactColor: 'var(--warning)',
  },
  {
    risk: 'Legal exposure from fraud labeling',
    probability: 'Low',
    impact: 'High',
    mitigation: 'Evidence-based language only; legal review of verdict templates',
    probColor: 'var(--primary)',
    impactColor: 'var(--danger)',
  },
  {
    risk: 'False negatives (fraud apps marked verified)',
    probability: 'Medium',
    impact: 'Critical',
    mitigation: 'Zero-tolerance target; manual audit of known-fraudulent apps post-launch',
    probColor: 'var(--warning)',
    impactColor: 'var(--danger)',
  },
];

export default function Risks() {
  const revealRef = useScrollReveal();

  return (
    <section id="risks" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Risks & Mitigations</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          We've identified key risks and planned concrete mitigations for each.
        </p>

        <div className="risks-grid">
          {risks.map((r, i) => (
            <div
              key={i}
              className="risk-card glass-card reveal-item"
              style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="risk-header">
                <AlertTriangle size={18} style={{ color: r.impactColor, flexShrink: 0 }} />
                <h4 className="risk-title">{r.risk}</h4>
              </div>

              <div className="risk-badges">
                <span className="risk-badge" style={{ '--badge-color': r.probColor }}>
                  Prob: {r.probability}
                </span>
                <span className="risk-badge" style={{ '--badge-color': r.impactColor }}>
                  Impact: {r.impact}
                </span>
              </div>

              <div className="risk-mitigation">
                <Shield size={14} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                <p>{r.mitigation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
