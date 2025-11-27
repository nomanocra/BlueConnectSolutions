# Blue Connect Landing Page

Landing page développée avec Next.js 16, TypeScript et Tailwind CSS, avec un design system basé sur Figma.

## 🚀 Technologies

- **Next.js 16** - Framework React avec App Router et Turbopack
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Framework CSS utility-first
- **React 19** - Bibliothèque UI
- **Figma MCP** - Génération de composants depuis Figma

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement (avec Turbopack)
npm run dev

# Build de production
npm run build

# Lancer en production
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
/app
  /globals.css          # Configuration Tailwind + Design tokens
  /layout.tsx           # Layout global
  /page.tsx             # Page d'accueil (landing page)

/components
  /figma                # Composants générés depuis Figma (MCP)
    /Button.tsx
    /Card.tsx
    ...
  /sections             # Sections composées de la landing page
    /HeroSection.tsx
    /FeaturesSection.tsx
    /CTASection.tsx
    ...

/lib
  /utils.ts             # Utilitaires (fonction cn pour classes Tailwind)
  /figma-tokens.ts      # Design tokens extraits de Figma

/public
  /images               # Images exportées de Figma
  /fonts                # Polices personnalisées
```

## 🎨 Workflow Figma MCP

### 1. Extraire les Design Tokens

Les design tokens (couleurs, espacements, typographie) sont définis dans votre design system Figma.

**Utiliser le MCP Figma pour extraire les variables:**

```typescript
// Outil: mcp_Figma_get_variable_defs
// Paramètres:
// - fileKey: clé du fichier Figma (depuis l'URL)
// - nodeId: ID du nœud (depuis l'URL)
```

**URL Figma exemple:**
```
https://figma.com/design/ABC123/MonProjet?node-id=1-2
                        ^^^^^^              ^^^
                        fileKey             nodeId (1:2)
```

**Intégrer les tokens dans `app/globals.css`:**

```css
:root {
  --color-primary: #0ea5e9;
  --color-secondary: #8b5cf6;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
}

@theme inline {
  --color-primary-*: var(--color-primary);
  --spacing-xs: var(--spacing-xs);
}
```

### 2. Générer les Composants UI

**Utiliser le MCP Figma pour générer du code React:**

```typescript
// Outil: mcp_Figma_get_design_context
// Paramètres:
// - fileKey: clé du fichier Figma
// - nodeId: ID du composant (ex: "123:456")
// - clientLanguages: "typescript"
// - clientFrameworks: "react"
```

Le code généré sera sauvegardé dans `/components/figma/`.

**Exemple de composant généré:**

```typescript
// components/figma/Button.tsx
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = "primary", children, className }: ButtonProps) {
  return (
    <button 
      className={cn(
        "px-6 py-3 rounded-lg font-semibold",
        variant === "primary" && "bg-primary text-white",
        variant === "secondary" && "bg-secondary text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
```

### 3. Composer les Sections

Créez des sections en combinant les composants Figma:

```typescript
// components/sections/HeroSection.tsx
import { Button } from "@/components/figma/Button";
import { Card } from "@/components/figma/Card";

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">
          Bienvenue sur Blue Connect
        </h1>
        <p className="text-xl mb-8">
          Votre solution de connexion intelligente
        </p>
        <Button variant="primary">
          Découvrir
        </Button>
      </div>
    </section>
  );
}
```

### 4. Assembler la Landing Page

```typescript
// app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
```

## 🎯 Outils MCP Figma Disponibles

| Outil | Description | Usage |
|-------|-------------|-------|
| `mcp_Figma_get_variable_defs` | Extraire les design tokens | Design system |
| `mcp_Figma_get_design_context` | Générer du code React | Composants UI |
| `mcp_Figma_get_screenshot` | Capturer un screenshot | Référence visuelle |
| `mcp_Figma_get_metadata` | Obtenir la structure | Navigation |
| `mcp_Figma_get_code_connect_map` | Mapping code ↔ Figma | Documentation |

## 🛠️ Utilitaires

### Fonction `cn()` - Merge de classes Tailwind

```typescript
import { cn } from "@/lib/utils";

// Combiner des classes conditionnellement
<div className={cn(
  "base-class",
  isActive && "active-class",
  "override-class"
)} />
```

## 🚢 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

Ou connectez votre repo GitHub à [Vercel](https://vercel.com) pour un déploiement automatique.

### Autres Plateformes

- **Netlify**: Compatible avec Next.js
- **AWS Amplify**: Support Next.js SSR
- **Docker**: Utilisez l'image Next.js officielle

## 📚 Ressources

- [Documentation Next.js 16](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Figma MCP](https://www.figma.com/developers)
- [TypeScript](https://www.typescriptlang.org/)

## 🔧 Configuration Système Requise

- **Node.js**: ≥ 20.9 (recommandé: v22+)
- **npm**: ≥ 10.0
- **Figma Desktop App**: Pour utiliser le MCP Figma

## 📝 Notes Importantes

- **Tailwind CSS v4**: Configuration via `@theme` dans `globals.css` (pas de `tailwind.config.ts`)
- **Turbopack**: Activé par défaut pour des builds ultra-rapides
- **App Router**: Architecture moderne de Next.js (pas de `/pages`)
- **React 19**: Dernière version avec nouvelles fonctionnalités

## 🤝 Contribution

Ce projet est un site vitrine pour un client. Les contributions sont gérées en interne.

## 📄 Licence

Propriétaire - Tous droits réservés
