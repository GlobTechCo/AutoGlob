// AutoGlob — shared site script

var ARTICLES = [{"url": "volkswagen-id-tiguan-reveal.html", "title": "2028 Volkswagen ID. Tiguan: What to Know About the ID.4 Successor", "description": "Expected in the U.S. for the 2028 model year, the ID. Tiguan brings a familiar name and physical controls to VW’s electric SUV. American pricing and EPA range remain unannounced.", "category": "News", "topics": ["Volkswagen", "EV", "SUV"], "date": "2026-10-15"},{"url":"mercedes-gls-2027-update.html","title":"2027 Mercedes-Benz GLS: A Familiar SUV Gets a Digital Overhaul","category":"News","topics":["Mercedes-Benz","SUV"],"date":"2026-10-13"},{"title":"BMW’s 603-HP iX3 M60 Is More Than a Power Upgrade","url":"bmw-ix3-m60-2027.html","category":"News","topics":["BMW","EV","SUV"],"date":"2026-10-12"},{"title":"Volvo EX60 P10: Beyond the 400-Mile Headline","url":"volvo-ex60-p10-review.html","category":"Analysis","topics":["Volvo","EV","SUV"],"date":"2026-10-12"},{"title":"Corvette Grand Sport X: What 721 HP and AWD Change","url":"corvette-grand-sport-x-test-analysis.html","category":"Analysis","topics":["Chevrolet","Hybrid","Performance"],"date":"2026-10-12"},{"title":"Gas, Hybrid or EV? Calculate What Your Car Really Costs","url":"gas-hybrid-ev-ownership-cost-guide.html","category":"Guides","topics":["Ownership","Hybrid","EV"],"date":"2026-10-12"},{"title":"The BMW 528i E39 and the Value of an Ordinary 5 Series","url":"bmw-528i-e39-story.html","category":"Stories","topics":["BMW","Classics"],"date":"2026-10-12"},{"title":"2026 Honda CR-V Gas vs Hybrid: Run the Numbers","url":"honda-crv-first-test.html","category":"Analysis","topics":["Honda","Hybrid","SUV"],"date":"2026-07-31"},{"title":"2027 Electric Mercedes C-Class: What U.S. Buyers Know","url":"mercedes-c-class-ev.html","category":"News","topics":["Mercedes-Benz","EV"],"date":"2026-07-28"},{"title":"BMW 330i G20: Why the Model Year Matters","url":"bmw-330i-review.html","category":"Analysis","topics":["BMW"],"date":"2026-07-24"},{"title":"From Chiron to Tourbillon: Bugatti Changes Its Formula","url":"bugatti-chiron.html","category":"Analysis","topics":["Bugatti","Performance"],"date":"2026-07-21"},{"title":"Naturally Aspirated V12s: Three Different Ways Forward","url":"naturally-aspirated-v12-holdouts.html","category":"Analysis","topics":["Performance","Engineering"],"date":"2026-07-20"},{"title":"Used EV Prices: Look Beyond the Discount","url":"used-ev-prices-fell.html","category":"Guides","topics":["Ownership","EV"],"date":"2026-07-19"},{"title":"1934 Duesenberg Model J: What Restoration Must Preserve","url":"duesenberg-1934-restoration.html","category":"Stories","topics":["Duesenberg","Classics"],"date":"2026-07-15"},{"title":"DeLorean Before the Time Machine: The Company That Almost Wasn't","url":"delorean-before-time-machine.html","category":"Stories","topics":["DeLorean","Classics"],"date":"2026-07-12"},{"title":"Group B Rally: Innovation Outran the Rules","url":"group-b-rally-era.html","category":"Stories","topics":["Motorsport","Classics"],"date":"2026-07-10"},{"title":"1960s Car Dashboards: Design Beyond the Nostalgia","url":"1960s-dashboards-design.html","category":"Stories","topics":["Design","Classics"],"date":"2026-07-08"},{"title":"Tucker 48: The Car, the Company and the Myth","url":"tucker-car-too-honest-detroit.html","category":"Stories","topics":["Tucker","Classics"],"date":"2026-07-05"},{"title":"Classic Car Auction Prices: What the Hammer Leaves Out","url":"classic-car-auction-hammer-price.html","category":"Guides","topics":["Classics","Ownership"],"date":"2026-07-03"},{"title":"VIN Decoder","url":"vin-decoder.html","category":"Tools","topics":["Calculator","Ownership"],"date":""},{"title":"Tire Size Calculator","url":"tire-size-calculator.html","category":"Tools","topics":["Calculator","Ownership"],"date":""},{"title":"Fuel Cost Calculator","url":"fuel-cost-calculator.html","category":"Tools","topics":["Calculator","Ownership"],"date":""},{"title":"Auto Loan Calculator","url":"loan-calculator.html","category":"Tools","topics":["Calculator","Ownership"],"date":""},{"title":"Car Depreciation Calculator","url":"depreciation-calculator.html","category":"Tools","topics":["Calculator","Ownership"],"date":""},{"title":"EV Charging Cost Calculator","url":"ev-charging-calculator.html","category":"Tools","topics":["Calculator","Ownership"],"date":""},{"title":"Car CO2 Emissions Calculator","url":"co2-calculator.html","category":"Tools","topics":["Calculator","Ownership"],"date":""},{"title":"News","url":"news.html","category":"Section","topics":[],"date":""},{"title":"Analysis","url":"test-drives.html","category":"Section","topics":[],"date":""},{"title":"Guides","url":"guides.html","category":"Section","topics":[],"date":""},{"title":"Stories","url":"stories.html","category":"Section","topics":[],"date":""},{"title":"Tools","url":"tools.html","category":"Section","topics":[],"date":""},{"title":"All Articles","url":"all-articles.html","category":"Archive","topics":[],"date":""}];

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
      var q = normalizeSearch(query);
      var matches = ARTICLES.map(function(a) {
        var title = normalizeSearch(a.title), body = normalizeSearch(a.title + ' ' + a.category + ' ' + (a.topics || []).join(' '));
        var tokens = q.split(' ').filter(Boolean);
        var matched = tokens.every(function(t) { return body.indexOf(t) !== -1 || body.replace(/ /g, '').indexOf(t) !== -1; });
        return {article:a, score:!matched ? -1 : title === q ? 100 : title.indexOf(q) === 0 ? 80 : title.indexOf(q) !== -1 ? 60 : 20};
      }).filter(function(x) { return x.score >= 0; }).sort(function(a,b) { return b.score-a.score || (b.article.date || '').localeCompare(a.article.date || ''); }).map(function(x) { return x.article; });
      status.textContent = matches.length ? matches.length + ' results' : 'No matches. Try a different word.';
      results.replaceChildren();
      matches.forEach(function (article) {
        var a = document.createElement('a');
        a.href = article.url;
        var label = document.createElement('small'); label.textContent = article.category; a.appendChild(label); var title = document.createElement('span'); title.textContent = article.title; a.appendChild(title);
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





function normalizeSearch(value) {
 return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
}
document.addEventListener('DOMContentLoaded', function() {
 var form=document.querySelector('.archive-filters'); if(!form)return;
 var section=document.getElementById('archive-section'), topic=document.getElementById('archive-topic');
 var params=new URLSearchParams(location.search);
 if(Array.from(topic.options).some(function(o){return o.value===params.get('topic');}))topic.value=params.get('topic');
 if(Array.from(section.options).some(function(o){return o.value===params.get('section');}))section.value=params.get('section');
 function filter(){
  var count=0; document.querySelectorAll('.article-grid .card').forEach(function(card){
   var show=(!section.value || card.dataset.category===section.value)&&(!topic.value || card.dataset.topics.split('|').includes(topic.value));
   card.hidden=!show; if(show)count++;
  });
  document.getElementById('archive-status').textContent=count+' article'+(count===1?'':'s');
  document.querySelector('.archive-empty').hidden=count!==0;
  var p=new URLSearchParams();if(section.value)p.set('section',section.value);if(topic.value)p.set('topic',topic.value);
  history.replaceState(null,'',location.pathname+(p.toString()?'?'+p:''));
 }
 form.addEventListener('change',filter);form.addEventListener('submit',function(e){e.preventDefault();filter();});
 form.addEventListener('reset',function(){setTimeout(filter,0);});filter();
});

