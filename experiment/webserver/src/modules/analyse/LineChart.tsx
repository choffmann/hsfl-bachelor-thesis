import {
  CategoryScale,
  Chart,
  ChartDataset, Legend,
  LinearScale,
  LineElement,
  Tooltip as ChartTooltip,
  PointElement,
  Title
} from "chart.js";
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import {
  Box,
  Paper, Tooltip,
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
  Chart.register(CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      ChartTooltip,
      Legend
  )

  const datasets = useMemo(() => {
    let set: ChartDataset<"line", number[]>[] = []
    tsReport && set.push({
      label: "TypeScript",
      data: tsReport.nthReport.map(x => x.time),
      borderColor: "#2f74c0",
      backgroundColor: "#2f74c0"
    })
    jsReport && set.push({
      label: "JavaScript",
      data: jsReport.nthReport.map(x => x.time),
      borderColor: "#e8d44d",
      backgroundColor: "#e8d44d"
    })
    wasmReport && set.push({
      label: "WebAssembly",
      data: wasmReport.nthReport.map(x => x.time),
      borderColor: "#f04900",
      backgroundColor: "#f04900"
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
          }}
          options={{

          }}/>
        </Box>
      </Paper>
  )
}

export default LineChart