import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { CanvasProps } from "./Canvas.types";
import { DiagramRenderer } from "@app/diagram/DiagramRenderer";

export const Canvas = ({ sentenceSyntaxTree }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [diagram, setDiagram] = useState<DiagramRenderer>();

  useEffect(() => {
    if (canvasRef.current) {
      setDiagram(new DiagramRenderer(canvasRef.current));
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (sentenceSyntaxTree.length > 0) {
      diagram!.render(sentenceSyntaxTree);
    }
  }, [sentenceSyntaxTree]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className={cn(
          "align-middle",
          sentenceSyntaxTree.length > 0 && "border border-black"
        )}
        width="20"
        height="20"
      />
    </div>
  );
};
