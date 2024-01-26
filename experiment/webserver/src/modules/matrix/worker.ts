import {matrixMulti, status$} from "matrix-multiplication/matrix-ts/dist"
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";

export interface WebWorkerReceiveData {
  id: string
  n: number
}

type WebWorkerStatus = "running" | "completed"

export interface WebWorkerSendData {
  id: string,
  status: WebWorkerStatus
  step: number
  report?: BenchmarkReport
}

self.addEventListener("message", async (event: MessageEvent<WebWorkerReceiveData>) => {
  console.log("Starting WebWorker", event.data)
  const {id, n} = event.data
  const subscription = status$.subscribe(value => {
    self.postMessage({id, step: value, status: "running"})
  })
  matrixMulti(n).then(report => {
    self.postMessage({id, report, status: "completed"})
  })

  subscription.unsubscribe()
})