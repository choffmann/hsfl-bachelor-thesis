import {matrix_wasm} from "matrix-multiplication"
import {WebWorkerReceiveData} from "./index.ts";


export interface WasmWebWorker extends WebWorkerReceiveData {
}

self.addEventListener("message", async (event: MessageEvent<WasmWebWorker>) => {
  const {id, n} = event.data
  matrix_wasm.default().then(() => {
    const report = matrix_wasm.matrix_multi(n)
    self.postMessage({status: "completed", report})
  })
})