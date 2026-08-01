/**
 * Cart badge — updates #cart-count from the global cart store.
 * Subscribe to store events and refresh on load/pageshow so the navbar
 * always shows the correct count (including when navigating to Home).
 */
(function (global) {
  var store = global.OswalCartStore;
  if (!store) return;

  function updateBadge() {
    var desktopEl = document.getElementById('cart-count');
    var mobileCartBar = document.getElementById('mobile-cart-bar');
    var mobileCountEl = document.getElementById('mobile-cart-count');
    var total = store.getTotalCount();
    
    if (desktopEl) desktopEl.textContent = total;
    if (mobileCountEl) mobileCountEl.textContent = total;
    
    // Show/hide mobile cart bar based on cart count
    if (mobileCartBar) {
      if (total > 0) {
        mobileCartBar.classList.add('active');
      } else {
        mobileCartBar.classList.remove('active');
      }
    }
  }

  function wireBrandHomeLink() {
    var logoWrap = document.querySelector('.nav-logo');
    var brand = document.querySelector('.nav-logo .brand');
    if (!logoWrap && !brand) return;

    // Check if logo is already wrapped in an anchor tag
    if (logoWrap && logoWrap.querySelector('a')) {
      return; // Skip adding click handler if logo is already linked
    }

    function goHome() {
      global.location.href = 'index.html';
    }

    if (logoWrap) {
      logoWrap.style.cursor = 'pointer';
      logoWrap.setAttribute('title', 'Go to Home');
      logoWrap.addEventListener('click', goHome);
    }

    if (brand) {
      brand.style.cursor = 'pointer';
      brand.setAttribute('title', 'Go to Home');
      brand.addEventListener('click', goHome);
    }
  }

  function animateBadge() {
    var el = document.getElementById('cart-count');
    var icon = document.querySelector('.cart-icon');
    if (el) {
      el.style.transform = 'scale(1.3)';
      setTimeout(function () {
        el.style.transform = 'scale(1)';
      }, 200);
    }
    if (icon) {
      icon.classList.add('animated');
      setTimeout(function () {
        icon.classList.remove('animated');
      }, 400);
    }
  }

  global.addEventListener(store.EVENT_NAME, function () {
    updateBadge();
    animateBadge(); 
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      updateBadge();
      wireBrandHomeLink();
    });
  } else {
    updateBadge();
    wireBrandHomeLink();
  }
  global.addEventListener('pageshow', updateBadge);
  global.addEventListener('load', updateBadge);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') updateBadge();
  });
})(typeof window !== 'undefined' ? window : this);
 
