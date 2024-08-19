import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './YouTubeLinks.css';

const YouTubeLinks = () => {
  const [videos, setVideos] = useState([]);
  const videoListRef = useRef(null);

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

  const scroll = (direction) => {
    const { current } = videoListRef;
    if (current) {
      const scrollAmount = current.offsetWidth / 4; // Adjust scroll amount based on the number of items visible
      current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="youtube-links">
      <h1>YouTube Videos</h1>
      {/* <div className="controls">
        <button onClick={() => scroll(-1)}>&lt;</button>
        <button onClick={() => scroll(1)}>&gt;</button>
      </div> */}
      <div className="video-list" ref={videoListRef}>
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <h3>{video.snippet.title}</h3>
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeLinks;
