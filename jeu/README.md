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
  dépendance à une compétence. Comme chaque canal sature séparément, répartir coûte
  moins cher que tout mettre au même endroit.
- **Le niveau de prix** (60 % à 160 % du prix marché) : mais le prix ne se décide pas
  seul, voir plus bas.
- **Le budget R&D**, qui fait monter la qualité.
- **Le budget support**, qui réduit le churn.
- **La politique salariale** (80 % à 140 % du marché), qui tient le moral de l'équipe.
- **Le niveau d'infrastructure**, qui augmente la capacité.

### Le prix se juge par rapport à ce que vaut ton produit

Ta qualité détermine une **valeur perçue**. Si tu demandes plus que cette valeur, les
clients arrivent moins vite et partent plus vite ; si tu demandes moins, tu fais du
volume en laissant de la marge. Un produit à 90 de qualité peut donc se vendre 30 %
au-dessus du marché sans perdre personne, alors que le même prix sur un produit
médiocre divise la demande par deux. L'interface affiche en clair la valeur perçue,
le prix demandé et le facteur de demande qui en résulte.

La qualité pèse aussi directement sur la **publicité** : un bon produit convertit
mieux et se recommande, ce qui fait rendre presque deux fois plus chaque euro investi
en acquisition.

### Rien ne produit son effet immédiatement

Un budget publicitaire met des semaines à porter — 35 jours pour la publicité payante,
150 pour le contenu organique. L'interface affiche la montée en charge de chaque canal.
Couper un budget ne fait pas disparaître ses effets du jour au lendemain non plus.

De la même façon, **une entreprise ne peut pas absorber une croissance illimitée** :
au-delà d'environ 18 % de clients supplémentaires par mois, ce qui arriverait en plus
se perd, parce qu'on ne recrute, ne livre et ne structure pas plus vite que ça.

### La taille demande du monde

La capacité ne dépend pas que de l'infrastructure : **chaque personne ne peut couvrir
qu'un nombre fini de clients**, que l'outillage démultiplie. Servir des centaines de
milliers de clients demande donc une vraie équipe, pas seulement des niveaux
d'infrastructure. Les charges de structure, elles, croissent plus vite que la taille.

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

Certaines formations sont **renouvelables** : lectures, autoformation, programmes en
ligne et coaching peuvent se reprendre autant de fois que tu veux, en allant chercher
des programmes plus pointus — donc un peu plus chers à chaque fois. Les diplômes
(bootcamp, certification, MBA) ne se passent qu'une fois.

## Combien peut valoir une entreprise

Les marchés sont dimensionnés en clients réellement atteignables : 30 pour un
freelance, 700 pour une agence, 950 000 pour un SaaS, 8 millions de joueurs pour un
studio. Une **startup IA bien menée dépasse le milliard d'euros de valorisation** ;
un SaaS ou un studio approchent le milliard ; une agence plafonne à quelques dizaines
de millions ; un freelance restera un freelance. La hiérarchie des modèles est celle
de la réalité.

La valorisation ne se calcule pas sur le mois en cours mais sur une **moyenne glissante
de six mois**, assortie d'une prime de croissance et d'une décote de jeunesse. Elle ne
saute donc plus d'un mois à l'autre — moins de 3 % de variation mensuelle sur une
activité stable — exactement comme un repreneur regarderait tes comptes.

## Financer sans se financer soi-même

Une entreprise qui grandit demande plus d'argent qu'elle n'en gagne. Trois portes,
qui ne coûtent pas la même chose.

### Les tours de table

Quatre étages — **amorçage, série A, série B, série C** — et on ne saute pas une
marche. Chacun a ses conditions d'entrée en clients, en chiffre d'affaires mensuel,
en croissance et en ancienneté ; l'interface dit précisément ce qui manque.

Ouvrir un tour coûte de l'énergie et ne garantit rien : les fonds répondent selon
leur appétit pour ta croissance, ta qualité, ta réputation et la taille de ton
marché. Ceux qui répondent posent chacun leur **term sheet** — valorisation
pré-money, montant, pourcentage, siège au conseil ou non.

Six fonds, avec chacun leur façon de faire :

| Fonds | Ce qu'il apporte | Ce qu'il coûte |
|---|---|---|
| Cercle Montaigne (angels) | deux contacts de haut niveau | petit chèque |
| Kairos Ventures (capital-risque) | de la crédibilité, un effet de notoriété | un siège au conseil |
| Northbridge Capital (croissance) | ses opérationnels remettent tes process d'équerre | des objectifs trimestriels serrés |
| Vantage Partners (agressif) | le plus gros chèque, une agence média pendant un an | ils négocient dur et s'impatientent vite |
| Fonds Rivage (family office) | du temps, jamais de pression | ils mettent moins |
| Altaïr Industries (stratégique) | son réseau de distribution élargit ton marché | il compte te racheter en entier |

**Négocier** fait monter le prix de 8 à 22 % quand ça marche — d'autant plus qu'il y
a d'autres prétendants autour de la table — et peut faire partir le fonds quand ça
rate. Deux tentatives par offre.

### Ce que les investisseurs attendent ensuite

L'argent pris aujourd'hui devient une exigence demain. Chaque tour fixe une
trajectoire, et le conseil se réunit tous les trois mois pour comparer les chiffres
à la promesse. Quand la patience s'épuise : d'abord une réunion tendue, puis un
directeur général qu'on t'impose, puis une cession forcée en dessous du prix. Trois
issues à chaque fois, dont racheter leur part avec ton argent personnel. Un business
angel mécontent te le dit ; seul un fonds qui siège au conseil peut te mettre au
pied du mur.

### La dette bancaire

La banque ne regarde ni ton rêve ni ta croissance : douze mois de comptes
bénéficiaires, et elle prête jusqu'à environ 2,6 fois ton résultat annuel. Elle ne
prend pas de capital — mais l'échéance tombe les mauvais mois aussi, et **le
remboursement du capital sort de la trésorerie sans jamais apparaître dans ton
profit**, ce qui est exactement ce qui surprend le plus quand on s'endette. Les
intérêts, eux, passent bien en charge.

Une société qui finance vraiment de la R&D peut obtenir une **avance innovation** :
deux ans sans rembourser le capital, taux réduit. C'est ce qui sauve une entreprise
qui investit avant d'encaisser.

### Le groupe

Deux sociétés côte à côte ne font rien l'une pour l'autre. Trois niveaux
d'intégration, chacun avec ses prérequis en nombre de sociétés et en compétences :

1. **Direction commune** — −7 % de charges fixes partout.
2. **Services mutualisés** — −14 %, et tes sociétés se passent des clients entre
   elles, d'autant plus qu'elles s'adressent au même monde.
3. **Groupe intégré** — −20 %, ventes croisées renforcées, les meilleurs salariés
   tirent les autres vers le haut, et une société en manque de trésorerie est
   renflouée par ses sœurs avant le dépôt de bilan.

Une petite société dans un grand groupe reçoit beaucoup ; la locomotive du groupe ne
reçoit presque rien. C'est le poids relatif qui compte, pas la taille absolue.

## Les concurrents

Chaque marché est déjà occupé quand tu arrives : trois ou quatre entreprises, tirées
parmi cinq archétypes — leader historique, casseur de prix, acteur premium,
concurrent financé, petit indépendant. Elles grandissent, ajustent leurs prix,
soignent leur produit, et **s'agacent quand tu prends des parts**.

Ce qui te gêne n'est pas leur taille mais leur rapport qualité/prix : un géant
médiocre et cher pèse moins qu'un petit excellent et bon marché. Tu peux payer une
étude pour savoir à qui tu as affaire, lancer une campagne comparative, ou racheter
un concurrent — tu récupères alors 60 à 82 % de ses clients, le reste part pendant
la fusion.

## Ta vie personnelle

Un conjoint avec son propre caractère — patient, ambitieux, exigeant, complice,
fragile — et donc sa propre exigence en heures. Des enfants qui grandissent et se
détachent si tu n'es jamais là. Des amis qui s'éloignent.

Tout se joue dans le planning : « Famille » est une ligne d'emploi du temps comme
les autres, et l'écart entre ce qu'on attend de toi et ce que tu donnes se paie
chaque jour. Une relation au-dessus de 60 te rend du moral et de l'énergie ; en
dessous de 22, la rupture s'annonce au lieu de tomber du ciel. Le mariage coûte une
bague, le divorce entre 30 et 45 % du patrimoine.

## Le guide et les finances

Un encart « Quoi faire maintenant » lit ta situation réelle et sort les deux ou
trois choses qui comptent, en distinguant l'urgent du souhaitable. Il se referme
quand tu n'en veux plus.

Un onglet **Finances** trace l'historique de chaque société : chiffre d'affaires
contre coûts, décomposition des charges, clients, trésorerie, effectif — en
graphiques dessinés à la main, sans aucune dépendance.

## Le réseau

Un carnet d'adresses n'est pas une collection : c'est un ensemble de gens qui
t'oublient si tu ne les vois plus, qui comptent ce que tu leur demandes, et qui
ne répondent pas si tu n'es personne.

### Quatre cercles, et une érosion permanente

| Cercle | Ce que ça veut dire |
|---|---|
| Croisé une fois | Il se souvient vaguement de toi. |
| Connaissance | Il répond à tes messages. Sans plus. |
| Relation de confiance | Il décroche quand tu appelles, et il te présente des gens. |
| Proche | Il se déplacerait pour toi. Ça se rend. |

**Chaque lien se refroidit tout seul**, d'autant plus vite qu'on ne se voit plus.
Un lien fort résiste longtemps, un lien faible s'éteint en quelques mois. Les
heures de réseautage entretiennent tes cinq relations les plus solides ; pour
construire, il faut aller voir les gens un par un.

### Tu ne rencontres que des gens de ton niveau

Ce que tu pèses socialement se calcule sur ta réputation, ta meilleure
compétence, ce que tu as construit et tes cessions. **En réseautant à froid, tu
ne croises que des gens de ce niveau-là.** Pour monter plus haut, il n'y a qu'une
route : te faire **présenter** par quelqu'un qui te fait confiance. Une
présentation te fait démarrer à 30 de relation au lieu de 10, et peut t'ouvrir
des gens bien au-dessus de ton propre niveau.

### La réciprocité, qui est le cœur du système

Chaque service demandé creuse une dette. Au bout de trois demandes sans rien
rendre, on cesse de te rappeler — et une présentation devient impossible. Pour
rouvrir le robinet, il faut **rendre service** : présenter quelqu'un, donner
deux jours de ton temps, dépanner financièrement, envoyer une affaire que tu
aurais pu garder. C'est ce qui distingue un réseau d'un fichier de contacts.

Les gens de ton carnet vivent leur vie : ils montent en grade, partent à
l'étranger, reviennent, et parfois t'appellent sans rien demander.

## Le mentorat

Un mentor n'est pas un contact avec une grosse jauge. C'est quelqu'un qui a déjà
fait le chemin et qui **accepte** de te consacrer du temps — ou pas.

- **Ça se demande.** Il regarde votre relation, sa confiance, ta réputation, ce
  que tu as construit, et les services que tu lui as rendus. Un refus coûte une
  année d'attente.
- **Cinq façons d'accompagner** : exigeant, socratique, opérateur, financier,
  bienveillant. Chacune a son rythme de séances, sa patience et sa vitesse de
  transmission. L'exigeant te fait progresser vite et ne repasse pas les plats ;
  le bienveillant te garde en vie quand tout va mal.
- **Il te fixe un objectif** lu dans l'état réel de ta partie : doubler ton
  chiffre d'affaires, sortir de l'opérationnel, remonter ta santé, construire
  cinq relations de confiance, mener une cession. Un objectif tenu fait franchir
  un palier et débloque un vrai saut de compétence.
- **Il faut venir aux séances.** Ne pas venir est la seule façon sûre de le
  perdre : au bout de deux à quatre absences, il arrête.
- C'est **la seule route au-delà de 88** dans une compétence. Avec un bon mentor
  et une trentaine de séances, on passe de 88 à 96 — ce qu'aucun livre et aucune
  formation ne permettront jamais.

Deux mentors en même temps au maximum, et seulement à partir de 70 en social.

### Transmettre à son tour

Passé un certain niveau, ou après une première cession, tu peux accompagner des
gens qui démarrent. Expliquer oblige à comprendre, ça rapporte de la réputation
et du moral — et ceux qui percent entrent dans ton carnet **en tant qu'égaux**,
avec une relation qu'aucun déjeuner n'aurait achetée.

## Les amis

Ils ne servent à rien, et sans eux on ne tient pas. Ce ne sont plus un compteur
mais des personnes, avec un nom, un visage et un caractère : fidèle, fêtard,
ambitieux, posé, ou franc — le seul qui te dise en face que tu es en train de te
planter.

Tu commences la partie avec deux amis d'enfance. Les heures « Vie sociale » se
répartissent entre eux : plus tu en as, moins chacun en reçoit. Un ami proche te
rend du moral et de l'énergie tous les jours, et **quand ton moral s'effondre, il
débarque sans prévenir**.

Deux façons de les perdre. Le silence : on finit par ne plus rappeler. Et
**l'écart de vie** : plus ton patrimoine grimpe pendant que tu ne les vois plus,
plus l'envie monte chez ceux que ça travaille — jusqu'à ce qu'ils coupent les
ponts. « Tu n'es plus le même. » Ils n'ont pas toujours tort.

Tu peux les voir, les dépanner quand ça va mal, et en faire entrer un dans une de
tes sociétés : loyal, motivé, moins cher que le marché — et impossible à
licencier sans casse.

## Les événements

55 événements, dont 21 qui se construisent à partir de ta situation réelle
(le salarié qui demande une augmentation est un vrai salarié de ton équipe, avec
son nom, son ancienneté et son salaire). 145 choix au total, avec des conséquences
mécaniques : compte publicitaire suspendu, client qui pèse 40 % du chiffre, associé
qui veut sortir, cabinet qui te démarche, marché du travail qui se tend, salarié qui
craque, ancien employé qui te copie, réglementation nouvelle.


## Ton personnage

Avant de commencer, tu dessines ton avatar : teint, coiffure et sa couleur,
pilosité, regard, tenue et sa couleur, accessoires. Tout est en SVG, donc net à
n'importe quelle taille et sans une seule image à charger.

Le même système donne un visage à **tout le monde** : tes contacts, tes salariés,
tes candidats et les gens que tu croises en soirée. Chaque personne garde le
sien d'une session à l'autre.

## Le téléphone

Un smartphone accessible en permanence en bas à droite, avec six applications :

| App | Ce qu'elle fait |
|---|---|
| Contacts | ton réseau avec les visages, la relation, et les boutons pour voir quelqu'un ou lui demander un service |
| Agenda | le calendrier du mois, les jours où il se passe quelque chose, et l'inscription aux événements |
| Sorties | le catalogue des événements existants, leur prix, leur niveau et ce qu'il faut pour y entrer |
| Recevoir | organiser une soirée chez toi, du simple apéro au rooftop privatisé |
| Train de vie | acheter et revendre voitures, montres, immobilier, yacht, jet, art |
| Journal | le fil des événements de ta vie |

## Sortir, en vrai

Sept types d'événements existent, de l'afterwork d'indépendants au sommet des
investisseurs, chacun avec son prix d'entrée, son niveau de fréquentation et ses
conditions d'accès. Ils apparaissent dans ton agenda à des dates précises ; tu
t'inscris, et le jour venu la simulation s'arrête pour te demander si tu y vas.

Quand tu y vas, **tu vois la salle**. Pas un fond d'écran : un vrai volume,
construit en CSS 3D, avec son sol, ses deux murs qui portent leur décoration
dans leur propre plan, son mobilier à trois faces éclairées, et les gens qui
bougent dedans. Tu cliques sur quelqu'un pour
l'aborder, et tu choisis ton approche — aller droit au but, le faire parler de
lui, sortir tes chiffres, raconter ton histoire, rentrer dans la technique,
détendre avec une vanne. Chaque approche teste une compétence différente contre
le niveau de ton interlocuteur, et le pourcentage de réussite est affiché avant
que tu choisisses.

Ce que tu en tires dépend de qui c'est : un fondateur entre dans ton carnet
d'adresses, un investisseur peut mettre au pot, un grand compte te signe des
clients, un profil rare postule chez toi, un journaliste te fait gagner de la
réputation, un vieux briscard te transmet ce qu'il sait. Rater une approche
coûte l'occasion — on ne parle qu'une fois à chaque personne.

Tu peux aussi **recevoir chez toi**. Cinq formats, du dîner à six couverts à la
soirée rooftop, chacun demandant un logement à la hauteur. La fête d'entreprise,
elle, remonte le moral de toutes tes équipes d'un coup.

### Huit décors, aucun identique

| Lieu | Ce qu'on y voit |
|---|---|
| Arrière-salle de bar | parquet, mur de briques, néon « BIÈRES », comptoir de zinc et son étagère de bouteilles, tabourets, mange-debout avec les verres dessus, suspensions qui éclairent le zinc |
| Coworking | béton ciré, grande verrière, îlots de bureaux avec écrans allumés, chaises, tableau blanc, coin café, canapé et plantes |
| Salon professionnel | moquette, deux allées de stands aux couleurs des exposants, écrans, kakémonos, îlot café, projecteurs au plafond |
| Auditorium | grand écran LED animé, scène, pupitre et micro, quatre rangées de sièges, faisceaux mobiles dans la fumée |
| Gala | marbre sombre, tentures et filet doré, tapis rouge, tables rondes nappées avec chaises, bougies et compositions florales, lustre, pyramide de coupes |
| Chez toi | parquet, tapis, canapé et sa table basse, télé allumée, bibliothèque, îlot de cuisine, lampadaire, cadres aux murs |
| Club privé | murs en égaliseur qui battent la mesure, néon CLUB, boule à facettes, mur d'images du DJ, piste de dalles lumineuses, enceintes qui respirent avec la basse, bar au néon, carré VIP, confettis |
| Rooftop | terrasse en bois, garde-corps vitré, guirlandes d'ampoules, skyline de la ville dont les fenêtres s'allument, piscine éclairée, brasero, bains de soleil, parasol, salon extérieur |

Les gens ne sont pas des figurines posées : chaque salle définit **où l'on se
tient et ce qu'on y fait**. On danse sur la piste, on boit au bar, on discute
en cercle, on traîne dans le carré VIP — et chaque posture a son animation.
Passer la souris sur la scène fait bouger la caméra de quelques degrés.

Tout est dessiné en CSS : pas une image, pas une bibliothèque 3D, pas un
octet téléchargé.

## Le train de vie

Douze actifs, de la citadine d'occasion au jet privé, en passant par les montres,
le penthouse, le manoir, le yacht et la collection d'art. Chacun a un prix, un
entretien mensuel qui tombe tous les jours, un gain de réputation et de moral, et
une valeur de revente — certains perdent la moitié de leur valeur, la montre de
collection et l'art en gagnent. Le penthouse et le manoir deviennent ton
logement, et débloquent les grandes soirées.

## Fichiers

| Fichier | Rôle |
|---|---|
| `avatar.js` | générateur d'avatars SVG (visages, corps, coiffures, tenues) |
| `data.js` | origines, logements, emplois, formations, types d'entreprise, canaux, postes, placements, objectifs |
| `social.js` | lieux et événements, soirées, actifs de luxe, profils rencontrés |
| `scene.js` | le téléphone, le rendu des scènes et les conversations |
| `scene3d.js` | le moteur de décors : primitives 3D, catalogue des huit salles, effets |
| `scene.css` | l'habillage des scènes isométriques |
| `people.js` | génération des candidats et des contacts, traits de caractère |
| `network.js` | cercles et érosion des liens, réciprocité, présentations, mentors, amis |
| `events.js` | les 55 événements et leurs conséquences |
| `game.js` | le moteur : tick journalier, économie, équipes, marché du travail, apprentissage |
| `rivals.js` | les concurrents : archétypes, croissance, pression concurrentielle, rachats |
| `family.js` | conjoint, enfants, amis, et ce que les heures leur doivent |
| `capital.js` | tours de table, fonds nommés, dette bancaire, synergies de groupe |
| `finance.js` | graphiques financiers et guide contextuel |
| `ui.js` | rendu des écrans et interactions |
| `styles.css` | habillage, aux couleurs d'OpalStudio |

Pour ajouter du contenu, il suffit d'éditer `data.js` ou `events.js` : ajouter un
événement, un métier, un poste ou un type d'entreprise ne demande aucune
modification du moteur.
