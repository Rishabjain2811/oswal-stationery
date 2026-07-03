// Cart page — uses global cart store only. No local cart state.
(function () {
  var store = window.OswalCartStore;
  if (!store) return;

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
      return '<div class="cart-item"><div class="cart-item-info"><h4>' + (item.name || 'Product') + '</h4><p>Quantity: ' + qty + '</p><p class="cart-item-category">Category: ' + (item.category || 'General') + '</p></div><button class="remove-btn" data-id="' + item.id + '">Remove</button></div>';
    }).join('');
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
      return '• ' + item.name + ' - Quantity: ' + (item.quantity || item.qty || 1);
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
