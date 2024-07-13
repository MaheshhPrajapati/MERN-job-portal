import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("inside auth middlware");
  //console.log(req.headers,"LLLLL");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next("Auth failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    console.error("nside try");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    console.error(error.message)
    if(error.message == "jwt expired"){
      console.log("gotcha inside")
      next("JWT Token Expired")
      return res.status(300).json({message:"JWT Token Expired"});
    }
    next("Auth failed");
  }
};

export default userAuth;
