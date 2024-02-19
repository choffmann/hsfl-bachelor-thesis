import { MandelbrotMap, mandelbrotJs } from "@benchmarks/impl/dist";
import { mandelbrotJsV2 } from "@benchmarks/impl/dist/targets/js/mandelbrotV2"
import { draw, workerUtility } from ".";


self.addEventListener("message", async (event: MessageEvent<any>) => {
  const { n, render, canvas, options, id, colorMode } = workerUtility(event)
  const version = event.data.version
  const ctx = canvas.getContext("2d")

  const reporter = (i: number, map: MandelbrotMap) => {
    if (render && ctx && map) {
      draw(map, ctx, colorMode)
      const bitmap = canvas.transferToImageBitmap()
      self.postMessage({ id, bitmap, status: "bitmap", type: "js" })
    }
    self.postMessage({ id, step: i, status: "running" })
  }

  let report = null

  if (version === 0) {
    report = mandelbrotJs(n, options, reporter, render)
  }
  
  if (version === 1) {
    report = mandelbrotJsV2(n, options, reporter, render)
  }

  self.postMessage({ id, report, status: "completed" })
})
