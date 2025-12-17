# Utility Binder

[![Live Site](https://img.shields.io/badge/Live-GitHub%20Pages-blue)](https://chaos-factory.github.io/ideator-execution-009carbonaccounting-1-utilitybinder/)

Turn messy utility bills into a clean dataset and audit-ready exports. Client-side app for SMBs to import electricity/gas, map ZIP to eGRID, pick Scope 2 basis and T&D losses, and export CSV/XLSX/PDF with calculation log and factor/version labels.

## Live Site

🌐 **[https://chaos-factory.github.io/ideator-execution-009carbonaccounting-1-utilitybinder/](https://chaos-factory.github.io/ideator-execution-009carbonaccounting-1-utilitybinder/)**

## Landing Page (GitHub Pages)

The landing page provides comprehensive information about Utility Binder, including:

- Product features and capabilities
- Step-by-step guide on how it works
- Privacy and security details
- Standards alignment (GHG Protocol, EPA eGRID2023, IPCC)
- Use cases and FAQ
- Pricing information

### Deployment

The landing page automatically deploys to GitHub Pages:

- **On push to `main`:** The site is built and deployed to production
- **On pull requests:** A preview deployment is created and a comment with the preview URL is posted on the PR

### Local Development

The landing page source is located in the `site/` directory:

```
site/
├── index.html        # Main landing page
├── styles.css        # Design system and styles
├── script.js         # Minimal JavaScript behaviors
├── .nojekyll         # Prevents Jekyll processing
├── assets/
│   ├── screenshots/  # Placeholder images (lazy-loaded)
│   └── icons/        # Simple inline SVGs
├── favicon.png       # Site favicon
└── assets/social-image.png  # Open Graph image
```

To preview locally:

1. Open `site/index.html` directly in your browser, or
2. Use a simple static server:
   ```bash
   cd site
   python3 -m http.server 8000
   # Or use npx
   npx serve .
   ```
3. Visit `http://localhost:8000` in your browser

### Features

- **Lightweight:** ~500 KB total bundle (HTML/CSS/JS)
- **Accessible:** WCAG AA compliant with semantic HTML, focus states, and skip links
- **Responsive:** Works on mobile, tablet, and desktop
- **Fast:** Lazy-loaded images, minimal JavaScript
- **Private:** No tracking, no analytics, no cookies

### Technologies

- Plain HTML5, CSS3, and vanilla JavaScript
- No frameworks or build tools required
- GitHub Actions for CI/CD
- GitHub Pages for hosting