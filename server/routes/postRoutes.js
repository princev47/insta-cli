import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createPost,getFeed } from "../controllers/postController.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/feed", authMiddleware, getFeed);

export default router;
