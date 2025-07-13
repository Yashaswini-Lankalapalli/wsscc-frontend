import React, { useRef, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const VoiceInput = ({ open, onClose, onUpload }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const audioInputRef = useRef();

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
      setIsPaused(false);
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

  const handleUpload = () => {
    if (recordedAudio) {
      onUpload(recordedAudio);
      setRecordedAudio(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={() => { setRecordedAudio(null); setIsRecording(false); setIsPaused(false); onClose(); }} maxWidth="sm" fullWidth>
      <DialogTitle>Capture Voice</DialogTitle>
      <DialogContent>
        {recordedAudio ? (
          <audio controls src={recordedAudio} style={{ width: '100%' }} />
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 2, mb: 2 }}>
            {isRecording ? (isPaused ? 'Recording paused.' : 'Recording... Speak now.') : 'Click start to record your voice.'}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'row', gap: 1, px: 3, pb: 2, justifyContent: 'center' }}>
        {!recordedAudio ? (
          <>
            <Button variant="contained" color="primary" onClick={handleStartRecording} disabled={isRecording} size="small">
              Start Recording
            </Button>
            <Button variant="contained" color="warning" onClick={handleStopRecording} disabled={!isRecording} size="small">
              Stop Recording
            </Button>
            <Button
              variant="contained"
              color={isPaused ? "success" : "info"}
              onClick={isPaused ? handleResumeRecording : handlePauseRecording}
              disabled={!isRecording}
              size="small"
              sx={{ minWidth: 120 }}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button variant="contained" color="secondary" onClick={() => audioInputRef.current.click()} size="small">
              Upload from Device
            </Button>
            <input
              type="file"
              accept="audio/*"
              style={{ display: "none" }}
              ref={audioInputRef}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setRecordedAudio(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </>
        ) : (
          <>
            <Button variant="contained" color="success" onClick={handleUpload} size="small">
              Upload
            </Button>
          </>
        )}
        <Button onClick={() => { setRecordedAudio(null); setIsRecording(false); setIsPaused(false); onClose(); }} size="small">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoiceInput; 