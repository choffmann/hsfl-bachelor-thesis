use serde::Serialize;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct MandelbrotOptions {
    pub height: i32,
    pub width: i32,
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

    pub fn get_x_start(&self) -> i32 {
        self.x_set.0
    }

    pub fn get_x_end(&self) -> i32 {
        self.x_set.1
    }

    pub fn get_y_start(&self) -> i32 {
        self.y_set.0
    }

    pub fn get_y_end(&self) -> i32 {
        self.y_set.1
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

