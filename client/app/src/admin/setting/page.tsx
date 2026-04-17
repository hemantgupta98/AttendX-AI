"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function AISettingsPage() {
  const [confidence, setConfidence] = useState(75);
  const [depthCheck, setDepthCheck] = useState(true);
  const [maskTolerance, setMaskTolerance] = useState(true);
  const [autoExposure, setAutoExposure] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            AI & Face Recognition
          </h1>
          <p className="text-sm text-gray-500">
            Configure model sensitivity and retrain the engine.
          </p>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow">
          Save Parameters
        </button>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recognition Threshold */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Recognition Threshold
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Adjust the confidence score required for a successful face match.
          </p>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Confidence Score</span>
            <span className="text-purple-600 font-semibold">{confidence}%</span>
          </div>

          <Input
            type="range"
            min="0"
            max="100"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full accent-purple-600"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-3">
            <span>LENIENT &lt; 60%</span>
            <span className="text-purple-600 font-medium">
              BALANCED 60% - 85%
            </span>
            <span>STRICT &gt; 85%</span>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Higher values reduce false positives but may increase missed
            detections.
          </p>
        </div>

        {/* Model Retraining */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Model Retraining
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Synchronize the AI model with the latest student and teacher face
            data.
          </p>

          <div className="text-sm text-gray-600 mb-2">
            Last trained: 2 hours ago
          </div>

          <div className="text-sm text-gray-600 mb-4">Version 2.4.1</div>

          <div className="h-2 bg-gray-200 rounded-full mb-4">
            <div className="h-2 bg-purple-600 rounded-full w-[85%]" />
          </div>

          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li>✔ 2,450 student faces indexed</li>
            <li>✔ 120 teacher faces indexed</li>
          </ul>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl">
            Start Global Retrain
          </button>
        </div>
      </div>

      {/* Advanced AI Parameters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Advanced AI Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Liveness Detection */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Liveness Detection
            </h3>

            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
              <span className="text-sm text-gray-700">3D Depth Check</span>
              <input
                type="checkbox"
                checked={depthCheck}
                onChange={() => setDepthCheck(!depthCheck)}
                className="accent-purple-600"
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              Prevents spoofing using printed photos or mobile screens.
            </p>
          </div>

          {/* Face Occlusion */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Face Occlusion
            </h3>

            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
              <span className="text-sm text-gray-700">Mask Tolerance</span>
              <input
                type="checkbox"
                checked={maskTolerance}
                onChange={() => setMaskTolerance(!maskTolerance)}
                className="accent-purple-600"
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              Allows recognition even if parts of the face are covered.
            </p>
          </div>

          {/* Lighting Correction */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Lighting Correction
            </h3>

            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
              <span className="text-sm text-gray-700">Auto Exposure</span>
              <input
                type="checkbox"
                checked={autoExposure}
                onChange={() => setAutoExposure(!autoExposure)}
                className="accent-purple-600"
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              Digitally enhances low-light feeds for better accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white w-14 h-14 rounded-full shadow-lg text-xl">
        +
      </button>
    </div>
  );
}
