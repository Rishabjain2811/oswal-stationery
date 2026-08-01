#!/usr/bin/env python3
"""
Generate vercel.json redirects from old dynamic URLs to new static URLs.
"""

import json
from pathlib import Path

# Load URL mapping
with open(r'c:\Users\Risha\ogsnew\url-mapping.json', 'r', encoding='utf-8') as f:
    url_mapping = json.load(f)

# Generate redirects
redirects = []

for key, url_info in url_mapping.items():
    page, product_id = key.split('::')
    static_url = url_info['url']
    
    # Old dynamic URL pattern
    old_url_1 = f"/product.html?page={page}&id={product_id}"
    old_url_2 = f"/product.html?page={page}&id={product_id}&code=:code"
    
    # New static URL
    new_url = f"/{static_url}"
    
    # Add redirects
    redirects.append({
        "source": old_url_1,
        "destination": new_url,
        "permanent": True
    })
    redirects.append({
        "source": old_url_2,
        "destination": new_url,
        "permanent": True
    })

# Add catch-all redirect for product.html
redirects.append({
    "source": "/product.html",
    "destination": "/",
    "permanent": True
})

# Generate vercel.json
vercel_config = {
    "rewrites": [
        {
            "source": "/product.html",
            "destination": "/index.html"
        }
    ],
    "redirects": redirects
}

# Write vercel.json
vercel_path = Path(r'c:\Users\Risha\ogsnew') / 'vercel.json'
with open(vercel_path, 'w', encoding='utf-8') as f:
    json.dump(vercel_config, f, indent=2)

print(f"Generated {len(redirects)} redirects for vercel.json")
print(f"Total unique products: {len(url_mapping)}")
 
