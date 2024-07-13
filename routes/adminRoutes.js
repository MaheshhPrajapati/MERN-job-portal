import { Router } from "express";
import { getUsersController } from "../controller/adminAuthController.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import userAuth from "../middlewares/authMiddleware.js";

const router = Router();
// console.log("inside admin");
router.get("/getData", userAuth, adminAuthMiddleware, getUsersController);

export default router;
