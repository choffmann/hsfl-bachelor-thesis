export type MandelbrotMapItem = { x: number, y: number, z: number, isMandelBrot: boolean }
export type MandelbrotMap = MandelbrotMapItem[]
export type BenchmarkReport = { totalTime: number, nthReport: NthReport }
export type NthReport = { n: number, time: number }[]

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

interface ComplexNumber {
  x: number,
  y: number
}

class Complex {
  public value: ComplexNumber

  constructor(value: ComplexNumber) {
    this.value = value
  }

  get x() {
    return this.value.x
  }

  get y() {
    return this.value.y
  }

  add(other: Complex): Complex {
    return new Complex({
      x: (this.x + other.x),
      y: (this.y + other.y)
    })
  }

  pow2(): Complex {
    return new Complex({
      x: (Math.pow(this.x, 2) - Math.pow(this.y, 2)),
      y: ((this.x * this.y) + (this.x * this.y))
    })
  }

  abs(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
}

function calcZ(c: Complex, n: number): [number, boolean] {
  let z = new Complex({x: 0, y: 0})
  let i = 0
  let abs = 0
  do {
    z = z.pow2().add(c)
    abs = z.abs()
    i += 1
  } while (abs <= 2 && i < n)
  return [i, abs <= 2]
}

export async function mandelbrotTs(n: number, options: MandelBrotOptions, reportStatus: (step: number) => any, reportMap: (map: MandelbrotMap) => any) {
  console.log("[TS] Starting mandelbrot benchmark")
  let report: BenchmarkReport = {
    totalTime: 0,
    nthReport: []
  }
  let map: MandelbrotMap = []

  const start = performance.now()

  for (let i = 1; i <= n; i++) {
    reportStatus(i)
    const startTime = performance.now()

    for (let yMap = 0; yMap <= options.height; yMap++) {
      for (let xMap = 0; xMap <= options.width; xMap++) {
        const c = new Complex({
          x: options.xSet.start + (xMap / options.width) * (options.xSet.end - options.xSet.start),
          y: options.ySet.start + (yMap / options.height) * (options.ySet.end - options.ySet.start)
        })
        const [z, isMandelBrot] = calcZ(c, i)
        map.push({x: xMap, y: yMap, z: z, isMandelBrot})
      }
    }

    const endTime = performance.now()
    report.nthReport.push({n: i, time: Math.round(endTime - startTime)})
  }

  const end = performance.now()
  console.log("[TS] Finished mandelbrot benchmark")
  reportMap(map)
  report.totalTime = Math.round(end - start)
  return report
}