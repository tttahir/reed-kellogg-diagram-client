import { useEffect, useRef } from "react";
import { useConfigureContext } from "./Canvas.hooks";
import { CanvasProps } from "./Canvas.types";

export const Canvas = ({ sentenceSyntaxTree }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useConfigureContext(canvasRef);

  useEffect(() => {
    // drawSents(wordsTree);
  }, [sentenceSyntaxTree]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="align-middle" width="20" height="20" />
    </div>
  );
};
