import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";
import "./PlanSelectionForm.css";

const PlanSelectionForm = ({
  signUpFormData,
  setSignUpFormData,
  onBack,
  onSubmit,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(
    signUpFormData.isPrime ? "premium" : "free"
  );
  const [creditCard, setCreditCard] = useState(signUpFormData.creditCard || "");
  const [expiryDate, setExpiryDate] = useState(signUpFormData.expiryDate || "");
  const [cvv, setCvv] = useState(signUpFormData.cvv || "");
  const [pressedCard, setPressedCard] = useState(null);

  const isCreditCardValid = (cardNumber) => /^[0-9]{16}$/.test(cardNumber);
  const isExpiryDateValid = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
  const isCvvValid = (cvv) => /^[0-9]{3}$/.test(cvv);

  const isFormValid = () => {
    if (selectedPlan === "premium") {
      return (
        isCreditCardValid(creditCard) &&
        isExpiryDateValid(expiryDate) &&
        isCvvValid(cvv)
      );
    }
    return true;
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    if (plan === "premium") {
      setSignUpFormData({ ...signUpFormData, isPrime: true });
    } else {
      setSignUpFormData({
        ...signUpFormData,
        isPrime: false,
        creditCard: "",
        expiryDate: "",
        cvv: "",
      });
      setCreditCard("");
      setExpiryDate("");
      setCvv("");
    }
  };

  const handleCreditCardChange = (e) => {
    setCreditCard(e.target.value);
    setSignUpFormData({ ...signUpFormData, creditCard: e.target.value });
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
    setSignUpFormData({ ...signUpFormData, expiryDate: e.target.value });
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
    setSignUpFormData({ ...signUpFormData, cvv: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please provide valid credit card details for the premium plan.");
      return;
    }

    const { fullName, email, password, isPrime } = signUpFormData;
    onSubmit({ fullName, email, password, isPrime });
  };

  return (
    <div className="plan-selection-container">
      <div className="plan-selection-header">
        <Typography variant="h3" gutterBottom className="header-text">
          Select Your Plan
        </Typography>
        <div className="header-underline"></div>
      </div>
      <form className="plan-selection-form" onSubmit={handleSubmit}>
        <div className="cards-container">
          <Card
            variant="outlined"
            className={`plan-card ${
              selectedPlan === "free" ? "selected" : ""
            } ${pressedCard === "free" ? "pressed" : ""}`}
            onClick={() => handlePlanChange("free")}
            onMouseDown={() => setPressedCard("free")}
            onMouseUp={() => setPressedCard(null)}
            onMouseLeave={() => setPressedCard(null)}
          >
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                className="plan-title"
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Free
              </Typography>
              <Typography
                variant="h4"
                className="plan-price"
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                $0 / month
              </Typography>
              <ul className="plan-benefits">
                <li>
                  <Typography
                    variant="body2"
                    className="benefit"
                    style={{ fontFamily: "Jost, sans-serif", fontSize: "12px" }}
                  >
                    Basic investment strategies
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body2"
                    className="benefit"
                    style={{ fontFamily: "Jost, sans-serif", fontSize: "12px" }}
                  >
                    Limited market analysis and insights
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body2"
                    className="benefit"
                    style={{ fontFamily: "Jost, sans-serif", fontSize: "12px" }}
                  >
                    Standard portfolio management tools
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body2"
                    className="benefit"
                    style={{ fontFamily: "Jost, sans-serif", fontSize: "12px" }}
                  >
                    Access to community forums
                  </Typography>
                </li>
              </ul>
            </CardContent>

            <CardActions>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handlePlanChange("free")}
                className="plan-button"
              >
                Start Free
              </Button>
            </CardActions>
          </Card>

          <Card
            variant="outlined"
            className={`plan-card ${
              selectedPlan === "premium" ? "selected" : ""
            } ${pressedCard === "premium" ? "pressed" : ""}`}
            onClick={() => handlePlanChange("premium")}
            onMouseDown={() => setPressedCard("premium")}
            onMouseUp={() => setPressedCard(null)}
            onMouseLeave={() => setPressedCard(null)}
          >
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                className="plan-title"
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                Premium
              </Typography>
              <Typography
                variant="h4"
                className="plan-price"
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                $12.99 / month
              </Typography>
              <ul className="plan-benefits">
                <li>
                  <Typography
                    variant="body2"
                    className="benefit"
                    style={{ fontFamily: "Jost, sans-serif", fontSize: "12px" }}
                  >
                    Access to premium investment strategies
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body2"
                    className="benefit"
                    style={{ fontFamily: "Jost, sans-serif", fontSize: "12px" }}
                  >
                    Real-time market analysis and insights
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body2"
                    className="benefit"
                    style={{ fontFamily: "Jost, sans-serif", fontSize: "12px" }}
                  >
                    Personalized portfolio management
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body2"
                    className="benefit"
                    style={{ fontFamily: "Jost, sans-serif", fontSize: "12px" }}
                  >
                    Priority customer support
                  </Typography>
                </li>
              </ul>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handlePlanChange("premium")}
                className="plan-button"
                style={{
                  backgroundColor: "#1E90FF",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Start Premium
              </Button>
            </CardActions>
          </Card>
        </div>

        {selectedPlan === "premium" && (
          <div className="payment-details">
            <TextField
              label="Credit Card Number"
              variant="outlined"
              fullWidth
              value={creditCard}
              onChange={handleCreditCardChange}
              className="payment-field"
              error={!isCreditCardValid(creditCard) && creditCard !== ""}
              helperText={
                !isCreditCardValid(creditCard) && creditCard !== ""
                  ? "Credit card number must be 16 digits."
                  : ""
              }
            />
            <TextField
              label="Expiry Date (MM/YY)"
              variant="outlined"
              fullWidth
              value={expiryDate}
              onChange={handleExpiryDateChange}
              className="payment-field"
              error={!isExpiryDateValid(expiryDate) && expiryDate !== ""}
              helperText={
                !isExpiryDateValid(expiryDate) && expiryDate !== ""
                  ? "Expiry date must be in MM/YY format."
                  : ""
              }
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              value={cvv}
              onChange={handleCvvChange}
              className="payment-field"
              error={!isCvvValid(cvv) && cvv !== ""}
              helperText={
                !isCvvValid(cvv) && cvv !== ""
                  ? "CVV must be 3 digits."
                  : ""
              }
            />
          </div>
        )}

        <div className="form-actions">
          <Button
            variant="outlined"
            onClick={onBack}
            className="back-button"
            style={{
              borderColor: "#1E90FF",
              color: "#1E90FF",
              fontWeight: "bold",
              fontFamily: "Jost, sans-serif",
            }}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="submit-button"
            disabled={!isFormValid()}
            style={{
              backgroundColor: isFormValid() ? "#1E90FF" : "#d3d3d3",
              color: isFormValid() ? "#fff" : "#888",
              fontWeight: "bold",
              fontFamily: "Jost, sans-serif",
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlanSelectionForm;
