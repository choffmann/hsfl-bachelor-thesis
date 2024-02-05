use benchmark_utils::benchmark::runner::BenchmarkRunner;
use benchmark_utils::report::WasmBenchmarkReport;
use options::MandelbrotOptions;
use v1::MandelbrotV1;
use v2::MandelbrotV2;
use wasm_bindgen::prelude::*;
use web_sys::js_sys::Function;

mod options;
mod utils;

pub mod v1;
pub mod v2;
// pub mod v3;

#[wasm_bindgen]
pub enum MandelbrotVersion {
    V1,
    V2,
}

#[wasm_bindgen]
pub fn mandelbrot_wasm(
    n: usize,
    opt: MandelbrotOptions,
    reporter: Function,
    render: bool,
    version: MandelbrotVersion,
) -> WasmBenchmarkReport {
    utils::set_panic_hook();

    match version {
        MandelbrotVersion::V1 => {
            let runner = MandelbrotV1::new(n, opt, reporter, render);
            BenchmarkRunner::new(n, runner).run()
        }
        MandelbrotVersion::V2 => {
            let runner = MandelbrotV2::new(n, opt, reporter, render);
            BenchmarkRunner::new(n, runner).run()
        }
    }
}
