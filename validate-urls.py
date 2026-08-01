#!/usr/bin/env python3
"""
Validate no duplicate canonical URLs, schema URLs, and sitemap URLs.
"""

import re
import json
from pathlib import Path
from collections import defaultdict

# Load URL mapping
with open(r'c:\Users\Risha\ogsnew\url-mapping.json', 'r', encoding='utf-8') as f:
    url_mapping = json.load(f)

print("=" * 80)
print("URL VALIDATION")
print("=" * 80)

# Check for duplicate static URLs
static_urls = [url_info['url'] for url_info in url_mapping.values()]
url_counts = defaultdict(int)
for url in static_urls:
    url_counts[url] += 1

duplicates = {url: count for url, count in url_counts.items() if count > 1}

print(f"\nTotal static URLs: {len(static_urls)}")
print(f"Unique static URLs: {len(url_counts)}")

if duplicates:
    print(f"\n❌ DUPLICATE STATIC URLs found:")
    for url, count in duplicates.items():
        print(f"  {url} (appears {count} times)")
else:
    print(f"\n✓ No duplicate static URLs")

# Check canonical URLs in product pages
canonical_urls = []
product_files = list(Path(r'c:\Users\Risha\ogsnew').glob('product-*.html'))

print(f"\nChecking {len(product_files)} product page canonical URLs...")

for product_file in product_files:
    with open(product_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract canonical URL
    canonical_match = re.search(r'<link rel="canonical" href="([^"]*)"', content)
    if canonical_match:
        canonical_urls.append(canonical_match.group(1))

canonical_counts = defaultdict(int)
for url in canonical_urls:
    canonical_counts[url] += 1

canonical_duplicates = {url: count for url, count in canonical_counts.items() if count > 1}

print(f"Total canonical URLs: {len(canonical_urls)}")
print(f"Unique canonical URLs: {len(canonical_counts)}")

if canonical_duplicates:
    print(f"\n❌ DUPLICATE canonical URLs found:")
    for url, count in canonical_duplicates.items():
        print(f"  {url} (appears {count} times)")
else:
    print(f"\n✓ No duplicate canonical URLs")

# Check schema URLs in product pages
schema_urls = []

for product_file in product_files:
    with open(product_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract Product schema URL (within @type: "Product")
    # Find the Product schema block first
    product_schema_match = re.search(r'<script id="dynamic-product-schema"[^>]*>(.*?)</script>', content, re.DOTALL)
    if product_schema_match:
        schema_block = product_schema_match.group(1)
        # Extract the url field from the Product schema
        url_match = re.search(r'"url":\s*"([^"]*)"', schema_block)
        if url_match:
            schema_urls.append(url_match.group(1))

schema_counts = defaultdict(int)
for url in schema_urls:
    schema_counts[url] += 1

schema_duplicates = {url: count for url, count in schema_counts.items() if count > 1}

print(f"Total schema URLs: {len(schema_urls)}")
print(f"Unique schema URLs: {len(schema_counts)}")

if schema_duplicates:
    print(f"\n❌ DUPLICATE schema URLs found:")
    for url, count in schema_duplicates.items():
        print(f"  {url} (appears {count} times)")
else:
    print(f"\n✓ No duplicate schema URLs")

# Check sitemap URLs
sitemap_path = Path(r'c:\Users\Risha\ogsnew') / 'sitemap.xml'
with open(sitemap_path, 'r', encoding='utf-8') as f:
    sitemap_content = f.read()

sitemap_urls = re.findall(r'<loc>([^<]+)</loc>', sitemap_content)
sitemap_counts = defaultdict(int)
for url in sitemap_urls:
    sitemap_counts[url] += 1

sitemap_duplicates = {url: count for url, count in sitemap_counts.items() if count > 1}

print(f"Total sitemap URLs: {len(sitemap_urls)}")
print(f"Unique sitemap URLs: {len(sitemap_counts)}")

if sitemap_duplicates:
    print(f"\n❌ DUPLICATE sitemap URLs found:")
    for url, count in sitemap_duplicates.items():
        print(f"  {url} (appears {count} times)")
else:
    print(f"\n✓ No duplicate sitemap URLs")

# Check that all URLs match
print("\n" + "=" * 80)
print("URL CONSISTENCY CHECK")
print("=" * 80)

# Check that static URLs match canonical URLs
mismatch_count = 0
for product_file in product_files:
    filename = product_file.name
    with open(product_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    canonical_match = re.search(r'<link rel="canonical" href="([^"]*)"', content)
    if canonical_match:
        canonical_url = canonical_match.group(1)
        expected_url = f"https://oswalgiftnstationery.co.in/{filename}"
        if canonical_url != expected_url:
            print(f"❌ Mismatch: {filename}")
            print(f"   Expected: {expected_url}")
            print(f"   Found: {canonical_url}")
            mismatch_count += 1

if mismatch_count == 0:
    print(f"✓ All {len(product_files)} canonical URLs match filenames")
else:
    print(f"❌ {mismatch_count} canonical URL mismatches found")

print("\n" + "=" * 80)
print("VALIDATION COMPLETE")
print("=" * 80)
