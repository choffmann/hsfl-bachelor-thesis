import {matrixMultiJs} from "@benchmarks/impl";

self.addEventListener("message", async (event) => {
  const {id, n} = event.data

  const reportStatus = (value) => {
    self.postMessage({id, step: value, status: "running"})
  }

  const report = matrixMultiJs(n, reportStatus)
  self.postMessage({id, report, status: "completed"})
})