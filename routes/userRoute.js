import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { userUpdateController } from "../controller/userController.js";

const router = express.Router();

// UPDATE USER || PUT
router.put("/update-user", userAuth, userUpdateController);

export default router;
