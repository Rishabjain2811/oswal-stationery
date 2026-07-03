const categoryProducts = [
  {
    "id": 14,
    "name": "Display Book",
    "desc": "Premium CL10 \u2013 A4/FC \u2013 10 Pocket Display Book",
    "description": "",
    "specs": {
      "itemCode": ["CL10A","CL20A","CL30A","CL40A","CL60A","CL80A","CL100A"],
      "size": ["A4","A4","A4","A4","A4","A4","A4"],
      "thickness": ["10 Pocket","20 Pocket","30 Pocket","40 Pocket","60 Pocket","80 Pocket","100 Pocket"],
      "packing": ["24/96/Ctn","12/144/Ctn","12/120/Ctn","12/96/Ctn","12/72/Ctn","6/24/Ctn","6/24/Ctn"],
      "colours": ["Blue", "Pink", "Green", "Orange"]
    },
    "image": "Display book.jpeg",
    "imageClass": "product-image-large",
    "featured": false
  },
  {
    "id": 15,
    "name": "Display Book",
    "desc": "Premium CL10 \u2013 A4/FC \u2013 10 Pocket Display Book",
    "description": "",
    "specs": {
      "itemCode": ["CL10F","CL20F","CL30F","CL40F","CL60F","CL80F","CL100F"],
      "size": ["FC","FC","FC","FC","FC","FC","FC"],
      "thickness": ["10 Pocket","20 Pocket","30 Pocket","40 Pocket","60 Pocket","80 Pocket","100 Pocket"],
      "packing": ["24/96/Ctn","12/144/Ctn","12/120/Ctn","12/96/Ctn","12/72/Ctn","6/24/Ctn","6/24/Ctn"],
      "colours": ["Blue", "Pink", "Green", "Orange"]
    },
    "image": "Display book.jpeg",
    "imageClass": "product-image-large",
    "featured": false
  },
  {
    "id": 16,
    "name": "B4 Certificate File",
    "desc": "Premium Certificate files",
    "description": "",
    "specs": {
      "itemCode": ["CL772"],
      "size": ["B4"],
      "thickness": ["20 Display Pocket"],
      "packing": ["50/100/Ctn"],
      "colours": ["Blue"]
    },
    "image": "B4.png",
    "imageClass": "product-image-large",
    "featured": true
  },
  {
    "id": 17,
    "name": "A3 Designer Display Book",
    "desc": "Premium designer display books",
    "description": "",
    "specs": {
      "itemCode": ["CL10","CL20","CL30","CL40"],
      "size": ["A3","A3","A3","A3"],
      "thickness": ["10 Pocket","20 Pocket","30 Pocket","40 Pocket"],
      "packing": ["24/96/Ctn","12/72/Ctn","12/72/Ctn","12/48/Ctn"],
      "colours": ["Blue", "Red", "Grey"]
    },
    "image": "A3 Designer book.png",
    "imageClass": "product-image-large",
    "featured": false
  },
  {
    "id": 18,
    "name": "Full Scape PP Display File Zip Closure",
    "desc": "Premium full scape display file",
    "description": "",
    "specs": {
      "itemCode": ["CF10","CF20","CF30","CF40"],
      "size": ["FC","FC","FC","FC"],
      "thickness": ["10 Pocket","20 Pocket","30 Pocket","40 Pocket"],
      "packing": ["25/100/Ctn","25/100/Ctn","25/100/Ctn","25/100/Ctn"],
      "colours": ["Blue"]
    },
    "image": "full scape PP.png",
    "imageClass": "product-image-large",
    "featured": false
  },
  {
    "id": 19,
    "name": "B4 PP Display File Zip Closure",
    "desc": "Premium B4 display file",
    "description": "",
    "specs": {
      "itemCode": ["CF10","CF20","CF30","CF40"],
      "size": ["B4","B4","B4","B4"],
      "thickness": ["10 Pocket","20 Pocket","30 Pocket","40 Pocket"],
      "packing": ["25/100/Ctn","25/100/Ctn","25/100/Ctn","25/100/Ctn"],
      "colours": ["Blue"]
    },
    "image": "B4 PP.png",
    "imageClass": "product-image-large",
    "featured": false
  }
  
];

var CATEGORY = 'Clear Books Series';

function renderProducts() {
  OswalCategoryPage.renderProductCards({
    containerId: 'clear-books-products',
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
