# Fusion Limited — Landing Page

A modern, responsive landing page for **Fusion Limited**, a specialist wellhead solutions partner serving the oil and gas industry. Built as a client project by [Bexoni](https://www.bexoni.com/).

**Live Site:** [https://www.bexoni.com/](https://www.bexoni.com/)

---

## Overview

Fusion Limited provides comprehensive wellhead maintenance, repair, pressure testing, equipment procurement, and emergency response services. This site serves as their public-facing landing page, showcasing services, client testimonials, a downtime cost calculator, company story, and contact information.

### Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, features, testimonials, ROI calculator, CTA |
| `/about` | About — company overview, bento grid of services, project showcase |
| `/faqs` | FAQs — frequently asked questions |
| `/blogs` | Blog — articles and updates |
| `/tools` | Tools — utility tools |
| `/story` | Story — the founding story behind Fusion |
| `/contact` | Contact — contact form with email, phone, and address |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Vite](https://vite.dev/) | Build tool & dev server |
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [SWC](https://swc.rs/) | Fast compilation (via `@vitejs/plugin-react-swc`) |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | UI component library (Button, Select, Slider, Card, Sheet) |
| [Radix UI](https://www.radix-ui.com/) | Accessible headless primitives |
| [Framer Motion](https://www.framer.com/motion/) | Animations and transitions |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Lucide React](https://lucide.dev/) | Icon library |
| [pnpm](https://pnpm.io/) | Package manager |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 8

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd fusion

# Install dependencies
pnpm install
```

### Development

```bash
# Start the dev server
pnpm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Build

```bash
# Type-check and build for production
pnpm run build
```

Output is written to the `dist/` directory.

### Preview

```bash
# Preview the production build locally
pnpm run preview
```

### Lint

```bash
# Run ESLint
pnpm run lint
```

---

## Project Structure

```
fusion/
├── public/                 # Static assets
├── src/
│   ├── components/         # Shared components (header, footer, layout, sections)
│   │   ├── ui/             # shadcn/ui primitives (button, select, slider, etc.)
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── Layout.tsx
│   │   ├── hero.tsx
│   │   ├── features-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── roi-calculator-section.tsx
│   │   ├── cta-section.tsx
│   │   └── ...
│   ├── pages/              # Route-level page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   ├── Faqs.tsx
│   │   ├── Story.tsx
│   │   └── Tools.tsx
│   ├── lib/                # Utilities (cn helper)
│   ├── App.tsx             # Router setup
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind imports, custom theme, animations
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Theme

The site supports **light and dark mode** with system detection and a manual toggle. Custom theme colours are defined in `src/index.css` using Tailwind CSS v4's `@theme inline` syntax:

- `--color-bexoni: #9948fb` — primary brand purple used for titles, buttons, and accents

---

## Credits

Designed and developed by [Bexoni](https://www.bexoni.com/).
