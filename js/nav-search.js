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

  function buildResultUrl(entry) {
    if (global.OswalProductRegistry && global.OswalProductRegistry.buildUrl) {
      return global.OswalProductRegistry.buildUrl(entry.page, entry.productId, entry.matchedCode);
    }
    var url = 'product.html?page=' + encodeURIComponent(entry.page) + '&id=' + entry.productId;
    if (entry.matchedCode) url += '&code=' + encodeURIComponent(entry.matchedCode);
    return url;
  }

  function injectSearchBar() {
    var navLinks = document.querySelector('.navbar .nav-links');
    if (!navLinks || document.getElementById('nav-product-search')) return;

    var item = document.createElement('li');
    item.className = 'nav-search-item';
    item.innerHTML =
      '<form class="nav-search-form" id="nav-product-search" role="search" autocomplete="off">' +
      '<label class="nav-search-label" for="nav-search-input">Search products</label>' +
      '<input type="search" id="nav-search-input" class="nav-search-input" placeholder="Search code or name" aria-label="Search products by code or name" />' +
      '<button type="submit" class="nav-search-btn" aria-label="Search">Search</button>' +
      '<div class="nav-search-results" id="nav-search-results" hidden></div>' +
      '</form>';
    var cartItem = navLinks.querySelector('.cart-link');
    var insertBefore = cartItem ? cartItem.closest('li') : null;
    navLinks.insertBefore(item, insertBefore);
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

    function runSearch() {
      var matches = global.OswalSearchIndex.search(input.value, 8);
      renderMobileResults(matches, results);
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
      var button = event.target.closest('.mobile-search-result');
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
    injectSearchBar();
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
