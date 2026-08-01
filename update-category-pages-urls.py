#!/usr/bin/env python3
"""
Update category page ItemList URLs to use new static URLs based on Item Codes.
"""

import re
import json
from pathlib import Path

# Load URL mapping
with open(r'c:\Users\Risha\ogsnew\url-mapping.json', 'r', encoding='utf-8') as f:
    url_mapping = json.load(f)

# Category files to update
CATEGORY_FILES = [
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

# Update each category file
for category_file in CATEGORY_FILES:
    file_path = Path(r'c:\Users\Risha\ogsnew') / category_file
    if not file_path.exists():
        print(f"Skipping: {category_file} (not found)")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all current dynamic URLs in ItemList
    # Pattern: product.html?page=category.html&id=X
    pattern = r'https://oswalgiftnstationery\.co\.in/product\.html\?page=([^&]+)&id=(\d+)'
    
    def replace_url(match):
        page = match.group(1)
        product_id = match.group(2)
        key = f"{page}::{product_id}"
        
        if key in url_mapping:
            static_url = url_mapping[key]['url']
            return f'https://oswalgiftnstationery.co.in/{static_url}'
        
        return match.group(0)
    
    new_content = re.sub(pattern, replace_url, content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {category_file}")
    else:
        print(f"No changes: {category_file}")

print("\nCategory pages updated successfully!")
 
