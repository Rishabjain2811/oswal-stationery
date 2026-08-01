#!/usr/bin/env python3
"""
Analyze all products to identify duplicate Item Codes.
"""

import re
import json
from pathlib import Path
from collections import defaultdict

# Category files mapping
CATEGORY_FILES = {
    'report-cover-files.js': ('report-cover-files.html', 'Report Cover Files'),
    'sheet-protectors.js': ('sheet-protectors.html', 'Sheet Protectors'),
    'clip-files.js': ('clip-files.html', 'Clip Files'),
    'clear-books.js': ('clear-books.html', 'Clear Books'),
    'card-holders.js': ('card-holders.html', 'Card Holders'),
    'button-files.js': ('button-files.html', 'Button Bags'),
    'zipper-bag-series.js': ('zipper-bag-series.html', 'Zipper Bag Series'),
    'document-bags.js': ('document-bags.html', 'Document Bags'),
    'separators.js': ('separators.html', 'Separators'),
    'paper-board-files.js': ('paper-board-files.html', 'Paper Board Files'),
    'display-files.js': ('display-files.html', 'Display Files'),
    'leatherite-executive-bags.js': ('leatherite-executive-bags.html', 'Leatherite Executive Bags'),
    'conference-folders.js': ('conference-folders.html', 'Conference Folders'),
    'stationery-products.js': ('stationery-products.html', 'Stationery Products')
}

# Parse products from JS files
def parse_products(content):
    pattern = r'\{\s*"id":\s*(\d+),\s*"name":\s*"([^"]+)",\s*"desc":\s*"([^"]*)",\s*"description":\s*"([^"]*)",\s*"specs":\s*\{([^}]+)\},\s*"image":\s*"([^"]+)",\s*"imageClass":\s*"([^"]+)"\s*(?:,\s*"featured":\s*(true|false)\s*)?\}'
    matches = re.findall(pattern, content, re.DOTALL)
    products = []
    for match in matches:
        products.append({
            'id': int(match[0]),
            'name': match[1],
            'desc': match[2],
            'description': match[3],
            'specs_block': match[4],
            'image': match[5],
            'imageClass': match[6]
        })
    return products

# Extract item codes from specs block
def extract_item_codes(specs_block):
    pattern = r'"itemCode":\s*\[([^\]]+)\]'
    match = re.search(pattern, specs_block)
    if match:
        codes_str = match.group(1)
        codes = [c.strip().strip('"') for c in codes_str.split(',')]
        return codes
    return []

# Scan all products
all_products = []
item_code_to_products = defaultdict(list)

for js_file, (page, category) in CATEGORY_FILES.items():
    js_path = Path(r'c:\Users\Risha\ogsnew') / js_file
    if not js_path.exists():
        continue
    
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    products = parse_products(content)
    for product in products:
        item_codes = extract_item_codes(product['specs_block'])
        primary_item_code = item_codes[0] if item_codes else ''
        
        product_data = {
            'id': product['id'],
            'name': product['name'],
            'page': page,
            'category': category,
            'item_code': primary_item_code,
            'all_item_codes': item_codes
        }
        
        all_products.append(product_data)
        
        if primary_item_code:
            item_code_to_products[primary_item_code].append(product_data)

# Find duplicates
duplicates = {code: products for code, products in item_code_to_products.items() if len(products) > 1}

print("=" * 80)
print("ITEM CODE ANALYSIS")
print("=" * 80)
print(f"\nTotal products: {len(all_products)}")
print(f"Unique Item Codes: {len(item_code_to_products)}")
print(f"Duplicate Item Codes: {len(duplicates)}")

if duplicates:
    print(f"\n{len(duplicates)} Item Codes appear in multiple products:")
    print("-" * 80)
    for code, products in sorted(duplicates.items()):
        print(f"\nItem Code: {code}")
        for p in products:
            print(f"  - {p['category']} (ID: {p['id']}, Page: {p['page']})")
else:
    print("\nNo duplicate Item Codes found. All Item Codes are unique.")

print("\n" + "=" * 80)
 
