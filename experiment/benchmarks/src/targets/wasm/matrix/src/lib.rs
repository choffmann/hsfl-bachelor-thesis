mod utils;

use benchmark_utils::report::WasmBenchmarkReport;
use wasm_bindgen::prelude::*;
use web_sys::js_sys;

type Matrix = Vec<Vec<usize>>;

fn generate_random_matrix(n: usize) -> Matrix {
    let mut matrix = vec![vec![0; n + 1]; n + 1];
    for i in 0..=n {
        for j in 0..=n {
            matrix[i][j] = i * j * 20;
        }
    }
    matrix
}

#[wasm_bindgen]
pub fn matrix_multi(n: usize, report_status: &js_sys::Function) -> WasmBenchmarkReport {
    utils::set_panic_hook();
    console_log("[WASM] Starting Matrix multiplication");
    let mut report = WasmBenchmarkReport::default();
    let start = instant::Instant::now();
    let this = JsValue::null();

    for i in 1..=n {
        let report_value = JsValue::from(i);
        let _ = report_status.call1(&this, &report_value);

        let a_matrix = generate_random_matrix(i);
        let b_matrix = generate_random_matrix(i);
        let mut result = vec![vec![0; i + 1]; i + 1];

        let iter_start = instant::Instant::now();
        for row in 0..=i {
            for col in 0..=i {
                for inner in 0..=i {
                    result[row][col] += a_matrix[row][inner] * b_matrix[inner][col];
                }
            }
        }
        let iter_duration = iter_start.elapsed();
        report.add_report(i, iter_duration.as_millis() as usize);
    }
    let total_duration = start.elapsed();
    report.add_total_time(total_duration.as_millis() as usize);
    console_log("[WASM] Finished Matrix multiplication");
    report
}

fn console_log(msg: &str) {
    web_sys::console::log_1(&msg.into())
}
