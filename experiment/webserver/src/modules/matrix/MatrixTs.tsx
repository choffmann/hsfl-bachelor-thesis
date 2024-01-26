import React, {useCallback, useState} from "react";
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import BenchmarkModel from "../BenchmarkModel.tsx";
import {useEstimatedTimeONPow3} from "../../hooks/useEstimatedTime.ts";
import {WebWorkerSendData} from "./worker";

export interface MatrixTsProps {
  n: number
  onComplete: (report: BenchmarkReport | undefined) => any
}

const MatrixTs = ({n, onComplete}: MatrixTsProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const estimatedTime = useEstimatedTimeONPow3({
    medianTime: 44.80740,
    medianN: 300
  }, n)

  const handleOnTypeScriptClick = useCallback(() => {
    const worker = new Worker(new URL("./worker/TsWorker.ts", import.meta.url), {type: "module"})
    const taskId = Date.now()
    setCurrentStep(0)
    worker.addEventListener("message", (event: MessageEvent<WebWorkerSendData>) => {
      const {status, id, step, report} = event.data

      switch (status) {
        case "running":
          setCurrentStep(step)
          break
        case "completed":
          onComplete(report)
          worker.terminate()
          break
      }
    })

    worker.postMessage({id: taskId, n})
  }, [n])

  return (
      <BenchmarkModel title="TypeScript" n={n} estimatedTime={estimatedTime}
                      currentStep={currentStep} onButtonClick={handleOnTypeScriptClick}/>
  )
}

export default MatrixTs