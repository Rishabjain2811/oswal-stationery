const categoryProducts = [
  {
    "id": 53,
    "name": "PVC Clear Card Case (CL201, CL202, CL203, CL204)",
    "desc": "Premium PVC Clear Card Case (CL201, CL202, CL203, CL204)",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": true
  },
  {
    "id": 54,
    "name": "Magnetic Card Case",
    "desc": "Premium Magnetic Card Case",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  },
  {
    "id": 55,
    "name": "Info Folder",
    "desc": "Premium Info Folder",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  },
  {
    "id": 56,
    "name": "Magnetic Panel Folder",
    "desc": "Premium Magnetic Panel Folder",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  },
  {
    "id": 57,
    "name": "Wall Unit Bracket with Folders",
    "desc": "Premium Wall Unit Bracket with Folders",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  },
  {
    "id": 58,
    "name": "Wall Hangers",
    "desc": "Premium Wall Hangers",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  },
  {
    "id": 59,
    "name": "Peel and Stick Sheet",
    "desc": "Premium Peel and Stick Sheet",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  }
];

var CATEGORY = 'Display Solution Products Series';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'display-files-products',
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
