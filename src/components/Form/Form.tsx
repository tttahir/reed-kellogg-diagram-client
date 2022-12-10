import { FormEvent } from "react";
import { FormProps } from "./Form.types";

export const Form = ({ className }: FormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label className="mb-2 block font-bold" htmlFor="sentence">
        Sentence
      </label>
      <div className="flex">
        <input
          id="sentence"
          type="text"
          className="grow rounded-l border border-gray-400 py-2 px-3 outline-none transition-colors duration-300 focus:border-sky-500"
          placeholder="Type the sentence which you want to diagram"
          onKeyDown={() => ""}
        />
        <button
          className="cursor-pointer rounded-r bg-sky-500 px-3 text-white transition-colors duration-300 hover:bg-sky-600"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  );
};
