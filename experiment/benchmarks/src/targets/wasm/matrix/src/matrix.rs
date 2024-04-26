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
        (0..=n).for_each(|i| {
            (0..=n).for_each(|j| {
                matrix[i][j] = i * j * 20;
            });
        });
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

    fn report(&self, report_value: MatrixReport) {
        let this = JsValue::null();
        let value = JsValue::from(report_value);
        let _ = self.report_func.call1(&this, &value);
    }

    fn rebuild_matrix(&mut self, n: usize) {
        self.a_matrix = Matrix::generate_random_matrix(n);
        self.b_matrix = Matrix::generate_random_matrix(n);
        self.result = vec![vec![0; n + 1]; n + 1];
    }
}

impl Runner for Matrix {
    fn benchmark(&mut self, i: usize) {
        let a_matrix = &self.a_matrix;
        let b_matrix = &self.b_matrix;
        let result = &mut self.result;

        (0..=i).for_each(|row| {
            (0..=i).for_each(|col| {
                (0..=i).for_each(|inner| {
                    result[row][col] += a_matrix[row][inner] * b_matrix[inner][col];
                });
            });
        });
    }

    fn before_iter(&mut self, i: usize) {
        let report = MatrixReport { iter: i };
        self.report(report);
        self.rebuild_matrix(i);
    }

    fn after_iter(&mut self, _i: usize) {}
}

#[wasm_bindgen]
pub struct MatrixReport {
    pub iter: usize,
}
