#!/usr/bin/env python3
"""Baut das Portfolio-PDF aus portfolio.html."""
import os, sys
import weasyprint

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = os.path.join(ROOT, "Portfolio_Nordafrika_Naher_Mittlerer_Osten.pdf")
weasyprint.HTML(os.path.join(ROOT, "portfolio.html")).write_pdf(out)
print("PDF geschrieben:", out, os.path.getsize(out), "bytes")
