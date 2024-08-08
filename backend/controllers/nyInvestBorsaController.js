// backend/controllers/nyInvestBorsaController.js
import axios from 'axios';

const NEWS_API_KEY = 'e1b70901ff6441ee90f859efdd23e96d'; // Replace with your actual News API key
const STOCK_API_KEY = 'NYRD0V2YY5SGHT5J'; // Replace with your actual Stock API key

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const STOCK_API_URL = 'https://www.alphavantage.co/query';
const INDICES = ['^DJI', '^GSPC', '^IXIC', '^RUT', '^FTSE', '^N225', '^HSI', '^SSEC', '^STOXX50E', '^VIX'];

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
    const responses = await Promise.all(INDICES.map(symbol =>
      axios.get(STOCK_API_URL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: STOCK_API_KEY,
        },
      })
    ));
    
    const indicators = responses.map(response => {
      const data = response.data['Global Quote'];
      return {
        symbol: data['01. symbol'],
        price: data['05. price'],
      };
    });

    res.json(indicators);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock indicators' });
  }
};
