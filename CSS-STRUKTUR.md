# CSS-struktur — Silicon landningssida (sammanslagen version)

Det här dokumentet förklarar hur `styles.css` och `dark-theme.css` är organiserade. Se `README.md` för överblick och `HTML-STRUKTUR.md` för markupen.

## Ägarskaps-märkning

Samma system som i HTML-filen — varje sektion har en tagg direkt i kommentaren:

```css
/* [PETERS KODDEL] ===== Header (Figma: "Hero") ===== */
/* [LEOS KODDEL] textpil istället för en ikon-bildfil i "Learn more"-knapparna. */
```

En fullständig legend ligger högst upp i `styles.css`.

## Två CSS-filer, olika ansvar

- **`styles.css`** — all grundlayout, typografi, komponenter, responsiv logik. Fungerar helt på egen hand (ljust läge).
- **`dark-theme.css`** — länkas **efter** `styles.css`. Bara regler scopade under `body[data-theme="dark"]`, rör **aldrig** layout/mått — bara färger, opacity och bakgrunder.

## Filens uppbyggnad, i ordning

1. Design tokens (`:root`) — **[GEMENSAM KODDEL]**
2. Reset & bas — **[GEMENSAM KODDEL]**
3. Knappar — **[GEMENSAM KODDEL]**
4. Navbar (hamburgermeny, tema-knapp)
5. Header *(Figma: "Hero")* — inkl. badges
6. Logos *(Figma: "Brands")*
7. Features *(ikonrutnät + telefon)*
8. Slider Section *(Figma: "How Does It Work")* — karusellen
9. App Features *(bild+text-sektionerna)*
10. Testimonials Section
11. FAQ (inkl. accordion)
12. Subscribe
13. Footer — **[GEMENSAM KODDEL]**
14. Responsiv layout (alla `@media`-block, samlade sist)
15. `prefers-reduced-motion`

## CSS Grid **och** Flexbox — båda används, medvetet

| Teknik | Används för |
|---|---|
| **Grid** | Äkta rutnät och asymmetriska två-kolumns-layouter: `.header__inner`, `.logos__grid`, `.features__inner`, `.app-features__inner`, `.testimonials-section__inner`, `.testimonial-grid`, `.faq__inner`, `.faq__contact-boxes`, `.feature-grid` |
| **Flexbox** | Enklare rader/kolumner: `.navbar__inner`, `.market-btns`, `.carousel`, `.check-list`, `.accordion`, `.subscribe-card__form` |

**Tumregel:** rader/kolumner samtidigt → Grid. En rad eller kolumn → Flexbox.

## Native CSS-nästling — vad som fungerar

> **Native CSS-nästling kan INTE bygga BEM-klassnamn genom sammanfogning.** `.block { &__element {...} }` blir INTE `.block__element` — webbläsaren tolkar det som en ogiltig HTML-tagg-selektor och regeln blir tyst overksam.

| Mönster | Fungerar? |
|---|---|
| `&__element`, `&--modifier` | ❌ Nej — alla BEM-klasser står platta, egna toppnivå-selektorer |
| `&:hover`, `&:focus`, `&[open]` | ✅ Ja |
| Bar tagg (`img`, `h2`, `p`) som barn | ✅ Ja |

```css
.testimonial-card {
  display: flex;
  &:hover { box-shadow: var(--shadow-m); }   /* pseudo-klass — OK */
}
.testimonial-card__author {
  img { width: 48px; }      /* riktig tagg — OK */
}
```

## De knepigaste lösningarna

### 1. Header-bilden — `aspect-ratio`

```css
.header__image { position: relative; aspect-ratio: 746 / 936; }
.header__phone--back { top: 14.5%; left: 15.4%; width: 53.1%; }
.header__phone--front { top: 0; left: 46.1%; width: 53.9%; }
```

Exakt Figma-proportion — webbläsaren räknar ut rätt höjd oavsett bredd. **[PETERS KODDEL].**

### 2. Badges — App Store och Google Play använder OLIKA tekniker (uppdaterat av Leo)

**Viktigt att veta:** de två badgesen löses numera på två olika sätt — inte konsekvent, men så här ser koden faktiskt ut just nu.

**App Store — CSS-bakgrundsruta + filter, samma bildfil i båda lägena:**
```css
.market-btn {
  display: inline-flex;
  align-items: center;
  background: var(--gray-900); /* mörk ruta — ljust läge */
  border-radius: 8px;
  padding: 6px 12px;
}
.market-btn__img { height: 22px; width: auto; }
```
```css
/* dark-theme.css */
body[data-theme="dark"] .market-btn { background: #FFFFFF; }
body[data-theme="dark"] .market-btn:first-child .market-btn__img { filter: brightness(0); }
```
I mörkt läge blir App Store-badgen nu en **vit ruta med svart ikon** (`filter: brightness(0)` gör bilden helt svart) — `:first-child` pekar specifikt på App Store-länken (den första av de två i `.market-btns`).

⚠️ **Värt att dubbelkolla mot Figma innan redovisning:** det här är Leos senaste ändring, och den ger motsatt resultat mot vad vi tidigare verifierade skärmdump-mot-skärmdump (vit ikon, INGEN ruta, direkt mot sidans mörka bakgrund). Prata igenom det med Leo om vilken variant som faktiskt stämmer.

**Google Play — JavaScript byter bildfil, inte CSS:**
```css
/* Ingen egen mörk-läges-regel för Google Play i dark-theme.css —
   bildbytet sköts av toggle.js istället, se HTML-STRUKTUR.md. */
```
Google Play-badgen har istället fått ett `id="googlePlayBadge"` i HTML:en, och `toggle.js` byter dess `src`-attribut direkt mellan `googleplay-light.png` och `googleplay-dark.png` när temat växlas — ingen CSS-bakgrundsruta alls för den badgen. Se avsnittet om `toggle.js` i `HTML-STRUKTUR.md`.

**Bakgrund till den ursprungliga lösningen (fortfarande giltig bakgrund, även om Google Play nu avviker från den):** ett tidigare försök använde två olika bildfiler (SVG för ljust läge, PNG för mörkt) som råkade ha olika inbördes bildproportioner — det gjorde att badgen visuellt syntes olika stor mellan lägena trots identisk CSS-box.

### 3. Hamburgermenyn och tema-knappen — JS-drivna knappar

```css
.nav-toggle-btn { display: none; }
.nav-toggle-btn.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
```

**[GEMENSAM KODDEL].** Klasserna `.is-open` och attributet `data-theme` sätts av `hamburger.js`/`toggle.js` — CSS:en reagerar bara på dem, ingen `:checked`-selektor.

### 4. Ljus/mörk bildväxling utan JavaScript (loggor)

```css
.navbar__logo-img { position: absolute; transition: opacity var(--transition); }
.navbar__logo-img--dark { opacity: 0; }
```
```css
body[data-theme="dark"] .navbar__logo-img--light { opacity: 0; }
body[data-theme="dark"] .navbar__logo-img--dark { opacity: 1; }
```

Två `<img>`-taggar ovanpå varandra, tonade med `opacity` — undviker ett synligt "hopp" som ett tvärt `display`-byte gav tidigare. Samma mönster för de 6 partnerloggorna.

### 5. Karusellen — `scroll-snap`, ingen JS-slider

```css
.carousel { display: flex; overflow-x: auto; scroll-snap-type: x proximity; }
.carousel__phone--main { z-index: 2; width: min(328px, 60vw); }
.carousel__phone--side { width: min(248px, 45vw); }
```

**[PETERS KODDEL].** Bilderna (`carousel-phone-1/2/3.png`) delar samma bildproportion (328×663, matchar Figmas originalmått exakt) — ingen extra höjd/bredd-kompensation behövs. Ordningen (budget/kort/överföring) och storleksskillnaden mellan huvud- och sido-telefon är verifierad mot Figma-referens.

## Design tokens (`:root`)

| Kategori | Variabler |
|---|---|
| Grå-skala | `--gray-100` till `--gray-900` |
| Märkesfärg | `--brand-primary`, `--brand-soft` |
| Statusfärger | `--success`, `--warning`, `--error` |
| Skuggor | `--shadow-s`, `--shadow-m`, `--shadow-brand` |
| Layout | `--container-width`, `--radius-s/m/l` |
| Övergång | `--transition` |

Alla tokens definieras i `styles.css` och återanvänds fritt i `dark-theme.css`.

## Den responsiva strategin

Alla `@media`-block ligger samlade **sist i `styles.css`**, i fallande ordning: `1024px → 768px → 640px → 480px`.

| Brytpunkt | Vad händer |
|---|---|
| **≤1024px** | Grid-layouter blir en kolumn. Logos: 3 per rad. |
| **≤768px** | Hamburgermeny aktiveras. `.app-features`/`.testimonials-section` döljs helt. FAQ:s kontaktrutor byts mot en knapp. |
| **≤640px** | Rutnät blir en kolumn. Subscribe-formuläret staplas. |
| **≤480px** | `.logos` och `.header__image` döljs helt. Badge-text/loggan krymper. |

Alla `display: none`-regler är medvetna designval från Figma-filen, verifierade mot de faktiska Tablet/Mobile-sidorna.

## Att lägga till en ny komponent

1. Kommentarrubrik: `/* [DITT NAMN KODDEL] ===== Komponentnamn (Figma: "...") ===== */`
2. Använd befintliga design tokens.
3. Grid för rutnät/asymmetriska två-kolumner, Flexbox för enklare rader.
4. BEM-element/-modifierare blir ALLTID egna platta selektorer — nästla aldrig `&__x`/`&--x`.
5. Responsiva regler i rätt `@media`-block i `styles.css`.
6. Egna färger i mörkt läge → `dark-theme.css`, under motsvarande sektionsrubrik — rör aldrig layout där.
