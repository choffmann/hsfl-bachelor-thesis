import {WebWorkerReceiveData} from "./index.ts";
import {matrixMultiTs} from "@benchmarks/impl";


self.addEventListener("message", async (event: MessageEvent<WebWorkerReceiveData>) => {
  const {id, n} = event.data

  const reportStatus = (value: number) => {
    self.postMessage({id, step: value, status: "running"})
  }

  const report = matrixMultiTs(n, reportStatus)
  self.postMessage({id, report, status: "completed"})
})