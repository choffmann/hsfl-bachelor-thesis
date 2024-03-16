\newpage

# Planung
Das Ziel dieser Arbeit ist es, einen Leistungsvergleich zwischen WebAssembly und JavaScript und TypeScript durchzuführen. Hierfür werden spezifische Algorithmen verwendet, um die Laufzeit der Anwendung zu messen. Insgesamt wurden zwei Algorithmen in TypeScript, JavaScript und Rust für Webassembly entwickelt, um einen Leistungsvergleich beider Technologien durchzuführen. [Forschnugsfrage vielleicht nochmal wiederholen]

## Auswahl der Stichproben
Der Leistungsvergleich dieser Arbeit wird durch Benchmark-Algorithmen erfasst. "A benchmark is a tool coupled with a methodology for the evaluation and comparison of systems or components with respect to specific characteristics such as performance, reliability or security." [@kounev_systems_2020, S. 4]. Die Performance beschreibt die erbrachte Arbeit eines Systems im Verhältnis zu den dafür benötigten Ressourcen und der Zeit. Eine bessere Performance bedeutet somit, dass eine erbrachte Arbeit in kürzerer Zeit und/oder mit weniger Ressourcen erbracht wird [@kounev_systems_2020, S. 3]. Durch diese Definition werden Benchmarks in drei verschiedene Aspekte unterteilt:

- Metriken (metrics)
- Arbeitslast (workload)
- Messmethodik (measurement technology)

Die Metriken bestimmen, welche Werte der Messungen abgeleitet werden sollen, um das Ergebnis des Benchmarks zu erzielen. Die Arbeitslast beschreibt das Verfahren, unter welchen Szenarien und Bedingungen Metriken gemessen werden sollen, sowie die Messmethodik, mit der die Metriken in der Arbeitslast entsprechend erfasst werden [@kounev_systems_2020, S. 4].

## Auswahl der Vergleichsmetriken
In dieser Arbeit wird die Laufzeit der Implementierungen als Vergleichsmetrik verwendet. Eine weitere Metrik, die bei der Durchführung eines Benchmarks erfasst werden kann, ist der Speicherverbrauch einer Anwendung, allerdings sind die verfügbaren Methoden zur Messung des Speicherverbrauchs in Webbrowsern nicht standardisiert und weisen einige Einschränkungen auf. Zum Beispiel ist die Verwendung von `performance.memory` veraltet und wird von den meisten Webbrowsern nicht mehr unterstützt. Eine weitere Möglichkeit wäre die Verwendung von `performance.measureUserAgentSpecificMemory()` [@mdn_performance_2023; @mdn_performance_2023-1], allerdings befindet sich diese Funktion im experimentellen Zustand und wird auch nicht von allen Browsern unterstützt. Obwohl der Speicherverbrauch auch über die Developer Tools des Webbrowsers analysiert werden könnte, besteht das Problem darin, dass dabei nicht nur der Speicherverbrauch der Implementierung des Benchmarks erfasst wird, sondern auch zusätzliche Berechnungen, die im Hintergrund zur Ausführung des Benchmarks oder zur Speicherung der gemessenen Zeit durchgeführt werden. Aufgrund der genannten Einschränkungen und der fehlenden Standardisierung wird in dieser Arbeit auf die Analyse des Speicherverbrauchs verzichtet. Stattdessen wird ausschließlich die Laufzeit der Implementierungen als Vergleichsgrundlage verwendet. Dadurch ist eine konsistente und vergleichbare Bewertung der Leistung zwischen WebAssembly und JavaScript möglich.

## Auswahl geeigneter Bechmark-Algorithmen {#sec:auswahl-benchmark}
Die Auswahl der geeigneten Benchmark-Algorithmen stellt einen entscheidenden Schritt dar, um die Leistungsfähigkeit verschiedener Technologien präzise zu bewerten und miteinander zu vergleichen. In dieser Arbeit werden die Leistungsunterschiede zwischen WebAssembly, JavaScript und TypeScript untersucht, wobei die Ausführungsgeschwindigkeit als zentrale Metrik betrachtet wird. Um diese Unterschiede genau zu erfassen, wurden zwei Benchmark Algorithmen ausgewählt.

Der erste Algorithmus, die Matrizenmultiplikation,  wurde als Benchmark ausgewählt, da sie einen wichtigen Anwendungsfall für WebAssembly demonstriert, der in verschiedenen Bereichen wie Bild- und Videobearbeitung, Spielen, CAD-Anwendungen sowie in VR- und Augmented-Reality-Anwendungen relevant ist [@webassembly_community_use_nodate]. In diesen Bereichen sind computergenerierte Grafiken von zentraler Bedeutung, und die Matrizenmultiplikation ist eine grundlegende Operation, die häufig zur Transformation von Geometrien verwendet wird. Transformationen wie Verschiebungen und Skalierungen von Objekten werden mithilfe von Matrizenoperationen beschrieben, was die Matrizenmultiplikation zu einem geeigneten Benchmark für die Leistungsbewertung von WebAssembly macht [@issa_essential_nodate].

Als zweiter Benchmark-Algorithmus wurde die Mandelbrotmenge ausgewählt, ein komplexer Algorithmus, der intensive numerische Berechnungen erfordert. Die Mandelbrotmenge besteht aus komplexen Zahlen, die ein bestimmtes Kriterium erfüllen müssen. Dabei werden Punkte innerhalb der komplexen Zahlenmenge durchlaufen und geprüft, ob sie sich in der Mandelbrotmenge befinden oder nicht. Die Genauigkeit der Bestimmung der Mandelbrotmenge erhöht sich mit jeder weiteren Iteration der Punkte [@noauthor_mandelbrotmenge_nodate]. In ihrer Analyse der Energieeffizienz von Programmiersprachen erwähnten [@pereira_energy_2017] die Webseite "The Computer Language Benchmarks Game"^[https://benchmarksgame-team.pages.debian.net/benchmarksgame/index.html]. Diese enthält eine Vielzahl von Implementierungen spezifischer Benchmarks sowie Vergleiche zwischen verschiedenen Programmiersprachen. Die Benchmarks dienen dazu, verschiedene Aspekte wie Geschwindigkeit und Speicherverbrauch zu testen. Pereira et al. haben den Benchmark-Algorithmus der Mandelbrotmenge von der Seite 'The Computer Language Benchmarks Game' sowie weitere Benchmark-Algorithmen von der Seite implementiert, um die Energieeffizienz mehrerer Programmiersprachen zu ermitteln.

### Matrizenmultiplikation {#sec:matrix_theory}
Die Matrizenmultiplikation wird durch die folgende mathematische Formel definiert.

Seien $A=(a_{ij})$ und $B=(b_{jk})$ Matrizen, dann gilt

$$
A \times B = C(c_{ij}) \text{  mit  }
c_{ij} := \sum_{k=1}^{n} a_{ik} \times b_{jk}
$$

Im Benchmark Algorithmus werden ausschließlich Matrizen der Größe $N \times N$ betrachtet. Eine mögliche Implementierung der Formel in Pseudocode ist in [@lst:matrix_pseudo] abgebildet.

```
Data: S[N][N], P[N][N]
Result: Q[][]
for m = 0; m < N; m++ do
  for r = 0; r < N; r++ do
    for k = 0; k < N; k++ do
      Q[m][r] += S[m][k] * P[k][r];
    end 
  end
end
```
: Pseudocode der Matrizenmultiplikation {#lst:matrix_pseudo}

Die Matrizenmultiplikation ist ein aufwendiger Algorithmus mit einer Laufzeitkomplexität von $O(n^3)$ aufgrund der verschachtelten `for`-Schleifen. Es gibt jedoch auch weitere Implementierungen wie den Solvay-Strassen-Algorithmus, der die Laufzeit auf $O(n^{2,8074})$ reduziert [@datta_matrix_2020]. In dieser Arbeit wird jedoch der übliche Algorithmus wie oben gezeigt implementiert.

### Mandelbrotmenge {#sec:mandelbrot_theory}
Um die Mandelbrotmenge zu bestimmen, wird ein Punkt $C$ aus der komplexen Ebene definiert. In einem Koordinatensystem, wie in [@fig:mandelbrot_kooridnat] gezeigt, wird die x-Achse als Realteil und die y-Achse als Imaginärteil bezeichnet. Somit kann der Punkt $C$ wie folgt dargestellt werden: $C=x+iy$.

Die Konstante $C$ wird nun iterativ auf $Z$ angewendet:

$$
Z_{n} = Z_{n-1}^{2} + C
$$

Diese Iteration wird solange ausgeführt, bis der Wert $n$ erreicht ist. Wenn der Betrag $Z$ kleiner als 2 ist, wird angenommen, dass der Punkt $C$ in der Mandelbrotmenge liegt. 

![Mandelbrot Ansicht in Koordinatensystem @noauthor_mandelbrotmenge_nodate](./img/mandelbrot_dia.gif){#fig:mandelbrot_kooridnat}

Die Mandelbrotmenge wird in einem Canvas berechnet mit der Breite von 300px und der Höhe von 150px. Jeder Pixel dieses Canvas wird durchlaufen und überprüft, ob dieser Pixel innerhalb der Mandelbrotmenge liegt. 

```
Data: width, height, xStart, xEnd, yStart, yEnd, n
for y in 1..height do
    for x in 1..width do
        cx = xStart + (x / width) * (xEnd - xStart)
        cy = yStart + (y / height) * (yEnd - yStart)
        calc({x: cx, y: cy}, n)
    end
end

fun calc(c, n) {
    z: {x: 0, y: 0}
    i, abs = 0
    do
        z = z.pow2().add(c)
        abs = z.abs()
        i += 1
    while abs <= 2 && i < n
}
```
: Pseudocode für die Mandelbrotmenge {#lst:pseudo_mandelbrot}

[@lst:pseudo_mandelbrot] zeigt den Pseudocode für die Mandelbrotmenge. Es werden die Variablen `width`, `height`, `xStart`, `xEnd`, `yStart`, `yEnd` und `n` definiert. `width` und `height` beschreiben die Größe des Canvas. `xStart`, `xEnd`, `yStart` und `yEnd` beschreiben die Start- und Endkoordinaten der Mandelbrotmenge. Die Variable `n` beschreibt die Anzahl der Iterationen der Mandelbrotmenge. In [@fig:mandelbrot_kooridnat] ist zu erkennen, dass in dieser Benchmark-Implementierung der Startwert von x auf -2 und der Endwert auf 1 festgelegt wird. Der Startwert für Y beträgt -1 und der Endwert 1. Anschließend wird in einer zweifach verschachtelten Schleife von 0 bis zur Höhe des Canvas und von 1 bis zur Breite des Canvas iteriert, um jeden Pixel im Canvas zu durchlaufen. Um die Position des Pixels auf das Koordinatensystem der Mandelbrotmenge zu übertragen, werden die Werte `cx` und `cy` berechnet. Diese Werte liegen zwischen den Start- und Endpunkten von x und y, also zwischen -2 und 1 für x und zwischen -1 und 1 für y. Anschließend wird die Funktion `calc()` aufgerufen, welche berechnet, ob die Zahl in der Mandelbrotmenge liegt. Dabei werden die Variablen `i`, `z` und `abs` definiert. Die Variable `z` beschreibt ein Objekt, welches die komplexe Zahl repräsentiert, `i` dient als Laufvariable und `abs` als Wert der Betragsfunktion der komplexen Zahl. Wenn dieser Wert kleiner als 2 ist und die Iteration vollständig ist, liegt der Wert in der Mandelbrotmenge. Wenn der Wert vor Abschluss der Iteration größer als zwei ist, kann die Berechnung abgebrochen werden, da dieser Wert nicht in der Mandelbrotmenge liegt.

## Auswahl der Messmethodik {#sec:benchmark_impl}
Jeder der oben genannten Benchmarks wird in einer Funktion definiert und in einer Schleife von 1 bis zur Konstante $n$ ausgeführt. Die benötigte Ausführungszeit wird in jeder Iteration gemessen und in einem `BenchmarkReport` gespeichert. Während der Iteration wird ausschließlich die benötigte Zeit für den Algorithmus gemessen. Zeiten wie das Befüllen der `BenchmarkReport`-Liste oder weitere Operationen, die zum Ausführen des Benchmarks benötigt werden, werden nicht erfasst. Der grobe Aufbau eines Benchmark-Moduls ist in [@lst:benchmark_impl] dargestellt. Im Webbrowser kann die aktuelle Zeit mithilfe der Methode `performance.now()` ermittelt werden. Zu Beginn des Benchmarks in einer Iteration wird der Zeitstempel gespeichert und nach Abschluss der Berechnungen von einem neuen Zeitpunkt abgezogen. Auf diese Weise wird die benötigte Zeit des Benchmarks ermittelt.

```
fun benchmark(n: Number, reporter: (...args) => void): BenchmarkReport {
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

## Gütekriterien
Die Gütekriterien der Benchmark-Algorithmen lassen sich in folgende Gruppen kategorisieren [@kounev_systems_2020, S. 13]:

1. **Relevanz (Relevance)**: Ein Benchmark sollte sich auf relevante Aspekte der Leistung konzentrieren, die für die Anwendungsszenarien von Bedeutung sind. (Wird in [@sec:auswahl-benchmark] beschrieben)
2. **Reproduzierbarkeit (Reproducibility)**: Dieses Kriterium besagt, dass ein Benchmark konsistente Ergebnisse liefern sollte, wenn er unter denselben Testbedingungen wiederholt durchgeführt wird. (Wird in [@sec:laboraufbau] beschrieben)
3. **Fairness**: Es ist möglich, verschiedene Testkonfigurationen ohne künstliche Beschränkungen miteinander zu vergleichen. Dies bedeutet, dass der Benchmark fair und neutral sein sollte und keine bestimmten Technologien oder Plattformen bevorzugt oder benachteiligt werden dürfen. (Wird in mehreren Browsern Safari, Chrome und Firefox ausgeführt [@sec:list_webbrowsers])
4. **Überprüfbarkeit (Verifiability)**: Es soll Vertrauen in die Genauigkeit der Benchmark-Ergebnisse geschaffen werden. (Weiß noch nicht ganz wie zu begründen...)
5. **Verwendbarkeit (Usability)**: Die Verwendbarkeit bezieht sich darauf, wie einfach und praktisch der Benchmark in der Testumgebung der Benutzer durchgeführt werden kann (Wird in [@sec:frontend] beschrieben)
