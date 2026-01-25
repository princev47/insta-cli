import { Command } from "commander";
import api from "../utils/api.js";
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
