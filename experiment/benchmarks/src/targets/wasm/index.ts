export * as matrixWasm from "./dist/matrix/matrix"

export type WasmModule =
  "matrix"

export function wasmModuleUrl(module: WasmModule) {
  switch (module) {
    case "matrix":
      return new URL("./dist/matrix/matrix_bg.wasm", import.meta.url)
  }
}
