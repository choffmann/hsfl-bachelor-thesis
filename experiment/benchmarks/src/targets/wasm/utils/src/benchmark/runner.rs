use super::measure::TimeMeasure;
use crate::report::WasmBenchmarkReport;

pub trait Runner {
    fn init(&mut self) {}
    fn before_iter(&mut self, i: usize);
    fn benchmark(&mut self, i: usize);
    fn after_iter(&mut self, i: usize);
    fn finished(&mut self) {}
}

pub struct BenchmarkRunner<T: Runner> {
    n: usize,
    runner: T,
}

impl<T> BenchmarkRunner<T>
where
    T: Runner,
{
    pub fn new(n: usize, runner: T) -> Self {
        Self { n, runner }
    }

    pub fn run(&mut self) -> WasmBenchmarkReport {
        self.runner.init();
        let mut report = WasmBenchmarkReport::default();
        let total_time = TimeMeasure::new();

        for i in 1..=self.n {
            self.runner.before_iter(i);
            let iter_time = TimeMeasure::new();

            self.runner.benchmark(i);

            let iter_time = iter_time.stop();
            self.runner.after_iter(i);
            report.add_report(i, iter_time as usize);
        }

        let total_time = total_time.stop();
        report.add_total_time(total_time as usize);
        self.runner.finished();

        return report;
    }
}
