import User from "../models/User.js";


export const followUser = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const targetUserId = req.params.id;
    console.log("Current User ID:", currentUserId);
    console.log("Target User ID:", targetUserId);


    if (currentUserId === targetUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself"
      });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (currentUser.following.includes(targetUserId)) {
      return res.status(400).json({
        success: false,
        message: "Already following this user"
      });
    }

    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: "User followed successfully"
    });
  } catch (error) {
    console.error("FOLLOW ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


export const unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const targetUserId = req.params.id;

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!currentUser.following.includes(targetUserId)) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user"
      });
    }

    currentUser.following = currentUser.following.filter(
      id => id.toString() !== targetUserId
    );

    targetUser.followers = targetUser.followers.filter(
      id => id.toString() !== currentUserId
    );

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: "User unfollowed successfully"
    });
  } catch (error) {
    console.error("UNFOLLOW ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

import Post from "../models/Post.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select(
      "username followers following"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const postsCount = await Post.countDocuments({ author: userId });

    res.status(200).json({
      username: user.username,
      userId: user._id,
      followers: user.followers.length,
      following: user.following.length,
      posts: postsCount
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.q;

    if (!keyword) {
      return res.status(400).json({
        message: "Search query is required"
      });
    }

    const users = await User.find({
      username: {
        $regex: keyword,
        $options: "i" // case-insensitive
      }
    }).select("username followers");

    res.status(200).json({
      success: true,
      users
    });

  } catch (err) {
    console.error("SEARCH ERROR:", err);

    res.status(500).json({
      message: "Server error"
    });
  }
};

