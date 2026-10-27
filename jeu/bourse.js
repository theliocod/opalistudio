/* =========================================================
   EMPIRE — L'introduction en bourse
   Vendre à un fonds, c'est traiter avec quelques personnes
   qu'on peut convaincre. S'introduire en bourse, c'est
   accepter que des milliers de gens qu'on ne rencontrera
   jamais votent chaque jour sur ce qu'on vaut — et qu'ils
   aient le droit de se tromper à ton sujet pendant des mois.
   On y gagne beaucoup d'argent et on y perd le silence.
   ========================================================= */

/* ---------------------------------------------------------
   LA FENÊTRE
   On ne s'introduit pas quand on veut : on s'introduit quand
   le marché veut bien acheter. Et il ne veut pas toujours.
   --------------------------------------------------------- */

const IPO_MIN_REVENUE = 90000;      // chiffre d'affaires mensuel
const IPO_MIN_DAYS = 1080;          // trois ans d'existence
const IPO_MIN_STAFF = 8;

function ipoRequirements(c) {
  return [
    { ok: projectedRevenue(c) >= IPO_MIN_REVENUE, txt: `${fmt(IPO_MIN_REVENUE)} de chiffre d'affaires mensuel`,
      now: fmt(projectedRevenue(c)) },
    { ok: c.days >= IPO_MIN_DAYS, txt: `trois ans d'historique`, now: `${Math.floor(c.days / 360)} an(s)` },
    { ok: c.staff.length >= IPO_MIN_STAFF, txt: `${IPO_MIN_STAFF} salariés`, now: `${c.staff.length}` },
    { ok: (c.avgProfit || 0) > 0, txt: `des résultats positifs sur la durée`, now: fmt(c.avgProfit || 0) },
    { ok: S.skills.finance >= 55, txt: `un niveau de finance de 55`, now: S.skills.finance.toFixed(0) }
  ];
}

function ipoReady(c) { return ipoRequirements(c).every(r => r.ok); }

/* Le marché veut-il de nouvelles introductions en ce moment ? */
function ipoWindow(s = S) {
  const p = ecoPhase(s);
  const k = { euphorie: 1.45, expansion: 1.1, reprise: 0.75, retournement: 0.35, crise: 0.08 }[p.id] || 0.7;
  return k;
}

function ipoWindowLabel(s = S) {
  const w = ipoWindow(s);
  if (w >= 1.3) return { t: 'good', txt: "La fenêtre est grande ouverte. Tout le monde s'introduit, et tout le monde achète. Ça ne durera pas." };
  if (w >= 1) return { t: 'good', txt: "Le marché accueille les nouvelles sociétés sans se poser trop de questions." };
  if (w >= 0.7) return { t: 'info', txt: "Le marché est ouvert, mais il regarde les comptes de près." };
  if (w >= 0.3) return { t: 'warn', txt: "Les introductions se reportent les unes après les autres. Ce n'est pas le moment." };
  return { t: 'bad', txt: "La fenêtre est fermée. Personne ne s'introduit en pleine crise, et ceux qui essaient le regrettent." };
}

/* ---------------------------------------------------------
   S'INTRODUIRE
   --------------------------------------------------------- */

/* Le prix auquel les banques placeront le titre. */
function ipoPricing(c, floatPct) {
  // Une société cotée se valorise trésorerie comprise, dette déduite —
  // c'est ce que le marché achète.
  const base = Math.max(0, valuation(c) + c.cash - companyDebt(c));
  const window = ipoWindow(S);
  const cap = Math.round(base * window);
  // Les banques placent toujours un peu en dessous : c'est ce qui fait
  // le « premier jour réussi » dont elles se vantent ensuite, et c'est
  // la part que tu laisses à ceux qui achètent le matin de l'entrée.
  const discount = clamp(0.88 - (1 - window) * 0.15, 0.6, 0.94);
  const raised = Math.round(cap * floatPct * discount);
  const fees = Math.round(raised * clamp(0.07 - S.skills.finance / 1400, 0.035, 0.07));
  return { cap, raised, fees, net: raised - fees, discount, window };
}

const IPO_FLOATS = [
  { pct: 0.15, name: "15 % du capital", desc: "Le minimum acceptable. Tu gardes tout le contrôle, tu lèves peu, et le titre sera illiquide et nerveux.", vol: 1.45 },
  { pct: 0.25, name: "25 % du capital", desc: "Le format classique. Assez de flottant pour un vrai marché, assez peu pour rester maître chez toi.", vol: 1 },
  { pct: 0.40, name: "40 % du capital", desc: "Tu lèves beaucoup. Tu descends près de la barre où l'on peut te destituer.", vol: 0.8 }
];

function initBourse(c) {
  if (!c.ipo) return null;
  return c.ipo;
}

function goPublic(uid, floatPct) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c || c.ipo) return;
  if (!ipoReady(c)) return toast("Tu ne remplis pas encore les conditions d'une introduction.");
  if (ipoWindow(S) < 0.3) return toast("La fenêtre est fermée : les banques refusent de placer le titre aujourd'hui.");

  const f = IPO_FLOATS.find(x => x.pct === floatPct) || IPO_FLOATS[1];
  const pr = ipoPricing(c, f.pct);
  const sold = Math.min(c.equity * 0.8, f.pct);   // on ne vend que du sien, jamais tout

  c.ipo = {
    day: S.day,
    price: 100,                       // base 100 le jour de l'introduction
    open: 100,
    cap: pr.cap,
    float: f.pct,
    vol: f.vol,
    lockup: S.day + 180,              // six mois avant de pouvoir vendre
    history: [100],
    quarters: [],
    lastQuarter: S.day,
    activists: 0,
    warned: 0
  };
  c.equity = +(c.equity - sold).toFixed(4);
  c.cash += pr.net * 0.4;             // une partie va dans la société
  S.money += pr.net * 0.6;            // le reste, c'est ta sortie partielle
  S.reputation = clamp(S.reputation + 12, 0, 100);
  addHappiness(12);

  addLog(S, `🔔 ${c.name} entre en bourse : ${fmt(pr.cap)} de capitalisation, ${fmt(pr.raised)} levés, ` +
    `${fmt(pr.fees)} de frais de placement. Tu descends à ${Math.round(c.equity * 100)} % et tu ne peux rien vendre ` +
    `avant six mois. À partir d'aujourd'hui, tes résultats trimestriels sont publics.`, 'good');
  S.forcedEvent = 'ipo_premier_jour';
  render();
}

/* ---------------------------------------------------------
   LE COURS
   Il ne suit pas les résultats. Il suit l'écart entre les
   résultats et ce que les gens attendaient.
   --------------------------------------------------------- */

function ipoValue(c) {
  const b = c.ipo;
  if (!b) return 0;
  return b.cap * (b.price / 100);
}

/* Ce que vaut ta part, au cours du jour. */
function ipoEquityValue(c) {
  return ipoValue(c) * c.equity;
}

function tickBourse(c) {
  const b = c.ipo;
  if (!b) return;

  /* --- la dérive quotidienne : le marché a une humeur --- */
  const macro = (ecoValuation(S) - 1) * 0.06;
  const sector = (ecoSector(S, sectorOfCompany(c)) - 1) * 0.05;
  const noise = rand(-1, 1) * 0.9 * b.vol;
  b.price = Math.max(3, b.price * (1 + (macro + sector) / 100) + noise);

  /* --- le trimestre : le moment où l'on rend des comptes --- */
  if (S.day - b.lastQuarter >= 90) {
    b.lastQuarter = S.day;
    publishQuarter(c);
  }

  b.history.push(Math.round(b.price * 10) / 10);
  if (b.history.length > 400) b.history.shift();

  /* --- les activistes --- */
  // Un cours qui s'effondre attire des gens qui pensent faire mieux
  // que toi. Ils ont parfois raison, et c'est ça le pire.
  if (b.price < 62 && !b.activists && Math.random() < 0.004) {
    b.activists = 1;
    S.forcedEvent = 'ipo_activiste';
    addLog(S, `Un fonds activiste monte au capital de ${c.name} et écrit au conseil. ` +
      `Il trouve que la société est mal dirigée. Il le dit publiquement.`, 'bad');
  }
  if (b.activists && b.price > 105) {
    b.activists = 0;
    addLog(S, `L'activiste solde sa position sur ${c.name} avec une plus-value et va embêter quelqu'un d'autre.`, 'info');
  }

  /* --- l'éviction --- */
  if (b.activists && b.price < 42 && c.equity < 0.5) {
    b.warned++;
    if (b.warned > 120) {
      oustFounder(c);
    }
  } else if (b.warned > 0) b.warned--;
}

/* Publier ses comptes. Le marché ne récompense pas la performance :
   il récompense la surprise. */
function publishQuarter(c) {
  const b = c.ipo;
  const profit = c.avgProfit !== undefined ? c.avgProfit : projectedProfit(c);
  const growth = clamp(c.growth || 0, -0.6, 2);

  // Les attentes montent avec ce que tu as déjà livré : réussir une
  // fois, c'est s'engager à recommencer.
  if (b.expect === undefined) b.expect = Math.max(1, profit);
  const beat = (profit - b.expect) / Math.max(1000, Math.abs(b.expect));

  let move = clamp(beat * 22, -34, 34);
  move += clamp(growth * 12, -14, 22);
  // Une société qui gagne de l'argent trimestre après trimestre finit
  // par être payée pour ça, même sans rien annoncer de spectaculaire.
  if (profit > 0) move += 1.6;
  if (profit < 0) move -= 10;
  if ((c.staff || []).length && initCulture(c) < 30) move -= 3;
  move *= b.vol;
  move += rand(-3, 3);

  b.price = Math.max(3, b.price * (1 + move / 100));
  // La barre monte de ce que tu viens de montrer que tu sais faire —
  // pas davantage. Sinon aucune société ne pourrait jamais suivre.
  b.expect = Math.max(1, profit * (1 + clamp(growth, -0.1, 0.35) * 0.5));
  b.quarters.push({ d: S.day, profit: Math.round(profit), move: Math.round(move * 10) / 10, price: Math.round(b.price) });
  if (b.quarters.length > 24) b.quarters.shift();

  addLog(S, `📊 Résultats trimestriels de ${c.name} : ${fmt(profit)} de résultat mensuel moyen. ` +
    `Le titre ${move >= 0 ? 'monte' : 'baisse'} de ${Math.abs(move).toFixed(1)} % à ${Math.round(b.price)}. ` +
    (move < -12 ? "Les analystes parlent d'un « trimestre décevant » — le mot est faible."
      : move > 12 ? "Le marché n'attendait pas ça. Il t'en demandera encore plus au prochain."
        : "Rien de spectaculaire, ce qui est déjà une nouvelle."),
    move >= 0 ? 'good' : 'warn');
}

/* Le jour où le conseil décide que tu n'es plus la bonne personne. */
function oustFounder(c) {
  const b = c.ipo;
  const price = Math.round(ipoEquityValue(c));
  S.money += price;
  S.exits.push({ name: c.name + ' (évincé)', price, day: S.day });
  S.companies = S.companies.filter(x => x.uid !== c.uid);
  S.plan = S.plan.filter(p => !(p.act === 'biz' && p.ref === c.uid));
  S.reputation = clamp(S.reputation - 14, 0, 100);
  addHappiness(-26);
  addLog(S, `⚖️ Le conseil de ${c.name} te démet de tes fonctions. Le communiqué parle de « nouvelle étape ». ` +
    `Tu récupères ${fmt(price)} de titres et tu apprends la nouvelle en même temps que la presse. ` +
    `C'était ta société. Ce ne l'est plus.`, 'bad');
  S.forcedEvent = 'ipo_evince';
  render();
}

/* ---------------------------------------------------------
   VENDRE SES TITRES
   --------------------------------------------------------- */

function canSellShares(c) {
  return c.ipo && S.day >= c.ipo.lockup;
}

function sellShares(uid, pct) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c || !c.ipo) return;
  if (!canSellShares(c)) {
    const left = Math.ceil((c.ipo.lockup - S.day) / 30);
    return toast(`Période de blocage : tu ne peux pas vendre avant ${left} mois.`);
  }
  const sell = Math.min(pct, Math.max(0, c.equity - 0.02));
  if (sell <= 0) return toast("Tu n'as plus grand-chose à vendre.");

  // Vendre ses propres titres quand on dirige la société, ça se voit,
  // ça se déclare, et le marché en tire ses conclusions.
  const gross = ipoValue(c) * sell;
  const tax = gross * clamp(0.30 - S.skills.finance / 900, 0.17, 0.30);
  c.equity = +(c.equity - sell).toFixed(4);
  S.money += gross - tax;
  c.ipo.price = Math.max(3, c.ipo.price * (1 - sell * 0.55));

  addLog(S, `Tu cèdes ${(sell * 100).toFixed(1)} % de ${c.name} sur le marché : ${fmt(gross - tax)} nets après ${fmt(tax)} d'impôt. ` +
    `La déclaration est publique et le titre recule — quand le fondateur vend, personne ne trouve ça rassurant.`, 'info');
  if (c.equity < 0.15) addLog(S, `Tu ne détiens plus que ${Math.round(c.equity * 100)} % de ${c.name}. Le conseil s'en apercevra.`, 'warn');
  render();
}

/* Racheter ses propres titres : ça soutient le cours et ça consomme
   la trésorerie de la société. Les deux sont vrais en même temps. */
function buyback(uid) {
  const c = S.companies.find(x => x.uid === uid);
  if (!c || !c.ipo) return;
  const budget = Math.round(c.cash * 0.4);
  if (budget < 1000) return toast("La trésorerie ne permet pas un rachat d'actions.");
  if (c.ipo.lastBuyback && S.day - c.ipo.lastBuyback < 90)
    return toast("Tu viens d'en faire un. Un rachat d'actions par trimestre, pas plus — au-delà, ça n'impressionne plus personne.");
  const share = budget / Math.max(1, ipoValue(c));
  c.cash -= budget;
  c.ipo.lastBuyback = S.day;
  c.ipo.price *= 1 + Math.min(0.12, share * 1.2);
  addLog(S, `${c.name} rachète ${fmt(budget)} de ses propres actions. Le titre monte. ` +
    `C'est de l'argent qui ne servira pas à faire grandir la société — le marché le sait aussi.`, 'info');
  render();
}

/* ---------------------------------------------------------
   AFFICHAGE
   --------------------------------------------------------- */

function ipoSparkline(b, w = 460, h = 90) {
  const v = b.history.slice(-180);
  if (v.length < 2) return '';
  const min = Math.min(...v, 90), max = Math.max(...v, 110);
  const span = Math.max(1, max - min);
  const pts = v.map((y, i) => `${(i / (v.length - 1) * w).toFixed(1)},${(h - (y - min) / span * h).toFixed(1)}`).join(' ');
  const up = v[v.length - 1] >= 100;
  const col = up ? '#22c55e' : '#ef4444';
  const base = h - (100 - min) / span * h;
  return `
  <svg class="ipo-chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="cours de l'action">
    <defs><linearGradient id="ipoG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${col}" stop-opacity=".28"/>
      <stop offset="100%" stop-color="${col}" stop-opacity="0"/>
    </linearGradient></defs>
    ${base >= 0 && base <= h ? `<line x1="0" y1="${base.toFixed(1)}" x2="${w}" y2="${base.toFixed(1)}"
      stroke="#26314a" stroke-width="1" stroke-dasharray="4 4"/>` : ''}
    <polygon points="0,${h} ${pts} ${w},${h}" fill="url(#ipoG)"/>
    <polyline points="${pts}" fill="none" stroke="${col}" stroke-width="2" stroke-linejoin="round"/>
  </svg>`;
}

function renderBourse(c) {
  const b = c.ipo;

  /* --- pas encore cotée --- */
  if (!b) {
    const reqs = ipoRequirements(c);
    const ready = reqs.every(r => r.ok);
    const w = ipoWindowLabel(S);
    return `
    <h4 style="margin-top:18px"><i class="fas fa-bell-concierge"></i> Entrer en bourse</h4>
    <p class="row-sub">
      Une introduction transforme ta société en objet public : tu lèves beaucoup d'argent d'un coup,
      tu peux enfin vendre une partie de ce que tu as construit — et tu rends des comptes tous les
      trois mois à des gens qui n'ont jamais mis les pieds chez toi.
    </p>
    <div class="ipo-window ${w.t}"><i class="fas fa-door-open"></i> ${w.txt}</div>
    <div class="ipo-reqs">
      ${reqs.map(r => `<div class="ipo-req ${r.ok ? 'ok' : ''}">
        <i class="fas ${r.ok ? 'fa-circle-check' : 'fa-circle'}"></i>
        <span>${r.txt}</span><b>${r.now}</b>
      </div>`).join('')}
    </div>
    ${ready ? `
    <div class="ipo-floats">
      ${IPO_FLOATS.map(f => {
        const pr = ipoPricing(c, f.pct);
        return `
        <div class="ipo-float">
          <b>${f.name}</b>
          <span class="row-sub">${f.desc}</span>
          <div class="metric"><span>Capitalisation visée</span><b>${fmt(pr.cap)}</b></div>
          <div class="metric"><span>Montant levé</span><b class="pos">${fmt(pr.raised)}</b></div>
          <div class="metric"><span>Frais de placement</span><b class="neg">-${fmt(pr.fees)}</b></div>
          <button class="btn btn-sm btn-primary" data-act="ipo" data-id="${c.uid}" data-pct="${f.pct}">
            S'introduire — ${fmt(pr.net)} nets
          </button>
        </div>`;
      }).join('')}
    </div>` : `<p class="row-sub"><i class="fas fa-lock"></i>
      Les banques ne placeront pas une société qui ne coche pas toutes les cases. Elles ont leur réputation à tenir.</p>`}`;
  }

  /* --- cotée --- */
  const perf = b.price - 100;
  const val = ipoValue(c);
  const mine = ipoEquityValue(c);
  const locked = !canSellShares(c);
  const last = b.quarters.slice(-4).reverse();

  return `
  <h4 style="margin-top:18px"><i class="fas fa-chart-line"></i> ${c.name} est cotée</h4>
  <div class="ipo-top">
    <div><span>Cours</span><b class="${perf >= 0 ? 'pos' : 'neg'}">${b.price.toFixed(1)}</b><em>base 100 à l'introduction</em></div>
    <div><span>Depuis l'entrée</span><b class="${perf >= 0 ? 'pos' : 'neg'}">${perf >= 0 ? '+' : ''}${perf.toFixed(1)} %</b><em>${Math.floor((S.day - b.day) / 30)} mois de cotation</em></div>
    <div><span>Capitalisation</span><b>${fmt(val)}</b><em>flottant ${Math.round(b.float * 100)} %</em></div>
    <div><span>Ta participation</span><b class="accent">${fmt(mine)}</b><em>${Math.round(c.equity * 100)} % du capital</em></div>
  </div>
  ${ipoSparkline(b)}

  ${b.activists ? `<div class="alert"><i class="fas fa-gavel"></i>
    Un fonds activiste est à ton capital et demande ta tête au conseil. Tant que le cours reste bas
    et que tu détiens moins de la moitié des titres, il peut y arriver.</div>` : ''}
  ${locked ? `<div class="alert soft"><i class="fas fa-lock"></i>
    Période de blocage : tu ne peux pas vendre tes titres avant ${Math.ceil((b.lockup - S.day) / 30)} mois.
    C'est la contrepartie qu'on t'a demandée pour que les autres achètent.</div>` : ''}

  ${last.length ? `
  <h4 style="margin-top:16px">Les derniers trimestres</h4>
  <div class="ipo-quarters">
    ${last.map(q => `
      <div class="ipo-q">
        <span>${fmt(q.profit)} de résultat</span>
        <b class="${q.move >= 0 ? 'pos' : 'neg'}">${q.move >= 0 ? '+' : ''}${q.move} %</b>
      </div>`).join('')}
  </div>
  <p class="row-sub">Le marché ne paie pas ce que tu gagnes, il paie l'écart avec ce qu'il attendait.
  Chaque bon trimestre relève la barre du suivant.</p>` : ''}

  <div class="btn-row" style="margin-top:14px">
    <button class="btn btn-sm ${locked ? 'btn-ghost' : ''}" data-act="sellShares" data-id="${c.uid}" data-pct="0.05" ${locked ? 'disabled' : ''}>
      <i class="fas fa-arrow-up-from-bracket"></i> Céder 5 % (${fmt(val * 0.05)})</button>
    <button class="btn btn-sm ${locked ? 'btn-ghost' : ''}" data-act="sellShares" data-id="${c.uid}" data-pct="0.15" ${locked ? 'disabled' : ''}>
      Céder 15 % (${fmt(val * 0.15)})</button>
    <button class="btn btn-sm" data-act="buyback" data-id="${c.uid}">
      <i class="fas fa-rotate-left"></i> Racheter des actions (${fmt(c.cash * 0.4)})</button>
  </div>`;
}
