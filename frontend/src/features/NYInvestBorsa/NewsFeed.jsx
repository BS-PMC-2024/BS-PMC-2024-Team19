import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsFeed.css';
import { Card, CardContent, Typography } from '@mui/material';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

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

  const scrollContainerRef = React.createRef();

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust the value based on how much you want to scroll
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust the value based on how much you want to scroll
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="news-feed">
      <h1>News Feed</h1>
      <div className="controls">
        <button className="nav-button prev" onClick={handlePrev}>&lt;</button>
        <div className="articles-container" ref={scrollContainerRef}>
          {articles.map((article, index) => (
            <Card key={index} className="article-card">
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
        <button className="nav-button next" onClick={handleNext}>&gt;</button>
      </div>
    </div>
  );
};

export default NewsFeed;
