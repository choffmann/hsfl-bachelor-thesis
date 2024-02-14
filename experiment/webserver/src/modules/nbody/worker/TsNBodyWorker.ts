import { NBodySystem, nbodyTs } from "@benchmarks/impl"
import { workerUtility } from "../../mandelbrot/worker"

self.addEventListener("message", async (event: MessageEvent<any>) => {
  const { n, id } = event.data

  const reportStatus = (step: number) => {
    self.postMessage({ id, step, status: "running" })
  }

  const reporter = (step: number, system: NBodySystem) => {
    reportStatus(step)
    system.bodies.map(body => {
      console.log(body)
    })
  }

  const report = nbodyTs(n, reporter)
  self.postMessage({ id, report, status: "completed" })
})
