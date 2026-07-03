import os

new_css = """
/* Premium Minimalist Theme (Vercel/Linear Inspired) */

/* Base Reset & Variables */
:root {
  /* Ultra-high contrast BW scale */
  --bg-main: #ffffff;
  --bg-soft: #f8fafc;        /* slate-50 */
  --bg-mute: #f1f5f9;        /* slate-100 */
  --bg-border: #e2e8f0;      /* slate-200 */
  
  --text-main: #020617;      /* slate-950 */
  --text-muted: #475569;     /* slate-600 */
  --text-subtle: #94a3b8;    /* slate-400 */
  
  /* Precision Blue Accents */
  --accent-blue-subtle: #eff6ff;
  --accent-blue-main: #2563eb;
  --accent-blue-hover: #1d4ed8;

  /* Other Accents */
  --accent-green: #10b981;
  --accent-red: #ef4444;

  /* Structural Geometry */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Buttery Smooth Animation Curves */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  
  /* Elevating Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.03);
  --shadow-float: 0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
  --shadow-glow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: var(--bg-main);
  color: var(--text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Outfit', 'Inter', system-ui, sans-serif;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-main);
}

a {
  text-decoration: none;
  color: inherit;
}

/* Base Interactions & Animations */
@keyframes fadeY {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

section, .hero-section, .product-card, .category-card {
  animation: fadeY 0.8s var(--ease-out) both;
}

/* -------------------------------------
   NAVIGATION BAR
   ------------------------------------- */

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  position: sticky;
  top: 0;
  z-index: 50;
  transition: all 0.3s var(--ease-out);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-img {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  object-fit: contain;
}

.brand {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  color: var(--text-main);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.2s var(--ease-out);
}

.nav-links a:hover, 
.nav-links a:focus,
.nav-links a.active {
  color: var(--text-main);
}

/* Dropdown styling */
.navbar .dropdown {
  position: relative;
}

.navbar .dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: var(--bg-main);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 0.5rem;
  min-width: 220px;
  list-style: none;
  z-index: 100;
  opacity: 0;
  transition: opacity 0.2s var(--ease-out), transform 0.2s var(--ease-out);
}

.navbar .dropdown:hover .dropdown-menu,
.navbar .dropdown:focus-within .dropdown-menu {
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.dropdown-toggle::after {
  content: "▾";
  margin-left: 4px;
  font-size: 0.8em;
  opacity: 0.5;
}

.dropdown-menu li a {
  display: block;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  transition: background 0.15s, color 0.15s;
}

.dropdown-menu li a:hover {
  background: var(--bg-soft);
  color: var(--accent-blue-main);
}

/* Cart Badge specifically */
.cart-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-soft);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--bg-border);
  transition: all 0.2s var(--ease-out);
}

.cart-link:hover {
  background: var(--accent-blue-subtle);
  border-color: var(--accent-blue-subtle);
  color: var(--accent-blue-main);
}

#cart-count {
  font-weight: 600;
  color: var(--accent-blue-main);
}


/* -------------------------------------
   HERO / TYPOGRAPHY PANELS
   ------------------------------------- */

.hero-section {
  padding: 6rem 2rem 5rem 2rem;
  text-align: center;
  background: var(--bg-main);
  border-bottom: 1px solid var(--bg-border);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(180deg, var(--text-main) 0%, var(--text-muted) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-tagline {
  font-size: 1.2rem;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  text-align: center;
  color: var(--text-muted);
  margin-bottom: 3rem;
}


/* -------------------------------------
   GRID SYSTEMS & CARDS
   ------------------------------------- */

.featured-section, 
.products-section, 
.about-section, 
.testimonials-section, 
.contact-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
}

.products-section {
    background: var(--bg-soft);
    border-radius: var(--radius-xl);
    margin: 3rem auto;
}

.category-cards-grid, 
.products-grid,
#featured-products,
#product-categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
}

/* Category Card Styling (Geometric & Crisp) */
.category-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-main);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: all 0.3s var(--ease-out);
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(37, 99, 235, 0.2);
}

.category-img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  background: var(--bg-soft);
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0,0,0,0.02);
  transition: transform 0.5s var(--ease-out);
}

.category-card:hover .category-img {
  transform: scale(1.02);
}

.category-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.category-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* Product Card Styling */
.product-card {
  background: var(--bg-main);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s var(--ease-out);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-float);
  border-color: rgba(37, 99, 235, 0.3);
}

.product-image {
  width: 160px;
  height: 160px;
  object-fit: contain;
  margin-bottom: 1.5rem;
  transition: transform 0.5s var(--ease-out);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
}

.product-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

/* Quantity Adjuster */
.quantity-group {
  display: flex;
  align-items: center;
  background: var(--bg-soft);
  border-radius: var(--radius-md);
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid var(--bg-border);
}

.quantity-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: var(--text-muted);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.quantity-btn:hover {
  background: var(--bg-border);
  color: var(--text-main);
}

.quantity-input {
  width: 40px;
  text-align: center;
  border: none;
  background: transparent;
  font-weight: 500;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-main);
}
.quantity-input:focus {
  outline: none;
}


/* -------------------------------------
   BUTTONS (Linear Style)
   ------------------------------------- */

.cta-btn, .add-to-cart {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  font-weight: 500;
  color: white;
  background: var(--text-main);
  border: 1px solid var(--text-main);
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  box-shadow: var(--shadow-md);
  text-decoration: none;
  width: 100%;
}

.cta-btn:hover, .add-to-cart:hover {
  background: var(--text-muted);
  border-color: var(--text-muted);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.cta-btn:active, .add-to-cart:active {
  transform: translateY(1px);
  box-shadow: var(--shadow-sm);
}

.hero-content .cta-btn {
  width: auto;
  background: var(--bg-main);
  color: var(--text-main);
  border: 1px solid var(--bg-border);
  margin-bottom: 2rem;
  box-shadow: var(--shadow-sm);
}
.hero-content .cta-btn:hover {
  background: var(--bg-mute);
  border-color: var(--text-subtle);
}


/* -------------------------------------
   CART SECTION & NOTIFICATIONS
   ------------------------------------- */

.cart-section {
  max-width: 800px;
  margin: 4rem auto;
  padding: 3rem;
  background: var(--bg-main);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

#cart-items {
  margin-bottom: 2rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--bg-border);
  overflow: hidden;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--bg-border);
  background: var(--bg-main);
  transition: background 0.2s;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item:hover {
  background: var(--bg-soft);
}

.cart-item-title {
  font-weight: 500;
  flex: 1;
}

.cart-item-qty {
  font-family: monospace;
  color: var(--text-muted);
  margin: 0 1rem;
}

.cart-item-remove {
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-red);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.cart-item-remove:hover {
  background: var(--accent-red);
  color: white;
}

#send-whatsapp {
  background: var(--accent-green);
  border-color: var(--accent-green);
}

#send-whatsapp:hover {
  background: #0ea5e9; /* a sleek teal/blue */
  border-color: #0ea5e9;
}

/* Toast Notifications */
.cart-notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--text-main);
  color: var(--bg-main);
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-float);
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 9999;
  transform: translateY(150%);
  opacity: 0;
  transition: all 0.4s var(--ease-out);
}

.cart-notification.show {
  transform: translateY(0);
  opacity: 1;
}

/* -------------------------------------
   ABOUT, TESTIMONIALS & CONTACT
   ------------------------------------- */

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
}

.about-main h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.about-main p {
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.highlight-item {
  display: flex;
  gap: 1.2rem;
  padding: 1.5rem;
  background: var(--bg-soft);
  border-radius: var(--radius-lg);
  border: 1px solid var(--bg-border);
  margin-bottom: 1rem;
  transition: transform 0.2s;
}

.highlight-item:hover {
  transform: translateX(4px);
  border-color: var(--accent-blue-subtle);
}

.highlight-icon {
  font-size: 1.5rem;
  background: var(--bg-main);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  color: var(--accent-blue-main);
}

/* Testimonials */
.testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  padding: 2.5rem 2rem;
  background: var(--bg-main);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  position: relative;
}

.testimonial-card::before {
  content: '"';
  font-family: 'Outfit', sans-serif;
  font-size: 6rem;
  color: var(--bg-border);
  position: absolute;
  top: -1rem;
  left: 1.5rem;
  z-index: 0;
  opacity: 0.5;
}

.testimonial-card p {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.8;
}

.testimonial-card span {
  display: block;
  margin-top: 1.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-main);
}

/* Contact */
.contact-form {
  max-width: 500px;
  margin: 0 auto 3rem auto;
  background: var(--bg-main);
  padding: 2.5rem;
  border-radius: var(--radius-xl);
  border: 1px solid var(--bg-border);
  box-shadow: var(--shadow-lg);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
}

.form-group input, 
.form-group textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  background: var(--bg-soft);
  border: 1px solid var(--bg-border);
  border-radius: var(--radius-md);
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-main);
  transition: all 0.2s;
}

.form-group input:focus, 
.form-group textarea:focus {
  outline: none;
  background: var(--bg-main);
  border-color: var(--accent-blue-main);
  box-shadow: var(--shadow-glow);
}

.contact-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
.contact-details p {
  font-size: 0.95rem;
  color: var(--text-muted);
}
.contact-details strong {
  color: var(--text-main);
}

/* Footer */
footer {
  text-align: center;
  padding: 3rem 1rem;
  border-top: 1px solid var(--bg-border);
  color: var(--text-subtle);
  font-size: 0.9rem;
}

/* -------------------------------------
   RESPONSIVE OVERRIDES
   ------------------------------------- */

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1.5rem 3rem 1.5rem;
  }
  
  .navbar {
    flex-wrap: wrap;
    padding: 1rem 1.5rem;
  }
  
  .nav-links {
    margin-top: 1rem;
    width: 100%;
    justify-content: space-between;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    gap: 1rem;
  }
  
  .dropdown-menu {
    position: fixed;
    top: auto;
    left: 1rem;
    right: 1rem;
    width: auto;
  }
}
"""

with open('c:/Users/Risha/ogsnew/styles.css', 'w', encoding='utf-8') as f:
    f.write(new_css)

print("styles.css completely rewritten.")
