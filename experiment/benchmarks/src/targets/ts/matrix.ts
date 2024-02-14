import { BenchmarkReport } from "../../utils/BenchmakReport";

export type Matrix = number[][]

function generateRandomMatrix(n: number) {
  let matrix: Matrix = Array.of(Array(n))
  for (let i = 0; i <= n; i++) {
    let inner: number[] = []
    for (let j = 0; j <= n; j++) {
      inner.push(j * i * 20)
    }
    matrix.push(inner)
  }

  return matrix
}

function generateEmptyMatrix(n: number) {
  let matrix: Matrix = Array.of(Array(n))
  for (let i = 0; i <= n; i++) {
    let inner: number[] = []
    for (let j = 0; j <= n; j++) {
      inner.push(0)
    }
    matrix.push(inner)
  }

  return matrix
}

export function matrixMultiTs(n: number, reportStatus: (n: number) => any) {
  let report: BenchmarkReport = {
    nthReport: [],
    totalTime: 0
  }
  console.log("[TS] Starting matrix multiplication")
  const start = performance.now()

  for (let i = 1; i <= n; i++) {
    reportStatus(i)
    const aMatrix = generateRandomMatrix(i)
    const bMatrix = generateRandomMatrix(i)
    const result: Matrix = generateEmptyMatrix(i)

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
  console.log("[TS] Finished matrix multiplication")
  report.totalTime = end - start
  return report
}
