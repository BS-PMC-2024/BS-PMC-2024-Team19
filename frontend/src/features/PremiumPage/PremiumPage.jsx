import React from 'react';
import NewsFeed from '../NYInvestBorsa/NewsFeed.jsx';
import YouTubeLinks from '../YoutubeLinks/YouTubeLinks.jsx';
import StockIndicators from '../NYInvestBorsa/StockIndicators.jsx';
import TopRankedStocks from '../NYInvestBorsa/TopRankedStocks.jsx'; // Import the new component
import { Box } from '@mui/material';
import './PremiumPage.css';

const PremiumPage = () => {
  return (
    <Box className="premium-page" sx={{ padding: 3 }}>
      <Box className="youtube-links-container" sx={{ marginBottom: 3 }}>
        <YouTubeLinks />
      </Box>
      <Box className="stock-indicators-container" sx={{ marginBottom: 3 }}>
        <StockIndicators />
      </Box>

      <Box className="news-feed-container">
        <NewsFeed />
      </Box>
    </Box>
  );
};

export default PremiumPage;
