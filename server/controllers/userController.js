import User from "../models/User.js";

/**
 * FOLLOW USER
 */
export const followUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.id;

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
    const currentUserId = req.user.id;
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
