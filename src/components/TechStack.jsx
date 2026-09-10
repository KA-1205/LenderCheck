import React from 'react';
import { Bot, Server, Database, HardDrive, Layers, Cpu, BarChart3, Code } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const stack = [
  { component: 'Bot Framework', tech: 'Telegram Bot API (webhook)', rationale: 'Official, reliable, supports inline buttons', icon: Bot },
  { component: 'Backend', tech: 'Python + FastAPI', rationale: 'Strong ecosystem for APK parsing and ML', icon: Server },
  { component: 'Database', tech: 'PostgreSQL', rationale: 'Directory cache, complaint index, scan sessions', icon: Database },
  { component: 'Object Storage', tech: 'S3/MinIO (transient)', rationale: 'APK processing scratch space, auto-deleted', icon: HardDrive },
  { component: 'Queue', tech: 'Redis', rationale: 'Deep-scan async job processing', icon: Layers },
  { component: 'APK Analysis', tech: 'Androguard + apk-sec-analyzer', rationale: 'Mature Python tooling, OWASP coverage', icon: Code },
  { component: 'ML Classifier', tech: 'Fine-tuned lightweight model', rationale: 'Balance of cost vs. accuracy', icon: Cpu },
  { component: 'Monitoring', tech: 'Prometheus + Grafana', rationale: 'Directory refresh health, queue depth, errors', icon: BarChart3 },
];

const apiEndpoints = [
  {
    method: 'POST',
    path: '/internal/directory-check',
    request: `{
  "input_type": "link | name | apk",
  "package_id": "com.example.lender",
  "app_name": "Example Lender App"
}`,
    response: `{
  "verdict": "found | not_found | found_with_complaints",
  "source": "RBI DLA Directory",
  "snapshot_date": "2026-09-09",
  "sachet_complaints": []
}`,
  },
  {
    method: 'POST',
    path: '/internal/deep-scan',
    request: `{
  "session_id": "uuid",
  "apk_reference": "uuid",
  "user_consent": true
}`,
    response: `{
  "static_findings": [
    {"type": "permission_overreach", "detail": "READ_SMS", "severity": "high"}
  ],
  "ml_findings": [
    {"category": "upfront_fee_language", "confidence": 0.91}
  ]
}`,
  },
];

export default function TechStack() {
  const revealRef = useScrollReveal();

  return (
    <section id="tech-stack" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Technology Stack</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          Built with proven, production-ready technologies optimized for cost and reliability.
        </p>

        <div className="stack-grid">
          {stack.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="stack-card glass-card reveal-item"
                style={{ transitionDelay: `${0.1 + i * 0.06}s` }}
              >
                <div className="stack-icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="stack-info">
                  <div className="stack-component">{s.component}</div>
                  <div className="stack-tech">{s.tech}</div>
                  <div className="stack-rationale">{s.rationale}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="api-section reveal-item" style={{ transitionDelay: '0.7s' }}>
          <h3 className="api-title">Internal APIs</h3>
          <div className="api-grid">
            {apiEndpoints.map((api, i) => (
              <div key={i} className="api-card glass-card">
                <div className="api-method">
                  <span className="api-method-badge">{api.method}</span>
                  <code className="api-path">{api.path}</code>
                </div>
                <div className="api-code-blocks">
                  <div className="api-code-block">
                    <div className="api-code-label">Request</div>
                    <pre className="api-code">{api.request}</pre>
                  </div>
                  <div className="api-code-block">
                    <div className="api-code-label">Response</div>
                    <pre className="api-code">{api.response}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
