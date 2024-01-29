import {useCallback, useEffect, useMemo, useRef, useState} from "react";

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [offscreen, setOffscreen] = useState<OffscreenCanvas | null>(null)
  const [hasContent, setHasContent] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      setOffscreen(new OffscreenCanvas(canvasRef.current?.width, canvasRef.current?.height))
    }
  }, [canvasRef.current]);

  const drawBitmap = (bitmap: ImageBitmap) => {
    setHasContent(true)
    if (canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d")
      window.requestAnimationFrame(() => {
        ctx?.drawImage(bitmap, 0, 0)
      })
    }
  }

  const rebuildOffscreen = () => {
    if (canvasRef.current) {
      setOffscreen(new OffscreenCanvas(canvasRef.current?.width, canvasRef.current?.height))
    }
  }

  return {
    ref: canvasRef,
    offscreen,
    drawBitmap,
    rebuildOffscreen,
    hasContent
  }
}
