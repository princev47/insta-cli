import { Command } from "commander";
import { logout } from "../utils/auth.js";

const logoutCommand = new Command("logout");

logoutCommand
  .description("Logout from InstaCLI")
  .action(async () => {
    await logout();
    console.log("👋 Logged out successfully");
  });

export default logoutCommand;
