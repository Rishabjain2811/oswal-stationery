const categoryProducts = [
  {
    "id": 66,
    "name": "PP Colors Seperators With Index Tabs",
    "desc": "Premium colors Seperators",
    "description": "",
    "specs": {
      "itemCode": ["CL010"],
      "size": ["A4"],
      "thickness": ["Transparent Color Index With Tab ,<br> Set of 10 sheet with Name Tag"],
      "packing": ["80/160/Ctn"],
      "colours": ["Brown"]
    },
    "image": "CL010.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 67,
    "name": "PP White Index",
    "desc": "Premium White Index",
    "description": "",
    "specs": {
      "itemCode": ["N5","N10","N12","N15","N20","N31"],
      "size": ["A4","A4","A4","A4","A4","A4"],
      "thickness": ["","","","11Hole PP Material Index Sheet","",""],
      "packing": ["125/5000/Ctn","70/180/Ctn","60/240/Ctn","50/200/Ctn","40/160/Ctn","25/100/Ctn"],
      "colours": ["Pink"]
    },
    "image": "N5.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 68,
    "name": "PP White Index",
    "desc": "Premium White Index",
    "description": "",
    "specs": {
      "itemCode": ["NZ"],
      "size": ["A4"],
      "thickness": ["11Hole PP Material Index Sheet"],
      "packing": ["40/160/Ctn"],
      "colours": ["Pink"]
    },
    "image": "NZ.png",
    "imageClass": "product-image-large",
    "featured": true
  },
];

var CATEGORY = 'Index / Separators';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'separators-products',
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
