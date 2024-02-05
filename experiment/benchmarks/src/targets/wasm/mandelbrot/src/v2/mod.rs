use web_sys::js_sys::Function;

use benchmark_utils::benchmark::runner::Runner;
use wasm_bindgen::prelude::*;

use crate::options::{MandelbrotItem, MandelbrotOptions};
use num_complex::{Complex, ComplexFloat};

#[wasm_bindgen]
pub struct MandelbrotV2 {
    pub n: usize,
    pub opt: MandelbrotOptions,
    map: Vec<MandelbrotItem>,
    report: Function,
    render: bool,
}

#[wasm_bindgen]
impl MandelbrotV2 {
    pub fn new(n: usize, opt: MandelbrotOptions, report: Function, render: bool) -> Self {
        MandelbrotV2 {
            n,
            opt,
            map: vec![],
            report,
            render,
        }
    }

    fn run(&self, i: usize) -> Vec<MandelbrotItem> {
        let width = self.opt.width;
        let height = self.opt.height;

        (0..=height)
            .flat_map(|y| {
                (0..=width).map(move |x| {
                    let (z, is_mandelbrot) = self.calc_z(i, x, y);
                    MandelbrotItem {
                        x,
                        y,
                        z,
                        is_mandelbrot,
                    }
                })
            })
            .collect()
    }

    fn calc_z(&self, n: usize, x: i32, y: i32) -> (f64, bool) {
        let c = Complex::new(
            f64::from(self.opt.get_x_start())
                + (f64::from(x) / f64::from(self.opt.width))
                    * f64::from(self.opt.get_x_end() - self.opt.get_x_start()),
            f64::from(self.opt.get_y_start())
                + (f64::from(y) / f64::from(self.opt.height))
                    * f64::from(self.opt.get_y_end() - self.opt.get_y_start()),
        );
        let mut z = Complex::new(0.0, 0.0);
        let mut i = 0;
        let mut abs = z.norm_sqr();
        while abs <= 2.0 && i < n {
            z = z.powi(2) + c;
            abs = z.norm_sqr();
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

impl Runner for MandelbrotV2 {
    fn init(&mut self) {
        web_sys::console::log_1(&JsValue::from_str(
            "[WASM] Starting mandelbrot benchmark v2",
        ))
    }

    fn before_iter(&mut self, _i: usize) {}

    fn benchmark(&mut self, i: usize) {
        self.map = self.run(i);
    }

    fn after_iter(&mut self, i: usize) {
        self.report_status(i)
    }

    fn finished(&mut self) {
        web_sys::console::log_1(&JsValue::from_str(
            "[WASM] Finished mandelbrot benchmark v2",
        ))
    }
}
