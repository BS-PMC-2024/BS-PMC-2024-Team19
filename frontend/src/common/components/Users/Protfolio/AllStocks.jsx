import React, { useEffect, useState } from 'react';
import './AllStocks.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
} from '@mui/material';

function AllStocks() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [riskFilter, setRiskFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]); // Adjust initial range as needed
  const [changeRange, setChangeRange] = useState([-100, 100]); // Adjust initial range as needed

  useEffect(() => {
    fetch('http://localhost:6500/backend/auth/getAllStocks') // Ensure this matches your backend route
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched stocks:', data);
        setStocks(data);
        setFilteredStocks(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = stocks.filter(stock => 
        (riskFilter ? stock.risk_label === riskFilter : true)  &&
        stock.latest_price >= priceRange[0] &&
        stock.latest_price <= priceRange[1] &&
        stock.change_percent >= changeRange[0] &&
        stock.change_percent <= changeRange[1]
      );
      setFilteredStocks(filtered);
    };
    applyFilters();
  }, [riskFilter, priceRange, changeRange, stocks]);

  return (
    <div className="portfolio-container">
      <div className="filter-container">
        <FormControl fullWidth margin="normal">
          <InputLabel id="risk-filter-label">Risk Label</InputLabel>
          <Select
            labelId="risk-filter-label"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            displayEmpty
            label="Risk Label"
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Price Range</InputLabel>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={1000} // Adjust as needed
            step={1}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Change % Range</InputLabel>
          <Slider
            value={changeRange}
            onChange={(e, newValue) => setChangeRange(newValue)}
            valueLabelDisplay="auto"
            min={-100}
            max={100}
            step={1}
          />
        </FormControl>
      </div>

      <TableContainer
        component={Paper}
        className="portfolio-table-container"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">ID</TableCell>
              <TableCell className="table-header">Symbol</TableCell>
              <TableCell className="table-header">Latest Price</TableCell>
              <TableCell className="table-header">Change %</TableCell>
              <TableCell className="table-header">Risk Label</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock, index) => (
                <TableRow key={stock.id || index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{stock.symbol || 'N/A'}</TableCell>
                  <TableCell>
                    {typeof stock.latest_price === 'number'
                      ? `$${stock.latest_price.toFixed(2)}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell
                    className={
                      stock.change_percent > 0
                        ? 'positive-change'
                        : stock.change_percent < 0
                        ? 'negative-change'
                        : ''
                    }
                  >
                    {stock.change_percent > 0 ? '▲' : '▼'} {stock.change_percent}%
                  </TableCell>
                  <TableCell>{stock.risk_label || 'N/A'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No stocks available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AllStocks;
