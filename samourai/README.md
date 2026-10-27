# Lame de Cendres

Un jeu d'action 3D dark fantasy. Un samouraï seul, une cour de temple en ruine,
une lune rouge, et des ronins maudits qui se relèvent.

## Jouer

Ouvre `index.html` dans un navigateur (Chrome, Edge, Firefox). Rien à installer.

| Touche | Action |
|---|---|
| ZQSD ou WASD | se déplacer |
| Souris | tourner la caméra (clic dans le jeu pour la capturer, Échap pour la libérer) |
| Clic gauche ou J | coup rapide, trois à la suite |
| Clic droit ou K | coup lourd, avec un élan |
| Espace | esquiver (invulnérable au cœur de la roulade) |
| Maj ou L | parer au moment de l'impact, garder en maintenant |

Quand la lame d'un ennemi rougeoie, il va frapper. Une parade au bon moment le
déséquilibre : tes coups suivants font alors deux fois et demie plus mal.

Quatre vagues : un ronin, deux, trois, puis l'Oni de la Lune Rouge.

## Développer

```
npm install
npm run dev     # reconstruit dist/game.js à chaque modification
npm run build   # version finale, minifiée
```

| Fichier | Rôle |
|---|---|
| `src/main.js` | la boucle de jeu : commandes, caméra, coups, vagues, interface |
| `src/combat.js` | les combattants, leurs actions (coups, parade, esquive) et l'IA des ennemis |
| `src/rig.js` | le corps : squelette, armure, sabre, poses et mélanges de poses |
| `src/world.js` | la cour du temple, la lune, la brume, les cendres |
| `src/fx.js` | étincelles, sang d'encre, traînée de la lame |

Tout est généré par le code : aucune image ni aucun modèle 3D pour l'instant.
`dist/game.js` est versionné pour que le jeu s'ouvre sans rien construire.
