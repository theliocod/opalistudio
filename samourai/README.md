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
| F ou clic molette | coup de pied tournoyant : peu de dégâts, mais il brise la garde et repousse |
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
| `src/art.js` | la liste des images peintes présentes, écrite par `tools/kie-art.mjs` |

Le décor et le samouraï sont générés par le code. Certaines animations viennent
de Mixamo : `tools/bake-mixamo.mjs` les transfère sur notre squelette et les
enregistre dans `src/anims/` (le coup de pied tournoyant, la mort des ennemis).
Les FBX bruts ne sont pas versionnés.

```
node tools/bake-mixamo.mjs chemin/vers/Animation.fbx nom-de-l-animation
```
### Le décor peint

Le ciel, les matières (dalles, pierre, bois laqué, écorce) et l'illustration de
l'écran titre sont peints par kie.ai. Tant qu'une image manque, le jeu garde la
version générée par le code.

```
node tools/kie-art.mjs --dry-run --all   # voir les prompts sans rien dépenser
node tools/kie-art.mjs sol               # une image, pour valider le style
node tools/kie-art.mjs --all             # toutes celles qui manquent
npm run build
```

La clé est lue dans `KIE_API_KEY`. `tools/prep-art.py` (Python, Pillow, numpy)
rend les textures raccordables, tire une carte de relief de chacune et compresse
tout dans `assets/`. Les images sont intégrées à `dist/game.js`, si bien que le
jeu s'ouvre toujours d'un double clic, sans serveur.

`dist/game.js` est versionné pour que le jeu s'ouvre sans rien construire.
