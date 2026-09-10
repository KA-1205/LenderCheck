import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle, XCircle } from 'lucide-react';

const rows = [
  { capability: 'Verify lending legitimacy', pp: false, rbi: true, sachet: true, lc: true },
  { capability: 'Preventive', pp: true, rbi: false, sachet: false, lc: true },
  { capability: 'Instant', pp: true, rbi: false, sachet: false, lc: true },
  { capability: 'In Telegram', pp: false, rbi: false, sachet: false, lc: true },
  { capability: 'Evidence-based', pp: false, rbi: false, sachet: false, lc: true },
];

function Icon({ yes }) {
  return yes
    ? <CheckCircle size={20} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 4px rgba(0,212,170,0.3))' }} />
    : <XCircle size={20} color="var(--text-secondary)" style={{ opacity: 0.5 }} />;
}

export default function Competition() {
  const revealRef = useScrollReveal();

  return (
    <section id="competition" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Why LenderCheck?</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          See how we compare against existing solutions.
        </p>
        
        <div className="table-wrapper glass-card reveal-item" style={{ transitionDelay: '0.1s', padding: '0', overflow: 'hidden' }}>
          <table className="comp-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Play Protect</th>
                <th>RBI Directory</th>
                <th>Sachet Portal</th>
                <th className="lc-col">LenderCheck</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{row.capability}</td>
                  <td><Icon yes={row.pp} /></td>
                  <td><Icon yes={row.rbi} /></td>
                  <td><Icon yes={row.sachet} /></td>
                  <td className="lc-col"><Icon yes={row.lc} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
