import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

/**
 * ADD COMMENT
 */
export const addComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.params.id;
    const text = req.body?.text;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required"
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const comment = await Comment.create({
      postId,
      author: userId,
      text
    });

    // increment comment count on post
    post.commentsCount += 1;
    await post.save();

    res.status(201).json({
      success: true,
      message: "Comment added",
      comment
    });

  } catch (error) {
    console.error("ADD COMMENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * GET COMMENTS FOR A POST
 */
export const getComments = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ postId })
      .populate("author", "username profileImage")
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: comments.length,
      comments
    });

  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
