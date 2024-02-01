export * as matrixWasm from "./dist/matrix/matrix"
export * as mandelbrotWasm from "./dist/mandelbrot/mandelbrot"

export type WasmModule =
  "matrix" | "mandelbrot"

export function wasmModuleUrl(module: WasmModule) {
  switch (module) {
    case "matrix":
      return new URL("./dist/matrix/matrix_bg.wasm", import.meta.url)
    case "mandelbrot":
      return new URL("./dist/mandelbrot/mandelbrot_bg.wasm", import.meta.url)
  }
}
