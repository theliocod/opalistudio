/* =========================================================
   EMPIRE — Interface
   Rendu des écrans, onglets et interactions.
   ========================================================= */

let TAB = 'vie';
let BIZ_OPEN = null;

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ------------------ Modale ------------------ */
function closeModal() {
  const m = $('#modal');
  m.classList.add('hidden');
  m.innerHTML = '';
}

/* ------------------ Toast ------------------ */
let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ------------------ Écran de départ ------------------ */

function renderStart() {
  $('#screen-start').classList.remove('hidden');
  $('#screen-game').classList.add('hidden');
  $('#screen-end').classList.add('hidden');

  $('#origins').innerHTML = ORIGINS.map(o => `
    <button class="origin-card" data-origin="${o.id}">
      <div class="origin-head"><i class="fas ${o.icon}"></i><h3>${o.name}</h3></div>
      <p class="origin-desc">${o.desc}</p>
      <div class="origin-stats">
        <span><i class="fas fa-wallet"></i> ${fmt(o.money)}</span>
        ${o.debt ? `<span class="neg"><i class="fas fa-file-invoice"></i> ${fmt(o.debt)} de dette</span>` : ''}
        <span><i class="fas fa-star"></i> Réputation ${o.reputation}</span>
      </div>
      <div class="origin-skills">
        ${Object.entries(o.skills).map(([k, v]) => `<span class="chip">${skillName(k)} ${v}</span>`).join('')}
      </div>
      <div class="origin-perk"><i class="fas fa-bolt"></i> ${o.perk}</div>
    </button>`).join('');

  $$('#origins .origin-card').forEach(b => b.addEventListener('click', () => {
    $$('#origins .origin-card').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
    $('#start-btn').disabled = false;
    $('#start-btn').dataset.origin = b.dataset.origin;
  }));

  const hasSave = !!localStorage.getItem(SAVE_KEY);
  $('#continue-btn').classList.toggle('hidden', !hasSave);
}

function skillName(k) {
  return { business: 'Business', marketing: 'Marketing', tech: 'Tech', social: 'Social', finance: 'Finance' }[k];
}
function skillIcon(k) {
  return { business: 'fa-chess-king', marketing: 'fa-bullhorn', tech: 'fa-code', social: 'fa-comments', finance: 'fa-chart-pie' }[k];
}

/* ------------------ Rendu principal ------------------ */

function render() {
  if (!S) return renderStart();
  if (S.over) return renderGameOver();

  $('#screen-start').classList.add('hidden');
  $('#screen-end').classList.add('hidden');
  $('#screen-game').classList.remove('hidden');

  renderHeader();
  renderTabs();

  const map = { vie: renderVie, carriere: renderCarriere, business: renderBusiness, patrimoine: renderPatrimoine, journal: renderJournal };
  $('#tab-content').innerHTML = map[TAB]();
  bindTabEvents();
  save();
}

function bar(value, max, cls) {
  const pct = clamp((value / max) * 100, 0, 100);
  return `<div class="bar"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div>`;
}

function renderHeader() {
  const nw = netWorth(S);
  $('#hdr').innerHTML = `
    <div class="hdr-left">
      <div class="hdr-name">${S.name}</div>
      <div class="hdr-date">${dateLabel(S)}</div>
    </div>
    <div class="hdr-stats">
      <div class="stat">
        <span class="stat-label"><i class="fas fa-wallet"></i> Liquidités</span>
        <span class="stat-value ${S.money < 0 ? 'neg' : ''}">${fmt(S.money)}</span>
      </div>
      <div class="stat">
        <span class="stat-label"><i class="fas fa-gem"></i> Patrimoine net</span>
        <span class="stat-value ${nw < 0 ? 'neg' : 'accent'}">${fmt(nw)}</span>
      </div>
      <div class="stat">
        <span class="stat-label"><i class="fas fa-bolt"></i> Énergie</span>
        ${bar(S.energy, S.maxEnergy, 'energy')}
      </div>
      <div class="stat">
        <span class="stat-label"><i class="fas fa-face-smile"></i> Moral</span>
        ${bar(S.happiness, 100, 'happy')}
      </div>
      <div class="stat">
        <span class="stat-label"><i class="fas fa-heart-pulse"></i> Santé</span>
        ${bar(S.health, 100, 'health')}
      </div>
      <div class="stat">
        <span class="stat-label"><i class="fas fa-star"></i> Réputation</span>
        ${bar(S.reputation, 100, 'rep')}
      </div>
    </div>
    <div class="hdr-actions">
      <div class="ap">
        <span>Temps disponible</span>
        <div class="ap-dots">${Array.from({ length: CONFIG.actionsPerMonth }, (_, i) =>
          `<i class="fas fa-circle ${i < S.actions ? 'on' : ''}"></i>`).join('')}</div>
      </div>
      <button class="btn btn-primary btn-next" data-act="endmonth">
        Mois suivant <i class="fas fa-arrow-right"></i>
      </button>
    </div>`;
}

function renderTabs() {
  const tabs = [
    ['vie', 'Vie', 'fa-user'],
    ['carriere', 'Carrière', 'fa-briefcase'],
    ['business', 'Entreprises', 'fa-rocket'],
    ['patrimoine', 'Patrimoine', 'fa-chart-line'],
    ['journal', 'Journal', 'fa-book-open']
  ];
  $('#tabs').innerHTML = tabs.map(([id, label, icon]) => `
    <button class="tab ${TAB === id ? 'active' : ''}" data-tab="${id}">
      <i class="fas ${icon}"></i> ${label}
      ${id === 'business' && S.companies.length ? `<span class="badge">${S.companies.length}</span>` : ''}
    </button>`).join('');
}

/* ------------------ Onglet VIE ------------------ */

function renderVie() {
  const h = housing(S);
  const life = totalLifeCost(S);
  const salary = S.job ? S.job.salary : 0;
  const bizProfit = monthlyBusinessProfit(S);

  return `
  <div class="cols">
   <div class="col">
    <section class="card">
      <h2><i class="fas fa-hand-pointer"></i> Actions du mois</h2>
      <p class="muted">Chaque mois te donne ${CONFIG.actionsPerMonth} blocs de temps. Ce que tu en fais décide de ta vie.</p>
      <div class="actions">
        ${actionBtn('rest', 'fa-couch', 'Se reposer', '+26 énergie, +4 moral', '1 bloc')}
        ${actionBtn('sport', 'fa-dumbbell', 'Faire du sport', '+7 santé, énergie max +1', '1 bloc · 8 énergie')}
        ${actionBtn('fun', 'fa-champagne-glasses', 'Sortir, voir des gens', '+11 moral', '1 bloc · argent')}
        ${actionBtn('network', 'fa-users-line', 'Réseauter', '+social, +réputation, opportunités', '1 bloc · 12 énergie')}
        ${actionBtn('vacation', 'fa-umbrella-beach', 'Partir en vacances', 'énergie au max, +22 moral', '2 blocs · 2 500 €')}
        ${S.job ? actionBtn('overtime', 'fa-clock', 'Heures supplémentaires', `+${fmt(salary * 0.35)} ce mois`, '1 bloc · 18 énergie') : ''}
      </div>
    </section>

    <section class="card">
      <h2><i class="fas fa-scale-balanced"></i> Budget mensuel</h2>
      <table class="table">
        <tr><td>Salaire</td><td class="right ${salary ? 'pos' : 'muted'}">${salary ? '+' + fmt(salary) : '—'}</td></tr>
        <tr><td>Dividendes potentiels</td><td class="right ${bizProfit ? 'pos' : 'muted'}">${bizProfit ? '+' + fmt(bizProfit) : '—'}</td></tr>
        <tr><td>Logement — ${h.name}</td><td class="right neg">-${fmt(h.cost)}</td></tr>
        ${S.lifeCost ? `<tr><td>Charges de vie supplémentaires</td><td class="right neg">-${fmt(S.lifeCost)}</td></tr>` : ''}
        ${S.debt ? `<tr><td>Dette (${fmt(S.debt)}) — intérêts + remboursement</td><td class="right neg">-${fmt(S.debt * CONFIG.debtInterest + Math.max(200, S.debt * 0.012))}</td></tr>` : ''}
        <tr class="total"><td>Reste à vivre estimé</td><td class="right ${salary - life >= 0 ? 'pos' : 'neg'}">${fmt(salary - life - (S.debt ? S.debt * CONFIG.debtInterest + Math.max(200, S.debt * 0.012) : 0))}</td></tr>
      </table>
    </section>

    <section class="card">
      <h2><i class="fas fa-brain"></i> Compétences</h2>
      <div class="skills">
        ${Object.entries(S.skills).map(([k, v]) => `
          <div class="skill">
            <div class="skill-top"><span><i class="fas ${skillIcon(k)}"></i> ${skillName(k)}</span><b>${Math.round(v)}</b></div>
            ${bar(v, 100, 'skill-' + k)}
          </div>`).join('')}
      </div>
      ${S.flags.length ? `<div class="flags">${S.flags.map(f => `<span class="chip">${flagLabel(f)}</span>`).join('')}</div>` : ''}
    </section>

   </div>
   <div class="col">
    <section class="card">
      <h2><i class="fas fa-house"></i> Logement</h2>
      <div class="list">
        ${HOUSING.map(x => `
          <div class="row ${x.id === S.housingId ? 'row-active' : ''}">
            <div class="row-main">
              <div class="row-title"><i class="fas ${x.icon}"></i> ${x.name}</div>
              <div class="row-sub">${x.desc} · +${x.energy} énergie/mois · moral ${x.happy >= 0 ? '+' : ''}${x.happy}</div>
            </div>
            <div class="row-side">
              <span class="price">${fmt(x.cost)}/mois</span>
              ${x.id === S.housingId ? '<span class="tag">Actuel</span>' :
                `<button class="btn btn-sm" data-act="housing" data-id="${x.id}">Emménager</button>`}
            </div>
          </div>`).join('')}
      </div>
    </section>

    <section class="card">
      <h2><i class="fas fa-trophy"></i> Objectifs de vie</h2>
      <div class="goals">
        ${GOALS.map(g => `
          <div class="goal ${S.goals.includes(g.id) ? 'done' : ''}">
            <i class="fas ${S.goals.includes(g.id) ? 'fa-circle-check' : 'fa-circle'}"></i>
            <div><b>${g.name}</b><span>${g.desc}</span></div>
          </div>`).join('')}
      </div>
    </section>
   </div>
  </div>`;
}

function flagLabel(f) {
  return {
    resilient: 'Résilient', safetynet: 'Filet familial', connected: 'Bien connecté',
    builder: 'Builder', educated: 'Diplômé', grinder: 'Machine de guerre',
    couple: 'En couple', parent: 'Père de famille'
  }[f] || f;
}

function actionBtn(act, icon, label, effect, cost) {
  return `<button class="action" data-act="${act}">
    <i class="fas ${icon}"></i>
    <div><b>${label}</b><span>${effect}</span></div>
    <em>${cost}</em>
  </button>`;
}

/* ------------------ Onglet CARRIÈRE ------------------ */

function renderCarriere() {
  return `
  <div class="grid">
    <section class="card">
      <h2><i class="fas fa-id-badge"></i> Situation professionnelle</h2>
      ${S.job ? `
        <div class="job-current">
          <div class="job-title"><i class="fas fa-briefcase"></i> ${S.job.name}</div>
          <div class="job-salary">${fmt(S.job.salary)} net / mois</div>
          <div class="row-sub">Ancienneté : ${S.jobMonths} mois · ${S.job.energy} énergie consommée chaque mois</div>
          <button class="btn btn-ghost btn-sm" data-act="quitJob">Démissionner</button>
        </div>` : `
        <p class="muted">Tu es sans emploi. Aucun salaire ne tombe, mais tout ton temps t'appartient.</p>`}
    </section>

    <section class="card">
      <h2><i class="fas fa-magnifying-glass"></i> Offres d'emploi</h2>
      <div class="list">
        ${JOBS.map(j => {
          const ok = Object.entries(j.req || {}).every(([k, v]) => S.skills[k] >= v);
          return `
          <div class="row ${ok ? '' : 'row-locked'}">
            <div class="row-main">
              <div class="row-title"><i class="fas ${j.icon}"></i> ${j.name}</div>
              <div class="row-sub">${j.desc}</div>
              <div class="req">${Object.entries(j.req || {}).map(([k, v]) =>
                `<span class="chip ${S.skills[k] >= v ? 'ok' : 'ko'}">${skillName(k)} ${v}</span>`).join('') || '<span class="chip ok">Aucun prérequis</span>'}</div>
            </div>
            <div class="row-side">
              <span class="price">${fmt(j.salary)}/mois</span>
              <button class="btn btn-sm" data-act="apply" data-id="${j.id}" ${ok ? '' : 'disabled'}>Postuler</button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </section>

    <section class="card wide">
      <h2><i class="fas fa-graduation-cap"></i> Se former</h2>
      <p class="muted">Tes compétences déterminent les emplois accessibles, les entreprises que tu peux lancer et leur croissance.</p>
      <div class="list">
        ${TRAININGS.map(t => {
          const ok = !t.req || Object.entries(t.req).every(([k, v]) => S.skills[k] >= v);
          return `
          <div class="row ${ok ? '' : 'row-locked'}">
            <div class="row-main">
              <div class="row-title"><i class="fas ${t.icon}"></i> ${t.name}</div>
              <div class="row-sub">${t.desc}</div>
              <div class="req">${Object.entries(t.gain).map(([k, v]) => `<span class="chip ok">+${v} ${skillName(k)}</span>`).join('')}
              ${t.req ? Object.entries(t.req).map(([k, v]) => `<span class="chip ${S.skills[k] >= v ? 'ok' : 'ko'}">Requis : ${skillName(k)} ${v}</span>`).join('') : ''}</div>
            </div>
            <div class="row-side">
              <span class="price">${t.cost ? fmt(t.cost) : 'Gratuit'}</span>
              <span class="row-sub">${t.time} bloc${t.time > 1 ? 's' : ''} · ${t.energy} énergie</span>
              <button class="btn btn-sm" data-act="train" data-id="${t.id}" ${ok ? '' : 'disabled'}>Suivre</button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </section>
  </div>`;
}

/* ------------------ Onglet ENTREPRISES ------------------ */

function renderBusiness() {
  return `
  <div class="grid">
    ${S.companies.length ? `
    <section class="card wide">
      <h2><i class="fas fa-sitemap"></i> Tes entreprises</h2>
      <div class="companies">
        ${S.companies.map(renderCompanyCard).join('')}
      </div>
    </section>` : `
    <section class="card wide empty">
      <i class="fas fa-lightbulb"></i>
      <h2>Tu n'as encore rien créé</h2>
      <p class="muted">Un salaire te fait vivre. Une entreprise te rend libre. Choisis ton terrain ci-dessous.</p>
    </section>`}

    <section class="card wide">
      <h2><i class="fas fa-plus"></i> Créer une entreprise</h2>
      <div class="biz-grid">
        ${BUSINESS_TYPES.map(t => {
          let cost = t.cost;
          if (t.id === 'saas' && S.flags.includes('builder')) cost = Math.round(cost / 2);
          const okSkill = Object.entries(t.req || {}).every(([k, v]) => S.skills[k] >= v);
          const okMoney = S.money >= cost;
          return `
          <div class="biz-card ${okSkill && okMoney ? '' : 'row-locked'}">
            <div class="biz-head"><i class="fas ${t.icon}"></i><h3>${t.name}</h3></div>
            <p class="row-sub">${t.desc}</p>
            <div class="biz-meta">
              <span><i class="fas fa-coins"></i> ${fmt(cost)}</span>
              <span><i class="fas fa-arrow-trend-up"></i> x${t.multiple} à la revente</span>
              <span><i class="fas fa-triangle-exclamation"></i> risque ${Math.round(t.risk * 100)}%</span>
            </div>
            <div class="req">${Object.entries(t.req || {}).map(([k, v]) =>
              `<span class="chip ${S.skills[k] >= v ? 'ok' : 'ko'}">${skillName(k)} ${v}</span>`).join('') || '<span class="chip ok">Accessible à tous</span>'}</div>
            <button class="btn btn-sm btn-primary" data-act="found" data-id="${t.id}" ${okSkill && okMoney ? '' : 'disabled'}>
              ${!okSkill ? 'Compétences insuffisantes' : okMoney ? 'Lancer' : 'Capital insuffisant'}
            </button>
          </div>`;
        }).join('')}
      </div>
    </section>
  </div>`;
}

function renderCompanyCard(c) {
  const t = getType(c);
  const cap = capacity(c);
  const rev = projectedRevenue(c);
  const cost = projectedCosts(c);
  const profit = projectedProfit(c);
  const val = valuation(c);
  const share = Math.round(marketShare(c) * 100);
  const upCost = Math.round(t.upgradeCost * Math.pow(1.55, c.level - 1));
  const open = BIZ_OPEN === c.uid;
  const load = cap ? Math.round((c.clients / cap) * 100) : 0;

  return `
  <div class="company ${open ? 'open' : ''}">
    <div class="company-head" data-act="toggleBiz" data-id="${c.uid}">
      <div class="company-id">
        <i class="fas ${t.icon}"></i>
        <div>
          <h3>${c.name}</h3>
          <span class="row-sub">${t.name} · niveau ${c.level} · ${Math.round(c.equity * 100)}% détenus${c.partner ? ' · associé' : ''}</span>
        </div>
      </div>
      <div class="company-kpis">
        <div class="kpi"><span>CA / mois</span><b>${fmt(rev)}</b></div>
        <div class="kpi"><span>Profit</span><b class="${profit >= 0 ? 'pos' : 'neg'}">${fmt(profit)}</b></div>
        <div class="kpi"><span>Trésorerie</span><b class="${c.cash < 0 ? 'neg' : ''}">${fmt(c.cash)}</b></div>
        <div class="kpi"><span>Valorisation</span><b class="accent">${fmt(val)}</b></div>
        <i class="fas fa-chevron-${open ? 'up' : 'down'} chev"></i>
      </div>
    </div>

    ${open ? `
    <div class="company-body">
      <div class="company-cols">
        <div>
          <h4>Indicateurs</h4>
          <div class="metric"><span>Clients</span><b>${Math.round(c.clients).toLocaleString('fr-FR')}</b></div>
          <div class="metric"><span>Capacité</span><b>${Math.round(cap).toLocaleString('fr-FR')}</b></div>
          <div class="metric"><span>Charge</span><b class="${load > 100 ? 'neg' : load > 85 ? 'warn' : 'pos'}">${load}%</b></div>
          ${bar(Math.min(load, 130), 130, load > 100 ? 'health' : 'energy')}
          <div class="metric" style="margin-top:12px"><span>Qualité produit</span><b>${Math.round(c.quality)}/100</b></div>
          ${bar(c.quality, 100, 'happy')}
          <div class="metric" style="margin-top:12px"><span>Part de marché</span><b class="${share > 70 ? 'warn' : ''}">${share}%</b></div>
          ${bar(share, 100, 'rep')}
          ${share > 65 ? '<p class="row-sub">Le marché sature : la croissance va ralentir. Pense à diversifier.</p>' : ''}
          <div class="metric" style="margin-top:12px"><span>Salariés</span><b>${c.employees}</b></div>
          <div class="metric"><span>Masse salariale</span><b>${fmt(payroll(c))}</b></div>
          <div class="metric"><span>Charges fixes</span><b>${fmt(t.fixedCost * c.level)}</b></div>
          <div class="metric"><span>Budget publicitaire</span><b>${fmt(c.marketing)}</b></div>
          <div class="metric"><span>Âge</span><b>${c.monthsAlive} mois</b></div>
        </div>

        <div>
          <h4>Piloter</h4>
          <label class="field">
            <span>Budget publicitaire mensuel : <b>${fmt(c.marketing)}</b></span>
            <input type="range" min="0" max="${Math.max(20000, Math.round(rev * 1.5) || 20000)}" step="100"
                   value="${c.marketing}" data-act="marketing" data-id="${c.uid}">
            <span class="row-sub">Plus de budget = plus de clients acquis, mais rendement décroissant.</span>
          </label>

          <div class="btn-row">
            <button class="btn btn-sm" data-act="focus" data-id="${c.uid}" ${c.focus ? 'disabled' : ''}>
              <i class="fas fa-fire"></i> S'y consacrer <em>1 bloc</em>
            </button>
            <button class="btn btn-sm" data-act="improve" data-id="${c.uid}" ${c.improved ? 'disabled' : ''}>
              <i class="fas fa-wrench"></i> Améliorer le produit <em>1 bloc</em>
            </button>
            <button class="btn btn-sm" data-act="prospect" data-id="${c.uid}">
              <i class="fas fa-phone-volume"></i> Prospecter <em>1 bloc</em>
            </button>
          </div>

          <div class="btn-row">
            <button class="btn btn-sm" data-act="hire" data-id="${c.uid}">
              <i class="fas fa-user-plus"></i> Recruter (${fmt(t.empSalary * c.salaryMod * 1.5)})
            </button>
            <button class="btn btn-sm btn-ghost" data-act="fire" data-id="${c.uid}" ${c.employees ? '' : 'disabled'}>
              <i class="fas fa-user-minus"></i> Licencier
            </button>
            <button class="btn btn-sm" data-act="upgrade" data-id="${c.uid}">
              <i class="fas fa-arrow-up"></i> Niveau ${c.level + 1} (${fmt(upCost)})
            </button>
          </div>

          <h4 style="margin-top:18px">Trésorerie & capital</h4>
          <div class="btn-row">
            <button class="btn btn-sm" data-act="dividend" data-id="${c.uid}"><i class="fas fa-hand-holding-dollar"></i> Sortir des dividendes</button>
            <button class="btn btn-sm btn-ghost" data-act="inject" data-id="${c.uid}"><i class="fas fa-syringe"></i> Injecter du cash</button>
          </div>
          <div class="btn-row">
            <button class="btn btn-sm" data-act="raise" data-id="${c.uid}"><i class="fas fa-seedling"></i> Lever des fonds (-18%)</button>
            <button class="btn btn-sm btn-danger" data-act="sell" data-id="${c.uid}"><i class="fas fa-file-signature"></i> Vendre (${fmt((val + c.cash) * c.equity)})</button>
          </div>
          ${c.negMonths ? `<p class="alert"><i class="fas fa-triangle-exclamation"></i> Trésorerie négative depuis ${c.negMonths} mois. Dépôt de bilan à 3 mois.</p>` : ''}
        </div>
      </div>
    </div>` : ''}
  </div>`;
}

/* ------------------ Onglet PATRIMOINE ------------------ */

function renderPatrimoine() {
  const pv = portfolioValue(S);
  const compVal = S.companies.reduce((a, c) => a + (valuation(c) + c.cash) * c.equity, 0);
  const nw = netWorth(S);
  const maxDebt = debtCeiling(S);

  return `
  <div class="grid">
    <section class="card">
      <h2><i class="fas fa-gem"></i> Patrimoine net</h2>
      <div class="bignum ${nw < 0 ? 'neg' : 'accent'}">${fmtFull(nw)}</div>
      <table class="table">
        <tr><td>Liquidités</td><td class="right">${fmt(S.money)}</td></tr>
        <tr><td>Entreprises (valorisation)</td><td class="right">${fmt(compVal)}</td></tr>
        <tr><td>Placements</td><td class="right">${fmt(pv)}</td></tr>
        <tr><td>Dettes</td><td class="right neg">${S.debt ? '-' + fmt(S.debt) : '0 €'}</td></tr>
      </table>
      ${S.exits.length ? `<h4 style="margin-top:16px">Reventes réalisées</h4>
        <ul class="exits">${S.exits.map(e => `<li>${e.name} — <b class="pos">${fmt(e.price)}</b></li>`).join('')}</ul>` : ''}
      ${renderSparkline()}
    </section>

    <section class="card">
      <h2><i class="fas fa-building-columns"></i> Banque</h2>
      <p class="muted">Plafond d'endettement estimé : <b>${fmt(maxDebt)}</b></p>
      <div class="btn-row">
        ${[10000, 50000, 200000, 1000000].map(a => `
          <button class="btn btn-sm" data-act="borrow" data-amount="${a}" ${S.debt + a <= maxDebt ? '' : 'disabled'}>
            Emprunter ${fmt(a)}
          </button>`).join('')}
      </div>
      <div class="btn-row">
        <button class="btn btn-sm btn-ghost" data-act="repay" data-amount="5000" ${S.debt ? '' : 'disabled'}>Rembourser 5 k€</button>
        <button class="btn btn-sm btn-ghost" data-act="repay" data-amount="50000" ${S.debt ? '' : 'disabled'}>Rembourser 50 k€</button>
        <button class="btn btn-sm btn-ghost" data-act="repayAll" ${S.debt ? '' : 'disabled'}>Tout rembourser</button>
      </div>
      <p class="row-sub">Taux : ${(CONFIG.debtInterest * 1200).toFixed(1)}% par an. La dette se rembourse automatiquement chaque mois.</p>
    </section>

    <section class="card wide">
      <h2><i class="fas fa-chart-line"></i> Placements</h2>
      <div class="list">
        ${ASSETS.map(a => {
          const qty = S.portfolio[a.id] || 0;
          const value = qty * S.prices[a.id];
          const perf = ((S.prices[a.id] / a.price - 1) * 100);
          return `
          <div class="row">
            <div class="row-main">
              <div class="row-title"><i class="fas ${a.icon}"></i> ${a.name}</div>
              <div class="row-sub">${a.desc}</div>
              <div class="req">
                <span class="chip">Cours : ${S.prices[a.id].toFixed(1)}</span>
                <span class="chip ${perf >= 0 ? 'ok' : 'ko'}">${perf >= 0 ? '+' : ''}${perf.toFixed(1)}% depuis le départ</span>
                ${value > 1 ? `<span class="chip ok">Tu détiens ${fmt(value)}</span>` : ''}
              </div>
            </div>
            <div class="row-side">
              <div class="btn-row">
                <button class="btn btn-sm" data-act="buy" data-id="${a.id}" data-amount="1000">+1 k€</button>
                <button class="btn btn-sm" data-act="buy" data-id="${a.id}" data-amount="10000">+10 k€</button>
                <button class="btn btn-sm" data-act="buyCustom" data-id="${a.id}">Montant…</button>
              </div>
              <div class="btn-row">
                <button class="btn btn-sm btn-ghost" data-act="sellAsset" data-id="${a.id}" data-amount="10000">-10 k€</button>
                <button class="btn btn-sm btn-ghost" data-act="sellAll" data-id="${a.id}">Tout vendre</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </section>
  </div>`;
}

function renderSparkline() {
  if (!S.history || S.history.length < 3) return '';
  const pts = S.history.slice(-120);
  const max = Math.max(...pts.map(p => p.nw), 1);
  const min = Math.min(...pts.map(p => p.nw), 0);
  const w = 100, hgt = 34;
  const d = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = hgt - ((p.nw - min) / Math.max(1, max - min)) * hgt;
    return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg class="spark" viewBox="0 0 ${w} ${hgt}" preserveAspectRatio="none">
    <path d="${d}" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
    <p class="row-sub">Évolution de ton patrimoine sur ${pts.length} mois</p>`;
}

/* ------------------ Onglet JOURNAL ------------------ */

function renderJournal() {
  return `
  <div class="grid">
    <section class="card wide">
      <h2><i class="fas fa-book-open"></i> Journal de bord</h2>
      <div class="log">
        ${S.log.map(l => `
          <div class="log-line log-${l.type}">
            <span class="log-date">${MONTH_NAMES[l.month % 12].slice(0, 4)}. ${l.age} ans</span>
            <span>${l.text}</span>
          </div>`).join('')}
      </div>
    </section>
  </div>`;
}

/* ------------------ Événements (modale) ------------------ */

function showEvent(evt) {
  PENDING = evt;
  render();
  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box event">
      <div class="modal-tag"><i class="fas fa-bolt"></i> Événement</div>
      <h2>${evt.title}</h2>
      <p>${evt.text}</p>
      <div class="modal-choices">
        ${evt.choices.map((c, i) => `<button class="btn btn-choice" data-choice="${i}">${c.label}</button>`).join('')}
      </div>
    </div>`;
  m.classList.remove('hidden');
  $$('#modal [data-choice]').forEach(b => b.addEventListener('click', () => {
    closeModal();
    resolveChoice(evt, +b.dataset.choice);
  }));
}

function askNumber(title, hint, cb, defaultValue = '') {
  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box">
      <h2>${title}</h2>
      <p class="muted">${hint}</p>
      <input type="number" id="ask-input" class="input" value="${defaultValue}" placeholder="Montant en €">
      <div class="modal-choices">
        <button class="btn btn-primary" id="ask-ok">Valider</button>
        <button class="btn btn-ghost" id="ask-cancel">Annuler</button>
      </div>
    </div>`;
  m.classList.remove('hidden');
  const close = () => closeModal();
  $('#ask-ok').addEventListener('click', () => { const v = parseFloat($('#ask-input').value); close(); if (!isNaN(v)) cb(v); });
  $('#ask-cancel').addEventListener('click', close);
  $('#ask-input').focus();
  $('#ask-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('#ask-ok').click(); });
}

function askText(title, hint, cb, defaultValue = '') {
  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box">
      <h2>${title}</h2>
      <p class="muted">${hint}</p>
      <input type="text" id="ask-input" class="input" value="${defaultValue}" maxlength="28">
      <div class="modal-choices">
        <button class="btn btn-primary" id="ask-ok">Valider</button>
        <button class="btn btn-ghost" id="ask-cancel">Annuler</button>
      </div>
    </div>`;
  m.classList.remove('hidden');
  const close = () => closeModal();
  $('#ask-ok').addEventListener('click', () => { const v = $('#ask-input').value; close(); cb(v); });
  $('#ask-cancel').addEventListener('click', close);
  $('#ask-input').focus();
  $('#ask-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('#ask-ok').click(); });
}

/* ------------------ Fin de partie ------------------ */

function renderGameOver() {
  $('#screen-game').classList.add('hidden');
  $('#screen-start').classList.add('hidden');
  $('#screen-end').classList.remove('hidden');

  const nw = netWorth(S);
  const score = Math.round(nw / 1000 + S.happiness * 400 + S.health * 200 + S.goals.length * 5000 + S.exits.length * 8000);
  let rank = 'Salarié discret';
  if (score > 20000) rank = 'Indépendant accompli';
  if (score > 60000) rank = 'Entrepreneur reconnu';
  if (score > 150000) rank = 'Bâtisseur d\'entreprises';
  if (score > 400000) rank = 'Magnat';
  if (score > 800000) rank = 'Légende';

  $('#end-content').innerHTML = `
    <div class="end-rank">${rank}</div>
    <h1>${S.name}, ${S.age} ans</h1>
    <p class="end-reason">${S.overReason}</p>
    <div class="end-stats">
      <div><span>Patrimoine final</span><b class="accent">${fmtFull(nw)}</b></div>
      <div><span>Entreprises créées</span><b>${S.companies.length + S.exits.length}</b></div>
      <div><span>Reventes</span><b>${S.exits.length}</b></div>
      <div><span>Moral</span><b>${Math.round(S.happiness)}/100</b></div>
      <div><span>Santé</span><b>${Math.round(S.health)}/100</b></div>
      <div><span>Objectifs</span><b>${S.goals.length}/${GOALS.length}</b></div>
      <div><span>Score</span><b class="accent">${score.toLocaleString('fr-FR')}</b></div>
    </div>
    <div class="end-goals">
      ${GOALS.filter(g => S.goals.includes(g.id)).map(g => `<span class="chip ok">${g.name}</span>`).join('') || '<span class="muted">Aucun objectif atteint.</span>'}
    </div>
    <button class="btn btn-primary" id="restart">Rejouer une vie</button>`;

  $('#restart').addEventListener('click', () => { wipe(); renderStart(); });
}

/* ------------------ Liaison des événements DOM ------------------ */

function bindTabEvents() {
  $$('#tabs .tab').forEach(b => b.addEventListener('click', () => { TAB = b.dataset.tab; render(); }));

  $$('[data-act]').forEach(el => {
    const act = el.dataset.act;
    if (act === 'marketing') {
      el.addEventListener('input', e => {
        const c = S.companies.find(x => x.uid === el.dataset.id);
        c.marketing = +e.target.value;
        const lbl = el.parentElement.querySelector('span b');
        if (lbl) lbl.textContent = fmt(c.marketing);
      });
      el.addEventListener('change', () => save());
      return;
    }
    el.addEventListener('click', e => {
      e.stopPropagation();
      handleAction(act, el.dataset);
    });
  });
}

function handleAction(act, data) {
  const id = data.id;
  switch (act) {
    case 'endmonth': endMonth(); break;
    case 'housing': setHousing(id); break;
    case 'apply': applyForJob(id); break;
    case 'train': doTraining(id); break;
    case 'quitJob': ACTIONS.quitJob(); break;
    case 'found':
      askText('Nom de ton entreprise', "Comment veux-tu l'appeler ?", n => foundCompany(id, n),
        BUSINESS_TYPES.find(t => t.id === id).name);
      break;
    case 'toggleBiz': BIZ_OPEN = BIZ_OPEN === id ? null : id; render(); break;
    case 'focus': focusCompany(id); break;
    case 'improve': improveProduct(id); break;
    case 'prospect': prospect(id); break;
    case 'hire': hire(id); break;
    case 'fire': fire(id); break;
    case 'upgrade': upgradeCompany(id); break;
    case 'dividend': {
      const c = S.companies.find(x => x.uid === id);
      askNumber('Sortir des dividendes', `Trésorerie disponible : ${fmtFull(c.cash)}. Fiscalité : 30%.`,
        v => transfer(id, v), Math.max(0, Math.floor(c.cash)));
      break;
    }
    case 'inject': {
      askNumber('Injecter du cash', `Tes liquidités : ${fmtFull(S.money)}.`, v => transfer(id, -v));
      break;
    }
    case 'raise': raiseFunds(id); break;
    case 'sell': {
      const c = S.companies.find(x => x.uid === id);
      confirmBox(`Vendre ${c.name} ?`, `Tu récupères ${fmtFull((valuation(c) + c.cash) * c.equity)}. L'entreprise ne t'appartiendra plus.`,
        () => sellCompany(id));
      break;
    }
    case 'borrow': borrow(+data.amount); break;
    case 'repay': repay(+data.amount); break;
    case 'repayAll': repay(S.debt); break;
    case 'buy': buyAsset(id, +data.amount); break;
    case 'buyCustom': askNumber('Investir', `Liquidités : ${fmtFull(S.money)}.`, v => buyAsset(id, v)); break;
    case 'sellAsset': sellAsset(id, +data.amount); break;
    case 'sellAll': sellAsset(id, (S.portfolio[id] || 0) * S.prices[id]); break;
    default:
      if (ACTIONS[act]) ACTIONS[act]();
  }
}

function confirmBox(title, text, cb) {
  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box">
      <h2>${title}</h2>
      <p>${text}</p>
      <div class="modal-choices">
        <button class="btn btn-danger" id="cf-ok">Confirmer</button>
        <button class="btn btn-ghost" id="cf-no">Annuler</button>
      </div>
    </div>`;
  m.classList.remove('hidden');
  $('#cf-ok').addEventListener('click', () => { closeModal(); cb(); });
  $('#cf-no').addEventListener('click', () => closeModal());
}

/* ------------------ Démarrage ------------------ */

document.addEventListener('DOMContentLoaded', () => {
  renderStart();

  $('#start-btn').addEventListener('click', () => {
    const name = $('#player-name').value.trim() || 'Alex';
    newGame(name, $('#start-btn').dataset.origin);
    TAB = 'vie';
    render();
  });

  $('#continue-btn').addEventListener('click', () => {
    if (load()) { TAB = 'vie'; render(); }
    else toast("Aucune sauvegarde trouvée.");
  });

  $('#reset-btn').addEventListener('click', () => {
    confirmBox('Recommencer une vie ?', 'Ta partie en cours sera définitivement effacée.', () => { wipe(); renderStart(); });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !PENDING) closeModal();
    if (e.key === 'Enter' && S && !S.over && $('#modal').classList.contains('hidden') && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      endMonth();
    }
  });
});
