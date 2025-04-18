import mongoose, { model, Schema } from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  marks: Number,
  attendance: Number,
  // [{ status: String, date: Date }],
  grade: String,
});

const Student = mongoose.model("Student", studentSchema);

export { Student };
