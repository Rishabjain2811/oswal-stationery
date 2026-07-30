// Shared helpers for item-code and colour selection on product cards.
(function (global) {
  function getColourOptions(product) {
    var specs = product.specs;
    if (!specs) return [];
    if (Array.isArray(specs.colours) && specs.colours.length) return specs.colours;
    if (Array.isArray(specs.colour)) {
      return specs.colour.filter(function (c, i, arr) { return arr.indexOf(c) === i; });
    }
    if (specs.colour) return [specs.colour];
    return [];
  }

  function colourAtIndex(product, index) {
    var specs = product.specs;
    if (!specs) return '';
    if (Array.isArray(specs.colour)) return specs.colour[index] || specs.colour[0] || '';
    return specs.colour || '';
  }

  function shouldShowColourPicker(product) {
    return getColourOptions(product).length > 0;
  }

  function getDefaultColour(product, codeIndex) {
    var options = getColourOptions(product);
    if (!options.length) return '';
    if (Array.isArray(product.specs.colour) && !product.specs.colours) {
      return colourAtIndex(product, codeIndex >= 0 ? codeIndex : 0) || options[0];
    }
    return options[0];
  }

  function buildCartVariant(product, selectedCode, selectedColour) {
    var hasCodes = product.specs && Array.isArray(product.specs.itemCode) && product.specs.itemCode.length > 0;
    var hasColours = shouldShowColourPicker(product);
    var code = hasCodes ? (selectedCode || product.specs.itemCode[0]) : null;
    var colour = hasColours ? (selectedColour || getDefaultColour(product, 0)) : null;
    var id = String(product.id);
    var name = product.name;
    if (code) {
      id += '::' + code;
      name += ' - ' + code;
    }
    if (colour) {
      id += '::' + colour;
      name += ' (' + colour + ')';
    }
    return { id: id, name: name };
  }

  function renderDescriptionBox(product) {
    var text = product && product.description ? String(product.description).trim() : '';
    if (!text) return '';
    return '<div class="product-description-box">' +
      '<p class="product-description-text">' + text + '</p>' +
      '</div>';
  }

  function renderColourSwatches(product) {
    var colours = getColourOptions(product);
    if (!colours.length) return '';
    return '<div class="product-spec-colour"><span>Colour :</span> ' +
      colours.map(function (colour) {
        return '<span class="colour-label">' + colour + '</span>';
      }).join(', ') +
      '</div>';
  }

  function renderSpecTable(product) {
    if (!product.specs) return '';
    var rows = product.specs.itemCode.map(function (_, index) {
      return '<tr>' +
        '<td>' + product.specs.itemCode[index] + '</td>' +
        '<td>' + product.specs.size[index] + '</td>' +
        '<td>' + product.specs.thickness[index] + '</td>' +
        '<td>' + product.specs.packing[index] + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="product-spec-card">' +
      '<div class="product-spec-table-wrap">' +
      '<table class="product-spec-table">' +
      '<thead><tr>' +
      '<th>Item Code</th><th>Size</th><th>Specs</th><th>Packing (Pcs.)</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table>' +
      '</div>' +
      renderColourSwatches(product) +
      '</div>';
  }

  function renderCodePicker(product, fieldId, dataAttrs) {
    if (!product.specs || !Array.isArray(product.specs.itemCode) || !product.specs.itemCode.length) return '';
    dataAttrs = dataAttrs || '';
    return '<label class="item-code-label" for="' + fieldId + '-code">Select Item Code</label>' +
      '<select id="' + fieldId + '-code" class="item-code-select" ' + dataAttrs + '>' +
      product.specs.itemCode.map(function (code) {
        return '<option value="' + code + '">' + code + '</option>';
      }).join('') +
      '</select>';
  }

  function renderColourPicker(product, fieldId, dataAttrs) {
    if (!shouldShowColourPicker(product)) return '';
    var options = getColourOptions(product);
    dataAttrs = dataAttrs || '';
    var defaultColour = getDefaultColour(product, 0);
    return '<label class="item-code-label" for="' + fieldId + '-colour">Select Colour</label>' +
      '<select id="' + fieldId + '-colour" class="item-code-select colour-select" ' + dataAttrs + '>' +
      options.map(function (colour) {
        var selected = colour === defaultColour ? ' selected' : '';
        return '<option value="' + colour + '"' + selected + '>' + colour + '</option>';
      }).join('') +
      '</select>';
  }

  function syncColourToCode(product, codeSelect, colourSelect) {
    if (!product.specs || !codeSelect || !colourSelect) return;
    if (product.specs.colours) return;
    if (!Array.isArray(product.specs.colour)) return;
    var idx = product.specs.itemCode.indexOf(codeSelect.value);
    if (idx < 0) idx = 0;
    colourSelect.value = colourAtIndex(product, idx);
  }

  function renderProductImages(product) {
    var imageClass = product.imageClass || '';
    var images = Array.isArray(product.images) && product.images.length
      ? product.images
      : (product.image ? [product.image] : []);
    if (!images.length) return '';
    var altText = product.name + ' - ' + (product.desc || product.description || 'Premium office stationery from OSWAL Gift N Stationery Chennai');
    if (images.length === 1) {
      return '<img src="' + images[0] + '" alt="' + altText + '" class="product-image ' + imageClass + '" loading="lazy" />';
    }
    return '<div class="product-image-row">' + images.map(function (src, index) {
      return '<img src="' + src + '" alt="' + altText + ' - Image ' + (index + 1) + '" class="product-image ' + imageClass + '" loading="lazy" />';
    }).join('') + '</div>';
  }

  global.OswalProductVariants = {
    getColourOptions: getColourOptions,
    colourAtIndex: colourAtIndex,
    shouldShowColourPicker: shouldShowColourPicker,
    getDefaultColour: getDefaultColour,
    buildCartVariant: buildCartVariant,
    renderSpecTable: renderSpecTable,
    renderCodePicker: renderCodePicker,
    renderColourPicker: renderColourPicker,
    syncColourToCode: syncColourToCode,
    renderProductImages: renderProductImages,
    renderDescriptionBox: renderDescriptionBox
  };
})(typeof window !== 'undefined' ? window : this);
