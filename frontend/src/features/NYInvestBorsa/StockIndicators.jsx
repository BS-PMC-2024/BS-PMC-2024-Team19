// frontend/src/features/NYInvestBorsa/StockIndicators.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockIndicators = () => {
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const fetchStockIndicators = async () => {
      try {
        const response = await axios.get('http://localhost:6500/backend/nyinvestborsa/stocks');
        setIndicators(response.data);
      } catch (error) {
        console.error('Error fetching stock indicators', error);
      }
    };

    fetchStockIndicators();
  }, []);

  return (
    <div>
      <h1>Stock Indicators</h1>
      <ul>
        {indicators.map((indicator) => (
          <li key={indicator.symbol}>
            {indicator.symbol}: {indicator.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockIndicators;
