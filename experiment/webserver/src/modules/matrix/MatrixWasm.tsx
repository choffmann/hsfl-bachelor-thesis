import React, {useEffect, useState} from "react";

import BenchmarkModel from "../BenchmarkModel.tsx";
import {useEstimatedTimeONPow3} from "../../hooks/useEstimatedTime.ts";
import {WebWorkerSendData} from "./worker";
import {BenchmarkReport, wasmModuleUrl, matrixWasm} from "@benchmarks/impl";

export interface MatrixWasmProps {
  n: number
  onCompleted: (report: BenchmarkReport | undefined) => any
}

const MatrixWasm = ({n, onCompleted}: MatrixWasmProps) => {
  const [ready, setReady] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const estimatedTime = useEstimatedTimeONPow3({
    medianTime: 11.325,
    medianN: 300
  }, n)

  useEffect(() => {
    const url = wasmModuleUrl("matrix")
    matrixWasm.default(url).then(() => setReady(true))
  }, [])

  const handleOnClick = () => {
    const worker = new Worker(new URL("./worker/WasmWorker.ts", import.meta.url), {type: "module"})
    const taskId = Date.now()
    setCurrentStep(0)
    worker.addEventListener("message", (event: MessageEvent<WebWorkerSendData>) => {
      const {status, report, step} = event.data
      switch (status) {
        case "running":
          setCurrentStep(step)
          break
        case "completed":
          onCompleted(report)
          worker.terminate()
          break
      }
    })
    worker.postMessage({id: taskId, n})
  }

  return (
      <BenchmarkModel title="WebAssembly" n={n} estimatedTime={estimatedTime}
                      currentStep={currentStep} ready={ready}
                      onButtonClick={() => handleOnClick()}/>
  )
}

export default MatrixWasm