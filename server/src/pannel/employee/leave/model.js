import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "signup",
      required: true,
    },

    leaveType: {
      type: String,
      enum: ["Sick Leave", "Casual Leave", "Emergency Leave"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    totalDays: {
      type: Number,
      required: true,
    },

    reason: {
      type: String,
      required: true,
      maxlength: 500,
    },

    attachment: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    teacherRemark: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const LeaveModel = mongoose.model("EmployeeLeave", leaveSchema);
