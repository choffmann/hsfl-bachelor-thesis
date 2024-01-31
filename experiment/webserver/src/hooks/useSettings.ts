import {useState} from "react";

const DEFAULT_N = 200

export interface MandelbrotSettings {
  n: number
  displayCanvas: boolean
}

export interface MandelbrotSettingsHook extends MandelbrotSettings {
  setN: (input: string) => any
  setDisplayCanvas: (input: boolean) => any
}

export function useMandelbrotSettings(): MandelbrotSettingsHook {
  const [n, setN] = useState(DEFAULT_N)
  const [displayCanvas, setDisplayCanvas] = useState(true)

  const handleSetN = (input: string) => {
      const value = Number(input)
      isNaN(value) ? setN(DEFAULT_N) : setN(value)
  }

  return {
    n,
    setN: handleSetN,
    displayCanvas,
    setDisplayCanvas
  }
}