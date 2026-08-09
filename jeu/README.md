# EMPIRE — le jeu de l'entrepreneur

Un jeu de gestion de vie et d'entreprise en français, simulé au jour le jour.
Tu démarres à 18 ans, tu as 47 ans devant toi.

## Lancer le jeu

Ouvre `index.html` dans un navigateur. Aucune installation, aucun serveur, aucun build.
La partie est sauvegardée automatiquement dans le navigateur (`localStorage`).

## Le principe

- **Un jour = un tour.** Tu règles ton emploi du temps en heures, puis tu avances
  d'un jour, d'une semaine ou d'un mois. La simulation s'arrête dès qu'un événement
  demande une décision.
- **12 heures utiles par jour**, 17 au maximum. Au-delà, la santé et l'énergie
  paient l'addition, et tout ce que tu fais devient moins efficace.
- **6 origines sociales**, chacune avec son capital, ses compétences et son avantage.
- **À 65 ans, on fait les comptes** — patrimoine, mais aussi objectifs atteints,
  équipe construite, réseau, moral et santé.

## Ton emploi du temps

Tu répartis tes heures entre l'emploi salarié, chacune de tes entreprises, la
formation en cours, le sport, la vie sociale et le réseautage. Les heures non
allouées servent à récupérer.

Dans chaque entreprise, tu choisis **le poste que tu occupes toi-même** :

| Rôle du fondateur | Effet |
|---|---|
| Vente & prospection | tu signes des clients directement, selon ton niveau en social et business |
| Acquisition | chaque euro de budget publicitaire rend davantage |
| Produit | la qualité monte, le churn baisse |
| Direction & équipe | le moral de l'équipe monte, tu peux encadrer plus de monde |

## Piloter une entreprise

Chaque société se règle sur une dizaine de variables :

- **Quatre canaux d'acquisition** — contenu organique, publicité payante, influence,
  prospection sortante. Chacun a son coût par client, son plafond propre et sa
  dépendance à une compétence. Le contenu organique est le moins cher mais met des
  mois à s'installer ; l'influence dépend de ta réputation. Comme chaque canal sature
  séparément, répartir coûte moins cher que tout mettre au même endroit.
- **Le niveau de prix** (60 % à 160 % du prix marché) : marge contre volume.
- **Le budget R&D**, qui fait monter la qualité — laquelle retient les clients et
  justifie les prix.
- **Le budget support**, qui réduit le churn.
- **La politique salariale** (80 % à 140 % du marché), qui tient le moral de l'équipe.
- **Le niveau d'infrastructure**, qui augmente la capacité.

Un encadré permanent affiche ce que tu brûles chaque mois et combien de mois
d'autonomie il te reste.

## Les équipes

Six postes : commercial, marketeur, produit, opérations, support, manager. Chacun
améliore une chose précise (clients signés, rendement de la pub, qualité, capacité,
churn, taille d'équipe gérable).

Chaque salarié est une personne : un nom, un niveau, un trait de caractère
(bosseur, loyal, créatif, ambitieux, instable, toxique…), un salaire, un moral et
une ancienneté. Il progresse s'il est bien traité, il part si son moral s'effondre.

**Le marché du travail tourne tout seul.** Tu ouvres un poste et tu fixes le salaire
proposé : plus il est élevé par rapport au marché, plus les candidatures sont
nombreuses et de bon niveau. Elles arrivent jour après jour, et les bons candidats
ne patientent pas éternellement. Tu peux faire passer un entretien pour connaître
le niveau réel d'un candidat (sans ça, tu n'as qu'une estimation floue, d'autant
plus juste que tu es bon en social), négocier son salaire, ou payer un cabinet de
recrutement pour obtenir trois profils sérieux immédiatement.

Au-delà d'une certaine taille, il faut des managers : sans encadrement, la
performance et le moral se dégradent pour tout le monde.

## Les compétences

Cinq compétences, avec un effet direct et chiffré sur le jeu :

| Compétence | Ce qu'elle change |
|---|---|
| Business | charges fixes, taille d'équipe gérable, accès aux gros modèles |
| Marketing | rendement de chaque euro de publicité et de contenu |
| Tech | qualité du produit, coûts variables |
| Social | vente directe, recrutement, négociation, réseau |
| Finance | impôts, coût de la dette, valorisation à la revente |

La progression est délibérément dure : plus tu montes, plus chaque point coûte cher,
et **chaque source d'apprentissage a son plafond**. L'autoformation te mène à 38,
les formations payantes à 78, l'expérience de terrain à 88. Au-delà, seul un mentor
de ton réseau peut encore te faire progresser — et jamais au-dessus de son propre
niveau.

## Le réseau

En allouant des heures au réseautage, tu rencontres des gens : entrepreneurs
confirmés, experts acquisition, ingénieurs, investisseurs, closers, chasseurs de
têtes, grands comptes. Chacun a un niveau et une relation qui se construit en
passant du temps avec lui.

Au-delà de 30 de relation, il te transmet son savoir. Au-delà de 45, tu peux lui
demander un service : un investissement, un client signé, un profil rare, un audit
de ton produit. Un service consomme du capital relationnel.

## Les événements

46 événements, dont 11 qui se construisent à partir de ta situation réelle
(le salarié qui demande une augmentation est un vrai salarié de ton équipe, avec
son nom, son ancienneté et son salaire). 118 choix au total, avec des conséquences
mécaniques : compte publicitaire suspendu, client qui pèse 40 % du chiffre, associé
qui veut sortir, cabinet qui te démarche, marché du travail qui se tend, salarié qui
craque, ancien employé qui te copie, réglementation nouvelle.

## Fichiers

| Fichier | Rôle |
|---|---|
| `data.js` | origines, logements, emplois, formations, types d'entreprise, canaux, postes, placements, objectifs |
| `people.js` | génération des candidats et des contacts, traits de caractère |
| `events.js` | les 46 événements et leurs conséquences |
| `game.js` | le moteur : tick journalier, économie, équipes, marché du travail, apprentissage |
| `ui.js` | rendu des écrans et interactions |
| `styles.css` | habillage, aux couleurs d'OpalStudio |

Pour ajouter du contenu, il suffit d'éditer `data.js` ou `events.js` : ajouter un
événement, un métier, un poste ou un type d'entreprise ne demande aucune
modification du moteur.
