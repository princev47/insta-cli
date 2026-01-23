import Post from "../models/Post.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
 
export const createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const caption = req.body?.caption || "";


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



import User from "../models/User.js";

export const getFeed = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const userI = req.user.userId;

    // get current user
    const user = await User.findById(userI).select("following");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // include own posts also
    const feedUserIds = [...user.following, userI];

    const posts = await Post.find({
      author: { $in: feedUserIds }
    })
      .populate("author", "username profileImage")
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });

  } catch (error) {
    console.error("FEED ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * LIKE A POST
 */
export const likePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // prevent duplicate likes
    if (post.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Post already liked"
      });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post liked",
      likesCount: post.likes.length
    });

  } catch (error) {
    console.error("LIKE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * UNLIKE A POST
 */
export const unlikePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "Post not liked yet"
      });
    }

    post.likes = post.likes.filter(
      id => id.toString() !== userId
    );

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post unliked",
      likesCount: post.likes.length
    });

  } catch (error) {
    console.error("UNLIKE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

