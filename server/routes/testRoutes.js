import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "You accessed a protected route 🎉",
    user: req.user
  });
});

export default router;
