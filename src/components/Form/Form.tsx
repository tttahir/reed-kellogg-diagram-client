import { FormEvent } from "react";
import { FormProps } from "./Form.types";

export const Form = ({ className }: FormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <label className="block font-bold mb-2" htmlFor="sentence">
        Sentence
      </label>
      <div className="flex">
        <input
          type="text"
          className="rounded-l border border-gray-400 grow py-2 px-3 transition-colors duration-300 focus:border-gray-700 outline-none"
          id="sentence"
          placeholder="Type the sentence which you want to diagram"
          onKeyDown={() => ""}
          autoFocus
        />
        <button
          className="bg-blue-600 px-3 rounded-r text-white cursor-pointer hover:bg-blue-800 transition-colors duration-300"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  );
};
