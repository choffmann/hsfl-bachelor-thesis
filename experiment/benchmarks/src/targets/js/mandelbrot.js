
class Complex {
  constructor(value) {
    this.value = value
  }

  get x() {
    return this.value.x
  }

  get y() {
    return this.value.y
  }

  add(other) {
    return new Complex({
      x: this.x + other.y,
      y: this.y + other.y
    })
  }

  pow2() {
    return new Complex({
      x: (Math.pow(this.x, 2) - Math.pow(this.y, 2)),
      y: ((this.x * this.y) + (this.x * this.y))
    })
  }

  abs() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
}

function calcZ(c, n) {
  let z = new Complex({ x: 0, y: 0 })
  let i = 0
  let abs = 0
  do {
    z = z.pow2().add(c)
    abs = z.abs()
    i += 1
  } while (abs <= 2 && i < n)
  return [i, abs <= 2]
}

export function mandelbrotJs(n, options, reporter, render) {
  console.log("[JS] Starting mandelbrot benchmark")
  let report = {
    totalTime: 0,
    nthReport: []
  }
  const start = performance.now()

  for (let i = 1; i <= n; i++) {
    let map = []
    const startTime = performance.now()

    for (let yMap = 0; yMap <= options.height; yMap++) {
      for (let xMap = 0; xMap <= options.width; xMap++) {
        const c = new Complex({
          x: options.xSet.start + (xMap / options.width) * (options.xSet.end - options.xSet.start),
          y: options.ySet.start + (yMap / options.height) * (options.ySet.end - options.ySet.start)
        })
        const [z, isMandelBrot] = calcZ(c, i)
        map.push({ x: xMap, y: yMap, z, isMandelBrot })
      }
    }

    const endTime = performance.now()
    render ? reporter(i, map) : reporter(i)
    report.nthReport.push({ n: i, time: Math.round(endTime - startTime) })
  }

  const end = performance.now()
  console.log("[JS] Finished mandelbrot benchmark")
  report.totalTime = Math.round(end - start)
  return report
}
