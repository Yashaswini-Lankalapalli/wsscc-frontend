import React, { useState, useRef, useEffect } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, AppBar, Typography, TextField, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Webcam from "react-webcam";
import CameraCapture from '../components/Scanner/CameraCapture';
import VoiceInput from '../components/Scanner/VoiceInput';
import Home from '../components/Dashboard/Home';
import StoreMapAndDetails from '../components/Dashboard/StoreMapAndDetails';
import Feedback from '../components/Dashboard/Feedback';
import CurrentProblems from '../components/Dashboard/CurrentProblems';
import CameraDetails from '../components/Dashboard/CameraDetails';
import NearbyStores from '../components/Dashboard/NearbyStores';
import Notifications from '../components/Dashboard/Notifications';
import Profile from '../components/Dashboard/Profile';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const sections = [
  "Home",
  "Store Map and Details",
  "Feedback",
  "Current Problems",
  "Camera Details",
  "Nearby Stores",
  "Notifications",
  "Profile",
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
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
  const [problemText, setProblemText] = useState("");

  const sectionRoutes = [
    { label: 'Home', path: '' },
    { label: 'Store Map and Details', path: 'store-map' },
    { label: 'Feedback', path: 'feedback' },
    { label: 'Current Problems', path: 'current-problems' },
    { label: 'Camera Details', path: 'camera-details' },
    { label: 'Nearby Stores', path: 'nearby-stores' },
    { label: 'Notifications', path: 'notifications' },
    { label: 'Profile', path: 'profile' },
  ];

  const navigate = useNavigate();
  const location = useLocation();

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
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                background: '#fff',
                borderRadius: '10px',
                p: '8px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: 1
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Walmart_logo_%282025%3B_Stacked_alt%29.svg"
                alt="Walmart Logo"
                style={{ height: 40, background: '#fff' }}
              />
            </Box>
            <Typography variant="h5" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
              Walmart
            </Typography>
            <Typography variant="h6" component="span" sx={{ color: 'inherit', opacity: 0.8 }}>
              • Manager Dashboard
            </Typography>
          </Box>
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
            {sectionRoutes.map((section) => (
              <ListItem key={section.label} disablePadding>
                <ListItemButton
                  selected={section.path === '' ? location.pathname === '/dashboard' : location.pathname === `/dashboard/${section.path}`}
                  onClick={() => navigate(`/dashboard${section.path ? `/${section.path}` : ''}`)}
                >
                  <ListItemText primary={section.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3, minHeight: "100vh" }}>
        <Toolbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="store-map" element={<StoreMapAndDetails />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="current-problems" element={<CurrentProblems />} />
          <Route path="camera-details" element={<CameraDetails />} />
          <Route path="nearby-stores" element={<NearbyStores />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default DashboardPage;