import jobModel from "../models/jobModel.js";

// CREATE JOB || POST
export const CreateJobController = async (req, res, next) => {
  try {
    const { companyName, position, location, jobDescription } = req.body;
    if (!companyName || !position) {
      next("Please fill all details");
    }
    // Getting user Id
    req.body.createdBy = req.user.userId;

    const job = await jobModel.create(req.body);
    return res
      .status(201)
      .json({ job: req.body, success: true, message: "Job Created" });
  } catch (error) {
    next(error);
  }
};

// GET JOB || GET
export const ShowListedJobsController = async (req, res, next) => {
  console.log("inside listed jobs");
  const jobs = await jobModel.find({ createdBy: req.user.userId });
  res.status(200).send({ totalJobs: jobs.length, jobs });
};

// UPDATE JOB || PATCH
export const updateJobController = async (req, res, next) => {
  try {
    const { companyName, position, jobDescription, workType, location } =
      req.body;
    const { id } = req.params;
    if (!companyName || !position) {
      return next("please fill all details");
    }
    const job = await jobModel.findOne({ _id: id });
    if (!job) {
      return next(`No Job found with ${id}`);
    }
    if (!(req.user.userId === job.createdBy.toString())) {
      return next("Not Authorized to update this job");
    }
    const updateJob = await jobModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: "Job Updated Successsfully", updateJob });
  } catch (error) {
    next(error);
    console.log("updateJobController");
  }
};

export const deleteJobController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await jobModel.findOne({ _id: id });
    if (!job) {
      return next(`No Job exists with ${id}`);
    }
    if (!(req.user.userId === job.createdBy.toString())) {
      return next("You are not Authorized to delete this job");
    }
    const deleteJob = await jobModel.findOneAndDelete({ _id: id });
    return res
      .status(200)
      .json({ message: "Job Successfully Deleted", deleteJob });
  } catch (error) {
    next(error);
    console.log("deleteJobController");
  }
};
