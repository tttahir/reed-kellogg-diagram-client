import { DiagramRules, DiagramSubRules } from "@app/constants/DiagramRules";
import { TextIndents } from "@app/constants/TextIndents";
import { LineHeights } from "@app/constants/LineHeights";
import { SentenceSyntaxNode } from "@app/types/SentenceSyntaxNode";
import {
  CanvasContextSettings,
  CANVAS_START_POS_X,
  CANVAS_START_POS_Y,
} from "@app/constants/renderSettings";
import { getTextWidth } from "./utils";
import { RuleOne } from "./RuleOne";

export class DiagramRenderer {
  private readonly context: CanvasRenderingContext2D;
  private readonly rules: RuleOne[];

  constructor(private canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d")!;
    const { fontSize, fontFamily, strokeStyle, lineWidth } =
      CanvasContextSettings;

    context.font = `${fontSize}px ${fontFamily}`;
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    this.context = context;
    this.rules = [RuleOne].map((Rule) => new Rule(context));
  }

  public render(syntaxTree: SentenceSyntaxNode[]) {
    const context = this.context;
    const canvas = this.canvas;

    syntaxTree.forEach((node, i) => {
      console.log("<<<<<<<<< Sentence", i, ">>>>>>>>>");
      this.computeRootNodePosition(node);
      this.processTree(node, 0);

      context.save();
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(CANVAS_START_POS_X, CANVAS_START_POS_Y);
      this.correctCoords(node);
      this.drawParent(node);
      this.drawTree(node);
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

    if (
      node.rule === DiagramRules.NINE &&
      node.subRule === DiagramSubRules.ZERO
    ) {
      node.left += leftIndent * 2 + LineHeights.LINE2 * 2;
      Object.defineProperty(node, "right", {
        get() {
          return (
            this.x + this.left + leftIndent + getTextWidth(context, this.value)
          );
        },
      });
    } else if (
      node.rule === DiagramRules.FOUR &&
      node.subRule === DiagramSubRules.ONE
    ) {
      Object.defineProperty(node, "right", {
        get() {
          if (this.value == "") {
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

  private processTree(node: SentenceSyntaxNode, id: number) {
    node.childs.forEach((child) => {
      const rule = child.rule;
      child.parent = node;
      child.id = id;
      this.rules[rule - 1].computePosition(child);
      this.processTree(child, id + 1);
    });
  }

  private correctCoords(node: SentenceSyntaxNode) {}

  private drawParent(node: SentenceSyntaxNode) {}

  private drawTree(node: SentenceSyntaxNode) {}
}
