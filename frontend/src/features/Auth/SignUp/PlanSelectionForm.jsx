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

  const [errors, setErrors] = useState({
    creditCard: "",
    expiryDate: "",
    cvv: "",
  });

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

  const validateInputs = () => {
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
  };

  const handleInputChange = (e, setter, formatter) => {
    const formattedValue = formatter
      ? formatter(e.target.value)
      : e.target.value;
    setter(formattedValue);
    setSignUpFormData({ ...signUpFormData, [e.target.name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

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
                    Advanced portfolio management tools
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body2"
                    className="benefit"
                    style={{ fontFamily: "Jost, sans-serif", fontSize: "12px" }}
                  >
                    Priority support and consultation
                  </Typography>
                </li>
              </ul>
            </CardContent>

            <CardActions>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handlePlanChange("premium")}
                className="plan-button"
              >
                Start Premium
              </Button>
            </CardActions>
          </Card>
        </div>

        {selectedPlan === "premium" && (
          <div className="payment-info">
            <TextField
              label="Credit Card Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="creditCard"
              value={creditCard}
              onChange={(e) =>
                handleInputChange(e, setCreditCard, formatCreditCard)
              }
              error={!!errors.creditCard}
              helperText={errors.creditCard}
            />
            <TextField
              label="Expiry Date (MM/YY)"
              variant="outlined"
              fullWidth
              margin="normal"
              name="expiryDate"
              value={expiryDate}
              onChange={(e) =>
                handleInputChange(e, setExpiryDate, formatExpiryDate)
              }
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
            />
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              margin="normal"
              name="cvv"
              value={cvv}
              onChange={(e) => handleInputChange(e, setCvv, formatCvv)}
              error={!!errors.cvv}
              helperText={errors.cvv}
            />
          </div>
        )}

        <div className="form-actions">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="submit-button"
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onBack}
            className="back-button"
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlanSelectionForm;