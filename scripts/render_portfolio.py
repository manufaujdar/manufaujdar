#!/usr/bin/env python3
"""Render the public-safe portfolio status visual from portfolio.json."""

from __future__ import annotations

import html
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "portfolio.json"
OUTPUT_PATH = ROOT / "assets" / "portfolio-status.svg"


def render() -> str:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    domains = data["domains"]
    cards = []
    for index, domain in enumerate(domains):
        x = 30 + (index % 2) * 570
        y = 24 + (index // 2) * 126
        color = html.escape(domain["color"], quote=True)
        label = html.escape(domain["label"])
        caption = html.escape(domain["caption"])
        signal = html.escape(domain["signal"])
        cards.append(
            f'''<g transform="translate({x} {y})">
  <rect width="540" height="96" rx="18" fill="#101A31" stroke="{color}" stroke-opacity="0.30"/>
  <circle cx="28" cy="30" r="7" fill="{color}"/>
  <text x="48" y="34" fill="#F4F7FF" font-size="14" font-weight="700" letter-spacing="1.3">{label}</text>
  <text x="48" y="58" fill="#B9C8E3" font-size="12">{caption}</text>
  <text x="48" y="79" fill="{color}" font-size="11">{signal}</text>
</g>'''
        )

    footer = html.escape(data["footer"])
    return f'''<svg width="1200" height="300" viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">Portfolio status</title>
  <desc id="desc">Four visual cards summarize the current portfolio domains and their public release status.</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1200" y2="300" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0B1428"/>
      <stop offset="1" stop-color="#17102A"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="300" rx="30" fill="url(#background)"/>
  {''.join(cards)}
  <text x="600" y="284" text-anchor="middle" fill="#8EA7CA" font-size="11" letter-spacing="1.2">{footer}</text>
</svg>
'''


def main() -> None:
    OUTPUT_PATH.write_text(render(), encoding="utf-8")


if __name__ == "__main__":
    main()
