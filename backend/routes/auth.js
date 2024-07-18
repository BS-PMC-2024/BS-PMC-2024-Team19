import express from "express";
const router = express.Router();
import {
  login,
  register,
  logout,
  deleteUserByAdmin,
  checkAuthStatus,
} from "../controllers/authController.js";

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/deleteUserByAdmin", deleteUserByAdmin);
router.get("/status", checkAuthStatus);

export default router;
