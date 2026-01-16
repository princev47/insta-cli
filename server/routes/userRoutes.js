import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { followUser, unfollowUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/:id/follow", authMiddleware, followUser);
router.post("/:id/unfollow", authMiddleware, unfollowUser);

export default router;
