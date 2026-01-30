#!/usr/bin/env node

import React from "react";
import { render } from "ink";
import { Command } from "commander";
import { initApi } from "../utils/api.js";

// CLI commands
import loginCommand from "../commands/login.js";
import feedCommand from "../commands/feed.js";
import postCommand from "../commands/post.js";
import likeCommand from "../commands/like.js";
import commentCommand from "../commands/comment.js";
import logoutCommand from "../commands/logout.js";
import followCommand from "../commands/follow.js";
import unfollowCommand from "../commands/unfollow.js";


const program = new Command();

program
  .name("insta")
  .description("InstaCLI – Instagram from your terminal")
  .version("1.0.0");

program.addCommand(loginCommand);
program.addCommand(feedCommand);
program.addCommand(postCommand);
program.addCommand(likeCommand);
program.addCommand(commentCommand);
program.addCommand(logoutCommand);
program.addCommand(followCommand);
program.addCommand(unfollowCommand);


// 👇 KEY FIX
if (process.argv.length === 2) {
  // TUI MODE (tsx ONLY)
  (async () => {
    await initApi();

    // 🔥 dynamic import (tsx will handle JSX)
    const { default: App } = await import("../ui/App.jsx");

    render(React.createElement(App));
  })();
} else {
  // NORMAL CLI MODE (node)
  program.parse(process.argv);
  
}
