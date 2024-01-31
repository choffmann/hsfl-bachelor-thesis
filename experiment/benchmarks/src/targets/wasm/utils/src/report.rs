use serde::Serialize;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Copy, Clone, Serialize)]
pub struct NthReport {
    pub n: usize,
    pub time: usize,
}

#[wasm_bindgen]
#[derive(Debug, Default, Serialize)]
pub struct WasmBenchmarkReport {
    total_time: usize,
    nth_report: Vec<NthReport>,
}

#[wasm_bindgen]
impl WasmBenchmarkReport {
    pub fn add_report(&mut self, n: usize, time: usize) {
        let report = NthReport { n, time };
        self.nth_report.push(report);
    }

    pub fn add_total_time(&mut self, total_time: usize) {
        self.total_time = total_time;
    }

    pub fn to_json(&self) -> Result<JsValue, JsValue> {
        Ok(serde_wasm_bindgen::to_value(&self)?)
    }
}
