# HTML-struktur — Silicon landningssida (sammanslagen version)

Det här dokumentet förklarar hur `index.html` är uppbyggd. Se `README.md` för en snabb överblick och `CSS-STRUKTUR.md` för hur allt stylas.

## Ägarskaps-märkning

Varje sektion har en HTML-kommentar som visar varifrån lösningen kommer:

```html
<!-- [PETERS KODDEL] -->
<!-- ============ HEADER (Figma: "Hero") ============ -->
```

- **`[PETERS KODDEL]`** — byggt och Figma-verifierat av Peter under projektet
- **`[LEOS KODDEL]`** — idéer/lösningar som kommer från Leos egen kod
- **`[GEMENSAM KODDEL]`** — grundläggande, delade mönster ingen äger ensam

En fullständig legend ligger direkt i `index.html`, precis efter `<body>`.

## Filerna som länkas in

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="dark-theme.css">
...
<script src="hamburger.js"></script>
<script src="toggle.js"></script>
```

`dark-theme.css` länkas **efter** `styles.css` och rör bara färger — aldrig layout. De två JS-filerna är oberoende av varandra (hamburgermeny respektive dark mode), medvetet uppdelade så flera personer kan jobba i var sin fil utan att krocka i Git.

## Namngivning — vi följer Figma-filen

| # | Figmas namn | Vår klass | Innehåll |
|---|---|---|---|
| 1 | Header *(Figma kallar navbaren detta)* | `.navbar` | Logga, hamburgermeny, Dark Mode-switch, Sign in/up |
| 2 | Hero | `.header` | Rubrik, ingress, appstore-badges, två telefonbilder (döljs på mobil) |
| 3 | Brands | `.logos` | 6 partnerloggor i rutor (döljs på mobil) |
| 4 | **Features** | `.features` | Telefonmockup + 6 ikonrutor i grid |
| 5 | How Does It Work | `.slider-section` | 3 telefonskärmar i en scrollbar karusell |
| 6 | **App Features** (A) | `.app-features.app-features--reverse` | Text + checklista + knapp + bild |
| 7 | **App Features** (B) | `.app-features` | Bild + text + 2 ikonrutor + knapp |
| 8 | Testimonials | `.testimonials-section` | Rubrik till vänster + 2 kundomdömen till höger |
| 9 | FAQ | `.faq` | Rubrik + kontaktrutor + accordion med 6 frågor |
| 10 | Subscribe | `.subscribe` | Nyhetsbrevs-formulär |
| 11 | Footer | `.footer` | Copyright-text |

**Viktigt specialfall:** Figma har två liknande men olika sektioner — **"Features"** (ikonrutnät + telefonmockup) och **"App Features"** (de två bild+text-sektionerna). Rubriktexten i `.features`-sektionen råkar dessutom bokstavligen lyda "App Features" — dubbelkolla alltid mot **klassnamnet** i koden, inte den synliga texten.

**Namnkrock löst:** `.header` (sektion 2) och navbarens `<header>`-**tagg** (sektion 1, klass `.navbar`) krockar aldrig eftersom HTML-taggnamn och CSS-klassnamn är olika namnrymder.

## Navbaren — två knappar, båda JS-drivna

```html
<button type="button" class="theme-switch__toggle" id="themeToggle" aria-pressed="false">...</button>
<button type="button" class="nav-toggle-btn" id="navToggleBtn" aria-expanded="false" aria-controls="navbarMenu">...</button>
```

Riktiga `<button>`-element, styrda via `id` av `toggle.js`/`hamburger.js`. **[GEMENSAM KODDEL]** — ersatte ett tidigare CSS-only checkbox-hack som krävde exakt HTML-ordning; JS hittar elementen via `id` oavsett var i koden de ligger.

## Badges — App Store / Google Play (Leos lösning)

```html
<a href="#" class="market-btn">
  <img src="images/appstore-light.png" alt="Download on the App Store" class="market-btn__img">
</a>
```

**[LEOS KODDEL].** Bara **en** bildfil per badge (samma i båda lägena, vit ikon/text på transparent bakgrund). Den mörka rutan bakom badgen i ljust läge är en CSS-bakgrundsfärg (se `CSS-STRUKTUR.md`), inte en del av bilden. Det ersatte ett tidigare försök med två olika bildfiler (SVG + PNG) som hade olika inbördes bildproportioner och därför syntes olika stora mellan lägena — ett problem den här lösningen eliminerar helt, eftersom det bara finns en bild att förhålla sig till.

## FAQ-accordionen — `name="faq-group"` (Leos idé)

```html
<details class="accordion__item" name="faq-group">
  <summary>Frågan här <img ... class="chevron"></summary>
  <p class="body-m muted">Svaret här...</p>
</details>
```

**[LEOS KODDEL].** `name`-attributet är inbyggd HTML5-funktionalitet — grupperar `<details>`-element så bara en kan vara öppen åt gången, helt utan JavaScript. Lägg till attributet `open` på en `<details>` om den ska vara utfälld som standard.

**Att lägga till en ny FAQ-fråga:** kopiera ett helt `<details class="accordion__item" name="faq-group">...</details>`-block.

## Bilder och `images/`-mappen

Mappen heter **`images/`**. Se `MANIFEST.md` (om den finns kvar från tidigare) eller sök på `src="images/` i `index.html` för en fullständig lista över vilka filer som behövs.

**Mönster för ljus/mörk bildväxling** (loggan, de 6 partnerloggorna): två `<img>`-taggar staplade på varandra med `--light`/`--dark`-klasser, tonade mjukt mellan varandra med CSS `opacity` (se `CSS-STRUKTUR.md`).

**Carousel-bilderna** (`.slider-section`) verifierade mot Figma-referens: vänster = budgetöversikt (`carousel-phone-1.png`), mitten = kort/transaktioner (`carousel-phone-2.png`), höger = överföring med kontaktlista (`carousel-phone-3.png`). Alla tre delar samma bildproportion (328×663) — ingen extra CSS-kompensation behövs.

**Alt-text-principen:**

| Typ av bild | Alt-text |
|---|---|
| Ikoner bredvid beskrivande text | `alt=""` (tom, medvetet) |
| Meningsbärande foton/skärmbilder | Beskrivande `alt="..."` |
| Loggor | Beskrivande `alt="..."` |

## Responsivt beteende (kort sammanfattning)

- **`.app-features`** och **`.testimonials-section`** döljs helt under 768px.
- **`.logos`** döljs helt under 480px.
- **Header-telefonerna** (`.header__image`) döljs helt under 480px — Figmas Mobile-variant visar bara text och badges.
- **`.faq__mobile-contact`**-knappen visas bara under 768px, ersätter de två kontaktrutorna.

Alla `display: none`-regler är medvetna designval från Figma-filen, verifierade sektion för sektion mot de faktiska Tablet/Mobile-sidorna.

## Att lägga till en helt ny sektion

1. Kopiera mönstret: `<section class="ditt-namn"><div class="container ...">...</div></section>`
2. Lägg till kommentarer: `<!-- [DITT NAMN KODDEL] -->` samt `<!-- ============ NAMN (Figma: "...") ============ -->`
3. Skriv motsvarande CSS-block i `styles.css` (se `CSS-STRUKTUR.md`).
4. Bilder i `images/`-mappen, relativ sökväg.
5. Kolla mot Figmas sidopanel att namnet matchar exakt.

## Team

Leo och Peter — se ägarskaps-taggarna genomgående i koden för exakt vem som bidragit med vad.
