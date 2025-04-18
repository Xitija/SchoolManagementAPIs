import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("Mongo URI is not defined. Please check your environment variables.");
}
const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      dbName: "SchoolManagement",
    });
    if (connection) {
      console.log("Connected Successfully");
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export { initializeDatabase };
