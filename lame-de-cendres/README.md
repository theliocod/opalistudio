# Lame de Cendres, monde ouvert (Godot 4.7)

Un samouraï seul dans une vallée maudite, sous une lune rouge. Version PC du
jeu, en monde ouvert. Le prototype navigateur reste dans `../samourai/`.

## Jouer

1. Télécharge Godot 4.7 (ou plus récent) sur godotengine.org, version standard.
2. Lance Godot, clique sur **Importer**, choisis le fichier `project.godot` de ce dossier.
3. Lance le jeu : **F5** sur Windows et Linux, **Cmd + B** sur Mac (ou le bouton ▶ en haut à droite).

Le premier lancement prend une minute : Godot prépare les textures et les modèles.

### Faire un .exe pour Windows

Dans Godot : **Projet → Exporter**, préréglage **Windows**, puis **Exporter le projet**.
La première fois, Godot propose de télécharger les modèles d'export : accepte.
Le jeu sort en un seul fichier, `export/LameDeCendres.exe`.

## Les commandes

Les touches suivent leur place sur le clavier : ZQSD sur un AZERTY, WASD sur un
QWERTY. Toutes se réassignent dans **Échap → Commandes**.

| Touche | Action |
|---|---|
| ZQSD ou WASD | se déplacer |
| Souris | caméra |
| Clic gauche ou J | coup rapide, trois à la suite |
| Clic droit ou K | coup lourd |
| F ou clic molette | coup de pied direct · enfoncer une porte |
| G | coup de pied tournoyant : brise la garde |
| Espace | roulade en mouvement, pas en arrière à l'arrêt · enjamber un muret |
| Maj ou L | parer à l'instant de l'impact, garder en maintenant |
| C ou Ctrl | s'accroupir (infiltration) |
| E | parler · exécuter un ennemi déséquilibré · assassiner par-derrière · ouvrir, prendre, libérer |
| R, T, A (Q), V, X | techniques : Tourbillon, Iai, Retour de l'Hirondelle, Pas du Vent, Mille Pétales |
| 1 à 6 | saké, onigiri, thé, encens, bombe fumigène, caillou |
| Tab ou I | inventaire |
| M | carte |
| Échap | menu : sauvegarder, charger, réglages, commandes |

## Le monde

Dix lieux à découvrir. L'**Autel des Cendres** (départ), le **Village de
Kurogane**, le **Camp des Ronins**, la **Croisée des Pendus**, le **Sanctuaire
noyé**, le **Temple de la Lune Rouge** où attend l'Oni, et :

- **Hōjō-machi**, la dernière ville libre : deux portes gardées, une grand-rue
  avec ses maisons éclairées, l'étal du marchand Daikoku, la taverne de la
  Lanterne Rouge, la maison de thé du Saule, le dojo et son **Registre des
  Lames**, un sanctuaire sous un sakura, un bassin aux carpes et son pont en arc.
  Des passants vont et viennent, des gardes font leur ronde, et on peut parler
  à tout le monde.
- **Le fort d'Akagane**, tenu par les gens de l'Oni : tours de guet, rondes,
  une cloche d'alarme, une armurerie pleine de katanas à piller, des
  prisonniers en cage, et le commandant Gonryū dans sa grande salle. Une
  brèche s'ouvre au nord-ouest, un muret effondré à l'est.
- **Le Cimetière des Lames**, des centaines de sabres plantés et leurs âmes bleues.
- **Le Bosquet de bambous**, où un vieil ermite boit son thé.

## L'infiltration

Les gardes d'Akagane regardent dans un cône (visible au sol quand tu es
accroupi). Quand ils t'aperçoivent, un **?** se remplit au-dessus de leur tête :
ils viennent voir. Plein, il devient **!** : l'alerte est donnée, et la cloche
réveille tout le fort, sauf si tu as tranché sa corde. Accroupi, on est vu de
moins loin et on fait moins de bruit ; courir et se battre s'entendent. Un
corps découvert donne l'alerte.

- **Assassiner** : par-derrière, sans avoir été vu, E. Une mise à mort au ralenti.
- **Bombe fumigène** : personne ne te voit dans le nuage, les ennemis tout près titubent.
- **Caillou** : il tombe plus loin, les gardes vont voir d'où vient le bruit.

## Le sang et les exécutions

Les coups font gicler le sang, qui tache le sol et rougit la lame jusqu'à ce
qu'on la rengaine d'un geste sec. Un ennemi déséquilibré s'exécute (E) avec
une scène de cinéma : le kesa-giri, le tourbillon, ou le dégainé qui traverse
l'ennemi, s'arrête et rengaine lentement avant que le sang ne jaillisse. Le
sang se coupe dans les réglages.

## La réputation, l'argent et le Registre

- **Les ryō** tombent des ennemis, des coffres et des duels. Daikoku vend des
  remèdes, des ruses et trois katanas.
- **La renommée** monte avec chaque damné abattu, chaque lieu découvert, chaque
  prisonnier libéré et chaque duel gagné. Elle fait baisser les prix, fait
  s'incliner les passants et ouvre les duels. Ton titre passe d'*Inconnu* à
  *Légende de la vallée*.
- **L'infamie** monte si tu lèves la main sur les gens de Hōjō : les gardes te
  pourchassent. Le capitaine Saitō, à la porte sud, accepte une amende.
- **Le Registre des Lames** : six samouraïs célèbres, chacun à son endroit de
  la ville (le pont, la maison de thé, la taverne, le sanctuaire, le bassin, le
  dojo). On les défie du sixième au premier ; le tableau du dojo dit où les
  trouver et les marque sur la carte. Vaincus en duel, ils enseignent une
  technique ou confient leur lame.

## Ce qui fait la progression

- **Les katanas** : la lame du rōnin, puis Kurenai (brûlure), Shiranui (vol de
  vie), Raijin-maru (foudre), Yamikaze (ripostes), Tsukuyomi (la lame de l'Oni),
  Kazekiri (coups rapides, souffle), Sakura-fubuki (saignement), Kuroi Hebi
  (venin), Gojō (onde de choc), Hōjō Masamune (la récompense du premier
  sabre), et la Lame d'Akagane (assassinats).
- **Les techniques** : les âmes des damnés débloquent le Tourbillon, l'Iai, la
  Garde de fer et le Souffle de la Lune ; les maîtres du Registre enseignent le
  Pas du Vent, l'Œil unique, les Mille Pétales et le Retour de l'Hirondelle.

## Les réglages

Échap ouvre le menu. Affichage (fenêtre, synchronisation, images par seconde,
résolution du rendu avec FSR 2, champ de vision, luminosité), qualité
(préréglage, anticrénelage, densité de l'herbe), jeu (sensibilité, axe inversé,
secousses, sang, cônes de vision, aides), son (général, musique, effets,
ambiance) et touches. Tout est gardé dans `user://reglages.cfg`. La partie se
sauvegarde à chaque autel et depuis le menu ; **Continuer** la reprend.

## Le code

| Fichier | Rôle |
|---|---|
| `scripts/main.gd` | la partie : commandes, caméra, coups, butin, dialogues, duels, techniques, sauvegarde |
| `scripts/game/arsenal.gd` | objets, katanas, techniques, ryō, et ce que le joueur possède |
| `scripts/game/renown.gd` | renommée, infamie, le Registre des Lames |
| `scripts/game/dialogues.gd` | ce que disent les gens |
| `scripts/game/stealth.gd` | ce que voient les gardes, le doute, l'alerte, la cloche |
| `scripts/game/cinematics.gd` | assassinats et exécutions mis en scène |
| `scripts/game/audio.gd` | musique selon l'humeur, bruitages, vent et feux |
| `scripts/game/wind.gd` | le vent, ses rafales, les feuilles et les pétales |
| `scripts/game/settings.gd`, `savegame.gd` | réglages et sauvegarde |
| `scripts/actors/fighter.gd` | un combattant : actions, gestes, animations Mixamo, IA des damnés |
| `scripts/actors/folk.gd` | les gens des villes : promeneurs, gardes, samouraïs |
| `scripts/actors/blood.gd` | gerbes, taches au sol, flaques, lame ensanglantée |
| `scripts/actors/rig.gd`, `meshy_skin.gd` | le squelette et les modèles Meshy posés dessus |
| `scripts/world/terrain.gd`, `vegetation.gd`, `atmosphere.gd` | relief, herbe et arbres, ciel et brume |
| `scripts/world/landmarks.gd`, `towns.gd` | les lieux bâtis, les villes, leurs habitants |
| `scripts/ui/*.gd` | l'interface, la carte, le dialogue, la boutique, le registre, le menu |

Les images (`assets/*.jpg`, `assets/kie/`) et les portraits sont peints par
kie.ai (`tools/kie-art.mjs`, `tools/kie-portraits.mjs`), les personnages
(`assets/modeles/`) sculptés par Meshy à partir des planches de
`../samourai/assets/modeles/`, la musique composée par Suno (`tools/kie-music.mjs`)
et les bruitages synthétisés (`tools/synth-sfx.py`). Les animations Mixamo sont
converties par `../samourai/tools/bake-mixamo.mjs` puis copiées dans `anims/`.

Les fichiers `tools_*.gd` servent au développement (captures, mesures, tests)
et ne sont pas exportés.
