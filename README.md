# Arquero Co — Local Preview

## Quick preview
Run:

```bash
python -m http.server 4173
```

Then open:

- http://127.0.0.1:4173/index.html
- http://127.0.0.1:4173/shop.html
- http://127.0.0.1:4173/arquero-fest.html
- http://127.0.0.1:4173/product.html?id=tee-heritage
- http://127.0.0.1:4173/about.html
- http://127.0.0.1:4173/contact.html

## Notes
- This project is a static multi-page site (`HTML + CSS + JS`).
- Cart data and newsletter form state are stored in browser `localStorage`.

## Deploy on GitHub Pages
1. Push this repo to GitHub.
2. Keep this workflow file in place: `.github/workflows/deploy-pages.yml`.
3. Push to `main` (or `master`) to trigger deployment automatically.
4. In GitHub, open **Settings → Pages** and ensure **Source = GitHub Actions**.

Your live URL will be:
- `https://<your-github-username>.github.io/<repo-name>/`

Example page links after deployment:
- `https://<your-github-username>.github.io/<repo-name>/index.html`
- `https://<your-github-username>.github.io/<repo-name>/shop.html`
- `https://<your-github-username>.github.io/<repo-name>/arquero-fest.html`
- `https://<your-github-username>.github.io/<repo-name>/product.html?id=tee-heritage`

