import { Command } from "commander";
import api from "../utils/api.js";

const feedCommand = new Command("feed");

feedCommand
  .description("View your feed")
  .action(async () => {
    try {
      const res = await api.get("/posts/feed");

      res.data.posts.forEach((post) => {
        console.log("──────────────");
        console.log(`👤 ${post.author.username}`);
        console.log(`🖼️ ${post.imageUrl}`);
        if (post.caption) console.log(`💬 ${post.caption}`);
      });
    } catch (err) {
      console.error("❌ Failed to fetch feed");
    }
  });

export default feedCommand;
