# my-portfolio

Source for the portfolio site at devjrose.com.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode
- [Resend](https://resend.com) for the contact form's outbound email
- [Framer Motion](https://www.framer.com/motion/) and [react-icons](https://react-icons.github.io/react-icons/)

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the value:

| Variable | Used for |
|---|---|
| `RESEND_API_KEY` | Sends the contact form email via Resend (`lib/resend.ts`, `app/api/send-email/route.ts`) |

## Project structure

```
app/                  App Router routes
  api/send-email/     Contact form API route
  contact/            Contact page
  skills/             Skills page
  layout.tsx          Root layout
  page.tsx            Home page
components/           Shared React components
lib/                  Data files (projects, skills) and the Resend client
types/                Shared TypeScript types
public/               Static assets (CV, project screenshots)
```
