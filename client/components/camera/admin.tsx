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

    fetch("/api/face-match", {
      method: "POST",
      body: JSON.stringify({ image }),
    });
  };
  const btnGradient =
    "w-full relative cursor-pointer overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 text-sm sm:text-base before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white/20 before:skew-x-[-20deg] hover:before:left-[100%] before:transition-all before:duration-700";

  return (
    <>
      <video ref={videoRef} autoPlay />
      <button onClick={capture} className={btnGradient}>
        Mark Attendance
      </button>
    </>
  );
}
