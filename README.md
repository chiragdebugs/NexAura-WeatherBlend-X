# NexAura WeatherBlend-X 🌩️⚡
### Predictive Forecast Reliability & Adaptive Multi-Model NWP Blending System
**Smart India Hackathon (SIH) 2026 — Problem Statement 26081**

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Oxlint](https://img.shields.io/badge/Oxlint-Passing-10B981?logo=oxc&logoColor=white)](https://oxc.rs/)
[![SIH 2026](https://img.shields.io/badge/SIH-2026_PS_26081-FF9933)](https://www.sih.gov.in/)

---

## 🧭 Executive Summary

Standard meteorological multi-model ensembles (MME) frequently rely on static historical weighting or uniform averaging. Over complex Indian subcontinental topography—characterized by monsoon depressions, Western Disturbances, and orographic precipitation along the Western Ghats—this causes systematic phase delays, smeared extreme convective peaks, and uncalibrated uncertainty bounds.

**NexAura WeatherBlend-X** changes this paradigm:

> **"We don't simply average weather models.**  
> WeatherBlend-X predicts how reliable each NWP and neural model is likely to be under the *prevailing atmospheric state*, converts that predicted reliability into dynamic spatial-temporal weights, blends the forecasts probabilistically, calibrates prediction intervals via conformal prediction, and explains exactly why the final forecast should be trusted."

---

## 🔬 Core Innovations

1. **Predictive Error Meta-Learning (NGBoost/XGBoost)**:  
   Rather than using retrospective 30-day rolling averages, our AI meta-learner predicts the conditional future error distribution $|\hat{\varepsilon}_i|$ and posterior variance $\hat{\sigma}_i$ of each model conditioned on CAPE, wind shear, moisture convergence, terrain slope, lead time, and recent 24-hour IMD AWS residuals.

2. **Risk-Aware Dynamic Softmax Weighting**:  
   Models are penalized proportionally to their expected error and epistemic uncertainty using temperature-scaled softmax allocation:
   $$\mathcal{R}_i = |\hat{\varepsilon}_i| + \lambda \cdot \hat{\sigma}_i$$
   $$w_i = \frac{\exp(-\mathcal{R}_i / \tau)}{\sum_{j} \exp(-\mathcal{R}_j / \tau)}$$

3. **Conformal Uncertainty Calibration**:  
   Finite-sample coverage guarantees ($1 - \alpha = 90\%$) through split conformal prediction with non-exchangeability weights, ensuring reliable flood and heavy-precipitation alerting without under-coverage.

4. **Transparent Meteorological Explainability**:  
   Operational forecasters and disaster management authorities (NDMA/SDMA) receive human-readable causal justifications detailing why specific models (e.g., NCUM vs. WRF vs. ECMWF AIFS) gained or lost trust for each lead time and district.

---

## 🏛️ System Architecture & 8-Stage Pipeline

```
  ┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
  │  NCMRWF NCUM   │     │    IMD WRF     │     │    NCEP GFS    │     │   ECMWF AIFS   │
  │ (4km Regional) │     │ (3km Convective│     │ (13km Synoptic)│     │(Neural / ML-NWP│
  └───────┬────────┘     └───────┬────────┘     └───────┬────────┘     └───────┬────────┘
          │                      │                      │                      │
          └──────────────────────┴──────────┬───────────┴──────────────────────┘
                                            ▼
                          ┌──────────────────────────────────┐
                          │   Stage 02: Data Harmonization   │
                          │ Conservative Bilinear Regridding │
                          └─────────────────┬────────────────┘
                                            ▼
                          ┌──────────────────────────────────┐
                          │ Stage 03: Feature Engineering    │
                          │ CAPE, Shear, Moisture Flux, IMD  │
                          └─────────────────┬────────────────┘
                                            ▼
                          ┌──────────────────────────────────┐
                          │ Stage 04: Predictive Trust Engine│
                          │   NGBoost Conditional Residual   │
                          │   Error |ε̂_i| & Variance σ̂_i     │
                          └─────────────────┬────────────────┘
                                            ▼
                          ┌──────────────────────────────────┐
                          │ Stage 05: Risk-Aware Weighting   │
                          │ Softmax: w_i = e^(-R_i/τ)/∑e^... │
                          └─────────────────┬────────────────┘
                                            ▼
                          ┌──────────────────────────────────┐
                          │ Stage 06: Probabilistic Blending │
                          │ Continuous Density Blend & Mass  │
                          └─────────────────┬────────────────┘
                                            ▼
                          ┌──────────────────────────────────┐
                          │ Stage 07: Conformal Calibration  │
                          │ Validated 90% Confidence Bounds  │
                          └─────────────────┬────────────────┘
                                            ▼
                          ┌──────────────────────────────────┐
                          │ Stage 08: Operational Dissemination
                          │ WebSockets, REST APIs, Aurora UI │
                          └──────────────────────────────────┘
```

---

## 🖥️ Workstation Modules & Interface Views

The frontend interface adopts a bespoke **Liquid-Glass Aurora** aesthetic inspired by NCMRWF research workstations, providing high-density meteorological intelligence:

| View | Purpose & Functionality |
| :--- | :--- |
| **Operational Dashboard** | Real-time blended forecast overview, interactive lead-time timeline (`+00h` to `+24h`), trajectory sparklines, dynamic model weights, calibrated uncertainty bands, and extreme-event risk flags. |
| **Forecast Intelligence** | Conditional error distribution histograms, NGBoost probabilistic confidence intervals, and model performance comparisons across meteorological regimes. |
| **Predictive Model Trust** | Model-specific deep dive across lead times and variables (Rainfall, Temperature, Wind Speed), displaying predicted bias, variance, and softmax allocation rationale. |
| **Forecast Map Canvas** | Interactive national meteorological canvas with layer switching between Blended Forecast, Dominant Model Trust, Conformal Uncertainty, and Extreme Flood Probability. |
| **Verification & History** | Ground-truth IMD AWS telemetry comparison vs. blended predictions, residual error logging, and post-run weight adjustment audits. |
| **Technical Pipeline** | Interactive stage-by-stage architecture visualizer detailing data regridding, AI meta-learners, risk formulations, and API dissemination specs. |
| **Workstation Settings** | Algorithmic hyperparameter tuning ($\lambda$ penalty coefficient, $\tau$ temperature, $1-\alpha$ conformal coverage) and real-time ingestion telemetry status. |

---

## 🧮 Mathematical Formulations

### 1. Predicted Model Risk
$$\mathcal{R}_i = |\hat{\varepsilon}_i| + \lambda \cdot \hat{\sigma}_i$$
Where:
- $\hat{\varepsilon}_i$: Conditional bias predicted by the gradient boosted meta-learner.
- $\hat{\sigma}_i$: Posterior uncertainty of the error estimate.
- $\lambda$: Risk aversion penalty factor (default: $0.35$).

### 2. Temperature-Scaled Dynamic Weights
$$w_i = \frac{\exp\left(-\frac{\mathcal{R}_i}{\tau}\right)}{\sum_{j=1}^{M} \exp\left(-\frac{\mathcal{R}_j}{\tau}\right)}$$
Subject to the convex simplex condition: $\sum_{i=1}^{M} w_i = 1, \quad w_i \ge 0$.

### 3. Conformal Prediction Interval
$$C_{1-\alpha}(X) = \left[ \hat{Y}_{\text{blend}} - q_{1-\alpha}, \; \hat{Y}_{\text{blend}} + q_{1-\alpha} \right]$$
Guaranteed finite-sample marginal coverage:
$$\mathbb{P}\left( Y_{t} \in C_{1-\alpha}(X_t) \right) \ge 1 - \alpha$$

---

## 🚀 Tech Stack & Tooling

- **UI Framework**: React 19 + TypeScript + Vite 8
- **Styling Architecture**: Native CSS Variable Design System + Fluid Viewport Scaler (`var(--u)`) + Liquid-Glass Aesthetics (`backdrop-filter: blur(28px)`)
- **Iconography**: Custom zero-dependency SVG meteorological icon library
- **Code Quality**: Oxlint (instantaneous sub-30ms linter) + TypeScript strict typing
- **Responsive Layout**: Dual desktop persistent command-dock + mobile bottom sheet navigation (`≤860px`)

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/chiragdebugs/nexaura-weatherblend-x.git

# Navigate into the project directory
cd nexaura-weatherblend-x

# Install dependencies
npm install

# Start the Vite local development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### Production Build & Linting

```bash
# Verify TypeScript types and compile production bundle
npm run build

# Run high-performance Oxlint verification
npm run lint

# Preview the production build locally
npm run preview
```

---

## 📁 Repository Structure

```
nexaura-weatherblend-x/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # Meteorological imagery & storm textures
│   ├── components/
│   │   ├── common/             # SVG icon suite, SearchModal, TrustDetailModal
│   │   ├── dashboard/          # Cards: MainForecast, ModelTrust, Uncertainty, Trajectory, Disagreement
│   │   └── layout/             # Persistent Sidebar & Global Header
│   ├── data/
│   │   └── weatherMock.ts      # High-fidelity meteorological simulation data across Indian regions
│   ├── pages/
│   │   ├── DashboardView.tsx           # Operational command center
│   │   ├── ForecastIntelligenceView.tsx # Error distributions & NGBoost insights
│   │   ├── ModelTrustView.tsx          # Dynamic trust matrix & math formulations
│   │   ├── ForecastMapView.tsx         # Interactive SVG meteorological canvas
│   │   ├── ForecastHistoryView.tsx     # Ground-truth AWS verification
│   │   ├── PipelineView.tsx            # 8-stage technical architecture
│   │   └── SettingsView.tsx            # Hyperparameter tuning & telemetry
│   ├── styles/
│   │   ├── aurora.css          # Liquid-glass tokens, glow filters & animations
│   │   └── index.css           # Global typography & root layout rules
│   ├── types/
│   │   └── weather.ts          # Comprehensive meteorological TypeScript interfaces
│   ├── App.tsx                 # Core application shell & navigation state
│   └── main.tsx                # Entry point
├── index.html                  # HTML template with Google Fonts (Outfit & JetBrains Mono)
├── package.json                # Project configuration
├── tsconfig.json               # TypeScript compiler options
└── vite.config.ts              # Vite configuration
```

---

## 👥 Smart India Hackathon (SIH) 2026 Team

- **Problem Statement**: 26081 — Predictive Forecast Reliability & Adaptive Multi-Model NWP Blending System
- **Focus Area**: Earth Sciences, Meteorological Intelligence & Disaster Early Warning Systems
- **Organization**: Ministry of Earth Sciences (MoES) / IMD / NCMRWF

---

## 📄 License

This project is developed for Smart India Hackathon 2026. Licensed under the [MIT License](LICENSE).
