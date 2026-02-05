import { Command } from "commander";
import api, { initApi } from "../utils/api.js";

const profileCommand = new Command("profile");

profileCommand
  .description("View a user's profile and posts")
  .argument("<userId>", "User ID")
  .action(async (userId) => {
    try {
      await initApi();

      // 1️⃣ Fetch user profile
      const profileRes = await api.get(`/users/${userId}`);

      const { username, followers, following, posts } = profileRes.data;

      console.log("👤 User Profile");
      console.log("────────────────────────────");
      console.log(`👤 Username: ${username}`);
      console.log(`🆔 User ID:  ${userId}`);
      console.log(`👥 Followers: ${followers}`);
      console.log(`➡️ Following: ${following}`);
      console.log(`🖼️ Posts:     ${posts}`);
      console.log("────────────────────────────");

      // 2️⃣ Fetch user posts
      const postsRes = await api.get(`/posts/user/${userId}`);
      const userPosts = postsRes.data.posts;

      if (!userPosts || userPosts.length === 0) {
        console.log("ℹ️  No posts yet.");
        return;
      }

      userPosts.forEach((post) => {
        console.log("────────────────────────────");
        console.log(`🆔 Post ID:   ${post._id}`);
        console.log(`🖼️ Image:    ${post.imageUrl}`);
        if (post.caption) console.log(`💬 Caption:  ${post.caption}`);
        console.log(`❤️ Likes: ${post.likes.length}   💬 Comments: ${post.commentsCount}`);
      });

      console.log("────────────────────────────");

    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login using `insta login`.");
      } else if (err.response?.status === 404) {
        console.error("❌ User not found.");
      } else {
        console.error("❌ Failed to fetch profile:", err.message);
      }
    }
  });

export default profileCommand;
