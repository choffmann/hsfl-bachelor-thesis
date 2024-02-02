use benchmark_utils::benchmark::runner::BenchmarkRunner;
use benchmark_utils::report::WasmBenchmarkReport;
use mandelbrot::{Mandelbrot, MandelbrotOptions};
use wasm_bindgen::prelude::*;
use web_sys::js_sys::Function;

mod complex;
mod utils;

pub mod mandelbrot;

#[wasm_bindgen]
pub fn mandelbrot_wasm(
    n: usize,
    opt: MandelbrotOptions,
    reporter: Function,
    render: bool,
) -> WasmBenchmarkReport {
    utils::set_panic_hook();
    let mut benchmark = BenchmarkRunner::new(n, Mandelbrot::new(n, opt, reporter, render));

    benchmark.run()
}
