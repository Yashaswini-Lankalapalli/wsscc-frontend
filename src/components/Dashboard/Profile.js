import React from 'react';
import { Typography, Box } from '@mui/material';

const dummyProfile = {
  managerName: "John Doe",
  storeId: "WMT1234",
  storeLocation: "New York, NY",
  phoneNumber: "+1-555-123-4567",
};

const Profile = () => (
  <Box>
    <Typography variant="h5" gutterBottom>Profile</Typography>
    <Typography><b>Manager Name:</b> {dummyProfile.managerName}</Typography>
    <Typography><b>Store ID:</b> {dummyProfile.storeId}</Typography>
    <Typography><b>Store Location:</b> {dummyProfile.storeLocation}</Typography>
    <Typography><b>Phone Number:</b> {dummyProfile.phoneNumber}</Typography>
  </Box>
);

export default Profile; 