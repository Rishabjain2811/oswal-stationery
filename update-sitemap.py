#!/usr/bin/env python3
"""
Update sitemap.xml to use new static URLs based on Item Codes.
"""

import json
from datetime import datetime
from pathlib import Path

# Load URL mapping
with open(r'c:\Users\Risha\ogsnew\url-mapping.json', 'r', encoding='utf-8') as f:
    url_mapping = json.load(f)

# Category pages (static)
category_pages = [
    'report-cover-files.html',
    'sheet-protectors.html',
    'clip-files.html',
    'clear-books.html',
    'card-holders.html',
    'button-files.html',
    'zipper-bag-series.html',
    'document-bags.html',
    'separators.html',
    'paper-board-files.html',
    'display-files.html',
    'leatherite-executive-bags.html',
    'conference-folders.html',
    'stationery-products.html'
]

# Generate sitemap XML
today = datetime.now().strftime('%Y-%m-%d')

xml_content = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://oswalgiftnstationery.co.in/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://oswalgiftnstationery.co.in/index.html</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
'''.format(today=today)

# Add category pages
for category in category_pages:
    xml_content += f'''  <url>
    <loc>https://oswalgiftnstationery.co.in/{category}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
'''

# Add product pages with new static URLs
for key, url_info in url_mapping.items():
    static_url = url_info['url']
    xml_content += f'''  <url>
    <loc>https://oswalgiftnstationery.co.in/{static_url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
'''

xml_content += '</urlset>'

# Write sitemap
sitemap_path = Path(r'c:\Users\Risha\ogsnew') / 'sitemap.xml'
with open(sitemap_path, 'w', encoding='utf-8') as f:
    f.write(xml_content)

print(f"Sitemap updated with {len(url_mapping)} product URLs")
print(f"Total URLs in sitemap: {len(url_mapping) + len(category_pages) + 2}")
 
