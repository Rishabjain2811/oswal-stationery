(function (global) {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getQueryParam(name) {
    return new URLSearchParams(global.location.search).get(name);
  }

  function wireNavigationToggle() {
    document.addEventListener('click', function (event) {
      var target = event.target;
      var toggle = target && target.closest ? target.closest('.navbar .nav-toggle') : null;
      var navbar = toggle ? toggle.closest('.navbar') : null;

      if (toggle && navbar) {
        event.preventDefault();
        event.stopImmediatePropagation();
        var isOpen = navbar.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        return;
      }

      document.querySelectorAll('.navbar.nav-open').forEach(function (openNavbar) {
        if (openNavbar.contains(target)) return;
        openNavbar.classList.remove('nav-open');
        var openToggle = openNavbar.querySelector('.nav-toggle');
        if (openToggle) openToggle.setAttribute('aria-expanded', 'false');
        openNavbar.querySelectorAll('.dropdown-open').forEach(function (dropdown) {
          dropdown.classList.remove('dropdown-open');
        });
      });
    }, true);
  }

  function buildResultUrl(entry) {
    if (global.OswalProductRegistry && global.OswalProductRegistry.buildStaticUrl) {
      var staticUrl = global.OswalProductRegistry.buildStaticUrl(entry.page, entry.productId);
      if (staticUrl) return staticUrl;
    }
    if (global.OswalProductRegistry && global.OswalProductRegistry.buildUrl) {
      return global.OswalProductRegistry.buildUrl(entry.page, entry.productId, entry.matchedCode);
    }
    var url = 'product.html?page=' + encodeURIComponent(entry.page) + '&id=' + entry.productId;
    if (entry.matchedCode) url += '&code=' + encodeURIComponent(entry.matchedCode);
    return url;
  }

  function standardizeNav() {
    var navbar = document.querySelector('.navbar');
    var navLogo = navbar && navbar.querySelector('.nav-logo');
    if (!navbar || !navLogo || navbar.classList.contains('home-hero-nav')) return;

    var navLinks = navbar.querySelector('.nav-links');
    var hadNavLinks = !!navLinks;
    if (!navLinks) {
      navLinks = document.createElement('ul');
      navLinks.className = 'nav-links';
    }
    var navToggle = navbar.querySelector('.nav-toggle');
    var existingCartCount = navbar.querySelector('#cart-count');
    var cartCount = existingCartCount ? existingCartCount.textContent : '0';
    navbar.appendChild(navLinks);
    navLogo.innerHTML =
      '<a class="standard-nav-brand" href="index.html">' +
      '<img src="colors%20logo.jpg" alt="OSWAL Logo" class="logo-img default-nav-logo" width="120" height="40" loading="lazy">' +
      '<img src="colors%20logo.jpg" alt="COLORS Logo" class="logo-img mobile-nav-logo" width="120" height="40" loading="lazy">' +
      '<span class="brand">OSWAL &nbsp; G I FT &nbsp;  \'N\' &nbsp; STATI O N E RY</span>' +
      '</a>';

    if (!navToggle) {
      navToggle = document.createElement('button');
      navToggle.className = 'nav-toggle';
      navToggle.type = 'button';
      navToggle.setAttribute('aria-label', 'Toggle navigation menu');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-controls', 'primary-navigation');
      navToggle.innerHTML = '<span></span><span></span><span></span>';
      navToggle.addEventListener('click', function () {
        var isOpen = navbar.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
      });
    }
    navbar.insertBefore(navToggle, navLinks);
    navLinks.id = 'primary-navigation';
    navLinks.innerHTML =
      '<li><a href="index.html#home">Home</a></li>' +
      '<li class="dropdown"><a href="index.html#products" class="dropdown-toggle">Products</a>' +
      '<ul class="dropdown-menu">' +
      '<li><a href="report-cover-files.html">Report Cover Files</a></li>' +
      '<li><a href="sheet-protectors.html">Sheet Protectors</a></li>' +
      '<li><a href="clip-files.html">Clip Files Series</a></li>' +
      '<li><a href="clear-books.html">Clear Books Series</a></li>' +
      '<li><a href="card-holders.html">Visiting Card Holders Series</a></li>' +
      '<li><a href="button-files.html">Button Bags Series</a></li>' +
      '<li><a href="zipper-bag-series.html">Zipper Bag Series</a></li>' +
      '<li><a href="document-bags.html">Documents Bag / Expanding Files Series</a></li>' +
      '<li><a href="separators.html">Index/Seperators Series</a></li>' +
      '<li><a href="paper-board-files.html">Paper Board Files Series</a></li>' +
      '<li><a href="display-files.html">Display Solution Products Series</a></li>' +
      '<li><a href="leatherite-executive-bags.html">Leatherite Bags Series</a></li>' +
      '<li><a href="conference-folders.html">PP &amp; Leatherite Conference Files / Hotel Files</a></li>' +
      '<li><a href="stationery-products.html">Stationery Products</a></li>' +
      '</ul></li>' +
      '<li><a href="index.html#about">About</a></li>' +
      '<li><a href="links.html">Links</a></li>' +
      '<li class="dropdown"><a href="#" class="dropdown-toggle">Resources</a>' +
      '<ul class="dropdown-menu">' +
      '<li><a href="complete-guide-to-office-filing-systems.html">Office Filing Systems Guide</a></li>' +
      '<li><a href="buying-guide-report-cover-files.html">Report Cover Files Guide</a></li>' +
      '<li><a href="buying-guide-clear-books.html">Clear Books Guide</a></li>' +
      '<li><a href="comparison-report-cover-vs-clear-books.html">Product Comparison</a></li>' +
      '<li><a href="guide-office-document-organization.html">Document Organization Guide</a></li>' +
      '</ul></li>' +
      '<li><a href="cart.html" class="cart-link" aria-label="Shopping cart">' +
      '<svg class="cart-outline-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>' +
      '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>' +
      '</svg><span id="cart-count">0</span></a></li>';
    navLinks.querySelector('#cart-count').textContent = cartCount;

    navLinks.querySelectorAll('.dropdown').forEach(function (dropdown, index) {
      if (hadNavLinks && index === 0) return;
      var dropdownToggle = dropdown.querySelector('.dropdown-toggle');
      dropdownToggle.addEventListener('click', function (event) {
        if (global.innerWidth <= 768) {
          event.preventDefault();
          dropdown.classList.toggle('dropdown-open');
        }
      });
    });

    if (!document.querySelector('link[href*="Libre+Baskerville"]')) {
      var fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap';
      document.head.appendChild(fontLink);
    }
  }

  function injectSearchBar() {
    var navLinks = document.querySelector('.navbar .nav-links');
    if (!navLinks || document.getElementById('nav-product-search')) return;

    var item = document.createElement('li');
    item.className = 'nav-search-item';
    item.innerHTML =
      '<form class="nav-search-form" id="nav-product-search" role="search" autocomplete="off">' +
      '<label class="nav-search-label" for="nav-search-input">Search products</label>' +
      '<input type="search" id="nav-search-input" class="nav-search-input" placeholder="Search" aria-label="Search products by code or name" />' +
      '<button type="submit" class="nav-search-btn" aria-label="Search">' +
      '<svg class="nav-search-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="16" y1="16" x2="21" y2="21"></line></svg><span class="nav-search-button-label">Search</span>' +
      '</button>' +
      '<div class="nav-search-results" id="nav-search-results" hidden></div>' +
      '</form>';
    var cartItem = navLinks.querySelector('.cart-link');
    var insertBefore = cartItem ? cartItem.closest('li') : null;
    navLinks.insertBefore(item, insertBefore);
  }

  function positionMobileCart() {
    var navbar = document.querySelector('.navbar');
    var navLinks = navbar && navbar.querySelector('.nav-links');
    var cartItem = navLinks && navLinks.querySelector('.cart-link');
    cartItem = cartItem && cartItem.closest('li');
    if (!navbar || !navLinks || !cartItem) return;

    cartItem.classList.add('mobile-cart-nav-item');

    var mobileNav = global.matchMedia('(max-width: 768px)');
    function syncCartPosition() {
      if (mobileNav.matches) {
        if (cartItem.parentElement !== navbar) navbar.appendChild(cartItem);
      } else if (cartItem.parentElement !== navLinks) {
        navLinks.appendChild(cartItem);
      }
    }

    syncCartPosition();
    if (mobileNav.addEventListener) {
      mobileNav.addEventListener('change', syncCartPosition);
    } else {
      mobileNav.addListener(syncCartPosition);
    }
  }

  function injectMobileSearchBar() {
    if (document.getElementById('mobile-product-search')) return;

    var featuredSection = document.querySelector('.featured-section');
    if (!featuredSection) return;

    var mobileSearchSection = document.getElementById('mobile-search');
    if (!mobileSearchSection) return;

    var form = mobileSearchSection.querySelector('.mobile-search-form');
    if (!form) return;
  }

  function renderResults(results, container) {
    if (!results.length) {
      container.innerHTML = '<div class="nav-search-empty">No products found.</div>';
      container.hidden = false;
      return;
    }

    container.innerHTML = results.map(function (entry) {
      var codeLabel = entry.matchedCode || (entry.codes && entry.codes[0]) || '';
      return '<button type="button" class="nav-search-result" data-page="' + escapeHtml(entry.page) +
        '" data-code="' + escapeHtml(codeLabel) +
        '" data-product-id="' + entry.productId + '">' +
        '<span class="nav-search-result-code">' + escapeHtml(entry.productName) + '</span>' +
        '<span class="nav-search-result-meta">' +
        (codeLabel ? escapeHtml(codeLabel) + ' · ' : '') +
        escapeHtml(entry.category) +
        '</span>' +
        '</button>';
    }).join('');
    container.hidden = false;
  }

  function hideResults(container) {
    container.hidden = true;
    container.innerHTML = '';
  }

  function navigateToEntry(entry) {
    global.location.href = buildResultUrl(entry);
  }

  function wireSearchForm() {
    var form = document.getElementById('nav-product-search');
    var input = document.getElementById('nav-search-input');
    var results = document.getElementById('nav-search-results');
    if (!form || !input || !results || !global.OswalSearchIndex) return;

    function runSearch() {
      var matches = global.OswalSearchIndex.search(input.value, 8);
      renderResults(matches, results);
    }

    input.addEventListener('input', runSearch);
    input.addEventListener('focus', runSearch);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var matches = global.OswalSearchIndex.search(input.value, 1);
      if (matches.length) {
        navigateToEntry(matches[0]);
      } else {
        runSearch();
      }
    });

    results.addEventListener('click', function (event) {
      var button = event.target.closest('.nav-search-result');
      if (!button) return;
      global.location.href = buildResultUrl({
        page: button.dataset.page,
        productId: button.dataset.productId,
        matchedCode: button.dataset.code || ''
      });
    });

    document.addEventListener('click', function (event) {
      if (!form.contains(event.target)) hideResults(results);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') hideResults(results);
    });
  }

  function wireMobileSearchForm() {
    var form = document.getElementById('mobile-product-search');
    var input = document.getElementById('mobile-search-input');
    var results = document.getElementById('mobile-search-results');
    if (!form || !input || !results || !global.OswalSearchIndex) return;

    function positionHomeResults() {
      if (!form.closest('#home') || global.innerWidth > 768 || results.hidden) {
        results.classList.remove('mobile-search-results-overlay');
        return;
      }

      var bounds = form.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= global.innerHeight) {
        hideResults(results);
        results.classList.remove('mobile-search-results-overlay');
        return;
      }

      results.classList.add('mobile-search-results-overlay');
    }

    function runSearch() {
      var matches = global.OswalSearchIndex.search(input.value, 8);
      renderMobileResults(matches, results);
      positionHomeResults();
    }

    input.addEventListener('input', runSearch);
    input.addEventListener('focus', runSearch);
    global.addEventListener('resize', positionHomeResults);
    global.addEventListener('scroll', positionHomeResults, { passive: true });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var matches = global.OswalSearchIndex.search(input.value, 1);
      if (matches.length) {
        navigateToEntry(matches[0]);
      } else {
        runSearch();
      }
    });

    results.addEventListener('click', function (event) {
      var button = event.target.closest('.mobile-search-result');
      if (!button) return;
      global.location.href = buildResultUrl({
        page: button.dataset.page,
        productId: button.dataset.productId,
        matchedCode: button.dataset.code || ''
      });
    });

    document.addEventListener('click', function (event) {
      if (!form.contains(event.target) && !results.contains(event.target)) {
        hideResults(results);
        results.classList.remove('mobile-search-results-overlay');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        hideResults(results);
        results.classList.remove('mobile-search-results-overlay');
      }
    });
  }

  function renderMobileResults(results, container) {
    if (!results.length) {
      container.innerHTML = '<div class="mobile-search-empty">No products found.</div>';
      container.hidden = false;
      return;
    }

    container.innerHTML = results.map(function (entry) {
      var codeLabel = entry.matchedCode || (entry.codes && entry.codes[0]) || '';
      return '<button type="button" class="mobile-search-result" data-page="' + escapeHtml(entry.page) +
        '" data-code="' + escapeHtml(codeLabel) +
        '" data-product-id="' + entry.productId + '">' +
        '<span class="mobile-search-result-code">' + escapeHtml(entry.productName) + '</span>' +
        '<span class="mobile-search-result-meta">' +
        (codeLabel ? escapeHtml(codeLabel) + ' · ' : '') +
        escapeHtml(entry.category) +
        '</span>' +
        '</button>';
    }).join('');
    container.hidden = false;
  }

  function normalizeCode(value) {
    return global.OswalSearchIndex
      ? global.OswalSearchIndex.normalizeQuery(value)
      : String(value || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  }

  function highlightProductCard(card) {
    if (!card) return;
    card.classList.add('product-card-highlight');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    global.setTimeout(function () {
      card.classList.remove('product-card-highlight');
    }, 2600);
  }

  function applyDeepLink() {
    var code = getQueryParam('code');
    var hashMatch = global.location.hash.match(/^#product-(\d+)$/);
    if (!code && !hashMatch) return;

    var productId = hashMatch ? hashMatch[1] : null;
    var card = null;
    if (productId) {
      var addBtn = document.querySelector('.product-card .add-to-cart[data-id="' + productId + '"]');
      card = addBtn ? addBtn.closest('.product-card') : null;
    }

    if (!card && code) {
      var normalized = normalizeCode(code);
      document.querySelectorAll('.item-code-select:not(.colour-select)').forEach(function (select) {
        Array.prototype.slice.call(select.options).forEach(function (option) {
          if (normalizeCode(option.value) === normalized) {
            card = select.closest('.product-card');
          }
        });
      });
    }

    if (!card) return;

    highlightProductCard(card);

    if (code) {
      var codeSelect = card.querySelector('.item-code-select:not(.colour-select)');
      if (codeSelect) {
        var target = normalizeCode(code);
        Array.prototype.slice.call(codeSelect.options).forEach(function (option) {
          if (normalizeCode(option.value) === target) {
            codeSelect.value = option.value;
            codeSelect.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      }
    }
  }

  function init() {
    wireNavigationToggle();
    standardizeNav();
    injectSearchBar();
    positionMobileCart();
    wireSearchForm();
    injectMobileSearchBar();
    wireMobileSearchForm();
    applyDeepLink();
    global.setTimeout(applyDeepLink, 400);
  }

  global.OswalNavSearch = {
    init: init,
    applyDeepLink: applyDeepLink
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : this);
 
