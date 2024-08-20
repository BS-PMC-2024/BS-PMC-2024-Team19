import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";

const StockIndicators = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetching stocks data from the backend
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6500/backend/nyinvestborsa/stocks"
        );
        setStocks(response.data); // Assuming data is an array of stock info
      } catch (error) {
        console.error("Error fetching stocks", error);
      }
    };
    fetchStocks();
  }, []);

  // Function to generate company logo URL (using Clearbit API as an example)
  const getCompanyLogo = (symbol) => {
    const logoUrl = `https://logo.clearbit.com/${symbol.toLowerCase()}.com`;
    return logoUrl;
  };

  // Placeholder image URL
  const placeholderImage = "https://via.placeholder.com/40?text=Logo";

  // Function to determine color based on percentage change
  const getChangeColor = (changePercent) =>
    changePercent > 0 ? "green" : "red";

  return (
    <Box className="highest-volume-stocks">
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Top Ranked Stocks
      </Typography>
      <Grid container spacing={2}>
        {stocks.slice(0, 15).map((stock, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="stock-card">
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <Avatar
                    src={getCompanyLogo(stock.name)}
                    alt={`${stock.name} logo`}
                    onError={(e) => {
                      e.target.src = placeholderImage;
                    }} // Use placeholder on error
                    sx={{ marginRight: 2 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      {stock.name}
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", ml: 2, fontSize: "1.5rem" }}
                      >
                        ${stock.currentPrice}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: getChangeColor(stock.changePercent),
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                    >
                      {stock.changePercent}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StockIndicators;
