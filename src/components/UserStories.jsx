import React from 'react';
import { Link2, FileUp, ShieldCheck, Eye, UserCheck } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const stories = [
  {
    icon: Link2,
    title: 'Instant Directory Check',
    priority: 'P0',
    points: 5,
    asA: 'prospective borrower',
    iWant: 'to paste a Play Store link or app name into the bot',
    soThat: 'I immediately know if it\'s on RBI\'s approved lender list',
    criteria: [
      'Bot replies within 10 seconds with "Found" or "Not found"',
      'Reply names the source checked and data snapshot date',
      'Found verdict includes the registered entity name',
      'Not-found verdict includes link to manual check',
    ],
  },
  {
    icon: FileUp,
    title: 'Forward an APK',
    priority: 'P0',
    points: 8,
    asA: 'user who received an APK file directly',
    iWant: 'to forward the file to the bot',
    soThat: 'I can check it even though it isn\'t on Google Play',
    criteria: [
      'Bot extracts package name and signing certificate',
      'Runs directory check using package identity',
      'If no match, offers opt-in deep scan',
      'Handles corrupted APK with clear error message',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Opt-In Deep Scan',
    priority: 'P0',
    points: 8,
    asA: 'user whose app wasn\'t found in the RBI directory',
    iWant: 'to explicitly request a deeper scan',
    soThat: 'I get more evidence before deciding whether to proceed',
    criteria: [
      'Bot presents inline button: "Run deep scan? (~30–60 sec)"',
      'Deep scan never starts without explicit user tap',
      'User is told upfront this will take longer',
      'User can decline and end with directory-only verdict',
    ],
  },
  {
    icon: Eye,
    title: 'Transparent Verdict',
    priority: 'P0',
    points: 5,
    asA: 'user who receives a scan verdict',
    iWant: 'the reason spelled out, not just "safe" or "unsafe"',
    soThat: 'I can make my own informed decision',
    criteria: [
      'Never shows a bare "Safe" / "Unsafe" label alone',
      'Lists specific findings with plain-language explanations',
      'Includes recommended next step',
      'Sources checked are always cited with timestamps',
    ],
  },
  {
    icon: UserCheck,
    title: 'Impersonation Detection',
    priority: 'P0',
    points: 8,
    asA: 'borrower who received a link claiming to be a well-known bank',
    iWant: 'to know if the app is a genuine bank app or an impersonator',
    soThat: 'I don\'t accidentally install a clone app',
    criteria: [
      'Bot finds directory entry under different official package ID',
      'Flags name/identity mismatch',
      'Surfaces the official app\'s real link',
      'Recommends deep scan to confirm impersonation',
    ],
  },
];

export default function UserStories() {
  const revealRef = useScrollReveal();

  return (
    <section id="user-stories" ref={revealRef}>
      <div className="container">
        <h2 className="section-title reveal-item">User Stories</h2>
        <p className="section-subtitle reveal-item" style={{ transitionDelay: '0.05s' }}>
          Core workflows that drive the product, each with clear acceptance criteria.
        </p>

        <div className="stories-grid">
          {stories.map((story, i) => {
            const Icon = story.icon;
            return (
              <div
                key={i}
                className="story-card glass-card reveal-item"
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="story-header">
                  <div className="story-icon-wrap">
                    <Icon size={22} />
                  </div>
                  <div className="story-badges">
                    <span className="story-badge story-badge--priority">{story.priority}</span>
                    <span className="story-badge story-badge--points">{story.points} pts</span>
                  </div>
                </div>

                <h3 className="story-title">{story.title}</h3>

                <div className="story-narrative">
                  <p>
                    <strong>As a</strong> {story.asA},<br/>
                    <strong>I want to</strong> {story.iWant},<br/>
                    <strong>So that</strong> {story.soThat}.
                  </p>
                </div>

                <div className="story-criteria">
                  <h4>Acceptance Criteria</h4>
                  <ul>
                    {story.criteria.map((c, ci) => (
                      <li key={ci}>
                        <span className="story-check">☐</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
