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
  checkEmailExists,
  getAllQuestions,
  updateQuestions,
} from "../controllers/authController.js";

const router = express.Router();

// פעולות משתמש
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/deleteUserByAdmin", deleteUserByAdmin);
router.post("/changePassword", changePassword);
router.get("/status", checkAuthStatus);
router.post("/clear-cookies", clearCookies);
router.post("/check-email", checkEmailExists);
router.get("/getAllUsers", getAllUsers);
router.post("/updateUserStatus", updateUserStatus);
router.post("/submit-questionnaire", submitQuestionnaire);
router.get("/getUserEmail", getUserEmail);
router.post("/helpRequest", submitHelpRequest);
router.get("/getUserProfile", getUserProfile);
router.get("/getAllQuestions", getAllQuestions);
router.post("/updateQuestions", updateQuestions);

export default router;
