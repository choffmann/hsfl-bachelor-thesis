\newpage 

# Strichproben
Das Ziel dieser Arbeit ist es, einen Leistungsvergleich zwischen WebAssembly und TypeScript durchzuführen. Hierfür werden spezifische Algorithmen verwendet, um die Laufzeit der Anwendung zu messen. Es wurden insgesamt zwei Algorithmen in Rust programmiert, die zu WebAssembly, TypeScript und JavaScript kompiliert wurden. 

## Benchmark Algorithmen
Ein Leistungsvergleich kann gut durch Benchmark-Algorithmen gemessen werden. "Benchmarking eines Software-Systems zielt auf die Bestimmung von Software-Produktmetriken um Systeme vergleichbar zu machen, Leistungsverbesserungen aufzuzeigen, etc." [@schmid_benchmarking_2016]. Dabei ist es wichtig, dass die Ergebnisse des Benchmarkings wiederholbar und reproduzierbar sind. Weitere Informationen zum genau Ablauf und Messung der Algorithmen werden in [Kapitel ???]() weiter erläutert. 

## Matrizenmultiplikation
Ein Anwendungsfall, der auf der WebAssembly-Seite beschrieben wird, ist die Bearbeitung von Bildern und Videos sowie die Verwendung in Spielen, CAD-Anwendungen und VR- und Augmented-Reality-Anwendungen [@noauthor_use_nodate]. All diese Bereiche haben etwas mit computergenerierten Grafiken zu tun. Eine grundlegende Funktion im Bereich der Computergrafik ist das Multiplizieren von Matrizen. Dies wird beispielsweise verwendet, um Geometrien zu transformieren. Dabei beschreibt das Transformieren das Verschieben und Skalieren von Objekten. [@issa_essential_nodate]

### Theoretischer Aufbau
Die Matrizenmultiplikation wird durch die folgende mathematische Formel definiert.

Seien $A=(a_{ij})$ und $B=(b_{jk})$ eine Matrix, dann gilt

$$
A * B = C(c_{ij}) \text{  mit  }
c_{ij} := \sum_{k=1}^{n} a_{ik} * b_{jk}
$$

Im Benchmark-Algorithmus werden ausschließlich Matrizen der Größe NxN betrachtet. Eine mögliche Implementierung der Formel in Pseudocode könnte wie folgt aussehen.

```
Data: S[A][B], P[G][H]
Result: Q[][]
for m = 0; m < A; m++ do
  for r = 0; r < H; r++ do
    Q[m][r] = 0;
    for k = 0; k < G; k++ do
      Q[m][r] += S[m][k] * P[k][r];
    end 
  end
end
```

Die Matrizenmultiplikation ist ein aufwendiger Algorithmus mit einer Laufzeitkomplexität von $O(n^3)$ aufgrund der verschachtelten `for-loops`. Es gibt jedoch auch weitere Implementierungen wie den `Solvay Strassen` Algorithmus, der die Laufzeit auf $O(n^{2.8074})$ reduziert. In dieser Arbeit wird jedoch der übliche Algorithmus wie oben gezeigt implementiert.
[@datta_matrix_2020]

## Mandelbrot Menge
Eine weitere Benchmarkalgorithmus, welcher zum vergleich implementiert wurde, ist die Mandebrot Menge. Die Mandelbrot Menge ist eine Menge, 
