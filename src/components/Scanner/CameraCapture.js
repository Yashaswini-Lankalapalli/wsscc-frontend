import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";

const CameraCapture = ({ open, onClose, onCapture, onUpload }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const handleUpload = () => {
    if (capturedImage) {
      onUpload(capturedImage);
      setCapturedImage(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={() => { setCapturedImage(null); onClose(); }} maxWidth="sm" fullWidth>
      <DialogTitle>Capture Image</DialogTitle>
      <DialogContent>
        {!capturedImage ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              width={400}
              height={300}
              videoConstraints={{ facingMode: "environment" }}
              style={{ width: '100%', maxHeight: 300, background: '#000' }}
            />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={capturedImage} alt="Captured" style={{ width: '100%', maxHeight: 300 }} />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
        {!capturedImage ? (
          <>
            <Button variant="contained" color="primary" onClick={handleCapture}>Capture</Button>
            <Button variant="contained" color="secondary" onClick={() => fileInputRef.current.click()}>Upload from Gallery</Button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onload = ev => setCapturedImage(ev.target.result);
                  reader.readAsDataURL(e.target.files[0]);
                }
              }}
            />
          </>
        ) : (
          <>
            <Button variant="outlined" color="primary" onClick={() => setCapturedImage(null)}>Retake Image</Button>
            <Button variant="contained" color="success" onClick={handleUpload}>Upload</Button>
          </>
        )}
        <Button onClick={() => { setCapturedImage(null); onClose(); }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CameraCapture; 