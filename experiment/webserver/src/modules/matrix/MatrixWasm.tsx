import React, {useEffect, useState} from "react";
import {matrix_wasm} from "matrix-multiplication"

import BenchmarkModel from "../BenchmarkModel.tsx";
import {useEstimatedTimeONPow3} from "../../hooks/useEstimatedTime.ts";
import {WebWorkerSendData} from "./worker";

export interface MatrixWasmProps {
  n: number
  onCompleted: (report: matrix_wasm.BenchmarkReport | undefined) => any
}

const MatrixWasm = ({n, onCompleted}: MatrixWasmProps) => {
  const [ready, setReady] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const estimatedTime = useEstimatedTimeONPow3({
    medianTime: 44.80740,
    medianN: 300
  }, n)

  useEffect(() => {
    matrix_wasm.default().then(() => setReady(true))
  }, [])

  const handleOnClick = () => {
    const worker = new Worker(new URL("./worker/WasmWorker.ts", import.meta.url), {type: "module"})
    const taskId = Date.now()
    setCurrentStep(0)
    worker.addEventListener("message", (event) => {
      const {status, report, step} = event.data
      switch (status) {
        case "running":
          setCurrentStep(step)
          break
        case "completed":
          console.log("[WASM] Completed", report)
          //onCompleted(report)
          worker.terminate()
          break
      }
    })
    worker.postMessage({id: taskId, n})
  }

  return (
      <BenchmarkModel title="WASM" n={n} estimatedTime={estimatedTime} currentStep={currentStep} ready={ready} onButtonClick={() => handleOnClick()}/>
  )
}

export default MatrixWasm