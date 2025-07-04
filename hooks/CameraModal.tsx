import React, { useRef, useEffect, useCallback } from 'react';
import { AttendanceStatus } from '../types';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
  action?: AttendanceStatus | null;
  modalTitle?: string;
  captureButtonText?: string;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture, action, modalTitle, captureButtonText }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const cleanupCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    const setupCamera = async () => {
      if (isOpen) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
           if (err instanceof DOMException && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
            alert("Camera access was denied. Please allow camera access in your browser settings.");
          } else if (err instanceof DOMException && (err.name === "NotFoundError" || err.name === "DevicesNotFoundError")) {
            alert("No camera was found. Please ensure a camera is connected and enabled.");
          } else if (err instanceof DOMException && (err.name === "NotReadableError" || err.name === "TrackStartError")) {
             alert("Your camera is already in use by another application. Please close it and try again.");
          } else {
            console.error("Error accessing camera:", err);
            alert("Could not access the camera. An unknown error occurred.");
          }
          onClose();
        }
      } else {
        cleanupCamera();
      }
    };

    setupCamera();

    return () => {
      cleanupCamera();
    };
  }, [isOpen, onClose, cleanupCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        // Flip the image horizontally for a mirror effect
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(imageDataUrl);
      }
    }
  };
  
  if (!isOpen) return null;

  const getModalTexts = () => {
    if (modalTitle && captureButtonText) {
      return { title: modalTitle, button: captureButtonText };
    }
    
    if (action === AttendanceStatus.ClockedIn) {
      return { title: 'Clock In: Photo Capture', button: 'Capture Photo & Clock In' };
    }
    
    if (action === AttendanceStatus.ClockedOut) {
      return { title: 'Clock Out: Photo Capture', button: 'Capture Photo & Clock Out' };
    }

    return { title: 'Photo Capture', button: 'Capture Photo' };
  };

  const { title, button } = getModalTexts();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <h2 className="text-xl font-bold text-center mb-4 text-slate-800 dark:text-slate-100">{title}</h2>
        <div className="relative w-full aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-800">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]"></video>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCapture}
            className="w-full flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800"
          >
            {button}
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-4 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};