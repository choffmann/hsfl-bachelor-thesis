\newpage

# Versuchsausfbau
Die Vergleichsalgorithmen werden in drei verschiedenen Webbrowsern ausgeführt, die jeweils die wichtigsten bereits aufgelisteten JavaScript-Engines
(V8, SpiderMonkey und JavaScriptCore) implementieren. Dabei stehen zwei Testcomputer zur Verfügung. Um das Experiment bestmöglich reproduzieren zu können,
werden im Folgenden die verwendeten Systeme und Webbrowser der Testcomputer beschrieben.

## Versuchscomputer
Für die Ausführung der Algorithmen stehen zwei Testrechner zur Verfügung. Um sicherzustellen, dass auf den Testrechnern keine Programme im Hintergrund laufen,
die das Ergebnis verfälschen könnten, werden alle Testrechner mit einem frisch installierten Betriebssystem neu installiert.
Die Tabelle \ref{table:labor_computer} gibt einen Überblick über die Testcomputer. Um die Leistung des MacBooks nicht zu beeinträchtigen, wird das MacBook
während des Experiments ständig an die Stromversorgung angeschlossen sein.

| Name    | Betriebssystem | CPU | RAM |
| ------- | ------------------ | ---------------- | -------------------- |
| Linux   | Arch Linux mit GNOME 45.4   | AMD FX(tm)-4130 Quad-Core       | 4GB DDR3 1600 MHz    |
| MacBook | macOS Sonoma 14.3.1 (23D60) | 2,4 GHz Quad-Core Intel Core i5 | 16GB 2133 MHz LPDDR3 |

: Übersicht der Testcomputer \label{table:labor_computer}

## Webbrowser
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

## Webserver
Die Anwendung für den Leistungsvergleich wird nicht direkt auf dem Testrechner ausgeführt, sondern von einem Webserver gehostet. Wie bereits in der Arbeit analysiert wurde, wird der Code dennoch durch den Aufbau des Webbrowsers auf dem Client ausgeführt. Eine serverseitige Kompilierung würde in Anwendungen wie Node.js stattfinden, welches hier jedoch nicht verwendet wird. Der Webserver ist entweder im lokalen Netzwerk der Testumgebung erreichbar oder über eine URL^[https://benchmark.choffmann.io/] im Internet.

## Versuchsdurchführung
Die Benchmarks werden für jede Implementierung (JavaScript, TypeScript und WebAssembly) auf allen Testrechnern dreimal durchgeführt, um mögliche im Hintergrund laufende Berechnungen von anderen Programmen auszuschließen. 




