mod complex;

use complex::*;
use std::ops::Add;
use web_sys::js_sys::Function;

use benchmark_utils::benchmark::runner::Runner;
use wasm_bindgen::prelude::*;

use crate::options::{MandelbrotItem, MandelbrotOptions};

#[wasm_bindgen]
pub struct MandelbrotV1 {
    pub n: usize,
    pub opt: MandelbrotOptions,
    map: Vec<MandelbrotItem>,
    report: Function,
    render: bool,
}

#[wasm_bindgen]
impl MandelbrotV1 {
    pub fn new(n: usize, opt: MandelbrotOptions, report: Function, render: bool) -> Self {
        MandelbrotV1 {
            n,
            opt,
            map: vec![],
            report,
            render,
        }
    }

    fn calc_z(&self, n: usize, c: Complex) -> (f64, bool) {
        let mut z = Complex::default().pow2().add(&c);
        let mut i = 0;
        let mut abs = z.abs();
        while abs <= 2.0 && i < n {
            z = z.pow2().add(&c);
            abs = z.abs();
            i += 1;
        }
        (abs, abs <= 2.0)
    }

    fn report_status(&self, i: usize) {
        let this = JsValue::null();
        let status = JsValue::from(i);
        if self.render {
            let mandelbrot_map = self.map_to_json();
            let _ = self.report.call2(
                &this,
                &status,
                &mandelbrot_map.expect("Error while converting manderbrot map to json"),
            );
        } else {
            let _ = self.report.call1(&this, &status);
        }
    }

    fn map_to_json(&self) -> Result<JsValue, JsValue> {
        Ok(serde_wasm_bindgen::to_value(&self.map)?)
    }
}

impl Runner for MandelbrotV1 {
    fn before_iter(&mut self, _i: usize) {
        self.map = vec![]
    }

    fn benchmark(&mut self, i: usize) {
        for y_map in 0..=self.opt.height {
            for x_map in 0..=self.opt.width {
                let width = self.opt.width as f64;
                let height = self.opt.height as f64;
                let x_start = self.opt.get_x_start() as f64;
                let x_end = self.opt.get_x_end() as f64;
                let y_start = self.opt.get_y_start() as f64;
                let y_end = self.opt.get_x_end() as f64;

                let x = x_start + (x_map as f64 / width) * (x_end - x_start);
                let y = y_start + (y_map as f64 / height) * (y_end - y_start);
                let c = Complex { x, y };
                let (z, is_mandelbrot) = self.calc_z(i, c);
                self.map.push(MandelbrotItem {
                    x: x_map,
                    y: y_map,
                    z,
                    is_mandelbrot,
                })
            }
        }
    }

    fn after_iter(&mut self, i: usize) {
        self.report_status(i)
    }
}
