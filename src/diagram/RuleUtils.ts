import { DiagramRules, DiagramSubRules } from "@app/constants/DiagramRules";
import { TextIndents } from "@app/constants/TextIndents";
import { SentenceSyntaxNode } from "@app/types/SentenceSyntaxNode";
import { getTextWidth } from "./utils";

export class RuleUtils {
  constructor(protected readonly context: CanvasRenderingContext2D) {}

  log(node: SentenceSyntaxNode) {
    const str = [
      "%cRule(" + node.rule + ":" + node.subRule + ")",
      "%c" + node.id,
      "%c" + node.value,
      "%c" + node.parent.value,
    ];

    console.log(
      str.join(" "),
      "color: #79f592",
      "color: #8daef6",
      "color: #ffd979",
      "color: #fff"
    );
  }

  computeSidesPosition(node: SentenceSyntaxNode) {
    const context = this.context;
    node.left = TextIndents.LEFT_INDENT;

    if (
      node.rule === DiagramRules.THREE ||
      (node.rule === DiagramRules.FOUR &&
        node.subRule === DiagramSubRules.ZERO) ||
      (node.rule === DiagramRules.SEVEN && node.subRule === DiagramSubRules.ONE)
    ) {
      Object.defineProperty(node, "right", {
        get() {
          return this.x;
        },
      });
    } else {
      Object.defineProperty(node, "right", {
        get() {
          if (this.value == "") return this.x;

          return Math.max(
            this.x + this.left + TextIndents.RIGHT_INDENT,
            this.x +
              getTextWidth(context, this.value) +
              TextIndents.LEFT_INDENT * 2
          );
        },
      });
    }
  }

  increaseLeft(node: SentenceSyntaxNode, left: number) {
    let parent = node.parent;
    let parentOfParent = parent.parent;

    while (parentOfParent) {
      const { rule: pRule, subRule: pSubRule } = parent;
      const { rule: ppRule, subRule: ppSubRule } = parentOfParent;

      if (
        [DiagramRules.ONE, DiagramRules.TWO].includes(pRule) &&
        [DiagramRules.ONE, DiagramRules.SIX, DiagramRules.EIGHT].includes(
          ppRule
        )
      ) {
        console.log(parent.value, parentOfParent.value);
      } else if (
        pRule == DiagramRules.SIX &&
        pSubRule == DiagramSubRules.ONE &&
        ppRule == DiagramRules.SIX &&
        ppSubRule == DiagramSubRules.ZERO
      ) {
        console.log(parent.value, parentOfParent.value);
      } else {
        parentOfParent.left += left;
      }

      parent = parentOfParent;
      parentOfParent = parentOfParent.parent;
    }
  }

  dashedLine(x1: number, y1: number, x2: number, y2: number) {
    const context = this.context;
    const lineDistance = 10;
    const gapDistance = 10;

    context.stroke();
    context.beginPath();
    context.moveTo(x1, y1);
    context.setLineDash([lineDistance, gapDistance]);
    context.lineTo(x2, y2);
    context.stroke();
    context.beginPath();
    context.setLineDash([]);
    context.moveTo(x1, y1);
  }
}
