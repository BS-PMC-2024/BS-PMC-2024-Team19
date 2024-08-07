import axios from 'axios';

const YOUTUBE_API_KEY = 'AIzaSyDKSUoaj8vKJGEkcjZlBPJjzEqexARNc9Y'; // Replace with your actual YouTube API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export const getYouTubeVideos = async (req, res) => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        q: req.query.query || 'investing',
        maxResults: 10,
        key: YOUTUBE_API_KEY,
      },
    });

    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
};