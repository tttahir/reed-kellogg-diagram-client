import { DiagramRules, DiagramSubRules } from "@app/constants/DiagramRules";
import { TextIndents } from "@app/constants/TextIndents";
import { LineHeights } from "@app/constants/LineHeights";
import { SentenceSyntaxNode } from "@app/types/SentenceSyntaxNode";
import { NodeRelations } from "@app/constants/NodeRelations";
import { CanvasContextSettings, CANVAS_START_POS_X, CANVAS_START_POS_Y } from "@app/constants/renderSettings";

import { getTextWidth, getOneHalfOfNumber } from "./utils";
import { RuleOne } from "./RuleOne";
import { RuleTwo } from "./RuleTwo";
import { RuleType } from "./types";

export class DiagramRenderer {
  private readonly context: CanvasRenderingContext2D;
  private readonly rules: RuleType[];

  constructor(private canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d")!;
    const { fontSize, fontFamily, strokeStyle, lineWidth } = CanvasContextSettings;

    context.font = `${fontSize}px ${fontFamily}`;
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    this.context = context;
    this.rules = [RuleOne, RuleTwo].map((Rule) => new Rule(canvas, context));
  }

  public render(syntaxTree: SentenceSyntaxNode[]) {
    const context = this.context;
    const canvas = this.canvas;

    syntaxTree.forEach((node, i) => {
      // console.log("<<<<<<<<< Sentence", i, ">>>>>>>>>");
      this.computeRootNodePosition(node);
      this.computeChildNodesPosition(node, 0);

      context.save();
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(CANVAS_START_POS_X, CANVAS_START_POS_Y);
      this.correctCoords(node);
      this.renderRootNode(node);
      this.renderChildNodes(node);
      context.stroke();
      context.restore();
    });
  }

  private computeRootNodePosition(node: SentenceSyntaxNode) {
    const leftIndent = TextIndents.LEFT_INDENT;
    const context = this.context;

    node.x = CANVAS_START_POS_X;
    node.y = CANVAS_START_POS_Y;
    node.left = leftIndent;

    if (node.rule === DiagramRules.NINE && node.subRule === DiagramSubRules.ZERO) {
      node.left += leftIndent * 2 + LineHeights.LINE2 * 2;
      Object.defineProperty(node, "right", {
        get() {
          return this.x + this.left + leftIndent + getTextWidth(context, this.value);
        },
      });
    } else if (node.rule !== DiagramRules.FOUR || node.subRule !== DiagramSubRules.ONE) {
      Object.defineProperty(node, "right", {
        get() {
          if (this.value === "") {
            return this.x;
          }

          return Math.max(
            this.x + this.left + TextIndents.RIGHT_INDENT,
            this.x + getTextWidth(context, this.value) + leftIndent * 2
          );
        },
      });
    }
  }

  private computeChildNodesPosition(node: SentenceSyntaxNode, id: number) {
    node.childs.forEach((child) => {
      const rule = child.rule;
      child.parent = node;
      child.id = id;
      this.rules[rule - 1].computePosition(child);
      this.computeChildNodesPosition(child, id + 1);
    });
  }

  private correctCoords(node: SentenceSyntaxNode) {
    const rect = this.getBoundingRect(node);

    node.x += CANVAS_START_POS_X - rect.left;
    node.y += CANVAS_START_POS_Y - rect.top;

    this.canvas.width = rect.right + (CANVAS_START_POS_X - rect.left) + CANVAS_START_POS_X;
    this.canvas.height = rect.bottom + (CANVAS_START_POS_Y - rect.top) + CANVAS_START_POS_X;
  }

  private getBoundingRect(
    node: SentenceSyntaxNode,
    rect = {
      top: CANVAS_START_POS_Y,
      right: CANVAS_START_POS_X,
      bottom: CANVAS_START_POS_Y,
      left: CANVAS_START_POS_X,
    }
  ) {
    const { rule, subRule, x, y } = node;
    const right = node.right || x;

    if (rule === DiagramRules.SIX) {
      rect.left = Math.min(rect.left, x - TextIndents.LEFT_INDENT - LineHeights.LINE6);
    } else if (rule === DiagramRules.FOUR && subRule === DiagramSubRules.ONE) {
      rect.left = Math.min(rect.left, x - LineHeights.LINE4);
    } else {
      rect.left = Math.min(rect.left, x);
    }

    if (rule === DiagramRules.ONE && subRule === DiagramSubRules.ZERO) {
      rect.bottom = Math.max(rect.bottom, y + LineHeights.LINE1);
    } else {
      rect.bottom = Math.max(rect.bottom, y);
    }

    if (rule === DiagramRules.FOUR && subRule === DiagramSubRules.ONE) {
      rect.top = Math.min(rect.top, y - getOneHalfOfNumber(LineHeights.LINE4));
    } else if (rule === DiagramRules.SIX && subRule === DiagramSubRules.ZERO && node.as === NodeRelations.CHILD) {
      rect.top = Math.min(rect.top, y - getOneHalfOfNumber(LineHeights.LINE6) + CanvasContextSettings.fontSize);
    } else {
      rect.top = Math.min(rect.top, y);
    }

    rect.right = Math.max(rect.right, right);

    node.childs.forEach((child) => {
      this.getBoundingRect(child, rect);
    });

    return rect;
  }

  private renderRootNode(node: SentenceSyntaxNode) {
    // this.context.font = font;
    // this.context.strokeStyle = strokeStyle;
    // this.context.lineWidth = lineWidth;
    this.rules[node.rule - 1].render(node);
  }

  private renderChildNodes(node: SentenceSyntaxNode) {
    node.childs.forEach((child) => {
      this.rules[child.rule - 1].render(child);
      this.renderChildNodes(child);
    });
  }
}
