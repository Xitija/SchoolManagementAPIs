import mongoose, { model } from "mongoose";

const mongoURI = process.env.MONGODB_URI;

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
