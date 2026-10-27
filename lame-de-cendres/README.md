# Lame de Cendres, monde ouvert (Godot 4.7)

Un samouraï seul dans une vallée maudite, sous une lune rouge. Version PC du
jeu, en monde ouvert. Le prototype navigateur reste dans `../samourai/`.

## Jouer

1. Télécharge Godot 4.7 (ou plus récent) sur godotengine.org, version standard.
2. Lance Godot, clique sur **Importer**, choisis le fichier `project.godot` de ce dossier.
3. Appuie sur **F5** (ou le bouton ▶ en haut à droite).

Le premier lancement prend une minute : Godot prépare les textures et les modèles.

### Faire un .exe pour Windows

Dans Godot : **Projet → Exporter**, préréglage **Windows**, puis **Exporter le projet**.
La première fois, Godot propose de télécharger les modèles d'export : accepte.
Le jeu sort en un seul fichier, `export/LameDeCendres.exe`.

## Les commandes

| Touche | Action |
|---|---|
| ZQSD ou WASD | se déplacer |
| Souris | caméra (clic dans le jeu pour la capturer, Échap pour la libérer) |
| Clic gauche ou J | coup rapide, trois à la suite |
| Clic droit ou K | coup lourd |
| F ou clic molette | coup de pied tournoyant : brise la garde, repousse |
| Espace | esquive (invulnérable au cœur de la roulade) |
| Maj ou L | parer à l'instant de l'impact, garder en maintenant |
| E | coup de grâce sur un ennemi déséquilibré · ouvrir un coffre · se recueillir à un autel |
| R, T | techniques apprises |
| 1, 2, 3, 4 | objets de la ceinture |
| Tab ou I | inventaire : objets, katanas, techniques |

## Le monde

Six lieux à découvrir, reliés par des chemins : l'**Autel des Cendres** (départ,
on s'y soigne et on y revient après une mort), le **Village de Kurogane**, le
**Camp des Ronins** et son chef, la **Croisée des Pendus**, le **Sanctuaire noyé**
au bord du lac, et le **Temple de la Lune Rouge** où attend l'Oni.

## Ce qui fait la progression

- **Les objets** : saké de soin, onigiri (vie et endurance), thé de Gyokuro
  (endurance plus rapide), encens de garde (moins de dégâts reçus). On les trouve
  dans les coffres et sur les morts.
- **Les katanas** : on commence avec la lame du rōnin. Cinq lames légendaires,
  chacune avec son aura et son pouvoir : Kurenai (brûlure), Shiranui (vol de vie),
  Raijin-maru (brise-garde, foudre en chaîne), Yamikaze (ripostes dévastatrices),
  et Tsukuyomi, arrachée à l'Oni (brûlure et vol de vie).
- **Les techniques** : chaque ennemi abattu laisse des âmes. Elles débloquent le
  Tourbillon de cendres (R), l'Iai : Éclair pourpre (T), la Garde de fer et le
  Souffle de la Lune.

## Le code

| Fichier | Rôle |
|---|---|
| `scripts/main.gd` | la partie : commandes, caméra, coups, butin, coffres, autels, découverte |
| `scripts/game/arsenal.gd` | objets, katanas, techniques, et ce que le joueur possède |
| `scripts/actors/fighter.gd` | un combattant : actions, poses clés, animations Mixamo, IA des ennemis |
| `scripts/actors/rig.gd` | le squelette du samouraï et les mélanges de poses |
| `scripts/actors/meshy_skin.gd` | pose les modèles Meshy sur ce squelette |
| `scripts/actors/fx.gd`, `trail.gd` | étincelles, sang d'encre, traînée de la lame |
| `scripts/world/terrain.gd` | le relief, le lac, les chemins, les replats |
| `scripts/world/vegetation.gd` | herbe, lys rouges, érables, pins, arbres morts, rochers |
| `scripts/world/landmarks.gd` | les lieux bâtis, leurs coffres, autels et gardiens |
| `scripts/world/atmosphere.gd` | le ciel peint, la lune, la brume |
| `scripts/ui/hud.gd` | l'interface, l'inventaire et les écrans |

Les images (`assets/*.jpg`) sont peintes par kie.ai et les personnages
(`assets/modeles/`) sculptés par Meshy, comme dans la version navigateur.
`tools/glb-for-godot.py` rend ces modèles lisibles par Godot. Les animations
Mixamo sont converties par `../samourai/tools/bake-mixamo.mjs` puis copiées
dans `anims/`.

Les fichiers `tools_*.gd` servent au développement (captures, mesures, tests)
et ne sont pas exportés.
