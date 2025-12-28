# SentinelAI Frontend

A modern, professional cybersecurity web application built with React, TypeScript, and Tailwind CSS.

## Features

- **Threat Analyzer**: Analyze suspicious text or URLs to assess digital risk
- **Dashboard**: System overview and status monitoring
- **Clean UI**: Professional design inspired by enterprise SaaS applications
- **Type-Safe**: Full TypeScript implementation
- **Integration-Ready**: API layer prepared for FastAPI backend

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **React Router** - Navigation
- **Axios** - API client
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── api/              # API integration layer
│   └── sentinelApi.ts
├── components/       # Reusable UI components
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── AnalyzerForm.tsx
│   ├── ResultSummary.tsx
│   ├── ImmuneSystemPanel.tsx
│   └── InfoCard.tsx
├── pages/           # Page components
│   ├── Dashboard.tsx
│   └── ThreatAnalyzer.tsx
├── layouts/         # Layout components
│   └── MainLayout.tsx
├── types/           # TypeScript type definitions
│   ├── enums.ts
│   └── schema.ts
├── utils/           # Utility functions
│   └── formatters.ts
├── App.tsx          # Main app component with routing
└── main.tsx         # Application entry point
```

## Backend Integration

The application is designed to connect to a FastAPI backend. To integrate:

1. Set the `VITE_API_BASE_URL` environment variable in `.env`
2. Implement the backend endpoints:
   - `POST /api/analyze` - Threat analysis
   - `POST /api/immune-check` - Immune system response

The API client is located in `src/api/sentinelApi.ts`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Design Philosophy

The UI follows a clean, professional design inspired by modern SaaS applications:

- **White/light-neutral base** with soft gray sections
- **Clear typography hierarchy** using Inter font
- **Rounded cards** with subtle borders and shadows
- **Calm accent colors** (Steel Azure blue)
- **Minimal animations** and clean spacing

## License

Private - Enterprise Application