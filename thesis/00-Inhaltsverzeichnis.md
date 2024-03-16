---
header-includes: |
    \usepackage[toc,page,header]{appendix}
    \usepackage{titletoc}
---

\begin{titlepage}
    \begin{center}

        \vspace*{0.85cm}

        \large
        {\fontfamily{qhv}\selectfont
            \textbf{Hochschule Flensburg}
        }

        \vspace*{0.75cm}

        {\fontsize{25}{30}\fontfamily{qhv}\selectfont
            \textbf{B A C H E L O R - T H E S I S}
        }
    \end{center}

    \vspace*{0.75cm}

    \normalsize
    {\fontfamily{sf}\selectfont
        Thema: \\
        von: \\
        Matrikel-Nr.: \\
        Studiengang: \\
        Betreuer/in und Erstbewerter/in: \\
        Zweitbewerter/in: \\
        Ausgabedatum: \\
        Abgabedatum: \\
    }


\end{titlepage}

\hyphenation{WebAssembly Web-Assembly NativeClient Native-Client}

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
