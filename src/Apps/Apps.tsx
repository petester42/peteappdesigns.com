import * as React from "react";
import "./Apps.css";

// tslint:disable-next-line:no-var-requires
const hockeyPlayoffsLogo = require("../Assets/hockey-playoffs.png");
// tslint:disable-next-line:no-var-requires
const secondsLogo = require("../Assets/seconds.png");
// tslint:disable-next-line:no-var-requires
const shotgunLogo = require("../Assets/shotgun.png");
// tslint:disable-next-line:no-var-requires
const theVergeBingoLogo = require("../Assets/the-verge-bingo.png");

interface IApp {
  title: string;
  logo: string;
  id: string;
}

export class Apps extends React.Component {
  private items: IApp[] = [
    {
      id: "835425060",
      logo: hockeyPlayoffsLogo,
      title: "Hockey Playoffs"
    },
    {
      id: "378789401",
      logo: secondsLogo,
      title: "seconds..."
    },
    {
      id: "441032430",
      logo: theVergeBingoLogo,
      title: "The Verge Bingo"
    },
    {
      id: "294073316",
      logo: shotgunLogo,
      title: "Shotgun!!"
    }
  ];

  public render() {
    const apps = this.items.map(x => {
      return (
        <a
          key={x.id}
          className="Apps-logo"
          href={this.itunesUrl(x.id)}
          target="blank"
        >
          <img src={x.logo} alt={x.title} />
          <span>{x.title}</span>
        </a>
      );
    });
    return (
      <div className="Apps">
        <span className="Apps-list-header">Apps</span>
        <div className="Apps-list">{apps}</div>
      </div>
    );
  }

  private itunesUrl(id: string) {
    return `https://itunes.apple.com/app/id${id}`;
  }
}
