import { Command } from "commander";
import api, { initApi } from "../utils/api.js";

let cursor = null; // store cursor between calls

const feedCommand = new Command("feed");

feedCommand
  .description("View your feed (paginated)")
  .option("-m, --more", "Load more posts")
  .action(async (options) => {
    try {
      await initApi();

      const params = {};

      // If user wants more, send cursor
      if (options.more && cursor) {
        params.cursor = cursor;
      }

      const res = await api.get("/posts/feed", {
        params
      });

      const posts = res.data.posts;
      const nextCursor = res.data.nextCursor;

      if (!posts || posts.length === 0) {
        console.log("ℹ️  No more posts.");
        return;
      }

      posts.forEach((post) => {
        console.log("────────────────────────────");
        console.log(`👤 Username: ${post.author.username}`);
        console.log(`👤 Author ID: ${post.author._id}`);
        console.log(`🆔 Post ID:   ${post._id}`);
        console.log(`🖼️ Image:    ${post.imageUrl}`);

        if (post.caption) {
          console.log(`💬 Caption:  ${post.caption}`);
        }

        console.log(
          `❤️ Likes: ${post.likes.length}   💬 Comments: ${post.commentsCount}`
        );
      });

      console.log("────────────────────────────");

      // Save cursor for next page
      if (nextCursor) {
        cursor = nextCursor;
        console.log("➡️  Use `insta feed --more` to load more");
      } else {
        console.log("✅ End of feed");
      }

    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login using `insta login`.");
      } else {
        console.error("❌ Failed to fetch feed:", err.message);
      }
    }
  });

export default feedCommand;
