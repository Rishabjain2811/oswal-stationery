import os

css_path = 'c:/Users/Risha/ogsnew/styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Colors Setup (Slate + Clean Blue focus)
# Replace root variables entirely
root_old = """:root {
  --bg-white: #FFFFFF;
  --accent-gray: #F5F5F5;
  --accent-beige: #EDEDED;
  --accent-coolgray: #E0E0E0;
  --text-dark: #333333;
  --text-secondary: #666666;
  --highlight-sage: #D2E3C8;
  --highlight-blush: #EAD9D3;
  --highlight-blue: #CADBE9;
  --cta-navy: #5D6A7B;
  --cta-olive: #758E67;
  --bold-blue: #2B4C7E;
  --bold-coral: #FF6B6B;
  --bold-green: #3CB371;
}"""

root_new = """:root {
  --bg-white: #FFFFFF;
  --accent-gray: #F8FAFC;
  --accent-beige: #F1F5F9;
  --accent-coolgray: #E2E8F0;
  --text-dark: #0F172A;
  --text-secondary: #475569;
  --highlight-sage: #F8FAFC;
  --highlight-blush: #F8FAFC;
  --highlight-blue: #EFF6FF;
  --cta-navy: #0F172A;
  --cta-olive: #334155;
  --bold-blue: #2563EB;
  --bold-coral: #3B82F6;
  --bold-green: #10B981;
}"""
css = css.replace(root_old, root_new)

# 2. Fonts
css = css.replace("'Montserrat'", "'Outfit'")

# 3. Animations
css = css.replace("cubic-bezier(.77,0,.18,1)", "cubic-bezier(0.16, 1, 0.3, 1)")
css = css.replace("box-shadow: 0 4px 24px rgba(43,76,126,0.08)", "box-shadow: 0 8px 30px rgba(0,0,0,0.04)")
css = css.replace("box-shadow: 0 2px 16px rgba(43,76,126,0.08)", "box-shadow: 0 4px 20px rgba(0,0,0,0.03)")
css = css.replace("box-shadow: 0 2px 12px rgba(90,110,130,0.07)", "box-shadow: 0 4px 15px rgba(0,0,0,0.03)")
css = css.replace("box-shadow: 0 2px 16px rgba(90,110,130,0.04)", "box-shadow: 0 4px 20px rgba(0,0,0,0.03)")
css = css.replace("box-shadow: 0 8px 32px rgba(43,76,126,0.13)", "box-shadow: 0 10px 40px rgba(0,0,0,0.06)")
css = css.replace("box-shadow: 0 6px 32px rgba(43,76,126,0.13)", "box-shadow: 0 10px 40px rgba(0,0,0,0.06)")

# 4. Navbar Glassmorphism
navbar_old = """.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-white);
  padding: 1.2rem 2rem;
  border-bottom: 1px solid var(--accent-beige);
  position: sticky;
  top: 0;
  z-index: 10;
  font-family: 'Montserrat', 'Inter', Arial, sans-serif;
}"""
navbar_new = """.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.2rem 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  position: sticky;
  top: 0;
  z-index: 10;
  font-family: 'Outfit', 'Inter', Arial, sans-serif;
}"""
css = css.replace(navbar_old, navbar_new)

# Apply global css modifications
with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

# Update HTML headers in index.html & generate_pages.py
old_font = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@700&display=swap" rel="stylesheet">'
new_font = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">'

html_path = 'c:/Users/Risha/ogsnew/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()
html = html.replace(old_font, new_font)
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

gen_path = 'c:/Users/Risha/ogsnew/generate_pages.py'
with open(gen_path, 'r', encoding='utf-8') as f:
    gen = f.read()
gen = gen.replace(old_font, new_font)
with open(gen_path, 'w', encoding='utf-8') as f:
    f.write(gen)

print("Upgraded styles successfully.")
