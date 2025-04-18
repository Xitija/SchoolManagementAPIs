import mongoose, { model, Schema } from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  contactInformation: {
    email: String,
    phoneNumber: String,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export { Teacher };
