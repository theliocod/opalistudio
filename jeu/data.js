/* =========================================================
   EMPIRE — Données du jeu
   Toutes les tables de contenu : origines, jobs, formations,
   types d'entreprise, événements, placements, logements.
   ========================================================= */

const CONFIG = {
  startAge: 18,          // âge de départ (en années)
  retireAge: 65,         // fin de partie
  actionsPerMonth: 3,    // points de temps par mois
  debtInterest: 0.005,   // 0.5% / mois sur les dettes
  eventChance: 0.42,     // probabilité d'un événement par mois
  bankruptcyLimit: -30000
};

/* ---------------------------------------------------------
   ORIGINES — le point de départ de la vie du personnage
   --------------------------------------------------------- */
const ORIGINS = [
  {
    id: 'cite',
    name: 'Gamin de quartier',
    icon: 'fa-building',
    desc: "Tu as grandi en banlieue. Personne ne t'a rien donné, mais tu as appris à parler à tout le monde et à ne jamais lâcher.",
    money: 300,
    debt: 0,
    skills: { business: 8, marketing: 5, tech: 2, social: 18, finance: 2 },
    happiness: 60, health: 80, reputation: 5,
    perk: 'Résilience : tu perds 40% de bonheur en moins lors des coups durs.',
    flags: ['resilient']
  },
  {
    id: 'moyenne',
    name: 'Classe moyenne',
    icon: 'fa-house',
    desc: "Parents salariés, pavillon de banlieue, études correctes. Un filet de sécurité, mais aucun réseau.",
    money: 3500,
    debt: 0,
    skills: { business: 8, marketing: 6, tech: 10, social: 8, finance: 6 },
    happiness: 70, health: 78, reputation: 8,
    perk: "Filet familial : si tu tombes sous 0€, tes parents t'avancent 1 500€ (une fois).",
    flags: ['safetynet']
  },
  {
    id: 'aisee',
    name: 'Héritier sous pression',
    icon: 'fa-champagne-glasses',
    desc: "Ton père a une boîte. Tu as le capital et le carnet d'adresses, mais tout le monde attend que tu échoues.",
    money: 45000,
    debt: 0,
    skills: { business: 14, marketing: 6, tech: 4, social: 12, finance: 14 },
    happiness: 48, health: 74, reputation: 25,
    perk: 'Carnet d\'adresses : +25 de réputation au départ et meilleures levées de fonds.',
    flags: ['connected']
  },
  {
    id: 'geek',
    name: 'Autodidacte du garage',
    icon: 'fa-laptop-code',
    desc: "Tu codes depuis tes 12 ans dans ta chambre. Tu sais construire n'importe quoi, tu ne sais pas le vendre.",
    money: 900,
    debt: 0,
    skills: { business: 4, marketing: 2, tech: 24, social: 3, finance: 4 },
    happiness: 62, health: 66, reputation: 3,
    perk: 'Builder : tu peux lancer un SaaS sans capital de départ (coût divisé par 2).',
    flags: ['builder']
  },
  {
    id: 'endette',
    name: 'Diplômé endetté',
    icon: 'fa-graduation-cap',
    desc: "Cinq ans d'école de commerce, un diplôme qui brille et 28 000€ de crédit à rembourser.",
    money: 1200,
    debt: 28000,
    skills: { business: 20, marketing: 14, tech: 5, social: 12, finance: 16 },
    happiness: 55, health: 72, reputation: 12,
    perk: 'Formé : tu gagnes 25% de compétences en plus dans toutes les formations.',
    flags: ['educated']
  },
  {
    id: 'immigre',
    name: 'Arrivé avec une valise',
    icon: 'fa-plane-arrival',
    desc: "Tu débarques dans le pays avec 150€, deux langues et une faim que personne ici ne comprend.",
    money: 150,
    debt: 0,
    skills: { business: 10, marketing: 4, tech: 6, social: 10, finance: 3 },
    happiness: 52, health: 85, reputation: 0,
    perk: 'Machine de guerre : tes actions coûtent 25% d\'énergie en moins.',
    flags: ['grinder']
  }
];

/* ---------------------------------------------------------
   LOGEMENTS — coût de vie & impact sur l'énergie / bonheur
   --------------------------------------------------------- */
const HOUSING = [
  { id: 'parents', name: 'Chez tes parents', cost: 150, energy: 6, happy: -1, icon: 'fa-bed', desc: "Gratuit ou presque. Ta mère entre sans frapper." },
  { id: 'coloc',   name: 'Colocation',       cost: 550, energy: 8, happy: 1,  icon: 'fa-users', desc: "Bruyant mais vivant." },
  { id: 'studio',  name: 'Studio en ville',  cost: 1100, energy: 10, happy: 2, icon: 'fa-door-closed', desc: "25m², au calme, proche de tout." },
  { id: 'appart',  name: 'Grand appartement',cost: 2600, energy: 13, happy: 5, icon: 'fa-city', desc: "De l'espace pour travailler et respirer." },
  { id: 'maison',  name: 'Maison avec jardin',cost: 5200, energy: 16, happy: 8, icon: 'fa-house-chimney', desc: "Le rêve classique, version réussie." },
  { id: 'villa',   name: 'Villa avec piscine',cost: 14000, energy: 20, happy: 12, icon: 'fa-hotel', desc: "Tu as gagné. Tout le monde le sait." }
];

/* ---------------------------------------------------------
   EMPLOIS SALARIÉS
   --------------------------------------------------------- */
const JOBS = [
  { id: 'livreur', name: 'Livreur à vélo', salary: 1350, icon: 'fa-bicycle',
    req: {}, energy: 22, gain: { social: 0.3, business: 0.2 },
    desc: "Payé à la course, sous la pluie. Ça forge le mental." },
  { id: 'serveur', name: 'Serveur en restaurant', salary: 1600, icon: 'fa-utensils',
    req: { social: 8 }, energy: 20, gain: { social: 0.8 },
    desc: "Tu apprends à lire les gens en trois secondes." },
  { id: 'vendeur', name: 'Vendeur en boutique', salary: 1800, icon: 'fa-tags',
    req: { social: 15 }, energy: 18, gain: { social: 0.6, marketing: 0.5 },
    desc: "Première vraie école de vente." },
  { id: 'cm', name: 'Community manager', salary: 2200, icon: 'fa-hashtag',
    req: { marketing: 20 }, energy: 16, gain: { marketing: 1.0, social: 0.3 },
    desc: "Tu gères les réseaux d'une marque qui n'écoute pas tes conseils." },
  { id: 'devjr', name: 'Développeur junior', salary: 2900, icon: 'fa-code',
    req: { tech: 30 }, energy: 18, gain: { tech: 1.2 },
    desc: "Des tickets, des réunions, et un vrai salaire." },
  { id: 'commercial', name: 'Commercial B2B', salary: 3200, icon: 'fa-handshake',
    req: { social: 30, business: 20 }, energy: 22, gain: { social: 0.9, business: 0.8, marketing: 0.4 },
    desc: "Variable non plafonné. Objectifs impossibles." },
  { id: 'growth', name: 'Growth marketer', salary: 3800, icon: 'fa-chart-line',
    req: { marketing: 40, business: 25 }, energy: 20, gain: { marketing: 1.3, business: 0.5 },
    desc: "Tu brûles des budgets pub qui ne sont pas les tiens. Formateur." },
  { id: 'consultant', name: 'Consultant en stratégie', salary: 5200, icon: 'fa-briefcase',
    req: { business: 50, social: 35 }, energy: 26, gain: { business: 1.4, finance: 0.8 },
    desc: "80h/semaine, des slides, et un carnet d'adresses en or." },
  { id: 'lead', name: 'Lead developer', salary: 6000, icon: 'fa-server',
    req: { tech: 60 }, energy: 22, gain: { tech: 1.2, business: 0.4 },
    desc: "Tu construis les systèmes que d'autres vendent très cher." },
  { id: 'trader', name: 'Trader en salle de marché', salary: 8500, icon: 'fa-coins',
    req: { finance: 60, business: 40 }, energy: 30, gain: { finance: 1.6 },
    desc: "Beaucoup d'argent, très peu de sommeil." },
  { id: 'cmo', name: 'Directeur marketing (CMO)', salary: 9500, icon: 'fa-bullhorn',
    req: { marketing: 70, business: 55, social: 45 }, energy: 26, gain: { marketing: 1.2, business: 1.0 },
    desc: "Tu pilotes la croissance d'un groupe. Et tu te demandes pourquoi pas la tienne." }
];

/* ---------------------------------------------------------
   FORMATIONS & MONTÉE EN COMPÉTENCES
   --------------------------------------------------------- */
const TRAININGS = [
  { id: 'livres', name: 'Lire 4 livres de business', cost: 80, time: 1, energy: 10,
    gain: { business: 3, finance: 1 }, icon: 'fa-book',
    desc: "Le meilleur retour sur investissement du monde." },
  { id: 'youtube', name: 'Se former sur YouTube', cost: 0, time: 1, energy: 12,
    gain: { marketing: 2, tech: 1.5 }, icon: 'fa-play',
    desc: "Gratuit. Lent. Efficace si tu appliques." },
  { id: 'formation', name: 'Formation en ligne premium', cost: 1200, time: 1, energy: 14,
    gain: { marketing: 6, business: 3 }, icon: 'fa-graduation-cap',
    desc: "Un vrai programme, avec un vrai formateur." },
  { id: 'bootcamp', name: 'Bootcamp développement', cost: 7500, time: 2, energy: 28,
    gain: { tech: 18 }, icon: 'fa-terminal',
    desc: "Trois mois d'enfer, une compétence qui vaut de l'or." },
  { id: 'salesclub', name: 'Coaching vente & closing', cost: 3000, time: 1, energy: 18,
    gain: { social: 8, business: 4, marketing: 3 }, icon: 'fa-comments',
    desc: "Apprendre à ne plus avoir peur de demander l'argent." },
  { id: 'finance', name: 'Certification finance', cost: 4500, time: 2, energy: 22,
    gain: { finance: 14, business: 4 }, icon: 'fa-calculator',
    desc: "Comprendre un bilan, valoriser une boîte, négocier une levée." },
  { id: 'mba', name: 'MBA (executive)', cost: 42000, time: 2, energy: 30, req: { business: 40 },
    gain: { business: 20, finance: 10, social: 12 }, icon: 'fa-user-tie',
    desc: "Cher. Le vrai produit, c'est la promo avec qui tu sors." },
  { id: 'mentor', name: 'Mentorat avec un entrepreneur à 8 chiffres', cost: 15000, time: 1, energy: 12,
    req: { business: 30 }, gain: { business: 12, marketing: 8, finance: 6 }, icon: 'fa-user-graduate',
    desc: "Il te fait gagner cinq ans en six séances." }
];

/* ---------------------------------------------------------
   TYPES D'ENTREPRISE
   revPerClient : chiffre d'affaires mensuel par client
   churn        : % de clients perdus chaque mois (base)
   capPerLevel  : clients servis par niveau d'infrastructure
   empCap       : clients servis par employé
   multiple     : multiple de valorisation (x profit annuel)
   --------------------------------------------------------- */
const BUSINESS_TYPES = [
  {
    id: 'freelance', name: 'Freelance / Consultant', icon: 'fa-user-pen', cost: 200,
    req: {}, revPerClient: 900, varCost: 0.05, fixedCost: 120, churn: 0.14,
    capPerLevel: 4, empCap: 3, empSalary: 2600, upgradeCost: 2500, multiple: 1.2,
    market: 14, acqBase: 1.1, skill: ['social', 'business'], risk: 0.05,
    desc: "Tu vends ton temps. Zéro capital, zéro scalabilité, mais du cash tout de suite."
  },
  {
    id: 'creator', name: 'Créateur de contenu', icon: 'fa-video', cost: 800,
    req: { marketing: 10 }, revPerClient: 2.2, varCost: 0.02, fixedCost: 250, churn: 0.09,
    capPerLevel: 40000, empCap: 20000, empSalary: 2400, upgradeCost: 4000, multiple: 2.2,
    market: 260000, acqBase: 900, skill: ['marketing', 'social'], risk: 0.12,
    desc: "Tu construis une audience. Lent au début, imbattable ensuite."
  },
  {
    id: 'dropship', name: 'E-commerce / Dropshipping', icon: 'fa-truck-fast', cost: 3000,
    req: { marketing: 15 }, revPerClient: 55, varCost: 0.55, fixedCost: 600, churn: 0.35,
    capPerLevel: 900, empCap: 500, empSalary: 2300, upgradeCost: 6000, multiple: 1.6,
    market: 9000, acqBase: 24, skill: ['marketing'], risk: 0.25,
    desc: "Du cash rapide tant que la pub tourne. Coupe le budget, tout s'arrête."
  },
  {
    id: 'agence', name: 'Agence marketing', icon: 'fa-bullhorn', cost: 2500,
    req: { marketing: 25, social: 20 }, revPerClient: 2800, varCost: 0.12, fixedCost: 900, churn: 0.11,
    capPerLevel: 5, empCap: 4, empSalary: 3200, upgradeCost: 9000, multiple: 2.4,
    market: 45, acqBase: 0.9, skill: ['marketing', 'social'], risk: 0.1,
    desc: "Marges énormes, dépendance aux clients. Le modèle préféré des ambitieux."
  },
  {
    id: 'dtc', name: 'Marque DTC', icon: 'fa-shirt', cost: 20000,
    req: { marketing: 35, business: 25 }, revPerClient: 78, varCost: 0.42, fixedCost: 3500, churn: 0.22,
    capPerLevel: 1600, empCap: 900, empSalary: 2700, upgradeCost: 18000, multiple: 2.8,
    market: 13000, acqBase: 22, skill: ['marketing', 'business'], risk: 0.18,
    desc: "Ta propre marque, tes clients, ta marge. Le stock immobilise du cash."
  },
  {
    id: 'saas', name: 'Micro-SaaS', icon: 'fa-cloud', cost: 8000,
    req: { tech: 35 }, revPerClient: 49, varCost: 0.08, fixedCost: 1200, churn: 0.06,
    capPerLevel: 3000, empCap: 1500, empSalary: 4200, upgradeCost: 14000, multiple: 5.5,
    market: 32000, acqBase: 14, skill: ['tech', 'marketing'], risk: 0.08,
    desc: "Long à démarrer, revenus récurrents, valorisation énorme à la revente."
  },
  {
    id: 'foodtruck', name: 'Food truck', icon: 'fa-burger', cost: 32000,
    req: { business: 15 }, revPerClient: 17, varCost: 0.38, fixedCost: 2200, churn: 0.28,
    capPerLevel: 1400, empCap: 700, empSalary: 2100, upgradeCost: 15000, multiple: 1.8,
    market: 4200, acqBase: 22, skill: ['business', 'social'], risk: 0.15,
    desc: "Un vrai commerce, mobile, avec des marges honnêtes et des journées longues."
  },
  {
    id: 'resto', name: 'Restaurant', icon: 'fa-utensils', cost: 140000,
    req: { business: 40, finance: 25 }, revPerClient: 42, varCost: 0.36, fixedCost: 14000, churn: 0.24,
    capPerLevel: 2200, empCap: 900, empSalary: 2400, upgradeCost: 45000, multiple: 2.0,
    market: 9000, acqBase: 26, skill: ['business', 'social'], risk: 0.22,
    desc: "Charges fixes lourdes, ego flatté. On n'y va pas pour la rentabilité."
  },
  {
    id: 'immo', name: 'Agence immobilière', icon: 'fa-key', cost: 65000,
    req: { business: 45, social: 40, finance: 30 }, revPerClient: 5200, varCost: 0.2, fixedCost: 7000, churn: 0.16,
    capPerLevel: 6, empCap: 5, empSalary: 3000, upgradeCost: 25000, multiple: 2.6,
    market: 65, acqBase: 0.8, skill: ['social', 'business'], risk: 0.12,
    desc: "Peu de transactions, grosses commissions. Tout repose sur la confiance."
  },
  {
    id: 'studio', name: 'Studio de jeux vidéo', icon: 'fa-gamepad', cost: 95000,
    req: { tech: 55, marketing: 30 }, revPerClient: 9, varCost: 0.12, fixedCost: 16000, churn: 0.05,
    capPerLevel: 30000, empCap: 12000, empSalary: 4500, upgradeCost: 60000, multiple: 4.0,
    market: 320000, acqBase: 260, skill: ['tech', 'marketing'], risk: 0.35,
    desc: "Tout ou rien. Un flop et tu fermes, un hit et tu es riche à vie."
  },
  {
    id: 'ia', name: 'Startup IA', icon: 'fa-microchip', cost: 250000,
    req: { tech: 70, business: 50, finance: 40 }, revPerClient: 320, varCost: 0.25, fixedCost: 55000, churn: 0.05,
    capPerLevel: 900, empCap: 400, empSalary: 7500, upgradeCost: 150000, multiple: 9.0,
    market: 6000, acqBase: 5, skill: ['tech', 'business'], risk: 0.3,
    desc: "Brûle du cash comme un réacteur. Si ça prend, la valorisation explose."
  },
  {
    id: 'holding', name: 'Holding d\'investissement', icon: 'fa-landmark', cost: 400000,
    req: { finance: 70, business: 65 }, revPerClient: 14000, varCost: 0.05, fixedCost: 30000, churn: 0.04,
    capPerLevel: 6, empCap: 4, empSalary: 9000, upgradeCost: 220000, multiple: 6.0,
    market: 42, acqBase: 0.5, skill: ['finance', 'business'], risk: 0.1,
    desc: "Tu ne construis plus : tu rachètes ce que d'autres ont construit."
  }
];

/* ---------------------------------------------------------
   PLACEMENTS FINANCIERS
   --------------------------------------------------------- */
const ASSETS = [
  { id: 'livret', name: 'Livret d\'épargne', icon: 'fa-piggy-bank', price: 100, drift: 0.0018, vol: 0.0,
    desc: "2% par an, zéro risque. La base." },
  { id: 'obligations', name: 'Obligations d\'État', icon: 'fa-file-invoice-dollar', price: 100, drift: 0.0031, vol: 0.012,
    desc: "Un peu mieux, quasi sans risque." },
  { id: 'etf', name: 'ETF World', icon: 'fa-chart-area', price: 100, drift: 0.0062, vol: 0.042,
    desc: "8% par an en moyenne. Il faut tenir dans les creux." },
  { id: 'tech', name: 'Actions tech', icon: 'fa-microchip', price: 100, drift: 0.0085, vol: 0.085,
    desc: "Plus de rendement, plus de nuits blanches." },
  { id: 'crypto', name: 'Crypto', icon: 'fa-bitcoin-sign', price: 100, drift: 0.011, vol: 0.24,
    desc: "Peut faire x5. Peut faire -80%. Souvent les deux la même année." },
  { id: 'immobilier', name: 'Immobilier locatif (part)', icon: 'fa-building-columns', price: 100, drift: 0.0045, vol: 0.018, yield: 0.0035,
    desc: "Rendement lent + loyers versés chaque mois." }
];

/* ---------------------------------------------------------
   ÉVÉNEMENTS DE VIE
   cond(S) : condition d'apparition ; choices : effets
   Effets possibles : money, energy, happiness, health, reputation,
   skills{}, debt, flag, custom(S)
   --------------------------------------------------------- */
const EVENTS = [
  {
    id: 'ami_projet', title: "Un ami te propose un projet",
    text: "Karim débarque chez toi à 23h : « J'ai LE concept. Il me faut 3 000€ et ton cerveau. » Il a déjà fait deux flops.",
    cond: s => s.money > 3500 && s.months > 3,
    choices: [
      { label: "Investir 3 000€", effects: { money: -3000 }, custom: s => {
          if (Math.random() < 0.35) { addLog(s, "Le projet de Karim marche : il te rend 11 000€.", 'good'); s.money += 11000; }
          else { addLog(s, "Le projet de Karim a coulé en 4 mois. Argent perdu.", 'bad'); s.happiness -= 6; }
        } },
      { label: "Refuser poliment", effects: { happiness: -2, reputation: -1 } },
      { label: "Proposer de l'aider gratuitement", effects: { energy: -12, social: 2, reputation: 3 } }
    ]
  },
  {
    id: 'burnout', title: "Ton corps lâche",
    text: "Tu te réveilles avec le cœur qui bat trop vite. Ça fait des mois que tu dors 5h et que tu carbures au café.",
    cond: s => s.energy < 25 || s.health < 45,
    choices: [
      { label: "Lever le pied deux semaines", effects: { energy: 35, health: 12, happiness: 6, money: -800 } },
      { label: "Ignorer et continuer", effects: { health: -14, energy: -8 }, custom: s => {
          if (s.health < 25) { addLog(s, "Tu finis aux urgences. Trois semaines d'arrêt forcé.", 'bad'); s.energy = 20; s.money -= 2500; }
        } }
    ]
  },
  {
    id: 'controle_fiscal', title: "Contrôle fiscal",
    text: "Un courrier recommandé. L'administration veut vérifier trois exercices de tes sociétés.",
    cond: s => s.companies.length > 0 && s.months > 14,
    choices: [
      { label: "Prendre un bon avocat fiscaliste (6 000€)", effects: { money: -6000, happiness: -4 } },
      { label: "Gérer ça toi-même", custom: s => {
          if (s.skills.finance > 45) { addLog(s, "Ta compta était carrée : redressement à zéro.", 'good'); s.skills.finance += 2; }
          else { const m = 8000 + Math.round(Math.random() * 22000); s.money -= m; addLog(s, `Redressement de ${fmt(m)}. Douloureux.`, 'bad'); s.happiness -= 10; }
        } }
    ]
  },
  {
    id: 'concurrent', title: "Un concurrent agressif",
    text: "Une boîte financée casse les prix sur ton marché et rachète tous les mots-clés publicitaires.",
    cond: s => s.companies.some(c => c.clients > 30),
    choices: [
      { label: "Baisser tes prix", custom: s => { const c = biggest(s); if (c) { c.priceMod = (c.priceMod || 1) * 0.85; addLog(s, `${c.name} : prix baissés de 15% pour tenir.`, 'warn'); } } },
      { label: "Miser sur la qualité et la marque", custom: s => { const c = biggest(s); if (c) { c.quality = Math.min(100, c.quality + 10); c.cash -= 6000; addLog(s, `${c.name} : 6 000€ investis dans le produit et la marque.`, 'info'); } } },
      { label: "Écraser en budget pub", custom: s => { const c = biggest(s); if (c) { c.marketing = Math.round(c.marketing * 1.8) + 1000; addLog(s, `${c.name} : budget pub augmenté agressivement.`, 'warn'); } } }
    ]
  },
  {
    id: 'rencontre', title: "Tu rencontres quelqu'un",
    text: "Un dîner, une conversation qui dure jusqu'à 3h du matin. Ça fait longtemps que ça ne t'était pas arrivé.",
    cond: s => !s.flags.includes('couple') && s.happiness > 35 && s.months > 6,
    choices: [
      { label: "Se lancer dans la relation", effects: { happiness: 18, energy: -4 }, flag: 'couple' },
      { label: "Rester concentré sur le business", effects: { happiness: -6 }, custom: s => { s.focusBonus = (s.focusBonus || 0) + 0.05; addLog(s, "Tu choisis le travail. +5% d'efficacité sur tes actions.", 'info'); } }
    ]
  },
  {
    id: 'enfant', title: "Un enfant arrive",
    text: "Le test est positif. Tout change.",
    cond: s => s.flags.includes('couple') && !s.flags.includes('parent') && s.age >= 25,
    choices: [
      { label: "Devenir père", effects: { happiness: 22, energy: -10 }, flag: 'parent', custom: s => { s.lifeCost = (s.lifeCost || 0) + 700; addLog(s, "Coût de vie +700€/mois. Et une raison de plus de réussir.", 'info'); } }
    ]
  },
  {
    id: 'business_angel', title: "Un business angel s'intéresse à toi",
    text: "Un investisseur a vu tes chiffres. Il propose du cash contre des parts, sans passer par la case banque.",
    cond: s => s.companies.some(c => c.clients > 60 && c.equity > 0.55),
    choices: [
      { label: "Accepter le ticket", custom: s => {
          const c = biggest(s); if (!c) return;
          const val = valuation(c); const cash = Math.round(val * 0.15);
          c.equity *= 0.85; c.cash += cash;
          addLog(s, `Levée : ${fmt(cash)} sur la trésorerie de ${c.name} contre 15% du capital.`, 'good');
        } },
      { label: "Refuser, garder 100%", effects: { reputation: 2 } }
    ]
  },
  {
    id: 'employe_part', title: "Ton meilleur employé démissionne",
    text: "Il a reçu une offre 40% au-dessus. Il te l'annonce un vendredi soir.",
    cond: s => s.companies.some(c => c.employees > 2),
    choices: [
      { label: "Surenchérir sur le salaire", custom: s => { const c = s.companies.find(x => x.employees > 2); if (c) { c.salaryMod = (c.salaryMod || 1) * 1.12; addLog(s, `${c.name} : masse salariale +12%, il reste.`, 'info'); } } },
      { label: "Le laisser partir", custom: s => { const c = s.companies.find(x => x.employees > 2); if (c) { c.employees--; c.quality = Math.max(0, c.quality - 8); addLog(s, `${c.name} : -1 employé, qualité en baisse.`, 'bad'); } } },
      { label: "Lui donner 2% de la boîte", custom: s => { const c = s.companies.find(x => x.employees > 2); if (c) { c.equity -= 0.02; c.quality = Math.min(100, c.quality + 12); addLog(s, `${c.name} : il devient associé et se surpasse.`, 'good'); } } }
    ]
  },
  {
    id: 'viral', title: "Une vidéo devient virale",
    text: "Un contenu que tu as posté sans y croire explose. 2 millions de vues en 48h.",
    cond: s => s.companies.length > 0 && s.skills.marketing > 25,
    choices: [
      { label: "Capitaliser à fond", custom: s => { const c = biggest(s); if (c) { c.clients = Math.round(c.clients * 1.6) + 20; addLog(s, `${c.name} : afflux massif de clients.`, 'good'); } s.reputation += 8; } },
      { label: "Rester discret", effects: { reputation: 3, happiness: 2 } }
    ]
  },
  {
    id: 'proces', title: "Mise en demeure",
    text: "Un ancien partenaire t'attaque pour rupture abusive de contrat.",
    cond: s => s.companies.length > 0 && s.months > 20,
    choices: [
      { label: "Négocier à l'amiable (12 000€)", effects: { money: -12000, happiness: -5 } },
      { label: "Aller au procès", custom: s => {
          if (Math.random() < 0.5 + s.skills.finance / 300) { addLog(s, "Tu gagnes le procès. Frais d'avocat : 4 000€.", 'good'); s.money -= 4000; }
          else { addLog(s, "Tu perds : 35 000€ de dommages et intérêts.", 'bad'); s.money -= 35000; s.happiness -= 12; }
        } }
    ]
  },
  {
    id: 'crise', title: "Crise économique",
    text: "Les marchés dévissent, les clients coupent leurs budgets, les banques ferment le robinet.",
    cond: s => s.months > 24 && Math.random() < 0.5,
    global: true,
    choices: [
      { label: "Réduire les coûts immédiatement", custom: s => {
          s.companies.forEach(c => { c.marketing = Math.round(c.marketing * 0.5); c.clients = Math.round(c.clients * 0.85); });
          s.marketMood = 0.72; addLog(s, "Mode survie activé : budgets coupés partout.", 'warn');
        } },
      { label: "Investir à contre-courant", custom: s => {
          s.companies.forEach(c => { c.clients = Math.round(c.clients * 0.7); c.marketing = Math.round(c.marketing * 1.3); });
          s.marketMood = 0.72; s.contrarian = 8;
          addLog(s, "Tu attaques pendant que les autres reculent. Risqué.", 'warn');
        } }
    ]
  },
  {
    id: 'boom', title: "Le marché s'emballe",
    text: "Tout le monde consomme, les investisseurs signent des chèques, ton secteur est à la mode.",
    cond: s => s.months > 18 && Math.random() < 0.4,
    global: true,
    choices: [
      { label: "Profiter de la vague", custom: s => { s.marketMood = 1.35; addLog(s, "Vent dans le dos pendant plusieurs mois.", 'good'); } }
    ]
  },
  {
    id: 'vieil_ami', title: "Un ancien ami te reproche ta réussite",
    text: "« T'as changé. » Trois mots dans un message vocal de 2 minutes.",
    cond: s => s.money > 200000,
    choices: [
      { label: "Prendre le temps de le rappeler", effects: { happiness: 6, energy: -6 } },
      { label: "Laisser filer", effects: { happiness: -7, social: -1 } },
      { label: "Lui proposer un job", effects: { money: -2000, happiness: 4, reputation: 2 } }
    ]
  },
  {
    id: 'opportunite_rachat', title: "Une boîte à racheter",
    text: "Un concurrent fatigué veut vendre. Il est pressé, le prix est bas.",
    cond: s => s.money > 120000 && s.skills.business > 45,
    choices: [
      { label: "Racheter", custom: s => {
          const t = BUSINESS_TYPES[Math.floor(Math.random() * 6)];
          const price = Math.round(t.cost * 1.4);
          if (s.money < price) { addLog(s, "Finalement, tu n'as pas les fonds.", 'warn'); return; }
          s.money -= price;
          const c = createCompany(t, `${t.name} (reprise)`);
          c.clients = Math.round((t.capPerLevel || 10) * 0.6);
          c.quality = 55; c.cash = 5000;
          s.companies.push(c);
          addLog(s, `Rachat conclu pour ${fmt(price)} : ${c.name} rejoint le groupe.`, 'good');
        } },
      { label: "Passer ton tour", effects: {} }
    ]
  },
  {
    id: 'sante_prevention', title: "Bilan de santé",
    text: "Le médecin te regarde par-dessus ses lunettes : « À ce rythme, on se revoit aux urgences. »",
    cond: s => s.age > 35 && s.health < 70,
    choices: [
      { label: "Coach sportif et nutrition (450€/mois)", custom: s => { s.lifeCost = (s.lifeCost || 0) + 450; s.health += 10; addLog(s, "Tu reprends ta santé en main.", 'good'); } },
      { label: "Plus tard", effects: { health: -6 } }
    ]
  },
  {
    id: 'hack', title: "Cyberattaque",
    text: "Tes serveurs sont chiffrés. Une rançon s'affiche à l'écran.",
    cond: s => s.companies.some(c => ['saas', 'ia', 'studio', 'dropship'].includes(c.typeId)),
    choices: [
      { label: "Payer la rançon (25 000€)", effects: { money: -25000, happiness: -6 } },
      { label: "Refuser et reconstruire", custom: s => { const c = biggest(s); if (c) { c.clients = Math.round(c.clients * 0.6); c.quality = Math.max(0, c.quality - 10); } addLog(s, "Deux semaines d'arrêt, des clients perdus, mais tu n'as pas cédé.", 'warn'); s.reputation += 3; } }
    ]
  },
  {
    id: 'presse', title: "Un journaliste veut te portraiturer",
    text: "Un média économique prépare un article sur les nouveaux entrepreneurs de ta génération.",
    cond: s => s.reputation > 30,
    choices: [
      { label: "Accepter l'interview", effects: { reputation: 12, energy: -8 }, custom: s => { s.companies.forEach(c => c.clients = Math.round(c.clients * 1.12)); } },
      { label: "Décliner", effects: { happiness: 1 } }
    ]
  },
  {
    id: 'associe', title: "Un associé potentiel",
    text: "Une pointure de ton secteur veut te rejoindre. Elle demande 25% du capital.",
    cond: s => s.companies.some(c => c.equity > 0.7 && c.clients > 25),
    choices: [
      { label: "Accepter l'association", custom: s => { const c = biggest(s); if (c) { c.equity -= 0.25; c.partner = true; c.quality = Math.min(100, c.quality + 18); addLog(s, `${c.name} : nouvel associé, produit nettement meilleur.`, 'good'); } } },
      { label: "Rester seul maître à bord", effects: { happiness: -2 } }
    ]
  },
  {
    id: 'impots', title: "Régularisation d'impôts",
    text: "L'avis d'imposition tombe. Tu avais oublié de provisionner.",
    cond: s => s.money > 60000 && s.months % 12 === 0,
    choices: [
      { label: "Payer", custom: s => { const t = Math.round(s.money * 0.09); s.money -= t; addLog(s, `${fmt(t)} d'impôts prélevés.`, 'warn'); } }
    ]
  },
  {
    id: 'offre_rachat', title: "Offre de rachat surprise",
    text: "Un groupe veut acquérir ta société. L'offre est sur la table, valable une semaine.",
    cond: s => s.companies.some(c => valuation(c) > 150000),
    choices: [
      { label: "Vendre au prix proposé (+25%)", custom: s => {
          const c = biggest(s); if (!c) return;
          const price = Math.round(valuation(c) * 1.25 * c.equity);
          s.money += price; s.exits.push({ name: c.name, price, month: s.months });
          s.companies = s.companies.filter(x => x !== c);
          addLog(s, `Tu vends ${c.name} pour ${fmt(price)}.`, 'good'); s.reputation += 10;
        } },
      { label: "Refuser, tu vises plus haut", effects: { reputation: 4 }, custom: s => { const c = biggest(s); if (c) c.hype = 1.15; } }
    ]
  },
  {
    id: 'salarie_star', title: "Un profil rare postule",
    text: "Un profil exceptionnel veut te rejoindre, mais son salaire est deux fois la moyenne.",
    cond: s => s.companies.some(c => c.cash > 30000),
    choices: [
      { label: "Le recruter", custom: s => { const c = biggest(s); if (c) { c.employees += 1; c.salaryMod = (c.salaryMod || 1) * 1.15; c.quality = Math.min(100, c.quality + 14); addLog(s, `${c.name} : recrutement d'un profil rare.`, 'good'); } } },
      { label: "Trop cher", effects: {} }
    ]
  },
  {
    id: 'depression', title: "Le vide",
    text: "Tu as atteint des objectifs dont tu rêvais à 20 ans, et tu ne ressens rien.",
    cond: s => s.money > 500000 && s.happiness < 35,
    choices: [
      { label: "Voir un psy et ralentir", effects: { money: -3000, happiness: 20, energy: 10 } },
      { label: "Te fixer un objectif encore plus grand", effects: { happiness: -5 }, custom: s => { s.focusBonus = (s.focusBonus || 0) + 0.1; addLog(s, "Tu remets une pièce dans la machine. +10% d'efficacité.", 'warn'); } },
      { label: "Donner 100 000€ à une association", effects: { money: -100000, happiness: 25, reputation: 15 } }
    ]
  },
  {
    id: 'arnaque', title: "Une opportunité trop belle",
    text: "Un « investisseur » promet 30% de rendement mensuel garanti. Il montre des captures d'écran.",
    cond: s => s.money > 20000,
    choices: [
      { label: "Investir 20 000€", custom: s => {
          s.money -= 20000;
          if (s.skills.finance > 55 && Math.random() < 0.5) { addLog(s, "Tu flaires l'arnaque à temps et récupères ton argent.", 'good'); s.money += 20000; }
          else { addLog(s, "C'était une arnaque. 20 000€ envolés.", 'bad'); s.happiness -= 10; s.skills.finance += 4; }
        } },
      { label: "Refuser", effects: { finance: 1 } }
    ]
  },
  {
    id: 'mentor_rencontre', title: "Un mentor te repère",
    text: "Un entrepreneur reconnu te propose de te suivre pendant un an. Gratuitement.",
    cond: s => s.reputation > 20 && s.months > 12,
    choices: [
      { label: "Accepter avec humilité", effects: { skills: { business: 8, finance: 5 }, reputation: 5 } },
      { label: "Tu penses ne pas en avoir besoin", effects: { happiness: 2, reputation: -3 } }
    ]
  },
  {
    id: 'panne_cash', title: "Trésorerie tendue",
    text: "Un gros client paie à 90 jours. Tes salaires tombent dans 6 jours.",
    cond: s => s.companies.some(c => c.cash < 3000 && c.employees > 0),
    choices: [
      { label: "Découvert bancaire (intérêts élevés)", custom: s => { s.debt += 20000; s.money += 20000; addLog(s, "20 000€ de découvert accordé. Les intérêts courent.", 'warn'); } },
      { label: "Affacturage (perte de 8%)", custom: s => { const c = biggest(s); if (c) { c.cash += 12000; s.money -= 960; addLog(s, "Créances cédées, trésorerie renflouée.", 'info'); } } },
      { label: "Retarder les salaires", custom: s => { const c = biggest(s); if (c) { c.quality = Math.max(0, c.quality - 12); c.employees = Math.max(0, c.employees - 1); } s.reputation -= 6; addLog(s, "Mauvaise idée : ambiance détruite, un départ.", 'bad'); } }
    ]
  }
];

/* ---------------------------------------------------------
   OBJECTIFS / SUCCÈS
   --------------------------------------------------------- */
const GOALS = [
  { id: 'firstclient', name: 'Premier client', desc: "Décrocher ton tout premier client.", check: s => s.companies.some(c => c.clients >= 1) },
  { id: 'quitjob', name: 'Quitter le salariat', desc: "Vivre de tes entreprises sans employeur.", check: s => !s.job && s.companies.length > 0 && monthlyBusinessProfit(s) > 2500 },
  { id: 'k10', name: '10 000€ / mois', desc: "Générer 10 000€ de profit mensuel.", check: s => monthlyBusinessProfit(s) >= 10000 },
  { id: 'first100k', name: '100 000€ de patrimoine', desc: "Franchir les six chiffres.", check: s => netWorth(s) >= 100000 },
  { id: 'exit', name: 'Première revente', desc: "Vendre une entreprise.", check: s => s.exits.length > 0 },
  { id: 'million', name: 'Millionnaire', desc: "1 000 000€ de patrimoine net.", check: s => netWorth(s) >= 1000000 },
  { id: 'group', name: 'Groupe', desc: "Posséder 3 entreprises rentables en même temps.", check: s => s.companies.filter(c => c.lastProfit > 0).length >= 3 },
  { id: 'empire', name: 'Empire', desc: "10 000 000€ de patrimoine net.", check: s => netWorth(s) >= 10000000 },
  { id: 'balance', name: 'Vie équilibrée', desc: "Bonheur et santé au-dessus de 80 avec plus de 500 000€.", check: s => s.happiness > 80 && s.health > 80 && netWorth(s) > 500000 }
];
