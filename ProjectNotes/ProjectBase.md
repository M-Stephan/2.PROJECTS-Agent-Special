# Agent special

## Languages & Technologies
<details><summary>Voir plus...</summary>

- **Backend:**
  - ***Language:***
    - ![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
    - ![SQL](https://img.shields.io/badge/SQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)

  - ***Framework:***
    - ![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
    - ![ASP.NET](https://img.shields.io/badge/ASP.NET-512BD4?style=for-the-badge&logo=asp.net&logoColor=white)
    - ![.NET Core](https://img.shields.io/badge/.NET_Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
    - ![EF Core](https://img.shields.io/badge/Entity_Framework_Core-512BD4?style=for-the-badge&logo=entity-framework&logoColor=white)
    - ![EF Core Identity](https://img.shields.io/badge/EFCore_Identity-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)

  - ***Database:***
    - ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
    - ![phpMyAdmin](https://img.shields.io/badge/phpMyAdmin-4B6C9E?style=for-the-badge&logoColor=white)

  - ***Environnement***
    - ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
    - ![Docker Desktop](https://img.shields.io/badge/Docker%20Desktop-2496ED?style=for-the-badge&logo=docker&logoColor=white)

- **Frontend:**
  - ***Language:***
    - ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
    - ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
    - ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

  - ***Framework:***
    - ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

</details>

## Vision & Objectifs
- **Projet:** Jeu web d’enquête (point & click) servant de portfolio jouable.
- **Narration:** Le joueur incarne un enquêteur qui reconstitue l’identité d’un individu (toi) en retrouvant des indices dans des pages et des puzzles.
- **Objectif final:** reconstituer un CV ou VCard interactif, ( bonus: téléchargeable en PDF. )
- **Ciblage:** jury, recruteurs, visiteurs, formateur

## Gameplay & Contenus
- Le joueur explore des pages (certaines cachées/obfusquées).
- Il trouve des indices (zones cliquables, points de recherche).
- Il résout des énigmes (inputs à compléter, mini-casse-têtes, jeux de logique basiques, calculs avec des valeurs d'indices).
- Chaque "pas" dans le jeu sera numeroté avec un ID qui servira de pourcentage d'avancement et permettra d'enregistrer sa progression a tout moment via un menu ou un boutton
- Fin : CV/VCard reconstruit et Parcours de dev découvert

## Types d’énigmes
- Inputs validés (string/date/numérique) → validation front.
- Puzzles UI (glisser-déposer, slider, mini-grille logique).
- Pages secrètes (routes cachées, paramètres d’URL, 404 custom volontaire).
- Clics contextuels (href, hotspots invisibles, hover reveals, combinaisons).
- Indices dans les textes ou le visuel (liens à faire entre des textes, images, dates et autres afin de savoir quoi faire pour avancer)

## Stratégie de contenu
- Références authentiques à ton parcours (ex : début serveur FiveM, premiers scripts, découverte C#/.NET, React/Vite, MySQL, Docker, VPS, etc.).
- Chaque avancement est numéroté et incrementé lors des manipulations permet de savoir ou en est le joueur en temps réel avec possibilité d'enregistrer a tout moment.
- Contenus stockés côté front injectés directement dans les pages grace aux components React (Reagirons a l'avancée du joueur a ses cliqus réponses et autres).

## Modèle de progression
- Chaque mouvement manipulation clic ou submit est enregistré les components seront numérotés et pourront réapparaitre lors du load de progression
- Les components s'afficheront en fonction de la progression "idProg int"
- Les Preuves trouvées seront affichés sur la page de "reconstruction" du vCard/Cv
- Les zones seront vide au départ et se remplira au fur et a mesure que le joueur accompli les recherches
- Le jeu est terminé quand le CV / Vcard est complet a la toute fin il faudra envoyer la "fiche" et le jeu sera réussi 

## Persistence & offline
- Visiteur non connecté : pas d'enregistrement obligation de tout jouer en une fois
- Utilisateur connecté : progression stockée en DB.

## Sécurité & Conformité
- Hash des mots de passe via Identity (PBKDF2 par défaut).
- RGPD light : page “données” + suppression compte (DELETE /me optionnel) + export (optionnel).
- Secrets : jamais commiter, passés par .env

## Infra & Docker
- Dev (Local)
  - Container : Environnement Node.js & .NET (pour C# .NET ASP.NET EFCore Backend & React Frontend)
  - Docker Desktop : Containerisation
  - Variables : .env (connection string, Informations critiques, )
  - Github : Repository Public / Versionning

- Prod (VPS)
  - VPS Linux Ubuntu22 sur Ryzen9
  - Frontend dynamique grace au Framework React
  - Panel Ajenti
  - DB Panel PhpMyAdmin
  - Docker Container deploy `docker run -d`

## Tests
- Backend : tests unitaires (xUnit) si le timing me le permet.