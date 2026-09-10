import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, AlertOctagon } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const verdicts = [
  {
    icon: CheckCircle,
    emoji: '✅',
    title: 'Verified',
    trigger: 'Directory match, no complaints',
    tone: 'Confident, names the matched regulated entity',
    color: 'var(--primary)',
    example: {
      header: '✅ VERIFIED — REGISTERED LENDER',
      body: 'KreditBee is registered with RBI as a Digital Lending App.',
      checks: ['Registered Entity: KreditBee Finance Pvt Ltd', 'Entity Type: NBFC', 'Registration Status: Active'],
    },
  },
  {
    icon: AlertTriangle,
    emoji: '⚠️',
    title: 'Unable to Verify',
    trigger: 'No match, user declines scan',
    tone: 'Neutral, points to sachet.rbi.org.in',
    color: 'var(--warning)',
    example: {
      header: '⚠️ UNABLE TO VERIFY',
      body: 'This app was NOT found in RBI\'s official Digital Lending Apps directory.',
      checks: ['RBI DLA Directory: Not found', 'Sachet Portal: No complaints', 'Snapshot: 10 Sep 2026'],
    },
  },
  {
    icon: XCircle,
    emoji: '🚫',
    title: 'High Risk',
    trigger: 'No match, scan run, red flags found',
    tone: 'Specific — lists actual flags',
    color: 'var(--danger)',
    example: {
      header: '🚫 HIGH RISK — RED FLAGS DETECTED',
      body: 'Dangerous permissions and fraud-pattern language detected.',
      checks: ['READ_SMS: Can read messages', 'Fraud pattern: 91% confidence', 'Certificate: Does not match'],
    },
  },
  {
    icon: AlertOctagon,
    emoji: '🔀',
    title: 'Possible Impersonation',
    trigger: 'Name/identity mismatch with known lender',
    tone: 'Identity mismatch alert with official app link',
    color: 'var(--danger)',
    example: {
      header: '⚠️ POSSIBLE IMPERSONATION',
      body: 'The app claims to represent HDFC Bank but its identity does not match.',
      checks: ['Claimed: com.hdfc.personalloan', 'Official: com.hdfc.bank', 'Certificate: Does not match'],
    },
  },
];

export default function VerdictStates() {
  const revealRef = useScrollReveal();

  return (
    <section id="verdicts" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Verdict States</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          Every verdict is specific, evidence-based, and actionable — never a bare "safe" or "unsafe" label.
        </p>

        <div className="verdicts-grid">
          {verdicts.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="verdict-card glass-card reveal-item"
                style={{ transitionDelay: `${0.1 + i * 0.1}s`, '--verdict-color': v.color }}
              >
                <div className="verdict-header">
                  <div className="verdict-icon-wrap">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="verdict-title">{v.title}</h3>
                    <p className="verdict-trigger">{v.trigger}</p>
                  </div>
                </div>

                <div className="verdict-tone">
                  <span className="verdict-tone-label">Tone:</span> {v.tone}
                </div>

                <div className="verdict-example">
                  <div className="verdict-example-header">{v.example.header}</div>
                  <p className="verdict-example-body">{v.example.body}</p>
                  <div className="verdict-example-checks">
                    {v.example.checks.map((check, ci) => (
                      <div key={ci} className="verdict-example-check">
                        <span className="verdict-example-dot" style={{ background: v.color }} />
                        {check}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="verdict-template glass-card reveal-item" style={{ transitionDelay: '0.6s' }}>
          <h3>Verdict Template</h3>
          <pre className="verdict-template-code">{`[Verdict Icon] [Verdict Summary]

Sources Checked:
• [Source 1]: [Result]
• [Source 2]: [Result / Skipped — reason]

Specific Findings:
• [Finding 1 with plain-language explanation]
• [Finding 2 with plain-language explanation]

Recommended Next Step:
[Actionable advice]`}</pre>
        </div>
      </div>
    </section>
  );
}
