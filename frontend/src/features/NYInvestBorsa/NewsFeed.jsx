import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsFeed.css';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:6500/backend/nyinvestborsa/news');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching news feed', error);
      }
    };

    fetchNews();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? Math.max(0, articles.length - 4) : prevIndex - 4
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 4, articles.length - 4)
    );
  };

  const displayedArticles = articles.slice(currentIndex, currentIndex + 4);

  return (
    <div className="news-feed">
      <h1>News Feed</h1>
      <div className="controls">
        <button onClick={handlePrev}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className="articles-container">
        {displayedArticles.map((article, index) => (
          <Card key={index} className="article-card">
            <CardMedia
              component="img"
              height="140"
              image={article.imageUrl || 'default-image-url.jpg'}
              alt={article.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.description?.split(' ').slice(0, 20).join(' ')}...
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
