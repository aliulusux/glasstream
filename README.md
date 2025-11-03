# AnimeStream Glass (Next.js + Jikan + Supabase)

- Next.js App Router, Tailwind, Framer Motion
- Glassmorphism UI, smooth hover/scroll animations
- Sections on homepage:
  - **Son Eklenen Bölümler** (via Jikan watch/episodes or schedule fallback)
  - **Bu Sezon Popüler**
  - **Son Eklenen Animeler**
- Browse with search & pagination
- Popular / New Releases pages
- Anime detail with episodes & related

## Quick Deploy (no terminal)

1. Create a new GitHub repo and upload the files in this zip.
2. On Vercel → **Import** the repo → set Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_BASE_URL` = your production URL (or leave empty for auto relative in production).
3. Deploy. Images are whitelisted in `next.config.js`.

Tailwind + Next will build automatically.

## Notes
- Supabase client is configured; you can extend to store favorites, lists, auth, etc.
- If `watch/episodes` is unavailable due to Jikan limits, app falls back to `schedules` for recent items.
