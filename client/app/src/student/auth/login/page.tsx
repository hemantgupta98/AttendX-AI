"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import ChatBotPanel from "../agent/chatBot";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthLeft from "@/components/ui/authLeft";

type StudentLogin = {
  email: string;
  password: string;
};

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm<StudentLogin>({
    mode: "onTouched",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<StudentLogin> = async (data) => {
    console.log(data);
    reset();
    alert("Login submitted");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE */}
      <AuthLeft />

      {/* RIGHT SIDE */}
      <div className="relative flex min-h-screen items-start justify-center overflow-hidden bg-gray-100 px-4 pb-6 pt-6 transition-all duration-300 ease-out sm:px-6 lg:px-10 lg:pt-10">
        <div
          className={` w-full max-w-xl mt-20 rounded-xl bg-white p-4 shadow-xl transition-transform duration-300 ease-out ${
            isChatOpen ? "-translate-y-20 lg:-translate-y-24" : "translate-y-0"
          }`}
        >
          <div className=" flex justify-center items-center">
            <Image src="/logo.png" height={150} width={150} alt="logo" />
          </div>
          <h1 className=" text-gray-700 text-center text-xl font-semibold mb-2">
            Welcome! AttendX-AI
            <br /> Good to see you again!
          </h1>
          <p className="mt-5 text-sm font-light text-gray-400">
            {" "}
            Log in to securely access your dashboard and manage your activities.
          </p>
          <div className=" space-y-4">
            <div className=" mt-5">
              <p className=" text-md font-light text-gray-700">
                Email<span className="text-red-500 mb-5">*</span>
              </p>
              <Input
                type="email"
                className="input"
                placeholder="Eg:- example@gmail.com."
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="m-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <p className=" text-md font-light text-gray-700">
                Password<span className="text-red-500 mb-5">*</span>
              </p>
              <Input
                className="input"
                type="password"
                placeholder="Eg:- abcd3456."
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="m-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg mt-10 text-left flex justify-end"
          >
            Submit
          </button>
          <p className=" text-gray-400 text-sm text-center">
            Create a new Account?{" "}
            <span
              onClick={() => router.push("/src/student/auth/signup")}
              className=" text-blue-400 cursor-pointer"
            >
              {" "}
              Sign In
            </span>
          </p>
          <p
            onClick={() => router.push("/")}
            className="flex justify-center items-center mt-5 text-center gap-2 cursor-pointer"
          >
            <ChevronsLeft className=" shrink-0" size={20} />
            <span className="text-gray-600 text-sm text-center">Go back</span>
          </p>
        </div>
        <style jsx>{`
          .input {
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            outline: none;
          }
          .input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
          }
        `}</style>

        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="absolute bottom-5 right-5 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          aria-label="Open chatbot"
        >
          <Image src="/ai.png" height={56} width={56} alt="chatbot" />
        </button>

        {isChatOpen && (
          <div className="fixed inset-0 z-50 bg-black/20 p-4 md:p-6">
            <div className="flex h-full items-end justify-end">
              <div className="w-full max-w-md pb-4 transition-transform duration-300 ease-out md:pb-0">
                <ChatBotPanel onClose={() => setIsChatOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
