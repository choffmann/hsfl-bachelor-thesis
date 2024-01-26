import {Box, Button, Container, TextField, Typography} from "@mui/material";
import MatrixDescription from "../modules/matrix/MatrixDescription.tsx";
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useState
} from "react";
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart, LinearScale, LineElement, PointElement} from "chart.js";
import {WebWorkerSendData} from "../modules/matrix/worker.ts";

export interface MatrixMultiplicationProps {

}

const DEFAULT_N = 300

const calculateTimeConstant = () => {
  const medianTime = 44.7568
  const defaultN = 300

  return medianTime / (Math.pow(defaultN, 3))
}

const MatrixMultiplication = (props: MatrixMultiplicationProps) => {
  const worker = new Worker(new URL("../modules/matrix/worker.ts", import.meta.url), {type: "module"})
  const [n, setN] = useState(DEFAULT_N)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const deferredValue = useDeferredValue(currentStep)
  const [tsReport, setTsReport] = useState<BenchmarkReport | null>(null)

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement)

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

  const handleOnTypeScriptClick = useCallback(() => {
    const taskId = Date.now()
    setCurrentStep(0)
    worker.addEventListener("message", (event: MessageEvent<WebWorkerSendData>) => {
      const {status, id, step, report} = event.data

      switch (status) {
        case "running":
          setCurrentStep(step)
          break
        case "completed":
          setTsReport(report ?? null)
          break
      }
    })

    worker.postMessage({id: taskId, n})
  }, [n])

  return (
      <Container>
        <Box sx={{mt: 3, mb: 3}}>
          <Typography variant="h5">Matrizenmultiplikation</Typography>
          <MatrixDescription/>

          <Box>
            <TextField
                label={"Wähle eine N"}
                value={n}
                onChange={handleSetNInput}
                helperText={`Geschätzte Zeit: ${estimatedTime} Sekunden`}
            />
          </Box>

          <Box>
            <Button variant="contained" onClick={() => handleOnTypeScriptClick()}>TS</Button>
            <Typography>Status: {deferredValue}/{n}</Typography>
          </Box>

          <Box>
            {tsReport === null ?
                <Typography>Keine Daten für TypeScript vorhanden</Typography> :
                <Box>
                  <Typography>Benötigte Zeit: {tsReport.totalTime} ms</Typography>
                  <Line data={{
                    labels: tsReport.nthReport.map(x => x.n),
                    datasets: [{
                      label: "Time",
                      data: tsReport.nthReport.map(x => x.time)
                    }]
                  }}/>
                </Box>
            }
          </Box>
        </Box>

      </Container>
  )
}

export default MatrixMultiplication