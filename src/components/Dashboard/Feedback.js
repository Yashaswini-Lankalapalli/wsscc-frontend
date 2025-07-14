import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CameraCapture from '../Scanner/CameraCapture';
import VoiceInput from '../Scanner/VoiceInput';

const Feedback = () => {
  const [cameraDialogOpen, setCameraDialogOpen] = useState(false);
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedAudio, setUploadedAudio] = useState(null);

  return (
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
  );
};

export default Feedback; 