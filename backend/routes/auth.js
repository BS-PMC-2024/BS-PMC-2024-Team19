import express from "express";
import {
  register,
  login,
  logout,
  checkAuthStatus,
  clearCookies,
  changePassword,
  deleteUserByAdmin,
  submitQuestionnaire,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/deleteUserByAdmin", deleteUserByAdmin);
router.post("/changePassword", changePassword);
router.get("/status", checkAuthStatus);
router.post("/clear-cookies", clearCookies);
router.post("/submit-questionnaire", submitQuestionnaire);

export default router;
