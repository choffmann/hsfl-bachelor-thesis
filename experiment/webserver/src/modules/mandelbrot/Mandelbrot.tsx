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
  const wasmWorker = useWorker(new URL("./worker/WasmMandelbrotWorker.ts", import.meta.url), settings.n)
  const tsCanvas = useCanvas()
  const wasmCanvas = useCanvas()

  useEffect(() => {
    tsWorker.registerHandler(appendCanvasHandler)
    wasmWorker.registerHandler(appendCanvasHandler)
  }, []);

  useEffect(() => {
    tsWorker.finished && tsCanvas.rebuildOffscreen()
  }, [tsWorker.finished]);

  useEffect(() => {
    wasmWorker.finished && wasmCanvas.rebuildOffscreen()
  }, [wasmWorker.finished]);

  const appendCanvasHandler = (event: MessageEvent<any>) => {
    const {status, type} = event.data
    if (status === "bitmap") {
      const bitmap: ImageBitmap = event.data.bitmap
      if (type === "ts") {
        tsCanvas.drawBitmap(bitmap)
      } else if (type === "wasm") {
        wasmCanvas.drawBitmap(bitmap)
      }
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
              <Paper elevation={3} sx={{p: 2, width: "100%"}}>
                <BenchmarkModel title="WebAssembly" n={settings.n} estimatedTime={0}
                                currentStep={wasmWorker.step}
                                onButtonClick={() => {
                                  wasmWorker.startWorker({
                                    canvas: wasmCanvas.offscreen,
                                    render: settings.displayCanvas
                                  }, [wasmCanvas.offscreen!!])
                                }}/>
              </Paper>
            </Stack>

            <Stack spacing={2} direction={{xs: "column", sm: "row"}}
                   justifyContent="space-evenly">
              <MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"}
                                hide={!settings.displayCanvas || !tsCanvas.hasContent}
                                ref={tsCanvas.ref}/>
              <MandelbrotBitmap title={"Visuelle Darstellung (WebAssembly)"}
                                hide={!settings.displayCanvas || !wasmCanvas.hasContent}
                                ref={wasmCanvas.ref}/>
              {/*<MandelbrotBitmap title={"Visuelle Darstellung (TypeScript)"} map={tsBitMap} display={tsBitMap !== null && tsBitMap !== undefined}/>*/}
            </Stack>

            <LineChart n={settings.n} tsReport={tsWorker.report} wasmReport={wasmWorker.report} jsReport={null}/>
            <AnalyseTable n={settings.n} tsReport={tsWorker.report} jsReport={null}
                          wasmReport={wasmWorker.report}/>
          </Stack>
        </Box>
      </Container>
  )
}

export default Mandelbrot
