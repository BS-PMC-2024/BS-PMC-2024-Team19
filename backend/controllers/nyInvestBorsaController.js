// backend/controllers/nyInvestBorsaController.js
import axios from 'axios';

const NEWS_API_KEY = 'e1b70901ff6441ee90f859efdd23e96d'; // Replace with your actual News API key
const STOCK_API_KEY = 'F21W9G4WI4JZF0P0'; // Replace with your actual Stock API key

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const STOCK_API_URL = 'https://www.alphavantage.co/query';
export const getNewsFeed = async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        category: 'business',
        country: 'us',
        apiKey: NEWS_API_KEY,
      },
    });

    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news feed' });
  }
};

export const getStockIndicators = async (req, res) => {
  try {
    const response = await axios.get(STOCK_API_URL, {
      params: {
        symbols: req.query.symbols || 'AAPL,GOOGL,MSFT',
        apiKey: STOCK_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock indicators' });
  }
};
