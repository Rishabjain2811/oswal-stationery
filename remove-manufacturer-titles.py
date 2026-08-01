#!/usr/bin/env python3
"""
Remove the word 'manufacturer' from all category page titles.
"""

import re
from pathlib import Path

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
    
    # Remove 'manufacturer' from title
    # Pattern: <title>...manufacturer...</title>
    title_pattern = r'<title>([^<]*manufacturer[^<]*)</title>'
    
    def remove_manufacturer(match):
        title = match.group(1)
        new_title = title.replace('manufacturer', '').replace('Manufacturer', '')
        # Clean up double spaces
        new_title = re.sub(r'\s+', ' ', new_title).strip()
        return f'<title>{new_title}</title>'
    
    new_content = re.sub(title_pattern, remove_manufacturer, content, flags=re.IGNORECASE)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {category_file}")
    else:
        print(f"No 'manufacturer' found in title: {category_file}")

print("\nCategory page titles updated successfully!")
