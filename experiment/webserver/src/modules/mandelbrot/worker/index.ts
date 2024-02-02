import { MandelBrotOptions, MandelbrotMap } from "@benchmarks/impl"

export const draw = (map: MandelbrotMap, ctx: OffscreenCanvasRenderingContext2D) => {
  map.forEach(v => {
    ctx.fillStyle = v.isMandelBrot ? "black" : "white"
    ctx.fillRect(v.x, v.y, 1, 1)
  })
}


export const workerUtility = (event: MessageEvent<any>) => {
  const { n, id, render } = event.data
  const canvas: OffscreenCanvas = event.data.canvas

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

  return {
    n, canvas, render, options, id
  }
}
