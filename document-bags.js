const categoryProducts = [
  {
    "id": 44,
    "name": "Expanding Files (CL813F, CL1212F, CL8821, CL8065F, CL6016F, CL6018, CL6026F, CL6028F)",
    "desc": "Premium Expanding Files (CL813F, CL1212F, CL8821, CL8065F, CL6016F, CL6018, CL6026F, CL6028F)",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": true
  },
  {
    "id": 45,
    "name": "Expanding Wallets (CL8057A, CL8071A, CL816A)",
    "desc": "Premium Expanding Wallets (CL8057A, CL8071A, CL816A)",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  },
  {
    "id": 46,
    "name": "Cheque Book Expanding Bags (CL4406, CL4409)",
    "desc": "Premium Cheque Book Expanding Bags (CL4406, CL4409)",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  },
  {
    "id": 47,
    "name": "Document Cases (CL812F, Stylo DC A4/FC)",
    "desc": "Premium Document Cases (CL812F, Stylo DC A4/FC)",
    "description": "",
    "image": "CL1027F.jpg",
    "featured": false
  }
];

var CATEGORY = 'Document Bags / Expanding Files Series';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'document-bags-products',
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
