import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsFeed.css';

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
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? articles.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === articles.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="news-feed">
      <h1>News Feed</h1>
      <div className="controls">
        <button onClick={handlePrev}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className="articles-container">
        {articles.map((article, index) => (
          <div
            key={index}
            className={`article-item ${index === currentIndex ? 'visible' : 'hidden'}`}
          >
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h2>{article.title}</h2>
            </a>
            <p>{article.description?.split(' ').slice(0, 20).join(' ')}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
