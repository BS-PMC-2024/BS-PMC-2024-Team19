import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Card, CardContent, Avatar, Typography } from '@mui/material';

const TopRankedStocks = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:6500/backend/nyinvestborsa/stocks');
        setStocks(response.data); // Assuming data is an array of stock info
      } catch (error) {
        console.error('Error fetching stocks', error);
      }
    };
    fetchStocks();
  }, []);

  const getCompanyLogo = (symbol) => `https://logo.clearbit.com/${symbol.toLowerCase()}.com`;

  const getChangeColor = (changePercent) => (changePercent > 0 ? 'green' : 'red');

  return (
    <Box className="top-ranked-stocks">
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Top Ranked Stocks</Typography>
      <Grid container spacing={2}>
        {stocks.slice(0, 15).map((stock, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Card className="stock-card" sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
              <Avatar
                src={getCompanyLogo(stock.name)}
                alt={`${stock.name} logo`}
                sx={{ marginRight: 2 }}
              />
              <CardContent>
                <Typography variant="h6">{stock.name}</Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  ${stock.currentPrice}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: getChangeColor(stock.changePercent), fontWeight: 'bold' }}
                >
                  {stock.changePercent}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopRankedStocks;
