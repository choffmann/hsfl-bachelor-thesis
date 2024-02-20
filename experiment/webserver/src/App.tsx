import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Fab,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import MatrixMultiplication from "./modules/matrix/MatrixMultiplication.tsx";
import Mandelbrot from "./modules/mandelbrot/Mandelbrot.tsx";
import NBodySystem from "./modules/nbody/NBodySystem.tsx";
import Footer from "./modules/Footer.tsx";
import { useEffect, useMemo, useRef, useState } from "react";
import ColorModeSwitch, {
  ColorModeContext,
} from "./modules/ColorModeSwitch.tsx";

function App() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(() => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    [],
  );
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  useEffect(() => console.log(footerRef.current?.offsetHeight), [footerRef]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <Box
              sx={{
                minHeight: `calc(100vh - ${footerRef.current?.offsetHeight}px`,
                mt: 3,
                mb: 3,
              }}
            >
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<IndexPage />} />
                  <Route
                    path="benchmark/matrix-multiplication"
                    element={<MatrixMultiplication />}
                  />
                  <Route path="benchmark/mandelbrot" element={<Mandelbrot />} />
                  <Route path="benchmark/nbody" element={<NBodySystem />} />
                </Routes>
              </BrowserRouter>
            </Box>
          </Container>
          <Footer ref={footerRef} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
