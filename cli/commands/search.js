import { Command } from "commander";
import api, { initApi } from "../utils/api.js";

const searchCommand = new Command("search");

searchCommand
  .description("Search users by username")
  .argument("<username>", "Username to search")
  .action(async (username) => {
    try {
      await initApi();

      const res = await api.get("/users/search", {
        params: {
          q: username
        }
      });

      const users = res.data.users;

      if (!users || users.length === 0) {
        console.log("ℹ️  No users found.");
        return;
      }

      console.log(`🔍 Search results for "${username}"`);

      users.forEach((user) => {
        console.log("────────────────────────────");
        console.log(`👤 Username: ${user.username}`);
        console.log(`🆔 User ID:  ${user._id}`);
        console.log(`👥 Followers: ${user.followers.length}`);
      });

      console.log("────────────────────────────");

    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login.");
      } else {
        console.error("❌ Search failed:", err.message);
      }
    }
  });

export default searchCommand;
