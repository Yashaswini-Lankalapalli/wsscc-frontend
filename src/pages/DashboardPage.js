import React, { useState, useRef, useEffect } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, AppBar, Typography, TextField, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Webcam from "react-webcam";
import CameraCapture from '../components/Scanner/CameraCapture';
import VoiceInput from '../components/Scanner/VoiceInput';

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
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [cameraDialogOpen, setCameraDialogOpen] = useState(false);
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedAudio, setUploadedAudio] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef();
  const webcamRef = useRef(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [storeImage, setStoreImage] = useState(null);
  const storeImageInputRef = useRef();
  const dummyStoreDetails = {
    storeName: "Walmart Central",
    storeId: "WMT1001",
    managerName: "John Doe",
    storeLocation: "Brooklyn, NY",
    phoneNumber: "+1-555-123-4567",
  };

  useEffect(() => {
    if (cameraDialogOpen && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          setCameraStream(stream);
        })
        .catch(err => {
          // Handle error
        });
    }
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }
    };
  }, [cameraDialogOpen]);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    setCapturedImage(canvas.toDataURL('image/png'));
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new window.MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) setAudioChunks((prev) => [...prev, e.data]);
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setRecordedAudio(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach(track => track.stop());
      };
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      alert('Could not access microphone.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handlePauseRecording = () => {
    if (mediaRecorder && isRecording && !isPaused) {
      mediaRecorder.pause();
      setIsPaused(true);
    }
  };
  const handleResumeRecording = () => {
    if (mediaRecorder && isRecording && isPaused) {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  };

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
          {selected === 1 && (
            <Box>
              <Typography variant="h5" gutterBottom>Store Map and Details</Typography>
              <Button variant="contained" color="primary" onClick={() => storeImageInputRef.current.click()} sx={{ mb: 2 }}>
                Upload Store Map
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
          )}
          {selected === 2 && (
            <Box>
              <Typography variant="h5" gutterBottom>Feedback</Typography>
              <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => setCameraDialogOpen(true)}>
                Capture Image
              </Button>
              <Button variant="contained" color="secondary" sx={{ mr: 2 }} onClick={() => setVoiceDialogOpen(true)}>
                Capture Voice
              </Button>
              <CameraCapture
                open={cameraDialogOpen}
                onClose={() => setCameraDialogOpen(false)}
                onUpload={img => setUploadedImage(img)}
              />
              <VoiceInput
                open={voiceDialogOpen}
                onClose={() => setVoiceDialogOpen(false)}
                onUpload={audio => setUploadedAudio(audio)}
              />
              {uploadedImage && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Uploaded Image:</Typography>
                  <img src={uploadedImage} alt="Uploaded" style={{ maxWidth: 300, maxHeight: 200 }} />
                </Box>
              )}
              {uploadedAudio && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Uploaded Audio:</Typography>
                  <audio controls src={uploadedAudio} style={{ width: 300 }} />
                </Box>
              )}
            </Box>
          )}
          {selected === 3 && <div>Current Problems content goes here.</div>}
          {selected === 4 && <div>Camera Details content goes here.</div>}
          {selected === 5 && (
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