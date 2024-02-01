import { BenchmarkReport, MandelbrotMap, mandelbrotWasm, wasmModuleUrl } from "@benchmarks/impl"

const draw = (map: MandelbrotMap, ctx: OffscreenCanvasRenderingContext2D) => {
  map.forEach(v => {
    ctx.fillStyle = v.isMandelBrot ? "black" : "white"
    ctx.fillRect(v.x, v.y, 1, 1)
  })
}

self.addEventListener("message", async (event: MessageEvent<any>) => {
  const {n, id, render} = event.data
  const canvas: OffscreenCanvas = event.data.canvas
  const ctx = canvas.getContext("2d")

  mandelbrotWasm.default(wasmModuleUrl("mandelbrot")).then(() => {
    const opt = new mandelbrotWasm.MandelbrotOptions(
      canvas.height,
      canvas.width,
      -2, 1, -1, 1
    )

    const reporter = (step: number, map: any) => {
      if (render && ctx) {
        const mandelMap: MandelbrotMap = map.map((item: any) => ({x: item.x, y: item.y, z: item.z, isMandelBrot: item.is_mandelbrot}))
        draw(mandelMap, ctx)
        const bitmap = canvas.transferToImageBitmap()
        self.postMessage({id, bitmap, status: "bitmap", type: "wasm"})
      }

      self.postMessage({id, step, status: "running"})
    }

    const report = mandelbrotWasm.mandelbrot_wasm(n, opt, reporter, render).to_json()

    let wasmReport: BenchmarkReport = {
      totalTime: report.total_time,
      nthReport: report.nth_report || []
    }

    self.postMessage({status: "completed", report: wasmReport})
  })
})
