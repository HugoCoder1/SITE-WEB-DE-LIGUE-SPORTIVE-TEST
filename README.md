# TEST TECHNIQUE - Site Web de Ligue Sportive

Application web moderne pour une ligue de basketball africaine professionnelle, développée avec Next.js 14, TypeScript et Tailwind CSS.

## 🏀 Aperçu

Application complète pour suivre les équipes, les matchs et les classements de la ligue de basketball africaine. Le site offre une expérience utilisateur fluide et moderne avec un mode sombre/clair.

## ✨ Fonctionnalités Principales

- **Équipes** : Liste complète des équipes et détails par équipe
- **Calendrier** : Matchs à venir et résultats récents
- **Classements** : Classement par conférence en temps réel
- **Recherche** : Recherche globale des équipes et joueurs
- **Design** : Interface responsive et moderne
- **Accessibilité** : Navigation clavier et lecteur d'écran
- **Performance** : Optimisé pour les Core Web Vitals
- **SEO** : Balises meta et sitemap dynamique

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
  /teams           # Pages des équipes
  /standings       # Classements
  /schedule        # Calendrier des matchs
  /search          # Recherche globale
/lib
  /data           # Données statiques
  /utils          # Utilitaires
/components       # Composants réutilisables
/public           # Assets statiques
```

## 📦 Déploiement

Le projet peut être déployé sur Vercel, Netlify ou tout autre hébergeur supportant Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_REPO_URL)

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) pour le framework incroyable
- [Tailwind CSS](https://tailwindcss.com/) pour les styles
- [shadcn/ui](https://ui.shadcn.com/) pour les composants
- [Lucide](https://lucide.dev/) pour les icônes

## Deployment to Vercel

1. **Push to GitHub**
   - Create a new repository on GitHub
   - Push your code to the repository

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add the environment variable:
     - Key: `BASKETBALL_API_KEY`
     - Value: Your API key from api-basketball.com
   - Click "Deploy"

3. **Your site is live!**

## API Integration

The project uses [API-Basketball](https://www.api-basketball.com/) for live basketball data:

- **Free Tier**: 100 requests per day
- **Caching**: 5-minute cache to optimize API usage
- **Fallback**: Automatic fallback to static data if API fails
- **Current League**: NBA (League ID: 12)

### Switching Leagues

To use a different basketball league:

1. Find the league ID from [API documentation](https://www.api-basketball.com/documentation)
2. Update `NBA_LEAGUE_ID` in:
   - `lib/data/teams.ts`
   - `lib/data/matches.ts`

Available leagues include NBA, EuroLeague, Spanish Liga ACB, and many more.

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── teams/             # Teams pages
│   ├── schedule/          # Schedule page
│   ├── standings/         # Standings page
│   └── search/            # Search page
├── components/            # React components
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Site footer
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities and data
│   ├── api/              # API client
│   └── data/             # Data models and functions
└── public/               # Static assets
\`\`\`

## Development Notes

- **Static Data**: The project includes static mock data as fallback
- **API Usage**: With normal traffic, expect 50-80 API requests per day
- **Caching**: All API responses are cached for 5 minutes
- **No API Key**: The site works without an API key using static data

## License

This project was created as a demonstration of modern web development practices.
