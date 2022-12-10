import { Form } from "./components/Form";

export function App() {
  return (
    <div className="mx-auto max-w-6xl p-5">
      <Form className="mb-4" />
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
            Asd asd -
          </div>
          <div className="border-b border-sky-200 py-3 px-4">
            Part of speech: <span id="part" className="align-top"></span>
          </div>
          <div id="dep" className="py-3 px-4">
            -
          </div>
        </div>
      </div>
      <div className="mb-2 block font-bold">Diagram</div>
      <div id="canvas-outer" className="relative">
        <canvas id="draw" className="align-middle" width="20" height="20" />
      </div>
    </div>
  );
}
