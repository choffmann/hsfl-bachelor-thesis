import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";

export interface WebWorkerReceiveData {
  id: string
  n: number
}

export type WebWorkerStatus = "running" | "completed"

export interface WebWorkerSendData {
  id: string,
  status: WebWorkerStatus
  step: number
  report?: BenchmarkReport
}
