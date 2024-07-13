import mongoose from "mongoose";
import colors from "colors";
// Config Dotenv

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to Mongo DB Database ${process.env.MONGO_URL}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`MongoDB Error ${error}`.bgRed.white);
  }
};

export default connectDB;
