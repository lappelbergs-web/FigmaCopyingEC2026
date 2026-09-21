# Silicon – responsiv landningssida för mobilbank

Silicon är en landningssida för en fiktiv mobilbank. Projektet ingår i ett grupparbete där sidan delas upp i sektioner. Den här versionen finns på `leo-branch` och är byggd med HTML, CSS och JavaScript.

Sidan är en gränssnittsdemo. Den hanterar inga riktiga bankkonton, betalningar eller prenumerationer.

## Syfte och målgrupp

Sidans syfte är att presentera mobilbankens tänkta funktioner och hjälpa besökaren att förstå hur appen skulle kunna användas. Innehållet riktar sig till personer som är intresserade av att hantera betalningar och överföringar i mobilen.

## Sektioner på `leo-branch`

| Sektion eller del | Innehåll | Kod i `index.html` |
| --- | --- | --- |
| Sidhuvud och introduktion | Logotyp, temaväxling, meny, appbutiksknappar och mobilbilder | `.site-header`, `.hero` |
| Partnerlogotyper | Logotyper i en responsiv rad | `.logos` |
| Appfunktioner | Sex funktioner med ikoner och beskrivningar | `.app-features` |
| Så fungerar appen | Mobilbilder och text som visar ett tänkt användarflöde | `.how-it-works` |
| Betalningar och överföringar | Två delar om överföringar och internationella betalningar | `.money-tools` |
| Kundomdömen | Två exempel på kundomdömen | `.testimonials` |
| Vanliga frågor | Frågor med svar som kan fällas ut | `.faq` |
| Nyhetsbrev | Formulär för e-postadress | `.newsletter` |
| Sidfot | Copyrighttext | `.site-footer` |

Sektionernas struktur finns i `index.html`, deras utseende i `styles.css` och de interaktiva funktionerna i `script.js`.

## Kom igång

Projektet har inga externa beroenden och behöver inte byggas.

1. Klona eller ladda ner projektet.
2. Öppna projektmappen i VS Code.
3. Öppna `index.html` i en webbläsare.

Vill du att sidan ska uppdateras automatiskt när du sparar ändringar kan du använda ett VS Code-tillägg som Live Server. Det är valfritt.

## Projektstruktur

```text
.
├── index.html       # Sidans innehåll och HTML-struktur
├── styles.css       # Layout, färgteman och responsiva regler
├── script.js        # Temaväxling, surfplattemeny och FAQ
├── images/          # Logotyper, ikoner och övriga bilder
└── README.md        # Projektdokumentation
```

## Design och responsivitet

Sidan har layouter för mobil, surfplatta och dator. CSS-regler anpassar bland annat sektionernas placering, textstorlekar och vilka bilder som visas vid olika skärmbredder. Färgerna för ljust och mörkt läge styrs med CSS-variabler nära början av `styles.css`.

### Ett designproblem och dess lösning

Mobilbilderna och innehållet behöver få plats på skärmar med mycket olika bredd. Projektet löser det med CSS-regler för olika skärmstorlekar och med bildvarianter som visas i olika layouter. Det är ett konkret exempel att visa när gruppen berättar om arbetets utmaningar.

## Interaktiva funktioner

- **Ljust och mörkt läge:** Vid första besöket används webbläsarens systeminställning. Ett manuellt val sparas i `localStorage` och används vid senare besök.
- **Surfplattemeny:** Menyn kan öppnas med menyknappen och stängs vid klick utanför menyn eller med Escape.
- **Vanliga frågor:** Frågorna använder HTML-elementet `<details>`. JavaScript väljer vilken fråga som är öppen från början beroende på skärmbredd.

## Tillgänglighet och SEO

Sidan använder bland annat `<header>`, `<main>`, `<section>` och `<footer>` för struktur, rubriker för innehållets nivåer och alternativa texter för flera bilder. Formulärets e-postfält har en etikett. Surfplattemenyn uppdaterar `aria-expanded` och kan stängas med Escape. Temareglaget har en särskild fokusmarkering, och vissa animationer stängs av för besökare som föredrar mindre rörelse.

Sidans `<title>` och rubriker ger en grund för sökmotorer att förstå innehållet. Någon metabeskrivning för sökresultat finns ännu inte. Före redovisningen bör gruppen även kontrollera tangentbordsnavigering, fokusmarkeringar och färgkontraster manuellt.

## Ändra sidan

- Redigera texter, länkar och sektioner i `index.html`.
- Justera färger, avstånd och responsiva regler i `styles.css`.
- Ändra interaktivt beteende i `script.js`.
- Lägg till eller byt ut bilder i `images/` och uppdatera deras filvägar och alternativa texter.

## Delar som fortfarande är demo

- Inloggningsknapparna är inte kopplade till ett kontosystem.
- Appbutiksknapparna och länkarna ”Learn more” använder tillfälliga `#`-adresser.
- Nyhetsbrevsformuläret är inte kopplat till en prenumerationstjänst.
- Telefonnummer och e-postadress i kontaktsektionen är platshållare.
- Länken ”Contact us now” leder till `contact.html`, som inte finns i projektet.
- Menyknappen i mobilläget öppnar ännu ingen meny; den interaktiva menyn är gjord för surfplattelayouten.
- Vissa beskrivningar och FAQ-svar innehåller platshållartext.

## Kontrollera ändringar

Kontrollera sidan i mobil-, surfplatte- och datorstorlek efter ändringar. Prova temaväxlingen och ladda om sidan för att se att valet sparas. Kontrollera även surfplattemenyn, frågorna, bilderna och länkarna med både mus och tangentbord.

## Inför redovisningen

- Demonstrera sidans viktigaste sektioner i mobil-, surfplatte- och datorstorlek.
- Visa temaväxlingen, surfplattemenyn och FAQ-sektionen.
- Gå igenom sidans semantiska struktur, tangentbordsnavigering, fokusmarkeringar och färgkontraster.
- Förklara hur bilder och layout anpassas till olika skärmbredder.
- Bestäm inom gruppen vem som presenterar respektive del.
