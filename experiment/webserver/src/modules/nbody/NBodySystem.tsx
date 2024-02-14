import { Box, Container, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useWorker } from "../../hooks/useWorker"
import BenchmarkModel from "../BenchmarkModel"

export interface NBodySystemProps {

}

const DEFAULT_N = 200

const NBodySystem = (props: NBodySystemProps) => {
  const [n, setN] = useState(DEFAULT_N)
  const tsWorker = useWorker(new URL("./worker/TsNBodyWorker.ts", import.meta.url), n)

  const handleSetN = (input: string) => {
    const value = Number(input)
    isNaN(value) ? setN(DEFAULT_N) : setN(value)
  }

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h4">N-Body Problem</Typography>
          <Typography>
          </Typography>
          <TextField
            label={"Wähle eine N"}
            value={n}
            onChange={(e) => handleSetN(e.target.value)}
          />
        </Stack>

        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}
          justifyContent="space-evenly">
          <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
            <BenchmarkModel title={`TypeScript`} n={n} estimatedTime={0}
              versionSelection
              currentStep={tsWorker.step}
              onButtonClick={() => {
                tsWorker.startWorker()
              }} />
          </Paper>

        </Stack>
      </Box>
    </Container>
  )
}

export default NBodySystem
