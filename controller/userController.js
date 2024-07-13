import userModel from "../models/userModel.js";

export const userUpdateController = async (req, res, next) => {
  const { name, lName, email, phoneNumber, userType, location } = req.body;
  if (!name || !email ) {
    next("Please provide all fields");
  }
  const user = await userModel.findOne({ _id: req.user.userId });

  console.log(req.user, "userContorller line 9");
  user.name = name;
  user.email = email;
  user.location = location;
  user.lName = lName;
  user.userType = userType;
  user.phoneNumber = phoneNumber;
  console.log(user, "user Obj");
  await user.save();

  const token = user.createJWT();
  res.status(200).json({
    user,
    message: "User Successfully Modified",
    token,
  });
};
