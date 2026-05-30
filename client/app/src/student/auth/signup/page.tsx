"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import ChatBotPanel from "../agent/chatBot";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthLeft from "@/components/ui/authLeft";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { toast, Toaster } from "sonner";

type Student = {
  name: string;
  gender: string;
  dob: string;
  photo: FileList;
  studentNumber: number;
  parentNumber: number;
  address: string;
  city: string;
  state: string;
  pincode: number;
  institutionName: string;
  studentID: string;
  class: string;
  stream: string;
  section: number;
  admissionYear: number;
  email: string;
  faceScan: FileList;
  password: string;
  confirmPassword: string;
};

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Unable to read image file"));
    reader.readAsDataURL(file);
  });

export default function Home() {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL2 ||
    "https://attendx-ai-n8uq.onrender.com/api";
  const [step, setStep] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [savedSteps, setSavedSteps] = useState<
    Partial<Record<number, Partial<Student>>>
  >({});
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Student>({
    mode: "onTouched",
  });

  const router = useRouter();
  const stepFields: Record<number, (keyof Student)[]> = {
    1: ["name", "gender", "dob", "photo"],
    2: ["address", "city", "state", "pincode"],
    3: ["institutionName", "stream", "section", "studentID", "admissionYear"],
    4: ["parentNumber", "studentNumber"],
    5: ["email", "faceScan", "password", "confirmPassword"],
  };

  const saveStepData = (currentStep: number) => {
    const allValues = getValues();
    const fields = stepFields[currentStep];
    const currentStepData: Record<
      string,
      string | number | File | FileList | undefined
    > = {};

    fields.forEach((field) => {
      currentStepData[field] = allValues[field];
    });

    setSavedSteps((prev) => ({
      ...prev,
      [currentStep]: currentStepData as Partial<Student>,
    }));
  };

  const next = async () => {
    const currentStepFields = stepFields[step];
    const isCurrentStepValid = await trigger(currentStepFields);

    if (!isCurrentStepValid) return;

    saveStepData(step);
    setStep((prev) => Math.min(prev + 1, 5));
  };
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit: SubmitHandler<Student> = async (data) => {
    setSignupError("");
    setIsSubmitting(true);

    const finalStepData: Record<
      string,
      string | number | File | FileList | undefined
    > = {};
    stepFields[5].forEach((field) => {
      finalStepData[field] = data[field];
    });

    const updatedSavedSteps = {
      ...savedSteps,
      5: finalStepData as Partial<Student>,
    };

    setSavedSteps(updatedSavedSteps);
    try {
      const normalizedBaseUrl = apiBaseUrl.replace(/\/$/, "");
      const url = `${normalizedBaseUrl}/student/auth/signup`;

      const photoFile = data.photo?.[0];
      const faceScanFile = data.faceScan?.[0];

      if (!photoFile || !faceScanFile) {
        throw new Error("Please upload both photo and live image");
      }

      const [photo, faceScan] = await Promise.all([
        fileToDataUrl(photoFile),
        fileToDataUrl(faceScanFile),
      ]);

      const payload = {
        ...data,
        photo,
        faceScan,
      };

      const { data: result } = await axios.post(url, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result?.token) {
        localStorage.setItem("token", result.token);
      }

      toast.success(result?.message || "Account created successfully");
      router.push("/src/student/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("AUTH ERROR 👉", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error("AUTH ERROR 👉", error);
      }

      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Server error. Please try again."
        : error instanceof Error
          ? error.message
          : "Server error. Please try again.";
      setSignupError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE */}
      <AuthLeft />

      {/* RIGHT SIDE */}
      <div className="relative flex min-h-screen items-start justify-center overflow-hidden bg-gray-100 px-4 pb-6 pt-6 transition-all duration-300 ease-out sm:px-6 lg:px-10 lg:pt-10">
        <div
          className={`mt-0 w-full max-w-xl rounded-2xl bg-white p-4 shadow-xl transition-transform duration-300 ease-out ${
            isChatOpen ? "-translate-y-20 lg:-translate-y-24" : "translate-y-0"
          }`}
        >
          <Toaster position="top-center" richColors />
          <h1 className=" text-gray-700 mt-5 text-center text-xl font-semibold mb-2">
            Welcome! Student
            <br /> Register for AI Attendance System
          </h1>
          <p className="text-sm text-gray-500 mb-2">Step {step} of 5</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>

          <p className="mb-6 text-md leading-6 text-gray-700">
            Please complete the onboarding form to set up your student ID.
            Fields marked with <span className="text-red-500">*</span> are
            mandatory and must be filled to proceed.
          </p>

          {signupError && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {signupError}
            </p>
          )}

          {/* STEP CONTENT */}
          {step === 1 && (
            <div className="space-y-3 ">
              <h2 className="text-xl font-semibold ">
                Student Details<span className="text-red-500 mb-5">*</span>
              </h2>
              <div className=" space-y-1">
                <p className=" text-md font-light text-gray-700">
                  Full Name<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  {...register("name", {
                    required: "Enter your Full name",
                    pattern: {
                      value: /^.+$/,
                      message: "Enter your full name",
                    },
                  })}
                  placeholder="Eg:- Neha,Mohit etc."
                />
                {errors.name && (
                  <p className="  text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className=" space-y-1">
                <p className=" text-md font-light text-gray-700">
                  Student Gender<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  {...register("gender", {
                    required: true,
                    pattern: {
                      value: /^.+$/,
                      message: "Enter your gender",
                    },
                  })}
                  placeholder="Eg:- Male and female"
                />
                {errors.gender && (
                  <p className="  text-red-500">{errors.gender.message}</p>
                )}
              </div>
              <div className=" space-y-1">
                <p className=" text-md font-light text-gray-700">
                  Date of birth<span className="text-red-500 mb-5">*</span>
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className="w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        if (selectedDate) {
                          setValue("dob", selectedDate.toISOString());
                        }
                      }}
                      disabled={(date) =>
                        date > new Date() || date.getFullYear() < 1
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.dob && (
                  <p className="  text-red-500">{errors.dob.message}</p>
                )}
                <Input
                  type="hidden"
                  {...register("dob", {
                    required: "Date of birth is required",
                    validate: (value) =>
                      value ? true : "Date of birth is required",
                  })}
                  value={date ? date.toISOString() : ""}
                />
              </div>
              <div className=" space-y-1">
                <p className=" text-md font-light text-gray-700">
                  Upload a Photo
                  <span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="file"
                  {...register("photo", {
                    required: "Upload your photo",
                  })}
                  placeholder="Eg:- emp.png/jpg or orthers"
                />
                {errors.photo && (
                  <p className="  text-red-500">{errors.photo.message}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">
                Location<span className="text-red-500 mb-5">*</span>
              </h2>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Address<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  className="input"
                  placeholder="Eg:- vill, post, dis, state"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  City<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  className="input"
                  placeholder="Eg:- Ranchi, Hazaribag etc"
                  {...register("city", {
                    required: "City is required",
                  })}
                />
                {errors.city && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  State<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  className="input"
                  placeholder="Eg:- Jharkhand, Bihar etc"
                  {...register("state", {
                    required: "State is required",
                  })}
                />
                {errors.state && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Pincode<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="number"
                  className="input"
                  placeholder="Eg:- 825313"
                  {...register("pincode", {
                    required: "Pincode is required",
                    valueAsNumber: true,
                    min: { value: 100000, message: "Enter a valid pincode" },
                    max: { value: 999999, message: "Enter a valid pincode" },
                  })}
                />
                {errors.pincode && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">
                Institution Details<span className="text-red-500 mb-5">*</span>
              </h2>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Institution Name<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  className="input"
                  placeholder="Eg:- Jharkhand Rai University etc."
                  {...register("institutionName", {
                    required: "Enter your institution name",
                  })}
                />
                {errors.institutionName && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.institutionName.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  StudentID<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  placeholder="Eg:- ABC8167."
                  {...register("studentID", {
                    required: "Enter your studdentID",
                  })}
                />
                {errors.studentID && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.studentID.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Class<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="text"
                  placeholder="Eg:- 9, 10, graduation or orthers "
                  {...register("class", {
                    required: "Class is required",
                  })}
                />
                {errors.class && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.class.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Stream<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  placeholder="Eg:- Arts,Sci or 9,10 etc."
                  {...register("stream", {
                    required: "Stream is required",
                  })}
                />
                {errors.stream && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.stream.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Section<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  placeholder="Eg:- A,B,C etc."
                  {...register("section", {
                    required: "Section is required",
                  })}
                />
                {errors.section && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.section.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Admission Year<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="number"
                  {...register("admissionYear", {
                    required: true,
                    valueAsNumber: true,
                    min: { value: 1800, message: "Enter a valid year" },
                  })}
                  placeholder="Eg:- 2000"
                />
                {errors.admissionYear && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.admissionYear.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">
                Academic<span className="text-red-500 mb-5">*</span>
              </h2>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Parent Number<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="tel"
                  className="input"
                  placeholder="Eg:- +91 9867742834"
                  {...register("parentNumber", {
                    required: "Parent number is required",
                    valueAsNumber: true,
                    min: {
                      value: 1000000000,
                      message: "Enter a valid phone number",
                    },
                    max: {
                      value: 999999999999,
                      message: "Enter a valid phone number",
                    },
                  })}
                />
                {errors.parentNumber && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.parentNumber.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Student Number<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="tel"
                  className="input"
                  placeholder="Eg:- +91 9867742834"
                  {...register("studentNumber", {
                    required: "Student number is required",
                    valueAsNumber: true,
                    min: {
                      value: 1000000000,
                      message: "Enter a valid phone number",
                    },
                    max: {
                      value: 999999999999,
                      message: "Enter a valid phone number",
                    },
                  })}
                />
                {errors.studentNumber && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.studentNumber.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <p className=" text-red-500 text-md font-light">
                Ensure all details are correct before submitting. You can edit
                this information later if needed.
              </p>
              <h2 className="text-xl font-semibold">
                Security<span className="text-red-500 mb-5">*</span>
              </h2>
              <div>
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
                  Live Image<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="file"
                  className="input"
                  placeholder="Eg:-  abc.png/jpg others."
                  {...register("faceScan", {
                    required: "Live Image is required",
                  })}
                />
                {errors.faceScan && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.faceScan.message}
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
              <div>
                <p className=" text-md font-light text-gray-700">
                  Confirm Password<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  className="input"
                  type="password"
                  placeholder="Eg:- abcd3456."
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                onClick={prev}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Back
              </button>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={next}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>

          <p className=" text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/src/student/auth/login")}
              className=" text-blue-400 cursor-pointer"
            >
              {" "}
              Log In
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
