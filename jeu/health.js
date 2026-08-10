/* =========================================================
   EMPIRE — Le corps
   Jusqu'ici la santé était une jauge qui descendait quand on
   travaillait trop et remontait quand on faisait du sport.
   Or ce n'est pas comme ça que ça se passe. On ne s'use pas,
   on s'endette : de sommeil, de repos, d'attention. Un jour
   la dette est appelée, et ce jour-là on ne choisit plus.
   Et certaines choses ne se réparent pas. Elles se gèrent,
   pour le reste de la partie.
   ========================================================= */

/* ---------------------------------------------------------
   LES MALADIES
   Chacune arrive pour une raison, coûte quelque chose tous
   les mois, et ne s'en va jamais complètement. On peut la
   contenir — c'est tout ce qu'on peut faire.
   --------------------------------------------------------- */

const CONDITIONS = [
  {
    id: 'dos', name: 'Dos bloqué', icon: 'fa-person-falling',
    risk: s => (s.body.desk / 100) * (s.age > 32 ? 1.35 : 0.9) * clamp(1.25 - fitnessOf(s) / 90, 0.15, 1.25),
    care: 240,
    onset: "Tu te baisses pour ramasser un stylo et tu ne te relèves pas. Douze ans de chaise, l'addition.",
    effect: "Chaque journée longue coûte plus cher qu'avant.",
    mods: { strain: 1.18, energyCap: -6 }
  },
  {
    id: 'sommeil', name: 'Insomnie chronique', icon: 'fa-moon',
    risk: s => Math.pow(s.body.sleep / 100, 1.6) * 1.3,
    care: 190,
    onset: "Tu t'endors à 2h, tu te réveilles à 4h, et tu regardes le plafond jusqu'au matin. Toutes les nuits.",
    effect: "Tu récupères beaucoup moins bien, quoi que tu fasses.",
    mods: { recovery: 0.78, mood: -0.35 }
  },
  {
    id: 'anxiete', name: 'Trouble anxieux', icon: 'fa-heart-crack',
    risk: s => Math.pow(s.body.burn / 100, 1.5) * 1.5 * (s.happiness < 35 ? 1.6 : 1),
    care: 320,
    onset: "Ça commence par le souffle court dans une réunion. Puis c'est dans le métro. Puis c'est tout le temps.",
    effect: "Tu tiens, mais tu tiens moins bien : chaque décision te coûte.",
    mods: { eff: 0.9, mood: -0.5, burnRate: 1.25 }
  },
  {
    id: 'tension', name: 'Hypertension', icon: 'fa-heart-pulse',
    risk: s => (s.age > 42 ? (s.age - 42) / 95 : 0) + (1 - fitnessOf(s) / 100) * 0.55 + s.body.burn / 220,
    care: 210,
    onset: "Le médecin repasse le brassard deux fois, puis il arrête de sourire. 17/11 à ton âge, ce n'est pas normal.",
    effect: "Ton corps encaisse moins bien, et le risque d'accident grave existe désormais.",
    mods: { health: -0.22, energyCap: -8, grave: 0.00035 }
  },
  {
    id: 'estomac', name: 'Ulcère', icon: 'fa-pills',
    risk: s => (s.body.burn / 100) * 0.8 + Math.max(0, 35 - s.happiness) * 0.016 + (s.body.sleep / 100) * 0.45,
    care: 160,
    onset: "Ça brûle depuis des mois. Tu mettais ça sur le café. C'était l'estomac qui se perçait.",
    effect: "Tu ne peux plus rien avaler quand ça va mal — et ça va souvent mal.",
    mods: { health: -0.18, mood: -0.3 }
  },
  {
    id: 'audition', name: 'Acouphènes', icon: 'fa-ear-listen',
    risk: s => (s.body.parties / 520) + (s.body.burn / 100) * 0.35,
    care: 130,
    onset: "Un sifflement aigu, à droite, qui ne s'arrête plus. Ni la nuit, ni jamais.",
    effect: "Le silence n'existe plus. Dormir devient un travail.",
    mods: { recovery: 0.9, mood: -0.4 }
  },
  {
    id: 'genou', name: 'Genou usé', icon: 'fa-crutch',
    risk: s => (s.age > 45 ? (s.age - 45) / 70 : 0) + (fitnessOf(s) > 70 ? 0.28 : 0),
    care: 180,
    onset: "Le cartilage ne se refait pas. Le tien a fait son temps.",
    effect: "Le sport ne te rend plus ce qu'il te rendait.",
    mods: { sport: 0.55, energyCap: -4 }
  },
  {
    id: 'infarctus', name: 'Accident cardiaque', icon: 'fa-notes-medical',
    risk: () => 0,          // ne se tire jamais au sort : c'est une conséquence
    care: 480,
    onset: "Tu te réveilles à l'hôpital. On te dit que tu as eu de la chance. Tu ne trouves pas.",
    effect: "Plus rien ne sera comme avant. Tu as un corps, maintenant, et il commande.",
    mods: { energyCap: -22, eff: 0.86, recovery: 0.85, health: -0.15 }
  }
];

function getCondition(id) { return CONDITIONS.find(c => c.id === id); }

/* ---------------------------------------------------------
   L'ÉTAT DU CORPS
   --------------------------------------------------------- */

function initBody(s) {
  if (!s.body) {
    s.body = {
      sleep: 0,       // dette de sommeil, 0-100
      burn: 0,        // épuisement professionnel, 0-100
      desk: 0,        // années passées assis, en points
      parties: 0,     // soirées accumulées
      fit: 42,        // condition physique
      conds: [],      // maladies installées, par id
      off: 0,         // jours d'arrêt forcé restants
      offReason: '',
      lastCheck: -999,
      care: {},       // maladies suivies médicalement : id -> jour de début
      seen: []        // maladies déjà annoncées
    };
  }
  return s.body;
}

function fitnessOf(s) { return initBody(s).fit; }
function hasCondition(s, id) { return initBody(s).conds.includes(id); }
function isOff(s = S) { return initBody(s).off > 0; }

/* Le cumul des modificateurs de toutes les maladies installées.
   Une maladie suivie fait moitié moins mal — mais elle est là. */
function bodyMods(s = S) {
  const b = initBody(s);
  const m = { strain: 1, recovery: 1, eff: 1, mood: 0, health: 0, energyCap: 0, sport: 1, burnRate: 1, grave: 0 };
  b.conds.forEach(id => {
    const cd = getCondition(id);
    if (!cd) return;
    const soft = b.care[id] ? 0.5 : 1;      // le suivi médical n'efface pas, il atténue
    Object.entries(cd.mods).forEach(([k, v]) => {
      if (k === 'mood' || k === 'health' || k === 'energyCap' || k === 'grave') m[k] += v * soft;
      else m[k] *= 1 + (v - 1) * soft;
    });
  });
  return m;
}

/* Ce que le corps coûte tous les mois : traitements et suivis. */
function careCost(s = S) {
  const b = initBody(s);
  return Object.keys(b.care).reduce((a, id) => a + (getCondition(id)?.care || 0), 0);
}

/* Le plafond d'énergie réel, une fois l'âge et les maladies comptés. */
function energyCeiling(s = S) {
  const age = s.age;
  // On ne récupère pas à 55 ans comme à 22. Ça commence tôt et
  // ça ne s'arrête plus.
  const wear = age <= 30 ? 0 : Math.pow(age - 30, 1.28) * 0.42;
  return clamp(s.maxEnergy - wear + bodyMods(s).energyCap, 42, 140);
}

/* ---------------------------------------------------------
   LE TIC QUOTIDIEN
   --------------------------------------------------------- */

function tickBody(s, hours, totalHours) {
  const b = initBody(s);
  const D = DAYS_PER_MONTH;

  /* --- arrêt forcé : on ne décide plus rien --- */
  if (b.off > 0) {
    b.off--;
    b.sleep = Math.max(0, b.sleep - 2.4);
    b.burn = Math.max(0, b.burn - 1.9);
    s.energy = clamp(s.energy + 5, 0, energyCeiling(s));
    s.health = clamp(s.health + 0.35, 0, 100);
    if (b.off === 0) {
      addLog(s, `Le médecin te laisse repartir. ${b.offReason} Tu as perdu des semaines — et tu as compris quelque chose.`, 'info');
      b.offReason = '';
      addHappiness(4);
    }
    return;
  }

  /* --- la dette de sommeil --- */
  const over = Math.max(0, totalHours - CONFIG.baseHours);
  const rest = Math.max(0, maxHours() - totalHours);
  let dSleep = over * 0.62 - rest * 0.75 - (hours.sport || 0) * 0.22;
  if (s.energy < 30) dSleep += 0.8;
  b.sleep = clamp(b.sleep + dSleep, 0, 100);

  /* --- l'usure du bureau et des soirées --- */
  // Une heure de sport compense à peu près une journée de bureau : ce qui
  // s'accumule, ce n'est pas le travail, c'est le travail sans rien d'autre.
  b.desk = clamp(b.desk + ((hours.biz || 0) + (hours.job || 0) + (hours.study || 0)) * 0.010 - (hours.sport || 0) * 0.095, 0, 100);
  b.parties = Math.max(0, b.parties - 0.004);

  /* --- la condition physique --- */
  // Plus on est en forme, plus il en coûte pour l'être davantage :
  // une heure par jour amène vers 75, jamais au-delà. Le reste se
  // paie en heures qu'on ne consacre pas à autre chose.
  const mods = bodyMods(s);
  const age = Math.max(0, s.age - 35);
  b.fit = clamp(b.fit
    + (hours.sport || 0) * 0.15 * mods.sport * Math.max(0, 1 - b.fit / 125)
    - 0.06 - age * 0.0016, 5, 100);

  /* --- le burnout --- */
  // Ce n'est pas le travail qui brûle, c'est le travail sans repos,
  // sans plaisir et sans sommeil. Les trois ensemble, pendant des mois :
  // à ce rythme-là, il faut environ un an pour taper dans le mur.
  let dBurn = 0;
  dBurn += over * 0.048;
  dBurn += (b.sleep / 100) * 0.10;
  if (s.happiness < 40) dBurn += (40 - s.happiness) * 0.0042;
  if (s.companies.some(c => c.cash < 0)) dBurn += 0.06;
  dBurn -= rest * 0.048;
  dBurn -= (hours.sport || 0) * 0.030;
  dBurn -= (hours.family || 0) * 0.018;
  dBurn -= (hours.social || 0) * 0.015;
  if (s.happiness > 70) dBurn -= 0.045;
  b.burn = clamp(b.burn + dBurn * mods.burnRate, 0, 110);

  /* --- le mur --- */
  if (b.burn >= 100) {
    const days = Math.round(rand(21, 48));
    b.off = days;
    b.burn = 52;
    b.sleep = Math.max(0, b.sleep - 25);
    s.energy = Math.min(s.energy, 20);
    s.health = clamp(s.health - 9, 0, 100);
    addHappiness(-16);
    b.offReason = "Épuisement professionnel.";
    s.plan = [];
    addLog(s, `🚑 Tu ne te lèves pas. Le médecin ne discute pas : ${days} jours d'arrêt, et il te dit que tu as attendu bien trop longtemps. ` +
      `Tes sociétés tournent sans toi — comme elles peuvent.`, 'bad');
    s.forcedEvent = 'sante_mur';
    return;
  }

  /* --- l'accident grave, quand le terrain est là --- */
  if (mods.grave > 0 && !hasCondition(s, 'infarctus') && Math.random() < mods.grave * (1 + b.burn / 90)) {
    b.conds.push('infarctus');
    b.seen.push('infarctus');
    b.off = Math.round(rand(60, 100));
    b.offReason = "Un cœur, ça ne se répare pas, ça se ménage.";
    s.health = clamp(s.health - 25, 0, 100);
    s.energy = 15;
    addHappiness(-22);
    s.plan = [];
    addLog(s, `🚨 ${getCondition('infarctus').onset} ${b.off} jours d'hôpital et de convalescence.`, 'bad');
    s.forcedEvent = 'sante_infarctus';
    return;
  }

  /* --- l'apparition des maladies chroniques --- */
  // Une maladie chronique n'est pas un tirage au sort qu'on refait tous
  // les mois — sur quarante-sept ans, le moindre tirage finit par sortir
  // et tout le monde attraperait tout. C'est une exposition qui
  // s'accumule : il faut que le terrain soit mauvais, et qu'il le reste
  // pendant des années. Six mois de mauvaise passe ne condamnent personne,
  // et le corps efface lentement ce qu'on lui a évité.
  if (s.day % 30 === 0) {
    b.expo = b.expo || {};
    CONDITIONS.forEach(cd => {
      if (b.conds.includes(cd.id) || cd.risk === undefined) return;
      let r = 0;
      try { r = cd.risk(s); } catch (_) { r = 0; }
      const over = r - 0.45;
      const e = b.expo[cd.id] || 0;
      b.expo[cd.id] = Math.max(0, over > 0 ? e + over : e * 0.975 - 0.02);

      if (b.expo[cd.id] < 7) return;
      const p = clamp((b.expo[cd.id] - 7) * 0.02, 0, 0.13);
      if (Math.random() < p) {
        b.conds.push(cd.id);
        b.seen.push(cd.id);
        b.expo[cd.id] = 0;
        s.health = clamp(s.health - 5, 0, 100);
        addHappiness(-7);
        addLog(s, `🩺 ${cd.name} : ${cd.onset} ${cd.effect}`, 'bad');
      }
    });
  }

  /* --- les effets permanents --- */
  s.health = clamp(s.health + mods.health / D, 0, 100);
  addHappiness(mods.mood / D);
  if (b.sleep > 65) addHappiness(-(b.sleep - 65) * 0.012 / D);

  /* --- les frais médicaux, le 1er du mois --- */
  if (s.day % 30 === 0) {
    const cost = careCost(s);
    if (cost > 0) { s.money -= cost; }
  }
}

/* Ce que le corps fait au rendement d'une journée de travail. */
function bodyEfficiency(s = S) {
  const b = initBody(s);
  const m = bodyMods(s);
  // La dette de sommeil ne se voit pas dans le miroir. Elle se voit
  // dans les décisions qu'on prend à 19h.
  // Le manque de sommeil se paie, mais pas tout de suite : c'est
  // précisément ce qui le rend dangereux. On tient les six premiers
  // mois presque sans rien perdre. C'est après que la note tombe.
  const sleepDrag = 1 - Math.pow(b.sleep / 100, 1.4) * 0.18;
  const burnDrag = 1 - Math.pow(b.burn / 100, 1.6) * 0.34;
  // Et la forme physique, qui ne fait pas de miracle mais qui se voit
  // sur la longueur : on tient les journées difficiles.
  const fitLift = 0.92 + b.fit / 100 * 0.14;
  return clamp(sleepDrag * burnDrag * fitLift * m.eff, 0.32, 1.06);
}

/* ---------------------------------------------------------
   CE QU'ON PEUT FAIRE
   --------------------------------------------------------- */

const CARE_ACTS = [
  {
    id: 'bilan', name: 'Bilan de santé complet', icon: 'fa-stethoscope', cost: 340, days: 1,
    desc: "Une matinée, une prise de sang, un cardiologue. On te dira des choses que tu ne veux pas entendre.",
    can: s => s.day - initBody(s).lastCheck > 180,
    why: "Disponible une fois tous les six mois.",
    run: s => {
      const b = initBody(s);
      b.lastCheck = s.day;
      // Un bilan attrape ce qui commence : on désamorce le risque le plus élevé
      const risky = CONDITIONS.filter(cd => !b.conds.includes(cd.id))
        .map(cd => ({ cd, r: (() => { try { return cd.risk(s); } catch (_) { return 0; } })() }))
        .sort((a, b2) => b2.r - a.r)[0];
      if (risky && risky.r > 0.4) {
        b.sleep = Math.max(0, b.sleep - 12);
        b.burn = Math.max(0, b.burn - 10);
        addLog(s, `Bilan : le médecin te met en garde sur un point précis — ${risky.cd.name.toLowerCase()}. ` +
          `Tu lèves le pied avant que ça ne s'installe.`, 'warn');
      } else {
        addHappiness(5);
        addLog(s, "Bilan : tout est normal. C'est rare, et ça fait du bien de l'entendre.", 'good');
      }
    }
  },
  {
    id: 'therapie', name: 'Voir un psy', icon: 'fa-couch', cost: 90, days: 1,
    desc: "Une heure par semaine à dire à voix haute ce que tu ne dis à personne. Ça n'enlève pas les problèmes.",
    can: () => true,
    run: s => {
      const b = initBody(s);
      b.burn = Math.max(0, b.burn - 11);
      addHappiness(4);
      s.energy = clamp(s.energy + 4, 0, energyCeiling(s));
      addLog(s, "Séance. Tu sors vidé et plus léger à la fois.", 'info');
    }
  },
  {
    id: 'coupure', name: 'Dix jours sans rien', icon: 'fa-umbrella-beach', cost: 1400, days: 10,
    desc: "Tu coupes le téléphone. Tes sociétés tournent sans toi pendant dix jours. C'est le but.",
    can: s => s.money > 1400,
    run: s => {
      const b = initBody(s);
      b.off = 10;
      b.offReason = "Tu es parti de ton plein gré, cette fois.";
      b.burn = Math.max(0, b.burn - 34);
      b.sleep = Math.max(0, b.sleep - 40);
      addHappiness(10);
      addLog(s, "Tu pars dix jours. Le monde continue sans toi — c'est une information utile.", 'good');
    }
  },
  {
    id: 'kine', name: 'Kiné et remise en forme', icon: 'fa-dumbbell', cost: 520, days: 1,
    desc: "Trois mois de séances. Le dos, les épaules, la posture. Ce qu'on aurait dû faire avant.",
    can: s => initBody(s).desk > 20 || hasCondition(s, 'dos'),
    why: "Utile quand le corps a accumulé les heures de chaise.",
    run: s => {
      const b = initBody(s);
      b.desk = Math.max(0, b.desk - 30);
      b.fit = clamp(b.fit + 9, 5, 100);
      s.health = clamp(s.health + 4, 0, 100);
      addLog(s, "Tu ressors avec un dos qui tient et des exercices que tu feras deux semaines.", 'good');
    }
  }
];

/* Prendre en charge une maladie : elle reste, elle fait moitié moins mal,
   et elle coûte tous les mois. */
function treatCondition(id) {
  const b = initBody(S);
  const cd = getCondition(id);
  if (!cd || !b.conds.includes(id)) return;
  if (b.care[id]) {
    delete b.care[id];
    addLog(S, `Tu arrêtes le suivi pour ${cd.name.toLowerCase()}. Tu économises ${fmt(cd.care)} par mois, et tu le sentiras.`, 'warn');
    return render();
  }
  const first = cd.care * 3;
  if (S.money < first) return toast(`Mettre en place un suivi demande ${fmt(first)} d'avance.`);
  S.money -= first;
  b.care[id] = S.day;
  addLog(S, `Tu prends en charge ${cd.name.toLowerCase()} : ${fmt(first)} d'avance, puis ${fmt(cd.care)} par mois. Les effets sont divisés par deux.`, 'good');
  render();
}

function doCare(id) {
  const a = CARE_ACTS.find(x => x.id === id);
  if (!a) return;
  if (a.can && !a.can(S)) return toast(a.why || "Pas maintenant.");
  if (S.money < a.cost) return toast(`Il te faut ${fmt(a.cost)}.`);
  S.money -= a.cost;
  a.run(S);
  render();
}

/* ---------------------------------------------------------
   AFFICHAGE
   --------------------------------------------------------- */

function bodyVerdict(s = S) {
  const b = initBody(s);
  if (b.off > 0) return { t: 'bad', txt: `Tu es à l'arrêt pour ${b.off} jours. ${b.offReason}` };
  if (b.burn > 80) return { t: 'bad', txt: "Tu es à deux doigts du mur. Un arrêt forcé arrive, et il ne te demandera pas ton avis." };
  if (b.burn > 60) return { t: 'warn', txt: "Tu tiens sur les nerfs. Ce rythme n'a pas de fin heureuse." };
  if (b.sleep > 70) return { t: 'warn', txt: "Tu dors trois heures de moins qu'il ne faudrait, depuis des mois. Ça se paie." };
  if (b.conds.length >= 3) return { t: 'warn', txt: "Ton corps te rappelle chaque jour ce que tu lui as demandé." };
  if (b.fit > 70 && b.burn < 25) return { t: 'good', txt: "Tu es en forme, tu dors, tu tiens la distance. Ça ne durera pas tout seul." };
  return { t: 'info', txt: "Rien d'alarmant. C'est maintenant qu'on décide de comment on vieillira." };
}

function renderBody() {
  const b = initBody(S);
  const v = bodyVerdict(S);
  const m = bodyMods(S);
  const eff = bodyEfficiency(S);
  const cost = careCost(S);

  return `
  <section class="card body">
    <h2><i class="fas fa-heart-pulse"></i> Ton corps</h2>
    <div class="body-verdict ${v.t}"><i class="fas fa-comment-medical"></i> ${v.txt}</div>

    <div class="body-gauges">
      <div>
        <span>Dette de sommeil</span>
        <b class="${b.sleep > 60 ? 'neg' : b.sleep > 30 ? '' : 'pos'}">${Math.round(b.sleep)}</b>
        ${bar(b.sleep, 100, b.sleep > 60 ? 'health' : 'energy')}
        <em>Elle se creuse quand tu dépasses ${CONFIG.baseHours} h, se comble quand tu laisses des heures libres.</em>
      </div>
      <div>
        <span>Épuisement</span>
        <b class="${b.burn > 70 ? 'neg' : b.burn > 45 ? '' : 'pos'}">${Math.round(b.burn)}</b>
        ${bar(b.burn, 100, b.burn > 70 ? 'health' : 'energy')}
        <em>À 100, tu t'arrêtes. Pas toi : ton corps.</em>
      </div>
      <div>
        <span>Condition physique</span>
        <b class="${b.fit > 60 ? 'pos' : b.fit < 30 ? 'neg' : ''}">${Math.round(b.fit)}</b>
        ${bar(b.fit, 100, 'happy')}
        <em>Une heure de sport par jour la maintient. Rien ne la maintient toute seule.</em>
      </div>
      <div>
        <span>Rendement réel</span>
        <b class="${eff > 0.85 ? 'pos' : eff < 0.65 ? 'neg' : ''}">${Math.round(eff * 100)} %</b>
        ${bar(eff * 100, 100, 'happy')}
        <em>Ce que tu produis vraiment, une fois la fatigue déduite.</em>
      </div>
    </div>

    <h4 class="chart-title">Ce que tu traînes</h4>
    ${b.conds.length ? `
    <div class="conds">
      ${b.conds.map(id => {
        const cd = getCondition(id);
        const on = !!b.care[id];
        return `
        <div class="cond ${on ? 'on' : ''}">
          <i class="fas ${cd.icon}"></i>
          <div>
            <b>${cd.name}</b>
            <span class="row-sub">${cd.effect}</span>
            ${on ? `<span class="chip ok">suivi médical — ${fmt(cd.care)}/mois</span>` : ''}
          </div>
          <button class="btn btn-sm ${on ? 'btn-ghost' : ''}" data-act="treat" data-id="${id}">
            ${on ? 'Arrêter le suivi' : `Se faire suivre — ${fmt(cd.care * 3)}`}
          </button>
        </div>`;
      }).join('')}
    </div>
    ${cost ? `<p class="row-sub">Tes traitements te coûtent <b class="neg">${fmt(cost)}</b> par mois. C'est le prix de ne plus les subir en entier.</p>` : ''}
    ` : `<p class="row-sub">Rien d'installé pour l'instant. Les maladies chroniques ne préviennent pas : elles arrivent quand le terrain est prêt depuis longtemps.</p>`}

    <h4 class="chart-title">Prendre soin de toi</h4>
    <div class="cares">
      ${CARE_ACTS.map(a => {
        const ok = (!a.can || a.can(S)) && S.money >= a.cost;
        return `
        <div class="care">
          <i class="fas ${a.icon}"></i>
          <div>
            <b>${a.name}</b>
            <span class="row-sub">${a.desc}</span>
          </div>
          <button class="btn btn-sm ${ok ? '' : 'btn-ghost'}" data-act="care" data-id="${a.id}" ${ok ? '' : 'disabled'}>
            ${fmt(a.cost)}
          </button>
        </div>`;
      }).join('')}
    </div>

    ${S.age > 34 ? `<p class="row-sub"><i class="fas fa-hourglass-half"></i>
      À ${S.age} ans, ton plafond d'énergie est de <b>${Math.round(energyCeiling(S))}</b> au lieu de ${Math.round(S.maxEnergy)}.
      Ça continuera de descendre. On ne rattrape pas le temps, on décide juste comment on le dépense.</p>` : ''}
  </section>`;
}
