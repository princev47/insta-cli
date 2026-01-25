import { Command } from "commander";
import api from "../utils/api.js";
import fs from "fs";

const postCommand = new Command("post");

postCommand
  .command("upload")
  .description("Upload a post")
  .requiredOption("-i, --image <path>")
  .option("-c, --caption <text>")
  .action(async (options) => {
    try {
      const form = new FormData();
      form.append("image", fs.createReadStream(options.image));
      if (options.caption) {
        form.append("caption", options.caption);
      }

      await api.post("/posts", form, {
        headers: form.getHeaders(),
      });

      console.log("✅ Post uploaded successfully");
    } catch (err) {
      console.error("❌ Post upload failed");
    }
  });

export default postCommand;
