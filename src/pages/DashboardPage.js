import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, AppBar, Typography, TextField, Button, Paper } from "@mui/material";

const drawerWidth = 240;

const sections = [
  "Home",
  "Store Map and Details",
  "Feedback",
  "Current Problems",
  "Camera Details",
  "Nearby Stores",
  "Profile"
];

const dummyProfile = {
  managerName: "John Doe",
  storeId: "WMT1234",
  storeLocation: "New York, NY",
  phoneNumber: "+1-555-123-4567",
};

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

const DashboardPage = () => {
  const [selected, setSelected] = useState(0);
  const managerName = "Manager"; // TODO: Replace with actual manager name from auth state
  const [nearbyStores, setNearbyStores] = useState(initialStores);
  const [newStore, setNewStore] = useState({
    storeName: "",
    storeId: "",
    managerName: "",
    storeLocation: "",
    phoneNumber: "",
  });

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Manager Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {sections.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton selected={selected === index} onClick={() => setSelected(index)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3, minHeight: "100vh" }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          {sections[selected]}
        </Typography>
        {/* Placeholder for section content */}
        <Box>
          {selected === 0 && (
            <div>
              <Typography variant="h5" gutterBottom>
                Welcome, {managerName}!
              </Typography>
              <div>Welcome to the Home section of the dashboard.</div>
            </div>
          )}
          {selected === 1 && <div>Store Map and Details content goes here.</div>}
          {selected === 2 && <div>Feedback content goes here.</div>}
          {selected === 3 && <div>Current Problems content goes here.</div>}
          {selected === 4 && <div>Camera Details content goes here.</div>}
          {selected === 5 && (
            <Box>
              <Typography variant="h5" gutterBottom>Nearby Stores</Typography>
              {nearbyStores.map((store, idx) => (
                <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                  <Typography><b>Store Name:</b> {store.storeName}</Typography>
                  <Typography><b>Store ID:</b> {store.storeId}</Typography>
                  <Typography><b>Manager Name:</b> {store.managerName}</Typography>
                  <Typography><b>Store Location:</b> {store.storeLocation}</Typography>
                  <Typography><b>Phone Number:</b> {store.phoneNumber}</Typography>
                </Paper>
              ))}
              <Box component="form" onSubmit={e => {
                e.preventDefault();
                setNearbyStores([...nearbyStores, newStore]);
                setNewStore({ storeName: "", storeId: "", managerName: "", storeLocation: "", phoneNumber: "" });
              }} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>Add New Store</Typography>
                <TextField label="Store Name" name="storeName" value={newStore.storeName} onChange={e => setNewStore({ ...newStore, storeName: e.target.value })} fullWidth margin="normal" required />
                <TextField label="Store ID" name="storeId" value={newStore.storeId} onChange={e => setNewStore({ ...newStore, storeId: e.target.value })} fullWidth margin="normal" required />
                <TextField label="Manager Name" name="managerName" value={newStore.managerName} onChange={e => setNewStore({ ...newStore, managerName: e.target.value })} fullWidth margin="normal" required />
                <TextField label="Store Location" name="storeLocation" value={newStore.storeLocation} onChange={e => setNewStore({ ...newStore, storeLocation: e.target.value })} fullWidth margin="normal" required />
                <TextField label="Phone Number" name="phoneNumber" value={newStore.phoneNumber} onChange={e => setNewStore({ ...newStore, phoneNumber: e.target.value })} fullWidth margin="normal" required />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Add Store</Button>
              </Box>
            </Box>
          )}
          {selected === 6 && (
            <Box>
              <Typography variant="h5" gutterBottom>Profile</Typography>
              <Typography><b>Manager Name:</b> {dummyProfile.managerName}</Typography>
              <Typography><b>Store ID:</b> {dummyProfile.storeId}</Typography>
              <Typography><b>Store Location:</b> {dummyProfile.storeLocation}</Typography>
              <Typography><b>Phone Number:</b> {dummyProfile.phoneNumber}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage; 