import React, { useState } from 'react';
import { Link2, FileUp, ShieldCheck, Lock, Brain, FileCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const features = [
  {
    icon: Link2,
    title: 'Multi-Input Intake',
    priority: 'P0',
    effort: 'M',
    summary: 'Single entry point accepting Play Store URL, free-text app/lender name, or forwarded APK file.',
    details: [
      'Parse Play Store URLs to extract package ID',
      'Accept free-text input with fuzzy-match against directory',
      'Accept .apk files; extract package name, version, signing certificate',
      'Route all inputs into the same directory-check pipeline',
    ],
    edgeCases: [
      'Multiple directory matches → show all, ask user to confirm',
      'Corrupted APK → clear error, offer name-based fallback',
      'Non-lending app category → still check, note mismatch',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'RBI Directory & Sachet Check (Gate 1)',
    priority: 'P0',
    effort: 'M',
    summary: 'Mandatory first step — checks against cached RBI DLA directory and Sachet Portal complaints.',
    details: [
      'Maintain locally cached RBI DLA directory, refreshed daily',
      'Maintain searchable index of Sachet Portal complaint entries',
      'Match by package name (exact) first; fuzzy name match as fallback',
      'Timestamp every verdict with snapshot date',
    ],
    edgeCases: [
      'Directory structure changes → alert, fall back to cache with staleness warning',
      'App in directory AND has complaints → must surface complaint context',
      'Cache unreachable → graceful degradation with manual check link',
    ],
  },
  {
    icon: Lock,
    title: 'Opt-In Deep Scan Gate',
    priority: 'P0',
    effort: 'S',
    summary: 'Consent checkpoint between fast directory check and expensive analysis. Never runs automatically.',
    details: [
      'Present inline button: "Run deep scan? (~30–60 sec)"',
      'No analysis begins until consent flag received (enforced server-side)',
      'If input was name/link, prompt user to forward APK for full analysis',
      'Allow user to decline and end with directory-only verdict',
    ],
    edgeCases: [
      'User provides only name, no APK, not on Play Store → explain APK needed',
      'Rapid multiple taps → debounce to avoid duplicate jobs',
    ],
  },
  {
    icon: FileUp,
    title: 'Static APK Analysis',
    priority: 'P0',
    effort: 'L',
    summary: 'Automated inspection of APK permissions, signing certificate, and network endpoints using Androguard.',
    details: [
      'Extract full permission list; classify vs. "expected for lending apps"',
      'Known fraud combos: READ_SMS + READ_CONTACTS + READ_CALL_LOG',
      'Extract signing certificate; compare against known-genuine certificates',
      'Extract embedded URLs; check against threat-intelligence lists',
    ],
    edgeCases: [
      'Heavily obfuscated APK → note "limited visibility" rather than false-clean',
      'No reference certificate for claimed lender → skip finding',
      'Analysis timeout → async completion with notification',
    ],
  },
  {
    icon: Brain,
    title: 'ML Fraud-Language Classifier',
    priority: 'P0',
    effort: 'L',
    summary: 'Text classifier trained on fraud-pattern language — upfront fees, urgency, guaranteed approval, impersonation.',
    details: [
      'Extract text from Play Store description, APK strings, in-app terms',
      'Score against fraud categories with per-category confidence',
      'Handle Hinglish/code-mixed text patterns',
      'Combine with static findings into unified verdict',
    ],
    edgeCases: [
      'No extractable text → skip, disclose as "not assessed"',
      'Classifier unavailable → fallback to static-analysis-only, labeled partial',
      'Score thresholds: ≥0.85 high, 0.60–0.84 moderate, <0.60 no flag',
    ],
  },
  {
    icon: FileCheck,
    title: 'Transparent Verdict Renderer',
    priority: 'P0',
    effort: 'S',
    summary: 'Turns findings into specific, actionable, non-binary verdicts with cited evidence.',
    details: [
      'Never render bare "Safe" / "Unsafe" without specific reason',
      'Always cite sources checked and note any skipped/unavailable',
      'Always include recommended next step',
      'Structured for Telegram: concise, scannable, bold/emoji for severity',
    ],
    edgeCases: [],
  },
];

function FeatureCard({ feature, index }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = feature.icon;

  return (
    <div
      className="feature-card glass-card reveal-item"
      style={{ transitionDelay: `${0.1 + index * 0.08}s` }}
    >
      <div className="feature-header">
        <div className="feature-icon-wrap">
          <Icon size={24} />
        </div>
        <div className="feature-badges">
          <span className="feature-badge feature-badge--priority">{feature.priority}</span>
          <span className="feature-badge feature-badge--effort">Effort: {feature.effort}</span>
        </div>
      </div>

      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-summary">{feature.summary}</p>

      <button
        className="feature-expand-btn"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide Details' : 'Show Details'}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {expanded && (
        <div className="feature-details">
          <div className="feature-detail-section">
            <h4>Requirements</h4>
            <ul>
              {feature.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
          {feature.edgeCases.length > 0 && (
            <div className="feature-detail-section feature-edge-cases">
              <h4>Edge Cases</h4>
              <ul>
                {feature.edgeCases.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Features() {
  const revealRef = useScrollReveal();

  return (
    <section id="features" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Feature Deep Dive</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          Six core features working together to deliver instant, evidence-based verdicts.
        </p>

        <div className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
