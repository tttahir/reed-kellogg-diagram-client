import { SentenceSyntaxNode } from "@app/types/SentenceSyntaxNode";
import { TextIndents } from "@app/constants/TextIndents";
import { NodeRelations } from "@app/constants/NodeRelations";
import { LineHeights } from "@app/constants/LineHeights";

import { RuleUtils } from "./RuleUtils";
import { getOneHalfOfNumber } from "./utils";
import { RuleType } from "./types";

export class RuleTwo extends RuleUtils implements RuleType {
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
    // ___ parent ___\___ child ____
    const context = this.context;

    this.fillText(node, node.x + TextIndents.LEFT_INDENT, node.y - TextIndents.BOTTOM_INDENT);

    switch (node.as) {
      case NodeRelations.PARENT:
        context.moveTo(node.x, node.y);
        context.lineTo(node.right, node.y);
        context.moveTo(node.right - LineHeights.LINE2, node.y - getOneHalfOfNumber(LineHeights.LINE2));
        context.lineTo(node.right, node.y);
        break;

      case NodeRelations.CHILD:
        context.moveTo(node.x - LineHeights.LINE2, node.y - getOneHalfOfNumber(LineHeights.LINE2));
        context.lineTo(node.x, node.y);
        context.lineTo(node.right, node.y);
        break;
    }
  }
}
