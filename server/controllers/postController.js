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
import mongoose from "mongoose";

export const getFeed = async (req, res) => {
  try {
    const userId = req.user.userId;

    const limit = parseInt(req.query.limit) || 5;
    const cursor = req.query.cursor;

    const user = await User.findById(userId);

    // Users whose posts we want
    const feedUserIds = [...user.following, userId];

    const query = {
      author: { $in: feedUserIds }
    };

    // Cursor logic
    if (cursor) {
      query._id = {
        $lt: new mongoose.Types.ObjectId(cursor)
      };
    }

    const posts = await Post.find(query)
      .populate("author", "username")
      .sort({ _id: -1 }) // newest first
      .limit(limit + 1); // fetch extra for nextCursor

    let nextCursor = null;

    if (posts.length > limit) {
      nextCursor = posts[limit - 1]._id;
      posts.pop(); // remove extra
    }

    res.status(200).json({
      success: true,
      posts,
      nextCursor
    });

  } catch (err) {
  console.error("🔥 FEED ERROR:", err);

  res.status(500).json({
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


  

export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({ author: userId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

