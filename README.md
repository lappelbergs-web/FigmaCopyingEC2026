# 🏦 Silicon — Bank App Landningssida (sammanslagen version)

En responsiv, en-sidig landningssida för en mobil bank-app, byggd i HTML, CSS och lättviktig JavaScript utifrån en Figma-designmall.

---

## 📖 Om den här versionen

Det här är den **sammanslagna branchen** — en kombination av Peters Figma-verifierade grundarbete och konkreta lösningar från Leos egen kod. Se `HTML-STRUKTUR.md`/`CSS-STRUKTUR.md` för exakt vem som byggt vad.

**Ägarskaps-märkning:** all kod är taggad direkt i kommentarerna — sök på `[PETERS KODDEL]`, `[LEOS KODDEL]` eller `[GEMENSAM KODDEL]` i vilken fil som helst för att se varifrån en lösning kommer. Märkningen visar varifrån en lösning kommer, inte nödvändigtvis exakt vem som skrev just de raderna.

---

## 🚀 Kom igång

Inga installationssteg eller beroenden behövs.

### 1. Klona projektet
```bash
git clone https://github.com/lappelbergs-web/FigmaCopyingEC2026.git
cd FigmaCopyingEC2026
```

### 2. Öppna sidan
Dubbelklicka på `index.html` i valfri webbläsare.

---

## 📁 Projektstruktur

```
├── index.html              Sidans HTML-struktur
├── styles.css               All styling, design tokens och responsiv layout
├── dark-theme.css            Färgöverlagring för mörkt läge (rör aldrig layout)
├── hamburger.js               Mobilmenyns logik
├── toggle.js                  Dark/light mode-logik
├── images/                   Alla bilder och ikoner
├── README.md                 Dokumentation (den här filen)
├── HTML-STRUKTUR.md          Genomgång av HTML:en, sektion för sektion
└── CSS-STRUKTUR.md           Genomgång av CSS:en: namngivning, nästling, responsiv strategi
```

---

## ✨ Från Leos kod — fyra konkreta tillägg

| Funktion | Vad det löser |
|---|---|
| Dark mode kommer ihåg valet (`localStorage`) + respekterar systemets färgtema vid första besöket | Bättre användarupplevelse — sidan startar inte alltid i ljust läge |
| FAQ är en riktig accordion (`name="faq-group"`) | Bara en fråga öppen åt gången, inbyggt i HTML5 — ingen extra kod |
| "Learn more"-pilarna är text (`→`) istället för en bildfil | En bugg-källa mindre |
| App Store-badge: en bild + CSS-bakgrundsruta som togglas | Löste en synlig storleksskillnad mellan ljust/mörkt läge som två olika bildfiler orsakade |
| Google Play-badge: JavaScript byter bildfil (`src`) mellan `googleplay-light.png`/`googleplay-dark.png` | Alternativ lösning på samma problem — se ⚠️ nedan för öppen fråga |

---

## ✨ Egenskaper

| Egenskap | Beskrivning |
|---|---|
| Responsiv | Tre steg: desktop, tablet (≤768px), mobil (≤480px) |
| Dark/light mode | Full täckning, minns valet, respekterar systemtema |
| Hamburgermeny | JS-driven, ordningsoberoende, stänger vid klick utanför och Escape |
| CSS Grid + Flexbox | Grid för rutnät/två-kolumns-layouter, Flexbox för enklare rader |
| Native CSS-nästling | Används där det faktiskt fungerar korrekt — se `CSS-STRUKTUR.md` |
| Tillgänglighet | Synlig fokusmarkering, beskrivande alt-texter, `sr-only`-etiketter, stöd för `prefers-reduced-motion` |

---

## 🎨 Källa

Designen är byggd utifrån Figma-mallen **"Silicon Design Template"**.

## ⚠️ Kända begränsningar

Källdesignen innehåller inte alla sektioner i alla skärmstorlekar — medvetna designval, inte buggar:

| Sektion | Döljs vid |
|---|---|
| App Features | ≤768px |
| Testimonials Section | ≤768px |
| Logos / Brands | ≤480px |
| Header-telefonerna | ≤480px |

**Öppen fråga att stämma av med Leo:** App Store-badgens utseende i mörkt läge (vit ruta + svart ikon) avviker från den Figma-referens som tidigare verifierades (vit ikon, ingen ruta). De två badgesen löses dessutom nu på olika sätt (CSS för App Store, JavaScript för Google Play) — inte konsekvent, men fungerande. Se `CSS-STRUKTUR.md`/`HTML-STRUKTUR.md` för detaljer.

---

## 🛠️ Teknikstack

| Komponent | Beskrivning |
|---|---|
| HTML5 | Semantisk markup, native `<details name="...">`-gruppering |
| CSS3 | Grid, Flexbox, native nästling, `clamp()`, `aspect-ratio`, CSS custom properties |
| JavaScript | Vanilla JS, inga beroenden — hamburgermeny och dark mode |
| Manrope (Google Fonts) | Typsnitt |

---

## 👥 Team

- Leo
- Peter

Arbetet delas upp sektion för sektion — se `HTML-STRUKTUR.md` för gränserna mellan sektionerna.
