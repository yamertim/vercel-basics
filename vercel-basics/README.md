# Mon projet React & Vercel

Ce dépôt contient un mini-site React déployé sur Vercel, avec un affichage de *cat facts* en français et des dégradés de couleurs aléatoires.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (fourni avec Node.js)
- Un compte GitHub
- Un compte Vercel (connexion possible via GitHub)

## Installation locale

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/VOTRE-ORG/mon-projet-react-vercel.git
   cd mon-projet-react-vercel
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Démarrer l'application**
   ```bash
   npm start
   ```

L'application sera disponible sur `http://localhost:3000`.

## Fonctionnalités

- Affichage d'une *cat fact* traduite en français
- Dégradé de fond aléatoire à chaque chargement
- Bouton « Une autre ! » pour rafraîchir la fact et les couleurs

## Déploiement sur Vercel

1. **Forkez** ce dépôt sur votre compte GitHub.
2. Sur Vercel, cliquez sur **New Project** et sélectionnez votre fork.
3. Vercel détectera automatiquement Create React App :
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`
4. Cliquez sur **Deploy**.

En quelques secondes, votre site sera accessible via une URL Vercel.

## Automatisation (optionnel)

Pour simplifier les futurs déploiements, vous pouvez ajouter le CLI Vercel :

1. **Installer le CLI**
   ```bash
   npm install --save-dev vercel
   ```
2. **Ajouter un script** dans `package.json` :
   ```json
   "scripts": {
     "deploy": "vercel --prod"
   }
   ```
3. **Se connecter** (une seule fois)
   ```bash
   npx vercel login
   ```
4. **Déployer** en production
   ```bash
   npm run deploy
   ```

## Ressources

- Documentation Vercel : https://vercel.com/docs
- API Cat Facts : https://catfact.ninja
- API MyMemory (traduction) : https://mymemory.translated.net

