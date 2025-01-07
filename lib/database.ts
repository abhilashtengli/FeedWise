import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.mongoURL as string);
};

module.exports = connectDB;
