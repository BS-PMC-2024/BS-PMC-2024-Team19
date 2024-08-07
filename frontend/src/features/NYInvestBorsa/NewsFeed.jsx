// frontend/src/features/NYInvestBorsa/NewsFeed.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>News Feed</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
