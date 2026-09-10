import React from 'react';
import { Calendar, Code, TestTube, Rocket } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const phases = [
  {
    icon: Calendar,
    title: 'Phase 1: Planning',
    weeks: 'Weeks 1–2',
    color: 'var(--accent)',
    tasks: [
      'PRD approval',
      'RBI DLA directory format investigation',
      'Sachet Portal scrape feasibility',
      'Legal review of verdict language templates',
      'ML training data sourcing strategy',
    ],
  },
  {
    icon: Code,
    title: 'Phase 2: Core Build',
    weeks: 'Weeks 3–10',
    color: 'var(--primary)',
    sprints: [
      { sprint: 'Sprint 1', weeks: '3–4', deliverables: 'Telegram bot skeleton, Multi-Input Intake, RBI directory ingestion' },
      { sprint: 'Sprint 2', weeks: '5–6', deliverables: 'Directory Check Service (Gate 1), Verdict Renderer v1' },
      { sprint: 'Sprint 3', weeks: '7–8', deliverables: 'Static APK Analysis (Androguard), permission baseline' },
      { sprint: 'Sprint 4', weeks: '9–10', deliverables: 'ML Classifier, Deep Scan Orchestrator, consent gate' },
    ],
  },
  {
    icon: TestTube,
    title: 'Phase 3: Testing',
    weeks: 'Weeks 11–12',
    color: 'var(--warning)',
    tasks: [
      'QA across all three input types',
      'Classifier precision/recall evaluation',
      'Load testing for directory-check path',
      'False-negative audit: known-fraudulent apps',
    ],
  },
  {
    icon: Rocket,
    title: 'Phase 4: Launch',
    weeks: 'Week 13',
    color: 'var(--primary)',
    tasks: [
      'Soft launch to beta group (financial-literacy partners)',
      'Monitor directory-check latency and classifier precision',
      'Public launch with press/community announcement',
    ],
  },
];

export default function Timeline() {
  const revealRef = useScrollReveal();

  return (
    <section id="timeline" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">Project Roadmap</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          13-week plan from PRD approval to public launch.
        </p>

        <div className="timeline-container">
          <div className="timeline-line" />

          {phases.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <div
                key={i}
                className="timeline-phase reveal-item"
                style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
              >
                <div className="timeline-dot" style={{ '--phase-color': phase.color }}>
                  <Icon size={20} />
                </div>

                <div className="timeline-card glass-card" style={{ '--phase-color': phase.color }}>
                  <div className="timeline-card-header">
                    <h3>{phase.title}</h3>
                    <span className="timeline-weeks">{phase.weeks}</span>
                  </div>

                  {phase.tasks && (
                    <ul className="timeline-tasks">
                      {phase.tasks.map((task, ti) => (
                        <li key={ti}>{task}</li>
                      ))}
                    </ul>
                  )}

                  {phase.sprints && (
                    <div className="timeline-sprints">
                      {phase.sprints.map((sprint, si) => (
                        <div key={si} className="timeline-sprint">
                          <div className="sprint-header">
                            <span className="sprint-name">{sprint.sprint}</span>
                            <span className="sprint-weeks">Weeks {sprint.weeks}</span>
                          </div>
                          <p className="sprint-deliverables">{sprint.deliverables}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
