import {BenchmarkModule} from "../index.ts";
import React, {useCallback, useState} from "react";
import {useEstimatedTimeONPow3} from "../../hooks/useEstimatedTime.ts";
import {WebWorkerSendData} from "./worker";
import BenchmarkModel from "../BenchmarkModel.tsx";

export interface MatrixJsProps extends BenchmarkModule {

}

const MatrixJs = ({n, onComplete}: MatrixJsProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const estimatedTime = useEstimatedTimeONPow3({
    medianTime: 44.80740,
    medianN: 300
  }, n)

  const handleOnClick = useCallback(() => {
    const worker = new Worker(new URL("./worker/JsWorker.js", import.meta.url), {type: "module"})
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
      <BenchmarkModel title="JavaScript" n={n} estimatedTime={estimatedTime}
                      currentStep={currentStep} onButtonClick={handleOnClick}/>
  )
}

export default MatrixJs