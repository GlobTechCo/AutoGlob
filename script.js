// AutoGlob — shared site script

var ARTICLES = [
  {
    "title": "1934 Duesenberg Model J: What Restoration Must Preserve",
    "url": "duesenberg-1934-restoration.html",
    "keywords": "duesenberg 1934 restoration"
  },
  {
    "title": "Naturally Aspirated V12s: Three Different Ways Forward",
    "url": "naturally-aspirated-v12-holdouts.html",
    "keywords": "naturally aspirated v12 holdouts"
  },
  {
    "title": "1960s Car Dashboards: Design Beyond the Nostalgia",
    "url": "1960s-dashboards-design.html",
    "keywords": "1960s dashboards design"
  },
  {
    "title": "Used EV Prices: Look Beyond the Discount",
    "url": "used-ev-prices-fell.html",
    "keywords": "used ev prices fell"
  },
  {
    "title": "The BMW 528i E39 and the Value of an Ordinary 5 Series",
    "url": "bmw-528i-e39-story.html",
    "keywords": "bmw 528i e39 story"
  },
  {
    "title": "BMW 330i G20: Why the Model Year Matters",
    "url": "bmw-330i-review.html",
    "keywords": "bmw 330i review"
  },
  {
    "title": "Volvo EX60 P10: Beyond the 400-Mile Headline",
    "url": "volvo-ex60-p10-review.html",
    "keywords": "volvo ex60 p10 review"
  },
  {
    "title": "Gas, Hybrid or EV? Calculate What Your Car Really Costs",
    "url": "gas-hybrid-ev-ownership-cost-guide.html",
    "keywords": "gas hybrid ev ownership cost guide"
  },
  {
    "title": "2027 Electric Mercedes C-Class: What U.S. Buyers Know",
    "url": "mercedes-c-class-ev.html",
    "keywords": "mercedes c class ev"
  },
  {
    "title": "DeLorean Before the Time Machine: The Company That Almost Wasn't",
    "url": "delorean-before-time-machine.html",
    "keywords": "delorean before time machine"
  },
  {
    "title": "From Chiron to Tourbillon: Bugatti Changes Its Formula",
    "url": "bugatti-chiron.html",
    "keywords": "bugatti chiron"
  },
  {
    "title": "Group B Rally: Innovation Outran the Rules",
    "url": "group-b-rally-era.html",
    "keywords": "group b rally era"
  },
  {
    "title": "Tucker 48: The Car, the Company and the Myth",
    "url": "tucker-car-too-honest-detroit.html",
    "keywords": "tucker car too honest detroit"
  },
  {
    "title": "Classic Car Auction Prices: What the Hammer Leaves Out",
    "url": "classic-car-auction-hammer-price.html",
    "keywords": "classic car auction hammer price"
  },
  {
    "title": "2026 Honda CR-V Gas vs Hybrid: Run the Numbers",
    "url": "honda-crv-first-test.html",
    "keywords": "honda crv first test"
  },
  {
    "title": "BMW’s 603-HP iX3 M60 Is More Than a Power Upgrade",
    "url": "bmw-ix3-m60-2027.html",
    "keywords": "bmw ix3 m60 2027"
  },
  {
    "title": "Corvette Grand Sport X: What 721 HP and AWD Change",
    "url": "corvette-grand-sport-x-test-analysis.html",
    "keywords": "corvette grand sport x test analysis"
  },
  {
    "title": "VIN Decoder",
    "url": "vin-decoder.html",
    "keywords": "vin decoder"
  },
  {
    "title": "Tire Size Calculator",
    "url": "tire-size-calculator.html",
    "keywords": "tire size calculator"
  },
  {
    "title": "Fuel Cost Calculator",
    "url": "fuel-cost-calculator.html",
    "keywords": "fuel cost calculator"
  },
  {
    "title": "Auto Loan Calculator",
    "url": "loan-calculator.html",
    "keywords": "loan calculator"
  },
  {
    "title": "Car Depreciation Calculator",
    "url": "depreciation-calculator.html",
    "keywords": "depreciation calculator"
  },
  {
    "title": "EV Charging Cost Calculator",
    "url": "ev-charging-calculator.html",
    "keywords": "ev charging calculator"
  },
  {
    "title": "Car CO2 Emissions Calculator",
    "url": "co2-calculator.html",
    "keywords": "co2 calculator"
  }
];

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Site search (client-side, no backend) ----
  var searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    var overlay = document.createElement('div');
    overlay.className = 'site-search-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'siteSearchHeading');
    overlay.id = 'siteSearchDialog';
    overlay.innerHTML =
      '<div class="site-search-panel"><h2 id="siteSearchHeading">Search AutoGlob</h2>' +
      '<div class="site-search-row"><label class="sr-only" for="siteSearchInput">Search articles and tools</label>' +
      '<input id="siteSearchInput" type="search" placeholder="Search articles and tools…" autocomplete="off">' +
      '<button id="siteSearchClose" type="button" aria-label="Close search">&times;</button></div>' +
      '<p id="siteSearchStatus" class="site-search-status" role="status" aria-live="polite"></p>' +
      '<div id="siteSearchResults" class="site-search-results"></div></div>';
    document.body.appendChild(overlay);
    searchBtn.setAttribute('aria-haspopup', 'dialog');
    searchBtn.setAttribute('aria-controls', overlay.id);
    var input = overlay.querySelector('#siteSearchInput');
    var results = overlay.querySelector('#siteSearchResults');
    var status = overlay.querySelector('#siteSearchStatus');
    var closeBtn = overlay.querySelector('#siteSearchClose');
    var previousFocus, previousOverflow, backgroundState = [];
    function openSearch() {
      previousFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      backgroundState = Array.from(document.body.children).filter(function (node) {
        return node !== overlay && node.tagName !== 'SCRIPT';
      }).map(function (node) {
        var state = {node: node, inert: node.inert};
        node.inert = true;
        return state;
      });
      overlay.style.display = 'flex';
      input.value = '';
      renderResults('');
      input.focus();
    }
    function closeSearch() {
      if (overlay.style.display !== 'flex') return;
      overlay.style.display = 'none';
      document.body.style.overflow = previousOverflow;
      backgroundState.forEach(function (state) { state.node.inert = state.inert; });
      if (previousFocus && previousFocus.focus) previousFocus.focus();
    }
    function renderResults(query) {
      var q = query.trim().toLowerCase();
      var matches = q === '' ? ARTICLES : ARTICLES.filter(function (a) {
        return (a.title + ' ' + (a.keywords || '')).toLowerCase().indexOf(q) !== -1;
      });
      status.textContent = matches.length ? matches.length + ' results' : 'No matches. Try a different word.';
      results.replaceChildren();
      matches.forEach(function (article) {
        var a = document.createElement('a');
        a.href = article.url;
        a.textContent = article.title;
        results.appendChild(a);
      });
    }
    searchBtn.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeSearch(); return; }
      if (e.key !== 'Tab') return;
      var focusable = overlay.querySelectorAll('input, button, a[href]');
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    input.addEventListener('input', function () { renderResults(input.value); });
  }

  // Remember the visitor's cookie preference.
  // Simple cookie consent banner
  var CONSENT_KEY = 'autoglob_cookie_consent';
  var consent;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}
  if (!consent) {
    var banner = document.createElement('div');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:100;' +
      'background:#0e1117;border:1px solid rgba(245,247,250,0.1);border-radius:3px;padding:16px 18px;' +
      'display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;' +
      'max-width:920px;margin:0 auto;font-family:Montserrat,sans-serif;color:#f5f7fa;font-size:13.5px;';
    banner.innerHTML =
      '<span style="max-width:56ch;color:#b0becd;">We remember your preference on this device. See our ' +
      '<a href="cookies.html" style="color:#12d6d0;">Cookie Policy</a>.</span>' +
      '<span style="display:flex;gap:10px;flex-shrink:0;">' +
      '<button id="cookieDecline" style="background:none;border:1px solid rgba(245,247,250,0.15);color:#b0becd;padding:9px 14px;border-radius:2px;font-size:13px;cursor:pointer;">Decline</button>' +
      '<button id="cookieAccept" style="background:#12d6d0;border:none;color:#081625;font-weight:700;padding:9px 14px;border-radius:2px;font-size:13px;cursor:pointer;">Accept</button>' +
      '</span>';
    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'accepted'); } catch (e) {}
      banner.remove();
    });
    document.getElementById('cookieDecline').addEventListener('click', function () {
      try { localStorage.setItem(CONSENT_KEY, 'declined'); } catch (e) {}
      banner.remove();
    });
  }
});




