import React from 'react';
import { Typography } from '@mui/material';

const Home = () => {
  const managerName = "Manager"; // TODO: Replace with actual manager name from auth state
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Welcome, {managerName}!
      </Typography>
      <div>Welcome to the Home section of the dashboard.</div>
    </>
  );
};

export default Home; 