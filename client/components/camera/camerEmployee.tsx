/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect, useState, useCallback } from "react";

export default function Dashboard() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [image, setImage] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [streamActive, setStreamActive] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreamActive(true);
        // attempt to autoplay (some browsers require this to be called)
        try {
          await videoRef.current.play();
        } catch (e) {
          // ignore autoplay errors
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // attempt to start camera on mount; keep manual fallback button for browsers
    startCamera();
  }, [startCamera]);
  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (blob) {
          setImage(blob);
          setPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(blob);
          });
        }
      }, "image/jpeg");
    } else {
      const data = canvas.toDataURL("image/jpeg");
      // convert base64 to blob
      const byteString = atob(data.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: "image/jpeg" });
      setImage(blob);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    }
  };
  const uploadImage = async () => {
    if (!image) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", image, "face.jpg");
    formData.append("type", "employee");

    try {
      const response = await fetch(
        "https://attendx-ai-n8uq.onrender.com/api/images/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const text = await response.text();
        alert("Upload failed: " + text);
        return;
      }

      const data = await response.json();
      console.log(data);
      alert("Thanks — image sent");
      // clear preview and image
      setImage(null);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    } catch (err) {
      console.error(err);
      alert("Upload error: " + (err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* MAIN */}
      <main className="flex-1 p-4 lg:p-6">
        {/* HEADER */}

        {/* STATS */}

        <div>
          <div className="mb-2">
            <button
              onClick={startCamera}
              className="mr-2 px-3 py-1 rounded bg-gray-200"
            >
              Start Camera
            </button>
            <button
              onClick={captureImage}
              disabled={!streamActive}
              className={`mr-2 px-3 py-1 rounded ${streamActive ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              Capture Face
            </button>
            <button
              onClick={uploadImage}
              disabled={!image || isUploading}
              className={`px-3 py-1 rounded ${image ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          <video ref={videoRef} playsInline width="500" />

          <canvas ref={canvasRef} style={{ display: "none" }} />

          {previewUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Captured preview:</p>

              <img
                src={previewUrl}
                alt="Captured preview"
                className="w-48 rounded"
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
