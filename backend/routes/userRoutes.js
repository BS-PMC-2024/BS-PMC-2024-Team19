import { getUser } from "../controllers/userControllers.js";
import express from "express";

const router = express.Router();

router.get("/getUser", getUser);

export default router;
