from pathlib import Path
import re

button_html = '''    <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="primary-navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
'''

for path in Path('.').glob('*.html'):
    text = path.read_text(encoding='utf-8')
    if 'class="nav-toggle"' in text:
        continue
    if '<div class="nav-logo">' not in text:
        continue
    new_text, count = re.subn(r'(</div>\s*\n)(\s*<ul class="nav-links">)', button_html + r'\2', text, count=1)
    if count == 1:
        path.write_text(new_text, encoding='utf-8')
        print(f'✓ Updated {path.name}')
    else:
        print(f'-- Failed to update {path.name}')

from pathlib import Path
import re

button_html = '''    <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="primary-navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
'''

for path in Path('.').glob('*.html'):
    text = path.read_text(encoding='utf-8')
    if 'class="nav-toggle"' in text:
        continue
    if '<div class="nav-logo">' not in text:
        continue
    new_text, count = re.subn(r'(</div>\s*\n)(\s*<ul class="nav-links">)', button_html + r'\2', text, count=1)
    if count == 1:
        path.write_text(new_text, encoding='utf-8')
        print(f'✓ Updated {path.name}')
    else:
        print(f'-- Failed to update {path.name}')
