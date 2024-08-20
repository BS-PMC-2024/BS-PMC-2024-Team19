// backend/controllers/nyInvestBorsaController.js
import axios from 'axios';

const NEWS_API_KEY = 'e1b70901ff6441ee90f859efdd23e96d'; // Replace with your actual News API key
const FINNHUB_API_KEY = 'cr1rhmpr01qnqk1bgckgcr1rhmpr01qnqk1bgcl0';
//const MARKETSTACK_API_KEY = '709120b1f7150fbba37a19d8f97b579e'; // Replace with your actual MarketStack API key
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const FINNHUB_API_URL = 'https://finnhub.io/api/v1/quote';
const STOCKS = [
  'NVDA', 'TSLA', 'AMD', 'AAPL', 'MSFT', 'AMZN', 'META',
  'SMCI', 'AVGO', 'GOOG', 'NFLX', 'PLTR', 'MCD', 'XOM',
  'ASTS', 'JMP'
];

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
    const stockResponses = await Promise.all(
      STOCKS.map(stock =>
        axios.get(FINNHUB_API_URL, {
          params: {
            symbol: stock,
            token: FINNHUB_API_KEY,
          },
        })
      )
    );

    const stockData = stockResponses.map((response, index) => {
      const data = response.data;

      return {
        name: STOCKS[index],
        currentPrice: data.c, // Current price
        changePercent: ((data.c - data.o) / data.o * 100).toFixed(2), // Percentage change
      };
    });
    console.log('Stock Data:', stockData); // Log to verify data
    res.json(stockData);
  } catch (error) {
    console.error('Error fetching stock data from Finnhub:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};


