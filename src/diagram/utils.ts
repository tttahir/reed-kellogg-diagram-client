export const getTextWidth = (context: CanvasRenderingContext2D, str: string) =>
  context.measureText(str).width;

export const getOneHalfOfNumber = (n: number) => n + n / 2;
