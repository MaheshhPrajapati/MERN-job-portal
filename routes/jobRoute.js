import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  CreateJobController,
  ShowListedJobsController,
  deleteJobController,
  updateJobController,
} from "../controller/jobController.js";
const router = express.Router();
// Create Jobs || POST
router.post("/create-job", userAuth, CreateJobController);

// Get Jobs || GET
router.get("/listed-jobs", userAuth, ShowListedJobsController);

// Update Job || PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

// DELETE JOB || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

export default router;
