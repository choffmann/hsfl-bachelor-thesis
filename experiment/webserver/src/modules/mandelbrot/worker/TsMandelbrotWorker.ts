import {WebWorkerReceiveData} from "../../matrix/worker";
import {
  mandelbrotTs,
  MandelBrotOptions,
  BenchmarkReport, MandelbrotMapItem, MandelbrotMap
} from "mandelbrot/mandelbrot-ts"

export type TsMandelbrotWorkerStatus = "running" | "updateSteps" | "updateMap" | "completed"

export interface TsMandelbrotWorkerMessage {
  status: TsMandelbrotWorkerStatus
  id: number,
  report: BenchmarkReport,
  step: number
  map: MandelbrotMap
}

self.addEventListener("message", async (event: MessageEvent<WebWorkerReceiveData>) => {
  const {n, id} = event.data

  const options: MandelBrotOptions = {
    height: 150,
    width: 300,
    xSet: {
      start: -2,
      end: 1
    },
    ySet: {
      start: -1,
      end: 1
    }
  }

  const reportStatus = (value: number) => {
    self.postMessage({id, step: value, status: "updateSteps"})
  }

  const reportMap = (map: MandelbrotMap) => {
    self.postMessage({id, map, status: "updateMap"})
  }

   mandelbrotTs(n, options, reportStatus, reportMap).then(report => {
     self.postMessage({id, report, status: "completed"})
   })
})