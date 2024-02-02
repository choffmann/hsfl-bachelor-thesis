import { MandelbrotMap, mandelbrotJs } from "@benchmarks/impl/dist";
import { draw, workerUtility } from ".";


self.addEventListener("message", async (event: MessageEvent<any>) => {
  const { n, render, canvas, options, id } = workerUtility(event)
  const ctx = canvas.getContext("2d")

  const reporter = (i: number, map: MandelbrotMap) => {
    if (render && ctx && map) {
      draw(map, ctx)
      const bitmap = canvas.transferToImageBitmap()
      self.postMessage({ id, bitmap, status: "bitmap", type: "js" })
    }
    self.postMessage({ id, step: i, status: "running" })
  }

  const report = mandelbrotJs(n, options, reporter, render)
  self.postMessage({ id, report, status: "completed" })
})
