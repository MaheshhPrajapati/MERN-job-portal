const errorMiddleware = (err, req, res, next) => {
  console.log(err.message, "LLLLLLLLLL", err.status);
  res.status(505).send({
    message: "international serror",
    success: false,
    err,
  });
};

export default errorMiddleware;
