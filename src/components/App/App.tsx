import { useState } from "react";
import { SentenceSyntaxTree } from "../../types/SentenceSyntaxTree";
import { Canvas } from "../Canvas";
import { Form } from "../Form";
import { fetchSentenceSyntaxTree } from "./App.helpers";

export function App() {
  const [sentenceSyntaxTree, setSentenceSyntaxTree] = useState<
    SentenceSyntaxTree[]
  >([]);

  const handleSubmit = async (sentence: string) => {
    const newSentenceSyntaxTree = await fetchSentenceSyntaxTree(sentence);
    setSentenceSyntaxTree(newSentenceSyntaxTree);
  };

  return (
    <div className="mx-auto max-w-6xl p-5">
      <Form className="mb-4" onSubmit={handleSubmit} />
      <div className="flex">
        <div
          id="tag-info"
          style={{ visibility: "hidden" }}
          className="mb-5 rounded border border-sky-200 opacity-0 transition-opacity duration-300"
        >
          <div
            id="word"
            className="bg-sky-200 py-3 px-4 text-center text-blue-500"
          >
            -
          </div>
          <div className="border-b border-sky-200 py-3 px-4">
            Part of speech: <span id="part" className="align-top"></span>
          </div>
          <div id="dep" className="py-3 px-4">
            -
          </div>
        </div>
      </div>
      <h2 className="mb-2 block font-bold">Diagram</h2>
      <Canvas sentenceSyntaxTree={sentenceSyntaxTree} />
    </div>
  );
}
