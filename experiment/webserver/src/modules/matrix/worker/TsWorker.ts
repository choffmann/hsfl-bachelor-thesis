import {matrixMulti, status$} from "matrix-multiplication/matrix-ts/dist"
import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import {WebWorkerReceiveData} from "./index.ts";


self.addEventListener("message", async (event: MessageEvent<WebWorkerReceiveData>) => {
  const {id, n} = event.data
  const subscription = status$.subscribe(value => {
    self.postMessage({id, step: value, status: "running"})
  })
  matrixMulti(n).then(report => {
    self.postMessage({id, report, status: "completed"})
  })

  subscription.unsubscribe()
})