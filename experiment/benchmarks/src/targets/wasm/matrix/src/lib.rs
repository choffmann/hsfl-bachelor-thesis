mod utils;

use benchmark_utils::benchmark::runner::BenchmarkRunner;
use benchmark_utils::benchmark::runner::Runner;
use benchmark_utils::report::WasmBenchmarkReport;
use wasm_bindgen::prelude::*;
use web_sys::js_sys::Function;

type MatrixType = Vec<Vec<usize>>;

#[wasm_bindgen]
struct Matrix {
    a_matrix: MatrixType,
    b_matrix: MatrixType,
}

#[wasm_bindgen]
impl Matrix {
    fn generate_random_matrix(n: usize) -> MatrixType {
        let mut matrix = vec![vec![0; n + 1]; n + 1];
        for i in 0..=n {
            for j in 0..=n {
                matrix[i][j] = i * j * 20;
            }
        }
        matrix
    }

    #[wasm_bindgen(constructor)]
    pub fn new(n: usize) -> Self {
        Self {
            a_matrix: Matrix::generate_random_matrix(n),
            b_matrix: Matrix::generate_random_matrix(n),
        }
    }
}

impl Runner for Matrix {
    type Type = Self;

    fn benchmark(&self, i: usize) {
        let a_matrix = &self.a_matrix;
        let b_matrix = &self.b_matrix;
        let mut result = vec![vec![0; i + 1]; i + 1];

        for row in 0..=i {
            for col in 0..=i {
                for inner in 0..=i {
                    result[row][col] += a_matrix[row][inner] * b_matrix[inner][col];
                }
            }
        }
    }
}

#[wasm_bindgen]
pub fn matrix_main(n: usize, reporter: Function) -> WasmBenchmarkReport {
    utils::set_panic_hook();
    let matrix = Matrix::new(n);
    let mut benchmark = BenchmarkRunner::new("Matrix Multiplication", n, matrix);
    benchmark.register_handler(reporter);

    return benchmark.run();
}
