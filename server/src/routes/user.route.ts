import express from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { getProfile, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectedRoute, getProfile);
router.put("/update", protectedRoute, updateProfile)

export default router;