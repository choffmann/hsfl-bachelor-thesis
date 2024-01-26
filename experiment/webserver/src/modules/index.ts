import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";

export interface BenchmarkModule {
  n: number
  onComplete: (report: BenchmarkReport | undefined) => any
}
