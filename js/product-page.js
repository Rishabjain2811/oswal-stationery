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

  function getStaticUrlParams() {
    var pathname = global.location.pathname;
    var filename = pathname.split('/').pop();
    if (filename && filename.startsWith('product-') && filename.endsWith('.html')) {
      return filename;
    }
    return null;
  }

  function getStaticUrlParamsFromPath() {
    var pathname = global.location.pathname;
    // Handle both /product-CL10.html and /folder/product-CL10.html
    var match = pathname.match(/\/product-[^\/]+\.html$/);
    if (match) {
      return match[0].substring(1); // Remove leading /
    }
    return null;
  }

  function findEntryByStaticUrl(staticUrl) {
    if (!staticUrl || !global.OswalProductRegistry) return null;
    
    // Try findByStaticUrl first
    if (global.OswalProductRegistry.findByStaticUrl) {
      var entry = global.OswalProductRegistry.findByStaticUrl(staticUrl);
      if (entry) return entry;
    }
    
    // Manual fallback
    if (global.OswalProductRegistry.entries) {
      for (var i = 0; i < global.OswalProductRegistry.entries.length; i++) {
        if (global.OswalProductRegistry.entries[i].staticUrl === staticUrl) {
          return global.OswalProductRegistry.entries[i];
        }
      }
    }
    return null;
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

  function injectProductSchema(product, category, canonicalUrl) {
    var schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name || 'Product',
      "description": product.desc || product.description || '',
      "category": category,
      "url": canonicalUrl,
      "manufacturer": {
        "@type": "Organization",
        "name": "OSWAL Gift N Stationery",
        "url": "https://oswalgiftnstationery.co.in"
      },
      "brand": {
        "@type": "Brand",
        "name": "COLORS"
      }
    };
    
    if (product.image) {
      schema.image = 'https://oswalgiftnstationery.co.in/' + product.image;
    }
    
    if (product.specs && product.specs.itemCode && product.specs.itemCode.length > 0) {
      schema.sku = product.specs.itemCode[0];
    }
    
    var additionalProperties = [];
    if (product.specs) {
      if (product.specs.size && product.specs.size.length > 0) {
        additionalProperties.push({
          "@type": "PropertyValue",
          "name": "Size",
          "value": product.specs.size.join(', ')
        });
      }
      if (product.specs.thickness && product.specs.thickness.length > 0) {
        additionalProperties.push({
          "@type": "PropertyValue",
          "name": "Thickness",
          "value": product.specs.thickness.join(', ')
        });
      }
      if (product.specs.colours && product.specs.colours.length > 0) {
        additionalProperties.push({
          "@type": "PropertyValue",
          "name": "Color",
          "value": product.specs.colours.join(', ')
        });
      }
      if (product.specs.packing && product.specs.packing.length > 0) {
        additionalProperties.push({
          "@type": "PropertyValue",
          "name": "Packing",
          "value": product.specs.packing.join(', ')
        });
      }
    }
    
    if (additionalProperties.length > 0) {
      schema.additionalProperty = additionalProperties;
    }
    
    var schemaScript = document.getElementById('dynamic-product-schema');
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(schema);
    }
  }

  function renderProduct(entry, selectedCode) {
    var root = document.getElementById('product-detail-root');
    var product = entry.product;
    var category = entry.category;
    var page = entry.page;
    var variants = global.OswalProductVariants;
    var id = product.id;

    var productName = product.name || 'Product';
    var productTitle = productName + ' | COLORS ' + category + ' | OSWAL GIFT N STATIONERY';
    document.title = productTitle;

    var productDesc = product.desc || 'Premium ' + productName + ' from COLORS by OSWAL GIFT N STATIONERY. High-quality office stationery for professional use.';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', productDesc + ' View specifications, colors, sizes, and ordering options.');
    }

    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', productTitle);
    }

    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', productDesc);
    }

    var twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', productTitle);
    }

    var twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', productDesc);
    }

    var canonicalUrl = 'https://oswalgiftnstationery.co.in/' + page + '?id=' + id;
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }

    var ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    injectProductSchema(product, category, canonicalUrl);

    var primaryImage = product.image || '';
    var ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && primaryImage) {
      ogImage.setAttribute('content', 'https://oswalgiftnstationery.co.in/' + primaryImage);
    }

    var twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage && primaryImage) {
      twitterImage.setAttribute('content', 'https://oswalgiftnstationery.co.in/' + primaryImage);
    }

    var images = Array.isArray(product.images) && product.images.length
      ? product.images
      : (product.image ? [product.image] : []);
    var primaryImageSrc = images[0] || '';
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
      (primaryImageSrc
        ? '<img src="' + escapeHtml(primaryImageSrc) + '" alt="' + escapeHtml(productName) +
          '" class="product-detail-image" id="product-detail-image" />'
        : '') +
      '<span class="product-detail-zoom-hint">Click image to zoom</span>' +
      '</div>' +
      (thumbs ? '<div class="product-detail-thumbs">' + thumbs + '</div>' : '') +
      '</div>' +
      '<div class="product-detail-info">' +
      '<p class="product-detail-category">COLORS ' + escapeHtml(category) + '</p>' +
      '<h1 class="product-detail-title">' + escapeHtml(productName) + '</h1>' +
      desc + longDesc +
      specTable +
      '<div class="product-detail-options">' + codePicker + colourPicker + '</div>' +
      '<div class="product-detail-actions">' +
      '<div class="unit-segmented-control">' +
      '<button class="segmented-tab" data-unit="carton" class="active">Cartons</button>' +
      '<button class="segmented-tab" data-unit="pieces">Pieces</button>' +
      '</div>' +
      '<div class="quantity-group" id="carton-quantity-group">' +
      '<button class="quantity-btn" data-action="decrease" data-unit="carton">-</button>' +
      '<input type="text" class="quantity-input" id="carton-input" value="1" placeholder="1" />' +
      '<span class="quantity-unit">CTN</span>' +
      '<button class="quantity-btn" data-action="increase" data-unit="carton">+</button>' +
      '</div>' +
      '<div class="quantity-group" id="pieces-quantity-group" style="display: none;">' +
      '<button class="quantity-btn" data-action="decrease" data-unit="pieces">-</button>' +
      '<input type="text" class="quantity-input" id="pieces-input" value="100" placeholder="100" />' +
      '<span class="quantity-unit">PCS</span>' +
      '<button class="quantity-btn" data-action="increase" data-unit="pieces">+</button>' +
      '</div>' +
      '<button class="cta-btn add-to-cart-detail" data-id="' + id + '">Add to Cart</button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</section>';

    var codeSelect = root.querySelector('.item-code-select:not(.colour-select)');
    var colourSelect = root.querySelector('.colour-select');
    var mixColoursContainer = root.querySelector('.mix-colours-container');
    var allowPieces = product.allowPieces !== false; // Default to true if not specified
    var currentUnit = 'carton';
    
    // Handle Pieces tab visibility based on allowPieces
    var piecesTab = root.querySelector('.segmented-tab[data-unit="pieces"]');
    if (!allowPieces && piecesTab) {
      piecesTab.style.display = 'none';
    }
    
    // Handle segmented control tab switching
    var segmentedTabs = root.querySelectorAll('.segmented-tab');
    segmentedTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var unit = this.dataset.unit;
        currentUnit = unit;
        
        // Update active tab styling
        segmentedTabs.forEach(function (t) {
          t.classList.remove('active');
        });
        this.classList.add('active');
        
        // Show/hide quantity groups
        var cartonGroup = root.querySelector('#carton-quantity-group');
        var piecesGroup = root.querySelector('#pieces-quantity-group');
        
        if (unit === 'carton') {
          cartonGroup.style.display = 'flex';
          piecesGroup.style.display = 'none';
        } else {
          cartonGroup.style.display = 'none';
          piecesGroup.style.display = 'flex';
        }
      });
    });
    
    // Set initial active state
    var cartonTab = root.querySelector('.segmented-tab[data-unit="carton"]');
    if (cartonTab) {
      cartonTab.classList.add('active');
    }
    
    // Handle quantity button clicks
    var quantityBtns = root.querySelectorAll('.quantity-btn[data-action]');
    quantityBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = this.dataset.action;
        var unit = this.dataset.unit;
        var inputId = unit === 'carton' ? 'carton-input' : 'pieces-input';
        var input = root.querySelector('#' + inputId);
        if (!input) return;
        
        var currentValue = parseInt(input.value) || 0;
        var newValue = currentValue;
        
        if (unit === 'carton') {
          // Cartons: min 1, +/- 1
          if (action === 'increase') {
            newValue = currentValue + 1;
          } else if (action === 'decrease' && currentValue > 1) {
            newValue = currentValue - 1;
          }
        } else {
          // Pieces: min 100, +/- 100
          if (action === 'increase') {
            newValue = currentValue + 100;
          } else if (action === 'decrease' && currentValue > 100) {
            newValue = currentValue - 100;
          }
        }
        
        input.value = newValue;
      });
    });
    
    // Handle Mix Colours dropdown change
    if (colourSelect && mixColoursContainer) {
      colourSelect.addEventListener('change', function () {
        if (this.value === 'mix') {
          mixColoursContainer.style.display = 'block';
        } else {
          mixColoursContainer.style.display = 'none';
        }
      });
    }
    
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

    // Don't use wireQuantityInput for product detail page - we handle quantity differently
    // with the segmented control and custom unit handling

    root.querySelector('.add-to-cart-detail').addEventListener('click', function () {
      if (!global.OswalCategoryPage) return;
      
      var selectedColour = colourSelect ? colourSelect.value : null;
      
      // Handle Mix Colours selection
      if (selectedColour === 'mix' && mixColoursContainer) {
        var checkedBoxes = mixColoursContainer.querySelectorAll('.mix-colour-checkbox:checked');
        if (checkedBoxes.length === 0) {
          alert('Please select at least one colour for your mix.');
          return;
        }
        var mixedColours = Array.prototype.slice.call(checkedBoxes).map(function (box) {
          return box.value;
        });
        selectedColour = 'Mix: ' + mixedColours.join(', ');
      }
      
      // Get quantity and unit
      var cartonInput = root.querySelector('#carton-input');
      var piecesInput = root.querySelector('#pieces-input');
      var quantity, unit;
      
      if (currentUnit === 'carton') {
        quantity = cartonInput ? parseInt(cartonInput.value) : 1;
        unit = 'carton';
      } else {
        quantity = piecesInput ? parseInt(piecesInput.value) : 100;
        unit = 'pieces';
      }
      
      var ok = global.OswalCategoryPage.addItem(
        product,
        quantity,
        category,
        codeSelect ? codeSelect.value : null,
        selectedColour,
        unit
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
        openLightbox(mainImage.src, productName);
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
    
    if (!root) {
      return;
    }
    
    if (!global.OswalProductRegistry) {
      setTimeout(init, 100);
      return;
    }

    var entry = null;
    var code = '';

    // Try static URL first
    var staticUrl = getStaticUrlParams();
    
    if (!staticUrl) {
      staticUrl = getStaticUrlParamsFromPath();
    }
    
    if (staticUrl) {
      entry = findEntryByStaticUrl(staticUrl);
    }

    // Fall back to query parameters
    if (!entry) {
      var params = getParams();
      if (params.page && params.id) {
        entry = global.OswalProductRegistry.find(params.page, params.id);
        code = params.code;
      }
    }

    if (!entry) {
      renderNotFound(root); 
      return;
    }
    renderProduct(entry, code);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : this);
