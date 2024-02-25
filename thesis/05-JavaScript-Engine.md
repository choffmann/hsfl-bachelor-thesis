\newpage 

# JavaScript Engine
Die JavaScript-Engine ist Bestandteil jedes modernen Browsers. Da JavaScript eine dynamische Programmiersprache ist, werden Variablen, Typen und andere Elemente in Echtzeit interpretiert. Programme, die zur Laufzeit interpretiert werden müssen, sind von Natur aus langsamer als Programme, die im Voraus kompiliert wurden. Eine JavaScript Engine enthält einen Just-In-Time-Compiler (JIT-Compiler), der den JavaScript Code in Echtzeit kompiliert. Zusätzlich enthält eine JavaScript Engine weitere Komponenten wie Parser, Garbage Collector und WebAssembly Compiler. Derzeit gibt es drei verschiedene JavaScript-Engines, die in gängigen Webbrowsern zum Einsatz kommen. 

- v8 von Google
- SpiderMonkey von Mozilla
- JavaScriptCore in WebKit von Apple

Die JavaScript-Engine V8 von Google ist Bestandteil von Google Chrome, Opera [@noauthor_devopera_nodate], Microsoft Edge [@noauthor_download_nodate] und vielen weiteren auf Chromium basierenden Webbrowsern. Microsoft Edge basierte auf die von JavaScript Engine Chakra, wechselte aber zur V8 Engine von Google. Darüber hinaus wird die Engine nicht nur in Browsern verwendet, sondern auch in Node.js und CouchDB eingesetzt. SpiderMonkey wird vorrangig im Webbrowser Mozilla Firefox eingesetzt. Webkit und die dazugehörige JavaScript Engine JavaScriptCore kommen in den Apple Webbrowsern Safari auf macOS und iOS zum Einsatz. Die Entwicklung der JavaScript-Engine spielte eine wichtige Rolle im Browserkrieg, da eine schnellere und flüssigere Benutzererfahrung ein wichtiger Wettbewerbsfaktor war. [@bernhard_jit-picking_2022, Seite 351]

## Just-In-Time Compiler
 Wie bereits erwähnt, ist JavaScript eine dynamisch typisierte Programmiersprache. Im Verlauf des Programmcodes können Variablen unterschiedliche Datentypen zugewiesen werden. Das kann ein Vorteil in der Programmierung sein, erschwert jedoch den Kompiliervorgang, der den Programmcode in eine für den Computer verständliche Form, wie Maschinencode, bringt. Just-In-Time Compiler, auch JIT-Compiler genannt, kompilieren nur den aktuellen Code, der gerade benötigt wird, und führt diesen aus. Wenn dieser Code erneut benötigt wird, wird er erneut kompiliert. Das Gegenstück zum JIT-Compiler sind Ahead-of-Time-Compiler (AOT). Hier wird der gesamte Quellcode zuerst kompiliert und eine ausführbare Datei erstellt, die dann ausgeführt werden kann. Ein Beispiel hierfür sind Rust und Webassembly. Beide müssen vor der Ausführung vollständig kompiliert werden. [@hinkelmann_understanding_2017]


## Grundlegender Aufbau
Alle drei JavaScript Engines sind prinzipiell gleich aufgebaut und enthalten weitgehend die gleichen Komponenten, allerdings sind diese Komponenten unterschiedlich in die JavaScript Engine integriert. Alle drei Engines haben unterschiedliche Implementierungen für Komponenten wie Parser, Interpreter, JIT-Compiler, Garbage Collector und einen Compiler für WebAssembly. [@noauthor_documentation_nodate-1; @noauthor_spidermonkey_nodate; @noauthor_javascriptcore_nodate]

Alle modernen JavaScript-Engines verfügen über mindestens zwei JIT-Compiler: einen Basis-Kompilierer (Baseline Compiler) und einen Optimierungskompiler (Optimized Compiler). Der JavaScript Code wird dabei umgewandelt und vom Baseline Compiler ausgeführt, wobei Informationen gesammelt werden. Wenn erkannt wird, dass eine Funktion häufig aufgerufen wird, wird sie durch den Optimized Compiler optimiert. In V8 übernimmt `Ignition` die Aufgabe des Baseline Compilers und `TurboFan` die Aufgabe als Optimized Compiler [@hinkelmann_understanding_2017]. In SpiderMonkey wird der Optimized Compiler `WrapMonkey` [@noauthor_spidermonkey_nodate] genannt, während es in JavaScriptCore zwei Optimized Compiler gibt: `DFG (Data Flow Graph) JIT` und `FTL (Faster Than Light) JIT` [@noauthor_javascriptcore_nodate].

Alle drei Engines haben neben einem JIT-Compiler auch einen WebAssembly-Kompilierer, um WebAssembly auszuführen. In V8 übernimmt dies `Liftoff`, in SpiderMonkey `RabaldrMonkey` und `BaldrMonkey` und in Webkits JavaScriptCore `BBQ (Build Bytecode Quickly)` und `OMG (Optimized Machine-code Generator)`. [@noauthor_documentation_nodate-1; @noauthor_spidermonkey_nodate; @bastien_assembling_2017]

## Detaillierter Aufbau der V8 JavaScript Engine
Abbildung \ref{fig:v8-pipeline} zeigt die V8 Kompilierungspipeline. Der JavaScript Code wird zuerst vom Parser in einen `Abstract Syntax Tree` umgewandelt. Dieser `Abstract Syntax Tree` wird vom Interpreter `Ignition` in Bytecode umgewandelt. Der Bytecode wird bei Bedarf von `TurboFan` in optimierten Maschinencode umgewandelt. 

![V8 Compiler Pipeline @hinkelmann_understanding_2017 \label{fig:v8-pipeline}](./img/v8_compiler_pipeline.jpg){width=80%}

In diesem Kapitel wird die Funktionsweise der JavaScript Engine V8 vorgestellt, um ein besseres Verständnis dafür zu vermitteln, wie ein Webbrowser JavaScript-Code verarbeitet und optimiert, um die Performance zwischen JavaScript und WebAssembly zu analysieren. Es wird der JavaScript Code analysiert, wie er durch die JavaScript Engine V8 durchläuft.

```js
function foo(a, b, c) {
	const d = c - 100;
	return a + b * d;
}

foo(5, 2, 150)
```

### Parser
Um JavaScript ausführen zu können, muss der in JavaScript geschriebene Code zunächst geparst werden, damit v8 ihn verstehen kann. Der Parser ist die erste Anlaufstelle, wenn eine JavaScript Datei im Webbrowser ausgeführt wird. Zu Beginn wird der JavaScript Code in einen `Abstract Syntax Tree` (AST) umgewandelt. Ein AST ist eine syntaktische Struktur vom JavaScript Quellcode. Anschließend wird der AST von der Komponente Ignition in Bytecode umgewandelt. Es ist wichtig, dass das Parsen schnell und performant verläuft, da v8 erst nach der Kompilierung des JavaScript Codes gestartet werden kann und das AST für die Kompilierung des Codes benötigt wird.  [@noauthor_blazingly_nodate]

Da nicht alle Funktionen im Quellcode direkt beim Start benötigt werden, kommt hier ein `Lazy Parser` zum Einsatz. Somit wird nicht der komplette Quellcode als AST geparst, sondern nur die zum Start benötigten Funktionen. Der `Lazy Parser` entscheidet, ob eine Funktion übersprungen werden kann. Wird eine Funktion übersprungen, wird sie vorbereitet, damit sie bei Bedarf vollständig geparst werden kann. Nach erfolgreichem Parsen des Quellcodes wird der AST an Ignition weitergegeben. [@noauthor_blazingly_nodate-1]

Der AST, der aus der oben genannten Funktion entsteht, hat ungefähr eine Form, die in Abbildung x gezeigt wird. Diese Darstellung wurde mit dem npm Paket `acorn`^[https://www.npmjs.com/package/acorn] analysiert. Acorn ist ein JavaScript Parser. Obwohl Acorn nicht in der V8 Engine verwendet wird, bietet es einen guten Überblick darüber, wie der AST aufgebaut ist. **AST image**

### Ignition
Ignition ist ein Interpreter, der aus den Informationen des AST Bytecode erzeugt. Bytecode ist eine Abstraktion von Maschinencode und wird von einem High-Performance-Interpreter ausgeführt. Es handelt sich dabei um eine Ansammlung von Operationen, die ausgeführt werden. Obwohl der Bytecode für sich optimiert ist, ist seine Ausführung naturgemäß langsamer als die von Maschinencode. V8 überprüft, ob eine Funktion häufig ausgeführt wird. Wenn dies der Fall ist, übernimmt `TurboFan` die Kompilierung und gibt optimierten Maschinencode aus, der performanter als der Bytecode ist. Dieser Schritt ist in Abbildung 
\ref{fig:v8-pipeline} mit einem grünen Pfeil markiert. [@hinkelmann_understanding_2017; @v8_firing_2016]

Der Bytecode aus der oben genannten Funktion kann mittels Node.js, Chromium oder den Developertool `d8`^[https://v8.dev/docs/d8] extrahiert werden. Mit dem Tag `--print-bytecode` kann der generierte Bytecode von Ignition ausgegeben werden. Die hier dargestellte Ausgabe enthält lediglich den Bytecode der Funktion `foo()`. Die Komplette Ausgabe ist im Anhang \ref{anhang:v8-ignition-bytecode} zu sehen.

```bash
$ d8 --print-bytecode demo.js
...
36 S> 0x3cd1000421d4 @    0 : 0b 05             Ldar a2
38 E> 0x3cd1000421d6 @    2 : 45 64 00          SubSmi [100], [0]
	  0x3cd1000421d9 @    5 : c6                Star0
47 S> 0x3cd1000421da @    6 : 0b f9             Ldar r0
60 E> 0x3cd1000421dc @    8 : 3a 04 02          Mul a1, [2]
56 E> 0x3cd1000421df @   11 : 38 03 01          Add a0, [1]
64 S> 0x3cd1000421e2 @   14 : ab                Return
```

Es gibt hier 7 Schritte, die im Bytecode ausgeführt werden. Ignition besteht aus mehreren Registern, wie `r0, r1, r2, ...`, in denen Werte abgespeichert werden können, sowie einem Akkumulator. Der Akkumulator ist wie ein normales Register, in dem ein Wert abgespeichert wird. Der Bytecode nennt dieses Register jedoch bei einer Operation oft nicht explizit. Zum Beispiel wird im Bytecode `Add a0` der Wert von `a0` mit dem Wert im Akkumulator addiert. Die Parameter, die der Funktion übergeben werden, sind auch in Registern gespeichert, die hier als `a0, a1, a2` bezeichnet werden. Zunächst wird der Wert aus dem Register `a2` durch den Befehl `Ldar` in den Akkumulator geladen. Anschließend wird der Wert im Akkumulator durch `SubSmi [100]` um 100 subtrahiert und erneut im Akkumulator gespeichert. `SubSmi` steht dabei für `Substract small integer`. Anschließend speichert `Star0` den Wert im Akkumulator im Register `r0`. Register `r0` repräsentiert somit die Variable `d` aus dem JavaScript Code. Der Wert wird durch `Ldar r0` wieder in den Akkumulator geladen. Zunächst wird `Mul a1` ausgeführt, wobei der Wert im Akkumulator mit dem Wert aus dem Register `a1` multipliziert wird. Anschließend wird `Add a0` ausgeführt, wobei der Wert im Akkumulator mit dem Wert von `a0` addiert wird. Schließlich wird `Return` aufgerufen. Dadurch wird der Wert im Akkumulator zurückgegeben und die Funktion beendet. [@hinkelmann_understanding_2017]

Durch Ignition wird der JavaScript Code nicht mehr benötigt. Alle Informationen sind im Bytecode enthalten und werden bei Bedarf von `Turbofan` noch weiter optimiert. Dadurch muss der JavaScript Code nicht erneut geparst werden. Zudem benötigt der gesamte Bytecode weniger Speicher als ein kompilierter Maschinencode, was zu einer Reduzierung des Arbeitsspeichers führt. [@v8_firing_2016]

### TurboFan
TurboFan ist der Optimierungskompiler von V8. Er basiert auf dem Konzept `Sea of Nodes`. 

[@titzer_digging_2015; @indutny_sea_2015]

### Optimization und Deoptimization
V8 überprüft, ob eine Funktion häufiger ausgeführt wird. Ist dies der Fall, wird diese Funktion als 'hot' markiert und von TurboFan in optimierten Maschinencode kompiliert, der dann ausgeführt wird. Dieser Schritt wird Optimierung genannt. Es kann jedoch auch vorkommen, dass eine Funktion wieder deoptimiert wird. Aber warum sollte man eine optimierte Funktion wieder deoptimieren? Dies hat wieder mit der Eigenschaft von JavaScript und dessen dynamischer Typisierung zu tun. TurboFan führt den Code nur aus, wenn der Datentyp bekannt ist. Wenn sich der Datentyp im Programmcode ändert, was in JavaScript der Fall sein kann, kann TurboFan nicht weiterarbeiten und greift auf den unoptimierten Bytecode von Ignition zurück. Wird dieser Code erneut ausgeführt und als hot markiert, optimiert TurboFan ihn erneut. [@hinkelmann_speed_2019; @hinkelmann_understanding_2017]

### Garbage Collection
[@noauthor_trash_nodate]

### Liftoff
Liftoff ist ein Baseline Compiler für WebAssembly in V8. Der WebAssembly Code wurde bereits in eine `.wasm` Datei kompiliert, die jedoch noch von der JavaScript Engine verstanden und ausgeführt werden muss. Das Hauptmerkmal von Liftoff ist die schnelle Kompilierung von WebAssembly, um die Startzeit so niedrig wie möglich zu halten. Liftoff ist ein One-Pass-Compiler. Das bedeutet, dass Liftoff den WebAssembly-Code einmal durchläuft und sofort Maschinencode zurückgibt. One-Pass-Compiler sind schnell in der Codegenerierung, bieten aber wenig Spielraum, um Optimierungen anzuwenden. Dies kann jedoch vernachlässigt werden, da der Code bereits während der Kompilierung zu WebAssembly optimiert werden kann. Nach Abschluss der Kompilierung wird der resultierende Maschinencode ausgeführt. Es spielt für V8 keine Rolle, ob der Maschinencode von TurboFan oder Liftoff kompiliert wurde, da beide Ausgaben ausgeführt werden. [@backens_liftoff_2028]
