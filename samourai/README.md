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
| `src/rig.js` | le corps : squelette, formes simples de repli, sabre, poses et mélanges de poses |
| `src/skin.js` | pose les modèles sculptés par Meshy sur ce squelette |
| `src/world.js` | la cour du temple, la lune, la brume, les cendres |
| `src/fx.js` | étincelles, sang d'encre, traînée de la lame |
| `src/art.js` | la liste des images peintes présentes, écrite par `tools/kie-art.mjs` |
| `src/models.js` | la liste des modèles 3D présents, écrite par `tools/meshy.mjs` |

Les mouvements sont calculés par le code. Certaines animations viennent
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

### Les personnages sculptés

Le samouraï, le ronin et l'Oni sont des modèles 3D texturés et dotés d'un
squelette, créés par Meshy à partir des planches peintes par kie.ai
(`assets/modeles/*.png`).

```
node tools/meshy.mjs --dry-run --all   # voir ce qui serait lancé
node tools/meshy.mjs samourai          # un personnage
node tools/meshy.mjs --all             # ceux qui manquent
node tools/meshy.mjs --pack            # rallège les modèles déjà téléchargés
npm run build
```

La clé est lue dans `MESHY_API_KEY` (avec Node derrière un proxy, ajouter
`NODE_USE_ENV_PROXY=1`). Meshy livre des modèles de 16 Mo ; `tools/pack-model.py`
en tire des `*-jeu.glb` d'environ 2,5 Mo (textures 1024, sommets compactés),
seuls versionnés et intégrés au jeu.

Le jeu ne pilote pas directement le squelette de Meshy : il anime toujours son
propre squelette invisible, et `src/skin.js` fait suivre à chaque os du modèle
l'articulation correspondante. Les bras de Meshy sont en A au repos, les nôtres
pendent : on corrige cet écart une fois pour toutes au chargement. Le sabre et
sa traînée restent ceux du code, glissés dans la main du modèle ; les ennemis
gardent leurs yeux brûlants. Si un modèle manque, le personnage reprend ses
formes simples.

`dist/game.js` est versionné pour que le jeu s'ouvre sans rien construire.
