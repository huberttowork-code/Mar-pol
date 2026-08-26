# Marpol Storefront

Makieta graficzna sklepu headless dla **Marpol Radom**, hurtowni tkanin, dzianin i dodatków krawieckich działającej od 1993 roku przy ul. Ogrodniczej 48A.

Docelowo szablon ma zostać podpięty pod Shopify Storefront API. Na tym etapie to statyczna makieta: pełny layout, treści i interakcje interfejsu, bez logiki sklepu.

## Podgląd

```bash
node serve.js
```

Otwiera się na `http://localhost:4173` i serwuje dokładnie to samo co hosting.

## Wdrożenie

Strona jest statyczna i zbudowana wcześniej, więc hosting niczego nie kompiluje. Katalogiem publikowanym jest katalog główny repozytorium, w którym leży `index.html`.

Dla Netlify ustawienia siedzą w `netlify.toml`: brak komendy budowania, `publish = "."` oraz przekierowanie każdej ścieżki na `/index.html` ze statusem 200.

## Budowanie

```bash
bash src/build.sh
```

Skleja części z `src/` i wypuszcza dwa pliki:

| plik | przeznaczenie |
|---|---|
| `index.html` | pełny dokument z `<!doctype>`, `<head>` i `meta charset`, pod zwykły hosting |
| `marpol-storefront.html` | fragment bez `<html>` i `<head>`, tego formatu wymaga hosting Artifacts |

Zdjęcia idą jako base64. Każde trafia do dokumentu dokładnie raz, w mapie przypisywanej po wczytaniu DOM, dzięki czemu plik waży 2,4 MB zamiast 4,6 MB.

Wymaga `bash`, `sed`, `grep` i `base64`. Na Windowsie wystarczy Git Bash.

## Struktura

```
index.html                  plik wynikowy do wdrożenia
marpol-storefront.html      ten sam szablon jako fragment, pod Artifacts
netlify.toml                konfiguracja hostingu
serve.js                    lokalny podgląd
src/
  build.sh                  skrypt budujący
  01-head.html              <title>, fonty, tokeny, typografia, nawigacja, kontrolki
  02-home.css               hero, tabliczka, kafle, karty produktów, sekcje strony głównej
  03-views.css              katalog, karta produktu, panel B2B, stopka, kit graficzny
  04-home.html              nawigacja, symbole SVG, widok strony głównej
  05-catalog-product.html   widok katalogu i karty produktu
  06-b2b-footer.html        panel hurtowy i stopka
  07-app.html               router, zakładki, galeria, przełącznik netto/brutto
  img/                      33 zdjęcia produktowe i magazynowe
```

## Widoki

Router na hashu, cztery widoki bez przeładowania strony:

| trasa | zawartość |
|---|---|
| `#/` | hero, sześć grup asortymentu, zastosowania, bestsellery i nowości, wzorniki, historia firmy, warunki współpracy, FAQ, kontakt |
| `#/katalog` | filtry, chipy, sortowanie, siatka produktów |
| `#/produkt` | galeria, warianty koloru, stepper metrażu, stan magazynowy, specyfikacja |
| `#/b2b` | obrót, limit kupiecki, szybkie zamawianie po indeksie, historia zamówień, rezerwacje |

## Założenia projektowe

- **Jedna wersja jasna.** Bez trybu ciemnego, `color-scheme: light` ustawione na sztywno.
- **Arkusz techniczny, nie landing page.** Ostre narożniki, komórki dzielą wspólne linie 1 px, brak cieni i uniesień na hover.
- **Trzy kroje, trzy role.** Familjen Grotesk na nagłówki, Schibsted Grotesk na tekst i dane, DM Mono wyłącznie na kody indeksów i numery sekcji.
- **Trzy warstwy koloru.** Cynober `#C8321B` jako marka i interakcja, błękit kreślarski `#7C8CA0` na znaki z wykroju, osobny zestaw na stany magazynowe.
- **Ruch minimalny.** Przejścia 100 do 340 ms na hover i focus, jedno delikatne pojawienie się siatek przy scrollu, wszystko wyłączane przez `prefers-reduced-motion`.
- **Zero zależności.** Brak bibliotek i frameworków. Jedyne zasoby zewnętrzne to Google Fonts.

## Dane w makiecie

Adres, telefon, e-mail, nazwy grup, serie futer, indeksy oraz ceny taśm odblaskowych i zamków pochodzą z obecnej strony firmy.

**Do potwierdzenia u klienta przed wdrożeniem:** godziny otwarcia, kamienie milowe na osi czasu 1993 do 2026, liczby indeksów w grupach, ceny pozycji spoza listy z obecnej strony, dane konta w panelu B2B.

Zdjęcia pochodzą z obecnej strony firmy i służą wyłącznie do prezentacji makiety.
