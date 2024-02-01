import { BenchmarkReport } from "@benchmarks/impl"

export interface BenchmarkModule {
  n: number
  onComplete: (report: BenchmarkReport | undefined) => any
}
