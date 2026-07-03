const categoryProducts = [
  {
    "id": 50,
    "name": "Double Side PP Coated Level Arch Clip File",
    "desc": "Premium Level Arch Clip File",
    "description": "",
    "specs": {
      "itemCode": ["CL556F"],
      "size": ["FC"],
      "thickness": ["Level Arch Mechanism Double side Full PVC Box File , 2.5mm Board , Solid Colours"],
      "packing": ["1/50/Ctn"],
      "colours": ["Blue","Grey","Green","Purple","Red"]
    },
    "image": "CL556F.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 51,
    "name": "Double Side PP Coated Level Arch Clip File",
    "desc": "Premium Level Arch Clip File",
    "description": "",
    "specs": {
      "itemCode": ["CL556F"],
      "size": ["FC"],
      "thickness": ["Level Arch Mechanism Double side Full PVC Box File , 2.5mm Board, Pastel Colours"],
      "packing": ["1/50/Ctn"],
      "colours": ["Blue","Pink","Aqua","Purple","Green"]
    },
    "image": "CL556FP.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 52,
    "name": "O/S PP/ Printed Board Lamination Ring Binder",
    "desc": "Premium lamination ring binder",
    "description": "",
    "specs": {
      "itemCode": ["CL309A","CL309F"],
      "size": ["A4","FC"],
      "thickness": ["2.2mm,","2D Ring Binder with Black Stopper."],
      "packing": ["12/72/Ctn"],
      "colours": [""]
    },
    "image": "CL309F.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 53,
    "name": "O/S PP/ Printed Board Lamination Long Lever Clip File",
    "desc": "Premium lamination Long Lever Clip File",
    "description": "",
    "specs": {
      "itemCode": ["CL308A","CL308F"],
      "size": ["A4","FC"],
      "thickness": ["2.2mm,","2D Ring Binder with Black Stopper."],
      "packing": ["12/72/Ctn"],
      "colours": [""]
    },
    "image": "CL308F.png",
    "imageClass": "product-image-large",
    "featured": true
  },
];

var CATEGORY = 'Paper Board Files Series';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'paper-board-files-products',
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
