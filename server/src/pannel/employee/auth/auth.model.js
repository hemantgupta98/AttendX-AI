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
    photo: { type: String, required: true, trim: true },
    teacherNumber: { type: Number, required: true },
    parentNumber: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    institutionName: { type: String, required: true },
    institutionId: { type: String, required: true },
    employeeID: { type: String, required: true },
    class: { type: String, required: true },
    subject: { type: String, required: true },
    joiningYear: { type: Number, required: true },
    email: { type: String, required: true },
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
