# Histoire du Jeu - Agent Special

## Pitch
Vous incarnez un agent spécial engagé pour retrouver un développeur suspecté d'avoir hacké un gros système informatique.  
Votre mission : retracer son parcours, ses recherches et ses créations pour découvrir la vérité.

---

## Chapitre 0 — Introduction : Bienvenue Nouvel Agent
- La page d’accueil ressemble à une **messagerie textuelle** :  
  > "Bienvenue Nouvel Agent ? Hm… Il me semble que vous ne m’ayez pas dit votre nom… ?"
- Choix du joueur :
  - **Dire son nom → créer un compte**  
    - Formulaire modal pour créer un compte.
    - Login automatique après création.
    - Menu en haut à droite : modifier profil, supprimer compte, logout.
    - Ensuite : création d’un **Player** (nom, prénom, âge, genre).
  - **Ne pas dire son nom → jouer en guest**  
    - Progression stockée en localStorage.
    - Création d’un personnage fictif mais offline.

---

## Chapitre 1 — Les premières suspicions
- Il y a 3 ans, le développeur commence en tant que **joueur roleplay sur FiveM**.
- Ses recherches sur drogues, armes pour ses ressources RP. (suscitent des suspicions.)
- Il n’avait aucune connaissance en code au départ.

---

## Chapitre 2 — Premières tentatives de développement
- Fatigué des serveurs mal gérés et buggués, il décide de se lancer dans le **développement FiveM**.
- Il commence à créer une **base de serveur obsolète sur Essential Mode** avec les quelques tutos trouvés.
- Apprentissage des bonnes pratiques et structure de configuration (Config.lua).
- Beaucoup d’erreurs dans la console → recherches sur **résolution d’erreurs**, découvertes de contenus sur backdoors et sécurité serveur. (suscitent des suspicions.)

---

## Chapitre 3 — Sécurité et incidents
- Premier **hack subi sur son serveur**.
- Recherche intensive sur **sécurité, HTTP requests, exceptions C#**, encore méconnu pour lui mais *suspect* pour des observateurs fictifs.
- Début des suspicions majeures pour les autorités fictives : backdoors, armes, drogues, sécurité serveur.

---

## Chapitre 4 — Création de ressources FiveM
- Création progressive de **ressources FiveM**.
- Les noms fictifs des scripts (ex: `ndc-blanchiement`, `ndc-illegal-vehicle`) donnent l’impression d’activités illégales.
- Le joueur (agent spécial) devra retracer **l’ordre de fabrication** de ces scripts.

---

## Chapitre 5 — Découverte de langages web
- Le développeur apprend **HTML, CSS**, commence un peu PHP (mais abandonne rapidement).
- Recherches sur **injections malveillantes HTML** → (suspicion accrue.)
- Ces recherches seront des indices supplémentaires dans le jeu.

---

## Chapitre 6 — Applications locales et outils
- Création de **Iona-Spy**, application locale qui interagit avec la DB FiveM et renvoie les infos des joueurs (inventaire, voitures, comptes en banque).
- La ressource est partiellement cryptée → semblant de collecte de données personnelles et intrusion banquaire. (suspicion accrue++)

---

## Chapitre 7 — Python et bots Discord
- Découverte de **Python**, initiation à **JavaScript**.
- Création de bots Discord fictivement cryptés.
- Apparence : bots de minage ou intrusion sur systèmes bancaires → (renforce les suspicions).

---

## Chapitre 8 — Inscription à BeCode
- Le développeur s’inscrit à **BeCode** pour suivre la formation Software Developer.
- Les autorités fictives savent qu’il suit une formation mais n’ont aucune preuve de culpabilité.

---

## Chapitre 9 — Reconstruction du parcours
- Le joueur, en suivant les indices, **reconstitue le parcours complet du développeur**.
- Les indices débloquent un **CV ou VCard final**.
- Envoi du CV/VCard → fin du jeu.

---

## Chapitre 10 — Révélation finale
- Dernière page messagerie :
  > "Nous avons retrouvé la position exacte… ce n’était pas vous !  
  > Toutes nos excuses pour ces recherches.  
  > Si vous avez besoin d’un software dev maintenant, vous savez où en trouver 😏"
- Fourniture du **PDF du CV** téléchargeable.
- Fin humoristique et décalée du jeu.

---

## Notes pour le jeu
- Chaque **action du joueur** correspond à un **StepId** dans la progression.
- Les indices (textes, calculs, puzzles, ordres de scripts) sont stockés dans la table `Clue` ou dans JSON lié à la progression.
- Guest → progression en localStorage.  
- Compte créé → progression en DB via backend.
