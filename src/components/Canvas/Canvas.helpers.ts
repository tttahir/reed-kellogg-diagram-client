import { LineHeights, TextIndents } from "../../constants/DrawSettings";
import { SentenceSyntaxTree } from "../../types/SentenceSyntaxTree";

const graph = {
  measureText: (v: string) => ({ width: v.length }),
  moveTo: (v1: number, v2: number) => {},
  lineTo: (v1: number, v2: number) => {},
};

const showLog = (node: SentenceSyntaxTree) => {
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
};

const getTextWidth = (str: string) => graph.measureText(str).width;

const setChildCoords = (node: SentenceSyntaxTree) => {
  const rule = node.rule + "" + node.subRule;
  node.left = TextIndents.LEFT_INDENT;

  if (/3|40|71/.test(rule)) {
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
          this.x + getTextWidth(this.value) + TextIndents.LEFT_INDENT * 2
        );
      },
    });
  }
};

function deg50(x: number) {
  return x + x / 2;
}

function tw(str: string) {
  return graph.measureText(str).width;
}

function fillText(node: SentenceSyntaxTree, x: number, y: number) {
  // var tag = document.createElement("div");
  // tag.textContent = node.value;
  // tag.className = "tag";
  // tag.style.width = tw(node.value) + 5 + "px";
  // tag.style.left = x - 2 + "px";
  // tag.style.top = y - 15 + "px";
  // tag.addEventListener("mouseenter", () =>
  //   showInfo(node.value, node.part, node.dep)
  // );
  // canvasParent.appendChild(tag);
}

export class CanvasDiagram {
  constructor() {}

  setParentCoords() {}

  processTree() {}

  clearWords() {}

  correctCoords() {}

  drawParent() {}

  drawTree() {}
}

export class Rule1 {
  getData(node: SentenceSyntaxTree) {
    showLog(node);

    if (node.subRule) {
      // Rule(1:1)
      // __ parent __|__ child __

      setChildCoords(node);
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
    } else {
      // Rule(1:0)
      // __ child __|__ parent __
      //            |

      setChildCoords(node);
      Object.defineProperties(node, {
        x: {
          get() {
            var max = Math.max(
              this.left + TextIndents.RIGHT_INDENT,
              getTextWidth(this.value) + TextIndents.LEFT_INDENT * 2
            );

            if (node.parent.rule == 6) {
              return (
                node.parent.x -
                max -
                TextIndents.LEFT_INDENT -
                LineHeights.LINE6
              );
            }

            return node.parent.x - max;
          },
        },
        y: {
          get() {
            if (node.parent.rule == 6) {
              return node.parent.y - deg50(LineHeights.LINE6);
            }

            return node.parent.y;
          },
        },
      });
    }
  }

  drawNode(node: SentenceSyntaxTree) {
    fillText(
      node,
      node.x + TextIndents.LEFT_INDENT,
      node.y - TextIndents.BOTTOM_INDENT
    );

    if (node.subRule) {
      // Rule(1:1)
      // __ parent __|__ child __

      if (node.as == "parent") {
        graph.moveTo(node.x, node.y);
        graph.lineTo(node.right, node.y);
        graph.moveTo(node.right, node.y - LineHeights.LINE1);
        graph.lineTo(node.right, node.y);
      } else {
        graph.moveTo(node.x, node.y - LineHeights.LINE1);
        graph.lineTo(node.x, node.y);
        graph.lineTo(node.right, node.y);
      }
    } else {
      // Rule(1:0)
      // __ child __|__ parent __
      //            |

      if (node.as == "parent") {
        graph.moveTo(node.x, node.y - LineHeights.LINE1);
        graph.lineTo(node.x, node.y + LineHeights.LINE1);
        graph.moveTo(node.x, node.y);
        graph.lineTo(node.right, node.y);
      } else {
        graph.moveTo(node.x, node.y);
        graph.lineTo(node.right, node.y);
        graph.moveTo(node.right, node.y - LineHeights.LINE1);
        graph.lineTo(node.right, node.y + LineHeights.LINE1);
      }
    }
  }
}
