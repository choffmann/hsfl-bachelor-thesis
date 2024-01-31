use benchmark_utils::benchmark::reporter::Reporter;
use benchmark_utils::benchmark::runner::Runner;
use wasm_bindgen::prelude::*;
use web_sys::js_sys::Function;

type MatrixType = Vec<Vec<usize>>;

#[wasm_bindgen]
pub struct Matrix {
    a_matrix: MatrixType,
    b_matrix: MatrixType,
    result: MatrixType,
    report_func: Function,
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
    pub fn new(n: usize, report_func: Function) -> Self {
        Self {
            a_matrix: Matrix::generate_random_matrix(n),
            b_matrix: Matrix::generate_random_matrix(n),
            result: vec![vec![0; n + 1]; n + 1],
            report_func,
        }
    }
}

impl Runner for Matrix {
    fn benchmark(&mut self, i: usize) {
        let a_matrix = &self.a_matrix;
        let b_matrix = &self.b_matrix;
        let result = &mut self.result;

        for row in 0..=i {
            for col in 0..=i {
                for inner in 0..=i {
                    result[row][col] += a_matrix[row][inner] * b_matrix[inner][col];
                }
            }
        }
    }

    fn before_iter(&mut self, i: usize) {
        let report = MatrixReport { iter: i };
        self.report(report);
    }

    fn after_iter(&mut self, _i: usize) {}
}

#[wasm_bindgen]
pub struct MatrixReport {
    pub iter: usize,
}

impl Reporter for Matrix {
    type ReportType = MatrixReport;

    fn report(&self, report_value: Self::ReportType) {
        let this = JsValue::null();
        let value = JsValue::from(report_value);
        let _ = self.report_func.call1(&this, &value);
    }
}
