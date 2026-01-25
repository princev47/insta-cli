import { Command } from "commander";
import api from "../utils/api.js";

const commentCommand = new Command("comment");

commentCommand
  .description("Comment on a post")
  .argument("<postId>", "Post ID")
  .argument("<text>", "Comment text")
  .action(async (postId, text) => {
    try {
      await api.post(`/posts/${postId}/comments`, {
        text
      });
      console.log("💬 Comment added");
    } catch (err) {
      if (err.response) {
        console.error("❌ Comment failed:", err.response.data.message);
      } else {
        console.error("❌ Comment failed:", err.message);
      }
    }
  });

export default commentCommand;
