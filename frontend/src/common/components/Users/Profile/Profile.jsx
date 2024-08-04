import React, { useState } from 'react';
import { Container, Box, Card, CardContent, CardActions, Button, Typography, TextField, Switch, FormControlLabel, IconButton,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const navigate = useNavigate();



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
      await axios.post('http://localhost:6500/backend/user/togglePremium', { isPremium }, { withCredentials: true });
      alert('User status updated successfully');
      console.log("user isPrime updtae");
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
      alert('User deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  return (
    <Container>
      <Box mt={15}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">User Profile</Typography>

            <Box mt={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleUpdateEmail} sx={{ mt: 2 }}>Update Email</Button>
            </Box>

            <Box mt={2}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleUpdatePassword} sx={{ mt: 2 }}>Update Password</Button>
            </Box>

            <Box mt={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                  />
                }
                label="Premium User"
              />
              <Button variant="contained" color="primary" onClick={handleTogglePremium} sx={{ mt: 2 }}>Update Status</Button>
            </Box>
          </CardContent>
          <CardActions>
            <IconButton aria-label="delete" color="error" onClick={handleOpenDialog}>
              <DeleteIcon />
                Delete Account
            </IconButton>
            <Dialog open={open} onClose={handleCloseDialog}>
              <DialogTitle>Delete Account</DialogTitle>
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
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleDeleteUser} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default Profile;
