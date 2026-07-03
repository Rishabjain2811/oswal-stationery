import json
import os
import re

CATEGORY_FILES = {
    "report-cover-files.js": ("report-cover-files.html", "Report Cover Files"),
    "sheet-protectors.js": ("sheet-protectors.html", "Sheet Protectors"),
    "clip-files.js": ("clip-files.html", "Clip Files Series"),
    "clear-books.js": ("clear-books.html", "Clear Books Series"),
    "card-holders.js": ("card-holders.html", "Visiting Card Holders Series"),
    "button-files.js": ("button-files.html", "Button Bags Series"),
    "zipper-bag-series.js": ("zipper-bag-series.html", "Zipper Bag Series"),
    "document-bags.js": ("document-bags.html", "Document Bags / Expanding Files Series"),
    "separators.js": ("separators.html", "Index / Separators"),
    "paper-board-files.js": ("paper-board-files.html", "Paper Board Files Series"),
    "display-files.js": ("display-files.html", "Display Solution Products Series"),
    "leatherite-executive-bags.js": ("leatherite-executive-bags.html", "Leatherite Executive Bags Series"),
    "conference-folders.js": ("conference-folders.html", "PP & Leatherite Conference Files / Hotel Files"),
    "stationery-products.js": ("stationery-products.html", "Stationery Products"),
}

SKIP_KEYS = {"A4", "FC", "A3", "B4", "CHQ", "PP", "PVC", "DC", "ICON"}

TOKEN_RE = re.compile(
    r"^(?:"
    r"CL[A-Z0-9-]+"
    r"|SP-?\d+"
    r"|CP\d+[A-Z]?"
    r"|CF\d+"
    r"|CLP\d+"
    r"|\d+\s*IC(?:\s*\([A-Z]+\))?"
    r"|10\s*CARDS"
    r")$",
    re.I,
)

SEARCH_JS = r"""
  function normalizeQuery(query) {
    return String(query || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  }

  function normalizeName(query) {
    return String(query || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function cleanDisplayName(name) {
    return String(name || '').replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function search(query, limit) {
    var max = limit || 8;
    var codeQuery = normalizeQuery(query);
    var nameQuery = normalizeName(query);
    if (!codeQuery && !nameQuery) return [];

    var ranked = [];
    var seen = {};

    function push(product, score, matchedCode) {
      var id = product.page + '::' + product.productId;
      var existing = seen[id];
      if (existing && existing.score <= score) return;
      seen[id] = { score: score, matchedCode: matchedCode || '' };
      ranked = ranked.filter(function (item) { return item.id !== id; });
      ranked.push({
        id: id,
        score: score,
        productId: product.productId,
        productName: product.productName,
        category: product.category,
        page: product.page,
        codes: product.codes,
        matchedCode: matchedCode || (product.codes[0] || '')
      });
    }

    products.forEach(function (product) {
      (product.codes || []).forEach(function (code) {
        var key = normalizeQuery(code);
        if (!codeQuery) return;
        if (key === codeQuery) {
          push(product, 1, code);
        } else if (key.indexOf(codeQuery) === 0) {
          push(product, 2, code);
        } else if (key.indexOf(codeQuery) !== -1) {
          push(product, 3, code);
        }
      });

      if (!nameQuery) return;

      var words = nameQuery.split(' ').filter(Boolean);
      if (!words.length) return;

      var nameNorm = product.searchName;
      var categoryNorm = normalizeName(product.category);
      var nameMatch = words.every(function (word) {
        return nameNorm.indexOf(word) !== -1;
      });
      var categoryMatch = words.every(function (word) {
        return categoryNorm.indexOf(word) !== -1;
      });

      if (nameMatch) {
        push(product, 4, product.codes[0] || '');
      } else if (categoryMatch) {
        push(product, 5, product.codes[0] || '');
      }
    });

    ranked.sort(function (a, b) {
      if (a.score !== b.score) return a.score - b.score;
      return a.productName.localeCompare(b.productName);
    });

    return ranked.slice(0, max);
  }
"""


def normalize_key(code):
    return re.sub(r"[^A-Z0-9]", "", code.upper())


def normalize_name(text):
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9\s]", " ", text.lower())).strip()


def clean_display_name(name):
    return re.sub(r"\s+", " ", re.sub(r"\([^)]*\)", "", name)).strip()


def is_valid_code_token(token):
    cleaned = token.strip().strip(",")
    if not cleaned:
        return False
    key = normalize_key(cleaned)
    if not key or key in SKIP_KEYS or len(key) < 2:
        return False
    return bool(TOKEN_RE.match(cleaned))


def extract_codes_from_text(text):
    codes = []
    for group in re.findall(r"\(([^)]+)\)", text):
        for part in re.split(r",|\|", group):
            token = part.strip()
            if is_valid_code_token(token):
                codes.append(re.sub(r"\s+", " ", token))
    return codes


def parse_products(content):
    products = []
    depth = 0
    start = None
    for index, char in enumerate(content):
        if char == "{":
            if depth == 0:
                start = index
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0 and start is not None:
                block = content[start : index + 1]
                id_match = re.search(r'"id"\s*:\s*(\d+)', block)
                name_match = re.search(r'"name"\s*:\s*"((?:\\.|[^"\\])*)"', block)
                if id_match and name_match:
                    products.append(
                        {
                            "id": int(id_match.group(1)),
                            "name": json.loads('"' + name_match.group(1) + '"'),
                            "block": block,
                        }
                    )
                start = None
    return products


def extract_item_codes(block):
    match = re.search(r'"itemCode"\s*:\s*\[(.*?)\]', block, re.S)
    if not match:
        return []
    codes = []
    for code_match in re.finditer(r'"((?:\\.|[^"\\])*)"', match.group(1)):
        codes.append(json.loads('"' + code_match.group(1) + '"'))
    return codes


def block_to_dict(block):
    cleaned = re.sub(r",(\s*[}\]])", r"\1", block)
    return json.loads(cleaned)


def build_registry_entries():
    entries = []
    seen = set()

    for js_file, (page, category) in CATEGORY_FILES.items():
        if not os.path.exists(js_file):
            continue
        content = open(js_file, encoding="utf-8").read()
        for product in parse_products(content):
            dedupe = (product["id"], page)
            if dedupe in seen:
                continue
            seen.add(dedupe)
            try:
                data = block_to_dict(product["block"])
            except json.JSONDecodeError:
                continue
            data.pop("featured", None)
            entries.append(
                {
                    "key": page + "::" + str(product["id"]),
                    "page": page,
                    "category": category,
                    "product": data,
                }
            )

    entries.sort(key=lambda item: (item["product"].get("name", ""), item["page"]))
    return entries


REGISTRY_JS = r"""
  function makeKey(page, productId) {
    return String(page || '') + '::' + String(productId);
  }

  function find(page, productId) {
    return byKey[makeKey(page, productId)] || null;
  }

  function buildUrl(page, productId, code) {
    var url = 'product.html?page=' + encodeURIComponent(page) + '&id=' + encodeURIComponent(productId);
    if (code) url += '&code=' + encodeURIComponent(code);
    return url;
  }
"""


def write_product_registry(entries):
    output = (
        "// Auto-generated product registry.\n"
        "// Rebuild with: python build_search_index.py\n"
        "(function (global) {\n"
        "  var entries = "
        + json.dumps(entries, indent=2)
        + ";\n"
        "  var byKey = {};\n"
        "  entries.forEach(function (entry) {\n"
        "    byKey[entry.key] = entry;\n"
        "  });\n"
        + REGISTRY_JS
        + "\n  global.OswalProductRegistry = {\n"
        "    entries: entries,\n"
        "    byKey: byKey,\n"
        "    find: find,\n"
        "    buildUrl: buildUrl,\n"
        "    makeKey: makeKey\n"
        "  };\n"
        "})(typeof window !== 'undefined' ? window : this);\n"
    )
    with open(os.path.join("js", "product-registry.js"), "w", encoding="utf-8") as handle:
        handle.write(output)
    print(f"Wrote {len(entries)} products to js/product-registry.js")


def main():
    products = []
    seen_products = set()

    for js_file, (page, category) in CATEGORY_FILES.items():
        if not os.path.exists(js_file):
            continue
        content = open(js_file, encoding="utf-8").read()
        for product in parse_products(content):
            dedupe = (product["id"], page)
            if dedupe in seen_products:
                continue
            seen_products.add(dedupe)

            codes = extract_item_codes(product["block"])
            if not codes:
                codes = extract_codes_from_text(product["name"])
                desc_match = re.search(r'"desc"\s*:\s*"((?:\\.|[^"\\])*)"', product["block"])
                if desc_match:
                    desc = json.loads('"' + desc_match.group(1) + '"')
                    codes.extend(extract_codes_from_text(desc))

            unique_codes = []
            spec_codes = extract_item_codes(product["block"])
            for code in codes:
                if code in unique_codes:
                    continue
                key = normalize_key(code)
                if not key or key in SKIP_KEYS or len(key) < 2:
                    continue
                if code not in spec_codes and not is_valid_code_token(code):
                    continue
                unique_codes.append(code)

            display_name = clean_display_name(product["name"]) or product["name"]
            products.append(
                {
                    "productId": product["id"],
                    "productName": display_name,
                    "searchName": normalize_name(display_name),
                    "category": category,
                    "page": page,
                    "codes": unique_codes,
                }
            )

    products.sort(key=lambda item: (item["searchName"], item["page"]))

    output = (
        "// Auto-generated product search index.\n"
        "// Rebuild with: python build_search_index.py\n"
        "(function (global) {\n"
        "  var products = "
        + json.dumps(products, indent=2)
        + ";\n"
        + SEARCH_JS
        + "\n  global.OswalSearchIndex = {\n"
        "    products: products,\n"
        "    search: search,\n"
        "    normalizeQuery: normalizeQuery,\n"
        "    normalizeName: normalizeName,\n"
        "    cleanDisplayName: cleanDisplayName\n"
        "  };\n"
        "})(typeof window !== 'undefined' ? window : this);\n"
    )

    with open(os.path.join("js", "search-index.js"), "w", encoding="utf-8") as handle:
        handle.write(output)

    print(f"Wrote {len(products)} products to js/search-index.js")
    write_product_registry(build_registry_entries())


if __name__ == "__main__":
    main()
