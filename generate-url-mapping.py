#!/usr/bin/env python3
"""
Generate unique URL mapping based on Item Codes from product-registry.js.
Strategy:
- If Item Code is unique: product-CL10.html
- If Item Code repeats: append category slug: product-report-cover-files-CL10.html
- If still collision: append numeric ID: product-report-cover-files-CL10-48.html
"""

import re
import json
from pathlib import Path
from collections import defaultdict

# Read product-registry.js
registry_path = Path(r'c:\Users\Risha\ogsnew\js\product-registry.js')
with open(registry_path, 'r', encoding='utf-8') as f:
    registry_content = f.read()

# Extract the array from the JS file
match = re.search(r'var\s+entries\s*=\s*\[(.*?)\];', registry_content, re.DOTALL)
if not match:
    print("Could not find entries array")
    exit(1)

array_content = '[' + match.group(1) + ']'

# Parse as JSON
try:
    entries = json.loads(array_content)
except json.JSONDecodeError as e:
    print(f"JSON parse error: {e}")
    exit(1)

print(f"Found {len(entries)} products in registry")

# Sanitize item code for URL
def sanitize_for_url(text):
    # Remove special characters, replace spaces with hyphens
    sanitized = re.sub(r'[^\w\s-]', '', text)
    sanitized = re.sub(r'\s+', '-', sanitized)
    return sanitized

# Generate unique URL
def generate_unique_url(item_code, category_slug, product_id, used_urls):
    # Try simple item code URL first
    simple_url = f"product-{sanitize_for_url(item_code)}.html"
    if simple_url not in used_urls:
        return simple_url
    
    # Try with category slug
    category_url = f"product-{category_slug}-{sanitize_for_url(item_code)}.html"
    if category_url not in used_urls:
        return category_url
    
    # Fall back to numeric ID
    numeric_url = f"product-{category_slug}-{sanitize_for_url(item_code)}-{product_id}.html"
    return numeric_url

# Generate URL mapping from registry entries
url_mapping = {}
used_urls = set()
item_code_to_products = defaultdict(list)

for entry in entries:
    page = entry['page']
    category = entry['category']
    product = entry['product']
    product_id = product['id']
    
    # Extract item code from specs
    item_codes = []
    if product.get('specs') and product['specs'].get('itemCode'):
        item_codes = product['specs']['itemCode']
    
    primary_item_code = item_codes[0] if item_codes else f"product-{product_id}"
    
    # Generate category slug from page name
    category_slug = page.replace('.html', '').replace('-', '-')
    
    # Generate unique URL
    url = generate_unique_url(primary_item_code, category_slug, product_id, used_urls)
    
    # Mark URL as used
    used_urls.add(url)
    
    # Store mapping
    key = f"{page}::{product_id}"
    url_mapping[key] = {
        'url': url,
        'item_code': primary_item_code,
        'category_slug': category_slug,
        'product_id': product_id
    }
    
    # Track duplicates
    if primary_item_code:
        item_code_to_products[primary_item_code].append({
            'category': category,
            'id': product_id,
            'url': url
        }) 

# Save mapping to JSON.
with open(r'c:\Users\Risha\ogsnew\url-mapping.json', 'w', encoding='utf-8') as f:
    json.dump(url_mapping, f, indent=2)

print("=" * 80)
print("URL MAPPING GENERATION")
print("=" * 80)
print(f"\nTotal products: {len(entries)}")
print(f"Unique URLs generated: {len(used_urls)}")
print(f"Duplicate Item Codes handled: {len([c for c, prods in item_code_to_products.items() if len(prods) > 1])}")

# Show examples of how duplicates were handled
print("\nExamples of duplicate Item Code handling:")
print("-" * 80)
for code, products in sorted(item_code_to_products.items()):
    if len(products) > 1:
        print(f"\nItem Code: {code}")
        for p in products:
            print(f"  {p['category']} (ID: {p['id']}) → {p['url']}")

print("\n" + "=" * 80)
print(f"URL mapping saved to url-mapping.json")
print("=" * 80)
 
