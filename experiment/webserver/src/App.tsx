import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import MatrixMultiplication from "./pages/MatrixMultiplication";

function App() {
  const theme = createTheme()

  return (
      <>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<IndexPage/>}/>
              <Route path="benchmark/matrix-multiplication" element={<MatrixMultiplication/>}/>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </>
  )
}

export default App
