\newpage
# JavaScript und TypeScript {#sec:javascript_typescript}

## JavaScript {#sec:javascript}
JavaScript ist eine Programmiersprache, die vorrangig in der Webentwicklung eingesetzt wird. Sie wird auch als die Sprache des Webs genannt. Brendan Eich entwickelte die Sprache im Jahr 1995, als er bei der Firma Netscape tätig war. Vor dieser Zeit war nur die Darstellung von statischen Daten im Internet möglich. Durch JavaScript ist es möglich, dynamisch Daten und Inhalte in eine Webseite zu laden und anzuzeigen. Im Jahr 1997 wurde JavaScript von der Organisation ECMA weiterentwickelt, die zu Mozilla gehört. Durch ECMA wurde eine einheitliche Standardisierung namens ECMAScript eingeführt, die von Webbrowsern verstanden und interpretiert wird. [@w3schools_javascript_nodate]. 

JavaScript ist eine Skriptsprache, welche in Echtzeit kompiliert wird. Diese Kompilierung wird Just-In-Time oder JIT Kompilierung genannt. Die Sprache ist dynamisch und besitzt keine Typisierung. Objekte, Variablen oder Funktionen werden dynamisch erstellt und vom Webbrowser kompiliert [@mdn_javascript_2023].

Aber was ist der Unterschied zwischen statischen und dynamischen Inhalten in Webanwendungen? Zu Beginn des Internets bestand das Web aus statischen Dokumenten, die durch Links auf andere Seiten verwiesen. Die Dokumente sind in HTML Dateien definiert, welche vom Webbrowser angezeigt werden. JavaScript bietet die Möglichkeit, das Document Object Model, kurz DOM zu manipulieren. Das DOM ist ein API, welche mit dem HTML Dokument interagieren kann. Das HTML Dokument wird im Browser als Baumstruktur dargestellt. Durch JavaScript kann auf die Baumstruktur zugegriffen werden, um Elemente zu ändern, hinzuzufügen, zu entfernen oder auf Benutzer Events zu reagieren [@mdn_document_2023]. 

JavaScript ist eine dynamische Programmiersprache. Das bedeutet, dass Variablen während des Programmablaufs einem anderen Datentyp zugewiesen werden können. Angenommen, wir definieren eine Variable `const foo = 42`. Diese Variable enthält nun einen numerischen Datentyp. Im Laufe des Programms kann diese Variable jedoch einen anderen Wert von einem anderen Datentyp annehmen, obwohl sie bereits deklariert wurde, wie zum Beispiel `foo = "bar"`. Die Variable ändert nun ihren Datentyp von `number` zu `String`. Obwohl dies in der Programmierung Vorteile haben kann, kann es auch zu unerwartetem Verhalten führen. Außerdem erschwert es dem Compiler die Arbeit, da er nicht genau weiß, wie die Variable auszusehen hat. Wie der Webbrowser dies implementiert, wird in [@sec:javascript-engine] besprochen. In einer statisch typisierten Programmiersprache ist die Variable von Anfang an einem festen Datentyp zugewiesen. 

## TypeScript {#sec:typescript}
JavaScript hat in der Webentwicklung einen großen Fortschritt erzielt, da es die Darstellung dynamischer Webseiten ermöglicht. Obwohl die Sprache ursprünglich für das Schreiben von kurzen Skripten entwickelt wurde, wurden im Laufe der Zeit immer größere Projekte mit dieser Sprache entwickelt. Heutzutage wird JavaScript sogar außerhalb des Webbrowsers eingesetzt. Node.js hat es für Entwickler immer attraktiver gemacht, diese Sprache als Cross-Platform zu nutzen. Aufgrund der dynamischen Sprache und fehlenden Typisierung können schnell viele Fehler übersehen werden. Ein Beispiel in [@lst:code] soll eine solchen Fehler darstellen, hier ergibt die Variable `area` beim Ausführen `NaN`.

```js
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth; // Fehler: Schreibfehler in 'height'
// area -> NaN
```
: Beispiel eines einwandfreien JavaScript Code {#lst:code}

In der Entwicklung können schnell Fehler auftreten, wenn Wörter falsch geschrieben werden. Die meisten Programmiersprachen erkennen solche Fehler bereits während der Entwicklung oder das Programm wird gar nicht erst kompiliert. Aus diesem Grund entwickelte Microsoft im Jahr 2012 eine statisch typisierte Erweiterung zu JavaScript mit dem Namen TypeScript. TypeScript ist eine erweiterte Version von JavaScript, die auf dieser Sprache aufbaut und es Entwicklern ermöglicht, mit Typen zu arbeiten. Im obigen Beispiel würde das Programm nicht kompilieren, da TypeScript den Typ der Variable `obj` erkennt und auf diese Weise sicherstellt, dass das Programm fehlerfrei ausgeführt werden kann. TypeScript wird am Ende zu JavaScript kompiliert, sodass die Vorteile der Typsicherheit während der Entwicklung erhalten bleiben und der Code überall dort läuft, wo auch JavaScript verwendet wird [@typescript-docs_documentation_2024].
