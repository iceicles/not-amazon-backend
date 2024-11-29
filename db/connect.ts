import mongoose from "mongoose";

// connect to mongoDB database
export const connectDB = (url: string) => {
  return mongoose.connect(url); // returns a promise
}