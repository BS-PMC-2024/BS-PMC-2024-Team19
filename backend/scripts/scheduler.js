import cron from "node-cron";
import { fetchStockData } from "./fetchStockData.js";

// Schedule the fetchStockData function to run daily at 9 AM Israel time
cron.schedule(
  "0 9 * * *",
  () => {
    console.log("Running stock data fetch job...");
    fetchStockData()
      .then(() => console.log("Stock data fetched successfully."))
      .catch((err) => console.error("Error fetching stock data:", err));
  },
  {
    timezone: "Asia/Jerusalem", // Set timezone to Israel
  }
);

console.log(
  "Scheduler script started. Cron job is set to run daily at 9 AM Israel time."
);
