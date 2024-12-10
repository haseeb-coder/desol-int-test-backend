import { Router } from "express";
import VehicleController from "../controller/index.js";
import { upload } from "../../config/s3.js";
import authMiddleware from "../../middleware/auth.js";

const router = Router();
/**
 * @swagger
 * /api/vehicle:
 *   post:
 *     summary: Submit vehicle information
 *     tags: [Vehicle]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user submitting the vehicle information.
 *               carModel:
 *                 type: string
 *                 description: The model of the car.
 *               price:
 *                 type: number
 *                 description: The price of the vehicle.
 *               phone:
 *                 type: string
 *                 description: The phone number for contact.
 *               city:
 *                 type: string
 *                 description: The city where the vehicle is located.
 *               numberOfCopies:
 *                 type: number
 *                 description: Number of copies available Minimum 1, Maximum 10.
 *                 minimum: 1
 *                 maximum: 10
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Array of images for the vehicle.
 *     responses:
 *       200:
 *         description: Successfully uploaded vehicle information.
 *       400:
 *         description: Bad request. Missing or invalid fields.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/",
  authMiddleware,
  upload.array("images", 10),
  VehicleController.submitVehicleInfo
);

export default router;
