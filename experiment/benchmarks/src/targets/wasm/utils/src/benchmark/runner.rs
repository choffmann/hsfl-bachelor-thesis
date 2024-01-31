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
    name: String,
    n: usize,
    runner: T,
}

impl<T> BenchmarkRunner<T>
where
    T: Runner,
{
    pub fn new(name: &str, n: usize, runner: T) -> Self {
        Self {
            name: String::from(name),
            n,
            runner,
        }
    }

    pub fn run(&mut self) -> WasmBenchmarkReport {
        self.runner.init();
        console_log(format!("[WASM] Starting benchmark '{}'", &self.name).as_str());
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
        console_log(format!("[WASM] Finished benchmark '{}'", &self.name).as_str());
        self.runner.finished();

        return report;
    }
}

fn console_log(msg: &str) {
    web_sys::console::log_1(&msg.into())
}
