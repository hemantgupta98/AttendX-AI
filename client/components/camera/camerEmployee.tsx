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

  const stopCamera = useCallback(() => {
    const stream = videoRef.current?.srcObject;

    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setStreamActive(false);
  }, []);

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

  const deleteImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#eef4ff_0%,#f8fafc_35%,#eef2f7_100%)] text-slate-900">
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur xl:p-8">
            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
                  Employee Attendance Check-in
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                  Location: Attendance Desk / Approved Work Area
                </span>
              </div>

              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Follow the capture steps below to mark your attendance
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Use the camera in a well-lit position, keep your face
                  centered, and capture a professional image that can be matched
                  with your registered employee photo.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Step 01
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  Start the camera and face the screen naturally.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Step 02
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  Capture the image for face matching with your registration.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Step 03
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  Upload the capture to complete attendance marking.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Important message: this check is used to match your registration
              uploaded image. After a successful match, the capture will be used
              to mark your attendance. Please keep the image clean, straight,
              and professional.
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={startCamera}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Start Camera
              </button>
              <button
                onClick={captureImage}
                disabled={!streamActive}
                className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${streamActive ? "bg-indigo-600 text-white hover:bg-indigo-500" : "cursor-not-allowed bg-slate-200 text-slate-400"}`}
              >
                Capture Face
              </button>
              <button
                onClick={stopCamera}
                disabled={!streamActive}
                className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${streamActive ? "bg-slate-200 text-slate-800 hover:bg-slate-300" : "cursor-not-allowed bg-slate-100 text-slate-400"}`}
              >
                Stop Camera
              </button>
              <button
                onClick={uploadImage}
                disabled={!image || isUploading}
                className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${image ? "bg-emerald-600 text-white hover:bg-emerald-500" : "cursor-not-allowed bg-slate-200 text-slate-400"}`}
              >
                {isUploading ? "Uploading..." : "Submit Attendance"}
              </button>
              <button
                onClick={deleteImage}
                disabled={!image || isUploading}
                className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${image ? "bg-rose-600 text-white hover:bg-rose-500" : "cursor-not-allowed bg-slate-200 text-slate-400"}`}
              >
                Delete Capture
              </button>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-slate-950 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Live Camera
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  Professional attendance capture
                </h2>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${streamActive ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800 text-slate-300"}`}
              >
                {streamActive ? "Camera active" : "Camera idle"}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <video
                ref={videoRef}
                playsInline
                autoPlay
                muted
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <canvas ref={canvasRef} style={{ display: "none" }} />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-200">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Guidance
                </p>
                <p className="mt-2 leading-6">
                  Keep your face visible, avoid strong shadows, and face the
                  camera directly for the best recognition result.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-200">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Status
                </p>
                <p className="mt-2 leading-6">
                  The captured image will be matched with your registered photo
                  before attendance is submitted.
                </p>
              </div>
            </div>

            {previewUrl && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">
                    Captured preview
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Ready to submit
                  </p>
                </div>

                <img
                  src={previewUrl}
                  alt="Captured preview"
                  className="w-full rounded-xl border border-white/10 object-cover"
                />
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}
