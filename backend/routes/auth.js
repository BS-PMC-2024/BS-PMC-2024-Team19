import express from "express";
import {
  register,
  login,
  logout,
  checkAuthStatus,
  clearCookies,
  changePassword,
  deleteUserByAdmin,
  getAllUsers,
  updateUserStatus,
  submitQuestionnaire,
  getUserEmail,
  submitHelpRequest,
  getUserProfile,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/deleteUserByAdmin", deleteUserByAdmin);
router.post("/changePassword", changePassword);
router.get("/status", checkAuthStatus);
router.post("/clear-cookies", clearCookies);
router.get("/getAllUsers", getAllUsers);
router.post("/updateUserStatus", updateUserStatus);
router.post("/submit-questionnaire", submitQuestionnaire);
router.get("/getUserEmail", getUserEmail);
router.post("/helpRequest", submitHelpRequest);
router.get("/getUserProfile", getUserProfile);

export default router;
