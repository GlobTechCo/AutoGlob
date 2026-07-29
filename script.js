// AutoGlob — shared site script

var ARTICLES = [
  { title: "The BMW 330i Doesn't Need an M Badge to Be Good", url: "bmw-330i-review.html", keywords: "bmw 330i g20 3 series test drive review" },
  { title: "The Chiron Era Is Over. Its Hybrid V16 Successor Doesn't Share a Single Part With It.", url: "bugatti-chiron.html", keywords: "bugatti chiron tourbillon hypercar w16 v16" },
  { title: "Inside the Restoration of a 1934 Duesenberg", url: "duesenberg-1934-restoration.html", keywords: "duesenberg classic restoration 1934" },
  { title: "VIN Decoder", url: "vin-decoder.html", keywords: "vin decode lookup nhtsa" },
  { title: "Tire Size Calculator", url: "tire-size-calculator.html", keywords: "tire wheel size offset calculator" },
  { title: "Fuel Cost Calculator", url: "fuel-cost-calculator.html", keywords: "fuel gas cost trip calculator" },
  { title: "Car Loan Calculator", url: "loan-calculator.html", keywords: "loan payment finance calculator" },
  { title: "Depreciation Calculator", url: "depreciation-calculator.html", keywords: "depreciation resale value calculator" },
  { title: "EV Charging Cost Calculator", url: "ev-charging-calculator.html", keywords: "ev electric charging cost calculator" },
  { title: "CO2 Emissions Calculator", url: "co2-calculator.html", keywords: "co2 emissions calculator environment" }
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
    overlay.style.cssText = 'position:fixed;inset:0;z-index:200;background:rgba(8,22,37,0.92);' +
      'display:none;align-items:flex-start;justify-content:center;padding:80px 20px;';
    overlay.innerHTML =
      '<div style="width:100%;max-width:560px;">' +
      '  <div style="display:flex;gap:10px;align-items:center;margin-bottom:16px;">' +
      '    <input id="siteSearchInput" type="text" placeholder="Search articles and tools..." autocomplete="off" ' +
      '      style="flex:1;background:#0e1117;border:1px solid rgba(245,247,250,0.15);color:#f5f7fa;padding:12px 14px;border-radius:2px;font-family:Montserrat,sans-serif;font-size:15px;">' +
      '    <button id="siteSearchClose" aria-label="Close search" style="background:none;border:none;color:#f5f7fa;font-size:22px;cursor:pointer;padding:4px 10px;">&times;</button>' +
      '  </div>' +
      '  <div id="siteSearchResults" style="display:flex;flex-direction:column;gap:2px;"></div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector('#siteSearchInput');
    var results = overlay.querySelector('#siteSearchResults');
    var closeBtn = overlay.querySelector('#siteSearchClose');

    function openSearch() {
      overlay.style.display = 'flex';
      input.value = '';
      renderResults('');
      setTimeout(function () { input.focus(); }, 50);
    }
    function closeSearch() {
      overlay.style.display = 'none';
    }
    function renderResults(query) {
      var q = query.trim().toLowerCase();
      var matches = q === '' ? ARTICLES : ARTICLES.filter(function (a) {
        var haystack = (a.title + ' ' + (a.keywords || '')).toLowerCase();
        return haystack.indexOf(q) !== -1;
      });
      if (matches.length === 0) {
        results.innerHTML = '<p style="color:#64707d;font-family:Montserrat,sans-serif;font-size:14px;padding:12px 4px;">No matches. Try a different word.</p>';
        return;
      }
      results.innerHTML = matches.map(function (a) {
        return '<a href="' + a.url + '" style="display:block;padding:12px 14px;color:#f5f7fa;font-family:Montserrat,sans-serif;font-size:14.5px;' +
          'border-bottom:1px solid rgba(245,247,250,0.08);text-decoration:none;">' + a.title + '</a>';
      }).join('');
    }

    searchBtn.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(); });
    input.addEventListener('input', function () { renderResults(input.value); });
  }

  // ---- Newsletter form feedback (no backend attached — cosmetic confirmation only) ----
  var newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = newsletterForm.querySelector('input[type="email"]');
      var btn = newsletterForm.querySelector('button');
      if (emailInput && emailInput.value) {
        btn.textContent = "Thanks — you're on the list!";
        btn.disabled = true;
        emailInput.disabled = true;
      }
    });
  }

  // Simple cookie consent banner
  var CONSENT_KEY = 'autoglob_cookie_consent';
  if (!localStorage.getItem(CONSENT_KEY)) {
    var banner = document.createElement('div');
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:100;' +
      'background:#0e1117;border:1px solid rgba(245,247,250,0.1);border-radius:3px;padding:16px 18px;' +
      'display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:space-between;' +
      'max-width:920px;margin:0 auto;font-family:Montserrat,sans-serif;color:#f5f7fa;font-size:13.5px;';
    banner.innerHTML =
      '<span style="max-width:56ch;color:#64707d;">We use cookies for site functionality, analytics and advertising. See our ' +
      '<a href="cookies.html" style="color:#12d6d0;">Cookie Policy</a>.</span>' +
      '<span style="display:flex;gap:10px;flex-shrink:0;">' +
      '<button id="cookieDecline" style="background:none;border:1px solid rgba(245,247,250,0.15);color:#64707d;padding:9px 14px;border-radius:2px;font-size:13px;cursor:pointer;">Decline</button>' +
      '<button id="cookieAccept" style="background:#12d6d0;border:none;color:#081625;font-weight:700;padding:9px 14px;border-radius:2px;font-size:13px;cursor:pointer;">Accept</button>' +
      '</span>';
    document.body.appendChild(banner);

    document.getElementById('cookieAccept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      banner.remove();
    });
    document.getElementById('cookieDecline').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'declined');
      banner.remove();
    });
  }
});
