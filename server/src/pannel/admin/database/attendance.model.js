import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    storedImage: {
      type: String,
      required: true,
    },

    liveImage: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    time: {
      type: String,
      default: () =>
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },

    matched: {
      type: Boolean,
      default: false,
    },

    confidence: {
      type: Number,
      default: null,
    },

    aiResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

const attendance = mongoose.model("AdminAttendanceHistory", attendanceSchema);

export { attendance };
