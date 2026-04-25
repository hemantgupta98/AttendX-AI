"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Student() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

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
    setCapturedImage(image);

    fetch("/api/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });
  };

  const btnGradient =
    "w-full relative cursor-pointer overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-indigo-700 active:scale-95 text-sm sm:text-base before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-white/20 before:skew-x-[-20deg] hover:before:left-[100%] before:transition-all before:duration-700";

  return (
    <>
      <video ref={videoRef} autoPlay />
      <button onClick={capture} className={btnGradient}>
        Mark Attandence
      </button>
      {capturedImage ? (
        <Image
          src={capturedImage}
          alt="Captured preview"
          width={192}
          height={144}
          unoptimized
          className="mt-4 rounded-xl border"
        />
      ) : (
        <p>Not any image saved</p>
      )}
    </>
  );
}
