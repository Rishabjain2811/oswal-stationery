#!/usr/bin/env python3
"""
Generate vercel.json redirects from old dynamic URLs to new static URLs.
Uses Vercel's 'has' property for query parameter matching.
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
    
    # Skip malformed URLs (empty or invalid)
    if not static_url or static_url == 'product-.html' or not static_url.startswith('product-'):
        print(f"Skipping malformed URL: {static_url}")
        continue
    
    # Skip if item_code is empty or invalid
    item_code = url_info.get('item_code', '')
    if not item_code or item_code == '-' or item_code == '':
        print(f"Skipping empty item_code for {key}")
        continue
    
    # New static URL
    new_url = f"/{static_url}"
    
    # Redirect 1: /product.html?page=X&id=Y
    redirects.append({
        "source": "/product.html",
        "has": [
            {
                "type": "query",
                "key": "page",
                "value": page
            },
            {
                "type": "query",
                "key": "id",
                "value": str(product_id)
            }
        ],
        "destination": new_url,
        "permanent": True
    })
    
    # Redirect 2: /product.html?page=X&id=Y&code=:code (wildcard for any code)
    redirects.append({
        "source": "/product.html",
        "has": [
            {
                "type": "query",
                "key": "page",
                "value": page
            },
            {
                "type": "query",
                "key": "id",
                "value": str(product_id)
            },
            {
                "type": "query",
                "key": "code"
            }
        ],
        "destination": new_url,
        "permanent": True
    })

# Add catch-all redirect for product.html without parameters
redirects.append({
    "source": "/product.html",
    "destination": "/",
    "permanent": True
})

# Generate vercel.json with Functions configuration
vercel_config = {
    "buildCommand": None,
    "outputDirectory": "./",
    "functions": {
        "api/**/*.js": {
            "runtime": "nodejs18.x"
        }
    },
    "rewrites": [
        {
            "source": "/api/:path*",
            "destination": "/api/:path*"
        },
        {
            "source": "/product.html",
            "destination": "/index.html"
        }
    ],
    "redirects": redirects
}

# Validate JSON before writing
try:
    json.dumps(vercel_config)
    print("✓ Generated JSON is valid")
except json.JSONEncodeError as e:
    print(f"✗ JSON validation failed: {e}")
    exit(1)

# Write vercel.json
vercel_path = Path(r'c:\Users\Risha\ogsnew') / 'vercel.json'
with open(vercel_path, 'w', encoding='utf-8') as f:
    json.dump(vercel_config, f, indent=2)

print(f"Generated {len(redirects)} redirects for vercel.json")
print(f"Total unique products: {len(url_mapping)}")
print(f"Skipped malformed URLs: see output above")
