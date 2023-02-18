import { ChangeEvent, FormEvent, useState } from "react";

import { FormProps } from "./Form.types";

export const Form = ({ className, onSubmit }: FormProps) => {
  const [sentence, setSentence] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pureSentence = sentence.replace(/\s{2,}/g, " ").trim();

    if (pureSentence) {
      onSubmit?.(pureSentence);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSentence(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label className="mb-2 block font-bold" htmlFor="sentence">
        Sentence
      </label>
      <div className="flex">
        <input
          type="text"
          id="sentence"
          value={sentence}
          onChange={handleChange}
          placeholder="Type the sentence which you want to diagram"
          className="grow rounded-l border border-gray-400 py-2 px-3 outline-none transition-colors duration-300 focus:border-sky-500"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-r bg-sky-500 px-3 text-white transition-colors duration-300 hover:bg-sky-600"
        >
          Draw
        </button>
      </div>
    </form>
  );
};
