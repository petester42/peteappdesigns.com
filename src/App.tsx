import * as React from "react";
import "./App.css";

// tslint:disable-next-line:no-var-requires
const logo = require("./logo.svg");

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="App-content">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pete App Designs</h1>
        </div>
      </div>
    );
  }
}

export default App;
