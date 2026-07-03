const categoryProducts = [
  {
    "id": 40,
    "name": "PP Zipper Bags",
    "desc": "Premium Zipper Bags",
    "description": "",
    "specs": {
      "itemCode": ["CLP53","CLP54","CLP55","CLP56","CLP57"],
      "size": ["B6","A5","B5","A4","B4"],
      "thickness": ["","","0.18mm , Matte Texture , P.P Material. (For All)","",""],
      "packing": ["480/1920/Ctn","480/960/Ctn","480/960/Ctn","240/480/Ctn","240/480/Ctn"],
      "colours": ["Blue","Clear","Pink","Yellow","Green"]
    },
    "image": "CLP53.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 41,
    "name": "PVC Clear Zipper Bags",
    "desc": "Premium PVC Clear Zipper Bags",
    "description": "",
    "specs": {
      "itemCode": ["CLF53","CLF54","CLF55","CLF56","CLF57"],
      "size": ["B6","A5","B5","A4","B4"],
      "thickness": ["","","0.17mm, Clear PVC Material. (For All)","",""],
      "packing": ["480/1920/Ctn","480/960/Ctn","480/960/Ctn","300/600/Ctn","240/480/Ctn"],
      "colours": ["Clear"]
    },
    "image": "CLF53.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 42,
    "name": "Satin Zipper Bags",
    "desc": "Premium Satin Zipper Bags",
    "description": "",
    "specs": {
      "itemCode": ["","","Satin  Zipper  Bag","","",""],
      "size": ["B6","A5","B5","A4","B4","A3"],
      "thickness": ["","","Net Partition, Chain Zip Runner , Satin Finished Material. (For All)","","",""],
      "packing": ["//Ctn","//Ctn","//Ctn","//Ctn","//Ctn"],
      "colours": ["Green","Orange","Blue","Pink","Red","Yellow"]
    },
    "image": "Satin.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 43,
    "name": "Mesh Zipper Bags",
    "desc": "Premium Mesh Zipper Bags",
    "description": "",
    "specs": {
      "itemCode": ["","","Mesh  Zipper  Bag","",""],
      "size": ["B6","A5","B5","A4","B4"],
      "thickness": ["","", "Chain Zip Runner , Mesh Texture. (For All)","",""],
      "packing": ["300/1200/Ctn","240/960/Ctn","240/960/Ctn","180/720/Ctn","180/540/Ctn"],
      "colours": ["Green","Blue","Red","Yellow","Clear"]
    },
    "image": "Mesh.png",
    "imageClass": "product-image-large",
    "featured": true
  },
];

var CATEGORY = 'Zipper Bag Series';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'zipper-bag-series-products',
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
