import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Shield } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { scenarios } from '../data/scenarios';
import './Demo.css';

export default function Demo() {
  const revealRef = useScrollReveal();
  const [activeScenario, setActiveScenario] = useState(null);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [phase, setPhase] = useState('idle'); // idle, playing, consent, deepScan, done
  const [deepScanStep, setDeepScanStep] = useState(0);
  const [deepScanProgress, setDeepScanProgress] = useState(0);
  const [showDeepResult, setShowDeepResult] = useState(false);
  const [toast, setToast] = useState(null);
  const chatRef = useRef(null);
  const timeoutsRef = useRef([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const addTimeout = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  };

  const scrollToBottom = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, showDeepResult, deepScanStep, scrollToBottom]);

  const now = () => {
    const d = new Date();
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const startScenario = (scenario) => {
    clearTimeouts();
    setActiveScenario(scenario);
    setVisibleMessages([]);
    setPhase('playing');
    setDeepScanStep(0);
    setDeepScanProgress(0);
    setShowDeepResult(false);
    setToast(null);

    // Play through messages with delays
    let delay = 400;
    const messages = scenario.messages;

    messages.forEach((msg, i) => {
      const isConsent = msg.type === 'consent';
      addTimeout(() => {
        setVisibleMessages(prev => [...prev, { ...msg, time: now() }]);
        if (isConsent) {
          setPhase('consent');
        }
        if (msg.type === 'action') {
          setPhase('done');
        }
      }, delay);

      if (msg.sender === 'bot') {
        delay += msg.type === 'loading' ? 800 : 1200;
      } else {
        delay += 600;
      }
    });
  };

  const handleDeepScan = () => {
    if (!activeScenario || !activeScenario.deepScanSteps) return;
    setPhase('deepScan');

    // Remove consent message
    setVisibleMessages(prev => prev.filter(m => m.type !== 'consent'));

    // Add user acceptance message
    setVisibleMessages(prev => [...prev, { sender: 'user', type: 'text', content: 'Yes, run deep scan', time: now() }]);

    const steps = activeScenario.deepScanSteps;
    let delay = 800;

    steps.forEach((step, i) => {
      addTimeout(() => {
        setDeepScanStep(i + 1);
        setDeepScanProgress(((i + 1) / steps.length) * 100);
        setVisibleMessages(prev => {
          // Remove previous loading message and add new one
          const filtered = prev.filter(m => m.type !== 'loading' || m.sender !== 'bot' || !m._isDeepScan);
          return [...filtered, { sender: 'bot', type: 'loading', content: step, time: now(), _isDeepScan: true }];
        });
      }, delay);
      delay += 1200;
    });

    // Show final result
    addTimeout(() => {
      setVisibleMessages(prev => prev.filter(m => !(m.type === 'loading' && m._isDeepScan)));
      setShowDeepResult(true);
      setPhase('done');
    }, delay + 500);
  };

  const handleNoThanks = () => {
    if (!activeScenario) return;
    setPhase('done');
    setVisibleMessages(prev => [
      ...prev.filter(m => m.type !== 'consent'),
      { sender: 'user', type: 'text', content: 'No thanks', time: now() },
      { sender: 'bot', type: 'text', content: activeScenario.noThanksMessage, time: now() }
    ]);
  };

  const resetDemo = () => {
    clearTimeouts();
    setActiveScenario(null);
    setVisibleMessages([]);
    setPhase('idle');
    setDeepScanStep(0);
    setDeepScanProgress(0);
    setShowDeepResult(false);
  };

  const renderMessage = (msg, i) => {
    const wrapperClass = `demo-message-wrapper demo-message-wrapper--${msg.sender}`;

    if (msg.type === 'loading') {
      return (
        <div key={i} className={wrapperClass}>
          <div className="demo-message demo-message--bot demo-message--loading">
            <div className="demo-typing">
              <div className="demo-typing-dot" />
              <div className="demo-typing-dot" />
              <div className="demo-typing-dot" />
            </div>
            {msg.content}
          </div>
        </div>
      );
    }

    if (msg.type === 'result-card') {
      return (
        <div key={i} className={wrapperClass}>
          <div className={`demo-result-card demo-result-card--${msg.status}`}>
            <div className="demo-result-header">
              <span style={{ fontSize: 24 }}>{msg.icon}</span>
              <span>{msg.title}</span>
            </div>
            {msg.body && <p style={{ margin: 0, fontSize: 13, color: '#ccc' }}>{msg.body}</p>}
            {msg.alert && (
              <div className="demo-result-alert demo-stagger-1">
                <div className="demo-alert-header">
                  <span>{msg.alert.icon}</span> {msg.alert.title}
                </div>
                <div className="demo-alert-desc">{msg.alert.description}</div>
              </div>
            )}
            <div className="demo-result-checks demo-stagger-2">
              {msg.checks.map((check, ci) => (
                <div key={ci} className="demo-check-item">
                  <div className={`demo-dot demo-dot--${check.status}`} />
                  <span className="demo-check-label">{check.label}:</span>
                  <span className="demo-check-value">{check.value}</span>
                </div>
              ))}
            </div>
            {msg.complaints && (
              <div className="demo-result-complaints demo-stagger-3">
                {msg.complaints.map((c, ci) => (
                  <span key={ci}>{c}</span>
                ))}
              </div>
            )}
          </div>
          <span className="demo-message-time">{msg.time}</span>
        </div>
      );
    }

    if (msg.type === 'consent') {
      return (
        <div key={i} className={wrapperClass}>
          <div className="demo-message demo-message--bot">
            <div className="demo-consent">
              <p style={{ whiteSpace: 'pre-line' }}>{msg.content}</p>
              <div className="demo-consent-buttons">
                <button className="demo-btn-primary" onClick={handleDeepScan}>
                  🔬 Yes, Run Deep Scan
                </button>
                <button className="demo-btn-outline" onClick={handleNoThanks}>
                  No Thanks
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (msg.type === 'action') {
      return (
        <div key={i} className={wrapperClass}>
          <div className="demo-message demo-message--bot">
            <button
              className="demo-btn-primary"
              onClick={() => {
                if (msg.actionType === 'reset') resetDemo();
                else {
                  setToast('This would open the official app link');
                  addTimeout(() => setToast(null), 2500);
                }
              }}
            >
              {msg.actionLabel}
            </button>
          </div>
        </div>
      );
    }

    // Default text message
    return (
      <div key={i} className={wrapperClass}>
        <div className={`demo-message demo-message--${msg.sender}`}>
          <span style={{ whiteSpace: 'pre-line' }}>{msg.content}</span>
        </div>
        <span className="demo-message-time">{msg.time}</span>
      </div>
    );
  };

  const renderDeepScanResult = () => {
    if (!activeScenario || !activeScenario.deepScanResult || !showDeepResult) return null;
    const r = activeScenario.deepScanResult;

    return (
      <div className="demo-message-wrapper demo-message-wrapper--bot">
        <div className="demo-deep-result">
          <div className="demo-deep-header">
            <span style={{ fontSize: 28 }}>{r.icon}</span>
            <div>
              <div className="demo-deep-title">{r.title}</div>
              <div className="demo-deep-subtitle">{r.subtitle}</div>
            </div>
          </div>

          <div className="demo-deep-section demo-stagger-1">
            <div className="demo-section-title">🔐 Dangerous Permissions</div>
            {r.permissionFlags.map((p, i) => (
              <div key={i} className="demo-permission-item">
                <span className="demo-dot demo-dot--danger" />
                <code className="demo-code">{p.permission}</code>
                <span className="demo-desc">{p.description}</span>
              </div>
            ))}
          </div>

          <div className="demo-deep-section demo-stagger-2">
            <div className="demo-section-title">🤖 Fraud Patterns Detected</div>
            {r.fraudPatterns.map((fp, i) => (
              <div key={i} className="demo-pattern-item">
                <div className="demo-pattern-header">
                  <span style={{ color: '#fff', fontWeight: 500 }}>{fp.label}</span>
                  <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{fp.confidence}%</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{fp.pattern}</div>
                <div className="demo-confidence">
                  <div
                    className="demo-confidence-bar"
                    style={{
                      width: `${fp.confidence}%`,
                      background: fp.confidence > 90
                        ? 'linear-gradient(to right, var(--warning), var(--danger))'
                        : 'linear-gradient(to right, var(--warning), var(--warning))'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="demo-deep-section demo-stagger-3">
            <div className="demo-section-title">📋 Recommendations</div>
            <ul className="demo-recs-list">
              {r.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="demo" ref={revealRef}>
      <div className="container">
        <div className="demo-section reveal-item">
          <div className="demo-intro">
            <h2 className="section-title">Interactive Demo</h2>
            <p className="demo-subtitle">See how LenderCheck analyzes different types of lending apps</p>
            <div className="demo-badge-wrap">
              <span className="demo-badge">SIMULATED • NO REAL DATA</span>
              <span className="demo-note">Select a scenario below to start</span>
            </div>
          </div>

          <div className="demo-phone">
            <div className="demo-notch" />
            <div className="demo-header">
              <div className="demo-header-left">
                <div className="demo-bot-avatar"><Shield size={14} color="#000" /></div>
                <div className="demo-bot-info">
                  <span className="demo-bot-name">LenderCheck Bot</span>
                  <span className="demo-bot-status">
                    {phase !== 'idle' ? '● Analyzing...' : '● Online'}
                  </span>
                </div>
              </div>
            </div>

            <div className="demo-chat" ref={chatRef}>
              {visibleMessages.length === 0 ? (
                <div className="demo-placeholder">
                  <Shield size={32} style={{ opacity: 0.3, marginBottom: 8 }} /><br />
                  Choose a scenario to begin
                </div>
              ) : (
                <>
                  {visibleMessages.map((msg, i) => renderMessage(msg, i))}
                  {phase === 'deepScan' && (
                    <div className="demo-deep-progress-container">
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>
                        Deep scan: step {deepScanStep} of {activeScenario?.deepScanSteps?.length || 0}
                      </div>
                      <div className="demo-deep-progress">
                        <div className="demo-deep-progress-fill" style={{ width: `${deepScanProgress}%` }} />
                      </div>
                    </div>
                  )}
                  {renderDeepScanResult()}
                </>
              )}
            </div>
          </div>

          {toast && <div className="demo-toast">{toast}</div>}

          <div className="demo-scenario-buttons">
            {scenarios.map((s) => (
              <button
                key={s.id}
                className={`demo-scenario-btn ${activeScenario?.id === s.id ? 'demo-scenario-btn--active' : ''}`}
                onClick={() => startScenario(s)}
                disabled={phase === 'playing' || phase === 'deepScan'}
              >
                {s.label}
              </button>
            ))}
            {activeScenario && (
              <button className="demo-scenario-btn" onClick={resetDemo}>
                🔄 Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
