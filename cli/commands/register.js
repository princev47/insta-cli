import { Command } from "commander";
import api from "../utils/api.js";

const registerCommand = new Command("register");

registerCommand
  .description("Register a new user")
  .requiredOption("-u, --username <username>")
  .requiredOption("-e, --email <email>")
  .requiredOption("-p, --password <password>")
  .action(async (options) => {
    try {
      await api.post("/auth/register", {
        username: options.username,
        email: options.email,
        password: options.password,
      });

      console.log("✅ Registered successfully. Now login using `insta login`.");
    } catch (err) {
      if (err.response?.data?.message) {
        console.error("❌ Registration failed:", err.response.data.message);
      } else {
        console.error("❌ Registration failed:", err.message);
      }
    }
  });

export default registerCommand;
