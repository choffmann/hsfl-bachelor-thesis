mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Copy, Clone)]
pub struct NthReport {
    pub n: usize,
    pub time: usize,
}

#[wasm_bindgen]
#[derive(Debug, Default)]
pub struct BenchmarkReport {
    pub total_time: usize,
    nth_report: Vec<NthReport>,
}

#[wasm_bindgen]
impl BenchmarkReport {

   fn add_report(&mut self, n: usize, time: usize) {
        let report = NthReport { n, time };
        self.nth_report.push(report);
    }

    fn add_total_time(&mut self, total_time: usize) {
        self.total_time = total_time;
    }

    pub fn get_nth_report(&self, n: usize) -> NthReport {
        self.nth_report.get(n).copied().unwrap()
    }
}

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
pub fn matrix_multi(n: usize) -> BenchmarkReport {
    console_log("[WASM] Starting Matrix multiplication");
    utils::set_panic_hook();
    let mut report = BenchmarkReport::default();
    let start = instant::Instant::now();

    for i in 1..n {
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
    console_log(format!("[WASM] Finished {:?}", report).as_str());
    report
}

fn console_log(msg: &str) {
    web_sys::console::log_1(&msg.into())
}
