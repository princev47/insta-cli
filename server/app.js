import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// health route
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "InstaCLI API is running "
  });
});
 import authRoutes from "./routes/authRoutes.js";

// routes
app.use("/api/auth", authRoutes);
import testRoutes from "./routes/testRoutes.js";

app.use("/api/test", testRoutes);
import userRoutes from "./routes/userRoutes.js";

app.use("/api/users", userRoutes);

import postRoutes from "./routes/postRoutes.js";

app.use("/api/posts", postRoutes);



export default app;
