import {
  mandelbrotTs,
  MandelBrotOptions,
  MandelbrotMap
} from "mandelbrot/mandelbrot-ts"

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

  const options: MandelBrotOptions = {
    height: canvas.height,
    width: canvas.width,
    xSet: {
      start: -2,
      end: 1
    },
    ySet: {
      start: -1,
      end: 1
    }
  }

  const reportStatus = (value: number) => {
    self.postMessage({id, step: value, status: "running"})
  }

  const reportMap = (map: MandelbrotMap) => {
    if (render && ctx) {
      draw(map, ctx)
      const bitmap = canvas.transferToImageBitmap()
      self.postMessage({id, bitmap, status: "bitmap"})
    }
  }

   mandelbrotTs(n, options, reportStatus, reportMap).then(report => {
     self.postMessage({id, report, status: "completed"})
   })
})