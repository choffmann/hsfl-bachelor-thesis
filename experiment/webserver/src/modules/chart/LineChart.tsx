import {CategoryScale, Chart, ChartDataset, LinearScale, LineElement, PointElement} from "chart.js";
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import {Box, Paper, Typography} from "@mui/material";
import {Line} from "react-chartjs-2";
import {useCallback, useMemo} from "react";
import Icon from "@mdi/react";
import {mdiLanguageJavascript, mdiLanguageRust, mdiLanguageTypescript} from "@mdi/js";
import {NthReport} from "matrix-multiplication/matrix-wasm/pkg/matrix_wasm";

export interface LineChartProps {
  n: number
  tsReport?: BenchmarkReport | null
  jsReport?: BenchmarkReport | null
  wasmReport?: BenchmarkReport | null
}

const LineChart = ({n, tsReport, wasmReport, jsReport}: LineChartProps) => {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

  const datasets = useMemo(() => {
    let set: ChartDataset<"line", number[]>[] = []
    tsReport && set.push({
      label: "TypeScript",
      data: tsReport.nthReport.map(x => x.time)
    })
    jsReport && set.push({
      label: "JavaScript",
      data: jsReport.nthReport.map(x => x.time)
    })
    wasmReport && set.push({
      label: "WebAssembly",
      data: wasmReport.nthReport.map(x => x.time)
    })
    return set
  }, [tsReport, wasmReport, jsReport])

  const calculateTotalNthTime = useCallback((report: BenchmarkReport) => {
    return report.nthReport.map(x => x.time).reduce((acc, v) => acc + v, 0)
  }, [tsReport, wasmReport, jsReport])

  return (
      <Paper elevation={3} sx={{p: 2}}>
        <Box>
          <Typography variant="h6">Analyse</Typography>

          <Line data={{
            labels: Array.from(Array(n).keys()),
            datasets
          }}/>
          {(tsReport || jsReport || wasmReport) &&
              <Box>
                <Typography>Benötigte Zeit insgesamt:</Typography>
                {tsReport && <Typography><Icon path={mdiLanguageTypescript} size={1}/> {calculateTotalNthTime(tsReport) / 1000} Sekunden</Typography>}
                {jsReport && <Typography><Icon path={mdiLanguageJavascript} size={1}/> {jsReport.totalTime} ms</Typography>}
                {wasmReport && <Typography><Icon path={mdiLanguageRust} size={1}/> {wasmReport.totalTime} ms</Typography>}
              </Box>
          }
        </Box>
      </Paper>
  )
}

export default LineChart