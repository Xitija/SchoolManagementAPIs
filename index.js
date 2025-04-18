import express from "express";
import cors from "cors";
import { initializeDatabase } from "./db/db.connection.js";
import { Student } from "./models/student.model.js";
import { Teacher } from "./models/teacher.model.js";
const app = express();

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("School Management APIs!");
});

app.get("/students/:id", async (req, res) => {
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

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/students", async (req, res) => {
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

app.put("/students/:id", async (req, res) => {
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
      { new: true },
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

app.delete("/students/:id", async (req, res) => {
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

app.get("/teachers/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      res.status(200).json({ message: "Teacher found", teacher });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch Teacher" });
  }
});

app.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/teachers", async (req, res) => {
  const { name, subject, contactInformation } = req.body;

  try {
    const teacher = new Teacher({
      name,
      subject,
      contactInformation,
    });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/teachers/:id", async (req, res) => {
  const teacherId = req.params.id;
  const updateTeacherData = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updateTeacherData,
      { new: true },
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/teachers/:id", async (req, res) => {
  const teacherId = req.params.id;

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher deleted successfully",
      teacher: deletedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
