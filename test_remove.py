import pathlib

p = pathlib.Path(__file__).parent / "index.html"
s = p.read_text(encoding="utf-8")

# 1) Find each card by its badge text and remove PPF + Instagram
# Use index of each card's <div class="portfolio-card... and find its closing </div>
# Strategy: find badge markers and cut the enclosing <div...></div>
import re

# PPF card: badge "META ADS — HIGH VALUE"
ppf_start = s.index('<div class="portfolio-badge">META ADS — HIGH VALUE</div>')
# find start of the parent card div
ppf_card_start = s.rindex('<div class="portfolio-card glass-card">', 0, ppf_start)
# after this card, find next portfolio-card or end of grid
remaining = s[ppf_card_start+1:]
# find where this card ends: next </div>\n\n<div class="portfolio-card" or </div>\n</div>
next_card = re.search(r'</div>\s*\n\s*<div class="portfolio-card', remaining)
if next_card:
    ppf_end = ppf_card_start + next_card.start() + len(next_card.group()) - len(next_card.group().strip().split()[-1])  # messy
    # simpler: find </div>\n\n      </div>\n\n      <div
    ppf_end = ppf_card_start + re.search(r'</div>\s*\n\s*', remaining).start() + 6
# Actually simpler: use </div> after which the next line starts with <div
m = re.search(r'</div>\s*\n\s*<div class="portfolio-card', remaining)
ppf_end = ppf_card_start + m.start() if m else ppf_card_start

print("PPF card:", ppf_card_start, ppf_end)
