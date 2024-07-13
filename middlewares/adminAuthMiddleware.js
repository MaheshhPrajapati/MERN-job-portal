import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

async function adminAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  //console.log("inside admin auth middlware");
  //console.log(req.headers,"HEADRESS")
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next("Admin auth failed");
  }
  //console.log(authHeader,"TOKENNN");
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: payload.userId });
    const isAdmin = user.userType == "Admin";
    if (!isAdmin) {
      console.log("inside admin");
      next("You are Not Authorized");
      return res.status(500).send({ message: "You are Not Authorized" });
    }
    next();
  } catch (error) {
    console.error(error);
    next("Admin Auth Error");
    return res.status(500).send({ message: "Something Went Wrong! Try Again" });
  }
}
export default adminAuthMiddleware;
