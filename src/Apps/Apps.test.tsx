import * as React from "react";
import * as ReactDOM from "react-dom";
import { Apps } from "./Apps";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Apps />, div);
});
