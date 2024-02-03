import { MandelBrotOptions, MandelbrotMap } from "."
import { BenchmarkReport } from "../../../utils"


interface ComplexNumber {
  x: number,
  y: number
}

function calcZ(c: ComplexNumber, n: number): [number, boolean] {
  let z = { x: 0, y: 0 }
  let i = 0
  let abs = 0
  do {
    z = {
      x: (Math.pow(z.x, 2) - Math.pow(z.y, 2)) + c.x,
      y: (2 * (z.x * z.y)) + c.y
    }
    abs = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2))
    i += 1
  } while (abs <= 2 && i < n)
  return [i, abs <= 2]
}

export function mandelbrotTsVersion3(n: number, options: MandelBrotOptions, reportStatus: (step: number) => any, reportMap: (map: MandelbrotMap) => any, render: boolean) {
  console.log("[TS] Starting mandelbrot benchmark v3")
  let report: BenchmarkReport = {
    totalTime: 0,
    nthReport: []
  }
  const start = performance.now()

  for (let i = 1; i <= n; i++) {
    let map: MandelbrotMap = []
    reportStatus(i)
    const startTime = performance.now()

    for (let yMap = 0; yMap <= options.height; yMap++) {
      for (let xMap = 0; xMap <= options.width; xMap++) {
        const c = {
          x: options.xSet.start + (xMap / options.width) * (options.xSet.end - options.xSet.start),
          y: options.ySet.start + (yMap / options.height) * (options.ySet.end - options.ySet.start)
        }
        const [z, isMandelBrot] = calcZ(c, i)
        map.push({ x: xMap, y: yMap, z, isMandelBrot })
      }
    }

    const endTime = performance.now()
    render && reportMap(map)
    report.nthReport.push({ n: i, time: Math.round(endTime - startTime) })
  }

  const end = performance.now()
  console.log("[TS] Finished mandelbrot benchmark v3")
  report.totalTime = Math.round(end - start)
  return report
}
