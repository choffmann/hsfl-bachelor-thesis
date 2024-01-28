import * as math from "mathjs"

const WIDTH = 1000
const HEIGHT = 1000

let report = {
  totalTime: 0,
  nthReport: []
}

function calcZ(v, i, c, n) {
  if (i >= n) {
    return v
  } else {
    return calcZ(Math.pow(v, 2) + c, i++, c, n)
  }
}

export async function mandelbrotJs(n, reportStatus) {
  const map = []
  const start = performance.now()

  for (let i = 0; i <= n; i++) {
    reportStatus(i, map)
    const startTime = performance.now()

    for (let y = 0; y <= HEIGHT; y++) {
      for (let x = 0; x <= WIDTH; x++) {
        const c = math.complex(x, y)
        const z = calcZ(0, 0, c, i)
        map.push({x, y, z})
      }
    }

    const endTime = performance.now()
    report.nthReport.push({n: i, time: Math.round(endTime - startTime)})
  }


  const end = performance.now()
  report.totalTime = Math.round(end - start)
  return report
}

