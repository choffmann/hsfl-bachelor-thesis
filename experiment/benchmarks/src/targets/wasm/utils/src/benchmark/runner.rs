use super::measure::TimeMeasure;
use crate::report::WasmBenchmarkReport;
use wasm_bindgen::JsValue;
use web_sys::js_sys::Function;

pub trait Runner {
    type Type;

    fn init(&self) {}
    fn before_time_measure(&self) {}
    fn before_iter_time(&self) {}

    fn benchmark(&self, i: usize);

    fn after_iter(&self) {}
    fn after_time_measure(&self) {}
}

trait Benchmark {}

pub struct BenchmarkRunner<T: Runner> {
    name: String,
    n: usize,
    reporter: Option<Function>,
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
            reporter: None,
            runner,
        }
    }

    pub fn register_handler(&mut self, reporter: Function) {
        self.reporter = Some(reporter)
    }

    pub fn run(&mut self) -> WasmBenchmarkReport {
        console_log(format!("[WASM] Starting benchmark '{}'", &self.name).as_str());
        self.runner.init();
        let mut report = WasmBenchmarkReport::default();
        let total_time = TimeMeasure::new();

        for i in 1..=self.n {
            self.report_status(i);
            let iter_time = TimeMeasure::new();

            self.runner.benchmark(i);

            let iter_time = iter_time.stop();
            report.add_report(i, iter_time as usize);
        }

        let total_time = total_time.stop();
        report.add_total_time(total_time as usize);
        console_log(format!("[WASM] Finished benchmark '{}'", &self.name).as_str());

        return report;
    }

    fn report_status(&self, i: usize) {
        if let Some(reporter) = &self.reporter {
            let this = JsValue::null();
            let report_value = JsValue::from(i);
            let _ = reporter.call1(&this, &report_value);
        }
    }
}

fn console_log(msg: &str) {
    web_sys::console::log_1(&msg.into())
}
