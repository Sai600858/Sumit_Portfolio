# Sumit Karkhile — Software Engineer Portfolio Website

A personal portfolio website engineered for **Sumit Karkhile**, Computer Engineering student at **PICT Pune** (CGPA: 9.45/10), **LeetCode Knight** (1950 max rating, 700+ DSA problems solved), and **Java / Spring Boot / Full-Stack** developer.

Built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**.

---

## ⚡ Key Highlights & Architecture

- **Visual Aesthetics**: Sleek dark charcoal & near-black editorial design inspired by minimalist developer portfolios, featuring subtle glowing borders, high-contrast typography, and restrained technical accents.
- **Authentic Portrait & Resume**: Uses the verified photograph (`public/self.jpeg`) and provides direct downloads for the official PDF resume (`public/Sumit-Karkhile-Resume.pdf`).
- **100% Resume-Verified Data**: Single source of truth in [`src/data/portfolioData.ts`](./src/data/portfolioData.ts) containing authentic links to GitHub, LinkedIn, LeetCode, CodeChef, and project repositories.
- **Featured Projects with Deep-Dive Modals**:
  - **PageForge — AI-Powered PDF Toolkit**: Spring Boot 3.3, Java 21, React 19, MySQL, Google Gemini API, Apache PDFBox, Apache POI, AWS S3, Docker, GitHub Actions, Nginx. [GitHub Repository](https://github.com/Sai600858/Page-Forge).
  - **Canteen Management System**: Full-stack cafeteria platform with role-based access control (RBAC), JWT authentication with HTTP-only cookies, QR-based voucher verification, and MySQL JPA concurrency handling. [GitHub Repository](https://github.com/Sai600858/CanteenSystem).
  - **AI/ML Resume Parser & Matcher**: In-house research internship at PICT using NLP transformer models, Sentence-BERT semantic embeddings, and cosine similarity scoring.
  - **Aluminate**: Smart India Hackathon (SIH) 2025 alumni management platform design.
- **Categorized Technical Matrix**: Programming Languages, Backend Development, Frontend, Databases, Cloud & DevOps, Tools, and Core Computer Science.
- **Competitive Programming Profiles**: Dedicated section showcasing LeetCode Knight (1950 rating), CodeChef 3-Star (1650 rating), and 700+ DSA problems.
- **Interactive Developer CLI Terminal**: Floating and navbar-accessible terminal simulator supporting `help`, `about`, `projects`, `skills`, `stats`, `contact`, `resume`, and quick action chips.
- **Contact & Communication**: One-click clipboard copy for verified email (`karkhilesumit5654@gmail.com`), phone, location, and a functional mailto message composer with celebratory confetti.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+ recommended, v22 tested) and **npm** installed.

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build

To create an optimized production build:

```bash
npm run build
```

The compiled static assets will be output to the `dist/` folder.

To preview the production bundle locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
d:/portfolio/
├── public/
│   ├── self.jpeg                 # Verified personal portrait
│   ├── Sumit-Karkhile-Resume.pdf # Official PDF resume
│   └── favicon.svg               # Site icon
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky navigation with mobile drawer & CLI trigger
│   │   ├── Hero.tsx              # First-impression hero with verified stats & portrait
│   │   ├── About.tsx             # Engineering values & PICT Computer Engineering bio
│   │   ├── Education.tsx         # PICT Pune, 9.45 CGPA & Core CS coursework
│   │   ├── Experience.tsx        # In-House PICT Research Internship
│   │   ├── Projects.tsx          # Featured project cards with category filters
│   │   ├── ProjectModal.tsx      # System architecture & engineering deep-dive modal
│   │   ├── Skills.tsx            # Categorized skills matrix with filter pills
│   │   ├── CodingProfiles.tsx    # LeetCode Knight, CodeChef 3★, GitHub, LinkedIn
│   │   ├── Leadership.tsx        # SIH 2025 & PICT INC Coordinator
│   │   ├── InteractiveTerminal.tsx # Developer CLI terminal simulator
│   │   ├── Contact.tsx           # Email copy, verified details & message dispatcher
│   │   ├── Footer.tsx            # Minimalist copyright & back-to-top
│   │   └── Icons.tsx             # Clean SVGs for GitHub, LinkedIn, LeetCode
│   ├── data/
│   │   └── portfolioData.ts      # Centralized source of truth
│   ├── types/
│   │   └── portfolio.ts          # TypeScript interfaces
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Tailwind CSS & design tokens
│   └── main.tsx                  # React entry point
├── tailwind.config.js            # Tailwind typography, colors, and glow configs
├── tsconfig.json                 # TypeScript configurations
├── vite.config.ts                # Vite build configuration
└── package.json                  # Dependencies and scripts
```

---

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push this repository to GitHub: `git push origin main`
2. Connect your repository on [vercel.com](https://vercel.com)
3. Framework Preset: **Vite**
4. Deploy!

### Netlify
1. Connect repository on [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`
2. Add `"homepage": "https://Sai600858.github.io/portfolio"` in `package.json`
3. Add deploy script: `"deploy": "gh-pages -d dist"`
4. Run: `npm run build && npm run deploy`

---

## 📄 License & Attribution
Designed & Built for **Sumit Karkhile** © 2026. All rights reserved.
