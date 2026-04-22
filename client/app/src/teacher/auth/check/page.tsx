"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function NewUserPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const normalizedName = fullName.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password;
    const normalizedConfirmPassword = confirmPassword;

    if (!normalizedName || !normalizedEmail || !normalizedPassword) {
      setErrorMessage("Name, email, and password are required.");
      return;
    }

    if (normalizedPassword !== normalizedConfirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (normalizedPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: normalizedPassword,
      options: {
        data: {
          role: "teacher",
          fullName: normalizedName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (!data.session) {
      setSuccessMessage(
        "User created. Please check your email and confirm your account before login.",
      );
    } else {
      setSuccessMessage("User created successfully. Redirecting to login...");
      router.push("/src/teacher/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleCreateUser}
        className="bg-gray-900 p-6 rounded-xl w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-semibold">Create New User</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 rounded bg-gray-800"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 rounded bg-gray-800"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating user..." : "Create User"}
        </button>

        {errorMessage ? (
          <p className="text-sm text-red-400">{errorMessage}</p>
        ) : null}

        {successMessage ? (
          <p className="text-sm text-green-400">{successMessage}</p>
        ) : null}

        <button
          type="button"
          className="w-full border border-gray-600 p-2 rounded"
          onClick={() => router.push("/src/teacher/auth/login")}
        >
          Go to Login
        </button>
      </form>
    </div>
  );
}
