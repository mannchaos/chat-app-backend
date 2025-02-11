import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/log-in", login);
router.get("/log-out", logout);

router.put("/update-profile", protectRoute, updateProfile);

export default router;
