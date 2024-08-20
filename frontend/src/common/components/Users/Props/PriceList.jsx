import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
} from '@mui/material';
import './PriceList.css';

const PriceList = ({ open, onClose, onConfirm }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [creditCard, setCreditCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCreditCardChange = (e) => {
    setCreditCard(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const isFormValid = () => {
    return (
      creditCard.length === 16 &&
      expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/) &&
      cvv.length === 3
    );
  };

  const handleConfirm = () => {
    if (selectedPlan === "premium" && !isFormValid()) {
      alert("Please enter valid credit card details.");
      return;
    }
    onConfirm(selectedPlan, { creditCard, expiryDate, cvv });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Upgrade to Premium</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Free Plan
                </Typography>
                <Typography variant="h4">$0</Typography>
                <Typography variant="body2">Valid indefinitely</Typography>
                <ul>
                  <li>
                    <Typography variant="body2">
                      <b>Basic</b> charting tools
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      <b>5</b> indicators per chart
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Limited data history
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">Standard support</Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Community forum access
                    </Typography>
                  </li>
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={() => handlePlanSelect("free")}
                >
                  Start Free Plan
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Premium Plan
                </Typography>
                <Typography variant="h4">$18.9/mo</Typography>
                <Typography variant="body2">Billed annually</Typography>
                <Typography variant="body2" color="textSecondary">
                  <s>$24.97</s> - Save 24%
                </Typography>
                <ul>
                  <li>
                    <Typography variant="body2">
                      <b>Advanced</b> charting tools
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      <b>Unlimited</b> indicators per chart
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">Extended data history</Typography>
                  </li>
                  <li>
                    <Typography variant="body2">Priority support</Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Exclusive webinars and tutorials
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">Ad-free experience</Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Access to premium indicators
                    </Typography>
                  </li>
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handlePlanSelect("premium")}
                >
                  Upgrade to Premium
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        {selectedPlan === "premium" && (
          <div className="payment-details">
            <TextField
              label="Credit Card Number"
              variant="outlined"
              fullWidth
              value={creditCard}
              onChange={handleCreditCardChange}
              className="payment-field"
            />
            <TextField
              label="Expiry Date (MM/YY)"
              variant="outlined"
              fullWidth
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="payment-field"
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              type="password"
              value={cvv}
              onChange={handleCvvChange}
              className="payment-field"
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          disabled={selectedPlan === "premium" && !isFormValid()}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceList;
