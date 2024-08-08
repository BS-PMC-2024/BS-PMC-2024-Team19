import React, { useState } from 'react';
import { Button, Typography, Grid, Card, CardContent, CardActions, TextField } from '@mui/material';
import './SignUp.css'; // Importing the same CSS file for consistent styling

const PlanSelectionForm = ({ signUpFormData, setSignUpFormData, onBack, onSubmit }) => {
  const [selectedPlan, setSelectedPlan] = useState(signUpFormData.isPrime ? 'premium' : 'free');
  const [creditCard, setCreditCard] = useState(signUpFormData.creditCard || '');
  const [expiryDate, setExpiryDate] = useState(signUpFormData.expiryDate || '');
  const [cvv, setCvv] = useState(signUpFormData.cvv || '');

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    if (plan === 'premium') {
      setSignUpFormData({ ...signUpFormData, isPrime: true });
    } else {
      setSignUpFormData({ ...signUpFormData, isPrime: false, creditCard: '', expiryDate: '', cvv: '' });
      setCreditCard('');
      setExpiryDate('');
      setCvv('');
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
    if (selectedPlan === 'premium' && (!creditCard.trim() || !expiryDate.trim() || !cvv.trim())) {
      alert("Please provide complete credit card details for the premium plan.");
      return;
    }

    // Only include necessary fields
    const { fullName, email, password, isPrime } = signUpFormData;
    onSubmit({ fullName, email, password, isPrime });
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <Typography variant="h5" gutterBottom style={{ fontFamily: 'Jost, sans-serif', fontWeight: 'bold',fontSize: '25px' }}>
          Select Your Plan
        </Typography>
        <div className="signup-underline"></div>
      </div>
      <form className="signup-inputs" onSubmit={handleSubmit}>
        <Grid container spacing={12}>
          <Grid item xs={12} md={6} >
            <Card
              variant="outlined"
              className={`plan-card ${selectedPlan === 'free' ? 'selected' : ''}`}
              style={{ transform: selectedPlan === 'free' ? 'scale(1.05)' : 'scale(0.95)',width: '140%' }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ fontFamily: 'Jost, sans-serif', fontWeight: 'bold',fontSize: '18px' }}>
                  Free Plan
                </Typography>
                <Typography variant="h4" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>$0</Typography>
                <Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Valid indefinitely</Typography>
                <ul>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}><b>Basic</b> charting tools</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}><b>5</b> indicators per chart</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Limited data history</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Standard support</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Community forum access</Typography></li>
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="outlined"  onClick={() => handlePlanChange('free')} style={{ fontFamily: 'Jost, sans-serif' }}>
                  Start Free Plan
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              variant="outlined"
              className={`plan-card ${selectedPlan === 'premium' ? 'selected' : ''}`}
              style={{ transform: selectedPlan === 'premium' ? 'scale(1.05)' : 'scale(0.95)',width:'160%' }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ fontFamily: 'Jost, sans-serif', fontWeight: 'bold',fontSize: '18px' }}>
                  Premium Plan
                </Typography>
                <Typography variant="h4" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>$18.9/mo</Typography>
                <Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Billed annually</Typography>
                <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}><s>$24.97</s> - Save 24%</Typography>
                <ul>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}><b>Advanced</b> charting tools</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}><b>Unlimited</b> indicators per chart</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Extended data history</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Priority support</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Exclusive webinars and tutorials</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Ad-free experience</Typography></li>
                  <li><Typography variant="body2" style={{ fontFamily: 'Jost, sans-serif',fontSize: '13px' }}>Access to premium indicators</Typography></li>
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" color="primary" onClick={() => handlePlanChange('premium')} style={{ fontFamily: 'Jost, sans-serif' }}>
                  Upgrade to Premium
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {selectedPlan === 'premium' && (
          <div className="signup-credit-card">
            <TextField
              type="text"
              label="Credit Card Number"
              value={creditCard}
              onChange={handleCreditCardChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { fontFamily: 'Jost, sans-serif' } }}
              InputProps={{ style: { fontFamily: 'Jost, sans-serif' } }}
            />
            <TextField
              type="text"
              label="Expiry Date (MM/YY)"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { fontFamily: 'Jost, sans-serif' } }}
              InputProps={{ style: { fontFamily: 'Jost, sans-serif' } }}
            />
            <TextField
              type="text"
              label="CVV"
              value={cvv}
              onChange={handleCvvChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { fontFamily: 'Jost, sans-serif' } }}
              InputProps={{ style: { fontFamily: 'Jost, sans-serif' } }}
            />
          </div>
        )}

        <div className="signup-submit-container">
          <Button className="signup-submit signup-gray" onClick={onBack} style={{ fontFamily: 'Jost, sans-serif' }}>
            Back
          </Button>
          <Button type="submit" className="signup-submit" variant="contained" color="primary" style={{ fontFamily: 'Jost, sans-serif' }}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlanSelectionForm;
