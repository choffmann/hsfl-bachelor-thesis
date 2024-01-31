import {Box, Paper, Typography} from "@mui/material";
import React, {ForwardedRef, forwardRef} from "react";

export interface MandelbrotBitmapProps {
  title: string,
  hide: boolean
}

const MandelbrotBitmap = forwardRef(({
                                       title,
                                       hide
                                     }: MandelbrotBitmapProps, ref: ForwardedRef<HTMLCanvasElement>) => {

  return (
      <Paper elevation={2} sx={{p: 2, display: hide ? "none" : "block"}}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <canvas style={{width: "100%", height: "100%"}} ref={ref}/>
        </Box>
      </Paper>
  )
})

export default MandelbrotBitmap