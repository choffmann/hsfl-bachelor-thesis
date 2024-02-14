import { BenchmarkReport, MandelbrotMap, mandelbrotWasm, wasmModuleUrl } from "@benchmarks/impl"
import { draw, workerUtility } from "."

self.addEventListener("message", async (event: MessageEvent<any>) => {
  const { n, render, canvas, id, colorMode } = workerUtility(event)
  const version = event.data.version
  const ctx = canvas.getContext("2d")


  mandelbrotWasm.default(wasmModuleUrl("mandelbrot")).then(() => {
    const opt = new mandelbrotWasm.MandelbrotOptions(
      canvas.height,
      canvas.width,
      -2, 1, -1, 1
    )

    const reporter = (step: number, map: any) => {
      if (render && ctx) {
        const mandelMap: MandelbrotMap = map.map((item: any) => ({ x: item.x, y: item.y, z: item.z, isMandelBrot: item.is_mandelbrot }))
        draw(mandelMap, ctx, colorMode)
        const bitmap = canvas.transferToImageBitmap()
        self.postMessage({ id, bitmap, status: "bitmap", type: "wasm" })
      }

      self.postMessage({ id, step, status: "running" })
    }

    const report = mandelbrotWasm.mandelbrot_wasm(n, opt, reporter, render, version).to_json()

    let wasmReport: BenchmarkReport = {
      totalTime: report.total_time,
      nthReport: report.nth_report || []
    }

    self.postMessage({ status: "completed", report: wasmReport })
  })
})
