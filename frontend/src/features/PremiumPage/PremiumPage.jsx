import React from 'react';
import NewsFeed from '../NYInvestBorsa/NewsFeed.jsx';
import YouTubeLinks from '../YoutubeLinks/YouTubeLinks.jsx';
import StockIndicators from '../NYInvestBorsa/StockIndicators.jsx';
import './PremiumPage.css';

const PremiumPage = () => {
  return (
    <div className="premium-page">
      <div className="youtube-links-container">
        <YouTubeLinks />
      </div>
      <div className="stock-indicators-container">
        <StockIndicators />
      </div>
      <div className="news-feed-container">
        <NewsFeed />
      </div>
    </div>
  );
};

export default PremiumPage;
