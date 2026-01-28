import { Command } from "commander";
import api, { initApi } from "../utils/api.js";
import fs from "fs";
import FormData from "form-data";

const postCommand = new Command("post");

postCommand
  .command("upload")
  .description("Upload a post")
  .requiredOption("-i, --image <path>", "Path to image")
  .option("-c, --caption <text>", "Caption")
  .action(async (options) => {
    try {
      // 🔥 IMPORTANT: initialize API with token
      await initApi();

      const form = new FormData();
      form.append("image", fs.createReadStream(options.image));

      if (options.caption) {
        form.append("caption", options.caption);
      }

      await api.post("/posts", form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      console.log("✅ Post uploaded successfully");
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("❌ Unauthorized. Please login using `insta login`.");
      } else if (err.response?.data?.message) {
        console.error("❌ Post upload failed:", err.response.data.message);
      } else {
        console.error("❌ Post upload failed:", err.message);
      }
    }
  });

export default postCommand;
