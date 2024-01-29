import {Box, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import React, {createRef, useCallback, useEffect, useMemo, useRef, useState} from "react";
import MandelbrotBitmap from "./MandelbrotBitmap.tsx";
import LineChart from "../analyse/LineChart.tsx";
import AnalyseTable from "../analyse/AnalyseTable.tsx";
import {useWorker} from "../../hooks/useWorker.ts";
import BenchmarkModel from "../BenchmarkModel.tsx";
import {useCanvas} from "../../hooks/useCanvas.ts";

export interface MandelbrotProps {

}

const DEFAULT_N = 200

const Mandelbrot = (props: MandelbrotProps) => {
  const [n, setN] = useState(DEFAULT_N)
  const tsWorker = useWorker(new URL("./worker/TsMandelbrotWorker.ts", import.meta.url), n)
  const tsCanvas = useCanvas()

  useEffect(() => {
    tsWorker.registerHandler(tsAppendWorkerHandler)
  }, []);

  useEffect(() => {
    tsWorker.finished && tsCanvas.rebuildOffscreen()
  }, [tsWorker.finished]);

  const handleSetNInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    isNaN(value) ? setN(DEFAULT_N) : setN(value)
  }

  const tsAppendWorkerHandler = (event: MessageEvent<any>) => {
    const {status} = event.data
    if (status === "bitmap") {
      const bitmap: ImageBitmap = event.data.bitmap
      tsCanvas.drawBitmap(bitmap)
    }
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
                <BenchmarkModel title="TypeScript" n={n} estimatedTime={0}
                                currentStep={tsWorker.step}
                                onButtonClick={() => {
                                  tsWorker.startWorker({canvas: tsCanvas.offscreen}, [tsCanvas.offscreen!!])
                                }}/>
              </Paper>
            </Stack>

            <Stack spacing={2} direction={{xs: "column", sm: "row"}} justifyContent="space-evenly">
              <MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"} ref={tsCanvas.ref}/>
              {/*<MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"} map={tsBitMap} display={tsBitMap !== null && tsBitMap !== undefined}/>*/}
              {/*<MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"} map={tsBitMap} display={tsBitMap !== null && tsBitMap !== undefined}/>*/}
            </Stack>

            <LineChart n={n} tsReport={tsWorker.report} wasmReport={null} jsReport={null}/>
            <AnalyseTable n={n} tsReport={tsWorker.report} jsReport={null} wasmReport={null}/>
          </Stack>
        </Box>
      </Container>
  )
}

export default Mandelbrot