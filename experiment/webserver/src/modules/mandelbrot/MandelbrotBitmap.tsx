import {MandelbrotMap} from "mandelbrot/mandelbrot-ts/dist";
import {Box, Paper, Typography} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useRef} from "react";

export interface MandelbrotBitmapProps {
  title: string
  map?: MandelbrotMap | null
  display: boolean
}

const MandelbrotBitmap = ({title, map, display}: MandelbrotBitmapProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    map && map.forEach(v => {
      ctx.fillStyle = v.isMandelBrot ? "black" : "white"
      ctx.fillRect(v.x, v.y, 1, 1)
    })
  }, [map])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = canvas?.offsetWidth
      canvas.height = canvas?.offsetHeight
      const ctx = canvas?.getContext("2d")

      const render = () => {
        console.log("Canvas::render")
        draw(ctx!!)
      }
      render()
    }

  }, [display, map]);

  return (
      display ?
          <Paper elevation={2} sx={{p: 2}}>
            <Typography variant="h6">{title}</Typography>
            <Box sx={{display: "flex", justifyContent: "center"}}>
              <canvas style={{width: "300px", height: "150px"}} ref={canvasRef}/>
            </Box>
          </Paper> : <></>
  )
}

export default MandelbrotBitmap