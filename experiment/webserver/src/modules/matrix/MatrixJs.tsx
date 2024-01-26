import {BenchmarkModule} from "../index.ts";
import React, {useState} from "react";
import {Box, Typography} from "@mui/material";

export interface MatrixJsProps extends BenchmarkModule {

}

const MatrixJs = ({n, onComplete}: MatrixJsProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  return (
      <Box>
        <Typography variant="h6">JavaScript</Typography>
        <Typography variant="subtitle2" color="text.secondary">Noch nicht implementiert</Typography>
        {/*<Button variant="contained" onClick={() => handleOnTypeScriptClick()}>Start JS</Button>*/}
        {/*<Typography>Status: {deferredValue}/{n}</Typography>*/}
      </Box>
  )
}

export default MatrixJs