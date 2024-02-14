import { MandelBrotOptions, MandelbrotMap } from "@benchmarks/impl";

export const draw = (
  map: MandelbrotMap,
  ctx: OffscreenCanvasRenderingContext2D,
  colorMode: "light" | "dark",
) => {
  map.forEach((v) => {
    if (colorMode === "light" && v.isMandelBrot) {
      ctx.fillStyle = "black";
    } else if (colorMode === "light" && !v.isMandelBrot) {
      ctx.fillStyle = "white";
    } else if (colorMode === "dark" && v.isMandelBrot) {
      ctx.fillStyle = "white";
    } else if (colorMode === "dark" && !v.isMandelBrot) {
      ctx.fillStyle = "black";
    }
    ctx.fillRect(v.x, v.y, 1, 1);
  });
};

export const workerUtility = (event: MessageEvent<any>) => {
  const { n, id, render } = event.data;
  const colorMode: "light" | "dark" = event.data.colorMode;
  const canvas: OffscreenCanvas = event.data.canvas;
  console.log(colorMode)

  const options: MandelBrotOptions = {
    height: canvas.height,
    width: canvas.width,
    xSet: {
      start: -2,
      end: 1,
    },
    ySet: {
      start: -1,
      end: 1,
    },
  };

  return {
    n,
    canvas,
    render,
    options,
    id,
    colorMode,
  };
};
