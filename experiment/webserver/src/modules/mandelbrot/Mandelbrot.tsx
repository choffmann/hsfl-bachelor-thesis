import {Box, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import React, {useRef, useState} from "react";
import TsMandelbrot from "./TsMandelbrot.tsx";
import {MandelbrotMap} from "mandelbrot/mandelbrot-ts/dist";
import MandelbrotBitmap from "./MandelbrotBitmap.tsx";
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import LineChart from "../analyse/LineChart.tsx";
import AnalyseTable from "../analyse/AnalyseTable.tsx";

export interface MandelbrotProps {

}

const DEFAULT_N = 50

const Mandelbrot = (props: MandelbrotProps) => {
  const [n, setN] = useState(DEFAULT_N)
  const [tsBitMap, setTsBitMap] = useState<MandelbrotMap | null>(null)
  const [tsReport, setTsReport] = useState<BenchmarkReport | null>(null)
  const [jsReport, setJsReport] = useState<BenchmarkReport | null>(null)
  const [wasmReport, setWasmReport] = useState<BenchmarkReport | null>(null)

  const handleSetNInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    isNaN(value) ? setN(DEFAULT_N) : setN(value)
  }

  return (
      <Container>
        <Box sx={{mt: 3, mb: 3}}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="h4">Mandelbrot</Typography>
              <Typography>
                Dieser Algorithmus berechnet die Mandelbrot Menge. Die Mandelbrot Menge
                ist eine Menge der komplexen Zahlen, wo eine Folge beschränkt ist. Diese Menge kann
                als Fraktal visualisiert werden.
              </Typography>
              <TextField
                  label={"Wähle eine N"}
                  value={n}
                  onChange={handleSetNInput}
              />
            </Stack>

            <Stack spacing={2} direction={{xs: "column", sm: "row"}} justifyContent="space-evenly">
              <Paper elevation={3} sx={{p: 2, width: "100%"}}>
                <TsMandelbrot n={n} onCompleted={(report) => setTsReport(report)} onBitmapChanged={(map) => setTsBitMap(prev => prev !== null ? [...prev, ...map] : map)}/>
              </Paper>
            </Stack>

            <Stack spacing={2} direction={{xs: "column", sm: "row"}} justifyContent="space-evenly">
              <MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"} map={tsBitMap} display={tsBitMap !== null && tsBitMap !== undefined}/>
              {/*<MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"} map={tsBitMap} display={tsBitMap !== null && tsBitMap !== undefined}/>*/}
              {/*<MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"} map={tsBitMap} display={tsBitMap !== null && tsBitMap !== undefined}/>*/}
            </Stack>

            <LineChart n={n} tsReport={tsReport} wasmReport={wasmReport} jsReport={jsReport}/>
            <AnalyseTable n={n} tsReport={tsReport} jsReport={jsReport} wasmReport={wasmReport}/>
          </Stack>
        </Box>
      </Container>
  )
}

export default Mandelbrot