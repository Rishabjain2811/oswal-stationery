(function (global) {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getParams() {
    var params = new URLSearchParams(global.location.search);
    return {
      page: params.get('page') || '',
      id: parseInt(params.get('id'), 10),
      code: params.get('code') || ''
    };
  }

  function renderNotFound(root) {
    root.innerHTML =
      '<section class="product-detail-empty">' +
      '<h1>Product not found</h1>' +
      '<p>We could not find that product. Try searching from the navigation bar.</p>' +
      '<a href="index.html#products" class="cta-btn">Browse categories</a>' +
      '</section>';
  }

  function openLightbox(src, alt) {
    var box = document.getElementById('image-lightbox');
    var img = document.getElementById('lightbox-image');
    if (!box || !img) return;
    img.src = src;
    img.alt = alt || '';
    box.hidden = false;
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    var box = document.getElementById('image-lightbox');
    if (!box) return;
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
  }

  function wireLightbox() {
    var closeBtn = document.getElementById('lightbox-close');
    var box = document.getElementById('image-lightbox');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (box) {
      box.addEventListener('click', function (event) {
        if (event.target === box) closeLightbox();
      });
    }
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeLightbox();
    });
  }

  function renderProduct(entry, selectedCode) {
    var root = document.getElementById('product-detail-root');
    var product = entry.product;
    var category = entry.category;
    var page = entry.page;
    var variants = global.OswalProductVariants;
    var id = product.id;

    document.title = (product.name || 'Product') + ' | OSWAL GIFT N STATIONERY';

    var images = Array.isArray(product.images) && product.images.length
      ? product.images
      : (product.image ? [product.image] : []);
    var primaryImage = images[0] || '';
    var thumbs = images.length > 1
      ? images.map(function (src, index) {
        return '<button type="button" class="product-detail-thumb' + (index === 0 ? ' active' : '') +
          '" data-src="' + escapeHtml(src) + '"><img src="' + escapeHtml(src) + '" alt="" /></button>';
      }).join('')
      : '';

    var desc = product.desc ? '<p class="product-detail-desc">' + escapeHtml(product.desc) + '</p>' : '';
    var longDesc = product.description
      ? '<div class="product-detail-long-desc">' + escapeHtml(product.description) + '</div>'
      : '';

    var codePicker = variants ? variants.renderCodePicker(product, 'detail-' + id, 'data-id="' + id + '"') : '';
    var colourPicker = variants ? variants.renderColourPicker(product, 'detail-' + id, 'data-id="' + id + '"') : '';
    var specTable = variants ? variants.renderSpecTable(product) : '';

    root.innerHTML =
      '<section class="product-detail">' +
      '<a href="' + escapeHtml(page) + '" class="product-detail-back">← Back to ' + escapeHtml(category) + '</a>' +
      '<div class="product-detail-layout">' +
      '<div class="product-detail-gallery">' +
      '<div class="product-detail-image-stage" id="product-image-stage">' +
      (primaryImage
        ? '<img src="' + escapeHtml(primaryImage) + '" alt="' + escapeHtml(product.name) +
          '" class="product-detail-image" id="product-detail-image" />'
        : '') +
      '<span class="product-detail-zoom-hint">Click image to zoom</span>' +
      '</div>' +
      (thumbs ? '<div class="product-detail-thumbs">' + thumbs + '</div>' : '') +
      '</div>' +
      '<div class="product-detail-info">' +
      '<p class="product-detail-category">' + escapeHtml(category) + '</p>' +
      '<h1 class="product-detail-title">' + escapeHtml(product.name) + '</h1>' +
      desc + longDesc +
      specTable +
      '<div class="product-detail-options">' + codePicker + colourPicker + '</div>' +
      '<div class="product-detail-actions">' +
      '<div class="quantity-group">' +
      '<button class="quantity-btn" data-action="decrease" data-id="' + id + '">-</button>' +
      '<input type="text" class="quantity-input" min="0" value="1 Ctn" data-id="' + id + '" />' +
      '<button class="quantity-btn" data-action="increase" data-id="' + id + '">+</button>' +
      '</div>' +
      '<button class="cta-btn add-to-cart-detail" data-id="' + id + '">Add to Cart</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</section>';

    var codeSelect = root.querySelector('.item-code-select:not(.colour-select)');
    var colourSelect = root.querySelector('.colour-select');
    if (selectedCode && codeSelect) {
      Array.prototype.slice.call(codeSelect.options).forEach(function (option) {
        if (global.OswalSearchIndex && global.OswalSearchIndex.normalizeQuery(option.value) ===
            global.OswalSearchIndex.normalizeQuery(selectedCode)) {
          codeSelect.value = option.value;
        }
      });
    }
    if (codeSelect && colourSelect && variants) {
      variants.syncColourToCode(product, codeSelect, colourSelect);
      codeSelect.addEventListener('change', function () {
        variants.syncColourToCode(product, codeSelect, colourSelect);
      });
    }

    var input = root.querySelector('.quantity-input');
    if (global.OswalCategoryPage) global.OswalCategoryPage.wireQuantityInput(input);

    root.querySelector('.add-to-cart-detail').addEventListener('click', function () {
      if (!global.OswalCategoryPage) return;
      var ok = global.OswalCategoryPage.addItem(
        product,
        input.value,
        category,
        codeSelect ? codeSelect.value : null,
        colourSelect ? colourSelect.value : null
      );
      if (ok) {
        var btn = root.querySelector('.add-to-cart-detail');
        var original = btn.textContent;
        btn.textContent = 'Added to cart ✓';
        global.setTimeout(function () { btn.textContent = original; }, 1600);
      }
    });

    var mainImage = document.getElementById('product-detail-image');
    if (mainImage) {
      mainImage.addEventListener('click', function () {
        openLightbox(mainImage.src, product.name);
      });
    }

    root.querySelectorAll('.product-detail-thumb').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        root.querySelectorAll('.product-detail-thumb').forEach(function (el) {
          el.classList.remove('active');
        });
        thumb.classList.add('active');
        if (mainImage) mainImage.src = thumb.dataset.src;
      });
    });
  }

  function init() {
    wireLightbox();
    var root = document.getElementById('product-detail-root');
    var params = getParams();
    if (!root || !global.OswalProductRegistry || !params.page || !params.id) {
      if (root) renderNotFound(root);
      return;
    }

    var entry = global.OswalProductRegistry.find(params.page, params.id);
    if (!entry) {
      renderNotFound(root);
      return;
    }
    renderProduct(entry, params.code);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : this);
