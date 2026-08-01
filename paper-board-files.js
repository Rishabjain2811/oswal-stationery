const categoryProducts = [
  {
    "id": 50,
    "name": "Double Side PP Coated Level Arch Clip File",
    "desc": "Premium Level Arch Clip File",
    "description": "",
    "specs": {
      "itemCode": ["CL556F"],
      "size": ["FC"],
      "thickness": ["Solid Colours"],
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
      "thickness": ["Pastel Colours"],
      "packing": ["1/50/Ctn"],
      "colours": ["Blue","Pink","Aqua","Purple","Green"]
    },
    "image": "CL556FP.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 511,
    "name": "Double Side PP Coated Level Arch Clip File",
    "desc": "Premium Level Arch Clip File",
    "description": "",
    "specs": {
      "itemCode": ["CL1556F"],
      "size": ["FC"],
      "thickness": ["L.A.File with in-built Punching Mechanism"],
      "packing": ["1/50/Ctn"],
      "colours": ["Blue"]
    },
    "image": "CL1556.png",
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
      "thickness": ["2.2mm","O/S PP Coated 2D Ring Binder with Stopper,Solid & Pastel Colours"],
      "packing": ["24/72/Ctn","24/72/Ctn"],
      "colours": ["Pastel Blue","Pastel Pink","Pastel Aqua","Pastel Purple","Pastel Green","Blue","Grey","Green","Purple","Red"]
    },
    "image": "CL309A.png",
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
      "thickness": ["2.2mm","O/S PP Long Lever Clip File"],
      "packing": ["24/72/Ctn"],
      "colours": ["Pink","Green","Blue","Orange","Dark Blue"]
    },
    "image": "CL308F.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 54,
    "name": "D/S PP COATED RING BINDER WITH FRONT VIEW POCKET",
    "desc": "Premium double side PP coated ring binder with front view pocket",
    "description": "",
    "specs": {
      "itemCode": ["CL501"],
      "size": ["A4"],
      "thickness": ["2D Ring Binder"],
      "packing": ["24/72/Ctn"],
      "colours": ["Navy Blue"]
    },
    "image": "CL501.png",
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
