#!/usr/bin/env node

"use strict";

require("dotenv").config();

const shell = require("shelljs");

const branch = process.env["TRAVIS_BRANCH"];
const pull_request = process.env["TRAVIS_PULL_REQUEST"];

if (!branch) {
  shell.echo("Must be run on CI");
  shell.exit(1);
}

if (pull_request !== "false") {
  shell.echo(
    "Skipping deploy for pull request; can only be deployed from master branch."
  );
  shell.exit(0);
}

if (branch !== "master") {
  shell.echo(
    "Skipping deploy for " +
      branch +
      " can only be deployed from master branch."
  );
  shell.exit(0);
}

shell.exec("node ./scripts/deploy.js");
