pub trait Reporter {
    type ReportType;

    fn report(&self, report_value: Self::ReportType);
}
