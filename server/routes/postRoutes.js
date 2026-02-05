import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createPost,
  getFeed,
  likePost,
  unlikePost,getPostsByUser
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/feed", authMiddleware, getFeed);
router.get("/user/:id", authMiddleware, getPostsByUser);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/unlike", authMiddleware, unlikePost);

export default router;

