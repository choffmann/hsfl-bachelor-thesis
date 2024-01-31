import {
  Box, Checkbox,
  Container, FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, {useEffect} from "react";
import MandelbrotBitmap from "./MandelbrotBitmap.tsx";
import LineChart from "../analyse/LineChart.tsx";
import AnalyseTable from "../analyse/AnalyseTable.tsx";
import {useWorker} from "../../hooks/useWorker.ts";
import BenchmarkModel from "../BenchmarkModel.tsx";
import {useCanvas} from "../../hooks/useCanvas.ts";
import {useMandelbrotSettings} from "../../hooks/useSettings.ts";

export interface MandelbrotProps {

}


const Mandelbrot = (props: MandelbrotProps) => {
  const settings = useMandelbrotSettings()
  const tsWorker = useWorker(new URL("./worker/TsMandelbrotWorker.ts", import.meta.url), settings.n)
  const tsCanvas = useCanvas()

  useEffect(() => {
    tsWorker.registerHandler(tsAppendWorkerHandler)
  }, []);

  useEffect(() => {
    tsWorker.finished && tsCanvas.rebuildOffscreen()
  }, [tsWorker.finished]);


  const tsAppendWorkerHandler = (event: MessageEvent<any>) => {
    const {status} = event.data
    if (status === "bitmap") {
      const bitmap: ImageBitmap = event.data.bitmap
      tsCanvas.drawBitmap(bitmap)
    }
  }

  return (
      <Container>
        <Box sx={{mt: 2}}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="h4">Mandelbrot</Typography>
              <Typography>
                Dieser Algorithmus berechnet die Mandelbrot Menge. Die Mandelbrot Menge
                ist eine Menge der komplexen Zahlen, wo eine Folge beschränkt ist. Diese Menge
                kann
                als Fraktal visualisiert werden.
              </Typography>
              <TextField
                  label={"Wähle eine N"}
                  value={settings.n}
                  onChange={(e) => settings.setN(e.target.value)}
              />

              <FormControlLabel control={<Checkbox checked={settings.displayCanvas}/>}
                                label={"Benchmark visualisieren"}
                                onChange={(_, checked) => settings.setDisplayCanvas(checked)}/>
            </Stack>

            <Stack spacing={2} direction={{xs: "column", sm: "row"}}
                   justifyContent="space-evenly">
              <Paper elevation={3} sx={{p: 2, width: "100%"}}>
                <BenchmarkModel title="TypeScript" n={settings.n} estimatedTime={0}
                                currentStep={tsWorker.step}
                                onButtonClick={() => {
                                  tsWorker.startWorker({
                                    canvas: tsCanvas.offscreen,
                                    render: settings.displayCanvas
                                  }, [tsCanvas.offscreen!!])
                                }}/>
              </Paper>
            </Stack>

            <Stack spacing={2} direction={{xs: "column", sm: "row"}}
                   justifyContent="space-evenly">
              <MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"}
                                hide={!settings.displayCanvas || !tsCanvas.hasContent}
                                ref={tsCanvas.ref}/>
              {/*<MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"} map={tsBitMap} display={tsBitMap !== null && tsBitMap !== undefined}/>*/}
              {/*<MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"} map={tsBitMap} display={tsBitMap !== null && tsBitMap !== undefined}/>*/}
            </Stack>

            <LineChart n={settings.n} tsReport={tsWorker.report} wasmReport={null} jsReport={null}/>
            <AnalyseTable n={settings.n} tsReport={tsWorker.report} jsReport={null}
                          wasmReport={null}/>
          </Stack>
        </Box>
      </Container>
  )
}

export default Mandelbrot