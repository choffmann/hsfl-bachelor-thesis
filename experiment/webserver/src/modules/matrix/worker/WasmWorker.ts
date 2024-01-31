import {WebWorkerReceiveData} from "./index.ts";
import {BenchmarkReport, matrixWasm, wasmModuleUrl} from "@benchmarks/impl";


export interface WasmWebWorker extends WebWorkerReceiveData {
}

self.addEventListener("message", async (event: MessageEvent<WasmWebWorker>) => {
  const {id, n} = event.data
  matrixWasm.default(wasmModuleUrl("matrix")).then(() => {
    const report = matrixWasm.matrix_multi(n, (step: number) => {
      self.postMessage({status: "running", step})
    }).to_json()

    let wasmReport: BenchmarkReport = {
      totalTime: report.total_time,
      nthReport: report.nth_report || []
    }

    self.postMessage({status: "completed", report: wasmReport})
  })
})