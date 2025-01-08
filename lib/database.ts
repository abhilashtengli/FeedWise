import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Connection is ready");
    return true;
  }
  try {
    await mongoose.connect(process.env.mongoURL as string);
    console.log("Connection is successfully established");
  } catch (err) {
    console.log("Something went wrong Database connection failed : " + err);
    process.exit();
  }
};

module.exports = connectDB;
