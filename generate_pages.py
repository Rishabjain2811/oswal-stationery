import json
import os
import re

nav_html = """  <nav class="navbar minimalist-nav">
    <div class="nav-logo">
      <img src="colors logo.jpg" alt="OSWAL Logo" class="logo-img" />
      <span class="brand">OSWAL GIFT N STATIONERY</span>
    </div>
    <ul class="nav-links">
      <li><a href="index.html#home">Home</a></li>
      <li><a href="index.html#featured">Featured</a></li>
      <li class="dropdown">
        <a href="index.html#products" class="dropdown-toggle">Products</a>
        <ul class="dropdown-menu">
          <li><a href="report-cover-files.html">Report Cover Files</a></li>
          <li><a href="sheet-protectors.html">Sheet Protectors</a></li>
          <li><a href="clip-files.html">Clip Files Series</a></li>
          <li><a href="clear-books.html">Clear Books Series</a></li>
          <li><a href="card-holders.html">Visiting Card Holders Series</a></li>
          <li><a href="button-files.html">Button Bags Series</a></li>
          <li><a href="zipper-bag-series.html">Zipper Bag Series</a></li>
          <li><a href="document-bags.html">Document Bags / Expanding Files Series</a></li>
          <li><a href="separators.html">Index / Separators</a></li>
          <li><a href="paper-board-files.html">Paper Board Files Series</a></li>
          <li><a href="display-files.html">Display Solution Products Series</a></li>
          <li><a href="leatherite-executive-bags.html">Leatherite Executive Bags Series</a></li>
          <li><a href="conference-folders.html">PP &amp; Leatherite Conference Files / Hotel Files</a></li>
          <li><a href="stationery-products.html">Stationery Products</a></li>
        </ul>
      </li>
      <li><a href="index.html#about">About</a></li>
      <li><a href="index.html#testimonials">Testimonials</a></li>
      <li><a href="index.html#contact">Contact</a></li>
      <li><a href="links.html">Links</a></li>
      <li><a href="cart.html" class="cart-link"><span class="cart-icon">🛒</span><span id="cart-count">0</span></a></li>
    </ul>
  </nav>"""

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | OSWAL GIFT N STATIONERY</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
{nav}
  <header class="hero-section" id="{id}-hero">
    <div class="hero-content">
      <a href="index.html#products" class="cta-btn">← Back to All Products</a>
      <h1 class="hero-title">{title}</h1>
      <p class="hero-tagline">Explore our range of {title}.</p>
    </div>
  </header>
  <main>
    <section class="products-section" id="{id}-products-section">
      <h2 class="section-title">{title}</h2>
      <div id="{id}-products" class="products-grid"><!-- Rendered by {id}.js --></div>
    </section>
  </main>
  <footer>
    <p class="footer-copy">&copy; 2024 OSWAL GIFT N STATIONERY</p>
  </footer>
  <script src="js/cart-store.js"></script>
  <script src="js/cart-badge.js"></script>
  <script src="js/search-index.js"></script>
  <script src="js/nav-search.js"></script>
  <script src="{id}.js"></script>
</body>
</html>"""

js_template = """const categoryProducts = {products};

var CATEGORY = '{title}';

function renderProducts() {{
  const container = document.getElementById('{id}-products');
  if (!container) return;
  container.innerHTML = categoryProducts.map(product => `
    <div class="product-card">
      <img src="${{product.image}}" alt="${{product.name}}" class="product-image" />
      <div class="product-title">${{product.name}}</div>
      <div class="product-desc">${{product.desc}}</div>
      <div class="quantity-group">
        <button class="quantity-btn" data-action="decrease" data-id="${{product.id}}">-</button>
        <input type="number" class="quantity-input" min="1" value="1" data-id="${{product.id}}" />
        <button class="quantity-btn" data-action="increase" data-id="${{product.id}}">+</button>
      </div>
      <button class="add-to-cart" data-id="${{product.id}}">Add to Cart</button>
    </div>
  `).join('');
  categoryProducts.forEach(product => {{
    const id = product.id;
    const input = container.querySelector(`.quantity-input[data-id="${{id}}"]`);
    container.querySelector(`.quantity-btn[data-action="decrease"][data-id="${{id}}"]`).addEventListener('click', () => {{
      let val = parseInt(input.value) || 1;
      if (val > 1) val--;
      input.value = val;
    }});
    container.querySelector(`.quantity-btn[data-action="increase"][data-id="${{id}}"]`).addEventListener('click', () => {{
      let val = parseInt(input.value) || 1;
      val++;
      input.value = val;
    }});
    input.addEventListener('input', function() {{
      if (parseInt(this.value) < 1 || isNaN(parseInt(this.value))) this.value = 1;
    }});
    container.querySelector(`.add-to-cart[data-id="${{id}}"]`).addEventListener('click', () => {{
      const qty = parseInt(input.value) || 1;
      addToCart(product, qty);
    }});
  }});
}}

const cartLink = document.querySelector('.cart-link');
if(cartLink) {{
    cartLink.addEventListener('click', function(e) {{
      e.preventDefault();
      window.location.href = 'cart.html';
    }});
}}

function setActiveNavLink() {{
  const links = document.querySelectorAll('.nav-links a');
  const fromTop = window.scrollY + 80;
  links.forEach(link => {{
    const section = document.querySelector(link.hash);
    if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {{
      link.classList.add('active');
    }} else {{
      link.classList.remove('active');
    }}
  }});
}}
window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

function revealOnScroll() {{
  const reveals = document.querySelectorAll('section, .product-card');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {{
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 60) {{
      el.style.opacity = 1;
      el.style.transform = 'none';
    }}
  }});
}}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

renderProducts();
"""

categories = [
    {
        "id": "report-cover-files",
        "title": "Report Cover Files",
        "products": ["Stick Files", "L Folder", "Report File", "Flat File", "Swing Grip File", "Slide Bar File", "Rigid Files"]
    },
    {
        "id": "sheet-protectors",
        "title": "Sheet Protectors",
        "products": ["Sheet Protectors", "10 Cards Sheet Protector"]
    },
    {
        "id": "clip-files",
        "title": "Clip Files Series",
        "products": ["Punchless Clip Files", "Spring Clip Files", "Ring Binders", "Dual Clip Files"]
    },
    {
        "id": "clear-books",
        "title": "Clear Books Series",
        "products": [
            "CL10 – A4/FC – 10 Pocket Display Book", "CL20 – A4/FC – 20 Pocket Display Book", "CL30 – A4/FC – 30 Pocket Display Book", 
            "CL40 – A4/FC – 40 Pocket Display Book", "CL60 – A4/FC – 60 Pocket Display Book", "CL80 – A4/FC – 80 Pocket Display Book with Transparent Case", 
            "CL100 – A4/FC – 100 Pocket Display Book with Transparent Case", "CL772 – B4 – 20 Display Pockets", 
            "CL10 – A3 – 10 Display Pockets", "CL20 – A3 – 20 Display Pockets", "CL30 – A3 – 30 Display Pockets", "CL40 – A3 – 40 Display Pockets", 
            "CL-CF10 – B4/FC – Display File Zip Closure", "CL-CF20 – B4 – Display File Zip Closure", "CL-CF30 – B4 – Display File Zip Closure", "CL-CF40 – B4 – Display File Zip Closure"
        ]
    },
    {
        "id": "card-holders",
        "title": "Visiting Card Holders Series",
        "products": ["CL40K", "CL120K", "CL240K", "CL480K", "CL600 Cards Album"]
    },
    {
        "id": "button-files",
        "title": "Button Bags Series",
        "products": [
            "Stitched Button Bags (CL303CHQ, CL503A3, CL603F, CL703FT, CL803F, CL903F, CL605F, IKON603 ECO)", 
            "Envelope Bags (C114F, CL119F)", 
            "Printed Button Bags (CL801, CL802, CL804F, CL805F, CL1000F, CL1027F, CL1032F, CL1034F, CL1041F, CL1042F, CL1043F, CL1044F, CL2000F, CL2001F, CL2002F, CL2003F, CL2004F, CL2005F, CL2029F, CL2030F, CL2401F, CL2402F, CL3000F, CL3020F, CL3021F, CL3022F, CL3026F, CL4000F, CL5000F)", 
            "Double Pocket Bags (CL211F, CL212F, CL236F)", "Premium Button Bags (CL402F, CL408F, CL410)"
        ]
    },
    {
        "id": "zipper-bag-series",
        "title": "Zipper Bag Series",
        "products": [
            "PP Zipper Bags (CLP53, CLP54, CLP55, CLP56, CLP57)", 
            "PVC Clear Zipper Bags", "Satin Zipper Bags", "Mesh Zipper Bags"
        ]
    },
    {
        "id": "document-bags",
        "title": "Document Bags / Expanding Files Series",
        "products": [
            "Expanding Files (CL813F, CL1212F, CL8821, CL8065F, CL6016F, CL6018, CL6026F, CL6028F)", 
            "Expanding Wallets (CL8057A, CL8071A, CL816A)", "Cheque Book Expanding Bags (CL4406, CL4409)", "Document Cases (CL812F, Stylo DC A4/FC)"
        ]
    },
    {
        "id": "separators",
        "title": "Index / Separators",
        "products": [
            "PP Colour Separators with Index Tabs (CL010)", 
            "PP White Index (1–5, 1–10, 1–12, 1–15, 1–20, 1–31, A–Z)"
        ]
    },
    {
        "id": "paper-board-files",
        "title": "Paper Board Files Series",
        "products": ["Double Side PP Coated Lever Arch Clip File (CL556F)", "PP Printed Board Lamination Ring Binder (CL309A, CL309F)", "PP Printed Board Lamination Long Lever Clip File (CL308A, CL308F)"]
    },
    {
        "id": "display-files",
        "title": "Display Solution Products Series",
        "products": [
            "PVC Clear Card Case (CL201, CL202, CL203, CL204)", "Magnetic Card Case", "Info Folder", "Magnetic Panel Folder", 
            "Wall Unit Bracket with Folders", "Wall Hangers", "Peel and Stick Sheet"
        ]
    },
    {
        "id": "leatherite-executive-bags",
        "title": "Leatherite Executive Bags Series",
        "products": ["Executive Bags with Display Leaves", "Executive Bags with Multifunctional Zip Pad Folio with 2 Ring"]
    },
    {
        "id": "conference-folders",
        "title": "PP & Leatherite Conference Files / Hotel Files",
        "products": [
            "Conference Files (CL9001A)", "Multifunctional Conference Files (CL102A)", 
            "Models (CP24, CP25, CP31, CP37, CP45, CP50(L), CP56, CP66, CP96, CP10, CP100, CP131(L))", "Presentation Files (PP) (CL261A)"
        ]
    },
    {
        "id": "stationery-products",
        "title": "Stationery Products",
        "products": ["Single Column Magazine Rack", "Four Column Magazine Rack", "2 Tier Tray", "3 Tier Tray", "Document Case"]
    }
]

global_id = 1
script_products_data = []

for cat in categories:
    cat_id = cat["id"]
    cat_title = cat["title"]
    cat_products_list = []
    
    for product_name in cat["products"]:
        p = {
            "id": global_id,
            "name": product_name,
            "desc": "Premium " + product_name,
            "image": "CL1027F.jpg",
            "featured": False
        }
        cat_products_list.append(p)
        global_id += 1
        
    if cat_products_list:
        cat_products_list[0]["featured"] = True

    # write HTML
    html_content = html_template.format(nav=nav_html, id=cat_id, title=cat_title)
    with open(f"c:/Users/Risha/ogsnew/{cat_id}.html", "w", encoding="utf-8") as f:
        f.write(html_content)
        
    # write JS
    js_content = js_template.format(id=cat_id, title=cat_title, products=json.dumps(cat_products_list, indent=2))
    with open(f"c:/Users/Risha/ogsnew/{cat_id}.js", "w", encoding="utf-8") as f:
        f.write(js_content)
        
    script_products_data.append({
        "name": cat_title,
        "products": cat_products_list
    })

# Now patch script.js
script_js_path = "c:/Users/Risha/ogsnew/script.js"
with open(script_js_path, "r", encoding="utf-8") as f:
    script_content = f.read()

# Replace productCategories array
# Find the start and end of productCategories variable
start_idx = script_content.find("const productCategories = [")
end_idx = script_content.find("];\n\n// — Cart:")
if end_idx == -1:
    end_idx = script_content.find("];\n")

if start_idx != -1 and end_idx != -1:
    new_script_content = script_content[:start_idx] + "const productCategories = " + json.dumps(script_products_data, indent=2) + script_content[end_idx+1:]
    with open(script_js_path, "w", encoding="utf-8") as f:
        f.write(new_script_content)
else:
    print("Could not find productCategories in script.js")

print("Generated all files successfully.")
