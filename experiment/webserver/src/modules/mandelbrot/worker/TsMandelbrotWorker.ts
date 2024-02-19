import { mandelbrotTs } from "@benchmarks/impl/dist/targets/ts/mandelbrot/mandelbrot"
import { mandelbrotTsVersion2 } from "@benchmarks/impl/dist/targets/ts/mandelbrot/mandelbrotV2"
import { mandelbrotTsVersion3 } from "@benchmarks/impl/dist/targets/ts/mandelbrot/mandelbrotV3"
import { mandelbrotTsVersion4 } from "@benchmarks/impl/dist/targets/ts/mandelbrot/mandelbrotV4"
import { BenchmarkReport, MandelbrotMap } from "@benchmarks/impl/dist";
import { draw, workerUtility } from ".";


self.addEventListener("message", async (event: MessageEvent<any>) => {
  const { n, render, canvas, options, id, colorMode } = workerUtility(event)
  const version = event.data.version
  const ctx = canvas.getContext("2d")

  const reportStatus = (value: number) => {
    self.postMessage({ id, step: value, status: "running" })
  }

  const reportMap = (map: MandelbrotMap) => {
    if (render && ctx) {
      draw(map, ctx, colorMode)
      const bitmap = canvas.transferToImageBitmap()
      self.postMessage({ id, bitmap, status: "bitmap", type: "ts" })
    }
  }

  let report: BenchmarkReport | null = null

  if (version === 0) {
    report = mandelbrotTs(n, options, reportStatus, reportMap, render)
  }

  if (version === 1) {
    report = mandelbrotTsVersion2(n, options, reportStatus, reportMap, render)
  }

  if (version === 2) {
    report = mandelbrotTsVersion3(n, options, reportStatus, reportMap, render)
  }

  if (version === 3) {
    report = mandelbrotTsVersion4(n, options, reportStatus, reportMap, render)
  }
  self.postMessage({ id, report, status: "completed" })
})
