import { Command } from "commander";
import api, { initApi } from "../utils/api.js";

const likeCommand = new Command("like");

likeCommand
  .description("Like a post")
  .argument("<postId>", "Post ID to like")
  .action(async (postId) => {
    try {
      // 🔥 IMPORTANT: initialize API with token
      await initApi();

      await api.post(`/posts/${postId}/like`);
      console.log("❤️  Post liked successfully");
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login using `insta login`.");
      } else if (err.response?.data?.message) {
        console.error("❌ Like failed:", err.response.data.message);
      } else {
        console.error("❌ Like failed:", err.message);
      }
    }
  });

export default likeCommand;
