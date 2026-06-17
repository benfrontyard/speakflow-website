# Speakflow Marketing Prototype

This repo is a design prototype for exploring the Speakflow marketing site redesign in code.

It is not intended to be the production build. The goal is to test layout, responsive behavior, visual details, and motion so approved sections can be translated into the main Speakflow codebase.

## Getting started

```bash
npm install
npm run dev
```

Design tokens are sourced from Slate DS. Reference `@slate-ds` / `DESIGN.md` when updating tokens.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- CSS variables for design tokens
- Optional Framer Motion for key animation explorations

## Handoff Notes

Each section should stay modular so devs can reference or rebuild it later:

- Hero
- Logo cloud
- Feature sections
- Testimonials
- Blog preview
- CTA
- Footer

Use Tailwind utilities for most styling. Use CSS variables for tokens from Figma. Keep custom CSS limited to tokens, global styles, and reusable animations.
