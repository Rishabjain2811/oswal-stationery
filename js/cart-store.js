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
   * Add or merge item. Item shape: { id, name, quantity?, category?, image? }
   */
  function addItem(item) {
    var cart = readFromStorage();
    var id = item.id;
    var category = item.category || '';
    var qty = Math.max(1, Number(item.quantity) || Number(item.qty) || 1);
    var name = item.name || 'Product';
    var image = item.image || '';
    var existing = cart.find(function (i) {
      return i.id === id && (i.category || '') === category;
    });
    if (existing) {
      existing.quantity = (existing.quantity ?? existing.qty ?? 0) + qty;
    } else {
      cart.push({
        id: id,
        name: name,
        quantity: qty,
        category: category,
        image: image,
      });
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

  global.OswalCartStore = {
    getCart: getCart,
    setCart: setCart,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
    getTotalCount: getTotalCount,
    EVENT_NAME: EVENT_NAME,
  };
})(typeof window !== 'undefined' ? window : this);
