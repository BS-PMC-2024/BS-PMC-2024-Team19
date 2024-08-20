import React, { useEffect, useState } from 'react';
import './PopularStockReport.css';

function PopularStockReport() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6500/backend/auth/getPopularStocks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched stocks:', data);
        setStocks(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="stock-container">
      {stocks.length > 0 ? (
        stocks.map((stock) => (
          <div key={stock.id} className="stock-item">
            <div className="stock-symbol">
              {stock.symbol}
            </div>
            <div className="stock-price">
              ${stock.latest_price} {/* Added dollar sign */}
            </div>
            <div
              className={`stock-change ${stock.change_percent > 0 ? 'positive' : 'negative'}`}
            >
              {stock.change_percent > 0 ? '▲' : '▼'} {stock.change_percent}%
            </div>
          </div>
        ))
      ) : (
        <p>No stocks available</p>
      )}
    </div>
  );
}

export default PopularStockReport;

