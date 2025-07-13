import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({
    managerName: "",
    password: "",
    storeId: "",
    storeLocation: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement registration logic (API call)
    alert("Registered successfully! Please login.");
    navigate("/login");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2} align="center">Manager Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Manager Name" name="managerName" value={form.managerName} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Store ID" name="storeId" value={form.storeId} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Store Location" name="storeLocation" value={form.storeLocation} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} fullWidth margin="normal" required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Register</Button>
          <Button onClick={() => navigate("/login") } fullWidth sx={{ mt: 1 }}>Already have an account? Login</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage; 