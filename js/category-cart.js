// Category page cart helpers (avoids conflict with script.js addToCart).
(function (global) {
  function normalizeQty(value) {
    var qty = parseInt(value, 10);
    if (isNaN(qty) || qty < 0) return 0;
    return qty;
  }

  function wireQuantityInput(input) {
    if (!input) return;
    var group = input.closest('.quantity-group');
    if (!group) return;
    var decreaseBtn = group.querySelector('[data-action="decrease"]');
    var increaseBtn = group.querySelector('[data-action="increase"]');

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', function () {
        var val = normalizeQty(input.value);
        if (val > 0) val--;
        input.value = val;
      });
    }
    if (increaseBtn) {
      increaseBtn.addEventListener('click', function () {
        input.value = normalizeQty(input.value) + 1;
      });
    }
    input.addEventListener('input', function () {
      input.value = normalizeQty(input.value);
    });
  }

  function addItem(product, qty, category, selectedCode, selectedColour) {
    var amount = normalizeQty(qty);
    if (!global.OswalCartStore) return false;
    if (amount < 1) {
      alert('Please select a quantity greater than 0.');
      return false;
    }
    var variants = global.OswalProductVariants;
    var line = variants && product.specs
      ? variants.buildCartVariant(product, selectedCode, selectedColour)
      : { id: String(product.id), name: product.name };
    global.OswalCartStore.addItem({
      id: line.id,
      name: line.name,
      quantity: amount,
      category: category,
    });
    return true;
  }

  function renderDescriptionBox(product) {
    var variants = global.OswalProductVariants;
    if (variants && variants.renderDescriptionBox) {
      return variants.renderDescriptionBox(product);
    }
    var text = product && product.description ? String(product.description).trim() : '';
    if (!text) return '';
    return '<div class="product-description-box">' +
      '<p class="product-description-text">' + text + '</p>' +
      '</div>';
  }

  function renderProductImage(product, variants) {
    if (variants && variants.renderProductImages) {
      return variants.renderProductImages(product);
    }
    if (!product.image) return '';
    return '<img src="' + product.image + '" alt="' + product.name + '" class="product-image ' + (product.imageClass || '') + '" />';
  }

  function productDetailUrl(page, productId, code) {
    if (global.OswalProductRegistry && global.OswalProductRegistry.buildUrl) {
      return global.OswalProductRegistry.buildUrl(page, productId, code);
    }
    var url = 'product.html?page=' + encodeURIComponent(page) + '&id=' + encodeURIComponent(productId);
    if (code) url += '&code=' + encodeURIComponent(code);
    return url;
  }

  function renderProductCards(options) {
    var container = document.getElementById(options.containerId);
    if (!container) return;
    var products = options.products || [];
    var category = options.category || '';
    var page = options.page || global.location.pathname.split('/').pop() || '';
    var variants = global.OswalProductVariants;

    container.innerHTML = products.map(function (product) {
      var id = product.id;
      var dataAttrs = 'data-id="' + id + '"';
      var detailUrl = productDetailUrl(page, id);
      var imageHtml = renderProductImage(product, variants);
      var linkedImage = imageHtml
        ? '<a href="' + detailUrl + '" class="product-image-link">' + imageHtml + '</a>'
        : '';
      return '<div class="product-card" id="product-' + id + '">' +
        linkedImage +
        '<a href="' + detailUrl + '" class="product-title product-title-link">' + product.name + '</a>' +
        renderDescriptionBox(product) +
        (variants ? variants.renderSpecTable(product) : '') +
        (variants ? variants.renderCodePicker(product, 'item-' + id, dataAttrs) : '') +
        (variants ? variants.renderColourPicker(product, 'item-' + id, dataAttrs) : '') +
        '<div class="quantity-group">' +
        '<button class="quantity-btn" data-action="decrease" data-id="' + id + '">-</button>' +
        '<input type="number" class="quantity-input" min="0" value="0" data-id="' + id + '" />' +
        '<button class="quantity-btn" data-action="increase" data-id="' + id + '">+</button>' +
        '</div>' +
        '<div class="product-card-actions">' +
        '<a href="' + detailUrl + '" class="view-details-btn">View Details</a>' +
        '<button class="add-to-cart" data-id="' + id + '">Add to Cart</button>' +
        '</div>' +
        '</div>';
    }).join('');

    products.forEach(function (product) {
      var id = product.id;
      var input = container.querySelector('.quantity-input[data-id="' + id + '"]');
      var codePicker = container.querySelector('.item-code-select:not(.colour-select)[data-id="' + id + '"]');
      var colourPicker = container.querySelector('.colour-select[data-id="' + id + '"]');

      if (codePicker && colourPicker && variants) {
        variants.syncColourToCode(product, codePicker, colourPicker);
        codePicker.addEventListener('change', function () {
          variants.syncColourToCode(product, codePicker, colourPicker);
        });
      }

      wireQuantityInput(input);
      var addBtn = container.querySelector('.add-to-cart[data-id="' + id + '"]');
      if (addBtn) {
        addBtn.addEventListener('click', function () {
          addItem(
            product,
            input.value,
            category,
            codePicker ? codePicker.value : null,
            colourPicker ? colourPicker.value : null
          );
        });
      }
    });

    if (global.OswalNavSearch && global.OswalNavSearch.applyDeepLink) {
      global.OswalNavSearch.applyDeepLink();
    }
  }

  global.OswalCategoryPage = {
    normalizeQty: normalizeQty,
    wireQuantityInput: wireQuantityInput,
    addItem: addItem,
    renderDescriptionBox: renderDescriptionBox,
    renderProductCards: renderProductCards,
    productDetailUrl: productDetailUrl
  };
})(typeof window !== 'undefined' ? window : this);
