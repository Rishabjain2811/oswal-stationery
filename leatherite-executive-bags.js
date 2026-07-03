const categoryProducts = [
  {
    "id": 60,
    "name": "Executive Bags with Display Leaves",
    "desc": "Premium Executive Bags with Display Leaves",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": true
  },
  {
    "id": 61,
    "name": "Executive Bags with Multifunctional Zip Pad Folio with 2 Ring",
    "desc": "Premium Executive Bags with Multifunctional Zip Pad Folio with 2 Ring",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  }
];

var CATEGORY = 'Leatherite Executive Bags Series';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'leatherite-executive-bags-products',
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
