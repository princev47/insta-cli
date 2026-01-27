import { Command } from "commander";
import api, { initApi } from "../utils/api.js";   // ⬅️ import initApi
import { saveToken } from "../utils/auth.js";

const loginCommand = new Command("login");

loginCommand
  .description("Login to InstaCLI")
  .requiredOption("-e, --email <email>")
  .requiredOption("-p, --password <password>")
  .action(async (options) => {
    try {
      const res = await api.post("/auth/login", {
        email: options.email,
        password: options.password,
      });

      await saveToken(res.data.token);
      await initApi();  // 🔥 THIS IS THE IMPORTANT LINE

      console.log("✅ Logged in successfully");
    } catch (err) {
      if (err.response) {
        console.error("❌ Login failed:", err.response.data.message);
      } else {
        console.error("❌ Login failed:", err.message);
      }
    }
  });

export default loginCommand;
