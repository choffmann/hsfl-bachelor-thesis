\newpage 

# Forschungsdesign
Das Ziel dieser Arbeit ist es, einen Leistungsvergleich zwischen WebAssembly und TypeScript durchzuführen. Hierfür werden spezifische Algorithmen verwendet, um die Laufzeit der Anwendung zu messen. Insgesamt wurden zwei WebAssembly-Algorithmen in TypeScript, JavaScript und Rust entwickelt, um einen Leistungsvergleich beider Technologien durchzuführen. 

## Forschungsfrage und Hypothesen
- "Welchen messbaren Einfluss hat der Einsatz von WebAssembly im Vergleich zu JavaScript und TypeScript auf die Leistung einer Webanwendung in Bezug auf die Ausführungsgeschwindigkeit und den Ressourcenverbrauch?"
- "Ist WebAssembly immer in der Ausführungszeit schneller als JavaScript und TypeScript"

Aus der Forschungfrage ergeben sich folgende Hypothesen, welche in Tabelle \ref{table:hypothese} aufgelistet werden

| Name | Beschreibung |
| -- | ------------ |
| H1 | Es wird davon ausgegangen, dass es keinen signifikanten Leistungsunterschied zwischen JavaScript und TypeScript gibt, unter der Annahme, dass TypeScript zu JavaScript kompiliert wird. |
| H2 | Es wird erwartet, dass WebAssembly im Vergleich zu JavaScript und TypeScript eine signifikant schnellere Ausführungszeit aufweist. |

: Aufstellung der Hypothesen \label{table:hypothese}

## Forschungsdesign
- [x] Aufbau 
- [x] Stichprobe
- [ ] Sachen nicht ausgewählt?
- [ ] Aufbereitung und Auswertung der Daten 

## Auswahl der Stichproben
- [ ] Auswahl geeigneter Benchmark-Algorithmen
- [ ] Definition der Metriken

Ein Leistungsvergleich kann gut durch Benchmark-Algorithmen gemessen werden. "Benchmarking eines Software-Systems zielt auf die Bestimmung von Software-Produktmetriken um Systeme vergleichbar zu machen, Leistungsverbesserungen aufzuzeigen, etc." [@schmid_benchmarking_2016]. Dabei ist es wichtig, dass die Ergebnisse des Benchmarkings wiederholbar und reproduzierbar sind. Weitere Informationen zum genau Ablauf und Messung der Algorithmen werden in [Kapitel ???]() weiter erläutert. 

### Matrizenmultiplikation
Ein Anwendungsfall, der auf der WebAssembly-Seite beschrieben wird, ist die Bearbeitung von Bildern und Videos sowie die Verwendung in Spielen, CAD-Anwendungen und VR- und Augmented-Reality-Anwendungen [@noauthor_use_nodate]. All diese Bereiche haben etwas mit computergenerierten Grafiken zu tun. Eine grundlegende Funktion im Bereich der Computergrafik ist das Multiplizieren von Matrizen. Dies wird beispielsweise verwendet, um Geometrien zu transformieren. Dabei beschreibt das Transformieren das Verschieben und Skalieren von Objekten. [@issa_essential_nodate]

#### Theoretischer Aufbau {#matrix:theoretischer_aufbau .unnamed}
Die Matrizenmultiplikation wird durch die folgende mathematische Formel definiert.

Seien $A=(a_{ij})$ und $B=(b_{jk})$ eine Matrix, dann gilt

$$
A * B = C(c_{ij}) \text{  mit  }
c_{ij} := \sum_{k=1}^{n} a_{ik} * b_{jk}
$$

Im Benchmark Algorithmus werden ausschließlich Matrizen der Größe NxN betrachtet. Eine mögliche Implementierung der Formel in Pseudocode könnte wie folgt aussehen.

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

Die Matrizenmultiplikation ist ein aufwendiger Algorithmus mit einer Laufzeitkomplexität von $O(n^3)$ aufgrund der verschachtelten `for-loops`. Es gibt jedoch auch weitere Implementierungen wie den `Solvay Strassen` Algorithmus, der die Laufzeit auf $O(n^{2.8074})$ reduziert. In dieser Arbeit wird jedoch der übliche Algorithmus wie oben gezeigt implementiert.
[@datta_matrix_2020]

### Mandelbrot Menge
Ein weiterer Benchmark-Algorithmus, der zur Vergleichbarkeit implementiert wurde, ist die Mandelbrot-Menge. Diese Menge besteht aus komplexen Zahlen, die alle ein bestimmtes Kriterium erfüllen. Es werden nacheinander Punkte innerhalb der komplexen Zahlenmenge durchlaufen und geprüft, ob sie sich in der Mandelbrot-Menge befinden oder nicht. Je öfter diese Punkte durchlaufen werden, desto genauer kann die Mandelbrot-Menge bestimmt werden. [@noauthor_mandelbrotmenge_nodate]

Dieser Benchmark wurde von `The Computer Language Benchmarks Game`^[https://benchmarksgame-team.pages.debian.net/benchmarksgame/index.html] ausgewählt. Die Seite enthält viele Implementierungen spezieller Benchmarks und Vergleiche zwischen verschiedenen Programmiersprachen. Die Benchmarks sind darauf ausgelegt, verschiedene Aspekte wie Geschwindigkeit und Speicher zu testen. Das Paper [@pereira_energy_2017] vergleicht die Energieeffizienz anhand des Benchmarks und erwähnt dabei auch die Benchmarkseite 'The Computer Language Benchmarks Game'. Dieser Benchmark wurde ausgewählt, da er anspruchsvoll ist und intensive numerische Berechnungen erfordert.

#### Theoretischer Aufbau {#mandelbrot:theoretischer_aufbau .unnamed}
Um die Mandelbrot Menge zu bestimmen, wird ein Punkt $C$ aus der komplexen Ebene definiert. In einem Koordinatensystem wie in Abbildung \ref{fig:mandelbrot_kooridnat} gezeigt, wird die x-Achse als Realteil und die y-Achse als Imaginärteil bezeichnet. Somit kann der Punkt $C$ wie folgt dargestellt werden: $C=x+i*y$.

Die Konstante $C$ wird nun immer wieder auf $Z$ angewendet.

$$
Z_{n} = Z_{n-1}^{2} + C
$$

Diese Iteration wird solange ausgeführt, bis der Wert $n$ erreicht ist. Wenn der Wert $Z$ kleiner als 2 ist, wird angenommen, dass der Punkt $C$ in der Mandelbrot-Menge liegt. 

![Mandelbrot Ansicht in Koordinatensystem @noauthor_mandelbrotmenge_nodate \label{fig:mandelbrot_kooridnat}](./img/mandelbrot_dia.gif)

## Benchmark Implementierung
Jeder der oben genannten Benchmarks wird in einer Funktion definiert und in einer Schleife von 1 bis zur Konstante $n$ ausgeführt. Die benötigte Ausführungszeit wird in jeder Iteration gemessen und in einem `BenchmarkReport` gespeichert. Während der Iteration wird ausschließlich die benötigte Zeit für diesen Algorithmus gemessen. Zeiten wie das Befüllen der 'BenchmarkReport'-Liste oder weitere Operationen, die zum Ausführen des Benchmarks benötigt werden, werden nicht mitgemessen. Stattdessen wird die Gesamtzeit aufgenommen, die diese Operationen enthält. Der grobe Aufbau eines Benchmark-Moduls sieht in etwa wie folgt aus.

```
function benchmark(n: Number, reporter: (...args) => void): BenchmarkReport {
  result: BenchmarkReport
  startTime: time.now()
  for i = 1; i <= n; i++ do
    reporter(...args)
    iterStartTime: time.now()
    run() # <-- Hier wird der Benchmark ausgeführt
    iterTime: time.now() - iterStartTime
    result.push({n: i, time: iterTime})
  end
  totalTime: time.now() - startTime
  return result
}
```

### JavaScript und TypeScript
Die Implementierungen von JavaScript und TypeScript unterscheiden sich nur durch die Typisierung von TypeScript. Aus diesem Grund werden die beiden Implementierungen hier zusammen beschrieben. Die Zeit wird durch die Methode `performance.now()` ermittelt.

#### Matrizenmultiplikation {-}
Zu Beginn des Benchmarks werden zwei Matrizen mit der Größe von $NxN$ erstellt. Dabei entspricht $N$ dem aktuellen Index der laufenden Iteration. Die Matrizen werden mit zufälligen Werten befüllt. Zusätzlich zu den beiden Matrizen, die miteinander multipliziert werden, wird eine leere Matrix erstellt, in der das Ergebnis gespeichert wird. Die Erstellung der Matrizen findet in jeder Iteration statt, jedoch noch bevor die Zeit gemessen wird. Die Multiplikation der Matrizen wurde gemäß dem Kapitel [Theoretischer Aufbau des Matrizenalgorithmus](#matrix:theoretischer_aufbau) implementiert.

#### Mandelbrot {-}
JavaScript Version 1, 2 &
TypeScript Version 1, 2, 3, 4

### WebAssembly durch Rust
In Rust wurde ein `trait` namens `Runner` erstellt, welches mehrere Methoden wie `init(), before_iter(), benchmark(), ...` enthält. Dazu gibt es eine Klasse namens `BenchmarkRunner`, welche die Funktionen des `Runner` ausführt. Der Aufbau des `BenchmarkRunner` ist ähnlich zu dem, der oben bereits beschrieben wurde. Jede Benchmark-Implementierung in Rust muss jetzt nur noch `Runner` implementieren und angeben, wie die Benchmark-Funktion aufgerufen werden soll. Die Zeitmessung erfolgt mit dem Paket `instant`^[https://crates.io/crates/instant/0.1.12]. Es ist möglich, auch hier `performance.now()` zu verwenden. Allerdings gab es Schwierigkeiten, da die Benchmarks in einem Web Worker aufgerufen werden. Deshalb wurde hier auf ein externes Paket zurückgegriffen, welches die Zeitmessung in WebAssembly ermöglicht.

#### Matrizenmultiplikation {-}

#### Mandelbrot {-}

## Benchmark Frontend
Um die verschiedenen Benchmark Implementierungen leicht ausführen zu können, wurde ein Frontend entwickelt. Dieses führt die Benchmarks aus und wurde in TypeScript mit React entwickelt. Die verschiedenen Benchmark Implementierungen werden über Module in das Frontend geladen und durch einen Web Worker ausgeführt. Ein Web Worker ermöglicht es JavaScript, Anwendungen in einem anderen Thread auszuführen, da JavaScript eine Single-Thread-Sprache ist. Dadurch können aufwendige Berechnungen im Hintergrund ausgeführt werden, ohne den Main Thread des Frontends zu blockieren. Die Ausführung des Benchmarks im Web Worker hat zudem den Vorteil, dass der Benchmark in einer eigenen Umgebung ausgeführt wird, ohne Einmischung von Berechnungen des Frontends, wie z.B. dem Garbage Collector oder anderen Berechnungen. Ein Web Worker kann über einen `MessageBus` mit dem Main-Thread kommunizieren [@noauthor_web_2023]. Im Frontend kann die Konstante $N$ angegeben werden. Diese beschreibt, wie oft eine Benchmark wiederholt werden soll. Die Konstante wird an die Benchmarkmodule weitergegeben. Das Frontend zeigt eine Übersicht über den aktuellen Benchmark bei $N$, sowie ein Diagramm und eine Tabelle mit den Ergebnissen. Der Benchmark Report, der von den Benchmark Implementierungen erzeugt wird, kann heruntergeladen werden, um weitere Analysen durchzuführen.

## Laboraufbau
Die Vergleichsalgorithmen werden in drei verschiedenen Webbrowsern ausgeführt, die jeweils die wichtigsten bereits aufgelisteten JavaScript-Engines
(V8, SpiderMonkey und JavaScriptCore) implementieren. Dabei stehen zwei Testcomputer zur Verfügung. Um das Experiment bestmöglich reproduzieren zu können,
werden im Folgenden die verwendeten Systeme und Webbrowser der Testcomputer beschrieben.

### Versuchscomputer
Für die Ausführung der Algorithmen stehen zwei Testrechner zur Verfügung. Um sicherzustellen, dass auf den Testrechnern keine Programme im Hintergrund laufen,
die das Ergebnis verfälschen könnten, werden alle Testrechner mit einem frisch installierten Betriebssystem neu installiert.
Die Tabelle \ref{table:labor_computer} gibt einen Überblick über die Testcomputer. Um die Leistung des MacBooks nicht zu beeinträchtigen, wird das MacBook
während des Experiments ständig an die Stromversorgung angeschlossen sein.

| Name    | Betriebssystem | CPU | RAM |
| ------- | ------------------ | ---------------- | -------------------- |
| Linux   | Arch Linux mit GNOME 45.4   | AMD FX(tm)-4130 Quad-Core       | 4GB DDR3 1600 MHz    |
| MacBook | macOS Sonoma 14.3.1 (23D60) | 2,4 GHz Quad-Core Intel Core i5 | 16GB 2133 MHz LPDDR3 |

: Übersicht der Testcomputer \label{table:labor_computer}

### Webbrowser
Der Leistungsvergleich wird in drei Webbrowsern mit den drei aufgeführten JavaScript Engines (V8, SpiderMonkey und JavaScriptCore) durchgeführt. Da Webkit mit 
der JavaScript-Engine JavaScriptCore hauptsächlich im Safari-Browser für Apple macOS und iOS zur Verfügung steht, kann dieser Leistungsvergleich nur auf dem
Testrechner MacBook durchgeführt werden. Die Tabelle \ref{table:labor_browser} gibt einen Überblick über die verwendeten Webbrowser und deren Versionen.

| Testcomputer | Browser    | JavaScript Engine | Version |
| ------------ | --------------- | -------------- | -------------------------------- |
| Linux   | Chromium        | V8             | Version 122.0.6261.39            |
| Linux   | Mozilla Firefox | SpiderMonkey   | Version 122.0.1                  |
| MacBook | Google Chrome   | V8             | Version 122.0.6167.184           |
| MacBook | Mozilla Firefox | SpiderMonkey   | Version 123.0                    |
| MacBook | Safari          | JavaScriptCore | Version 17.3.1 (19617.2.4.11.12) |

: Übersicht der Webbrowser \label{table:labor_browser}

### Webserver
Die Anwendung für den Leistungsvergleich wird nicht direkt auf dem Testrechner ausgeführt, sondern von einem Webserver gehostet. Wie bereits in der Arbeit analysiert wurde, wird der Code dennoch durch den Aufbau des Webbrowsers auf dem Client ausgeführt. Eine serverseitige Kompilierung würde in Anwendungen wie Node.js stattfinden, welches hier jedoch nicht verwendet wird. Der Webserver ist entweder im lokalen Netzwerk der Testumgebung erreichbar oder über eine URL^[https://benchmark.choffmann.io/] im Internet.

## Versuchsdurchführung
Die Benchmarks werden für jede Implementierung (JavaScript, TypeScript und WebAssembly) auf allen Testrechnern dreimal durchgeführt, um mögliche im Hintergrund laufende Berechnungen von anderen Programmen auszuschließen. 

## Gütekriterien

