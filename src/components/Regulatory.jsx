import React from 'react';
import { Scale, FileText, Shield, Landmark, AlertTriangle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const regulations = [
  {
    icon: Landmark,
    title: 'RBI Digital Lending Directions, 2025',
    description: 'All Regulated Entities must register their Digital Lending Apps via RBI\'s CIMS portal. Public directory operational since July 1, 2025.',
    tag: 'Mandatory for REs, LSPs, and DLAs',
    color: 'var(--primary)',
  },
  {
    icon: Shield,
    title: 'RBI DLA Directory',
    description: 'Structured data under Citizen\'s Corner on rbi.org.in. "As-is" from RE submissions — no RBI validation, auto-updated by REs.',
    tag: 'No public API — spreadsheet format',
    color: 'var(--accent)',
  },
  {
    icon: AlertTriangle,
    title: 'IT Act Section 69A',
    description: 'MeitY has blocked 87 illegal loan apps to date under this section, demonstrating the scale of the problem.',
    tag: '87 apps blocked',
    color: 'var(--warning)',
  },
  {
    icon: FileText,
    title: 'Sachet Portal',
    description: 'Public complaint platform at sachet.rbi.org.in for reporting deposit and collection fraud. Key data source for LenderCheck.',
    tag: 'sachet.rbi.org.in',
    color: 'var(--primary)',
  },
];

const glossary = [
  { term: 'DLA', definition: 'Digital Lending App — app deployed by a Regulated Entity for digital lending' },
  { term: 'RE', definition: 'Regulated Entity — bank, NBFC, or fintech registered with RBI' },
  { term: 'LSP', definition: 'Lending Service Partner — entity engaged by an RE to perform lending activities' },
  { term: 'NBFC', definition: 'Non-Banking Financial Company' },
  { term: 'CIMS', definition: 'Centralised Information Management System — RBI portal for RE data submission' },
  { term: 'APK', definition: 'Android Package Kit — the file format for Android app distribution' },
];

export default function Regulatory() {
  const revealRef = useScrollReveal();

  return (
    <section id="regulatory" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Regulatory Context</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          LenderCheck is built on the foundation of RBI's digital lending framework.
        </p>

        <div className="reg-grid">
          {regulations.map((reg, i) => {
            const Icon = reg.icon;
            return (
              <div
                key={i}
                className="reg-card glass-card reveal-item"
                style={{ transitionDelay: `${0.1 + i * 0.1}s`, '--reg-color': reg.color }}
              >
                <div className="reg-icon-wrap">
                  <Icon size={24} />
                </div>
                <h3>{reg.title}</h3>
                <p>{reg.description}</p>
                <span className="reg-tag">{reg.tag}</span>
              </div>
            );
          })}
        </div>

        <div className="glossary-section reveal-item" style={{ transitionDelay: '0.6s' }}>
          <h3 className="glossary-title">Glossary</h3>
          <div className="glossary-grid">
            {glossary.map((g, i) => (
              <div key={i} className="glossary-item">
                <span className="glossary-term">{g.term}</span>
                <span className="glossary-def">{g.definition}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
