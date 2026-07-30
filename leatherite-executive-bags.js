const categoryProducts = [
  {
    "id": 60,
    "name": "DELUXE EXECUTIVE DISPLAY BAGS",
    "desc": "DELUXE EXECUTIVE DISPLAY BAGS",
    "description": "",
    "specs": {
      "itemCode": ["CP401-10","CP401-20","CP401-30","CP401-40"],
      "size": ["FC","FC","FC","FC"],
      "thickness": ["10 Pockets","20 Pockets","30 Pockets","40 Pockets"],
      "packing": ["10/60/Ctn","10/60/Ctn","10/60/Ctn","10/60/Ctn"],
      "colour": ["Red","Yellow","Brown"]
    },
    "image": "CP401-10.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 61,
    "name": "DELUXE EXECUTIVE DISPLAY BAGS",
    "desc": "DELUXE EXECUTIVE DISPLAY BAGS",
    "description": "",
    "specs": {
      "itemCode": ["CP400-10","CP400-20","CP400-30","CP400-40"],
      "size": ["B4","B4","B4","B4"],
      "thickness": ["10 Pockets","20 Pockets","30 Pockets","40 Pockets"],
      "packing": ["10/60/Ctn","10/60/Ctn","10/60/Ctn","10/60/Ctn"],
      "colour": ["Red","Yellow","Brown"]
    },
    "image": "CP401-10.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 62,
    "name": "EXECUTIVE BAGS WITH MULTIFUNCTIONAL ZIP PAD FOLIO WITH 4 RING",
    "desc": "EXECUTIVE BAGS WITH MULTIFUNCTIONAL ZIP PAD FOLIO WITH 4 RING",
    "description": "",
    "specs": {
      "itemCode": ["CP131"],
      "size": ["FC"],
      "thickness": ["Premium Leatherite Executive Bag with 4 Ring & Display Leaves"],
      "packing": ["6/42/Ctn"],
      "colour": ["Red","Black","Brown","Tan"]
    },
    "image": "CP131.png",
    "imageClass": "product-image-large",
    "featured": true
  },
];

var CATEGORY = 'Leatherite Executive Bags Series';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'leatherite-executive-bags-products',
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
