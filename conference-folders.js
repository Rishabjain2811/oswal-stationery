const categoryProducts = [
  {
    "id": 62,
    "name": "Conference Files (CL9001A)",
    "desc": "Premium Conference Files (CL9001A)",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": true
  },
  {
    "id": 63,
    "name": "Multifunctional Conference Files (CL102A)",
    "desc": "Premium Multifunctional Conference Files (CL102A)",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  },
  {
    "id": 64,
    "name": "Models (CP24, CP25, CP31, CP37, CP45, CP50(L), CP56, CP66, CP96, CP10, CP100, CP131(L))",
    "desc": "Premium Models (CP24, CP25, CP31, CP37, CP45, CP50(L), CP56, CP66, CP96, CP10, CP100, CP131(L))",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  },
  {
    "id": 65,
    "name": "Presentation Files (PP) (CL261A)",
    "desc": "Premium Presentation Files (PP) (CL261A)",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  }
];

var CATEGORY = 'PP & Leatherite Conference Files / Hotel Files';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'conference-folders-products',
    products: categoryProducts,
    category: CATEGORY
  });
}

const cartLink = document.querySelector('.cart-link');
if(cartLink) {
    cartLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'cart.html';
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
