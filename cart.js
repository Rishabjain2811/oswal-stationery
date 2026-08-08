// Cart page — uses global cart store only. No local cart state.
(function () {
  var store = window.OswalCartStore;
  if (!store) return;

  // Helper functions for quantity with unit suffix
  function formatQty(qty, unit) {
    var suffix = unit === 'pieces' ? ' PCS' : ' CTN';
    return qty + suffix;
  }

  function parseQty(value) {
    if (typeof value === 'string') {
      value = value.replace('Ctn', '').replace('PCS', '').replace(/\s/g, '');
    }
    var qty = parseInt(value, 10);
    if (isNaN(qty) || qty < 0) return 0;
    return qty;
  }

  function updateCartQuantity(productId, unit, change) {
    var cart = store.getCart();
    var item = cart.find(function (i) { return i.id === productId; });
    if (item) {
      if (unit === 'carton') {
        var newCartonQty = (item.cartonQty || 0) + change;
        if (newCartonQty < 0) newCartonQty = 0;
        item.cartonQty = newCartonQty;
      } else if (unit === 'pieces') {
        var newPiecesQty = (item.piecesQty || 0) + change;
        if (newPiecesQty < 0) newPiecesQty = 0;
        item.piecesQty = newPiecesQty;
      }

      // Update total quantity
      item.quantity = (item.cartonQty || 0) + (item.piecesQty || 0);

      // Remove item if both quantities are 0
      if (item.cartonQty === 0 && item.piecesQty === 0) {
        removeFromCart(productId);
      } else {
        store.setCart(cart);
        renderCart();
      }
    }
  }

  // Long press functionality for quantity buttons
  var longPressTimers = {};
  var longPressIntervals = {};

  function setupLongPress(btn) {
    var productId = btn.getAttribute('data-id');
    var unit = btn.getAttribute('data-unit');
    var action = btn.getAttribute('data-action');
    // Cartons increment by 1, pieces increment by 100
    var change = action === 'increase' ? (unit === 'carton' ? 1 : 100) : (unit === 'carton' ? -1 : -100);

    function startLongPress() {
      // Initial delay before rapid increment/decrement
      longPressTimers[productId + '-' + unit + '-' + action] = setTimeout(function () {
        // Start rapid increment/decrement every 100ms
        longPressIntervals[productId + '-' + unit + '-' + action] = setInterval(function () {
          updateCartQuantity(productId, unit, change);
        }, 100);
      }, 500);
    }

    function clearLongPress() {
      clearTimeout(longPressTimers[productId + '-' + unit + '-' + action]);
      clearInterval(longPressIntervals[productId + '-' + unit + '-' + action]);
    }

    btn.addEventListener('mousedown', startLongPress);
    btn.addEventListener('touchstart', function (e) {
      e.preventDefault();
      startLongPress();
    });

    btn.addEventListener('mouseup', clearLongPress);
    btn.addEventListener('mouseleave', clearLongPress);
    btn.addEventListener('touchend', clearLongPress);
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
      var cartonQty = item.cartonQty || 0;
      var piecesQty = item.piecesQty || 0;
      var imageHtml = item.image ? '<img src="' + item.image + '" alt="' + (item.name || 'Product') + '" class="cart-item-image" />' : 
        '<div class="cart-item-placeholder"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg></div>';
      
      var quantityControls = [];
      
      // Carton quantity control
      quantityControls.push(
        '<div class="quantity-control-group">' +
        '<span class="quantity-label">Cartons:</span>' +
        '<div class="quantity-group">' +
        '<button class="quantity-btn cart-qty-btn" data-action="decrease" data-id="' + item.id + '" data-unit="carton">−</button>' +
        '<input type="text" class="quantity-input cart-qty-input" min="0" value="' + cartonQty + '" data-id="' + item.id + '" data-unit="carton" readonly />' +
        '<button class="quantity-btn cart-qty-btn" data-action="increase" data-id="' + item.id + '" data-unit="carton">+</button>' +
        '</div>' +
        '</div>'
      );
      
      // Pieces quantity control
      quantityControls.push(
        '<div class="quantity-control-group">' +
        '<span class="quantity-label">Pieces:</span>' +
        '<div class="quantity-group">' +
        '<button class="quantity-btn cart-qty-btn" data-action="decrease" data-id="' + item.id + '" data-unit="pieces">−</button>' +
        '<input type="text" class="quantity-input cart-qty-input" min="0" value="' + piecesQty + '" data-id="' + item.id + '" data-unit="pieces" readonly />' +
        '<button class="quantity-btn cart-qty-btn" data-action="increase" data-id="' + item.id + '" data-unit="pieces">+</button>' +
        '</div>' +
        '</div>'
      );
      
      return '<div class="cart-item" data-id="' + item.id + '">' +
        '<div class="cart-item-image-wrapper">' + imageHtml + '</div>' +
        '<div class="cart-item-details">' +
        '<h4 class="cart-item-name">' + (item.name || 'Product') + '</h4>' +
        '</div>' +
        '<div class="cart-item-quantity">' +
        quantityControls.join('') +
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
      var totalCartons = cart.reduce(function (sum, item) {
        return sum + (item.cartonQty || 0);
      }, 0);
      
      var totalPieces = cart.reduce(function (sum, item) {
        return sum + (item.piecesQty || 0);
      }, 0);
      
      var summaryText = [];
      if (totalCartons > 0) {
        summaryText.push(formatQty(totalCartons, 'carton'));
      }
      if (totalPieces > 0) {
        summaryText.push(formatQty(totalPieces, 'pieces'));
      }
      
      summaryQuantity.textContent = summaryText.length > 0 ? summaryText.join(', ') : '0';
    }

    // Remove item buttons
    cartItems.querySelectorAll('.remove-item-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(this.getAttribute('data-id'));
      });
    });

    // Quantity control buttons
    cartItems.querySelectorAll('.cart-qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var productId = this.getAttribute('data-id');
        var unit = this.getAttribute('data-unit');
        var action = this.getAttribute('data-action');
        // Cartons increment by 1, pieces increment by 100
        var change = action === 'increase' ? (unit === 'carton' ? 1 : 100) : (unit === 'carton' ? -1 : -100);
        updateCartQuantity(productId, unit, change);
      });

      // Setup long press functionality
      setupLongPress(btn);
    });
  }

  function sendWhatsApp() {
    var cart = store.getCart();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    var message = "Hello! I'm interested in the following products from OSWAL GIFT N STATIONERY:\n\n" + cart.map(function (item) {
      var qtyText = [];
      if (item.cartonQty > 0) {
        qtyText.push(item.cartonQty + ' CTN');
      }
      if (item.piecesQty > 0) {
        qtyText.push(item.piecesQty + ' PCS');
      }
      var quantityStr = qtyText.length > 0 ? qtyText.join(', ') : '0';
      return '• ' + item.name + ' (Item Code: ' + item.id + ') - Quantity: ' + quantityStr;
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
