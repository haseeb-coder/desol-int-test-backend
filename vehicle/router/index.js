import { Router } from "express";
import VehicleController from "../controller";
import { array } from "../../config/s3";
import authMiddleware from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  authMiddleware,
  array("images", 10),
  VehicleController.submitVehicleInfo
);

export default router;
