# Installation & utilisation

npm install

## Commandes

Lancer l'appli :

- npm run dev

Build l'appli dans le dossier dist :

- npm run build

Lancer le dist pour voir la preview :

- npm run preview

# Organisation du projet

## Répertoires

### /dist

- dossier contenant le build de l'application

### /public

- dossier contenant tous les fichiers statiques :
  - un dossier images contenant tous les fichiers images, les logo et les icons ont leur propre dossier à l'intérieur du dossier pour plus de clarté
  - un dossier json
  - Possibilité d'ajouter un dossier font et un dossier audio/video si besoin

### /src

- dossier contenant tous les fichiers sources :
  - css : dossier contenant tous les fichiers css
  - components : dossier contenant tous les composants utilisables
  - pages : dossier contenant toutes les views, traitées comme composants pages
  - models : class faisant lien avec l'API/bdd
  - services : dossier contenant tous les services utilisables comme les api ou les services de login
  - utils : dossier contenant tous les utilitaires
  - router.js : fichier contenant la gestion des routes

### /node_modules : dossier contenant tous les modules npm

### /package.json : fichier contenant toutes les dépendances du projet

# Librairie CSS <img src='public/img/logos/tailwind.svg' width="250">

- L'application utilise la librairie CSS Tailwindcss : [documentation](https://tailwindcss.com/docs/installation)
- Le choix de cette librairie a été fait selon plusieurs critères :
  - la taille des fichiers CSS est très réduite, Tailwind n'importe que les class CSS utilisées par le projet et est donc de ce fait optimisé
  - possibilité de créer ses propres class CSS
  - facilité d'utilisation
  - styles modernes et parfait

### Ajouter de règles CSS à la librairie

- depuis le fichier tailwind.config.js à la racine, prendre en exemple les règles déjà en place
