import express from "express";
const router = express.Router();
import { Teacher } from "../models/teacher.model.js";

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The teacher ID
 *     responses:
 *       200:
 *         description: Teacher found
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Failed to fetch teacher
 */
router.get("/:id", async (req, res) => {
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

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     tags:
 *       - Teachers
 *     responses:
 *       200:
 *         description: A list of teachers
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags:
 *       - Teachers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               subject:
 *                 type: string
 *               contactInformation:
 *                 type: string
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
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

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Update a teacher by ID
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The teacher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Server error
 */
router.put("/:id", async (req, res) => {
  const teacherId = req.params.id;
  const updateTeacherData = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updateTeacherData,
      { new: true }
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

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Delete a teacher by ID
 *     tags:
 *       - Teachers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The teacher ID
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", async (req, res) => {
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

export default router;
