/**
 * Cart store — single source of truth for cart state.
 * Persists to localStorage; dispatches 'oswal:cartUpdated' on every change.
 * All pages must use this store only. No duplicate cart state elsewhere.
 */
(function (global) {
  const STORAGE_KEY = 'oswal_cart';
  const EVENT_NAME = 'oswal:cartUpdated';

  function readFromStorage() {
    try {
      const raw = global.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function writeToStorage(cart) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Cart store: could not write to localStorage', e);
    }
  }

  function dispatchUpdate(cart) {
    const totalItems = cart.reduce(function (sum, item) {
      return sum + (item.quantity ?? item.qty ?? 1);
    }, 0);
    try {
      global.dispatchEvent(
        new CustomEvent(EVENT_NAME, {
          detail: { cart: cart, totalItems: totalItems },
        })
      );
    } catch (e) {
      console.warn('Cart store: could not dispatch event', e);
    }
  }

  function getCart() {
    return readFromStorage();
  }

  function setCart(cart) {
    var list = Array.isArray(cart) ? cart : [];
    writeToStorage(list);
    dispatchUpdate(list);
    return list;
  }

  /**
   * Add or merge item. Item shape: { id, name, quantity?, category?, image?, unit? }
   */
  function addItem(item) {
    var cart = readFromStorage();
    var id = item.id;
    var category = item.category || '';
    var qty = Math.max(1, Number(item.quantity) || Number(item.qty) || 1);
    var name = item.name || 'Product';
    var image = item.image || '';
    var unit = item.unit || 'carton';
    var existing = cart.find(function (i) {
      return i.id === id && (i.category || '') === category;
    });
    if (existing) {
      // Initialize quantities if not present
      if (!existing.cartonQty) existing.cartonQty = 0;
      if (!existing.piecesQty) existing.piecesQty = 0;
      
      // Add to the appropriate unit quantity
      if (unit === 'pieces') {
        existing.piecesQty += qty;
      } else {
        existing.cartonQty += qty;
      }
      
      // Update total quantity for backward compatibility
      existing.quantity = existing.cartonQty + existing.piecesQty;
      existing.unit = unit;
    } else {
      var newItem = {
        id: id,
        name: name,
        quantity: qty,
        category: category,
        image: image,
        unit: unit,
        cartonQty: unit === 'carton' ? qty : 0,
        piecesQty: unit === 'pieces' ? qty : 0
      };
      cart.push(newItem);
    }
    return setCart(cart);
  }

  function removeItem(productId) {
    var targetId = String(productId);
    var cart = readFromStorage().filter(function (i) {
      return String(i.id) !== targetId;
    });
    return setCart(cart);
  }

  function clearCart() {
    return setCart([]);
  }

  function getTotalCount() { 
    return getCart().reduce(function (sum, item) {
      return sum + (item.quantity ?? item.qty ?? 1);
    }, 0);
  }

  function getUniqueCount() {
    return getCart().length;
  }

  global.OswalCartStore = {
    getCart: getCart,
    setCart: setCart,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
    getTotalCount: getTotalCount,
    getUniqueCount: getUniqueCount,
    EVENT_NAME: EVENT_NAME,
  };
})(typeof window !== 'undefined' ? window : this);
