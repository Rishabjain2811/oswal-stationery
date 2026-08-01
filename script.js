
// Minimalist product data grouped by category
const productCategories = [
  {
    "name": "Report Cover Files",
    "products": [
      {
        "id": 1,
        "name": "Strip File",
        "desc": "Clear strip files for A4/FC documents.",
        "specs": {
          "itemCode": ["CL10 (Ikon)", "CL12", "CL22", "CL286"],
          "size": ["A4/FC", "A4/FC", "A4/FC", "A4/FC"],
          "thickness": ["0.10mm", "0.12mm", "0.22mm", "0.32mm"],
          "packing": ["10/1500/Ctn", "10/1300/Ctn", "10/1000/Ctn", "10/180/720/Ctn"],
          "colour": ["Clear", "Clear", "Clear", "Clear"]
        },
        "image": "CL10.png",
        "imageClass": "product-image-large",
        "featured": false
      },
      {
        "id": 2,
        "name": "L Folder",
        "desc": "Premium L Folder",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 3,
        "name": "Report File",
        "desc": "Premium Report File",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 4,
        "name": "Flat File",
        "desc": "Premium Flat File",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 5,
        "name": "Swing Grip File",
        "desc": "Premium Swing Grip File",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 6,
        "name": "Slide Bar File",
        "desc": "Premium Slide Bar File",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 7,
        "name": "Rigid Files",
        "desc": "Premium Rigid Files",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Sheet Protectors",
    "products": [
      {
        "id": 8,
        "name": "Sheet Protectors",
        "desc": "Clear sheet protectors for documents and cards.",
        "specs": {
          "itemCode": ["SP50", "SP100", "SP150", "SP200", "SP300", "10 CARDS", "SP-200", "SP-80", "SP-150"],
          "size": ["A4/FC", "A4/FC", "A4/FC", "A4/FC", "A4/FC", "A4", "B4", "A3", "A3"],
          "thickness": ["25 microns", "50 microns", "75 microns", "100 microns", "125 microns", "75 microns", "100 microns", "40 microns", "75 microns"],
          "packing": ["100/1200/4800/Ctn", "50/1500/3000/Ctn", "50/1000/2000/Ctn", "50/750/1500/Ctn", "25/500/1000/Ctn", "50/500/2000/Ctn", "50/300/1200/Ctn", "50/500/2000/Ctn", "50/300/1200/Ctn"],
          "colour": "Clear"
        },
        "image": "sp1.png",
        "images": ["sp1.png", "sp2.png"],
        "imageClass": "product-image-large"
      }
    ]
  },
  {
    "name": "Clip Files Series",
    "products": [
      {
        "id": 10,
        "name": "Punchless Clip Files",
        "desc": "Premium Punchless Clip Files",
        "description": "",
        "specs": {
          "itemCode": ["CL421A", "CL422F"],
          "size": ["A4", "FC"],
          "thickness": ["Punchless clip", "Punchless clip"],
          "packing": ["24/192/Ctn", "24/192/Ctn"],
          "colour": "Clear",
          "colours": ["Pink", "Green", "Blue", "Orange"]
        },
        "image": "Punchless Clip.jpeg",
        "imageClass": "product-image-large",
        "featured": false
      },
      {
        "id": 11,
        "name": "Spring Clip Files",
        "desc": "Premium Spring Clip Files",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 12,
        "name": "Ring Binders",
        "desc": "Premium Ring Binders",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 13,
        "name": "Dual Clip Files",
        "desc": "Premium Dual Clip Files",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Clear Books Series",
    "products": [
      {
        "id": 14,
        "name": "CL10 ",
        "desc": "10 Pocket Display Book",
        "image": "CL10.jpeg",
        "featured": false
      },
      {
        "id": 15,
        "name": "CL20 ",
        "desc": "Premium CL20 \u2013 A4/FC \u2013 20 Pocket Display Book",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 16,
        "name": "CL30 \u2013 A4/FC \u2013 30 Pocket Display Book",
        "desc": "Premium CL30 \u2013 A4/FC \u2013 30 Pocket Display Book",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 17,
        "name": "CL40 \u2013 A4/FC \u2013 40 Pocket Display Book",
        "desc": "Premium CL40 \u2013 A4/FC \u2013 40 Pocket Display Book",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 18,
        "name": "CL60 \u2013 A4/FC \u2013 60 Pocket Display Book",
        "desc": "Premium CL60 \u2013 A4/FC \u2013 60 Pocket Display Book",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 19,
        "name": "CL80 \u2013 A4/FC \u2013 80 Pocket Display Book with Transparent Case",
        "desc": "Premium CL80 \u2013 A4/FC \u2013 80 Pocket Display Book with Transparent Case",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 20,
        "name": "CL100 \u2013 A4/FC \u2013 100 Pocket Display Book with Transparent Case",
        "desc": "Premium CL100 \u2013 A4/FC \u2013 100 Pocket Display Book with Transparent Case",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 21,
        "name": "CL772 \u2013 B4 \u2013 20 Display Pockets",
        "desc": "Premium CL772 \u2013 B4 \u2013 20 Display Pockets",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 22,
        "name": "CL10 \u2013 A3 \u2013 10 Display Pockets",
        "desc": "Premium CL10 \u2013 A3 \u2013 10 Display Pockets",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 23,
        "name": "CL20 \u2013 A3 \u2013 20 Display Pockets",
        "desc": "Premium CL20 \u2013 A3 \u2013 20 Display Pockets",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 24,
        "name": "CL30 \u2013 A3 \u2013 30 Display Pockets",
        "desc": "Premium CL30 \u2013 A3 \u2013 30 Display Pockets",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 25,
        "name": "CL40 \u2013 A3 \u2013 40 Display Pockets",
        "desc": "Premium CL40 \u2013 A3 \u2013 40 Display Pockets",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 26,
        "name": "CL-CF10 \u2013 B4/FC \u2013 Display File Zip Closure",
        "desc": "Premium CL-CF10 \u2013 B4/FC \u2013 Display File Zip Closure",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 27,
        "name": "CL-CF20 \u2013 B4 \u2013 Display File Zip Closure",
        "desc": "Premium CL-CF20 \u2013 B4 \u2013 Display File Zip Closure",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 28,
        "name": "CL-CF30 \u2013 B4 \u2013 Display File Zip Closure",
        "desc": "Premium CL-CF30 \u2013 B4 \u2013 Display File Zip Closure",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 29,
        "name": "CL-CF40 \u2013 B4 \u2013 Display File Zip Closure",
        "desc": "Premium CL-CF40 \u2013 B4 \u2013 Display File Zip Closure",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Visiting Card Holders Series",
    "products": [
      {
        "id": 30,
        "name": "CL40K",
        "desc": "Premium CL40K",
        "image": "CL40K.jpeg",
        "featured": false
      },
      {
        "id": 31,
        "name": "CL120K",
        "desc": "Premium CL120K",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 32,
        "name": "CL240K",
        "desc": "Premium CL240K",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 33,
        "name": "CL480K",
        "desc": "Premium CL480K",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 34,
        "name": "CL600 Cards Album",
        "desc": "Premium CL600 Cards Album",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Button Bags Series",
    "products": [
      {
        "id": 35,
        "name": "Stitched Button Bags",
        "desc": "Premium Stitched Button Bags",
        "image": " CL605.jpeg",
        "featured": false
      },
      {
        "id": 36,
        "name": "Envelope Bags (C114F, CL119F)",
        "desc": "Premium Envelope Bags (C114F, CL119F)",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 37,
        "name": "Printed Button Bags (CL801, CL802, CL804F, CL805F, CL1000F, CL1027F, CL1032F, CL1034F, CL1041F, CL1042F, CL1043F, CL1044F, CL2000F, CL2001F, CL2002F, CL2003F, CL2004F, CL2005F, CL2029F, CL2030F, CL2401F, CL2402F, CL3000F, CL3020F, CL3021F, CL3022F, CL3026F, CL4000F, CL5000F)",
        "desc": "Premium Printed Button Bags (CL801, CL802, CL804F, CL805F, CL1000F, CL1027F, CL1032F, CL1034F, CL1041F, CL1042F, CL1043F, CL1044F, CL2000F, CL2001F, CL2002F, CL2003F, CL2004F, CL2005F, CL2029F, CL2030F, CL2401F, CL2402F, CL3000F, CL3020F, CL3021F, CL3022F, CL3026F, CL4000F, CL5000F)",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 38,
        "name": "Double Pocket Bags (CL211F, CL212F, CL236F)",
        "desc": "Premium Double Pocket Bags (CL211F, CL212F, CL236F)",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 39,
        "name": "Premium Button Bags (CL402F, CL408F, CL410)",
        "desc": "Premium Premium Button Bags (CL402F, CL408F, CL410)",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Zipper Bag Series",
    "products": [
      {
        "id": 40,
        "name": "PP Zipper Bags",
        "desc": "Premium PP Zipper Bags",
        "image": "P53.png",
        "featured": false
      },
      {
        "id": 41,
        "name": "PVC Clear Zipper Bags",
        "desc": "Premium PVC Clear Zipper Bags",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 42,
        "name": "Satin Zipper Bags",
        "desc": "Premium Satin Zipper Bags",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 43,
        "name": "Mesh Zipper Bags",
        "desc": "Premium Mesh Zipper Bags",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Documents Bag / Expanding Files Series",
    "products": [
      {
        "id": 44,
        "name": "Expanding Files",
        "desc": "Premium Expanding Files",
        "image": "CL813.jpeg",
        "featured": false
      },
      {
        "id": 45,
        "name": "Expanding Wallets (CL8057A, CL8071A, CL816A)",
        "desc": "Premium Expanding Wallets (CL8057A, CL8071A, CL816A)",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 46,
        "name": "Cheque Book Expanding Bags (CL4406, CL4409)",
        "desc": "Premium Cheque Book Expanding Bags (CL4406, CL4409)",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 47,
        "name": "Document Case FC (CL812F)",
        "desc": "Premium Document Case FC (CL812F)",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Index/Seperators Series",
    "products": [
      {
        "id": 48,
        "name": "CL010",
        "desc": "PP Colour Separators with Index Tabs",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 49,
        "name": "PP White Index (1\u20135, 1\u201310, 1\u201312, 1\u201315, 1\u201320, 1\u201331, A\u2013Z)",
        "desc": "Premium PP White Index (1\u20135, 1\u201310, 1\u201312, 1\u201315, 1\u201320, 1\u201331, A\u2013Z)",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Paper Board Files Series",
    "products": [
      {
        "id": 50,
        "name": "Double Side PP Coated Lever Arch Clip File (CL556F)",
        "desc": "Premium Double Side PP Coated Lever Arch Clip File (CL556F)",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 51,
        "name": "PP Printed Board Lamination Ring Binder (CL309A, CL309F)",
        "desc": "Premium PP Printed Board Lamination Ring Binder (CL309A, CL309F)",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 52,
        "name": "PP Printed Board Lamination Long Lever Clip File (CL308A, CL308F)",
        "desc": "Premium PP Printed Board Lamination Long Lever Clip File (CL308A, CL308F)",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Display Solution Products Series",
    "products": [
      {
        "id": 53,
        "name": "PVC Clear Card Case",
        "desc": "Premium PVC Clear Card Case",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 54,
        "name": "Magnetic Card Case",
        "desc": "Premium Magnetic Card Case",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 55,
        "name": "Info Folder",
        "desc": "Premium Info Folder",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 56,
        "name": "Magnetic Panel Folder",
        "desc": "Premium Magnetic Panel Folder",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 57,
        "name": "Wall Unit Bracket with Folders",
        "desc": "Premium Wall Unit Bracket with Folders",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 58,
        "name": "Wall Hangers",
        "desc": "Premium Wall Hangers",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 59,
        "name": "Peel and Stick Sheet",
        "desc": "Premium Peel and Stick Sheet",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 60,
        "name": "Desk Organizer",
        "desc": "Premium Desk Organizer",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Leatherite Bags Series",
    "products": [
      {
        "id": 61,
        "name": "Leatherite Bags",
        "desc": "Premium Leatherite Bags",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "PP & Leatherite Conference Files / Hotel Files",
    "products": [
      {
        "id": 62,
        "name": "Presentation Files (PP) (CL261A)",
        "desc": "Premium Presentation Files (PP) (CL261A)",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  },
  {
    "name": "Stationery Products",
    "products": [
      {
        "id": 66,
        "name": "Single Column Magazine Rack",
        "desc": "Premium Single Column Magazine Rack",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 67,
        "name": "Four Column Magazine Rack",
        "desc": "Premium Four Column Magazine Rack",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 68,
        "name": "2 Tier Tray",
        "desc": "Premium 2 Tier Tray",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 69,
        "name": "3 Tier Tray",
        "desc": "Premium 3 Tier Tray",
        "image": "CL1027F.jpg",
        "featured": false
      },
      {
        "id": 70,
        "name": "Document Case",
        "desc": "Premium Document Case",
        "image": "CL1027F.jpg",
        "featured": false
      }
    ]
  }
];

const FEATURED_PRODUCT_CODES = ['CL212F', 'CL805F', 'CL1000F', 'CL1034F', 'CL2401F', 'CL3000F', 'CL5000F'];
const FEATURED_CATEGORY = 'Button Bags Series';
const FEATURED_PAGE = 'button-files.html';

const featuredProducts = [
  {
    id: 76,
    name: 'Double Pocket Bags',
    desc: 'Premium Double Pocket bags',
    description: '',
    specs: {
      itemCode: ['CL212F'],
      size: ['FC'],
      thickness: ['Side Loading'],
      packing: ['300/600/Ctn'],
      colours: ['Orange', 'Blue', 'Pink', 'Green', 'Red']
    },
    image: 'CL212F.png',
    imageClass: 'product-image-large',
    category: FEATURED_CATEGORY,
    page: FEATURED_PAGE
  },
  {
    id: 48,
    name: 'Printed Button Bags',
    desc: 'Premium Printed button bags',
    description: '',
    specs: {
      itemCode: ['CL805F'],
      size: ['FC'],
      thickness: ['Pastel Colours'],
      packing: ['360/720/Ctn'],
      colours: ['Purple', 'Pink', 'Blue', 'Yellow']
    },
    image: 'CL805F.png',
    imageClass: 'product-image-large',
    category: FEATURED_CATEGORY,
    page: FEATURED_PAGE
  },
  {
    id: 49,
    name: 'Printed Button Bags',
    desc: 'Premium Printed button bags',
    description: '',
    specs: {
      itemCode: ['CL1000F'],
      size: ['FC'],
      thickness: ['-'],
      packing: ['360/720/Ctn'],
      colours: ['Clear', 'Purple', 'Pink', 'Blue', 'Green', 'Indigo']
    },
    image: 'CL1000F.png',
    imageClass: 'product-image-large',
    category: FEATURED_CATEGORY,
    page: FEATURED_PAGE
  },
  {
    id: 52,
    name: 'Printed Button Bags',
    desc: 'Premium Printed button bags',
    description: '',
    specs: {
      itemCode: ['CL1034F'],
      size: ['FC'],
      thickness: ['-'],
      packing: ['360/720/Ctn'],
      colours: ['Pink', 'Blue', 'Green', 'Yellow']
    },
    image: 'CL1034F.png',
    imageClass: 'product-image-large',
    category: FEATURED_CATEGORY,
    page: FEATURED_PAGE
  },
  {
    id: 65,
    name: 'Printed Button Bags',
    desc: 'Premium Printed button bags',
    description: '',
    specs: {
      itemCode: ['CL2401F'],
      size: ['FC'],
      thickness: ['-'],
      packing: ['360/720/Ctn'],
      colours: ['Grey', 'Dark Blue', 'Red', 'Light Blue']
    },
    image: 'CL2401F.png',
    imageClass: 'product-image-large',
    category: FEATURED_CATEGORY,
    page: FEATURED_PAGE
  },
  {
    id: 67,
    name: 'Printed Button Bags',
    desc: 'Premium Printed button bags',
    description: '',
    specs: {
      itemCode: ['CL3000F'],
      size: ['FC'],
      thickness: ['-'],
      packing: ['360/720/Ctn'],
      colours: ['Orange', 'Blue', 'Indigo', 'Green', 'Pink', 'Yellow']
    },
    image: 'CL3000F.png',
    imageClass: 'product-image-large',
    category: FEATURED_CATEGORY,
    page: FEATURED_PAGE
  },
  {
    id: 73,
    name: 'Printed Button Bags',
    desc: 'Premium Printed button bags',
    description: '',
    specs: {
      itemCode: ['CL5000F'],
      size: ['FC'],
      thickness: ['-'],
      packing: ['360/720/Ctn'],
      colours: []
    },
    image: 'CL5000F.png',
    imageClass: 'product-image-large',
    category: FEATURED_CATEGORY,
    page: FEATURED_PAGE
  }
];

// — Cart: use global store only (single source of truth). Badge updates via oswal:cartUpdated.
var store = window.OswalCartStore;
function addToCart(productId, category) {
  var product = findProduct(productId, category);
  if (!product) {
    console.error('Product not found:', productId, category);
    return;
  }
  var quantityInput = document.querySelector('input[data-id="' + productId + '"][data-cat="' + category + '"]');
  var quantity = parseInt(quantityInput ? quantityInput.value : 0, 10);
  if (isNaN(quantity) || quantity < 0) quantity = 0;
  if (quantity < 1) {
    alert('Please select a quantity greater than 0.');
    return;
  }
  var codePicker = document.querySelector('select.item-code-select:not(.colour-select)[data-id="' + productId + '"][data-cat="' + category + '"]');
  var colourPicker = document.querySelector('select.colour-select[data-id="' + productId + '"][data-cat="' + category + '"]');
  var selectedCode = codePicker ? codePicker.value : null;
  var selectedColour = colourPicker ? colourPicker.value : null;
  var variants = window.OswalProductVariants;
  var line = variants
    ? variants.buildCartVariant(product, selectedCode, selectedColour)
    : { id: String(product.id), name: product.name };
  if (store) store.addItem({ id: line.id, name: line.name, quantity: quantity, category: category, image: product.image });
  if (quantityInput) quantityInput.value = 0;
  if (typeof renderCart === 'function') renderCart();
  else {
    var cartItems = document.getElementById('cart-items');
    if (cartItems) {
      var c = store ? store.getCart() : [];
      cartItems.innerHTML = c.length === 0 ? '<p>Your cart is empty.</p>' : c.map(function (item) {
        return '<div class="cart-item"><span>' + item.name + '</span> <span>x' + (item.quantity || item.qty || 1) + '</span></div>';
      }).join('');
    }
  }
  showCartNotification(product.name + ' added to cart!');
}

function findProduct(productId, category) {
  if (category === FEATURED_CATEGORY) {
    var featuredMatch = featuredProducts.find(function (p) { return p.id === productId; });
    if (featuredMatch) return featuredMatch;
  }
  for (const cat of productCategories) {
    if (cat.name === category) {
      return cat.products.find(p => p.id === productId);
    }
  }
  return null;
}

function removeFromCart(productId) {
  if (store) store.removeItem(productId);
  if (typeof renderCart === 'function') renderCart();
}

function changeCartQty(productId, newQty) {
  var cart = store ? store.getCart() : [];
  var item = cart.find(function (i) { return i.id === productId; });
  if (item) {
    item.quantity = Math.max(1, newQty);
    if (store) store.setCart(cart);
    if (typeof renderCart === 'function') renderCart();
  }
}

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

function renderFeaturedProducts() {
  var variants = window.OswalProductVariants;

  function renderCodePicker(product) {
    if (!variants) return '';
    return variants.renderCodePicker(
      product,
      'item-' + product.category + '-' + product.id,
      'data-id="' + product.id + '" data-cat="' + product.category + '"'
    );
  }

  function renderColourPicker(product) {
    if (!variants) return '';
    return variants.renderColourPicker(
      product,
      'item-' + product.category + '-' + product.id,
      'data-id="' + product.id + '" data-cat="' + product.category + '"'
    );
  }

  function renderProductDescription(product) {
    var descBox = window.OswalCategoryPage
      ? window.OswalCategoryPage.renderDescriptionBox(product)
      : '';
    if (variants) return descBox + variants.renderSpecTable(product);
    return descBox;
  }

  function wireVariantPickers(container, products) {
    if (!variants) return;
    products.forEach(function (product) {
      if (!product.specs) return;
      var codePicker = container.querySelector(
        '.item-code-select:not(.colour-select)[data-id="' + product.id + '"][data-cat="' + product.category + '"]'
      );
      var colourPicker = container.querySelector(
        '.colour-select[data-id="' + product.id + '"][data-cat="' + product.category + '"]'
      );
      if (!codePicker || !colourPicker) return;
      variants.syncColourToCode(product, codePicker, colourPicker);
      codePicker.addEventListener('change', function () {
        variants.syncColourToCode(product, codePicker, colourPicker);
      });
    });
  }

  function renderProductImages(product) {
    if (variants) return variants.renderProductImages(product);
    var altText = product.name + ' - ' + (product.desc || product.description || 'Premium office stationery from OSWAL Gift N Stationery Chennai');
    return '<img src="' + product.image + '" alt="' + altText + '" class="product-image ' + (product.imageClass || '') + '" loading="lazy" />';
  }

  const featured = featuredProducts.slice();
  const container = document.getElementById('featured-products');
  function detailUrl(product) {
    var page = product.page || FEATURED_PAGE;
    if (window.OswalProductRegistry && window.OswalProductRegistry.buildStaticUrl) {
      return window.OswalProductRegistry.buildStaticUrl(page, product.id);
    }
    if (window.OswalProductRegistry && window.OswalProductRegistry.buildUrl) {
      return window.OswalProductRegistry.buildUrl(page, product.id);
    }
    return 'product.html?page=' + encodeURIComponent(page) + '&id=' + product.id;
  }
  container.innerHTML = `<div class="featured-scroll">${featured.map(product => {
      var url = detailUrl(product);
      var imageHtml = renderProductImages(product);
      return `
      <div class="product-card">
        <a href="${url}" class="product-image-link">${imageHtml}</a>
        <a href="${url}" class="product-title product-title-link">${product.name}</a>
        ${product.code ? '<div class="item-code-label">Item Code: ' + product.code + '</div>' : ''}
        <a href="${url}" class="view-details-text">View Details</a>
      </div>`;
    }).join('')
    }</div>`;
  wireVariantPickers(container.querySelector('.featured-scroll'), featured);
  addProductCardListeners(container.querySelector('.featured-scroll'), featured);

  // Auto-scroll functionality
  var scrollContainer = container.querySelector('.featured-scroll');
  if (!scrollContainer) return;
  
  var autoScrollInterval;
  var isPaused = false;
  var scrollSpeed = 1;
  var scrollDirection = 1;

  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(function() {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed * scrollDirection;
        // Reverse direction at ends
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollDirection = -1;
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollDirection = 1;
        }
      }
    }, 30);
  }

  function stopAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
  }

  // Pause on hover/touch
  scrollContainer.addEventListener('mouseenter', function() {
    isPaused = true;
  });
  scrollContainer.addEventListener('mouseleave', function() {
    isPaused = false;
  });
  scrollContainer.addEventListener('touchstart', function() {
    isPaused = true;
  });
  scrollContainer.addEventListener('touchend', function() {
    isPaused = false;
  });

  // Pause on manual scroll
  scrollContainer.addEventListener('scroll', function() {
    isPaused = true;
    clearTimeout(scrollContainer.scrollTimeout);
    scrollContainer.scrollTimeout = setTimeout(function() {
      isPaused = false;
    }, 2000);
  });

  // Start auto-scroll after a small delay
  setTimeout(startAutoScroll, 1000);
}

function renderProductCategories() {
  var variants = window.OswalProductVariants;

  function renderCodePicker(product, categoryName) {
    if (!variants) return '';
    return variants.renderCodePicker(
      product,
      'item-' + categoryName + '-' + product.id,
      'data-id="' + product.id + '" data-cat="' + categoryName + '"'
    );
  }

  function renderColourPicker(product, categoryName) {
    if (!variants) return '';
    return variants.renderColourPicker(
      product,
      'item-' + categoryName + '-' + product.id,
      'data-id="' + product.id + '" data-cat="' + categoryName + '"'
    );
  }

  function wireVariantPickers(section, products, categoryName) {
    if (!variants) return;
    products.forEach(function (product) {
      if (!product.specs) return;
      var codePicker = section.querySelector(
        '.item-code-select:not(.colour-select)[data-id="' + product.id + '"][data-cat="' + categoryName + '"]'
      );
      var colourPicker = section.querySelector(
        '.colour-select[data-id="' + product.id + '"][data-cat="' + categoryName + '"]'
      );
      if (!codePicker || !colourPicker) return;
      variants.syncColourToCode(product, codePicker, colourPicker);
      codePicker.addEventListener('change', function () {
        variants.syncColourToCode(product, codePicker, colourPicker);
      });
    });
  }

  function renderProductImages(product) {
    if (variants) return variants.renderProductImages(product);
    return '<img src="' + product.image + '" alt="' + product.name + '" class="product-image ' + (product.imageClass || '') + '" />';
  }

  const categoriesContainer = document.getElementById('product-categories');
  categoriesContainer.innerHTML = '';
  productCategories.forEach(cat => {
    const section = document.createElement('div');
    section.className = 'product-category';
    section.innerHTML = `
      <h3 class="category-title">${cat.name}</h3>
      <div class="products">
        ${cat.products.map(product => {
          var page = cat.page || cat.name;
          var url;
          if (window.OswalProductRegistry && window.OswalProductRegistry.buildStaticUrl) {
            url = window.OswalProductRegistry.buildStaticUrl(page, product.id);
          } else if (window.OswalProductRegistry && window.OswalProductRegistry.buildUrl) {
            url = window.OswalProductRegistry.buildUrl(page, product.id);
          } else {
            url = 'product.html?page=' + encodeURIComponent(page) + '&id=' + product.id;
          }
          return `
          <div class="product-card">
            <a href="${url}" class="product-image-link">${renderProductImages(product)}</a>
            <a href="${url}" class="product-title product-title-link">${product.name}</a>
            ${product.code ? '<div class="item-code-label">Item Code: ' + product.code + '</div>' : ''}
            <a href="${url}" class="view-details-text">View Details</a>
          </div>
        `}).join('')}
      </div>
    `;
    categoriesContainer.appendChild(section);
    wireVariantPickers(section, cat.products, cat.name);
    addProductCardListeners(section, cat.products.map(p => ({ ...p, category: cat.name })));
  });
}

function addProductCardListeners(container, products) {
  // Initialize quantity inputs with Ctn suffix
  container.querySelectorAll('.quantity-input').forEach(input => {
    input.value = formatQty(parseQty(input.value));
  });

  container.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = parseInt(this.getAttribute('data-id'));
      const catName = this.getAttribute('data-cat');
      const input = container.querySelector(`.quantity-input[data-id="${id}"][data-cat="${catName}"]`);
      let val = parseQty(input.value);
      if (this.getAttribute('data-action') === 'increase') val++;
      else if (val > 0) val--;
      input.value = formatQty(val);
    });
  });
  container.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('input', function () {
      let val = parseQty(this.value);
      this.value = formatQty(val);
    });
    input.addEventListener('blur', function () {
      let val = parseQty(this.value);
      this.value = formatQty(val);
    });
  });
  container.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = parseInt(this.getAttribute('data-id'));
      const catName = this.getAttribute('data-cat');
      const input = container.querySelector(`.quantity-input[data-id="${id}"][data-cat="${catName}"]`);
      addToCart(id, catName, parseQty(input.value));
    });
  });
}

// Contact form (no backend, just show thank you)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  contactForm.innerHTML = '<p style="color:var(--cta-olive);font-weight:600;font-size:1.1rem;">Thank you for reaching out! We will get back to you soon.</p>';
});

// Cart functionality for main page
function showCartNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bold-green);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Cart is persisted in localStorage - do NOT clear on refresh/navigation
// function resetCartOnRefresh() {
//   localStorage.removeItem('oswal_cart');
// }
// resetCartOnRefresh();  // REMOVED so cart persists when navigating to home

// Smooth scroll for nav links
const navLinkElements = document.querySelectorAll('.nav-links a:not(.cart-link)');
navLinkElements.forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Active nav link highlighting
function setActiveNavLink() {
  const links = document.querySelectorAll('.nav-links a');
  const fromTop = window.scrollY + 80;
  links.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// Optionally, animate sections/cards on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('section, .product-card, .testimonial-card, .about-section, .contact-section');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 60) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Render all
renderFeaturedProducts();
renderProductCategories();

function sendWhatsApp() {
  var cart = store ? store.getCart() : [];
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  var message = "Hello! I'm interested in the following products from OSWAL GIFT N STATIONERY:\n\n" + cart.map(function (item) {
    return '• ' + item.name + ' - Quantity: ' + (item.quantity || item.qty || 1);
  }).join('\n') + "\n\nPlease provide pricing and availability.";
  window.open('https://wa.me/919841137922?text=' + encodeURIComponent(message), '_blank');
}

function directWhatsApp() {
  var cart = store ? store.getCart() : [];
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  var message = "Hello! I would like to order the following products:\n\n" + cart.map(function (item) {
    return '• ' + item.name + ' - Quantity: ' + (item.quantity || item.qty || 1);
  }).join('\n') + "\n\nPlease provide pricing and availability.";
  window.open('https://wa.me/919841137768?text=' + encodeURIComponent(message), '_blank');
}

function ensureMobileCartBadge() {
  if (document.querySelector('.cart-badge-mobile')) return;

  var badge = document.createElement('a');
  badge.className = 'cart-badge-mobile';
  badge.href = 'cart.html';
  badge.setAttribute('aria-label', 'Open cart');
  badge.innerHTML = '<span class="cart-mobile-icon">🛒</span><span class="cart-mobile-count">0</span>';
  document.body.appendChild(badge);
}

function updateMobileCartBadge() {
  var badgeCount = document.querySelector('.cart-mobile-count');
  var total = window.OswalCartStore ? window.OswalCartStore.getTotalCount() : 0;
  if (badgeCount) badgeCount.textContent = total;
}

document.addEventListener('DOMContentLoaded', function () {
  var sendWhatsAppBtn = document.getElementById('send-whatsapp');
  var directWhatsAppBtn = document.getElementById('direct-whatsapp');
  if (sendWhatsAppBtn) sendWhatsAppBtn.addEventListener('click', sendWhatsApp);
  if (directWhatsAppBtn) directWhatsAppBtn.addEventListener('click', directWhatsApp);
  var cartItemsEl = document.getElementById('cart-items');
  if (cartItemsEl && typeof renderCart === 'function') renderCart();
  ensureMobileCartBadge();
  updateMobileCartBadge();
});

window.addEventListener('pageshow', function () {
  ensureMobileCartBadge();
  updateMobileCartBadge();
});

window.addEventListener('load', function () {
  updateMobileCartBadge();
});

// Read More Toggle Functionality
function initReadMoreToggles() {
  const toggles = document.querySelectorAll('.read-more-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const readMoreSection = this.closest('.read-more-section');
      const content = readMoreSection.querySelector('.read-more-content');
      
      if (content) {
        content.classList.toggle('expanded');
        
        if (content.classList.contains('expanded')) {
          this.textContent = 'Read Less';
        } else {
          this.textContent = 'Read More';
        }
      }
    });
  });
} 


// Initialize read more toggles on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  initReadMoreToggles();
});

// Also initialize after window load to ensure all content is loaded
window.addEventListener('load', function() {
  initReadMoreToggles();
});

  
