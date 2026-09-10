import React from 'react';
import { Clock, Target, Shield, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const metrics = [
  { icon: Clock, value: '< 10s', label: 'Database-check response (p95)', color: 'var(--primary)' },
  { icon: Zap, value: '< 60s', label: 'Deep-scan response (p90)', color: 'var(--accent)' },
  { icon: Target, value: '99%+', label: 'Directory-match accuracy vs RBI', color: 'var(--primary)' },
  { icon: Shield, value: 'Zero', label: 'False "verified legitimate" verdicts', color: 'var(--danger)' },
  { icon: TrendingUp, value: '85%+', label: 'ML classifier precision', color: 'var(--warning)' },
  { icon: AlertTriangle, value: '30%+', label: 'Deep-scan opt-in rate target', color: 'var(--accent)' },
];

export default function Metrics() {
  const revealRef = useScrollReveal();

  return (
    <section id="metrics" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Key Performance Targets</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          The metrics we hold ourselves accountable to at launch.
        </p>

        <div className="metrics-grid">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="metric-card glass-card reveal-item"
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                <div className="metric-icon-wrap" style={{ '--metric-color': m.color }}>
                  <Icon size={24} />
                </div>
                <div className="metric-value" style={{ color: m.color }}>{m.value}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            );
          })}
        </div>

        <div className="metrics-okrs glass-card reveal-item" style={{ transitionDelay: '0.6s' }}>
          <h3 className="okr-title">OKRs</h3>
          <div className="okr-grid">
            <div className="okr-item">
              <div className="okr-objective">
                <span className="okr-tag">O1</span>
                Make legitimacy-checking as fast as pasting a link
              </div>
              <ul className="okr-results">
                <li>95% of DLA/Sachet lookups return in &lt;10 seconds</li>
                <li>Support all three input types (link, name, APK) at launch</li>
                <li>Zero false "verified legitimate" verdicts</li>
              </ul>
            </div>
            <div className="okr-item">
              <div className="okr-objective">
                <span className="okr-tag">O2</span>
                Make deep scans genuinely useful, not just noisy
              </div>
              <ul className="okr-results">
                <li>Deep-scan verdicts cite specific evidence in 100% of flagged cases</li>
                <li>ML classifier achieves ≥85% precision on fraud-language detection</li>
              </ul>
            </div>
            <div className="okr-item">
              <div className="okr-objective">
                <span className="okr-tag">O3</span>
                Build trust through transparency
              </div>
              <ul className="okr-results">
                <li>90%+ of users rate verdict as "helpful" in post-check survey</li>
                <li>False negative rate (fraudulent apps marked verified) = 0%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
