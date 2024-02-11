
# WebAssembly
WebAssembly, kurz WASM, ist eine Low-Level-Programmiersprache, die sich auf Sicherheit und Performance im Web konzentriert. Sie wurde von der Organisation World Wide Web Consortium (W3C)^[https://www.w3.org/] entwickelt und erstmals 2018 veröffentlicht. Es ist nicht vorgesehen, WebAssembly-Code von Hand zu schreiben. WebAssembly wird in einer High-Level-Programmiersprache wie C, C++, C#, Java, Kotlin oder Rust und weitere Programmiersprachen geschrieben, die den Code in eine `.wasm` Datei kompiliert. Diese `.wasm` Datei enthält den binären Code, womit der Browser allerdings alleine nichts anfangen kann. Zur Ausführung des WebAssembly Codes wird weiterhin JavaScript benötigt. Es ist nicht beabsichtigt, dass WebAssembly JavaScript ersetzt, sondern dass die beiden unterschiedlichen Technologien Hand in Hand arbeiten. [@group_webassembly_nodate; @haas_bringing_2017]

## Zielsetzung

### Rust für WebAssembly