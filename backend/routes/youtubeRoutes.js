import express from 'express';
import { getYouTubeVideos } from '../controllers/youtubeControllers.js';

const router = express.Router();

router.get('/videos', getYouTubeVideos);

export default router;