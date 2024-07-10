import { getUser } from '../controllers/userControllers';

const express  = require('express');
const router = express.Router();


router.get('/find/:userId',getUser)


export default router;
