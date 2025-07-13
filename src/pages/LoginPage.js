import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({
    managerName: "",
    storeId: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic (API call)
    // For now, just navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2} align="center">Manager Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Manager Name" name="managerName" value={form.managerName} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Store ID" name="storeId" value={form.storeId} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
          <Button onClick={() => navigate("/register") } fullWidth sx={{ mt: 1 }}>Don't have an account? Register</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage; 