import express from "express";
import cors from "cors";
import swagger from "./swagger.js";
import { initializeDatabase } from "./db/db.connection.js";
import healthRoute from "./routes/health.js";
import studentRoute from "./routes/students.js";
import teacherRoute from "./routes/teachers.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use('/health', healthRoute);
app.use("/students", studentRoute);
app.use("/teachers", teacherRoute);
app.use('/api-docs', swagger.swaggerUi.serve, swagger.swaggerUi.setup(swagger.swaggerDocs));

initializeDatabase();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Returns a welcome message for the School Management API
 *     responses:
 *       200:
 *         description: Welcome message
 */
app.get("/", (req, res) => {
  res.send("School Management APIs!");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
