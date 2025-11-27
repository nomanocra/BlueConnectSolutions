# Blue Connect Solutions

Site web de Blue Connect Solutions - Driving the next wave of Digital Transformation

## 🚀 Technologies

- **Next.js 16** avec App Router
- **TypeScript**
- **Tailwind CSS** avec tokens de design personnalisés
- **Polices**: Geist (principale) et Inter (secondaire)

## 📦 Installation

```bash
npm install
```

## 🏃 Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🎨 Design Tokens

Les tokens de design sont documentés dans `FIGMA_DESIGN_TOKENS.md` et configurés dans `tailwind.config.ts`.

**📚 Documentation des classes Tailwind** : Voir `TAILWIND_CLASSES.md` pour la liste complète des classes disponibles (`text-primary-3`, `bg-background-1`, `text-title-1`, etc.)

### Couleurs

- **Primary**: 5 niveaux + variantes avec opacité (t10, t20, t30)
- **Background**: 5 niveaux + variante avec opacité (t80)
- **Foreground**: Main, Secondary, Terciary, Negatif
- **Text&Icon**: Negatif

### Typographie

- **Geist**: Titres (Title/1, Title/2, Title/3) et Textes (L, M, S, XS)
- **Inter**: Headings (H3, H5), Body et Legends

## 📝 Scripts

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run start` - Démarre le serveur de production
- `npm run lint` - Lance le linter

## 📁 Structure

```
├── app/
│   ├── layout.tsx      # Layout principal avec polices
│   ├── page.tsx        # Page d'accueil
│   └── globals.css     # Styles globaux Tailwind
├── components/         # Composants réutilisables (à venir)
├── tailwind.config.ts # Configuration Tailwind avec tokens
├── FIGMA_DESIGN_TOKENS.md # Documentation des tokens Figma
└── TAILWIND_CLASSES.md # Documentation des classes Tailwind disponibles
```
