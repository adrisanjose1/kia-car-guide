KIA SOUL 2015 BASE — Interactive English Learning Prototype

Language:
- UI/instructions: Mexican Spanish
- Vehicle component names: English
- Function explanations: Mexican Spanish

Modes:
- RESEÑA: tap a physical part in the photo -> SVG outline + simple explanation cloud -> tap to exit.
- EXAMEN: 3-2-1-GO countdown -> random English component card -> click the component in the photo -> Correcto/Genial/Ang galing + heart burst -> current card drops and next card rises.
- Review all the mistakes: tap a mistake card -> photo with the correct SVG outline + explanation.

Files:
- index.html
- style.css
- sprites.js (from uploaded Sigamos project)
- sounds.js (from uploaded Sigamos project)

Photos are currently loaded from the 2015 Kia Soul reference gallery by URL. For production, replace these with licensed/local photos in assets/.
SVG hotspot paths are prototype geometry in a 0-100 viewBox and should be traced against the final selected photos for pixel-accurate outlines.

To run locally:
- Open index.html in a browser with internet access.
- If your browser blocks remote image/audio behavior from file://, run a local server in this folder, e.g. `python -m http.server 8000`, then open http://localhost:8000.
