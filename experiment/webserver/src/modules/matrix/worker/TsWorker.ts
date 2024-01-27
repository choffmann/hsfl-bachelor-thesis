import {matrixMulti} from "matrix-multiplication/matrix-ts/dist"
import {WebWorkerReceiveData} from "./index.ts";


self.addEventListener("message", async (event: MessageEvent<WebWorkerReceiveData>) => {
  const {id, n} = event.data
  const reportStatus = (value: number) => {
    self.postMessage({id, step: value, status: "running"})
  }
  matrixMulti(n,reportStatus).then(report => {
    self.postMessage({id, report, status: "completed"})
  })
})