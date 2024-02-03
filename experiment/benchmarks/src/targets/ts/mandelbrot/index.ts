export * from "./mandelbrot"
export * from "./mandelbrotV2"
export * from "./mandelbrotV3"

export type MandelbrotMapItem = { x: number, y: number, z: number, isMandelBrot: boolean }
export type MandelbrotMap = MandelbrotMapItem[]

export interface MandelBrotOptions {
  height: number,
  width: number,
  xSet: {
    start: number,
    end: number
  },
  ySet: {
    start: number,
    end: number
  }
}
