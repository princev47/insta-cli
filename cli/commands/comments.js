import { Command } from "commander";
import api, { initApi } from "../utils/api.js";

const commentsCommand = new Command("comments");

commentsCommand
  .description("View comments of a post")
  .argument("<postId>", "Post ID")
  .action(async (postId) => {
    try {
      await initApi();

      const res = await api.get(`/posts/${postId}/comments`);
      const comments = res.data.comments;

      if (!comments || comments.length === 0) {
        console.log("ℹ️  No comments yet.");
        return;
      }

      console.log("💬 Comments:");
      comments.forEach((c) => {
        console.log("────────────────────────");
        console.log(`👤 Username: ${c.author.username}`);
        console.log(`🆔 User ID:  ${c.author._id}`);
        console.log(`📝 Comment:  ${c.text}`);
      });
      console.log("────────────────────────");

    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login using `insta login`.");
      } else {
        console.error("❌ Failed to fetch comments:", err.message);
      }
    }
  });

export default commentsCommand;
