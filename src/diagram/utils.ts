import { SentenceSyntaxNode } from "@app/types/SentenceSyntaxNode";

export const getTextWidth = (context: CanvasRenderingContext2D, str: string) =>
  context.measureText(str).width;

export const getOneHalfNumber = (n: number) => n + n / 2;

export function fillText(node: SentenceSyntaxNode, x: number, y: number) {
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
