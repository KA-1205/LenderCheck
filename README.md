<!-- prettier-ignore -->
<div align="center">

# LenderCheck

**Verify any loan app in 10 seconds, before it verifies you.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-00d4aa?style=flat-square&logo=netlify&logoColor=fff)](https://lendercheck.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=fff)](https://github.com/KA-1205/LenderCheck)
[![RBI Hackathon 2026](https://img.shields.io/badge/RBI_Hackathon-2026-orange?style=flat-square)](https://github.com/KA-1205/LenderCheck)

A Telegram bot that cross-references RBI's official Digital Lending Apps directory, analyzes APK permissions, and detects fraud patterns — delivering a clear, evidence-based verdict in the same chat where the suspicious link arrived.

[Overview](#overview) • [Features](#features) • [Interactive Demo](#interactive-demo) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Architecture](#architecture) • [Project Structure](#project-structure)

</div>

---

## Overview

Fake loan apps target financially stressed Indians — people who lack the time or technical know-how to verify legitimacy before handing over KYC documents or money. Today's verification (manual search of RBI's directory or Sachet Portal) happens *after* the damage is done, not before.

**LenderCheck** meets users at the point of risk — inside Telegram, where suspicious links arrive. It delivers an instant verdict backed by official regulatory data, static APK analysis, and ML-based fraud detection.

> [!NOTE]
> This repository contains the **interactive demo website** that simulates the LenderCheck Telegram bot experience. All data is simulated — no real API calls or backend. The full PRD for the production Telegram bot is available in [`lendercheck-prd-v2.0.md`](./lendercheck-prd-v2.0.md).

---

## Features

- **Instant Directory Check** — Cross-references RBI's DLA directory and Sachet Portal in under 10 seconds
- **Multi-Input Intake** — Accepts Play Store URLs, app names, or forwarded APK files
- **Opt-In Deep Scan** — User-consented APK permission analysis and ML fraud-language classification
- **Impersonation Detection** — Catches name/package ID mismatches and certificate anomalies
- **Transparent Verdicts** — Never bare "safe" or "unsafe" labels; always specific findings with cited sources
- **Interactive Simulation** — Four pre-built scenarios demonstrating real bot behavior

---

## Interactive Demo

The live site at **[lendercheck.netlify.app](https://lendercheck.netlify.app/)** lets you experience the bot's verdict flow through four simulated scenarios:

| Scenario | What Happens |
|----------|-------------|
| **Not Found** | App not in RBI directory — directory check fails, deep scan reveals permission red flags |
| **Warning** | App found in directory but has Sachet complaints — deep scan uncovers fraud patterns |
| **Verified** | App confirmed as RBI-registered NBFC — green verdict with entity details |
| **Impersonation** | Fake "HDFC Bank" app detected — name/package mismatch flagged |

Each scenario plays through a realistic Telegram-style chat with typing indicators, loading states, and interactive buttons.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 |
| Build Tool | Vite 5 |
| Icons | Lucide React |
| Styling | CSS (custom properties, no framework) |
| Hosting | Netlify |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm or yarn

### Installation

```bash
git clone https://github.com/KA-1205/LenderCheck.git
cd LenderCheck
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Architecture

```
User Input (Play Store link / app name / APK)
         │
         ▼
┌─────────────────────────┐
│  Gate 1: Directory Check │  (< 10s)
│  • RBI DLA Directory     │
│  • Sachet Portal         │
└────────────┬────────────┘
             │
        Not Found?
             │
             ▼
┌─────────────────────────┐
│  Consent Gate            │  (User opts in)
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  Gate 2: Deep Scan       │  (30-60s)
│  • APK Static Analysis   │
│  • ML Fraud Classifier   │
└────────────┬────────────┘
             │
             ▼
    Evidence-Based Verdict
```

For the full technical architecture and data model, see [`lendercheck-prd-v2.0.md`](./lendercheck-prd-v2.0.md).

---

## Project Structure

```
LenderCheck/
├── src/
│   ├── components/          # React components (Hero, Demo, Architecture, etc.)
│   │   ├── Demo.jsx         # Interactive Telegram bot simulation
│   │   ├── Demo.css         # Demo-specific styles
│   │   ├── Hero.jsx         # Landing hero section
│   │   ├── Problem.jsx      # Problem statement
│   │   ├── Features.jsx     # Feature breakdown
│   │   ├── TechStack.jsx    # Technology overview
│   │   ├── Architecture.jsx # System architecture diagram
│   │   ├── Competition.jsx  # Competitive landscape
│   │   └── ...              # Other sections
│   ├── data/
│   │   └── scenarios.js     # Simulated bot scenarios (Not Found, Warning, Verified, Impersonation)
│   ├── hooks/
│   │   └── useScrollReveal.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── lendercheck-prd-v2.0.md  # Full product requirements document
```

---

## How the Demo Works

The interactive demo in `src/components/Demo.jsx` simulates a Telegram bot conversation:

1. User selects a scenario (Not Found / Warning / Verified / Impersonation)
2. Messages appear sequentially with realistic typing delays
3. For risky apps, a consent gate appears: "Run deep scan?"
4. Deep scan shows step-by-step analysis with progress indicators
5. Final verdict displays specific findings, not generic labels

All scenario data lives in `src/data/scenarios.js` — no external API calls.

---

## Regulatory Context

LenderCheck is designed around India's regulatory framework:

- **RBI Digital Lending Directions, 2025** — All Regulated Entities must register DLAs via RBI's CIMS portal
- **RBI DLA Directory** — Public directory operational since July 1, 2025
- **Sachet Portal** — Public complaint platform for deposit/collection fraud
- **MeitY IT Act Section 69A** — 87+ illegal loan apps blocked to date

---

## Disclaimer

> [!WARNING]
> This is a demo prototype — all data is simulated, no real API calls or backend. Verdicts shown are for demonstration purposes only and do not constitute financial advice or regulatory compliance claims.

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

---

## License

See [LICENSE](LICENSE) for details.

