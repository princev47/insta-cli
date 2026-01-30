import { Command } from "commander";
import api, { initApi } from "../utils/api.js";

const followCommand = new Command("follow");

followCommand
  .description("Follow a user")
  .argument("<userId>", "User ID to follow")
  .action(async (userId) => {
    try {
      // 🔥 ensure Authorization header
      await initApi();

      await api.post(`/users/${userId}/follow`);
      console.log("✅ You are now following this user");
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login using `insta login`.");
      } else if (err.response?.data?.message) {
        console.error("❌ Follow failed:", err.response.data.message);
      } else {
        console.error("❌ Follow failed:", err.message);
      }
    }
  });

export default followCommand;
