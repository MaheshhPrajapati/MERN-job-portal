"use strict";
// Package imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

// Files imports
import connectDB from "./config/db.js";

// Routes import
import testRoutes from "./routes/testRoutes.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

// Middleware imports
import errorMiddleware from "./middlewares/errorMiddleware.js";

// rest object
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Validation Middleware
app.use(errorMiddleware);

// DOT env config
dotenv.config();

// Connect to mongoDB
connectDB();

// Routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/admin", adminRoutes);

// get PORT from .env
const PORT = process.env.PORT || 8000;
const DEV_MODE = process.env.DEV_MODE;
// Listen
app.listen(PORT, (req, res) => {
  console.log(
    `Node server running on ${DEV_MODE} Mode on Port ${PORT}`.bgCyan.white
  );
});
