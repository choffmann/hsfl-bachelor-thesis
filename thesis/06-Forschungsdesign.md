\newpage 

# Forschungsdesign
Das Ziel dieser Arbeit ist es, einen Leistungsvergleich zwischen WebAssembly und TypeScript durchzuführen. Hierfür werden spezifische Algorithmen verwendet, um die Laufzeit der Anwendung zu messen. Insgesamt wurden zwei Algorithmen in TypeScript, JavaScript und Rust für Webassembly entwickelt, um einen Leistungsvergleich beider Technologien durchzuführen. 

## Forschungsfragen und Hypothesen
Die Hauptforschungsfrage dieser Arbeit lautet: 

_Welchen messbaren Einfluss hat der Einsatz von WebAssembly im Vergleich zu JavaScript und TypeScript auf die Leistung einer Webanwendung in Bezug auf die Ausführungsgeschwindigkeit?_

Aus dieser Frage ergeben sich folgende Unterfragen:

1. Ist WebAssembly in Bezug auf die Ausführungsgeschwindigkeit immer schneller als JavaScript und TypeScript?
2. Ist die Ausführungsgeschwindigkeit von WebAssembly in verschiedenen Webbrowsern gleich?

Die Forschungsfragen führen zu folgenden Hypothesen:

| Name | Beschreibung |
| -- | ------------ |
| H1 | Es wird erwartet, dass WebAssembly im Vergleich zu JavaScript und TypeScript eine signifikant schnellere Ausführungszeit aufweist. |
| H2 | Es wird erwartet, dass WebAssembly in unterschiedlichen Webbrowsern keine signifikant schnellere Ausführungszeit aufweist. |
| H3 | Es wird davon ausgegangen, dass es keinen signifikanten Leistungsunterschied zwischen JavaScript und TypeScript gibt. |

: Aufstellung der Hypothesen {#tbl:hypothese}

## Auswahl der Stichproben
Der Leistungsvergleich dieser Arbeit wird durch Benchmark-Algorithmen erfasst. "A benchmark is a tool coupled with a methodology for the evaluation and comparison of systems or components with respect to specific characteristics such as performance, reliability or security." [@kounev_systems_2020, S. 4]. Die Performance beschreibt die erbrachte Arbeit eines Systems im Verhältnis zu den dafür benötigten Ressourcen und der Zeit. Eine bessere Performance bedeutet somit, dass eine erbrachte Arbeit in kürzerer Zeit und/oder mit weniger Ressourcen erbracht wird [@kounev_systems_2020, S. 3]. Durch diese Definition werden Benchmarks in drei verschiedene Aspekte unterteilt:

- Metriken (metrics)
- Arbeitslast (workload)
- Messmethodik (measurement technology)

Die Metriken bestimmen, welche Werte der Messungen abgeleitet werden sollen, um das Ergebniss des Benchmarkes zu erzielen. [Weiter wenn Buch da ist...]


Ein Leistungsvergleich kann effektiv durch Benchmark-Algorithmen gemessen werden. "Benchmarking eines Software-Systems zielt auf die Bestimmung von Software-Produktmetriken um Systeme vergleichbar zu machen, Leistungsverbesserungen aufzuzeigen, etc." [@schmid_benchmarking_2016]. Dabei ist es von entscheidender Bedeutung, dass die Ergebnisse des Benchmarkings wiederholbar und reproduzierbar sind. Durch die Auswahl geeigneter Benchmark-Algorithmen und die sorgfältige Durchführung von Benchmarks können präzise Leistungsmetriken erfasst werden, die es ermöglichen, die Leistungsfähigkeit verschiedener Technologien objektiv zu bewerten und miteinander zu vergleichen. In diesem Zusammenhang werden in dieser Arbeit die Matrizenmultiplikation und die Mandelbrot-Menge als Benchmark-Algorithmen ausgewählt, um die Leistungsunterschiede zwischen WebAssembly, JavaScript und TypeScript zu untersuchen.

### Auswahl der Vergleichsmetriken
In dieser Arbeit wird die Laufzeit der Implementierungen als Vergleichsmetrik verwendet. Eine weitere Metrik, die bei der Durchführung eines Benchmarks erfasst werden kann, ist der Speicherverbrauch einer Anwendung [Quelle], allerdings sind die verfügbaren Methoden zur Messung des Speicherverbrauchs in Webbrowsern nicht standardisiert und weisen einige Einschränkungen auf. Zum Beispiel ist die Verwendung von `performance.memory` veraltet und wird von den meisten Webbrowsern nicht mehr unterstützt. Eine weitere Möglichkeit wäre die Verwendung von `performance.measureUserAgentSpecificMemory()` [@mdn_performance_2023; @mdn_performance_2023-1], allerdings befindet sich diese Funktion im experimentellen Zustand und wird auch nicht von allen Browsern unterstützt. Obwohl der Speicherverbrauch auch über die Developer Tools des Webbrowsers analysiert werden könnte, besteht das Problem darin, dass dabei nicht nur der Speicherverbrauch der Implementierung des Benchmarks erfasst wird, sondern auch zusätzliche Berechnungen, die im Hintergrund zur Ausführung des Benchmarks oder zur Speicherung der gemessenen Zeit durchgeführt werden. Aufgrund der genannten Einschränkungen und der fehlenden Standardisierung wird in dieser Arbeit auf die Analyse des Speicherverbrauchs verzichtet. Stattdessen wird ausschließlich die Laufzeit der Implementierungen als Vergleichsgrundlage verwendet. Dadurch ist eine konsistente und vergleichbare Bewertung der Leistung zwischen WebAssembly und JavaScript möglich.

### Auswahl geeigneter Bechmark-Algorithmen
Die Auswahl der geeigneten Benchmark-Algorithmen stellt einen entscheidenden Schritt dar, um die Leistungsfähigkeit verschiedener Technologien präzise zu bewerten und miteinander zu vergleichen. In dieser Arbeit werden die Leistungsunterschiede zwischen WebAssembly, JavaScript und TypeScript untersucht, wobei die Ausführungsgeschwindigkeit als zentrale Metrik betrachtet wird. Um diese Unterschiede genau zu erfassen, wurden zwei Benchmark Algorithmen ausgewählt.

Der erste Algorithmus, die Matrizenmultiplikation,  wurde als Benchmark ausgewählt, da sie einen wichtigen Anwendungsfall für WebAssembly demonstriert, der in verschiedenen Bereichen wie Bild- und Videobearbeitung, Spielen, CAD-Anwendungen sowie in VR- und Augmented-Reality-Anwendungen relevant ist [@webassembly_community_use_nodate]. In diesen Bereichen sind computergenerierte Grafiken von zentraler Bedeutung, und die Matrizenmultiplikation ist eine grundlegende Operation, die häufig zur Transformation von Geometrien verwendet wird. Transformationen wie Verschiebungen und Skalierungen von Objekten werden mithilfe von Matrizenoperationen beschrieben, was die Matrizenmultiplikation zu einem geeigneten Benchmark für die Leistungsbewertung von WebAssembly macht [@issa_essential_nodate].

Als zweiter Benchmark-Algorithmus wurde die Mandelbrot-Menge ausgewählt, ein komplexer Algorithmus, der intensive numerische Berechnungen erfordert. Die Mandelbrot Menge besteht aus komplexen Zahlen, die ein bestimmtes Kriterium erfüllen müssen. Dabei werden Punkte innerhalb der komplexen Zahlenmenge durchlaufen und geprüft, ob sie sich in der Mandelbrot Menge befinden oder nicht. Die Genauigkeit der Bestimmung der Mandelbrot-Menge erhöht sich mit jeder weiteren Iteration der Punkte [@noauthor_mandelbrotmenge_nodate]. In ihrer Analyse der Energieeffizienz von Programmiersprachen erwähnten [@pereira_energy_2017] die Webseite "The Computer Language Benchmarks Game"^[https://benchmarksgame-team.pages.debian.net/benchmarksgame/index.html]. Diese enthält eine Vielzahl von Implementierungen spezifischer Benchmarks sowie Vergleiche zwischen verschiedenen Programmiersprachen. Die Benchmarks dienen dazu, verschiedene Aspekte wie Geschwindigkeit und Speicherverbrauch zu testen. Pereira et al. haben den Benchmark-Algorithmus der Mandelbrotmenge von der Seite 'The Computer Language Benchmarks Game' sowie weitere Benchmark-Algorithmen von der Seite implementiert, um die Energieeffizienz mehrerer Programmiersprachen zu ermitteln.

### Matrizenmultiplikation {#sec:matrix_theory}
Die Matrizenmultiplikation wird durch die folgende mathematische Formel definiert.

Seien $A=(a_{ij})$ und $B=(b_{jk})$ Matrizen, dann gilt

$$
A \times B = C(c_{ij}) \text{  mit  }
c_{ij} := \sum_{k=1}^{n} a_{ik} \times b_{jk}
$$

Im Benchmark Algorithmus werden ausschließlich Matrizen der Größe $N \times N$ betrachtet. Eine mögliche Implementierung der Formel in Pseudocode ist in [@lst:matrix_pseudo] abgebildet.

```
Data: S[A][B], P[G][H]
Result: Q[][]
for m = 0; m < A; m++ do
  for r = 0; r < H; r++ do
    for k = 0; k < G; k++ do
      Q[m][r] += S[m][k] * P[k][r];
    end 
  end
end
```
: Pseudocode der Matrizenmultiplikation {#lst:matrix_pseudo}

Die Matrizenmultiplikation ist ein aufwendiger Algorithmus mit einer Laufzeitkomplexität von $O(n^3)$ aufgrund der verschachtelten `for`-Schleifen. Es gibt jedoch auch weitere Implementierungen wie den Solvay-Strassen-Algorithmus, der die Laufzeit auf $O(n^{2.8074})$ reduziert [@datta_matrix_2020]. In dieser Arbeit wird jedoch der übliche Algorithmus wie oben gezeigt implementiert.

### Mandelbrot Menge
Um die Mandelbrot Menge zu bestimmen, wird ein Punkt $C$ aus der komplexen Ebene definiert. In einem Koordinatensystem, wie in Abbildung \ref{fig:mandelbrot_kooridnat} gezeigt, wird die x-Achse als Realteil und die y-Achse als Imaginärteil bezeichnet. Somit kann der Punkt $C$ wie folgt dargestellt werden: $C=x+iy$.

Die Konstante $C$ wird nun iterativ auf $Z$ angewendet:

$$
Z_{n} = Z_{n-1}^{2} + C
$$

Diese Iteration wird solange ausgeführt, bis der Wert $n$ erreicht ist. Wenn der Betrag $Z$ kleiner als 2 ist, wird angenommen, dass der Punkt $C$ in der Mandelbrot-Menge liegt. 

![Mandelbrot Ansicht in Koordinatensystem @noauthor_mandelbrotmenge_nodate \label{fig:mandelbrot_kooridnat}](./img/mandelbrot_dia.gif)

## Benchmark Implementierung {#sec:benchmark_impl}
Jeder der oben genannten Benchmarks wird in einer Funktion definiert und in einer Schleife von 1 bis zur Konstante $n$ ausgeführt. Die benötigte Ausführungszeit wird in jeder Iteration gemessen und in einem `BenchmarkReport` gespeichert. Während der Iteration wird ausschließlich die benötigte Zeit für den Algorithmus gemessen. Zeiten wie das Befüllen der `BenchmarkReport`-Liste oder weitere Operationen, die zum Ausführen des Benchmarks benötigt werden, werden nicht erfasst. Stattdessen wird die Gesamtzeit aufgenommen, die diese Operationen enthält. Der grobe Aufbau eines Benchmark-Moduls wird in [@lst:benchmark_impl] abgebildet.

```
function benchmark(n: Number, reporter: (...args) => void): BenchmarkReport {
  result: BenchmarkReport
  startTime: time.now()
  for i = 1; i <= n; i++ do
    reporter(...args)
    iterStartTime: time.now()
    run() # Hier wird der Benchmark ausgeführt
    iterTime: time.now() - iterStartTime
    result.push({n: i, time: iterTime})
  end
  totalTime: time.now() - startTime
  return result
}
```
: Benchmark implementierung {#lst:benchmark_impl}

### JavaScript und TypeScript
Die Implementierungen von JavaScript und TypeScript unterscheiden sich nur durch die Typisierung von TypeScript. Aus diesem Grund werden die beiden Implementierungen hier zusammen beschrieben. Die Zeit wird durch die Methode `performance.now()` ermittelt.

`tsconfig.json` kram    

#### Matrizenmultiplikation {-}
Zu Beginn des Benchmarks werden zwei Matrizen mit der Größe von $N \times N$ erstellt. Dabei entspricht $N$ dem aktuellen Index der laufenden Iteration. Die Matrizen werden mit zufälligen Werten befüllt. Zusätzlich zu den beiden Matrizen, die miteinander multipliziert werden, wird eine leere Matrix erstellt, in der das Ergebnis gespeichert wird. Die Erstellung der Matrizen findet in jeder Iteration statt, jedoch noch bevor die Zeit gemessen wird. Die Multiplikation der Matrizen wurde gemäß dem [@sec:matrix_theory] implementiert.

#### Mandelbrot {-}
Die Mandelbrotmenge rechnet mit komplexen Zahlen. Dazu wurde eine Klasse `Complex` erstellt. Diese Klasse hat zwei Variablen für den Realteil und den Imaginärteil. Zudem erhält die Klasse Methoden zum addieren, quadieren sowie die Betragsfunktion. 

### WebAssembly durch Rust
In Rust wurde ein `trait` namens `Runner` erstellt, welches mehrere Methoden wie `init(), before_iter(), benchmark(), ...` enthält. Dazu gibt es eine Klasse namens `BenchmarkRunner`, welche die Funktionen des `Runner` ausführt. Der Aufbau des `BenchmarkRunner` ist ähnlich zu der Funktion, welche in [@sec:benchmark_impl] beschreiben qurde. Jede Benchmark-Implementierung in Rust muss jetzt nur noch `Runner` implementieren und angeben, wie die Benchmark-Funktion aufgerufen werden soll. Die Zeitmessung erfolgt mit dem Paket `instant`^[https://crates.io/crates/instant/0.1.12]. Es ist möglich, auch hier `performance.now()` zu verwenden. Allerdings gab es Schwierigkeiten, da die Benchmarks in einem Web Worker aufgerufen werden. Deshalb wurde hier auf ein externes Paket zurückgegriffen, welches die Zeitmessung in WebAssembly ermöglicht.

Das Tool wasm-pack^[https://rustwasm.github.io/docs/wasm-pack/introduction.html] wird in dieser Arbeit verwendet, um den Rust-Code für WebAssembly zu kompilieren. `wasm-pack` bietet eine Schnittstelle, um Rust-Code in WebAssembly umzuwandeln. Es automatisiert den Prozess des Bauens der entsprechenden WebAssembly-Dateien sowie das Bereitstellen von zugehörigen JavaScript-Dateien. 

Kompilierungsoptimierungs kram...

#### Matrizenmultiplikation {-}

#### Mandelbrot {-}

## Benchmark Frontend
Um die verschiedenen Benchmark Implementierungen leicht ausführen zu können, wurde ein Frontend entwickelt. Dieses führt die Benchmarks aus und wurde in TypeScript mit React entwickelt. Die verschiedenen Benchmark Implementierungen werden über Module in das Frontend geladen und durch einen Web Worker ausgeführt. Ein Web Worker ermöglicht es JavaScript, Anwendungen in einem anderen Thread auszuführen, da JavaScript eine Single-Thread-Sprache ist. Dadurch können aufwendige Berechnungen im Hintergrund ausgeführt werden, ohne den Main Thread des Frontends zu blockieren. Die Ausführung des Benchmarks im Web Worker hat zudem den Vorteil, dass der Benchmark in einer eigenen Umgebung ausgeführt wird, ohne Einmischung von Berechnungen des Frontends, wie zum Beispiel dem Garbage Collector oder anderen Berechnungen. Ein Web Worker kann über einen `MessageBus` mit dem Main-Thread kommunizieren [@mdn_web_2023]. Im Frontend kann die Konstante $N$ angegeben werden. Diese beschreibt, wie oft eine Benchmark wiederholt werden soll. Die Konstante wird an die Benchmarkmodule weitergegeben. Jeder Benchmark hat einen `reporter`-Callback, um Parameter an den ausgeführten Web Worker zu übergeben. Diese Daten können dann an das Frontend weitergegeben werden. Das Frontend zeigt eine Übersicht über den aktuellen Benchmark bei Status $N$ an. Außerdem werden ein Diagramm und eine Tabelle mit den Ergebnissen angezeigt. Der Benchmark Report, der von den Benchmark Implementierungen erstellt wird, kann heruntergeladen werden, um weitere Analysen durchzuführen.

## Laboraufbau
Die Vergleichsalgorithmen werden in drei verschiedenen Webbrowsern ausgeführt, die jeweils die wichtigsten, bereits in [@sec:js-engine] aufgelisteten JavaScript-Engines (V8, SpiderMonkey und JavaScriptCore) implementieren. Dabei stehen zwei Testcomputer zur Verfügung. Um das Experiment bestmöglich reproduzieren zu können, werden im Folgenden die verwendeten Systeme und Webbrowser der Testcomputer beschrieben. 

### Versuchscomputer
Für die Ausführung der Algorithmen stehen zwei Testrechner zur Verfügung. Um sicherzustellen, dass auf den Testrechnern keine Programme im Hintergrund laufen,
die das Ergebnis verfälschen könnten, werden alle Testrechner mit einem Betriebssystem neu installiert.
Die Tabelle [@tbl:labor_computer] gibt einen Überblick über die Testcomputer. Um die Leistung des MacBooks nicht zu beeinträchtigen, wird das MacBook
während des Experiments ständig an die Stromversorgung angeschlossen sein.

| Name    | Betriebssystem | CPU | RAM |
| ------- | ------------------ | ---------------- | -------------------- |
| Linux   | Arch Linux mit GNOME 45.4   | AMD FX(tm)-4130 Quad-Core       | 4GB DDR3 1600 MHz    |
| MacBook | macOS Sonoma 14.3.1 (23D60) | 2,4 GHz Quad-Core Intel Core i5 | 16GB 2133 MHz LPDDR3 |

: Übersicht der Testcomputer {#tbl:labor_computer}

### Webbrowser
Der Leistungsvergleich wird in drei Webbrowsern mit den drei aufgeführten JavaScript Engines (V8, SpiderMonkey und JavaScriptCore) durchgeführt. Da Webkit mit 
der JavaScript-Engine JavaScriptCore hauptsächlich im Safari-Browser für Apple macOS und iOS zur Verfügung steht, kann dieser Leistungsvergleich nur auf dem
Testrechner MacBook durchgeführt werden. Die [@tbl:labor_browser] gibt einen Überblick über die verwendeten Webbrowser und deren Versionen.

| Testcomputer | Browser    | JS Engine | Version |
| ------------ | --------------- | -------------- | -------------------------------- |
| Linux   | Chromium        | V8             | Version 122.0.6261.39            |
| Linux   | Mozilla Firefox | SpiderMonkey   | Version 122.0.1                  |
| MacBook | Safari          | JavaScriptCore | Version 17.3.1 (19617.2.4.11.12) |

: Übersicht der Webbrowser {#tbl:labor_browser}

### Webserver
Die Anwendung für den Leistungsvergleich wird nicht direkt auf dem Testrechner ausgeführt, sondern von einem Webserver gehostet. Trotzdem erfolgt die Ausführung des Codes durch den Browser des Clients, wie bereits in der Arbeit diskutiert wurde. Eine serverseitige Kompilierung würde in Anwendungen wie Node.js stattfinden, die jedoch in diesem Kontext nicht verwendet werden. Der Webserver ist entweder im lokalen Netzwerk der Testumgebung erreichbar oder über eine URL^[https://benchmark.choffmann.io/] im Internet zugänglich.

## Versuchsdurchführung
Die Benchmarks werden für jede Implementierung (JavaScript, TypeScript und WebAssembly) auf allen Testrechnern dreimal durchgeführt, um mögliche im Hintergrund laufende Berechnungen von anderen Programmen auszuschließen. Nach jeder vollständigen Durchführung von JavaScript, TypeScript und WebAssembly wird der Bericht heruntergeladen. Anschließend wird das Browserfenster neu geladen, der Browsercache geleert und der Benchmark erneut durchgeführt. 

## Aufbereitung und Auswertung der Daten
Die Benchmark-Algorithmen werden pro Browser dreimal ausgeführt, um mögliche Ausreißer zu vermeiden. Dadurch liegen pro Browser drei Werte für JavaScript, TypeScript und WebAssembly vor und es ergibt sich die Menge $T_i=\{t_1, t_2, ..., t_n\}$, wobei $t$ die gemessene Ausführungszeit in bezug auf $n$ ist und $i$ der Durchlauf, wobei $1 \le i \le 3$. Um aus diesen drei Durchläufen jeweils einen Wert $t$ für $n$ zu erhalten, wird der Median ermittelt. Der Median ist der Wert, der in der Mitte einer Menge von Werten liegt und ist definiert als:

$$
median = \begin{cases}
x_{\frac{n+1}{2}} & \text{falls } n \text{ ungerade} \\
(x_{\frac{n}{2}}+x_{\frac{n}{2}+1})/2 & \text{falls } n \text{ gerade}
\end{cases}
$$

[@kounev_systems_2020, S. 58] beschreibt, dass Metriken im Benchmarking in der Regel durch den arithmetischen Mittelwert (Mean) bestimmt werden. Dabei wird aus den zuvor durch den Median zusammengeführten Laufzeiten jedes $n$ eines Durchlaufs der Durchschnitt ermittelt und als Vergleichswert für die Laufzeit zwischen den Implementierungen verwendet. Der arithmetische Mittelwert ist definiert als:

$$
mean = \frac{1}{n}\sum^{n}_{i=1}x_i
$$

Es werden lediglich die Laufzeiten eines Benchmarks auf einem System verglichen, und zwar hinsichtlich der verschiedenen Webbrowser. Ein Vergleich der Metriken zwischen verschiedenen Benchmark-Algorithmen und verschiedenen Systemen ist nicht sinnvoll.

## Gütekriterien

