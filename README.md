# My Marketing Manager (MMM)

> **Ikigai & Business Viability Marketing Platform**  
> An end-to-end full-stack platform that onboards business owners through a 6-step Ikigai & moat diagnostic, calculates a mathematical **Business Viability Index (BVI)**, generates comprehensive brand positioning documentation, and produces a **30-day multi-channel campaign workspace** across LinkedIn, Facebook, Instagram, TikTok, and Email.

---

## 🚀 Key Features

### 1. Module A: Authentication & User Profiles
- Secure registration, login, session cookies with JWT, and password hashing (`bcryptjs`).
- **1-Click Sandbox Demo Account** for instant evaluation without typing credentials.
- Multi-model schema backing `User`, `BusinessProfile`, `IkigaiProfile`, `DiagnosticData`, `StrategyPlan`, and `GeneratedContent`.

### 2. Module B: Multi-Step Diagnostic Wizard
- **Step 0: Ikigai Core Engine** — Passion, Vocation, Mission, Profession, Brand Archetype selector, and Core Values.
- **Step 1: Business Profile & Model** — B2B Service, B2B SaaS, B2C E-Com, B2C Local, Creator, Industry, Geo scope, Stage, Budget and Founder Hours sliders.
- **Step 2: Competitive Diagnostic** — Moat Differentiator, Competitor analysis, Market Saturation (Low, Medium, High, Red Ocean), and Retention rates.
- **Step 3: Audience & Resources** — ICP Demographics, Pain Triggers, Buying Objections, and Existing Assets.
- **Step 4: Scope & Channels** — Strategic Goals, Cadence (Biweekly, Monthly, Quarterly), Active Channels (LinkedIn, Facebook, Instagram, TikTok, Email).
- **Step 5: Review & Calculate** — Live real-time BVI estimate gauge, full configuration summary, and Strategy Synthesizer trigger with celebration effects.

### 3. Module C: Mathematical BVI Scoring Engine & AI Strategy Pipeline
- **BVI Scoring Formula**:
  $$\text{BVI} = 0.25 \times \text{MarketViability} + 0.25 \times \text{PMAlignment} + 0.20 \times \text{Capacity} + 0.15 \times \text{Ikigai} + 0.15 \times \text{ChannelFit}$$
- **Risk Tiers**:
  - `DOMINANT` (85–100%): Market Dominant / High Velocity
  - `HIGH_POTENTIAL` (70–84%): Scale Ready / Growth Trajectory
  - `MODERATE_RISK` (50–69%): Resource Constrained / Focus Required
  - `CRITICAL_PIVOT` (0–49%): Repositioning Required
- **AI Strategy Generator**:
  - Brand Positioning Document & Brand Manifesto
  - 4 Strategic Content Pillars with sample proven hooks
  - Weekly Channel Distribution matrix
  - 30-Day Content Calendar with platform-specific hooks, full copy, Midjourney/DALL-E visual prompts, and short-form video storyboards.

### 4. Module D: Dashboard & Content Studio Workspace
- **Viability Scorecard**: Radial progress gauge with 5-dimension breakdown bars and action directives.
- **Kanban Board**: Drag/move cards between `Draft` $\to$ `Scheduled` $\to$ `Copied` $\to$ `Published`.
- **Calendar View**: 30-day interactive calendar with channel color badges.
- **Post Detail Inspector**: 1-click copy, Hook highlighter, Video script cues (visuals, audio, CTA), Midjourney visual prompts.
- **Multi-Format Export Hub**: 1-click download as **CSV** (formatted for Buffer / Hootsuite / Meta Business Suite), **Markdown**, **JSON**, or **TXT**.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS + Glassmorphism tokens + CSS micro-animations
- **Icons**: Lucide React
- **State**: Zustand with `localStorage` persistence
- **ORM**: Prisma ORM (PostgreSQL for production; SQLite/Memory store for local dev)
- **Deployment**: Configured for Railway.app & Docker

---

## 📦 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment to Railway.app

This repository is configured for automated deployment to Railway.app:

1. Connect the GitHub repository: `https://github.com/rletea/MMM.git`
2. Add a **PostgreSQL** database plugin in Railway.
3. Configure Environment Variables in Railway:
   - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}`
   - `JWT_SECRET`: Any random 32-character string
   - `NODE_ENV`: `production`
   - `OPENAI_API_KEY`: (Optional) Your OpenAI API key
4. Railway will automatically build via `railway.json` / `Dockerfile` / `Procfile` and deploy the application.
