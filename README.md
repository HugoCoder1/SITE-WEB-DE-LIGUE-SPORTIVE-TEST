# AE Basketball League

Application web moderne pour suivre la ligue de basketball africaine, développée avec Next.js 14, TypeScript et Tailwind CSS.

## 🏀 Aperçu

Plateforme pour suivre les équipes, les matchs et les statistiques de la ligue de basketball africaine. Le site offre une expérience utilisateur moderne avec un mode sombre/clair.

## ✨ Fonctionnalités Principales

- **Équipes** : Liste des équipes et détails par équipe
- **Calendrier** : Matchs à venir et résultats
- **Statistiques** : Suivi des performances des équipes
- **En direct** : Suivi des matchs en temps réel
- **Export** : Export des données des matchs

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript (mode strict)
- **Styling** : Tailwind CSS
- **Composants UI** : shadcn/ui
- **Typographie** : Inter (corps de texte), Bebas Neue (titres)
- **Outils** : ESLint, Prettier, Husky

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou pnpm

### Installation

1. **Cloner le dépôt**
   ```bash
   git clone [URL_DU_REPO]
   cd aebl-basketball-league
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Démarrer l'environnement de développement**
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🏗️ Structure du Projet

```
/app
  /export         # Pages d'export des données
  /live           # Suivi des matchs en direct
  /schedule       # Calendrier des matchs
  /search         # Recherche
  /standings      # Classements
  /stats          # Statistiques
  /teams          # Pages des équipes
/lib
  /data           # Données statiques
  /utils          # Utilitaires
/components       # Composants réutilisables
/public           # Assets statiques
```

## 📦 Déploiement

Le projet peut être déployé sur Vercel, Netlify ou tout autre hébergeur supportant Next.js.

1. **Déployer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre dépôt GitHub
   - Ajoutez les variables d'environnement nécessaires
   - Cliquez sur "Déployer"

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 🙏 Remerciements
- [Next.js](https://nextjs.org/) pour le framework
- [Tailwind CSS](https://tailwindcss.com/) pour les styles
- [shadcn/ui](https://ui.shadcn.com/) pour les composants
- [Lucide](https://lucide.dev/) pour les icônes
