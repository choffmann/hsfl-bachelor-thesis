use instant::Instant;

pub struct TimeMeasure {
    instant: Instant,
}

impl TimeMeasure {
    pub fn new() -> Self {
        Self {
            instant: Instant::now(),
        }
    }

    pub fn stop(&self) -> u128 {
        self.instant.elapsed().as_millis()
    }
}

impl Default for TimeMeasure {
    fn default() -> Self {
        Self::new()
    }
}
