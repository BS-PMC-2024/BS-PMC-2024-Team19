// backend/routes/nyInvestBorsaRoutes.js
import express from 'express';
import { getNewsFeed, getStockIndicators,getTopStocks } from '../controllers/nyInvestBorsaController.js';

const router = express.Router();

router.get('/news', getNewsFeed);
router.get('/stocks', getStockIndicators);
router.get('/top-stocks', getStockIndicators);


export default router;
