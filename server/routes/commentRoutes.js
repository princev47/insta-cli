import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addComment,
  getComments
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/posts/:id/comments", authMiddleware, addComment);
router.get("/posts/:id/comments", authMiddleware, getComments);

export default router;
