/* =========================================================
   EMPIRE — Le navigateur du téléphone
   On n'achète pas une supercar dans un menu « train de vie ».
   On la commande sur le site du concessionnaire, à trois
   heures du matin, dans son lit.
   ========================================================= */

let WEB_SITE = null;     // site ouvert dans le navigateur
let WEB_QUERY = '';      // recherche en cours

/* Chaque site a son univers : ses couleurs, son ton, son catalogue. */
const WEB_SITES = [
  {
    id: 'auto', url: 'prestige-auto.fr', name: 'PRESTIGE AUTO',
    icon: 'fa-car-side', theme: 'auto',
    tag: "Concession multimarque · livraison sous 30 jours",
    hero: "Le plaisir se conduit.",
    items: () => LUXURY.filter(l => l.cat === 'Voiture')
  },
  {
    id: 'montres', url: 'maison-horlogere.ch', name: 'MAISON HORLOGÈRE',
    icon: 'fa-clock', theme: 'watch',
    tag: "Horlogerie suisse · certificat d'authenticité",
    hero: "On ne possède jamais vraiment une pièce d'exception.",
    items: () => LUXURY.filter(l => l.cat === 'Montre')
  },
  {
    id: 'marina', url: 'oceanis-marine.com', name: 'OCEANIS MARINE',
    icon: 'fa-anchor', theme: 'sea',
    tag: "Yachts et grands bateaux · place de port incluse",
    hero: "L'horizon, sans personne devant.",
    items: () => LUXURY.filter(l => l.id === 'yacht')
  },
  {
    id: 'aviation', url: 'skybridge.aero', name: 'SKYBRIDGE AVIATION',
    icon: 'fa-plane-up', theme: 'sky',
    tag: "Aviation d'affaires · gestion et équipage",
    hero: "Vous ne ferez plus jamais la queue.",
    items: () => LUXURY.filter(l => l.id === 'jet')
  },
  {
    id: 'galerie', url: 'galerie-blanche.art', name: 'GALERIE BLANCHE',
    icon: 'fa-palette', theme: 'art',
    tag: "Art contemporain · conseil en acquisition",
    hero: "Un placement qui décore les murs.",
    items: () => LUXURY.filter(l => l.id === 'art')
  },
  {
    id: 'demeures', url: 'demeures-privees.fr', name: 'DEMEURES PRIVÉES',
    icon: 'fa-landmark-dome', theme: 'estate',
    tag: "Biens d'exception · off-market",
    hero: "Certaines adresses ne se cherchent pas.",
    items: () => LUXURY.filter(l => l.cat === 'Immobilier')
  },
  {
    id: 'atlas', url: 'atlas-immobilier.fr', name: 'ATLAS IMMOBILIER',
    icon: 'fa-key', theme: 'realty',
    tag: () => `Annonces à ${currentCity(S).name} · achat comptant ou crédit`,
    hero: "Devenir propriétaire, ici ou ailleurs.",
    realty: true
  }
];

function getSite(id) { return WEB_SITES.find(s => s.id === id); }
function siteTag(s) { return typeof s.tag === 'function' ? s.tag() : s.tag; }

/* ---------------------------------------------------------
   LE NAVIGATEUR
   --------------------------------------------------------- */

function phoneWeb() {
  const site = WEB_SITE ? getSite(WEB_SITE) : null;
  const url = site ? site.url : 'nouvel onglet';

  return `
    <div class="web">
      <div class="web-bar">
        <button class="web-back" data-web="home" ${site ? '' : 'disabled'}><i class="fas fa-chevron-left"></i></button>
        <span class="web-url"><i class="fas fa-lock"></i> ${url}</span>
        <button class="web-back" data-web="reload"><i class="fas fa-rotate-right"></i></button>
      </div>
      <div class="web-page ${site ? 'th-' + site.theme : ''}">
        ${site ? (site.realty ? webRealty() : webShop(site)) : webHome()}
      </div>
    </div>`;
}

function webHome() {
  const owned = S.luxury.length;
  const props = (S.props || []).length;
  return `
    <div class="web-home">
      <div class="web-search">
        <i class="fas fa-magnifying-glass"></i>
        <input type="text" id="web-q" placeholder="Rechercher un site ou un modèle" value="${WEB_QUERY}">
      </div>

      ${WEB_QUERY ? webSearchResults() : `
        <div class="web-fav">Favoris</div>
        <div class="web-grid">
          ${WEB_SITES.map(s => `
            <button class="web-tile th-${s.theme}" data-web="go" data-id="${s.id}">
              <i class="fas ${s.icon}"></i>
              <b>${s.name}</b>
              <span>${s.url}</span>
            </button>`).join('')}
        </div>

        <div class="web-fav">Ce que tu possèdes</div>
        <div class="web-own">
          <div><span>Objets</span><b>${owned}</b></div>
          <div><span>Biens</span><b>${props}</b></div>
          <div><span>Valeur</span><b>${fmt(luxuryValue(S) + propertyEquity(S))}</b></div>
          <div><span>Entretien</span><b class="neg">${fmt(luxuryUpkeep(S))}/m</b></div>
        </div>
        ${S.luxury.length ? `<div class="web-list">
          ${S.luxury.map(id => {
            const l = LUXURY.find(x => x.id === id);
            return `
            <div class="web-mine">
              <i class="fas ${l.icon}"></i>
              <div><b>${l.name}</b><span>${fmt(l.upkeep)}/mois · +${l.rep} réputation</span></div>
              <button class="web-sell" data-act="sellLux" data-id="${l.id}">Revendre ${fmt(l.price * l.resale)}</button>
            </div>`;
          }).join('')}
        </div>` : ''}
      `}
    </div>`;
}

function webSearchResults() {
  const q = WEB_QUERY.toLowerCase();
  const hits = [];
  WEB_SITES.forEach(s => {
    if (s.name.toLowerCase().includes(q) || s.url.includes(q)) hits.push({ site: s });
    (s.items ? s.items() : []).forEach(l => {
      if (l.name.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q)) hits.push({ site: s, item: l });
    });
  });
  if (!hits.length) return `<div class="phone-empty">Aucun résultat pour « ${WEB_QUERY} ».</div>`;
  return `<div class="web-list">
    ${hits.slice(0, 12).map(h => `
      <button class="web-hit" data-web="go" data-id="${h.site.id}">
        <i class="fas ${h.item ? h.item.icon : h.site.icon}"></i>
        <div><b>${h.item ? h.item.name : h.site.name}</b><span>${h.site.url}${h.item ? ' · ' + fmt(h.item.price) : ''}</span></div>
      </button>`).join('')}
  </div>`;
}

function webShop(site) {
  const items = site.items();
  return `
    <div class="web-head">
      <div class="web-logo"><i class="fas ${site.icon}"></i> ${site.name}</div>
      <span class="web-tag">${siteTag(site)}</span>
    </div>
    <div class="web-hero">${site.hero}</div>
    <div class="web-cats">
      ${items.map(l => {
        const owned = S.luxury.includes(l.id);
        const can = S.money >= l.price;
        return `
        <div class="web-item ${owned ? 'owned' : ''}">
          <div class="web-item-vis"><i class="fas ${l.icon}"></i></div>
          <div class="web-item-body">
            <b>${l.name}</b>
            <p>${l.desc}</p>
            <div class="web-specs">
              <span><i class="fas fa-wrench"></i> ${fmt(l.upkeep)}/mois</span>
              <span><i class="fas fa-star"></i> +${l.rep} réputation</span>
              <span><i class="fas fa-face-smile"></i> +${l.joy} moral</span>
              <span><i class="fas fa-rotate-left"></i> ${Math.round(l.resale * 100)} % à la revente</span>
            </div>
            <div class="web-buy">
              <b class="web-price">${fmt(l.price)}</b>
              ${owned
                ? `<span class="web-owned">Dans ton garage</span>`
                : `<button class="web-order ${can ? '' : 'ko'}" data-act="buyLux" data-id="${l.id}" ${can ? '' : 'disabled'}>
                     ${can ? 'Commander' : 'Hors budget'}
                   </button>`}
            </div>
            ${owned && l.housing ? `<button class="web-sell" data-act="liveIn" data-id="${l.id}" ${S.housingId === l.id ? 'disabled' : ''}>
              ${S.housingId === l.id ? 'Tu y habites' : 'Y habiter'}</button>` : ''}
            ${owned ? `<button class="web-sell" data-act="sellLux" data-id="${l.id}">Revendre ${fmt(l.price * l.resale)}</button>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function webRealty() {
  const city = currentCity(S);
  const cap = mortgageCapacity(S);
  return `
    <div class="web-head">
      <div class="web-logo"><i class="fas fa-key"></i> ATLAS IMMOBILIER</div>
      <span class="web-tag">Annonces à ${city.name} · ${(mortgageRate(S) * 100).toFixed(2)} % sur 20 ans</span>
    </div>
    <div class="web-hero">Devenir propriétaire, ici ou ailleurs.</div>
    <p class="web-note">La banque te suivrait jusqu'à <b>${fmt(cap)}</b> d'emprunt. Frais de notaire : 8 %.</p>
    <div class="web-cats">
      ${PROPERTY_TYPES.map(t => {
        const price = propPrice(t.id, city.id);
        const fees = Math.round(price * 0.08);
        const down = Math.round(price * 0.2) + fees;
        const borrowed = price - Math.round(price * 0.2);
        const canCash = S.money >= price + fees;
        const canLoan = S.money >= down && borrowed <= cap;
        return `
        <div class="web-item">
          <div class="web-item-vis"><i class="fas ${t.icon}"></i></div>
          <div class="web-item-body">
            <b>${t.name}</b>
            <p>${t.desc}</p>
            <div class="web-specs">
              <span><i class="fas fa-file-invoice"></i> ${fmt(fees)} de frais</span>
              <span><i class="fas fa-hand-holding-dollar"></i> ${fmt(Math.round(price * city.yield / 12))}/mois</span>
              ${t.rental ? `<span><i class="fas fa-door-open"></i> ${t.units} lots</span>`
                : `<span><i class="fas fa-bed"></i> récup. ×${t.rest}</span>`}
            </div>
            <div class="web-buy">
              <b class="web-price">${fmt(price)}</b>
              <button class="web-order ${canCash ? '' : 'ko'}" data-act="buyProp" data-id="${t.id}" data-loan="0" ${canCash ? '' : 'disabled'}>Comptant</button>
            </div>
            <button class="web-sell" data-act="buyProp" data-id="${t.id}" data-loan="1" ${canLoan ? '' : 'disabled'}>
              À crédit — ${fmt(down)} d'apport
            </button>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

/* Branchement des interactions propres au navigateur */
function bindWeb() {
  $$('#phone [data-web]').forEach(el => el.addEventListener('click', e => {
    e.stopPropagation();
    const a = el.dataset.web;
    if (a === 'home') { WEB_SITE = null; WEB_QUERY = ''; }
    if (a === 'go') { WEB_SITE = el.dataset.id; WEB_QUERY = ''; }
    renderPhone();
  }));
  const q = $('#web-q');
  if (q) {
    q.addEventListener('input', () => {
      WEB_QUERY = q.value;
      const page = $('#phone .web-page');
      if (page) page.innerHTML = webHome();
      bindWeb();
      const nq = $('#web-q');
      if (nq) { nq.focus(); nq.setSelectionRange(nq.value.length, nq.value.length); }
    });
  }
}
