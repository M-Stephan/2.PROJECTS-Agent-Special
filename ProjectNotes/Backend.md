# Backend

## Backend:
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

## Décomposition
- Préparer l'environnement docker
  - .NET 9 SDK 12
- Initialiser le projet API MVC
- Ajouter les package EFCore & Tools
- Ajouter EF Core Identity
- Gérer la liaison avec la database (MySql EntityFramework et ContextDatabase)
- Préparer un Xunit Project et le lier au .csproj
- Créer un .sln à la racine du projet relier xUnit et MVC Project
- Travailler en SOA et OOP (DTOs, Services, IServices, Controllers)
- Préférence Clean Code et Bodied Expressions

## API
- Création d'un compte et de son profil utilisateur
  - *(possibilité de remplir des infos non obligatoires (adresse postale, numero de telephone, adresse mail secondaire))*
- Modification de son compte/profil utilisateur
  - *(possibilité de remplir des infos non obligatoires (adresse postale, numero de telephone, adresse mail secondaire qui n'ont pas été remplis lors de la creation))*
- Connexion à son compte utilisateur. (frontend fetch api via React)
- Suppression définitive de son compte utilisateur avec suppression totale des informations (des archives json peuvent être enregistrées par précaution juridique en cas d'attaque ou d'acte malveillant on verra)
- Création d'un Player (Personnage: nom, prénom, age, genre (fictifs)) le jeu pourrait parler au feminin ou masculin au joueur en fonction du genre et de l'age choisi genre Madame Mademoiselle ou Monsieur
- Visualisation de la progression
- Pages/Niveau disponible(s) (le backend verifiera le `int` de la progression pour afficher ou non certaines informations)
- Gestion des erreurs & validation
  - Middleware global pour gérer les exceptions → éviter de renvoyer des 500 bruts.
  - Validation des DTOs (FluentValidation ou DataAnnotations)
- Swagger/OpenAPI pour documenter et tester facilement depuis le navigateur. (Eventuel Scalr si timing okay)
- Optionnel (Export CV ou Vcard en PDF)

## Flow de départ

1. **Page d’accueil → messagerie textuelle**
- "Bienvenue Nouvel Agent ? Hm… Il me semble que vous ne m’ayez pas dit votre nom… ?"

2. **Choix du joueur**
- Dire son nom → créer un compte
  - Bouton cliquable → ouvre formulaire modal pour créer le compte.
  - Après validation → login auto, progression stockée en DB.
  - Top-right → select menu : modifier profil, supprimer compte, logout.
  - Ensuite → création Player (nom, prénom, âge, genre).

- Ne pas dire son nom → jouer en guest
  - Pas de compte créé, progression stockée en localStorage.
  - Tu peux quand même créer un personnage fictif mais ça reste offline.

## Backend Getters & Controllers
- POST /users → création compte + profil
- POST /login → login auto après création
- GET /profile → récupérer infos user + personnage
- PUT /profile → modification
- DELETE /profile → suppression
- POST /player → créer Player lié à User
- GET /progression → fetch progression pour afficher les chapitres
- POST /progression → save progression