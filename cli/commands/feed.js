import { Command } from "commander";
import api, { initApi } from "../utils/api.js";

const feedCommand = new Command("feed");

feedCommand
  .description("View your feed")
  .action(async () => {
    try {
      await initApi();

      const res = await api.get("/posts/feed");

      const posts = res.data.posts;

      if (!posts || posts.length === 0) {
        console.log("ℹ️  No posts yet.");
        return;
      }

      posts.forEach((post) => {
        console.log("────────────────────────────");
        console.log(`👤 Username: ${post.author.username}`);
        console.log(`👤 Author ID: ${post.author._id}`);
        console.log(`🆔 Post ID:   ${post._id}`);
        console.log(`🖼️ Image:    ${post.imageUrl}`);
        if (post.caption) console.log(`💬 Caption:  ${post.caption}`);
        console.log(`❤️ Likes: ${post.likes.length}   💬 Comments: ${post.commentsCount}`);
      });

      console.log("────────────────────────────");

    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login using `insta login`.");
      } else {
        console.error("❌ Failed to fetch feed:", err.message);
      }
    }
  });

export default feedCommand;
