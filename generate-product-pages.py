#!/usr/bin/env python3
"""
Generate static HTML files for each product with pre-rendered Product schema.
This ensures Google Rich Results Test can detect the schema without executing JavaScript.
Uses Item Code-based URLs with category slug fallback for duplicates.
"""

import re
import json
import os
from pathlib import Path

# Load URL mapping
with open(r'c:\Users\Risha\ogsnew\url-mapping.json', 'r', encoding='utf-8') as f:
    url_mapping = json.load(f)

# Read product-registry.js
registry_path = Path(r'c:\Users\Risha\ogsnew\js\product-registry.js')
with open(registry_path, 'r', encoding='utf-8') as f:
    registry_content = f.read()

# Extract the array from the JS file
# The file has structure: var entries = [...]
match = re.search(r'var\s+entries\s*=\s*\[(.*?)\];', registry_content, re.DOTALL)
if not match:
    print("Could not find entries array")
    exit(1)

array_content = '[' + match.group(1) + ']'

# Parse as JSON (JS syntax is compatible with JSON for this structure)
try:
    products = json.loads(array_content)
except json.JSONDecodeError as e:
    print(f"JSON parse error: {e}")
    exit(1)

print(f"Found {len(products)} products")

# Read product.html template
template_path = Path(r'c:\Users\Risha\ogsnew\product.html')
with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

# Generate schema for each product
for entry in products:
    page = entry['page']
    category = entry['category']
    product = entry['product']
    product_id = product['id']
    
    # Get URL from mapping
    key = f"{page}::{product_id}"
    url_info = url_mapping.get(key, {})
    static_url = url_info.get('url', f"product-{product_id}.html")
    item_code = url_info.get('item_code', str(product_id))
    
    # Build Product schema
    schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.get('name', 'Product'),
        "description": product.get('desc') or product.get('description') or '',
        "category": category,
        "url": f"https://oswalgiftnstationery.co.in/{static_url}",
        "manufacturer": {
            "@type": "Organization",
          "name": "OSWAL Gift N Stationery",
          "url": "https://oswalgiftnstationery.co.in"
        },
        "brand": {
          "@type": "Brand",
          "name": "COLORS"
        }
    }
    
    # Add image if available
    if product.get('image'):
        schema['image'] = f"https://oswalgiftnstationery.co.in/{product['image']}"
    
    # Add SKU from itemCode
    if product.get('specs') and product['specs'].get('itemCode'):
        item_codes = product['specs']['itemCode']
        if item_codes and len(item_codes) > 0:
            schema['sku'] = item_codes[0]
    
    # Add AdditionalProperty
    additional_properties = []
    if product.get('specs'):
        specs = product['specs']
        if specs.get('size'):
            additional_properties.append({
                "@type": "PropertyValue",
                "name": "Size",
                "value": ', '.join(specs['size'])
            })
        if specs.get('thickness'):
            additional_properties.append({
                "@type": "PropertyValue",
                "name": "Thickness",
                "value": ', '.join(specs['thickness'])
            })
        if specs.get('colours'):
            additional_properties.append({
                "@type": "PropertyValue",
                "name": "Color",
                "value": ', '.join(specs['colours'])
            })
        if specs.get('packing'):
            additional_properties.append({
                "@type": "PropertyValue",
                "name": "Packing",
                "value": ', '.join(specs['packing'])
            })
    
    if additional_properties:
        schema['additionalProperty'] = additional_properties
    
    # Convert schema to JSON string
    schema_json = json.dumps(schema, indent=2, ensure_ascii=False)
    
    # Replace the empty script tag with populated schema
    schema_html = f'<script id="dynamic-product-schema" type="application/ld+json">{schema_json}</script>'
    product_html = template.replace('<script id="dynamic-product-schema" type="application/ld+json"></script>', schema_html)
    
    # Also update the canonical URL in the template
    # Find and replace the canonical link
    canonical_pattern = r'<link rel="canonical" href="[^"]*"'
    canonical_replacement = f'<link rel="canonical" href="https://oswalgiftnstationery.co.in/{static_url}"'
    product_html = re.sub(canonical_pattern, canonical_replacement, product_html)
    
    # Update OG URL
    og_url_pattern = r'<meta property="og:url" content="[^"]*"'
    og_url_replacement = f'<meta property="og:url" content="https://oswalgiftnstationery.co.in/{static_url}"'
    product_html = re.sub(og_url_pattern, og_url_replacement, product_html)
    
    # Update page title
    product_name = product.get('name', 'Product')
    title_pattern = r'<title>.*?</title>'
    title_replacement = f'<title>{product_name} | COLORS {category} | OSWAL GIFT N STATIONERY</title>'
    product_html = re.sub(title_pattern, title_replacement, product_html)
    
    # Update meta description
    product_desc = product.get('desc') or f'Premium {product_name} from COLORS by OSWAL GIFT N STATIONERY. High-quality office stationery for professional use.'
    meta_desc_pattern = r'<meta name="description" content="[^"]*"'
    meta_desc_replacement = f'<meta name="description" content="{product_desc} View specifications, colors, sizes, and ordering options."'
    product_html = re.sub(meta_desc_pattern, meta_desc_replacement, product_html)
    
    # Add BreadcrumbList schema
    breadcrumb_schema = f'''  <script type="application/ld+json">{{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://oswalgiftnstationery.co.in/"
    }},
    {{
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://oswalgiftnstationery.co.in/index.html#products"
    }},
    {{
      "@type": "ListItem",
      "position": 3,
      "name": "{category}",
      "item": "https://oswalgiftnstationery.co.in/{page}"
    }},
    {{
      "@type": "ListItem",
      "position": 4,
      "name": "{product_name}",
      "item": "https://oswalgiftnstationery.co.in/{static_url}"
    }}
  ]
}}</script>'''
    
    # Insert breadcrumb schema after Organization schema
    org_schema_pattern = r'(<script type="application/ld\+json">\{[^}]*"Organization"[^}]*\}</script>)'
    product_html = re.sub(org_schema_pattern, r'\1\n' + breadcrumb_schema, product_html)
    
    # Save the file
    output_path = Path(r'c:\Users\Risha\ogsnew') / static_url
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(product_html)
    
    print(f"Generated: {static_url}")

print("\nAll product pages generated successfully!")
