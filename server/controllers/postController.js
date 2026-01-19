import Post from "../models/Post.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { caption } = req.body;

    // Check file exists
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    const file = req.files.image;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: "MEGA_SERVER",
        resource_type: "auto"
      }
    );

    // Cleanup temp file
    if (fs.existsSync(file.tempFilePath)) {
      fs.unlinkSync(file.tempFilePath);
    }

    // Create post in DB
    const post = await Post.create({
      author: userId,
      imageUrl: result.secure_url,
      caption
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post
    });

  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
