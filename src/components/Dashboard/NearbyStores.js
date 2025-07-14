import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const initialStores = [
  {
    storeName: "Walmart Central",
    storeId: "WMT1001",
    managerName: "Alice Smith",
    storeLocation: "Brooklyn, NY",
    phoneNumber: "+1-555-234-5678",
  },
  {
    storeName: "Walmart Uptown",
    storeId: "WMT1002",
    managerName: "Bob Johnson",
    storeLocation: "Queens, NY",
    phoneNumber: "+1-555-345-6789",
  },
];

const NearbyStores = () => {
  const [nearbyStores, setNearbyStores] = useState(initialStores);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newStore, setNewStore] = useState({
    storeName: "",
    storeId: "",
    managerName: "",
    storeLocation: "",
    phoneNumber: "",
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Nearby Stores</Typography>
      <Button variant="contained" color="primary" onClick={() => setAddDialogOpen(true)} sx={{ mb: 2 }}>
        Add Store
      </Button>
      {nearbyStores.map((store, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }}>
          <Typography><b>Store Name:</b> {store.storeName}</Typography>
          <Typography><b>Store ID:</b> {store.storeId}</Typography>
          <Typography><b>Manager Name:</b> {store.managerName}</Typography>
          <Typography><b>Store Location:</b> {store.storeLocation}</Typography>
          <Typography><b>Phone Number:</b> {store.phoneNumber}</Typography>
        </Paper>
      ))}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Store</DialogTitle>
        <DialogContent>
          <Box component="form" id="add-store-form" sx={{ mt: 1 }}>
            <TextField label="Store Name" name="storeName" value={newStore.storeName} onChange={e => setNewStore({ ...newStore, storeName: e.target.value })} fullWidth margin="normal" required />
            <TextField label="Store ID" name="storeId" value={newStore.storeId} onChange={e => setNewStore({ ...newStore, storeId: e.target.value })} fullWidth margin="normal" required />
            <TextField label="Manager Name" name="managerName" value={newStore.managerName} onChange={e => setNewStore({ ...newStore, managerName: e.target.value })} fullWidth margin="normal" required />
            <TextField label="Store Location" name="storeLocation" value={newStore.storeLocation} onChange={e => setNewStore({ ...newStore, storeLocation: e.target.value })} fullWidth margin="normal" required />
            <TextField label="Phone Number" name="phoneNumber" value={newStore.phoneNumber} onChange={e => setNewStore({ ...newStore, phoneNumber: e.target.value })} fullWidth margin="normal" required />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button type="submit" form="add-store-form" variant="contained" onClick={e => {
            e.preventDefault();
            setNearbyStores([...nearbyStores, newStore]);
            setNewStore({ storeName: "", storeId: "", managerName: "", storeLocation: "", phoneNumber: "" });
            setAddDialogOpen(false);
          }}>Add Store</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NearbyStores; 