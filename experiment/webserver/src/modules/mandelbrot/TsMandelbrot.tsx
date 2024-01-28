import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import React, {useCallback, useEffect, useState} from "react";
import BenchmarkModel from "../BenchmarkModel.tsx";
import {TsMandelbrotWorkerMessage} from "./worker/TsMandelbrotWorker.ts";
import {MandelbrotMap, MandelbrotMapItem} from "mandelbrot/mandelbrot-ts/dist";

export interface TsMandelbrotProps {
  n: number
  onCompleted: (report: BenchmarkReport) => any
  onBitmapChanged: (map: MandelbrotMap) => any
}

const TsMandelbrot = ({n, onCompleted, onBitmapChanged}: TsMandelbrotProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleOnClick = useCallback(() => {
    const worker = new Worker(new URL("./worker/TsMandelbrotWorker.ts", import.meta.url), {type: "module"})
    const taskId = Date.now()
    setCurrentStep(0)
    worker.addEventListener("message", (event: MessageEvent<TsMandelbrotWorkerMessage>) => {
      const {status, map, id, step, report} = event.data

      switch (status) {
        case "updateSteps":
          setCurrentStep(step)
          break
        case "updateMap":
          onBitmapChanged(map)
          break
        case "completed":
          onCompleted(report)
          setCurrentStep(n)
          worker.terminate()
          break
      }
    })
    worker.postMessage({id: taskId, n})
  }, [n])

  return (
      <BenchmarkModel title="TypeScript" n={n} estimatedTime={0}
                      currentStep={currentStep} onButtonClick={handleOnClick}/>
  )
}

export default TsMandelbrot