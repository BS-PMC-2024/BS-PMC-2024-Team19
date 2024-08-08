import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockIndicators.css';

const StockIndicators = () => {
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const fetchStockIndicators = async () => {
      try {
        const response = await axios.get('http://localhost:6500/backend/nyinvestborsa/stock-indicators');
        if (response.data && Array.isArray(response.data)) {
          setIndicators(response.data.slice(0, 10)); // Get top 10 stock market indices
        } else {
          console.error('Unexpected response format:', response.data);
          setIndicators([]);
        }
      } catch (error) {
        console.error('Error fetching stock indicators', error);
        setIndicators([]);
      }
    };

    fetchStockIndicators();
  }, []);

  return (
    <div className="stock-indicators">
      <h1>Top 10 Stock Market Indices</h1>
      <ul>
        {indicators.map((indicator, index) => (
          <li key={index}>{indicator.symbol}: {indicator.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockIndicators;
