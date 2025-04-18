import express from "express";
const router = express.Router();
import { Student } from "../models/student.model.js";

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.status(200).json({ message: "Student found", student });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const { name, age, grade, gender, marks, attendance } = req.body;

  try {
    const student = new Student({
      name,
      age,
      grade,
      attendance,
      marks,
      gender,
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const studentId = req.params.id;
  const updateStudentData = req.body;

  try {
    let updatedStudent = {};
    // if (updateStudentData?.attendance?.length) {
    //   updatedStudent = await Student.findByIdAndUpdate(
    //     studentId,
    //     { $push: { attendance: updateStudentData.attendance } },
    //     { new: true },
    //   );
    // }
    updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateStudentData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
