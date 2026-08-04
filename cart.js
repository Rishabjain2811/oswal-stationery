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
    var cartItem = document.querySelector('.cart-item[data-id="' + productId + '"]');
    if (cartItem) {
      cartItem.style.opacity = '0';
      cartItem.style.transform = 'translateY(-20px)';
      setTimeout(function () {
        store.removeItem(productId);
        renderCart();
      }, 300);
    } else {
      store.removeItem(productId);
      renderCart();
    }
  }

  function clearAllCart() {
    store.clearCart();
    renderCart();
  }

  function renderCart() {
    var cartItems = document.getElementById('cart-items');
    var cartSummary = document.getElementById('cart-summary');
    var clearCartBtn = document.getElementById('clear-cart');
    if (!cartItems) return;
    var cart = store.getCart();

    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart">' +
        '<div class="empty-cart-illustration">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="9" cy="21" r="1"></circle>' +
        '<circle cx="20" cy="21" r="1"></circle>' +
        '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>' +
        '</svg>' +
        '</div>' +
        '<h3>Your Cart is Empty</h3>' +
        '<p>Add some premium stationery to get started!</p>' +
        '<a href="index.html#featured" class="cta-btn primary-btn">Browse Products</a>' +
        '</div>';
      if (cartSummary) cartSummary.style.display = 'none';
      if (clearCartBtn) clearCartBtn.style.display = 'none';
      return;
    }

    if (cartSummary) cartSummary.style.display = 'block';
    if (clearCartBtn) clearCartBtn.style.display = 'flex';

    cartItems.innerHTML = cart.map(function (item) {
      var qty = item.quantity != null ? item.quantity : (item.qty || 1);
      var imageHtml = item.image ? '<img src="' + item.image + '" alt="' + (item.name || 'Product') + '" class="cart-item-image" />' : 
        '<div class="cart-item-placeholder"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg></div>';
      return '<div class="cart-item" data-id="' + item.id + '">' +
        '<div class="cart-item-image-wrapper">' + imageHtml + '</div>' +
        '<div class="cart-item-details">' +
        '<h4 class="cart-item-name">' + (item.name || 'Product') + '</h4>' +
        '</div>' +
        '<div class="cart-item-quantity">' +
        '<div class="quantity-group">' +
        '<button class="quantity-btn cart-qty-btn" data-action="decrease" data-id="' + item.id + '">−</button>' +
        '<input type="text" class="quantity-input cart-qty-input" min="1" value="' + formatQty(qty) + '" data-id="' + item.id + '" />' +
        '<button class="quantity-btn cart-qty-btn" data-action="increase" data-id="' + item.id + '">+</button>' +
        '</div>' +
        '</div>' +
        '<button class="remove-item-btn" data-id="' + item.id + '">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<line x1="18" y1="6" x2="6" y2="18"></line>' +
        '<line x1="6" y1="6" x2="18" y2="18"></line>' +
        '</svg>' +
        '</button>' +
        '</div>';
    }).join('');

    // Update summary
    var summaryProducts = document.getElementById('summary-products');
    var summaryQuantity = document.getElementById('summary-quantity');
    if (summaryProducts) summaryProducts.textContent = cart.length;
    if (summaryQuantity) {
      var totalQty = cart.reduce(function (sum, item) {
        return sum + (item.quantity || item.qty || 1);
      }, 0);
      summaryQuantity.textContent = formatQty(totalQty);
    }

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

    cartItems.querySelectorAll('.remove-item-btn').forEach(function (btn) {
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
      return '• ' + item.name + ' (Item Code: ' + item.id + ') - Quantity: ' + (item.quantity || item.qty || 1) + ' Ctn';
    }).join('\n') + "\n\nPlease provide pricing and availability.";
    window.open('https://wa.me/919841137922?text=' + encodeURIComponent(message), '_blank');
  }

  window.removeFromCart = removeFromCart;
  window.clearAllCart = clearAllCart;

  window.addEventListener(store.EVENT_NAME, renderCart);

  document.addEventListener('DOMContentLoaded', function () {
    var sendWhatsAppBtn = document.getElementById('send-whatsapp');
    if (sendWhatsAppBtn) sendWhatsAppBtn.addEventListener('click', sendWhatsApp);

    // Clear cart modal
    var clearCartBtn = document.getElementById('clear-cart');
    var clearCartModal = document.getElementById('clear-cart-modal');
    var cancelClearBtn = document.getElementById('cancel-clear');
    var confirmClearBtn = document.getElementById('confirm-clear');

    if (clearCartBtn && clearCartModal) {
      clearCartBtn.addEventListener('click', function () {
        var cart = store.getCart();
        if (cart.length === 0) {
          alert('Your cart is already empty!');
          return;
        }
        clearCartModal.style.display = 'flex';
        clearCartModal.style.opacity = '0';
        setTimeout(function () {
          clearCartModal.style.opacity = '1';
        }, 10);
      });
    }

    if (cancelClearBtn && clearCartModal) {
      cancelClearBtn.addEventListener('click', function () {
        clearCartModal.style.opacity = '0';
        setTimeout(function () {
          clearCartModal.style.display = 'none';
        }, 300);
      });
    }

    if (confirmClearBtn && clearCartModal) {
      confirmClearBtn.addEventListener('click', function () {
        clearCartModal.style.opacity = '0';
        setTimeout(function () {
          clearCartModal.style.display = 'none';
          clearAllCart();
        }, 300);
      });
    }

    // Close modal on overlay click
    if (clearCartModal) {
      clearCartModal.addEventListener('click', function (e) {
        if (e.target === clearCartModal) {
          clearCartModal.style.opacity = '0';
          setTimeout(function () {
            clearCartModal.style.display = 'none';
          }, 300);
        }
      });
    }
 
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
