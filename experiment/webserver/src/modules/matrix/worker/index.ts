import {BenchmarkReport} from "@benchmarks/impl";

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
