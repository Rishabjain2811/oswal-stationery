const categoryProducts = [
  {
    "id": 30,
    "name": "Visiting Card Holder",
    "desc": "Premium Card Holder",
    "description": "",
    "specs": {
      "itemCode": ["CL40K"],
      "size": ["Pocket Size"],
      "thickness": ["40 Cards Holder"],
      "packing": ["100/500/Ctn"],
      "colours": ["Blue","Yellow", "Red"]
    },
    "image": "CL40K.jpeg",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 31,
    "name": "Buisness Cards Holder",
    "desc": "Premium Card Holder",
    "description": "",
    "specs": {
      "itemCode": ["CL120K","CL240K","CL480K"],
      "size": ["120 Cards","240 Cards", "480 Cards"],
      "thickness": ["120 Cards Holder with case","240 Cards Holder with case","480 Cards Holder with case"],
      "packing": ["48/192/Ctn","24/96/Ctn","12/48/Ctn"],
      "colours": ["Grey","Blue","Red","Green"]
    },
    "image": "CL240K.png",
    "imageClass": "product-image-large",
    "featured":false
  },
  {
    "id": 32,
    "name": "Buisness Cards Albumn",
    "desc": "Premium Card Albumn",
    "description": "",
    "specs": {
      "itemCode": ["ICON 600IC"],
      "size": ["A4"],
      "thickness": ["600 Card Albumn with Index"],
      "packing": ["18/72/Ctn"],
      "colours": ["Blue","Grey"]
    },
    "image": "CL600.png",
    "imageClass": "product-image-large",
    "featured": true
  }
  
];

var CATEGORY = 'Visiting Card Holders Series';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'card-holders-products',
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
