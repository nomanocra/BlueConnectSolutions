# BlueConnectSolutions

## Tech Stack
- Next.js 16 (Turbopack)
- React 19
- Tailwind CSS v4 (CSS-first config via `@theme` in `globals.css`)
- GSAP for animations
- Resend for transactional emails
- Bun as package manager
- TypeScript 6

## Dev
```bash
bun run dev    # starts on port 3001 (auto-kills previous instance)
bun run build  # production build
```

## Git Branches & Deployment

### Branches
- **`main`** - Branche de travail local. Push sur GitHub uniquement. Aucun deploy Vercel.
- **`int`** - Integration/test. Push sur GitHub declenche un preview deployment Vercel.
- **`prod`** - Production. Push sur GitHub declenche un deploy sur blueconnectsolutions.tech + blueconnectsolutions.vercel.app.

### Workflow de deploy
1. Travailler sur `main` en local
2. Quand pret a tester : merger `main` dans `int` → Vercel cree un preview deployment
3. Quand pret pour la prod : merger `int` dans `prod` → Vercel deploie sur blueconnectsolutions.tech

```bash
# Merger main → int (pour tester)
git checkout int && git merge main && git push && git checkout main

# Merger int → prod (pour deployer en prod)
git checkout prod && git merge int && git push && git checkout main
```

### Vercel Config
- Production branch: `prod`
- Ignored Build Step: custom script qui skip les builds de `main`
- Environment Variables: `RESEND_API_KEY` (all environments)
- Domain: blueconnectsolutions.tech

## i18n
- Cookie-based locale (`locale` cookie) pour eviter le flash EN→FR
- Traductions dans `lib/i18n/translations.ts` (EN + FR)
- Le titre hero "Driving the next wave of Digital Transformation" reste en anglais dans les deux langues (punchline)

## Contact Form
- API route: `app/api/contact/route.ts`
- Email via Resend (from: `noreply@blueconnectsolutions.tech`, to: `anthony@blueconnectsolutions.com`)
- Rate limited: 5 requetes/min par IP
- Inputs sanitizes (escapeHtml) pour prevenir XSS
