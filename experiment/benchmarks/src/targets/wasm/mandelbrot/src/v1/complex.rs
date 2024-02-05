use std::ops::Add;

#[derive(Debug)]
pub struct Complex {
    pub x: f64,
    pub y: f64,
}

pub trait Pow2 {
    type Output;

    fn pow2(&self) -> Self::Output;
}

pub trait Abs {
    type Output;

    fn abs(&self) -> Self::Output;
}

impl Default for Complex {
    fn default() -> Self {
        Self { x: 0.0, y: 0.0 }
    }
}

impl Add for Complex {
    type Output = Self;

    fn add(self, other: Self) -> Self::Output {
        Complex {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

impl Add<&Complex> for Complex {
    type Output = Complex;

    fn add(self, other: &Complex) -> Self::Output {
        Complex {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

impl Pow2 for Complex {
    type Output = Self;

    fn pow2(&self) -> Self::Output {
        Complex {
            x: (self.x.powf(2.0) - self.y.powf(2.0)),
            y: ((self.x * self.y) + (self.x * self.y)),
        }
    }
}

impl Abs for Complex {
    type Output = f64;

    fn abs(&self) -> Self::Output {
        (self.x.powf(2.0) + self.y.powf(2.0)).sqrt()
    }
}
