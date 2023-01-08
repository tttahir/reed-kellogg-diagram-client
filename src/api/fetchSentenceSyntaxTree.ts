import { SentenceSyntaxNode } from "@app/types/SentenceSyntaxNode";

export const fetchSentenceSyntaxTree = async (
  sentence: string
): Promise<SentenceSyntaxNode[]> => {
  console.log("submit:", sentence);

  const response = await fetch(
    import.meta.env.VITE_API_URL +
      "/sentence-syntax-tree?" +
      new URLSearchParams({ sentence })
  );
  return response.json();
};
