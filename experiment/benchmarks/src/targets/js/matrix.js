
function generateRandomMatrix(n) {
  let matrix = Array.of(Array(n))
  for (let i = 0; i <= n; i++) {
    let inner = []
    for (let j = 0; j <= n; j++) {
      inner.push(j * i * 20)
    }
    matrix.push(inner)
  }
  return matrix
}

function generateEmptyMatrix(n) {
  let matrix = Array.of(Array(n))
  for (let i = 0; i <= n; i++) {
    let inner = []
    for (let j = 0; j <= n; j++) {
      inner.push(0)
    }
    matrix.push(inner)
  }
  return matrix
}

export function matrixMultiJs(n, reportStatus) {
  let report = {
    totalTime: 0,
    nthReport: []
  }
  console.log("[JS] Starting matrix multiplication")
  const start = performance.now()

  for (let i = 1; i <= n; i++) {
    reportStatus(i);
    const aMatrix = generateRandomMatrix(n)
    const bMatrix = generateRandomMatrix(n)
    const result = generateEmptyMatrix(n)

    const startTime = performance.now()
    for (let row = 0; row <= i; row++) {
      for (let col = 0; col <= i; col++) {
        for (let inner = 0; inner <= i; inner++) {
          result[row][col] += aMatrix[row][inner] * bMatrix[inner][col]
        }
      }
    }

    const endTime = performance.now()
    report.nthReport.push({ n: i, time: Math.round(endTime - startTime) })
  }

  const end = performance.now()
  console.log("[JS] Finished matrix multiplication")
  report.totalTime = end - start
  return report
}
