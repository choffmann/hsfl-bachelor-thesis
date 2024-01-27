import {matrixMultiJs} from "matrix-multiplication"


self.addEventListener("message", async (event) => {
  const {id, n} = event.data
  const reportStatus = (value) => {
    self.postMessage({id, step: value, status: "running"})
  }
  matrixMultiJs(n,reportStatus).then(report => {
    self.postMessage({id, report, status: "completed"})
  })
})