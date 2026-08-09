# EMPIRE — le jeu de l'entrepreneur

Un jeu de gestion de vie et d'entreprise en français. Tu démarres à 18 ans, tu as
47 ans devant toi, et chaque mois tu décides quoi faire de ton temps.

## Lancer le jeu

Ouvre `index.html` dans un navigateur. Aucune installation, aucun serveur, aucun build.
La partie est sauvegardée automatiquement dans le navigateur (`localStorage`).

## Le principe

- **1 tour = 1 mois.** Tu as 3 blocs de temps à dépenser chaque mois.
- **6 origines sociales** au choix, chacune avec son capital de départ, ses compétences
  et son avantage propre (résilience, carnet d'adresses, filet familial…).
- **Ta vie compte autant que ton argent** : énergie, moral, santé et réputation
  conditionnent tout le reste. À zéro d'énergie, tu casses.
- **À 65 ans, on fait les comptes** — patrimoine, mais aussi objectifs atteints,
  moral et santé. La faillite personnelle et l'effondrement physique terminent
  aussi la partie.

## Ce que tu peux faire

| Domaine | Actions |
|---|---|
| Vie | te reposer, faire du sport, sortir, réseauter, partir en vacances, déménager (6 logements) |
| Carrière | postuler à 11 emplois, faire des heures sup, suivre 8 formations |
| Entreprises | créer parmi 12 modèles, régler le budget pub, améliorer le produit, prospecter, recruter, monter en niveau, lever des fonds, sortir des dividendes, vendre |
| Patrimoine | 6 placements (livret, ETF, crypto, immobilier…), emprunter, rembourser |

## Le modèle économique des entreprises

Chaque entreprise tourne sur un stock de clients qui évolue chaque mois :

```
acquisition = base × (organique + publicité) × compétences × qualité
              × réputation × conjoncture × (1 − part de marché)
churn       = churn du secteur, aggravé si tu dépasses ta capacité
clients     = clients × (1 − churn) + acquisition
profit      = (clients × prix − charges fixes − masse salariale − pub − coûts variables) − IS 25%
```

Les leviers sont donc réels : la publicité achète de la croissance, la qualité retient
les clients, la capacité (niveaux + salariés) évite la surchauffe, et le marché finit
par saturer — il faut alors diversifier. Trois mois de trésorerie négative et c'est
le dépôt de bilan.

La valorisation d'une entreprise suit son profit annuel × un multiple sectoriel
(x1,2 pour du freelance, x9 pour une startup IA), ce qui rend la revente stratégique.

## Fichiers

| Fichier | Rôle |
|---|---|
| `data.js` | tout le contenu : origines, emplois, formations, types d'entreprise, événements, placements |
| `game.js` | le moteur : état, règles économiques, résolution du tour, sauvegarde |
| `ui.js` | le rendu des écrans et les interactions |
| `styles.css` | l'habillage, aux couleurs d'OpalStudio |

Pour ajouter du contenu, il suffit d'éditer `data.js` — ajouter un événement, un métier
ou un type d'entreprise ne demande aucune modification du moteur.
