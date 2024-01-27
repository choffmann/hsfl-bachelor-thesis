import {BenchmarkReport} from "matrix-multiplication/matrix-ts/dist";
import {
 IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Toolbar, Tooltip, Typography
} from "@mui/material";
import React, {useCallback} from "react";
import Icon from "@mdi/react";
import {mdiDownload} from "@mdi/js";

export interface ChartTableProps {
  n: number
  tsReport?: BenchmarkReport | null
  jsReport?: BenchmarkReport | null
  wasmReport?: BenchmarkReport | null
}

const AnalyseTable = ({n, wasmReport, jsReport, tsReport}: ChartTableProps) => {

  const handleDownloadReport = () => {
    const report = {
      n,
      tsReport: tsReport || {},
      wasmReport: wasmReport || {},
      jsReport: jsReport || {}
    }

    const bytes = new TextEncoder().encode(JSON.stringify(report))
    const file = new Blob([bytes], {type: "application/json"})
    const url = URL.createObjectURL(file)
    const link = document.createElement("a")
    link.download = `report-matrix-${Date.now()}.json`
    link.href = url
    link.click()
  }

  const calculateTotalNthTime = useCallback((report: BenchmarkReport) => {
    return report.nthReport.map(x => x.time).reduce((acc, v) => acc + v, 0)
  }, [tsReport, wasmReport, jsReport])

  const calculateMean = useCallback((report: BenchmarkReport) => {
    return calculateTotalNthTime(report) / n
  }, [tsReport, wasmReport, jsReport])

  const calculateMedian = useCallback((report: BenchmarkReport) => {
    const sorted = [...new Float64Array(report.nthReport.map(x => x.time).sort((a: number, b: number) => a - b))]
    const middle = sorted.length / 2
    if (middle % 2 === 0) {
      return sorted[middle]
    } else {
      return (sorted[Math.round(middle)] + sorted[Math.round(middle) - 1]) / 2
    }
  }, [tsReport, wasmReport, jsReport])

  const tableRow = [
    {report: tsReport, name: "TypeScript"},
    {report: wasmReport, name: "WASM"},
    {report: jsReport, name: "JavaScript"}
  ]

  const TableToolBar = () => {
    return (
        <Toolbar sx={{
          pl: {sm: 2},
          pr: {xs: 1, sm: 1}
        }}>
          <Typography
              sx={{flex: '1 1 100%'}}
              variant="h6"
              id="tableTitle"
              component="div"
          >
            Wertetabelle
          </Typography>

          <Tooltip title={"Download Report"}>
            <IconButton onClick={() => handleDownloadReport()}>
              <Icon path={mdiDownload} size={1}/>
            </IconButton>
          </Tooltip>
        </Toolbar>
    )
  }

  return (
      <Paper elevation={3}>
        <TableToolBar/>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sprache</TableCell>
                <TableCell>Gesamt</TableCell>
                <TableCell>Durchschnitt (mean)</TableCell>
                <TableCell>Mittelwert (median)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRow.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.report && calculateTotalNthTime(row.report) + " ms" || "-"}</TableCell>
                    <TableCell>{row.report && calculateMean(row.report) + " ms" || "-"}</TableCell>
                    <TableCell>{row.report && calculateMedian(row.report) || "-"}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
  )
}

export default AnalyseTable