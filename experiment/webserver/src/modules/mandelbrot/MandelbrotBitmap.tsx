import {Box, Paper, Typography} from "@mui/material";
import React, {ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useRef} from "react";

export interface MandelbrotBitmapProps {
  title: string
}

const MandelbrotBitmap = forwardRef(({title,}: MandelbrotBitmapProps, ref: ForwardedRef<HTMLCanvasElement>) => {

  return (
      <Paper elevation={2} sx={{p: 2}}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <canvas style={{width: "300px", height: "150px"}} ref={ref}/>
        </Box>
      </Paper>
  )
})

export default MandelbrotBitmap