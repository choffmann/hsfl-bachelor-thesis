import {Box, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import MatrixDescription from "./MatrixDescription.tsx";
import React, {useState} from "react";
import LineChart from "../analyse/LineChart.tsx";
import MatrixTs from "./MatrixTs.tsx";
import MatrixWasm from "./MatrixWasm.tsx";
import MatrixJs from "./MatrixJs.tsx";
import AnalyseTable from "../analyse/AnalyseTable.tsx";
import {BenchmarkReport} from "@benchmarks/impl/dist";

export interface MatrixMultiplicationProps {

}

const DEFAULT_N = 300

const MatrixMultiplication = (props: MatrixMultiplicationProps) => {
  const [n, setN] = useState(DEFAULT_N)
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
              <Typography variant="h4">Matrizenmultiplikation</Typography>
              <MatrixDescription/>
              <TextField
                  label={"Wähle eine N"}
                  value={n}
                  onChange={handleSetNInput}
              />
            </Stack>

            <Stack spacing={2} direction={{xs: "column", sm: "row"}} justifyContent="space-evenly">
              <Paper elevation={3} sx={{p: 2, width: "100%"}}>
                <MatrixJs n={n} onComplete={(report) => setJsReport(report ?? null)}/>
              </Paper>

              <Paper elevation={3} sx={{p: 2, width: "100%"}}>
                <MatrixTs n={n} onComplete={(report) => setTsReport(report ?? null)}/>
              </Paper>

              <Paper elevation={3} sx={{p: 2, width: "100%"}}>
                <MatrixWasm n={n} onCompleted={(report) => setWasmReport(report ?? null)}/>
              </Paper>
            </Stack>


            <LineChart n={n} tsReport={tsReport} wasmReport={wasmReport} jsReport={jsReport}/>
            <AnalyseTable n={n} tsReport={tsReport} jsReport={jsReport} wasmReport={wasmReport}/>
          </Stack>
        </Box>
      </Container>
  )
}

export default MatrixMultiplication