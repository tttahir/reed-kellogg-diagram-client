import { TextIndents } from "@app/constants/TextIndents";
import { LineHeights } from "@app/constants/LineHeights";
import { SentenceSyntaxNode } from "@app/types/SentenceSyntaxNode";
import { RuleUtils } from "./RuleUtils";
import { getOneHalfNumber, fillText, getTextWidth } from "./utils";
import { NodeRelations } from "@app/constants/NodeRelations";
import { DiagramRules, DiagramSubRules } from "@app/constants/DiagramRules";

export class RuleOne extends RuleUtils {
  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }

  computePosition(node: SentenceSyntaxNode) {
    this.log(node);

    switch (node.subRule) {
      // Rule(1:1)
      // __ parent __|__ child __
      case DiagramSubRules.ONE:
        this.computeSidesPosition(node);
        Object.defineProperties(node, {
          x: {
            get() {
              return node.parent.right;
            },
          },
          y: {
            get() {
              return node.parent.y;
            },
          },
        });
        break;

      // Rule(1:0)
      // __ child __|__ parent __
      //            |
      case DiagramSubRules.ZERO:
        const context = this.context;
        this.computeSidesPosition(node);
        Object.defineProperties(node, {
          x: {
            get() {
              const childWidth = Math.max(
                this.left + TextIndents.RIGHT_INDENT,
                getTextWidth(context, this.value) + TextIndents.LEFT_INDENT * 2
              );

              if (node.parent.rule == DiagramRules.SIX) {
                return (
                  node.parent.x -
                  childWidth -
                  TextIndents.LEFT_INDENT -
                  LineHeights.LINE6
                );
              }

              return node.parent.x - childWidth;
            },
          },
          y: {
            get() {
              if (node.parent.rule == DiagramRules.SIX) {
                return node.parent.y - getOneHalfNumber(LineHeights.LINE6);
              }

              return node.parent.y;
            },
          },
        });
        break;
    }
  }

  render(node: SentenceSyntaxNode) {
    const context = this.context;

    fillText(
      node,
      node.x + TextIndents.LEFT_INDENT,
      node.y - TextIndents.BOTTOM_INDENT
    );

    switch (node.subRule) {
      // Rule(1:1)
      // __ parent __|__ child __
      case DiagramSubRules.ONE:
        if (node.as == NodeRelations.PARENT) {
          context.moveTo(node.x, node.y);
          context.lineTo(node.right, node.y);
          context.moveTo(node.right, node.y - LineHeights.LINE1);
          context.lineTo(node.right, node.y);
        } else if (node.as == NodeRelations.CHILD) {
          context.moveTo(node.x, node.y - LineHeights.LINE1);
          context.lineTo(node.x, node.y);
          context.lineTo(node.right, node.y);
        }
        break;

      // Rule(1:0)
      // __ child __|__ parent __
      //            |
      case DiagramSubRules.ZERO:
        if (node.as == NodeRelations.PARENT) {
          context.moveTo(node.x, node.y - LineHeights.LINE1);
          context.lineTo(node.x, node.y + LineHeights.LINE1);
          context.moveTo(node.x, node.y);
          context.lineTo(node.right, node.y);
        } else if (node.as == NodeRelations.CHILD) {
          context.moveTo(node.x, node.y);
          context.lineTo(node.right, node.y);
          context.moveTo(node.right, node.y - LineHeights.LINE1);
          context.lineTo(node.right, node.y + LineHeights.LINE1);
        }
        break;
    }
  }
}
