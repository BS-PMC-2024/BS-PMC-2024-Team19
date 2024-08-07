// frontend/src/features/YouTube/YouTubeLinks.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YouTubeLinks = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:6500/backend/youtube/videos?query=investing');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching YouTube videos', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>YouTube Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
              {video.snippet.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeLinks;
