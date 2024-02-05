#[derive(Debug)]
pub struct Complex {
    pub x: f64,
    pub y: f64,
}

impl Default for Complex {
    fn default() -> Self {
        Self { x: 0.0, y: 0.0 }
    }
}

impl Complex {
    pub fn add(&mut self, other: &Complex) {
        let x = self.x + other.x;
        let y = self.y + other.y;

        self.x = x;
        self.y = y;
    }

    pub fn pow2(&mut self) {
        let x = self.x.powf(2.0) - self.y.powf(2.0);
        let y = 2.0 * (self.x * self.y);

        self.x = x;
        self.y = y;
    }

    pub fn abs(&self) -> f64 {
        (self.x.powf(2.0) + self.y.powf(2.0)).sqrt()
    }
}
