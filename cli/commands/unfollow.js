import { Command } from "commander";
import api, { initApi } from "../utils/api.js";

const unfollowCommand = new Command("unfollow");

unfollowCommand
  .description("Unfollow a user")
  .argument("<userId>", "User ID to unfollow")
  .action(async (userId) => {
    try {
      // 🔥 ensure Authorization header
      await initApi();

      await api.post(`/users/${userId}/unfollow`);
      console.log("✅ You have unfollowed this user");
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login using `insta login`.");
      } else if (err.response?.data?.message) {
        console.error("❌ Unfollow failed:", err.response.data.message);
      } else {
        console.error("❌ Unfollow failed:", err.message);
      }
    }
  });

export default unfollowCommand;
