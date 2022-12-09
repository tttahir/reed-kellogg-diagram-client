import { Form } from "./components/Form";
import "./style.css";

export function App() {
  return (
    <div className="p-5 max-w-6xl mx-auto">
      <Form className="mb-4" />
      <div className="flex">
        <div className="panel" id="tag-info" style={{ visibility: "hidden" }}>
          <div className="panel-heading" id="word">
            -
          </div>
          <div className="panel-item">
            Part of speech: <span id="part"></span>
          </div>
          <div className="panel-item" id="dep">
            -
          </div>
        </div>
      </div>
      <div className="block font-bold mb-2">Diagram</div>
      <div className="relative" id="canvas-outer">
        <canvas className="align-middle" id="draw" width="20" height="20" />
      </div>
    </div>
  );
}
