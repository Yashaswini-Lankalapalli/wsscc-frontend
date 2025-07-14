import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const CurrentProblems = () => {
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
  const [problemText, setProblemText] = useState("");

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Current Problems</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setNotifyDialogOpen(true)}>
        Notify Other Stores
      </Button>
      <Dialog open={notifyDialogOpen} onClose={() => setNotifyDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Notify Other Stores</DialogTitle>
        <DialogContent>
          <TextField
            label="Describe the problem"
            multiline
            rows={4}
            value={problemText}
            onChange={e => setProblemText(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotifyDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={() => { setNotifyDialogOpen(false); setProblemText(""); /* Add notify logic here */ }}>
            Notify
          </Button>
        </DialogActions>
      </Dialog>
      <div>Current Problems content goes here.</div>
    </Box>
  );
};

export default CurrentProblems; 