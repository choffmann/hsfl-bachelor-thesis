\newpage
\setcounter{page}{1}
\pagenumbering{arabic}

# Einleitung
WebAssembly erfreut sich an zunehmender Beliebtheit, da es eine native Performance für Webanwendungen ermöglicht. Bisher dominieren JavaScript und TypeScript als native Programmiersprachen für Webanwendungen. Durch WebAssembly und die damit verbundene verbesserte Performance können nun umfangreichere 3D-Visualisierungen, Audio- und Video-Software sowie aufwendige Computerspiele im Web ermöglicht werden. In dieser Arbeit werden die Leistungsunterschiede zwischen WebAssembly und den Sprachen JavaScript und TypeScript untersucht, um festzustellen, ob und inwiefern WebAssembly schneller ist. Dabei wird diese Forschungsfrage aufgestellt und beantwortet:

_Welchen messbaren Einfluss hat der Einsatz von WebAssembly im Vergleich zu JavaScript und TypeScript auf die Leistung einer Webanwendung in Bezug auf die Ausführungsgeschwindigkeit?_

Es wird kurz beschrieben, was JavaScript, TypeScript und WebAssembly sind. Außerdem wird untersucht, welche früheren Versuche es gab, Low-Level-Code im Internet zu verwenden, und warum diese gescheitert sind oder sich nicht so wie WebAssembly durchsetzen konnten. Es wird erläutert, was eine Webanwendung und ein Webbrowser sind. JavaScript wird durch eine JavaScript-Engine im Webbrowser ausgeführt. Um den Leistungsunterschied zwischen WebAssembly und JavaScript zu verstehen, betrachten wir die JavaScript-Engine V8 von Google im Detail. Wir definieren Performance und vergleichen sie zwischen den Sprachen. Dazu wählen wir gezielt Benchmark-Algorithmen wie die Matrizenmultiplikation und die Mandelbrotmenge aus. Es wird zeigt, wie diese Benchmarks implementiert werden und wie die gewählten Metriken gemessen werden. Anschließend werden die gemessenen Metriken ausgewertet und miteinander verglichen. Die Forschungsfrage wird in drei Teilfragen aufgeteilt, um die Hauptforschungsfrage beantworten zu können.

- **RQ1**: Ist WebAssembly in Bezug auf die Ausführungsgeschwindigkeit immer schneller als JavaScript und TypeScript?
- **RQ2**: Wie groß ist der quantitative Unterschied in der Ausführungsgeschwindigkeit zwischen WebAssembly und JavaScript/TypeScript?
- **RQ3**: Ist die Ausführungsgeschwindigkeit von WebAssembly in verschiedenen Webbrowsern gleich?
