import mongoose from "mongoose";
import { hashPassword } from "./auth.hashed.js";

const signupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    photo: { type: String, required: true },
    teacherNumber: { type: Number, required: true },
    parentNumber: { type: Number, required: true },
    institutionName: { type: String, required: true },
    employeeID: { type: String, required: true },
    class: { type: String, required: true },
    subject: { type: String, required: true },
    joiningYear: { type: Number, required: true },
    type: { type: String, required: true },
    year: { type: Number, required: true },
    board: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    adminName: { type: String, required: true },
    designation: { type: String, required: true },
    adminEmail: { type: String, required: true },
    adminNumber: { type: Number, required: true },
    department: { type: String, required: false },
    course: { type: String, required: false },
    student: { type: Number, required: true },
    staff: { type: Number, required: true },
    attendenceType: { type: String, required: false },
    workingDays: { type: Number, required: true },
    attendance: { type: Number, required: false },
    classTiming: { type: Number, required: false },
    email: { type: String, required: true },
    faceScan: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
  },
  { timestamps: true },
);

signupSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hashPassword(this.password);
});

const loginSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    loginAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const signupModel = mongoose.model("EmployeesignupHistory", signupSchema);
const loginModel = mongoose.model("EmployeeloginHistory", loginSchema);

export { signupModel, loginModel };
