import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import errorMiddleware from "../middlewares/errorMiddleware.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required model"],
    },
    lastName: {
      type: String,
      default: "Last Name",
    },
    email: {
      type: String,
      required: [true, { message: "Email is Required" }],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minLength: [6, "Min Password Length should be 6 characherts"],
      select: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[6-9]\d{9}$/,
      requried: [true, { message: "Email is Required" }],
    },

    userType: {
      type: String,
      enum: ["User", "Admin", "Hiring"],
      default: "User",
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

// Middleware
userSchema.pre("save", async function () {
  if (!this.isModified()) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare Password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// JSON Web Token
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);
