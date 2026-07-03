(function (global) {
  var API_BASE = global.OSWAL_API_BASE || '/api/auth';
  var currentUser = null;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function api(path, options) {
    return fetch(API_BASE + path, Object.assign({
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    }, options || {})).then(function (response) {
      return response.text().then(function (text) {
        var data = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch (parseError) {
          var err = new Error('Invalid JSON response from server');
          err.status = response.status;
          err.responseText = text;
          throw err;
        }

        if (!response.ok) {
          var err = new Error((data && data.error) ? data.error : 'Request failed');
          err.status = response.status;
          err.responseBody = data || text;
          throw err;
        }
        return data;
      });
    });
  }

  function renderAuthNav() {
    var navLinks = document.querySelector('.navbar .nav-links');
    if (!navLinks || document.getElementById('nav-auth-item')) return;

    var item = document.createElement('li');
    item.className = 'nav-auth-item';
    item.id = 'nav-auth-item';
    var cartItem = navLinks.querySelector('.cart-link');
    var insertBefore = cartItem ? cartItem.closest('li') : null;
    navLinks.insertBefore(item, insertBefore);
    updateAuthNav();
  }

  function updateAuthNav() {
    var item = document.getElementById('nav-auth-item');
    if (!item) return;

    if (currentUser) {
      item.innerHTML =
        '<span class="nav-auth-greeting">Hi, ' + escapeHtml(currentUser.name.split(' ')[0]) + '</span>' +
        '<button type="button" class="nav-auth-btn nav-auth-btn-ghost" id="nav-sign-out">Sign out</button>';
      var signOut = document.getElementById('nav-sign-out');
      if (signOut) {
        signOut.addEventListener('click', function () {
          api('/logout', { method: 'POST' }).finally(function () {
            currentUser = null;
            updateAuthNav();
          });
        });
      }
      return;
    }

    item.innerHTML =
      '<button type="button" class="nav-auth-btn nav-auth-btn-ghost" id="nav-sign-in">Sign in</button>' +
      '<button type="button" class="nav-auth-btn" id="nav-register">Register</button>';
    document.getElementById('nav-sign-in').addEventListener('click', function () {
      openAuthModal('login');
    });
    document.getElementById('nav-register').addEventListener('click', function () {
      openAuthModal('register');
    });
  }

  function ensureModal() {
    if (document.getElementById('auth-modal')) return;
    var modal = document.createElement('div');
    modal.id = 'auth-modal';
    modal.className = 'auth-modal';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="auth-modal-backdrop" data-close="true"></div>' +
      '<div class="auth-modal-panel" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">' +
      '<button type="button" class="auth-modal-close" data-close="true" aria-label="Close">&times;</button>' +
      '<div class="auth-modal-tabs">' +
      '<button type="button" class="auth-tab active" data-tab="login">Sign in</button>' +
      '<button type="button" class="auth-tab" data-tab="register">Register</button>' +
      '</div>' +
      '<h2 id="auth-modal-title" class="auth-modal-title">Sign in to your account</h2>' +
      '<p class="auth-modal-subtitle">Optional — browse and order without an account anytime.</p>' +
      '<form id="auth-form" class="auth-form" novalidate>' +
      '<div class="form-group auth-name-group" hidden>' +
      '<label for="auth-name">Full name</label>' +
      '<input type="text" id="auth-name" name="name" autocomplete="name" />' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="auth-email">Email</label>' +
      '<input type="email" id="auth-email" name="email" required autocomplete="email" />' +
      '</div>' +
      '<div class="form-group">' +
      '<label for="auth-password">Password</label>' +
      '<input type="password" id="auth-password" name="password" required minlength="6" autocomplete="current-password" />' +
      '</div>' +
      '<p class="auth-error" id="auth-error" hidden></p>' +
      '<button type="submit" class="cta-btn auth-submit" id="auth-submit">Sign in</button>' +
      '</form>' +
      '</div>';
    document.body.appendChild(modal);

    modal.querySelectorAll('[data-close="true"]').forEach(function (el) {
      el.addEventListener('click', closeAuthModal);
    });
    modal.querySelectorAll('.auth-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        openAuthModal(tab.dataset.tab);
      });
    });
    document.getElementById('auth-form').addEventListener('submit', handleAuthSubmit);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeAuthModal();
    });
  }

  var activeTab = 'login';

  function openAuthModal(tab) {
    ensureModal();
    activeTab = tab === 'register' ? 'register' : 'login';
    var modal = document.getElementById('auth-modal');
    var title = document.getElementById('auth-modal-title');
    var submit = document.getElementById('auth-submit');
    var nameGroup = document.querySelector('.auth-name-group');
    var error = document.getElementById('auth-error');
    var passwordInput = document.getElementById('auth-password');

    modal.hidden = false;
    document.body.classList.add('auth-modal-open');
    error.hidden = true;
    error.textContent = '';

    modal.querySelectorAll('.auth-tab').forEach(function (el) {
      el.classList.toggle('active', el.dataset.tab === activeTab);
    });

    if (activeTab === 'register') {
      title.textContent = 'Create an account';
      submit.textContent = 'Register';
      nameGroup.hidden = false;
      passwordInput.autocomplete = 'new-password';
    } else {
      title.textContent = 'Sign in to your account';
      submit.textContent = 'Sign in';
      nameGroup.hidden = true;
      passwordInput.autocomplete = 'current-password';
    }
  }

  function closeAuthModal() {
    var modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('auth-modal-open');
  }

  function handleAuthSubmit(event) {
    event.preventDefault();
    var error = document.getElementById('auth-error');
    var submit = document.getElementById('auth-submit');
    var email = document.getElementById('auth-email').value.trim();
    var password = document.getElementById('auth-password').value;
    var name = document.getElementById('auth-name').value.trim();
    var payload = { email: email, password: password };
    var path = activeTab === 'register' ? '/register' : '/login';

    if (activeTab === 'register') payload.name = name;

    submit.disabled = true;
    error.hidden = true;

    api(path, { method: 'POST', body: JSON.stringify(payload) })
      .then(function (data) {
        currentUser = data.user;
        updateAuthNav();
        closeAuthModal();
      })
      .catch(function (err) {
        error.textContent = err.message || 'Something went wrong.';
        error.hidden = false;
      })
      .finally(function () {
        submit.disabled = false;
      });
  }

  function loadSession() {
    return api('/me').then(function (data) {
      currentUser = data.user || null;
      updateAuthNav();
    }).catch(function () {
      currentUser = null;
      updateAuthNav();
    });
  }

  function init() {
    renderAuthNav();
    loadSession();
  }

  global.OswalAuth = {
    getUser: function () { return currentUser; },
    openLogin: function () { openAuthModal('login'); },
    openRegister: function () { openAuthModal('register'); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : this);
