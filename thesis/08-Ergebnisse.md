\newpage

# Ergebnisse

## Aufbereitung und Auswertung der Daten
Die Benchmark-Algorithmen werden für jeden Browser $k$ mal ausgeführt. Somit liegen pro Browser $k$ Zeitwerte für JavaScript, TypeScript und WebAssembly vor. Daraus ergibt sich die Menge $T_i=\{t_1, t_2, ..., t_n\}$. Dabei steht $t$ für die gemessene Ausführungszeit, $n$ für die Anzahl der Benchmarkiteration und $i$ und $j$ für den Durchlauf als Laufvariable, wobei $1 \le i \le k$ und $1 \le j \le n$. Um aus diesen $n$-Zeitwerten für eine Sprache einen einzigen, allgemeinen durschnittliche Menge $\overline{T_i}$ zu erhalten, wird der Durchschnitt (Mean) aus der Menge $T_i$ ermittel [@kounev_systems_2020, S. 57]. Der Mean ist definiert als:

$$
\overline{m} = \frac{1}{n}\sum^{n}_{i=1}x_i
$$

Aus den Durchschnittswerten der Menge $\overline{T_i}$ für einen Sprache $S$ eines Benchmarks wird wieder der Durchschnitt $\overline{S}$ ermittelt, um die durschnittliche Ausführungszeit mit den anderen Sprachen zu vergleichen [@kounev_systems_2020, S. 58]. Daraus ergibt sich folgende Berechnungen:

Sei $k = 3$ und $n = 700$
$$
\overline{T_i} = \frac{1}{n}\sum^{n}_{j=1}t_j = \frac{t_1 + t_2 + ... + t_n}{n} = \frac{t_1 + t_2 + ... + t_{700}}{700}
$$

$$
\overline{S} = \frac{1}{k} \sum^{k}_{i=1} \overline{T_i} = \frac{\overline{T_1} + \overline{T_2} + \overline{T_3}}{3}
$$

Als Kontrollwert wird zusätzlich zu dem Durschnitt der Median der Menge berechnet. Der Median ist der Wert, der in der Mitte einer aufsteigend sortieren Menge von Werten liegt und ist definiert als:

$$
median = \begin{cases}
x_{\frac{n+1}{2}} & \text{falls } n \text{ ungerade} \\
(x_{\frac{n}{2}}+x_{\frac{n}{2}+1})/2 & \text{falls } n \text{ gerade}
\end{cases}
$$

Zusätzlich werden die Durchschnittswerte von der Menge $\overline{T_i}$ als Boxplot dargestellt, um so die Laufzeiten der Menge im Vergleich zu einer anderen Implementierung zu vergleichen. Die Werte aus der Menge $\overline{T_i}$ werden zur Auswertung und Analyse von Hypothesentests in [@sec:hypothesentests] verwendet. Es werden lediglich die Laufzeiten eines Benchmarks auf einem System verglichen, und zwar hinsichtlich der verschiedenen Webbrowser. Ein Vergleich der Metriken zwischen verschiedenen Benchmark-Algorithmen und verschiedenen Systemen ist nicht sinnvoll. 

## Matrizenmultiplikation
|     Sprache| Browser| Testcomputer|   N| Gesamt in s| Median in ms| Mean in ms|
|------------|--------|-------------|----|------------|-------------|-----------|
|  TypeScript|  Chrome|        Linux| 700|     3232,53|      2289,50|    4617,90|
|  JavaScript|  Chrome|        Linux| 700|     2239,25|      1625,00|    3198,93|
| WebAssmebly|  Chrome|        Linux| 700|     1005,87|       748,33|    1436,96|
|  TypeScript| Firefox|        Linux| 700|     3829,16|      1826,17|    5470,23|
|  JavaScript| Firefox|        Linux| 700|     3758,53|      1953,83|    5369,33|
| WebAssmebly| Firefox|        Linux| 700|      886,18|       677,00|    1265,98|
|  TypeScript|  Safari|      MacBook| 700|     1128,64|       737,17|    1612,35|
|  JavaScript|  Safari|      MacBook| 700|     1132,85|       805,67|    1618,36|
| WebAssmebly|  Safari|      MacBook| 700|      427,48|       278,33|     610,69|
|  TypeScript|  Chrome|      MacBook| 700|     1465,06|       936,50|    2092,95|
|  JavaScript|  Chrome|      MacBook| 700|     1104,53|       753,83|    1577,89|
| WebAssmebly|  Chrome|      MacBook| 700|      532,40|       350,67|     760,57|
|  TypeScript| Firefox|      MacBook| 700|     1358,24|       858,00|    1940,34|
|  JavaScript| Firefox|      MacBook| 700|     1224,69|       778,83|    1749,56|
| WebAssmebly| Firefox|      MacBook| 700|      438,98|       292,83|     627,11|
: Ergebnisse Matrizenmultiplikation

Für den Benchmark-Algorithmus zur Matrizenmultiplikation wurde $N = 700$ gewählt. TypeScript benötigte insgesamt 3232,53 Sekunden für die Ausführung in Chrome auf dem Testcomputer unter Linux. Der Median betrug $2289,50 ms$ und der Durchschnittswert $4617,90 ms$. Bei JavaScript betrug die gesamte Laufzeit 2239,25 Sekunden mit einem Median von $1625 ms$ und einem Durchschnitt von $3198,93 ms$. Bei WebAssembly betrug die Gesamtlaufzeit 1005,87 Sekunden, mit einem Median von $748,33 ms$ und einem Durchschnitt von $1436,96 ms$. In Firefox auf demselben Testcomputer betrug die Gesamtausführungszeit von TypeScript 3829,16 Sekunden, mit einem Median von $1826,17 ms$ und einem Durchschnitt von $5470,23 ms$. Bei JavaScript benötigte der gesamte Benchmark-Algorithmus 3758,53 Sekunden, mit einem Median von $1953,83 ms$ und einem Durchschnitt von $5369,33 ms$. WebAssembly benötigte dabei insgesamt 886,18 Sekunden. Der Median betrug $677 ms$ und der Durchschnitt $1265,98 ms$. Unter Verwendung des Testcomputers MacBook und des Webbrowser Safari benötigte TypeScript insgesamt 1128,64 Sekunden. Der Median betrug $737,17 ms$ und der Durchschnittswert $1612,35 ms$. JavaScript benötigte insgesamt 1132,85 Sekunden, mit einem Median von $805,67 ms$ und einem Durchschnitt von $1618,36 ms$. WebAssembly benötigte insgesamt 427,48 Sekunden, mit einem Median von $278,33 ms$ und einem Durchschnitt von $610,69 ms$. Im Chrome Browser auf dem Testcomputer MacBook benötigte TypeScript insgesamt 1465,06 Sekunden. Der Median betrug $936,50 ms$ und der Durchschnitt $2092,95 ms$. JavaScript benötigte für die gesamte Ausführungszeit 1104,53 Sekunden, mit einem Median von $753,83 ms$ und einem Durchschnittswert von $1577,89 ms$. WebAssembly benötigte insgesamt 532,40 Sekunden, mit einem Median von $350,67 ms$ und einem Durchschnitt von $760,57 ms$. Der Webbrowser Firefox benötigte auf dem Testcomputer MacBook für TypeScript insgesamt 1358,24 Sekunden. Der Median lag bei $858 ms$ und der Durchschnitt bei $1940,34 ms$. Für JavaScript benötigte der Browser insgesamt 1224,69 Sekunden. Die Ausführungszeit betrug im Median $778,83 ms$ und im Durchschnitt $1749,56 ms$. Die Ausführungszeit bei WebAssembly betrug insgesamt 438,98 Sekunden, mit einem Median $292,83 ms$ und im Durchschnitt $627,11 ms$. 

## Mandelbrotmenge
|     Sprache| Browser| Testcomputer|    N| Gesamt in s| Median in ms| Mean in ms|
|------------|--------|-------------|-----|------------|-------------|-----------|
|  TypeScript|  Chrome|        Linux| 5000|      918,07|       182,50|     183,61|
|  JavaScript|  Chrome|        Linux| 5000|     1260,32|       251,17|     252,06|
| WebAssmebly|  Chrome|        Linux| 5000|      674,96|       135,33|     134,99|
|  TypeScript| Firefox|        Linux| 5000|     6950,67|      1406,50|    1390,13|
|  JavaScript| Firefox|        Linux| 5000|     7219,73|      1441,83|    1443,95|
| WebAssmebly| Firefox|        Linux| 5000|      684,19|       137,00|     136,84|
|  TypeScript|  Safari|      MacBook| 5000|     1935,81|       387,33|     387,16|
|  JavaScript|  Safari|      MacBook| 5000|     1732,48|       348,83|     346,50|
| WebAssmebly|  Safari|      MacBook| 5000|      535,29|       106,50|     107,06|
|  TypeScript|  Chrome|      MacBook| 5000|      585,10|       116,33|     117,02|
|  JavaScript|  Chrome|      MacBook| 5000|      539,56|       107,67|     107,91|
| WebAssmebly|  Chrome|      MacBook| 5000|      534,44|       106,00|     106,89|
|  TypeScript| Firefox|      MacBook| 5000|     3844,92|       768,83|     768,98|
|  JavaScript| Firefox|      MacBook| 5000|     4051,49|       808,17|     810,30|
| WebAssmebly| Firefox|      MacBook| 5000|      505,14|       101,00|     101,03|
: Ergebnisse Mandelbrotmenge

Für den Benchmark-Algorithmus zur Mandelbrotmenge wurde ein Wert von $N = 5.000$ gewählt. Unter Verwendung von TypeScript in Chrome auf einem Linux-Testcomputer betrug die Gesamtzeit 918,07 Sekunden, mit einem Median von $182,50 ms$ und einem Durchschnitt von $183,61 ms$. JavaScript benötigte insgesamt 1260,32 Sekunden, mit einem Median von $251,17 ms$ und einem Durchschnitt von $252,06 ms$. WebAssembly benötigte insgesamt 674,96 Sekunden, mit einem Median von $135,33 ms$ und einem Durchschnitt von $134,99$. Im Firefox benötigte der Benchmark für TypeScript insgesamt 6950,67 Sekunden, mit einem Median von $1406,50 ms$ und einem Durchschnitt von $1390,13 ms$. JavaScript benötigte insgesamt 7219,73 Sekunden. Die Laufzeit betrug im Median $1441,83 ms$ und im Durchschnitt $1443,95 ms$. WebAssembly benötigte eine Gesamtlaufzeit von 684,19 Sekunden, mit einem Median von $137 ms$ und einem Durchschnitt von $136,84 ms$. Auf dem MacBook in Safari benötigte TypeScript insgesamt 1935,81 Sekunden, mit einem Median von $387,33 ms$ und einem Durchschnitt von $387,16 ms$. JavaScript benötigte insgesamt 1732,48 Sekunden, mit einem Median von $348,83 ms$ und einem Durchschnittswert von $346,50 ms$. WebAssembly benötigte insgesamt 535,29 Sekunden mit einem Median von $106,50 ms$ und einem Durchschnitt von $107,06 ms$. In Chrome benötigte TypeScript insgesamt 585,10 Sekunden, mit einem Median von $116,33 ms$ und einem Durchschnitt von $117,02 ms$. JavaScript benötigte insgesamt 539,56 Sekunden, mit einem Median von $107,67 ms$ und einem Durchschnittswert von $107,91 ms$. WebAssembly benötigte eine Gesamtlaufzeit von 534,44 Sekunden, mit einem Median von $106 ms$ und einem Durchschnitt von $106,89 ms$. TypeScript in Firefox benötigte insgesamt 3844,92 Sekunden, mit einem Median von $768,83 ms$ und einem Durchschnittswert von $768,98 ms$. JavaScript benötigte insgesamt 4051,49 Sekunden, mit einem Median von $808,17 ms$ und einem Durchschnittswert von $810,30 ms$. WebAssembly benötigte insgesamt 505,14 Sekunden, mit einem Median von $101 ms$ und einem Durchschnitt von $101,03 ms$.

[@fig:showcase_chrome_frist_100] zeigt sehr gut, wie JavaScript und TypeScript erst noch zur Laufzeit kompiliert und optimiert werden müssen.

![Mandelbrotmenge Chrome ersten 100 Werte](./img/showcase_chrome_frist_100.png){#fig:showcase_chrome_frist_100 width=80%}

## Beantwortung der Forschungsfrage {#sec:hypothesentests}
- [ ] RQ1: Welchen messbaren Einfluss hat der Einsatz von WebAssembly im Vergleich zu JavaScript und TypeScript auf die Leistung einer Webanwendung in Bezug auf die Ausführungsgeschwindigkeit?

### Forschungsfrage RQ2
Für diese Forschungsfrage werden die Ausführungszeiten von WebAssembly im Vergleich zu JavaScript und TypeScript mittels des einseitig gerichteten Mann-Whitney U-Tests berechnet und analysiert. Es wird untersucht, ob WebAssembly in der Ausführungszeit signifikant schneller ist als JavaScript und TypeScript. Dabei wird ein Signifikanzniveau von $\alpha = 5\% = 0,05$ gesetzt und folgende Null- und Alternativhypothesen werden aufgestellt:

- $H_0$: WebAssembly ist in jeder Ausführung signifikant schneller als JavaScript und TypeScript
- $H_1$: $\neg H_0$

Der Benchmark der Matrizenmultiplikation auf dem Linux-System zeigt durch den Mann-Whitney U-Test, dass WebAssembly in allen Ausführungen in Chrome und Firefox immer eine signifikant schnellere Ausführungszeit aufweist (siehe [Anhang @sec:comp_wasm_fast_linux]). Auch auf dem MacBook ist WebAssembly durchgehend signifikant schneller als JavaScript und TypeScript (siehe [Anhang @sec:comp_wasm_fast_macos]). Somit zeigt WebAssembly in diesem Benchmark eine signifikant schnellere Ausführungszeit im Vergleich zu JavaScript und TypeScript.

Auch bei der Mandelbrotmenge auf dem Linux- und MacBook-Testrechner weist WebAssembly immer eine signifikant schnellere Ausführungszeit im Vergleich zu JavaScript und TypeScript auf (siehe Anhang @sec:comp_wasm_fast_macos_mandel und @sec:comp_wasm_fast_linux_mandel). Interessant ist die Auswertung des Mandelbrot-Benchmark-Algorithmus auf dem MacBook zwischen JavaScript und WebAssembly. Hier ist der Unterschied zwischen den Laufzeiten sehr gering. WebAssembly ist im Durchschnitt nur um $10,13 ms$ schneller als TypeScript und um nur $1,025 ms$ schneller als JavaScript. Dies liegt jedoch nicht daran, dass WebAssembly in Chrome in diesem Benchmark langsamer läuft als in anderen Browsern, wie im nächsten Kapitel analysiert wird. Vielmehr zeigen JavaScript und TypeScript in Chrome eine sehr schnelle Ausführungszeit. Dennoch kann durch diese Untersuchung die Nullhypothese angenommen werden, dass WebAssembly in der Ausführung immer signifikant schneller als JavaScript und TypeScript ist. Die Forschungsfrage kann somit mit Ja beantwortet werden.

### Forschungsfrage RQ3
Um die Forschungsfrage zu beantworten, ob WebAssembly in verschiedenen Webbrowsern eine gleiche Ausführungszeit aufweist, wird auf dem MacBook-Testrechner der Kruskal-Wallis-Test durchgeführt. Dieser Test bestimmt, ob signifikante Unterschiede zwischen den Stichproben bestehen. Da der Kruskal-Wallis-Test lediglich feststellt, ob ein signifikanter Unterschied besteht, wird im Anschluss der Post-hoc-Test durchgeführt. Dieser Test vergleicht verschiedene Gruppen, um herauszufinden, ob es signifikante Unterschiede zwischen ihnen gibt. Der Post-hoc-Test wird allerdings nur angewendet, wenn der Kruskal-Wallis-Test einen signifikanten Unterschied erkennt, ansonsten wird angenommen, das die Ausführungszeiten von WebAssembly zwischen den Webbrowsern gleich ist. Da die Daten der Webbrowser-Tests für Matrizenmultiplikation und Mandelbrotmenge nicht normalverteilt sind (siehe [Anhang @sec:normalverteilt_webbrowser_matrix] und [Anhang @sec:normalverteilt_webbrowser_mandel]), werden nicht-parametrische Tests angewendet. Für die Analyse eines signifikanten Unterschieds zwischen den Webbrowsern Chrome und Firefox auf dem Linux-Testcomputer reicht ein Mann-Whitney U-Test aus, da es sich hier um zwei Stichproben handelt. Dabei wird ein Signifikanzniveau von $\alpha = 5\% = 0,05$ gesetzt. Die Forschungsfrage ergibt folgende Null- und Alternativhypothesen:

- $H_0$: Es gibt keinen signifikanten Unterschied in der Ausführungsgeschwindigkeit von WebAssembly zwischen Chrome, Safari und Firefox auf dem MacBook sowie zwischen Chrome und Firefox in Linux.
- $H_1$: $\neg H_0$

Im Test mit dem MacBook ergab der Kruskal-Wallis-Test keine signifikanten Unterschiede zwischen Safari, Chrome und Firefox in der Matrizenmultiplikation (siehe [Anhang @sec:anova_matrix_macbook_browser]). Es wird angenommen, dass WebAssembly in Safari, Chrome und Firefox auf dem MacBook in diesem Benchmark-Test gleich schnell ausgeführt wird. Der gleiche Benchmark-Test auf dem Testcomputer Linux ergibt durch den u-Test auch keine signifikanten Unterschiede in der Ausführungszeit von WebAssembly zwischen Chrome und Firefox (siehe [Anhang @sec:htest_matrix_linux_browser]). Somit wird auch hier angenommen, dass WebAssembly eine einheitliche Ausführungszeit zwischen den Webbrowsern aufweist.

Im Mandelbrot-Benchmark-Algorithmus des MacBook wurde mittels des Kruskal-Wallis-Tests ein signifikanter Unterschied zwischen Safari, Chrome und Firefox festgestellt (siehe [Anhang @sec:anova_mandel_macbook_browser]). Der Post-hoc-Test zeigt, dass es einen signifikanten Unterschied zwischen Safari und Firefox sowie Chrome und Firefox gibt, jedoch keinen signifikanten Unterschied zwischen Safari und Chrome. Dies zeigt auch der u-Test, welcher keinen signifikanten Unterschied zwischen Chrome und Safari aufweist. Somit gibt es bereits eine Verletzung der Nullhypothese, da WebAssembly in diesem Benchmark keine gleiche Ausführungsgeschwindigkeit zwischen den Browsern aufweist. Zur Vollständigkeit werden noch die Werte dieses Benchmarks auf einem Linux-System ermittelt. Hier ergibt der u-Test, dass es keinen signifikanten Unterschied in den Ausführungszeiten gibt (siehe [Anhang @sec:htest_mandel_linux_browser]). 

Die Untersuchung ergab, dass es beim Mandelbrot-Benchmark-Algorithmus einen signifikanten Geschwindigkeitsunterschied bei der Ausführung von WebAssembly zwischen Safari und Firefox sowie zwischen Chrome und Firefox gibt. Dies widerspricht der Nullhypothese und die Forschungsfrage muss mit Nein beantwortet werden. In den übrigen Durchläufen gab es jedoch keinen signifikanten Unterschied. Es ist möglich, dass verschiedene Faktoren das Ergebnis dieser Stichprobe beeinflusst haben. Das Auftreten eines signifikanten Unterschieds in einer einzigen Stichprobenauswertung bedeutet nicht zwangsläufig, dass zwischen den Gruppen generell kein Unterschied besteht. Im spezifischen Fall des Mandelbrot-Benchmark-Algorithmus wurde ein signifikanter Unterschied zwischen bestimmten Browsern festgestellt, während in anderen Tests kein signifikanter Unterschied festgestellt wurde. Daher wird die Nullhypothese angenommen und die Forschungsfrage kann beantwortet werden. Es gibt keinen signifikanten Unterschied in der Ausführungszeit von WebAssembly zwischen verschiedenen Webbrowsern. Es ist jedoch zu beachten, dass in dieser Arbeit eine Stichprobe einen signifikanten Unterschied zwischen Safari und Firefox sowie zwischen Chrome und Firefox aufwies.

## Interpretation der Ergebnisse
- Relevanz der Forschung für die Forschung und der Praxis
