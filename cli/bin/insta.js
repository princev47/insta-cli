#!/usr/bin/env node

import { Command } from "commander";
import loginCommand from "../commands/login.js";
import feedCommand from "../commands/feed.js";
import postCommand from "../commands/post.js";

const program = new Command();

program
  .name("insta")
  .description("InstaCLI – Instagram from your terminal")
  .version("1.0.0");

program.addCommand(loginCommand);
program.addCommand(feedCommand);
program.addCommand(postCommand);

program.parse(process.argv);
