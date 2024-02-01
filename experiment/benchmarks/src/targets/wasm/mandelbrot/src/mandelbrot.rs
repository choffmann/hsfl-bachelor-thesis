use serde::Serialize;
use std::ops::Add;
use web_sys::js_sys::Function;

use benchmark_utils::benchmark::runner::Runner;
use wasm_bindgen::prelude::*;

use crate::complex::{Abs, Complex, Pow2};

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct MandelbrotOptions {
    height: i32,
    width: i32,
    x_set: (i32, i32),
    y_set: (i32, i32),
}

#[wasm_bindgen]
impl MandelbrotOptions {
    #[wasm_bindgen(constructor)]
    pub fn new(
        height: i32,
        width: i32,
        x_start: i32,
        x_end: i32,
        y_start: i32,
        y_end: i32,
    ) -> Self {
        Self {
            height,
            width,
            x_set: (x_start, x_end),
            y_set: (y_start, y_end),
        }
    }
}

#[wasm_bindgen]
#[derive(Serialize)]
pub struct MandelbrotItem {
    pub x: i32,
    pub y: i32,
    pub z: f64,
    pub is_mandelbrot: bool,
}

pub enum MandelbrotReporter {
    ReportStatus,
    ReportMap,
}

#[wasm_bindgen]
pub struct Mandelbrot {
    pub n: usize,
    pub opt: MandelbrotOptions,
    map: Vec<MandelbrotItem>,
    report: Function,
    render: bool,
}

#[wasm_bindgen]
impl Mandelbrot {
    pub fn new(n: usize, opt: MandelbrotOptions, report: Function, render: bool) -> Self {
        Mandelbrot {
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
            i = i + 1;
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

impl Runner for Mandelbrot {
    fn before_iter(&mut self, _i: usize) {
        self.map = vec![]
    }

    fn benchmark(&mut self, i: usize) {
        for y_map in 0..=self.opt.height {
            for x_map in 0..=self.opt.width {
                let width = self.opt.width as f64;
                let height = self.opt.height as f64;
                let x_start = self.opt.x_set.0 as f64;
                let x_end = self.opt.x_set.1 as f64;
                let y_start = self.opt.y_set.0 as f64;
                let y_end = self.opt.y_set.1 as f64;

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

fn console_log(msg: &str) {
    web_sys::console::log_1(&msg.into())
}
