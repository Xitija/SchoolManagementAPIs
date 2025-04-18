import express from "express";
const router = express.Router();
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Check the health status of the application
 *     responses:
 *       200:
 *         description: Application is healthy
 */
router.get('/', (req, res) => {
  res.status(200).send({ status: 'healthy' });
});

export default router;
