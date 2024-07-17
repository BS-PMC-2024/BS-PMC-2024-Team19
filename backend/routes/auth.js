import express from "express";
const router = express.Router();
import {
  login,
  register,
  logout,
  deleteUserByAdmin,
} from "../controllers/authController.js";

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/deleteUserByAdmin", deleteUserByAdmin);

export default router;
