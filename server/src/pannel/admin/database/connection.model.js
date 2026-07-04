import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
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
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
      required: false,
      default: null,
    },
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

export const Teacher = mongoose.model("Teacher", teacherSchema);
