import axios from "axios";
import { db } from "../db/connect.js";

const API_KEY = "O9Z7GEV3SXGQN8FR";

const STOCK_SYMBOLS = [
  "IBM",
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "NVDA",
  "BRK.B",
  "UNH",
  "V",
  "JPM",
  "MA",
  "HD",
  "DIS",
  "PYPL",
  "NFLX",
  "ADBE",
  "INTC",
  "CSCO",
  "CRM",
  "PFE",
  "MRK",
  "BABA",
  "BA",
  "WMT",
  "T",
  "KO",
];

const getRiskLabel = (symbol) => {
  switch (symbol) {
    case "AAPL":
    case "MSFT":
    case "GOOGL":
    case "BRK.B":
    case "UNH":
    case "V":
    case "JPM":
    case "MA":
    case "HD":
    case "DIS":
    case "PYPL":
    case "CRM":
      return "B"; // Moderate-risk

    case "AMZN":
    case "TSLA":
    case "META":
    case "NVDA":
    case "NFLX":
    case "ADBE":
    case "INTC":
    case "BABA":
      return "A"; // High-risk

    case "IBM":
    case "KO":
    case "T":
    case "WMT":
    case "MCD":
    case "CSCO":
    case "PFE":
    case "MRK":
      return "C"; // Low-risk

    default:
      return "C"; // Default to Low-risk if not specified
  }
};

export const fetchStockData = async () => {
  for (const SYMBOL of STOCK_SYMBOLS) {
    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${API_KEY}&outputsize=full&datatype=json`;
      const response = await axios.get(url);
      console.log(`Full API Response Data for ${SYMBOL}:`, response.data);

      const data = response.data;

      if (data["Error Message"]) {
        console.error(
          `API Error Message for ${SYMBOL}:`,
          data["Error Message"]
        );
        continue;
      }

      const timeSeries = data["Time Series (Daily)"];
      if (!timeSeries) {
        console.error(`No time series data found for symbol: ${SYMBOL}`);
        continue;
      }

      const latestDate = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestDate];
      const {
        "1. open": open,
        "2. high": high,
        "3. low": low,
        "4. close": close,
        "5. volume": volume,
      } = latestData;

      const changePercent = (
        ((parseFloat(close) - parseFloat(open)) / parseFloat(open)) *
        100
      ).toFixed(2);

      const riskLabel = getRiskLabel(SYMBOL);

      const query = `
        UPDATE stocks 
        SET 
            latest_price = ?, 
            change_percent = ?, 
            market_close_time = ?, 
            risk_label = ? 
        WHERE symbol = ?;
      `;

      db.query(
        query,
        [close, changePercent, latestDate, riskLabel, SYMBOL],
        (err, result) => {
          if (err) {
            console.error(`Error updating stock data for ${SYMBOL}:`, err);
          } else if (result.affectedRows === 0) {
            console.log(
              `Stock symbol ${SYMBOL} does not exist in the database. No update performed.`
            );
          } else {
            console.log(
              `Successfully updated stock data for ${SYMBOL} on ${latestDate} with risk label ${riskLabel}`
            );
          }
        }
      );
    } catch (error) {
      console.error(`Error fetching data for ${SYMBOL}:`, error);
    }
  }
};

fetchStockData();
