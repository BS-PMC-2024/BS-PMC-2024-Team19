import React, { useState } from "react";
import userEmail from "../../../assets/images/email.png";
import userName from "../../../assets/images/person.png";
import userPass from "../../../assets/images/password.png";
import "./SignUp.css";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import PlanSelectionForm from './PlanSelectionForm';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [signUpFormData, setSignUpFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    isPrime: false,
    creditCard: "",
    expiryDate: "",
    cvv: ""
  });
  const [signUpErrors, setSignUpErrors] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleChange = (e) => {
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newSignUpErrors = [];

    if (!signUpFormData.fullName.trim()) {
      newSignUpErrors.push("Full Name is required");
    }
    if (!signUpFormData.email.trim()) {
      newSignUpErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(signUpFormData.email)) {
      newSignUpErrors.push("Email address is invalid");
    }
    if (!signUpFormData.password.trim()) {
      newSignUpErrors.push("Password is required");
    } else if (signUpFormData.password.length < 6) {
      newSignUpErrors.push("Password must be at least 6 characters long");
    }

    setSignUpErrors(newSignUpErrors);
    return newSignUpErrors.length === 0;
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:6500/backend/auth/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return response.status === 200 && data.message === "Email is available";
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const emailAvailable = await checkEmailExists(signUpFormData.email);
      if (emailAvailable) {
        setStep(2);
      } else {
        setAlertSeverity('error');
        setAlertMessage('An account with this email already exists. Please use a different email.');
      }
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFinalSubmit = async () => {
    if (signUpFormData.isPrime && (!signUpFormData.creditCard.trim() || !signUpFormData.expiryDate.trim() || !signUpFormData.cvv.trim())) {
      setAlertSeverity('error');
      setAlertMessage("Please provide complete credit card details for the premium plan.");
      return;
    }

    if (validateForm()) {
      try {
        console.log('Sending user data:', signUpFormData);

        const response = await fetch('http://localhost:6500/backend/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signUpFormData),
        });

        if (!response.ok) {
          const responseData = await response.json();
          if (response.status === 409) {
            setAlertSeverity('error');
            setAlertMessage(responseData.error || 'User with this email already exists');
          } else {
            setAlertSeverity('error');
            setAlertMessage(`HTTP error! Status: ${response.status}`);
          }
          return;
        }

        setAlertSeverity('success');
        setAlertMessage('User registered successfully!');
        navigate('/login');
      } catch (error) {
        console.error('Error:', error.message);
        setAlertSeverity('error');
        setAlertMessage(error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      {step === 1 && (
        <>
          <div className="signup-header">
            <div className="signup-text">Sign Up</div>
            <div className="signup-underline"></div>
          </div>
          <form className="signup-inputs" onSubmit={handleNext}>
            <div className="signup-input">
              <img src={userName} alt="User Name" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={signUpFormData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="signup-input">
              <img src={userEmail} alt="User Email" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signUpFormData.email}
                onChange={handleChange}
              />
            </div>
            <div className="signup-input">
              <img src={userPass} alt="User Password" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={signUpFormData.password}
                onChange={handleChange}
              />
              {showPassword ? (
                <IoMdEye className="password-toggle" onClick={togglePasswordVisibility} />
              ) : (
                <IoMdEyeOff className="password-toggle" onClick={togglePasswordVisibility} />
              )}
            </div>
            {signUpErrors.length > 0 && (
              <div className="signup-errors">
                {signUpErrors.map((error, index) => (
                  <p key={index} className="error-text">
                    {error}
                  </p>
                ))}
              </div>
            )}
            {alertMessage && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={alertSeverity} sx={{ fontSize: '1.2rem' }}>
                  {alertMessage}
                </Alert>
              </Stack>
            )}
            <div className="signup-submit-container">
              <button className="signup-submit" type="submit">
                Agree & Continue
              </button>
            </div>
          </form>
        </>
      )}

      {step === 2 && (
        <PlanSelectionForm
          signUpFormData={signUpFormData}
          setSignUpFormData={setSignUpFormData}
          onBack={handleBack}
          onSubmit={handleFinalSubmit}
        />
      )}
    </div>
  );
};

export default SignUp;
