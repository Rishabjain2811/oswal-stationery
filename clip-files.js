const categoryProducts = [
  {
    "id": 10,
    "name": "Punchless Clip Files",
    "desc": "Premium Punchless Clip Files",
    "description": "",
    "specs": {
      "itemCode": ["CL421A", "CL422F"],
      "size": ["A4", "FC"],
      "thickness": ["Punchless clip", "Punchless clip"],
      "packing": ["24/192/Ctn", "24/192/Ctn"],
      "colours": ["Pink", "Green", "Blue", "Orange"]
    },
    "image": "Punchless Clip.jpeg",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 11,
    "name": "Spring Clip Files",
    "desc": "Premium Spring Clip Files",
    "description": "",
    "specs": {
      "itemCode": ["CL431A", "CL432F"],
      "size": ["A4", "FC"],
      "thickness": ["Spring clip", "Spring clip"],
      "packing": ["24/192/Ctn", "24/192/Ctn"],
      
      "colours": ["Pink", "Green", "Blue", "Orange"]
    },
    "image": "Spring Clip.png",
    "imageClass": "product-image-large",

    "featured": false
  },
  {
    "id": 12,
    "name": "Dual Clip Files",
    "desc": "Premium Dual Clip Files",
    "description": "",
    "specs": {
      "itemCode": ["CL451A", "CL452F"],
      "size": ["A4", "FC"],
      "thickness": ["Long Liver + Viro Clip", "Long Liver + Viro Clip"],
      "packing": ["24/192/Ctn", "24/192/Ctn"],
      
      "colours": ["Pink", "Green", "Blue", "Orange"]
    },
    "image": "dual clip.png",
    "imageClass": "product-image-large",
    "featured": false
  },
  {
    "id": 13,
    "name": "Ring Binders",
    "desc": "Premium Ring Binders",
    "description": "",
    "specs": {
      "itemCode": ["CL820A","CL820F"],
      "size": ["A4", "FC"],
      "thickness": ["1mm", "1mm"],
      "packing": ["50/100/200/Ctn", "50/100/200/Ctn"],
      
      "colours": ["Blue", "Grey"]
    },
    
    "image": "ring binder.png",
    "imageClass": "product-image-large",
    "featured": false
  },
  {
    "id": 14,
    "name": "Ring Binders",
    "desc": "Premium Ring Binders",
    "description": "",
    "specs": {
      "itemCode": ["CL720A","CL720F"],
      "size": ["A4", "FC"],
      "thickness": ["1.1mm", "1.1mm"],
      "packing": ["50/100/200/Ctn", "50/100/200/Ctn"],
      "colours": ["Blue"]
    },
    "image": "ring binder2.png",
    "imageClass": "product-image-large",
    "featured": false
  },
  {
    "id": 15,
    "name": "Ring Binders",
    "desc": "Premium Ring Binders",
    "description": "",
    "specs": {
      "itemCode": ["CL521A","CL522F"],
      "size": ["A4", "FC"],
      "thickness": ["1.2mm", "1.2mm"],
      "packing": ["24/96/Ctn", "24/96/Ctn"],
      "colours": ["Blue", "Pink", "Green", "Orange"]
    },
    "image": "ring binder3.png",
    "imageClass": "product-image-large",
    "featured": false
  },
  {
    "id": 16,
    "name": "Ring Binders",
    "desc": "Premium Ring Binders",
    "description": "",
    "specs": {
      "itemCode": ["CL516A"],
      "size": ["A4"],
      "thickness": ["16mm ‘O’ Ring /0.85mm"],
      "packing": ["24/96/Ctn"],
      "colours": ["Blue", "Pink", "Green", "Orange"]
    },
    "image": "ring binder4.png",
    "imageClass": "product-image-large",
    "featured": false
  },
  
];

var CATEGORY = 'Clip Files Series';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'clip-files-products',
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
