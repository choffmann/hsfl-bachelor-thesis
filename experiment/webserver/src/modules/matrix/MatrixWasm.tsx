import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {matrix_wasm} from "matrix-multiplication"

export interface MatrixWasmProps {

}

const MatrixWasm = (props: MatrixWasmProps) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    matrix_wasm.default().then(() => setReady(true))
  }, [])

  return (
      <>
        <Button variant="contained" disabled={!ready} onClick={() => matrix_wasm.greet()}>WASM</Button>
      </>
  )
}

export default MatrixWasm