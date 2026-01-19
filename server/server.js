import dotenv from "dotenv";
dotenv.config();
import express from "express";

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
import {connectCloud} from "./config/cloudinary.js"

connectCloud();

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
});
