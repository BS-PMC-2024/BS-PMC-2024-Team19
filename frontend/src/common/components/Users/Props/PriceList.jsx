import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid, Card, CardContent, CardActions } from '@mui/material';
import './PriceList.css';
const PriceList = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Upgrade to Premium</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Free Plan</Typography>
                <Typography variant="h4">$0</Typography>
                <Typography variant="body2">Valid indefinitely</Typography>
                <ul>
                  <li><Typography variant="body2"><b>Basic</b> charting tools</Typography></li>
                  <li><Typography variant="body2"><b>5</b> indicators per chart</Typography></li>
                  <li><Typography variant="body2">Limited data history</Typography></li>
                  <li><Typography variant="body2">Standard support</Typography></li>
                  <li><Typography variant="body2">Community forum access</Typography></li>
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="outlined" color="primary">Start Free Plan</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Premium Plan</Typography>
                <Typography variant="h4">$18.9/mo</Typography>
                <Typography variant="body2">Billed annually</Typography>
                <Typography variant="body2" color="textSecondary"><s>$24.97</s> - Save 24%</Typography>
                <ul>
                  <li><Typography variant="body2"><b>Advanced</b> charting tools</Typography></li>
                  <li><Typography variant="body2"><b>Unlimited</b> indicators per chart</Typography></li>
                  <li><Typography variant="body2">Extended data history</Typography></li>
                  <li><Typography variant="body2">Priority support</Typography></li>
                  <li><Typography variant="body2">Exclusive webinars and tutorials</Typography></li>
                  <li><Typography variant="body2">Ad-free experience</Typography></li>
                  <li><Typography variant="body2">Access to premium indicators</Typography></li>
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" color="primary" onClick={onConfirm}>Upgrade to Premium</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PriceList;
