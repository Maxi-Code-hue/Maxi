# Portfolio – Nordafrika & der Nahe und Mittlere Osten

Vollständig bearbeitetes Geographie-Lernportfolio (10. Klasse Gymnasium) zum Kulturraum
**Nordafrika / Naher & Mittlerer Osten**. Alle 8 Quests sind ausgearbeitet, sämtliche
visuellen Elemente wurden selbst erstellt, und das ursprüngliche Seitenlayout
(Originalaufgaben + Quest-Struktur) bleibt erhalten.

## Ergebnis
- **`Portfolio_Nordafrika_Naher_Mittlerer_Osten.pdf`** – das fertige Portfolio (13 Seiten, A4).

## Inhalt der Quests
| Quest | Rolle | Erstellte Visualisierung |
|------|-------|--------------------------|
| 1 | Kulturwissenschaftler/-in | Bilder-Collage „Orient“, Banse-Kritik, eigene Definition |
| 2 | Kartenkenner/-in | beschriftete Regionalkarte (23 Länder, 3 Großregionen, Farbpunkte) |
| 3 | Marketing-Stratege/-in | Tourismus-Flyer Marokko |
| 4 | Stadtgeograph/-in | Skizze „orientalische Stadt“, Vergleichstabelle, Luftbild |
| 5 | Diplomat/-in | KI-Prompt + neutrales Konflikt-Schaubild |
| 6 | Humanitäre/-r Helfer/-in | Wirkungsgefüge Desertifikation, Sahel/Sudan |
| 7 | Influencer/-in | Infopost Golfstaaten/Dubai mit 4 Diagrammen |
| 8 | Investigativjournalist/-in | Bevölkerungspyramide Katar, Interview, Migrationsmodell |
| ★ | Selbstreflexion | ausgefüllt |

## Neu bauen
```bash
pip install weasyprint
python3 build/make_map.py      # erzeugt die Regionalkarte (aus ne50.geojson)
python3 build/make_assets.py   # erzeugt alle übrigen Grafiken (SVG)
python3 build/build_pdf.py     # rendert portfolio.html -> PDF
```

## Aufbau
- `portfolio.html` – Inhalt & Layout aller Seiten
- `assets/style.css` – Design (Farben, Schriften, Seitenraster)
- `assets/fonts/` – eingebettete Schriften (Fredoka, Baloo 2, Patrick Hand, Caveat, Nunito)
- `assets/img/` – alle generierten Grafiken (SVG)
- `build/` – Generator-Skripte + Geodaten

> Hinweis: Der Name auf dem Deckblatt ist als **„Maxi P.“** eingetragen – in
> `portfolio.html` (Suche nach „Maxi P.“) leicht anpassbar.
