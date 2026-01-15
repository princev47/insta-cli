import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    imageUrl: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 2200
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    commentsCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Index for feed sorting
postSchema.index({ createdAt: -1 });

export default mongoose.model("Post", postSchema);
