import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: [true, "Company Name is requried"] },
    position: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Rejected", "Interview"],
      default: "Pending",
    },
    jobDescription: { type: String, maxlength: 1000 },
    workType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract"],
      default: "Full-Time",
    },
    location: { type: String, default: "Mumbai" },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
