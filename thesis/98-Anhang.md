\newpage
\setcounter{page}{1}
\pagenumbering{Roman}

# V8 Developer Ausgaben

## V8 demo.js {#sec:v8-demo.js}
![](./img/v8-demo.js.png)

## V8 demo-opt.js {#sec:v8-opt.js}
![](./img/v8-demo-opt.js.png)

## V8 demo-deopt.js {#sec:v8-deopt.js}
![](./img/v8-demo-deopt.js.png)

## D8 Abstract Syntax Tree {#sec:d8-ast-output}
![](./img/d8-ast-print.png)

## D8 Ignition Bytecode Ausgabe {#sec:v8-ignition-bytecode}
![](./img/d8-ignition-bytecode.png)

## D8 Deoptimierung Ausgabe {#sec:d8-deopt-output}
![](./img/d8-deopt-output.png)

## D8 TurboFan Ausgabe {#sec:v8-turbofan-output}
Wegen zu großem Umfang ausschließlich auf dem Speichermedium einsehbar unter `./v8-showcase/v8-turbofan-output.txt`

# Auswertung der Daten in Diagrammen

## Ergebnisse Matrizenmultiplikation der drei Durchläufe Linux Chrome
![](./img/matrix_linux_chrome_all_3.png)

## Ergebnisse Matrizenmultiplikation der drei Durchläufe Linux Firefox
![](./img/matrix_linux_firefox_all_3.png)

## Ergebnisse Matrizenmultiplikation der drei Durchläufe MacBook Safari
![](./img/matrix_macos_safari_all_3.png)

## Ergebnisse Matrizenmultiplikation der drei Durchläufe MacBook Chrome
![](./img/matrix_macos_chrome_all_3.png)

## Ergebnisse Matrizenmultiplikation der drei Durchläufe MacBook Firefox
![](./img/matrix_macos_firefox_all_3.png)

## Ergebnisse Mandelbrotmenge der drei Durchläufe Linux Chrome
![](./img/mandelbrot_linux_chrome_all_3.png)

## Ergebnisse Mandelbrotmenge der drei Durchläufe Linux Firefox
![](./img/mandelbrot_linux_firefox_all_3.png)

## Ergebnisse Mandelbrotmenge der drei Durchläufe MacBook Safari
![](./img/mandelbrot_macos_safari_all_3.png)

## Ergebnisse Mandelbrotmenge der drei Durchläufe MacBook Chrome
![](./img/mandelbrot_macos_chrome_all_3.png)

## Ergebnisse Mandelbrotmenge der drei Durchläufe MacBook Firefox
![](./img/mandelbrot_macos_firefox_all_3.png)

## Matrix Linux Boxplot Ansicht
![](./img/matrix_linux_boxplots.png)

## Matrix MacBook Boxplot Ansicht
![](./img/matrix_macos_boxplots.png)

## Mandelbrotmenge Linux Boxplot Ansicht
![](./img/mandelbrot_linux_boxplots.png)

## Matrix MacBook Boxplot Ansicht
![](./img/mandelbrot_macos_boxplots.png)

# Hypothesentest
Die Daten wurden mit DATAtab^[https://datatab.de/] analysiert.

## Matrizenmultiplikation Normalverteilung von Sprachen Daten {#sec:normalverteilt_lang_matrix}
Getestet mit Daten von Macbook Zeitwerten. $\alpha = 5\% = 0.05$.

### Test auf Normalverteilung WebAssembly
| | Statistik | p |
| --------------- | ------- | ---- |
| Kolmogorov-Smirnov | 0.2 | <0.001 |
| Kolmogorov-Smirnov (Korr. nach Lilliefors) | 0.2 | <0.001|
| Shapiro-Wilk | 0.81 | <0.001 |
| Anderson-Darling | 140.54 | <0.001 |

Es wird angenommen, dass die Daten nicht normalverteilt sind, da $p < \alpha$.

### Test auf Normalverteilung TypeScript
| | Statistik | p |
| --------------- | ------- | ---- |
| Kolmogorov-Smirnov | 0.2 | <0.001 |
| Kolmogorov-Smirnov (Korr. nach Lilliefors) | 0.2 | <0.001 |
| Shapiro-Wilk | 0.8 | <0.001 |
| Anderson-Darling | 154.19 | <0.001 |

Es wird angenommen, dass die Daten nicht normalverteilt sind, da $p < \alpha$.

### Test auf Normalverteilung JavaScript
| | Statistik | p |
| --------------- | ------- | ---- |
| Kolmogorov-Smirnov | 0.2 | <0.001 |
| Kolmogorov-Smirnov (Korr. nach Lilliefors) | 0.2 | <0.001 |
| Shapiro-Wilk | 0.81 | <0.001 |
| Anderson-Darling | 148.38 | <0.001 |

Es wird angenommen, dass die Daten nicht normalverteilt sind, da $p < \alpha$.


## Matrizenmultiplikation Normalverteilung von Webbrowser Daten {#sec:normalverteilt_webbrowser_matrix}
Getestet mit Daten von Macbook Zeitwerten. $\alpha = 5\% = 0.05$.

### Test auf Normalverteilung Chrome
| | Statistik | p |
| --------------- | ------- | ---- |
| Kolmogorov-Smirnov |	0.2 | <0.001 |
| Kolmogorov-Smirnov  (Korr. nach Lilliefors) |	0.2 | <0.001 |
| Shapiro-Wilk | 0.8 | <0.001 |
| Anderson-Darling | 48.68 | <0.001 |

Es wird angenommen, dass die Daten nicht normalverteilt sind, da $p < \alpha$.

### Test auf Normalverteilung Firefox
| | Statistik | p |
| --------------- | ------- | ---- |
| Kolmogorov-Smirnov | 0.2 | <0.001 |
| Kolmogorov-Smirnov (Korr. nach Lilliefors) | 0.2 | <0.001 |
| Shapiro-Wilk | 0.82 | <0.001 |
| Anderson-Darling | 45.28 | <0.001 |

Es wird angenommen, dass die Daten nicht normalverteilt sind, da $p < \alpha$.

### Test auf Normalverteilung Safari
| | Statistik | p |
| --------------- | ------- | ---- |
| Kolmogorov-Smirnov | 0.2 | <0.001 |
| Kolmogorov-Smirnov (Korr. nach Lilliefors) | 0.2 | <0.001 |
| Shapiro-Wilk | 0.81 | <0.001 |
| Anderson-Darling | 49.28 | <0.001 |

Es wird angenommen, dass die Daten nicht normalverteilt sind, da $p < \alpha$.

## Mandelbrotmenge Normalverteilung von Webbrowser Daten {#sec:normalverteilt_webbrowser_mandel}
Getestet mit Daten von Macbook Zeitwerten. $\alpha = 5\% = 0.05$.

### Test auf Normalverteilung Chrome
| | Statistik | p |
| --------------- | ------- | ---- |
| Kolmogorov-Smirnov | 0.06 | <0.001 |
| Kolmogorov-Smirnov (Korr. nach Lilliefors) | 0.06 | <0.001 |
| Shapiro-Wilk | 0.96 | <0.001 |
| Anderson-Darling | 51.79 | <0.001 |

Es wird angenommen, dass die Daten nicht normalverteilt sind, da $p < \alpha$.

### Test auf Normalverteilung Firefox
| | Statistik | p |
| --------------- | ------- | ---- |
| Kolmogorov-Smirnov | 0.06 | <0.001 |
| Kolmogorov-Smirnov (Korr. nach Lilliefors) | 0.06 | <0.001 |
| Shapiro-Wilk | 0.96 | <0.001 |
| Anderson-Darling | 53.19 | <0.001 |

Es wird angenommen, dass die Daten nicht normalverteilt sind, da $p < \alpha$.

### Test auf Normalverteilung Safari
| | Statistik | p |
| --------------- | ------- | ---- |
| Kolmogorov-Smirnov | 0.06 | <0.001 |
| Kolmogorov-Smirnov (Korr. nach Lilliefors) | 0.06 | <0.001 |
| Shapiro-Wilk | 0.96 | <0.001 |
| Anderson-Darling | 53.22 | <0.001 |

Es wird angenommen, dass die Daten nicht normalverteilt sind, da $p < \alpha$.

## Berechnungen Matrix Linux WebAssembly zu JavaScript und TypeScript {#sec:comp_wasm_fast_linux}

### WebAssembly zu TypeScript in Chrome
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 1436.96 | 748.33 | 1607.48 |
| TypeScript | 700 | 4617.9 | 2289.5 | 5114.07 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 165433.5 | -10.52 | 1 | 1 | 0.28 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Chrome
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 1436.96 | 748.33 | 1607.48 |
| JavaScript | 700 | 3198.93 | 1625 | 3552.64 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 185919 | -7.81 | 1 | 1 | 0.21 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu TypeScript in Firefox
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 1265.98 | 677 | 1420.04 |
| TypeScript | 700 | 5470.23 | 1826.17 | 7037.73 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 171393 | -9.73 | 1 | 1 | 0.26 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Firefox
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 1265.98 | 677 | 1420.04 |
| JavaScript | 700 | 5369.33 | 1953.83 | 6816.17 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 167722.5 | -10.22 | 1 | 1 | 0.27 |

Nullhypothese wird angenommen, da $p > \alpha$


## Berechnungen Matrix MacBook WebAssembly zu JavaScript und TypeScript {#sec:comp_wasm_fast_macos}

### WebAssembly zu TypeScript in Safari
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 610.69 | 278.33 | 713.63 |
| TypeScript | 700 | 1612.35 | 737.17 | 1897.05 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 180737 | -8.5 | 1 | 1 | 0.23 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Safari
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 610.69 | 278.33 | 713.63 |
| JavaScript | 700 | 1618.36 | 805.67 | 1869.29 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 178399.5 | -8.81 | 1 | 1 | 0.24 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu TypeScript in Chrome
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 760.57 | 350.67 | 909.29 |
| TypeScript | 700 | 2092.95 | 936.5 | 2477.03 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 178072.5 | -8.85 | 1 | 1 | 0.24 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Chrome
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 760.57 | 350.67 | 909.29 |
| JavaScript | 700 | 1577.89 | 753.83 | 1883.05 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 193073 | -6.87 | 1 | 1 | 0.18 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu TypeScript in Firefox
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 627.11 | 292.83 | 730.76 |
| TypeScript | 700 | 1940.34 | 858 | 2364.21 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 174399.5 | -9.33 | 1 | 1 | 0.25 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Firefox
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 700 | 627.11 | 292.83 | 730.76 |
| JavaScript | 700 | 1749.56 | 778.83 | 2132.27 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 178891 | -8.74 | 1 | 1 | 0.23 |

Nullhypothese wird angenommen, da $p > \alpha$

## Berechnungen Mandelbrot Linux WebAssembly zu JavaScript und TypeScript {#sec:comp_wasm_fast_linux_mandel}

### WebAssembly zu TypeScript in Chrome
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 134.99 | 135.33 | 76.13 |
| TypeScript | 5000 | 183.61 | 182.5 | 98.71 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 8951718.5 | -24.58 | 1 | 1 | 0.25 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Chrome
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 134.99 | 135.33 | 76.13 |
| JavaScript | 5000 | 252.06 | 251.17 | 141.6 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 6528354 | -41.37 | 1 | 1 | 0.41 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu TypeScript in Firefox
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 136.84 | 137 | 77.34 |
| TypeScript | 5000 | 1390.13 | 1406.5 | 768.35 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1000774.5 | -79.67 | 1 | 1 | 0.8 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Firefox
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 136.84 | 137 | 77.34 |
| JavaScript | 5000 | 1443.95 | 1441.83 | 812.48 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 994778 | -79.71 | 1 | 1 | 0.8 |

Nullhypothese wird angenommen, da $p > \alpha$

## Berechnungen Mandelbrot MacBook WebAssembly zu JavaScript und TypeScript {#sec:comp_wasm_fast_macos_mandel}

### WebAssembly zu TypeScript in Safari
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 107.06 | 106.5 | 60.63 |
| TypeScript | 5000 | 387.16 | 387.33 | 213.04 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 3032267 | -65.59 | 1 | 1 | 0.66 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Safari
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 107.06 | 106.5 | 60.63 |
| JavaScript | 5000 | 346.5 | 348.83 | 192.33 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 3564824.5 | -61.9 | 1 | 1 | 0.62 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu TypeScript in Chrome
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 106.89 | 106 | 61.31 |
| TypeScript | 5000 | 117.02 | 116.33 | 64.82 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 11377895 | -7.77 | 1 | 1 | 0.08 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Chrome
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 106.89 | 106 | 61.31 |
| JavaScript | 5000 | 107.91 | 107.67 | 60.21 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 12363809.5 | -0.94 | 0.827 | 0.827 | 0.01 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu TypeScript in Firefox
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe TypeScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe TypeScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 101.03 | 101 | 57.43 |
| TypeScript | 5000 | 768.98 | 768.83 | 431.77 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1414378 | -76.8 | 1 | 1 | 0.77 |

Nullhypothese wird angenommen, da $p > \alpha$

### WebAssembly zu JavaScript in Firefox
- $H_0$: Die Gruppe WebAssembly hat kleinere oder gleiche Werte bei der abhängigen Variable wie die Gruppe JavaScript.
- $H_1$: Die Gruppe WebAssembly hat größere Werte bei der abhängigen Variable als die Gruppe JavaScript.

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| WebAssembly | 5000 | 101.03 | 101 | 57.43 |
| JavaScript | 5000 | 810.3 | 808.17 | 461.06 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1367806 | -77.12 | 1 | 1 | 0.77 |

Nullhypothese wird angenommen, da $p > \alpha$

## Berechnung Differenz WebAssembly zu JavaScript und TypeScript {#sec:diff_wasm_js_ts_time}
Die Differenz wird berechnet durch $Diff = T_{WASM} - T_{JS/TS}$. Die Prozentuale Veränderung wird berechnet durch $\frac{Diff}{T_{JS/TS}} \times 100$.

| Vergleich  | Testcomputer | Benchmark | Browser | Differenz | Prozentuale Veränderung |
| ---------- | -------- | --------- | ------- | --------- | ---------- |
| WASM -> JS | Linux    | Matrix    | Chrome  | -1761,91  | -55%
| WASM -> TS | Linux    | Matrix    | Chrome  | -3180,94  | -69%
| WASM -> JS | Linux    | Matrix    | Firefox | -4103,35  | -76%
| WASM -> TS | Linux    | Matrix    | Firefox | -4204,25  | -77%
| WASM -> JS | Linux    | Mandelbrot| Chrome  | -117,07   | -46%
| WASM -> TS | Linux    | Mandelbrot| Chrome  | -48,62    | -26%
| WASM -> JS | Linux    | Mandelbrot| Firefox | -1307,11  | -91%
| WASM -> TS | Linux    | Mandelbrot| Firefox | -1253,29  | -90%
| WASM -> JS | MacBook  | Matrix    | Safari  | -1007,67  | -62%
| WASM -> TS | MacBook  | Matrix    | Safari  | -1001,66  | -62%
| WASM -> JS | MacBook  | Matrix    | Chrome  | -817,32   | -52%
| WASM -> TS | MacBook  | Matrix    | Chrome  | -1269,38  | -61%
| WASM -> JS | MacBook  | Matrix    | Firefox | -1122,45  | -64%
| WASM -> TS | MacBook  | Matrix    | Firefox | -1313,23  | -68%
| WASM -> JS | MacBook  | Mandelbrot| Safari  | -239,44   | -69%
| WASM -> TS | MacBook  | Mandelbrot| Safari  | -280,10   | -72%
| WASM -> JS | MacBook  | Mandelbrot| Chrome  | -1,02     | -0,95%
| WASM -> TS | MacBook  | Mandelbrot| Chrome  | -10,13    | -8,66%
| WASM -> JS | MacBook  | Mandelbrot| Firefox | -709,27   | -88%
| WASM -> TS | MacBook  | Mandelbrot| Firefox | -667,95   | -87%







































## Berechnungen Matrix MacBook Webbrowser {#sec:htest_matrix_macbook_browser}

### Kruskal-Wallis Test {#sec:anova_matrix_macbook_browser}
- $H_0$: Es gibt keinen Unterschied zwischen den 3 Kategorien der unabhängigen Variable in Bezug auf die abhängige Variable
- $H_1$: Es gibt einen Unterschied zwischen den 3 Kategorien der unabhängigen Variable in Bezug auf die abhängige Variable

#### Ränge
| Gruppe | n | Median | Mittlerer Rang |
| ------ | ---- | ------ | ------- |
| Chrome  | 700 | 350.67 | 1092.5 |
| Firefox | 700 | 292.83 | 1035.37 |
| Safari  | 700 | 278.33 | 1023.63 |
| Gesamt  | 2100 | 307.67 | |

#### Kruskal-Wallis-Test
| $Chi^2$ | df | p |
| ------- | --- | ---- |
| 5.17 | 2 | 0.075 |

Nullhypothese wird angenommen, da $p > \alpha$

## Berechnungen Matrix Linux Webbrowser {#sec:htest_matrix_linux_browser}
- $H_0$: Es gibt keinen Unterschied zwischen den Gruppen Chrome und Firefox in Bezug auf die abhängige Variable
- $H_1$: Es gibt einen Unterschied zwischen den Gruppen Chrome und Firefox in Bezug auf die abhängigen Variable

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| Chrome | 700 | 1436.96 | 748.33 | 1607.48 |
| Firefox | 700 | 1265.98 | 677 | 1420.04 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 234597.5 | -1.38 | 0.169 | 0.169 | 0.04 |

Nullhypothese wird angenommen, da $p > \alpha$

## Berechnungen Mandelbrotmenge MacBook Webbrowser {#sec:htest_mandel_macbook_browser}

### Kruskal-Wallis Test {#sec:anova_mandel_macbook_browser}
- $H_0$: Es gibt keinen Unterschied zwischen den 3 Kategorien der unabhängigen Variable in Bezug auf die abhängige Variable
- $H_1$: Es gibt einen Unterschied zwischen den 3 Kategorien der unabhängigen Variable in Bezug auf die abhängige Variable

#### Ränge
| Gruppe | n | Median | Mittlerer Rang |
| ------ | ---- | ------ | ------- |
| Chrome  | 5000 | 106 | 7628.12 |
| Firefox | 5000 | 101 | 7223.94 |
| Safari  | 5000 | 106.5 | 7649.44 |
| Gesamt  | 15000 | 104.5 | |

#### Kruskal-Wallis-Test
| $Chi^2$ | df | p |
| ------- | --- | ---- |
| 30.65 | 2 | <0.001 |

Nullhypothese wird abgelehnt, da $p < \alpha$

#### Post-hoc-Test
| | Teststatistik | Standardfehler| Std. Teststatistik | p | Anp. p |
| ---------------- | ------- | ------ | ----- | ------- | ----- |
| Chrome - Firefox | 404.18 | 86.61 | 4.67 | <0.001 | <0.001 |
| Chrome - Safari  | -21.32 | 86.61 | -0.25 | 0.806 | 1 |
| Firefox - Safari | -425.5 | 86.61 | -4.91 | <0.001 | <0.001 |

Es scheint einen signifikanten Unterschied zwischen Safari und Firefox sowie zwischen Chrome und Firefox zu geben, nicht aber zwischen Chrome und Safari.

### u-Test zwischen Chrome und Safari {#sec:utest_mandel_macbook_browser_safari_chrome}
- $H_0$: Es gibt keinen Unterschied zwischen den Gruppen Chrome und Safari in Bezug auf die abhängige Variable
- $H_1$: Es gibt einen Unterschied zwischen den Gruppen Chrome und Safari in Bezug auf die abhängigen Variable

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| Chrome | 5000 | 106.89 | 106 | 61.31 |
| Safari | 5000 | 107.06 | 106.5 | 60.63 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 12467040 | -0.23 | 0.819 | 0.819 | 0 |

Nullhypothese wird angenommen, da $p > \alpha$

## Berechnungen Mandelbrotmenge Linux Webbrowser {#sec:htest_mandel_linux_browser}
- $H_0$: Es gibt keinen Unterschied zwischen den Gruppen Chrome und Firefox in Bezug auf die abhängige Variable
- $H_1$: Es gibt einen Unterschied zwischen den Gruppen Chrome und Firefox in Bezug auf die abhängigen Variable

#### Deskriptive Statistiken
|        | n	| Mittelwert | Standardabweichung | Standardfehler Mittelwert |
| ------ | ---- | ---------- | ------------------ | ----------------------- |
| Chrome | 5000 | 134.99 | 135.33 | 76.13 |
| Firefox | 5000 | 136.84 | 137 | 77.34 |

#### Mann-Whitney U-Test
| U | z | asymptotisch | p | exakt | p | r |
| --- | ---- | ---- | ---- | ---- | ---- | ---- |
| 12326828.5 | -1.2 | 0.23 | 0.23 | 0.01 |

Nullhypothese wird angenommen, da $p > \alpha$

