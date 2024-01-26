import {matrix_wasm} from "matrix-multiplication"
import {WebWorkerReceiveData} from "./index.ts";
import {BenchmarkReport, NthReport} from "matrix-multiplication/matrix-ts/dist";


export interface WasmWebWorker extends WebWorkerReceiveData {
}

self.addEventListener("message", async (event: MessageEvent<WasmWebWorker>) => {
  const {id, n} = event.data
  matrix_wasm.default().then(() => {
    const report: any = matrix_wasm.matrix_multi(n, (step: number) => {
      self.postMessage({status: "running", step})
    }).to_json()

    let wasmReport: BenchmarkReport = {
      totalTime: report.total_time,
      nthReport: report.nth_report || []
    }

    self.postMessage({status: "completed", report: wasmReport})
  })
})