# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## AutoMeet — auto-event-hub-15

README complet en français pour le projet AutoMeet (React + Vite). Ce fichier explique comment installer, lancer, tester et comprendre l'architecture. Il contient aussi une section dédiée aux différences majeures entre React et Vue, puisque ton professeur connaît Vue.js.

---

## Aperçu du projet

AutoMeet est une application front-end React pour publier et consulter des événements automobiles. Le projet utilise :

- Vite (bundler/dev server)
- React (avec TypeScript)
- Tailwind CSS (+ shadcn/ui)
- Supabase (intégration optionnelle)
- Zustand pour le state local
- React Router pour la navigation
- Vitest pour les tests

Le code principal se trouve dans `src/` (pages, components, stores, i18n, etc.).

---

## Prérequis

- Node.js (recommandé >= 18)
- npm (ou pnpm/yarn)
- Une connexion internet pour les dépendances

Commandes PowerShell (Windows) pour démarrer rapidement :

```powershell
# cloner le dépôt (si besoin)
git clone https://github.com/semih2502/auto-event-hub-15
cd auto-event-hub-15

# installer les dépendances
npm install

# lancer en mode développement
npm run dev

# builder pour la production
npm run build

# exécuter les tests
npm run test
```

---

## Scripts utiles (extraits de package.json)

- `npm run dev` — démarre Vite en développement
- `npm run build` — build de production
- `npm run preview` — prévisualise le build localement
- `npm run lint` — lance ESLint
- `npm run test` — lance Vitest

---

## Architecture / Fichiers clés

- `src/main.tsx` — point d'entrée
- `src/App.tsx` — routes et layout principaux
- `src/pages/` — pages (Index, Events, Blog, Profile, Auth...)
- `src/components/` — composants réutilisables
	- `src/components/ui/` — composants UI (Button, Card, Dialog...) fournis par shadcn style
- `src/stores/` — état global/local (Zustand)
- `src/i18n/` — internationalisation (react-i18next)
- `public/` — assets statiques (`placeholder.svg`, favicon...)

---

## Composants importants

- `Button` (`src/components/ui/button.tsx`) — composant bouton stylé avec class-variance-authority. Note : le composant concatène désormais correctement la `className` passée en prop afin que les classes personnalisées (ex. `text-white`) soient appliquées.
- `BlogCard` (`src/components/blog/BlogCard.tsx`) — carte d'article qui affiche une image (fallback vers `/placeholder.svg` si l'image distante échoue).

---

## Débogage rapide

- Image absente : certaines images externes (Unsplash) peuvent 404 ou être bloquées. On a ajouté un `onError` sur les `<img>` pour utiliser `public/placeholder.svg` en fallback.
- Boutons sans styles : si les classes personnalisées ne s'appliquent pas, vérifie que le composant `Button` concatène bien `className` (correction déjà appliquée dans ce repo).

Conseils : ouvre la console navigateur (Network) pour vérifier les 404/CORS, et inspecte le DOM pour voir quelles classes sont appliquées.

---

## Tests

Le projet utilise Vitest. Le dossier `src/test/` contient des tests d'exemple. Pour lancer les tests :

```powershell
npm run test
```

---

## Déploiement

- `npm run build` -> dossier `dist/` prêt pour le déploiement
- Déployer sur Vercel / Netlify / tout service static hosting en pointant sur `dist/` et en utilisant `npm run build` comme commande de build.

---

## React vs Vue — explication ciblée pour un professeur Vue.js

Ci‑dessous un comparatif clair pour expliquer les différences de philosophie et d'API entre React (utilisé ici) et Vue (connu du professeur) :

1) Template / JSX
- Vue : templates déclaratifs dans `.vue` (séparation `<template>`, `<script>`, `<style>`). Directives (`v-if`, `v-for`, `v-model`) rendent certaines tâches très concises.
- React : JSX dans les composants `.tsx`. Le JSX est du JavaScript — plus flexible pour manipuler directement des valeurs JS et des comportements.

2) Réactivité
- Vue : `reactive`, `ref` et système de tracking automatique. Les computed properties sont faciles et performantes.
- React : hooks (`useState`, `useReducer`) avec updates via setters. `useEffect` pour side effects. La déclaration des dépendances est explicite.

3) Composition
- Vue Composition API ≈ React Hooks. En React on crée des hooks personnalisés (`useMyFeature`) qui encapsulent logique et effets.

4) Cycle de vie
- Vue : `mounted`, `beforeUnmount`, `watch`, etc.
- React : `useEffect(() => { /* mount/update */ return () => { /* unmount */ } }, [deps])`.

5) État global
- Vue : Pinia / Vuex
- React : Redux, Zustand (utilisé ici), Context API

6) Directives vs props/handlers
- Vue a des directives (p.ex. `v-model`) très pratiques. En React on utilise `value` + `onChange` ou hooks pour obtenir le même comportement.

7) Slots vs children
- Vue slots nommés et scoped slots → React utilise `children` et props de rendu (render props). Les deux permettent composition mais avec des idiomes différents.

Mapping rapide (exemples) :

- Vue `data` / `computed` → React `useState` / `useMemo`
- Vue `watch` → React `useEffect` (sur dépendances)
- Vue `v-model` → React `value` + `onChange` (ou hook custom)

Si le professeur demande une réimplémentation en Vue, on peut montrer côte‑à‑côte :

Vue (v-model):
```vue
<template>
	<input v-model="value" />
</template>
<script setup>
import { ref } from 'vue'
const value = ref('')
</script>
```

React équivalent:
```tsx
const [value, setValue] = useState('')
return <input value={value} onChange={e => setValue(e.target.value)} />
```

---

## Contribution

- Fork -> branche feature -> PR vers `main`.
- Respecte TypeScript et Tailwind conventions.

---

## Questions / Suivants possibles

Je peux :

- Ajouter un `CONTRIBUTING.md` avec des règles de code et PR template.
- Ajouter des tests supplémentaires pour les composants (Button, BlogCard).
- Fournir une version courte du README en anglais si nécessaire.

Si tu veux que j'ajoute une section spécifique (par ex. comment migrer un composant Vue en React), dis‑le et je l'ajoute.

---

© Projet AutoMeet
