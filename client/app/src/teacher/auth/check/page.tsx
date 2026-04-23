"use client";
import { useRef, useEffect } from "react";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  const capture = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/jpeg");

    // send to backend
    fetch("/api/face-match", {
      method: "POST",
      body: JSON.stringify({ image }),
    });
  };

  return (
    <>
      <video ref={videoRef} autoPlay />
      <button onClick={capture}>Mark Attendance</button>
    </>
  );
}
