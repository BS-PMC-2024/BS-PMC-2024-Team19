import React, { useState, useCallback } from "react";
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
} from "@mui/material";
import "./PriceList.css";

const PriceList = ({ open, onClose, onConfirm }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [creditCard, setCreditCard] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({
    creditCard: "",
    expiryDate: "",
    cvv: "",
  });

  const handlePlanSelect = useCallback((plan) => {
    setSelectedPlan(plan);
  }, []);

  const handleInputChange = useCallback((e, setter, formatter) => {
    const value = formatter ? formatter(e.target.value) : e.target.value;
    setter(value);
  }, []);

  const formatCreditCard = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/")
      .trim();
  };

  const formatCvv = (value) => {
    return value.replace(/\D/g, "").slice(0, 3);
  };

  const validateInputs = useCallback(() => {
    const newErrors = { creditCard: "", expiryDate: "", cvv: "" };
    let isValid = true;

    if (selectedPlan === "premium") {
      if (creditCard.replace(/\s+/g, "").length !== 16) {
        newErrors.creditCard = "Credit card number must be 16 digits.";
        isValid = false;
      }

      const [month, year] = expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        newErrors.expiryDate = "Expiry date must be in MM/YY format.";
        isValid = false;
      } else if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
        newErrors.expiryDate = "Month must be between 01 and 12.";
        isValid = false;
      } else if (
        parseInt(year, 10) < currentYear ||
        (parseInt(year, 10) === currentYear &&
          parseInt(month, 10) < currentMonth)
      ) {
        newErrors.expiryDate = "Expiry date must be in the future.";
        isValid = false;
      }

      if (cvv.length !== 3) {
        newErrors.cvv = "CVV must be 3 digits.";
        isValid = false;
      } else if (!/^\d{3}$/.test(cvv)) {
        newErrors.cvv = "CVV must be exactly 3 digits.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [selectedPlan, creditCard, expiryDate, cvv]);

  const handleConfirm = useCallback(() => {
    if (selectedPlan === "premium" && !validateInputs()) {
      return;
    }
    onConfirm(selectedPlan, { creditCard, expiryDate, cvv });
  }, [selectedPlan, validateInputs, creditCard, expiryDate, cvv, onConfirm]);

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
                    <Typography variant="body2">
                      Extended data history
                    </Typography>
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
              onChange={(e) =>
                handleInputChange(e, setCreditCard, formatCreditCard)
              }
              error={!!errors.creditCard}
              helperText={errors.creditCard}
              className="payment-field"
            />
            <TextField
              label="Expiry Date (MM/YY)"
              variant="outlined"
              fullWidth
              value={expiryDate}
              onChange={(e) =>
                handleInputChange(e, setExpiryDate, formatExpiryDate)
              }
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
              className="payment-field"
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              value={cvv}
              onChange={(e) => handleInputChange(e, setCvv, formatCvv)}
              error={!!errors.cvv}
              helperText={errors.cvv}
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
          disabled={selectedPlan === null}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceList;
