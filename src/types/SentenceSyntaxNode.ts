import { DiagramRules, DiagramSubRules } from "@app/constants/DiagramRules";
import { NodeRelations } from "@app/constants/NodeRelations";

export interface SentenceSyntaxNode {
  id: number;
  right: number;
  left: number;
  x: number;
  y: number;

  rule: DiagramRules;
  subRule: DiagramSubRules;
  value: string;
  dep: string;
  part: string;
  as: NodeRelations;
  parent: SentenceSyntaxNode;
  childs: SentenceSyntaxNode[];
}
