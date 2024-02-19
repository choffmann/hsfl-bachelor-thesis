import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import MandelbrotBitmap from "./MandelbrotBitmap.tsx";
import LineChart from "../analyse/LineChart.tsx";
import AnalyseTable from "../analyse/AnalyseTable.tsx";
import { useWorker } from "../../hooks/useWorker.ts";
import BenchmarkModel from "../BenchmarkModel.tsx";
import { useCanvas } from "../../hooks/useCanvas.ts";
import { useMandelbrotSettings } from "../../hooks/useSettings.ts";

export interface MandelbrotProps { }

const Mandelbrot = (props: MandelbrotProps) => {
  const settings = useMandelbrotSettings();
  const jsVersions = useMemo(() => ["", "#2"], []);
  const tsVersions = useMemo(() => ["", "#2", "#3", "#4"], []);
  const wasmVersions = useMemo(() => ["", "#2"], []);
  const [jsVersionIndex, setJsVersionIndex] = useState(jsVersions.length - 1);
  const [tsVersionIndex, setTsVersionIndex] = useState(tsVersions.length - 1);
  const [wasmVersionIndex, setWasmVersionIndex] = useState(
    wasmVersions.length - 1,
  );

  const workers = useMemo(
    () =>
      new Map([
        [
          "jsWorker",
          new Worker(
            new URL("./worker/JsMandelbrotWorker.ts", import.meta.url),
            { type: "module" },
          ),
        ],
        [
          "tsWorker",
          new Worker(
            new URL("./worker/TsMandelbrotWorker.ts", import.meta.url),
            { type: "module" },
          ),
        ],
        [
          "wasmWorker",
          new Worker(
            new URL("./worker/WasmMandelbrotWorker.ts", import.meta.url),
            { type: "module" },
          ),
        ],
      ]),
    [],
  );

  const jsWorker = useWorker(workers.get("jsWorker")!!,settings.n);
  const tsWorker = useWorker(workers.get("tsWorker")!!,settings.n);
  const wasmWorker = useWorker(workers.get("wasmWorker")!!,settings.n);

  const jsCanvas = useCanvas();
  const tsCanvas = useCanvas();
  const wasmCanvas = useCanvas();

  useEffect(() => {
    tsWorker.registerHandler(appendCanvasHandler);
    wasmWorker.registerHandler(appendCanvasHandler);
    jsWorker.registerHandler(appendCanvasHandler);
  }, []);

  useEffect(() => {
    tsWorker.finished && tsCanvas.rebuildOffscreen();
    wasmWorker.finished && wasmCanvas.rebuildOffscreen();
    jsWorker.finished && jsCanvas.rebuildOffscreen();
  }, [jsWorker.finished, tsWorker.finished, wasmWorker.finished]);

  const appendCanvasHandler = (event: MessageEvent<any>) => {
    const { status, type } = event.data;
    if (status === "bitmap") {
      const bitmap: ImageBitmap = event.data.bitmap;
      if (type === "ts") {
        tsCanvas.drawBitmap(bitmap);
      } else if (type === "wasm") {
        wasmCanvas.drawBitmap(bitmap);
      } else if (type === "js") {
        jsCanvas.drawBitmap(bitmap);
      }
    }
  };

  const switchTsVersion = () => {
    if (tsVersionIndex + 1 > tsVersions.length - 1) {
      setTsVersionIndex(0);
    } else {
      setTsVersionIndex((prev) => prev + 1);
    }
  };

  const switchWasmVersion = () => {
    if (wasmVersionIndex + 1 > wasmVersions.length - 1) {
      setWasmVersionIndex(0);
    } else {
      setWasmVersionIndex((prev) => prev + 1);
    }
  };

  const switchJsVersion = () => {
    if (jsVersionIndex + 1 > jsVersions.length - 1) {
      setJsVersionIndex(0);
    } else {
      setJsVersionIndex((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="h4">Mandelbrot</Typography>
            <Typography>
              Dieser Algorithmus berechnet die Mandelbrot Menge. Die Mandelbrot
              Menge ist eine Menge der komplexen Zahlen, wo eine Folge
              beschränkt ist. Diese Menge kann als Fraktal visualisiert werden.
            </Typography>
            <TextField
              label={"Wähle eine N"}
              value={settings.n}
              onChange={(e) => settings.setN(e.target.value)}
            />

            <FormControlLabel
              control={<Checkbox checked={settings.displayCanvas} />}
              label={"Benchmark visualisieren"}
              onChange={(_, checked) => settings.setDisplayCanvas(checked)}
            />
          </Stack>

          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-evenly"
          >
            <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
              <BenchmarkModel
                title={`JavaScript ${jsVersions[jsVersionIndex]}`}
                n={settings.n}
                currentStep={jsWorker.step}
                versionSelection
                onTitleClick={() => switchJsVersion()}
                onButtonClick={() => {
                  jsWorker.startWorker(
                    {
                      canvas: jsCanvas.offscreen,
                      render: settings.displayCanvas,
                      version: jsVersionIndex,
                    },
                    [jsCanvas.offscreen!!],
                  );
                }}
              />
            </Paper>
            <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
              <BenchmarkModel
                title={`TypeScript ${tsVersions[tsVersionIndex]}`}
                n={settings.n}
                versionSelection
                onTitleClick={() => switchTsVersion()}
                currentStep={tsWorker.step}
                onButtonClick={() => {
                  tsWorker.startWorker(
                    {
                      canvas: tsCanvas.offscreen,
                      render: settings.displayCanvas,
                      version: tsVersionIndex,
                    },
                    [tsCanvas.offscreen!!],
                  );
                }}
              />
            </Paper>
            <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
              <BenchmarkModel
                title={`WebAssembly ${wasmVersions[wasmVersionIndex]}`}
                n={settings.n}
                versionSelection
                onTitleClick={() => switchWasmVersion()}
                currentStep={wasmWorker.step}
                onButtonClick={() => {
                  wasmWorker.startWorker(
                    {
                      canvas: wasmCanvas.offscreen,
                      render: settings.displayCanvas,
                      version: wasmVersionIndex,
                    },
                    [wasmCanvas.offscreen!!],
                  );
                }}
              />
            </Paper>
          </Stack>

          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-evenly"
          >
            <MandelbrotBitmap
              title={"Visuelle Darstellung (JavaScript)"}
              hide={!settings.displayCanvas || !jsCanvas.hasContent}
              ref={jsCanvas.ref}
            />
            <MandelbrotBitmap
              title={"Visuelle Darstellung (TypeScript)"}
              hide={!settings.displayCanvas || !tsCanvas.hasContent}
              ref={tsCanvas.ref}
            />
            <MandelbrotBitmap
              title={"Visuelle Darstellung (WebAssembly)"}
              hide={!settings.displayCanvas || !wasmCanvas.hasContent}
              ref={wasmCanvas.ref}
            />
          </Stack>

          <LineChart
            n={settings.n}
            tsReport={tsWorker.report}
            wasmReport={wasmWorker.report}
            jsReport={jsWorker.report}
          />
          <AnalyseTable
            n={settings.n}
            tsReport={tsWorker.report}
            jsReport={jsWorker.report}
            wasmReport={wasmWorker.report}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default Mandelbrot;
