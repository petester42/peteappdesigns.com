import * as React from "react";
import "./App.css";

import { Apps } from "./Apps";
import { Header } from "./Header";

class App extends React.Component {
  public render() {
    return (
      <main className="App">
        <section className="App-header">
          <Header />
        </section>
        <section className="App-section">
          <Apps />
        </section>
      </main>
    );
  }
}

export default App;
