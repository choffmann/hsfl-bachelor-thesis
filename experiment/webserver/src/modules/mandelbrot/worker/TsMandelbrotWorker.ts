import { MandelbrotMap, mandelbrotTs } from "@benchmarks/impl/dist";
import { draw, workerUtility } from ".";


self.addEventListener("message", async (event: MessageEvent<any>) => {
  const { n, render, canvas, options, id } = workerUtility(event)
  const ctx = canvas.getContext("2d")

  const reportStatus = (value: number) => {
    self.postMessage({ id, step: value, status: "running" })
  }

  const reportMap = (map: MandelbrotMap) => {
    if (render && ctx) {
      draw(map, ctx)
      const bitmap = canvas.transferToImageBitmap()
      self.postMessage({ id, bitmap, status: "bitmap", type: "ts" })
    }
  }

  mandelbrotTs(n, options, reportStatus, reportMap, render).then(report => {
    self.postMessage({ id, report, status: "completed" })
  })
})
