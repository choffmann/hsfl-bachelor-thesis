import {CategoryScale, Chart, ChartDataset, LinearScale, LineElement, PointElement} from "chart.js";
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import {
  Box,
  Paper,
  Typography
} from "@mui/material";
import {Line} from "react-chartjs-2";
import React, {useMemo} from "react";

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

  return (
      <Paper elevation={3} sx={{p: 2}}>
        <Box>
          <Typography variant="h6">Analyse</Typography>

          <Line data={{
            labels: Array.from(Array(n).keys()),
            datasets,
          }}/>
        </Box>
      </Paper>
  )
}

export default LineChart