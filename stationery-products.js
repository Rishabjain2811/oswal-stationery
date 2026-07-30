const categoryProducts = [
  
  {
    "id": 69,
    "name": "Single Column Magazine Rack",
    "desc": "Premium Magazine Racks",
    "description": "",
    "specs": {
      "itemCode": ["CL9882"],
      "size": ["-"],
      "thickness": ["Single Col Mag-Rack , P.S Material"],
      "packing": ["2/20/Ctn"],
      "colours": ["Blue","Grey","Black"]
    },
    "image": "CL9882.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 70,
    "name": "4 Column Magazine Rack",
    "desc": "Premium Magazine Racks",
    "description": "",
    "specs": {
      "itemCode": ["CLE804"],
      "size": ["-"],
      "thickness": ["4 Col Mag-Rack"],
      "packing": ["1/20/Ctn"],
      "colours": ["Blue"]
    },
    "image": "CLE804.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 71,
    "name": "2 Tier Tray",
    "desc": "Premium Tier Trays",
    "description": "",
    "specs": {
      "itemCode": ["CL8022"],
      "size": ["A4"],
      "thickness": ["2 Tier Folding Tray"],
      "packing": ["1/8/16/Ctn"],
      "colours": ["Clear"]
    },
    "image": "CL8022.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 72,
    "name": "3 Tier Tray",
    "desc": "Premium Tier Trays",
    "description": "",
    "specs": {
      "itemCode": ["CL8033"],
      "size": ["A4"],
      "thickness": ["3 Tier Folding Tray"],
      "packing": ["1/6/12/Ctn"],
      "colours": ["Clear"]
    },
    "image": "CL8033.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 73,
    "name": "Document Case",
    "desc": "Premium Document Case",
    "description": "",
    "specs": {
      "itemCode": ["CL318A"],
      "size": ["A4"],
      "thickness": ["Document Case Velcrow Closure , Width - 1.5'"],
      "packing": ["50/100/Ctn"],
      "colours": ["Blue"]
    },
    "image": "CL318A.png",
    "imageClass": "product-image-large",
    "featured": true
  },
];

var CATEGORY = 'Stationery Products';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'stationery-products-products',
    products: categoryProducts,
    category: CATEGORY
  });
}

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

function revealOnScroll() {
  const reveals = document.querySelectorAll('section, .product-card');
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

renderProducts();
