import React, {useEffect, useState} from "react";
import {matrix_wasm} from "matrix-multiplication"
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import BenchmarkModel from "../BenchmarkModel.tsx";
import {useEstimatedTimeONPow3} from "../../hooks/useEstimatedTime.ts";

export interface MatrixWasmProps {
  n: number
  onCompleted: (report: BenchmarkReport | undefined) => any
}

const MatrixWasm = ({n}: MatrixWasmProps) => {
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
    matrix_wasm.greet()
  }

  return (
      <BenchmarkModel title="WASM" n={n} estimatedTime={estimatedTime} currentStep={currentStep} ready={ready} onButtonClick={() => handleOnClick()}/>
  )
}

export default MatrixWasm