import userModel from "../models/userModel.js";
import jobModel from "../models/jobModel.js";

async function getUsersController(req, res, next) {
  try {
    const users = await userModel.find({});
    const jobs = await jobModel.find({});
    

    return res.status(200).json({ users, jobs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false });
  }
}
export { getUsersController };
