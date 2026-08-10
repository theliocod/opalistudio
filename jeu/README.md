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

- **Trois canaux qu'on achète** — contenu organique, publicité payante, influence.
  Chacun a son coût par client, son plafond propre et sa dépendance à une
  compétence. Comme chaque canal sature séparément, répartir coûte moins cher
  que tout mettre au même endroit.
- **Un canal qu'on ne peut pas acheter** : la prospection sortante. Aucun curseur,
  aucun budget — elle vaut exactement ce que vaut le temps commercial qu'on y met,
  c'est-à-dire tes commerciaux salariés et tes propres heures au poste de vente.
  Leur salaire est déjà dans la masse salariale ; le coût d'acquisition affiché ne
  compte donc que les clients réellement venus de la publicité.
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

### Le niveau de l'équipe se voit dans les comptes

Ce n'est pas décoratif. À masse salariale comparable, une équipe forte fait
huit fois le chiffre d'affaires d'une équipe faible, et vingt fois le résultat :
elle gaspille moins (les charges fixes et variables baissent jusqu'à 15 %), elle
tire le produit vers le haut, elle fait rester les clients plus longtemps.
L'onglet Équipe affiche pour chaque salarié **ce qu'il rapporte réellement** —
clients apportés, clients retenus, capacité ajoutée — face à ce qu'il coûte, en
euros par mois. Certains sont largement rentables, d'autres non, et ça se lit.

### Les carrières, les promotions et la fuite des talents

Un salarié n'est pas une ligne de charges avec un niveau. Il porte un **titre** —
junior, confirmé, senior, lead, directeur — qui change ce qu'il produit (de ×0,82
à ×1,70), ce qu'il coûte, et combien de personnes il encadre sans toi : à partir
de senior, les gradés portent une partie de l'encadrement, et c'est la seule façon
de grandir sans empiler les managers.

Quand quelqu'un a le niveau et l'ancienneté, il attend une promotion. Tu peux la
lui donner, réaligner son salaire sur le marché sans changer son titre, ou lui
dire que ce n'est pas le moment — et ça se paie, tout de suite et plus tard.

**Personne ne travaille dans le vide.** Un salarié bon, sous-payé, sans
perspective et déjà refusé une fois reçoit un appel tous les trois ou quatre
mois. Il vient te le dire, il te laisse une douzaine de jours, et si tu ne fais
rien il part. Tu peux t'aligner sur l'offre — ça marche une fois, la deuxième
l'équipe comprend comment on obtient une augmentation ici — ou le promouvoir, ce
qui coûte moins cher et vaut mieux.

Un très bon élément qu'on a fait attendre trop longtemps ne va pas toujours chez
le voisin. **Parfois il monte sa propre boîte**, il part avec quelques pour cent
de tes clients, et il connaît chacun de tes défauts.

### La culture d'entreprise

Ce n'est pas une valeur affichée sur un mur, c'est la somme de ce que tu as fait
à ceux qui sont restés : promotions tenues, salaires justes, gens toxiques gardés
ou sortis, départs que tu as laissés arriver. Elle se lit de 0 à 100 et elle
change deux choses très concrètes — **qui postule chez toi** (de ×0,55 à ×1,75
de candidatures) et **qui accepte de rester** quand on l'appelle ailleurs.

Sur douze ans à politique RH identique par ailleurs, promouvoir ses gens donne
une équipe de leads et de directeurs et une culture au-dessus de 85 ; ne rien
faire donne une équipe de juniors sans cesse remplacés ; refuser systématiquement
donne une culture proche de zéro et six départs.

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

## Entrer en bourse

Vendre à un fonds, c'est traiter avec quelques personnes qu'on peut convaincre.
S'introduire en bourse, c'est accepter que des milliers de gens qu'on ne
rencontrera jamais votent chaque jour sur ce que l'on vaut.

Il faut cocher toutes les cases — 90 000 € de chiffre d'affaires mensuel, trois
ans d'historique, huit salariés, des résultats positifs sur la durée, 55 en
finance — **et que le marché veuille bien acheter**. La fenêtre suit le cycle :
grande ouverte en euphorie (×1,45), fermée en crise (×0,08). Les deux conditions
ne sont réunies que quelques années par décennie.

Tu choisis d'ouvrir 15 %, 25 % ou 40 % du capital. Les banques placent toujours
un peu en dessous du prix — c'est la part que tu laisses à ceux qui achètent le
matin de l'entrée — et prélèvent jusqu'à 7 % de frais. Ensuite :

- **Tu ne peux rien vendre pendant six mois** (lock-up).
- **Tes comptes deviennent publics tous les trimestres.** Le marché ne paie pas
  ce que tu gagnes, il paie l'écart avec ce qu'il attendait — et chaque bon
  trimestre relève la barre du suivant.
- **Quand tu vends tes propres titres, c'est public** et le cours recule : quand
  le fondateur vend, personne ne trouve ça rassurant.
- **Un cours effondré attire un actionnaire activiste.** Il écrit une lettre
  ouverte au conseil, la presse en reprend les passages les plus durs, et il a
  parfois raison. Tu peux lui donner un siège, racheter des actions pour soutenir
  le cours, ou lui répondre point par point.
- **Si le cours reste au tapis et que tu détiens moins de la moitié du capital,
  le conseil peut te démettre.** Environ quatre mois de titre à moins de 42 %
  de son prix d'entrée suffisent. Tu récupères tes titres en argent et tu
  apprends la nouvelle en même temps que la presse.

## La conjoncture

Le monde n'est pas plat et il ne revient pas à la normale. L'économie traverse
**cinq phases** qui s'enchaînent avec une part de hasard : reprise, expansion,
euphorie, retournement, crise. Chacune dure entre six mois et deux ans et demi,
et change simultanément la demande, l'appétit des fonds, les valorisations, les
salaires, le taux des banques, la facilité de recrutement et le prix de la pierre.

En euphorie, les fonds signent 45 % plus facilement et les valorisations sont
multipliées par 1,55 — mais les salaires explosent et plus personne ne veut
changer de travail. En crise, l'argent se ferme presque entièrement (×0,28), les
valorisations tombent de moitié, et les meilleurs profils cherchent du travail.
Le moment où l'on lève, où l'on recrute, où l'on achète et où l'on vend compte
au moins autant que ce que l'on fait.

Quatre secteurs — technologie, commerce, services, restauration — ont en plus
leur propre vague, plus lente et plus ample que le cycle, et peuvent partir en
**bulle** : ça monte trop, tout le monde en parle, puis ça casse et ceux qui
n'avaient que de la promesse disparaissent.

On ne prévient jamais qu'une crise arrive. L'onglet Finances affiche des
**signaux avancés** — « les salaires montent plus vite que la productivité »,
« les tours de table prennent trois mois de plus qu'avant » — et c'est au joueur
de les lire.

## À qui tu vends

Un marché n'est pas une masse uniforme. Chaque société vise **le grand public,
les professionnels, les grands comptes, ou personne en particulier**, et ce choix
change tout le reste :

| | Grand public | Professionnels | Grands comptes |
|---|---|---|---|
| Prix acceptable | ×0,78 | ×1,12 | ×1,55 |
| Revenu par client | ×0,86 | ×1,90 | ×5,20 |
| Fidélité (churn) | ×1,35 | ×0,78 | ×0,42 |
| Coût d'acquisition | ×0,62 | ×1,35 | ×2,60 |
| Qualité exigée | 34 | 55 | 76 |
| Clients servis par la même équipe | ×2,20 | ×1,00 | ×0,26 |
| Vitesse de signature | ×1,30 | ×1,00 | ×0,40 |

Chaque segment est un jeu différent. Le grand public est une machine à volume :
il faut de la publicité, un produit simple et beaucoup de monde — la prospection
n'y sert à rien. Les grands comptes rapportent dix fois plus par client, mais
**un produit en dessous de leurs attentes ne signe tout simplement pas** : à 30
points sous la barre, tu conclus une affaire sur dix et tu perds de l'argent.
Ne pas choisir reste possible, on n'atteint alors que 66 % de chaque segment
avec un discours qui ne porte nulle part — c'est confortable, et ça ne gagne
jamais.

Se repositionner coûte le chiffre d'affaires d'un mois et fait fuir une bonne
partie des clients, qui n'étaient pas venus pour ça. Monter en gamme coûte plus
cher que descendre.

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

## Ton corps

On ne s'use pas, on s'endette. La **dette de sommeil** se creuse dès qu'on dépasse
douze heures et se comble avec les heures libres et le sport ; elle ne se voit pas
dans le miroir, elle se voit dans les décisions qu'on prend à 19 h. L'**épuisement**
monte avec le travail sans repos, sans plaisir et sans sommeil — les trois
ensemble. À 100, tu ne te lèves pas : trois à sept semaines d'arrêt forcé, ton
planning est vidé, tes sociétés tournent sans toi. À rythme de 17 h par jour, il
faut environ un an pour taper dans le mur la première fois, puis de plus en plus vite.

Sept **maladies chroniques** peuvent s'installer selon le terrain que tu as
préparé : dos bloqué, insomnie, trouble anxieux, hypertension, ulcère, acouphènes,
genou usé. Elles ne partent jamais. On peut les prendre en charge médicalement —
les effets sont divisés par deux, et ça coûte tous les mois. L'hypertension ouvre
en plus la porte à l'**accident cardiaque**, qui change tout le reste de la partie.

La **condition physique** se gagne lentement et se perd toute seule : une heure de
sport par jour amène vers 75, jamais au-delà. Et à partir de 30 ans, le **plafond
d'énergie descend** un peu chaque année, quoi qu'on fasse.

Quatre choses à faire pour soi : un bilan de santé complet (semestriel, il attrape
ce qui commence), un psy, dix jours sans rien, un kiné. Sur quarante ans de partie,
une vie équilibrée arrive à 58 ans sans arrêt maladie ; le grind permanent donne
quarante murs, quinze pour cent de la carrière à l'arrêt, six maladies et un
rendement réel tombé à la moitié.

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

Six applications. **Contacts**, pour voir et relancer ton carnet.
**Agenda**, un calendrier mensuel où les sorties apparaissent à des dates
précises. **Sorties**, la liste des événements accessibles selon ta réputation.
**Recevoir**, pour organiser chez toi. **Journal**, le fil de ta vie.

Et un **navigateur**, parce qu'on n'achète pas une supercar dans un menu
« train de vie » : on la commande sur le site du concessionnaire, à trois heures
du matin, dans son lit. Sept sites, chacun avec son univers visuel et son ton —
Prestige Auto, Maison Horlogère, Oceanis Marine, Skybridge Aviation, Galerie
Blanche, Demeures Privées, Atlas Immobilier. Barre d'adresse, favoris,
recherche qui traverse tous les catalogues, et une page « ce que tu possèdes »
depuis laquelle tout se revend.

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

## Le monde

Où l'on vit n'est pas un décor. Douze villes, de Marseille à Singapour, et
chacune change **six choses à la fois** : ce que coûte une journée, ce qu'on
paie d'impôts, la taille du marché qu'on adresse, le vivier de profils qu'on
peut recruter, le niveau des gens qu'on croise en réseautant, et le prix de la
pierre.

Bali coûte trois fois moins cher que Paris et rend heureux — et divise le
marché par trois. New York multiplie le marché par presque deux et le coût de
la vie par deux également. Dubaï enlève seize points de fiscalité. Berlin a le
meilleur vivier technique d'Europe pour des loyers tenables. Aucune n'est
meilleure : elles arbitrent différemment.

### Partir, et s'installer

**Voyager** fait passer de vrais jours de calendrier : la boîte tourne sans toi
pendant ce temps-là, les échéances tombent, les salaires sortent. On revient
avec de l'énergie, du moral, parfois une rencontre qu'on n'aurait jamais faite
et une idée claire pour le produit. Quatre formats, du week-end aux deux mois
de rupture.

**S'installer** est autre chose. Ça se paie en argent, et surtout socialement :
la moitié de ton carnet devient lointain, tes amis perdent en proximité, ton
couple encaisse. Certaines villes demandent une réputation ou une avance avant
de te laisser entrer.

## La pierre

Dix logements en location, du studio à la villa — et surtout la possibilité de
**devenir propriétaire**. Dix types de biens, du studio au domaine, en passant
par l'immeuble de rapport qu'on n'habite pas et qu'on exploite.

- **Acheter** comptant ou à crédit : 20 % d'apport, 8 % de frais de notaire et
  d'agence, et la banque qui suit tant que tes mensualités restent sous un
  tiers de tes revenus. Ton niveau en finance fait baisser le taux.
- **Habiter** dedans : plus de loyer, et un confort qui dépend de l'état du
  bien.
- **Louer** : un locataire arrive avec un nom et une fiabilité. Il paie, ou il
  ne paie pas ; il reste des années, ou il part ; il casse quelque chose de
  temps en temps.
- **Entretenir** : la pierre se dégrade toute seule, plus vite quand elle est
  louée. Des travaux redonnent de l'état et de la valeur.
- **Revendre** : 6 % de frais, et une plus-value taxée si tu as détenu peu de
  temps — exonérée si c'était ta résidence.

La valeur suit la ville, avec un cycle : de 2 % par an à Londres à 5,5 % à
Bali. Tout apparaît dans un menu unique, où chaque bien se pilote comme on veut.

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
| `events.js` | les 73 événements et leurs conséquences |
| `game.js` | le moteur : tick journalier, économie, équipes, marché du travail, apprentissage |
| `rivals.js` | les concurrents : archétypes, croissance, pression concurrentielle, rachats |
| `family.js` | conjoint, enfants, amis, et ce que les heures leur doivent |
| `capital.js` | tours de table, fonds nommés, dette bancaire, synergies de groupe |
| `world.js` | villes, voyages, déménagements, achat et gestion des biens immobiliers |
| `economy.js` | le cycle économique, les vagues sectorielles et les bulles |
| `market.js` | les segments de clientèle et le positionnement |
| `health.js` | dette de sommeil, épuisement, maladies chroniques, vieillissement |
| `careers.js` | échelons, promotions, culture d'entreprise, débauchage |
| `bourse.js` | introduction en bourse, cours, trimestres, activistes |
| `finance.js` | graphiques financiers et guide contextuel |
| `web.js` | le navigateur du téléphone et ses boutiques |
| `ui.js` | rendu des écrans et interactions |
| `styles.css` | habillage, aux couleurs d'OpalStudio |

Pour ajouter du contenu, il suffit d'éditer `data.js` ou `events.js` : ajouter un
événement, un métier, un poste ou un type d'entreprise ne demande aucune
modification du moteur.
