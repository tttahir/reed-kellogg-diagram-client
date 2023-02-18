import { SentenceSyntaxNode } from "@app/types/SentenceSyntaxNode";

export interface RuleType {
  computePosition(node: SentenceSyntaxNode): void;

  render(node: SentenceSyntaxNode): void;
}
