# Habeba Ehab — Portfolio

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding your photo

Drop your image at `public/profile.jpg` — the hero section's Polaroid frame is
already wired up to it (`components/decor/ProfilePhoto.tsx`) and falls back to
an initials placeholder if the file isn't there yet.

## Contact form email setup

The contact form posts to `app/api/contact/route.ts`, which sends the message
via [Resend](https://resend.com):

1. Sign up at resend.com with the same email you want to receive messages at
   (`lib/data.ts` → `contactInfo.email`) — it's free, no credit card needed.
2. Copy your API key and create a `.env.local` file (see `.env.local.example`):
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
3. Restart `npm run dev` — the form will now actually deliver mail, with
   Reply-To set to the visitor's address so you can reply directly.

For production on Vercel, add `RESEND_API_KEY` under Project Settings →
Environment Variables before deploying.

Without a verified custom domain, Resend only allows sending **to** the email
address you signed up with — which is exactly this use case (visitors' messages
land in your own inbox).

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). Zero
build config needed — just add the `RESEND_API_KEY` environment variable for
the contact form to work.

## Editing content

All resume content (skills, experience, contact info, stats) lives in
`lib/data.ts` — edit it there rather than in the components.
