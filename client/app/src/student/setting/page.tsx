"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function StudentSettingsPage() {
  const [difficulty, setDifficulty] = useState(60);
  const [aiHints, setAiHints] = useState(true);
  const [strictMode, setStrictMode] = useState(false);
  const [focusMode, setFocusMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Student Preferences & Learning Settings
          </h1>
          <p className="text-sm text-gray-500">
            Customize your learning experience and account preferences.
          </p>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl shadow">
          Save Settings
        </button>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Difficulty */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Learning Difficulty
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Adjust how challenging your study content should be.
          </p>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Difficulty Level</span>
            <span className="text-purple-600 font-semibold">{difficulty}%</span>
          </div>

          <Input
            type="range"
            min="0"
            max="100"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full accent-purple-600"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-3">
            <span>EASY &lt; 40%</span>
            <span className="text-purple-600 font-medium">
              MEDIUM 40% - 75%
            </span>
            <span>HARD &gt; 75%</span>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Higher difficulty gives more challenging questions and fewer hints.
          </p>
        </div>

        {/* Study Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Study Progress
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Track your learning activity and performance.
          </p>

          <div className="text-sm text-gray-600 mb-2">
            Last session: 2 hours ago
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Current Level: Level 5
          </div>

          <div className="h-2 bg-gray-200 rounded-full mb-4">
            <div className="h-2 bg-purple-600 rounded-full w-[70%]" />
          </div>

          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            <li>✔ 45 lessons completed</li>
            <li>✔ 120 quizzes attempted</li>
          </ul>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl">
            Start Practice Session
          </button>
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Learning Preferences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Hints */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Smart Assistance
            </h3>

            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
              <span className="text-sm text-gray-700">AI Hints</span>
              <input
                type="checkbox"
                checked={aiHints}
                onChange={() => setAiHints(!aiHints)}
                className="accent-purple-600"
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              Get hints and guidance while solving questions.
            </p>
          </div>

          {/* Strict Mode */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Exam Mode
            </h3>

            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
              <span className="text-sm text-gray-700">Strict Mode</span>
              <input
                type="checkbox"
                checked={strictMode}
                onChange={() => setStrictMode(!strictMode)}
                className="accent-purple-600"
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              Disable hints and simulate real exam conditions.
            </p>
          </div>

          {/* Focus Mode */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Study Mode
            </h3>

            <label className="flex items-center justify-between bg-gray-100 p-3 rounded-xl cursor-pointer">
              <span className="text-sm text-gray-700">Focus Mode</span>
              <input
                type="checkbox"
                checked={focusMode}
                onChange={() => setFocusMode(!focusMode)}
                className="accent-purple-600"
              />
            </label>

            <p className="text-xs text-gray-400 mt-2">
              Reduce distractions for a better study experience.
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
