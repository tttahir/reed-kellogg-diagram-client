import { SentenceSyntaxTree } from "../../types/SentenceSyntaxTree";

export const fetchSentenceSyntaxTree = async (
  sentence: string
): Promise<SentenceSyntaxTree[]> => {
  console.log("submit:", sentence);

  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        "/sentence-syntax-tree?" +
        new URLSearchParams({ sentence })
    );
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
