import {Button} from "@mui/material";
import {matrix_ts} from "matrix-multiplication"

const MatrixTypeScript = () => {

  const handleOnClick = () => {
    let report = matrix_ts.matrixMulti()
    console.log(report)
  }

  return (
      <>
        <Button variant="contained" onClick={() => handleOnClick()}>TS</Button>
      </>
  )
}

export default MatrixTypeScript