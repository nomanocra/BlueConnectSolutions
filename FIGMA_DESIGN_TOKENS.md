# Design Tokens - Blue Connect Solutions

Documentation des tokens de design récupérés depuis Figma.

## 📋 Informations du Design

- **Fichier Figma**: BlueConnectSolutions
- **Node ID**: 0:1 (Mockup)
- **Date de récupération**: 2025-01-27

---

## 🎨 Variables de Couleurs

### Primary (Bleu)

| Token         | Valeur      | Description                  |
| ------------- | ----------- | ---------------------------- |
| `Primary/1`   | `#94b9e5`   | Bleu clair (lightest)        |
| `Primary/2`   | `#5b95d5`   | Bleu moyen-clair             |
| `Primary/3`   | `#3576c0`   | Bleu principal               |
| `Primary/4`   | `#255da4`   | Bleu foncé                   |
| `Primary/5`   | `#1f4a85`   | Bleu très foncé (darkest)    |
| `Primary/t10` | `#3576c01a` | Primary/3 avec 10% d'opacité |
| `Primary/t20` | `#3576c033` | Primary/3 avec 20% d'opacité |
| `Primary/t30` | `#3576c04d` | Primary/3 avec 30% d'opacité |

### Background (Fond sombre)

| Token            | Valeur      | Description                     |
| ---------------- | ----------- | ------------------------------- |
| `Background/1`   | `#020306`   | Fond le plus sombre             |
| `Background/2`   | `#04060a`   | Fond sombre                     |
| `Background/3`   | `#060a0f`   | Fond moyen-sombre               |
| `Background/4`   | `#0a0e14`   | Fond moyen                      |
| `Background/5`   | `#0f141c`   | Fond le plus clair              |
| `Background/t80` | `#060a0fcc` | Background/3 avec 80% d'opacité |

### Foreground (Texte)

| Token                  | Valeur    | Description                     |
| ---------------------- | --------- | ------------------------------- |
| `Foreground/Main`      | `#ffffff` | Texte principal (blanc)         |
| `Foreground/Secondary` | `#b1becb` | Texte secondaire (gris clair)   |
| `Foreground/Terciary`  | `#738292` | Texte tertiaire (gris moyen)    |
| `Foreground/Negatif`   | `#0f141c` | Texte sur fond clair (inverse)  |
| `Text&Icon/Negatif`    | `#ffffff` | Texte et icônes sur fond sombre |

---

## ✍️ Styles de Typographie

### Titres (Title)

| Token     | Famille | Style    | Taille | Poids | Line Height | Description            |
| --------- | ------- | -------- | ------ | ----- | ----------- | ---------------------- |
| `Title/1` | Geist   | Bold     | 82px   | 700   | 86px        | Titre principal (Hero) |
| `Title/2` | Geist   | Bold     | 48px   | 700   | 48px        | Titre de section       |
| `Title/3` | Geist   | SemiBold | 24px   | 600   | 32px        | Sous-titre             |

### Texte (Text)

#### Text/L (Large - 18px)

| Token            | Famille | Style   | Taille | Poids | Line Height | Description           |
| ---------------- | ------- | ------- | ------ | ----- | ----------- | --------------------- |
| `Text/L/Regular` | Geist   | Regular | 18px   | 400   | 100%        | Texte large normal    |
| `Text/L/Medium`  | Geist   | Medium  | 18px   | 500   | 100%        | Texte large en medium |
| `Text/L/Bold`    | Geist   | Bold    | 18px   | 700   | 100%        | Texte large en gras   |

#### Text/M (Medium - 16px)

| Token            | Famille | Style   | Taille | Poids | Line Height | Description           |
| ---------------- | ------- | ------- | ------ | ----- | ----------- | --------------------- |
| `Text/M/Regular` | Geist   | Regular | 16px   | 400   | 100%        | Texte moyen normal    |
| `Text/M/Medium`  | Geist   | Medium  | 16px   | 500   | 100%        | Texte moyen en medium |
| `Text/M/Bold`    | Geist   | Bold    | 16px   | 700   | 100%        | Texte moyen en gras   |

#### Text/S (Small - 14px)

| Token            | Famille | Style   | Taille | Poids | Line Height | Description         |
| ---------------- | ------- | ------- | ------ | ----- | ----------- | ------------------- |
| `Text/S/Regular` | Geist   | Regular | 14px   | 400   | 100%        | Texte petit normal  |
| `Text/S/Medium`  | Geist   | Medium  | 14px   | 500   | 100%        | Texte petit medium  |
| `Text/S/Bold`    | Geist   | Bold    | 14px   | 700   | 100%        | Texte petit en gras |

#### Text/XS (Extra Small - 12px)

| Token             | Famille | Style   | Taille | Poids | Line Height | Description              |
| ----------------- | ------- | ------- | ------ | ----- | ----------- | ------------------------ |
| `Text/XS/Regular` | Geist   | Regular | 12px   | 400   | 100%        | Texte très petit normal  |
| `Text/XS/Medium`  | Geist   | Medium  | 12px   | 500   | 100%        | Texte très petit medium  |
| `Text/XS/Bold`    | Geist   | Bold    | 12px   | 700   | 100%        | Texte très petit en gras |

### Body (Inter)

| Token                 | Famille | Style   | Taille | Poids | Line Height | Description          |
| --------------------- | ------- | ------- | ------ | ----- | ----------- | -------------------- |
| `Body/Regular/Medium` | Inter   | Regular | 16px   | 400   | 24px        | Corps de texte moyen |

### Legend (Légendes)

| Token      | Famille | Style    | Taille | Poids | Line Height | Description     |
| ---------- | ------- | -------- | ------ | ----- | ----------- | --------------- |
| `Legend/M` | Inter   | SemiBold | 11px   | 600   | 100%        | Légende moyenne |
| `Legend/S` | Inter   | SemiBold | 10px   | 600   | 100%        | Légende petite  |

---

## 📝 Notes d'implémentation

### Structure proposée pour Tailwind CSS

- **Couleurs**: Extension de la palette Tailwind avec les tokens Primary, Background, Foreground
- **Typographie**: Configuration de la police Geist et des styles de texte
- **Espacements**: À définir selon les composants Figma

### Prochaines étapes

1. ✅ Récupération des tokens (couleurs + typographie)
2. ⏳ Initialisation du projet Next.js avec Tailwind
3. ⏳ Configuration de Tailwind avec les tokens
4. ⏳ Création des composants de base du design system
5. ⏳ Création des pages du site

---

## 🔍 Observations

- Palette de couleurs sombre avec accents bleus
- Police principale: **Geist** (pour les titres et textes principaux)
- Police secondaire: **Inter** (pour les headings, body et légendes)
- Système de typographie hiérarchique bien défini avec :
  - 3 tailles de titres Geist (Title/1, Title/2, Title/3)
  - Système de texte complet avec 4 tailles (L, M, S, XS) et 3 poids (Regular, Medium, Bold)
  - Body text avec Inter (Body/Regular/Medium)
  - Styles de légende avec Inter (Legend/M, Legend/S)
- Utilisation d'opacités pour les variantes de couleurs (t10, t20, t30)
- Nouvelle couleur tertiaire pour le texte (Foreground/Terciary)
