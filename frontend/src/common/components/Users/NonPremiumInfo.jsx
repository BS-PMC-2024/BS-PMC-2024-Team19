// src/components/NonPremiumInfo.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const NonPremiumInfo = () => {
  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h6" fontWeight="bold">
        You are a regular user. If you want to enjoy the benefits of premium users, you can find the details of the packages in the personal area.
      </Typography>
    </Box>
  );
};

export default NonPremiumInfo;
