# KayumbiBet

KayumbiBet is a sports, live and digital-entertainment brand for East Africa.
This repository holds the public landing site plus its login and registration pages.

## Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `index.html` | Landing page: hero, target markets, coming-soon banner |
| `/login` | `login.html` | Sign-in form |
| `/register` | `register.html` | Account creation form with country/currency switch |

## Run locally

```bash
npm start          # http://localhost:4180
PORT=4300 npm start # custom port
```

The server is plain Node (no dependencies): it serves the static files and maps
`/login` and `/register` to their `.html` files.

## Notes

- The forms are UI-complete but not wired to an auth backend yet; submitting shows a
  "demo build" notice instead of posting.
- Design tokens (colours, spacing, typography) live in the `<style>` block of each
  page; the palette is deep green (`#08120e`) with lime accents (`#c7f464`).
