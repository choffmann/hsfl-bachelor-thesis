import {Box, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import MatrixDescription from "./MatrixDescription.tsx";
import React, {
  useEffect,
  useState
} from "react";
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import LineChart from "../chart/LineChart.tsx";
import MatrixTs from "./MatrixTs.tsx";
import MatrixWasm from "./MatrixWasm.tsx";
import MatrixJs from "./MatrixJs.tsx";

export interface MatrixMultiplicationProps {

}

const DEFAULT_N = 300

const calculateTimeConstant = () => {
  const medianTime = 44.7568
  const defaultN = 300

  return medianTime / (Math.pow(defaultN, 3))
}

const MatrixMultiplication = (props: MatrixMultiplicationProps) => {
  const [n, setN] = useState(DEFAULT_N)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [tsReport, setTsReport] = useState<BenchmarkReport | null>(null)
  const [jsReport, setJsReport] = useState<BenchmarkReport | null>(null)
  const [wasmReport, setWasmReport] = useState<BenchmarkReport | null>(null)

  useEffect(() => {
    setEstimatedTime(estimateTime(n))
  }, [n])

  const handleSetNInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    isNaN(value) ? setN(DEFAULT_N) : setN(value)
  }

  const estimateTime = (n: number) => {
    const k = calculateTimeConstant()
    return k * Math.pow(n, 3)
  }


  return (
      <Container>
        <Box sx={{mt: 3, mb: 3}}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="h5">Matrizenmultiplikation</Typography>
              <MatrixDescription/>
              <TextField
                  label={"Wähle eine N"}
                  value={n}
                  onChange={handleSetNInput}
              />
            </Stack>

            <Stack spacing={2} direction="row" justifyContent="space-evenly">
              <Paper elevation={3} sx={{p: 2, width: "100%"}}>
                <MatrixJs n={n} onComplete={() => {
                }}/>
              </Paper>

              <Paper elevation={3} sx={{p: 2, width: "100%"}}>
                <MatrixTs n={n} onComplete={(report) => setTsReport(report ?? null)}/>
              </Paper>

              <Paper elevation={3} sx={{p: 2, width: "100%"}}>
                <MatrixWasm n={n} onCompleted={(report) => setWasmReport(report ?? null)}/>
              </Paper>
            </Stack>


            <LineChart n={n} tsReport={tsReport} wasmReport={wasmReport} jsReport={jsReport}/>
          </Stack>
        </Box>
      </Container>
  )
}

export default MatrixMultiplication