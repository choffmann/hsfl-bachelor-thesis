\newpage
# JavaScript und TypeScript

## JavaScript
JavaScript ist eine Programmiersprache, die vorrangig in der Webentwicklung eingesetzt wird. Sie wird auch als die Sprache des Web’s genannt. Brendan Eich entwickelte die Sprache im Jahr 1995, als er bei der Firma Netscape tätig war. Vor dieser Zeit war nur die Darstellung von statischen Daten im Internet möglich. Durch JavaScript wurde es möglich, dynamisch Daten bzw. Inhalte in eine Seite zu laden und anzuzeigen. 1997 wurde JavaScript von ECMA weiterentwickelt, eine Organisation von Mozilla. Durch ECMA kam eine einheitliche Standardisierung ECMAScript, welche von den Webbrowsern verstanden und interpretiert wird. [@noauthor_javascript_nodate]

JavaScript ist eine Skript Sprache, welche in Echtzeit kompiliert wird. Diese Kompilierung wird Just-In-Time oder JIT Kompilierung genannt. Die Sprache ist dynamisch und besitzt keine Typisierung. Objekte, Variablen oder Funktionen werden dynamisch erstellt und vom Webbrowser kompiliert. [@noauthor_javascript_2023]

Aber was ist der Unterschied zwischen statischen und dynamischen Inhalten in Webanwendungen? Zu Beginn des Internets bestand das Web aus statischen Dokumenten, die durch Links auf andere Seiten verwiesen. Die Dokumente sind in HTML Dateien definiert, welche vom Webbrowser angezeigt werden. JavaScript bietet die Möglichkeit, das Document Object Model, kurz DOM zu manipulieren. Das DOM ist ein API, welche mit dem HTML Dokument interagieren kann. Das HTML Dokument wird im Browser als Baumstruktur dargestellt. Durch JavaScript kann auf die Baumstruktur zugegriffen werden, um Elemente zu ändern, hinzuzufügen, entfernen oder auf Benutzer Events zu reagieren. [@noauthor_document_2023]

### Dynamische Typisierung
JavaScript ist eine dynamische Programmiersprache. Das bedeutet, dass Variablen während des Programmablaufs einem anderen Datentyp zugewiesen werden können. Der folgende Ausschnitt zeigt einen fehlerfreien JavaScript-Code, der eine Variable `foo` deklariert und mit der Nummer `42` initialisiert. Die Variable `foo` kann jedoch auch einen String speichern. Nummern und Strings zwei verschiedene Datentypen sind.  In einer statisch typisierten Programmiersprache ist die Variable von Anfang an einem festen Datentypen zugewiesen. 

## TypeScript
JavaScript hat in der Webentwicklung einen großen Fortschritt gebracht, da es nun möglich ist, dynamische Webseiten darzustellen. Obwohl die Sprache ursprünglich für das Schreiben von kurzen Skripten entwickelt wurde, wurden im Laufe der Zeit immer größere Projekte mit dieser Sprache entwickelt. Heutzutage wird JavaScript sogar außerhalb des Webbrowsers eingesetzt. Node.js hat es für Entwickler immer attraktiver gemacht, diese Sprache als Cross-Platform zu nutzen. Durch die dynamische Sprache und fehlender Typisierung kommen viele, schnell zu übersehende Fehler auf. Ein Beispiel von einem Code Ausschnitt soll dies verdeutlichen, welche in JavaScript ohne Probleme ausgeführt werden kann. Dabei ist die Variable `area` beim ausführen `NaN`. Warum? 

```js
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
// area -> NaN
```

In der Entwicklung kann es schnell zu Fehlern kommen, wenn Wörter falsch geschrieben werden. Die meisten Programmiersprachen erkennen solche Fehler bereits während der Entwicklung oder das Programm wird gar nicht erst kompiliert. Aus diesem Grund entwickelte Microsoft im Jahr 2012 eine statische typisierte Erweiterung zu JavaScript mit dem Namen TypeScript. TypeScript ist eine erweiterte Version von JavaScript und baut auf dieser Sprache auf. TypeScript ermöglicht das Arbeiten mit Typen. Das Beispielprogramm würde nicht kompilieren, da TypeScript den Typ der Variable `obj` erkennt. Auf diese Weise ist sichergestellt, dass das Programm fehlerfrei ausgeführt werden kann. Am Ende wird TypeScript zu JavaScript kompiliert. [@noauthor_javascript_nodate-1]
