/* =========================================================
   EMPIRE — Données du jeu
   Tables de contenu : origines, logements, emplois, formations,
   types d'entreprise, canaux publicitaires, postes salariés,
   placements, objectifs.

   Convention : toutes les valeurs monétaires marquées "par mois"
   sont exprimées au mois pour rester lisibles ; le moteur les
   divise par DAYS_PER_MONTH à chaque tick journalier.
   ========================================================= */

const CONFIG = {
  startAge: 18,
  retireAge: 65,
  daysPerMonth: 30,
  monthsPerYear: 12,
  baseHours: 12,          // heures utiles par jour sans se cramer
  maxHours: 17,           // au-delà, la santé trinque
  debtInterest: 0.005 / 30,
  eventChance: 0.028,     // par jour (~1 événement toutes les 5 semaines)
  bankruptcyLimit: -30000
};

const DAYS_PER_MONTH = CONFIG.daysPerMonth;
const DAYS_PER_YEAR = CONFIG.daysPerMonth * CONFIG.monthsPerYear;

/* ---------------------------------------------------------
   ORIGINES
   --------------------------------------------------------- */
const ORIGINS = [
  {
    id: 'cite', name: 'Gamin de quartier', icon: 'fa-building',
    desc: "Tu as grandi en banlieue. Personne ne t'a rien donné, mais tu as appris à parler à tout le monde et à ne jamais lâcher.",
    money: 300, debt: 0,
    skills: { business: 8, marketing: 5, tech: 2, social: 18, finance: 2 },
    happiness: 60, health: 80, reputation: 5,
    perk: 'Résilience : tu encaisses 40% mieux les coups durs.',
    flags: ['resilient']
  },
  {
    id: 'moyenne', name: 'Classe moyenne', icon: 'fa-house',
    desc: "Parents salariés, pavillon de banlieue, études correctes. Un filet de sécurité, mais aucun réseau.",
    money: 3500, debt: 0,
    skills: { business: 8, marketing: 6, tech: 10, social: 8, finance: 6 },
    happiness: 70, health: 78, reputation: 8,
    perk: "Filet familial : si tu tombes sous 0€, tes parents t'avancent 1 500€ (une fois).",
    flags: ['safetynet']
  },
  {
    id: 'aisee', name: 'Héritier sous pression', icon: 'fa-champagne-glasses',
    desc: "Ton père a une boîte. Tu as le capital et le carnet d'adresses, mais tout le monde attend que tu échoues.",
    money: 45000, debt: 0,
    skills: { business: 14, marketing: 6, tech: 4, social: 12, finance: 14 },
    happiness: 48, health: 74, reputation: 25,
    perk: "Carnet d'adresses : tu démarres avec 2 contacts établis et tu lèves des fonds plus cher.",
    flags: ['connected']
  },
  {
    id: 'geek', name: 'Autodidacte du garage', icon: 'fa-laptop-code',
    desc: "Tu codes depuis tes 12 ans dans ta chambre. Tu sais construire n'importe quoi, tu ne sais pas le vendre.",
    money: 900, debt: 0,
    skills: { business: 4, marketing: 2, tech: 24, social: 3, finance: 4 },
    happiness: 62, health: 66, reputation: 3,
    perk: 'Builder : le lancement d\'un SaaS te coûte deux fois moins cher.',
    flags: ['builder']
  },
  {
    id: 'endette', name: 'Diplômé endetté', icon: 'fa-graduation-cap',
    desc: "Cinq ans d'école de commerce, un diplôme qui brille et 28 000€ de crédit à rembourser.",
    money: 1200, debt: 28000,
    skills: { business: 20, marketing: 14, tech: 5, social: 12, finance: 16 },
    happiness: 55, health: 72, reputation: 12,
    perk: 'Formé : +25% de progression en formation et un plafond d\'autoformation relevé.',
    flags: ['educated']
  },
  {
    id: 'immigre', name: 'Arrivé avec une valise', icon: 'fa-plane-arrival',
    desc: "Tu débarques dans le pays avec 150€, deux langues et une faim que personne ici ne comprend.",
    money: 150, debt: 0,
    skills: { business: 10, marketing: 4, tech: 6, social: 10, finance: 3 },
    happiness: 52, health: 85, reputation: 0,
    perk: 'Machine de guerre : tu peux tenir 2 heures de plus par jour sans t\'épuiser.',
    flags: ['grinder']
  }
];

/* ---------------------------------------------------------
   LOGEMENTS
   --------------------------------------------------------- */
const HOUSING = [
  { id: 'parents', name: 'Chez tes parents', cost: 150, rest: 0.9, happy: -1, icon: 'fa-bed', desc: "Gratuit ou presque. Ta mère entre sans frapper." },
  { id: 'coloc', name: 'Colocation', cost: 550, rest: 1.0, happy: 1, icon: 'fa-users', desc: "Bruyant mais vivant." },
  { id: 'studio', name: 'Studio en ville', cost: 1100, rest: 1.1, happy: 2, icon: 'fa-door-closed', desc: "25m², au calme, proche de tout." },
  { id: 'appart', name: 'Grand appartement', cost: 2600, rest: 1.2, happy: 5, icon: 'fa-city', desc: "De l'espace pour travailler et respirer." },
  { id: 'maison', name: 'Maison avec jardin', cost: 5200, rest: 1.3, happy: 8, icon: 'fa-house-chimney', desc: "Le rêve classique, version réussie." },
  { id: 'villa', name: 'Villa avec piscine', cost: 14000, rest: 1.45, happy: 12, icon: 'fa-hotel', desc: "Tu as gagné. Tout le monde le sait." }
];

/* ---------------------------------------------------------
   EMPLOIS SALARIÉS
   hours : heures/jour que le poste exige de ton planning
   --------------------------------------------------------- */
const JOBS = [
  { id: 'livreur', name: 'Livreur à vélo', salary: 1350, icon: 'fa-bicycle', hours: 8,
    req: {}, strain: 1.3, gain: { social: 0.25, business: 0.15 },
    desc: "Payé à la course, sous la pluie. Ça forge le mental." },
  { id: 'serveur', name: 'Serveur en restaurant', salary: 1600, icon: 'fa-utensils', hours: 8,
    req: { social: 8 }, strain: 1.2, gain: { social: 0.6 },
    desc: "Tu apprends à lire les gens en trois secondes." },
  { id: 'vendeur', name: 'Vendeur en boutique', salary: 1800, icon: 'fa-tags', hours: 8,
    req: { social: 15 }, strain: 1.1, gain: { social: 0.5, marketing: 0.35 },
    desc: "Première vraie école de vente." },
  { id: 'cm', name: 'Community manager', salary: 2200, icon: 'fa-hashtag', hours: 8,
    req: { marketing: 20 }, strain: 1.0, gain: { marketing: 0.8, social: 0.2 },
    desc: "Tu gères les réseaux d'une marque qui n'écoute pas tes conseils." },
  { id: 'devjr', name: 'Développeur junior', salary: 2900, icon: 'fa-code', hours: 8,
    req: { tech: 30 }, strain: 1.0, gain: { tech: 0.9 },
    desc: "Des tickets, des réunions, et un vrai salaire." },
  { id: 'commercial', name: 'Commercial B2B', salary: 3200, icon: 'fa-handshake', hours: 9,
    req: { social: 30, business: 20 }, strain: 1.2, gain: { social: 0.7, business: 0.6, marketing: 0.3 },
    desc: "Variable non plafonné. Objectifs impossibles." },
  { id: 'growth', name: 'Growth marketer', salary: 3800, icon: 'fa-chart-line', hours: 9,
    req: { marketing: 40, business: 25 }, strain: 1.1, gain: { marketing: 1.0, business: 0.4 },
    desc: "Tu brûles des budgets pub qui ne sont pas les tiens. Formateur." },
  { id: 'rh', name: 'Chargé de recrutement', salary: 3000, icon: 'fa-user-tie', hours: 8,
    req: { social: 35 }, strain: 1.0, gain: { social: 0.9, business: 0.3 },
    desc: "Tu apprends à repérer un bon profil en dix minutes. Ça vaudra cher plus tard." },
  { id: 'consultant', name: 'Consultant en stratégie', salary: 5200, icon: 'fa-briefcase', hours: 11,
    req: { business: 50, social: 35 }, strain: 1.5, gain: { business: 1.1, finance: 0.6 },
    desc: "80h/semaine, des slides, et un carnet d'adresses en or." },
  { id: 'lead', name: 'Lead developer', salary: 6000, icon: 'fa-server', hours: 9,
    req: { tech: 60 }, strain: 1.1, gain: { tech: 0.9, business: 0.3 },
    desc: "Tu construis les systèmes que d'autres vendent très cher." },
  { id: 'trader', name: 'Trader en salle de marché', salary: 8500, icon: 'fa-coins', hours: 11,
    req: { finance: 60, business: 40 }, strain: 1.6, gain: { finance: 1.2 },
    desc: "Beaucoup d'argent, très peu de sommeil." },
  { id: 'cmo', name: 'Directeur marketing (CMO)', salary: 9500, icon: 'fa-bullhorn', hours: 10,
    req: { marketing: 70, business: 55, social: 45 }, strain: 1.3, gain: { marketing: 0.9, business: 0.8 },
    desc: "Tu pilotes la croissance d'un groupe. Et tu te demandes pourquoi pas la tienne." },
  { id: 'dg', name: 'Directeur général', salary: 14000, icon: 'fa-crown', hours: 12,
    req: { business: 75, social: 60, finance: 55 }, strain: 1.5, gain: { business: 1.0, finance: 0.7, social: 0.5 },
    desc: "Tu diriges la boîte d'un autre. Confortable, et frustrant." }
];

/* ---------------------------------------------------------
   FORMATIONS
   days : durée en jours ; cap : plafond de compétence atteignable
   --------------------------------------------------------- */
const TRAININGS = [
  { id: 'youtube', name: 'Se former sur YouTube', cost: 0, days: 20, icon: 'fa-play',
    gain: { marketing: 6, tech: 4 }, cap: 32, source: 'auto',
    desc: "Gratuit, lent, plafonne vite. Mais c'est un début." },
  { id: 'livres', name: 'Lire 6 livres de business', cost: 120, days: 25, icon: 'fa-book',
    gain: { business: 8, finance: 3 }, cap: 38, source: 'auto',
    desc: "Le meilleur rapport prix/apprentissage du monde." },
  { id: 'formation', name: 'Formation en ligne premium', cost: 1200, days: 30, icon: 'fa-graduation-cap',
    gain: { marketing: 12, business: 5 }, cap: 55, source: 'paid',
    desc: "Un vrai programme, avec un vrai formateur." },
  { id: 'salesclub', name: 'Coaching vente & closing', cost: 3000, days: 40, icon: 'fa-comments',
    gain: { social: 14, business: 5 }, cap: 62, source: 'paid',
    desc: "Apprendre à ne plus avoir peur de demander l'argent." },
  { id: 'bootcamp', name: 'Bootcamp développement', cost: 7500, days: 75, icon: 'fa-terminal',
    gain: { tech: 30 }, cap: 68, source: 'paid',
    desc: "Trois mois d'enfer, une compétence qui vaut de l'or." },
  { id: 'finance', name: 'Certification finance', cost: 4500, days: 60, icon: 'fa-calculator',
    gain: { finance: 24, business: 5 }, cap: 66, source: 'paid',
    desc: "Comprendre un bilan, valoriser une boîte, négocier une levée." },
  { id: 'mba', name: 'MBA executive', cost: 42000, days: 150, icon: 'fa-user-tie', req: { business: 40 },
    gain: { business: 26, finance: 12, social: 14 }, cap: 78, source: 'paid',
    desc: "Cher. Le vrai produit, c'est la promo avec qui tu sors — tu y gagnes des contacts.",
    contacts: 2 }
];

/* Plafonds de compétence par source d'apprentissage.
   Au-delà, il faut du terrain, puis des mentors. */
const SKILL_CAPS = { auto: 38, paid: 78, field: 88, mentor: 100 };

/* ---------------------------------------------------------
   CANAUX PUBLICITAIRES
   Chacun sature indépendamment : diversifier coûte moins cher
   que tout mettre sur un seul levier.
   --------------------------------------------------------- */
const CHANNELS = [
  { id: 'organic', name: 'Contenu organique', icon: 'fa-seedling', power: 1.4, satShare: 0.022,
    skill: 'marketing', delay: 0.4,
    desc: "Le moins cher au client acquis, mais il faut des mois pour l'installer." },
  { id: 'paid', name: 'Publicité payante', icon: 'fa-rectangle-ad', power: 1.0, satShare: 0.075,
    skill: 'marketing', delay: 1,
    desc: "Immédiat et scalable. Coupe le budget, tout s'arrête." },
  { id: 'influence', name: 'Influence & partenariats', icon: 'fa-star', power: 1.1, satShare: 0.04,
    skill: 'social', delay: 0.75,
    desc: "Dépend de ta réputation. Très rentable quand on te connaît." },
  { id: 'outbound', name: 'Prospection sortante', icon: 'fa-phone-volume', power: 0.8, satShare: 0.035,
    skill: 'social', delay: 1,
    desc: "Du dur, du direct. Marche même sans notoriété." }
];

/* ---------------------------------------------------------
   POSTES SALARIÉS EN ENTREPRISE
   effect : ce que le poste améliore dans la boîte
   --------------------------------------------------------- */
const ROLES = [
  { id: 'sales', name: 'Commercial', icon: 'fa-handshake', salary: 2800, effect: 'acquisition',
    desc: "Apporte des clients directement, indépendamment de la pub." },
  { id: 'marketer', name: 'Marketeur', icon: 'fa-bullhorn', salary: 3000, effect: 'adEfficiency',
    desc: "Fait rendre davantage chaque euro de budget publicitaire." },
  { id: 'product', name: 'Produit / Technique', icon: 'fa-screwdriver-wrench', salary: 3600, effect: 'quality',
    desc: "Fait monter la qualité du produit, qui retient les clients." },
  { id: 'ops', name: 'Opérations', icon: 'fa-boxes-stacked', salary: 2500, effect: 'capacity',
    desc: "Augmente le nombre de clients que tu peux servir sans casser." },
  { id: 'support', name: 'Support client', icon: 'fa-headset', salary: 2300, effect: 'retention',
    desc: "Réduit le churn : tes clients restent plus longtemps." },
  { id: 'manager', name: 'Manager', icon: 'fa-sitemap', salary: 4200, effect: 'span',
    desc: "Encadre l'équipe. Sans lui, au-delà d'une taille, tout se dégrade." }
];

/* ---------------------------------------------------------
   TYPES D'ENTREPRISE
   Valeurs mensuelles ; le moteur les ramène au jour.
   cac     : coût d'acquisition d'un client, en euros
   acqBase : clients par mois qu'apporte une personne à plein temps
   ramp    : jours avant que l'affaire tourne à plein régime
   --------------------------------------------------------- */
const BUSINESS_TYPES = [
  {
    id: 'freelance', name: 'Freelance / Consultant', icon: 'fa-user-pen', cost: 200,
    req: {}, revPerClient: 900, varCost: 0.05, fixedCost: 120, churn: 0.14,
    capPerLevel: 4, roleCap: 3, upgradeCost: 2500, multiple: 1.2, market: 14,
    cac: 260, acqBase: 1.2, skill: ['social', 'business'], risk: 0.05, ramp: 30,
    desc: "Tu vends ton temps. Zéro capital, zéro scalabilité, mais du cash tout de suite."
  },
  {
    id: 'creator', name: 'Créateur de contenu', icon: 'fa-video', cost: 800,
    req: { marketing: 10 }, revPerClient: 2.2, varCost: 0.02, fixedCost: 250, churn: 0.09,
    capPerLevel: 40000, roleCap: 20000, upgradeCost: 4000, multiple: 2.2, market: 260000,
    cac: 1.1, acqBase: 700, skill: ['marketing', 'social'], risk: 0.12, ramp: 120,
    desc: "Tu construis une audience. Très lent au début, imbattable ensuite."
  },
  {
    id: 'dropship', name: 'E-commerce / Dropshipping', icon: 'fa-truck-fast', cost: 3000,
    req: { marketing: 15 }, revPerClient: 55, varCost: 0.55, fixedCost: 600, churn: 0.35,
    capPerLevel: 900, roleCap: 500, upgradeCost: 6000, multiple: 1.6, market: 9000,
    cac: 26, acqBase: 50, skill: ['marketing'], risk: 0.25, ramp: 25,
    desc: "Du cash rapide tant que la pub tourne. Coupe le budget, tout s'arrête."
  },
  {
    id: 'agence', name: 'Agence marketing', icon: 'fa-bullhorn', cost: 2500,
    req: { marketing: 25, social: 20 }, revPerClient: 2800, varCost: 0.12, fixedCost: 900, churn: 0.11,
    capPerLevel: 5, roleCap: 4, upgradeCost: 9000, multiple: 2.4, market: 45,
    cac: 2100, acqBase: 0.8, skill: ['marketing', 'social'], risk: 0.1, ramp: 45,
    desc: "Marges énormes, dépendance aux clients. Le modèle préféré des ambitieux."
  },
  {
    id: 'dtc', name: 'Marque DTC', icon: 'fa-shirt', cost: 20000,
    req: { marketing: 35, business: 25 }, revPerClient: 78, varCost: 0.42, fixedCost: 3500, churn: 0.22,
    capPerLevel: 1600, roleCap: 900, upgradeCost: 18000, multiple: 2.8, market: 13000,
    cac: 42, acqBase: 40, skill: ['marketing', 'business'], risk: 0.18, ramp: 60,
    desc: "Ta propre marque, tes clients, ta marge. Le stock immobilise du cash."
  },
  {
    id: 'saas', name: 'Micro-SaaS', icon: 'fa-cloud', cost: 8000,
    req: { tech: 35 }, revPerClient: 49, varCost: 0.08, fixedCost: 1200, churn: 0.06,
    capPerLevel: 3000, roleCap: 1500, upgradeCost: 14000, multiple: 5.5, market: 32000,
    cac: 85, acqBase: 25, skill: ['tech', 'marketing'], risk: 0.08, ramp: 90,
    desc: "Long à démarrer, revenus récurrents, valorisation énorme à la revente."
  },
  {
    id: 'foodtruck', name: 'Food truck', icon: 'fa-burger', cost: 32000,
    req: { business: 15 }, revPerClient: 17, varCost: 0.38, fixedCost: 2200, churn: 0.28,
    capPerLevel: 1400, roleCap: 700, upgradeCost: 15000, multiple: 1.8, market: 4200,
    cac: 7.5, acqBase: 80, skill: ['business', 'social'], risk: 0.15, ramp: 30,
    desc: "Un vrai commerce, mobile, avec des marges honnêtes et des journées longues."
  },
  {
    id: 'resto', name: 'Restaurant', icon: 'fa-utensils', cost: 140000,
    req: { business: 40, finance: 25 }, revPerClient: 42, varCost: 0.36, fixedCost: 14000, churn: 0.24,
    capPerLevel: 2200, roleCap: 900, upgradeCost: 45000, multiple: 2.0, market: 9000,
    cac: 19, acqBase: 110, skill: ['business', 'social'], risk: 0.22, ramp: 45,
    desc: "Charges fixes lourdes, ego flatté. On n'y va pas pour la rentabilité."
  },
  {
    id: 'immo', name: 'Agence immobilière', icon: 'fa-key', cost: 65000,
    req: { business: 45, social: 40, finance: 30 }, revPerClient: 5200, varCost: 0.2, fixedCost: 7000, churn: 0.16,
    capPerLevel: 6, roleCap: 5, upgradeCost: 25000, multiple: 2.6, market: 65,
    cac: 3200, acqBase: 1.0, skill: ['social', 'business'], risk: 0.12, ramp: 60,
    desc: "Peu de transactions, grosses commissions. Tout repose sur la confiance."
  },
  {
    id: 'studio', name: 'Studio de jeux vidéo', icon: 'fa-gamepad', cost: 95000,
    req: { tech: 55, marketing: 30 }, revPerClient: 9, varCost: 0.12, fixedCost: 16000, churn: 0.05,
    capPerLevel: 30000, roleCap: 12000, upgradeCost: 60000, multiple: 4.0, market: 320000,
    cac: 4.5, acqBase: 350, skill: ['tech', 'marketing'], risk: 0.35, ramp: 150,
    desc: "Tout ou rien. Un flop et tu fermes, un hit et tu es riche à vie."
  },
  {
    id: 'ia', name: 'Startup IA', icon: 'fa-microchip', cost: 250000,
    req: { tech: 70, business: 50, finance: 40 }, revPerClient: 320, varCost: 0.25, fixedCost: 55000, churn: 0.05,
    capPerLevel: 900, roleCap: 400, upgradeCost: 150000, multiple: 9.0, market: 6000,
    cac: 850, acqBase: 6, skill: ['tech', 'business'], risk: 0.3, ramp: 180,
    desc: "Brûle du cash comme un réacteur. Si ça prend, la valorisation explose."
  },
  {
    id: 'holding', name: "Holding d'investissement", icon: 'fa-landmark', cost: 400000,
    req: { finance: 70, business: 65 }, revPerClient: 14000, varCost: 0.05, fixedCost: 30000, churn: 0.04,
    capPerLevel: 6, roleCap: 4, upgradeCost: 220000, multiple: 6.0, market: 42,
    cac: 11000, acqBase: 0.5, skill: ['finance', 'business'], risk: 0.1, ramp: 90,
    desc: "Tu ne construis plus : tu rachètes ce que d'autres ont construit."
  }
];

/* ---------------------------------------------------------
   PLACEMENTS (dérive et volatilité journalières)
   --------------------------------------------------------- */
const ASSETS = [
  { id: 'livret', name: "Livret d'épargne", icon: 'fa-piggy-bank', price: 100, drift: 0.00006, vol: 0,
    desc: "2% par an, zéro risque. La base." },
  { id: 'obligations', name: "Obligations d'État", icon: 'fa-file-invoice-dollar', price: 100, drift: 0.0001, vol: 0.0022,
    desc: "Un peu mieux, quasi sans risque." },
  { id: 'etf', name: 'ETF World', icon: 'fa-chart-area', price: 100, drift: 0.00021, vol: 0.0077,
    desc: "8% par an en moyenne. Il faut tenir dans les creux." },
  { id: 'tech', name: 'Actions tech', icon: 'fa-microchip', price: 100, drift: 0.00028, vol: 0.0155,
    desc: "Plus de rendement, plus de nuits blanches." },
  { id: 'crypto', name: 'Crypto', icon: 'fa-bitcoin-sign', price: 100, drift: 0.00037, vol: 0.044,
    desc: "Peut faire x5. Peut faire -80%. Souvent les deux la même année." },
  { id: 'immobilier', name: 'Immobilier locatif (part)', icon: 'fa-building-columns', price: 100, drift: 0.00015, vol: 0.0033, yield: 0.000117,
    desc: "Rendement lent + loyers versés chaque mois." }
];

/* ---------------------------------------------------------
   OBJECTIFS
   --------------------------------------------------------- */
const GOALS = [
  { id: 'firstclient', name: 'Premier client', desc: "Décrocher ton tout premier client.", check: s => s.companies.some(c => c.clients >= 1) },
  { id: 'firsthire', name: 'Premier salarié', desc: "Embaucher quelqu'un dans une de tes boîtes.", check: s => s.companies.some(c => c.staff.length > 0) },
  { id: 'quitjob', name: 'Quitter le salariat', desc: "Vivre de tes entreprises sans employeur.", check: s => !s.job && s.companies.length > 0 && monthlyBusinessProfit(s) > 2500 },
  { id: 'mentor', name: 'Trouver un mentor', desc: "Nouer une relation forte avec un contact de haut niveau.", check: s => s.contacts.some(c => c.relation >= 70 && c.level >= 70) },
  { id: 'k10', name: '10 000€ / mois', desc: "Générer 10 000€ de profit mensuel.", check: s => monthlyBusinessProfit(s) >= 10000 },
  { id: 'first100k', name: '100 000€ de patrimoine', desc: "Franchir les six chiffres.", check: s => netWorth(s) >= 100000 },
  { id: 'team10', name: 'Une vraie équipe', desc: "Employer 10 personnes en même temps.", check: s => s.companies.reduce((a, c) => a + c.staff.length, 0) >= 10 },
  { id: 'exit', name: 'Première revente', desc: "Vendre une entreprise.", check: s => s.exits.length > 0 },
  { id: 'million', name: 'Millionnaire', desc: "1 000 000€ de patrimoine net.", check: s => netWorth(s) >= 1000000 },
  { id: 'group', name: 'Groupe', desc: "Posséder 3 entreprises rentables en même temps.", check: s => s.companies.filter(c => c.lastProfit > 0).length >= 3 },
  { id: 'master', name: 'Maître dans son art', desc: "Atteindre 90 dans une compétence.", check: s => Object.values(s.skills).some(v => v >= 90) },
  { id: 'empire', name: 'Empire', desc: "10 000 000€ de patrimoine net.", check: s => netWorth(s) >= 10000000 },
  { id: 'balance', name: 'Vie équilibrée', desc: "Moral et santé au-dessus de 80 avec plus de 500 000€.", check: s => s.happiness > 80 && s.health > 80 && netWorth(s) > 500000 }
];
