// frontend/src/features/PremiumPage/PremiumPage.jsx
//import React, { useContext, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import NewsFeed from '../NYInvestBorsa/NewsFeed.jsx';
import YouTubeLinks from '../YoutubeLinks/YouTubeLinks.jsx';
import StockIndicators from '../NYInvestBorsa/StockIndicators.jsx';
//import UserContext from '../../context/UserContext'; // Assume you have a UserContext
import './PremiumPage.css';

const PremiumPage = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user || !user.isPremium) {
//       navigate('/'); // Redirect to home if the user is not premium
//     }
//   }, [user, navigate]);

  return (
    <div className="premium-page">
      <div className="news-feed-container">
        <NewsFeed />
      </div>
      <div className="main-content">
        <div className="youtube-links-container">
          <YouTubeLinks />
        </div>
        <div className="stock-indicators-container">
          <StockIndicators />
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
