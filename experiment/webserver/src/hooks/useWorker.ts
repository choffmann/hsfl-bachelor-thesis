import {useCallback, useMemo, useState} from "react";
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import {WebWorkerSendData} from "../modules/matrix/worker";

export function useWorker(
    url: URL | string,
    n: number
) {
  const [step, setStep] = useState(0)
  const [report, setReport] = useState<BenchmarkReport | null>(null)
  const [finished, setFinished] = useState(false)

  const handlers = new Set<(event: MessageEvent<any>) => any>


  const startWorker = useCallback((args: any = {}, transfer: Transferable[] = []) => {
    setFinished(false)
    setStep(0)

     const worker = new Worker(url, {type: "module"})
    const defaultHandler = (event: MessageEvent<WebWorkerSendData>) => {
      const {status, step, report} = event.data
      switch (status) {
        case "running":
          setStep(step)
          break
        case "completed":
          setReport(report!!)
          setStep(n)
          setFinished(true)
          worker.terminate()
          break
      }
    }

    worker.addEventListener("message", (event: MessageEvent<any>) => {
      defaultHandler(event)
      handlers.forEach(handler => handler(event))
    })
    worker.postMessage({n, ...args}, transfer)
  }, [n])

  const registerHandler = (fn: (event: MessageEvent<any>) => any) => {
    handlers.add(fn)
  }

  return {
    step,
    report,
    finished,
    startWorker,
    registerHandler
  }
}