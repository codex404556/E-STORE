<div align="center">
  <div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white" alt="sanity" />
    <img src="https://img.shields.io/badge/Clerk-3B82F6?style=for-the-badge&logo=clerk&logoColor=white" alt="clerk" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/Zustand-1E293B?style=for-the-badge&logo=react&logoColor=white" alt="zustand" />
    <img src="https://img.shields.io/badge/Radix_UI-111827?style=for-the-badge&logo=radixui&logoColor=white" alt="radixui" />
  </div>
  <h3 align="center">E-Store</h3>
  <p align="center">
    A modern e-commerce storefront built with Next.js App Router, Sanity CMS, and a polished shopping flow.
  </p>
</div>

## Introduction

E-Store is a production-style e-commerce frontend that combines server-driven content with a fast client shopping experience. The app delivers category and brand browsing, deal pages, product detail views, favorites, and a full cart flow. Content is managed in Sanity Studio, while client state is handled with Zustand for a smooth UX.

## Engineering Stack

- Next.js 16 (App Router), React 19, TypeScript
- Sanity CMS + next-sanity
- Tailwind CSS, Radix UI, Lucide icons
- Clerk authentication (optional)
- Zustand state management

## Features

- Home page with featured products, categories, brands, and latest blog posts
- Product catalog with category and brand filtering
- Product detail pages with image gallery and product info tabs
- Favorites and cart flow with persistent client state
- Deal page and category-specific product views
- Sanity Studio at `/studio` for content management

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- A Sanity project (project ID + dataset)
- A Clerk application if you want auth-gated experiences

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-27
```

If you use Clerk, add your keys following the Clerk Next.js setup guide.

### Run the App

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - build for production
- `npm run start` - run the production server
- `npm run lint` - run ESLint
- `npm run typegen` - generate Sanity schema + types

## Sanity Studio

Run the dev server and visit:

- `http://localhost:3000/studio`

## Project Structure

- `app/` - Next.js routes and layouts
- `components/` - UI and feature components
- `sanity/` - schema, queries, and client helpers
- `constants/`, `lib/`, `hooks/` - shared utilities and data
- `store.ts` - Zustand cart and favorites store

## Author

Ali Hussein  
Frontend Web Developer  
GitHub: https://github.com/codex404556  
Portfolio: https://https://e-store-wliz.vercel.app/  
LinkedIn: https://linkedin.com/in/error-best-381303331
