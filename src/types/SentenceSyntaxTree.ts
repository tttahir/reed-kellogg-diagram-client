import { DiagramRules, DiagramSubRules } from "../constants/DiagramRules";
import { NodeRelations } from "../constants/NodeRelations";

export interface SentenceSyntaxTree {
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
  parent: SentenceSyntaxTree;
  childs: SentenceSyntaxTree[];
}
