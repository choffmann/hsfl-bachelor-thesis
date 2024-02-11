\newpage
# Webbrowser
Das Internet besteht aus verschiedenen Ressourcen, die über eine `Uniform Resource Identifier` (URI) abgerufen werden können. Diese Ressourcen bestehen aus Dokumenten, die in `HyperText Markup Language` (HTML) geschrieben sind. HTML erlaubt es, in einem Dokument auf weitere HTML-Dokumente zu verweisen. Neben HTML-Dokumenten können auch andere Ressourcen wie Bilder, Audio- und Videoclips sowie JavaScript- und CSS-Dateien geladen werden. Ein Webbrowser ist ein Programm, das Ressourcen von einem Server über eine URI abruft und das HTML-Dokument darstellt. Die Datenübertragung erfolgt über das `HyperText Transfer Protocol` (HTTP). Wenn im HTML-Dokument JavaScript-Dateien definiert sind, werden diese im Webbrowser interpretiert und in Echtzeit kompiliert (Just-in-Time-Kompilierung). [@grosskurth_reference_2006, Seite 1 - 2]

## Geschichte
1990 entwickelte Tim Berners-Lee bei der Europäischen Organisation für Nuklearforschung (CERN) den ersten Internet-Server `httpd` sowie den ersten Web-Client `WorldWideWeb`. Tim Berners-Lee wird auch deshalb oft als der Vater des Internets bezeichnet. Der von ihm entwickelte Web-Browser bot eine grafische Darstellung von Dokumenten und war mit einem Texteditor für HTML-Dateien ausgestattet. [@bizer_linked_2009]

Gleichzeitig wurde an der University of Kansas an einem textbasierten Webbrowser namens Lynx gearbeitet. Lynx wurde für das UNIX-System entwickelt und erstmals 1993 veröffentlicht. [@grosskurth_reference_2006, Seite 2]

1993 wurde das Internet bereits von Universitäten, Regierungen und Privatfirmen genutzt, welche alle die Vorteile und Möglichkeiten des Internets erkannten. In dem selben Jahr entwickelte Marc Andreessen am National Center for Supercomputing Applications (NSCA) den allerersten populären Webbrowser Mosaic. Im darauf folgendem Jahr gründete Marc Andreessen Netscape und brachte den Webbrowser Netscape-Navigator auf dem Markt. [@noauthor_geschichte_nodate]

1995 brachte Microsoft den Internet Explorer auf den Markt. Der Browser basiert auf dem alten Code von Mosaic. Die Veröffentlichung löste einen Krieg zwischen Microsofts Internet Explorer und Netscape aus, der auch als `Browserkrieg` bekannt ist. Microsoft begann, den Internet Explorer als Standardbrowser in das Betriebssystem Windows zu integrieren und dominierte somit den Markt. Netscape veröffentlichte seinen Browser als Open-Source-Projekt unter dem Namen Mozilla, aus dem dann der Mozilla Firefox entstand. Im Laufe der Zeit traten weitere Konkurrenten auf den Markt, wie zum Beispiel Opera, Safari und Google Chrome. [@grosskurth_reference_2006, Seite 2]

## JavaScript Engine
Die JavaScript-Engine ist Bestandteil jedes modernen Browsers. Da JavaScript eine dynamische Programmiersprache ist, werden Variablen, Typen und andere Elemente in Echtzeit interpretiert. Programme, die zur Laufzeit interpretiert werden müssen, sind von Natur aus langsamer als Programme, die im Voraus kompiliert wurden. Eine JavaScript-Engine enthält einen Just-In-Time-Compiler (JIT-Compiler), der den JavaScript-Code in Echtzeit kompiliert. Derzeit gibt es drei verschiedene JavaScript-Engines, die in gängigen Webbrowsern zum Einsatz kommen. 

- v8 von Google
- SpiderMonkey von Mozilla
- JavaScriptCore in WebKit von Apple

Die JavaScript-Engine V8 von Google ist Bestandteil von Google Chrome, Opera [@noauthor_devopera_nodate], Microsoft Edge [@noauthor_download_nodate]  und vielen weiteren auf Chromium basierenden Webbrowsern. Darüber hinaus wird die Engine nicht nur in Browsern verwendet, sondern auch in Node.js und CouchDB eingesetzt. SpiderMonkey wird vorrangig im Webbrowser Mozilla Firefox eingesetzt. Webkit und die dazugehörige JavaScript-Engine JavaScriptCore kommen in den Apple-Webbrowsern Safari auf macOS und iOS zum Einsatz. Die Entwicklung der JavaScript-Engine spielte eine wichtige Rolle im Browserkrieg, da eine schnellere und flüssigere Benutzererfahrung ein wichtiger Wettbewerbsfaktor war. [@bernhard_jit-picking_2022, Seite 351]

### Aufbau einer JavaScript Engine anhand von v8
Alle drei JavaScript Engines sind prinzipiell gleich aufgebaut und enthalten weitgehend die gleichen Komponenten, allerdings sind diese Komponenten unterschiedlich in die JavaScript Engine integriert. Alle drei Engines haben unterschiedliche Implementierungen für Komponenten wie Parser, Lexer, Interpreter, JIT-Compiler, Garbage Collector und einen Compiler für WebAssembly. Die grundlegende Idee ist bei allen drei JavaScript Engines jedoch gleich. [@noauthor_documentation_nodate-1; @noauthor_spidermonkey_nodate; @noauthor_javascriptcore_nodate]

In diesem Kapitel wird die Funktionsweise der JavaScript Engine v8 vorgestellt, um ein besseres Verständnis dafür zu vermitteln, wie ein Webbrowser JavaScript-Code verarbeitet und optimiert, um die Performance zwischen JavaScript und WebAssembly zu analysieren.

#### Parser {.unnumbered}
Um JavaScript ausführen zu können, muss der in JavaScript geschriebene Code zunächst geparst werden, damit v8 ihn verstehen kann. Der Parser ist die erste Anlaufstelle, wenn eine JavaScript Datei im Webbrowser ausgeführt wird. Zu Beginn wird der JavaScript Code in einen `Abstract Syntax Tree` (AST) umgewandelt. Anschließend wird der AST von der Komponente Ignition in Bytecode umgewandelt. Es ist wichtig, dass das Parsen schnell und performant verläuft, da v8 erst nach der Kompilierung des JavaScript Codes gestartet werden kann und das AST für die Kompilierung des Codes benötigt wird.  [@noauthor_blazingly_nodate]

Da nicht alle Funktionen im Quellcode direkt beim Start benötigt werden, kommt hier ein `Lazy Parser` zum Einsatz. Somit wird nicht der komplette Quellcode als AST geparst, sondern nur die zum Start benötigten Funktionen. Der `Lazy Parser` entscheidet, ob eine Funktion übersprungen werden kann. Wird eine Funktion übersprungen, wird sie vorbereitet, damit sie bei Bedarf vollständig geparst werden kann. Nach erfolgreichem Parsen des Quellcodes wird der AST an Ignition weitergegeben. [@noauthor_blazingly_nodate-1]

#### Ignition {.unnumbered}

#### TurboFan {.unnumbered}

#### Optimization und Deoptimization {.unnumbered}

#### Garbage Collection {.unnumbered}
[@noauthor_trash_nodate]