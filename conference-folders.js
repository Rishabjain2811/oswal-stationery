const categoryProducts = [
   {
    "id": 62,
    "name": "Presentation files",
    "desc": "Presentation files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CL261A"],
      "size": ["A4"],
      "thickness": ["Twin Pocket File"],
      "packing": ["5/250/500/Ctn"],
      "colour": "Blue"
    },
    "image": "CL261A.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 63,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CL9001A"],
      "size": ["A4"],
      "thickness": ["Multifunction Conference Files with Button Loop"],
      "packing": ["30/120/Ctn"],
      "colour": "Blue"
    },
    "image": "CL9001A.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 64,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CL102A"],
      "size": ["A4"],
      "thickness": ["Multifunction 5 pkt Expanding File with A4 Pad"],
      "packing": ["30/60/Ctn"],
      "colour": "Blue"
    },
    "image": "CL102A.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 65,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP24"],
      "size": ["A4"],
      "thickness": ["Leatherite File with Button Loop"],
      "packing": ["12/72/Ctn"],
      "colour": "Black"
    },
    "image": "CP24.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 66,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP25"],
      "size": ["A4"],
      "thickness": ["Premium Leatherite File with Button Loop"],
      "packing": ["10/60/Ctn"],
      "colour": "Black"
    },
    "image": "CP25.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 67,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP31"],
      "size": ["A4"],
      "thickness": ["Leatherite File with Zip Closure"],
      "packing": ["10/60/Ctn"],
      "colour": "Black"
    },
    "image": "CP31.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 68,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP37"],
      "size": ["FC"],
      "thickness": ["Leatherite File with Punchless Clip & Zip Closure"],
      "packing": ["10/50/Ctn"],
      "colour": ["Black","Tan"]
    },
    "image": "CP37.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 69,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP45"],
      "size": ["A4"],
      "thickness": ["Leatherite File with 2 Ring & Button Loop"],
      "packing": ["10/50/Ctn"],
      "colour": ["Tan"]
    },
    "image": "CP45.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 70,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP50"],
      "size": ["A4"],
      "thickness": ["Leatherite File with Button Loop"],
      "packing": ["10/60/Ctn"],
      "colour": ["Black","Tan"]
    },
    "image": "CP50.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 71,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP66"],
      "size": ["A4"],
      "thickness": ["Leatherite File D/Colour with Button Loop"],
      "packing": ["10/60/Ctn"],
      "colour": ["Black","Tan"]
    },
    "image": "CP66.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 72,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP10"],
      "size": ["A5"],
      "thickness": ["Leatherite File with Corner Clips"],
      "packing": ["30/150/Ctn"],
      "colour": ["Black"]
    },
    "image": "CP10.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 73,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP96"],
      "size": ["FC"],
      "thickness": ["Leatherite File with 2 Ring , Handle & Zip Closure"],
      "packing": ["6/42/Ctn"],
      "colour": ["Black"]
    },
    "image": "CP96.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 74,
    "name": "Conference Files",
    "desc": "Conference files for A4/FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CP100"],
      "size": ["A5"],
      "thickness": ["Leatherite Hotel Bill File"],
      "packing": ["30/150/Ctn"],
      "colour": ["Black","Tan","Burgundy"]
    },
    "image": "CP100.png",
    "imageClass": "product-image-large",
    "featured": true
  },

];

var CATEGORY = 'PP & Leatherite Conference Files / Hotel Files';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'conference-folders-products',
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
