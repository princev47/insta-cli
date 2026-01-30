import { Command } from "commander";
import api, { initApi } from "../utils/api.js";

const commentCommand = new Command("comment");

commentCommand
  .description("Comment on a post")
  .argument("<postId>", "Post ID to comment on")
  .argument("<text>", "Comment text")
  .action(async (postId, text) => {
    try {
      // 🔥 IMPORTANT: initialize API with token
      await initApi();

      await api.post(`/posts/${postId}/comments`, {
        text,
      });

      console.log("💬 Comment added successfully");
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login using `insta login`.");
      } else if (err.response?.data?.message) {
        console.error("❌ Comment failed:", err.response.data.message);
      } else {
        console.error("❌ Comment failed:", err.message);
      }
    }
  });

export default commentCommand;
