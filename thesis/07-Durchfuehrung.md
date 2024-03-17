# Durchführung

## Implementierung von JavaScript und TypeScript
Die Implementierungen von JavaScript und TypeScript unterscheiden sich nur durch die Typisierung von TypeScript. Aus diesem Grund werden die beiden Implementierungen hier zusammen beschrieben. Die Zeit wird durch die Methode `performance.now()` ermittelt. In TypeScript und die dazugehörige `tsconfig.json` wird das Kompilierungsziel mit `ESNext` angegeben. Dadurch wird TypeScript in die neuste ECMAScript-Version übersetzt.

In der Matrizenmultiplikation werden zu Beginn des Benchmarks zwei Matrizen mit der Größe von $N \times N$ erstellt. Dabei entspricht $N$ dem aktuellen Index der laufenden Iteration. Die Matrizen werden mit zufälligen Werten befüllt. Zusätzlich zu den beiden Matrizen, die miteinander multipliziert werden, wird eine leere Matrix erstellt, in der das Ergebnis gespeichert wird. Die Erstellung der Matrizen findet in jeder Iteration statt, jedoch noch bevor die Zeit gemessen wird. Die Multiplikation der Matrizen wurde gemäß dem [@sec:matrix_theory] implementiert. 

Die Mandelbrotmenge wird mithilfe von komplexen Zahlen berechnet. Hierfür wurde eine Klasse namens `Complex` erstellt, die zwei Variablen für den Realteil und den Imaginärteil enthält. Die Klasse verfügt außerdem über Methoden zum Addieren, Quadrieren und zur Berechnung des Betrags. In jeder Iteration des Benchmarks werden die berechneten Werte des Canvas in einer Liste gespeichert, um die Daten an das Frontend zu senden und den Benchmark zu visualisieren. Während der laufenden Messung wird die Variable `map`, wie in [@lst:js_mandelbrot_map] zusehen, nur einmal befüllt, da es sich hierbei um eine funktionale Implementierung handelt. Nach Abschluss der Zeitmessung der Iteration wird die Liste an das Frontend übergeben. Die restliche Implementierung erfolgte wie in [@sec:mandelbrot_theory] beschrieben.

```js
map = Array.from(Array(options.height).keys()).flatMap(yMap => (
  Array.from(Array(options.width).keys()).map(xMap => {
    c.x = options.xSet.start + (xMap / options.width)
        * (options.xSet.end - options.xSet.start)
    c.y = options.ySet.start + (yMap / options.height)
            * (options.ySet.end - options.ySet.start)
    const [z, isMandelBrot] = calcZ(c, i)
    return {
      x: xMap, y: yMap, z, isMandelBrot
    }
  })
))
```
: Abspeichern der berechneten Liste {#lst:js_mandelbrot_map}

## Implementierung von WebAssembly durch Rust
In Rust wurde ein `trait`^[https://doc.rust-lang.org/book/ch10-02-traits.html] namens `Runner` erstellt, welches mehrere Methoden wie `init(), before_iter(), benchmark(), ...` enthält. Dazu gibt es eine Klasse namens `BenchmarkRunner`, welche die Funktionen des `Runner` ausführt. Der Aufbau des `BenchmarkRunner` ist ähnlich zu der Funktion, welche in [@sec:benchmark_impl] beschreiben wurde. Jede Benchmark-Implementierung in Rust muss jetzt nur noch `Runner` implementieren und angeben, wie die Benchmark-Funktion aufgerufen werden soll. Die Zeitmessung erfolgt mit dem Paket `instant`^[https://crates.io/crates/instant/0.1.12]. Es ist möglich, auch hier `performance.now()` zu verwenden. Allerdings gab es Schwierigkeiten, da die Benchmarks in einem Web Worker aufgerufen werden. Deshalb wurde hier auf ein externes Paket zurückgegriffen, welches die Zeitmessung in WebAssembly ermöglicht.

In dieser Arbeit wird das Tool wasm-pack^[https://rustwasm.github.io/docs/wasm-pack/introduction.html] verwendet, um den Rust-Code für WebAssembly zu kompilieren. `wasm-pack` bietet eine Schnittstelle, um Rust-Code in WebAssembly umzuwandeln. Es automatisiert den Prozess des Bauens der entsprechenden WebAssembly-Dateien sowie das Bereitstellen von zugehörigen JavaScript-Dateien. In wasm-pack kann definiert werden, wie der Code von Rust zu WebAssembly kompiliert werden soll. Bei der Kompilierung wird der Parameter `--profiling` angegeben. Dadurch wird der Rust-Code optimiert, während Debug-Ausgaben weiterhin aktiv bleiben, falls diese benötigt werden.   Alternativ gibt es noch die Parameter `--dev` und `--release`. Der Parameter `--dev` behält die Debug-Optionen bei, der Code wird allerdings nicht optimiert. Der Parameter `--release` deaktiviert das Debugging und optimiert den Code. Somit ist der Parameter `--profiling` ein guter Mittelweg zwischen Debugging und Optimierung. 

Bei der Matrizenmultiplikation werden zunächst zwei Matrizen der Größe $N \times N$ sowie eine leere Matrix erzeugt, in der das Ergebnis gespeichert wird. Dies geschieht in jeder Iteration, jedoch noch bevor die Zeit gemessen wird. Die restliche Implementierung ist analog zu [@sec:matrix_theory]. Bei der Mandelbrotmenge wird ebenfalls eine Liste mit den Ergebnissen erstellt und an das Frontend übergeben. Wie auch in JavaScript und TypeScript wird hier die Liste bei der Ausführung erstellt. Es wurde eine Implementierung für komplexe Zahlen erstellt, welche die Funktionen zum Addieren, Quadrieren und zur Ermittlung der Betragsfunktion der komplexen Zahl enthält. Die restliche Implementierung erfolgt analog zu [@sec:mandelbrot_theory].

## Benchmark Frontend {#sec:frontend}
Um die verschiedenen Benchmark-Implementierung leicht ausführen zu können, wurde ein Frontend entwickelt. Dieses führt die Benchmarks aus und wurde in TypeScript mit React entwickelt. Die verschiedenen Benchmark-Implementierungen werden über Module in das Frontend geladen und durch einen Web Worker ausgeführt. Ein Web Worker ermöglicht es JavaScript, Anwendungen in einem anderen Thread auszuführen, da JavaScript eine Single-Thread-Sprache ist. Dadurch können aufwendige Berechnungen im Hintergrund ausgeführt werden, ohne den Main Thread des Frontends zu blockieren. Die Ausführung des Benchmarks im Web Worker hat zudem den Vorteil, dass der Benchmark in einer eigenen Umgebung ausgeführt wird, ohne Einmischung von Berechnungen des Frontends, wie zum Beispiel dem Garbage Collector oder anderen Berechnungen. Ein Web Worker kann über einen `MessageBus` mit dem Main-Thread kommunizieren [@mdn_web_2023]. Im Frontend kann die Konstante $n$ angegeben werden. Diese beschreibt, wie oft ein Benchmark wiederholt werden soll. Die Konstante wird an die Benchmarkmodule weitergegeben. Jeder Benchmark hat einen `reporter`-Callback, um Parameter an den ausgeführten Web Worker zu übergeben. Diese Daten können dann an das Frontend weitergegeben werden. Das Frontend zeigt eine Übersicht über den aktuellen Benchmark bei Status $n$ an. Außerdem wird ein Diagramm und eine Tabelle mit den Ergebnissen angezeigt. Der Benchmark Report, der von den Benchmark Implementierungen erstellt wird, kann heruntergeladen werden, um weitere Analysen durchzuführen. Im Frontend des Mandelbrotmenge-Benchmarks wurde eine Funktion hinzugefügt, die es ermöglicht, den berechneten Canvas im Frontend anzuzeigen.

## Laboraufbau {#sec:laboraufbau}
Die Vergleichsalgorithmen werden in drei verschiedenen Webbrowsern ausgeführt, die jeweils die wichtigsten, bereits in [@sec:js-engine] aufgelisteten JavaScript-Engines (V8, SpiderMonkey und JavaScriptCore) implementieren. Dabei stehen zwei Testcomputer zur Verfügung. Um das Experiment bestmöglich reproduzieren zu können, werden im Folgenden die verwendeten Systeme und Webbrowser der Testcomputer beschrieben. 

### Versuchscomputer
Für die Ausführung der Algorithmen stehen zwei Testrechner zur Verfügung. Um sicherzustellen, dass auf den Testrechnern keine Programme im Hintergrund laufen,
die das Ergebnis verfälschen könnten, werden alle Testrechner mit einem Betriebssystem neu installiert.
Die [@tbl:labor_computer] gibt einen Überblick über die Testcomputer. Um die Leistung des MacBooks nicht zu beeinträchtigen, wird das MacBook
während des Experiments ständig an die Stromversorgung angeschlossen.

| Name    | Betriebssystem | CPU | RAM |
| ------- | ------------------ | ---------------- | -------------------- |
| Linux   | Arch Linux mit GNOME 45.4   | AMD FX(tm)-4130 Quad-Core       | 4GB DDR3 1600 MHz    |
| MacBook | macOS Sonoma 14.3.1 (23D60) | 2,4 GHz Quad-Core Intel Core i5 | 16GB 2133 MHz LPDDR3 |

: Übersicht der Testcomputer {#tbl:labor_computer}

### Webbrowser {#sec:list_webbrowsers}
Der Leistungsvergleich wird in drei Webbrowsern mit den drei aufgeführten JavaScript Engines (V8, SpiderMonkey und JavaScriptCore) durchgeführt. Da Webkit mit 
der JavaScript-Engine JavaScriptCore hauptsächlich im Safari-Browser für Apple macOS und iOS zur Verfügung steht, kann dieser Leistungsvergleich nur auf dem
Testrechner MacBook durchgeführt werden. Die [@tbl:labor_browser] gibt einen Überblick über die verwendeten Webbrowser und deren Versionen.

| Testcomputer | Browser    | JS Engine | Version |
| ------------ | --------------- | -------------- | -------------------------------- |
| Linux   | Chromium        | V8             | Version 122.0.6261.39            |
| Linux   | Mozilla Firefox | SpiderMonkey   | Version 122.0.1                  |
| MacBook | Safari          | JavaScriptCore | Version 17.3.1 (19617.2.4.11.12) |
| MacBook | Google Chrome   | V8             | Version 122.0.6167.184           |
| MacBook | Mozilla Firefox | SpiderMonkey   | Version 123.0                    |
: Übersicht der Webbrowser {#tbl:labor_browser}

### Webserver
Die Anwendung für den Leistungsvergleich wird nicht direkt auf dem Testrechner ausgeführt, sondern von einem Webserver gehostet. Trotzdem erfolgt die Ausführung des Codes durch den Browser des Clients, wie bereits in der Arbeit in [@sec:webanwendungen] und [@sec:js-engine] erläutert wurden. Eine serverseitige Kompilierung würde in Anwendungen wie Node.js stattfinden, die jedoch in diesem Kontext nicht verwendet werden. Der Webserver ist entweder im lokalen Netzwerk der Testumgebung erreichbar oder über eine URL^[https://benchmark.choffmann.io/] im Internet zugänglich.

## Versuchsdurchführung
Die Benchmarks werden für jede Implementierung (JavaScript, TypeScript und WebAssembly) auf allen Testrechnern dreimal durchgeführt, um mögliche im Hintergrund laufende Berechnungen von anderen Programmen auszuschließen. Nach jeder vollständigen Durchführung von JavaScript, TypeScript und WebAssembly wird der Bericht heruntergeladen. Anschließend wird das Browserfenster neu geladen, der Browsercache geleert und der Benchmark erneut durchgeführt. Im Frontend zur Mandelbrotmenge wurde in allen durchgängen die Option deaktiviert, den berechneten Canvas anzuzeigen. Bei der Entwicklung der Mandelbrotmenge wurden verschiedene Versionen erstellt, die über das Frontend ausgewählt werden können. In jeder Durchführung wurde die neueste Version verwendet. Die anderen Versionen dienten lediglich dem Vergleich und der Verbesserung während der Entwicklung. Für JavaScript und WebAssembly wurde jeweils Version #2 verwendet, während für TypeScript Version #4 zum Einsatz kam.
