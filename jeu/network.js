/* =========================================================
   EMPIRE — Le réseau, les amis, les mentors
   Un carnet d'adresses n'est pas une collection : c'est un
   ensemble de gens qui t'oublient si tu ne les vois plus, qui
   comptent ce que tu leur demandes, qui ne répondent pas si
   tu n'es personne, et qui te présentent des gens quand ils
   ont envie de le faire.
   Un mentor, c'est autre chose encore : quelqu'un qui accepte
   de te consacrer du temps, qui te fixe des objectifs, et qui
   arrête si tu ne viens pas.
   ========================================================= */

/* ---------------------------------------------------------
   LES CERCLES
   Un lien se refroidit tout seul. Plus il est fort, plus il
   résiste — mais aucun ne résiste à deux ans de silence.
   --------------------------------------------------------- */

const CIRCLES = [
  { id: 'croise', min: 0, name: 'Croisé une fois', icon: 'fa-user', decay: 0.042,
    desc: "Il se souvient vaguement de toi." },
  { id: 'connaissance', min: 28, name: 'Connaissance', icon: 'fa-user-check', decay: 0.04,
    desc: "Il répond à tes messages. Sans plus." },
  { id: 'relation', min: 55, name: 'Relation de confiance', icon: 'fa-handshake', decay: 0.03,
    desc: "Il décroche quand tu appelles, et il te présente des gens." },
  { id: 'proche', min: 78, name: 'Proche', icon: 'fa-user-shield', decay: 0.012,
    desc: "Il se déplacerait pour toi. Ça se rend." }
];

function circleOf(k) {
  return CIRCLES.slice().reverse().find(c => k.relation >= c.min) || CIRCLES[0];
}

/* ---------------------------------------------------------
   ACCESSIBILITÉ
   Personne d'important ne rencontre un inconnu par hasard.
   Ce que tu vaux socialement décide de qui accepte de te voir.
   --------------------------------------------------------- */

function socialStanding(s = S) {
  const best = Math.max(...Object.values(s.skills));
  const built = s.companies.reduce((a, c) => a + valuation(c) * c.equity, 0);
  return clamp(
    10 + s.reputation * 0.42 + best * 0.18
    + (s.companies.length ? 4 : 0)
    + clamp((Math.log10(Math.max(1, built)) - 4) * 6, 0, 26)
    + s.exits.length * 3,
    8, 98
  );
}

/* Ce que quelqu'un pense de toi quand il te croise pour la première fois. */
function reachableLevel(s = S, bonus = 0) {
  return clamp(socialStanding(s) + bonus + cityNet(s) + rand(-6, 10), 8, 99);
}

/* ---------------------------------------------------------
   RÉCIPROCITÉ
   owed : ce que tu dois à quelqu'un. Chaque service demandé
   l'augmente, chaque service rendu le fait baisser. Au-delà
   d'un certain solde, on cesse de te rappeler — c'est la
   chose la plus réaliste de tout le système.
   --------------------------------------------------------- */

function owedOf(k) { return Math.max(0, Math.round(k.owed || 0)); }

function canAskFavor(k) {
  if (k.away) return { ok: false, why: `${k.name} est à l'étranger en ce moment.` };
  if (k.relation < 45) return { ok: false, why: "Votre relation n'est pas assez solide pour demander ça." };
  if (owedOf(k) >= 55) return { ok: false, why: `Tu lui dois déjà beaucoup. Rends-lui un service d'abord.` };
  return { ok: true };
}

/* ---------------------------------------------------------
   LA VIE DES AUTRES
   Les gens de ton carnet ne t'attendent pas : ils montent,
   ils changent de poste, ils partent, ils reviennent, et
   parfois c'est eux qui te sollicitent.
   --------------------------------------------------------- */

function tickNetwork(s) {
  s.contacts.forEach(k => {
    if (k.owed === undefined) k.owed = 0;
    if (k.trust === undefined) k.trust = 50;
    if (k.lastGrow === undefined) k.lastGrow = s.day;

    // le lien se refroidit, d'autant plus vite qu'on ne se voit plus
    const idle = s.day - k.lastSeen;
    const c = circleOf(k);
    let d = c.decay * (0.45 + Math.min(1.8, idle / 260));
    if (k.away) d *= 1.6;
    if (isMentor(k.id)) d *= 0.3;              // un mentor, on le voit par définition
    // on n'oublie jamais complètement quelqu'un : on cesse juste de compter pour lui
    k.relation = Math.max(k.relation > 2 ? 2 : k.relation, clamp(k.relation - d, 0, 100));

    // la dette relationnelle se résorbe très lentement toute seule
    if (k.owed > 0) k.owed = Math.max(0, k.owed - 0.018);

    // leur carrière avance
    if (s.day - k.lastGrow > 360) {
      k.lastGrow = s.day;
      const step = Math.round(rand(-1, 5) * (1 - k.level / 140));
      if (step > 0) {
        k.level = clamp(k.level + step, 5, 99);
        if (step >= 4 && k.relation > 40)
          addLog(s, `${k.name} vient de passer un cap. Ton carnet gagne en valeur.`, 'info');
      }
      // départs et retours
      if (!k.away && Math.random() < 0.08) {
        k.away = true;
        if (k.relation > 45) addLog(s, `${k.name} part s'installer à l'étranger. Vous vous verrez moins.`, 'warn');
      } else if (k.away && Math.random() < 0.35) {
        k.away = false;
        if (k.relation > 45) addLog(s, `${k.name} est rentré. Il te propose de déjeuner.`, 'good');
      }
    }

    // on t'oublie pour de bon
    if (k.relation <= 2.2 && idle > 1080 && !isMentor(k.id)) k.dead = true;
  });

  const gone = s.contacts.filter(k => k.dead);
  gone.forEach(k => addLog(s, `Tu as perdu de vue ${k.name}. Vous ne vous rappellerez plus.`, 'warn'));
  s.contacts = s.contacts.filter(k => !k.dead);

  // il arrive qu'on t'appelle
  if (Math.random() < 0.0012 * s.contacts.filter(k => k.relation > 50).length) {
    const k = pick(s.contacts.filter(x => x.relation > 50));
    if (k && owedOf(k) < 40) {
      k.owed = Math.max(0, (k.owed || 0) - 12);
      k.relation = clamp(k.relation + 3, 0, 100);
      addLog(s, `${k.name} t'appelle sans rien demander, juste pour prendre des nouvelles.`, 'good');
    }
  }

  // une dette relationnelle trop lourde finit toujours par se rappeler à toi
  if (!s.forcedEvent && Math.random() < 0.0016) {
    const k = s.contacts.find(x => owedOf(x) > 45 && s.day - (x.lastCall || 0) > 300);
    if (k) { k.lastCall = s.day; s.forcedEvent = 'contact_dette'; }
  }

  tickMentors(s);
  tickFriends(s);
}

/* ---------------------------------------------------------
   VOIR QUELQU'UN
   --------------------------------------------------------- */

function meetContact(id) {
  const k = S.contacts.find(x => x.id === id);
  if (!k) return;
  if (k.away) return toast(`${k.name} n'est pas en France en ce moment.`);
  if (S.day - k.lastSeen < 14) return toast("Tu l'as vu il y a peu. Laisse respirer.");
  if (!spendEnergy(8)) return;

  const cost = Math.round(20 + k.level * 1.6);
  S.money -= cost;
  k.lastSeen = S.day;

  // Un déjeuner ne crée pas une relation : il l'entretient. Ce qui la
  // fait vraiment monter, c'est d'avoir quelque chose à apporter.
  const give = 1 + S.skills.social / 90 + (socialStanding(S) - k.level) / 90;
  const gain = clamp(3.5 * give, 0.8, 11);
  k.relation = clamp(k.relation + gain, 0, 100);
  k.trust = clamp(k.trust + 1.5, 0, 100);
  k.owed = Math.max(0, (k.owed || 0) - 2);

  const kind = contactKind(k);
  const circle = circleOf(k);
  if (k.relation >= 45) {
    const obj = {};
    kind.skills.forEach(sk => obj[sk] = 0.55 + k.level / 70);
    gainSkill(obj, 1, 'field', Math.min(SKILL_CAPS.field, k.level - 6));
    addLog(S, `Déjeuner avec ${k.name} (${fmt(cost)}). Il te raconte ce qu'il a appris — ${kind.skills.map(skillName).join(', ')}.`, 'good');
  } else {
    addLog(S, `Café avec ${k.name} (${fmt(cost)}). ${circle.name.toLowerCase()}, ${Math.round(k.relation)}/100.`, 'info');
  }
  render();
}

/* Se faire présenter : la seule façon de monter plus haut que
   son propre niveau social. Ça se paie en capital relationnel. */
function askIntro(id) {
  const k = S.contacts.find(x => x.id === id);
  if (!k) return;
  if (k.relation < 55) return toast(`Il faut une vraie relation de confiance avant de demander une présentation.`);
  if (owedOf(k) >= 45) return toast(`Tu lui dois déjà trop pour lui demander ça.`);
  if (!spendEnergy(5)) return;

  k.owed = (k.owed || 0) + 14;
  const chance = clamp(0.4 + k.relation / 220 + k.trust / 300 + S.skills.social / 400, 0.25, 0.92);
  if (Math.random() > chance) {
    addLog(S, `${k.name} promet d'y penser. Tu sais ce que ça veut dire.`, 'warn');
    return render();
  }

  // il te présente quelqu'un de son monde : son niveau, à peu près
  const lvl = clamp(Math.round(k.level + rand(-8, 14)), 10, 99);
  const nk = makeContact(lvl - 12);
  nk.level = lvl;
  nk.relation = 26 + Math.round(k.relation / 8);       // une présentation vaut mieux qu'une carte de visite
  nk.trust = 58;
  nk.metWhere = `présenté par ${k.name}`;
  nk.introBy = k.id;
  S.contacts.push(nk);
  addLog(S, `${k.name} te présente ${nk.name} — ${contactKind(nk).name.toLowerCase()}, niveau ${nk.level}. Tu pars avec une longueur d'avance.`, 'good');
  render();
}

/* Demander un service : efficace, et jamais gratuit. */
function askFavor(id) {
  const k = S.contacts.find(x => x.id === id);
  if (!k) return;
  const check = canAskFavor(k);
  if (!check.ok) return toast(check.why);
  if (!spendEnergy(6)) return;

  const kind = contactKind(k);
  const c = biggest(S);
  k.owed = (k.owed || 0) + 26;
  k.relation = clamp(k.relation - 6, 0, 100);
  k.favors = (k.favors || 0) + 1;
  k.lastSeen = S.day;

  if (kind.id === 'investor' && c) {
    const cash = Math.round(valuation(c) * 0.08 * (0.6 + k.level / 100));
    c.equity = +(c.equity - 0.06).toFixed(4); c.cash += cash;
    addLog(S, `${k.name} met ${fmt(cash)} dans ${c.name} contre 6%. Tu lui dois une fière chandelle.`, 'good');
  } else if (kind.id === 'recruiter' && c) {
    const cand = makeCandidate(pick(ROLES).id, 0.55 + k.level / 200);
    cand.revealed = true; c.applicants.push(cand);
    addLog(S, `${k.name} te sort ${cand.name} de son chapeau, niveau ${cand.skill}.`, 'good');
  } else if (kind.id === 'client' && c) {
    const n = Math.max(1, Math.round(capacity(c) * 0.09 * (k.level / 60)));
    c.clients += n;
    addLog(S, `${k.name} te signe ${num(n)} client${n > 1 ? 's' : ''} chez ${c.name}.`, 'good');
  } else if (kind.id === 'closer' && c) {
    c.loyalty = (c.loyalty || 1) * 1.07;
    addLog(S, `${k.name} passe deux jours avec tes commerciaux. Tes clients restent plus longtemps.`, 'good');
  } else if (kind.id === 'cto' && c) {
    c.quality = clamp(c.quality + 7 + k.level / 14, 0, 100);
    addLog(S, `${k.name} relit ton produit de fond en comble et te dit ce qui cloche.`, 'good');
  } else if (kind.id === 'marketer' && c) {
    c.stock.organic = (c.stock.organic || 0) + 0.6;
    addLog(S, `${k.name} refait ta stratégie de contenu. L'organique décolle.`, 'good');
  } else {
    S.reputation = clamp(S.reputation + 5, 0, 100);
    addLog(S, `${k.name} parle de toi en bien là où ça compte.`, 'good');
  }
  render();
}

/* Rendre service : ça coûte, et c'est exactement ce qui fait
   qu'on peut demander plus tard. */
const HELP_KINDS = [
  {
    id: 'intro', name: "Le présenter à quelqu'un", icon: 'fa-people-arrows',
    need: s => s.contacts.length >= 3,
    cost: { energy: 5 }, value: 22,
    desc: "Tu ouvres ton carnet pour lui. C'est ce qui se rend le plus facilement."
  },
  {
    id: 'conseil', name: "Lui donner un vrai coup de main", icon: 'fa-lightbulb',
    need: s => Math.max(...Object.values(s.skills)) >= 40,
    cost: { energy: 12 }, value: 30,
    desc: "Deux jours de ton temps sur son sujet. Il ne l'oubliera pas."
  },
  {
    id: 'argent', name: "Le dépanner financièrement", icon: 'fa-hand-holding-dollar',
    need: s => s.money > 20000,
    cost: { money: s => Math.round(clamp(netWorth(s) * 0.012, 3000, 90000)) }, value: 40,
    desc: "Un chèque au bon moment. Le genre de chose qui se rappelle dix ans après."
  },
  {
    id: 'client', name: "Lui envoyer un client", icon: 'fa-briefcase',
    need: s => s.companies.some(c => c.clients > 30),
    cost: { energy: 6 }, value: 26,
    desc: "Tu lui passes une affaire que tu aurais pu garder."
  }
];

function helpContact(id, helpId) {
  const k = S.contacts.find(x => x.id === id);
  const h = HELP_KINDS.find(x => x.id === helpId);
  if (!k || !h) return;
  if (!h.need(S)) return toast("Tu n'as pas encore de quoi lui rendre ce service-là.");
  if (h.cost.energy && !spendEnergy(h.cost.energy)) return;
  if (h.cost.money) {
    const m = h.cost.money(S);
    if (S.money < m) return toast(`Il te faudrait ${fmt(m)}.`);
    S.money -= m;
  }

  k.owed = Math.max(-40, (k.owed || 0) - h.value);
  k.trust = clamp(k.trust + 12, 0, 100);
  k.relation = clamp(k.relation + 6, 0, 100);
  k.lastSeen = S.day;
  k.helped = (k.helped || 0) + 1;
  S.reputation = clamp(S.reputation + 1, 0, 100);
  addHappiness(3);
  addLog(S, `Tu rends service à ${k.name} : ${h.name.toLowerCase()}. Il s'en souviendra.`, 'good');
  render();
}

/* ---------------------------------------------------------
   LES MENTORS
   Un mentor n'est pas un contact avec une grosse jauge. C'est
   quelqu'un qui accepte de te suivre, qui attend de te voir
   régulièrement, qui te fixe un objectif, et qui arrête si tu
   ne fais pas ta part.
   --------------------------------------------------------- */

const MENTOR_STYLES = [
  {
    id: 'exigeant', name: 'Exigeant', icon: 'fa-gavel',
    rhythm: 45, patience: 2, gain: 1.45, repGain: 1.2,
    line: "« Je ne te ferai pas de compliments. Tu viendras avec des chiffres, pas avec des idées. »",
    desc: "Séances rapprochées, objectifs durs, progression rapide. Il ne repasse pas les plats."
  },
  {
    id: 'socratique', name: 'Socratique', icon: 'fa-circle-question',
    rhythm: 60, patience: 3, gain: 1.15, repGain: 1,
    line: "« Je ne vais rien t'expliquer. Je vais te poser les questions que tu évites. »",
    desc: "Il ne donne jamais la réponse. On progresse moins vite, mais on ne l'oublie pas."
  },
  {
    id: 'operateur', name: 'Opérateur', icon: 'fa-screwdriver-wrench',
    rhythm: 50, patience: 3, gain: 1.3, repGain: 1,
    line: "« Montre-moi ton tableau de bord. On va regarder ça ligne par ligne. »",
    desc: "Il met les mains dedans avec toi. Ce qu'il transmet se voit tout de suite dans la boîte."
  },
  {
    id: 'financier', name: 'Financier', icon: 'fa-chart-pie',
    rhythm: 70, patience: 3, gain: 1.2, repGain: 1.35,
    line: "« Tout le reste est une conséquence. Apprends à lire un bilan et tu verras clair. »",
    desc: "Il t'apprend à raisonner en capital. Son nom ouvre des portes chez les investisseurs."
  },
  {
    id: 'bienveillant', name: 'Bienveillant', icon: 'fa-hand-holding-heart',
    rhythm: 75, patience: 4, gain: 1, repGain: 1,
    line: "« On va y aller à ton rythme. Le but, c'est que tu tiennes vingt ans, pas deux. »",
    desc: "Peu de pression, beaucoup d'écoute. Il te garde en vie quand tout va mal."
  }
];

function mentorStyle(m) { return MENTOR_STYLES.find(x => x.id === m.style) || MENTOR_STYLES[0]; }

/* Les objectifs qu'un mentor peut te fixer : ils se lisent
   dans l'état réel de la partie, et se vérifient tout seuls. */
const MENTOR_GOALS = [
  {
    id: 'premier_client', days: 150,
    ok: s => s.companies.length > 0,
    set: s => ({ label: "Décrocher tes 25 premiers clients", n: 25 }),
    done: (s, g) => s.companies.some(c => c.clients >= g.n)
  },
  {
    id: 'ca', days: 210,
    ok: s => s.companies.some(c => c.lastRevenue > 800),
    set: s => {
      const c = biggest(s);
      return { label: `Faire passer ${c.name} à ${fmt(c.lastRevenue * 2.2)} de CA mensuel`, n: Math.round(c.lastRevenue * 2.2), uid: c.uid };
    },
    done: (s, g) => { const c = s.companies.find(x => x.uid === g.uid); return c && c.lastRevenue >= g.n; }
  },
  {
    id: 'marge', days: 210,
    ok: s => s.companies.some(c => c.lastRevenue > 4000),
    set: s => { const c = biggest(s); return { label: `Rendre ${c.name} durablement rentable`, uid: c.uid }; },
    done: (s, g) => { const c = s.companies.find(x => x.uid === g.uid); return c && c.avgProfit > 0 && c.lastProfit > 0; }
  },
  {
    id: 'equipe', days: 240,
    ok: s => s.companies.length > 0,
    set: s => ({ label: "Recruter et garder trois personnes", n: 3 }),
    done: (s, g) => s.companies.some(c => c.staff.length >= g.n)
  },
  {
    id: 'delegation', days: 200,
    ok: s => s.companies.some(c => c.staff.length >= 2),
    set: s => { const c = biggest(s); return { label: `Sortir de l'opérationnel sur ${c.name}`, uid: c.uid }; },
    done: (s, g) => {
      const c = s.companies.find(x => x.uid === g.uid);
      if (!c) return false;
      const p = s.plan.find(x => x.act === 'biz' && x.ref === c.uid);
      return c.staff.length >= 3 && (!p || p.hours <= 2) && c.lastProfit > 0;
    }
  },
  {
    id: 'competence', days: 260,
    ok: s => true,
    set: s => {
      const worst = Object.entries(s.skills).sort((a, b) => a[1] - b[1])[0];
      return { label: `Monter ${skillName(worst[0])} à ${Math.min(95, Math.round(worst[1] + 22))}`, k: worst[0], n: Math.min(95, Math.round(worst[1] + 22)) };
    },
    done: (s, g) => s.skills[g.k] >= g.n
  },
  {
    id: 'sante', days: 180,
    ok: s => s.health < 70 || s.happiness < 55,
    set: s => ({ label: "Remonter ta santé et ton moral au-dessus de 70" }),
    done: (s) => s.health > 70 && s.happiness > 70
  },
  {
    id: 'reseau', days: 200,
    ok: s => true,
    set: s => ({ label: "Construire cinq relations de confiance", n: 5 }),
    done: (s, g) => s.contacts.filter(k => k.relation >= 55).length >= g.n
  },
  {
    id: 'cession', days: 400,
    ok: s => s.companies.some(c => valuation(c) > 300000),
    set: s => ({ label: "Mener une cession de bout en bout", n: s.exits.length + 1 }),
    done: (s, g) => s.exits.length >= g.n
  }
];

function isMentor(contactId) {
  return (S.mentors || []).some(m => m.contactId === contactId);
}
function mentorContact(m) { return S.contacts.find(k => k.id === m.contactId); }
function maxMentors(s = S) { return s.skills.social >= 70 ? 2 : 1; }

/* Qui peut être mentor : quelqu'un qui a déjà fait le chemin. */
function couldMentor(k) {
  return k.level >= 52 && ['mentor', 'investor', 'cto', 'marketer', 'closer', 'client'].includes(k.kind);
}

/* Est-ce qu'il accepterait ? Il regarde ce que tu vaux, ce que
   vous avez déjà vécu, et si tu as un projet qui mérite son temps. */
function mentorOdds(k) {
  if (!couldMentor(k)) return 0;
  let p = 0.05;
  p += (k.relation - 45) / 130;
  p += (k.trust - 50) / 260;
  p += S.reputation / 320;
  p += (socialStanding(S) - k.level) / 170;
  if (S.companies.length) p += 0.12;
  if (S.companies.some(c => c.lastRevenue > 5000)) p += 0.1;
  if (S.exits.length) p += 0.08;
  if (k.helped) p += 0.06 * Math.min(3, k.helped);
  if (owedOf(k) > 30) p -= 0.2;
  return clamp(p, 0, 0.9);
}

function askMentor(id) {
  const k = S.contacts.find(x => x.id === id);
  if (!k) return;
  if (isMentor(id)) return;
  if ((S.mentors || []).length >= maxMentors()) return toast(`Tu ne peux pas suivre plus de ${maxMentors()} mentor${maxMentors() > 1 ? 's' : ''} à la fois. On n'a pas le temps.`);
  if (!couldMentor(k)) return toast(`${k.name} n'a pas le parcours pour t'apprendre grand-chose.`);
  if (k.relation < 45) return toast("On ne demande pas ça à quelqu'un qu'on connaît à peine.");
  if (S.day - (k.refusedAt || -9999) < 300) return toast(`${k.name} t'a déjà dit non cette année. Laisse le temps faire.`);
  if (!spendEnergy(8)) return;

  if (Math.random() > mentorOdds(k)) {
    k.refusedAt = S.day;
    k.relation = clamp(k.relation - 3, 0, 100);
    addLog(S, `${k.name} décline : « Pas maintenant. Reviens me voir quand tu auras avancé. »`, 'warn');
    return render();
  }

  const style = pick(MENTOR_STYLES);
  S.mentors = S.mentors || [];
  const m = {
    contactId: k.id,
    style: style.id,
    since: S.day,
    sessions: 0,
    missed: 0,
    level: 1,
    nextSession: S.day + style.rhythm,
    goal: null,
    domain: contactKind(k).skills.slice()
  };
  S.mentors.push(m);
  k.relation = clamp(k.relation + 8, 0, 100);
  k.lastSeen = S.day;
  assignGoal(m);
  addHappiness(12);
  S.reputation = clamp(S.reputation + 2, 0, 100);
  addLog(S, `${k.name} accepte de te suivre. ${style.line}`, 'good');
  render();
}

function assignGoal(m) {
  const pool = MENTOR_GOALS.filter(g => g.ok(S) && (!m.goal || m.goal.id !== g.id));
  if (!pool.length) { m.goal = null; return; }
  const g = pick(pool);
  const data = g.set(S);
  m.goal = Object.assign({ id: g.id, due: S.day + g.days, given: S.day }, data);
}

function goalDef(g) { return MENTOR_GOALS.find(x => x.id === g.id); }

/* Une séance : du temps, de l'énergie, et ce qui fait vraiment
   sauter les plafonds de compétence. */
function mentorSession(contactId) {
  const m = (S.mentors || []).find(x => x.contactId === contactId);
  if (!m) return;
  const k = mentorContact(m);
  if (!k) return;
  const style = mentorStyle(m);
  if (S.day < m.nextSession - style.rhythm * 0.5)
    return toast(`Vous vous êtes vus il y a peu. Prochaine séance vers le jour ${m.nextSession}.`);
  if (!spendEnergy(14)) return;

  m.sessions++;
  m.nextSession = S.day + style.rhythm;
  k.lastSeen = S.day;
  k.relation = clamp(k.relation + 3, 0, 100);

  // c'est ici, et seulement ici, qu'on dépasse le plafond du terrain
  const obj = {};
  m.domain.forEach(sk => obj[sk] = (1.1 + k.level / 55) * style.gain * (1 + m.level * 0.12));
  gainSkill(obj, 1, 'mentor', Math.min(100, k.level + 2));

  S.reputation = clamp(S.reputation + 0.6 * style.repGain, 0, 100);
  addHappiness(4);

  // l'objectif du moment
  let extra = '';
  if (m.goal) {
    const def = goalDef(m.goal);
    if (def && def.done(S, m.goal)) {
      m.level++;
      k.relation = clamp(k.relation + 10, 0, 100);
      k.trust = clamp(k.trust + 10, 0, 100);
      addHappiness(14);
      S.reputation = clamp(S.reputation + 3, 0, 100);
      const big = {};
      m.domain.forEach(sk => big[sk] = 9 + k.level / 9);
      gainSkill(big, 1, 'mentor', Math.min(100, k.level + 2));
      addLog(S, `Objectif tenu : « ${m.goal.label} ». ${k.name} te fixe la marche suivante.`, 'good');
      assignGoal(m);
      extra = ' Objectif atteint.';
    } else if (S.day > m.goal.due) {
      m.missed++;
      k.relation = clamp(k.relation - 7, 0, 100);
      addLog(S, `${k.name} constate que « ${m.goal.label} » n'est pas tenu. Il ne le dit qu'une fois.`, 'bad');
      assignGoal(m);
    }
  } else assignGoal(m);

  addLog(S, `Séance avec ${k.name} (${style.name.toLowerCase()}). ${m.domain.map(skillName).join(', ')} progressent au-delà de ce que le terrain permet.${extra}`, 'good');
  render();
}

function endMentorship(contactId, quiet) {
  const m = (S.mentors || []).find(x => x.contactId === contactId);
  if (!m) return;
  const k = mentorContact(m);
  S.mentors = S.mentors.filter(x => x !== m);
  if (k) k.relation = clamp(k.relation - 12, 0, 100);
  if (!quiet && k) {
    addHappiness(-8);
    addLog(S, `Tu mets fin à ton accompagnement avec ${k.name}.`, 'warn');
  }
  render();
}

function tickMentors(s) {
  (s.mentors || []).slice().forEach(m => {
    const k = mentorContact(m);
    const style = mentorStyle(m);
    if (!k) { s.mentors = s.mentors.filter(x => x !== m); return; }

    // ne pas venir aux séances, c'est la seule façon sûre de le perdre
    if (s.day > m.nextSession + 40) {
      m.missed++;
      m.nextSession = s.day + style.rhythm;
      k.relation = clamp(k.relation - 5, 0, 100);
      if (m.missed >= style.patience) {
        addLog(s, `${k.name} arrête de te suivre : « Tu ne viens pas. Je préfère donner mon temps à quelqu'un qui vient. »`, 'bad');
        addHappiness(-10);
        endMentorship(m.contactId, true);
        return;
      }
      addLog(s, `${k.name} s'agace de ton absence aux séances (${m.missed}/${style.patience}).`, 'warn');
    }

    // ils vieillissent, eux aussi
    if (Math.random() < 0.00012 && m.sessions > 6) {
      addLog(s, `${k.name} prend sa retraite pour de bon. « Tu n'as plus besoin de moi. »`, 'info');
      k.relation = clamp(k.relation + 6, 0, 100);
      endMentorship(m.contactId, true);
    }
  });
}

/* ---------------------------------------------------------
   TRANSMETTRE À SON TOUR
   Quand on a de la bouteille, accompagner quelqu'un rapporte
   autre chose que de l'argent — et parfois de l'argent aussi.
   --------------------------------------------------------- */

function canMentorOthers(s = S) {
  return Math.max(...Object.values(s.skills)) >= 70 || s.exits.length > 0;
}

function takeApprentice() {
  if (!canMentorOthers()) return toast("Il faut avoir vraiment fait ses preuves avant de prétendre transmettre.");
  S.mentoring = S.mentoring || [];
  if (S.mentoring.length >= 3) return toast("Trois personnes à suivre, c'est déjà beaucoup.");
  if (!spendEnergy(10)) return;
  const id = 'a' + Math.random().toString(36).slice(2, 8);
  const a = {
    id, name: randomName(), look: lookFor(id),
    since: S.day, level: Math.round(rand(12, 34)),
    trust: 55, sessions: 0, lastSeen: S.day,
    field: pick(['business', 'marketing', 'tech', 'social', 'finance'])
  };
  S.mentoring.push(a);
  addLog(S, `Tu acceptes d'accompagner ${a.name}, qui démarre. Ça t'oblige à formuler ce que tu sais.`, 'good');
  render();
}

function apprenticeSession(id) {
  const a = (S.mentoring || []).find(x => x.id === id);
  if (!a) return;
  if (S.day - a.lastSeen < 40) return toast("Vous vous êtes vus récemment.");
  if (!spendEnergy(8)) return;
  a.lastSeen = S.day; a.sessions++;
  a.level = clamp(a.level + rand(2, 6), 0, 99);
  a.trust = clamp(a.trust + 6, 0, 100);

  // expliquer, c'est comprendre deux fois
  gainSkill({ social: 0.8, [a.field]: 0.5 }, 1, 'field');
  S.reputation = clamp(S.reputation + 0.8, 0, 100);
  addHappiness(5);

  // un jour, ils réussissent
  if (a.level > 70 && Math.random() < 0.2) {
    const k = makeContact(a.level - 10);
    k.name = a.name; k.look = a.look; k.level = a.level;
    k.relation = 72; k.trust = 90; k.metWhere = "tu l'as formé";
    S.contacts.push(k);
    S.mentoring = S.mentoring.filter(x => x !== a);
    addLog(S, `${a.name} vole de ses propres ailes — et entre dans ton carnet en tant qu'égal.`, 'good');
  } else {
    addLog(S, `Séance avec ${a.name}. Lui expliquer t'oblige à y voir clair.`, 'info');
  }
  render();
}

/* Une rencontre qui prend : on part d'une vraie personne, avec son
   caractère et ses exigences. */
function startRelationship(s, where) {
  const p = makePartner();
  p.metWhere = where || 'rencontré un jour';
  initFamily(s).partner = p;
  if (!s.flags.includes('couple')) s.flags.push('couple');
  if (!planEntry('family')) setPlan('family', 1);
  addHappiness(18);
  addLog(s, `Tu es en couple avec ${p.name} (${partnerTrait(p).name.toLowerCase()}, ${where}). Donne-lui des heures dans ton planning.`, 'good');
  return p;
}

/* ---------------------------------------------------------
   LES AMIS
   Des gens qui ne servent à rien, et sans qui on ne tient pas.
   --------------------------------------------------------- */

const FRIEND_VIBES = [
  { id: 'fidele', name: 'Fidèle', drift: 0.55, joy: 1.0, envy: 0.25,
    desc: "Il sera encore là dans vingt ans, même si tu disparais deux fois." },
  { id: 'fetard', name: 'Fêtard', drift: 1.15, joy: 1.4, envy: 0.5,
    desc: "Excellent pour décompresser, moins pour les conseils sérieux." },
  { id: 'ambitieux', name: 'Ambitieux', drift: 1.1, joy: 0.9, envy: 1.5,
    desc: "Il te pousse — et il compare. Ta réussite ne le laisse pas indifférent." },
  { id: 'pose', name: 'Posé', drift: 0.7, joy: 1.15, envy: 0.2,
    desc: "Il te ramène sur terre sans jamais te rabaisser." },
  { id: 'franc', name: 'Franc', drift: 0.95, joy: 1.05, envy: 0.4,
    desc: "Le seul qui te dise en face que tu es en train de te planter." }
];

function friendVibe(f) { return FRIEND_VIBES.find(v => v.id === f.vibe) || FRIEND_VIBES[0]; }

function makeFriend(origin) {
  const id = 'f' + Math.random().toString(36).slice(2, 8);
  return {
    id, name: randomName(), look: lookFor(id),
    vibe: pick(FRIEND_VIBES).id,
    closeness: origin === 'enfance' ? 78 : 45,
    since: S ? S.day : 0,
    lastSeen: S ? S.day : 0,
    envy: 0,
    origin: origin || 'rencontre',
    helped: 0
  };
}

function initFriends(s) {
  if (!s.friends) {
    s.friends = [];
    // on ne commence jamais seul : deux amis d'avant
    const n = 2;
    for (let i = 0; i < n; i++) s.friends.push(makeFriend('enfance'));
    // on reprend l'ancien indicateur global s'il existait
    // reprise d'une sauvegarde d'avant : on convertit l'ancien compteur global
    const old = s.family && typeof s.family.friends === 'number' ? s.family.friends : null;
    if (old !== null && s.day > 0) s.friends.forEach(f => f.closeness = clamp(old, 20, 90));
  }
  return s.friends;
}

function friendsScore(s = S) {
  const list = initFriends(s);
  if (!list.length) return 0;
  return clamp(list.reduce((a, f) => a + f.closeness, 0) / (list.length * 0.9 + 1.6), 0, 100);
}

function tickFriends(s) {
  const list = initFriends(s);
  const social = (s.plan.find(p => p.act === 'social') || {}).hours || 0;
  const overwork = Math.max(0, plannedHours(s) - CONFIG.baseHours);
  const share = list.length ? social / list.length : 0;

  list.forEach(f => {
    const v = friendVibe(f);
    // il faut du temps, et le temps manque toujours
    // Le temps passé entretient l'amitié, mais la proximité ne se décrète
    // pas : passé un certain point, il faut vivre des choses ensemble.
    let d = (share - 0.3) * 0.10;
    if (d > 0) d *= Math.max(0.1, 1 - f.closeness / 92);
    d -= overwork * 0.008 * v.drift + v.drift * 0.008;
    f.closeness = clamp(f.closeness + d, 0, 100);

    // l'écart de vie finit par peser
    const gap = clamp(Math.log10(Math.max(1, netWorth(s))) - 5, 0, 3.2);
    if (share < 0.3) f.envy = clamp(f.envy + gap * 0.012 * v.envy, 0, 100);
    else f.envy = clamp(f.envy - 0.04, 0, 100);

    if (f.closeness > 55) addHappiness((f.closeness - 55) / 100 * 0.045 * v.joy);
    else if (f.closeness < 22) addHappiness(-(22 - f.closeness) / 100 * 0.05);
    if (f.closeness > 70) s.energy = clamp(s.energy + 0.06, 0, energyCeiling(s));
  });

  /* La solitude. Ce n'est pas une punition arbitraire : quand il n'y a
     personne à appeler, le moral descend tous les jours, et plus vite
     encore si l'on n'a ni conjoint ni amis ni relation de confiance. */
  const close = list.filter(f => f.closeness > 35).length;
  const warm = s.contacts.filter(k => k.relation >= 40 && !k.away).length;
  const partner = s.family && s.family.partner ? 1 : 0;
  const attaches = close + Math.min(2, warm * 0.5) + partner * 1.5;
  if (attaches < 2.5) {
    const isolation = (2.5 - attaches) / 2.5;                 // 0 → 1
    addHappiness(-0.17 * isolation);
    s.energy = clamp(s.energy - 0.05 * isolation, 0, energyCeiling(s));
    s.lonelyDays = (s.lonelyDays || 0) + 1;
    if (s.lonelyDays % 180 === 0) {
      addLog(s, attaches < 0.6
        ? `Tu n'as appelé personne depuis des mois. Personne ne t'a appelé non plus.`
        : `Tu te sens seul. Il faudrait voir du monde, vraiment.`, 'warn');
    }
  } else s.lonelyDays = 0;

  // Un ami proche voit quand ça ne va pas, et il appelle. C'est
  // exactement à ça que servent les gens qu'on garde.
  if (s.happiness < 26 && Math.random() < 0.01) {
    const close = list.filter(f => f.closeness > 60);
    if (close.length) {
      const f = pick(close);
      addHappiness(9);
      s.energy = clamp(s.energy + 12, 0, energyCeiling(s));
      f.lastSeen = s.day;
      addLog(s, `${f.name} a senti que ça n'allait pas et a débarqué sans prévenir. Ça remet debout.`, 'good');
    }
  }

  /* Les moments de relation ne tombent pas au hasard du tirage mensuel :
     ils arrivent quand la situation les appelle. */
  if (!s.forcedEvent) {
    const jaloux = list.find(f => f.envy > 50 && s.day - (f.lastEvent || 0) > 300);
    const galere = list.find(f => f.closeness > 40 && s.day - (f.lastEvent || 0) > 500 && Math.random() < 0.0009);
    if (jaloux && Math.random() < 0.004) { jaloux.lastEvent = s.day; s.forcedEvent = 'ami_jaloux'; }
    else if (galere) { galere.lastEvent = s.day; s.forcedEvent = 'ami_galere'; }
  }

  // on perd des amis, et ça se voit rarement venir
  list.slice().forEach(f => {
    if (f.closeness <= 0.5 || f.envy >= 92) {
      s.friends = s.friends.filter(x => x !== f);
      addHappiness(-9);
      addLog(s, f.envy >= 92
        ? `${f.name} coupe les ponts. « Tu n'es plus le même. » Il n'a peut-être pas tort.`
        : `${f.name} a fini par ne plus rappeler. Vous ne vous voyiez plus depuis des années.`, 'bad');
    }
  });

  // et on en rencontre, quand on sort
  if (social > 0 && Math.random() < social * 0.0007 && s.friends.length < 6) {
    const f = makeFriend('rencontre');
    s.friends.push(f);
    addLog(s, `Tu sympathises avec ${f.name}. Ce n'est encore rien, mais ça peut le devenir.`, 'good');
  }
}

function seeFriend(id) {
  const f = (S.friends || []).find(x => x.id === id);
  if (!f) return;
  if (S.day - f.lastSeen < 10) return toast("Vous vous êtes vus il y a quelques jours.");
  if (!spendEnergy(6)) return;
  const cost = Math.round(clamp(totalLifeCost(S) * 0.03, 25, 400));
  S.money -= cost;
  f.lastSeen = S.day;
  const v = friendVibe(f);
  f.closeness = clamp(f.closeness + 9, 0, 100);
  f.envy = clamp(f.envy - 12, 0, 100);
  addHappiness(6 * v.joy);
  S.energy = clamp(S.energy + 4, 0, energyCeiling(S));
  addLog(S, `Soirée avec ${f.name} (${fmt(cost)}). ${v.id === 'franc' ? "Il t'a dit deux vérités que personne d'autre ne te dit." : "Ça fait du bien."}`, 'good');
  render();
}

/* Un ami qu'on aide reste un ami. */
function helpFriend(id) {
  const f = (S.friends || []).find(x => x.id === id);
  if (!f) return;
  const cost = Math.round(clamp(netWorth(S) * 0.008, 800, 60000));
  if (S.money < cost) return toast(`Il te faudrait ${fmt(cost)} pour l'aider vraiment.`);
  if (!spendEnergy(5)) return;
  S.money -= cost;
  f.closeness = clamp(f.closeness + 16, 0, 100);
  f.envy = clamp(f.envy - 35, 0, 100);
  f.helped = (f.helped || 0) + 1;
  addHappiness(7);
  addLog(S, `Tu sors ${f.name} d'une mauvaise passe (${fmt(cost)}). Il ne l'oubliera pas.`, 'good');
  render();
}

/* Faire entrer un ami dans la boîte : loyal, mais on ne
   licencie pas un ami. */
function hireFriend(id, uid) {
  const f = (S.friends || []).find(x => x.id === id);
  const c = S.companies.find(x => x.uid === uid);
  if (!f || !c) return;
  if (f.closeness < 55) return toast("Vous n'êtes pas assez proches pour travailler ensemble.");
  if (f.hired) return toast(`${f.name} travaille déjà avec toi.`);
  const role = pick(ROLES).id;
  const cand = makeCandidate(role, 0.35 + f.closeness / 200);
  cand.name = f.name;
  cand.trait = 'loyal';
  cand.ask = Math.round(cand.ask * 0.88);
  const e = hireFrom(cand);
  e.friendId = f.id;
  e.morale = 90;
  c.staff.push(e);
  f.hired = c.uid;
  f.closeness = clamp(f.closeness + 6, 0, 100);
  addLog(S, `${f.name} rejoint ${c.name} comme ${getRole(role).name.toLowerCase()}. Loyal, motivé — et impossible à licencier sans casse.`, 'good');
  render();
}
