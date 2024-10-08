import { getUser } from "../controllers/userControllers.js";
import express from "express";
import { updateEmail, togglePremium, deleteUser,getUserStatus,checkIfUserIsPremium } from '../controllers/userControllers.js';

const router = express.Router();

router.get("/getUser", getUser);
router.get('/status', getUserStatus);
router.post('/updateEmail', updateEmail);
router.post('/togglePremium', togglePremium);
router.post('/deleteUser', deleteUser);
router.get('/statusIsPrime', checkIfUserIsPremium);

export default router;
