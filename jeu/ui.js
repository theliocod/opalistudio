/* =========================================================
   EMPIRE — Interface
   ========================================================= */

let TAB = 'vie';
let LOOK = null;   // look en cours de création
let BIZ_OPEN = null;
let BIZ_TAB = 'pilotage';

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function closeModal() {
  const m = $('#modal');
  m.classList.add('hidden');
  m.innerHTML = '';
}

let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}


/* ---------- Créateur de personnage ---------- */

const LOOK_PARTS = [
  { key: 'skin', label: 'Teint', list: SKINS, swatch: true },
  { key: 'hair', label: 'Coiffure', list: HAIRSTYLES, name: h => h.name },
  { key: 'hairColor', label: 'Couleur de cheveux', list: HAIR_COLORS, swatch: true },
  { key: 'beard', label: 'Pilosité', list: BEARDS, name: b => b.name },
  { key: 'eyes', label: 'Regard', list: EYE_SHAPES, name: e => e[0].toUpperCase() + e.slice(1) },
  { key: 'outfit', label: 'Tenue', list: OUTFITS, name: o => o.name },
  { key: 'outfitColor', label: 'Couleur de tenue', list: OUTFIT_COLORS, swatch: true },
  { key: 'accessory', label: 'Accessoire', list: ACCESSORIES, name: a => a.name }
];

function renderCreator() {
  const box = $('#creator');
  if (!box) return;
  box.innerHTML = `
    <div class="creator">
      <div class="creator-preview">
        <div class="creator-body">${avatarBody(LOOK, 128)}</div>
        <div class="creator-face">${avatarSVG(LOOK, 96, { bg: 'rgba(255,255,255,.07)' })}</div>
        <button class="btn btn-sm btn-ghost" data-look="random"><i class="fas fa-dice"></i> Au hasard</button>
      </div>
      <div class="creator-controls">
        ${LOOK_PARTS.map(p => `
          <div class="creator-row">
            <span class="creator-label">${p.label}</span>
            ${p.swatch ? `
              <div class="swatches">
                ${p.list.map((c, i) => `
                  <button class="swatch ${LOOK[p.key] === i ? 'on' : ''}" style="background:${c}"
                          data-look="set" data-key="${p.key}" data-val="${i}"></button>`).join('')}
              </div>`
            : `
              <div class="stepper">
                <button class="hbtn" data-look="prev" data-key="${p.key}">−</button>
                <span>${p.name(p.list[LOOK[p.key]] || p.list[0])}</span>
                <button class="hbtn" data-look="next" data-key="${p.key}">+</button>
              </div>`}
          </div>`).join('')}
      </div>
    </div>`;

  $$('#creator [data-look]').forEach(b => b.addEventListener('click', () => {
    const a = b.dataset.look, k = b.dataset.key;
    const part = LOOK_PARTS.find(p => p.key === k);
    if (a === 'random') LOOK = defaultLook();
    else if (a === 'set') LOOK[k] = +b.dataset.val;
    else if (a === 'next') LOOK[k] = (LOOK[k] + 1) % part.list.length;
    else if (a === 'prev') LOOK[k] = (LOOK[k] - 1 + part.list.length) % part.list.length;
    renderCreator();
  }));
}

function skillIcon(k) {
  return { business: 'fa-chess-king', marketing: 'fa-bullhorn', tech: 'fa-code', social: 'fa-comments', finance: 'fa-chart-pie' }[k];
}

function bar(value, max, cls) {
  const pct = clamp((value / max) * 100, 0, 100);
  return `<div class="bar"><div class="bar-fill ${cls}" style="width:${pct}%"></div></div>`;
}

/* ================= Écran de départ ================= */

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

  if (!LOOK) LOOK = defaultLook();
  renderCreator();

  $$('#origins .origin-card').forEach(b => b.addEventListener('click', () => {
    $$('#origins .origin-card').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
    $('#start-btn').disabled = false;
    $('#start-btn').dataset.origin = b.dataset.origin;
  }));

  $('#continue-btn').classList.toggle('hidden', !localStorage.getItem(SAVE_KEY));
}

/* ================= Rendu principal ================= */

function render() {
  if (!S) return renderStart();
  if (S.over) return renderGameOver();

  $('#screen-start').classList.add('hidden');
  $('#screen-end').classList.add('hidden');
  $('#screen-game').classList.remove('hidden');

  renderHeader();
  renderTabs();

  const map = {
    vie: renderVie, carriere: renderCarriere, business: renderBusiness,
    reseau: renderReseau, finances: renderFinances, patrimoine: renderPatrimoine,
    journal: renderJournal
  };
  $('#tab-content').innerHTML = map[TAB]();
  bindEvents();
  renderPhone();
  if (S.scene) renderScene(); else closeScenePanel();
  save();
}

function renderHeader() {
  const nw = netWorth(S);
  const profit = monthlyBusinessProfit(S);
  $('#hdr').innerHTML = `
    <div class="hdr-left">
      <span class="hdr-av">${avatarSVG(S.look, 42)}</span>
      <div>
        <div class="hdr-name">${S.name}</div>
        <div class="hdr-date">${dateLabel(S)}</div>
      </div>
    </div>
    <div class="hdr-stats">
      <div class="stat">
        <span class="stat-label"><i class="fas fa-wallet"></i> Liquidités</span>
        <span class="stat-value ${S.money < 0 ? 'neg' : ''}">${fmt(S.money)}</span>
      </div>
      <div class="stat">
        <span class="stat-label"><i class="fas fa-gem"></i> Patrimoine</span>
        <span class="stat-value ${nw < 0 ? 'neg' : 'accent'}">${fmt(nw)}</span>
      </div>
      <div class="stat">
        <span class="stat-label"><i class="fas fa-arrow-trend-up"></i> Profit / mois</span>
        <span class="stat-value ${profit > 0 ? 'pos' : 'muted'}">${profit > 0 ? fmt(profit) : '—'}</span>
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
      <button class="btn btn-sm" data-act="advance" data-days="1">+1 jour</button>
      <button class="btn btn-sm" data-act="advance" data-days="7">+1 sem.</button>
      <button class="btn btn-primary" data-act="advance" data-days="30">+1 mois <i class="fas fa-forward"></i></button>
    </div>`;
}

function renderTabs() {
  const staff = S.companies.reduce((a, c) => a + c.staff.length, 0);
  const applicants = S.companies.reduce((a, c) => a + c.applicants.length, 0);
  const tabs = [
    ['vie', 'Vie & planning', 'fa-calendar-day', 0],
    ['carriere', 'Carrière', 'fa-briefcase', 0],
    ['business', 'Entreprises', 'fa-rocket', S.companies.length],
    ['finances', 'Finances', 'fa-chart-column', 0],
    ['reseau', 'Réseau', 'fa-address-book', S.contacts.length],
    ['patrimoine', 'Patrimoine', 'fa-chart-line', 0],
    ['journal', 'Journal', 'fa-book-open', 0]
  ];
  $('#tabs').innerHTML = tabs.map(([id, label, icon, badge]) => `
    <button class="tab ${TAB === id ? 'active' : ''}" data-tab="${id}">
      <i class="fas ${icon}"></i> ${label}
      ${badge ? `<span class="badge">${badge}</span>` : ''}
      ${id === 'business' && applicants ? `<span class="badge badge-alt">${applicants}</span>` : ''}
    </button>`).join('');
}

/* ================= Onglet VIE / PLANNING ================= */

const PLAN_ACTS = {
  job: { name: "Emploi salarié", icon: 'fa-briefcase', color: '#60a5fa' },
  biz: { name: "Entreprise", icon: 'fa-rocket', color: '#f97316' },
  study: { name: "Formation", icon: 'fa-graduation-cap', color: '#a78bfa' },
  sport: { name: "Sport", icon: 'fa-dumbbell', color: '#22c55e' },
  social: { name: "Vie sociale", icon: 'fa-champagne-glasses', color: '#f472b6' },
  family: { name: "Famille", icon: 'fa-heart', color: '#ef4444' },
  network: { name: "Réseautage", icon: 'fa-users-line', color: '#facc15' }
};

function renderVie() {
  const h = housing(S);
  const total = plannedHours();
  const max = maxHours();
  const free = max - total;

  const rows = [];
  if (S.job) rows.push(planRow('job', undefined, `${S.job.name} — ${S.job.hours}h attendues`, ''));
  S.companies.forEach(c => {
    const e = planEntry('biz', c.uid);
    rows.push(planRow('biz', c.uid, c.name, `
      <div class="role-picker">
        ${FOUNDER_ROLES.map(r => `
          <button class="role-btn ${e && e.role === r.id ? 'on' : ''}" data-act="planrole" data-id="${c.uid}" data-role="${r.id}" title="${r.desc}">
            <i class="fas ${r.icon}"></i> ${r.name}
          </button>`).join('')}
      </div>`));
  });
  if (S.training) {
    const t = TRAININGS.find(x => x.id === S.training.id);
    const pct = Math.round((S.training.progress / t.days) * 100);
    rows.push(planRow('study', undefined, `${t.name} — ${pct}% fait`, ''));
  }
  const fam = initFamily(S);
  if (fam.partner || fam.children.length) {
    rows.push(planRow('family', undefined,
      `Famille — ${familyNeed(S).toFixed(1)}h attendues`, ''));
  }
  ['sport', 'social', 'network'].forEach(a => rows.push(planRow(a, undefined, PLAN_ACTS[a].name, '')));

  return `
  ${renderGuide()}
  <div class="cols">
   <div class="col">
    <section class="card">
      <h2><i class="fas fa-calendar-day"></i> Ton emploi du temps</h2>
      <p class="muted">Ce que tu fais chaque jour, jusqu'à ce que tu en décides autrement.
      Au-delà de ${CONFIG.baseHours}h par jour, ta santé et ton énergie encaissent.</p>

      <div class="plan-total">
        <div class="plan-gauge">
          ${S.plan.filter(p => p.hours > 0 && PLAN_ACTS[p.act]).map(p => `
            <div class="plan-seg" style="width:${(p.hours / max) * 100}%;background:${PLAN_ACTS[p.act].color}"
                 title="${PLAN_ACTS[p.act].name} : ${p.hours}h"></div>`).join('')}
          <div class="plan-seg free" style="width:${(Math.max(0, free) / max) * 100}%"></div>
        </div>
        <div class="plan-legend">
          <b class="${total > CONFIG.baseHours ? 'warn' : ''}">${total}h travaillées</b>
          <span>${free}h de récupération · maximum ${max}h</span>
        </div>
      </div>

      <div class="plan-rows">${rows.join('')}</div>
    </section>

    <section class="card">
      <h2><i class="fas fa-scale-balanced"></i> Budget mensuel</h2>
      <table class="table">
        <tr><td>Salaire</td><td class="right ${S.job ? 'pos' : 'muted'}">${S.job ? '+' + fmt(S.job.salary) : '—'}</td></tr>
        <tr><td>Profit de tes entreprises</td><td class="right ${monthlyBusinessProfit(S) ? 'pos' : 'muted'}">${monthlyBusinessProfit(S) ? '+' + fmt(monthlyBusinessProfit(S)) : '—'}</td></tr>
        <tr><td>Logement — ${h.name}</td><td class="right neg">-${fmt(h.cost)}</td></tr>
        ${S.lifeCost ? `<tr><td>Charges supplémentaires</td><td class="right neg">-${fmt(S.lifeCost)}</td></tr>` : ''}
        ${S.debt ? `<tr><td>Dette (${fmt(S.debt)})</td><td class="right neg">-${fmt(S.debt * CONFIG.debtInterest * 30 + Math.max(200, S.debt * 0.012))}</td></tr>` : ''}
      </table>
    </section>

    <section class="card">
      <h2><i class="fas fa-brain"></i> Compétences</h2>
      <p class="muted">Plafonds : autoformation ${SKILL_CAPS.auto}, formations payantes ${SKILL_CAPS.paid},
      expérience de terrain ${SKILL_CAPS.field}. Au-delà, seul un mentor de ton réseau peut te faire progresser.</p>
      <div class="skills">
        ${Object.entries(S.skills).map(([k, v]) => `
          <div class="skill">
            <div class="skill-top"><span><i class="fas ${skillIcon(k)}"></i> ${skillName(k)}</span><b>${v.toFixed(1)}</b></div>
            <div class="bar bar-caps">
              <div class="bar-fill skill-${k}" style="width:${v}%"></div>
              <span class="cap-mark" style="left:${SKILL_CAPS.auto}%"></span>
              <span class="cap-mark" style="left:${SKILL_CAPS.paid}%"></span>
              <span class="cap-mark" style="left:${SKILL_CAPS.field}%"></span>
            </div>
            <div class="skill-use">${SKILL_USE[k]}</div>
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
              <div class="row-sub">${x.desc} · récupération ×${x.rest} · moral ${x.happy >= 0 ? '+' : ''}${x.happy}</div>
            </div>
            <div class="row-side">
              <span class="price">${fmt(x.cost)}/mois</span>
              ${x.id === S.housingId ? '<span class="tag">Actuel</span>' :
                `<button class="btn btn-sm" data-act="housing" data-id="${x.id}">Emménager</button>`}
            </div>
          </div>`).join('')}
      </div>
    </section>

    ${renderFamily()}

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

const SKILL_USE = {
  business: "Charges fixes, taille d'équipe gérable, accès aux gros modèles.",
  marketing: "Rendement de chaque euro de publicité et de contenu.",
  tech: "Qualité du produit, coûts variables, modèles techniques.",
  social: "Vente directe, recrutement, négociation, réseau.",
  finance: "Impôts, coût de la dette, valorisation à la revente."
};

function planRow(act, ref, label, extra) {
  const e = planEntry(act, ref);
  const hours = e ? e.hours : 0;
  const a = PLAN_ACTS[act];
  return `
    <div class="plan-row ${hours ? 'on' : ''}">
      <div class="plan-ico" style="color:${a.color}"><i class="fas ${a.icon}"></i></div>
      <div class="plan-main">
        <b>${label}</b>
        ${extra}
      </div>
      <div class="plan-hours">
        <button class="hbtn" data-act="hours" data-a="${act}" data-id="${ref || ''}" data-delta="-1">−</button>
        <span>${hours}h</span>
        <button class="hbtn" data-act="hours" data-a="${act}" data-id="${ref || ''}" data-delta="1">+</button>
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

/* ================= Onglet CARRIÈRE ================= */

function renderCarriere() {
  return `
  <div class="cols">
   <div class="col">
    <section class="card">
      <h2><i class="fas fa-id-badge"></i> Situation professionnelle</h2>
      ${S.job ? `
        <div class="job-current">
          <div class="job-title"><i class="fas fa-briefcase"></i> ${S.job.name}</div>
          <div class="job-salary">${fmt(S.job.salary)} net / mois</div>
          <div class="row-sub">Ancienneté : ${Math.floor(S.jobDays / 30)} mois · ${S.job.hours}h par jour attendues
          ${S.jobWarnings > 15 ? ' · <b class="neg">ton implication est jugée insuffisante</b>' : ''}</div>
          <button class="btn btn-ghost btn-sm" data-act="quitJob">Démissionner</button>
        </div>` : `<p class="muted">Tu es sans emploi. Aucun salaire ne tombe, mais tout ton temps t'appartient.</p>`}
    </section>

    <section class="card">
      <h2><i class="fas fa-graduation-cap"></i> Se former</h2>
      ${S.training ? (() => {
        const t = TRAININGS.find(x => x.id === S.training.id);
        const pct = clamp((S.training.progress / t.days) * 100, 0, 100);
        return `<div class="training-current">
          <b>${t.name}</b>
          ${bar(pct, 100, 'skill-business')}
          <div class="row-sub">${Math.round(pct)}% — avance quand tu lui alloues des heures dans ton planning.</div>
        </div>`;
      })() : '<p class="muted">Aucune formation en cours.</p>'}
      <div class="list">
        ${TRAININGS.map(t => {
          const ok = !t.req || Object.entries(t.req).every(([k, v]) => S.skills[k] >= v);
          const capLabel = { auto: 'autoformation', paid: 'formation', field: 'terrain' }[t.source];
          const done = trainingCount(t.id);
          const price = trainingCost(t);
          const closed = !t.repeat && done > 0;
          return `
          <div class="row ${ok && !closed ? '' : 'row-locked'}">
            <div class="row-main">
              <div class="row-title">
                <i class="fas ${t.icon}"></i> ${t.name}
                ${t.repeat ? '<span class="chip ok">Renouvelable</span>' : ''}
                ${done ? `<span class="chip">suivie ${done} fois</span>` : ''}
              </div>
              <div class="row-sub">${t.desc}</div>
              <div class="req">
                ${Object.entries(t.gain).map(([k, v]) => `<span class="chip ok">+${v} ${skillName(k)}</span>`).join('')}
                <span class="chip">${t.days} jours · plafond ${capLabel} ${SKILL_CAPS[t.source]}</span>
                ${t.req ? Object.entries(t.req).map(([k, v]) => `<span class="chip ${S.skills[k] >= v ? 'ok' : 'ko'}">Requis ${skillName(k)} ${v}</span>`).join('') : ''}
              </div>
            </div>
            <div class="row-side">
              <span class="price">${price ? fmt(price) : 'Gratuit'}</span>
              ${done && t.repeat ? '<span class="row-sub">plus pointue, donc plus chère</span>' : ''}
              <button class="btn btn-sm" data-act="train" data-id="${t.id}" ${ok && !S.training && !closed ? '' : 'disabled'}>
                ${closed ? 'Déjà obtenue' : done ? 'Se reformer' : 'Commencer'}
              </button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </section>
   </div>

   <div class="col">
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
              <div class="req">
                <span class="chip">${j.hours}h / jour</span>
                ${Object.entries(j.req || {}).map(([k, v]) =>
                  `<span class="chip ${S.skills[k] >= v ? 'ok' : 'ko'}">${skillName(k)} ${v}</span>`).join('')}
              </div>
            </div>
            <div class="row-side">
              <span class="price">${fmt(j.salary)}/mois</span>
              <button class="btn btn-sm" data-act="apply" data-id="${j.id}" ${ok ? '' : 'disabled'}>Postuler</button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </section>
   </div>
  </div>`;
}

/* ================= Onglet RÉSEAU ================= */

function renderReseau() {
  const net = planEntry('network');
  return `
  <div class="grid">
    <section class="card wide">
      <h2><i class="fas fa-address-book"></i> Ton réseau</h2>
      <p class="muted">
        Alloue des heures au réseautage dans ton planning pour rencontrer de nouvelles personnes
        (${net ? `${net.hours}h/jour actuellement` : 'aucune heure allouée'}).
        Un contact de haut niveau est la seule façon de dépasser ${SKILL_CAPS.field} dans une compétence —
        et il faut entretenir la relation pour ça.
      </p>
      ${S.contacts.length ? `
      <div class="contacts">
        ${S.contacts.slice().sort((a, b) => b.relation - a.relation).map(k => {
          const kind = contactKind(k);
          const cool = S.day - k.lastSeen < 20;
          return `
          <div class="contact">
            <div class="contact-head">
              <span class="mini-av">${personAvatar(k, 46)}</span>
              <div>
                <b>${k.name}</b>
                <span class="row-sub"><i class="fas ${kind.icon}"></i> ${kind.name} · niveau ${k.level}</span>
              </div>
            </div>
            <p class="row-sub">${kind.desc}</p>
            <div class="metric"><span>Relation</span><b>${Math.round(k.relation)}/100</b></div>
            ${bar(k.relation, 100, 'rep')}
            <div class="req">
              ${kind.skills.map(s => `<span class="chip ${k.relation >= 30 ? 'ok' : ''}">${skillName(s)} jusqu'à ${k.level - 4}</span>`).join('')}
              ${k.favors ? `<span class="chip">${k.favors} service${k.favors > 1 ? 's' : ''} rendu${k.favors > 1 ? 's' : ''}</span>` : ''}
            </div>
            <div class="btn-row">
              <button class="btn btn-sm" data-act="meet" data-id="${k.id}" ${cool ? 'disabled' : ''}>
                <i class="fas fa-mug-hot"></i> ${cool ? 'Vu récemment' : 'Passer du temps'}
              </button>
              <button class="btn btn-sm btn-ghost" data-act="favor" data-id="${k.id}" ${k.relation >= 45 ? '' : 'disabled'}>
                <i class="fas fa-hand-holding-heart"></i> Demander un service
              </button>
            </div>
          </div>`;
        }).join('')}
      </div>` : `<div class="empty-inline"><i class="fas fa-user-plus"></i> Tu ne connais encore personne. Mets des heures sur « Réseautage ».</div>`}
    </section>
  </div>`;
}

/* ================= Onglet ENTREPRISES ================= */

function renderBusiness() {
  return `
  <div class="grid">
    ${renderGroup()}
    ${S.companies.length ? `
    <section class="card wide">
      <h2><i class="fas fa-sitemap"></i> Tes entreprises</h2>
      <div class="companies">${S.companies.map(renderCompanyCard).join('')}</div>
    </section>` : `
    <section class="card wide empty">
      <i class="fas fa-lightbulb"></i>
      <h2>Tu n'as encore rien créé</h2>
      <p class="muted">Un salaire te fait vivre. Une entreprise te rend libre.</p>
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
              <span><i class="fas fa-hourglass-half"></i> ${t.ramp} j de démarrage</span>
              <span><i class="fas fa-arrow-trend-up"></i> x${t.multiple} à la revente</span>
              <span><i class="fas fa-users"></i> marché ${num(t.market)}</span>
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
  const open = BIZ_OPEN === c.uid;
  const rev = projectedRevenue(c);
  const profit = projectedProfit(c);
  const val = valuation(c);
  const alerts = companyAlerts(c);

  return `
  <div class="company ${open ? 'open' : ''}">
    <div class="company-head" data-act="toggleBiz" data-id="${c.uid}">
      <div class="company-id">
        <i class="fas ${t.icon}"></i>
        <div>
          <h3>${c.name} ${alerts.length ? `<span class="alert-dot" title="${alerts.join(' · ')}">${alerts.length}</span>` : ''}</h3>
          <span class="row-sub">${t.name} · niveau ${c.level} · ${Math.round(c.equity * 100)}% détenus · ${c.staff.length} salarié${c.staff.length > 1 ? 's' : ''}</span>
        </div>
      </div>
      <div class="company-kpis">
        <div class="kpi"><span>Clients</span><b>${num(c.clients)}</b></div>
        <div class="kpi"><span>CA / mois</span><b>${fmt(rev)}</b></div>
        <div class="kpi"><span>Profit</span><b class="${profit >= 0 ? 'pos' : 'neg'}">${fmt(profit)}</b></div>
        <div class="kpi"><span>Trésorerie</span><b class="${c.cash < 0 ? 'neg' : ''}">${fmt(c.cash)}</b></div>
        <div class="kpi"><span>Valorisation</span><b class="accent">${fmt(val)}</b></div>
        <i class="fas fa-chevron-${open ? 'up' : 'down'} chev"></i>
      </div>
    </div>
    ${open ? `
    <div class="company-body">
      <div class="subtabs">
        ${[['pilotage', 'Pilotage', 'fa-sliders'], ['marche', `Marché (${(c.rivals || []).length})`, 'fa-chess'],
           ['equipe', `Équipe (${c.staff.length})`, 'fa-users'],
           ['recrutement', `Recrutement${c.applicants.length ? ` (${c.applicants.length})` : ''}`, 'fa-user-plus'],
           ['capital', 'Capital', 'fa-scale-balanced']].map(([id, label, icon]) => `
          <button class="subtab ${BIZ_TAB === id ? 'active' : ''}" data-act="biztab" data-id="${id}">
            <i class="fas ${icon}"></i> ${label}
          </button>`).join('')}
      </div>
      ${BIZ_TAB === 'pilotage' ? renderPilotage(c)
        : BIZ_TAB === 'marche' ? renderMarche(c)
        : BIZ_TAB === 'equipe' ? renderEquipe(c)
        : BIZ_TAB === 'recrutement' ? renderRecrutement(c)
        : renderCapital(c)}
    </div>` : ''}
  </div>`;
}

function companyAlerts(c) {
  const a = [];
  if (c.cash < 0) a.push(`Trésorerie négative depuis ${c.negDays} jours`);
  if (c.clients > capacity(c) * 0.95) a.push('Capacité saturée');
  if (c.staff.length > spanOfControl(c)) a.push('Équipe trop grande pour être encadrée');
  if (c.staff.some(e => e.morale < 30)) a.push('Moral au plus bas dans l\'équipe');
  if (c.applicants.some(x => x.revealed && x.skill > 70)) a.push('Un très bon candidat attend');
  if (c.blocked) a.push('Un canal est bloqué');
  if (marketPressure(c) > 0.72) a.push('La concurrence prend le dessus');
  return a;
}

function renderPilotage(c) {
  const t = getType(c);
  const cap = capacity(c);
  const load = cap ? Math.round((c.clients / cap) * 100) : 0;
  const share = Math.round(marketShare(c) * 100);
  const churnM = dailyChurn(c) * DAYS_PER_MONTH * 100;
  const acqM = dailyAcquisition(c) * DAYS_PER_MONTH;
  const upCost = Math.round(t.upgradeCost * Math.pow(1.55, c.level - 1));
  const alerts = companyAlerts(c);

  return `
  <div class="company-cols">
    <div>
      <h4>Indicateurs</h4>
      <div class="metric"><span>Clients</span><b>${num(c.clients)}</b></div>
      <div class="metric"><span>Acquisition estimée</span><b class="pos">+${acqM.toFixed(1)} / mois</b></div>
      <div class="metric"><span>Churn</span><b class="${churnM > 20 ? 'neg' : ''}">-${churnM.toFixed(1)}% / mois</b></div>
      <div class="metric"><span>Capacité</span><b>${num(cap)}</b></div>
      <div class="metric"><span>Charge</span><b class="${load > 100 ? 'neg' : load > 85 ? 'warn' : 'pos'}">${load}%</b></div>
      ${bar(Math.min(load, 130), 130, load > 100 ? 'health' : 'energy')}
      <div class="metric" style="margin-top:12px"><span>Qualité produit</span><b>${c.quality.toFixed(0)}/100</b></div>
      ${bar(c.quality, 100, 'happy')}
      <div class="metric" style="margin-top:12px"><span>Part de marché</span><b class="${share > 70 ? 'warn' : ''}">${share}%</b></div>
      ${bar(share, 100, 'rep')}
      <div class="metric" style="margin-top:12px"><span>Démarrage</span><b>${Math.round(rampFactor(c) * 100)}%</b></div>
      <div class="metric"><span>Croissance annualisée</span><b class="${(c.growth || 0) > 0 ? 'pos' : 'neg'}">${((c.growth || 0) * 100).toFixed(0)}%</b></div>
      <div class="metric"><span>Profit moyen (6 mois)</span><b>${fmt(c.avgProfit || 0)}</b></div>
      <div class="metric"><span>Masse salariale</span><b>${fmt(payrollMonthly(c))}</b></div>
      <div class="metric"><span>Charges fixes</span><b>${fmt(t.fixedCost * c.level)}</b></div>
      <div class="metric"><span>Budget acquisition</span><b>${fmt(adSpendMonthly(c))}</b></div>
      <div class="metric"><span>Âge</span><b>${Math.floor(c.days / 30)} mois</b></div>
      <button class="btn btn-sm" data-act="upgrade" data-id="${c.uid}" style="margin-top:12px">
        <i class="fas fa-arrow-up"></i> Niveau ${c.level + 1} — capacité +${num(t.capPerLevel)} (${fmt(upCost)})
      </button>
      ${alerts.length ? `<div class="alert"><i class="fas fa-triangle-exclamation"></i> ${alerts.join('<br>')}</div>` : ''}
    </div>

    <div>
      <h4>Est-ce que ta publicité rapporte ?</h4>
      ${(() => {
        const cac = realCAC(c);
        const ltv = clientValue(c);
        const ret = acquisitionReturn(c);
        const life = clientLifetime(c);
        const acqM = dailyAcquisition(c) * DAYS_PER_MONTH;
        const capM = absorptionCap(c) * DAYS_PER_MONTH;
        const saturated = acqM > capM * 0.97;
        const cap = capacity(c);
        const full = c.clients >= cap * 0.95;
        const cls = full || ret < 1 ? 'bad' : ret >= 1.6 ? 'good' : '';
        return `
        <div class="acq ${cls}">
          <div class="acq-grid">
            <div><span>Un client te coûte</span><b>${isFinite(cac) ? fmt(cac) : '—'}</b></div>
            <div><span>Un client te rapporte</span><b>${fmt(ltv)}</b></div>
            <div><span>Il reste</span><b>${life.toFixed(1)} mois</b></div>
            <div><span>Retour</span><b class="${ret >= 1 ? 'pos' : 'neg'}">${ret > 0 ? ret.toFixed(1) + '×' : '—'}</b></div>
          </div>
          <p>
            ${ret >= 1.6 ? `Chaque euro de publicité en rapporte ${ret.toFixed(1)}. Tu peux pousser les budgets.`
              : ret >= 1 ? `Chaque euro rapporte ${ret.toFixed(1)} : c'est rentable, mais la marge est mince.`
              : `<b>Chaque euro de publicité te fait perdre de l'argent.</b> Un client te coûte plus cher qu'il ne te rapportera. Baisse les budgets, monte tes prix, ou fais rester tes clients plus longtemps (qualité, support).`}
            ${full ? `<br><b class="neg">Ta capacité est saturée</b> : tu sers déjà ${num(c.clients)} clients pour une capacité de ${num(cap)}. Les nouveaux clients que tu payes repartent presque aussitôt. Monte ton niveau d'infrastructure ou recrute aux opérations <b>avant</b> d'augmenter la publicité.` : ''}
            ${saturated && !full ? `<br><b class="warn">Tu as atteint ta limite d'absorption</b> : environ ${num(capM)} nouveaux clients par mois. Au-delà, chaque client supplémentaire coûte de plus en plus cher — augmenter le budget maintenant ne sert quasiment à rien.` : ''}
          </p>
        </div>`;
      })()}
      <h4>Canaux d'acquisition</h4>
      ${(() => {
        const burn = projectedCosts(c) - projectedRevenue(c);
        const months = burn > 0 ? c.cash / burn : null;
        return `<div class="burn ${months !== null && months < 3 ? 'burn-bad' : ''}">
          <span>Dépenses totales <b>${fmt(projectedCosts(c))}/mois</b> pour <b>${fmt(projectedRevenue(c))}</b> de recettes</span>
          ${burn > 0
            ? `<span class="${months < 3 ? 'neg' : 'warn'}">Tu brûles ${fmt(burn)}/mois — ${months < 0.1 ? 'trésorerie déjà vide' : `${months.toFixed(1)} mois d'autonomie`}</span>`
            : `<span class="pos">L'affaire s'autofinance</span>`}
        </div>`;
      })()}
      <p class="row-sub">Chaque canal sature séparément : répartir coûte moins cher que tout mettre au même endroit.
      Ton niveau en ${skillName('marketing')} et en ${skillName('social')} change directement leur rendement.</p>
      ${CHANNELS.map(ch => {
        const blocked = c.blocked && c.blocked.channel === ch.id;
        const eff = channelEfficiency(c, ch);
        const out = channelOutput(c, ch);
        const maxB = Math.max(t.fixedCost * 4, Math.round(c.cash * 0.6), Math.round(projectedRevenue(c) * 0.7));
        return `
        <label class="field ${blocked ? 'blocked' : ''}">
          <span class="field-head">
            <b><i class="fas ${ch.icon}"></i> ${ch.name}</b>
            <em class="budget-label" data-for="${c.uid}-${ch.id}">${fmt(c.budgets[ch.id] || 0)}/mois</em>
          </span>
          <input type="range" min="0" max="${maxB}" step="50" value="${c.budgets[ch.id] || 0}"
                 data-act="budget" data-id="${c.uid}" data-ch="${ch.id}" ${blocked ? 'disabled' : ''}>
          <span class="row-sub">
            ${blocked ? `<b class="neg">Canal bloqué encore ${c.blocked.days} jours.</b>` : (() => {
              const target = (c.budgets[ch.id] || 0) / DAYS_PER_MONTH;
              const installed = c.stock[ch.id] || 0;
              const ramp = target > 0 ? Math.round(installed / target * 100) : (installed > 0 ? 100 : 0);
              return `Efficacité ×${eff.toFixed(2)} · ${out.toFixed(2)} client${out >= 2 ? 's' : ''}/jour
                ${target > 0 && ramp < 96 ? `· <b class="warn">montée en charge ${Math.min(99, ramp)}%</b> (${ch.rampDays} j pour porter à plein)` : ''}
                <br>${ch.desc}`;
            })()}
          </span>
        </label>`;
      }).join('')}

      <h4 style="margin-top:18px">Autres leviers</h4>
      <label class="field">
        <span class="field-head"><b><i class="fas fa-tag"></i> Niveau de prix</b>
        <em class="budget-label" data-for="${c.uid}-price">${Math.round(c.price * 100)}% du prix marché</em></span>
        <input type="range" min="60" max="160" step="5" value="${Math.round(c.price * 100)}"
               data-act="price" data-id="${c.uid}">
        <span class="row-sub">
          Valeur perçue de ton produit : <b>${Math.round(perceivedValue(c) * 100)}%</b> du prix marché
          (elle monte avec la qualité). Tu demandes ${Math.round(c.price * 100)}% →
          <b class="${priceDemandFactor(c) >= 1 ? 'pos' : 'neg'}">demande ×${priceDemandFactor(c).toFixed(2)}</b>.
          ${priceRatio(c) > 1.15 ? "Tu vends plus cher que ce que ton produit vaut : les clients arrivent moins et partent plus vite."
            : priceRatio(c) < 0.8 ? "Tu vends moins cher que ta valeur : du volume, mais de la marge laissée sur la table."
            : "Ton prix est cohérent avec ce que tu offres."}
        </span>
      </label>
      <label class="field">
        <span class="field-head"><b><i class="fas fa-flask"></i> Budget R&D / produit</b>
        <em class="budget-label" data-for="${c.uid}-rd">${fmt(c.rd)}/mois</em></span>
        <input type="range" min="0" max="${Math.max(Math.round(t.fixedCost * 2), Math.round(projectedRevenue(c) * 0.4))}" step="50" value="${c.rd}"
               data-act="rd" data-id="${c.uid}">
        <span class="row-sub">Fait monter la qualité, qui retient les clients et justifie les prix.</span>
      </label>
      <label class="field">
        <span class="field-head"><b><i class="fas fa-headset"></i> Budget support client</b>
        <em class="budget-label" data-for="${c.uid}-support">${fmt(c.support)}/mois</em></span>
        <input type="range" min="0" max="${Math.max(Math.round(t.fixedCost), Math.round(projectedRevenue(c) * 0.3))}" step="50" value="${c.support}"
               data-act="support" data-id="${c.uid}">
        <span class="row-sub">Réduit le churn, surtout quand tu as beaucoup de clients.</span>
      </label>
      <label class="field">
        <span class="field-head"><b><i class="fas fa-hand-holding-dollar"></i> Politique salariale</b>
        <em class="budget-label" data-for="${c.uid}-pay">${Math.round(c.payMod * 100)}% du marché</em></span>
        <input type="range" min="80" max="140" step="5" value="${Math.round(c.payMod * 100)}"
               data-act="pay" data-id="${c.uid}">
        <span class="row-sub">Payer au-dessus du marché coûte cher mais fait tenir le moral et évite les départs.</span>
      </label>
    </div>
  </div>`;
}


function renderMarche(c) {
  const t = getType(c);
  const total = marketSize(c);
  const pressure = marketPressure(c);
  const mine = c.clients / total;
  const rivals = (c.rivals || []).slice().sort((a, b) => b.clients - a.clients);
  const free = Math.max(0, 1 - occupiedShare(c));
  const tough = toughestRival(c);

  return `
  <div class="company-cols">
    <div>
      <h4>Partage du marché</h4>
      <p class="row-sub">${num(total)} clients existent sur ce marché. Voici comment ils se répartissent.</p>
      <div class="share-bar">
        <div class="share-me" style="width:${(mine * 100).toFixed(1)}%" title="Toi : ${num(c.clients)}"></div>
        ${rivals.map((r, i) => `
          <div class="share-rival" style="width:${(r.clients / total * 100).toFixed(1)}%;opacity:${0.85 - i * 0.13}"
               title="${r.name} : ${num(r.clients)}"></div>`).join('')}
        <div class="share-free" style="width:${(free * 100).toFixed(1)}%" title="Libre"></div>
      </div>
      <div class="share-legend">
        <span><i class="me"></i> Toi ${(mine * 100).toFixed(1)}%</span>
        <span><i class="rv"></i> Concurrents ${((occupiedShare(c) - mine) * 100).toFixed(1)}%</span>
        <span><i class="fr"></i> Libre ${(free * 100).toFixed(1)}%</span>
      </div>

      <div class="metric" style="margin-top:16px"><span>Pression concurrentielle</span>
        <b class="${pressure > 0.7 ? 'neg' : pressure > 0.45 ? 'warn' : 'pos'}">${Math.round(pressure * 100)}%</b></div>
      ${bar(pressure * 100, 100, pressure > 0.7 ? 'health' : 'energy')}
      <p class="row-sub">
        ${pressure > 0.7
          ? "Tes concurrents sont plus forts que toi. Tu acquiers moins et tu perds plus de clients qu'en marché calme. Améliore ton produit, ajuste ton prix, ou rachètes-en un."
          : pressure > 0.45
          ? "Marché disputé. Chaque point de qualité et chaque euro de prix comptent."
          : "Tu domines ce marché. Profites-en pour monter tes prix ou prendre les derniers points de part."}
      </p>
      ${tough ? `<p class="row-sub"><b>Le plus dangereux :</b> ${tough.name}${tough.known ? ` (${rivalKind(tough).name.toLowerCase()})` : ''}.</p>` : ''}
    </div>

    <div>
      <h4>Les autres acteurs</h4>
      ${rivals.length ? rivals.map(r => {
        const k = rivalKind(r);
        const price = Math.round(r.price * 100);
        const value = rivalValue(c, r);
        return `
        <div class="rival ${r.aggression > 0.7 ? 'hot' : ''}">
          <div class="rival-head">
            <b><i class="fas ${r.known ? k.icon : 'fa-circle-question'}"></i> ${r.name}</b>
            <span class="chip">${(r.clients / total * 100).toFixed(1)}% du marché</span>
          </div>
          ${r.known ? `
            <div class="row-sub">${k.name} — ${k.desc}</div>
            <div class="req">
              <span class="chip ${r.quality > c.quality ? 'ko' : 'ok'}">Qualité ${r.quality}</span>
              <span class="chip ${price < c.price * 100 ? 'ko' : 'ok'}">Prix ${price}%</span>
              <span class="chip ${r.aggression > 0.6 ? 'ko' : ''}">Agressivité ${Math.round(r.aggression * 100)}%</span>
              <span class="chip">${num(r.clients)} clients</span>
            </div>`
          : `<div class="row-sub">Tu ne sais presque rien d'eux. Une étude de marché te dirait comment ils se battent.</div>`}
          <div class="btn-row">
            ${!r.known ? `<button class="btn btn-sm" data-act="scout" data-id="${c.uid}" data-rid="${r.id}">
              <i class="fas fa-magnifying-glass"></i> Étudier (${fmt(t.fixedCost * 1.5)})</button>` : ''}
            <button class="btn btn-sm" data-act="attackRival" data-id="${c.uid}" data-rid="${r.id}">
              <i class="fas fa-bullhorn"></i> Campagne contre eux (${fmt(projectedRevenue(c) * 0.25 + t.fixedCost * 2)})</button>
            ${(() => {
              const price = value * (1.15 - S.skills.finance / 500);
              const ok = S.money + c.cash >= price;
              const ratio = r.clients / Math.max(1, c.clients);
              return `<button class="btn btn-sm btn-primary" data-act="buyRival" data-id="${c.uid}" data-rid="${r.id}" ${ok ? '' : 'disabled'}>
                <i class="fas fa-handshake"></i> ${ok ? `Racheter (${fmt(price)})` : `Hors de portée (${fmt(price)})`}</button>
                ${ratio > 3 ? `<span class="row-sub">${ratio.toFixed(0)}× ta taille</span>` : ''}`;
            })()}
          </div>
        </div>`;
      }).join('') : '<div class="empty-inline"><i class="fas fa-flag"></i> Tu es seul sur ce marché.</div>'}
    </div>
  </div>`;
}

function renderEquipe(c) {
  const span = spanOfControl(c);
  const over = c.staff.length - span;
  return `
  <div class="team">
    <div class="team-head">
      <div>
        <h4>Encadrement</h4>
        <div class="metric"><span>Personnes gérables</span><b>${span.toFixed(1)}</b></div>
        <div class="metric"><span>Effectif actuel</span><b class="${over > 0 ? 'neg' : 'pos'}">${c.staff.length}</b></div>
        <p class="row-sub">${over > 0
          ? `Tu as ${Math.ceil(over)} personne(s) de trop à encadrer : performance et moral en souffrent. Recrute un manager, ou passe en rôle « Direction & équipe ».`
          : "L'équipe est correctement encadrée."}</p>
      </div>
      <div>
        <h4>Contribution par pôle</h4>
        ${ROLES.map(r => {
          const f = roleForce(c, r.id);
          if (!f && !c.staff.some(e => e.role === r.id)) return '';
          return `<div class="metric"><span><i class="fas ${r.icon}"></i> ${r.name}</span><b>${f.toFixed(2)}</b></div>`;
        }).join('') || '<p class="row-sub">Aucun salarié pour l\'instant.</p>'}
      </div>
    </div>

    ${c.staff.length ? `
    <div class="staff-list">
      ${c.staff.slice().sort((a, b) => b.skill - a.skill).map(e => {
        const r = getRole(e.role), tr = getTrait(e.trait);
        const fair = marketSalary(e.role, e.skill) * S.wageIndex;
        const under = e.salary < fair * 0.92;
        return `
        <div class="staff ${e.morale < 30 ? 'staff-risk' : ''}">
          <div class="staff-main">
            <div class="staff-name">
              <span class="mini-av">${personAvatar(e, 38)}</span>
              <i class="fas ${r.icon}"></i>
              <b>${e.name}</b>
              <span class="chip">${r.name}</span>
              <span class="chip ${tr.good ? 'ok' : 'ko'}" title="${tr.desc}">${tr.name}</span>
              ${e.equity ? `<span class="chip ok">${Math.round(e.equity * 100)}% du capital</span>` : ''}
              ${e.variable ? '<span class="chip">Variable</span>' : ''}
            </div>
            <div class="staff-bars">
              <div class="staff-bar">
                <span>Niveau ${Math.round(e.skill)}</span>${bar(e.skill, 100, 'skill-business')}
              </div>
              <div class="staff-bar">
                <span>Moral ${Math.round(e.morale)}</span>${bar(e.morale, 100, e.morale < 35 ? 'health' : 'happy')}
              </div>
            </div>
            <div class="row-sub">
              ${fmt(e.salary)}/mois ${under ? `<b class="neg">— sous le marché (${fmt(fair)})</b>` : ''}
              · ${Math.floor(e.days / 30)} mois d'ancienneté
              · contribution ${staffPerf(c, e).toFixed(2)}
            </div>
          </div>
          <div class="staff-actions">
            <button class="btn btn-sm" data-act="raiseSalary" data-id="${c.uid}" data-sid="${e.id}">+12% de salaire</button>
            <button class="btn btn-sm btn-danger" data-act="fireStaff" data-id="${c.uid}" data-sid="${e.id}">Licencier</button>
          </div>
        </div>`;
      }).join('')}
    </div>` : '<div class="empty-inline"><i class="fas fa-user-plus"></i> Aucun salarié. Ouvre un poste dans l\'onglet Recrutement.</div>'}
  </div>`;
}

function renderRecrutement(c) {
  return `
  <div class="company-cols">
    <div>
      <h4>Postes ouverts</h4>
      <p class="row-sub">Plus tu proposes un salaire élevé, plus les candidatures sont nombreuses et de bon niveau.
      Le salaire de référence dépend du poste et du niveau visé.</p>
      ${ROLES.map(r => {
        const o = c.openings[r.id];
        const ref = Math.round(marketSalary(r.id, 50) * S.wageIndex);
        return `
        <div class="opening ${o ? 'on' : ''}">
          <div class="opening-head">
            <b><i class="fas ${r.icon}"></i> ${r.name}</b>
            <span class="row-sub">${r.desc}</span>
          </div>
          ${o ? `
            <label class="field">
              <span class="field-head"><em class="budget-label" data-for="${c.uid}-op-${r.id}">${fmt(o.salary)}/mois proposés</em>
              <em>marché : ${fmt(ref)}</em></span>
              <input type="range" min="${Math.round(ref * 0.5)}" max="${Math.round(ref * 2.2)}" step="50" value="${o.salary}"
                     data-act="opening" data-id="${c.uid}" data-role="${r.id}">
            </label>
            <div class="btn-row">
              <button class="btn btn-sm btn-ghost" data-act="closePos" data-id="${c.uid}" data-role="${r.id}">Fermer le poste</button>
              <button class="btn btn-sm" data-act="headhunt" data-id="${c.uid}" data-role="${r.id}">
                <i class="fas fa-user-tie"></i> Cabinet (${fmt(r.salary * 3 * S.wageIndex)})
              </button>
            </div>` : `
            <button class="btn btn-sm" data-act="openPos" data-id="${c.uid}" data-role="${r.id}">Ouvrir le poste</button>`}
        </div>`;
      }).join('')}
    </div>

    <div>
      <h4>Candidatures ${c.applicants.length ? `(${c.applicants.length})` : ''}</h4>
      ${c.applicants.length ? c.applicants.map(a => {
        const r = getRole(a.role), tr = getTrait(a.trait);
        const hint = candidateHint(a);
        return `
        <div class="applicant">
          <div class="applicant-main">
            <span class="mini-av floatl">${personAvatar(a, 40)}</span>
            <b><i class="fas ${r.icon}"></i> ${a.name}</b>
            <span class="row-sub">${r.name} · demande ${fmt(a.ask)}/mois</span>
            <div class="req">
              ${a.revealed
                ? `<span class="chip ok">Niveau ${a.skill}</span><span class="chip ${tr.good ? 'ok' : 'ko'}" title="${tr.desc}">${tr.name}</span>`
                : `<span class="chip ${hint.cls}">${hint.label}</span><span class="chip">Non évalué</span>`}
              ${a.waited > 30 ? '<span class="chip ko">Impatient</span>' : ''}
            </div>
          </div>
          <div class="btn-row">
            ${!a.revealed ? `<button class="btn btn-sm" data-act="interview" data-id="${c.uid}" data-sid="${a.id}"><i class="fas fa-clipboard-question"></i> Entretien</button>` : ''}
            <button class="btn btn-sm btn-ghost" data-act="negotiate" data-id="${c.uid}" data-sid="${a.id}" ${a.negotiated ? 'disabled' : ''}>Négocier</button>
            <button class="btn btn-sm btn-primary" data-act="hire" data-id="${c.uid}" data-sid="${a.id}">Embaucher</button>
          </div>
        </div>`;
      }).join('') : '<div class="empty-inline"><i class="fas fa-inbox"></i> Aucune candidature. Ouvre un poste et laisse passer quelques jours.</div>'}
    </div>
  </div>`;
}

function renderCapital(c) {
  const val = valuation(c);
  const dette = companyDebt(c);
  const mood = boardMood(c);
  const rows = capTable(c);

  return `
  <div class="company-cols">
    <div>
      <h4>Table de capitalisation</h4>
      ${rows.map(r => `
        <div class="metric"><span>${r.name}${r.board ? ' <i class="fas fa-gavel" title="siège au conseil"></i>' : ''}</span>
        <b class="${r.cls || ''}">${(r.pct * 100).toFixed(1)}%</b></div>`).join('')}
      <div class="cap-sep"></div>
      <div class="metric"><span>Valeur d'entreprise</span><b>${fmt(val)}</b></div>
      <div class="metric"><span>Trésorerie</span><b class="${c.cash < 0 ? 'neg' : ''}">${fmt(c.cash)}</b></div>
      ${dette ? `<div class="metric"><span>Dette bancaire</span><b class="neg">-${fmt(dette)}</b></div>` : ''}
      <div class="metric"><span>Ce que vaut ta part</span><b class="accent">${fmt(equityValue(c))}</b></div>
      ${mood ? `<div class="alert ${mood.patience <= 1 ? '' : 'soft'}"><i class="fas fa-gavel"></i>
        ${getFund(mood.fundId).name} siège à ton conseil. ${mood.patience >= 4 ? "Pour l'instant ils te suivent."
          : mood.patience >= 2 ? "Leur patience s'effrite : la trajectoire promise n'y est pas."
          : "Ils sont à bout. Ils vont te demander des comptes."}</div>` : ''}

      <h4 style="margin-top:16px">Opérations</h4>
      <div class="btn-row">
        <button class="btn btn-sm" data-act="dividend" data-id="${c.uid}"><i class="fas fa-hand-holding-dollar"></i> Sortir des dividendes</button>
        <button class="btn btn-sm btn-ghost" data-act="inject" data-id="${c.uid}"><i class="fas fa-syringe"></i> Injecter du cash</button>
      </div>
      <div class="btn-row">
        <button class="btn btn-sm btn-danger" data-act="sell" data-id="${c.uid}"><i class="fas fa-file-signature"></i> Vendre (${fmt(equityValue(c))})</button>
      </div>
      <p class="row-sub">Ton niveau en finance fait monter les valorisations qu'on t'offre, baisser le taux des banques et la fiscalité des dividendes.</p>
    </div>
    <div>
      ${renderRounds(c)}
      <div class="cap-sep"></div>
      ${renderLoans(c)}
    </div>
  </div>`;
}

/* ================= Onglet PATRIMOINE ================= */

function renderPatrimoine() {
  const pv = portfolioValue(S);
  const compVal = S.companies.reduce((a, c) => a + equityValue(c), 0);
  const nw = netWorth(S);
  const maxDebt = debtCeiling(S);

  return `
  <div class="grid">
    <section class="card">
      <h2><i class="fas fa-gem"></i> Patrimoine net</h2>
      <div class="bignum ${nw < 0 ? 'neg' : 'accent'}">${fmtFull(nw)}</div>
      <table class="table">
        <tr><td>Liquidités</td><td class="right">${fmt(S.money)}</td></tr>
        <tr><td>Entreprises</td><td class="right">${fmt(compVal)}</td></tr>
        <tr><td>Placements</td><td class="right">${fmt(pv)}</td></tr>
        <tr><td>Dettes</td><td class="right neg">${S.debt ? '-' + fmt(S.debt) : '0 €'}</td></tr>
      </table>
      ${S.exits.length ? `<h4 style="margin-top:16px">Reventes</h4>
        <ul class="exits">${S.exits.map(e => `<li>${e.name} — <b class="pos">${fmt(e.price)}</b></li>`).join('')}</ul>` : ''}
      ${renderSparkline()}
    </section>

    <section class="card">
      <h2><i class="fas fa-building-columns"></i> Banque</h2>
      <p class="muted">Plafond d'endettement : <b>${fmt(maxDebt)}</b></p>
      <div class="btn-row">
        ${[10000, 50000, 200000, 1000000].map(a => `
          <button class="btn btn-sm" data-act="borrow" data-amount="${a}" ${S.debt + a <= maxDebt ? '' : 'disabled'}>Emprunter ${fmt(a)}</button>`).join('')}
      </div>
      <div class="btn-row">
        <button class="btn btn-sm btn-ghost" data-act="repay" data-amount="5000" ${S.debt ? '' : 'disabled'}>Rembourser 5 k€</button>
        <button class="btn btn-sm btn-ghost" data-act="repay" data-amount="50000" ${S.debt ? '' : 'disabled'}>Rembourser 50 k€</button>
        <button class="btn btn-sm btn-ghost" data-act="repayAll" ${S.debt ? '' : 'disabled'}>Tout rembourser</button>
      </div>
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
                <span class="chip ${perf >= 0 ? 'ok' : 'ko'}">${perf >= 0 ? '+' : ''}${perf.toFixed(1)}%</span>
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
  const pts = S.history.slice(-160);
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
    <p class="row-sub">Patrimoine sur ${Math.round(pts.length)} mois</p>`;
}

/* ================= Onglet JOURNAL ================= */

function renderJournal() {
  return `
  <div class="grid">
    <section class="card wide">
      <h2><i class="fas fa-book-open"></i> Journal de bord</h2>
      <div class="log">
        ${S.log.map(l => `
          <div class="log-line log-${l.type}">
            <span class="log-date">${MONTH_NAMES[l.month].slice(0, 4)}. ${l.age} ans</span>
            <span>${l.text}</span>
          </div>`).join('')}
      </div>
    </section>
  </div>`;
}

/* ================= Modales ================= */

function showEvent(evt) {
  PENDING = evt;
  render();
  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box event">
      <div class="modal-tag"><i class="fas fa-bolt"></i> ${dateLabel(S)}</div>
      <h2>${evt.title}</h2>
      <p>${evt._text || evt.text}</p>
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
      <h2>${title}</h2><p class="muted">${hint}</p>
      <input type="number" id="ask-input" class="input" value="${defaultValue}" placeholder="Montant en €">
      <div class="modal-choices">
        <button class="btn btn-primary" id="ask-ok">Valider</button>
        <button class="btn btn-ghost" id="ask-cancel">Annuler</button>
      </div>
    </div>`;
  m.classList.remove('hidden');
  $('#ask-ok').addEventListener('click', () => { const v = parseFloat($('#ask-input').value); closeModal(); if (!isNaN(v)) cb(v); });
  $('#ask-cancel').addEventListener('click', closeModal);
  $('#ask-input').focus();
  $('#ask-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('#ask-ok').click(); });
}

function askText(title, hint, cb, defaultValue = '') {
  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box">
      <h2>${title}</h2><p class="muted">${hint}</p>
      <input type="text" id="ask-input" class="input" value="${defaultValue}" maxlength="28">
      <div class="modal-choices">
        <button class="btn btn-primary" id="ask-ok">Valider</button>
        <button class="btn btn-ghost" id="ask-cancel">Annuler</button>
      </div>
    </div>`;
  m.classList.remove('hidden');
  $('#ask-ok').addEventListener('click', () => { const v = $('#ask-input').value; closeModal(); cb(v); });
  $('#ask-cancel').addEventListener('click', closeModal);
  $('#ask-input').focus();
  $('#ask-input').addEventListener('keydown', e => { if (e.key === 'Enter') $('#ask-ok').click(); });
}

function confirmBox(title, text, cb) {
  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box">
      <h2>${title}</h2><p>${text}</p>
      <div class="modal-choices">
        <button class="btn btn-danger" id="cf-ok">Confirmer</button>
        <button class="btn btn-ghost" id="cf-no">Annuler</button>
      </div>
    </div>`;
  m.classList.remove('hidden');
  $('#cf-ok').addEventListener('click', () => { closeModal(); cb(); });
  $('#cf-no').addEventListener('click', closeModal);
}

/* ================= Fin de partie ================= */

function renderGameOver() {
  $('#screen-game').classList.add('hidden');
  $('#screen-start').classList.add('hidden');
  $('#screen-end').classList.remove('hidden');

  const nw = netWorth(S);
  const staff = S.companies.reduce((a, c) => a + c.staff.length, 0);
  const score = Math.round(nw / 1000 + S.happiness * 400 + S.health * 200 + S.goals.length * 5000
    + S.exits.length * 8000 + staff * 1200 + S.contacts.length * 800);
  let rank = 'Salarié discret';
  if (score > 20000) rank = 'Indépendant accompli';
  if (score > 60000) rank = 'Entrepreneur reconnu';
  if (score > 150000) rank = "Bâtisseur d'entreprises";
  if (score > 400000) rank = 'Magnat';
  if (score > 800000) rank = 'Légende';

  $('#end-content').innerHTML = `
    <div class="end-rank">${rank}</div>
    <h1>${S.name}, ${S.age} ans</h1>
    <p class="end-reason">${S.overReason}</p>
    <div class="end-stats">
      <div><span>Patrimoine final</span><b class="accent">${fmtFull(nw)}</b></div>
      <div><span>Entreprises</span><b>${S.companies.length + S.exits.length}</b></div>
      <div><span>Reventes</span><b>${S.exits.length}</b></div>
      <div><span>Salariés</span><b>${staff}</b></div>
      <div><span>Réseau</span><b>${S.contacts.length}</b></div>
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

/* ================= Liaison des événements ================= */

const SLIDERS = {
  budget: (el, v) => { setBudget(el.dataset.id, el.dataset.ch, v); return fmt(v) + '/mois'; },
  price: (el, v) => { const c = S.companies.find(x => x.uid === el.dataset.id); c.price = v / 100; return v + '% du prix marché'; },
  rd: (el, v) => { const c = S.companies.find(x => x.uid === el.dataset.id); c.rd = v; return fmt(v) + '/mois'; },
  support: (el, v) => { const c = S.companies.find(x => x.uid === el.dataset.id); c.support = v; return fmt(v) + '/mois'; },
  pay: (el, v) => { const c = S.companies.find(x => x.uid === el.dataset.id); c.payMod = v / 100; return v + '% du marché'; },
  opening: (el, v) => { const c = S.companies.find(x => x.uid === el.dataset.id); c.openings[el.dataset.role].salary = v; return fmt(v) + '/mois proposés'; }
};

// Rafraîchit les seuls indicateurs globaux, sans reconstruire la page
function refreshHeader() { renderHeader(); bindHeader(); }
function bindHeader() {
  $$('#hdr [data-act]').forEach(el => el.addEventListener('click', () => handleAction(el.dataset.act, el.dataset)));
}

function bindEvents() {
  $$('#tabs .tab').forEach(b => b.addEventListener('click', () => { TAB = b.dataset.tab; render(); }));

  $$('[data-act]').forEach(el => {
    const act = el.dataset.act;
    if (SLIDERS[act]) {
      const label = el.parentElement.querySelector('.budget-label');
      el.addEventListener('input', e => {
        const txt = SLIDERS[act](el, +e.target.value);
        if (label) label.textContent = txt;
      });
      // pas de re-rendu ici : cela ferait sauter l'interface pendant qu'on règle un curseur
      el.addEventListener('change', () => { save(); refreshHeader(); });
      return;
    }
    el.addEventListener('click', e => { e.stopPropagation(); handleAction(act, el.dataset); });
  });
}

function handleAction(act, d) {
  const id = d.id;
  switch (act) {
    case 'advance': advance(+d.days); break;

    case 'hours': {
      const cur = planEntry(d.a, d.id || undefined);
      const h = (cur ? cur.hours : 0) + (+d.delta);
      setPlan(d.a, h, d.id || undefined, cur ? cur.role : (d.a === 'biz' ? 'sales' : undefined));
      break;
    }
    case 'planrole': setPlanRole(id, d.role); break;

    case 'housing': setHousing(id); break;
    case 'apply': applyForJob(id); break;
    case 'quitJob': quitJob(); break;
    case 'train': startTraining(id); break;

    case 'meet': meetContact(id); break;
    case 'favor': askFavor(id); break;

    case 'found':
      askText("Nom de ton entreprise", "Comment veux-tu l'appeler ?", n => foundCompany(id, n),
        BUSINESS_TYPES.find(t => t.id === id).name);
      break;
    case 'toggleBiz': BIZ_OPEN = BIZ_OPEN === id ? null : id; BIZ_TAB = 'pilotage'; render(); break;
    case 'biztab': BIZ_TAB = id; render(); break;
    case 'upgrade': upgradeCompany(id); break;

    case 'openPos': {
      const ref = Math.round(marketSalary(d.role, 50) * S.wageIndex);
      openPosition(id, d.role, ref);
      break;
    }
    case 'closePos': closePosition(id, d.role); break;
    case 'headhunt': useHeadhunter(id, d.role); break;
    case 'interview': interview(id, d.sid); break;
    case 'negotiate': negotiate(id, d.sid); break;
    case 'hire': hireCandidate(id, d.sid); break;
    case 'fireStaff': {
      const c = S.companies.find(x => x.uid === id);
      const e = c.staff.find(x => x.id === d.sid);
      confirmBox(`Licencier ${e.name} ?`, `Deux mois d'indemnités seront prélevés sur la trésorerie de ${c.name}, et le moral de l'équipe en prendra un coup.`, () => fireStaff(id, d.sid));
      break;
    }
    case 'raiseSalary': raiseSalary(id, d.sid); break;

    case 'dividend': {
      const c = S.companies.find(x => x.uid === id);
      askNumber('Sortir des dividendes', `Trésorerie disponible : ${fmtFull(c.cash)}.`, v => transfer(id, v), Math.max(0, Math.floor(c.cash)));
      break;
    }
    case 'inject': askNumber('Injecter du cash', `Tes liquidités : ${fmtFull(S.money)}.`, v => transfer(id, -v)); break;

    case 'openRound': openRound(id); break;
    case 'offerNeg': negotiateOffer(id, d.sid); break;
    case 'offerOk': {
      const c = S.companies.find(x => x.uid === id);
      const o = c.offers.find(x => x.id === d.sid);
      const f = getFund(o.fundId);
      confirmBox(`Signer avec ${f.name} ?`,
        `${fmt(o.amount)} entrent dans ${c.name} contre ${Math.round(o.pct * 100)}% du capital. Tu passeras de ${Math.round(c.equity * 100)}% à ${Math.round((c.equity - o.pct) * 100)}%${o.board ? ', et ils prendront un siège à ton conseil' : ''}. C'est irréversible.`,
        () => acceptOffer(id, d.sid));
      break;
    }
    case 'roundSkip': declineRound(id); break;
    case 'loan': takeLoan(id, d.kind, +d.amount); break;
    case 'loanEarly': repayLoanEarly(id, d.sid); break;
    case 'groupUp': structureGroup(); break;
    case 'sell': {
      const c = S.companies.find(x => x.uid === id);
      confirmBox(`Vendre ${c.name} ?`, `Tu récupères ${fmtFull(equityValue(c))}.`, () => sellCompany(id));
      break;
    }

    case 'marry': proposeMarriage(); break;
    case 'breakup': {
      const p = initFamily(S).partner;
      confirmBox(`Mettre fin à ta relation avec ${p.name} ?`,
        p.married ? "Un divorce te coûtera entre 30 et 45 % de ton patrimoine." : "Vous vous séparez, sans conséquence financière.",
        () => breakUp());
      break;
    }

    case 'scout': scoutRival(id, d.rid); break;
    case 'attackRival': attackRival(id, d.rid); break;
    case 'buyRival': {
      const c = S.companies.find(x => x.uid === id);
      const r = c.rivals.find(x => x.id === d.rid);
      confirmBox(`Racheter ${r.name} ?`,
        `Tu paieras ${fmtFull(rivalValue(c, r) * (1.15 - S.skills.finance / 500))}. Une partie de leurs clients partira pendant la fusion.`,
        () => buyRival(id, d.rid));
      break;
    }

    case 'goTab': TAB = id; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); break;
    case 'guideOff': S.guideOff = true; render(); break;

    case 'signup': signUp(id); break;
    case 'attend': attendEvent(id); break;
    case 'party': throwParty(id); break;
    case 'buyLux': buyLuxury(id); break;
    case 'sellLux': {
      const l = getLuxury(id);
      confirmBox(`Revendre ${l.name} ?`, `Tu récupères ${fmtFull(l.price * l.resale)} et tu perds une partie de la réputation qui allait avec.`, () => sellLuxury(id));
      break;
    }
    case 'liveIn': setHousing(id); break;

    case 'borrow': borrow(+d.amount); break;
    case 'repay': repay(+d.amount); break;
    case 'repayAll': repay(S.debt); break;
    case 'buy': buyAsset(id, +d.amount); break;
    case 'buyCustom': askNumber('Investir', `Liquidités : ${fmtFull(S.money)}.`, v => buyAsset(id, v)); break;
    case 'sellAsset': sellAsset(id, +d.amount); break;
    case 'sellAll': sellAsset(id, (S.portfolio[id] || 0) * S.prices[id]); break;
  }
}

/* ================= Démarrage ================= */

document.addEventListener('DOMContentLoaded', () => {
  renderStart();

  $('#start-btn').addEventListener('click', () => {
    newGame($('#player-name').value.trim() || 'Alex', $('#start-btn').dataset.origin, LOOK);
    TAB = 'vie';
    render();
  });
  $('#continue-btn').addEventListener('click', () => {
    if (load()) { TAB = 'vie'; render(); } else toast("Aucune sauvegarde trouvée.");
  });
  $('#reset-btn').addEventListener('click', () => {
    confirmBox('Recommencer une vie ?', 'Ta partie en cours sera définitivement effacée.', () => { wipe(); renderStart(); });
  });

  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === 'Escape' && !PENDING) closeModal();
    if (!S || S.over || !$('#modal').classList.contains('hidden')) return;
    if (e.key === 'ArrowRight') advance(1);
    if (e.key === 'Enter') advance(7);
  });
});
