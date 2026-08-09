/* =========================================================
   EMPIRE — Scènes isométriques et téléphone
   Les moments en présentiel : on voit la salle, on voit les
   gens, on choisit qui aborder et comment.
   ========================================================= */

let PHONE_APP = null;      // application ouverte dans le téléphone
let TALK_TARGET = null;    // invité en cours de conversation

/* =========================================================
   TÉLÉPHONE
   ========================================================= */

const PHONE_APPS = [
  { id: 'contacts', name: 'Contacts', icon: 'fa-address-book', color: '#2f6fed' },
  { id: 'agenda', name: 'Agenda', icon: 'fa-calendar-days', color: '#e05a3a' },
  { id: 'sorties', name: 'Sorties', icon: 'fa-champagne-glasses', color: '#d94f8a' },
  { id: 'fetes', name: 'Recevoir', icon: 'fa-music', color: '#7b52d3' },
  { id: 'luxe', name: 'Train de vie', icon: 'fa-gem', color: '#c9a227' },
  { id: 'messages', name: 'Journal', icon: 'fa-comment-dots', color: '#1f9d6b' }
];

function renderPhone() {
  const el = $('#phone');
  if (!S || S.over) { el.innerHTML = ''; el.classList.add('hidden'); return; }
  el.classList.remove('hidden');

  const upcoming = S.calendar.filter(e => e.signed && !e.done).length;
  const badge = upcoming ? `<span class="phone-badge">${upcoming}</span>` : '';

  if (!PHONE_APP) {
    el.innerHTML = `
      <button class="phone-tab" data-act="phoneOpen" data-id="home">
        <i class="fas fa-mobile-screen-button"></i> Téléphone ${badge}
      </button>`;
    bindPhone();
    return;
  }

  el.innerHTML = `
    <div class="phone">
      <div class="phone-top">
        <span>${dateLabel(S)}</span>
        <span><i class="fas fa-signal"></i> <i class="fas fa-battery-three-quarters"></i></span>
      </div>
      <div class="phone-screen">
        ${PHONE_APP === 'home' ? phoneHome() : phoneApp(PHONE_APP)}
      </div>
      <div class="phone-bottom">
        ${PHONE_APP !== 'home'
          ? `<button class="phone-btn" data-act="phoneOpen" data-id="home"><i class="fas fa-house"></i></button>`
          : `<button class="phone-btn" data-act="phoneOpen" data-id=""><i class="fas fa-chevron-down"></i></button>`}
      </div>
    </div>`;
  bindPhone();
}

function phoneHome() {
  const upcoming = S.calendar.filter(e => e.signed && !e.done);
  const next = upcoming[0];
  return `
    <div class="phone-lock">
      <div class="phone-hour">${dayOfMonth(S)} ${MONTH_NAMES[monthIndex(S)]}</div>
      <div class="phone-sub">${S.name} · ${S.age} ans</div>
      ${next ? `<div class="phone-next"><i class="fas fa-bell"></i> ${getVenue(next.venue).name} dans ${next.day - S.day} j</div>` : ''}
    </div>
    <div class="phone-grid">
      ${PHONE_APPS.map(a => {
        let b = '';
        if (a.id === 'contacts' && S.contacts.length) b = S.contacts.length;
        if (a.id === 'agenda' && upcoming.length) b = upcoming.length;
        return `
        <button class="phone-app" data-act="phoneOpen" data-id="${a.id}">
          <span class="phone-icon" style="background:${a.color}">
            <i class="fas ${a.icon}"></i>${b ? `<span class="phone-badge">${b}</span>` : ''}
          </span>
          <span>${a.name}</span>
        </button>`;
      }).join('')}
    </div>`;
}

function phoneApp(id) {
  switch (id) {
    case 'contacts': return phoneContacts();
    case 'agenda': return phoneAgenda();
    case 'sorties': return phoneSorties();
    case 'fetes': return phoneFetes();
    case 'luxe': return phoneLuxe();
    case 'messages': return phoneMessages();
    default: return '';
  }
}

function phoneHeader(title, icon) {
  return `<div class="phone-head"><i class="fas ${icon}"></i> ${title}</div>`;
}

function phoneContacts() {
  if (!S.contacts.length) {
    return phoneHeader('Contacts', 'fa-address-book') +
      `<div class="phone-empty">Personne. Sors, va à des événements, alloue des heures au réseautage.</div>`;
  }
  return phoneHeader('Contacts', 'fa-address-book') + `
    <div class="phone-list">
      ${S.contacts.slice().sort((a, b) => b.relation - a.relation).map(k => {
        const kind = contactKind(k);
        const cool = S.day - k.lastSeen < 20;
        return `
        <div class="phone-contact">
          <div class="pc-av">${personAvatar(k, 44, { bg: 'rgba(255,255,255,.08)' })}</div>
          <div class="pc-main">
            <b>${k.name}</b>
            <span>${kind.name} · niveau ${k.level}</span>
            <div class="pc-bar">${bar(k.relation, 100, 'rep')}</div>
          </div>
          <div class="pc-actions">
            <button class="phone-mini" data-act="meet" data-id="${k.id}" ${cool ? 'disabled' : ''} title="Passer du temps ensemble">
              <i class="fas fa-mug-hot"></i>
            </button>
            <button class="phone-mini" data-act="favor" data-id="${k.id}" ${k.relation >= 45 ? '' : 'disabled'} title="Demander un service">
              <i class="fas fa-hand-holding-heart"></i>
            </button>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function phoneAgenda() {
  const first = S.day - ((S.day % DAYS_PER_MONTH));
  const cells = [];
  for (let i = 0; i < DAYS_PER_MONTH; i++) {
    const d = first + i;
    const evts = S.calendar.filter(e => e.day === d);
    const signed = evts.some(e => e.signed);
    cells.push(`
      <div class="cal-cell ${d === S.day ? 'today' : ''} ${d < S.day ? 'past' : ''} ${evts.length ? 'has' : ''} ${signed ? 'signed' : ''}"
           title="${evts.map(e => getVenue(e.venue).name).join(', ')}">
        <span>${i + 1}</span>
        ${evts.length ? `<i class="dot"></i>` : ''}
      </div>`);
  }
  const next = S.calendar.filter(e => e.day >= S.day).slice(0, 6);
  return phoneHeader(MONTH_NAMES[monthIndex(S)], 'fa-calendar-days') + `
    <div class="cal-grid">${cells.join('')}</div>
    <div class="phone-list">
      ${next.map(e => {
        const v = getVenue(e.venue);
        const days = e.day - S.day;
        return `
        <div class="phone-row ${e.signed ? 'on' : ''}">
          <div class="pr-main">
            <b><i class="fas ${v.icon}"></i> ${v.name}</b>
            <span>${days === 0 ? "aujourd'hui" : `dans ${days} jour${days > 1 ? 's' : ''}`} · ${v.cost ? fmt(v.cost) : 'gratuit'}</span>
          </div>
          ${e.day === S.day
            ? `<button class="phone-go" data-act="attend" data-id="${e.uid}">Y aller</button>`
            : `<button class="phone-mini ${e.signed ? 'on' : ''}" data-act="signup" data-id="${e.uid}">
                 <i class="fas ${e.signed ? 'fa-check' : 'fa-plus'}"></i>
               </button>`}
        </div>`;
      }).join('')}
    </div>`;
}

function phoneSorties() {
  return phoneHeader('Sorties possibles', 'fa-champagne-glasses') + `
    <div class="phone-list">
      ${VENUES.map(v => {
        const ok = venueOpen(v);
        const next = S.calendar.find(e => e.venue === v.id && e.day >= S.day);
        return `
        <div class="phone-card ${ok ? '' : 'locked'}">
          <b><i class="fas ${v.icon}"></i> ${v.name}</b>
          <p>${v.desc}</p>
          <div class="phone-meta">
            <span>${v.cost ? fmt(v.cost) : 'Gratuit'}</span>
            <span>${v.hours}h</span>
            <span>${v.crowd} personnes</span>
            <span>niveau ${Math.round(v.prestige * 100)}</span>
          </div>
          ${!ok ? `<span class="phone-lockmsg">Réputation ${v.req.reputation || 0} requise${v.req.business ? ` · business ${v.req.business}` : ''}</span>`
            : next ? `<span class="phone-lockmsg ok">Prochaine date dans ${next.day - S.day} j — voir l'agenda</span>` : ''}
        </div>`;
      }).join('')}
    </div>`;
}

function phoneFetes() {
  return phoneHeader('Recevoir', 'fa-music') + `
    <div class="phone-list">
      ${PARTIES.map(p => {
        const okHouse = housingTier(S) >= p.minHousing;
        const okMoney = S.money >= p.cost;
        return `
        <div class="phone-card ${okHouse && okMoney ? '' : 'locked'}">
          <b><i class="fas ${p.icon}"></i> ${p.name}</b>
          <p>${p.desc}</p>
          <div class="phone-meta">
            <span>${fmt(p.cost)}</span>
            <span>${p.hours}h</span>
            <span>+${p.happy} moral</span>
            <span>+${p.rep} réputation</span>
          </div>
          ${!okHouse
            ? `<span class="phone-lockmsg">Il te faut un logement plus grand (${HOUSING[p.minHousing] ? HOUSING[p.minHousing].name : 'penthouse ou manoir'}).</span>`
            : `<button class="phone-go wide" data-act="party" data-id="${p.id}" ${okMoney ? '' : 'disabled'}>
                 ${okMoney ? 'Organiser' : 'Trop cher'}
               </button>`}
        </div>`;
      }).join('')}
    </div>`;
}

function phoneLuxe() {
  const cats = [...new Set(LUXURY.map(l => l.cat))];
  return phoneHeader('Train de vie', 'fa-gem') + `
    <div class="phone-sum">
      <div><span>Entretien</span><b class="neg">${fmt(luxuryUpkeep(S))}/mois</b></div>
      <div><span>Valeur</span><b class="accent">${fmt(luxuryValue(S))}</b></div>
      <div><span>Réputation</span><b>+${luxuryRep(S)}</b></div>
    </div>
    <div class="phone-list">
      ${cats.map(cat => `
        <div class="phone-cat">${cat}</div>
        ${LUXURY.filter(l => l.cat === cat).map(l => {
          const owned = S.luxury.includes(l.id);
          const canBuy = S.money >= l.price;
          return `
          <div class="phone-card ${owned ? 'owned' : canBuy ? '' : 'locked'}">
            <b><i class="fas ${l.icon}"></i> ${l.name}</b>
            <p>${l.desc}</p>
            <div class="phone-meta">
              <span>${fmt(l.price)}</span>
              <span>${fmt(l.upkeep)}/mois</span>
              <span>+${l.rep} rép.</span>
              <span>+${l.joy} moral</span>
            </div>
            ${owned ? `
              <div class="phone-btns">
                ${l.housing ? `<button class="phone-go" data-act="liveIn" data-id="${l.id}" ${S.housingId === l.id ? 'disabled' : ''}>
                  ${S.housingId === l.id ? 'Tu y habites' : 'Y habiter'}</button>` : ''}
                <button class="phone-go ghost" data-act="sellLux" data-id="${l.id}">Revendre ${fmt(l.price * l.resale)}</button>
              </div>`
              : `<button class="phone-go wide" data-act="buyLux" data-id="${l.id}" ${canBuy ? '' : 'disabled'}>
                   ${canBuy ? 'Acheter' : 'Hors de portée'}
                 </button>`}
          </div>`;
        }).join('')}`).join('')}
    </div>`;
}

function phoneMessages() {
  return phoneHeader('Journal', 'fa-comment-dots') + `
    <div class="phone-list phone-log">
      ${S.log.slice(0, 40).map(l => `
        <div class="phone-msg log-${l.type}">
          <span class="phone-msg-date">${MONTH_NAMES[l.month].slice(0, 4)}. ${l.age} ans</span>
          <span>${l.text}</span>
        </div>`).join('')}
    </div>`;
}

function bindPhone() {
  $$('#phone [data-act]').forEach(el => {
    el.addEventListener('click', e => {
      e.stopPropagation();
      const act = el.dataset.act;
      if (act === 'phoneOpen') { PHONE_APP = el.dataset.id || null; renderPhone(); return; }
      handleAction(act, el.dataset);
      renderPhone();
    });
  });
}

/* =========================================================
   PROPOSITION D'ALLER À UN ÉVÉNEMENT
   ========================================================= */

function promptEvent(entry) {
  const v = getVenue(entry.venue);
  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box event">
      <div class="modal-tag"><i class="fas fa-calendar-check"></i> ${dateLabel(S)}</div>
      <h2>${v.name}</h2>
      <p>${v.desc}</p>
      <p class="muted">Entrée ${v.cost ? fmt(v.cost) : 'libre'} · ${v.hours} heures de ta journée · ${v.crowd} personnes à rencontrer.</p>
      <div class="modal-choices">
        <button class="btn btn-primary" id="ev-go"><i class="fas fa-door-open"></i> Y aller</button>
        <button class="btn btn-ghost" id="ev-skip">Finalement, non</button>
      </div>
    </div>`;
  m.classList.remove('hidden');
  $('#ev-go').addEventListener('click', () => { closeModal(); attendEvent(entry.uid); });
  $('#ev-skip').addEventListener('click', () => {
    closeModal();
    entry.signed = false; entry.done = true;
    addLog(S, `Tu ne t'es finalement pas rendu à « ${v.name} ».`, 'warn');
    render();
  });
}

/* =========================================================
   SCÈNE ISOMÉTRIQUE
   ========================================================= */

function renderScene() {
  const sc = S.scene;
  const el = $('#scene');
  if (!sc) { el.classList.add('hidden'); el.innerHTML = ''; render(); return; }

  const room = ROOMS[sc.room];
  const remaining = sc.guests.filter(g => !g.talked).length;

  el.classList.remove('hidden');
  el.innerHTML = `
    <div class="scene-wrap">
      <div class="scene-head">
        <div>
          <h2><i class="fas fa-location-dot"></i> ${sc.title}</h2>
          <span>${room.name} · ${remaining} personne${remaining > 1 ? 's' : ''} à aborder</span>
        </div>
        <button class="btn btn-primary" data-scene="leave"><i class="fas fa-door-open"></i> Rentrer</button>
      </div>

      <div class="iso-stage">
        <div class="iso-room" style="--floor:${room.floor};--floor2:${room.floor2};--wall:${room.wall};--accent:${room.accent}">
          <div class="iso-floor"></div>
          <div class="iso-wall iso-wall-l"></div>
          <div class="iso-wall iso-wall-r"></div>
          ${room.props.map(p => `
            <div class="iso-prop" style="
              left:${p.x}%; top:${p.y}%; width:${p.w}%; height:${p.h}%;
              --ph:${p.h3}px; --pc:${p.color};">
              <div class="prop-top"></div><div class="prop-side"></div><div class="prop-front"></div>
              ${p.label ? `<span class="prop-label">${p.label}</span>` : ''}
            </div>`).join('')}

          ${sc.guests.map(g => `
            <button class="iso-person ${g.talked ? 'done' : ''}" data-scene="talk" data-id="${g.id}"
                    style="left:${g.x}%; top:${g.y}%; z-index:${Math.round(g.y)}">
              <span class="iso-shadow"></span>
              <span class="iso-billboard">
                <span class="iso-tag">${g.name.split(' ')[0]}${g.known ? ' ★' : ''}${g.talked ? ' ✓' : ''}</span>
                ${personBody(g, 54)}
              </span>
            </button>`).join('')}

          <div class="iso-person iso-me" style="left:50%; top:90%; z-index:95">
            <span class="iso-shadow"></span>
            <span class="iso-billboard">
              <span class="iso-tag me">Toi</span>
              ${avatarBody(S.look, 58)}
            </span>
          </div>
        </div>
      </div>

      ${sc.log.length ? `
      <div class="scene-log">
        ${sc.log.slice(0, 4).map(l => `
          <div class="scene-line ${l.win ? 'win' : 'fail'}">
            <b>${l.name}</b> — ${l.text}
            ${l.reward ? `<span class="scene-reward">${l.reward}</span>` : ''}
          </div>`).join('')}
      </div>` : `<p class="scene-hint">Clique sur quelqu'un pour l'aborder. Tu ne peux parler qu'une fois à chaque personne.</p>`}
    </div>`;

  $$('#scene [data-scene]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.scene === 'leave') return leaveScene();
    if (b.dataset.scene === 'talk') openTalk(b.dataset.id);
  }));
}

function openTalk(guestId) {
  const sc = S.scene;
  const g = sc.guests.find(x => x.id === guestId);
  if (!g || g.talked) return;
  const t = guestType(g);
  TALK_TARGET = guestId;

  const m = $('#modal');
  m.innerHTML = `
    <div class="modal-box talk">
      <div class="talk-head">
        <div class="talk-av">${personAvatar(g, 74, { bg: 'rgba(255,255,255,.08)' })}</div>
        <div>
          <h2>${g.name}</h2>
          <span class="talk-role"><i class="fas ${t.icon}"></i> ${t.name} · niveau ${g.level}</span>
        </div>
      </div>
      <p class="talk-line">« ${t.opening} »</p>
      <div class="talk-choices">
        ${APPROACHES.map(a => {
          const odds = Math.round(approachOdds(g, a) * 100);
          const cls = odds > 65 ? 'ok' : odds > 40 ? '' : 'ko';
          return `
          <button class="talk-btn" data-talk="${a.id}">
            <span>${a.label}</span>
            <em class="chip ${cls}">${skillName(a.skill)} · ${odds}%</em>
          </button>`;
        }).join('')}
        <button class="btn btn-ghost btn-sm" data-talk="cancel">Passer ton chemin</button>
      </div>
    </div>`;
  m.classList.remove('hidden');
  $$('#modal [data-talk]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.talk;
    closeModal();
    if (id !== 'cancel') talkTo(guestId, id);
  }));
}
