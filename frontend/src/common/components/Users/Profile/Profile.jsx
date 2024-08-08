import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";
import PriceList from "../Props/PriceList";
import "./Profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    isPremium: false,
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [priceListOpen, setPriceListOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6500/backend/auth/getUserProfile",
          { withCredentials: true }
        );
        setUserInfo({
          name: response.data.user.fullName,
          email: response.data.user.email,
          isPremium: response.data.user.isPrime,
        });
        setLoading(false); // Data is loaded
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setDeleteConfirmation("");
  };

  const handleTogglePremium = async () => {
    try {
      const newIsPremium = !userInfo.isPremium;
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        isPremium: newIsPremium,
      }));
      await axios.post(
        "http://localhost:6500/backend/user/togglePremium",
        { isPremium: newIsPremium },
        { withCredentials: true }
      );
      alert("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (deleteConfirmation !== "DELETE") {
      alert("You must type DELETE to confirm");
      return;
    }

    try {
      await axios.post(
        "http://localhost:6500/backend/user/deleteUser",
        {},
        { withCredentials: true }
      );
      await axios.post(
        "http://localhost:6500/backend/auth/logout",
        {},
        { withCredentials: true }
      );
      alert("User deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
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

  const handleUpdatePassword = () => {
    navigate("/update"); // Navigate to the UpdateD page
    handleClose();
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while the data is being fetched
  }

  return (
    <Container className="container">
      <Box mt={15}>
        <Card className="profile-card">
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h5"
                  component="div"
                  className="text-capitalize"
                >
                  User Profile
                  <IconButton
                    aria-label="edit"
                    onClick={handleClick}
                    className="icon-button-edit"
                  >
                    <EditIcon />
                  </IconButton>
                </Typography>
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={4}>
                    <Typography variant="body1" component="div">
                      User Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" component="div">
                      {userInfo.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" component="div">
                      Email:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" component="div">
                      {userInfo.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" component="div">
                      Prime Status:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" component="div">
                      {userInfo.isPremium ? "Premium User" : "Regular User"}
                    </Typography>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  {!userInfo.isPremium && (
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleOpenPriceList}
                      sx={{
                        mt: 2,
                        bgcolor: "#FFD700", // Gold color
                        color: "black",
                        borderColor: "#FFD700",
                      }}
                      className="btn-gold"
                    >
                      Upgrade to Premium
                    </Button>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={4} container justifyContent="flex-end">
                <Avatar
                  sx={{
                    width: 130,
                    height: 130,
                    bgcolor: "#2980b9",
                    marginRight: "60px",
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 80, color: "white" }} />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <PriceList
        open={priceListOpen}
        onClose={handleClosePriceList}
        onConfirm={handleConfirmPriceList}
      />
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
        <MenuItem onClick={handleUpdatePassword}>Update Password</MenuItem>
        <MenuItem onClick={handleOpenDialog}>Delete Account</MenuItem>
        {userInfo.isPremium ? (
          <MenuItem onClick={handleTogglePremium}>Cancel Premium</MenuItem>
        ) : (
          <MenuItem onClick={handleOpenPriceList}>Upgrade to Premium</MenuItem>
        )}
      </Menu>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle className="text-capitalize">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone. Please type DELETE to confirm.
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
          <Button
            onClick={handleCloseDialog}
            color="primary"
            className="btn btn-blue"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            color="error"
            className="btn btn-blue"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
