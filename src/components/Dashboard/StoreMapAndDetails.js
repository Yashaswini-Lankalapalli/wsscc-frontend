import React, { useRef, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

const dummyStoreDetails = {
  storeName: "Walmart Central",
  storeId: "WMT1001",
  managerName: "John Doe",
  storeLocation: "Brooklyn, NY",
  phoneNumber: "+1-555-123-4567",
};

const StoreMapAndDetails = () => {
  const [storeImage, setStoreImage] = useState(null);
  const storeImageInputRef = useRef();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Store Map and Details</Typography>
      <Button variant="contained" color="primary" onClick={() => storeImageInputRef.current.click()} sx={{ mb: 2 }}>
        Upload Store Image
      </Button>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={storeImageInputRef}
        onChange={e => {
          if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = ev => setStoreImage(ev.target.result);
            reader.readAsDataURL(e.target.files[0]);
          }
        }}
      />
      {storeImage && (
        <Box mb={2}>
          <Typography variant="subtitle1">Uploaded Store Image:</Typography>
          <img src={storeImage} alt="Store" style={{ maxWidth: 300, maxHeight: 200 }} />
        </Box>
      )}
      <Paper sx={{ p: 2, maxWidth: 400 }}>
        <Typography><b>Store Name:</b> {dummyStoreDetails.storeName}</Typography>
        <Typography><b>Store ID:</b> {dummyStoreDetails.storeId}</Typography>
        <Typography><b>Manager Name:</b> {dummyStoreDetails.managerName}</Typography>
        <Typography><b>Store Location:</b> {dummyStoreDetails.storeLocation}</Typography>
        <Typography><b>Phone Number:</b> {dummyStoreDetails.phoneNumber}</Typography>
      </Paper>
    </Box>
  );
};

export default StoreMapAndDetails; 