\newpage

# Ergebnisse

## Matrizenmultiplikation
|     Sprache| Browser| Testcomputer|   N| Gesamt in s| Median in ms|  Mean in ms|
|------------|--------|-------------|----|------------|-------------|------------|
|  TypeScript|  Chrome|        Linux| 700|        3246|         2291| 4637,145714|
|  JavaScript|  Chrome|        Linux| 700|        2242|         1617| 3203,461429|
| WebAssmebly|  Chrome|        Linux| 700|        1054|          751| 1506,695714|
|  TypeScript| Firefox|        Linux| 700|        3804|         1778| 5435,227143|
|  JavaScript| Firefox|        Linux| 700|        3744|         1868| 5349,562857|
| WebAssmebly| Firefox|        Linux| 700|         945|          675| 1351,167143|
|  TypeScript|  Safari|      MacBook| 700|        1126|          737| 1609,391429|
|  JavaScript|  Safari|      MacBook| 700|        1131|          805| 1616,460000|
| WebAssmebly|  Safari|      MacBook| 700|         422|          275|  603,408571|
|  TypeScript|  Chrome|      MacBook| 700|        1466|          936| 2094,880000|
|  JavaScript|  Chrome|      MacBook| 700|        1085|          710| 1550,444286|
| WebAssmebly|  Chrome|      MacBook| 700|         535|          353|  764,708571|
|  TypeScript| Firefox|      MacBook| 700|        1348|          849| 1925,788571|
|  JavaScript| Firefox|      MacBook| 700|        1209|          766| 1727,751429|
| WebAssmebly| Firefox|      MacBook| 700|         433|          285|  619,902857|
: Ergebnisse Matrizenmultiplikation

Für den Benchmark-Algorithmus zur Matrizenmultiplikation wurde $N = 700$ gewählt. TypeScript benötigte insgesamt 3246 Sekunden für die Ausführung in Chrome auf dem Testcomputer unter Linux. Der Median betrug $2291 ms$ und der Durchschnittswert $4637,146 ms$. Bei JavaScript betrug die gesamte Laufzeit 2242 Sekunden mit einem Median von $1617 ms$ und einem Durchschnitt von $3203,461 ms$. Bei WebAssembly betrug die Gesamtlaufzeit 1054 Sekunden, mit einem Median von $751 ms$ und einem Durchschnitt von $1506,696 ms$. In Firefox auf demselben Testcomputer betrug die Gesamtausführungszeit von TypeScript 3804 Sekunden, mit einem Median von $1778 ms$ und einem Durchschnitt von $5435,227 ms$. Bei JavaScript benötigte der gesamte Benchmark-Algorithmus 3744 Sekunden, mit einem Median von $1868 ms$ und einem Durchschnitt von $5349,563 ms$. WebAssembly benötigte dabei insgesamt 945 Sekunden. Der Median betrug $675 ms$ und der Durchschnitt $1351,167 ms$. Unter Verwendung des Testcomputers MacBook und des Webbrowser Safari benötigte TypeScript insgesamt 1126 Sekunden. Der Median betrug $737 ms$ und der Durchschnittswert $1609,391 ms$. JavaScript benötigte insgesamt 1131 Sekunden, mit einem Median von $805 ms$ und einem Durchschnitt von $1616,46 ms$. WebAssembly benötigte insgesamt 422 Sekunden, mit einem Median von $275 ms$ und einem Durchschnitt von $603,409 ms$. Im Chrome-Browser auf dem Testcomputer MacBook benötigte TypeScript insgesamt 1446 Sekunden. Der Median betrug $936 ms$ und der Durchschnitt $2094,88 ms$. JavaScript benötigte für die gesamte Ausführungszeit 1085 Sekunden, mit einem Median von $710 ms$ und einem Durchschnittswert von $1550,444 ms$. WebAssembly benötigte insgesamt 535 Sekunden, mit einem Median von $353 ms$ und einem Durchschnitt von $764,709 ms$. Der Webbrowser Firefox benötigte auf dem Testcomputer MacBook für TypeScript insgesamt 1348 Sekunden. Der Median lag bei $849 ms$ und der Durchschnitt bei $1925,789 ms$. Für JavaScript benötigte der Browser insgesamt 1209 Sekunden. Die Ausführungszeit betrug im Median $766 ms$ und im Durchschnitt $1727,751 ms$. Die Ausführungszeit bei WebAssembly betrug insgesamt 433 Sekunden, mit einem Median $285 ms$ und im Durchschnitt $619,903 ms$. 

## Mandelbrotmenge
|     Sprache| Browser| Testcomputer|    N| Gesamt in s| Median in ms| Mean in ms|
|------------|--------|-------------|-----|------------|-------------|-----------|
|  TypeScript|  Chrome|        Linux| 5000|         911|          182|   182,3572|
|  JavaScript|  Chrome|        Linux| 5000|        1245|          249|   249,0044|
| WebAssmebly|  Chrome|        Linux| 5000|         664|          132|   132,9430|
|  TypeScript| Firefox|        Linux| 5000|        6928|         1397|  1385,6710|
|  JavaScript| Firefox|        Linux| 5000|        7136|         1426|  1427,2938|
| WebAssmebly| Firefox|        Linux| 5000|         682|          137|   136,4402|
|  TypeScript|  Safari|      MacBook| 5000|        1943|          389|   388,7334|
|  JavaScript|  Safari|      MacBook| 5000|        1787|          364|   357,5364|
| WebAssmebly|  Safari|      MacBook| 5000|         535|          107|   107,0936|
|  TypeScript|  Chrome|      MacBook| 5000|         580|          115|   116,0316|
|  JavaScript|  Chrome|      MacBook| 5000|         522|          105|   104,5600|
| WebAssmebly|  Chrome|      MacBook| 5000|         525|          104|   105,0474|
: Ergebnisse Mandelbrotmenge

## Interpretation der Ergebnisse
- Relevanz der Forschung für die Forschung und der Praxis

### Matrizenmultiplikation

### Mandelbrotmenge
[@fig:showcase_chrome_frist_100] zeigt sehr gut, wie JavaScript und TypeScript erst noch kompiliert und optimiert werden müssen.


![Mandelbrotmenge Chrome ersten 100 Werte](./img/showcase_chrome_frist_100.png){#fig:showcase_chrome_frist_100}



## Beantwortung der Forschungsfrage
- Bestätigung / Berichtigung der Hypothesen
