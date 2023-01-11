import { SentenceSyntaxNode } from "@app/types/SentenceSyntaxNode";
import { TextIndents } from "@app/constants/TextIndents";
import { RuleUtils } from "./RuleUtils";
import { fillText, getOneHalfOfNumber } from "./utils";
import { NodeRelations } from "@app/constants/NodeRelations";
import { LineHeights } from "@app/constants/LineHeights";

export class RuleTwo extends RuleUtils {
  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }

  computePosition(node: SentenceSyntaxNode) {
    // ___ parent ___\___ child ____
    this.log(node);
    this.computeSidesPosition(node);
    Object.defineProperties(node, {
      x: {
        get() {
          return this.parent.right;
        },
      },
      y: {
        get() {
          return this.parent.y;
        },
      },
    });
  }

  render(node: SentenceSyntaxNode) {
    const context = this.context;
    // ___ parent ___\___ child ____
    fillText(
      node,
      node.x + TextIndents.LEFT_INDENT,
      node.y - TextIndents.BOTTOM_INDENT
    );

    switch (node.as) {
      case NodeRelations.PARENT:
        context.moveTo(node.x, node.y);
        context.lineTo(node.right, node.y);
        context.moveTo(
          node.right - LineHeights.LINE2,
          node.y - getOneHalfOfNumber(LineHeights.LINE2)
        );
        context.lineTo(node.right, node.y);
        break;

      case NodeRelations.CHILD:
        context.moveTo(
          node.x - LineHeights.LINE2,
          node.y - getOneHalfOfNumber(LineHeights.LINE2)
        );
        context.lineTo(node.x, node.y);
        context.lineTo(node.right, node.y);
        break;
    }
  }
}
