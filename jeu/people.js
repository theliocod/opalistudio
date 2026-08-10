/* =========================================================
   EMPIRE — Les gens
   Génération des candidats à l'embauche et des contacts
   rencontrés en réseautant. Chaque personne a ses propres
   statistiques et pèse réellement sur la partie.
   ========================================================= */

const FIRST_NAMES = [
  'Karim', 'Sofia', 'Lucas', 'Amina', 'Thomas', 'Léa', 'Mehdi', 'Chloé', 'Antoine', 'Fatou',
  'Julien', 'Inès', 'Nabil', 'Camille', 'Hugo', 'Sarah', 'Youssef', 'Manon', 'Rémi', 'Awa',
  'Vincent', 'Nadia', 'Pierre', 'Élodie', 'Samir', 'Jade', 'Maxime', 'Clara', 'Ibrahim', 'Louise',
  'Gaspard', 'Yasmine', 'Adrien', 'Margot', 'Kevin', 'Salomé', 'Marc', 'Anaïs', 'Bilal', 'Juliette'
];

const LAST_NAMES = [
  'Benali', 'Moreau', 'Dubois', 'Traoré', 'Lefèvre', 'Nguyen', 'Garcia', 'Roux', 'Marchand', 'Diallo',
  'Bernard', 'Petit', 'Faure', 'Chevalier', 'Blanc', 'Mercier', 'Boucher', 'Girard', 'Perrin', 'Sow',
  'Legrand', 'Fontaine', 'Robin', 'Meyer', 'Barbier', 'Renaud', 'Colin', 'Vidal', 'Cissé', 'Aubert'
];

/* ---------------------------------------------------------
   TRAITS DE PERSONNALITÉ
   perf   : multiplicateur de performance
   morale : dérive quotidienne du moral
   ask    : multiplicateur de la prétention salariale
   --------------------------------------------------------- */
const TRAITS = [
  { id: 'bosseur', name: 'Bosseur', perf: 1.18, morale: 0, ask: 1, good: true,
    desc: "Abat le travail de deux personnes sans se plaindre." },
  { id: 'loyal', name: 'Loyal', perf: 1, morale: 0.05, ask: 0.92, good: true,
    desc: "Ne partira pas pour 200€ de plus ailleurs." },
  { id: 'creatif', name: 'Créatif', perf: 1.1, morale: -0.01, ask: 1.05, good: true,
    desc: "Trouve des angles auxquels personne n'avait pensé." },
  { id: 'leader', name: 'Meneur', perf: 1.06, morale: 0.03, ask: 1.15, good: true,
    desc: "Tire toute l'équipe vers le haut." },
  { id: 'rigoureux', name: 'Rigoureux', perf: 1.08, morale: 0.01, ask: 1, good: true,
    desc: "Rien ne passe à travers les mailles." },
  { id: 'ambitieux', name: 'Ambitieux', perf: 1.14, morale: -0.05, ask: 1.2, good: false,
    desc: "Excellent, mais il veut ta place ou celle du voisin." },
  { id: 'lent', name: 'Lent à démarrer', perf: 0.82, morale: 0.02, ask: 0.85, good: false,
    desc: "Met du temps à devenir rentable. Parfois ça vaut le coup d'attendre." },
  { id: 'instable', name: 'Instable', perf: 1.02, morale: -0.09, ask: 0.95, good: false,
    desc: "Un jour au sommet, le lendemain injoignable." },
  { id: 'toxique', name: 'Toxique', perf: 1.05, morale: -0.03, ask: 0.9, good: false,
    desc: "Performant seul, désastreux pour le moral des autres." },
  { id: 'debutant', name: 'Débutant motivé', perf: 0.9, morale: 0.06, ask: 0.7, good: true,
    desc: "Peu d'expérience, énormément d'envie. Progresse vite." }
];

function randomName() {
  return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
}

/* ---------------------------------------------------------
   CANDIDATS
   quality : 0 → 1, pilote le niveau du profil généré
   --------------------------------------------------------- */
function makeCandidate(roleId, quality) {
  const role = ROLES.find(r => r.id === roleId);
  // le vivier de la ville où l'on recrute change ce qui se présente
  quality = clamp(quality * (typeof cityTalent === 'function' ? cityTalent() : 1), 0, 1.15);
  const skill = clamp(Math.round(rand(10, 45) + quality * 55 + rand(-8, 8)), 5, 99);

  // les bons profils sont plus souvent porteurs de bons traits
  const pool = Math.random() < 0.35 + quality * 0.35
    ? TRAITS.filter(t => t.good)
    : TRAITS;
  const trait = pick(pool);

  const marketRate = role.salary * (0.6 + skill / 100);
  return {
    id: 'p' + Math.random().toString(36).slice(2, 9),
    name: randomName(),
    role: roleId,
    skill,
    trait: trait.id,
    ask: Math.round(marketRate * trait.ask * rand(0.92, 1.12) / 50) * 50,
    morale: Math.round(rand(60, 85)),
    days: 0,
    revealed: false,
    waited: 0
  };
}

function getTrait(id) { return TRAITS.find(t => t.id === id); }

/* Estimation floue tant que le candidat n'a pas passé d'entretien.
   Un joueur avec un bon niveau social voit plus juste. */
function candidateHint(cand) {
  if (cand.revealed) return null;
  const noise = Math.max(4, 22 - S.skills.social / 5);
  const seen = clamp(cand.skill + rand(-noise, noise), 0, 100);
  if (seen < 30) return { label: 'Profil junior', cls: 'ko' };
  if (seen < 50) return { label: 'Profil correct', cls: '' };
  if (seen < 70) return { label: 'Bon profil', cls: 'ok' };
  if (seen < 85) return { label: 'Très bon profil', cls: 'ok' };
  return { label: 'Profil exceptionnel', cls: 'ok' };
}

/* Salaire de marché pour un poste et un niveau donnés */
function marketSalary(roleId, skill) {
  const role = ROLES.find(r => r.id === roleId);
  return Math.round(role.salary * (0.6 + skill / 100) / 50) * 50;
}

/* ---------------------------------------------------------
   CONTACTS
   Rencontrés en réseautant. Un contact de haut niveau est la
   seule façon de dépasser le plafond « terrain » d'une
   compétence — encore faut-il entretenir la relation.
   --------------------------------------------------------- */
const CONTACT_KINDS = [
  { id: 'mentor', name: 'Entrepreneur confirmé', icon: 'fa-user-graduate', skills: ['business', 'finance'],
    desc: "Il a déjà construit et revendu. Il voit tes erreurs avant toi." },
  { id: 'marketer', name: 'Expert acquisition', icon: 'fa-bullhorn', skills: ['marketing'],
    desc: "Il fait tourner des budgets à sept chiffres tous les mois." },
  { id: 'cto', name: 'Ingénieur chevronné', icon: 'fa-code', skills: ['tech'],
    desc: "Vingt ans de code derrière lui, aucune patience pour les raccourcis." },
  { id: 'investor', name: 'Investisseur', icon: 'fa-sack-dollar', skills: ['finance', 'business'],
    desc: "Signe des chèques. Peut ouvrir un tour de table — ou le fermer." },
  { id: 'closer', name: 'Commercial d\'élite', icon: 'fa-handshake', skills: ['social'],
    desc: "Il n'a jamais raccroché sans un rendez-vous." },
  { id: 'recruiter', name: 'Chasseur de têtes', icon: 'fa-user-tie', skills: ['social', 'business'],
    desc: "Connaît tous les bons profils de la ville." },
  { id: 'client', name: 'Grand compte', icon: 'fa-briefcase', skills: ['business'],
    desc: "Un budget, une signature, et beaucoup d'exigences." }
];

function makeContact(minLevel = 20) {
  const kind = pick(CONTACT_KINDS);
  const level = clamp(Math.round(rand(minLevel, minLevel + 55)), 10, 98);
  return {
    id: 'k' + Math.random().toString(36).slice(2, 9),
    name: randomName(),
    kind: kind.id,
    level,
    relation: Math.round(rand(8, 22)),
    lastSeen: 0,
    favors: 0
  };
}

function contactKind(c) { return CONTACT_KINDS.find(k => k.id === c.kind); }
