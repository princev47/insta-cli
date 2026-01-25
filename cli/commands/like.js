import { Command } from "commander";
import api from "../utils/api.js";

const likeCommand = new Command("like");

likeCommand
  .description("Like a post")
  .argument("<postId>", "Post ID to like")
  .action(async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`);
      console.log("  Post liked");
    } catch (err) {
      if (err.response) {
        console.error(" Like failed:", err.response.data.message);
      } else {
        console.error(" Like failed:", err.message);
      }
    }
  });

export default likeCommand;
