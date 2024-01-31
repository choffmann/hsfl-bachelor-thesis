pub mod matrix;
mod utils;

use benchmark_utils::benchmark::runner::BenchmarkRunner;
use benchmark_utils::report::WasmBenchmarkReport;
use matrix::Matrix;
use wasm_bindgen::prelude::*;
use web_sys::js_sys::Function;

#[wasm_bindgen]
pub fn matrix_main(n: usize, reporter: Function) -> WasmBenchmarkReport {
    utils::set_panic_hook();
    let mut benchmark = BenchmarkRunner::new(n, Matrix::new(n, reporter));

    return benchmark.run();
}
