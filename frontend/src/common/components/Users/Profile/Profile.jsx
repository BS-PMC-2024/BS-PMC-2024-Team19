import React, { useState,useEffect } from 'react';
import { Container, Box, Card, CardContent, CardActions, Button, Typography, TextField, IconButton,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PriceList from '../Props/PriceList';
import './Profile.css'; // Ensure this import is added

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [priceListOpen, setPriceListOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's current premium status when the component mounts
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get('http://localhost:6500/backend/user/status', { withCredentials: true });
        setIsPremium(response.data.isPremium);
      } catch (error) {
        console.error('Error fetching user status:', error);
      }
    };

    fetchUserStatus();
  }, []);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDeleteConfirmation('');
  };
  const handleUpdateEmail = async () => {
    try {
      await axios.post('http://localhost:6500/backend/user/updateEmail', { email }, { withCredentials: true });
      alert('Email updated successfully');
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };
//change function to vetura fucntion
  const handleUpdatePassword = async () => {
    try {
      await axios.post('http://localhost:6500/backend/user/updatePassword', { password }, { withCredentials: true });
      alert('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleTogglePremium = async () => {
    try {
      const newIsPremium = !isPremium; // Toggle the current value
      setIsPremium(newIsPremium); // Update the state
      await axios.post('http://localhost:6500/backend/user/togglePremium', { isPremium: newIsPremium }, { withCredentials: true });
      alert('User status updated successfully');
      console.log("User isPrime updated");
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (deleteConfirmation !== 'DELETE') {
      alert('You must type DELETE to confirm');
      return;
    }

    try {
      await axios.post('http://localhost:6500/backend/user/deleteUser', {}, { withCredentials: true });
      await axios.post(
        "http://localhost:6500/backend/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      alert('User deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
    const handleOpenPriceList = () => {
    setPriceListOpen(true);
  };

  const handleClosePriceList = () => {
    setPriceListOpen(false);
  };

  const handleConfirmPriceList = () => {
    handleClosePriceList();
    handleTogglePremium();
  };

  return (
    <Container className="container">
      <Box mt={15}>
        <Card className="profile-card">
          <CardContent>
            <Typography variant="h5" component="div" className="text-capitalize">User Profile</Typography>
            <Box mt={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-field"
              />
              <Button variant="contained" color="primary" onClick={handleUpdateEmail} sx={{ mt: 2 }} className="btn btn-blue">Update Email</Button>
            </Box>

            <Box mt={2}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-field"
              />
              <Button variant="contained" color="primary" onClick={handleUpdatePassword} sx={{ mt: 2 }} className="btn btn-blue">Update Password</Button>
            </Box>

            <Box mt={2}>
              {isPremium ? (
                <>
                  <Typography variant="body1" component="div" className="text-capitalize">
                    You are a premium user. You can cancel your premium membership below.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleTogglePremium} sx={{ mt: 2 }} className="btn btn-blue">Cancel Premium</Button>
                </>
              ) : (
                <>
                  <Typography variant="body1" component="div" className="text-capitalize">
                    Upgrade to Premium to unlock all features and enjoy a seamless investing experience.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleOpenPriceList} sx={{ mt: 2 }} className="btn btn-blue">Upgrade to Premium</Button>
                </>
              )}
            </Box>
          </CardContent>
          <CardActions>
            <IconButton aria-label="delete" color="error" onClick={handleOpenDialog} className="icon-button">
              <DeleteIcon />
              <Typography className="text-capitalize">Delete Account</Typography>
            </IconButton>
            <Dialog open={open} onClose={handleCloseDialog}>
              <DialogTitle className="text-capitalize">Delete Account</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete your account? This action cannot be undone. Please type DELETE to confirm.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Type DELETE to confirm"
                  fullWidth
                  variant="standard"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="text-field"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary" className="btn btn-blue">Cancel</Button>
                <Button onClick={handleDeleteUser} color="error" className="btn btn-blue">Delete</Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Card>
      </Box>
      <PriceList open={priceListOpen} onClose={handleClosePriceList} onConfirm={handleConfirmPriceList} />
    </Container>
  );
};

export default Profile;
