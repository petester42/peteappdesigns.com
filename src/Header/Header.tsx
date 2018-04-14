import * as React from "react";
import "./Header.css";

// tslint:disable-next-line:no-var-requires
const logo = require("../Assets/logo.svg");

export class Header extends React.Component {
  public render() {
    return (
      <div className="Header">
        <div className="Header-content">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1 className="Header-title">Pete App Designs</h1>
        </div>
        <div className="Header-arrow" />
      </div>
    );
  }
}
