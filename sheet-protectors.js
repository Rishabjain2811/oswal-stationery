const categoryProducts = [
  {
    "id": 8,
    "name": "Sheet Protectors",
    "desc": "Clear sheet protectors for documents and cards.",
    "description": "",
    "image": "sp1.png",
    "images": ["sp1.png", "sp2.png"],
    "imageClass": "product-image-large",
    "specs": {
      "itemCode": ["SP50", "SP100", "SP150", "SP200", "SP300", "10 CARDS", "SP-200", "SP-80", "SP-150"],
      "size": ["A4/FC", "A4/FC", "A4/FC", "A4/FC", "A4/FC", "A4", "B4", "A3", "A3"],
      "thickness": ["25 microns", "50 microns", "75 microns", "100 microns", "125 microns", "75 microns", "100 microns", "40 microns", "75 microns"],
      "packing": ["100/1200/4800/Ctn", "50/1500/3000/Ctn", "50/1000/2000/Ctn", "50/750/1500/Ctn", "25/500/1000/Ctn", "50/500/2000/Ctn", "50/300/1200/Ctn", "50/500/2000/Ctn", "50/300/1200/Ctn"],
      "colour": "Clear"
    }
  }
];

var CATEGORY = 'Sheet Protectors';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'sheet-protectors-products',
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
