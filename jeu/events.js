/* =========================================================
   EMPIRE — Événements
   Chaque événement propose des choix aux conséquences
   mécaniques directes : trésorerie, équipe, canaux
   d'acquisition, prix, réputation, contacts.

   cond(s)  : condition d'apparition
   effects  : effets simples appliqués automatiquement
   custom(s): effets sur les structures du jeu
   ========================================================= */

/* Helpers utilisés par les événements */
function anyStaff(c, roleId) {
  const pool = roleId ? c.staff.filter(e => e.role === roleId) : c.staff;
  return pool.length ? pick(pool) : null;
}
function bestStaff(c) {
  if (!c.staff.length) return null;
  return c.staff.slice().sort((a, b) => b.skill - a.skill)[0];
}
function allStaff(s) {
  return s.companies.flatMap(c => c.staff.map(e => ({ e, c })));
}
function totalStaff(s) {
  return s.companies.reduce((a, c) => a + c.staff.length, 0);
}

const EVENTS = [

  /* ===================== VIE PERSONNELLE ===================== */

  {
    id: 'ami_projet', title: "Un ami te propose un projet",
    text: "Karim débarque chez toi à 23h : « J'ai LE concept. Il me faut 3 000€ et ton cerveau. » Il a déjà fait deux flops.",
    cond: s => s.money > 3500 && s.day > 90,
    choices: [
      {
        label: "Investir 3 000€", effects: { money: -3000 }, custom: s => {
          if (Math.random() < 0.35) { s.money += 11000; addLog(s, "Le projet de Karim marche : il te rend 11 000€.", 'good'); }
          else { addHappiness(-6); addLog(s, "Le projet de Karim a coulé en 4 mois. Argent perdu.", 'bad'); }
        }
      },
      { label: "Refuser poliment", effects: { happiness: -2, reputation: -1 } },
      {
        label: "L'aider gratuitement le week-end", effects: { energy: -10, reputation: 3 },
        custom: s => { gainSkill({ business: 1.5 }, 1, 'field'); s.contacts.push(makeContact(25)); addLog(s, "Tu y gagnes un contact et un peu de métier.", 'info'); }
      }
    ]
  },
  {
    id: 'burnout', title: "Ton corps lâche",
    text: "Tu te réveilles avec le cœur qui bat trop vite. Ça fait des mois que tu dors mal et que tu carbures au café.",
    cond: s => s.energy < 25 || s.health < 45,
    choices: [
      { label: "Lever le pied deux semaines", effects: { energy: 40, health: 12, happiness: 6, money: -800 } },
      {
        label: "Ignorer et continuer", effects: { health: -14, energy: -8 },
        custom: s => {
          if (s.health < 25) { s.energy = 20; s.money -= 2500; addLog(s, "Tu finis aux urgences. Trois semaines d'arrêt forcé.", 'bad'); }
        }
      },
      {
        label: "Réduire ton planning de 3 heures par jour", custom: s => {
          s.plan.forEach(p => { if (p.hours > 1 && p.act !== 'rest' && p.act !== 'sport') p.hours = Math.max(1, p.hours - 1); });
          addHappiness(4); s.health += 6;
          addLog(s, "Tu allèges durablement tes journées.", 'info');
        }
      }
    ]
  },
  {
    id: 'rencontre', title: "Tu rencontres quelqu'un",
    text: null,
    dynamic: s => {
      const p = makePartner();
      const t = partnerTrait(p);
      return {
        text: `Un dîner, une conversation qui dure jusqu'à 3 h du matin. ${p.name} — ${t.desc.toLowerCase()} Ça fait longtemps que ça ne t'était pas arrivé.`,
        ref: { p }
      };
    },
    cond: s => !initFamily(s).partner && s.happiness > 35 && s.day > 180,
    choices: [
      {
        label: "Se lancer dans la relation", custom: (s, ref) => {
          initFamily(s).partner = ref.p;
          if (!s.flags.includes('couple')) s.flags.push('couple');
          if (!planEntry('family')) setPlan('family', 1);
          addHappiness(18);
          addLog(s, `Tu es en couple avec ${ref.p.name}. Pense à lui donner des heures dans ton planning.`, 'good');
        }
      },
      {
        label: "Rester concentré sur le business", effects: { happiness: -6 },
        custom: s => { s.focusBonus = (s.focusBonus || 0) + 0.05; addLog(s, "Tu choisis le travail. +5% d'efficacité sur tout ce que tu fais.", 'info'); }
      }
    ]
  },
  {
    id: 'enfant', title: "Un enfant arrive",
    text: "Le test est positif. Tout change.",
    cond: s => initFamily(s).partner && initFamily(s).partner.relation > 45 && s.age >= 25 && initFamily(s).children.length < 3,
    global: true, cooldown: 1080,
    choices: [
      { label: "Fonder une famille", custom: s => haveChild() },
      {
        label: "Ce n'est pas le moment", custom: s => {
          const f = initFamily(s);
          if (f.partner) f.partner.relation = clamp(f.partner.relation - 22, 0, 100);
          addHappiness(-8);
          addLog(s, "Décision prise à deux, mal vécue par un seul.", 'warn');
        }
      }
    ]
  },
  {
    id: 'crise_couple', title: "La conversation qu'on repousse",
    text: null,
    dynamic: s => {
      const p = initFamily(s).partner;
      if (!p) return null;
      return { text: `${p.name} t'attend dans le salon, sans téléphone, sans télé. « On ne se voit plus. Je ne sais même pas ce que tu fais de tes journées. Dis-moi ce qu'on fait. »`, ref: { p } };
    },
    cond: s => { const p = initFamily(s).partner; return p && p.relation < 30; },
    global: true, cooldown: 300,
    choices: [
      {
        label: "Lever le pied pendant un moment", custom: (s, ref) => {
          setPlan('family', Math.min(5, familyHours() + 3));
          s.plan.forEach(pl => { if (pl.act === 'biz' && pl.hours > 2) pl.hours -= 2; });
          ref.p.relation = clamp(ref.p.relation + 28, 0, 100);
          addLog(s, `Tu réorganises tes journées autour de ${ref.p.name}. Le travail attendra.`, 'good');
        }
      },
      {
        label: "Promettre que ça ira mieux après", custom: (s, ref) => {
          ref.p.relation = clamp(ref.p.relation + 8, 0, 100);
          ref.p.promises = (ref.p.promises || 0) + 1;
          if (ref.p.promises >= 3) {
            addLog(s, `${ref.p.name} a déjà entendu ça deux fois. Cette fois, il n'y croit plus.`, 'bad');
            ref.p.relation = clamp(ref.p.relation - 20, 0, 100);
          } else {
            addLog(s, "Tu gagnes du temps. Pas la paix.", 'warn');
          }
        }
      },
      {
        label: "Reconnaître que ça ne marche plus", custom: s => breakUp()
      }
    ]
  },
  {
    id: 'enfant_absent', title: "Ton enfant ne te raconte plus rien",
    text: null,
    dynamic: s => {
      const k = initFamily(s).children.find(x => x.bond < 35 && childAge(x) >= 6);
      if (!k) return null;
      return { text: `${k.name} a ${childAge(k)} ans. Sa maîtresse t'a appelé : il a écrit une rédaction sur « quelqu'un que j'admire » et il a choisi son entraîneur de foot.`, ref: { k } };
    },
    cond: s => initFamily(s).children.some(k => k.bond < 35 && childAge(k) >= 6),
    global: true, cooldown: 540,
    choices: [
      {
        label: "Bloquer du temps pour lui, vraiment", custom: (s, ref) => {
          setPlan('family', familyHours() + 2);
          ref.k.bond = clamp(ref.k.bond + 25, 0, 100);
          addHappiness(6);
          addLog(s, `Tu réserves deux heures par jour aux tiens. ${ref.k.name} l'a remarqué tout de suite.`, 'good');
        }
      },
      {
        label: "Lui offrir quelque chose de cher", custom: (s, ref) => {
          s.money -= 3000;
          ref.k.bond = clamp(ref.k.bond + 6, 0, 100);
          addLog(s, "Il est content deux jours. Ce n'était pas la question.", 'warn');
        }
      },
      { label: "Il comprendra plus tard", effects: { happiness: -9 } }
    ]
  },
  {
    id: 'enfant_boite', title: "Ton enfant veut travailler avec toi",
    text: null,
    dynamic: s => {
      const k = initFamily(s).children.find(x => childAge(x) >= 18 && x.bond > 55);
      if (!k || !s.companies.length) return null;
      return { text: `${k.name} a ${childAge(k)} ans et te demande d'entrer dans l'entreprise. « Je veux apprendre avec toi. »`, ref: { k, c: biggest(s) } };
    },
    cond: s => initFamily(s).children.some(k => childAge(k) >= 18 && k.bond > 55) && s.companies.length > 0,
    choices: [
      {
        label: "Le prendre dans l'équipe", custom: (s, ref) => {
          const cand = makeCandidate(pick(ROLES).id, 0.25);
          cand.name = ref.k.name; cand.look = ref.k.look; cand.trait = 'debutant'; cand.revealed = true; cand.ask = 1800;
          ref.c.applicants.push(cand);
          ref.k.bond = clamp(ref.k.bond + 15, 0, 100);
          addLog(s, `${ref.k.name} postule chez ${ref.c.name}. À toi de voir s'il a le niveau.`, 'good');
        }
      },
      {
        label: "Lui dire d'aller faire ses armes ailleurs", custom: (s, ref) => {
          ref.k.bond = clamp(ref.k.bond - 10, 0, 100);
          addLog(s, "Il encaisse mal, mais il te donnera peut-être raison dans dix ans.", 'info');
        }
      }
    ]
  },
  {
    id: 'vieil_ami', title: "Un ancien ami te reproche ta réussite",
    text: "« T'as changé. » Trois mots dans un message vocal de deux minutes.",
    cond: s => netWorth(s) > 200000,
    choices: [
      { label: "Prendre le temps de le rappeler", effects: { happiness: 6, energy: -6 } },
      { label: "Laisser filer", effects: { happiness: -7 } },
      {
        label: "Lui proposer un job", effects: { money: -2000, happiness: 4, reputation: 2 },
        custom: s => {
          const c = biggest(s);
          if (c) { const cand = makeCandidate(pick(ROLES).id, 0.35); cand.name = 'Ton ami d\'enfance'; cand.trait = 'loyal'; cand.revealed = true; c.applicants.push(cand); addLog(s, `Il postule chez ${c.name}. À toi de voir.`, 'info'); }
        }
      }
    ]
  },
  {
    id: 'depression', title: "Le vide",
    text: "Tu as atteint des objectifs dont tu rêvais à 20 ans, et tu ne ressens rien.",
    cond: s => netWorth(s) > 500000 && s.happiness < 35,
    choices: [
      { label: "Voir un psy et ralentir", effects: { money: -3000, happiness: 20, energy: 10 } },
      { label: "Te fixer un objectif encore plus grand", effects: { happiness: -5 }, custom: s => { s.focusBonus = (s.focusBonus || 0) + 0.1; addLog(s, "Tu remets une pièce dans la machine. +10% d'efficacité.", 'warn'); } },
      { label: "Donner 100 000€ à une association", effects: { money: -100000, happiness: 25, reputation: 15 } }
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

  /* ===================== ARGENT & FISCALITÉ ===================== */

  {
    id: 'controle_fiscal', title: "Contrôle fiscal",
    text: "Un courrier recommandé. L'administration veut vérifier trois exercices de tes sociétés.",
    cond: s => s.companies.length > 0 && s.day > 420,
    choices: [
      { label: "Prendre un bon fiscaliste (6 000€)", effects: { money: -6000, happiness: -4 } },
      {
        label: "Gérer ça toi-même", custom: s => {
          if (s.skills.finance > 45) { gainSkill({ finance: 2 }, 1, 'field'); addLog(s, "Ta compta était carrée : redressement à zéro.", 'good'); }
          else { const m = 8000 + Math.round(Math.random() * 22000); s.money -= m; addHappiness(-10); addLog(s, `Redressement de ${fmt(m)}. Douloureux.`, 'bad'); }
        }
      }
    ]
  },
  {
    id: 'impots', title: "Régularisation d'impôts",
    text: "L'avis d'imposition tombe. Tu avais oublié de provisionner.",
    cond: s => s.money > 60000,
    choices: [
      {
        label: "Payer", custom: s => {
          const base = Math.round(s.money * 0.09);
          const t = Math.round(base * (1 - s.skills.finance / 320));
          s.money -= t;
          addLog(s, `${fmt(t)} d'impôts prélevés${s.skills.finance > 40 ? " (ton niveau en finance a limité la casse)" : ''}.`, 'warn');
        }
      }
    ]
  },
  {
    id: 'arnaque', title: "Une opportunité trop belle",
    text: "Un « investisseur » promet 30% de rendement mensuel garanti. Il montre des captures d'écran.",
    cond: s => s.money > 20000,
    choices: [
      {
        label: "Investir 20 000€", custom: s => {
          s.money -= 20000;
          if (s.skills.finance > 55 && Math.random() < 0.5) { s.money += 20000; addLog(s, "Tu flaires l'arnaque à temps et récupères ton argent.", 'good'); }
          else { addHappiness(-10); gainSkill({ finance: 3 }, 1, 'field'); addLog(s, "C'était une arnaque. 20 000€ envolés.", 'bad'); }
        }
      },
      { label: "Refuser", custom: s => gainSkill({ finance: 0.8 }, 1, 'field') }
    ]
  },
  {
    id: 'panne_cash', title: "Trésorerie tendue",
    text: "Un gros client paie à 90 jours. Tes salaires tombent dans six jours.",
    cond: s => s.companies.some(c => c.cash < 3000 && c.staff.length > 0),
    choices: [
      { label: "Découvert bancaire", custom: s => { s.debt += 20000; s.money += 20000; addLog(s, "20 000€ de découvert accordé. Les intérêts courent.", 'warn'); } },
      { label: "Affacturage (perte de 8%)", custom: s => { const c = biggest(s); if (c) { c.cash += 12000; s.money -= 960; addLog(s, "Créances cédées, trésorerie renflouée.", 'info'); } } },
      {
        label: "Retarder les salaires", custom: s => {
          const c = s.companies.find(x => x.staff.length > 0);
          if (c) { c.staff.forEach(e => e.morale = clamp(e.morale - 28, 0, 100)); addLog(s, `${c.name} : moral de l'équipe au plus bas. Certains vont partir.`, 'bad'); }
          s.reputation = clamp(s.reputation - 6, 0, 100);
        }
      }
    ]
  },

  /* ===================== ÉQUIPE & TRAVAIL ===================== */

  {
    id: 'augmentation', title: "Demande d'augmentation",
    text: null,
    dynamic: s => {
      const all = allStaff(s); if (!all.length) return null;
      const { e, c } = pick(all);
      return {
        text: `${e.name}, ${ROLES.find(r => r.id === e.role).name.toLowerCase()} chez ${c.name} depuis ${Math.floor(e.days / 30)} mois, demande +15% de salaire. Il gagne ${fmt(e.salary)}.`,
        ref: { e, c }
      };
    },
    cond: s => allStaff(s).some(x => x.e.days > 200),
    choices: [
      {
        label: "Accorder l'augmentation", custom: (s, ref) => {
          ref.e.salary = Math.round(ref.e.salary * 1.15);
          ref.e.morale = clamp(ref.e.morale + 22, 0, 100);
          addLog(s, `${ref.e.name} passe à ${fmt(ref.e.salary)}. Il est soulagé.`, 'info');
        }
      },
      {
        label: "Refuser", custom: (s, ref) => {
          ref.e.morale = clamp(ref.e.morale - 25, 0, 100);
          addLog(s, `${ref.e.name} encaisse mal le refus.`, 'warn');
        }
      },
      {
        label: "Proposer un intéressement aux résultats", custom: (s, ref) => {
          ref.e.variable = true;
          ref.e.morale = clamp(ref.e.morale + 14, 0, 100);
          addLog(s, `${ref.e.name} passe au variable : payé moins fixe, davantage s'il performe.`, 'good');
          ref.e.salary = Math.round(ref.e.salary * 0.9);
        }
      }
    ]
  },
  {
    id: 'debauchage', title: "Un concurrent débauche ton meilleur élément",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => x.staff.length > 1); if (!c) return null;
      const e = bestStaff(c);
      return { text: `Un concurrent propose 40% de plus à ${e.name} (niveau ${e.skill}). Il te l'annonce un vendredi soir.`, ref: { e, c } };
    },
    cond: s => s.companies.some(c => c.staff.length > 1),
    choices: [
      {
        label: "Surenchérir", custom: (s, ref) => {
          ref.e.salary = Math.round(ref.e.salary * 1.42);
          ref.e.morale = clamp(ref.e.morale + 18, 0, 100);
          addLog(s, `${ref.e.name} reste, à ${fmt(ref.e.salary)}. Les autres vont l'apprendre.`, 'warn');
          ref.c.staff.forEach(x => { if (x !== ref.e) x.morale = clamp(x.morale - 8, 0, 100); });
        }
      },
      {
        label: "Le laisser partir", custom: (s, ref) => {
          ref.c.staff = ref.c.staff.filter(x => x !== ref.e);
          addLog(s, `${ref.e.name} quitte ${ref.c.name}. Un trou dans l'équipe.`, 'bad');
        }
      },
      {
        label: "Lui offrir 2% du capital", custom: (s, ref) => {
          ref.c.equity -= 0.02;
          ref.e.morale = 100; ref.e.equity = 0.02;
          addLog(s, `${ref.e.name} devient associé de ${ref.c.name} et se surpasse.`, 'good');
        }
      }
    ]
  },
  {
    id: 'toxique', title: "Une ambiance qui se dégrade",
    text: null,
    dynamic: s => {
      const found = allStaff(s).find(x => x.e.trait === 'toxique');
      if (!found) return null;
      return { text: `Trois personnes sont venues te voir séparément au sujet de ${found.e.name}. Il performe, mais il détruit l'équipe autour de lui.`, ref: found };
    },
    cond: s => allStaff(s).some(x => x.e.trait === 'toxique'),
    choices: [
      {
        label: "Le licencier immédiatement", custom: (s, ref) => {
          ref.c.cash -= ref.e.salary * 2;
          ref.c.staff = ref.c.staff.filter(x => x !== ref.e);
          ref.c.staff.forEach(x => x.morale = clamp(x.morale + 16, 0, 100));
          addLog(s, `${ref.e.name} est parti. L'équipe respire.`, 'good');
        }
      },
      {
        label: "Le recadrer", custom: (s, ref) => {
          if (s.skills.social > 50) { ref.e.trait = 'rigoureux'; addLog(s, `Ton recadrage porte : ${ref.e.name} change d'attitude.`, 'good'); }
          else { ref.e.morale = clamp(ref.e.morale - 15, 0, 100); addLog(s, `Il t'écoute poliment et ne change rien.`, 'warn'); }
        }
      },
      {
        label: "Ne rien faire, il est trop bon", custom: (s, ref) => {
          ref.c.staff.forEach(x => { if (x !== ref.e) x.morale = clamp(x.morale - 14, 0, 100); });
          addLog(s, "L'équipe comprend que tu tolères tout tant que les chiffres rentrent.", 'bad');
        }
      }
    ]
  },
  {
    id: 'cv_mensonge', title: "Un CV trop beau pour être vrai",
    text: null,
    dynamic: s => {
      const all = allStaff(s).filter(x => x.e.days < 120 && x.e.skill > 55);
      if (!all.length) return null;
      const f = pick(all);
      return { text: `Trois mois après son arrivée, tu découvres que ${f.name || f.e.name} a largement enjolivé son CV. Son vrai niveau est loin de ce qu'il annonçait.`, ref: f };
    },
    cond: s => allStaff(s).some(x => x.e.days < 120 && x.e.skill > 55),
    choices: [
      {
        label: "Rupture de période d'essai", custom: (s, ref) => {
          ref.c.staff = ref.c.staff.filter(x => x !== ref.e);
          addLog(s, `${ref.e.name} est remercié. Il faut recommencer le recrutement.`, 'warn');
        }
      },
      {
        label: "Le former sur le tas", custom: (s, ref) => {
          ref.e.skill = Math.max(15, ref.e.skill - 25);
          ref.e.trait = 'debutant';
          ref.e.salary = Math.round(ref.e.salary * 0.8);
          ref.e.morale = clamp(ref.e.morale + 20, 0, 100);
          addLog(s, `Salaire ajusté, poste ajusté. ${ref.e.name} a compris sa chance et progressera vite.`, 'info');
        }
      }
    ]
  },
  {
    id: 'burnout_salarie', title: "Un salarié craque",
    text: null,
    dynamic: s => {
      const all = allStaff(s).filter(x => x.e.morale < 40);
      if (!all.length) return null;
      const f = pick(all);
      return { text: `${f.e.name} ne s'est pas présenté ce matin. Son médecin l'arrête six semaines. Tu savais que ça n'allait pas.`, ref: f };
    },
    cond: s => allStaff(s).some(x => x.e.morale < 40),
    choices: [
      {
        label: "Le remplacer temporairement (agence, 8 000€)", custom: (s, ref) => {
          s.money -= 8000; ref.e.morale = clamp(ref.e.morale + 30, 0, 100);
          addLog(s, "Un intérimaire assure l'intérim. Ça coûte cher mais rien ne s'arrête.", 'info');
        }
      },
      {
        label: "Répartir sa charge sur l'équipe", custom: (s, ref) => {
          ref.c.staff.forEach(x => x.morale = clamp(x.morale - 12, 0, 100));
          addLog(s, "L'équipe absorbe. Le moral général baisse d'un cran.", 'warn');
        }
      },
      {
        label: "Revoir l'organisation en profondeur", custom: (s, ref) => {
          ref.c.staff.forEach(x => x.morale = clamp(x.morale + 20, 0, 100));
          ref.c.cash -= 6000;
          addLog(s, `${ref.c.name} : réorganisation coûteuse, mais l'équipe repart de l'avant.`, 'good');
        }
      }
    ]
  },
  {
    id: 'stagiaires', title: "Une école te propose des stagiaires",
    text: "Une école de commerce cherche des entreprises d'accueil. Peu chers, peu expérimentés, très motivés.",
    cond: s => s.companies.some(c => c.staff.length >= 2),
    choices: [
      {
        label: "En prendre deux", custom: s => {
          const c = biggest(s); if (!c) return;
          for (let i = 0; i < 2; i++) {
            const cand = makeCandidate(pick(['sales', 'marketer', 'support']).id || 'sales', 0.1);
            cand.trait = 'debutant'; cand.ask = 700; cand.revealed = true;
            c.applicants.push(cand);
          }
          addLog(s, `Deux stagiaires postulent chez ${c.name} à 700€.`, 'info');
        }
      },
      { label: "Pas le temps de former", effects: {} }
    ]
  },
  {
    id: 'chasseur', title: "Un cabinet de recrutement te démarche",
    text: "« Je peux vous sortir trois profils sérieux en une semaine. Mes honoraires : 20% du salaire annuel. »",
    cond: s => s.companies.some(c => Object.keys(c.openings).length > 0),
    choices: [
      {
        label: "Tester le cabinet (12 000€)", custom: s => {
          const c = s.companies.find(x => Object.keys(x.openings).length > 0); if (!c) return;
          s.money -= 12000;
          const roles = Object.keys(c.openings);
          for (let i = 0; i < 3; i++) {
            const cand = makeCandidate(pick(roles), 0.75);
            cand.revealed = true;
            c.applicants.push(cand);
          }
          addLog(s, `Trois profils sérieux et déjà évalués arrivent chez ${c.name}.`, 'good');
        }
      },
      { label: "Continuer à recruter seul", effects: {} },
      {
        label: "Négocier ses honoraires", custom: s => {
          const c = s.companies.find(x => Object.keys(x.openings).length > 0); if (!c) return;
          const price = s.skills.social > 45 ? 7000 : 12000;
          s.money -= price;
          const roles = Object.keys(c.openings);
          for (let i = 0; i < 2; i++) { const cand = makeCandidate(pick(roles), 0.7); cand.revealed = true; c.applicants.push(cand); }
          addLog(s, `Négocié à ${fmt(price)} pour deux profils.`, s.skills.social > 45 ? 'good' : 'info');
        }
      }
    ]
  },
  {
    id: 'marche_tendu', title: "Le marché du travail se tend",
    text: "Tout le monde recrute sur ton secteur. Les prétentions salariales explosent.",
    cond: s => s.day > 700,
    global: true, cooldown: 1440,
    choices: [
      {
        label: "S'aligner sur le marché", custom: s => {
          s.wageIndex = Math.min(2.6, (s.wageIndex || 1) * 1.15);
          s.companies.forEach(c => c.staff.forEach(e => { e.salary = Math.round(e.salary * 1.12); e.morale = clamp(e.morale + 10, 0, 100); }));
          addLog(s, "Masse salariale +12%, mais personne ne part.", 'warn');
        }
      },
      {
        label: "Tenir les salaires", custom: s => {
          s.wageIndex = Math.min(2.6, (s.wageIndex || 1) * 1.15);
          s.companies.forEach(c => c.staff.forEach(e => e.morale = clamp(e.morale - 16, 0, 100)));
          addLog(s, "Tu tiens tes coûts. Le moral en prend un coup.", 'warn');
        }
      },
      {
        label: "Compenser autrement (télétravail, congés)", custom: s => {
          s.wageIndex = Math.min(2.6, (s.wageIndex || 1) * 1.15);
          s.companies.forEach(c => { c.staff.forEach(e => e.morale = clamp(e.morale + 6, 0, 100)); c.cash -= 3000; });
          addLog(s, "Des avantages plutôt que du salaire. Ça tient, pour l'instant.", 'info');
        }
      }
    ]
  },
  {
    id: 'associe_salarie', title: "Ton meilleur élément veut devenir associé",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => x.staff.some(e => e.skill > 70 && e.days > 400));
      if (!c) return null;
      const e = c.staff.filter(x => x.skill > 70 && x.days > 400)[0];
      return { text: `${e.name} porte ${c.name} depuis plus d'un an. Il demande 10% du capital, sinon il partira monter sa propre boîte.`, ref: { e, c } };
    },
    cond: s => s.companies.some(c => c.staff.some(e => e.skill > 70 && e.days > 400)),
    choices: [
      {
        label: "Lui donner 10%", custom: (s, ref) => {
          ref.c.equity -= 0.10; ref.e.equity = 0.10; ref.e.morale = 100;
          ref.e.trait = 'leader';
          addLog(s, `${ref.e.name} devient associé. Il va se donner à fond.`, 'good');
        }
      },
      {
        label: "Refuser", custom: (s, ref) => {
          ref.c.staff = ref.c.staff.filter(x => x !== ref.e);
          s.rivals = (s.rivals || 0) + 1;
          addLog(s, `${ref.e.name} part monter un concurrent. Ça va se sentir.`, 'bad');
        }
      },
      {
        label: "Proposer 4% et une grosse prime", custom: (s, ref) => {
          if (s.skills.social > 55) {
            ref.c.equity -= 0.04; ref.e.equity = 0.04; ref.e.morale = 92; ref.c.cash -= 15000;
            addLog(s, `Négociation réussie : ${ref.e.name} accepte 4% et une prime.`, 'good');
          } else {
            ref.c.staff = ref.c.staff.filter(x => x !== ref.e);
            addLog(s, `Il refuse ton offre et claque la porte.`, 'bad');
          }
        }
      }
    ]
  },
  {
    id: 'ancien_concurrent', title: "Un ancien salarié te copie",
    text: "Un type que tu as formé a monté la même chose que toi, avec tes méthodes et deux de tes clients.",
    cond: s => s.day > 900 && s.companies.some(c => c.clients > 10),
    choices: [
      {
        label: "L'attaquer en justice", custom: s => {
          s.money -= 9000;
          if (Math.random() < 0.45 + s.skills.finance / 250) addLog(s, "Tu obtiens gain de cause. Il ferme boutique.", 'good');
          else { const c = biggest(s); if (c) c.clients *= 0.9; addLog(s, "Procès perdu. Frais engagés pour rien.", 'bad'); }
        }
      },
      {
        label: "Accélérer pour le distancer", custom: s => {
          const c = biggest(s); if (!c) return;
          c.quality = clamp(c.quality + 12, 0, 100); c.cash -= 10000;
          addLog(s, `${c.name} : tu investis dans le produit plutôt que dans les avocats.`, 'good');
        }
      },
      {
        label: "Lui proposer de racheter sa boîte", custom: s => {
          const price = 45000;
          if (s.money < price) return addLog(s, "Tu n'as pas les fonds pour racheter.", 'warn');
          s.money -= price; const c = biggest(s);
          if (c) { c.clients *= 1.25; addLog(s, `Rachat conclu : ses clients rejoignent ${c.name}.`, 'good'); }
        }
      }
    ]
  },


  /* ===================== LA CONCURRENCE ===================== */

  {
    id: 'rival_debauche', title: "Un concurrent débauche chez toi",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => x.staff.length > 1 && (x.rivals || []).length);
      if (!c) return null;
      const e = bestStaff(c);
      const r = pick(c.rivals.filter(x => x.aggression > 0.4)) || pick(c.rivals);
      return { text: `${r.name} a approché ${e.name} avec une offre nettement supérieure. Ils savent exactement qui compte chez toi.`, ref: { e, c, r } };
    },
    cond: s => s.companies.some(c => c.staff.length > 1 && (c.rivals || []).some(r => r.aggression > 0.35)),
    choices: [
      {
        label: "S'aligner sur leur offre", custom: (s, ref) => {
          ref.e.salary = Math.round(ref.e.salary * 1.35);
          ref.e.morale = clamp(ref.e.morale + 20, 0, 100);
          addLog(s, `${ref.e.name} reste, à ${fmt(ref.e.salary)}. ${ref.r.name} devra chercher ailleurs.`, 'warn');
        }
      },
      {
        label: "Le laisser partir chez eux", custom: (s, ref) => {
          ref.c.staff = ref.c.staff.filter(x => x !== ref.e);
          ref.r.quality = Math.round(clamp(ref.r.quality + 3, 0, 99));
          ref.r.aggression = clamp(ref.r.aggression + 0.1, 0, 1.4);
          addLog(s, `${ref.e.name} rejoint ${ref.r.name}, qui en ressort renforcé.`, 'bad');
        }
      },
      {
        label: "Débaucher chez eux en retour", custom: (s, ref) => {
          const cost = Math.round(ref.e.salary * 6);
          if (s.money < cost) return addLog(s, "Tu n'as pas les moyens de cette guerre.", 'warn');
          s.money -= cost;
          const cand = makeCandidate(pick(ROLES).id, clamp(ref.r.quality / 100, 0.3, 0.95));
          cand.revealed = true;
          ref.c.applicants.push(cand);
          ref.r.grudge = clamp(ref.r.grudge + 0.4, 0, 1);
          ref.r.quality = Math.round(clamp(ref.r.quality - 2, 10, 99));
          addLog(s, `Tu débauches ${cand.name} chez ${ref.r.name}. La guerre est déclarée.`, 'good');
        }
      }
    ]
  },
  {
    id: 'rival_offre', title: "Un concurrent veut te racheter",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => (x.rivals || []).some(r => r.clients > x.clients * 2) && valuation(x) > 80000);
      if (!c) return null;
      const r = c.rivals.filter(x => x.clients > c.clients * 2).sort((a, b) => b.clients - a.clients)[0];
      const price = Math.round(valuation(c) * rand(1.1, 1.45) * c.equity);
      return { text: `${r.name} te propose ${fmt(price)} pour racheter ${c.name}. Leur directeur a été clair : « Soit vous vendez maintenant, soit on prend vos clients un par un. »`, ref: { c, r, price } };
    },
    cond: s => s.companies.some(c => (c.rivals || []).some(r => r.clients > c.clients * 2) && valuation(c) > 80000),
    choices: [
      {
        label: "Vendre et encaisser", custom: (s, ref) => {
          s.money += ref.price;
          s.exits.push({ name: ref.c.name, price: ref.price, day: s.day });
          s.companies = s.companies.filter(x => x !== ref.c);
          s.plan = s.plan.filter(p => !(p.act === 'biz' && p.ref === ref.c.uid));
          addLog(s, `Tu vends ${ref.c.name} à ${ref.r.name} pour ${fmt(ref.price)}.`, 'good');
        }
      },
      {
        label: "Refuser et tenir bon", custom: (s, ref) => {
          ref.r.aggression = clamp(ref.r.aggression + 0.3, 0, 1.4);
          ref.r.grudge = 1;
          s.reputation = clamp(s.reputation + 3, 0, 100);
          addLog(s, `Tu refuses. ${ref.r.name} passe à l'offensive sur ton marché.`, 'warn');
        }
      },
      {
        label: "Négocier une valorisation plus haute", custom: (s, ref) => {
          if (s.skills.finance > 55 || s.skills.social > 65) {
            const better = Math.round(ref.price * 1.4);
            s.money += better;
            s.exits.push({ name: ref.c.name, price: better, day: s.day });
            s.companies = s.companies.filter(x => x !== ref.c);
            s.plan = s.plan.filter(p => !(p.act === 'biz' && p.ref === ref.c.uid));
            addLog(s, `Tu tiens la négociation : ${fmt(better)} au lieu de ${fmt(ref.price)}.`, 'good');
          } else {
            ref.r.aggression = clamp(ref.r.aggression + 0.2, 0, 1.4);
            addLog(s, `Ils retirent leur offre, agacés par ta gourmandise.`, 'bad');
          }
        }
      }
    ]
  },
  {
    id: 'rival_guerre', title: "Guerre des prix",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => (x.rivals || []).some(r => r.grudge > 0.5));
      if (!c) return null;
      const r = c.rivals.filter(x => x.grudge > 0.5).sort((a, b) => b.grudge - a.grudge)[0];
      return { text: `${r.name} casse ses prix de 20 % sur tout son catalogue. C'est clairement dirigé contre toi.`, ref: { c, r } };
    },
    cond: s => s.companies.some(c => (c.rivals || []).some(r => r.grudge > 0.5)),
    choices: [
      {
        label: "S'aligner sur leurs prix", custom: (s, ref) => {
          ref.r.price = clamp(ref.r.price * 0.8, 0.5, 1.8);
          ref.c.price = clamp(ref.c.price * 0.85, 0.6, 1.6);
          addLog(s, `${ref.c.name} : prix baissés pour tenir. Ta marge en prend un coup.`, 'warn');
        }
      },
      {
        label: "Tenir tes prix et investir dans le produit", custom: (s, ref) => {
          ref.r.price = clamp(ref.r.price * 0.8, 0.5, 1.8);
          ref.c.cash -= Math.round(projectedRevenue(ref.c) * 0.4);
          ref.c.quality = clamp(ref.c.quality + 12, 0, 100);
          addLog(s, `${ref.c.name} : tu refuses la guerre des prix et tu montes en gamme.`, 'info');
        }
      },
      {
        label: "Les laisser s'épuiser", custom: (s, ref) => {
          ref.r.price = clamp(ref.r.price * 0.8, 0.5, 1.8);
          ref.r.strength *= 0.88;
          addLog(s, `Tu ne bouges pas. Vendre à perte finira par leur coûter cher.`, 'info');
        }
      }
    ]
  },

  /* ===================== RENCONTRES ===================== */

  {
    id: 'rencontre_sport', title: "Au club de sport",
    text: "Vous prenez les mêmes créneaux depuis trois semaines. Aujourd'hui, la conversation a dépassé les deux phrases habituelles.",
    cond: s => !initFamily(s).partner && (s.plan.find(p => p.act === 'sport') || {}).hours >= 1 && s.day > 90,
    global: true, cooldown: 260,
    choices: [
      {
        label: "Proposer un verre après la séance",
        custom: (s) => {
          const ok = Math.random() < clamp(0.4 + s.skills.social / 200 + s.happiness / 400, 0.2, 0.9);
          if (ok) { startRelationship(s, "au club de sport"); }
          else { addHappiness(-3); addLog(s, `Refus poli. On se recroisera au vestiaire, ce sera charmant.`, 'warn'); }
        }
      },
      { label: "Rester sur le vélo", effects: { happiness: -1 } }
    ]
  },
  {
    id: 'rencontre_ami', title: "Un ami veut te présenter quelqu'un",
    text: null,
    dynamic: s => {
      const f = pick((s.friends || []).filter(x => x.closeness > 45));
      if (!f) return null;
      return { text: `${f.name} t'appelle : « J'ai quelqu'un pour toi. Ne fais pas cette tête, écoute-moi deux minutes. »`, ref: { f } };
    },
    cond: s => !initFamily(s).partner && (s.friends || []).some(f => f.closeness > 45),
    global: true, cooldown: 240,
    choices: [
      {
        label: "Accepter le dîner",
        custom: (s, ref) => {
          const ok = Math.random() < clamp(0.5 + ref.f.closeness / 260 + s.skills.social / 260, 0.25, 0.92);
          if (ok) { startRelationship(s, `présenté par ${ref.f.name}`); ref.f.closeness = clamp(ref.f.closeness + 5, 0, 100); }
          else { addLog(s, `Le dîner a été long. ${ref.f.name} s'excuse encore.`, 'warn'); addHappiness(-2); }
        }
      },
      {
        label: "Décliner — tu n'as pas le temps",
        custom: (s, ref) => { ref.f.closeness = clamp(ref.f.closeness - 4, 0, 100); addHappiness(-2); }
      }
    ]
  },
  {
    id: 'rencontre_appli', title: "Une application, un soir de novembre",
    text: "Tu t'es inscrit à 23 h en te disant que c'était ridicule. Trois jours plus tard, tu as un rendez-vous.",
    cond: s => !initFamily(s).partner && s.day > 120,
    global: true, cooldown: 200,
    choices: [
      {
        label: "Y aller sans rien en attendre",
        custom: (s) => {
          const ok = Math.random() < clamp(0.34 + s.skills.social / 240 + s.reputation / 500 + s.happiness / 500, 0.15, 0.8);
          if (ok) startRelationship(s, "rencontré sur une application");
          else { addHappiness(-2); addLog(s, `Deux heures polies, aucun élan. Ça arrive, souvent.`, 'info'); }
        }
      },
      {
        label: "Annuler la veille", effects: { happiness: -3 },
        text: "Tu inventes une réunion. Personne n'est dupe, à commencer par toi."
      }
    ]
  },
  {
    id: 'rencontre_travail', title: "Quelqu'un dans l'immeuble",
    text: "Vous vous croisez tous les matins dans l'ascenseur depuis des mois. Ce matin, l'ascenseur est tombé en panne entre deux étages.",
    cond: s => !initFamily(s).partner && (s.job || s.companies.some(c => c.staff.length >= 2)) && s.day > 150,
    global: true, cooldown: 300,
    choices: [
      {
        label: "Profiter des vingt minutes d'attente",
        custom: (s) => {
          const ok = Math.random() < clamp(0.45 + s.skills.social / 200, 0.25, 0.9);
          if (ok) startRelationship(s, "rencontré dans l'ascenseur");
          else addLog(s, `Vingt minutes de silence gêné. Les pompiers ont mis du temps.`, 'info');
        }
      },
      { label: "Répondre à tes mails sur ton téléphone", effects: { happiness: -2 } }
    ]
  },

  /* ===================== VIE RELATIONNELLE ===================== */

  {
    id: 'ami_galere', title: "Un ami dans le mur",
    text: null,
    dynamic: s => {
      const f = pick((s.friends || []).filter(x => x.closeness > 40));
      if (!f) return null;
      const need = Math.round(clamp(netWorth(s) * 0.02, 1500, 120000));
      return { text: `${f.name} t'appelle un dimanche soir. Il ne demande jamais rien, et là il demande. Il lui faut ${fmt(need)}.`, ref: { f, need } };
    },
    cond: s => (s.friends || []).some(f => f.closeness > 40),
    global: true, cooldown: 420,
    choices: [
      {
        label: "Lui prêter sans conditions",
        custom: (s, ref) => {
          if (s.money < ref.need) { addLog(s, `Tu ne les as pas. Tu le lui dis, et ça vous coûte à tous les deux.`, 'bad'); ref.f.closeness = clamp(ref.f.closeness - 8, 0, 100); return; }
          s.money -= ref.need;
          ref.f.closeness = clamp(ref.f.closeness + 22, 0, 100);
          ref.f.envy = clamp(ref.f.envy - 40, 0, 100);
          ref.f.owes = (ref.f.owes || 0) + ref.need;
          addHappiness(5);
          addLog(s, `Tu prêtes ${fmt(ref.need)} à ${ref.f.name}. Il te le rendra, ou pas. Ce n'est pas la question.`, 'good');
        }
      },
      {
        label: "L'aider autrement qu'avec de l'argent",
        custom: (s, ref) => {
          ref.f.closeness = clamp(ref.f.closeness + 8, 0, 100);
          gainSkill({ social: 1.4 }, 1, 'field');
          addLog(s, `Tu passes trois week-ends à l'aider à s'en sortir. Ça vaut mieux qu'un chèque.`, 'good');
        }
      },
      {
        label: "Ne pas mélanger l'amitié et l'argent",
        custom: (s, ref) => { ref.f.closeness = clamp(ref.f.closeness - 16, 0, 100); addHappiness(-5); }
      }
    ]
  },
  {
    id: 'ami_jaloux', title: "Le dîner qui tourne mal",
    text: null,
    dynamic: s => {
      const f = pick((s.friends || []).filter(x => x.envy > 45));
      if (!f) return null;
      return { text: `Au milieu du dîner, ${f.name} lâche : « Ça doit être facile, quand on a ce que tu as. » Le silence dure trois secondes de trop.`, ref: { f } };
    },
    cond: s => (s.friends || []).some(f => f.envy > 45),
    global: true, cooldown: 300,
    choices: [
      {
        label: "Encaisser et changer de sujet",
        custom: (s, ref) => { ref.f.envy = clamp(ref.f.envy - 5, 0, 100); ref.f.closeness = clamp(ref.f.closeness - 3, 0, 100); }
      },
      {
        label: "Mettre les choses à plat, franchement",
        custom: (s, ref) => {
          const ok = Math.random() < clamp(0.4 + s.skills.social / 190 + ref.f.closeness / 300, 0.2, 0.9);
          if (ok) { ref.f.envy = clamp(ref.f.envy - 45, 0, 100); ref.f.closeness = clamp(ref.f.closeness + 10, 0, 100);
            addLog(s, `Vous vous êtes tout dit. Vous êtes plus proches qu'avant.`, 'good'); }
          else { ref.f.envy = clamp(ref.f.envy + 12, 0, 100); ref.f.closeness = clamp(ref.f.closeness - 12, 0, 100);
            addLog(s, `La conversation a dérapé. Il est parti avant le dessert.`, 'bad'); }
        }
      },
      {
        label: "Payer l'addition sans rien dire",
        custom: (s, ref) => { ref.f.envy = clamp(ref.f.envy + 14, 0, 100); addHappiness(-3);
          addLog(s, `Tu paies. C'est exactement ce qu'il ne fallait pas faire.`, 'warn'); }
      }
    ]
  },
  {
    id: 'contact_dette', title: "On vient encaisser",
    text: null,
    dynamic: s => {
      const k = pick(s.contacts.filter(x => owedOf(x) > 40));
      if (!k) return null;
      return { text: `${k.name} t'appelle. Il ne tourne pas autour du pot : il a besoin de toi, maintenant, et il rappelle gentiment tout ce qu'il a fait pour toi.`, ref: { k } };
    },
    cond: s => s.contacts.some(k => owedOf(k) > 40),
    global: true, cooldown: 260,
    choices: [
      {
        label: "Tout lâcher et l'aider",
        custom: (s, ref) => {
          s.energy = clamp(s.energy - 22, 0, s.maxEnergy);
          ref.k.owed = Math.max(0, ref.k.owed - 45);
          ref.k.trust = clamp(ref.k.trust + 18, 0, 100);
          ref.k.relation = clamp(ref.k.relation + 10, 0, 100);
          addLog(s, `Tu passes une semaine sur son problème. La dette est effacée, et plus encore.`, 'good');
        }
      },
      {
        label: "Faire ce que tu peux, sans plus",
        custom: (s, ref) => { ref.k.owed = Math.max(0, ref.k.owed - 15); ref.k.trust = clamp(ref.k.trust - 4, 0, 100); }
      },
      {
        label: "Se défiler",
        custom: (s, ref) => {
          ref.k.relation = clamp(ref.k.relation - 30, 0, 100);
          ref.k.trust = clamp(ref.k.trust - 35, 0, 100);
          s.reputation = clamp(s.reputation - 4, 0, 100);
          addLog(s, `Tu ne rappelles pas. Ça se saura — ce genre de chose se sait toujours.`, 'bad');
        }
      }
    ]
  },
  {
    id: 'ami_associe', title: "Un ami veut monter un truc avec toi",
    text: null,
    dynamic: s => {
      const f = pick((s.friends || []).filter(x => x.closeness > 65 && !x.hired));
      if (!f) return null;
      return { text: `${f.name} a une idée. Il en parle depuis six mois, et cette fois il a fait le travail. Il veut que vous le montiez à deux.`, ref: { f } };
    },
    cond: s => (s.friends || []).some(f => f.closeness > 65 && !f.hired) && s.companies.length > 0,
    global: true, cooldown: 500,
    choices: [
      {
        label: "Le faire entrer dans une de tes sociétés",
        custom: (s, ref) => {
          const c = biggest(s);
          if (!c) return;
          hireFriend(ref.f.id, c.uid);
          addLog(s, `${ref.f.name} rejoint ${c.name}. Vous verrez bien si l'amitié y survit.`, 'good');
        }
      },
      {
        label: "Lui donner de l'argent et le laisser faire seul",
        custom: (s, ref) => {
          const amount = Math.round(clamp(netWorth(s) * 0.03, 5000, 400000));
          if (s.money < amount) { addLog(s, `Tu n'as pas de quoi. Il comprend, à moitié.`, 'warn'); return; }
          s.money -= amount;
          ref.f.closeness = clamp(ref.f.closeness + 14, 0, 100);
          ref.f.venture = amount;
          addLog(s, `Tu mets ${fmt(amount)} dans le projet de ${ref.f.name}. On verra dans quelques années.`, 'info');
        }
      },
      {
        label: "Refuser — ne jamais travailler avec ses amis",
        custom: (s, ref) => { ref.f.closeness = clamp(ref.f.closeness - 10, 0, 100); }
      }
    ]
  },
  {
    id: 'conjoint_ultimatum', title: "L'ultimatum",
    text: null,
    dynamic: s => {
      const p = initFamily(s).partner;
      if (!p) return null;
      return { text: `${p.name} t'attend dans le salon, sans télévision allumée. « Je ne te demande pas de choisir. Je te demande d'être là. Je ne le redemanderai pas. »`, ref: { p } };
    },
    cond: s => { const p = initFamily(s).partner; return p && p.relation < 42 && plannedHours(s) > CONFIG.baseHours + 1; },
    global: true, cooldown: 300,
    choices: [
      {
        label: "Réduire vraiment ta charge de travail",
        custom: (s, ref) => {
          const biz = s.plan.filter(p => p.act === 'biz');
          biz.forEach(p => setPlan('biz', Math.max(0, p.hours - 2), p.ref, p.role));
          setPlan('family', ((s.plan.find(p => p.act === 'family') || {}).hours || 0) + 2);
          ref.p.relation = clamp(ref.p.relation + 26, 0, 100);
          addHappiness(8);
          addLog(s, `Tu lèves le pied. Deux heures de moins par entreprise, deux de plus à la maison.`, 'good');
        }
      },
      {
        label: "Promettre que c'est bientôt fini",
        custom: (s, ref) => {
          ref.p.relation = clamp(ref.p.relation + 8, 0, 100);
          ref.p.promised = (ref.p.promised || 0) + 1;
          if (ref.p.promised >= 2) {
            ref.p.relation = clamp(ref.p.relation - 22, 0, 100);
            addLog(s, `Tu as déjà promis ça. ${ref.p.name} l'a noté.`, 'bad');
          } else addLog(s, `Tu promets. Elle veut y croire.`, 'warn');
        }
      },
      {
        label: "Dire la vérité : ça ne changera pas",
        custom: (s, ref) => {
          ref.p.relation = clamp(ref.p.relation - 18, 0, 100);
          addHappiness(-6);
          s.reputation = clamp(s.reputation + 1, 0, 100);
          addLog(s, `Au moins, c'est dit. Le silence après était très long.`, 'warn');
        }
      }
    ]
  },
  {
    id: 'contact_tuyau', title: "Un tuyau",
    text: null,
    dynamic: s => {
      const k = pick(s.contacts.filter(x => x.relation > 60 && !x.away));
      if (!k) return null;
      return { text: `${k.name} t'appelle un mardi matin : « Je ne devrais pas te dire ça. » Ce qui suit vaut de l'argent.`, ref: { k } };
    },
    cond: s => s.contacts.some(k => k.relation > 60 && !k.away),
    global: true, cooldown: 220,
    choices: [
      {
        label: "Agir tout de suite",
        custom: (s, ref) => {
          const c = biggest(s);
          if (c) { c.hype = Math.max(c.hype || 1, 1.3); c.clients += Math.round(c.clients * 0.06 + 4);
            addLog(s, `Tu bouges avant tout le monde. ${c.name} en profite immédiatement.`, 'good'); }
          else { s.reputation = clamp(s.reputation + 3, 0, 100); }
          ref.k.owed = (ref.k.owed || 0) + 18;
        }
      },
      {
        label: "Le remercier et ne rien faire",
        custom: (s, ref) => { ref.k.trust = clamp(ref.k.trust + 4, 0, 100); }
      }
    ]
  },

  /* ===================== CONSEIL D'ADMINISTRATION ===================== */

  {
    id: 'board_pression', title: "Conseil d'administration",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => (x.investors || []).some(i => i.board));
      if (!c) return null;
      const inv = c.investors.filter(i => i.board).sort((a, b) => a.patience - b.patience)[0];
      const f = getFund(inv.fundId);
      const p = Math.round(investorProgress(c, inv) * 100);
      return {
        text: `Conseil trimestriel de ${c.name}. ${f.name} projette une courbe au tableau : tu es à ${p}% de la trajectoire promise au moment du tour. « On ne va pas se mentir, ça ne va pas assez vite. »`,
        ref: { c, inv, f }
      };
    },
    cond: s => s.companies.some(c => (c.investors || []).some(i => i.board && i.patience <= 3)),
    global: true, cooldown: 200,
    choices: [
      {
        label: "Accepter leur plan : couper les coûts, viser la rentabilité",
        custom: (s, ref) => {
          const c = ref.c;
          CHANNELS.forEach(ch => c.budgets[ch.id] = Math.round((c.budgets[ch.id] || 0) * 0.6));
          c.rd = Math.round(c.rd * 0.5);
          if (c.staff.length > 2) {
            const out = c.staff.sort((a, b) => a.skill - b.skill).slice(0, Math.ceil(c.staff.length * 0.2));
            c.staff = c.staff.filter(e => !out.includes(e));
            c.staff.forEach(e => e.morale = clamp(e.morale - 12, 0, 100));
            addLog(s, `${c.name} : ${out.length} départ(s) et des budgets coupés pour rassurer le conseil.`, 'warn');
          }
          ref.inv.patience += 1.5;
          addHappiness(-5);
        }
      },
      {
        label: "Défendre ta trajectoire, chiffres à l'appui",
        custom: (s, ref) => {
          const ok = Math.random() < clamp(0.3 + s.skills.finance / 200 + s.skills.social / 300 + (ref.c.growth || 0) * 0.4, 0.1, 0.85);
          if (ok) {
            ref.inv.patience += 1;
            ref.inv.baseRevenue *= 1.1;   // ils révisent leurs attentes
            addLog(s, `Ton conseil te laisse deux trimestres de plus. Tu les as convaincus, pas rassurés.`, 'good');
          } else {
            ref.inv.patience -= 1;
            addLog(s, `${ref.f.name} n'a rien voulu entendre. La prochaine réunion sera plus rude.`, 'bad');
          }
        }
      },
      {
        label: "Racheter leur part avec ton argent personnel",
        cond: s => true,
        custom: (s, ref) => {
          const price = Math.round(valuation(ref.c) * ref.inv.pct * 1.25);
          if (s.money < price) {
            addLog(s, `Il te faudrait ${fmt(price)} pour les sortir. Tu ne les as pas, et tout le monde l'a bien vu.`, 'bad');
            ref.inv.patience -= 0.5;
            return;
          }
          s.money -= price;
          ref.c.equity = +clamp(ref.c.equity + ref.inv.pct, 0, 1).toFixed(4);
          ref.c.investors = ref.c.investors.filter(i => i !== ref.inv);
          ref.c.board = ref.c.investors.some(i => i.board);
          addLog(s, `Tu rachètes la part de ${ref.f.name} pour ${fmt(price)}. Tu redeviens maître chez toi.`, 'good');
          addHappiness(10);
        }
      }
    ]
  },

  {
    id: 'board_ceo', title: "Ils veulent un directeur général",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => (x.investors || []).some(i => i.board && i.patience <= 1));
      if (!c) return null;
      const inv = c.investors.filter(i => i.board).sort((a, b) => a.patience - b.patience)[0];
      const f = getFund(inv.fundId);
      return {
        text: `${f.name} a fait passer des entretiens sans t'en parler. Ils te proposent de recruter un directeur général « expérimenté » pour ${c.name}, et de te concentrer sur le produit. Le message est clair.`,
        ref: { c, inv, f }
      };
    },
    cond: s => s.companies.some(c => (c.investors || []).some(i => i.board && i.patience <= 1)),
    global: true, cooldown: 400,
    choices: [
      {
        label: "Accepter le DG qu'ils imposent",
        custom: (s, ref) => {
          const c = ref.c;
          const dg = makeCandidate('manager', 0.9);
          dg.name = randomName();
          dg.ask = Math.round(marketSalary('manager', dg.skill) * 2.4);
          c.staff.push(hireFrom(dg));
          c.costMod = Math.max(0.8, (c.costMod || 1) * 0.93);
          ref.inv.patience = getFund(ref.inv.fundId).patience;
          s.plan = s.plan.filter(p => !(p.act === 'biz' && p.ref === c.uid));
          addHappiness(-12);
          addLog(s, `${dg.name} prend la direction de ${c.name} à ${fmt(dg.ask)} par mois. Tu n'y passes plus tes journées.`, 'warn');
        }
      },
      {
        label: "Refuser net et parier sur les six prochains mois",
        custom: (s, ref) => {
          ref.inv.patience -= 1;
          ref.c.hype = Math.max(ref.c.hype || 1, 1.1);
          addHappiness(4);
          addLog(s, `Tu refuses. Ton conseil te laisse faire, en notant soigneusement la date.`, 'warn');
        }
      },
      {
        label: "Proposer un compromis : un directeur des opérations, pas un DG",
        custom: (s, ref) => {
          const ok = Math.random() < clamp(0.35 + s.skills.social / 200 + s.reputation / 300, 0.15, 0.85);
          const c = ref.c;
          if (ok) {
            const cand = makeCandidate('ops', 0.85);
            c.staff.push(hireFrom(cand));
            ref.inv.patience += 1.5;
            addLog(s, `Accord trouvé : ${cand.name} prend les opérations, tu gardes la direction.`, 'good');
          } else {
            ref.inv.patience -= 1;
            addLog(s, `${ref.f.name} refuse le compromis. Ils veulent quelqu'un au-dessus de toi, pas à côté.`, 'bad');
          }
        }
      }
    ]
  },

  {
    id: 'board_sortie', title: "Le conseil veut sortir",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => (x.investors || []).some(i => i.board && i.patience <= 0));
      if (!c) return null;
      const inv = c.investors.filter(i => i.board && i.patience <= 0)[0];
      const f = getFund(inv.fundId);
      const offer = Math.round(valuation(c) * 0.8);
      return {
        text: `${f.name} a un acheteur pour ${c.name} à ${fmt(offer)}. C'est en dessous de ce que la société vaut, mais leur fonds arrive en fin de vie et ils ont le droit de forcer la vente. Ils préfèrent que tu signes de bon cœur.`,
        ref: { c, inv, f, offer }
      };
    },
    cond: s => s.companies.some(c => (c.investors || []).some(i => i.board && i.patience <= 0)),
    global: true, cooldown: 500,
    choices: [
      {
        label: "Vendre et passer à autre chose",
        custom: (s, ref) => {
          const price = Math.round(Math.max(0, ref.offer + ref.c.cash - companyDebt(ref.c)) * ref.c.equity);
          s.money += price;
          s.exits.push({ name: ref.c.name, price, day: s.day });
          s.companies = s.companies.filter(x => x.uid !== ref.c.uid);
          s.plan = s.plan.filter(p => !(p.act === 'biz' && p.ref === ref.c.uid));
          addLog(s, `Cession forcée de ${ref.c.name} : ${fmt(price)} pour ta part.`, 'warn');
        }
      },
      {
        label: "Trouver un autre acheteur toi-même",
        custom: (s, ref) => {
          const ok = Math.random() < clamp(0.25 + s.skills.finance / 180 + s.contacts.filter(k => k.kind === 'investor').length * 0.08, 0.1, 0.8);
          if (ok) {
            const price = Math.round(Math.max(0, valuation(ref.c) * 1.15 + ref.c.cash - companyDebt(ref.c)) * ref.c.equity);
            s.money += price;
            s.exits.push({ name: ref.c.name, price, day: s.day });
            s.companies = s.companies.filter(x => x.uid !== ref.c.uid);
            s.plan = s.plan.filter(p => !(p.act === 'biz' && p.ref === ref.c.uid));
            s.reputation = clamp(s.reputation + 5, 0, 100);
            addLog(s, `Tu montes ton propre processus de cession et vends ${ref.c.name} ${fmt(price)}, bien au-dessus de leur offre.`, 'good');
          } else {
            ref.inv.patience = -1;
            addLog(s, `Personne d'autre ne s'est positionné. Le conseil reprend la main sur le dossier.`, 'bad');
          }
        }
      },
      {
        label: "Racheter leur part pour garder la société",
        custom: (s, ref) => {
          const price = Math.round(valuation(ref.c) * ref.inv.pct * 1.35);
          if (s.money < price) {
            addLog(s, `Sortir ${ref.f.name} coûterait ${fmt(price)}. Tu ne les as pas.`, 'bad');
            return;
          }
          s.money -= price;
          ref.c.equity = +clamp(ref.c.equity + ref.inv.pct, 0, 1).toFixed(4);
          ref.c.investors = ref.c.investors.filter(i => i !== ref.inv);
          ref.c.board = ref.c.investors.some(i => i.board);
          addHappiness(8);
          addLog(s, `Tu sors ${ref.f.name} du capital pour ${fmt(price)}. ${ref.c.name} reste à toi.`, 'good');
        }
      }
    ]
  },

  /* ===================== ACQUISITION & PRODUIT ===================== */

  {
    id: 'compte_suspendu', title: "Compte publicitaire suspendu",
    text: "La régie a suspendu ton compte pour « non-conformité ». Aucun interlocuteur humain au bout du fil.",
    cond: s => s.companies.some(c => (c.budgets.paid || 0) > 1000),
    choices: [
      {
        label: "Faire appel et attendre", custom: s => {
          const c = s.companies.find(x => (x.budgets.paid || 0) > 1000);
          if (c) { c.blocked = { channel: 'paid', days: 25 }; addLog(s, `${c.name} : publicité payante coupée pendant 25 jours.`, 'bad'); }
        }
      },
      {
        label: "Repasser par une agence partenaire (4 000€)", custom: s => {
          const c = s.companies.find(x => (x.budgets.paid || 0) > 1000);
          if (c) { s.money -= 4000; c.blocked = { channel: 'paid', days: 5 }; addLog(s, `${c.name} : coupure limitée à 5 jours, mais 4 000€ de frais.`, 'warn'); }
        }
      },
      {
        label: "Basculer le budget sur l'organique et l'outbound", custom: s => {
          const c = s.companies.find(x => (x.budgets.paid || 0) > 1000);
          if (c) {
            const b = c.budgets.paid;
            c.budgets.paid = 0;
            c.budgets.organic += Math.round(b * 0.5);
            c.budgets.outbound += Math.round(b * 0.5);
            c.blocked = { channel: 'paid', days: 25 };
            addLog(s, `${c.name} : budget redéployé sur d'autres canaux.`, 'info');
          }
        }
      }
    ]
  },
  {
    id: 'organic_decolle', title: "Ton contenu décolle",
    text: "Une publication que tu avais postée sans y croire tourne partout depuis trois jours.",
    cond: s => s.companies.some(c => (c.budgets.organic || 0) > 200),
    choices: [
      {
        label: "Tout miser dessus", custom: s => {
          const c = s.companies.find(x => (x.budgets.organic || 0) > 200);
          if (c) { c.channelBoost = { channel: 'organic', mult: 2.4, days: 60 }; addLog(s, `${c.name} : l'organique rend 2,4× plus pendant deux mois.`, 'good'); }
        }
      },
      {
        label: "Capitaliser en récupérant des emails", custom: s => {
          const c = s.companies.find(x => (x.budgets.organic || 0) > 200);
          if (c) { c.clients += Math.max(3, Math.round(c.clients * 0.15)); c.quality = clamp(c.quality + 4, 0, 100); addLog(s, `${c.name} : afflux direct de clients.`, 'good'); }
        }
      }
    ]
  },
  {
    id: 'bug_critique', title: "Panne majeure en production",
    text: "Plus rien ne fonctionne depuis quatre heures. Les clients écrivent partout.",
    cond: s => s.companies.some(c => ['saas', 'ia', 'studio', 'dropship'].includes(c.typeId) && c.clients > 20),
    choices: [
      {
        label: "Tout arrêter et corriger proprement", custom: s => {
          const c = s.companies.find(x => ['saas', 'ia', 'studio', 'dropship'].includes(x.typeId));
          if (c) { c.cash -= 12000; c.quality = clamp(c.quality + 6, 0, 100); addLog(s, `${c.name} : trois jours perdus, mais le système est plus solide qu'avant.`, 'info'); }
        }
      },
      {
        label: "Rustine rapide et on verra plus tard", custom: s => {
          const c = s.companies.find(x => ['saas', 'ia', 'studio', 'dropship'].includes(x.typeId));
          if (c) { c.quality = clamp(c.quality - 10, 0, 100); c.debtTech = (c.debtTech || 0) + 1; addLog(s, `${c.name} : ça repart, mais la dette technique s'accumule.`, 'warn'); }
        }
      },
      {
        label: "Rembourser tous les clients touchés", custom: s => {
          const c = s.companies.find(x => ['saas', 'ia', 'studio', 'dropship'].includes(x.typeId));
          if (c) { c.cash -= Math.round(c.lastRevenue * 0.4); c.loyalty = (c.loyalty || 1) * 1.15; addLog(s, `${c.name} : geste commercial coûteux, clients fidélisés.`, 'good'); }
        }
      }
    ]
  },
  {
    id: 'avis_catastrophe', title: "Un avis client devient viral",
    text: "Un client mécontent a écrit un fil très partagé. C'est en partie injuste, en partie mérité.",
    cond: s => s.companies.some(c => c.clients > 30 && c.quality < 65),
    choices: [
      {
        label: "Répondre publiquement et t'excuser", custom: s => {
          const c = biggest(s); if (!c) return;
          if (s.skills.social > 45) { s.reputation = clamp(s.reputation + 5, 0, 100); addLog(s, "Ta réponse est saluée. Le bad buzz se retourne en ta faveur.", 'good'); }
          else { s.reputation = clamp(s.reputation - 4, 0, 100); c.clients *= 0.93; addLog(s, "Ta réponse maladroite relance la polémique.", 'bad'); }
        }
      },
      {
        label: "Corriger le problème de fond", custom: s => {
          const c = biggest(s); if (!c) return;
          c.cash -= 8000; c.quality = clamp(c.quality + 14, 0, 100);
          addLog(s, `${c.name} : le problème est traité à la racine.`, 'good');
        }
      },
      {
        label: "Ne pas alimenter", custom: s => {
          const c = biggest(s); if (c) c.clients *= 0.9;
          s.reputation = clamp(s.reputation - 2, 0, 100);
          addLog(s, "Ça retombe tout seul, en laissant des traces.", 'warn');
        }
      }
    ]
  },
  {
    id: 'client_dominant', title: "Un client pèse trop lourd",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => x.clients > 3 && x.clients < 40);
      if (!c) return null;
      return { text: `Chez ${c.name}, un seul client représente près de 40% de ton chiffre d'affaires. Il demande 20% de remise, sinon il part en appel d'offres.`, ref: { c } };
    },
    cond: s => s.companies.some(c => c.clients > 3 && c.clients < 40),
    choices: [
      {
        label: "Accepter la remise", custom: (s, ref) => {
          ref.c.price *= 0.88;
          addLog(s, `${ref.c.name} : prix moyen en baisse de 12%. Le client reste.`, 'warn');
        }
      },
      {
        label: "Refuser et le perdre", custom: (s, ref) => {
          ref.c.clients = Math.max(0, ref.c.clients * 0.62);
          ref.c.price *= 1.03;
          addLog(s, `${ref.c.name} : gros trou dans le chiffre, mais tu gardes tes marges.`, 'bad');
        }
      },
      {
        label: "Accepter en échange d'un engagement de 2 ans", custom: (s, ref) => {
          ref.c.price *= 0.93;
          ref.c.loyalty = (ref.c.loyalty || 1) * 1.25;
          addLog(s, `${ref.c.name} : remise limitée contre un contrat long. Le churn baisse.`, 'good');
        }
      }
    ]
  },
  {
    id: 'fournisseur', title: "Ton fournisseur augmente ses prix",
    text: "+18% sur toutes tes références, applicable le mois prochain.",
    cond: s => s.companies.some(c => getType(c).varCost > 0.3),
    choices: [
      {
        label: "Renégocier", custom: s => {
          const c = s.companies.find(x => getType(x).varCost > 0.3); if (!c) return;
          if (s.skills.social > 45 || s.skills.business > 55) { addLog(s, `${c.name} : tu obtiens le maintien des tarifs.`, 'good'); }
          else { c.costMod = (c.costMod || 1) * 1.18; addLog(s, `${c.name} : hausse subie, marges rognées.`, 'bad'); }
        }
      },
      {
        label: "Changer de fournisseur", custom: s => {
          const c = s.companies.find(x => getType(x).varCost > 0.3); if (!c) return;
          c.costMod = (c.costMod || 1) * 1.05; c.quality = clamp(c.quality - 8, 0, 100); c.cash -= 4000;
          addLog(s, `${c.name} : coûts contenus, qualité en baisse le temps de la transition.`, 'warn');
        }
      },
      {
        label: "Répercuter sur tes prix", custom: s => {
          const c = s.companies.find(x => getType(x).varCost > 0.3); if (!c) return;
          c.costMod = (c.costMod || 1) * 1.18; c.price *= 1.15;
          addLog(s, `${c.name} : prix augmentés de 15%. Certains clients ne suivront pas.`, 'info');
        }
      }
    ]
  },
  {
    id: 'nouveau_marche', title: "Une opportunité d'expansion",
    text: "Un marché voisin s'ouvre : même produit, nouveau public. Il faut investir pour y aller.",
    cond: s => s.companies.some(c => marketShare(c) > 0.45),
    choices: [
      {
        label: "Y aller à fond", custom: s => {
          const c = s.companies.find(x => marketShare(x) > 0.45); if (!c) return;
          const cost = Math.round(getType(c).cost * 0.8);
          if (s.money < cost) return addLog(s, "Tu n'as pas les moyens de financer l'expansion.", 'warn');
          s.money -= cost;
          c.marketBonus = (c.marketBonus || 1) * 1.8;
          addLog(s, `${c.name} : marché adressable élargi de 80% pour ${fmt(cost)}.`, 'good');
        }
      },
      {
        label: "Tester prudemment", custom: s => {
          const c = s.companies.find(x => marketShare(x) > 0.45); if (!c) return;
          const cost = Math.round(getType(c).cost * 0.25);
          s.money -= cost; c.marketBonus = (c.marketBonus || 1) * 1.25;
          addLog(s, `${c.name} : marché élargi de 25%.`, 'info');
        }
      },
      { label: "Rester sur ton cœur de métier", effects: {} }
    ]
  },
  {
    id: 'reglementation', title: "Nouvelle réglementation",
    text: "Une loi impose des obligations supplémentaires à ton secteur : mise en conformité obligatoire.",
    cond: s => s.companies.some(c => c.days > 400),
    choices: [
      {
        label: "Se mettre en conformité", custom: s => {
          const c = biggest(s); if (!c) return;
          c.cash -= Math.round(getType(c).fixedCost * 2.5);
          addLog(s, `${c.name} : conformité assurée, trésorerie entamée.`, 'info');
        }
      },
      {
        label: "Attendre les contrôles", custom: s => {
          const c = biggest(s); if (!c) return;
          if (Math.random() < 0.45) { const f = Math.round(getType(c).fixedCost * 7); c.cash -= f; addLog(s, `${c.name} : contrôle et amende de ${fmt(f)}.`, 'bad'); }
          else addLog(s, "Personne n'est venu. Pour l'instant.", 'warn');
        }
      },
      {
        label: "En faire un argument commercial", custom: s => {
          const c = biggest(s); if (!c) return;
          c.cash -= Math.round(getType(c).fixedCost * 3.2);
          c.quality = clamp(c.quality + 10, 0, 100);
          s.reputation = clamp(s.reputation + 4, 0, 100);
          addLog(s, `${c.name} : conformité exemplaire mise en avant. La qualité perçue monte.`, 'good');
        }
      }
    ]
  },
  {
    id: 'hack', title: "Cyberattaque",
    text: "Tes serveurs sont chiffrés. Une rançon s'affiche à l'écran.",
    cond: s => s.companies.some(c => ['saas', 'ia', 'studio', 'dropship'].includes(c.typeId)),
    choices: [
      { label: "Payer la rançon (25 000€)", effects: { money: -25000, happiness: -6 } },
      {
        label: "Refuser et reconstruire", custom: s => {
          const c = biggest(s);
          if (c) { c.clients *= 0.6; c.quality = clamp(c.quality - 10, 0, 100); }
          s.reputation = clamp(s.reputation + 3, 0, 100);
          addLog(s, "Deux semaines d'arrêt, des clients perdus, mais tu n'as pas cédé.", 'warn');
        }
      },
      {
        label: "Payer et recruter un expert sécurité", custom: s => {
          s.money -= 25000;
          const c = biggest(s);
          if (c) { const cand = makeCandidate('product', 0.8); cand.revealed = true; c.applicants.push(cand); addLog(s, `Un expert sécurité postule chez ${c.name}.`, 'info'); }
        }
      }
    ]
  },

  /* ===================== CAPITAL & CROISSANCE ===================== */

  {
    id: 'business_angel', title: "Un business angel s'intéresse à toi",
    text: "Un investisseur a vu tes chiffres. Il propose du cash contre des parts, sans passer par la banque.",
    cond: s => s.companies.some(c => c.clients > 30 && c.equity > 0.55),
    choices: [
      {
        label: "Accepter le ticket", custom: s => {
          const c = biggest(s); if (!c) return;
          const cash = Math.round(valuation(c) * 0.15);
          c.equity *= 0.85; c.cash += cash;
          addLog(s, `Levée : ${fmt(cash)} sur la trésorerie de ${c.name} contre 15% du capital.`, 'good');
        }
      },
      { label: "Refuser, garder 100%", effects: { reputation: 2 } },
      {
        label: "Négocier une valorisation plus haute", custom: s => {
          const c = biggest(s); if (!c) return;
          if (s.skills.finance > 50) {
            const cash = Math.round(valuation(c) * 0.15 * 1.5);
            c.equity *= 0.9; c.cash += cash;
            addLog(s, `Négociation réussie : ${fmt(cash)} pour seulement 10% du capital.`, 'good');
          } else { addLog(s, "Il trouve que tu surestimes ta boîte et passe son chemin.", 'warn'); }
        }
      }
    ]
  },
  {
    id: 'siege_conseil', title: "Ton investisseur veut un siège au conseil",
    text: "Il a mis de l'argent, il veut maintenant peser sur les décisions. Et il a des idées bien arrêtées.",
    cond: s => s.companies.some(c => c.equity < 0.9 && c.equity > 0.3),
    choices: [
      {
        label: "Accepter", custom: s => {
          const c = s.companies.find(x => x.equity < 0.9 && x.equity > 0.3); if (!c) return;
          c.board = true; c.governance = 0.9;
          gainSkill({ business: 3, finance: 3 }, 1, 'mentor');
          addLog(s, `${c.name} : gouvernance partagée. Tu y gagnes en méthode, tu y perds en liberté.`, 'info');
        }
      },
      {
        label: "Refuser fermement", custom: s => {
          const c = s.companies.find(x => x.equity < 0.9 && x.equity > 0.3); if (!c) return;
          c.investorAngry = true;
          addLog(s, `${c.name} : relation tendue avec ton investisseur. Il ne remettra pas au pot.`, 'warn');
        }
      },
      {
        label: "Lui racheter ses parts", custom: s => {
          const c = s.companies.find(x => x.equity < 0.9 && x.equity > 0.3); if (!c) return;
          const price = Math.round(valuation(c) * (1 - c.equity) * 1.3);
          if (s.money < price) return addLog(s, `Il faudrait ${fmt(price)}. Tu ne les as pas.`, 'warn');
          s.money -= price; c.equity = 1;
          addLog(s, `${c.name} : tu rachètes tout. Tu redeviens seul maître à bord.`, 'good');
        }
      }
    ]
  },
  {
    id: 'offre_rachat', title: "Offre de rachat surprise",
    text: "Un groupe veut acquérir ta société. L'offre est sur la table, valable une semaine.",
    cond: s => s.companies.some(c => valuation(c) > 150000),
    choices: [
      {
        label: "Vendre au prix proposé (+25%)", custom: s => {
          const c = biggest(s); if (!c) return;
          const price = Math.round(valuation(c) * 1.25 * c.equity);
          s.money += price; s.exits.push({ name: c.name, price, day: s.day });
          s.companies = s.companies.filter(x => x !== c);
          s.reputation = clamp(s.reputation + 10, 0, 100);
          addLog(s, `Tu vends ${c.name} pour ${fmt(price)}.`, 'good');
        }
      },
      { label: "Refuser, tu vises plus haut", effects: { reputation: 4 }, custom: s => { const c = biggest(s); if (c) c.hype = 1.15; } },
      {
        label: "Vendre 40% et rester aux commandes", custom: s => {
          const c = biggest(s); if (!c) return;
          const price = Math.round(valuation(c) * 1.25 * 0.4);
          s.money += price; c.equity -= 0.4;
          addLog(s, `Tu encaisses ${fmt(price)} tout en gardant la direction de ${c.name}.`, 'good');
        }
      }
    ]
  },
  {
    id: 'opportunite_rachat', title: "Une boîte à racheter",
    text: "Un concurrent fatigué veut vendre. Il est pressé, le prix est bas.",
    cond: s => s.money > 120000 && s.skills.business > 45,
    choices: [
      {
        label: "Racheter", custom: s => {
          const t = BUSINESS_TYPES[Math.floor(Math.random() * 6)];
          const price = Math.round(t.cost * 1.4);
          if (s.money < price) return addLog(s, "Finalement, tu n'as pas les fonds.", 'warn');
          s.money -= price;
          const c = createCompany(t, `${t.name} (reprise)`);
          c.clients = Math.round(t.market * 0.12); c.quality = 55; c.cash = 5000;
          for (let i = 0; i < 2; i++) c.staff.push(hireFrom(makeCandidate(pick(ROLES).id, 0.45)));
          s.companies.push(c);
          addLog(s, `Rachat conclu pour ${fmt(price)} : ${c.name} et son équipe rejoignent le groupe.`, 'good');
        }
      },
      { label: "Passer ton tour", effects: {} }
    ]
  },
  {
    id: 'crise', title: "Crise économique",
    text: "Les marchés dévissent, les clients coupent leurs budgets, les banques ferment le robinet.",
    cond: s => s.day > 720,
    global: true, cooldown: 1800,
    choices: [
      {
        label: "Réduire les coûts immédiatement", custom: s => {
          s.companies.forEach(c => {
            CHANNELS.forEach(ch => c.budgets[ch.id] = Math.round((c.budgets[ch.id] || 0) * 0.5));
            c.clients *= 0.88;
          });
          s.marketMood = 0.72;
          addLog(s, "Mode survie : budgets coupés partout.", 'warn');
        }
      },
      {
        label: "Investir à contre-courant", custom: s => {
          s.companies.forEach(c => {
            c.clients *= 0.8;
            CHANNELS.forEach(ch => c.budgets[ch.id] = Math.round((c.budgets[ch.id] || 0) * 1.3));
          });
          s.marketMood = 0.72; s.contrarian = 240;
          addLog(s, "Tu attaques pendant que les autres reculent. Risqué, payant si tu tiens.", 'warn');
        }
      },
      {
        label: "Licencier pour préserver la trésorerie", custom: s => {
          s.marketMood = 0.72;
          s.companies.forEach(c => {
            const n = Math.floor(c.staff.length / 3);
            for (let i = 0; i < n; i++) c.staff.pop();
            c.staff.forEach(e => e.morale = clamp(e.morale - 20, 0, 100));
          });
          addLog(s, "Un tiers des effectifs remercié. L'ambiance est glaciale.", 'bad');
        }
      }
    ]
  },
  {
    id: 'boom', title: "Le marché s'emballe",
    text: "Tout le monde consomme, les investisseurs signent des chèques, ton secteur est à la mode.",
    cond: s => s.day > 540,
    global: true, cooldown: 1620,
    choices: [
      { label: "Profiter de la vague", custom: s => { s.marketMood = 1.35; addLog(s, "Vent dans le dos pendant plusieurs mois.", 'good'); } },
      {
        label: "En profiter pour lever des fonds", custom: s => {
          s.marketMood = 1.35;
          const c = biggest(s);
          if (c && c.equity > 0.4) {
            const cash = Math.round(valuation(c) * 0.2 * 1.4);
            c.equity -= 0.15; c.cash += cash;
            addLog(s, `Valorisation gonflée par l'euphorie : ${fmt(cash)} levés pour 15%.`, 'good');
          }
        }
      }
    ]
  },
  {
    id: 'presse', title: "Un journaliste veut te portraiturer",
    text: "Un média économique prépare un article sur les nouveaux entrepreneurs de ta génération.",
    cond: s => s.reputation > 30,
    choices: [
      {
        label: "Accepter l'interview", effects: { reputation: 12, energy: -8 },
        custom: s => { s.companies.forEach(c => c.clients = Math.round(c.clients * 1.12)); s.contacts.push(makeContact(40)); }
      },
      { label: "Décliner", effects: { happiness: 1 } },
      {
        label: "Accepter et parler de tes échecs", custom: s => {
          s.reputation = clamp(s.reputation + 18, 0, 100);
          addHappiness(6);
          s.contacts.push(makeContact(45));
          addLog(s, "Ton honnêteté marque les esprits. Beaucoup de gens te contactent.", 'good');
        }
      }
    ]
  },
  {
    id: 'proces', title: "Mise en demeure",
    text: "Un ancien partenaire t'attaque pour rupture abusive de contrat.",
    cond: s => s.companies.length > 0 && s.day > 600,
    choices: [
      { label: "Négocier à l'amiable (12 000€)", effects: { money: -12000, happiness: -5 } },
      {
        label: "Aller au procès", custom: s => {
          if (Math.random() < 0.5 + s.skills.finance / 300) { s.money -= 4000; addLog(s, "Tu gagnes le procès. Frais d'avocat : 4 000€.", 'good'); }
          else { s.money -= 35000; addHappiness(-12); addLog(s, "Tu perds : 35 000€ de dommages et intérêts.", 'bad'); }
        }
      }
    ]
  },

  /* ===================== RÉSEAU & COMPÉTENCES ===================== */

  {
    id: 'mentor_rencontre', title: "Quelqu'un te repère",
    text: "Un entrepreneur reconnu a entendu parler de toi et propose de te suivre. Gratuitement.",
    cond: s => s.reputation > 20 && s.day > 360,
    choices: [
      {
        label: "Accepter avec humilité", custom: s => {
          const k = makeContact(65); k.relation = 55;
          s.contacts.push(k);
          addLog(s, `${k.name} devient ton mentor. Va le voir régulièrement.`, 'good');
        }
      },
      { label: "Tu penses ne pas en avoir besoin", effects: { happiness: 2, reputation: -3 } }
    ]
  },
  {
    id: 'conference', title: "Invitation à une conférence",
    text: "On te propose d'intervenir devant 300 entrepreneurs. Deux jours de préparation, aucune rémunération.",
    cond: s => s.reputation > 25,
    choices: [
      {
        label: "Accepter et bien préparer", effects: { energy: -18, reputation: 8 },
        custom: s => { for (let i = 0; i < 3; i++) s.contacts.push(makeContact(35)); addLog(s, "Trois contacts sérieux repartent avec ton numéro.", 'good'); }
      },
      {
        label: "Accepter et improviser", effects: { reputation: -2 },
        custom: s => { if (s.skills.social > 55) { s.reputation += 8; s.contacts.push(makeContact(45)); addLog(s, "Tu improvises brillamment.", 'good'); } else addLog(s, "Prestation moyenne. Personne ne t'a retenu.", 'warn'); }
      },
      { label: "Refuser", effects: {} }
    ]
  },
  {
    id: 'contact_investit', title: "Un contact veut co-investir avec toi",
    text: null,
    dynamic: s => {
      const k = s.contacts.find(c => c.relation > 55 && c.kind === 'investor');
      if (!k) return null;
      return { text: `${k.name} te propose d'entrer ensemble sur une affaire. Ticket : 40 000€ chacun.`, ref: { k } };
    },
    cond: s => s.contacts.some(c => c.relation > 55 && c.kind === 'investor') && s.money > 45000,
    choices: [
      {
        label: "Investir 40 000€ avec lui", custom: (s, ref) => {
          s.money -= 40000;
          const win = Math.random() < 0.35 + ref.k.level / 200;
          if (win) { const g = Math.round(40000 * rand(1.8, 3.2)); s.money += g; ref.k.relation = clamp(ref.k.relation + 15, 0, 100); addLog(s, `L'affaire rapporte ${fmt(g)}.`, 'good'); }
          else { addLog(s, "L'affaire ne s'est jamais faite. Argent immobilisé puis perdu.", 'bad'); }
        }
      },
      { label: "Décliner poliment", custom: (s, ref) => { ref.k.relation = clamp(ref.k.relation - 8, 0, 100); } }
    ]
  },
  {
    id: 'contact_client', title: "Un contact t'ouvre une porte",
    text: null,
    dynamic: s => {
      const k = s.contacts.find(c => c.relation > 45);
      if (!k || !s.companies.length) return null;
      return { text: `${k.name} peut t'introduire auprès d'un client important pour ${biggest(s).name}. Il te demande juste de ne pas le décevoir.`, ref: { k, c: biggest(s) } };
    },
    cond: s => s.contacts.some(c => c.relation > 45) && s.companies.length > 0,
    choices: [
      {
        label: "Accepter l'introduction", custom: (s, ref) => {
          const n = Math.max(1, Math.round(capacity(ref.c) * 0.12));
          ref.c.clients += n;
          ref.k.favors++;
          ref.k.relation = clamp(ref.k.relation - 10, 0, 100);
          addLog(s, `${ref.c.name} : +${n} clients grâce à ${ref.k.name}. Tu lui dois quelque chose.`, 'good');
        }
      },
      { label: "Refuser, tu préfères ne rien devoir", custom: (s, ref) => { ref.k.relation = clamp(ref.k.relation + 4, 0, 100); } }
    ]
  },
  {
    id: 'contact_recrue', title: "Un contact te recommande quelqu'un",
    text: null,
    dynamic: s => {
      const k = s.contacts.find(c => c.relation > 40 && (c.kind === 'recruiter' || c.kind === 'mentor'));
      if (!k || !s.companies.length) return null;
      return { text: `${k.name} connaît quelqu'un d'excellent qui cherche un nouveau poste. « Prends-le avant qu'un autre le fasse. »`, ref: { k, c: biggest(s) } };
    },
    cond: s => s.contacts.some(c => c.relation > 40 && (c.kind === 'recruiter' || c.kind === 'mentor')) && s.companies.length > 0,
    choices: [
      {
        label: "Le rencontrer", custom: (s, ref) => {
          const cand = makeCandidate(pick(ROLES).id, 0.6 + ref.k.level / 250);
          cand.revealed = true;
          ref.c.applicants.push(cand);
          ref.k.relation = clamp(ref.k.relation - 6, 0, 100);
          addLog(s, `${cand.name} (niveau ${cand.skill}) postule chez ${ref.c.name}.`, 'good');
        }
      },
      { label: "Pas de poste ouvert en ce moment", effects: {} }
    ]
  },
  {
    id: 'trahison_associe', title: "Ton associé te lâche",
    text: null,
    dynamic: s => {
      const c = s.companies.find(x => x.staff.some(e => e.equity));
      if (!c) return null;
      const e = c.staff.find(x => x.equity);
      return { text: `${e.name}, ton associé, veut sortir du capital. Il exige d'être racheté au prix fort, tout de suite.`, ref: { e, c } };
    },
    cond: s => s.companies.some(c => c.staff.some(e => e.equity)),
    choices: [
      {
        label: "Le racheter", custom: (s, ref) => {
          const price = Math.round(valuation(ref.c) * ref.e.equity * 1.4);
          if (s.money < price) return addLog(s, `Il faudrait ${fmt(price)}. Tu ne les as pas : il reste, la relation est morte.`, 'bad');
          s.money -= price; ref.c.equity += ref.e.equity;
          ref.c.staff = ref.c.staff.filter(x => x !== ref.e);
          addLog(s, `Tu rachètes ses parts pour ${fmt(price)}. Tu es de nouveau seul.`, 'info');
        }
      },
      {
        label: "Refuser et le laisser partir avec ses parts", custom: (s, ref) => {
          ref.c.staff = ref.c.staff.filter(x => x !== ref.e);
          addLog(s, `${ref.e.name} part en gardant ${Math.round(ref.e.equity * 100)}% de ${ref.c.name}. Un actionnaire dormant et rancunier.`, 'warn');
        }
      }
    ]
  },
  {
    id: 'concurrent', title: "Un concurrent agressif",
    text: "Une boîte financée casse les prix sur ton marché et rachète tous les mots-clés publicitaires.",
    cond: s => s.companies.some(c => c.clients > 30),
    choices: [
      { label: "Baisser tes prix", custom: s => { const c = biggest(s); if (c) { c.price *= 0.85; addLog(s, `${c.name} : prix baissés de 15% pour tenir.`, 'warn'); } } },
      { label: "Miser sur la qualité et la marque", custom: s => { const c = biggest(s); if (c) { c.quality = clamp(c.quality + 12, 0, 100); c.cash -= 6000; addLog(s, `${c.name} : 6 000€ investis dans le produit.`, 'info'); } } },
      {
        label: "Écraser en budget publicitaire", custom: s => {
          const c = biggest(s); if (!c) return;
          CHANNELS.forEach(ch => c.budgets[ch.id] = Math.round((c.budgets[ch.id] || 0) * 1.8) + 500);
          addLog(s, `${c.name} : budgets d'acquisition augmentés agressivement.`, 'warn');
        }
      }
    ]
  },
  {
    id: 'viral', title: "Une vidéo devient virale",
    text: "Un contenu que tu as posté sans y croire explose. Deux millions de vues en 48 heures.",
    cond: s => s.companies.length > 0 && s.skills.marketing > 25,
    choices: [
      {
        label: "Capitaliser à fond", custom: s => {
          const c = biggest(s);
          if (c) { c.clients = Math.round(c.clients * 1.5) + 15; c.hype = 1.2; }
          s.reputation = clamp(s.reputation + 8, 0, 100);
          addLog(s, "Afflux massif de clients et de notoriété.", 'good');
        }
      },
      { label: "Rester discret", effects: { reputation: 3, happiness: 2 } }
    ]
  }
];
