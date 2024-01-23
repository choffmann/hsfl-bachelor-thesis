import {Button} from "@mui/material";
import {matrix_ts} from "matrix-multiplication"

const MatrixTypeScript = () => {
  return (
      <>
        <Button variant="contained" onClick={() => matrix_ts.greet()}>TS</Button>
      </>
  )
}

export default MatrixTypeScript