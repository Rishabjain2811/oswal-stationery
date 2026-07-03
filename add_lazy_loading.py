#!/usr/bin/env python3
"""Add loading='lazy' attribute to all <img> tags in HTML files."""
import os
import re

def add_lazy_loading():
    count = 0
    for filename in os.listdir('.'):
        if not filename.endswith('.html'):
            continue
        
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all img tags and add loading="lazy" if not present
        updated = re.sub(
            r'<img(\s+[^>]*?)(?<!\s)(?<!loading="lazy")(\s*>)',
            r'<img\1 loading="lazy"\2',
            content,
            flags=re.IGNORECASE
        )
        
        if updated != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(updated)
            count += 1
            print(f'✓ Updated {filename}')
    
    print(f'\nTotal updated: {count} HTML files')

if __name__ == '__main__':
    add_lazy_loading()
