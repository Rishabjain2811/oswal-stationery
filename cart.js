// Cart page — uses global cart store only. No local cart state.
(function () {
  var store = window.OswalCartStore;
  if (!store) return;

  // Helper functions for quantity with Ctn suffix
  function formatQty(qty) {
    return qty + ' Ctn';
  }

  function parseQty(value) {
    if (typeof value === 'string') {
      value = value.replace('Ctn', '').replace(/\s/g, '');
    }
    var qty = parseInt(value, 10);
    if (isNaN(qty) || qty < 0) return 0;
    return qty;
  }

  function updateCartQuantity(productId, newQty) {
    var cart = store.getCart();
    var item = cart.find(function (i) { return i.id === productId; });
    if (item) {
      if (newQty < 1) {
        removeFromCart(productId);
      } else {
        item.quantity = newQty;
        store.setCart(cart);
        renderCart();
      }
    }
  }

  function removeFromCart(productId) {
    store.removeItem(productId);
    renderCart();
  }

  function renderCart() {
    var cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    var cart = store.getCart();
    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart"><p>🛒 Your cart is empty</p><p>Add some products to get started!</p><a href="index.html#featured" class="cta-btn">Browse Products</a></div>';
      return;
    }
    cartItems.innerHTML = cart.map(function (item) {
      var qty = item.quantity != null ? item.quantity : (item.qty || 1);
      var imageHtml = item.image ? '<img src="' + item.image + '" alt="' + (item.name || 'Product') + '" class="cart-item-image" />' : '';
      return '<div class="cart-item" data-id="' + item.id + '">' +
        '<div class="cart-item-image-wrapper">' + imageHtml + '</div>' +
        '<div class="cart-item-info">' +
        '<h4>' + (item.name || 'Product') + '</h4>' +
        '<p class="cart-item-category">Category: ' + (item.category || 'General') + '</p>' +
        '</div>' +
        '<div class="cart-item-quantity">' +
        '<div class="quantity-group">' +
        '<button class="quantity-btn cart-qty-btn" data-action="decrease" data-id="' + item.id + '">-</button>' +
        '<input type="text" class="quantity-input cart-qty-input" min="1" value="' + formatQty(qty) + '" data-id="' + item.id + '" />' +
        '<button class="quantity-btn cart-qty-btn" data-action="increase" data-id="' + item.id + '">+</button>' +
        '</div>' +
        '</div>' +
        '<button class="remove-btn" data-id="' + item.id + '">Remove</button>' +
        '</div>';
    }).join('');

    // Wire up quantity controls
    cartItems.querySelectorAll('.cart-qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = this.getAttribute('data-id');
        var action = this.getAttribute('data-action');
        var input = cartItems.querySelector('.cart-qty-input[data-id="' + id + '"]');
        var val = parseQty(input.value);
        if (action === 'increase') {
          val++;
        } else if (action === 'decrease' && val > 1) {
          val--;
        }
        input.value = formatQty(val);
        updateCartQuantity(id, val);
      });
    });

    cartItems.querySelectorAll('.cart-qty-input').forEach(function (input) {
      input.addEventListener('input', function () {
        var val = parseQty(this.value);
        this.value = formatQty(val);
      });
      input.addEventListener('blur', function () {
        var id = this.getAttribute('data-id');
        var val = parseQty(this.value);
        if (val < 1) val = 1;
        this.value = formatQty(val);
        updateCartQuantity(id, val);
      });
    });

    cartItems.querySelectorAll('.remove-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(this.getAttribute('data-id'));
      });
    });
  }

  function sendWhatsApp() {
    var cart = store.getCart();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    var message = "Hello! I'm interested in the following products from OSWAL GIFT N STATIONERY:\n\n" + cart.map(function (item) {
      return '• ' + item.name + ' - Quantity: ' + (item.quantity || item.qty || 1) + ' Ctn';
    }).join('\n') + "\n\nPlease provide pricing and availability.";
    window.open('https://wa.me/919841137922?text=' + encodeURIComponent(message), '_blank');
  }

  window.removeFromCart = removeFromCart;

  window.addEventListener(store.EVENT_NAME, renderCart);

  document.addEventListener('DOMContentLoaded', function () {
    var sendWhatsAppBtn = document.getElementById('send-whatsapp');
    if (sendWhatsAppBtn) sendWhatsAppBtn.addEventListener('click', sendWhatsApp);
    renderCart();
    var currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });
  });

  function revealOnScroll() {
    document.querySelectorAll('section').forEach(function (section) {
      var sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight * 0.8) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);
})();
