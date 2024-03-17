---
header-includes: |
    \usepackage[toc,page,header]{appendix}
    \usepackage{titletoc}
---
\hyphenation{WebAssembly Web-Assembly NativeClient Native-Client macOS mac-OS TypeScript Type-Script}

\pagenumbering{gobble}
\renewcommand{\baselinestretch}{0.75}\normalsize
\startcontents[sections]
\printcontents[sections]{l}{1}{\setcounter{tocdepth}{3}}
\renewcommand{\baselinestretch}{1.15}\normalsize

\newpage
\addcontentsline{toc}{section}{Abbildungsverzeichnis}
\listoffigures

\addcontentsline{toc}{section}{Tabellenverzeichnis}
\listoftables

\addcontentsline{toc}{section}{Quellcodeverzeichnis}
\listoflistings
