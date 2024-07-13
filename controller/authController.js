import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  
  try {
    const { name, email, password, phoneNumber, confirmPassword } = req.body;

    if (!name) {
      
      return res.status(400).json({ message: "Name is Required" });
      next("Name is required Bro");
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });

      return next("Email is required");
    }

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone Number is Required" });

      return next("Phone Number is required");
    }
    if (!phoneNumber.match(/^[6-9]\d{9}$/)) {
      return res
        .status(400)
        .json({ message: "Please enter valid phone number" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is Required" });

      return next("password is required");
    }
    if (!confirmPassword) {
      return res.status(400).json({ message: "Confirm Password is Required" });

      return next("Confirm Password is required");
    }

    //is password and confirm password match?
    if (!(password == confirmPassword)) {
      return res.status(400).json({ message: "password does not match" });
      return next("Password does not match");
    }

    // Email already exists exists
    const existingEmail = await userModel.findOne({ email });

    //phoneNumber already exists
    const existingPhone = await userModel.findOne({ phoneNumber });

    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    if (existingPhone) {
      return res.status(400).json({ message: "Phone Number already Exists" });
    }

    console.log("before creting line 24");
    // Creating user
    const user = await userModel.create(req.body);

    // Token creation
    const token = user.createJWT();
    return res.status(201).send({
      message: "User Created",
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      next("Invalid username or password");
      return res.status(500).send({ message: "Invalid email or password" });
    }
    // Email Check
    const user = await userModel.findOne({ email });
    if (!user) {
      next("Invalid username or password");
      return res.status(500).send({ message: "Invalid email or password E" });
    }
    // Password Check
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      next("Invalid username or password");
      return res.status(500).send({ message: "Invalid email or password P" });
    }

    // Token Creation
    const token = user.createJWT();
    res
      .status(200)
      .json({ success: true, message: "Login Successfull", user, token });
  } catch (error) {
    next(error);
  }
};
