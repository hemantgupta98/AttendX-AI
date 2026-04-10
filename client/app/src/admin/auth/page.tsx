"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import ChatBotPanel from "../agent/chatbot-panel";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Onboarding = {
  name: string;
  type: string;
  year: number;
  board: string;
  address: string;
  city: string;
  state: string;
  pincode: number;
  adminName: string;
  designation: string;
  adminEmail: string;
  adminNumber: number;
  department?: string;
  course?: string;
  student: number;
  staff: number;
  attendenceType?: string;
  workingDays: number;
  attendance?: number;
  classTiming?: number;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Home() {
  const [step, setStep] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [savedSteps, setSavedSteps] = useState<
    Partial<Record<number, Partial<Onboarding>>>
  >({});
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Onboarding>({
    mode: "onTouched",
  });

  const router = useRouter();
  const stepFields: Record<number, (keyof Onboarding)[]> = {
    1: ["name", "type", "year", "board"],
    2: ["address", "city", "state", "pincode"],
    3: ["adminName", "designation", "adminEmail", "adminNumber"],
    4: ["department", "course", "student", "staff"],
    5: ["attendenceType", "workingDays", "attendance", "classTiming"],
    6: ["email", "password", "confirmPassword"],
  };

  const saveStepData = (currentStep: number) => {
    const allValues = getValues();
    const fields = stepFields[currentStep];
    const currentStepData: Record<string, string | number | undefined> = {};

    fields.forEach((field) => {
      currentStepData[field] = allValues[field];
    });

    setSavedSteps((prev) => ({
      ...prev,
      [currentStep]: currentStepData as Partial<Onboarding>,
    }));
  };

  const next = async () => {
    const currentStepFields = stepFields[step];
    const isCurrentStepValid = await trigger(currentStepFields);

    if (!isCurrentStepValid) return;

    saveStepData(step);
    setStep((prev) => Math.min(prev + 1, 6));
  };
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit: SubmitHandler<Onboarding> = async (data) => {
    const finalStepData: Record<string, string | number | undefined> = {};
    stepFields[6].forEach((field) => {
      finalStepData[field] = data[field];
    });

    const updatedSavedSteps = {
      ...savedSteps,
      6: finalStepData as Partial<Onboarding>,
    };

    setSavedSteps(updatedSavedSteps);
    console.log(data);
    console.log("Saved step-wise data:", updatedSavedSteps);
    alert("Form submited");
    reset();
    setSavedSteps({});
    setStep(1);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="bg-linear-to-br from-indigo-50 to-gray-100 p-8 lg:p-16 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <Image src="/logo.png" height={150} width={150} alt="logo" />
        </div>

        {/* Badge */}
        <div className="mb-4">
          <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
            ENTERPRISE READY V2.4
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-gray-900">
          Next-Generation <br />
          <span className="text-indigo-600 italic">Face Recognition</span>{" "}
          <br />
          Attendance Ecosystem
        </h1>

        {/* Description */}
        <p className="text-gray-600 mt-6 max-w-lg">
          Harness the power of high-precision AI to automate tracking, enhance
          security, and generate real-time insights for your institution.
        </p>

        {/* Features */}
        <div className="mt-10 space-y-6">
          <Feature
            title="99.9% Recognition Accuracy"
            desc="Our proprietary neural engine identifies faces in milliseconds, even in varied lighting conditions."
          />
          <Feature
            title="Privacy First Architecture"
            desc="End-to-end encryption and decentralized data storage ensure privacy."
          />
          <Feature
            title="Real-time Synchronization"
            desc="Instant updates across all campus devices and central dashboard."
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex min-h-screen items-start justify-center overflow-hidden bg-gray-100 px-4 pb-6 pt-6 transition-all duration-300 ease-out sm:px-6 lg:px-10 lg:pt-10">
        <div
          className={`mt-0 w-full max-w-xl rounded-2xl bg-white p-4 shadow-xl transition-transform duration-300 ease-out ${
            isChatOpen ? "-translate-y-20 lg:-translate-y-24" : "translate-y-0"
          }`}
        >
          <h1 className=" text-gray-700 mt-5 text-center text-xl font-semibold mb-2">
            Welcome! <br /> Let’s set up your institution in just a few steps 🚀
          </h1>
          <p className="text-sm text-gray-500 mb-2">Step {step} of 6</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>

          <p className="mb-6 text-md leading-6 text-gray-700">
            Please complete the onboarding form to set up your institution.
            Fields marked with <span className="text-red-500">*</span> are
            mandatory and must be filled to proceed.
          </p>

          {/* STEP CONTENT */}
          {step === 1 && (
            <div className="space-y-3 ">
              <h2 className="text-xl font-semibold ">
                Institution Details<span className="text-red-500 mb-5">*</span>
              </h2>
              <div className=" space-y-1">
                <p className=" text-md font-light text-gray-700">
                  Institution Name<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  {...register("name", {
                    required: "Enter your institution name",
                    pattern: {
                      value: /^.+$/,
                      message: "Enter your institution name",
                    },
                  })}
                  placeholder="Eg:- Name of Institution"
                />
                {errors.name && (
                  <p className="  text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className=" space-y-1">
                <p className=" text-md font-light text-gray-700">
                  Institution Type<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  {...register("type", {
                    required: "Enter your institution type",
                    pattern: {
                      value: /^.+$/,
                      message: "Enter your institution type",
                    },
                  })}
                  placeholder="Eg:- Public/Private or others"
                />
                {errors.type && (
                  <p className="  text-red-500">{errors.type.message}</p>
                )}
              </div>
              <div className=" space-y-1">
                <p className=" text-md font-light text-gray-700">
                  Established Year<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="number"
                  {...register("year", {
                    required: "Enter your institution year",
                    valueAsNumber: true,
                    min: { value: 1800, message: "Enter a valid year" },
                  })}
                  placeholder="Eg:- 2000"
                />
                {errors.year && (
                  <p className="  text-red-500">{errors.year.message}</p>
                )}
              </div>
              <div className=" space-y-1">
                <p className=" text-md font-light text-gray-700">
                  Affiliation / Board
                  <span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  {...register("board", {
                    required: "Enter your institution board",
                    pattern: {
                      value: /^.+$/,
                      message: "Enter your institution board",
                    },
                  })}
                  placeholder="Eg:- State/Central or others"
                />
                {errors.board && (
                  <p className="  text-red-500">{errors.board.message}</p>
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
                Admin Info<span className="text-red-500 mb-5">*</span>
              </h2>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Full Name<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  className="input"
                  placeholder="Eg:- Hemant Gupta etc."
                  {...register("adminName", {
                    required: "Full name is required",
                  })}
                />
                {errors.adminName && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.adminName.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Desgination<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  placeholder="Eg:- Your Role like Principle etc."
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                />

                {errors.designation && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.designation.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Email<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="email"
                  placeholder="Eg:- example@gmail.com"
                  {...register("adminEmail", {
                    required: "Admin email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.adminEmail && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.adminEmail.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Phone Number<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="tel"
                  className="input"
                  placeholder="Eg:- +91 9867742834"
                  {...register("adminNumber", {
                    required: "Phone number is required",
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
                {errors.adminNumber && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.adminNumber.message}
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
                <p className=" text-md font-light text-gray-700">Department</p>
                <Input
                  className="input"
                  placeholder="Eg:- Sci/arts ."
                  {...register("department", {
                    required: false,
                  })}
                />
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">Course</p>
                <Input
                  placeholder="Eg:- class 11/12 ."
                  {...register("course", {
                    required: false,
                  })}
                />
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Total students(approx)
                  <span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="number"
                  placeholder="Eg:- 1-10000"
                  {...register("student", {
                    required: "Total students is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Students must be at least 1" },
                  })}
                />
                {errors.student && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.student.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Total Staff(approx)
                  <span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="number"
                  className="input"
                  placeholder="Eg:- 1-1000 ."
                  {...register("staff", {
                    required: "Total staff is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "Staff must be at least 1" },
                  })}
                />
                {errors.staff && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.staff.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">
                Preferences<span className="text-red-500 mb-5">*</span>
              </h2>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Attendance Type
                </p>
                <Input
                  className="input"
                  placeholder="Eg:- Online/Offine ."
                  {...register("attendenceType", {
                    required: false,
                  })}
                />
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Working Days<span className="text-red-500 mb-5">*</span>
                </p>
                <Input
                  type="number"
                  className="input"
                  placeholder="Eg:- 1-7."
                  {...register("workingDays", {
                    required: "Working days is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Working days must be at least 1",
                    },
                  })}
                />
                {errors.workingDays && (
                  <p className="m-2 text-sm text-red-500">
                    {errors.workingDays.message}
                  </p>
                )}
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">Attendance</p>
                <Input
                  type="number"
                  className="input"
                  placeholder="Eg:- 1-100%."
                  {...register("attendance", {
                    required: false,
                  })}
                />
              </div>
              <div>
                <p className=" text-md font-light text-gray-700">
                  Class Timing
                </p>
                <Input
                  type="number"
                  className="input"
                  placeholder="Eg:- 9:00 AM to 3:00 PM."
                  {...register("classTiming", {
                    required: false,
                  })}
                />
              </div>
            </div>
          )}

          {step === 6 && (
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

            {step < 6 ? (
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
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit
              </button>
            )}
          </div>

          <p className=" text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <span className=" text-blue-400 cursor-pointer"> Log In</span>
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

/* Feature Component */
function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-lg">
        ✓
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
    </div>
  );
}
