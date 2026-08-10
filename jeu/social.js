/* =========================================================
   EMPIRE — Vie sociale
   Événements en présentiel, lieux, actifs de luxe, soirées
   et conversations avec les gens qu'on y croise.
   ========================================================= */

/* ---------------------------------------------------------
   LIEUX ET ÉVÉNEMENTS EN PRÉSENTIEL
   prestige : niveau des gens qu'on y croise (0 → 1)
   crowd    : nombre de personnes dans la salle
   --------------------------------------------------------- */
const VENUES = [
  {
    id: 'afterwork', name: 'Afterwork des indépendants', icon: 'fa-beer-mug-empty',
    cost: 25, hours: 4, prestige: 0.18, crowd: 5, room: 'bar',
    desc: "Une arrière-salle de bar, une quinzaine de freelances et deux bières tièdes.",
    req: {}
  },
  {
    id: 'meetup', name: 'Meetup startup', icon: 'fa-code',
    cost: 0, hours: 4, prestige: 0.3, crowd: 6, room: 'coworking',
    desc: "Pizza froide, projecteur capricieux, et de vraies pépites dans le lot.",
    req: {}
  },
  {
    id: 'salon', name: 'Salon professionnel', icon: 'fa-store',
    cost: 450, hours: 9, prestige: 0.45, crowd: 7, room: 'salon',
    desc: "Des stands à perte de vue. Deux jours de poignées de main et de mal aux pieds.",
    req: {}
  },
  {
    id: 'conference', name: 'Conférence sectorielle', icon: 'fa-microphone-lines',
    cost: 350, hours: 8, prestige: 0.5, crowd: 6, room: 'conference',
    desc: "Des interventions inégales, mais les pauses café valent le déplacement.",
    req: { reputation: 10 }
  },
  {
    id: 'mastermind', name: 'Mastermind fermé', icon: 'fa-user-group',
    cost: 1500, hours: 7, prestige: 0.68, crowd: 5, room: 'salon',
    desc: "Huit entrepreneurs, une table, aucune langue de bois. Sur invitation.",
    req: { reputation: 30 }
  },
  {
    id: 'gala', name: 'Gala de charité', icon: 'fa-champagne-glasses',
    cost: 6000, hours: 6, prestige: 0.82, crowd: 7, room: 'gala',
    desc: "Smoking obligatoire. On y donne de l'argent et on y prend des cartes de visite.",
    req: { reputation: 45 }
  },
  {
    id: 'sommet', name: 'Sommet des investisseurs', icon: 'fa-sack-dollar',
    cost: 3500, hours: 8, prestige: 0.9, crowd: 6, room: 'conference',
    desc: "Les gens qui décident dans la même pièce que toi. Une occasion par an, pas plus.",
    req: { reputation: 55, business: 45 }
  }
];

/* ---------------------------------------------------------
   SOIRÉES QUE TU ORGANISES
   --------------------------------------------------------- */
const PARTIES = [
  {
    id: 'apero', name: 'Apéro entre potes', icon: 'fa-beer-mug-empty',
    cost: 250, hours: 5, prestige: 0.15, crowd: 5, room: 'home',
    happy: 14, rep: 1, minHousing: 0,
    desc: "Rien de spectaculaire. Juste ce qu'il fallait pour souffler."
  },
  {
    id: 'diner', name: 'Dîner avec des gens bien choisis', icon: 'fa-utensils',
    cost: 1200, hours: 5, prestige: 0.5, crowd: 5, room: 'home',
    happy: 10, rep: 4, minHousing: 2,
    desc: "Six couverts, une table, et des conversations qui comptent."
  },
  {
    id: 'fete', name: 'Grande fête à la maison', icon: 'fa-music',
    cost: 6000, hours: 8, prestige: 0.6, crowd: 7, room: 'party',
    happy: 22, rep: 9, minHousing: 3,
    desc: "Traiteur, sono, cinquante personnes et des voisins mécontents."
  },
  {
    id: 'rooftop', name: 'Soirée rooftop privatisée', icon: 'fa-champagne-glasses',
    cost: 28000, hours: 8, prestige: 0.85, crowd: 7, room: 'rooftop',
    happy: 26, rep: 18, minHousing: 4,
    desc: "Vue sur toute la ville, liste d'invités filtrée, photographes en bas."
  },
  {
    id: 'boite', name: "Fête d'entreprise", icon: 'fa-cake-candles',
    cost: 9000, hours: 7, prestige: 0.55, crowd: 7, room: 'party',
    happy: 12, rep: 6, minHousing: 0, staffMorale: 22,
    desc: "Pour tes équipes. Le genre de soirée dont on reparle pendant deux ans."
  }
];

/* ---------------------------------------------------------
   ACTIFS DE LUXE
   upkeep : entretien mensuel ; rep : réputation ; joy : moral
   resale : part du prix récupérée à la revente
   --------------------------------------------------------- */
const LUXURY = [
  { id: 'citadine', cat: 'Voiture', name: 'Citadine d\'occasion', icon: 'fa-car', price: 9000, upkeep: 180, rep: 1, joy: 4, resale: 0.6,
    desc: "Elle démarre. C'est déjà ça." },
  { id: 'berline', cat: 'Voiture', name: 'Berline allemande', icon: 'fa-car-side', price: 52000, upkeep: 650, rep: 6, joy: 9, resale: 0.65,
    desc: "Le premier signe extérieur que ça marche." },
  { id: 'sportive', cat: 'Voiture', name: 'Sportive décapotable', icon: 'fa-car-rear', price: 145000, upkeep: 1600, rep: 14, joy: 16, resale: 0.7,
    desc: "Bruyante, inconfortable, irrésistible." },
  { id: 'supercar', cat: 'Voiture', name: 'Supercar italienne', icon: 'fa-car-burst', price: 420000, upkeep: 5200, rep: 26, joy: 22, resale: 0.75,
    desc: "Tout le monde se retourne. C'est un peu le but." },

  { id: 'montre1', cat: 'Montre', name: 'Montre d\'horloger', icon: 'fa-clock', price: 4500, upkeep: 20, rep: 3, joy: 5, resale: 0.8,
    desc: "Discrète, et repérée par ceux qui savent." },
  { id: 'montre2', cat: 'Montre', name: 'Montre suisse iconique', icon: 'fa-stopwatch', price: 32000, upkeep: 90, rep: 9, joy: 8, resale: 0.95,
    desc: "Se revend presque au prix d'achat. Le luxe le plus rationnel." },
  { id: 'montre3', cat: 'Montre', name: 'Pièce de collection', icon: 'fa-gem', price: 180000, upkeep: 400, rep: 18, joy: 12, resale: 1.15,
    desc: "Prend de la valeur pendant que tu la portes." },

  { id: 'penthouse', cat: 'Immobilier', name: 'Penthouse en centre-ville', icon: 'fa-city', price: 1200000, upkeep: 4500, rep: 22, joy: 20, resale: 1.0, housing: { rest: 1.5, happy: 16 },
    desc: "Dernier étage, terrasse, et la ville à tes pieds." },
  { id: 'manoir', cat: 'Immobilier', name: 'Manoir avec parc', icon: 'fa-landmark-dome', price: 3400000, upkeep: 14000, rep: 34, joy: 26, resale: 1.0, housing: { rest: 1.6, happy: 20 },
    desc: "Quatre hectares, une allée de gravier, et de la place pour trois cents invités." },

  { id: 'yacht', cat: 'Grand luxe', name: 'Yacht', icon: 'fa-ship', price: 2600000, upkeep: 32000, rep: 30, joy: 24, resale: 0.55,
    desc: "Le deuxième plus beau jour de ta vie sera celui où tu le revendras." },
  { id: 'jet', cat: 'Grand luxe', name: 'Jet privé', icon: 'fa-plane', price: 7500000, upkeep: 90000, rep: 42, joy: 20, resale: 0.6,
    desc: "Tu ne fais plus la queue nulle part." },
  { id: 'art', cat: 'Grand luxe', name: 'Collection d\'art contemporain', icon: 'fa-palette', price: 850000, upkeep: 3000, rep: 20, joy: 14, resale: 1.25,
    desc: "Un placement qui décore les murs." }
];

/* ---------------------------------------------------------
   PROFILS DE PERSONNES CROISÉES EN SOIRÉE
   Chaque profil a ses répliques et ce qu'il peut t'apporter.
   --------------------------------------------------------- */
const GUEST_TYPES = [
  {
    id: 'fondateur', name: 'Fondateur en pleine croissance', icon: 'fa-rocket',
    opening: "Alors, tu fais quoi dans la vie ? Enfin, je veux dire, tu construis quoi ?",
    topics: ['business', 'social'],
    gives: 'contact'
  },
  {
    id: 'investisseur', name: 'Investisseur', icon: 'fa-sack-dollar',
    opening: "On m'a dit que vous aviez quelque chose qui tourne. Racontez-moi ça en deux minutes.",
    topics: ['finance', 'business'],
    gives: 'money'
  },
  {
    id: 'client', name: 'Décideur grand compte', icon: 'fa-briefcase',
    opening: "On cherche justement un prestataire sur ce sujet. Vous travaillez avec qui en ce moment ?",
    topics: ['social', 'business'],
    gives: 'clients'
  },
  {
    id: 'talent', name: 'Profil très recherché', icon: 'fa-user-astronaut',
    opening: "Je m'ennuie profondément dans mon poste actuel. Mais bon, le salaire est correct.",
    topics: ['social', 'tech'],
    gives: 'candidate'
  },
  {
    id: 'media', name: 'Journaliste', icon: 'fa-newspaper',
    opening: "Je prépare un papier sur les gens de votre génération. Vous avez une histoire, vous ?",
    topics: ['marketing', 'social'],
    gives: 'reputation'
  },
  {
    id: 'mentor', name: 'Entrepreneur à la retraite', icon: 'fa-user-graduate',
    opening: "J'ai revendu il y a six ans. Aujourd'hui je regarde les jeunes refaire mes erreurs.",
    topics: ['business', 'finance'],
    gives: 'skill'
  },
  {
    id: 'concurrent', name: 'Concurrent direct', icon: 'fa-chess-knight',
    opening: "Ah, c'est toi. On parle beaucoup de ce que tu fais. En bien, parfois.",
    topics: ['business', 'social'],
    gives: 'intel'
  },
  {
    id: 'rencontre', name: "Quelqu'un qui te plaît", icon: 'fa-heart',
    opening: "Je ne connais personne ici à part la personne qui m'a traînée. Toi tu es là pourquoi, au juste ?",
    topics: ['social'],
    gives: 'romance'
  },
  {
    id: 'ami', name: 'Vieille connaissance', icon: 'fa-face-smile',
    opening: "Ça fait un bail ! Tu as changé, dis donc. En bien, hein.",
    topics: ['social'],
    gives: 'happiness'
  }
];

/* Approches possibles dans une conversation.
   skill : compétence testée ; risk : ce qu'on risque en ratant */
const APPROACHES = [
  {
    id: 'direct', label: "Aller droit au but", skill: 'business', bonus: 6,
    win: "Tu poses les choses simplement, sans tourner autour. Ça surprend, puis ça marche.",
    lose: "Tu vas trop vite. La conversation se referme poliment."
  },
  {
    id: 'ecoute', label: "Le faire parler de lui", skill: 'social', bonus: 10,
    win: "Tu écoutes, tu relances, tu ne parles presque pas. Il repart en te trouvant brillant.",
    lose: "Tu écoutes tellement que la conversation s'éteint d'elle-même."
  },
  {
    id: 'chiffres', label: "Sortir tes chiffres", skill: 'finance', bonus: 8,
    win: "Tu connais tes chiffres par cœur. Ça, ça ne s'improvise pas, et ça se voit.",
    lose: "Tu t'emmêles dans tes propres chiffres. Malaise."
  },
  {
    id: 'histoire', label: "Raconter ton histoire", skill: 'marketing', bonus: 9,
    win: "Tu racontes bien. À la fin, deux autres personnes s'étaient approchées pour écouter.",
    lose: "Ton récit tombe à plat. Tu vois son regard partir vers le buffet."
  },
  {
    id: 'technique', label: "Rentrer dans la technique", skill: 'tech', bonus: 8,
    win: "Vous partez dans le détail pendant vingt minutes. Il n'avait pas eu ça depuis longtemps.",
    lose: "Tu perds ton interlocuteur dès la deuxième phrase."
  },
  {
    id: 'humour', label: "Détendre avec une vanne", skill: 'social', bonus: 4,
    win: "Le rire fait tomber la distance d'un coup.",
    lose: "Ta vanne tombe dans le vide. Le silence dure une seconde de trop."
  }
];

/* ---------------------------------------------------------
   GÉNÉRATION D'UN INVITÉ
   --------------------------------------------------------- */
function makeGuest(prestige, forcedType) {
  const type = forcedType
    ? GUEST_TYPES.find(t => t.id === forcedType)
    : pick(GUEST_TYPES);
  const level = clamp(Math.round(rand(15, 45) + prestige * 55 + rand(-8, 8)), 5, 98);
  const id = 'g' + Math.random().toString(36).slice(2, 9);
  return {
    id,
    name: randomName(),
    type: type.id,
    level,
    look: lookFor(id),
    talked: false,
    mood: 0,
    x: 0, y: 0
  };
}

function guestType(g) { return GUEST_TYPES.find(t => t.id === g.type); }
