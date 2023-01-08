import { TextIndents } from "@app/constants/TextIndents";

export const CanvasContextSettings = {
  fontSize: 16,
  fontFamily: "Arial",
  strokeStyle: "#000",
  lineWidth: 1,
};

export const CANVAS_START_POS_X = 20;

export const CANVAS_START_POS_Y =
  20 + CanvasContextSettings.fontSize + TextIndents.BOTTOM_INDENT;
