import { RefObject, useEffect } from "react";

export const useConfigureContext = (
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d")!;
      context.font = "16px Arial";
      context.strokeStyle = "#000";
      context.lineWidth = 1;
    }
  }, [canvasRef.current]);
};
