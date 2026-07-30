const categoryProducts = [
  {
    "id": 1,
    "name": "Strip File A4 ",
    "desc": "Clear strip files for A4 documents.",
    "description": "",
    "specs": {
      "itemCode": ["CL10 (Ikon)", "CL12", "CL22", "CL286"],
      "size": ["A4", "A4", "A4", "A4"],
      "thickness": ["  0.10mm", "  0.12mm", "  0.22mm", "  0.32mm"],
      "packing": ["10/1500/Ctn", "10/1300/Ctn", "10/1000/Ctn", "10/180/720/Ctn"],
      "colour": "Clear"
    },
    "image": "CL10.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 101,
    "name": "Strip File FC",
    "desc": "Clear strip files for FC documents.",
    "description": "",
    "specs": {
      "itemCode": ["CL10 (Ikon)", "CL12", "CL22", "CL286"],
      "size": ["FC", "FC", "FC", "FC"],
      "thickness": ["  0.10mm", "  0.12mm", "  0.22mm", "  0.32mm"],
      "packing": ["10/1500/Ctn", "10/1300/Ctn", "10/1000/Ctn", "10/180/720/Ctn"],
      "colour": "Clear"
    },
    "image": "CL10.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 2,
    "name": "L Folder",
    "desc": "Premium L Folder",
    "description": "",
    "specs": {
      "itemCode": ["CL310", "CL355", "CL310-20"],
      "size": ["A4", "FC", "A4"],
      "thickness": ["0.14mm", "0.14mm", "0.20mm"],
      "packing": ["20/1000/Ctn", "20/1000/Ctn", "20/700/Ctn"],
      "colour": "Clear"
    },
    "image": "CL310.png",
    "imageClass": "product-image-large",
    "featured": false
    
  },
  {
    "id": 3,
    "name": "Report File",
    "desc": "Premium Report File",
    "description": "",
    "image": "CL-RF102.png",
    "imageClass": "product-image-large",
    "featured": false,
    "specs": {
      "itemCode": ["CL-RF102", "CL-RF112"],
      "size": ["A4", "FC"],
      "thickness": ["0.30mm", "0.30mm"],
      "packing": ["10/250/1000/Ctn", "10/250/1000/Ctn"],
      "colour": "Clear"
    }
  },
  {
    "id": 4,
    "name": "Flat File",
    "desc": "Premium Flat File",
    "description": "",
    "image": "CL320A.png",
    "imageClass": "product-image-large",
    "specs": {
      "itemCode": ["CL320A"],
      "size": ["A4"],
      "thickness": ["0.18mm/0.35mm"],
      "packing": ["10/240/480/Ctn"],
      "colour": "Blue",
    },
    "featured": false
  },
  {
    "id": 5,
    "name": "Swing Grip File",
    "desc": "Premium Swing Grip File",
    "description": "",
    "image": "CL331A.png",
    "imageClass": "product-image-large1",
    "specs": {
      "itemCode": ["CL331A"],
      "size": ["A4"],
      "thickness": ["0.35mm"],
      "packing": ["10/60/600/Ctn"],
      "colour": "Clear",
    },
    "featured": false
  },
  {
    "id": 6,
    "name": "Slide Bar File",
    "desc": "Premium Slide Bar File",
    "description": "",
    "image": "Slide Bar.png",
    "imageClass": "product-image-large1",
    "specs": {
      "itemCode": ["CL341A", "CL341F"],
      "size": ["A4","FC"],
      "thickness": ["-","-"],
      "packing": ["10/160/320/Ctn" ,"10/160/320/Ctn"],
      "colour": "Clear",
      "colours": ["Pink", "Blue", "Green", "Orange"]
    },
    "featured": false
  },
  {
    "id": 7,
    "name": "Rigid Files",
    "desc": "Premium Rigid Files",
    "description": "",
    "image": "CL220.png",
    "imageClass": "product-image-large",
    "specs": {
      "itemCode": ["CL220", "CL221", "CL250", "CL251"],
      "size": ["A4", "FC", "A4", "FC"],
      "thickness": ["Clear/Rigid", "Clear/Rigid", "Clear/Rigid", "Clear/Rigid"],
      "packing": ["10/200/800/Ctn", "10/200/800/Ctn","10/200/800/Ctn", "10/200/800/Ctn"],
      "colour": "Blue",
    },
    "featured": false
  }
];

var CATEGORY = 'Report Cover Files';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'report-cover-files-products',
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
