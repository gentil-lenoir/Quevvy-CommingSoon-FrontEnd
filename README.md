# Quevvy — React TSX Pages

Pages **Coming Soon** de Quevvy converties de Blade PHP vers React TypeScript.

## Structure des fichiers

```
src/
├── styles/
│   └── globals.css          ← Variables CSS, animations, styles partagés
├── components/
│   └── shared.tsx           ← PageLoader, Navbar, Footer, LanguageSelector,
│                               Toast, Countdown
├── pages/
│   ├── Home.tsx             ← Page principale (Coming Soon)
│   ├── Donate.tsx           ← Page de don
│   ├── Donors.tsx           ← Page des donateurs
│   └── ErrorPages.tsx       ← NotFound (404) + ServerError (500)
└── App.tsx                  ← Router SPA simple (voir commentaires pour Next.js / React Router)
```

## Design System

| Token          | Valeur                          |
|----------------|---------------------------------|
| Background     | `#080A10`                       |
| Surface card   | `rgba(16, 20, 32, 0.75)`        |
| Accent green   | `#6EE7B3`                       |
| Accent blue    | `#3B82F6`                       |
| Text           | `#F0F3FA`                       |
| Text muted     | `#C9D6FF`                       |
| Font body      | DM Sans                         |
| Font display   | DM Serif Display                |
| Border radius  | `1.6rem` (cards)                |

## Fonctionnalités implémentées

- ✅ **Loader** animé au chargement de chaque page
- ✅ **Navbar** sticky avec effet glassmorphism au scroll
- ✅ **Sélecteur de langue** FR / EN via Google Translate (identique au composant Blade)
- ✅ **Countdown** vers la date de lancement (`2025-09-01`)
- ✅ **Formulaire waitlist** → redirige vers mailto (pas de backend)
- ✅ **Formulaire contact** → redirige vers mailto
- ✅ **Formulaire de don** → redirige vers mailto avec toutes les données
- ✅ **Copier au presse-papiers** (coordonnées bancaires)
- ✅ **Toast notifications** pour validation de formulaires
- ✅ **Page 404** avec recherche et liens utiles
- ✅ **Page 500** avec bouton Réessayer + signalement par email
- ✅ **Footer** complet avec liens sociaux
- ✅ Mentions **Coming Soon** dans les sections pertinentes
- ✅ Liens vers `/donate`, `/donors`, `https://partner.quevvy.com`

## Intégration Next.js (recommandé)

```bash
npm install next react react-dom typescript @types/react
```

```
app/
├── layout.tsx          ← import global CSS + google fonts
├── page.tsx            → export { default } from "@/pages/Home"
├── donate/page.tsx     → export { default } from "@/pages/Donate"
├── donors/page.tsx     → export { default } from "@/pages/Donors"
├── not-found.tsx       → export { NotFound as default } from "@/pages/ErrorPages"
└── error.tsx           → export { ServerError as default } from "@/pages/ErrorPages"
```

## Intégration Vite + React Router

```bash
npm create vite@latest quevvy-app -- --template react-ts
npm install react-router-dom
```

Voir `App.tsx` pour le code du routeur.

## Contact

- Email: quevvy.platform@outlook.com
- WhatsApp DRC: +243 978 089 552
- WhatsApp RWA: +250 792 871 952
- Partenaires: https://partner.quevvy.com