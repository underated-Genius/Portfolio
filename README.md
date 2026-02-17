# 🚀 Elite IT Student Portfolio

A premium, futuristic portfolio website built with Next.js, Three.js, and Framer Motion. Designed to position an IT undergraduate as technically strong, creative, and industry-ready.

## ✨ Features

- **Smart Loader** — Elegant 2-second loading animation with code compilation effect
- **3D Hero** — Interactive Three.js scene with orbiting elements, particle field, and mouse-reactive tilt
- **Scrolltelling About** — Animated timeline, skill bars, and glassmorphic cards
- **Tech Stack Section** — Interactive badge grid with hover glow and animated counters
- **Dynamic GitHub Projects** — Live data from GitHub API, sorted by recency, filtered to non-forks
- **Featured Projects** — Browser mockup previews with scroll-based reveal
- **CTA Section** — Animated gradient background, email copy, download CV
- **Custom Cursor** — Mix-blend-mode cursor that transforms on hover
- **Scroll Progress Bar** — Gradient progress indicator at top of viewport
- **Glassmorphism** — Consistent glass design system throughout
- **Dark Theme** — Deep space dark with blue/cyan/purple gradient accents

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animations)
- **React Three Fiber + @react-three/drei** (3D scene)
- **Three.js** (underlying 3D engine)
- **GitHub REST API** (dynamic project data)

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your details:

```env
GITHUB_TOKEN=your_github_personal_access_token
NEXT_PUBLIC_GITHUB_USERNAME=your_username
NEXT_PUBLIC_PORTFOLIO_NAME=Your Name
NEXT_PUBLIC_PORTFOLIO_TITLE=IT Undergraduate & Full-Stack Engineer
NEXT_PUBLIC_EMAIL=you@email.com
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/in/yourprofile
NEXT_PUBLIC_CV_URL=https://drive.google.com/your-cv
NEXT_PUBLIC_SITE_URL=https://yourportfolio.vercel.app
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Info
All personal data is controlled via environment variables. Update your `.env.local` file.

### Projects Section
The `FeaturedProjects.tsx` component contains placeholder projects. Replace with your actual projects:

```tsx
const featured = [
  {
    title: 'Your Project Name',
    desc: 'Your project description...',
    tech: ['React', 'Node.js'],
    url: 'https://yourproject.vercel.app',
    github: 'https://github.com/you/project',
    // ... styling options
  },
];
```

### Colors & Theme
Colors are defined in `tailwind.config.js`. The core palette:
- `#4F8EF7` — Primary blue
- `#00D4FF` — Cyan accent  
- `#8B5CF6` — Purple accent
- `#050810` — Background

### Timeline (About Section)
Edit the `timeline` array in `components/About.tsx` to reflect your journey.

### Tech Stack
Update `techCategories` in `components/TechStack.tsx` with your actual skills.

## 📦 Deployment (Vercel)

### One-click deploy:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)

### Manual deploy:

1. Push to GitHub
2. Import project in Vercel
3. Add all environment variables from `.env.example`
4. Deploy!

### Required Vercel Environment Variables:
```
GITHUB_TOKEN (server-side, no NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_GITHUB_USERNAME
NEXT_PUBLIC_PORTFOLIO_NAME
NEXT_PUBLIC_PORTFOLIO_TITLE
NEXT_PUBLIC_EMAIL
NEXT_PUBLIC_LINKEDIN
NEXT_PUBLIC_CV_URL
NEXT_PUBLIC_SITE_URL
```

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── github/
│   │       └── route.ts      # GitHub API endpoint
│   ├── globals.css           # Global styles, animations, utilities
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page orchestrator
├── components/
│   ├── Loader.tsx            # Smart loading screen
│   ├── Navbar.tsx            # Sticky navbar with scroll progress
│   ├── Hero.tsx              # Full-screen hero section
│   ├── HeroScene.tsx         # Three.js 3D scene (lazy loaded)
│   ├── About.tsx             # About + timeline + skills
│   ├── TechStack.tsx         # Tech badges + animated counters
│   ├── Projects.tsx          # Dynamic GitHub repos grid
│   ├── FeaturedProjects.tsx  # Featured work with mockups
│   ├── CTA.tsx               # Contact + footer
│   └── CustomCursor.tsx      # Custom cursor effect
├── lib/
│   └── github.ts             # GitHub API utilities
├── .env.example              # Environment variables template
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## ⚡ Performance

- 3D scene lazy-loaded (no impact on initial load)
- GitHub data cached for 1 hour (ISR)
- Optimized images via Next.js Image
- CSS animations over JS where possible

## 🔐 GitHub API

The portfolio fetches your public repositories via the GitHub REST API:
- Excludes forks and archived repos
- Sorts by last updated
- Shows top 8 projects
- Displays live demo button if `homepage` field is set on the repo
- Auto-detects Vercel deployments

**Rate limiting:** Without a token, GitHub allows 60 requests/hour. With a `GITHUB_TOKEN`, this increases to 5,000/hour.

## 📝 License

MIT — free to use, customize, and deploy.
