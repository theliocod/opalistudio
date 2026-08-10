/* =========================================================
   EMPIRE — Finances et guide
   Un endroit pour voir d'où vient l'argent et où il part,
   et un guide qui dit quoi faire ensuite.
   ========================================================= */

/* ---------------------------------------------------------
   PETITS GRAPHIQUES SVG
   --------------------------------------------------------- */

/* Un axe lisible : on arrondit les bornes à des valeurs rondes. */
function niceScale(min, max) {
  if (max === min) { max = min + 1; }
  const span = max - min;
  const step = Math.pow(10, Math.floor(Math.log10(span / 3)));
  const mult = [1, 2, 2.5, 5, 10].find(m => span / (step * m) <= 4) || 10;
  const s = step * mult;
  return { lo: Math.floor(min / s) * s, hi: Math.ceil(max / s) * s, step: s };
}

/* Abrège proprement : 1,2 M, 340 k, -12 k */
function axisLabel(v) {
  const a = Math.abs(v);
  if (a >= 1e9) return (v / 1e9).toFixed(1).replace('.', ',').replace(',0', '') + ' Md';
  if (a >= 1e6) return (v / 1e6).toFixed(1).replace('.', ',').replace(',0', '') + ' M';
  if (a >= 1e3) return Math.round(v / 1e3) + ' k';
  return Math.round(v) + '';
}

/* Graphique en courbes : vraie grille, axes chiffrés, aire dégradée,
   et surtout un repère non déformé — c'est ce qui rendait les anciens
   graphiques illisibles. */
let CHART_SEQ = 0;
function lineChart(series, opts = {}) {
  const all = series.flatMap(s => s.values).filter(v => isFinite(v));
  if (all.length < 2) return '<p class="row-sub">Pas encore assez d\'historique.</p>';

  const H = opts.height || 150;
  const W = 480;
  const padL = 46, padR = 12, padT = 12, padB = opts.xLabels ? 22 : 10;
  const iw = W - padL - padR, ih = H - padT - padB;

  const sc = niceScale(Math.min(0, ...all), Math.max(...all, 1));
  const n = Math.max(...series.map(s => s.values.length));
  const X = i => padL + (n < 2 ? iw / 2 : (i / (n - 1)) * iw);
  const Y = v => padT + ih - ((v - sc.lo) / (sc.hi - sc.lo)) * ih;

  const ticks = [];
  for (let v = sc.lo; v <= sc.hi + 1e-9; v += sc.step) ticks.push(v);

  const uid = 'g' + (++CHART_SEQ);
  const path = s => s.values.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  const area = s => `${path(s)} L${X(s.values.length - 1).toFixed(1)} ${Y(sc.lo).toFixed(1)} L${X(0).toFixed(1)} ${Y(sc.lo).toFixed(1)} Z`;

  return `
  <div class="chart">
    <svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img">
      <defs>
        ${series.map((s, i) => `
          <linearGradient id="${uid}-${i}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${s.color}" stop-opacity="${s.fill === false ? 0 : .28}"/>
            <stop offset="100%" stop-color="${s.color}" stop-opacity="0"/>
          </linearGradient>`).join('')}
      </defs>

      ${ticks.map(v => `
        <line x1="${padL}" y1="${Y(v).toFixed(1)}" x2="${W - padR}" y2="${Y(v).toFixed(1)}"
              class="grid ${Math.abs(v) < 1e-9 ? 'grid-zero' : ''}"/>
        <text x="${padL - 7}" y="${(Y(v) + 3.4).toFixed(1)}" class="axis-y">${axisLabel(v)}</text>`).join('')}

      ${series.map((s, i) => `<path d="${area(s)}" fill="url(#${uid}-${i})"/>`).join('')}
      ${series.map(s => `
        <path d="${path(s)}" fill="none" stroke="${s.color}" stroke-width="${s.width || 2}"
              stroke-linejoin="round" stroke-linecap="round" ${s.dash ? 'stroke-dasharray="5 4"' : ''}/>`).join('')}
      ${series.map(s => {
        const i = s.values.length - 1;
        return `<circle cx="${X(i).toFixed(1)}" cy="${Y(s.values[i]).toFixed(1)}" r="3.4" fill="${s.color}" class="chart-dot"/>`;
      }).join('')}

      ${opts.xLabels ? opts.xLabels.map((l, i) => {
        const pos = Math.round(i * (n - 1) / Math.max(1, opts.xLabels.length - 1));
        return `<text x="${X(pos).toFixed(1)}" y="${H - 6}" class="axis-x"
                 text-anchor="${i === 0 ? 'start' : i === opts.xLabels.length - 1 ? 'end' : 'middle'}">${l}</text>`;
      }).join('') : ''}
    </svg>
    <div class="chart-legend">
      ${series.map(s => `
        <span><i style="background:${s.color}"></i>${s.name}
          <b>${fmt(s.values[s.values.length - 1])}</b></span>`).join('')}
    </div>
  </div>`;
}

/* Barres verticales : une valeur par mois, positives et négatives. */
function barChart(values, opts = {}) {
  if (values.length < 2) return '<p class="row-sub">Pas encore assez d\'historique.</p>';
  const H = opts.height || 130, W = 480;
  const padL = 46, padR = 12, padT = 10, padB = 20;
  const iw = W - padL - padR, ih = H - padT - padB;
  const sc = niceScale(Math.min(0, ...values), Math.max(0, ...values, 1));
  const Y = v => padT + ih - ((v - sc.lo) / (sc.hi - sc.lo)) * ih;
  const bw = Math.max(2, iw / values.length - 2);
  const ticks = [];
  for (let v = sc.lo; v <= sc.hi + 1e-9; v += sc.step) ticks.push(v);

  return `
  <div class="chart">
    <svg viewBox="0 0 ${W} ${H}" class="chart-svg">
      ${ticks.map(v => `
        <line x1="${padL}" y1="${Y(v).toFixed(1)}" x2="${W - padR}" y2="${Y(v).toFixed(1)}"
              class="grid ${Math.abs(v) < 1e-9 ? 'grid-zero' : ''}"/>
        <text x="${padL - 7}" y="${(Y(v) + 3.4).toFixed(1)}" class="axis-y">${axisLabel(v)}</text>`).join('')}
      ${values.map((v, i) => {
        const x = padL + i * (iw / values.length) + 1;
        const y0 = Y(0), y1 = Y(v);
        return `<rect x="${x.toFixed(1)}" y="${Math.min(y0, y1).toFixed(1)}"
                 width="${bw.toFixed(1)}" height="${Math.max(1, Math.abs(y1 - y0)).toFixed(1)}"
                 rx="1.5" fill="${v >= 0 ? (opts.pos || '#22c55e') : (opts.neg || '#ef4444')}" opacity=".9"/>`;
      }).join('')}
      ${opts.xLabels ? opts.xLabels.map((l, i) => {
        const pos = Math.round(i * (values.length - 1) / Math.max(1, opts.xLabels.length - 1));
        const x = padL + pos * (iw / values.length) + bw / 2;
        return `<text x="${x.toFixed(1)}" y="${H - 5}" class="axis-x"
                 text-anchor="${i === 0 ? 'start' : i === opts.xLabels.length - 1 ? 'end' : 'middle'}">${l}</text>`;
      }).join('') : ''}
    </svg>
    ${opts.legend ? `<div class="chart-legend"><span>${opts.legend}</span></div>` : ''}
  </div>`;
}

/* Répartition : un anneau, plus lisible qu'une barre écrasée. */
function donutChart(rows) {
  const data = rows.filter(r => r.value > 0);
  const total = data.reduce((a, r) => a + r.value, 0);
  if (total <= 0) return '<p class="row-sub">Aucune dépense pour l\'instant.</p>';

  const R = 54, r = 34, cx = 62, cy = 62;
  let acc = 0;
  const arcs = data.map(d => {
    const a0 = acc / total * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const a1 = acc / total * Math.PI * 2 - Math.PI / 2;
    const big = a1 - a0 > Math.PI ? 1 : 0;
    const p = (rad, ang) => `${(cx + Math.cos(ang) * rad).toFixed(2)} ${(cy + Math.sin(ang) * rad).toFixed(2)}`;
    return `<path d="M${p(R, a0)} A${R} ${R} 0 ${big} 1 ${p(R, a1)} L${p(r, a1)} A${r} ${r} 0 ${big} 0 ${p(r, a0)} Z"
                  fill="${d.color}" opacity=".92"/>`;
  }).join('');

  return `
  <div class="donut">
    <svg viewBox="0 0 124 124" class="donut-svg">
      ${arcs}
      <text x="62" y="58" class="donut-total">${axisLabel(total)}</text>
      <text x="62" y="72" class="donut-sub">par mois</text>
    </svg>
    <div class="donut-legend">
      ${data.sort((a, b) => b.value - a.value).map(d => `
        <span><i style="background:${d.color}"></i>${d.name}
          <b>${fmt(d.value)}</b><em>${Math.round(d.value / total * 100)} %</em></span>`).join('')}
    </div>
  </div>`;
}

/* On garde le nom historique : c'est le même besoin, mieux servi. */
function stackChart(rows) { return donutChart(rows); }

/* ---------------------------------------------------------
   ONGLET FINANCES
   --------------------------------------------------------- */

const COST_COLORS = {
  ads: '#f97316', payroll: '#2f6fed', fixed: '#8b5cf6',
  variable: '#e05a3a', rd: '#22c55e', support: '#facc15'
};

function monthsOfHistory(c, n) {
  return c.history.slice(-n);
}

/* Repères de temps sous l'axe : « il y a 24 mois … aujourd'hui » */
function monthLabels(n) {
  if (n < 3) return null;
  return [`il y a ${n} mois`, `il y a ${Math.round(n / 2)} mois`, "aujourd'hui"];
}

function renderFinances() {
  const months = 24;

  // Consolidé : on aligne les historiques de toutes les sociétés sur les mêmes mois
  const allDays = [...new Set(S.companies.flatMap(c => c.history.map(h => h.d)))].sort((a, b) => a - b).slice(-months);
  const consol = allDays.map(d => {
    let rev = 0, cost = 0, profit = 0;
    S.companies.forEach(c => {
      const h = c.history.find(x => x.d === d);
      if (h) { rev += h.rev; cost += h.cost; profit += h.profit; }
    });
    return { d, rev, cost, profit };
  });

  const nwSeries = (S.history || []).slice(-months).map(h => h.nw);
  const totalRev = S.companies.reduce((a, c) => a + projectedRevenue(c), 0);
  const totalCost = S.companies.reduce((a, c) => a + projectedCosts(c), 0);
  const totalProfit = S.companies.reduce((a, c) => a + projectedProfit(c), 0);
  const life = totalLifeCost(S) + luxuryUpkeep(S);
  const debtCost = S.debt ? S.debt * CONFIG.debtInterest * 30 + Math.max(200, S.debt * 0.012) : 0;
  const perso = (S.job ? S.job.salary : 0) - life - debtCost;

  return `
  ${renderEco()}
  <div class="cols">
   <div class="col">
    <section class="card">
      <h2><i class="fas fa-chart-column"></i> Vue d'ensemble</h2>
      <div class="fin-top">
        <div><span>Chiffre d'affaires</span><b>${fmt(totalRev)}</b><em>par mois</em></div>
        <div><span>Charges</span><b class="neg">${fmt(totalCost)}</b><em>par mois</em></div>
        <div><span>Résultat</span><b class="${totalProfit >= 0 ? 'pos' : 'neg'}">${fmt(totalProfit)}</b><em>par mois</em></div>
        <div><span>Reste personnel</span><b class="${perso >= 0 ? 'pos' : 'neg'}">${fmt(perso)}</b><em>hors dividendes</em></div>
      </div>
      ${consol.length > 2 ? lineChart([
        { name: 'Chiffre d\'affaires', values: consol.map(x => x.rev), color: '#f97316', width: 2.4 },
        { name: 'Charges', values: consol.map(x => x.cost), color: '#ef4444', fill: false, width: 2 },
        { name: 'Résultat', values: consol.map(x => x.profit), color: '#22c55e', width: 2 }
      ], { height: 170, xLabels: monthLabels(consol.length) })
      + `<p class="row-sub">Sur les ${consol.length} derniers mois, toutes sociétés confondues.</p>`
      : '<p class="row-sub">Lance une entreprise et laisse passer quelques mois pour voir apparaître tes comptes.</p>'}
    </section>

    <section class="card">
      <h2><i class="fas fa-money-bill-transfer"></i> Où part l'argent ce mois-ci</h2>
      ${stackChart([
        { name: 'Publicité', value: S.companies.reduce((a, c) => a + adSpendMonthly(c), 0), color: COST_COLORS.ads },
        { name: 'Salaires', value: S.companies.reduce((a, c) => a + payrollMonthly(c), 0), color: COST_COLORS.payroll },
        { name: 'Charges fixes', value: S.companies.reduce((a, c) => a + getType(c).fixedCost * Math.pow(c.level, 1.35), 0), color: COST_COLORS.fixed },
        { name: 'Coûts variables', value: S.companies.reduce((a, c) => a + projectedRevenue(c) * getType(c).varCost * (c.costMod || 1), 0), color: COST_COLORS.variable },
        { name: 'R&D', value: S.companies.reduce((a, c) => a + c.rd, 0), color: COST_COLORS.rd },
        { name: 'Support', value: S.companies.reduce((a, c) => a + c.support, 0), color: COST_COLORS.support }
      ])}
    </section>

    <section class="card">
      <h2><i class="fas fa-user"></i> Ton budget personnel</h2>
      <table class="table">
        <tr><td>Salaire</td><td class="right ${S.job ? 'pos' : 'muted'}">${S.job ? '+' + fmt(S.job.salary) : '—'}</td></tr>
        <tr><td>Logement — ${housing(S).name}</td><td class="right neg">-${fmt(rentOf(housing(S)))}</td></tr>
        ${S.lifeCost ? `<tr><td>Charges de famille</td><td class="right neg">-${fmt(S.lifeCost)}</td></tr>` : ''}
        ${luxuryUpkeep(S) ? `<tr><td>Entretien du train de vie</td><td class="right neg">-${fmt(luxuryUpkeep(S))}</td></tr>` : ''}
        ${debtCost ? `<tr><td>Dette personnelle (${fmt(S.debt)})</td><td class="right neg">-${fmt(debtCost)}</td></tr>` : ''}
        <tr class="total"><td>Solde mensuel</td><td class="right ${perso >= 0 ? 'pos' : 'neg'}">${fmt(perso)}</td></tr>
      </table>
      ${nwSeries.length > 2 ? lineChart([{ name: 'Patrimoine net', values: nwSeries, color: '#fb923c', width: 2.4 }],
        { height: 150, xLabels: monthLabels(nwSeries.length) }) : ''}
    </section>
   </div>

   <div class="col">
    ${S.companies.length ? S.companies.map(c => {
      const h = monthsOfHistory(c, months);
      const rev = projectedRevenue(c), cost = projectedCosts(c), profit = projectedProfit(c);
      const marge = rev > 0 ? profit / rev * 100 : 0;
      const t = getType(c);
      return `
      <section class="card">
        <h2><i class="fas ${t.icon}"></i> ${c.name}</h2>
        <div class="fin-top small">
          <div><span>CA</span><b>${fmt(rev)}</b></div>
          <div><span>Résultat</span><b class="${profit >= 0 ? 'pos' : 'neg'}">${fmt(profit)}</b></div>
          <div><span>Marge nette</span><b class="${marge >= 15 ? 'pos' : marge >= 0 ? '' : 'neg'}">${marge.toFixed(0)}%</b></div>
          <div><span>Trésorerie</span><b class="${c.cash < 0 ? 'neg' : ''}">${fmt(c.cash)}</b></div>
        </div>
        ${h.length > 2 ? `
          <h4 class="chart-title">Chiffre d'affaires et charges</h4>
          ${lineChart([
            { name: 'Chiffre d\'affaires', values: h.map(x => x.rev), color: '#f97316', width: 2.4 },
            { name: 'Charges', values: h.map(x => x.cost), color: '#ef4444', fill: false, width: 2 }
          ], { height: 150, xLabels: monthLabels(h.length) })}
          <h4 class="chart-title">Résultat mensuel</h4>
          ${barChart(h.map(x => x.profit), { height: 118, xLabels: monthLabels(h.length) })}
          <h4 class="chart-title">Trésorerie et clients</h4>
          ${lineChart([{ name: 'Trésorerie', values: h.map(x => x.cash), color: '#38bdf8', width: 2.4 }],
            { height: 120, xLabels: monthLabels(h.length) })}
          ${lineChart([{ name: 'Clients', values: h.map(x => x.clients), color: '#a855f7', width: 2.4 }],
            { height: 120, xLabels: monthLabels(h.length) })}
        ` : '<p class="row-sub">Les comptes apparaîtront après un mois d\'activité.</p>'}
        <h4 class="chart-title">Où part l'argent</h4>
        ${stackChart([
          { name: 'Publicité', value: adSpendMonthly(c), color: COST_COLORS.ads },
          { name: 'Salaires', value: payrollMonthly(c), color: COST_COLORS.payroll },
          { name: 'Fixes', value: t.fixedCost * Math.pow(c.level, 1.35), color: COST_COLORS.fixed },
          { name: 'Variables', value: rev * t.varCost * (c.costMod || 1), color: COST_COLORS.variable },
          { name: 'R&D', value: c.rd, color: COST_COLORS.rd },
          { name: 'Support', value: c.support, color: COST_COLORS.support }
        ])}
      </section>`;
    }).join('') : `
      <section class="card empty">
        <i class="fas fa-chart-pie"></i>
        <h2>Aucune société</h2>
        <p class="muted">Tes comptes s'afficheront ici dès que tu auras lancé quelque chose.</p>
      </section>`}
   </div>
  </div>`;
}

/* ---------------------------------------------------------
   GUIDE — ce qu'il est raisonnable de faire maintenant
   Chaque conseil sait dire s'il est déjà réglé.
   --------------------------------------------------------- */

const GUIDE_STEPS = [
  {
    id: 'plan',
    done: s => plannedHours(s) >= 6,
    title: "Remplis ton emploi du temps",
    text: "Tu ne fais presque rien de tes journées. Va dans « Vie & planning » et alloue des heures : un emploi pour manger, du sport et du social pour tenir, du réseautage pour rencontrer du monde.",
    tab: 'vie'
  },
  {
    id: 'job',
    done: s => s.job || monthlyBusinessProfit(s) > 1500,
    title: "Trouve un emploi pour financer le début",
    text: "Sans revenu, ton compte descend chaque jour. Un salaire te paie le temps d'apprendre et de réunir un capital.",
    tab: 'carriere'
  },
  {
    id: 'skill',
    done: s => Object.values(s.skills).some(v => v >= 22),
    title: "Monte une compétence au-dessus de 22",
    text: "Chaque type d'entreprise demande un niveau minimum. Commence par une formation gratuite ou peu chère, et donne-lui des heures dans ton planning.",
    tab: 'carriere'
  },
  {
    id: 'found',
    done: s => s.companies.length > 0,
    title: "Lance ta première entreprise",
    text: "Le freelance ne coûte que 200 € et n'a aucun prérequis : c'est la porte d'entrée. Le salariat ne te rendra jamais riche.",
    tab: 'business'
  },
  {
    id: 'role',
    done: s => !s.companies.length || s.plan.some(p => p.act === 'biz' && p.hours >= 3),
    title: "Consacre des heures à ta société",
    text: "Une entreprise sans fondateur dedans n'avance pas. Donne-lui au moins 3 heures par jour et choisis ton poste : vente au début, produit ensuite.",
    tab: 'vie'
  },
  {
    id: 'budget',
    done: s => !s.companies.length || s.companies.some(c => adSpendMonthly(c) > 0),
    title: "Mets un budget d'acquisition",
    text: "Sans publicité ni prospection, tes clients n'arrivent qu'au compte-gouttes. Commence petit, et surveille le panneau « Est-ce que ta publicité rapporte ? ».",
    tab: 'business'
  },
  {
    id: 'roi',
    done: s => !s.companies.length || s.companies.every(c => adSpendMonthly(c) === 0 || acquisitionReturn(c) >= 1),
    urgent: true,
    title: "Ta publicité te fait perdre de l'argent",
    text: "Sur au moins une de tes sociétés, un client coûte plus cher qu'il ne rapportera. Baisse le budget, monte tes prix si ta qualité le permet, ou fais rester tes clients plus longtemps.",
    tab: 'business'
  },
  {
    id: 'capacity',
    done: s => !s.companies.some(c => c.clients >= capacity(c) * 0.95),
    urgent: true,
    title: "Ta capacité est saturée",
    text: "Tu payes pour des clients que tu ne peux pas servir : ils repartent aussitôt et ta qualité baisse. Monte ton niveau d'infrastructure ou recrute aux opérations.",
    tab: 'business'
  },
  {
    id: 'cash',
    done: s => !s.companies.some(c => c.cash < 0),
    urgent: true,
    title: "Une société est en trésorerie négative",
    text: "Au bout de 90 jours, c'est le dépôt de bilan. Injecte du cash depuis l'onglet Capital, ou coupe les budgets.",
    tab: 'business'
  },
  {
    id: 'quality',
    done: s => !s.companies.some(c => c.quality < 45 && c.days > 120),
    title: "Ton produit se dégrade",
    text: "Une qualité basse fait fuir les clients, rend ta publicité moins efficace et t'interdit de monter les prix. Mets un budget R&D ou passe en poste « Produit ».",
    tab: 'business'
  },
  {
    id: 'hire',
    done: s => s.companies.some(c => c.staff.length > 0) || !s.companies.some(c => projectedProfit(c) > 6000),
    title: "Recrute ton premier salarié",
    text: "Tu gagnes assez pour embaucher. Ouvre un poste dans l'onglet Recrutement, fixe un salaire au-dessus du marché pour attirer du monde, et fais passer un entretien avant de signer.",
    tab: 'business'
  },
  {
    id: 'network',
    done: s => s.contacts.length >= 3,
    title: "Construis un réseau",
    text: "Passé 88 dans une compétence, seuls des mentors te feront progresser. Alloue des heures au réseautage, et sors : les événements du téléphone sont la façon la plus rapide de rencontrer du monde.",
    tab: 'reseau'
  },
  {
    id: 'health',
    done: s => s.health > 45 && s.energy > 25,
    urgent: true,
    title: "Tu te crames",
    text: "En dessous de 25 d'énergie, tout ce que tu fais perd en efficacité, et ta santé descend. Réduis tes heures, mets du sport, prends un meilleur logement.",
    tab: 'vie'
  },
  {
    id: 'finance',
    done: s => !s.companies.some(c => !roundGaps(c).length && !(c.rounds || []).length && !(c.offers || []).length)
      && !s.companies.some(c => loanCapacity(c) > 100000 && !(c.loans || []).length),
    title: "Tu peux financer ta croissance autrement",
    text: "Une de tes sociétés est finançable : un tour de table t'apporte de l'argent contre du capital et des exigences, un prêt bancaire t'apporte de l'argent contre une échéance qui tombe tous les mois. Onglet Capital de la société.",
    tab: 'business'
  },
  {
    id: 'groupe',
    done: s => s.companies.length < 2 || groupLevel(s) > 0 || groupTierGaps(s).length > 0,
    title: "Structure ton groupe",
    text: "Tes sociétés paient chacune leurs charges de structure de leur côté. Une direction commune les fait baisser partout à la fois, et aux niveaux suivants elles se passent des clients.",
    tab: 'business'
  },
  {
    id: 'invest',
    done: s => portfolioValue(s) > 0 || s.money < 80000,
    title: "Fais travailler ton argent",
    text: "Tu laisses dormir des liquidités. Un ETF rapporte environ 8 % par an sans rien faire — sur trente ans, c'est un multiple.",
    tab: 'patrimoine'
  },
  {
    id: 'burnout',
    done: s => initBody(s).burn < 65,
    urgent: true,
    title: "Tu vas taper dans le mur",
    text: "Ton épuisement dépasse 65. À 100, ton corps t'arrête pour plusieurs semaines et tu ne choisis plus rien. Allège tes journées, mets du sport, vois du monde — ou prends dix jours de coupure avant qu'on te les impose.",
    tab: 'vie'
  },
  {
    id: 'segment',
    done: s => !s.companies.some(c => focusOf(c) === 'tous' && c.days > 540 && c.clients > 60),
    title: "Choisis à qui tu vends",
    text: "Une de tes sociétés parle encore à tout le monde. Un concurrent qui choisit un segment aura toujours un meilleur produit, un meilleur prix ou un meilleur service que toi sur ce segment. Onglet Pilotage de la société.",
    tab: 'business'
  },
  {
    id: 'promo',
    done: s => !s.companies.some(c => c.staff.some(e => nextGrade(e) && waitingMonths(e) > 14)),
    title: "Quelqu'un attend depuis trop longtemps",
    text: "Un de tes salariés a le niveau et l'ancienneté pour passer à l'échelon suivant, et ça fait plus d'un an que rien ne bouge. C'est exactement le profil qu'un concurrent appelle. Onglet Équipe.",
    tab: 'business'
  },
  {
    id: 'bourse',
    done: s => !s.companies.some(c => !c.ipo && ipoReady(c) && ipoWindow(s) >= 1),
    title: "La fenêtre est ouverte",
    text: "Une de tes sociétés remplit les conditions d'une introduction en bourse, et le marché achète en ce moment. Ces deux choses ne sont vraies en même temps que quelques années par décennie. Onglet Capital de la société.",
    tab: 'business'
  }
];

/* Une étape franchie l'est pour de bon : revendre sa dernière société ne
   doit pas faire réapparaître « lance ta première entreprise ». Seules les
   alertes — trésorerie, santé, produit — reviennent quand le problème revient. */
function guideAdvice() {
  S.guideDone = S.guideDone || {};
  const settled = g => {
    if (g.urgent) return g.done(S);
    if (S.guideDone[g.id]) return true;
    let ok = false;
    try { ok = g.done(S); } catch (_) { ok = false; }
    if (ok) S.guideDone[g.id] = true;
    return ok;
  };
  const urgent = GUIDE_STEPS.filter(g => g.urgent && !settled(g));
  const next = GUIDE_STEPS.filter(g => !g.urgent && !settled(g));
  const doneCount = GUIDE_STEPS.filter(g => settled(g)).length;
  return { urgent, next: next.slice(0, 2), doneCount };
}

function renderGuide() {
  if (S.guideOff) return '';
  const { urgent, next, doneCount } = guideAdvice();
  const items = [...urgent, ...next];
  if (!items.length) return '';

  return `
  <section class="card guide">
    <h2><i class="fas fa-compass"></i> Quoi faire maintenant
      <button class="btn btn-sm btn-ghost guide-off" data-act="guideOff" title="Masquer le guide">
        <i class="fas fa-xmark"></i>
      </button>
    </h2>
    <div class="guide-list">
      ${items.map(g => `
        <div class="guide-item ${g.urgent ? 'urgent' : ''}">
          <i class="fas ${g.urgent ? 'fa-triangle-exclamation' : 'fa-arrow-right'}"></i>
          <div>
            <b>${g.title}</b>
            <span>${g.text}</span>
            <button class="btn btn-sm" data-act="goTab" data-id="${g.tab}">Y aller</button>
          </div>
        </div>`).join('')}
    </div>
    <p class="row-sub">${doneCount} / ${GUIDE_STEPS.length} points acquis.</p>
  </section>`;
}
